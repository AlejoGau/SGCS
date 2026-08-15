import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

// Auth always goes to GCS to obtain the OAuth token
const gcsBaseURL = process.env.BASE_URL || "https://gcs.softguard.com";
// Tests run against local Sencha watch server
const localBaseURL = process.env.LOCAL_BASE_URL || "http://localhost:1841";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1, // ExtJS apps don't handle concurrent sessions well
  timeout: 600_000, // 10 min per test — GCS unbundled (?version=) can take 5+ min to load
  expect: {
    timeout: 15_000,
  },

  reporter: [
    ["html", { outputFolder: "reports/html", open: "never" }],
    ["json", { outputFile: "reports/json/results.json" }],
    [
      "./src/reporters/agent-reporter.ts",
    ],
  ],

  use: {
    trace: "on-first-retry",
    screenshot: "on",
    video: "retain-on-failure",
    actionTimeout: 30_000,
    navigationTimeout: 360_000, // 6 min — GCS unbundled app navigation is very slow
    locale: "es-AR",
    timezoneId: "America/Argentina/Buenos_Aires",
  },

  projects: [
    // Auth setup — logs into GCS to get OAuth token, saves state
    {
      name: "auth-setup",
      testDir: "./tests",
      testMatch: "auth.setup.ts",
      use: {
        baseURL: gcsBaseURL,
      },
    },
    // Diagnostic project — loads directly from GCS (no resource-override)
    {
      name: "diagnostic-gcs",
      testDir: "./tests",
      testMatch:
        /(diagnostic|blank-form-diagnose|inspect-controllers|formview-trace)\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },
    // GCS WebMG — runs directly against a deployed GCS build path
    {
      name: "gcs-webmg",
      testDir: "./tests",
      testMatch: /webmg\/.*-gcs\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },
    // Main test suite — runs against localhost with resource-override
    {
      name: "chromium",
      testDir: "./tests",
      testIgnore: [
        "auth.setup.ts",
        "diagnostic.spec.ts",
        "webmg/factura-config.spec.ts",
        "webmg/factura-config-local.spec.ts",
        "webmg/dk1496-afip-audit.spec.ts",
        "webmg/dk1496-afip-adminsearch-ui.spec.ts",
        "webmg/dk1495-export-txt.spec.ts",
        "webmg/dk1495-export-txt-local.spec.ts",
        "webmg/explore-dom.spec.ts",
        "webmg/dk1498-ui-real.spec.ts",
        "webmg/dk1500-bonificacion-layout-local.spec.ts",
        "webmg/dk1500-bonificacion-layout.spec.ts",
        "webmg/dk1500-bonificacion-webmg-deploy.spec.ts",
        "webmg/dk1654-categorias-impositivas-local.spec.ts",
        "webmg/dk1654-categorias-impositivas.spec.ts",
        "crm/crm-auth.setup.ts",
        "crm/crm-module-open.spec.ts",
        "crm/crm-module-local.spec.ts",
        "crm/crm-mail-attach.spec.ts",
        "crm/crm-mail-attach-local.spec.ts",
        "crm/crm-1511-auth.setup.ts",
        "crm/crm-1511.spec.ts",
        "crm/crm-1511-local.spec.ts",
        "crm/crm-1512.spec.ts",
        "crm/crm-1512-local.spec.ts",
        "crm/crm-1512-screenshots.spec.ts",
        "crm/crm-1512-masivo-local.spec.ts",
        "crm/crm-37180-masivo-filtro-unico.spec.ts",
        "crm/crm-37180-masivo-filtro-unico-local.spec.ts",
        "crm/crm-push-masivo-bloqueo.spec.ts",
        "crm/crm-push-masivo-bloqueo-local.spec.ts",
      ],
      use: {
        ...devices["Desktop Chrome"],
        baseURL: localBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // CRM auth setup — logs in as pruebacas@soporte.com and saves session (DSS-1497)
    {
      name: "crm-auth-setup",
      testDir: "./tests",
      testMatch: "crm/crm-auth.setup.ts",
      use: {
        baseURL: gcsBaseURL,
      },
    },

    // CRM tests — run directly against GCS with the CRM test user session (DSS-1497)
    {
      name: "crm-gcs",
      testDir: "./tests",
      testMatch: "crm/crm-module-open.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/crm-user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // CRM local — runs against sencha watch (localhost:1843) with resource-override to GCS (DSS-1497)
    {
      name: "crm-local",
      testDir: "./tests",
      testMatch: "crm/crm-module-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CRM_LOCAL_BASE_URL || "http://localhost:1843",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },
    // DSS-1498: mail attachment — GCS (sin fix, documenta el bug)
    {
      name: "crm-mail-attach-gcs",
      testDir: "./tests",
      testMatch: "crm/crm-mail-attach.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/crm-user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // DSS-1498: mail attachment — local (verifica el fix)
    {
      name: "crm-mail-attach-local",
      testDir: "./tests",
      testMatch: "crm/crm-mail-attach-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CRM_LOCAL_BASE_URL || "http://localhost:1843",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // DSS-1511: dealer org filter — auth setup (thtestdealer@softguard.com)
    {
      name: "crm-1511-auth-setup",
      testDir: "./tests",
      testMatch: "crm/crm-1511-auth.setup.ts",
      use: {
        baseURL: gcsBaseURL,
      },
    },

    // DSS-1511: dealer org filter — GCS (sin fix, documenta el bug — se espera que falle)
    {
      name: "crm-1511-gcs",
      testDir: "./tests",
      testMatch: "crm/crm-1511.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/crm-dealer-user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-1511-auth-setup"],
    },

    // DSS-1511: dealer org filter — local (con fix, debe pasar)
    {
      name: "crm-1511-local",
      testDir: "./tests",
      testMatch: "crm/crm-1511-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CRM_LOCAL_BASE_URL || "http://localhost:1843",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-1511-auth-setup"],
    },

    // DSS-1512: campo Para oculto + label incorrecto — GCS (sin fix, documenta el bug)
    {
      name: "crm-1512-gcs",
      testDir: "./tests",
      testMatch: "crm/crm-1512.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/crm-user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // DSS-1512: capturas visuales del fix (script utilitario)
    {
      name: "crm-1512-screenshots",
      testDir: "./tests",
      testMatch: "crm/crm-1512-screenshots.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CRM_LOCAL_BASE_URL || "http://localhost:1843",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // DSS-1512: campo Para oculto + label incorrecto — local (verifica el fix)
    {
      name: "crm-1512-local",
      testDir: "./tests",
      testMatch: "crm/crm-1512-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CRM_LOCAL_BASE_URL || "http://localhost:1843",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // DSS-1512 / masivo: Para debe ocultarse en Envío masivo — local (verifica la corrección)
    {
      name: "crm-1512-masivo-local",
      testDir: "./tests",
      testMatch: "crm/crm-1512-masivo-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CRM_LOCAL_BASE_URL || "http://localhost:1843",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // Ticket #37180-724-VSJ: envío masivo con filtro que deja 1 organización — local
    {
      name: "crm-37180-masivo-filtro-unico-local",
      testDir: "./tests",
      testMatch: "crm/crm-37180-masivo-filtro-unico-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CRM_LOCAL_BASE_URL || "http://localhost:1843",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // Ticket #37180-724-VSJ: envio masivo con filtro que deja 1 organizacion — GCS/deploy
    {
      name: "crm-37180-masivo-filtro-unico-gcs",
      testDir: "./tests",
      testMatch: "crm/crm-37180-masivo-filtro-unico.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/crm-user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // CRM push masivo: bloqueo del botón Enviar durante generación — local
    {
      name: "crm-push-masivo-bloqueo-local",
      testDir: "./tests",
      testMatch: "crm/crm-push-masivo-bloqueo-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CRM_LOCAL_BASE_URL || "http://localhost:1843",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // CRM push masivo: validación del build deployado en GCS
    {
      name: "crm-push-masivo-bloqueo-gcs",
      testDir: "./tests",
      testMatch: "crm/crm-push-masivo-bloqueo.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/crm-user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["crm-auth-setup"],
    },

    // DK-1498 WebMG local — real UI integration tests against /apps/WebMG/ served by the
    // workspace-mapping sencha watch on localhost:1841 (workspace root → all apps reachable).
    // APIs (/Rest/, /rest/, /handler/, /js/) are proxied to GCS via resource-override.
    {
      name: "webmg-local",
      testDir: "./tests",
      testMatch: "webmg/dk1498-ui-real.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.WEBMG_LOCAL_BASE_URL || "http://localhost:1841",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1500 / DK-1501: bonificación en contrato — layout local en AdministratorSearch
    {
      name: "webmg-dk1500-layout-local",
      testDir: "./tests",
      testMatch: "webmg/dk1500-bonificacion-layout-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.ADMINSEARCH_LOCAL_BASE_URL || "http://localhost:1844/apps/AdministratorSearch/",
        viewport: { width: 1366, height: 900 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1500 / DK-1501: bonificación en contrato — deploy publicado en GCS
    {
      name: "webmg-dk1500-layout-gcs",
      testDir: "./tests",
      testMatch: "webmg/dk1500-bonificacion-layout.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1366, height: 900 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1500 / DK-1501: bonificación en contrato — WebMG deploy directo publicado en GCS
    {
      name: "webmg-dk1500-webmg-deploy",
      testDir: "./tests",
      testMatch: "webmg/dk1500-bonificacion-webmg-deploy.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1366, height: 900 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1654: categorías impositivas automáticas — local (watch AdministratorSearch en :1844)
    {
      name: "webmg-dk1654-local",
      testDir: "./tests",
      testMatch: "webmg/dk1654-categorias-impositivas-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.ADMINSEARCH_LOCAL_BASE_URL || "http://localhost:1844/apps/AdministratorSearch/",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1654: categorías impositivas automáticas — GCS/deploy publicado
    {
      name: "webmg-dk1654-gcs",
      testDir: "./tests",
      testMatch: "webmg/dk1654-categorias-impositivas.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1493 / DK-1494 factura config — GCS app with local JS injection
    {
      name: "webmg-factura-config-gcs",
      testDir: "./tests",
      testMatch: "webmg/factura-config.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1493 / DK-1494 / DK-1506 / DK-1507 factura config — local AdministratorSearch bundle
    {
      name: "webmg-factura-config-local",
      testDir: "./tests",
      testMatch: "webmg/factura-config-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.LOCAL_ADMINSEARCH_BASE_URL || "http://localhost:1841",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup", "crm-auth-setup"],
    },

    // DK-1496 AFIP — auditoría read-only contra GCS con evidencia visual
    {
      name: "webmg-dk1496-afip-gcs",
      testDir: "./tests",
      testMatch: "webmg/dk1496-afip-audit.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1496 AFIP — evidencia UI real en AdministratorSearch sobre GCS con ?version=
    {
      name: "webmg-dk1496-adminsearch-gcs",
      testDir: "./tests",
      testMatch: "webmg/dk1496-afip-adminsearch-ui.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1495 TXT export — GCS app with local ExportTxt classes injected after boot
    {
      name: "webmg-dk1495-gcs",
      testDir: "./tests",
      testMatch: "webmg/dk1495-export-txt.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: gcsBaseURL,
        storageState: ".auth/user.json",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },

    // DK-1495 TXT export — local WebMG via workspace-mapped Sencha watch
    {
      name: "webmg-dk1495-local",
      testDir: "./tests",
      testMatch: "webmg/dk1495-export-txt-local.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.WEBMG_LOCAL_BASE_URL || "http://localhost:1841",
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
      },
      dependencies: ["auth-setup"],
    },
  ],

  // Output directory for test artifacts (screenshots, videos, traces)
  outputDir: "reports/test-artifacts",
});
