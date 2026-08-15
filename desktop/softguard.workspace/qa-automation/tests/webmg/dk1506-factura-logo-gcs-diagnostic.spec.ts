import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { OrgFacturaConfigPage } from '../../src/pages/webmg/OrgFacturaConfigPage';
import {
  ADMIN_SEARCH_GCS_URL,
  DK1506_TEST_ORG_ID,
  captureEvidenceScreenshot,
  createEvidenceContext,
  openOrgFcGrid,
  openOrganizationById,
  setupMoneyguardRequestLog,
  waitForOrgGridLoaded,
} from './factura-config-support';
import { waitForExtReady } from '../../src/helpers/extjs';

const REPORT_ROOT = path.resolve(
  __dirname,
  '..',
  '..',
  'reports',
  'dk1506-factura-logo-gcs',
);

function readAuthToken(): string {
  const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
  return fs.readFileSync(tokenFile, 'utf-8').trim();
}

function getAuthStatePath(): string {
  return path.resolve(__dirname, '..', '..', '.auth', 'user.json');
}

test.describe('DK-1506 factura logo on deployed GCS @diagnostic @dk-1506', () => {
  const evidence = createEvidenceContext(
    REPORT_ROOT,
    'DK-1506 - Logo de Factura en GCS deployado',
    {
      environment: 'GCS deployed AdministratorSearch without local JS injection',
      spec: 'webmg/dk1506-factura-logo-gcs-diagnostic.spec.ts',
      project: 'diagnostic-gcs',
      appUrl: ADMIN_SEARCH_GCS_URL,
      tickets: ['DK-1506'],
      notes: [
        'Valida el controller servido por GCS, no el source local ni la inyección post-boot.',
        'El criterio principal es que el click en Subir logo abra la ventana de upload sin TypeError not a constructor.',
      ],
    },
  );

  test.beforeAll(async () => {
    await evidence.ensureDirs();
  });

  test.afterAll(async () => {
    await evidence.writeReports();
  });

  test('opens upload window from factura logo button using deployed controller', async ({ browser }) => {
    const token = readAuthToken();
    const context = await browser.newContext({
      storageState: getAuthStatePath(),
      ignoreHTTPSErrors: true,
      viewport: { width: 1920, height: 1080 },
    });

    await context.addCookies([{
      name: 'OAuth_Token',
      value: token,
      domain: 'gcs.softguard.com',
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'Lax',
    }]);

    const page = await context.newPage();
    const facturaConfig = new OrgFacturaConfigPage(page);
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      pageErrors.push(err.message);
    });

    await setupMoneyguardRequestLog(page, path.join(evidence.artifactsDir, 'moneyguard-urls.txt'));

    try {
      const cookies = await context.cookies('https://gcs.softguard.com');
      expect(cookies.some((cookie) => cookie.name === 'OAuth_Token' && !!cookie.value)).toBe(true);

      await page.goto(ADMIN_SEARCH_GCS_URL, { waitUntil: 'domcontentloaded', timeout: 120_000 });
      await waitForExtReady(page, 360_000);
      await openOrgFcGrid(page);
      await waitForOrgGridLoaded(page);
      await openOrganizationById(page, DK1506_TEST_ORG_ID);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();

      await facturaConfig.clickSubirLogo();

      await page.waitForFunction(
        () => {
          const ext = (window as any).Ext;
          const wins = ext?.ComponentQuery?.query('window{isVisible()}') || [];
          return wins.some((win: any) => {
            const image = win.down && win.down('#InvoiceLogoImage');
            return !!image && !!win.isVisible();
          });
        },
        undefined,
        { timeout: 30_000, polling: 500 },
      );

      const uploadVisible = await facturaConfig.isUploadWindowVisible();
      expect(uploadVisible).toBe(true);

      const joinedErrors = [...consoleErrors, ...pageErrors].join('\n');
      expect(joinedErrors).not.toMatch(/not a constructor/i);
      expect(joinedErrors).not.toMatch(/common\.view\.UploadButton/i);

      const screenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, 'dk1506-factura-logo-upload-window');
      evidence.add({
        check: 'El botón Subir logo abre la ventana de upload en GCS deployado',
        status: 'pass',
        details: {
          orgId: DK1506_TEST_ORG_ID,
          uploadVisible,
          consoleErrors,
          pageErrors,
        },
        screenshot,
      });
    } finally {
      await page.close();
      await context.close();
    }
  });
});
