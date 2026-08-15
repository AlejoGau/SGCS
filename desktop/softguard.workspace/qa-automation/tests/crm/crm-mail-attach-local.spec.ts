import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';
import * as path from 'path';

/**
 * DSS-1498 — CRM: No es posible adjuntar un archivo al momento de enviar un correo
 *
 * LOCAL version — corre contra sencha watch (localhost:1843) con las API calls
 * proxeadas a GCS via resource-override. Verifica que el fix funciona localmente.
 *
 * El fix está en:
 *   packages/local/common/src/controller/SMPAttachGridController.js
 *   - onFiltrar: agrega `view.record = record;` como primera línea
 *   - initView:  guarda con `if (record)` antes de llamar onFiltrar
 *
 * Prerequisitos:
 *   1. `sencha app watch --port 1843` corriendo desde apps/SgWebCrm/
 *   2. Auth setup ejecutado: npx playwright test crm --project=crm-auth-setup
 *
 * Para ejecutar:
 *   npx playwright test crm/crm-mail-attach-local.spec.ts --project=crm-mail-attach-local --headed
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-token.txt');

test.describe('DSS-1498 — Mail attachment local fix (sencha watch @ localhost:1843)', () => {
  test('CRM app local carga sin errores críticos', async ({ page }) => {
    const crm = new CrmPage(page);
    const errors = crm.collectCrmConsoleErrors();

    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);

    await crm.waitForCrmReadyLocal(120_000);
    console.log('[Test] CRM viewport listo en localhost');

    const loaded = await crm.isCrmLoadedLocal();
    expect(loaded, 'El viewport de CRM y el panel center deben renderizar localmente').toBe(true);

    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('DevTools') &&
        !e.includes('El parametro') &&
        !e.includes('[Nueva palabra]'),
    );

    if (criticalErrors.length > 0) {
      console.error('[Test] Errores de consola capturados:');
      criticalErrors.forEach((e) => console.error('  -', e));
    }

    expect(criticalErrors, 'No deben haber errores críticos al cargar CRM localmente').toHaveLength(0);
  });

  test(
    'smpattachgridview.record se actualiza al disparar evento filtrar — FIX verificado',
    async ({ page }) => {
      /**
       * Verifica el fix de DSS-1498:
       *   1. smpattachgridview se crea con un record inicial (Id=0)
       *   2. La vista renderiza → initView → onFiltrar(initialRecord) → view.record = initialRecord
       *   3. Se dispara filtrar con un serverRecord (Id=9999)
       *   4. Con el fix: onFiltrar asigna view.record = serverRecord → Id=9999 ✓
       *
       * Este test PASA con el fix aplicado.
       */
      const crm = new CrmPage(page);
      const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
      await crm.gotoLocalCrm(tokenFile, localPort);
      await crm.waitForCrmReadyLocal(120_000);

      const result = await page.evaluate(() => {
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

      // Con el fix: view.record debe ser el serverRecord (Id=9999)
      expect(result.recordIdAfterFiltrar, [
        'Con el fix, smpattachgridview.record debe actualizarse al record pasado en filtrar.',
        'view.record.Id debe ser 9999 (serverRecord), no 0 (initialRecord).',
      ].join(' ')).toBe(9999);
    },
  );

  test(
    'initView no crashea cuando view.record es undefined (fix del guard)',
    async ({ page }) => {
      /**
       * Verifica la segunda parte del fix: el guard `if (record)` en initView.
       * Simula smpattachgridview renderizando sin record (caso de fieldset colapsado).
       * Con el fix: no crashea.
       * Sin el fix: onFiltrar(undefined, view) → record.get() → TypeError.
       */
      const crm = new CrmPage(page);
      const errors = crm.collectCrmConsoleErrors();

      const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
      await crm.gotoLocalCrm(tokenFile, localPort);
      await crm.waitForCrmReadyLocal(120_000);

      const result = await page.evaluate(() => {
        const ext = (window as any).Ext;

        const container = document.createElement('div');
        container.style.cssText =
          'position:absolute;left:-9999px;top:-9999px;width:400px;height:200px;';
        document.body.appendChild(container);

        let crashed = false;
        let errorMessage = '';

        try {
          // Sin record: simula el caso donde el fieldset colapsado renderiza antes
          // de que MailActionFormView.initComponent asigne el record
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
        console.error('[Test] TypeError capturado en consola:', criticalErrors);
      }

      // Con el fix: no debe crashear — initView tiene guard `if (record)`
      expect(result.crashed, 'initView con guard if (record) no debe crashear con record undefined').toBe(false);
      expect(criticalErrors, 'No debe haber TypeError de record.get() en consola').toHaveLength(0);
    },
  );
});
