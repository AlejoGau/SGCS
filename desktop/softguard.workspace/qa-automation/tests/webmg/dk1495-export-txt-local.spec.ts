import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { test, expect } from '../../src/fixtures/auth.fixture';
import { ExportTxtPage } from '../../src/pages/webmg/ExportTxtPage';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';
import { findExportTxtDataset, decodeUtf8WithBom } from '../../src/helpers/exporttxt-test';

const GCS_BASE = 'https://gcs.softguard.com';
const TOKEN = fs.readFileSync(path.resolve(__dirname, '..', '..', '.auth', 'token.txt'), 'utf-8').trim();
const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1495-export-txt', 'local');
const SCREENSHOTS_DIR = path.join(REPORT_ROOT, 'screenshots');
const ARTIFACTS_DIR = path.join(REPORT_ROOT, 'artifacts');

async function ensureReportDirs(): Promise<void> {
  for (const dir of [REPORT_ROOT, SCREENSHOTS_DIR, ARTIFACTS_DIR]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

test.describe('WebMG > DK-1495 Exportación TXT mensual @dk-1495 @local', () => {
  test.beforeAll(async () => {
    await ensureReportDirs();
  });

  test('should open Exportación TXT mensual from the Facturación menu', async ({ page, navigateToApp }) => {
    const webmg = new WebMGPage(page);
    const exportTxt = new ExportTxtPage(page);

    await navigateToApp('/apps/WebMG/');
    await webmg.waitForReadyLocal(180_000);

    const menuItemExists = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const toolbar = ext?.ComponentQuery?.query('#north')[0];
      const facturacionButton = toolbar?.items?.getRange?.().find((button: any) => button.text === 'Facturación');
      const items = facturacionButton?.menu?.items?.getRange?.() || [];
      return items.some((item: any) => item.itemId === 'exportTxt' && /TXT/i.test(item.text || ''));
    });
    expect(menuItemExists).toBe(true);

    await webmg.openMenuItem('Facturación', 'exportTxt');
    await exportTxt.waitForForm();
    await exportTxt.waitForOrganizationsLoaded();

    const state = await exportTxt.getState();
    expect(state.orgCount).toBeGreaterThan(0);
    expect(state.periodo).toMatch(/^\d{6}$/);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1495-local-01-menu-opened-form.png'),
      fullPage: false,
    });
  });

  test('should export TXT from the real local menu flow using the live handler', async ({ page, navigateToApp, request }) => {
    const webmg = new WebMGPage(page);
    const exportTxt = new ExportTxtPage(page);

    await navigateToApp('/apps/WebMG/');
    await webmg.waitForReadyLocal(180_000);
    await webmg.openMenuItem('Facturación', 'exportTxt');
    await exportTxt.waitForForm();
    await exportTxt.waitForOrganizationsLoaded();

    const organizations = await exportTxt.getOrganizations();
    const dataset = await findExportTxtDataset(request, TOKEN, organizations, { baseUrl: GCS_BASE, monthsBack: 18 });

    expect(dataset, 'Debe existir un dataset exportable para validar la exportación TXT local').not.toBeNull();
    if (!dataset) {
      return;
    }

    await exportTxt.selectOrganization(dataset.orgId);
    await exportTxt.waitForDependentFiltersReady();
    await exportTxt.setPeriodo(dataset.periodo);

    const state = await exportTxt.getState();
    expect(state.orgValue).toBe(dataset.orgId);
    expect(state.periodo).toBe(dataset.periodo);
    expect(state.exportDisabled).toBe(false);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1495-local-02-form-ready-to-export.png'),
      fullPage: false,
    });

    await exportTxt.enableWindowOpenCapture();
    await exportTxt.clickExport();
    const openedUrl = await exportTxt.waitForOpenedUrl();
    const openedAbsoluteUrl = new URL(openedUrl, GCS_BASE);

    expect(openedAbsoluteUrl.pathname).toBe('/handler/ExportTxtMG');
    expect(openedAbsoluteUrl.searchParams.get('orgId')).toBe(String(dataset.orgId));
    expect(openedAbsoluteUrl.searchParams.get('periodo')).toBe(dataset.periodo);
    expect(openedAbsoluteUrl.searchParams.get('oauth_token')).toBeTruthy();
    expect(openedAbsoluteUrl.searchParams.get('token')).toBeTruthy();
    expect(openedAbsoluteUrl.searchParams.get('token')).toBe(openedAbsoluteUrl.searchParams.get('oauth_token'));

    const emittedResponse = await request.get(openedAbsoluteUrl.toString(), { timeout: 60_000 });
    expect(emittedResponse.ok(), `El handler ExportTxtMG debe responder OK para ${openedAbsoluteUrl.toString()}`).toBe(true);

    // In local mode the browser token can differ from the stable QA token used for probes.
    // Validate the exact URL emitted by the UI, but verify the exported content with the
    // known-good fixture token so the assertion is not coupled to per-session browser auth.
    const verificationUrl = new URL(openedAbsoluteUrl.toString());
    verificationUrl.searchParams.set('oauth_token', TOKEN);

    const response = await request.get(verificationUrl.toString(), { timeout: 60_000 });
    expect(response.ok(), `El handler ExportTxtMG debe responder OK para ${verificationUrl.toString()}`).toBe(true);

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
      expect(detailLines.length, 'Cuando hay comprobantes reales para el dataset elegido, el TXT debe incluir líneas D|').toBeGreaterThan(0);
    } else {
      console.warn('[DK-1495 local] No se encontraron líneas D| en los últimos 18 meses; se valida estructura H/T.');
    }

    const exportTxtPath = path.join(ARTIFACTS_DIR, `dk1495-local-export-${dataset.periodo}.txt`);
    const metadataPath = path.join(ARTIFACTS_DIR, `dk1495-local-export-${dataset.periodo}.json`);
    await fsp.writeFile(exportTxtPath, buffer);
    await fsp.writeFile(metadataPath, JSON.stringify({
      organization: dataset.orgName,
      orgId: dataset.orgId,
      periodo: dataset.periodo,
      openedUrl: openedAbsoluteUrl.toString(),
      verificationUrl: verificationUrl.toString(),
      uiTokenMatchesFixture: openedAbsoluteUrl.searchParams.get('oauth_token') === TOKEN,
      fileName: contentDisposition,
      detailCount: detailLines.length,
      firstLines: lines.slice(0, 5),
    }, null, 2), 'utf-8');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1495-local-03-export-triggered.png'),
      fullPage: false,
    });
  });
});
