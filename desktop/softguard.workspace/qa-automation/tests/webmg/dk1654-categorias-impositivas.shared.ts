import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { applyResourceOverrideRules } from '../../src/helpers/resource-override';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';

export const ADMINSEARCH_GCS_URL = 'https://gcs.softguard.com/a/AdministratorSearch?version=';
const TOKEN_FILE = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
const ADMIN_APP_DIR = path.resolve(__dirname, '..', '..', '..', 'apps', 'AdministratorSearch', 'app');

export type EvidenceStatus = 'pass' | 'fail' | 'warn';

export interface EvidenceEntry {
  check: string;
  status: EvidenceStatus;
  details?: any;
  screenshot?: string;
}

export interface SearchSummary {
  status: number;
  ok: boolean;
  total: number;
  preview: any[];
  filterProperty?: string;
  rawSnippet?: string;
}

export interface TaxCodeSearchSummary extends SearchSummary {
  code: string;
}

export interface CreationState {
  orgId: number;
  orgName: string;
  currencyValue: string;
  categoryComboDisabled: boolean;
  categoryComboValue: string;
  categoryStoreCount: number;
  categoryStorePreview: Array<{
    id: number;
    codigo: string;
    descripcion: string;
    impuesto1: string;
    impuesto2: string;
    impuesto3: string;
  }>;
  categorySearch: SearchSummary;
  taxSearch: SearchSummary;
  taxSearchByImpId: SearchSummary;
  taxSearchByOrgId: SearchSummary;
  referencedTaxCodes: string[];
  taxSearchByCode: TaxCodeSearchSummary[];
  resolvedTaxMatches: number;
}

export interface FlowUntilTemplateResult {
  gridState: {
    count: number;
    rows: Array<{ id: number; name: string; currency: string; tipoFacturacion: string }>;
  };
  preSaveState: {
    orgId: number;
    orgName: string;
    currencyValue: string;
    categoryComboDisabled: boolean;
    categoryStoreCount: number;
  };
  attentionMessage: {
    title: string;
    message: string;
  };
  creationState: CreationState;
  screenshots: {
    grid: string;
    formBeforeSave: string;
    attention: string;
    categories: string;
  };
}

export interface FinalizeResult {
  selection: {
    selectedCode: string;
    selectedDescription: string;
  };
  formClosed: boolean;
  screenshot: string;
}

function attachPageDiagnostics(page: Page, label: string): void {
  const pageWithFlag = page as Page & { __dk1654DiagnosticsAttached?: boolean };
  if (pageWithFlag.__dk1654DiagnosticsAttached) {
    return;
  }
  pageWithFlag.__dk1654DiagnosticsAttached = true;

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`[${label} browser:error] ${msg.text()}`);
    }
  });
  page.on('pageerror', (error) => {
    console.log(`[${label} pageerror] ${error.message}`);
  });
  page.on('requestfailed', (request) => {
    console.log(`[${label} requestfailed] ${request.method()} ${request.url()} :: ${request.failure()?.errorText}`);
  });
  page.on('response', (response) => {
    if (response.status() >= 400) {
      console.log(`[${label} http:${response.status()}] ${response.url()}`);
    }
  });
}

export async function ensureEvidenceDirs(reportRoot: string): Promise<string> {
  const screenshotsDir = path.join(reportRoot, 'screenshots');
  await fsPromises.mkdir(screenshotsDir, { recursive: true });
  return screenshotsDir;
}

export function buildOrgName(scope: string): string {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  return `DK1654 ${scope.toUpperCase()} ${stamp}`;
}

export async function captureEvidenceScreenshot(
  page: Page,
  screenshotsDir: string,
  fileName: string,
): Promise<string> {
  const screenshotPath = path.join(screenshotsDir, `${fileName}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  return screenshotPath;
}

export async function gotoLocalAdministratorSearch(page: Page, localPort: number): Promise<void> {
  attachPageDiagnostics(page, 'DK-1654 local');

  if (!fs.existsSync(TOKEN_FILE)) {
    throw new Error(`No se encontró el token OAuth en ${TOKEN_FILE}`);
  }

  const token = fs.readFileSync(TOKEN_FILE, 'utf-8').trim();
  if (!token) {
    throw new Error(`El token OAuth está vacío en ${TOKEN_FILE}`);
  }

  await applyResourceOverrideRules(page, token, localPort, process.env.DK1654_DEBUG_RESOURCE_OVERRIDE === '1');
  await applyAdministratorSearchLocalJsOverrides(page);
  await page.context().addCookies([{
    name: 'OAuth_Token',
    value: token,
    domain: 'localhost',
    path: '/',
    httpOnly: false,
    secure: false,
    sameSite: 'Lax',
  }]);

  await page.goto(`http://localhost:${localPort}/apps/AdministratorSearch/`, { waitUntil: 'domcontentloaded' });
  await waitForExtReady(page, 120_000);
  await waitForViewport(page, 180_000);
}

async function applyAdministratorSearchLocalJsOverrides(page: Page): Promise<void> {
  const localControllerPath = path.join(ADMIN_APP_DIR, 'controller', 'MoneyGuardOrganizacionFormController.js');
  const localViewPath = path.join(ADMIN_APP_DIR, 'view', 'MoneyGuardOrganizacionFormView.js');

  const localController = fs.readFileSync(localControllerPath, 'utf-8');
  const localView = fs.readFileSync(localViewPath, 'utf-8');

  await page.route('**/js/AdministratorSearch/controller/MoneyGuardOrganizacionFormController.js**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript; charset=utf-8',
      body: localController,
    });
  });

  await page.route('**/js/AdministratorSearch/view/MoneyGuardOrganizacionFormView.js**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript; charset=utf-8',
      body: localView,
    });
  });
}

export async function gotoGcsAdministratorSearch(page: Page): Promise<void> {
  attachPageDiagnostics(page, 'DK-1654 GCS');
  await page.goto(ADMINSEARCH_GCS_URL, { waitUntil: 'domcontentloaded' });
  await waitForExtReady(page, 360_000);
  await waitForViewport(page, 360_000);
}

export async function waitForViewport(page: Page, timeout = 180_000): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return !!(ext && ext.isReady && ext.getCmp && ext.getCmp('center'));
    },
    undefined,
    { timeout, polling: 500 },
  );
}

export async function openOrganizationGrid(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');
    if (!center) {
      throw new Error('No se encontró el tabpanel center de AdministratorSearch');
    }

    const existing = center.items.getRange().find(
      (tab: any) => tab.xtype === 'moneyguardorganizaciongridview',
    );
    if (existing) {
      center.setActiveTab(existing);
      return;
    }

    const tab = ext.widget('moneyguardorganizaciongridview', {
      title: 'Organizaciones facturación',
      closable: true,
    });
    center.add(tab);
    center.setActiveTab(tab);
  });
}

export async function waitForOrganizationGridLoaded(page: Page, timeout = 60_000): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
      if (!grid) {
        return false;
      }
      const store = grid.getStore();
      return !!(store && !store.isLoading());
    },
    undefined,
    { timeout, polling: 500 },
  );
  await waitForAjaxComplete(page, timeout);
}

export async function getOrganizationGridState(page: Page): Promise<FlowUntilTemplateResult['gridState']> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) {
      throw new Error('No se encontró moneyguardorganizaciongridview');
    }
    const store = grid.getStore();
    return {
      count: store.getCount(),
      rows: store.getRange().slice(0, 8).map((record: any) => ({
        id: Number(record.get('Id') || 0),
        name: String(record.get('org_cnombre') || ''),
        currency: String(record.get('org_csymbol') || ''),
        tipoFacturacion: String(record.get('org_factelect') || ''),
      })),
    };
  });
}

export async function openNewOrganizationWindow(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) {
      throw new Error('No se encontró moneyguardorganizaciongridview para abrir una nueva organización');
    }
    const button = grid.down('button[action=add]');
    if (!button) {
      throw new Error('No se encontró el botón Nuevo en moneyguardorganizaciongridview');
    }
    button.fireEvent('click', button);
  });
  await waitForOrganizationForm(page);
}

export async function waitForOrganizationForm(page: Page, timeout = 30_000): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      return !!(form && form.isVisible());
    },
    undefined,
    { timeout, polling: 500 },
  );
  await waitForAjaxComplete(page, timeout);
}

export async function getCurrentFormState(page: Page): Promise<FlowUntilTemplateResult['preSaveState']> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) {
      throw new Error('No se encontró moneyguardorganizacionformview');
    }
    const combo = form.down('#categoriaimpositiva');
    const store = combo && combo.getStore ? combo.getStore() : null;
    const moneda = form.down('#moneda');
    const rawId = form.record?.get('Id');
    const normalizedId = rawId !== undefined && rawId !== null && rawId !== '' && !Number.isNaN(Number(rawId))
      ? Number(rawId)
      : 0;
    return {
      orgId: normalizedId,
      orgName: String(form.getForm().findField('org_cnombre')?.getValue() || ''),
      currencyValue: String(moneda?.getValue() || ''),
      categoryComboDisabled: !!combo?.isDisabled(),
      categoryStoreCount: store ? store.getCount() : 0,
    };
  });
}

export async function fillNewOrganizationForm(
  page: Page,
  orgName: string,
  currencyCode = 'ARS',
): Promise<void> {
  await page.evaluate(
    ({ newOrgName, newCurrencyCode }) => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      if (!form) {
        throw new Error('No se encontró el formulario de organización facturadora');
      }
      const nombreField = form.getForm().findField('org_cnombre');
      if (!nombreField) {
        throw new Error('No se encontró el campo org_cnombre');
      }
      nombreField.setValue(newOrgName);

      const moneda = form.down('#moneda');
      if (!moneda) {
        throw new Error('No se encontró el selecterfield de moneda');
      }
      moneda.setValue(newCurrencyCode);
    },
    { newOrgName: orgName, newCurrencyCode: currencyCode },
  );

  await page.waitForFunction(
    ({ newOrgName, newCurrencyCode }) => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      if (!form) {
        return false;
      }
      const nombre = String(form.getForm().findField('org_cnombre')?.getValue() || '');
      const moneda = String(form.down('#moneda')?.getValue() || '');
      return nombre === newOrgName && moneda === newCurrencyCode;
    },
    { newOrgName: orgName, newCurrencyCode: currencyCode },
    { timeout: 30_000, polling: 300 },
  );
}

export async function clickSave(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) {
      throw new Error('No se encontró moneyguardorganizacionformview para guardar');
    }
    const button = form.down('button[action=save]') || form.down('button[text=Guardar]');
    if (!button) {
      throw new Error('No se encontró el botón Guardar');
    }
    button.fireEvent('click', button);
  });
}

export async function waitForAttentionMessage(page: Page, timeout = 120_000): Promise<{ title: string; message: string }> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return !!(ext && ext.MessageBox && ext.MessageBox.isVisible && ext.MessageBox.isVisible());
    },
    undefined,
    { timeout, polling: 500 },
  );

  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const box = ext.MessageBox;
    const title = String(box.title || box.getTitle?.() || '');
    const boxEl = box.getEl ? box.getEl() : box.el;
    const boxDom = boxEl && boxEl.dom ? boxEl.dom : null;
    const messageCandidates = [
      box.msg?.html,
      box.msg?.textContent,
      box.msg?.el?.dom?.innerText,
      box.msg?.el?.dom?.textContent,
      box.messageText?.dom?.innerText,
      box.messageText?.dom?.textContent,
      boxDom?.querySelector?.('.x-window-text')?.textContent,
      boxDom?.querySelector?.('.x-box-mc')?.textContent,
      boxDom?.innerText,
      boxDom?.textContent,
    ].filter(Boolean);
    const rawMessage = String(messageCandidates[0] || '');
    const message = rawMessage.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return { title, message };
  });
}

export async function closeMessageBox(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    if (ext && ext.MessageBox && ext.MessageBox.isVisible && ext.MessageBox.isVisible()) {
      ext.MessageBox.hide();
    }
  });
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return !(ext && ext.MessageBox && ext.MessageBox.isVisible && ext.MessageBox.isVisible());
    },
    undefined,
    { timeout: 10_000, polling: 300 },
  );
}

async function querySearch(
  page: Page,
  searchName: string,
  filters: Array<{ property: string; value: any; id?: string }>,
  limit = 200,
): Promise<SearchSummary> {
  return page.evaluate(
    async ({ targetSearchName, targetFilters, targetLimit }) => {
      const params = new URLSearchParams();
      params.set('page', '1');
      params.set('start', '0');
      params.set('limit', String(targetLimit));
      params.set('filter', JSON.stringify(targetFilters));

      const response = await fetch(`/Rest/search/${targetSearchName}?${params.toString()}`, {
        credentials: 'include',
      });
      const rawText = await response.text();
      let parsed: any = null;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = null;
      }

      const rows = Array.isArray(parsed?.rows) ? parsed.rows : [];
      const preview = rows.slice(0, 10);
      return {
        status: response.status,
        ok: response.ok,
        total: Number(parsed?.total || rows.length || 0),
        preview,
        rawSnippet: parsed ? undefined : rawText.slice(0, 400),
      };
    },
    {
      targetSearchName: searchName,
      targetFilters: filters,
      targetLimit: limit,
    },
  );
}

function collectReferencedTaxCodes(...sources: Array<Array<Record<string, any>> | undefined>): string[] {
  const codes = new Set<string>();

  for (const rows of sources) {
    for (const row of rows || []) {
      const rawCodes = [
        row?.impuesto1,
        row?.impuesto2,
        row?.impuesto3,
        row?.cat_cimpuesto1,
        row?.cat_cimpuesto2,
        row?.cat_cimpuesto3,
      ];

      for (const rawCode of rawCodes) {
        const code = String(rawCode || '').trim();
        // "0" en este circuito representa "sin impuesto"; no debe contarse como un impuesto resoluble.
        if (code && code !== '0') {
          codes.add(code);
        }
      }
    }
  }

  return Array.from(codes).sort();
}

export async function collectCreationState(page: Page): Promise<CreationState> {
  const uiState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) {
      throw new Error('No se encontró moneyguardorganizacionformview para recolectar el estado');
    }
    const combo = form.down('#categoriaimpositiva');
    const store = combo && combo.getStore ? combo.getStore() : null;
    const moneda = form.down('#moneda');
    const rawId = form.record?.get('Id');
    const normalizedId = rawId !== undefined && rawId !== null && rawId !== '' && !Number.isNaN(Number(rawId))
      ? Number(rawId)
      : 0;
    const preview = store
      ? store.getRange().slice(0, 10).map((record: any) => ({
          id: Number(record.get('Id') || 0),
          codigo: String(record.get('cat_ccodigo') || ''),
          descripcion: String(record.get('cat_cdescripcion') || ''),
          impuesto1: String(record.get('cat_cimpuesto1') || ''),
          impuesto2: String(record.get('cat_cimpuesto2') || ''),
          impuesto3: String(record.get('cat_cimpuesto3') || ''),
        }))
      : [];

    return {
      orgId: normalizedId,
      orgName: String(form.getForm().findField('org_cnombre')?.getValue() || ''),
      currencyValue: String(moneda?.getValue() || ''),
      categoryComboDisabled: !!combo?.isDisabled(),
      categoryComboValue: String(combo?.getValue() || ''),
      categoryStoreCount: store ? store.getCount() : 0,
      categoryStorePreview: preview,
    };
  });

  if (uiState.orgId <= 0) {
    const emptySearch: SearchSummary = {
      status: 0,
      ok: false,
      total: 0,
      preview: [],
    };

    return {
      ...uiState,
      categorySearch: emptySearch,
      taxSearch: { ...emptySearch },
      taxSearchByImpId: { ...emptySearch },
      taxSearchByOrgId: { ...emptySearch },
      referencedTaxCodes: [],
      taxSearchByCode: [],
      resolvedTaxMatches: 0,
    };
  }

  const categorySearch = await querySearch(page, 't_categorias_impositivas_fc', [
    { property: 'cat_orgicodigoid', value: uiState.orgId, id: 'cat_orgicodigoid' },
  ]);
  const taxSearchByImpId = await querySearch(page, 't_impuestos_fc', [
    { property: 'imp_idorganizacion', value: uiState.orgId, id: 'imp_idorganizacion' },
  ]);
  const taxSearchByOrgId = await querySearch(page, 't_impuestos_fc', [
    { property: 'org_organizacionId', value: uiState.orgId, id: 'org_organizacionId' },
  ]);
  const taxSearch = taxSearchByImpId.total >= taxSearchByOrgId.total
    ? { ...taxSearchByImpId, filterProperty: 'imp_idorganizacion' }
    : { ...taxSearchByOrgId, filterProperty: 'org_organizacionId' };
  const referencedTaxCodes = collectReferencedTaxCodes(uiState.categoryStorePreview, categorySearch.preview as Array<Record<string, any>>);
  const taxSearchByCode = await Promise.all(
    referencedTaxCodes.map(async (code) => ({
      code,
      ...(await querySearch(page, 't_impuestos_fc', [
        { property: 'imp_ccodigo', value: code, id: `imp_ccodigo_${code}` },
      ])),
    })),
  );
  const resolvedTaxMatches = taxSearchByCode.reduce((sum, item) => sum + item.total, 0);

  return {
    ...uiState,
    categorySearch,
    taxSearch,
    taxSearchByImpId,
    taxSearchByOrgId,
    referencedTaxCodes,
    taxSearchByCode,
    resolvedTaxMatches,
  };
}

export async function pollCreationState(page: Page, timeout = 60_000): Promise<CreationState> {
  const deadline = Date.now() + timeout;
  let lastState = await collectCreationState(page);

  while (Date.now() < deadline) {
    if (
      lastState.orgId > 0
      && lastState.categoryStoreCount > 0
      && lastState.categorySearch.total > 0
      && (lastState.referencedTaxCodes.length === 0 || lastState.resolvedTaxMatches > 0)
    ) {
      return lastState;
    }
    await page.waitForTimeout(1_000);
    lastState = await collectCreationState(page);
  }

  return lastState;
}

export async function expandCategoriaCombo(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const combo = ext.ComponentQuery.query('moneyguardorganizacionformview #categoriaimpositiva')[0];
    if (!combo) {
      throw new Error('No se encontró el combo de categoría impositiva');
    }
    combo.expand();
  });
  await page.waitForTimeout(600);
}

export async function selectFirstCategoria(page: Page): Promise<FinalizeResult['selection']> {
  const selection = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const combo = ext.ComponentQuery.query('moneyguardorganizacionformview #categoriaimpositiva')[0];
    if (!combo) {
      throw new Error('No se encontró el combo de categoría impositiva para seleccionar');
    }
    const store = combo.getStore();
    const record = store && store.getAt(0);
    if (!record) {
      throw new Error('No hay categorías impositivas cargadas para seleccionar');
    }
    const selectedCode = String(record.get('cat_ccodigo') || '');
    const selectedDescription = String(record.get('cat_cdescripcion') || '');
    combo.setValue(selectedCode);
    combo.collapse();
    return { selectedCode, selectedDescription };
  });

  await page.waitForFunction(
    (selectedCode) => {
      const ext = (window as any).Ext;
      const combo = ext.ComponentQuery.query('moneyguardorganizacionformview #categoriaimpositiva')[0];
      return !!combo && String(combo.getValue() || '') === String(selectedCode || '');
    },
    selection.selectedCode,
    { timeout: 15_000, polling: 300 },
  );

  return selection;
}

export async function waitForOrganizationFormClosed(page: Page, timeout = 30_000): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      return !form || !form.isVisible();
    },
    undefined,
    { timeout, polling: 500 },
  );
}

export async function isOrganizationFormVisible(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    return !!(form && form.isVisible());
  });
}

export async function tryDeleteOrganization(page: Page, orgId: number): Promise<any> {
  return page.evaluate(async (targetOrgId) => {
    try {
      const response = await fetch(`/Rest/t_organizacion_fc/${targetOrgId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const rawText = await response.text();
      let parsed: any = null;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = rawText;
      }
      return {
        attempted: true,
        ok: response.ok,
        status: response.status,
        body: parsed,
      };
    } catch (error) {
      return {
        attempted: true,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }, orgId);
}

export async function runFlowUntilTemplate(
  page: Page,
  options: {
    orgName: string;
    screenshotsDir: string;
    screenshotPrefix: string;
  },
): Promise<FlowUntilTemplateResult> {
  await openOrganizationGrid(page);
  await waitForOrganizationGridLoaded(page);
  const gridState = await getOrganizationGridState(page);
  const gridScreenshot = await captureEvidenceScreenshot(
    page,
    options.screenshotsDir,
    `${options.screenshotPrefix}-01-grid-ready`,
  );

  await openNewOrganizationWindow(page);
  await fillNewOrganizationForm(page, options.orgName, 'ARS');
  const preSaveState = await getCurrentFormState(page);
  const formBeforeSave = await captureEvidenceScreenshot(
    page,
    options.screenshotsDir,
    `${options.screenshotPrefix}-02-new-org-form`,
  );

  await clickSave(page);
  const attentionMessage = await waitForAttentionMessage(page);
  const attention = await captureEvidenceScreenshot(
    page,
    options.screenshotsDir,
    `${options.screenshotPrefix}-03-post-save-attention`,
  );
  await closeMessageBox(page);

  const creationState = await pollCreationState(page, 60_000);
  await expandCategoriaCombo(page);
  const categories = await captureEvidenceScreenshot(
    page,
    options.screenshotsDir,
    `${options.screenshotPrefix}-04-categories-created`,
  );

  return {
    gridState,
    preSaveState,
    attentionMessage,
    creationState,
    screenshots: {
      grid: gridScreenshot,
      formBeforeSave,
      attention,
      categories,
    },
  };
}

export async function finalizeOrganizationAndClose(
  page: Page,
  options: {
    screenshotsDir: string;
    screenshotPrefix: string;
  },
): Promise<FinalizeResult> {
  const selection = await selectFirstCategoria(page);
  await clickSave(page);
  await waitForOrganizationFormClosed(page);
  const screenshot = await captureEvidenceScreenshot(
    page,
    options.screenshotsDir,
    `${options.screenshotPrefix}-05-form-closed`,
  );
  const formClosed = !(await isOrganizationFormVisible(page));

  return {
    selection,
    formClosed,
    screenshot,
  };
}

export async function writeEvidenceReport(options: {
  reportRoot: string;
  ticket: string;
  title: string;
  environment: string;
  appUrl: string;
  jsonFileName: string;
  markdownFileName: string;
  methodologyLines: string[];
  entries: EvidenceEntry[];
  extraMetadata?: Record<string, any>;
}): Promise<void> {
  const jsonPath = path.join(options.reportRoot, options.jsonFileName);
  const markdownPath = path.join(options.reportRoot, options.markdownFileName);

  const payload = {
    ticket: options.ticket,
    generatedAt: new Date().toISOString(),
    environment: options.environment,
    appUrl: options.appUrl,
    ...options.extraMetadata,
    checks: options.entries,
  };

  await fsPromises.writeFile(jsonPath, JSON.stringify(payload, null, 2), 'utf-8');

  const lines: string[] = [];
  lines.push(`# ${options.title}`);
  lines.push('');
  lines.push(`Ambiente: \`${options.environment}\``);
  lines.push(`App: \`${options.appUrl}\``);
  lines.push('');
  lines.push('## Metodología');
  lines.push('');
  for (const line of options.methodologyLines) {
    lines.push(`- ${line}`);
  }
  lines.push('');
  lines.push('## Resultado');
  lines.push('');
  for (const entry of options.entries) {
    const icon = entry.status === 'pass' ? '✅' : entry.status === 'warn' ? '⚠️' : '❌';
    lines.push(`- ${icon} **${entry.check}** — ${entry.status.toUpperCase()}`);
  }
  lines.push('');
  lines.push('## Artefactos');
  lines.push('');
  lines.push(`- \`${jsonPath}\``);
  lines.push(`- \`${markdownPath}\``);
  for (const entry of options.entries) {
    if (entry.screenshot) {
      lines.push(`- \`${entry.screenshot}\``);
    }
  }
  lines.push('');
  lines.push('## Evidencia visual');
  lines.push('');

  for (const entry of options.entries) {
    lines.push(`### ${entry.check}`);
    lines.push('');
    if (entry.screenshot) {
      const relativeScreenshot = path.relative(options.reportRoot, entry.screenshot).replace(/\\/g, '/');
      lines.push(`![${entry.check}](${relativeScreenshot})`);
      lines.push('');
    }
    if (entry.details !== undefined) {
      lines.push('```json');
      lines.push(JSON.stringify(entry.details, null, 2));
      lines.push('```');
      lines.push('');
    }
  }

  await fsPromises.writeFile(markdownPath, lines.join('\n'), 'utf-8');
}
