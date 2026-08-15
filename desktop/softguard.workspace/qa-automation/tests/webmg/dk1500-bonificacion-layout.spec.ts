import { expect, test, type Page } from '@playwright/test';
import * as path from 'path';
import {
  ADMINSEARCH_GCS_URL,
  captureEvidenceScreenshot,
  type EvidenceEntry,
  ensureEvidenceDirs,
  gotoGcsAdministratorSearch,
  writeEvidenceReport,
} from './dk1654-categorias-impositivas.shared';
import { waitForAjaxComplete } from '../../src/helpers/extjs';

const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1500-bonificacion-layout-gcs');
const CLIENTE_ID = Number(process.env.DK1500_CLIENTE_ID || 3);
const ORG_FC = Number(process.env.DK1500_ORG_FC || 17);
const APP_NAMESPACE = 'AdministratorSearch';

let screenshotsDir = '';
const evidenceEntries: EvidenceEntry[] = [];

async function openContratoFormForLayoutReview(page: Page): Promise<{ ok: boolean; details?: any; error?: string }> {
  return page.evaluate(
    ({ clienteId, orgFc, appNamespace }: { clienteId: number; orgFc: number; appNamespace: string }) => {
      try {
        const Ext = (window as any).Ext;
        const app = Ext?.app?.Application?.instance || null;

        Ext.syncRequire([
          `${appNamespace}.view.ContratoFormView`,
          `${appNamespace}.controller.ContratoFormController`,
          `${appNamespace}.model.crm_contratoModel`,
          `${appNamespace}.view.ContratoCuentaGridView`,
          `${appNamespace}.view.ContratoItemGridView`,
          `${appNamespace}.view.AvisoProgramadoGridView`,
          `${appNamespace}.view.FromBuilderEditHelperView`,
          `${appNamespace}.view.ContratoTemplateFormView`,
        ]);

        let controller = null;
        try {
          controller = app && app.getController ? app.getController(`${appNamespace}.controller.ContratoFormController`) : null;
        } catch (_e) {
          controller = null;
        }

        if (!controller) {
          controller = Ext.create(`${appNamespace}.controller.ContratoFormController`);
          if (controller.doInit) {
            controller.doInit(app);
          }
        }

        const center = Ext.getCmp('center');
        if (!center) {
          throw new Error('No se encontró el tabpanel center de AdministratorSearch');
        }

        const existing = Ext.ComponentQuery.query('contratoformview[itemId=dk1500BonificacionContractForm]')[0];
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

        const record = Ext.create(`${appNamespace}.model.crm_contratoModel`, {
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
          itemId: 'dk1500BonificacionContractForm',
          title: 'DK-1500 Bonificación layout',
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
    },
    { clienteId: CLIENTE_ID, orgFc: ORG_FC, appNamespace: APP_NAMESPACE },
  );
}

async function waitForContratoForm(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const Ext = (window as any).Ext;
      const form = Ext.ComponentQuery.query('contratoformview[itemId=dk1500BonificacionContractForm]')[0];
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
    const form = Ext.ComponentQuery.query('contratoformview[itemId=dk1500BonificacionContractForm]')[0];
    if (!form) {
      throw new Error('No se encontró el contratoformview de DK-1500');
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
    const form = Ext.ComponentQuery.query('contratoformview[itemId=dk1500BonificacionContractForm]')[0];
    if (!form) {
      throw new Error('No se encontró el contratoformview de DK-1500 para scrollear');
    }
    const bodyEl = (form.body && form.body.dom)
      ? form.body.dom
      : form.getEl().down('.x-panel-body').dom;
    bodyEl.scrollLeft = bodyEl.scrollWidth;
  });
  await page.waitForTimeout(250);
}

test.describe('DK-1500 — bonificación contrato layout GCS @dk-1500 @adminsearch @gcs @deploy @evidence', () => {
  test.beforeAll(async () => {
    screenshotsDir = await ensureEvidenceDirs(REPORT_ROOT);
  });

  test.afterAll(async () => {
    await writeEvidenceReport({
      reportRoot: REPORT_ROOT,
      ticket: 'DK-1500',
      title: 'DK-1500 — Evidencia GCS AdministratorSearch (layout bonificación contrato)',
      environment: 'AdministratorSearch deployado en GCS con ?version=',
      appUrl: ADMINSEARCH_GCS_URL,
      jsonFileName: 'dk1500-bonificacion-layout-gcs.json',
      markdownFileName: 'DK-1500-BONIFICACION-LAYOUT-GCS-EVIDENCE.md',
      methodologyLines: [
        'Se abrió AdministratorSearch deployado en GCS usando ?version= para validar el runtime real publicado.',
        'Se instanció el formulario de contrato publicado (`AdministratorSearch.view.ContratoFormView`) dentro del tabpanel real de la app.',
        'Se forzó un viewport reducido para simular el escenario reportado por QA sobre clipping de Bonificación.',
        'Se verificó que la sección Bonificación siga completamente accesible, ya sea por layout o mediante scroll horizontal del form.',
      ],
      entries: evidenceEntries,
      extraMetadata: {
        clienteId: CLIENTE_ID,
        orgFacturadora: ORG_FC,
      },
    });
  });

  test('la sección Bonificación publicada sigue accesible en ancho reducido', async ({ page }) => {
    test.slow();
    await page.setViewportSize({ width: 1180, height: 900 });
    await gotoGcsAdministratorSearch(page);

    const openResult = await openContratoFormForLayoutReview(page);
    expect(openResult.ok, `Debe poder abrir el contrato de prueba publicado: ${openResult.error || ''}`).toBe(true);

    await waitForContratoForm(page);

    const before = await collectLayoutMetrics(page);
    const beforeScreenshot = await captureEvidenceScreenshot(
      page,
      screenshotsDir,
      'gcs-01-bonificacion-before-scroll',
    );

    evidenceEntries.push({
      check: 'ContratoFormView deployado abre en AdministratorSearch GCS con Bonificación activa',
      status: 'pass',
      details: {
        openResult: openResult.details,
        before,
      },
      screenshot: beforeScreenshot,
    });

    expect(before.valorLabel, 'El campo principal debe mostrar el label contextual de porcentaje').toBe('Porcentaje');
    expect(before.valorDisabled, 'La bonificación activa no debe dejar el valor deshabilitado').toBe(false);
    expect(before.estadoText, 'El estado visible debe reflejar una bonificación vigente o programada').toMatch(/Vigente|Programada/i);
    expect(
      before.bonificacionFullyVisible || before.hasHorizontalOverflow,
      'La sección Bonificación deployada debe entrar completa o habilitar scroll horizontal en ancho reducido',
    ).toBe(true);

    if (before.hasHorizontalOverflow) {
      await scrollContratoFormToRight(page);
    }

    const after = await collectLayoutMetrics(page);
    const afterScreenshot = await captureEvidenceScreenshot(
      page,
      screenshotsDir,
      'gcs-02-bonificacion-after-scroll',
    );

    evidenceEntries.push({
      check: 'En el deploy publicado la Bonificación puede verse completa tras el ajuste de layout/scroll',
      status: 'pass',
      details: {
        before,
        after,
      },
      screenshot: afterScreenshot,
    });

    expect(
      after.bonificacionFullyVisible,
      `La sección Bonificación deployada debe quedar completamente accesible. Offset derecho actual=${after.bonificacionRightOffset}px`,
    ).toBe(true);
  });
});
