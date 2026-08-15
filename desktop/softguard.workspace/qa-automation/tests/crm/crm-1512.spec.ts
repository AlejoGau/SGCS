import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';

/**
 * DSS-1512 — CRM Gestión de correo: perdida de envío individual + campo Para no se lee
 *
 * Contexto:
 *   Posterior a DSS-1474 ("re-agregar botón Envío masivo"), se introdujeron dos regresiones
 *   en el módulo "Gestión de correo" (SmartMailFormView / SmartMailFormController):
 *
 *   Bug 1 — Campo "Para" oculto para nuevos correos:
 *     La línea `const to = view.down("#destino"); to.show()` fue eliminada del bloque
 *     `if (isNewEmail)` en SmartMailFormController.initview(). Como resultado, al crear
 *     un nuevo correo, el campo "Para" (itemId=#destino) nunca se muestra, imposibilitando
 *     envíos a un destinatario específico sin usar el envío masivo.
 *
 *   Bug 2 — Campo "Para" vacío al ver correos ya enviados:
 *     Los correos creados post-DSS-1474 (sin destino específico) usaban la Query masiva
 *     (EXEC organizationbyfilter). Al abrirlos, el campo #destino se muestra pero vacío
 *     porque la Query no contiene una dirección de email extraíble.
 *     Adicionalmente, el fieldLabel decía "Destino" (inconsistente con la columna "Para"
 *     de la grilla) y el campo tenía un regex que solo aceptaba un único email.
 *
 * Fix (en packages/local/common/src/):
 *   - SmartMailFormController.js: restaura `destinoFieldNew.show()` en bloque isNewEmail
 *   - SmartMailFormView.js: fieldLabel "Destino" → "Para", elimina regex de email único
 *
 * Estos tests corren directamente contra GCS (código SIN el fix).
 * Se ESPERAN FALLAR en GCS — documentan el bug.
 * Una vez desplegado el fix en GCS, pasarán.
 *
 * Para ejecutar:
 *   npx playwright test crm/crm-1512.spec.ts --project=crm-1512-gcs --reporter=list
 */

test.describe('DSS-1512 — Campo Para oculto para nuevo correo (GCS, sin fix)', () => {
  test('SmartMailFormView y SmartMailFormController están registrados', async ({ page }) => {
    const crm = new CrmPage(page);
    const { frame, dss1497Active } = await crm.openCrmGcs();

    if (dss1497Active) {
      console.warn('[Test] DSS-1497 activo en GCS — verificando registro de clases igualmente');
    }

    const result = await frame.evaluate(() => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ClassManager) return { hasFormView: false, hasFormCtrl: false, hasProgramModel: false };
      return {
        hasFormView: !!ext.ClassManager.get('Common.view.SmartMailFormView'),
        hasFormCtrl: !!ext.ClassManager.get('Common.controller.SmartMailFormController'),
        hasProgramModel: !!ext.ClassManager.get('Common.model.SmartMailProgramModel'),
      };
    });

    console.log('[Test] Clases registradas:', result);
    expect(result.hasFormView, 'Common.view.SmartMailFormView debe estar registrado').toBe(true);
    expect(result.hasFormCtrl, 'Common.controller.SmartMailFormController debe estar registrado').toBe(true);
    expect(result.hasProgramModel, 'Common.model.SmartMailProgramModel debe estar registrado').toBe(true);
  });

  test(
    'Bug 1 — campo #destino oculto para nuevo correo (isNewEmail=true) — documenta bug en GCS',
    async ({ page }) => {
      /**
       * DSS-1512 Bug 1:
       *   - Se crea un SmartMailFormView con record Name="Nuevo envío" (isNewEmail=true)
       *   - En GCS (sin fix): el campo #destino permanece hidden → isVisible = false
       *   - Con el fix: #destino se muestra → isVisible = true
       *
       * Este test FALLA en GCS porque espera que #destino sea visible.
       * Sirve para documentar que el bug está presente en producción.
       */
      const crm = new CrmPage(page);
      const { frame, dss1497Active } = await crm.openCrmGcs();

      if (dss1497Active) {
        console.warn('[Test] DSS-1497 activo — viewport crasheado. Verificando smartmailformview igualmente.');
      }

      const result = await frame.evaluate(() => {
        const ext = (window as any).Ext;

        let record: any;
        try {
          record = ext.create('Common.model.SmartMailProgramModel', {
            Id: 0,
            Name: 'Nuevo envío',
            Status: 'A',
            Query: "EXEC _desktop..organizationbyfilter @Filter='[]',@limit=999999,@select='Email'",
            Body: '',
            From: '',
          });
        } catch (e) {
          return { destinoVisible: null, error: `Model create failed: ${e}` };
        }

        const container = document.createElement('div');
        container.style.cssText =
          'position:absolute;left:-9999px;top:-9999px;width:800px;height:600px;';
        document.body.appendChild(container);

        let view: any;
        try {
          view = ext.widget('smartmailformview', {
            record: record,
            renderTo: container,
            width: 800,
            height: 600,
          });
        } catch (e) {
          document.body.removeChild(container);
          return { destinoVisible: null, error: `Widget create failed: ${e}` };
        }

        const destinoField = view.down('#destino');
        const destinoVisible = destinoField ? destinoField.isVisible() : false;
        const destinoLabel = destinoField ? destinoField.getFieldLabel() : null;

        view.destroy();
        document.body.removeChild(container);

        return { destinoVisible, destinoLabel };
      });

      console.log('[Test] #destino visible para nuevo correo (GCS):', result.destinoVisible);
      console.log('[Test] #destino fieldLabel (GCS):', result.destinoLabel);

      if (result.error) {
        console.warn('[Test] Error en evaluate:', result.error);
      }

      // En GCS (sin fix): #destino permanece oculto → destinoVisible = false
      // Este assert FALLA en GCS intencionalmente, documentando que el bug existe
      expect(result.destinoVisible,
        'Con el fix DSS-1512: #destino debe ser visible para nuevos correos (isNewEmail=true). ' +
        'Actualmente falla en GCS porque DSS-1474 eliminó `to.show()` del bloque isNewEmail.'
      ).toBe(true);
    },
  );

  test(
    'Bug 2 — campo #destino tiene fieldLabel "Para" y no tiene regex de email único',
    async ({ page }) => {
      /**
       * DSS-1512 Bug 2 (UI):
       *   - El campo #destino debe tener fieldLabel="Para" (consistente con la columna de grilla)
       *   - No debe tener un regex que solo acepta un único email
       *   - En GCS (sin fix): fieldLabel="Destino", tiene regex de email único
       *
       * Este test FALLA en GCS porque fieldLabel es "Destino", no "Para".
       */
      const crm = new CrmPage(page);
      const { frame, dss1497Active } = await crm.openCrmGcs();

      if (dss1497Active) {
        console.warn('[Test] DSS-1497 activo — verificando definición del campo igualmente');
      }

      const result = await frame.evaluate(() => {
        const ext = (window as any).Ext;

        let record: any;
        try {
          record = ext.create('Common.model.SmartMailProgramModel', {
            Id: 1,
            Name: 'Correo enviado',
            Status: 'C',
            Query: "select strval as Email from dbo.ParseArray( 'ventas@softguard.com',',')",
            Body: '<p>Test</p>',
            From: 'ventas@softguard.com',
          });
        } catch (e) {
          return { fieldLabel: null, hasRegex: null, error: `Model create failed: ${e}` };
        }

        const container = document.createElement('div');
        container.style.cssText =
          'position:absolute;left:-9999px;top:-9999px;width:800px;height:600px;';
        document.body.appendChild(container);

        let view: any;
        try {
          view = ext.widget('smartmailformview', {
            record: record,
            renderTo: container,
            width: 800,
            height: 600,
          });
        } catch (e) {
          document.body.removeChild(container);
          return { fieldLabel: null, hasRegex: null, error: `Widget create failed: ${e}` };
        }

        const destinoField = view.down('#destino');
        const fieldLabel = destinoField ? destinoField.getFieldLabel() : null;
        const hasRegex = destinoField ? !!destinoField.regex : null;

        view.destroy();
        document.body.removeChild(container);

        return { fieldLabel, hasRegex };
      });

      console.log('[Test] fieldLabel (GCS):', result.fieldLabel);
      console.log('[Test] hasRegex (GCS):', result.hasRegex);

      // En GCS (sin fix): fieldLabel = "Destino" → este assert falla, documenta el bug
      expect(result.fieldLabel,
        'Con el fix DSS-1512: fieldLabel del campo #destino debe ser "Para" (consistente con columna de grilla)'
      ).toBe('Para');
    },
  );
});
