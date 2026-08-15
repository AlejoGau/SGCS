import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';

const GCS_BASE = process.env.BASE_URL || 'https://gcs.softguard.com';
const ADMIN_SEARCH_URL = `${GCS_BASE}/a/AdministratorSearch?version=`;
const TOKEN_FILE = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
const TOKEN = fs.existsSync(TOKEN_FILE) ? fs.readFileSync(TOKEN_FILE, 'utf-8').trim() : '';
const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1496-afip-adminsearch-ui');
const SCREENSHOT_ROOT = path.join(REPORT_ROOT, 'screenshots');
const RUN_DATE = new Date().toISOString().slice(0, 10);

type Status = 'pass' | 'fail' | 'warn';

interface EvidenceEntry {
  check: string;
  status: Status;
  details: unknown;
  screenshot?: string;
}

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

interface OrganizationFormScrollState {
  autoScroll: boolean;
  hasScrollableInstance: boolean;
  scrollHeight: number;
  clientHeight: number;
  scrollTop: number;
  overflowY: string;
  fieldsetExpanded: boolean;
  previewButtonVisible: boolean;
  previewButtonWithinWindow: boolean;
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

const evidence: EvidenceEntry[] = [];

function summarizeDetails(details: unknown): string {
  return JSON.stringify(details, null, 2).slice(0, 5000);
}

async function ensureReportDirs(): Promise<void> {
  await fsp.mkdir(REPORT_ROOT, { recursive: true });
  await fsp.mkdir(SCREENSHOT_ROOT, { recursive: true });
}

async function writeJsonReport(): Promise<void> {
  await ensureReportDirs();
  await fsp.writeFile(
    path.join(REPORT_ROOT, 'dk1496-afip-adminsearch-ui.json'),
    JSON.stringify(
      {
        ticket: 'DK-1496',
        generatedAt: new Date().toISOString(),
        baseUrl: GCS_BASE,
        adminSearchUrl: ADMIN_SEARCH_URL,
        tokenPresent: Boolean(TOKEN),
        checks: evidence,
      },
      null,
      2,
    ),
    'utf-8',
  );
}

async function writeMarkdownReport(): Promise<void> {
  await ensureReportDirs();
  const lines: string[] = [];
  lines.push(`# DK-1496 — Evidencia UI real AFIP en AdministratorSearch ${RUN_DATE}`);
  lines.push('');
  lines.push(`Ambiente: \`${GCS_BASE}\``);
  lines.push(`App: \`${ADMIN_SEARCH_URL}\``);
  lines.push(`Token OAuth auxiliar: ${TOKEN ? 'presente en `qa-automation/.auth/token.txt`.' : 'no requerido explícitamente por este spec (usa storageState del proyecto).'}`);
  lines.push('');
  lines.push('## Metodología');
  lines.push('');
  lines.push('- Navegación real en GCS sobre `AdministratorSearch` usando `?version=` para evitar el bundle compilado/cacheado.');
  lines.push('- Flujo ejecutado: `AdministratorSearch` → grid de organizaciones con fila `AfipCae` visible → botón `Configurar` → `orgcmetadataformview`.');
  lines.push('- Capturas tomadas como screenshots reales del viewport del navegador, no tarjetas HTML renderizadas.');
  lines.push('- Validación read-only: no se ejecutaron acciones mutantes como `Obtener CSR`, `Generar PFX` o `Guardar`.');
  lines.push('');
  lines.push('## Resultado');
  lines.push('');
  for (const entry of evidence) {
    const icon = entry.status === 'pass' ? '✅' : entry.status === 'warn' ? '⚠️' : '❌';
    lines.push(`- ${icon} **${entry.check}** — ${entry.status.toUpperCase()}`);
  }
  lines.push('');
  lines.push('## Artefactos');
  lines.push('');
  lines.push('- `qa-automation/reports/dk1496-afip-adminsearch-ui/dk1496-afip-adminsearch-ui.json`');
  lines.push('- `qa-automation/reports/dk1496-afip-adminsearch-ui/DK-1496-AFIP-ADMINSEARCH-UI-EVIDENCE.md`');
  for (const entry of evidence) {
    if (entry.screenshot) {
      lines.push(`- \`${entry.screenshot}\``);
    }
  }
  lines.push('');
  lines.push('## Evidencia visual');
  lines.push('');
  for (const entry of evidence) {
    if (!entry.screenshot) continue;
    const relative = path.relative(REPORT_ROOT, path.resolve(entry.screenshot)).replace(/\\/g, '/');
    lines.push(`### ${entry.check}`);
    lines.push('');
    lines.push(`![${entry.check}](${relative})`);
    lines.push('');
    lines.push('```json');
    lines.push(summarizeDetails(entry.details));
    lines.push('```');
    lines.push('');
  }

  await fsp.writeFile(path.join(REPORT_ROOT, 'DK-1496-AFIP-ADMINSEARCH-UI-EVIDENCE.md'), lines.join('\n'), 'utf-8');
}

async function captureViewport(page: Page, screenshotFile: string): Promise<string> {
  await ensureReportDirs();
  const absPath = path.join(SCREENSHOT_ROOT, screenshotFile);
  await page.screenshot({ path: absPath });
  return absPath;
}

async function waitForViewport(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return ext && ext.isReady && ext.getCmp && ext.getCmp('center') != null;
    },
    undefined,
    { timeout: 600_000, polling: 1000 },
  );
}

async function openOrgGrid(page: Page): Promise<void> {
  await waitForViewport(page);
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');
    if (!center) throw new Error('center tabpanel not found');

    const existing = center.items.getRange().find((tab: any) => tab.xtype === 'moneyguardorganizaciongridview');
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

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
      if (!grid) return false;
      const store = grid.getStore();
      return store && !store.isLoading();
    },
    undefined,
    { timeout: 120_000, polling: 500 },
  );

  await waitForAjaxComplete(page, 60_000);
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
          callback(records: any[], operation: any, success: boolean) {
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
      row.id === selected.id || (row.name === selected.name && row.factelect === 'AfipCae'),
    );

    return {
      candidateVisible,
      visible: store.getCount(),
      rows: rows.slice(0, 5),
    };
  }, candidate);

  if (visibleState.candidateVisible) {
    return {
      visible: visibleState.visible,
      rows: visibleState.rows,
    };
  }

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

async function expandFacturaConfig(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) throw new Error('moneyguardorganizacionformview not found');

    const fieldset = form.down('#facturaConfig');
    if (!fieldset) throw new Error('facturaConfig fieldset not found');

    if (fieldset.collapsed) {
      fieldset.expand();
    }
  });

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      const fieldset = form?.down?.('#facturaConfig');
      return Boolean(fieldset && !fieldset.collapsed && fieldset.isVisible?.());
    },
    undefined,
    { timeout: 60_000, polling: 500 },
  );
}

async function scrollOrganizationForm(page: Page, section: 'top' | 'bottom'): Promise<void> {
  await page.evaluate((targetSection) => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) throw new Error('moneyguardorganizacionformview not found');

    const candidates = [form.body?.dom, form.getTargetEl?.()?.dom, form.getEl?.()?.dom]
      .filter(Boolean);

    const scrollDom = candidates.sort((a: HTMLElement, b: HTMLElement) => {
      const aDelta = (a.scrollHeight || 0) - (a.clientHeight || 0);
      const bDelta = (b.scrollHeight || 0) - (b.clientHeight || 0);
      return bDelta - aDelta;
    })[0] as HTMLElement | undefined;

    if (!scrollDom) {
      throw new Error('Scrollable form element not found');
    }

    scrollDom.scrollTop = targetSection === 'bottom'
      ? Math.max(0, scrollDom.scrollHeight - scrollDom.clientHeight)
      : 0;
  }, section);
}

async function getOrganizationFormScrollState(page: Page): Promise<OrganizationFormScrollState> {
  return page.evaluate((): OrganizationFormScrollState => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) throw new Error('moneyguardorganizacionformview not found');

    const fieldset = form.down('#facturaConfig');
    const previewButton = form.down('button[action="previewFactura"]');
    const candidates = [form.body?.dom, form.getTargetEl?.()?.dom, form.getEl?.()?.dom]
      .filter(Boolean);

    const scrollDom = candidates.sort((a: HTMLElement, b: HTMLElement) => {
      const aDelta = (a.scrollHeight || 0) - (a.clientHeight || 0);
      const bDelta = (b.scrollHeight || 0) - (b.clientHeight || 0);
      return bDelta - aDelta;
    })[0] as HTMLElement | undefined;

    const computed = scrollDom ? window.getComputedStyle(scrollDom) : null;
    const formRect = form.getEl?.()?.dom?.getBoundingClientRect?.();
    const previewRect = previewButton?.getEl?.()?.dom?.getBoundingClientRect?.();

    return {
      autoScroll: Boolean(form.autoScroll),
      hasScrollableInstance: Boolean(form.getScrollable?.() || form.scrollable),
      scrollHeight: scrollDom?.scrollHeight || 0,
      clientHeight: scrollDom?.clientHeight || 0,
      scrollTop: scrollDom?.scrollTop || 0,
      overflowY: computed?.overflowY || '',
      fieldsetExpanded: Boolean(fieldset && !fieldset.collapsed),
      previewButtonVisible: Boolean(previewButton?.isVisible?.()),
      previewButtonWithinWindow: Boolean(
        formRect
          && previewRect
          && previewRect.top >= formRect.top
          && previewRect.bottom <= formRect.bottom,
      ),
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

async function setOrganizationFactelect(page: Page, value: '' | 'AfipCae'): Promise<void> {
  await page.evaluate((newValue) => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) throw new Error('moneyguardorganizacionformview not found');

    const factelectField = form.down('[name="org_factelect"]');
    if (!factelectField) throw new Error('org_factelect field not found');

    factelectField.setValue(newValue);
  }, value);

  await page.waitForFunction(
    (expectedValue) => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      const factelectField = form?.down?.('[name="org_factelect"]');
      return Boolean(factelectField && String(factelectField.getValue() || '') === expectedValue);
    },
    value,
    { timeout: 60_000, polling: 500 },
  );
}

async function openMetadataWindowForCurrentFactelect(page: Page, expectedAfipVisible: boolean): Promise<MetadataWindowState> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
    if (!form) throw new Error('moneyguardorganizacionformview not found');

    const button = form.down('#btnConfigurar');
    if (!button) throw new Error('btnConfigurar not found');
    button.fireEvent('click', button);
  });

  await page.waitForFunction(
    (shouldBeVisible) => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('orgcmetadataformview')[0];
      const afipFieldset = form?.down('#AfipCae');
      return Boolean(form && afipFieldset && afipFieldset.isVisible() === shouldBeVisible);
    },
    expectedAfipVisible,
    { timeout: 60_000, polling: 500 },
  );

  await waitForAjaxComplete(page, 60_000);
  return getMetadataWindowState(page);
}

async function closeMetadataWindow(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const forms = ext.ComponentQuery.query('orgcmetadataformview');
    const form = forms[forms.length - 1];
    const win = form?.up?.('window');
    if (win) {
      win.close();
    }
  });

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return ext.ComponentQuery.query('orgcmetadataformview').length === 0;
    },
    undefined,
    { timeout: 60_000, polling: 500 },
  );
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
    const mask = (value: string) => {
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
      cuitMasked: mask(cuit.trim()),
      debugValue: form.down('#debug')?.getValue?.(),
      csrLength: String(form.down('#csr')?.getValue?.() || '').trim().length,
      x509Length: String(form.down('#x509')?.getValue?.() || '').trim().length,
      obtenerCsrButtonVisible: Boolean(form.down('#btnObtenerCSR')?.isVisible?.()),
      generarPfxButtonVisible: Boolean(form.down('#btnGenerarPFX')?.isVisible?.()),
    };
  });
}

test.describe.serial('DK-1496 AFIP AdministratorSearch UI evidence @dk-1496 @afip @adminsearch @gcs @evidence', () => {
  test.beforeAll(async () => {
    await ensureReportDirs();
  });

  test.afterAll(async () => {
    await writeJsonReport();
    await writeMarkdownReport();
  });

  test('should capture real AdministratorSearch AFIP UI evidence using ?version=', async ({ page }) => {
    test.slow();

    await page.goto(ADMIN_SEARCH_URL, { waitUntil: 'domcontentloaded', timeout: 360_000 });
    await waitForExtReady(page, 360_000);
    await openOrgGrid(page);

    const candidates = await findAfipCandidates(page);
    expect(candidates.total, 'Debe existir al menos una organización con org_factelect = AfipCae en GCS').toBeGreaterThan(0);
    expect(candidates.records.length, 'La búsqueda de organizaciones AfipCae debe devolver filas').toBeGreaterThan(0);

    const candidate = candidates.records[0];
    const gridState = await applyCandidateToGrid(page, candidate);
    expect(gridState.visible, 'El grid debe mostrar al menos una organización AFIP visible').toBeGreaterThan(0);

    const gridScreenshot = await captureViewport(page, `${RUN_DATE}-01-adminsearch-grid-afip.png`);
    evidence.push({
      check: 'AdministratorSearch grid con organización AfipCae visible',
      status: 'pass',
      details: {
        searchedCandidate: candidate,
        candidatePool: candidates,
        visibleGridRows: gridState,
      },
      screenshot: gridScreenshot,
    });
    await writeJsonReport();

    const openedOrg = await openGridRow(page, candidate);
    const formState = await getOrganizationFormState(page);
    expect(formState.factelectValue, 'La organización abierta debe quedar en modo AfipCae').toBe('AfipCae');
    expect(formState.configureButtonVisible, 'El botón Configurar debe estar visible').toBe(true);

    const formScreenshot = await captureViewport(page, `${RUN_DATE}-02-adminsearch-org-form-afip.png`);
    evidence.push({
      check: 'Formulario de organización facturadora abierto en modo AfipCae',
      status: 'pass',
      details: {
        openedOrg,
        formState,
      },
      screenshot: formScreenshot,
    });
    await writeJsonReport();

    await setOrganizationFactelect(page, '');
    const noIntegrationMetadata = await openMetadataWindowForCurrentFactelect(page, false);
    expect(noIntegrationMetadata.afipFieldsetVisible, 'Si el desplegable queda en Sin integración, Configurar no debe mostrar AFIP').toBe(false);

    const noIntegrationScreenshot = await captureViewport(page, `${RUN_DATE}-dk1744-configurar-sin-integracion.png`);
    evidence.push({
      check: 'DK-1744 Configurar respeta Sin integración sin guardar',
      status: 'pass',
      details: {
        selectedFactelect: '',
        metadataState: noIntegrationMetadata,
        expectation: 'Sólo debe quedar visible la configuración de impresión.',
      },
      screenshot: noIntegrationScreenshot,
    });
    await writeJsonReport();
    await closeMetadataWindow(page);

    await setOrganizationFactelect(page, 'AfipCae');
    const afipDropdownMetadata = await openMetadataWindowForCurrentFactelect(page, true);
    expect(afipDropdownMetadata.afipFieldsetVisible, 'Si el desplegable queda en Afip electrónica, Configurar debe mostrar AFIP sin guardar').toBe(true);
    expect(afipDropdownMetadata.obtenerCsrButtonVisible, 'Debe verse Obtener CSR al seleccionar Afip electrónica sin guardar').toBe(true);
    expect(afipDropdownMetadata.generarPfxButtonVisible, 'Debe verse Generar PFX al seleccionar Afip electrónica sin guardar').toBe(true);

    const afipDropdownScreenshot = await captureViewport(page, `${RUN_DATE}-dk1744-configurar-afip-electronica.png`);
    evidence.push({
      check: 'DK-1744 Configurar respeta Afip electrónica sin guardar',
      status: 'pass',
      details: {
        selectedFactelect: 'AfipCae',
        metadataState: afipDropdownMetadata,
        expectation: 'Debe quedar visible toda la configuración AFIP inmediatamente.',
      },
      screenshot: afipDropdownScreenshot,
    });
    await writeJsonReport();
    await closeMetadataWindow(page);

    await expandFacturaConfig(page);
    const facturaConfigScrollState = await getOrganizationFormScrollState(page);
    expect(facturaConfigScrollState.fieldsetExpanded, 'La Configuración de Factura debe quedar expandida').toBe(true);
    expect(
      facturaConfigScrollState.autoScroll || facturaConfigScrollState.hasScrollableInstance,
      'El formulario debe conservar scroll al expandir Configuración de Factura',
    ).toBe(true);
    expect(
      facturaConfigScrollState.scrollHeight,
      'El contenedor scrollable debe crecer al expandir la configuración',
    ).toBeGreaterThan(facturaConfigScrollState.clientHeight);

    await scrollOrganizationForm(page, 'bottom');
    const facturaConfigBottomState = await getOrganizationFormScrollState(page);
    expect(facturaConfigBottomState.previewButtonVisible, 'El botón Preview Factura debe seguir visible').toBe(true);
    expect(
      facturaConfigBottomState.previewButtonWithinWindow,
      'El botón Preview Factura debe poder quedar dentro de la ventana visible al hacer scroll',
    ).toBe(true);

    const facturaConfigBottomScreenshot = await captureViewport(page, `${RUN_DATE}-03-adminsearch-factura-config-scroll-bottom.png`);
    evidence.push({
      check: 'Configuración de Factura conserva scroll en AdministratorSearch',
      status: 'pass',
      details: {
        initial: facturaConfigScrollState,
        bottom: facturaConfigBottomState,
      },
      screenshot: facturaConfigBottomScreenshot,
    });
    await writeJsonReport();

    await openMetadataWindow(page);
    await scrollMetadataSection(page, 'top');
    const metadataTop = await getMetadataWindowState(page);
    expect(metadataTop.afipFieldsetVisible, 'La ventana de metadata debe mostrar el fieldset AFIP').toBe(true);
    expect(metadataTop.obtenerCsrButtonVisible, 'Debe verse el botón Obtener CSR').toBe(true);
    expect(metadataTop.generarPfxButtonVisible, 'Debe verse el botón Generar PFX').toBe(true);

    const metadataTopScreenshot = await captureViewport(page, `${RUN_DATE}-04-adminsearch-afip-config-top.png`);
    evidence.push({
      check: 'Ventana Configuración AFIP abierta desde AdministratorSearch',
      status: 'pass',
      details: metadataTop,
      screenshot: metadataTopScreenshot,
    });
    await writeJsonReport();

    await scrollMetadataSection(page, 'bottom');
    const metadataBottom = await getMetadataWindowState(page);
    const metadataBottomStatus: Status = metadataBottom.cuitPresent ? 'pass' : 'warn';

    const metadataBottomScreenshot = await captureViewport(page, `${RUN_DATE}-05-adminsearch-afip-config-certs.png`);
    evidence.push({
      check: 'Sección de certificados AFIP visible en AdministratorSearch',
      status: metadataBottomStatus,
      details: {
        ...metadataBottom,
        note: metadataBottom.cuitPresent
          ? 'UI evidence only; CSR/PFX actions were intentionally not executed.'
          : 'UI visible, pero el CUIT no quedó poblado en esta organización. Se dejó como WARN porque la evidencia pedida es visual/read-only.',
      },
      screenshot: metadataBottomScreenshot,
    });
    await writeJsonReport();
    await writeMarkdownReport();
  });
});
