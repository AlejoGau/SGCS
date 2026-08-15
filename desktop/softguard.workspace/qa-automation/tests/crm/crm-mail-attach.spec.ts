import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';

/**
 * DSS-1498 — CRM: No es posible adjuntar un archivo al momento de enviar un correo
 *
 * Contexto:
 *   Al abrir "Nuevo Mail" en el historial de una organización, la vista
 *   de adjuntos (smpattachgridview) nunca recibe la referencia al registro
 *   guardado en servidor (Id > 0). El handler beforeupload detecta Id === 0
 *   y bloquea la subida con "Debe guardar el programa antes de adjuntar archivos."
 *
 * Root cause:
 *   SMPAttachGridController.onFiltrar() recibe el record y filtra el store,
 *   pero nunca asigna view.record = record. Cuando MailActionFormController.setRecord()
 *   llama filtrar con el record recién guardado (Id > 0), smpattachgridview.record
 *   queda con el record inicial (Id = 0).
 *
 * Fix:
 *   SMPAttachGridController.onFiltrar: agregar view.record = record como primera línea.
 *   SMPAttachGridController.initView:  guardar con if (record) para evitar crash si
 *   el fieldset "Archivos adjuntos" renderiza antes de que el record esté disponible.
 *
 * Estos tests corren directamente contra GCS (código sin fix).
 * Se espera que fallen en GCS, documentando el bug.
 * Pasarán una vez que el fix sea desplegado en GCS.
 *
 * Para ejecutar:
 *   npx playwright test crm/crm-mail-attach.spec.ts --project=crm-mail-attach-gcs --reporter=list
 */

test.describe('DSS-1498 — Mail attachment: smpattachgridview.record se actualiza con filtrar (GCS)', () => {
  test('MailActionModel y MailActionFormView están registrados en el contexto CRM', async ({ page }) => {
    const crm = new CrmPage(page);
    const { frame, dss1497Active } = await crm.openCrmGcs();

    if (dss1497Active) {
      console.warn('[Test] DSS-1497 activo en GCS — viewport crasheado, verificando clases igualmente');
    }

    const result = await frame.evaluate(() => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ClassManager) return { hasMailActionModel: false, hasSmpAttachGridView: false, hasMailActionFormView: false };
      return {
        hasMailActionModel: !!ext.ClassManager.get('Common.model.MailActionModel'),
        hasSmpAttachGridView: !!ext.ClassManager.get('Common.view.SMPAttachGridView'),
        hasMailActionFormView: !!ext.ClassManager.get('Common.view.MailActionFormView'),
      };
    });

    console.log('[Test] Clases registradas:', result);
    expect(result.hasMailActionModel, 'Common.model.MailActionModel debe estar registrado').toBe(true);
    expect(result.hasSmpAttachGridView, 'Common.view.SMPAttachGridView debe estar registrado').toBe(true);
    expect(result.hasMailActionFormView, 'Common.view.MailActionFormView debe estar registrado').toBe(true);
  });

  test(
    'smpattachgridview.record se actualiza al disparar evento filtrar (DSS-1498 regression)',
    async ({ page }) => {
      /**
       * Simula el flujo de "Nuevo Mail":
       *   1. smpattachgridview se crea con un record inicial (Id=0)
       *   2. La vista renderiza → initView → onFiltrar(initialRecord)
       *   3. MailActionFormController.setRecord dispara filtrar con el serverRecord (Id=9999)
       *   4. Con el fix: view.record = serverRecord → Id=9999
       *      Sin el fix (GCS): view.record sigue siendo el initial record → Id=0
       *
       * Este test FALLA en GCS (sin fix) → documenta el bug.
       * Pasa una vez deployado el fix en GCS.
       */
      const crm = new CrmPage(page);
      const { frame, dss1497Active } = await crm.openCrmGcs();

      if (dss1497Active) {
        console.warn('[Test] DSS-1497 activo — viewport crasheado. Verificando comportamiento de filtrar con models disponibles.');
      }

      const result = await frame.evaluate(() => {
        const ext = (window as any).Ext;

        let initialRecord: any;
        let serverRecord: any;
        try {
          initialRecord = ext.create('Common.model.MailActionModel', {
            Id: 0,
            ObjectTypeName: 'Organization',
            ObjectTypeId: '1',
          });
          serverRecord = ext.create('Common.model.MailActionModel', {
            Id: 9999,
            ObjectTypeName: 'Organization',
            ObjectTypeId: '1',
          });
        } catch (e) {
          return { recordIdAfterFiltrar: null, error: `Model create failed: ${e}` };
        }

        const container = document.createElement('div');
        container.style.cssText =
          'position:absolute;left:-9999px;top:-9999px;width:400px;height:200px;';
        document.body.appendChild(container);

        let attachView: any;
        try {
          // renderTo dispara afterrender sincrónicamente en ExtJS → initView se ejecuta aquí
          attachView = ext.widget('smpattachgridview', {
            record: initialRecord,
            renderTo: container,
            width: 400,
            height: 200,
          });
        } catch (e) {
          document.body.removeChild(container);
          return { recordIdAfterFiltrar: null, error: `Widget create failed: ${e}` };
        }

        // Simula MailActionFormController.setRecord → dispara filtrar con el record del servidor
        attachView.fireEvent('filtrar', serverRecord, attachView);

        const id = attachView.record ? attachView.record.get('Id') : null;

        attachView.destroy();
        document.body.removeChild(container);

        return { recordIdAfterFiltrar: id };
      });

      console.log('[Test] smpattachgridview.record.Id después de filtrar:', result.recordIdAfterFiltrar);
      if (result.error) {
        console.warn('[Test] Error en evaluate:', result.error);
      }

      // Con el fix: after filtrar con serverRecord (Id=9999), view.record debe ser 9999
      // Sin fix (GCS): view.record.Id sigue siendo 0 → test falla → documenta el bug
      expect(result.recordIdAfterFiltrar, [
        'smpattachgridview.record debe actualizarse al record pasado en el evento filtrar.',
        'Si falla en GCS, confirma DSS-1498: filtrar no actualiza view.record.',
      ].join(' ')).toBe(9999);
    },
  );

  test(
    'initView no crashea cuando view.record es undefined (fieldset colapsado)',
    async ({ page }) => {
      /**
       * Simula el edge case donde smpattachgridview renderiza sin record establecido.
       * Ocurre cuando el fieldset "Archivos adjuntos" está colapsado y renderiza
       * antes de que MailActionFormView.initComponent pueda asignar el record.
       *
       * Sin el fix: initView llama onFiltrar(undefined, view) → record.get() crashea.
       * Con el fix: initView tiene guard if (record) → no crashea.
       *
       * Este test FALLA en GCS (sin fix) → documenta el crash secundario.
       */
      const crm = new CrmPage(page);
      const errors = crm.collectCrmConsoleErrors();
      const { frame, dss1497Active } = await crm.openCrmGcs();

      if (dss1497Active) {
        console.warn('[Test] DSS-1497 activo — viewport crasheado. Verificando guard if (record) con models disponibles.');
      }

      const result = await frame.evaluate(() => {
        const ext = (window as any).Ext;

        const container = document.createElement('div');
        container.style.cssText =
          'position:absolute;left:-9999px;top:-9999px;width:400px;height:200px;';
        document.body.appendChild(container);

        let crashed = false;
        let errorMessage = '';

        try {
          // Sin record: simula smpattachgridview dentro de fieldset colapsado
          // que renderiza antes de que MailActionFormView.initComponent asigne el record
          const attachView = ext.widget('smpattachgridview', {
            // record: undefined — intencionalmente no se pasa
            renderTo: container,
            width: 400,
            height: 200,
          });
          attachView.destroy();
        } catch (e: any) {
          crashed = true;
          errorMessage = e?.message || String(e);
        } finally {
          if (document.body.contains(container)) {
            document.body.removeChild(container);
          }
        }

        return { crashed, errorMessage };
      });

      console.log('[Test] initView sin record — crashed:', result.crashed, 'error:', result.errorMessage);

      const criticalErrors = errors.filter(
        (e) =>
          !e.includes('favicon') &&
          !e.includes('DevTools') &&
          e.toLowerCase().includes('cannot read propert'),
      );

      if (criticalErrors.length > 0) {
        console.warn('[Test] Errores de consola relacionados al crash:', criticalErrors);
      }

      // Con el fix: no debe crashear
      expect(result.crashed, [
        'initView no debe crashear cuando view.record es undefined.',
        'Si falla en GCS, confirma el crash secundario de DSS-1498.',
      ].join(' ')).toBe(false);
    },
  );
});
