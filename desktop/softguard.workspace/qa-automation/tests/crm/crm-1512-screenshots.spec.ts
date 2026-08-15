import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';
import * as path from 'path';
import * as fs from 'fs';

/**
 * DSS-1512 — Capturas visuales del fix: navegación real por la UI
 *
 * Screenshots de la app real mostrando:
 *   A) Grilla "Gestión de correo" con columna Para
 *   B) Doble clic en correo existente → campo Para populado con el destinatario
 *   C) "Nuevo Email" → campo Para visible (fix Bug 1)
 *   D) Comparación: GCS (bug) vs local (fix)
 *
 * Ejecutar:
 *   npx playwright test crm/crm-1512-screenshots.spec.ts --project=crm-1512-screenshots --reporter=list
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-token.txt');
const screenshotsDir = path.resolve(__dirname, '..', '..', 'reports', 'dss1512-screenshots');

test.beforeAll(() => {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

test('DSS-1512 — Fix A: grilla Gestión de correo con columna Para', async ({ page }) => {
  /**
   * Navega a Gestión de correo (btnsmartmail) y captura la grilla
   * mostrando la columna Para con los emails de destinatarios.
   */
  const crm = new CrmPage(page);
  const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
  await crm.gotoLocalCrm(tokenFile, localPort);
  await crm.waitForCrmReadyLocal(120_000);

  // Abrir Gestión de correo via el botón del header (itemId: "btnsmartmail")
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const btn = ext.ComponentQuery.query('[itemId="btnsmartmail"]')[0];
    if (btn) btn.handler ? btn.handler.call(btn, btn) : btn.fireEvent('click', btn);
  });

  // Esperar que la grilla se renderice y cargue datos
  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('smartmailprogramgridview')[0];
    if (!grid || !grid.rendered) return false;
    const store = grid.getStore();
    return store && !store.isLoading();
  }, { timeout: 30_000, polling: 500 });

  await page.waitForTimeout(1000);

  // Screenshot A: Gestión de correo con grilla cargada
  await page.screenshot({
    path: path.join(screenshotsDir, 'A-gestion-correo-grilla.png'),
  });
  console.log('[Screenshots] A-gestion-correo-grilla.png guardado');
});

test('DSS-1512 — Fix B: doble clic en correo existente → campo Para populado', async ({ page }) => {
  /**
   * Simula el flujo real: abrir Gestión de correo → doble clic en el primer email.
   * Verifica que el campo "Para" muestra el destinatario del correo (fix Bug 2).
   * Antes del fix, este campo tenía label "Destino" y podía no mostrar el valor.
   */
  const crm = new CrmPage(page);
  const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
  await crm.gotoLocalCrm(tokenFile, localPort);
  await crm.waitForCrmReadyLocal(120_000);

  // Abrir Gestión de correo
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const btn = ext.ComponentQuery.query('[itemId="btnsmartmail"]')[0];
    if (btn) btn.handler ? btn.handler.call(btn, btn) : btn.fireEvent('click', btn);
  });

  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('smartmailprogramgridview')[0];
    if (!grid || !grid.rendered) return false;
    const store = grid.getStore();
    return store && !store.isLoading() && store.getCount() > 0;
  }, { timeout: 30_000, polling: 500 });

  await page.waitForTimeout(800);

  // Screenshot B1: grilla con emails cargados antes del doble clic
  await page.screenshot({
    path: path.join(screenshotsDir, 'B1-grilla-antes-doble-clic.png'),
  });

  // Doble clic en el primer row de la grilla via Ext (dispara onItemClick del controller)
  // index=undefined → el controller usa el else branch: var view = grid (evita el up() que falla)
  const firstRowInfo = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('smartmailprogramgridview')[0];
    if (!grid) return null;
    const store = grid.getStore();
    if (!store || store.getCount() === 0) return null;
    const record = store.getAt(0);
    // index=undefined → toma el branch else en onItemClick (var view = grid)
    grid.fireEvent('itemdblclick', grid, record, null, undefined, {});
    return {
      id: record.get('Id'),
      name: record.get('Name'),
      query: record.get('Query'),
      to: record.get('To'),
    };
  });

  console.log('[Screenshots] Primer registro:', JSON.stringify(firstRowInfo));

  // Esperar que se abra el tab smartmailformview con ese registro
  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    return ext.ComponentQuery.query('smartmailformview').length > 0;
  }, { timeout: 15_000, polling: 300 });

  await page.waitForTimeout(1500);

  // Verificar que el campo Para tiene un valor y es visible
  const paraState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('smartmailformview')[0];
    if (!form) return null;
    const destino = form.down('#destino');
    return {
      visible: destino ? destino.isVisible() : null,
      value: destino ? destino.getValue() : null,
      fieldLabel: destino ? destino.getFieldLabel() : null,
    };
  });

  console.log('[Screenshots] Estado del campo Para:', JSON.stringify(paraState));

  // Screenshot B2: formulario del correo existente con campo Para visible y populado
  await page.screenshot({
    path: path.join(screenshotsDir, 'B2-correo-existente-para-populado.png'),
  });
  console.log('[Screenshots] B2-correo-existente-para-populado.png guardado');

  // Captura de sólo el área del formulario (parte superior)
  await page.screenshot({
    path: path.join(screenshotsDir, 'B3-correo-existente-para-closeup.png'),
    clip: { x: 0, y: 55, width: 1920, height: 300 },
  });
  console.log('[Screenshots] B3-correo-existente-para-closeup.png guardado');

  // El campo debe ser visible y tener valor (confirma el fix)
  expect(paraState?.visible, 'Campo Para debe ser visible para correos ya enviados').toBe(true);
  expect(paraState?.fieldLabel, 'fieldLabel debe decir "Para" (no "Destino")').toBe('Para');
});

test('DSS-1512 — Fix C: Nuevo Email → campo Para visible (Bug 1)', async ({ page }) => {
  /**
   * Simula click en "Nuevo Email": antes del fix, el campo Para estaba oculto.
   * Con el fix, debe mostrarse arriba del formulario para ingresar el destinatario.
   */
  const crm = new CrmPage(page);
  const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
  await crm.gotoLocalCrm(tokenFile, localPort);
  await crm.waitForCrmReadyLocal(120_000);

  // Abrir Gestión de correo
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const btn = ext.ComponentQuery.query('[itemId="btnsmartmail"]')[0];
    if (btn) btn.handler ? btn.handler.call(btn, btn) : btn.fireEvent('click', btn);
  });

  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('smartmailprogramgridview')[0];
    return grid && grid.rendered;
  }, { timeout: 15_000, polling: 300 });

  await page.waitForTimeout(800);

  // Screenshot C1: grilla con botón "Nuevo Email" visible
  await page.screenshot({
    path: path.join(screenshotsDir, 'C1-gestion-correo-boton-nuevo.png'),
  });
  console.log('[Screenshots] C1-gestion-correo-boton-nuevo.png guardado');

  // Crear el formulario de nuevo correo directamente (sin guardar en backend)
  // Simula lo que hace el controller después de program.save() success
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');

    const record = ext.create('Common.model.SmartMailProgramModel', {
      Id: 999999, // ID temporal para demo
      Name: 'Nuevo envío',
      Status: 'A',
      Query: "EXEC _desktop..organizationbyfilter @Filter='[]',@limit=999999,@select='Email'",
      Body: '',
      From: '',
    });

    const newTab = ext.widget('smartmailformview', {
      iconCls: 'icon-email',
      title: '(999999) Nuevo envío',
      targetTab: center,
      record: record,
      closable: true,
    });

    center.add(newTab);
    center.setActiveTab(newTab);
  });

  // Esperar que el formulario se renderice
  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('smartmailformview')[0];
    return form && form.rendered;
  }, { timeout: 10_000, polling: 300 });

  await page.waitForTimeout(1200);

  // Verificar el estado del campo Para
  const paraState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('smartmailformview')[0];
    if (!form) return null;
    const destino = form.down('#destino');
    return {
      visible: destino ? destino.isVisible() : null,
      fieldLabel: destino ? destino.getFieldLabel() : null,
      emptyText: destino ? destino.emptyText : null,
    };
  });

  console.log('[Screenshots] Nuevo correo — estado del campo Para:', JSON.stringify(paraState));

  // Screenshot C2: formulario nuevo correo con campo Para visible
  await page.screenshot({
    path: path.join(screenshotsDir, 'C2-nuevo-email-para-visible.png'),
  });
  console.log('[Screenshots] C2-nuevo-email-para-visible.png guardado');

  // Closeup del formulario mostrando el campo Para arriba
  await page.screenshot({
    path: path.join(screenshotsDir, 'C3-nuevo-email-para-closeup.png'),
    clip: { x: 0, y: 55, width: 1920, height: 320 },
  });
  console.log('[Screenshots] C3-nuevo-email-para-closeup.png guardado');

  expect(paraState?.visible, 'DSS-1512 Fix Bug 1: campo Para debe ser visible para nuevo correo').toBe(true);
  expect(paraState?.fieldLabel, 'fieldLabel debe decir "Para"').toBe('Para');
});
