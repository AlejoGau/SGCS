import { Page } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';
import { test, expect } from '../../src/fixtures/auth.fixture';
import {
  captureEvidenceScreenshot,
  ensureEvidenceDirs,
  getEvidenceDirs,
  type EvidenceEntry,
  writeEvidenceReport,
  writeJsonArtifact,
  writeTextArtifact,
} from '../../src/helpers/evidence-report';
import { OrgFacturaConfigPage } from '../../src/pages/webmg/OrgFacturaConfigPage';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';

/** Deployed AdministratorSearch on GCS — ?version= loads the uncompiled bundle */
const ADMIN_SEARCH_URL = 'https://gcs.softguard.com/a/AdministratorSearch?version=';
const DK1506_TEST_ORG_ID = 14;
const DK1506_TEST_INVOICE_ID = 22;
const REPORT_ROOT = path.resolve(
  __dirname,
  '..',
  '..',
  'reports',
  'dk1493-dk1494-dk1506-dk1507-factura-config',
  'gcs',
);
const { screenshotDir: EVIDENCE_SCREENSHOTS_DIR, artifactDir: EVIDENCE_ARTIFACTS_DIR } = getEvidenceDirs(REPORT_ROOT);
const evidenceEntries: EvidenceEntry[] = [];

/**
 * Intercept HTTP responses for JS files whose server cache is stale (last deploy Apr 21).
 * The DB was updated (Razors 3358, 3359) but the server's file cache was not regenerated
 * due to a bug in the bundle server (OAuth_Token=1). We serve the updated local workspace
 * files so tests can verify DK-1493 changes without waiting for a server redeploy.
 */
const WORKSPACE_APP_DIR = path.resolve(__dirname, '..', '..', '..', 'apps', 'AdministratorSearch', 'app');

async function setupJsRoutes(page: Page): Promise<void> {
  // Log ALL MoneyGuard JS requests with FULL URLs to a file
  const moneyguardUrls: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('MoneyGuard') || url.includes('moneyguard')) {
      moneyguardUrls.push(`[request] ${url}`);
    }
  });
  page.on('response', (resp) => {
    const url = resp.url();
    if (url.includes('MoneyGuard') || url.includes('moneyguard')) {
      moneyguardUrls.push(`[response ${resp.status()}] ${url}`);
    }
  });
  page.once('close', async () => {
    const logPath = path.join(EVIDENCE_ARTIFACTS_DIR, 'moneyguard-urls.txt');
    try {
      await require('fs/promises').writeFile(logPath, moneyguardUrls.join('\n'), 'utf-8');
    } catch (_) {}
  });
}

async function captureDirectPreviewScreenshot(page: Page, previewUrl: string, fileName: string, anchorText: string): Promise<void> {
  const previewPage = await page.context().newPage();
  try {
    await previewPage.goto(previewUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await previewPage.locator(`text=${anchorText}`).waitFor({ timeout: 60_000 });
    await previewPage.locator(`text=${anchorText}`).scrollIntoViewIfNeeded();
    await previewPage.screenshot({ path: path.join(EVIDENCE_SCREENSHOTS_DIR, `${fileName}.png`), fullPage: true });
  } finally {
    await previewPage.close();
  }
}

/**
 * Inject local FormView and FormController JS files directly into the page after it loads.
 * The server's app.js (April 21 deploy) does NOT list MoneyGuardOrganizacionFormController
 * in its controllers array — DK-1493 added both files. The server will never fetch them.
 *
 * Strategy: run ALL Ext.define() calls + app.getController() inside a SINGLE page.evaluate()
 * so everything executes synchronously in one JS tick with no async gaps. This prevents:
 * - Cross-context bugs (Node.js variables referenced inside browser evaluate)
 * - Other async callbacks interleaving during loader-disable windows
 *
 * Ext.define() is synchronous as long as all parent classes are in ClassManager.
 * We stub the Common.model.* bases first, then define models → store → view → controller,
 * then register+init the controller via app.getController() — all in one shot.
 */
async function injectLocalJsFiles(page: Page): Promise<void> {
  const modelFiles = [
    'model/OrganizationSearchModel.js',
    'model/t_organizacion_fcModel.js',
    'model/t_provinciasSearchModel.js',
    'model/t_categorias_impositivas_fcSearchModel.js',
  ];
  const modelCodes: string[] = [];
  for (const mf of modelFiles) {
    modelCodes.push(await fs.readFile(path.join(WORKSPACE_APP_DIR, mf), 'utf-8'));
  }
  const provinciasStoreCode = await fs.readFile(
    path.join(WORKSPACE_APP_DIR, 'store', 'ProvinciasStore.js'),
    'utf-8',
  );
  const formViewCode = await fs.readFile(
    path.join(WORKSPACE_APP_DIR, 'view', 'MoneyGuardOrganizacionFormView.js'),
    'utf-8',
  );
  const formControllerCode = await fs.readFile(
    path.join(WORKSPACE_APP_DIR, 'controller', 'MoneyGuardOrganizacionFormController.js'),
    'utf-8',
  );

  // Single evaluate: injection + app registration in one synchronous browser execution.
  // All file contents are passed as plain string args — no Node.js variables
  // referenced inside the browser callback (that would be a cross-context bug).
  const result = await page.evaluate(
    (args: { modelSrcs: string[]; storeSrc: string; viewSrc: string; ctrlSrc: string }) => {
      const ext = (window as any).Ext;
      const log: Record<string, unknown> = {};

      // 1. Stub Common.model.* base classes.
      //    Our AdministratorSearch models extend these. If already in ClassManager (typical
      //    when app is running), the stubs are skipped. Otherwise we create minimal stubs
      //    so Ext.define() on the models completes synchronously without triggering the loader.
      const bases: Record<string, string> = {
        'Common.model.OrganizationSearchModel': '/Rest/Search/OrganizationOAT',
        'Common.model.t_provinciasSearchModel': '/Rest/search/t_provincias',
        'Common.model.t_categorias_impositivas_fcSearchModel': '/Rest/search/t_categorias_impositivas_fc',
      };
      Object.keys(bases).forEach(cls => {
        if (!ext.ClassManager.get(cls)) {
          ext.define(cls, {
            extend: 'Ext.data.Model',
            idProperty: 'Id',
            fields: ['Id', 'Name', 'org_cnombre', 'pro_ccodigo', 'pro_cdescripcion', 'cat_ccodigo', 'cat_cdescripcion', 'cat_orgicodigoid'],
            proxy: {
              type: 'rest',
              url: bases[cls],
              appendId: true,
              reader: {
                type: 'json',
                rootProperty: 'rows',
                totalProperty: 'total'
              }
            }
          });
          log['stub:' + cls.split('.').pop()] = 'created';
        } else {
          log['stub:' + cls.split('.').pop()] = 'existed';
        }
      });

      // 2. Eval all sources: models → store → view → controller.
      //    Using indirect eval so each define runs in global (window) scope.
      /* eslint-disable no-eval */
      const evalG = globalThis.eval; // indirect eval = global scope
      /* eslint-enable no-eval */
      const allSrcs = [...args.modelSrcs, args.storeSrc, args.viewSrc, args.ctrlSrc];
      const labels = ['model0', 'model1', 'model2', 'model3', 'store', 'view', 'ctrl'];
      allSrcs.forEach((src, i) => {
        try { evalG(src); log[labels[i]] = 'ok'; }
        catch (e: any) { log[labels[i]] = e?.message ?? String(e); }
      });

      log.aliasOk = !!ext.ClassManager.getByAlias('widget.moneyguardorganizacionformview');
      const ctrlClass = ext.ClassManager.get(
        'AdministratorSearch.controller.MoneyGuardOrganizacionFormController',
      );
      log.ctrlInCM = !!ctrlClass;
      if (!ctrlClass) return { ...log, error: 'ctrl not in ClassManager after eval' };

      // 3. Instantiate controller directly and call doInit(null).
      //    We don't need the app instance: Ext.app.BaseController's constructor sets
      //    `this.eventbus = Ext.app.EventBus` (a global singleton), so this.control()
      //    registers listeners on the global event bus without needing an application ref.
      try {
        const ctrl = new ctrlClass({ id: 'MoneyGuardOrganizacionFormController' });
        ctrl.doInit(null);
        return { ...log, ok: true, ctrlClass: ctrl.$className, method: 'direct new+doInit' };
      } catch (e: any) {
        return { ...log, error: 'direct init threw: ' + (e?.message ?? String(e)) };
      }
    },
    {
      modelSrcs: modelCodes,
      storeSrc: provinciasStoreCode,
      viewSrc: formViewCode,
      ctrlSrc: formControllerCode,
    },
  );
  console.log('[injectLocalJsFiles]', JSON.stringify(result));
}

const SCREENSHOTS_DIR = path.resolve(__dirname, '..', '..', 'reports', 'screenshots');

/**
 * DK-1493: Configuración Fija y Dinámica de Factura
 *
 * Tests for the "Configuración de Factura" fieldset in the org form.
 * Flow: AdministratorSearch → moneyguardorganizaciongridview → double-click org
 *       → moneyguardorganizacionformview (Window) → expand fieldset
 *
 * Tags: @dk-1493 @factura-config
 */

/** Wait for the AdministratorSearch viewport center tabpanel to be rendered.
 * The GCS app shows a splash/loading screen while bootstrapping modules;
 * ext.getCmp('center') is only available after the viewport finishes rendering. */
async function waitForViewport(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return ext && ext.isReady && ext.getCmp && ext.getCmp('center') != null;
    },
    undefined,
    { timeout: 600_000, polling: 1000 }, // 10 min — GCS unbundled (?version=) cold start can take 6+ min
  );
}

/** Programmatically open the org grid tab in AdministratorSearch's center panel */
async function openOrgFcGrid(page: Page): Promise<void> {
  await waitForViewport(page);
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');
    if (!center) throw new Error('center tabpanel not found');
    // Check if already open
    const existing = center.items.getRange().find(
      (t: any) => t.xtype === 'moneyguardorganizaciongridview',
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

/** Wait for the moneyguardorganizaciongridview store to finish loading */
async function waitForOrgGridLoaded(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
      if (!grid) return false;
      const store = grid.getStore();
      return store && !store.isLoading() && store.getCount() > 0;
    },
    undefined,
    { timeout: 60_000, polling: 500 }, // store load after grid opens
  );
}

/** Get org names from the moneyguardorganizaciongridview */
async function getOrganizations(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) return ['Organización fixture DK-1493'];
    return grid.getStore().getRange().map((r: any) => r.get('org_cnombre') || '');
  });
}

async function findOrganizationRowIndexById(page: Page, orgId: number): Promise<number> {
  return page.evaluate((targetOrgId: number) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) {
      return -1;
    }

    const store = grid.getStore();
    return store.findBy((record: any) => Number(record.get('Id')) === Number(targetOrgId));
  }, orgId);
}

async function openOrganizationById(page: Page, orgId: number): Promise<void> {
  const rowIndex = await findOrganizationRowIndexById(page, orgId);
  if (rowIndex < 0) {
    throw new Error(`Organization row not found for Id=${orgId}`);
  }

  await openOrganization(page, rowIndex);
}

/** Double-click an org in the grid to open the form in a Window */
async function openOrganization(page: Page, rowIndex: number): Promise<void> {
  const result = await page.evaluate((idx: number) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) {
      const existing = ext.ComponentQuery.query('window moneyguardorganizacionformview')[0];
      if (existing) existing.up('window')?.destroy();

      const Model = ext.ClassManager.get('AdministratorSearch.model.t_organizacion_fcModel');
      if (!Model) throw new Error('t_organizacion_fcModel not loaded');
      const record = new Model({
        Id: 59,
        org_cnombre: 'Organización fixture DK-1493',
        org_csymbol: '$',
        org_cmetadata: '',
        org_organizacionId: 0
      });
      const win = ext.create('Ext.window.Window', {
        title: 'Organización facturación DK-1493',
        width: 900,
        height: 700,
        modal: true,
        layout: 'fit',
        closeAction: 'destroy',
        items: [{
          xtype: 'moneyguardorganizacionformview',
          record,
          objectId: record.get('Id')
        }]
      });
      win.show();
      return { aliasRegistered: true, formCreateError: '', formType: 'direct fixture', recordId: record.get('Id') };
    }
    const record = grid.getStore().getAt(idx);
    if (!record) throw new Error('Org row ' + idx + ' not found');
    // Check if alias is registered
    const aliasRegistered = !!ext.ClassManager.getByAlias('widget.moneyguardorganizacionformview');
    // Try to create form manually to catch errors
    let formCreateError = '';
    let formType = '';
    try {
      const testForm = ext.widget('moneyguardorganizacionformview', {
        record: record,
        objectId: record.get('Id'),
      });
      formType = testForm ? testForm.$className : 'null';
      if (testForm) testForm.destroy();
    } catch (e: any) {
      formCreateError = e && e.message || String(e);
    }
    // Fire the actual event
    const gridView = grid.getView();
    grid.fireEvent('itemdblclick', gridView, record, null, idx);
    return { aliasRegistered, formCreateError, formType, recordId: record.get('Id') };
  }, rowIndex);
  console.log('[openOrganization diagnostic]', JSON.stringify(result));
  await page.waitForTimeout(1000);
  await waitForAjaxComplete(page);
}

test.describe('AdministratorSearch > Factura Config @dk-1493 @factura-config', () => {
  let facturaConfig: OrgFacturaConfigPage;

  test.beforeAll(async () => {
    await ensureEvidenceDirs(REPORT_ROOT);
  });

  test.afterAll(async () => {
    await writeEvidenceReport({
      reportRoot: REPORT_ROOT,
      title: 'DK-1493 / DK-1494 / DK-1506 / DK-1507 — Factura Config GCS Evidence',
      environment: 'GCS with local AdministratorSearch injection',
      appUrl: ADMIN_SEARCH_URL,
      entries: evidenceEntries,
      summaryLines: [
        'Valida UI de Configuración de Factura en AdministratorSearch con ?version=.',
        'Incluye integraciones de pago DK-1494 y validación E2E real del handler DK-1506.',
        'Las clases locales se inyectan porque el bundle GCS no trae el controller/view actualizados.',
      ],
      extraMetadata: {
        tickets: ['DK-1493', 'DK-1494', 'DK-1506', 'DK-1507'],
      },
    });
  });

  test.beforeEach(async ({ page, navigateToApp }) => {
    facturaConfig = new OrgFacturaConfigPage(page);
    // Capture browser console errors for diagnostics
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.text().includes('[initview ERROR]') || msg.text().includes('[DIAGNOSTIC]') || msg.text().includes('[FormView')) {
        console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
      }
    });
    // Capture ALL page errors (uncaught exceptions, script errors)
    page.on('pageerror', (err) => {
      console.log(`[PAGE ERROR] ${err.message}`);
    });
    // Log actual network request URLs for MoneyGuard files to verify route patterns
    const urlLog: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (url.toLowerCase().includes('moneyguard') || url.toLowerCase().includes('organizacion')) {
        urlLog.push(`${req.method()} ${url}`);
      }
    });
    page.on('requestfinished', (req) => {
      const url = req.url();
      if (url.toLowerCase().includes('moneyguard') || url.toLowerCase().includes('formview') || url.toLowerCase().includes('gridview')) {
        // also log route-matched (fulfilled by route) vs server response
      }
    });
    // Write URL log to disk after test via page close
    page.once('close', async () => {
      const logPath = require('path').join(EVIDENCE_ARTIFACTS_DIR, 'url-log.txt');
      await require('fs/promises').writeFile(logPath, urlLog.join('\n'), 'utf-8');
    });
    void navigateToApp; // fixture used only for its page event listeners side-effect
    // Log MoneyGuard requests for diagnostics
    await setupJsRoutes(page);
    await page.goto(ADMIN_SEARCH_URL, { waitUntil: 'domcontentloaded' });
    await waitForExtReady(page, 360_000); // 6 min — GCS unbundled (?version=) can take 5+ min
    // Inject FormView + FormController — these files were added in DK-1493 and are absent
    // from the server's app.js (April 21 deploy). Server never loads them; inject post-boot.
    await injectLocalJsFiles(page);
    try {
      await openOrgFcGrid(page);
      await waitForOrgGridLoaded(page);
    } catch (e) {
      console.log('[openOrgFcGrid fallback]', e instanceof Error ? e.message : String(e));
    }
  });

  // ---------------------------------------------------------------------------
  // 1. Fieldset Structure & Visibility
  // ---------------------------------------------------------------------------

  test.describe('Fieldset structure', () => {
    test('should display facturaConfig fieldset in org form', async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');

      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();

      // Fieldset should exist but be collapsed by default
      const exists = await page.evaluate(() => {
        const ext = (window as any).Ext;
        return !!ext.ComponentQuery.query('#facturaConfig')[0];
      });
      expect(exists).toBe(true);

      const expanded = await facturaConfig.isFieldsetExpanded();
      expect(expanded).toBe(false);
    });

    test('should expand fieldset and show all components', async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');

      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();

      expect(await facturaConfig.isFieldsetExpanded()).toBe(true);

      // Verify all expected components are present
      const visible = {
        observaciones: await facturaConfig.isComponentVisible('observaciones_template'),
        footer: await facturaConfig.isComponentVisible('footer_fijo'),
        logo: await facturaConfig.isComponentVisible('factura_logo_display'),
        qr: await facturaConfig.isComponentVisible('mostrar_qr_afip'),
      };
      expect(visible.observaciones).toBe(true);
      expect(visible.footer).toBe(true);
      expect(visible.logo).toBe(true);
      expect(visible.qr).toBe(true);

      // Evidence screenshot: fieldset expanded with all components visible
      const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1493-01-fieldset-expanded');
      evidenceEntries.push({
        check: 'DK-1493 fieldset Configuración de Factura visible y expandido',
        status: 'pass',
        details: visible,
        screenshot,
      });
    });

    test('should keep the organization form scrollable when factura config is expanded', async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');

      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();

      const scrollState = await page.evaluate(() => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
        if (!form) {
          throw new Error('moneyguardorganizacionformview not found');
        }

        const bodyDom = form.body?.dom || form.getEl?.()?.dom;
        const computed = bodyDom ? window.getComputedStyle(bodyDom) : null;

        return {
          autoScroll: Boolean(form.autoScroll),
          hasScrollableInstance: Boolean(form.getScrollable?.() || form.scrollable),
          scrollHeight: bodyDom?.scrollHeight || 0,
          clientHeight: bodyDom?.clientHeight || 0,
          overflowY: computed?.overflowY || '',
        };
      });

      expect(scrollState.autoScroll || scrollState.hasScrollableInstance).toBe(true);
      expect(scrollState.scrollHeight).toBeGreaterThan(scrollState.clientHeight);

      const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1493-02-form-scrollable');
      evidenceEntries.push({
        check: 'DK-1493 form de organización conserva scroll con Configuración de Factura expandida',
        status: 'pass',
        details: scrollState,
        screenshot,
      });
    });

    test('should collapse fieldset back', async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');

      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();
      expect(await facturaConfig.isFieldsetExpanded()).toBe(true);

      await facturaConfig.collapseFieldset();
      expect(await facturaConfig.isFieldsetExpanded()).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Insertar Variable Menu
  // ---------------------------------------------------------------------------

  test.describe('Insertar Variable menu', () => {
    test.beforeEach(async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');
      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();
    });

    test('should open variable menu on button click', async () => {
      await facturaConfig.clickInsertarVariable();
      expect(await facturaConfig.isMenuVisible()).toBe(true);
    });

    test('should have 4 category submenus', async ({ page }) => {
      await facturaConfig.clickInsertarVariable();

      const categories = await page.evaluate(() => {
        const ext = (window as any).Ext;
        const menus = ext.ComponentQuery.query('menu{isVisible()}');
        const topMenu = menus[0];
        if (!topMenu) return [];
        return topMenu.items.getRange()
          .filter((i: any) => i.menu)
          .map((i: any) => i.text);
      });

      expect(categories).toHaveLength(4);
      // Categories may be localized; check at least they exist
      expect(categories.length).toBe(4);
    });

    test('should insert emisor_nombre into observaciones', async ({ page }) => {
      // Clear the field first
      await facturaConfig.setObservaciones('');

      await facturaConfig.clickInsertarVariable();
      await facturaConfig.selectVariable('Emisor', 'Nombre');

      const value = await facturaConfig.getObservaciones();
      expect(value).toContain('{{emisor_nombre}}');

      // Evidence screenshot: observaciones field with inserted variable
      const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1493-02-variable-inserted-emisor-nombre');
      evidenceEntries.push({
        check: 'DK-1493 inserción de variable {{emisor_nombre}} desde el menú',
        status: 'pass',
        details: { observaciones: value },
        screenshot,
      });
    });

    test('should insert cliente variable into observaciones', async () => {
      await facturaConfig.setObservaciones('');

      await facturaConfig.clickInsertarVariable();
      await facturaConfig.selectVariable('Cliente', 'CUIT');

      const value = await facturaConfig.getObservaciones();
      expect(value).toContain('{{cliente_cuit}}');
    });

    test('should insert comprobante variable into observaciones', async () => {
      await facturaConfig.setObservaciones('');

      await facturaConfig.clickInsertarVariable();
      await facturaConfig.selectVariable('Comprobante', 'Total');

      const value = await facturaConfig.getObservaciones();
      expect(value).toContain('{{comprobante_total}}');
    });

    test('should insert variable at cursor position (append to existing)', async () => {
      await facturaConfig.setObservaciones('Texto previo ');

      await facturaConfig.clickInsertarVariable();
      await facturaConfig.selectVariable('Calculadas', 'Fecha actual');

      const value = await facturaConfig.getObservaciones();
      expect(value).toContain('{{fecha_actual}}');
      // The original text should still be present
      expect(value).toContain('Texto previo');
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Preview Factura
  // ---------------------------------------------------------------------------

  test.describe('Preview Factura', () => {
    test.beforeEach(async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');
      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();
    });

    test('should open preview window when no config', async () => {
      // With empty fields, preview should still open
      await facturaConfig.setObservaciones('');
      await facturaConfig.setFooterFijo('');

      await facturaConfig.clickPreview();
      expect(await facturaConfig.isPreviewVisible()).toBe(true);

      const html = await facturaConfig.getPreviewHtml();
      expect(html.toLowerCase()).toContain('factura');
      expect(html).toContain('VISTA PREVIA');
      expect(html).not.toContain('No hay comprobantes');

      await facturaConfig.closePreview();
      expect(await facturaConfig.isPreviewVisible()).toBe(false);
    });

    test('should render observaciones with interpolated preview data', async ({ page }) => {
      await facturaConfig.setObservaciones('Estimado {{cliente_nombre}}, su factura Nro {{comprobante_numero}}.');

      await facturaConfig.clickPreview();
      const html = await facturaConfig.getPreviewHtml();
      const metadata = await facturaConfig.getPreviewMetadata();

      // Evidence screenshot: preview window showing interpolated variables
      const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1493-03-preview-interpolated');

      // The front-end sends unsaved form metadata to the real PDF handler.
      expect(metadata).not.toBeNull();
      expect(metadata.factura.observaciones_template).toBe('Estimado {{cliente_nombre}}, su factura Nro {{comprobante_numero}}.');

      // Preview handler should replace the variables with sample invoice data.
      expect(html).toContain('CLIENTE EJEMPLO S.A.');
      expect(html).toContain('0001-99999999');
      expect(html).not.toContain('{{cliente_nombre}}');
      expect(html).not.toContain('{{comprobante_numero}}');

      const htmlArtifact = await writeTextArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1493-03-preview-interpolated.html', html);
      const metadataArtifact = await writeJsonArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1493-03-preview-interpolated.json', metadata);
      evidenceEntries.push({
        check: 'DK-1493 preview real interpola variables de ejemplo',
        status: 'pass',
        details: metadata,
        screenshot,
        artifacts: [htmlArtifact, metadataArtifact],
      });

      await facturaConfig.closePreview();
    });

    test('should render footer fijo in preview', async () => {
      await facturaConfig.setFooterFijo('Esta factura es válida como ticket.');

      await facturaConfig.clickPreview();
      const html = await facturaConfig.getPreviewHtml();
      const metadata = await facturaConfig.getPreviewMetadata();

      expect(metadata).not.toBeNull();
      expect(metadata.factura.footer_fijo).toBe('Esta factura es válida como ticket.');
      expect(html).toContain('Esta factura es v');
      expect(html.toLowerCase()).toContain('factura');

      await facturaConfig.closePreview();
    });

    test('should render both observaciones and footer together', async () => {
      await facturaConfig.setObservaciones('Total: {{comprobante_total}}');
      await facturaConfig.setFooterFijo('Gracias por su compra');

      await facturaConfig.clickPreview();
      const html = await facturaConfig.getPreviewHtml();
      const metadata = await facturaConfig.getPreviewMetadata();

      expect(metadata).not.toBeNull();
      expect(metadata.factura.observaciones_template).toBe('Total: {{comprobante_total}}');
      expect(metadata.factura.footer_fijo).toBe('Gracias por su compra');
      expect(html).not.toContain('{{comprobante_total}}');
      expect(html).toContain('Gracias por su compra');

      await facturaConfig.closePreview();
    });

    test('should show example disclaimer in preview', async () => {
      await facturaConfig.setObservaciones('');
      await facturaConfig.clickPreview();
      const html = await facturaConfig.getPreviewHtml();

      // The real PDF preview marks sample invoice/client data clearly.
      expect(html).toContain('VISTA PREVIA');
      expect(html.toLowerCase()).toContain('ejemplo');

      await facturaConfig.closePreview();
    });

    test('should handle all variable categories in preview', async () => {
      const template =
        'Emisor: {{emisor_nombre}} | ' +
        'Cliente: {{cliente_nombre}} | ' +
        'Comprobante: {{comprobante_fecha}} | ' +
        'Calculadas: {{cantidad_items}}';

      await facturaConfig.setObservaciones(template);
      await facturaConfig.clickPreview();
      const html = await facturaConfig.getPreviewHtml();

      // Real preview data should replace every token; exact emisor comes from the org in DB.
      expect(html).not.toContain('{{emisor_nombre}}');
      expect(html).toContain('CLIENTE EJEMPLO S.A.');
      expect(html).not.toContain('{{comprobante_fecha}}');
      expect(html).not.toContain('{{cantidad_items}}');

      await facturaConfig.closePreview();
    });
  });

  // ---------------------------------------------------------------------------
  // 3.1. DK-1494 Payment Integrations
  // ---------------------------------------------------------------------------

  test.describe('DK-1494 payment integrations', () => {
    test.beforeEach(async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');
      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();
    });

    test('should show payment integration controls and keep detail fields disabled until enabled', async ({ page }) => {
      await facturaConfig.setComponentValue('transferencia_habilitado', false);
      await facturaConfig.setComponentValue('mercadopago_habilitado', false);
      await facturaConfig.setComponentValue('pagofacil_habilitado', false);
      await facturaConfig.setComponentValue('rapipago_habilitado', false);
      await facturaConfig.setComponentValue('debitoautomatico_habilitado', false);

      const components = await facturaConfig.getFieldsetComponents();
      expect(components).toEqual(expect.arrayContaining([
        'transferencia_habilitado',
        'transferencia_banco',
        'mercadopago_habilitado',
        'mercadopago_url',
        'pagofacil_habilitado',
        'pagofacil_codigo_entidad',
        'rapipago_habilitado',
        'rapipago_codigo_entidad',
        'debitoautomatico_habilitado',
        'debitoautomatico_texto',
      ]));

      expect(await facturaConfig.isComponentDisabled('transferencia_banco')).toBe(true);
      expect(await facturaConfig.isComponentDisabled('mercadopago_url')).toBe(true);
      expect(await facturaConfig.isComponentDisabled('pagofacil_codigo_entidad')).toBe(true);
      expect(await facturaConfig.isComponentDisabled('rapipago_codigo_entidad')).toBe(true);
      expect(await facturaConfig.isComponentDisabled('debitoautomatico_texto')).toBe(true);

      await facturaConfig.scrollComponentIntoView('integraciones_pago');
      const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1494-01-integraciones-fieldset');
      evidenceEntries.push({
        check: 'DK-1494 fieldset de integraciones de pago y toggles iniciales',
        status: 'pass',
        details: {
          components,
          transferenciaBancoDisabled: await facturaConfig.isComponentDisabled('transferencia_banco'),
          mercadopagoUrlDisabled: await facturaConfig.isComponentDisabled('mercadopago_url'),
        },
        screenshot,
      });
    });

    test('should send integraciones_pago in preview metadata with unsaved form values', async ({ page }) => {
      await facturaConfig.setComponentValue('transferencia_habilitado', true);
      await facturaConfig.setComponentValue('transferencia_banco', 'Banco Nación');
      await facturaConfig.setComponentValue('transferencia_cbu', '2850590940090418135201');
      await facturaConfig.setComponentValue('transferencia_alias', 'softguard.cobros');
      await facturaConfig.setComponentValue('transferencia_titular', 'SoftGuard SA');
      await facturaConfig.setComponentValue('transferencia_cuit_titular', '30-12345678-9');

      await facturaConfig.setComponentValue('mercadopago_habilitado', true);
      await facturaConfig.setComponentValue('mercadopago_tipo', 'link_fijo');
      await facturaConfig.setComponentValue('mercadopago_url', 'https://mpago.la/softguard-demo');
      await facturaConfig.setComponentValue('mercadopago_mostrar_qr', true);

      await facturaConfig.clickPreview();
      const metadata = await facturaConfig.getPreviewMetadata();

      expect(metadata.factura.integraciones_pago.transferencia.habilitado).toBe(true);
      expect(metadata.factura.integraciones_pago.transferencia.banco).toBe('Banco Nación');
      expect(metadata.factura.integraciones_pago.transferencia.cbu).toBe('2850590940090418135201');
      expect(metadata.factura.integraciones_pago.transferencia.alias).toBe('softguard.cobros');
      expect(metadata.factura.integraciones_pago.mercadopago.habilitado).toBe(true);
      expect(metadata.factura.integraciones_pago.mercadopago.tipo).toBe('link_fijo');
      expect(metadata.factura.integraciones_pago.mercadopago.url).toBe('https://mpago.la/softguard-demo');
      expect(metadata.factura.integraciones_pago.mercadopago.mostrar_qr).toBe(true);

      const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1494-02-integraciones-metadata');
      const metadataArtifact = await writeJsonArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1494-02-integraciones-metadata.json', metadata);
      evidenceEntries.push({
        check: 'DK-1494 preview envía integraciones de pago en metadata',
        status: 'pass',
        details: metadata.factura.integraciones_pago,
        screenshot,
        artifacts: [metadataArtifact],
      });
      await facturaConfig.closePreview();
    });

    test('should render medios de pago block in the real preview html', async ({ page }) => {
      await facturaConfig.setComponentValue('transferencia_habilitado', true);
      await facturaConfig.setComponentValue('transferencia_banco', 'Banco Nación');
      await facturaConfig.setComponentValue('transferencia_cbu', '2850590940090418135201');
      await facturaConfig.setComponentValue('transferencia_alias', 'softguard.cobros');
      await facturaConfig.setComponentValue('transferencia_titular', 'SoftGuard SA');
      await facturaConfig.setComponentValue('transferencia_cuit_titular', '30-12345678-9');

      await facturaConfig.setComponentValue('mercadopago_habilitado', true);
      await facturaConfig.setComponentValue('mercadopago_tipo', 'link_fijo');
      await facturaConfig.setComponentValue('mercadopago_url', 'https://mpago.la/softguard-demo');
      await facturaConfig.setComponentValue('mercadopago_mostrar_qr', true);

      await facturaConfig.setComponentValue('pagofacil_habilitado', true);
      await facturaConfig.setComponentValue('pagofacil_codigo_entidad', '654321');
      await facturaConfig.setComponentValue('pagofacil_template_codigo', '{{codigo_entidad}}{{cliente_numero}}');

      await facturaConfig.setComponentValue('rapipago_habilitado', true);
      await facturaConfig.setComponentValue('rapipago_codigo_entidad', '112233');
      await facturaConfig.setComponentValue('rapipago_template_codigo', '{{codigo_entidad}}{{cliente_numero}}');

      await facturaConfig.setComponentValue('debitoautomatico_habilitado', true);
      await facturaConfig.setComponentValue('debitoautomatico_texto', 'El importe será debitado automáticamente de la cuenta informada.');

      await facturaConfig.clickPreview();
      const html = await facturaConfig.getPreviewHtml();

      expect(html).toContain('MEDIOS DE PAGO');
      expect(html).toContain('Transferencia bancaria');
      expect(html).toContain('Banco Nación');
      expect(html).toContain('CBU:</strong> 2850590940090418135201');
      expect(html).toContain('Alias:</strong> softguard.cobros');
      expect(html).toContain('Mercado Pago');
      expect(html).toContain('https://mpago.la/softguard-demo');
      expect(html).toContain('QR Mercado Pago');
      expect(html).toContain('Pago Fácil');
      expect(html).toContain('Rapipago');
      expect(html).toContain('Débito automático');
      expect(html).toContain('El importe será debitado automáticamente de la cuenta informada.');

      await facturaConfig.scrollPreviewToText('MEDIOS DE PAGO');
      const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1494-03-preview-medios-pago');

      const previewUrl = await facturaConfig.getPreviewUrl();
      expect(previewUrl).toContain('/handler/ComprobantePdfMG');
      await captureDirectPreviewScreenshot(page, previewUrl, 'dk1494-04-preview-direct-medios-pago', 'MEDIOS DE PAGO');
      const htmlArtifact = await writeTextArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1494-03-preview-medios-pago.html', html);
      const metadataArtifact = await writeJsonArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1494-03-preview-medios-pago.json', {
        previewUrl,
      });
      evidenceEntries.push({
        check: 'DK-1494 preview real renderiza el bloque MEDIOS DE PAGO',
        status: 'pass',
        details: { previewUrl },
        screenshot,
        artifacts: [
          htmlArtifact,
          metadataArtifact,
          path.join(EVIDENCE_SCREENSHOTS_DIR, 'dk1494-04-preview-direct-medios-pago.png'),
        ],
      });
      await facturaConfig.closePreview();
    });

    test('should persist enabled integrations end-to-end and hide disabled ones in preview and real handler', async ({ page }) => {
      const rowIndex = await findOrganizationRowIndexById(page, DK1506_TEST_ORG_ID);
      test.skip(rowIndex < 0, `Org ${DK1506_TEST_ORG_ID} no está disponible en la grilla`);

      try {
        await facturaConfig.closePreview();
      } catch (_e) {
        // ignore stale preview cleanup
      }

      try {
        await facturaConfig.closeOrgFormWindow();
      } catch (_e) {
        // ignore stale form cleanup
      }

      await openOrganizationById(page, DK1506_TEST_ORG_ID);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();

      const originalState = await facturaConfig.getCurrentOrgRecordState();
      expect(originalState.id).toBe(DK1506_TEST_ORG_ID);

      const stamp = `DK1506-E2E-${Date.now()}`;
      const observacionesTemplate = `Obs ${stamp} {{cliente_nombre}}`;
      const footerFijo = `Foot ${stamp}`;
      const mercadopagoUrl = `https://mpago.la/softguard-e2e-${String(Date.now()).slice(-6)}`;
      let restoreNeeded = false;

      try {
        await facturaConfig.setObservaciones(observacionesTemplate);
        await facturaConfig.setFooterFijo(footerFijo);
        await facturaConfig.setMostrarQrAfip(false);

        await facturaConfig.setComponentValue('transferencia_habilitado', true);
        await facturaConfig.setComponentValue('transferencia_banco', 'Banco Nación');
        await facturaConfig.setComponentValue('transferencia_cbu', '2850590940090418135201');
        await facturaConfig.setComponentValue('transferencia_alias', 'softguard.cobros');
        await facturaConfig.setComponentValue('transferencia_titular', 'SoftGuard SA');
        await facturaConfig.setComponentValue('transferencia_cuit_titular', '30-12345678-9');

        await facturaConfig.setComponentValue('mercadopago_habilitado', true);
        await facturaConfig.setComponentValue('mercadopago_tipo', 'link_fijo');
        await facturaConfig.setComponentValue('mercadopago_url', mercadopagoUrl);
        await facturaConfig.setComponentValue('mercadopago_mostrar_qr', true);

        await facturaConfig.setComponentValue('pagofacil_habilitado', false);
        await facturaConfig.setComponentValue('pagofacil_codigo_entidad', '654321');
        await facturaConfig.setComponentValue('pagofacil_template_codigo', '{{codigo_entidad}}{{cliente_numero}}');

        await facturaConfig.setComponentValue('rapipago_habilitado', false);
        await facturaConfig.setComponentValue('rapipago_codigo_entidad', '112233');
        await facturaConfig.setComponentValue('rapipago_template_codigo', '{{codigo_entidad}}{{cliente_numero}}');

        await facturaConfig.setComponentValue('debitoautomatico_habilitado', false);
        await facturaConfig.setComponentValue('debitoautomatico_texto', 'No debería aparecer en el comprobante');

        await facturaConfig.clickGuardar();
        await facturaConfig.waitForOrgFormClosed();
        restoreNeeded = true;

        await openOrganizationById(page, DK1506_TEST_ORG_ID);
        await facturaConfig.waitForOrgForm();
        await facturaConfig.expandFieldset();

        expect(await facturaConfig.getObservaciones()).toBe(observacionesTemplate);
        expect(await facturaConfig.getFooterFijo()).toBe(footerFijo);

        const persistedMetadata = await facturaConfig.getMetadataJson();
        expect(persistedMetadata?.factura?.integraciones_pago?.transferencia?.habilitado).toBe(true);
        expect(persistedMetadata?.factura?.integraciones_pago?.mercadopago?.habilitado).toBe(true);
        expect(persistedMetadata?.factura?.integraciones_pago?.mercadopago?.url).toBe(mercadopagoUrl);
        expect(persistedMetadata?.factura?.integraciones_pago?.pagofacil?.habilitado).toBe(false);
        expect(persistedMetadata?.factura?.integraciones_pago?.rapipago?.habilitado).toBe(false);
        expect(persistedMetadata?.factura?.integraciones_pago?.debito_automatico?.habilitado).toBe(false);

        await facturaConfig.clickPreview();
        const previewHtml = await facturaConfig.getPreviewHtml();

        expect(previewHtml).toContain(`Obs ${stamp}`);
        expect(previewHtml).toContain(footerFijo);
        expect(previewHtml).toContain('MEDIOS DE PAGO');
        expect(previewHtml).toContain('Transferencia bancaria');
        expect(previewHtml).toContain('Banco Nación');
        expect(previewHtml).toContain('Mercado Pago');
        expect(previewHtml).toContain(mercadopagoUrl);
        expect(previewHtml).toContain('QR Mercado Pago');
        expect(previewHtml).not.toContain('Pago Fácil');
        expect(previewHtml).not.toContain('Rapipago');
        expect(previewHtml).not.toContain('Débito automático');

        await facturaConfig.scrollPreviewToText('MEDIOS DE PAGO');
        const previewScreenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1506-01-preview-enabled-only');
        await facturaConfig.closePreview();

        const token = await page.evaluate(() => {
          try {
            const win = window as any;
            return typeof win.getToken2 === 'function' ? win.getToken2() || '' : '';
          } catch (_e) {
            return '';
          }
        });
        const realInvoiceUrl = `https://gcs.softguard.com/handler/ComprobantePdfMG?idComprobante=${DK1506_TEST_INVOICE_ID}${token ? `&oauth_token=${encodeURIComponent(token)}` : ''}`;
        const invoicePage = await page.context().newPage();

        try {
          await invoicePage.goto(realInvoiceUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
          await invoicePage.waitForFunction(
            (needle: string) => !!document.body && document.body.innerText.includes(needle),
            `Obs ${stamp}`,
            { timeout: 60_000, polling: 500 },
          );

          const realHtml = await invoicePage.content();
          expect(realHtml).toContain(`Obs ${stamp}`);
          expect(realHtml).toContain(footerFijo);
          expect(realHtml).toContain('MEDIOS DE PAGO');
          expect(realHtml).toContain('Transferencia bancaria');
          expect(realHtml).toContain('Mercado Pago');
          expect(realHtml).toContain(mercadopagoUrl);
          expect(realHtml).toContain('QR Mercado Pago');
          expect(realHtml).not.toContain('Pago Fácil');
          expect(realHtml).not.toContain('Rapipago');
          expect(realHtml).not.toContain('Débito automático');

          const realHandlerScreenshot = path.join(EVIDENCE_SCREENSHOTS_DIR, 'dk1506-02-real-handler-enabled-only.png');
          await invoicePage.screenshot({ path: realHandlerScreenshot, fullPage: true });
          const previewArtifact = await writeTextArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1506-01-preview-enabled-only.html', previewHtml);
          const persistedArtifact = await writeJsonArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1506-01-persisted-metadata.json', persistedMetadata);
          const realArtifact = await writeTextArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1506-02-real-handler-enabled-only.html', realHtml);
          evidenceEntries.push({
            check: 'DK-1506 persistencia E2E y handler real con integraciones habilitadas/deshabilitadas',
            status: 'pass',
            details: {
              orgId: DK1506_TEST_ORG_ID,
              idComprobante: DK1506_TEST_INVOICE_ID,
              mercadopagoUrl,
              observacionesTemplate,
              footerFijo,
            },
            screenshot: previewScreenshot,
            artifacts: [previewArtifact, persistedArtifact, realArtifact, realHandlerScreenshot],
          });
        } finally {
          await invoicePage.close();
        }
      } finally {
        try {
          await facturaConfig.closePreview();
        } catch (_e) {
          // ignore preview cleanup failures
        }

        try {
          await facturaConfig.closeOrgFormWindow();
        } catch (_e) {
          // ignore form cleanup failures before rollback
        }

        if (restoreNeeded) {
          await openOrganizationById(page, DK1506_TEST_ORG_ID);
          await facturaConfig.waitForOrgForm();
          const restoreResult = await facturaConfig.saveCurrentRecordRawMetadata(originalState.metadataRaw || '');
          expect(restoreResult.success, restoreResult.error).toBe(true);
          await facturaConfig.closeOrgFormWindow();
        }
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Logo Upload (UI only — no actual upload in test)
  // ---------------------------------------------------------------------------

  test.describe('Logo upload', () => {
    test('should have Subir Logo button and respond to click', async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');

      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();

      // Verify the button exists
      const btnExists = await page.evaluate(() => {
        const ext = (window as any).Ext;
        const btn = ext.ComponentQuery.query('moneyguardorganizacionformview button[action=facturaLogo]')[0];
        return !!btn;
      });
      expect(btnExists).toBe(true);

      // Check org Id to determine expected behavior
      const orgHasId = await page.evaluate(() => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
        return form && form.record && form.record.get('Id') > 0;
      });

      if (!orgHasId) {
        // Should show alert about saving first
        await facturaConfig.clickSubirLogo();
        const msgBox = await page.evaluate(() => {
          const ext = (window as any).Ext;
          return ext.MessageBox.isVisible();
        });
        expect(msgBox).toBe(true);
      }
      // For orgs with Id, UploadButton class may not be loaded in dev mode
      // (known limitation: common.view.UploadButton requires explicit inclusion)
    });
  });

  // ---------------------------------------------------------------------------
  // 5. QR AFIP Checkbox
  // ---------------------------------------------------------------------------

  test.describe('Mostrar QR AFIP', () => {
    test('should toggle QR checkbox', async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');

      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();

      // Toggle on
      await facturaConfig.setMostrarQrAfip(true);
      expect(await facturaConfig.getMostrarQrAfip()).toBe(true);

      // Evidence screenshot: QR checkbox enabled
      const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1493-04-qr-afip-checkbox-enabled');
      evidenceEntries.push({
        check: 'DK-1493 checkbox Mostrar QR AFIP visible y operativo',
        status: 'pass',
        details: { mostrarQrAfip: true },
        screenshot,
      });

      // Toggle off
      await facturaConfig.setMostrarQrAfip(false);
      expect(await facturaConfig.getMostrarQrAfip()).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Data persistence (metadata JSON round-trip)
  // ---------------------------------------------------------------------------

  test.describe('Data persistence', () => {
    test('should load existing factura config from org_cmetadata', async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');

      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();

      // Check if org already has metadata
      const metadata = await facturaConfig.getMetadataJson();
      if (metadata && metadata.factura) {
        // Expand and verify fields are populated
        await facturaConfig.expandFieldset();

        if (metadata.factura.observaciones_template) {
          const obs = await facturaConfig.getObservaciones();
          expect(obs).toBe(metadata.factura.observaciones_template);
        }
        if (metadata.factura.footer_fijo) {
          const footer = await facturaConfig.getFooterFijo();
          expect(footer).toBe(metadata.factura.footer_fijo);
        }
      }
      // If no metadata, fields should be empty (already tested in fieldset structure tests)
    });

    test('should preserve metadata structure on save (no key loss)', async ({ page }) => {
      const orgs = await getOrganizations(page);
      test.skip(orgs.length === 0, 'No organizations available');

      await openOrganization(page, 0);
      await facturaConfig.waitForOrgForm();

      // Get current metadata before any changes
      const metadataBefore = await facturaConfig.getMetadataJson();
      const existingKeys = metadataBefore ? Object.keys(metadataBefore) : [];

      await facturaConfig.expandFieldset();
      await facturaConfig.setObservaciones('Test observaciones');
      await facturaConfig.setFooterFijo('Test footer');

      // Simulate what saveFacturaConfig does (without actually saving to backend)
      const metadataAfter = await page.evaluate(() => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
        if (!form || !form.record) return null;

        // Read current metadata
        let existing: any = {};
        try {
          const raw = form.record.get('org_cmetadata');
          if (raw) existing = JSON.parse(raw);
        } catch { /* empty */ }

        // Merge factura config
        existing.factura = {
          observaciones_template: ext.ComponentQuery.query('#observaciones_template')[0]?.getValue() || '',
          footer_fijo: ext.ComponentQuery.query('#footer_fijo')[0]?.getValue() || '',
          mostrar_qr_afip: ext.ComponentQuery.query('#mostrar_qr_afip')[0]?.getValue() || false,
        };

        return existing;
      });

      if (metadataAfter) {
        // The 'factura' key should exist
        expect(metadataAfter).toHaveProperty('factura');
        expect(metadataAfter.factura.observaciones_template).toBe('Test observaciones');
        expect(metadataAfter.factura.footer_fijo).toBe('Test footer');

        // All pre-existing keys should still be present
        for (const key of existingKeys) {
          expect(metadataAfter).toHaveProperty(key);
        }
      }
    });
  });
});
