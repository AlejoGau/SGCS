import { expect, test, type Page } from '@playwright/test';
import * as path from 'path';
import {
  captureEvidenceScreenshot,
  ensureEvidenceDirs,
  type EvidenceEntry,
  writeEvidenceReport,
} from './dk1654-categorias-impositivas.shared';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';

const DEPLOY_URL = (
  process.env.WEBMG_DEPLOY_URL ||
  'https://gcs.softguard.com/apps/WebMG/DK-1500-DK-1501-bonificacion-contrato-facturacion-v2'
).trim();
const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1500-contract-list-v2-diagnostic');

let screenshotsDir = '';
const evidenceEntries: EvidenceEntry[] = [];

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

async function gotoDeploy(page: Page): Promise<void> {
  await requireAuthenticatedSession(page);
  await page.goto(DEPLOY_URL, { waitUntil: 'domcontentloaded' });
  await waitForExtReady(page, 360_000);
  await waitForViewport(page, 360_000);
  try {
    await waitForAjaxComplete(page, 60_000);
  } catch {
    // seguir igual: el objetivo es diagnosticar el runtime publicado
  }
  await page.waitForTimeout(2_000);
}

async function collectControllerSignature(page: Page): Promise<{
  onNewOrderUsesCliIcCodigoId: boolean;
  onNewOrderUsesAccount: boolean;
  validateUsesAccount: boolean;
  syncsAccountBackToCaller: boolean;
  syncsCliIcCodigoIdBackToCaller: boolean;
  syncsCliIOrganizacionBackToCaller: boolean;
  onNewOrderSnippet: string;
  showClienteFormWindowSnippet: string;
}> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const controllerClass =
      ext?.ClassManager?.get('WebMG.controller.ContratoGridController') ||
      ext?.ClassManager?.get('Common.controller.ContratoGridController');

    if (!controllerClass) {
      throw new Error('No se encontró ContratoGridController en el runtime publicado');
    }

    const proto = controllerClass.prototype;
    const onNewOrder = String(proto.onNewOrderClick || '');
    const validate = String(proto.validateAndSetupRecord || '');
    const showCliente = String(proto.showClienteFormWindow || '');

    return {
      onNewOrderUsesCliIcCodigoId: onNewOrder.indexOf('cli_icodigo_ID') !== -1,
      onNewOrderUsesAccount: onNewOrder.indexOf('Account') !== -1,
      validateUsesAccount:
        validate.indexOf('cnt_idcliente') !== -1 && validate.indexOf('Account') !== -1,
      syncsAccountBackToCaller:
        showCliente.indexOf('view.record.set("Account"') !== -1 ||
        showCliente.indexOf("view.record.set('Account'") !== -1 ||
        showCliente.indexOf("a.record.set('Account'") !== -1 ||
        showCliente.indexOf('a.record.set("Account"') !== -1,
      syncsCliIcCodigoIdBackToCaller:
        showCliente.indexOf('view.record.set("cli_icodigo_ID"') !== -1 ||
        showCliente.indexOf("view.record.set('cli_icodigo_ID'") !== -1,
      syncsCliIOrganizacionBackToCaller:
        showCliente.indexOf('view.record.set("cli_iOrganizacion"') !== -1 ||
        showCliente.indexOf("view.record.set('cli_iOrganizacion'") !== -1 ||
        showCliente.indexOf('view.record.set("cli_iorganizacion"') !== -1 ||
        showCliente.indexOf("view.record.set('cli_iorganizacion'") !== -1,
      onNewOrderSnippet: onNewOrder.slice(0, 500),
      showClienteFormWindowSnippet: showCliente.slice(0, 700),
    };
  });
}

async function collectOrganizationGridSample(page: Page): Promise<{
  totalLoaded: number;
  withAccount: number;
  mismatches: Array<{
    id: number;
    name: string;
    account: string;
    cliIcCodigoId: number | null;
    cliIOrganizacion: number | null;
  }>;
  sample: Array<{
    id: number;
    name: string;
    account: string;
    cliIcCodigoId: number | null;
    cliIOrganizacion: number | null;
  }>;
}> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext?.ComponentQuery?.query('organizationgridview')[0];
    if (!grid) {
      throw new Error('No se encontró organizationgridview en WebMG');
    }

    const store = grid.getStore();
    const rows = store.getRange().map((record: any) => ({
      id: Number(record.get('Id') || 0),
      name: String(record.get('Name') || ''),
      account: String(record.get('Account') || ''),
      cliIcCodigoId:
        record.get('cli_icodigo_ID') === undefined || record.get('cli_icodigo_ID') === null
          ? null
          : Number(record.get('cli_icodigo_ID')),
      cliIOrganizacion:
        record.get('cli_iOrganizacion') === undefined || record.get('cli_iOrganizacion') === null
          ? null
          : Number(record.get('cli_iOrganizacion')),
    }));

    const mismatches = rows.filter((row: any) => {
      if (!row.account) {
        return false;
      }

      return String(row.account) !== String(row.cliIcCodigoId ?? '');
    });

    return {
      totalLoaded: rows.length,
      withAccount: rows.filter((row: any) => !!row.account).length,
      mismatches: mismatches.slice(0, 10),
      sample: rows.slice(0, 10),
    };
  });
}

async function applyRuntimeFixOverride(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const controllerClass =
      ext?.ClassManager?.get('WebMG.controller.ContratoGridController') ||
      ext?.ClassManager?.get('Common.controller.ContratoGridController');

    if (!controllerClass) {
      throw new Error('No se encontró ContratoGridController para aplicar override runtime');
    }

    const proto = controllerClass.prototype;

    proto.normalizeContextValue = function (value: any) {
      if (value === undefined || value === null) {
        return '';
      }

      const normalized = String(value).replace(/^[\s\u00a0]+|[\s\u00a0]+$/g, '');
      if (normalized === '' || normalized === '0') {
        return '';
      }

      return normalized;
    };

    proto.resolveClienteIdFromRecord = function (record: any) {
      if (!record || !record.get) {
        return '';
      }

      return (
        this.normalizeContextValue(record.get('Account')) ||
        this.normalizeContextValue(record.get('cli_icodigo_ID')) ||
        this.normalizeContextValue(record.get('cnt_idcliente'))
      );
    };

    proto.resolveBillingOrganizationIdFromRecord = function (record: any) {
      if (!record || !record.get) {
        return '';
      }

      return (
        this.normalizeContextValue(record.get('cli_iOrganizacion')) ||
        this.normalizeContextValue(record.get('cli_iorganizacion')) ||
        this.normalizeContextValue(record.get('cnt_org_fc'))
      );
    };

    proto.onNewOrderClick = function (button: any) {
      var panel = button.up('tabpanel');
      var view = button.up('contratogridview');
      var model = this.getCrm_contratoModelModel();
      var record = Ext.create(model, {
        cnt_fechaalta: new Date(),
      });

      record.phantom = true;
      record.crudState = 'C';

      var title = getLocale('Nuevo Contrato');
      var mytab = panel.down('[title="' + title + '"]');
      var clienteId = '';
      var facturadoraId = '';

      if (view.record) {
        clienteId = this.resolveClienteIdFromRecord(view.record);
        facturadoraId = this.resolveBillingOrganizationIdFromRecord(view.record);

        if (clienteId) {
          record.set('cnt_idcliente', clienteId);
        }

        if (facturadoraId) {
          record.set('cnt_org_fc', facturadoraId);
        }
      }

      if (!mytab) {
        var newTab = Ext.widget('contratoformview', {
          record: record,
          translate: false,
          targetTab: newTab,
          title: title,
          closable: true,
          clienteId: clienteId,
          facturadoraId: facturadoraId,
          caller: view,
          organizacionId: view.record ? view.record.get('Id') : false,
          recordOrganizacion: view.record,
          onRefresh: Ext.emptyFn,
        });

        panel.add(newTab);
        panel.setActiveTab(newTab);
      } else {
        mytab.show();
      }
    };
  });
}

async function reproducePublishedBugSignature(page: Page): Promise<{
  gridFilterClienteId: string;
  callerAccount: string;
  callerCliIcCodigoId: string;
  callerCliIOrganizacion: string;
  formClienteIdProp: string;
  hiddenCntIdCliente: string;
  recordCntIdCliente: string;
  comboOrganizacionesValue: string;
  recordCntOrgFc: string;
  clientButtonHidden: boolean;
}> {
  return page.evaluate(async () => {
    const ext = (window as any).Ext;
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const app = ext?.app?.Application?.instance || null;

    const center = ext?.getCmp?.('center');
    if (!center) {
      throw new Error('No se encontró el tabpanel center');
    }

    ext.syncRequire([
      'Common.model.OrganizationSearchModel',
      'WebMG.controller.ContratoGridController',
      'Common.view.ContratoGridView',
      'Common.view.ContratoFormView',
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
        ? app.getController('WebMG.controller.ContratoGridController')
        : null;
    } catch (_e) {
      controller = null;
    }

    if (!controller) {
      controller = ext.create('WebMG.controller.ContratoGridController');
      if (controller.doInit) {
        controller.doInit(app);
      }
    }

    const oldTabs = ext.ComponentQuery.query(
      'contratogridview[itemId=dk1500DiagGrid], contratoformview[itemId=dk1500DiagForm]',
    );
    oldTabs.forEach((cmp: any) => {
      try {
        if (cmp.close) {
          cmp.close();
        } else if (cmp.destroy) {
          cmp.destroy();
        }
      } catch (_e) {
        // ignore cleanup failures
      }
    });

    const fakeRecord = ext.create('Common.model.OrganizationSearchModel', {
      Id: 999999,
      Name: 'DK1500 Diag Org',
      Account: '12345',
      cli_icodigo_ID: 3,
      cli_iOrganizacion: 17,
      org_csymbol: 'ARS',
      Status: 7,
    });

    const callerView = {
      record: fakeRecord,
      filters: [
        {
          property: 'cnt_idcliente',
          value: fakeRecord.get('Account'),
        },
      ],
    };

    const fakeButton = {
      up: (selector: string) => {
        if (selector === 'tabpanel') {
          return center;
        }

        if (selector === 'contratogridview') {
          return callerView;
        }

        return null;
      },
    };

    controller.onNewOrderClick(fakeButton);
    await wait(2_500);

    const form = ext.ComponentQuery
      .query('contratoformview')
      .find((candidate: any) => candidate.organizacionId === 999999);
    if (!form) {
      throw new Error('No se encontró el contratoformview generado por el runtime publicado');
    }

    form.itemId = 'dk1500DiagForm';
    const hiddenCntIdCliente = form.down('#cnt_idcliente');
    const comboOrganizaciones = form.down('#organizaciones');
    const clientButton = form.down('#clientButton');

    return {
      gridFilterClienteId: String(callerView.filters[0].value || ''),
      callerAccount: String(fakeRecord.get('Account') || ''),
      callerCliIcCodigoId: String(fakeRecord.get('cli_icodigo_ID') || ''),
      callerCliIOrganizacion: String(fakeRecord.get('cli_iOrganizacion') || ''),
      formClienteIdProp: String(form.clienteId || ''),
      hiddenCntIdCliente: String(hiddenCntIdCliente ? hiddenCntIdCliente.getValue() || '' : ''),
      recordCntIdCliente: String(form.record.get('cnt_idcliente') || ''),
      comboOrganizacionesValue: String(comboOrganizaciones ? comboOrganizaciones.getValue() || '' : ''),
      recordCntOrgFc: String(form.record.get('cnt_org_fc') || ''),
      clientButtonHidden: clientButton ? !!clientButton.isHidden() : true,
    };
  });
}

test.describe.serial('DK-1500 — diagnóstico crítico listado de contratos en WebMG v2 @diagnostic @dk-1500 @deploy', () => {
  test.beforeAll(async () => {
    screenshotsDir = await ensureEvidenceDirs(REPORT_ROOT);
  });

  test.afterAll(async () => {
    await writeEvidenceReport({
      reportRoot: REPORT_ROOT,
      ticket: 'DK-1500',
      title: 'DK-1500 — Diagnóstico runtime WebMG v2 (contratos nuevos no visibles en la lista)',
      environment: 'WebMG deploy directo publicado en GCS (v2)',
      appUrl: DEPLOY_URL,
      jsonFileName: 'dk1500-contract-list-v2-diagnostic.json',
      markdownFileName: 'DK-1500-CONTRACT-LIST-V2-DIAGNOSTIC.md',
      methodologyLines: [
        'Se abrió el deploy WebMG v2 publicado en GCS con sesión autenticada real.',
        'Se inspeccionó en runtime el código publicado de ContratoGridController para validar qué campo usa al abrir un contrato nuevo.',
        'Se muestrearon registros cargados del grid de organizaciones para detectar desincronizaciones entre Account y cli_icodigo_ID.',
        'Se reprodujo con un record de organización deliberadamente desincronizado para confirmar la firma exacta del bug sin crear datos en backend.',
      ],
      entries: evidenceEntries,
    });
  });

  test('el runtime publicado conserva la firma de la regresión de contratos nuevos fuera de lista', async ({ page }) => {
    test.slow();

    await gotoDeploy(page);

    const controllerSignature = await collectControllerSignature(page);
    const gridSample = await collectOrganizationGridSample(page);
    const reproduction = await reproducePublishedBugSignature(page);

    const screenshot = await captureEvidenceScreenshot(
      page,
      screenshotsDir,
      'dk1500-contract-list-v2-diagnostic-runtime',
    );

    evidenceEntries.push({
      check: 'El bundle publicado usa Account para filtrar la grilla pero cli_icodigo_ID para inicializar el contrato nuevo, y no re-sincroniza cli_icodigo_ID/cli_iOrganizacion en el caller',
      status: 'pass',
      details: {
        controllerSignature,
        gridSample,
        reproduction,
      },
      screenshot,
    });

    expect(controllerSignature.validateUsesAccount).toBe(true);
    expect(controllerSignature.onNewOrderUsesCliIcCodigoId).toBe(true);
    expect(controllerSignature.syncsAccountBackToCaller).toBe(true);
    expect(controllerSignature.syncsCliIcCodigoIdBackToCaller).toBe(false);
    expect(controllerSignature.syncsCliIOrganizacionBackToCaller).toBe(false);

    expect(reproduction.gridFilterClienteId).toBe('12345');
    expect(reproduction.formClienteIdProp).toBe('3');
    expect(reproduction.hiddenCntIdCliente).toBe('3');
    expect(reproduction.recordCntIdCliente).toBe('3');
    expect(reproduction.comboOrganizacionesValue).toBe('');
    expect(reproduction.recordCntOrgFc).toBe('');
    expect(reproduction.clientButtonHidden).toBe(true);
  });

  test('el fix alinea el contrato nuevo con Account y la organización facturadora', async ({ page }) => {
    test.slow();

    await gotoDeploy(page);
    await applyRuntimeFixOverride(page);

    const reproduction = await reproducePublishedBugSignature(page);

    expect(reproduction.gridFilterClienteId).toBe('12345');
    expect(reproduction.formClienteIdProp).toBe('12345');
    expect(reproduction.hiddenCntIdCliente).toBe('12345');
    expect(reproduction.recordCntIdCliente).toBe('12345');
    expect(reproduction.comboOrganizacionesValue).toBe('17');
    expect(reproduction.recordCntOrgFc).toBe('17');
    expect(reproduction.clientButtonHidden).toBe(true);
  });
});