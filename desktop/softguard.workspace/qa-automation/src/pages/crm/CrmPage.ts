import { Page, Frame } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { waitForExtReady, waitForAjaxComplete } from "../../helpers/extjs";
import { applyResourceOverrideRules } from "../../helpers/resource-override";

/**
 * Page Object for the SgWebCrm module.
 *
 * The CRM app loads inside an <iframe> embedded within a Desktop window.
 * Layout (once loaded):
 *   North: CrmNorthView (toolbar with Entidades, Smartpanics, Calendario, etc.)
 *   Center: tabpanel (id='center')
 *
 * Key challenge: ExtJS state is inside the iframe's window, not the parent page.
 */
export class CrmPage {
  constructor(private readonly page: Page) {}

  /**
   * Find the CRM app iframe by URL pattern.
   *
   * GCS uses two CRM-related frames:
   *   1. /a/SgWebCrm/?version=... — proxy/gateway frame (NO ExtJS)
   *   2. /apps/SgWebCrm/{version}/ — real ExtJS app frame
   *
   * This method prefers the real ExtJS app frame (#2) over the proxy (#1).
   * For local sencha-watch, it matches /SgWebCrm/ anywhere in the URL.
   */
  async getCrmFrame(timeout = 60_000): Promise<Frame> {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const frames = this.page.frames();
      // Prefer the real ExtJS app frame over the proxy frame
      const frame =
        frames.find((f) => f.url().includes("/apps/SgWebCrm/")) ??
        frames.find(
          (f) =>
            f.url().includes("/SgWebCrm/") || f.url().includes("/SgWebCrm?"),
        );
      if (frame) return frame;
      await this.page.waitForTimeout(500);
    }
    throw new Error(
      `CRM iframe not found after ${timeout}ms. Available frames: ${this.page
        .frames()
        .map((f) => f.url())
        .join(", ")}`,
    );
  }

  /**
   * Find the real CRM ExtJS app frame and wait for Ext.isReady + ClassManager.
   *
   * Unlike waitForCrmReady(), this does NOT wait for the full viewport render.
   * This makes it safe to use even when DSS-1497 is active (crashes initComponent
   * which fires after boot, but classes are already registered).
   *
   * @returns { frame, dss1497Active } — dss1497Active=true if Ext.isReady timed out
   */
  async getCrmFrameWithExt(
    timeout = 90_000,
  ): Promise<{ frame: Frame; dss1497Active: boolean }> {
    const frame = await this.getCrmFrame(timeout);

    console.log("[CrmPage] CRM app frame encontrado. URL:", frame.url());

    // Wait for Ext.isReady + ClassManager — happens at boot, before viewport renders
    let dss1497Active = false;
    try {
      await frame.waitForFunction(
        () => {
          const ext = (window as any).Ext;
          return !!(ext && ext.isReady && ext.ClassManager);
        },
        undefined,
        { timeout: 60_000, polling: 500 },
      );
      console.log("[CrmPage] Ext.isReady alcanzado en frame CRM");
    } catch {
      dss1497Active = true;
      console.warn(
        "[CrmPage] Ext.isReady no alcanzado — posible bloqueo por DSS-1497",
      );
    }

    return { frame, dss1497Active };
  }

  /**
   * Standard entry point for GCS CRM tests.
   * Navigates to the Desktop, opens the CRM module if needed, and returns
   * the real ExtJS app frame with Ext.isReady confirmed.
   *
   * Use this as the single line setup for all crm-*-gcs spec files:
   *   const { frame, dss1497Active } = await crm.openCrmGcs();
   */
  async openCrmGcs(
    timeout = 90_000,
  ): Promise<{ frame: Frame; dss1497Active: boolean }> {
    await this.gotoDesktop();

    const modules = await this.getAvailableModules();
    const availableCount = modules.filter(
      (m) => m.keyAvailable && m.keyReference !== "Desktop",
    ).length;

    if (availableCount > 1) {
      console.log("[CrmPage] Multiple modules — opening CRM manually");
      await this.openCrmModuleManually();
    }

    return this.getCrmFrameWithExt(timeout);
  }

  /**
   * Wait for the CRM's ExtJS application to be fully initialized inside the iframe.
   */
  async waitForCrmReady(timeout = 120_000): Promise<Frame> {
    const frame = await this.getCrmFrame(timeout);

    await frame.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        if (!ext || !ext.isReady || !ext.ComponentQuery) return false;
        // Viewport must be rendered
        const vp = ext.ComponentQuery.query("viewport")[0];
        return !!(vp && vp.rendered);
      },
      undefined,
      { timeout, polling: 500 },
    );

    await waitForAjaxComplete(frame as unknown as Page);
    return frame;
  }

  /**
   * Check whether the CRM viewport rendered correctly.
   * Returns true even if toolbar buttons are unavailable for this user.
   */
  async isCrmLoaded(frame: Frame): Promise<boolean> {
    return frame.evaluate(() => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ComponentQuery) return false;
      const vp = ext.ComponentQuery.query("viewport")[0];
      const center = ext.getCmp("center");
      return !!(vp && vp.rendered && center);
    });
  }

  /**
   * Collect all console errors from the CRM iframe.
   * Call before getCrmFrame() to attach listener early.
   */
  collectCrmConsoleErrors(): string[] {
    const errors: string[] = [];
    this.page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    this.page.on("pageerror", (err) => {
      errors.push(`[PageError] ${err.message}`);
    });
    return errors;
  }

  /**
   * Navigate to the Desktop and wait for it to load.
   *
   * Notes:
   * - Navigate to root `/` — GCS redirects authenticated users to the versioned Desktop URL
   *   (e.g., /apps/Desktop/26.03.0/). The version changes per build, so we must not hardcode it.
   * - GCS may show a "Desktop sesion detectada" interstitial on the root URL when there is already
   *   an active session. Click "Eliminar sesion" to dismiss it and proceed to Desktop.
   * - Do NOT call waitForAjaxComplete here: the Desktop starts background polling tasks
   *   (token check every 10s, message store every 20s) that keep Ext.Ajax busy indefinitely.
   *   Instead, wait for desktopData.modules which is available synchronously after load.
   */
  async gotoDesktop(): Promise<void> {
    // Navigate directly to the saved Desktop URL (from crm-auth.setup.ts) to bypass the
    // "Desktop sesion detectada" interstitial — clicking "Eliminar sesion" logs the user OUT.
    // Navigating directly to the versioned URL skips the interstitial entirely.
    const desktopUrlFile = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      ".auth",
      "crm-desktop-url.txt",
    );
    let targetUrl = "/";
    if (fs.existsSync(desktopUrlFile)) {
      targetUrl = fs.readFileSync(desktopUrlFile, "utf-8").trim();
      console.log("[CrmPage.gotoDesktop] Using saved Desktop URL:", targetUrl);
    } else {
      console.warn(
        "[CrmPage.gotoDesktop] No saved Desktop URL found — falling back to root (may hit interstitial)",
      );
    }

    await this.page.goto(targetUrl, { waitUntil: "domcontentloaded" });

    // Wait for the Desktop URL to be active
    await this.page.waitForURL("**/apps/Desktop/**", { timeout: 60_000 });

    await waitForExtReady(this.page);
    // Wait for desktopData global to be populated (loaded synchronously via getDesktopData.js)
    await this.page.waitForFunction(
      () =>
        !!(window as any).desktopData &&
        Array.isArray((window as any).desktopData.modules),
      undefined,
      { timeout: 30_000, polling: 300 },
    );
  }

  /**
   * Get the list of modules available to the current user from desktopData.
   */
  async getAvailableModules(): Promise<
    Array<{ name: string; keyReference: string; keyAvailable: boolean }>
  > {
    return this.page.evaluate(() => {
      const data = (window as any).desktopData;
      if (!data || !data.modules) return [];
      return data.modules.map((m: any) => ({
        name: m.name || m.Text,
        keyReference: m.keyReference,
        keyAvailable: m.keyAvailable,
      }));
    });
  }

  /**
   * Manually open the CRM module by triggering its icon click in the Desktop.
   * Useful when it doesn't auto-open (user has more than one module available).
   */
  async openCrmModuleManually(): Promise<void> {
    await this.page.evaluate(() => {
      const app = (window as any).myDesktopApp;
      if (!app) throw new Error("myDesktopApp not found on window");
      const data = (window as any).desktopData;
      const crmMod = data?.modules?.find(
        (m: any) =>
          m.keyReference === "WebCrm" ||
          (m.name && m.name.toLowerCase().includes("crm")),
      );
      if (!crmMod)
        throw new Error("CRM module not found in desktopData.modules");
      const modu = app.getModule(crmMod.idString);
      if (!modu)
        throw new Error(`Module not found by idString: ${crmMod.idString}`);
      modu.createWindow({ maximized: true });
    });
  }

  /**
   * Navigate directly to the local SgWebCrm app (sencha watch, default port 1843).
   * Injects the OAuth_Token cookie and applies resource-override rules so API calls
   * (/Rest/, /handler/, /js/, etc.) are proxied to GCS with the token.
   *
   * @param tokenFile - Absolute path to the file containing the OAuth token (e.g. .auth/crm-token.txt)
   * @param localPort - Port of the local sencha watch server (default 1843)
   */
  async gotoLocalCrm(tokenFile: string, localPort = 1843): Promise<void> {
    let token = "";
    if (fs.existsSync(tokenFile)) {
      token = fs.readFileSync(tokenFile, "utf-8").trim();
    } else {
      console.warn(`[CrmPage.gotoLocalCrm] Token file not found: ${tokenFile}`);
    }

    // Apply resource-override rules: intercept localhost API calls → GCS + token
    await applyResourceOverrideRules(this.page, token, localPort, false);

    // Set OAuth_Token cookie on localhost so ExtJS cookie reads work
    await this.page.context().addCookies([
      {
        name: "OAuth_Token",
        value: token,
        domain: "localhost",
        path: "/",
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await this.page.goto("/apps/SgWebCrm/", { waitUntil: "domcontentloaded" });
    await waitForExtReady(this.page);
  }

  /**
   * Wait for the CRM ExtJS viewport to be fully rendered (local mode — main page, no iframe).
   */
  async waitForCrmReadyLocal(timeout = 120_000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        if (!ext || !ext.isReady || !ext.ComponentQuery) return false;
        const vp = ext.ComponentQuery.query("viewport")[0];
        return !!(vp && vp.rendered);
      },
      undefined,
      { timeout, polling: 500 },
    );
    await waitForAjaxComplete(this.page as unknown as Page);
  }

  /**
   * Check whether the CRM viewport rendered (local mode — main page, no iframe).
   */
  async isCrmLoadedLocal(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ComponentQuery) return false;
      const vp = ext.ComponentQuery.query("viewport")[0];
      const center = ext.getCmp("center");
      return !!(vp && vp.rendered && center);
    });
  }
}
