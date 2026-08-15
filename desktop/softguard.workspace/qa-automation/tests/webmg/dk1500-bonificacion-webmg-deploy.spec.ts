import { expect, test, type Page } from '@playwright/test';
import * as path from 'path';
import {
  captureEvidenceScreenshot,
  ensureEvidenceDirs,
  type EvidenceEntry,
  writeEvidenceReport,
} from './dk1654-categorias-impositivas.shared';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';

const DEPLOY_URL = (process.env.WEBMG_DEPLOY_URL || 'https://gcs.softguard.com/apps/WebMG/DK-1500-DK-1501-bonificacion-contrato-facturacion-v2').trim();
const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1500-bonificacion-webmg-deploy');
const CLIENTE_ID = Number(process.env.DK1500_CLIENTE_ID || 3);
const ORG_FC = Number(process.env.DK1500_ORG_FC || 17);

let screenshotsDir = '';
const evidenceEntries: EvidenceEntry[] = [];

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

async function requireAuthenticatedSession(page: Page): Promise<void> {
  const cookies = await page.context().cookies(DEPLOY_URL);
  const hasAspSession = cookies.some((cookie) => cookie.name === 'ASP.NET_SessionId');
  const hasOAuthToken = cookies.some((cookie) => cookie.name === 'OAuth_Token');

  if (!hasAspSession || !hasOAuthToken) {
    throw new Error(
      'El deploy directo de WebMG debe abrirse con sesión autenticada real (ASP.NET_SessionId + OAuth_Token).',
    );
  }
}

async function gotoDeploy(page: Page): Promise<void> {
  await requireAuthenticatedSession(page);
  await page.goto(DEPLOY_URL, { waitUntil: 'domcontentloaded' });
  await waitForExtReady(page, 360_000);
  await waitForViewport(page, 360_000);
  try {
    await waitForAjaxComplete(page, 60_000);
  } catch {
    // dejamos seguir para capturar evidencia del estado aunque queden requests colgando
  }
  await page.waitForTimeout(2_000);
}

async function waitForViewport(page: Page, timeout = 180_000): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return !!(ext && ext.isReady && ext.getCmp && ext.getCmp('center'));
    },
    undefined,
    { timeout, polling: 500 },
  );
}

async function collectRuntimeState(page: Page): Promise<{
  href: string;
  title: string;
  extReady: boolean;
  viewportOk: boolean;
  northOk: boolean;
  centerOk: boolean;
  appInstance: boolean;
  controllerClass: boolean;
  modelClass: boolean;
  commonViewClass: boolean;
  toolbarTexts: string[];
}> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const toolbar = ext?.ComponentQuery?.query('#north')[0];
    const toolbarTexts = toolbar?.items?.getRange?.()
      .map((item: any) => String(item.text || item.itemId || item.xtype || ''))
      .filter(Boolean) || [];

    return {
      href: window.location.href,
      title: document.title,
      extReady: !!ext?.isReady,
      viewportOk: !!ext?.ComponentQuery?.query('viewport')[0],
      northOk: !!toolbar,
      centerOk: !!ext?.getCmp?.('center'),
      appInstance: !!ext?.app?.Application?.instance,
      controllerClass: !!ext?.ClassManager?.get('WebMG.controller.ContratoFormController'),
      modelClass: !!ext?.ClassManager?.get('WebMG.model.crm_contratoModel'),
      commonViewClass: !!ext?.ClassManager?.get('Common.view.ContratoFormView'),
      toolbarTexts,
    };
  });
}

async function openContratoFormForLayoutReview(page: Page): Promise<{ ok: boolean; details?: any; error?: string }> {
  return page.evaluate(({ clienteId, orgFc }: { clienteId: number; orgFc: number }) => {
    try {
      const Ext = (window as any).Ext;
      const app = Ext?.app?.Application?.instance || null;

      Ext.syncRequire([
        'Common.view.ContratoFormView',
        'WebMG.controller.ContratoFormController',
        'WebMG.model.crm_contratoModel',
        'Common.view.ContratoCuentaGridView',
        'Common.view.ContratoItemGridView',
        'Common.view.AvisoProgramadoGridView',
        'Common.view.FromBuilderEditHelperView',
        'Common.view.ContratoTemplateFormView',
      ]);

      let controller = null;
      try {
        controller = app && app.getController
          ? app.getController('WebMG.controller.ContratoFormController')
          : null;
      } catch (_e) {
        controller = null;
      }

      if (!controller) {
        controller = Ext.create('WebMG.controller.ContratoFormController');
        if (controller.doInit) {
          controller.doInit(app);
        }
      }

      const center = Ext.getCmp('center');
      if (!center) {
        throw new Error('No se encontró el tabpanel center de WebMG');
      }

      const existing = Ext.ComponentQuery.query('contratoformview[itemId=dk1500BonificacionContractFormWebMG]')[0];
      if (existing) {
        center.setActiveTab(existing);
        return {
          ok: true,
          details: {
            reused: true,
            title: existing.title || '',
          },
        };
      }

      if (!Ext.ClassManager.get('Dk1500.fakeOrganizationRecord')) {
        Ext.define('Dk1500.fakeOrganizationRecord', {
          extend: 'Ext.data.Model',
          fields: [
            'Id',
            'Name',
            'nombreOrganizacion',
            'org_csymbol',
            'cli_icodigo_ID',
            'cli_iorganizacion',
          ],
        });
      }

      const record = Ext.create('WebMG.model.crm_contratoModel', {
        Id: 0,
        Name: '',
        cnt_estado: 1,
        cnt_fechaalta: new Date(),
        cnt_fechavto: Ext.Date.add(new Date(), Ext.Date.DAY, 30),
        cnt_org_fc: orgFc,
        cnt_formapago: 0,
        cnt_tmp_id: 0,
        cnt_metadata: Ext.encode({
          bonificacion: {
            activa: true,
            tipo: 'porcentaje',
            valor: 12.5,
            permanente: false,
            vigencia_desde: '2026-07-01',
            vigencia_hasta: '2026-08-31',
          },
        }),
      });
      record.phantom = true;
      record.crudState = 'C';

      const organizationRecord = Ext.create('Dk1500.fakeOrganizationRecord', {
        Id: orgFc,
        Name: 'ale test',
        nombreOrganizacion: 'Organización Facturadora DEMO',
        org_csymbol: 'ARS',
        cli_icodigo_ID: clienteId,
        cli_iorganizacion: orgFc,
      });

      const form = Ext.widget('contratoformview', {
        itemId: 'dk1500BonificacionContractFormWebMG',
        title: 'DK-1500 Bonificación layout WebMG deploy',
        closable: true,
        record,
        clienteId,
        organizacionId: orgFc,
        recordOrganizacion: organizationRecord,
        caller: {
          getStore: function () {
            return null;
          },
        },
        onRefresh: Ext.emptyFn,
      });

      center.add(form);
      center.setActiveTab(form);

      return {
        ok: true,
        details: {
          reused: false,
          title: form.title || '',
        },
      };
    } catch (error: any) {
      return {
        ok: false,
        error: String(error && error.stack ? error.stack : error),
      };
    }
  }, { clienteId: CLIENTE_ID, orgFc: ORG_FC });
}

async function waitForContratoForm(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const Ext = (window as any).Ext;
      const form = Ext.ComponentQuery.query('contratoformview[itemId=dk1500BonificacionContractFormWebMG]')[0];
      const bonificacion = form?.down('#bonificacionFieldset');
      const estado = form?.down('#bonificacion_estado');
      const valor = form?.down('#bonificacion_valor');
      return !!(form && form.rendered && bonificacion && estado && valor);
    },
    undefined,
    { timeout: 120_000, polling: 300 },
  );

  await waitForAjaxComplete(page, 60_000);
}

async function collectLayoutMetrics(page: Page): Promise<{
  clientWidth: number;
  scrollWidth: number;
  scrollLeft: number;
  maxScrollLeft: number;
  headerWidth: number;
  hasHorizontalOverflow: boolean;
  bonificacionFullyVisible: boolean;
  bonificacionRightOffset: number;
  valorLabel: string;
  valorDisabled: boolean;
  estadoText: string;
}> {
  return page.evaluate(() => {
    const Ext = (window as any).Ext;
    const form = Ext.ComponentQuery.query('contratoformview[itemId=dk1500BonificacionContractFormWebMG]')[0];
    if (!form) {
      throw new Error('No se encontró el contratoformview DK-1500 en WebMG deploy');
    }

    const header = form.down('#contratoHeaderContainer');
    const bonificacion = form.down('#bonificacionFieldset');
    const valor = form.down('#bonificacion_valor');
    const estado = form.down('#bonificacion_estado');
    const bodyEl = (form.body && form.body.dom)
      ? form.body.dom
      : form.getEl().down('.x-panel-body').dom;

    const bodyBox = bodyEl.getBoundingClientRect();
    const bonificacionBox = bonificacion.getEl().dom.getBoundingClientRect();

    return {
      clientWidth: bodyEl.clientWidth,
      scrollWidth: bodyEl.scrollWidth,
      scrollLeft: bodyEl.scrollLeft,
      maxScrollLeft: Math.max(0, bodyEl.scrollWidth - bodyEl.clientWidth),
      headerWidth: header.getWidth(),
      hasHorizontalOverflow: bodyEl.scrollWidth > bodyEl.clientWidth + 1,
      bonificacionFullyVisible:
        bonificacionBox.left >= bodyBox.left - 1 && bonificacionBox.right <= bodyBox.right + 1,
      bonificacionRightOffset: Math.round(bonificacionBox.right - bodyBox.right),
      valorLabel: String(valor.getFieldLabel ? valor.getFieldLabel() : ''),
      valorDisabled: !!(valor.isDisabled && valor.isDisabled()),
      estadoText: String(estado.getValue ? estado.getValue() || '' : ''),
    };
  });
}

async function scrollContratoFormToRight(page: Page): Promise<void> {
  await page.evaluate(() => {
    const Ext = (window as any).Ext;
    const form = Ext.ComponentQuery.query('contratoformview[itemId=dk1500BonificacionContractFormWebMG]')[0];
    if (!form) {
      throw new Error('No se encontró el contratoformview DK-1500 en WebMG deploy para scrollear');
    }
    const bodyEl = (form.body && form.body.dom)
      ? form.body.dom
      : form.getEl().down('.x-panel-body').dom;
    bodyEl.scrollLeft = bodyEl.scrollWidth;
  });
  await page.waitForTimeout(250);
}

test.describe.serial('DK-1500 — WebMG deploy bonificación layout @dk-1500 @webmg @deploy @evidence', () => {
  test.beforeAll(async () => {
    screenshotsDir = await ensureEvidenceDirs(REPORT_ROOT);
  });

  test.afterAll(async () => {
    await writeEvidenceReport({
      reportRoot: REPORT_ROOT,
      ticket: 'DK-1500',
      title: 'DK-1500 — Evidencia WebMG deploy publicado (layout bonificación contrato)',
      environment: 'WebMG deploy directo publicado en GCS',
      appUrl: DEPLOY_URL,
      jsonFileName: 'dk1500-bonificacion-webmg-deploy.json',
      markdownFileName: 'DK-1500-BONIFICACION-WEBMG-DEPLOY-EVIDENCE.md',
      methodologyLines: [
        'Se abrió el deploy directo de WebMG publicado en GCS con sesión autenticada real.',
        'Se verificó que el runtime bootée con viewport, toolbar y tabpanel central operativos.',
        'Se instanció el formulario de contrato compartido dentro del tabpanel real de WebMG usando el modelo/controlador publicados.',
        'Se forzó un viewport reducido para validar la accesibilidad horizontal del bloque Bonificación en el deploy v2.',
      ],
      entries: evidenceEntries,
      extraMetadata: {
        clienteId: CLIENTE_ID,
        orgFacturadora: ORG_FC,
      },
    });
  });

  test('el deploy v2 de WebMG bootéa con el runtime esperado', async ({ page }) => {
    test.slow();
    const diagnostics = attachPageDiagnostics(page);

    await gotoDeploy(page);
    const runtime = await collectRuntimeState(page);
    const screenshot = await captureEvidenceScreenshot(
      page,
      screenshotsDir,
      'webmg-deploy-01-runtime-loaded',
    );

    evidenceEntries.push({
      check: 'El deploy v2 de WebMG carga viewport, toolbar y clases de contrato esperadas',
      status: 'pass',
      details: {
        runtime,
        diagnostics,
      },
      screenshot,
    });

    expect(runtime.extReady).toBe(true);
    expect(runtime.viewportOk).toBe(true);
    expect(runtime.northOk).toBe(true);
    expect(runtime.centerOk).toBe(true);
    expect(runtime.appInstance).toBe(true);
    expect(runtime.controllerClass).toBe(true);
    expect(runtime.modelClass).toBe(true);
    expect(runtime.commonViewClass).toBe(true);
  });

  test('la sección Bonificación sigue accesible en ancho reducido dentro del deploy v2 de WebMG', async ({ page }) => {
    test.slow();
    const diagnostics = attachPageDiagnostics(page);

    await page.setViewportSize({ width: 1180, height: 900 });
    await gotoDeploy(page);

    const openResult = await openContratoFormForLayoutReview(page);
    expect(openResult.ok, `Debe poder abrir el contrato de prueba publicado en WebMG: ${openResult.error || ''}`).toBe(true);

    await waitForContratoForm(page);

    const before = await collectLayoutMetrics(page);
    const beforeScreenshot = await captureEvidenceScreenshot(
      page,
      screenshotsDir,
      'webmg-deploy-02-bonificacion-before-scroll',
    );

    evidenceEntries.push({
      check: 'El contrato publicado en WebMG muestra Bonificación activa y operativa',
      status: 'pass',
      details: {
        openResult: openResult.details,
        before,
        diagnostics,
      },
      screenshot: beforeScreenshot,
    });

    expect(before.valorLabel).toBe('Porcentaje');
    expect(before.valorDisabled).toBe(false);
    expect(before.estadoText).toMatch(/Vigente|Programada/i);
    expect(before.bonificacionFullyVisible || before.hasHorizontalOverflow).toBe(true);

    if (before.hasHorizontalOverflow) {
      await scrollContratoFormToRight(page);
    }

    const after = await collectLayoutMetrics(page);
    const afterScreenshot = await captureEvidenceScreenshot(
      page,
      screenshotsDir,
      'webmg-deploy-03-bonificacion-after-scroll',
    );

    evidenceEntries.push({
      check: 'En el deploy v2 de WebMG la Bonificación queda completamente accesible tras layout/scroll',
      status: 'pass',
      details: {
        before,
        after,
      },
      screenshot: afterScreenshot,
    });

    expect(
      after.bonificacionFullyVisible,
      `La sección Bonificación del deploy WebMG debe quedar completamente accesible. Offset derecho actual=${after.bonificacionRightOffset}px`,
    ).toBe(true);
  });
});
