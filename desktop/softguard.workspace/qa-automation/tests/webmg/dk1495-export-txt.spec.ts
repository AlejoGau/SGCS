import { Frame, Page } from '@playwright/test';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { test, expect } from '../../src/fixtures/auth.fixture';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';
import { ExportTxtPage } from '../../src/pages/webmg/ExportTxtPage';
import { findExportTxtDataset, decodeUtf8WithBom } from '../../src/helpers/exporttxt-test';

// On GCS, WebMG boots through the /a/ gateway and renders the real app inside an iframe.
const WEBMG_GCS_URL = 'https://gcs.softguard.com/a/WebMG?version=';
const GCS_BASE = 'https://gcs.softguard.com';
const TOKEN = fs.readFileSync(path.resolve(__dirname, '..', '..', '.auth', 'token.txt'), 'utf-8').trim();
const WORKSPACE_ROOT = path.resolve(__dirname, '..', '..', '..');
const COMMON_MODEL_DIR = path.join(WORKSPACE_ROOT, 'packages', 'local', 'common', 'src', 'model');
const WEBMG_APP_DIR = path.join(WORKSPACE_ROOT, 'apps', 'WebMG', 'app');
const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1495-export-txt', 'gcs');
const SCREENSHOTS_DIR = path.join(REPORT_ROOT, 'screenshots');
const ARTIFACTS_DIR = path.join(REPORT_ROOT, 'artifacts');

async function ensureReportDirs(): Promise<void> {
  for (const dir of [REPORT_ROOT, SCREENSHOTS_DIR, ARTIFACTS_DIR]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

async function getWebMGAppFrame(page: Page, timeout = 120_000): Promise<Frame> {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const frames = page.frames();
    const frame =
      frames.find((candidate) => candidate !== page.mainFrame() && candidate.url().includes('/apps/WebMG/')) ??
      frames.find((candidate) => candidate !== page.mainFrame() && candidate.url().includes('/a/WebMG')) ??
      frames.find((candidate) => candidate !== page.mainFrame() && /WebMG/i.test(candidate.url()));

    if (frame) {
      return frame;
    }

    await page.waitForTimeout(500);
  }

  throw new Error(
    `WebMG iframe not found after ${timeout}ms. Frames: ${page.frames().map((frame) => frame.url()).join(', ')}`,
  );
}

async function waitForWebMGViewport(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const vp = ext?.ComponentQuery?.query('viewport')[0];
      const north = ext?.ComponentQuery?.query('#north')[0];
      return !!(ext && ext.isReady && vp && north);
    },
    undefined,
    { timeout: 360_000, polling: 500 },
  );
  await waitForAjaxComplete(page, 60_000);
}

async function injectExportTxtFormClasses(page: Page): Promise<void> {
  const sources = [
    {
      className: 'Common.model.t_organizacion_fcSearchModel',
      src: await fsp.readFile(path.join(COMMON_MODEL_DIR, 't_organizacion_fcSearchModel.js'), 'utf-8'),
    },
    {
      className: 'Common.model.t_comprobantes_fcSearchModel',
      src: await fsp.readFile(path.join(COMMON_MODEL_DIR, 't_comprobantes_fcSearchModel.js'), 'utf-8'),
    },
    {
      className: 'Common.model.t_categorias_impositivas_fcSearchModel',
      src: await fsp.readFile(path.join(COMMON_MODEL_DIR, 't_categorias_impositivas_fcSearchModel.js'), 'utf-8'),
    },
    {
      className: 'WebMG.model.t_organizacion_fcSearchModel',
      src: await fsp.readFile(path.join(WEBMG_APP_DIR, 'model', 't_organizacion_fcSearchModel.js'), 'utf-8'),
    },
    {
      className: 'WebMG.model.t_comprobantes_fcSearchModel',
      src: await fsp.readFile(path.join(WEBMG_APP_DIR, 'model', 't_comprobantes_fcSearchModel.js'), 'utf-8'),
    },
    {
      className: 'WebMG.model.t_categorias_impositivas_fcSearchModel',
      src: await fsp.readFile(path.join(WEBMG_APP_DIR, 'model', 't_categorias_impositivas_fcSearchModel.js'), 'utf-8'),
    },
    {
      className: 'WebMG.view.ExportTxtFormView',
      src: await fsp.readFile(path.join(WEBMG_APP_DIR, 'view', 'ExportTxtFormView.js'), 'utf-8'),
    },
    {
      className: 'WebMG.controller.ExportTxtFormController',
      src: await fsp.readFile(path.join(WEBMG_APP_DIR, 'controller', 'ExportTxtFormController.js'), 'utf-8'),
    },
  ];

  const result = await page.evaluate((items: Array<{ className: string; src: string }>) => {
    const ext = (window as any).Ext;
    const evalG = window.eval;
    const log: Record<string, unknown> = {};

    for (const item of items) {
      if (ext.ClassManager.get(item.className)) {
        log[item.className] = 'exists';
        continue;
      }
      try {
        evalG(item.src);
        log[item.className] = 'ok';
      } catch (e: any) {
        log[item.className] = e?.message ?? String(e);
      }
    }

    const ctrlClass = ext.ClassManager.get('WebMG.controller.ExportTxtFormController');
    if (!ctrlClass) {
      return { ...log, ok: false, error: 'ExportTxtFormController not in ClassManager' };
    }

    try {
      const ctrl = new ctrlClass({ id: 'ExportTxtFormController' });
      ctrl.doInit(null);
      return { ...log, ok: true, controller: ctrl.$className };
    } catch (e: any) {
      return { ...log, ok: false, error: e?.message ?? String(e) };
    }
  }, sources);

  console.log('[injectExportTxtFormClasses]', JSON.stringify(result));
  expect(result.ok, `La inyección de clases de ExportTxt debe completar correctamente: ${JSON.stringify(result)}`).toBe(true);
}

async function openExportTxtWindow(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const existing = ext.ComponentQuery.query('window exporttxtformview')[0];
    if (existing) {
      existing.up('window')?.destroy();
    }

    const win = ext.create('Ext.Window', {
      layout: 'fit',
      title: 'Exportar TXT mensual — DK-1495 GCS',
      closeAction: 'destroy',
      width: 520,
      height: 340,
      border: false,
      items: [{
        xtype: 'exporttxtformview',
      }],
    });
    win.show();
  });
}

test.describe('WebMG > DK-1495 Exportación TXT mensual @dk-1495 @gcs', () => {
  let appFramePage: Page;

  test.beforeAll(async () => {
    await ensureReportDirs();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(WEBMG_GCS_URL, { waitUntil: 'domcontentloaded' });
    const appFrame = await getWebMGAppFrame(page, 360_000);
    appFramePage = appFrame as unknown as Page;
    await waitForExtReady(appFramePage, 360_000);
    await waitForWebMGViewport(appFramePage);
    await injectExportTxtFormClasses(appFramePage);
    await openExportTxtWindow(appFramePage);
  });

  test('should render the export form and load billing organizations', async ({ page }) => {
    const exportTxt = new ExportTxtPage(appFramePage);
    await exportTxt.waitForForm();
    await exportTxt.waitForOrganizationsLoaded();

    const state = await exportTxt.getState();
    const organizations = await exportTxt.getOrganizations();

    expect(state.orgCount).toBeGreaterThan(0);
    expect(organizations.length).toBeGreaterThan(0);
    expect(state.periodo).toMatch(/^\d{6}$/);

    if (!state.orgValue && organizations.length > 0) {
      await exportTxt.selectOrganization(organizations[0].id);
    }

    await exportTxt.waitForDependentFiltersReady();
    const finalState = await exportTxt.getState();
    expect(finalState.tipoDisabled).toBe(false);
    expect(finalState.categoriaDisabled).toBe(false);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1495-gcs-01-form-rendered.png'),
      fullPage: false,
    });
  });

  test('should generate a real TXT export with valid H/T rows and detail when available', async ({ page, request }) => {
    const exportTxt = new ExportTxtPage(appFramePage);
    await exportTxt.waitForForm();
    await exportTxt.waitForOrganizationsLoaded();

    const organizations = await exportTxt.getOrganizations();
    const dataset = await findExportTxtDataset(request, TOKEN, organizations, { baseUrl: GCS_BASE, monthsBack: 18 });

    expect(dataset, 'Debe existir al menos un dataset exportable para validar el handler ExportTxtMG').not.toBeNull();
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
      path: path.join(SCREENSHOTS_DIR, 'dk1495-gcs-02-form-ready-to-export.png'),
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
      expect(detailLines.length, 'Cuando existe dataset con comprobantes reales, el TXT debe incluir líneas D|').toBeGreaterThan(0);
    } else {
      console.warn('[DK-1495 GCS] No se encontraron comprobantes con detalle en los últimos 18 meses; se valida header/trailer.');
    }

    const exportTxtPath = path.join(ARTIFACTS_DIR, `dk1495-gcs-export-${dataset.periodo}.txt`);
    const metadataPath = path.join(ARTIFACTS_DIR, `dk1495-gcs-export-${dataset.periodo}.json`);
    await fsp.writeFile(exportTxtPath, buffer);
    await fsp.writeFile(metadataPath, JSON.stringify({
      organization: dataset.orgName,
      orgId: dataset.orgId,
      periodo: dataset.periodo,
      openedUrl: openedAbsoluteUrl.toString(),
      fileName: contentDisposition,
      detailCount: detailLines.length,
      firstLines: lines.slice(0, 5),
    }, null, 2), 'utf-8');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1495-gcs-03-export-triggered.png'),
      fullPage: false,
    });
  });
});
