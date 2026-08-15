import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { Page } from '@playwright/test';
import { test, expect } from '../../src/fixtures/auth.fixture';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';
import { ExportTxtPage } from '../../src/pages/webmg/ExportTxtPage';
import { findExportTxtDataset, decodeUtf8WithBom } from '../../src/helpers/exporttxt-test';

const DEPLOY_URL = (process.env.WEBMG_DEPLOY_URL || 'https://gcs.softguard.com/apps/WebMG/DK-1493-DK-1498-facturacion-moneyguard').trim();
const DEPLOY_ORIGIN = new URL(DEPLOY_URL).origin;
const TOKEN = fs.readFileSync(path.resolve(__dirname, '..', '..', '.auth', 'token.txt'), 'utf-8').trim();
const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'deploy-sprint2-webmg-dk1493-dk1498');
const SCREENSHOTS_DIR = path.join(REPORT_ROOT, 'screenshots');
const ARTIFACTS_DIR = path.join(REPORT_ROOT, 'artifacts');

async function ensureReportDirs(): Promise<void> {
  for (const dir of [REPORT_ROOT, SCREENSHOTS_DIR, ARTIFACTS_DIR]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

async function requireAuthenticatedSession(page: Page): Promise<void> {
  const cookies = await page.context().cookies(DEPLOY_URL);
  const hasAspSession = cookies.some((cookie) => cookie.name === 'ASP.NET_SessionId');
  const hasOAuthToken = cookies.some((cookie) => cookie.name === 'OAuth_Token');

  if (!hasAspSession || !hasOAuthToken) {
    throw new Error(
      'El deploy directo de WebMG debe abrirse con una sesión autenticada real (ASP.NET_SessionId + OAuth_Token). Ejecutá este spec con un proyecto que cargue storageState .auth/user.json, por ejemplo --project=chromium.',
    );
  }
}

async function gotoDeploy(page: Page): Promise<void> {
  await requireAuthenticatedSession(page);

  await page.goto(DEPLOY_URL, {
    waitUntil: 'domcontentloaded',
  });
  await waitForExtReady(page, 360_000);
  try {
    await waitForAjaxComplete(page, 60_000);
  } catch {
    // If bootstrap is broken, we still want diagnostics from the page state.
  }
  await page.waitForTimeout(3_000);
}

function attachPageDiagnostics(page: Page): {
  consoleErrors: string[];
  pageErrors: string[];
  requestFailures: string[];
  httpErrors: string[];
} {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const requestFailures: string[] = [];
  const httpErrors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });

  page.on('requestfailed', (req) => {
    requestFailures.push(`${req.url()} :: ${req.failure()?.errorText || 'unknown error'}`);
  });

  page.on('response', (resp) => {
    if (resp.status() >= 400) {
      httpErrors.push(`${resp.status()} :: ${resp.url()}`);
    }
  });

  return {
    consoleErrors,
    pageErrors,
    requestFailures,
    httpErrors,
  };
}

async function waitForWebMGViewport(page: Page, timeout = 15_000): Promise<boolean> {
  try {
    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const vp = ext?.ComponentQuery?.query('viewport')[0];
        const north = ext?.ComponentQuery?.query('#north')[0];
        const center = ext?.getCmp?.('center');
        return !!(ext && ext.isReady && vp && north && center);
      },
      undefined,
      { timeout, polling: 500 },
    );
    return true;
  } catch {
    return false;
  }
}

async function collectRuntimeState(page: Page): Promise<Record<string, unknown>> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const toolbar = ext?.ComponentQuery?.query('#north')[0];
    const facturacionButton = toolbar?.items?.getRange?.().find((button: any) => button.text === 'Facturación');
    const items = facturacionButton?.menu?.items?.getRange?.() || [];

    return {
      href: window.location.href,
      title: document.title,
      bodyText: (document.body?.innerText || '').trim().slice(0, 500),
      extReady: !!ext?.isReady,
      viewportOk: !!ext?.ComponentQuery?.query('viewport')[0],
      northOk: !!toolbar,
      centerOk: !!ext?.getCmp?.('center'),
      exportTxtController: !!ext?.ClassManager?.get('WebMG.controller.ExportTxtFormController'),
      exportTxtView: !!ext?.ClassManager?.get('WebMG.view.ExportTxtFormView'),
      appInstance: !!ext?.app?.Application?.instance,
      desktopDataKeys: Object.keys((window as any).desktopData || {}),
      userDataKeys: Object.keys((window as any)._UserData || {}),
      menuItems: items.map((item: any) => ({
        itemId: item.itemId,
        text: item.text,
      })),
    };
  });
}

async function openExportTxtFromMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const toolbar = ext?.ComponentQuery?.query('#north')[0];
    const facturacionButton = toolbar?.items?.getRange?.().find((button: any) => button.text === 'Facturación');
    if (!facturacionButton) {
      throw new Error('Facturación menu button not found');
    }
    facturacionButton.showMenu();
  });

  await page.waitForTimeout(300);

  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const item = ext?.ComponentQuery?.query('#exportTxt')[0];
    if (!item) {
      throw new Error('Exportación TXT mensual menu item not found');
    }
    item.fireEvent('click', item);
  });

  await waitForAjaxComplete(page, 60_000);
}

test.describe('WebMG deployed Sprint 2 audit @deploy @dk-1494 @dk-1495', () => {
  test.beforeAll(async () => {
    await ensureReportDirs();
  });

  test('should boot the deployed WebMG bundle and expose the Sprint 2 export menu', async ({ page }) => {
    const browserDiagnostics = attachPageDiagnostics(page);
    await gotoDeploy(page);
    const viewportReady = await waitForWebMGViewport(page);

    const state = await collectRuntimeState(page);

    expect(state.viewportOk).toBe(true);
    expect(state.northOk).toBe(true);
    expect(state.centerOk).toBe(true);
    expect(state.exportTxtController).toBe(true);
    expect(state.exportTxtView).toBe(true);
    expect(state.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ itemId: 'facturadorContrato' }),
        expect.objectContaining({ itemId: 'facturadorwizard' }),
        expect.objectContaining({ itemId: 'exportTxt', text: 'Exportación TXT mensual' }),
      ]),
    );

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01-webmg-deploy-loaded.png'),
      fullPage: false,
    });

    await fsp.writeFile(
      path.join(ARTIFACTS_DIR, '01-webmg-deploy-state.json'),
      JSON.stringify({ viewportReady, state, browserDiagnostics }, null, 2),
      'utf-8',
    );
  });

  test('should generate the TXT export from the deployed WebMG bundle without local injection', async ({ page, request }) => {
    const browserDiagnostics = attachPageDiagnostics(page);
    await gotoDeploy(page);
    const viewportReady = await waitForWebMGViewport(page);
    if (!viewportReady) {
      const state = await collectRuntimeState(page);
      await fsp.writeFile(
        path.join(ARTIFACTS_DIR, '02-export-ui-boot-failure.json'),
        JSON.stringify({ state, browserDiagnostics }, null, 2),
        'utf-8',
      );
    }
    expect(viewportReady, 'El deploy debe bootear completamente antes de abrir el flujo de exportación TXT').toBe(true);
    await openExportTxtFromMenu(page);

    const exportTxt = new ExportTxtPage(page);
    await exportTxt.waitForForm(60_000);
    await exportTxt.waitForOrganizationsLoaded(60_000);

    const stateBefore = await exportTxt.getState();
    const organizations = await exportTxt.getOrganizations();

    expect(stateBefore.orgCount).toBeGreaterThan(0);
    expect(organizations.length).toBeGreaterThan(0);

    const dataset = await findExportTxtDataset(request, TOKEN, organizations, {
      baseUrl: DEPLOY_ORIGIN,
      monthsBack: 18,
    });

    expect(dataset, 'Debe existir al menos un dataset exportable para el deploy real de WebMG').not.toBeNull();
    if (!dataset) {
      return;
    }

    await exportTxt.selectOrganization(dataset.orgId);
    await exportTxt.waitForDependentFiltersReady(60_000);
    await exportTxt.setPeriodo(dataset.periodo);

    const state = await exportTxt.getState();
    expect(state.orgValue).toBe(dataset.orgId);
    expect(state.periodo).toBe(dataset.periodo);
    expect(state.exportDisabled).toBe(false);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02-export-txt-form-ready.png'),
      fullPage: false,
    });

    await exportTxt.enableWindowOpenCapture();
    await exportTxt.clickExport();
    const openedUrl = await exportTxt.waitForOpenedUrl(20_000);
    const openedAbsoluteUrl = new URL(openedUrl, DEPLOY_ORIGIN);

    expect(openedAbsoluteUrl.pathname).toBe('/handler/ExportTxtMG');
    expect(openedAbsoluteUrl.searchParams.get('orgId')).toBe(String(dataset.orgId));
    expect(openedAbsoluteUrl.searchParams.get('periodo')).toBe(dataset.periodo);
    expect(openedAbsoluteUrl.searchParams.get('oauth_token')).toBeTruthy();
    expect(openedAbsoluteUrl.searchParams.get('token')).toBeTruthy();
    expect(openedAbsoluteUrl.searchParams.get('token')).toBe(openedAbsoluteUrl.searchParams.get('oauth_token'));

    const response = await request.get(openedAbsoluteUrl.toString(), { timeout: 60_000 });
    expect(response.ok(), `El handler ExportTxtMG debe responder OK para ${openedAbsoluteUrl.toString()}`).toBe(true);

    const buffer = await response.body();
    const text = decodeUtf8WithBom(buffer);
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const detailLines = lines.filter((line) => line.startsWith('D|'));
    const contentDisposition = response.headers()['content-disposition'] || '';

    expect(lines[0]).toMatch(/^H\|/);
    expect(lines[lines.length - 1]).toMatch(/^T\|/);
    expect(contentDisposition).toContain('.txt');
    expect(contentDisposition).toContain(dataset.periodo);

    if (dataset.detailCount > 0) {
      expect(detailLines.length).toBeGreaterThan(0);
    }

    await fsp.writeFile(path.join(ARTIFACTS_DIR, `02-export-txt-${dataset.periodo}.txt`), buffer);
    await fsp.writeFile(
      path.join(ARTIFACTS_DIR, `02-export-txt-${dataset.periodo}.json`),
      JSON.stringify(
        {
          organization: dataset.orgName,
          orgId: dataset.orgId,
          periodo: dataset.periodo,
          openedUrl: openedAbsoluteUrl.toString(),
          detailCount: detailLines.length,
          fileName: contentDisposition,
          firstLines: lines.slice(0, 5),
        },
        null,
        2,
      ),
      'utf-8',
    );

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '03-export-txt-triggered.png'),
      fullPage: false,
    });
  });

  test('should respond from the live ExportTxtMG handler for the known Sprint 2 dataset', async ({ request }) => {
    const directUrl = `${DEPLOY_ORIGIN}/handler/ExportTxtMG?orgId=14&periodo=202605&oauth_token=${encodeURIComponent(TOKEN)}`;
    const response = await request.get(directUrl, { timeout: 60_000 });
    expect(response.ok(), `El handler ExportTxtMG debe responder OK para ${directUrl}`).toBe(true);

    const buffer = await response.body();
    const text = decodeUtf8WithBom(buffer);
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

    expect(lines[0]).toMatch(/^H\|/);
    expect(lines[lines.length - 1]).toMatch(/^T\|/);

    await fsp.writeFile(path.join(ARTIFACTS_DIR, '03-export-handler-direct-202605.txt'), buffer);
    await fsp.writeFile(
      path.join(ARTIFACTS_DIR, '03-export-handler-direct-202605.json'),
      JSON.stringify({ directUrl, firstLines: lines.slice(0, 5) }, null, 2),
      'utf-8',
    );
  });

  test('should render DK-1494 payment methods in the live ComprobantePdfMG preview handler', async ({ page, request }) => {
    const previewOrgId = 14;

    const metadata = {
      factura: {
        observaciones_template: 'Obs deploy DK1494 {{cliente_nombre}}',
        footer_fijo: 'Foot deploy DK1494',
        integraciones_pago: {
          transferencia: {
            habilitado: true,
            banco: 'Banco Nación',
            cbu: '2850590940090418135201',
            alias: 'softguard.cobros',
            titular: 'SoftGuard SA',
            cuit_titular: '30-12345678-9',
          },
          mercadopago: {
            habilitado: true,
            tipo: 'link_fijo',
            url: 'https://mpago.la/softguard-demo',
            mostrar_qr: true,
          },
          pagofacil: {
            habilitado: true,
            codigo_entidad: '654321',
            template_codigo: '{{codigo_entidad}}{{cliente_numero}}',
          },
          rapipago: {
            habilitado: true,
            codigo_entidad: '112233',
            template_codigo: '{{codigo_entidad}}{{cliente_numero}}',
          },
          debito_automatico: {
            habilitado: true,
            texto: 'El importe será debitado automáticamente de la cuenta informada.',
          },
        },
      },
    };

    const previewUrl = `${DEPLOY_ORIGIN}/handler/ComprobantePdfMG?preview=true&orgId=${encodeURIComponent(String(previewOrgId))}&metadata=${encodeURIComponent(JSON.stringify(metadata))}&oauth_token=${encodeURIComponent(TOKEN)}`;
    const previewResponse = await request.get(previewUrl, { timeout: 60_000 });
    expect(previewResponse.ok(), `El preview handler debe responder OK para ${previewUrl}`).toBe(true);

    await page.goto(previewUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(
      () => document.body && document.body.innerText.includes('MEDIOS DE PAGO'),
      undefined,
      { timeout: 60_000, polling: 300 },
    );

    const html = await page.content();
    expect(html).toContain('VISTA PREVIA');
    expect(html).toContain('MEDIOS DE PAGO');
    expect(html).toContain('Transferencia bancaria');
    expect(html).toContain('Banco Nación');
    expect(html).toContain('Mercado Pago');
    expect(html).toContain('https://mpago.la/softguard-demo');
    expect(html).toContain('Pago Fácil');
    expect(html).toContain('Rapipago');
    expect(html).toContain('Débito automático');
    expect(html).toContain('Obs deploy DK1494');
    expect(html).toContain('Foot deploy DK1494');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '04-comprobante-preview-medios-pago.png'),
      fullPage: true,
    });

    await fsp.writeFile(
      path.join(ARTIFACTS_DIR, '04-comprobante-preview.html'),
      html,
      'utf-8',
    );
    await fsp.writeFile(
      path.join(ARTIFACTS_DIR, '04-comprobante-preview.json'),
      JSON.stringify({ previewOrgId, previewUrl }, null, 2),
      'utf-8',
    );
  });
});
