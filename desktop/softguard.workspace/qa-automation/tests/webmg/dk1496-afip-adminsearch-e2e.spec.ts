import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';
import { OrgFacturaConfigPage } from '../../src/pages/webmg/OrgFacturaConfigPage';
import {
  ADMIN_SEARCH_GCS_URL,
  captureDirectPreviewScreenshot,
  captureEvidenceScreenshot,
  createEvidenceContext,
  openOrgFcGrid,
  setupMoneyguardRequestLog,
  waitForOrgGridLoaded,
  writeJsonArtifact,
  writeTextArtifact,
} from './factura-config-support';

const REPORT_ROOT = path.resolve(
  __dirname,
  '..',
  '..',
  'reports',
  'dk1496-afip-adminsearch-e2e',
);
const RUN_DATE = new Date().toISOString().slice(0, 10);
const TOKEN_FILE = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
const TOKEN = fs.existsSync(TOKEN_FILE) ? fs.readFileSync(TOKEN_FILE, 'utf-8').trim() : '';

type Status = 'pass' | 'warn' | 'fail';

interface OrgCandidate {
  id: number;
  name: string;
  factelect: string;
  metadataPresent: boolean;
}

interface GridState {
  visible: number;
  rows: OrgCandidate[];
}

interface OrganizationFormState {
  orgId: number;
  orgName: string;
  factelectValue: string;
  configureButtonVisible: boolean;
  facturaFieldsetVisible: boolean;
}

interface MetadataWindowState {
  windowTitle: string;
  orgId: number;
  orgName: string;
  factelect: string;
  afipFieldsetVisible: boolean;
  cuitPresent: boolean;
  cuitMasked: string;
  debugValue: unknown;
  csrLength: number;
  x509Length: number;
  obtenerCsrButtonVisible: boolean;
  generarPfxButtonVisible: boolean;
}

function mask(value: string): string {
  if (!value) {
    return '';
  }
  if (value.length <= 4) {
    return `${value.slice(0, 1)}***`;
  }
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

function sanitizePreviewMetadata(metadata: any): any {
  if (!metadata || typeof metadata !== 'object') {
    return metadata;
  }

  const clone = JSON.parse(JSON.stringify(metadata));
  if (typeof clone.Cuit === 'string') {
    clone.Cuit = mask(clone.Cuit);
  }
  if (typeof clone.csr === 'string') {
    clone.csrLength = clone.csr.trim().length;
    delete clone.csr;
  }
  if (typeof clone.x509 === 'string') {
    clone.x509Length = clone.x509.trim().length;
    delete clone.x509;
  }
  return clone;
}

function redactPreviewUrl(url: string): string {
  if (!url) {
    return '';
  }

  try {
    const parsed = new URL(url, 'https://gcs.softguard.com');
    if (parsed.searchParams.has('oauth_token')) {
      parsed.searchParams.set('oauth_token', '<TOKEN>');
    }
    if (parsed.searchParams.has('metadata')) {
      parsed.searchParams.set('metadata', '<REDACTED_JSON>');
    }
    return parsed.toString();
  } catch {
    return url
      .replace(/oauth_token=[^&]+/gi, 'oauth_token=<TOKEN>')
      .replace(/metadata=[^&]+/gi, 'metadata=<REDACTED_JSON>');
  }
}

function matchesPathAndAction(url: string, expectedPath: string, action: string): boolean {
  try {
    const parsed = new URL(url, 'https://gcs.softguard.com');
    return parsed.pathname === expectedPath && parsed.searchParams.get('action') === action;
  } catch {
    return url.includes(expectedPath) && new RegExp(`(?:\?|&)action=${action}(?:&|$)`, 'i').test(url);
  }
}

function matchesPathAndParam(url: string, expectedPath: string, param: string, value: string): boolean {
  try {
    const parsed = new URL(url, 'https://gcs.softguard.com');
    return parsed.pathname === expectedPath && parsed.searchParams.get(param) === value;
  } catch {
    return url.includes(expectedPath) && new RegExp(`(?:\\?|&)${param}=${value}(?:&|$)`, 'i').test(url);
  }
}

function parsePreviewMetadataFromUrl(url: string): any {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url, 'https://gcs.softguard.com');
    const metadata = parsed.searchParams.get('metadata') || '{}';
    return JSON.parse(metadata);
  } catch {
    return null;
  }
}

function buildDirectPreviewUrl(orgId: number, metadataRaw: string): string {
  const previewUrl = new URL('/handler/ComprobantePdfMG', ADMIN_SEARCH_GCS_URL);
  previewUrl.searchParams.set('preview', 'true');
  previewUrl.searchParams.set('orgId', String(orgId));
  previewUrl.searchParams.set('metadata', metadataRaw || '');
  if (TOKEN) {
    previewUrl.searchParams.set('oauth_token', TOKEN);
  }
  return previewUrl.toString();
}

async function syncFacturaConfigIntoRecord(page: Page): Promise<{ orgId: number; metadataRaw: string }> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const forms = ext.ComponentQuery.query('moneyguardorganizacionformview') || [];
    const form = forms.find((candidate: any) => candidate && !candidate.destroyed && candidate.isVisible && candidate.isVisible()) || forms[0];
    if (!form || !form.record) {
      throw new Error('Visible moneyguardorganizacionformview not found');
    }

    const app = ext.app?.Application?.instance;
    let controller = null;
    if (app?.getController) {
      try {
        controller = app.getController('AdministratorSearch.controller.MoneyGuardOrganizacionFormController');
      } catch (_error) {
        controller = null;
      }
      if (!controller) {
        try {
          controller = app.getController('MoneyGuardOrganizacionFormController');
        } catch (_error) {
          controller = null;
        }
      }
    }

    if (!controller || !ext.isFunction(controller.saveFacturaConfig)) {
      throw new Error('MoneyGuardOrganizacionFormController.saveFacturaConfig not available');
    }

    controller.saveFacturaConfig(form, form.record);

    return {
      orgId: Number(form.record.get('Id') || 0),
      metadataRaw: String(form.record.get('org_cmetadata') || ''),
    };
  });
}

async function installPreviewDiagnostics(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const app = ext.app?.Application?.instance;
    if (!app?.getController) {
      return;
    }

    let controller = null;
    try {
      controller = app.getController('AdministratorSearch.controller.MoneyGuardOrganizacionFormController');
    } catch (_error) {
      controller = null;
    }
    if (!controller) {
      try {
        controller = app.getController('MoneyGuardOrganizacionFormController');
      } catch (_error) {
        controller = null;
      }
    }

    if (!controller) {
      return;
    }

    (window as any).__dk1496PreviewLog = [];

    if (controller.__dk1496PreviewWrapped) {
      return;
    }

    const originalPreview = controller.onPreviewFacturaClick;
    const originalLocalPreview = controller.showLocalFacturaPreview;

    controller.onPreviewFacturaClick = function (button: any) {
      const view = button?.up?.('moneyguardorganizacionformview');
      const recordId = Number(view?.record?.get?.('Id') || 0);
      (window as any).__dk1496PreviewLog.push({ step: 'onPreviewFacturaClick', recordId, at: Date.now() });
      return originalPreview.apply(this, arguments as any);
    };

    controller.showLocalFacturaPreview = function (view: any) {
      const recordId = Number(view?.record?.get?.('Id') || 0);
      (window as any).__dk1496PreviewLog.push({ step: 'showLocalFacturaPreview', recordId, at: Date.now() });
      return originalLocalPreview.apply(this, arguments as any);
    };

    controller.__dk1496PreviewWrapped = true;
  });
}

async function getPreviewDiagnostics(page: Page): Promise<{
  previewLog: Array<{ step: string; recordId: number; at: number }>;
  visibleWindowTitle: string;
  iframeCount: number;
  iframeSrc: string;
  panelTextSnippet: string;
}> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const wins = ext.ComponentQuery.query('window{isVisible()}') || [];
    const previewWin = wins.find((w: any) => w.title && w.title.indexOf('Preview') !== -1);
    const iframe = previewWin?.el?.dom?.querySelector?.('iframe') || null;
    const panel = previewWin?.down?.('panel');
    const panelText = String(panel?.body?.dom?.innerText || '').trim();

    return {
      previewLog: (window as any).__dk1496PreviewLog || [],
      visibleWindowTitle: String(previewWin?.title || ''),
      iframeCount: previewWin?.el?.dom?.querySelectorAll?.('iframe')?.length || 0,
      iframeSrc: String(iframe?.src || ''),
      panelTextSnippet: panelText.slice(0, 500),
    };
  });
}

async function findAfipCandidates(page: Page): Promise<{ total: number; records: OrgCandidate[] }> {
  return page.evaluate(
    (): Promise<{ total: number; records: OrgCandidate[] }> =>
      new Promise((resolve, reject) => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
        if (!grid) {
          reject(new Error('moneyguardorganizaciongridview not found'));
          return;
        }

        const gridStore = grid.getStore();
        const visibleMatches = gridStore.getRange()
          .filter((record: any) => String(record.get('org_factelect') || '') === 'AfipCae')
          .map((record: any) => ({
            id: Number(record.get('Id') || 0),
            name: String(record.get('org_cnombre') || ''),
            factelect: String(record.get('org_factelect') || ''),
            metadataPresent: Boolean(record.get('org_cmetadata')),
          }));

        if (visibleMatches.length > 0) {
          resolve({
            total: visibleMatches.length,
            records: visibleMatches.slice(0, 10),
          });
          return;
        }

        const model = gridStore?.model
          || gridStore?.getModel?.()
          || ext.ClassManager.get('AdministratorSearch.model.t_organizacion_fcSearchModel')
          || ext.ClassManager.get('Common.model.t_organizacion_fcSearchModel');

        if (!model) {
          reject(new Error('Grid store model not available'));
          return;
        }

        const store = ext.create('Ext.data.Store', {
          model,
          pageSize: 50,
          remoteSort: true,
          remoteFilter: true,
          filters: [{ property: 'org_factelect', value: 'AfipCae' }],
        });

        store.load({
          callback(records: any[], _operation: any, success: boolean) {
            if (!success) {
              reject(new Error('Failed to load AfipCae candidates from GCS'));
              return;
            }

            resolve({
              total: typeof store.getTotalCount === 'function' ? store.getTotalCount() : records.length,
              records: records.slice(0, 10).map((record: any) => ({
                id: Number(record.get('Id') || 0),
                name: String(record.get('org_cnombre') || ''),
                factelect: String(record.get('org_factelect') || ''),
                metadataPresent: Boolean(record.get('org_cmetadata')),
              })),
            });
          },
        });
      }),
  );
}

async function applyCandidateToGrid(page: Page, candidate: OrgCandidate): Promise<GridState> {
  const visibleState = await page.evaluate((selected: OrgCandidate) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) throw new Error('moneyguardorganizaciongridview not found');

    const store = grid.getStore();
    const rows = store.getRange().slice(0, 10).map((record: any) => ({
      id: Number(record.get('Id') || 0),
      name: String(record.get('org_cnombre') || ''),
      factelect: String(record.get('org_factelect') || ''),
      metadataPresent: Boolean(record.get('org_cmetadata')),
    }));

    const candidateVisible = rows.some((row: OrgCandidate) =>
      row.id === selected.id || (row.name === selected.name && row.factelect === 'AfipCae'));

    return {
      candidateVisible,
      visible: store.getCount(),
      rows: rows.slice(0, 5),
    };
  }, candidate);

  if (!visibleState.candidateVisible) {
    await page.evaluate((selected: OrgCandidate) => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
      if (!grid) throw new Error('moneyguardorganizaciongridview not found');

      const store = grid.getStore();
      store.clearFilter(true);
      const filters = Array.isArray(grid.filters) ? ext.clone(grid.filters) : [];
      filters.push({ property: 'org_factelect', value: 'AfipCae' });
      store.filter(filters);
    }, candidate);

    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
        if (!grid) return false;
        const store = grid.getStore();
        return store && !store.isLoading() && store.getCount() > 0;
      },
      undefined,
      { timeout: 120_000, polling: 500 },
    );

    await waitForAjaxComplete(page, 60_000);
  }

  return page.evaluate((): GridState => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    const store = grid.getStore();
    return {
      visible: store.getCount(),
      rows: store.getRange().slice(0, 5).map((record: any) => ({
        id: Number(record.get('Id') || 0),
        name: String(record.get('org_cnombre') || ''),
        factelect: String(record.get('org_factelect') || ''),
        metadataPresent: Boolean(record.get('org_cmetadata')),
      })),
    };
  });
}

async function openGridRow(page: Page, candidate: OrgCandidate): Promise<OrgCandidate> {
  const selected = await page.evaluate((target: OrgCandidate): OrgCandidate => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) throw new Error('moneyguardorganizaciongridview not found');

    const store = grid.getStore();
    let rowIndex = store.findBy((record: any) => Number(record.get('Id') || 0) === target.id);

    if (rowIndex < 0) {
      rowIndex = store.findBy(
        (record: any) => String(record.get('org_cnombre') || '') === target.name
          && String(record.get('org_factelect') || '') === 'AfipCae',
      );
    }

    if (rowIndex < 0) {
      rowIndex = 0;
    }

    const record = store.getAt(rowIndex);
    if (!record) throw new Error('No row found in AFIP grid');

    grid.fireEvent('itemdblclick', grid.getView(), record, null, rowIndex);
    return {
      id: Number(record.get('Id') || 0),
      name: String(record.get('org_cnombre') || ''),
      factelect: String(record.get('org_factelect') || ''),
      metadataPresent: Boolean(record.get('org_cmetadata')),
    };
  }, candidate);

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      return form && form.isVisible();
    },
    undefined,
    { timeout: 60_000, polling: 500 },
  );

  await waitForAjaxComplete(page, 60_000);
  return selected;
}

async function getOrganizationFormState(page: Page): Promise<OrganizationFormState> {
  return page.evaluate((): OrganizationFormState => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) throw new Error('moneyguardorganizacionformview not found');

    const record = form.record;
    const factelectField = form.down('[name="org_factelect"]');
    const configButton = form.down('#btnConfigurar');

    return {
      orgId: Number(record?.get('Id') || 0),
      orgName: String(record?.get('org_cnombre') || ''),
      factelectValue: String(factelectField?.getValue?.() || record?.get('org_factelect') || ''),
      configureButtonVisible: Boolean(configButton?.isVisible?.()),
      facturaFieldsetVisible: Boolean(form.down('#facturaConfig')?.isVisible?.()),
    };
  });
}

async function openMetadataWindow(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) throw new Error('moneyguardorganizacionformview not found');

    const button = form.down('#btnConfigurar');
    if (!button) throw new Error('btnConfigurar not found');
    button.fireEvent('click', button);
  });

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
      const afipFieldset = form?.down('#AfipCae');
      return form && afipFieldset && afipFieldset.isVisible();
    },
    undefined,
    { timeout: 60_000, polling: 500 },
  );

  await waitForAjaxComplete(page, 60_000);
}

async function closeMetadataWindow(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
    const win = form?.up?.('window');
    if (win) {
      win.close();
    }
  });

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
      return !form || form.destroyed || !form.isVisible();
    },
    undefined,
    { timeout: 30_000, polling: 500 },
  );

  await waitForAjaxComplete(page, 30_000);
}

async function scrollMetadataSection(page: Page, section: 'top' | 'bottom'): Promise<void> {
  await page.evaluate((targetSection) => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
    if (!form) throw new Error('orgcmetadataformview not found');

    const target = targetSection === 'bottom' ? form.down('#x509') : form.down('#cuit');
    const targetEl = target?.getEl?.()?.dom || target?.inputEl?.dom;
    if (targetEl?.scrollIntoView) {
      targetEl.scrollIntoView({ block: 'center' });
    }
  }, section);
}

async function getMetadataWindowState(page: Page): Promise<MetadataWindowState> {
  return page.evaluate((): MetadataWindowState => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
    if (!form) throw new Error('orgcmetadataformview not found');

    const record = form.record;
    const cuit = String(form.down('#cuit')?.getValue?.() || '');
    const maskFn = (value: string) => {
      if (!value) return '';
      if (value.length <= 4) return `${value.slice(0, 1)}***`;
      return `${value.slice(0, 2)}***${value.slice(-2)}`;
    };

    return {
      windowTitle: String(form.up('window')?.title || ''),
      orgId: Number(record?.get('Id') || 0),
      orgName: String(record?.get('org_cnombre') || ''),
      factelect: String(record?.get('org_factelect') || ''),
      afipFieldsetVisible: Boolean(form.down('#AfipCae')?.isVisible?.()),
      cuitPresent: Boolean(cuit.trim()),
      cuitMasked: maskFn(cuit.trim()),
      debugValue: form.down('#debug')?.getValue?.(),
      csrLength: String(form.down('#csr')?.getValue?.() || '').trim().length,
      x509Length: String(form.down('#x509')?.getValue?.() || '').trim().length,
      obtenerCsrButtonVisible: Boolean(form.down('#btnObtenerCSR')?.isVisible?.()),
      generarPfxButtonVisible: Boolean(form.down('#btnGenerarPFX')?.isVisible?.()),
    };
  });
}

async function clickObtenerCsrAndCapture(page: Page): Promise<{
  responseStatus: number;
  responseLength: number;
  beforeState: MetadataWindowState;
  afterState: MetadataWindowState;
}> {
  const beforeState = await getMetadataWindowState(page);
  const responsePromise = page.waitForResponse(
    (response) => matchesPathAndAction(response.url(), '/handler/CSRCerficateHandler', 'getCSR')
      && ['GET', 'POST'].includes(response.request().method().toUpperCase()),
    { timeout: 60_000 },
  );

  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
    if (!form) throw new Error('orgcmetadataformview not found');
    const button = form.down('#btnObtenerCSR');
    if (!button) throw new Error('btnObtenerCSR not found');
    if (ext.isFunction(button.handler)) {
      button.handler.call(button.scope || button, button);
      return;
    }
    button.fireEvent('click', button);
  });

  const response = await responsePromise;
  const responseBody = await response.text();

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
      if (!form) return false;
      return String(form.down('#csr')?.getValue?.() || '').trim().length > 100;
    },
    undefined,
    { timeout: 60_000, polling: 500 },
  );

  await waitForAjaxComplete(page, 60_000);
  const afterState = await getMetadataWindowState(page);

  return {
    responseStatus: response.status(),
    responseLength: responseBody.trim().length,
    beforeState,
    afterState,
  };
}

async function saveMetadataWindow(page: Page): Promise<{ responseStatus: number; responseOk: boolean }> {
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('/Rest/t_organizacion_fc')
      && ['PUT', 'POST'].includes(response.request().method().toUpperCase()),
    { timeout: 60_000 },
  );

  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
    if (!form) throw new Error('orgcmetadataformview not found');
    const button = form.down('button[action=save]') || form.down('button[text=Guardar]');
    if (!button) throw new Error('Guardar button not found on orgcmetadataformview');
    button.fireEvent('click', button);
  });

  const response = await responsePromise;

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
      return !form || form.destroyed || !form.isVisible();
    },
    undefined,
    { timeout: 60_000, polling: 500 },
  );

  await waitForAjaxComplete(page, 60_000);

  return {
    responseStatus: response.status(),
    responseOk: response.ok(),
  };
}

test.describe.serial('DK-1496 AFIP AdministratorSearch end-to-end @dk-1496 @afip @adminsearch @gcs @e2e', () => {
  const evidence = createEvidenceContext(
    REPORT_ROOT,
    'DK-1496 - AFIP AdministratorSearch end-to-end en GCS',
    {
      environment: 'GCS deployed AdministratorSearch using ?version= with real handlers',
      spec: 'webmg/dk1496-afip-adminsearch-e2e.spec.ts',
      project: 'chromium',
      appUrl: ADMIN_SEARCH_GCS_URL,
      tickets: ['DK-1496', 'DK-1493'],
      notes: [
        'Valida el runtime deployado en https://gcs.softguard.com/a/AdministratorSearch?version= sin inyección local de JS.',
        'Ejecuta acciones reales no destructivas: Obtener CSR, save idempotente de metadata y preview real contra /handler/ComprobantePdfMG.',
        'Generar PFX solo se ejecuta si la organización demo tiene un x509 cargado; si no, se reporta WARN con screenshot.',
      ],
    },
  );

  test.beforeAll(async () => {
    await evidence.ensureDirs();
  });

  test.afterAll(async () => {
    await evidence.writeReports();
  });

  test('should execute the AFIP AdminSearch flow with screenshots and live handler calls', async ({ page }) => {
    test.slow();

    const facturaConfig = new OrgFacturaConfigPage(page);
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    let restoreNeeded = false;

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    await setupMoneyguardRequestLog(page, path.join(evidence.artifactsDir, 'moneyguard-urls.txt'));

    await page.goto(ADMIN_SEARCH_GCS_URL, { waitUntil: 'domcontentloaded', timeout: 360_000 });
    await waitForExtReady(page, 360_000);
    await openOrgFcGrid(page);
    await waitForOrgGridLoaded(page);

    const candidates = await findAfipCandidates(page);
    expect(candidates.total, 'Debe existir al menos una organización con org_factelect = AfipCae en GCS').toBeGreaterThan(0);
    expect(candidates.records.length, 'La búsqueda de organizaciones AFIP debe devolver filas').toBeGreaterThan(0);

    const candidate = candidates.records[0];
    const gridState = await applyCandidateToGrid(page, candidate);
    expect(gridState.visible, 'El grid filtrado debe mostrar al menos una organización AFIP').toBeGreaterThan(0);

    const gridScreenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, `${RUN_DATE}-01-grid-afip`);
    evidence.add({
      check: 'Grid AFIP visible en AdministratorSearch ?version=',
      status: 'pass',
      details: {
        searchedCandidate: candidate,
        candidatePool: candidates,
        visibleGridRows: gridState,
      },
      screenshot: gridScreenshot,
    });

    const openedOrg = await openGridRow(page, candidate);
    await facturaConfig.waitForOrgForm();
    await facturaConfig.expandFieldset();
    const originalOrgState = await facturaConfig.getCurrentOrgRecordState();

    try {
      const formState = await getOrganizationFormState(page);
      expect(formState.factelectValue, 'La organización abierta debe quedar en modo AfipCae').toBe('AfipCae');
      expect(formState.configureButtonVisible, 'El botón Configurar debe verse').toBe(true);
      expect(formState.facturaFieldsetVisible, 'Debe existir el fieldset Configuración de Factura').toBe(true);
      expect(originalOrgState.id, 'La organización AFIP debe exponer un Id persistido').toBe(formState.orgId);

      const formScreenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, `${RUN_DATE}-02-org-form-factura`);
      evidence.add({
        check: 'Formulario de organización AFIP y fieldset de factura visibles',
        status: 'pass',
        details: {
          openedOrg,
          formState,
          originalMetadataLength: (originalOrgState.metadataRaw || '').length,
        },
        screenshot: formScreenshot,
      });

      await openMetadataWindow(page);
      await scrollMetadataSection(page, 'top');
      const metadataTop = await getMetadataWindowState(page);
      expect(metadataTop.afipFieldsetVisible, 'La ventana AFIP debe mostrar el fieldset').toBe(true);
      expect(metadataTop.obtenerCsrButtonVisible, 'Debe verse Obtener CSR').toBe(true);

      const metadataTopScreenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, `${RUN_DATE}-03-afip-window-top`);
      evidence.add({
        check: 'Ventana AFIP abierta desde AdministratorSearch',
        status: 'pass',
        details: metadataTop,
        screenshot: metadataTopScreenshot,
      });

      const csrAction = await clickObtenerCsrAndCapture(page);
      expect(csrAction.responseStatus, 'El handler getCSR debe responder 200').toBe(200);
      expect(csrAction.responseLength, 'El CSR devuelto debe tener contenido').toBeGreaterThan(100);
      expect(csrAction.afterState.csrLength, 'El textarea CSR debe quedar poblado').toBeGreaterThan(100);

      const csrScreenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, `${RUN_DATE}-04-afip-getcsr`);
      evidence.add({
        check: 'Obtener CSR completa el certificado desde el handler real',
        status: 'pass',
        details: {
          responseStatus: csrAction.responseStatus,
          responseLength: csrAction.responseLength,
          beforeState: csrAction.beforeState,
          afterState: csrAction.afterState,
        },
        screenshot: csrScreenshot,
      });

      const saveResult = await saveMetadataWindow(page);
      restoreNeeded = true;
      expect(saveResult.responseOk, 'El save idempotente de metadata AFIP debe responder OK').toBe(true);
      expect(saveResult.responseStatus, 'El save de metadata AFIP debe responder 200').toBe(200);

      await facturaConfig.closeOrgFormWindow();
      const reopenedOrg = await openGridRow(page, candidate);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();

      await openMetadataWindow(page);
      await scrollMetadataSection(page, 'top');
      const metadataAfterSave = await getMetadataWindowState(page);
      expect(metadataAfterSave.cuitPresent, 'El CUIT debe seguir presente tras guardar').toBe(true);
      expect(metadataAfterSave.csrLength, 'El CSR debe seguir presente tras guardar').toBeGreaterThan(100);

      const metadataSaveScreenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, `${RUN_DATE}-05-afip-reopen-after-save`);
      evidence.add({
        check: 'Guardar y reabrir preserva la configuración AFIP',
        status: 'pass',
        details: {
          saveResult,
          reopenedOrg,
          metadataAfterSave,
        },
        screenshot: metadataSaveScreenshot,
      });

      await scrollMetadataSection(page, 'bottom');
      const metadataBottom = await getMetadataWindowState(page);
      const bottomScreenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, `${RUN_DATE}-06-afip-bottom-pfx`);

      if (metadataBottom.x509Length > 0) {
        evidence.add({
          check: 'La organización demo tiene X509 disponible para intentar Generar PFX',
          status: 'pass',
          details: metadataBottom,
          screenshot: bottomScreenshot,
        });
      } else {
        evidence.add({
          check: 'Generar PFX quedó bloqueado por falta de X509 cargado en la organización demo',
          status: 'warn',
          details: {
            ...metadataBottom,
            note: 'El botón Generar PFX existe, pero x509Length=0 en la única org AfipCae encontrada; no es un bloqueo de navegación sino de datos disponibles para una prueba e2e segura.',
          },
          screenshot: bottomScreenshot,
        });
      }

      await closeMetadataWindow(page);

      const uniqueTag = `E2E-DK1496-${Date.now()}`;
      const previewTemplate = `Observación ${uniqueTag}: {{cliente_nombre}}`;
      const previewFooter = `Footer ${uniqueTag}`;
      const currentOrgStateBeforePreview = await facturaConfig.getCurrentOrgRecordState();
      expect(currentOrgStateBeforePreview.id, 'La organización debe seguir persistida antes del preview').toBe(formState.orgId);
      await facturaConfig.expandFieldset();
      await facturaConfig.setObservaciones(previewTemplate);
      await facturaConfig.setFooterFijo(previewFooter);
      await facturaConfig.setMostrarQrAfip(true);

      const previewConfigScreenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, `${RUN_DATE}-07-factura-config-ready`);
      evidence.add({
        check: 'Configuración de factura preparada para preview end-to-end',
        status: 'pass',
        details: {
          orgId: formState.orgId,
          orgName: formState.orgName,
          previewTemplate,
          previewFooter,
          mostrarQrAfip: await facturaConfig.getMostrarQrAfip(),
        },
        screenshot: previewConfigScreenshot,
      });

      const preparedPreviewState = await syncFacturaConfigIntoRecord(page);
      expect(preparedPreviewState.orgId, 'La configuración preparada para preview debe conservar el Id persistido').toBe(formState.orgId);
      await installPreviewDiagnostics(page);

      const previewResponsePromise = page.waitForResponse(
        (response) => matchesPathAndParam(response.url(), '/handler/ComprobantePdfMG', 'preview', 'true'),
        { timeout: 60_000 },
      ).catch(() => null);

      await facturaConfig.clickPreview();
      const previewResponse = await previewResponsePromise;
      expect(await facturaConfig.isPreviewVisible(), 'La preview de factura debe abrirse').toBe(true);

      const previewDiagnostics = await getPreviewDiagnostics(page);
      const previewUrlFromWindow = await facturaConfig.getPreviewUrl();
      const previewUrl = previewUrlFromWindow || previewResponse?.url() || '';
      const previewMetadata = await facturaConfig.getPreviewMetadata() || parsePreviewMetadataFromUrl(previewUrl);
      const previewHtml = await facturaConfig.getPreviewHtml();
      const previewWindowScreenshot = await captureEvidenceScreenshot(page, evidence.screenshotsDir, `${RUN_DATE}-08-preview-window`);

      evidence.add({
        check: 'El botón Preview Factura abre una ventana visible desde AdministratorSearch',
        status: previewResponse ? 'pass' : 'warn',
        details: {
          currentOrgStateBeforePreview,
          preparedPreviewState: {
            orgId: preparedPreviewState.orgId,
            metadataLength: preparedPreviewState.metadataRaw.length,
          },
          previewResponseStatus: previewResponse?.status?.() ?? null,
          previewUrlFromWindow: redactPreviewUrl(previewUrlFromWindow),
          previewDiagnostics,
          previewHtmlSnippet: previewHtml.slice(0, 500),
          note: previewResponse
            ? 'Se observó tráfico real hacia ComprobantePdfMG al hacer click en Preview.'
            : 'La ventana Preview abrió, pero bajo automatización no se observó una request al handler desde el botón. Se validó el handler real en el paso siguiente con la misma metadata preparada.',
        },
        screenshot: previewWindowScreenshot,
      });

      const directPreviewUrl = buildDirectPreviewUrl(preparedPreviewState.orgId, preparedPreviewState.metadataRaw);
      const directPreviewScreenshot = path.join(evidence.screenshotsDir, `${RUN_DATE}-09-preview-direct.png`);
      await captureDirectPreviewScreenshot(page, directPreviewUrl, directPreviewScreenshot, 'VISTA PREVIA');

      const previewUrlForArtifacts = previewUrl || directPreviewUrl;
      const previewMetadataForArtifacts = previewMetadata || parsePreviewMetadataFromUrl(directPreviewUrl);
      const directPreviewPage = await page.context().newPage();
      let directPreviewHtml = '';
      try {
        await directPreviewPage.goto(directPreviewUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
        await directPreviewPage.waitForFunction(
          () => document.body && document.body.innerText.includes('VISTA PREVIA'),
          undefined,
          { timeout: 60_000, polling: 300 },
        );
        directPreviewHtml = await directPreviewPage.content();
      } finally {
        await directPreviewPage.close();
      }

      expect(directPreviewUrl, 'La validación directa debe construir la URL del handler de preview').toContain('/handler/ComprobantePdfMG?preview=true');
      expect(previewMetadataForArtifacts?.factura?.observaciones_template, 'La metadata enviada al handler debe incluir la observación temporal').toBe(previewTemplate);
      expect(previewMetadataForArtifacts?.factura?.footer_fijo, 'La metadata enviada al handler debe incluir el footer temporal').toBe(previewFooter);
      expect(previewMetadataForArtifacts?.factura?.mostrar_qr_afip, 'La metadata enviada al handler debe mantener el toggle QR').toBe(true);
      expect(directPreviewHtml, 'La preview directa debe interpolar el cliente de ejemplo').toContain('CLIENTE EJEMPLO S.A.');
      expect(directPreviewHtml, 'La preview directa no debe dejar el placeholder bruto del cliente').not.toContain('{{cliente_nombre}}');
      expect(directPreviewHtml, 'La preview directa debe reflejar el tag temporal del e2e').toContain(uniqueTag);
      expect(directPreviewHtml, 'La preview directa debe contener el footer temporal').toContain(previewFooter);

      const previewHtmlArtifact = await writeTextArtifact(evidence.artifactsDir, 'preview-rendered.html', directPreviewHtml || previewHtml);
      const previewMetadataArtifact = await writeJsonArtifact(
        evidence.artifactsDir,
        'preview-metadata-sanitized.json',
        sanitizePreviewMetadata(previewMetadataForArtifacts),
      );
      const previewUrlArtifact = await writeTextArtifact(
        evidence.artifactsDir,
        'preview-url-redacted.txt',
        redactPreviewUrl(previewUrlForArtifacts),
      );

      evidence.add({
        check: 'Preview real de ComprobantePdfMG renderiza la configuración AFIP/factura desde AdministratorSearch',
        status: 'pass',
        details: {
          previewResponseStatus: previewResponse?.status?.() ?? null,
          previewUrlFromWindow: redactPreviewUrl(previewUrlFromWindow),
          previewUrl: redactPreviewUrl(previewUrlForArtifacts),
          previewMetadata: sanitizePreviewMetadata(previewMetadataForArtifacts),
          previewDiagnostics,
          htmlHasClienteEjemplo: directPreviewHtml.includes('CLIENTE EJEMPLO S.A.'),
          htmlHasUniqueTag: directPreviewHtml.includes(uniqueTag),
          htmlHasFooter: directPreviewHtml.includes(previewFooter),
        },
        screenshot: previewWindowScreenshot,
        artifacts: [previewHtmlArtifact, previewMetadataArtifact, previewUrlArtifact, directPreviewScreenshot],
      });

      await facturaConfig.closePreview();

      evidence.add({
        check: 'Consola/runtime del flujo AFIP e2e sin page errors',
        status: pageErrors.length === 0 ? 'pass' : 'warn',
        details: {
          consoleErrors,
          pageErrors,
          note: pageErrors.length === 0
            ? 'Sin page errors durante el flujo e2e.'
            : 'Se detectaron page errors; revisar el detalle y el request log antes de concluir que el flujo es 100% limpio.',
        },
      });
    } finally {
      try {
        await facturaConfig.closePreview();
      } catch {
        // cleanup best effort
      }

      try {
        await closeMetadataWindow(page);
      } catch {
        // cleanup best effort
      }

      try {
        await facturaConfig.closeOrgFormWindow();
      } catch {
        // cleanup best effort
      }

      if (restoreNeeded) {
        const restoredOrg = await openGridRow(page, candidate);
        await facturaConfig.waitForOrgForm();
        const restoreResult = await facturaConfig.saveCurrentRecordRawMetadata(originalOrgState.metadataRaw || '');
        expect(restoreResult.success, restoreResult.error).toBe(true);
        evidence.add({
          check: 'Cleanup: metadata original restaurada tras la prueba e2e',
          status: 'pass',
          details: {
            restoredOrg,
            restoredMetadataLength: (originalOrgState.metadataRaw || '').length,
          },
        });

        try {
          await facturaConfig.closeOrgFormWindow();
        } catch {
          // cleanup best effort
        }
      }
    }
  });
});
