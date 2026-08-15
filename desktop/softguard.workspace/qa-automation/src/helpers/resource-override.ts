import { Page, Route } from '@playwright/test';

interface OverrideRule {
  pattern: string;
  replacement: string;
  appendToken: boolean;
  tokenSeparator: '&' | '?';
}

/**
 * Replicates the Resource Override browser extension behavior in Playwright.
 * Intercepts requests from localhost and rewrites them to gcs.softguard.com,
 * appending the OAuth token where needed.
 */
export function buildOverrideRules(localPort: number): OverrideRule[] {
  const local = `http://localhost:${localPort}`;
  const remote = 'https://gcs.softguard.com';

  return [
    { pattern: `${local}/handler/**`, replacement: `${remote}/handler/`, appendToken: false, tokenSeparator: '&' },
    { pattern: `${local}/rest/**`,    replacement: `${remote}/rest/`,    appendToken: true, tokenSeparator: '?' },
    { pattern: `${local}/Rest/**`,    replacement: `${remote}/Rest/`,    appendToken: true, tokenSeparator: '?' },
    { pattern: `${local}/js/**`,      replacement: `${remote}/js/`,      appendToken: true, tokenSeparator: '?' },
    { pattern: `${local}/css/**`,     replacement: `${remote}/css/`,     appendToken: false, tokenSeparator: '&' },
    { pattern: `${local}/resources/**`, replacement: `${remote}/resources/`, appendToken: false, tokenSeparator: '&' },
    { pattern: `${local}/event-calendar/**`, replacement: `${remote}/event-calendar/`, appendToken: false, tokenSeparator: '&' },
    { pattern: `${local}/gallery/**`, replacement: `${remote}/gallery/`, appendToken: false, tokenSeparator: '&' },
  ];
}

/**
 * Apply Resource Override rules to a Playwright page.
 * This registers route handlers that intercept matching requests and redirect them.
 */
export async function applyResourceOverrideRules(
  page: Page,
  token: string,
  localPort: number,
  debug = false,
): Promise<void> {
  const rules = buildOverrideRules(localPort);
  const local = `http://localhost:${localPort}`;

  for (const rule of rules) {
    // Convert glob pattern to a regex-friendly URL prefix
    const prefix = rule.pattern.replace('/**', '/');

    await page.route(`${prefix}**`, async (route: Route) => {
      const originalUrl = route.request().url();
      // Replace localhost prefix with remote prefix
      let newUrl = originalUrl.replace(local, 'https://gcs.softguard.com');
      const shouldLogVerbose = debug && /\/Rest\/t_organizacion_fc\//i.test(originalUrl);

      if (rule.appendToken && token) {
        // Determine separator: if URL already has query params use &, otherwise use the configured separator
        const hasQuery = newUrl.includes('?');
        const sep = hasQuery ? '&' : rule.tokenSeparator;
        newUrl = `${newUrl}${sep}oauth_token=${token}`;
      }

      if (debug) {
        console.log(`[ResourceOverride] ${originalUrl} → ${newUrl}`);
      }

      // Fetch from the remote URL using Node.js native fetch to avoid
      // Playwright's API context which shares cookies/state with the browser.
      // GCS returns 500 when browser auth cookies conflict with oauth_token param.
      try {
        const fetchInit: RequestInit = {
          method: route.request().method(),
          redirect: 'follow',
        };
        // Forward body + content-type for POST/PUT requests
        const postData = route.request().postData();
        if (postData) {
          fetchInit.body = postData;
          const ct = route.request().headers()['content-type'];
          if (ct) fetchInit.headers = { 'content-type': ct };
        }

        if (shouldLogVerbose) {
          console.log(`[ResourceOverride][request] ${route.request().method()} ${originalUrl}`);
          if (postData) {
            console.log(`[ResourceOverride][request-body] ${postData}`);
          }
        }

        const resp = await fetch(newUrl, fetchInit);
        let body = Buffer.from(await resp.arrayBuffer());

        // Local WebMG/ExtJS boot expects `_UserData` to exist at app startup.
        // GCS `getDesktopData.js` exposes `desktopData`, so in local mode we
        // mirror the production global by deriving `_UserData` from that payload.
        if (/\/js\/Desktop\/getDesktopData\.js/i.test(newUrl)) {
          const text = body.toString('utf-8');
          if (text.includes('var desktopData =') && !text.includes('_UserData')) {
            body = Buffer.from(
              `${text}\nwindow._UserData = window._UserData || (window.desktopData && window.desktopData.infoUser) || {};\n`,
              'utf-8',
            );
          }
        }

        // Build response headers
        const headers: Record<string, string> = {};
        resp.headers.forEach((value, key) => {
          headers[key] = value;
        });
        headers['content-length'] = String(body.length);

        await route.fulfill({
          status: resp.status,
          headers,
          body,
        });

        if (debug && resp.status >= 400) {
          console.log(`[ResourceOverride] HTTP ${resp.status} from ${newUrl}`);
        }
        if (shouldLogVerbose && resp.status >= 400) {
          console.log(`[ResourceOverride][response] HTTP ${resp.status} ${newUrl}`);
          console.log(`[ResourceOverride][response-body] ${body.toString('utf-8').slice(0, 2000)}`);
        }
      } catch (err) {
        if (debug) {
          console.error(`[ResourceOverride] FAILED: ${newUrl}`, err);
        }
        await route.abort('connectionfailed');
      }
    });
  }
}
