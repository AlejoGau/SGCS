import { expect, test, type Page } from '@playwright/test';
import * as path from 'path';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
const LOCAL_PORT = Number(process.env.WEBMG_LOCAL_PORT || 1841);

type CapturedContratoRequest = {
  method: string;
  url: string;
  contentType: string;
  rawBody: string;
  parsedBody: any;
};

async function reproduceLocalFixedBehavior(page: Page): Promise<{
  controllerHasResolver: boolean;
  resolvedClienteId: string;
  resolvedBillingOrganizationId: string;
  gridFilterClienteId: string;
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
      throw new Error('No se encontró el tabpanel center en WebMG local');
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
      'contratogridview[itemId=dk1500LocalDiagGrid], contratoformview[itemId=dk1500LocalDiagForm]',
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
      Id: 999998,
      Name: 'DK1500 Local Diag Org',
      Account: '12345',
      cli_icodigo_ID: 3,
      cli_iOrganizacion: 17,
      org_csymbol: 'ARS',
      Status: 7,
    });

    const callerView = {
      itemId: 'dk1500LocalDiagGrid',
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
      .find((candidate: any) => candidate.organizacionId === 999998);
    if (!form) {
      throw new Error('No se encontró el contratoformview generado por WebMG local');
    }

    form.itemId = 'dk1500LocalDiagForm';
    const hiddenCntIdCliente = form.down('#cnt_idcliente');
    const comboOrganizaciones = form.down('#organizaciones');
    const clientButton = form.down('#clientButton');

    return {
      controllerHasResolver: typeof controller.resolveClienteIdFromRecord === 'function',
      resolvedClienteId: String(
        controller.resolveClienteIdFromRecord ? controller.resolveClienteIdFromRecord(fakeRecord) || '' : '',
      ),
      resolvedBillingOrganizationId: String(
        controller.resolveBillingOrganizationIdFromRecord
          ? controller.resolveBillingOrganizationIdFromRecord(fakeRecord) || ''
          : '',
      ),
      gridFilterClienteId: String(callerView.filters[0].value || ''),
      formClienteIdProp: String(form.clienteId || ''),
      hiddenCntIdCliente: String(hiddenCntIdCliente ? hiddenCntIdCliente.getValue() || '' : ''),
      recordCntIdCliente: String(form.record.get('cnt_idcliente') || ''),
      comboOrganizacionesValue: String(comboOrganizaciones ? comboOrganizaciones.getValue() || '' : ''),
      recordCntOrgFc: String(form.record.get('cnt_org_fc') || ''),
      clientButtonHidden: clientButton ? !!clientButton.isHidden() : true,
    };
  });
}

async function captureContratoCreateRequest(page: Page): Promise<{
  method: string;
  url: string;
  contentType: string;
  rawBody: string;
  parsedBody: any;
  saveSucceeded: boolean;
  returnedId: number;
}> {
  let capturedRequest: CapturedContratoRequest | undefined;

  const routeHandler = async (route: any) => {
    const request = route.request();
    const rawBody = request.postData() || '';
    let parsedBody: any = null;

    try {
      parsedBody = rawBody ? JSON.parse(rawBody) : null;
    } catch (_error) {
      parsedBody = null;
    }

    capturedRequest = {
      method: request.method(),
      url: request.url(),
      contentType: String(request.headers()['content-type'] || ''),
      rawBody,
      parsedBody,
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json; charset=utf-8',
      body: JSON.stringify({
        ...(parsedBody || {}),
        Id: 987654,
      }),
    });
  };

  await page.route('**/Rest/crm_contrato/**', routeHandler);

  const saveResult = await page.evaluate(async () => {
    const ext = (window as any).Ext;

    return await new Promise<{ success: boolean; id: number }>((resolve) => {
      ext.syncRequire(['WebMG.model.crm_contratoModel']);

      const record = ext.create('WebMG.model.crm_contratoModel', {
        cnt_fechaalta: new Date(2026, 6, 23, 10, 15, 45),
        Id: 0,
        Name: '',
        ObjectTypeId: 3148,
        ObjectTypeName: 'Order',
        cnt_estado: 1,
        cnt_fechavto: new Date(2026, 6, 31, 0, 0, 0),
        cnt_formapago: 0,
        cnt_idcliente: 5,
        cnt_metadata: ext.encode({
          formValues: [
            { name: 'textfield-1844-inputEl', value: '[0; 1; 2; 3; 4; 5; 6; 7; 8; 9]' },
            { name: 'numberfield-1845-inputEl', value: 10500 },
          ],
          renovacion: {
            cantidad: 0,
            tipoperiodo: 'sinrenovacion',
          },
          bonificacion: {
            activa: true,
            tipo: 'porcentaje',
            valor: 5,
            permanente: true,
            vigencia_desde: '',
            vigencia_hasta: '',
          },
        }),
        cnt_org_fc: 14,
        cnt_tmp_id: 19,
        cnt_dinamico: 0,
        cnt_cantidad_auto: 0,
      });

      record.phantom = true;

      record.save({
        callback: function (savedRecord: any, operation: any, success: boolean) {
          resolve({
            success: !!success,
            id: Number(savedRecord && savedRecord.get ? savedRecord.get('Id') || 0 : 0),
          });
        },
      });
    });
  });

  await page.unroute('**/Rest/crm_contrato/**', routeHandler);

  if (!capturedRequest) {
    throw new Error('No se interceptó ninguna request a /Rest/crm_contrato/');
  }

  const request: CapturedContratoRequest = capturedRequest;

  return {
    method: request.method,
    url: request.url,
    contentType: request.contentType,
    rawBody: request.rawBody,
    parsedBody: request.parsedBody,
    saveSucceeded: saveResult.success,
    returnedId: saveResult.id,
  };
}

test.describe.serial('DK-1500 — validación local listado de contratos WebMG @dk-1500 @local', () => {
  test('el código local mantiene cliente y facturadora alineados al crear un contrato nuevo', async ({ page }) => {
    test.slow();

    const webmg = new WebMGPage(page);
    const errors = webmg.collectConsoleErrors();

    await webmg.gotoLocal(tokenFile, LOCAL_PORT);
    await webmg.waitForReadyLocal(180_000);
    await webmg.waitForOrganizationsLoaded();

    const reproduction = await reproduceLocalFixedBehavior(page);

    expect(reproduction.controllerHasResolver).toBe(true);
    expect(reproduction.resolvedClienteId).toBe('12345');
    expect(reproduction.resolvedBillingOrganizationId).toBe('17');
    expect(reproduction.gridFilterClienteId).toBe('12345');
    expect(reproduction.formClienteIdProp).toBe('12345');
    expect(reproduction.hiddenCntIdCliente).toBe('12345');
    expect(reproduction.recordCntIdCliente).toBe('12345');
    expect(reproduction.comboOrganizacionesValue).toBe('17');
    expect(reproduction.recordCntOrgFc).toBe('17');
    expect(reproduction.clientButtonHidden).toBe(true);

    const critical = errors.filter(
      (entry) =>
        !entry.includes('favicon') &&
        !entry.includes('DevTools') &&
        !entry.includes('[Nueva palabra]') &&
        !/net::ERR/.test(entry),
    );

    expect(critical).toEqual([]);
  });

  test('el save local del contrato con bonificación viaja como JSON al REST de crm_contrato', async ({ page }) => {
    test.slow();

    const webmg = new WebMGPage(page);

    await webmg.gotoLocal(tokenFile, LOCAL_PORT);
    await webmg.waitForReadyLocal(180_000);

    const request = await captureContratoCreateRequest(page);

    expect(request.method).toBe('POST');
    expect(request.url).toContain('/Rest/crm_contrato/');
    expect(request.contentType.toLowerCase()).toContain('application/json');
    expect(request.contentType.toLowerCase()).not.toContain('application/octet-stream');
    expect(request.saveSucceeded).toBe(true);
    expect(request.returnedId).toBe(987654);
    expect(request.parsedBody).toBeTruthy();
    expect(request.parsedBody.Id).toBe(0);
    expect(request.parsedBody.cnt_idcliente).toBe(5);
    expect(request.parsedBody.cnt_org_fc).toBe(14);
    expect(request.parsedBody.cnt_tmp_id).toBe(19);
    expect(request.parsedBody.cnt_metadata).toContain('bonificacion');
  });
});
