import { test, expect, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * DSS-1544 — CRM deployado: restaurar botón "Eliminar Todo" para Landing.
 *
 * Valida el build publicado en una URL deployada de SgWebCrm sin depender de
 * registros reales ni ejecutar borrados. El test crea un contexto controlado
 * dentro de la app y abre el mismo modal de eliminación que usa producción.
 *
 * Prerrequisitos:
 *   1. Ejecutar auth setup CRM para generar .auth/crm-token.txt
 *      npx playwright test crm/crm-auth.setup.ts --project=crm-auth-setup
 *   2. Publicar el build y exportar la URL si difiere del default:
 *      $env:CRM_DSS1544_DEPLOY_URL="https://gcs.softguard.com/apps/SgWebCrm/DSS-1544-crm-eliminar-todo/"
 *
 * Ejecución:
 *   npx playwright test qa-automation/tests/crm/crm-dss1544-eliminar-todo-deploy.spec.ts --project=chromium --reporter=list
 */

const deployUrl =
  process.env.CRM_DSS1544_DEPLOY_URL ||
  "https://gcs.softguard.com/apps/SgWebCrm/DSS-1544-crm-eliminar-todo/";
const tokenFile = path.resolve(
  __dirname,
  "..",
  "..",
  ".auth",
  "crm-token.txt",
);
const screenshotsDir = path.resolve(
  __dirname,
  "..",
  "..",
  "reports",
  "dss1544-eliminar-todo-gcs",
);

test.beforeAll(() => {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

async function injectCrmToken(page: Page): Promise<void> {
  if (!fs.existsSync(tokenFile)) {
    throw new Error(
      `No existe el token CRM en ${tokenFile}. Ejecutar primero crm-auth.setup.ts.`,
    );
  }

  const token = fs.readFileSync(tokenFile, "utf8").trim();
  await page.context().addCookies([
    {
      name: "OAuth_Token",
      value: token,
      domain: "gcs.softguard.com",
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "Lax",
    },
  ]);
}

async function gotoDeployedCrm(page: Page): Promise<void> {
  await injectCrmToken(page);
  await page.goto(deployUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      if (!ext || !ext.isReady || !ext.ComponentQuery) {
        return false;
      }
      const vp = ext.ComponentQuery.query("viewport")[0];
      return !!(vp && vp.rendered);
    },
    undefined,
    { timeout: 120_000, polling: 500 },
  );
}

async function openDeleteDecisionHarness(
  page: Page,
  landing: boolean,
  hasDeleteAllRight: boolean,
) {
  return page.evaluate(
    ({ landing, hasDeleteAllRight }) => {
      const ext = (window as any).Ext;
      if (!ext) {
        throw new Error("Ext no está disponible en la app deployada");
      }

      ext.ComponentQuery.query("#decisionWindow").forEach((win: any) => {
        if (win && !win.destroyed) {
          win.close();
        }
      });

      const controller = ext.create("Common.controller.OrganizationFormController");
      const fakeView = {
        security: {
          modules: [],
          rights: {
            eliminarTodo: hasDeleteAllRight,
          },
          event: [],
        },
        recordSearch: {
          get: (field: string) =>
            field === "cnc_name" ? (landing ? "Landing" : "Prospecto") : null,
        },
        record: {
          get: (field: string) =>
            field === "cnc_name" ? (landing ? "Landing" : "Prospecto") : null,
        },
        down: (selector: string) => {
          if (selector === "#comonosconociocombo") {
            return {
              getRawValue: () => (landing ? "Landing" : "Prospecto"),
            };
          }
          return null;
        },
        on: () => undefined,
        up: () => null,
        contains: () => true,
      };

      const fakeButton = {
        up: (selector: string) =>
          selector === "organizationformview" ? fakeView : null,
      };

      controller.onDeleteDecisionClick(fakeButton as any, null, null);

      const win = ext.ComponentQuery.query("#decisionWindow")[0];
      if (!win) {
        throw new Error("No se abrió el decisionWindow");
      }

      const deleteBtn = win.down("#delete");
      const deleteAllBtn = win.down("#deleteAll");

      return {
        deleteText: deleteBtn ? deleteBtn.getText() : null,
        deleteAllExists: !!deleteAllBtn,
        deleteAllHidden: deleteAllBtn ? deleteAllBtn.isHidden() : null,
        deleteAllVisible: deleteAllBtn ? deleteAllBtn.isVisible() : null,
        landing,
        hasDeleteAllRight,
      };
    },
    { landing, hasDeleteAllRight },
  );
}

test.describe("DSS-1544 — Eliminar Todo en CRM deployado", () => {
  test("muestra 'Eliminar Todo' para contexto Landing con derecho eliminarTodo", async ({
    page,
  }) => {
    await gotoDeployedCrm(page);

    const result = await openDeleteDecisionHarness(page, true, true);

    await page.screenshot({
      path: path.join(screenshotsDir, "A-landing-con-derecho-modal.png"),
    });

    expect(result.deleteText).toBe("Eliminar Organización");
    expect(result.deleteAllExists).toBe(true);
    expect(result.deleteAllHidden).toBe(false);
    expect(result.deleteAllVisible).toBe(true);
  });

  test("oculta 'Eliminar Todo' fuera de Landing aunque el derecho exista", async ({
    page,
  }) => {
    await gotoDeployedCrm(page);

    const result = await openDeleteDecisionHarness(page, false, true);

    await page.screenshot({
      path: path.join(screenshotsDir, "B-no-landing-con-derecho-modal.png"),
    });

    expect(result.deleteAllExists).toBe(true);
    expect(result.deleteAllHidden).toBe(true);
    expect(result.deleteAllVisible).toBe(false);
  });

  test("oculta 'Eliminar Todo' en Landing si falta el derecho eliminarTodo", async ({
    page,
  }) => {
    await gotoDeployedCrm(page);

    const result = await openDeleteDecisionHarness(page, true, false);

    await page.screenshot({
      path: path.join(screenshotsDir, "C-landing-sin-derecho-modal.png"),
    });

    expect(result.deleteAllExists).toBe(true);
    expect(result.deleteAllHidden).toBe(true);
    expect(result.deleteAllVisible).toBe(false);
  });
});
