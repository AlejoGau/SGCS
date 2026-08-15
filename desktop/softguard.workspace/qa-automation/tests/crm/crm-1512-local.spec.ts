import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';
import * as path from 'path';

/**
 * DSS-1512 — CRM Gestión de correo: perdida de envío individual + campo Para no se lee
 *
 * LOCAL version — corre contra sencha watch (localhost:1843) con las API calls
 * proxeadas a GCS via resource-override. Verifica que el fix funciona localmente.
 *
 * El fix está en packages/local/common/src/:
 *   - SmartMailFormController.js: restaura `destinoFieldNew.show()` en bloque `if (isNewEmail)`
 *     (revertir la eliminación de DSS-1474 que ocultó el campo Para para nuevos correos)
 *   - SmartMailFormView.js: fieldLabel "Destino" → "Para", elimina regex de email único
 *     (soportar múltiples emails separados por coma)
 *
 * Bugs corregidos:
 *   Bug 1 — Campo "Para" oculto para nuevo correo:
 *     SmartMailFormController.initview() bloqeue isNewEmail ya no oculta #destino.
 *     Ahora al crear "Nuevo Email" en Gestión de correo, el campo Para es visible
 *     y editable para especificar el destinatario individual.
 *
 *   Bug 2 — Campo "Para" vacío / inconsistente al ver correos ya enviados:
 *     El fieldLabel ahora dice "Para" (igual que la columna de la grilla).
 *     Para correos con ParseArray Query, el valor se extrae y muestra correctamente.
 *     Para correos masivos (sin email específico), el campo se muestra vacío (correcto).
 *
 * Prerequisitos:
 *   1. `sencha app watch --port 1843` corriendo desde apps/SgWebCrm/
 *   2. Auth setup ejecutado: npx playwright test crm --project=crm-auth-setup
 *
 * Para ejecutar:
 *   npx playwright test crm/crm-1512-local.spec.ts --project=crm-1512-local --reporter=list
 *   npx playwright test crm/crm-1512-local.spec.ts --project=crm-1512-local --headed
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-token.txt');

test.describe('DSS-1512 — Campo Para visible para nuevo correo + fix de Gestión de correo (local)', () => {
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
    'Bug 1 — campo #destino visible para nuevo correo (isNewEmail=true) — FIX verificado',
    async ({ page }) => {
      /**
       * Verifica el fix de DSS-1512 Bug 1:
       *   1. SmartMailFormView se crea con record Name="Nuevo envío" (isNewEmail=true)
       *   2. SmartMailFormController.initview() detecta isNewEmail=true
       *   3. Con el fix: llama destinoFieldNew.show() → #destino es visible
       *   4. Sin el fix (GCS): #destino permanece oculto (hidden=true por defecto)
       *
       * Este test PASA con el fix aplicado.
       */
      const crm = new CrmPage(page);
      const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
      await crm.gotoLocalCrm(tokenFile, localPort);
      await crm.waitForCrmReadyLocal(120_000);

      const result = await page.evaluate(() => {
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

        view.destroy();
        document.body.removeChild(container);

        return { destinoVisible };
      });

      console.log('[Test] #destino visible para nuevo correo (local):', result.destinoVisible);

      if (result.error) {
        console.warn('[Test] Error en evaluate:', result.error);
      }

      // Con el fix: #destino debe ser visible para nuevos correos
      expect(result.destinoVisible,
        'Con el fix DSS-1512: #destino debe ser visible cuando isNewEmail=true (Name="Nuevo envío")'
      ).toBe(true);
    },
  );

  test(
    'Bug 1 — campo #destino editable y acepta múltiples emails',
    async ({ page }) => {
      /**
       * Verifica que el campo #destino acepta texto y que el formulario
       * no rechaza múltiples emails separados por coma (regex eliminado).
       *
       * Con el fix:
       *   - #destino es visible y editable
       *   - No tiene regex restrictivo de email único
       *   - getValue() retorna lo que se escribió
       */
      const crm = new CrmPage(page);
      const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
      await crm.gotoLocalCrm(tokenFile, localPort);
      await crm.waitForCrmReadyLocal(120_000);

      const result = await page.evaluate(() => {
        const ext = (window as any).Ext;

        let record: any;
        try {
          record = ext.create('Common.model.SmartMailProgramModel', {
            Id: 0,
            Name: 'Nuevo envío',
            Status: 'A',
            Query: '',
            Body: '',
            From: '',
          });
        } catch (e) {
          return { destinoVisible: null, valueAfterSet: null, hasRegex: null, error: `Model create failed: ${e}` };
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
          return { destinoVisible: null, valueAfterSet: null, hasRegex: null, error: `Widget create failed: ${e}` };
        }

        const destinoField = view.down('#destino');
        const destinoVisible = destinoField ? destinoField.isVisible() : false;
        const hasRegex = destinoField ? !!destinoField.regex : false;

        // Simular escritura de múltiples emails
        const testEmails = 'usuario1@empresa.com,usuario2@empresa.com';
        if (destinoField) destinoField.setValue(testEmails);
        const valueAfterSet = destinoField ? destinoField.getValue() : null;

        // Verificar fieldLabel
        const fieldLabel = destinoField ? destinoField.getFieldLabel() : null;

        view.destroy();
        document.body.removeChild(container);

        return { destinoVisible, valueAfterSet, hasRegex, fieldLabel };
      });

      console.log('[Test] #destino visible:', result.destinoVisible);
      console.log('[Test] #destino tiene regex:', result.hasRegex);
      console.log('[Test] #destino fieldLabel:', result.fieldLabel);
      console.log('[Test] valor después de setValue:', result.valueAfterSet);

      if (result.error) {
        console.warn('[Test] Error en evaluate:', result.error);
      }

      expect(result.destinoVisible, '#destino debe ser visible').toBe(true);
      expect(result.hasRegex, '#destino NO debe tener regex restrictivo (fue eliminado en DSS-1512)').toBe(false);
      expect(result.fieldLabel, 'fieldLabel debe ser "Para" (consistente con columna de grilla)').toBe('Para');
      expect(result.valueAfterSet,
        'Campo debe aceptar múltiples emails separados por coma'
      ).toBe('usuario1@empresa.com,usuario2@empresa.com');
    },
  );

  test(
    'Bug 2 — campo #destino muestra email para correo existente con ParseArray Query',
    async ({ page }) => {
      /**
       * Verifica que para correos ya enviados con Query tipo ParseArray,
       * el campo #destino se muestra visible y con el email extraído de la Query.
       *
       * Con el fix:
       *   - isNewEmail=false (Name != "Nuevo envío", Status="C")
       *   - sender.show() se llama en el bloque `else if (!isNewEmail)`
       *   - sender.getValue() retorna el email extraído de la Query
       */
      const crm = new CrmPage(page);
      const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
      await crm.gotoLocalCrm(tokenFile, localPort);
      await crm.waitForCrmReadyLocal(120_000);

      const result = await page.evaluate(() => {
        const ext = (window as any).Ext;

        // Simula un registro de correo ya enviado con destinatario específico
        let record: any;
        try {
          record = ext.create('Common.model.SmartMailProgramModel', {
            Id: 42,
            Name: 'Correo de prueba',
            Status: 'C', // Completo — no isNewEmail
            Query: "select strval as Email from dbo.ParseArray( 'ventas@softguard.com',',')",
            Body: '<p>Contenido del correo de prueba</p>',
            From: 'ventas@softguard.com',
            IsoDateStart: new Date().toISOString(),
            IsoDateEnd: new Date().toISOString(),
          });
        } catch (e) {
          return { destinoVisible: null, destinoValue: null, error: `Model create failed: ${e}` };
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
          return { destinoVisible: null, destinoValue: null, error: `Widget create failed: ${e}` };
        }

        const destinoField = view.down('#destino');
        const destinoVisible = destinoField ? destinoField.isVisible() : false;
        const destinoValue = destinoField ? destinoField.getValue() : null;

        view.destroy();
        document.body.removeChild(container);

        return { destinoVisible, destinoValue };
      });

      console.log('[Test] #destino visible para correo existente (local):', result.destinoVisible);
      console.log('[Test] #destino valor para correo existente (local):', result.destinoValue);

      if (result.error) {
        console.warn('[Test] Error en evaluate:', result.error);
      }

      // Para correos con ParseArray query, #destino debe mostrarse con el email
      expect(result.destinoVisible,
        '#destino debe ser visible para correos ya enviados (isNewEmail=false)'
      ).toBe(true);
      expect(result.destinoValue,
        '#destino debe mostrar el email extraído de la Query ParseArray'
      ).toBe('ventas@softguard.com');
    },
  );

  test(
    'Bug 2 — campo #destino fieldLabel es "Para" (consistencia con columna de grilla)',
    async ({ page }) => {
      /**
       * Verifica que el fieldLabel del campo #destino sea "Para"
       * (igual que la columna "Para" en SmartMailProgramGridView).
       * Antes del fix era "Destino", lo que generaba inconsistencia visual.
       */
      const crm = new CrmPage(page);
      const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
      await crm.gotoLocalCrm(tokenFile, localPort);
      await crm.waitForCrmReadyLocal(120_000);

      const result = await page.evaluate(() => {
        const ext = (window as any).Ext;

        let record: any;
        try {
          record = ext.create('Common.model.SmartMailProgramModel', {
            Id: 1,
            Name: 'Test',
            Status: 'A',
            Query: "select strval as Email from dbo.ParseArray( 'test@test.com',',')",
            Body: '<p>Test</p>',
            From: 'test@test.com',
          });
        } catch (e) {
          return { fieldLabel: null, error: `Model create failed: ${e}` };
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
          return { fieldLabel: null, error: `Widget create failed: ${e}` };
        }

        const destinoField = view.down('#destino');
        const fieldLabel = destinoField ? destinoField.getFieldLabel() : null;

        view.destroy();
        document.body.removeChild(container);

        return { fieldLabel };
      });

      console.log('[Test] #destino fieldLabel (local):', result.fieldLabel);

      if (result.error) {
        console.warn('[Test] Error en evaluate:', result.error);
      }

      expect(result.fieldLabel,
        'El campo #destino debe mostrar label "Para" (consistente con columna de grilla SmartMailProgramGridView)'
      ).toBe('Para');
    },
  );
});
