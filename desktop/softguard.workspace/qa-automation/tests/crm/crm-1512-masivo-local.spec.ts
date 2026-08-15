import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';
import * as path from 'path';
import * as fs from 'fs';

/**
 * DSS-1512 — Regresión: campo "Para" oculto en "Envío masivo", visible en "Envío de mail"
 *
 * Ambos contextos usan smartmailview como wrapper. La distinción es el TÍTULO del tab padre:
 *   - smartmailview.title === "Envío masivo"  → viene de Organizations/PersonGrid → Para OCULTO
 *   - smartmailview.title === "Envío de mail" → viene de SmartMailProgramGrid → Para VISIBLE
 *   - Standalone (doble-clic en grilla)        → no hay smartmailview padre → Para VISIBLE
 *
 * Fix aplicado en SmartMailFormController.js:
 *   isMasivoContext = !!(parentSmartMailView && parentSmartMailView.title === "Envío masivo")
 *
 * Ejecutar:
 *   npx playwright test crm/crm-1512-masivo-local.spec.ts --project=crm-1512-masivo-local --reporter=list
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-token.txt');
const screenshotsDir = path.resolve(__dirname, '..', '..', 'reports', 'dss1512-masivo');

test.beforeAll(() => {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

test('Regresión Masivo — campo Para OCULTO en "Envío masivo" (title="Envío masivo")', async ({ page }) => {
  /**
   * Abre un smartmailview con title "Envío masivo" (como hace OrganizationGrid/PersonGrid).
   * Verifica que el campo #destino (Para) NO es visible.
   * Antes del fix: visible — Para se mostraba y al completarlo ignoraba los Destinatarios.
   * Después del fix: oculto — Envío masivo usa la lista de Destinatarios, no Para.
   */
  const crm = new CrmPage(page);
  const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
  await crm.gotoLocalCrm(tokenFile, localPort);
  await crm.waitForCrmReadyLocal(120_000);

// Crear un SmartMailView con title "Envío masivo" — simula OrganizationGridController
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');

    const record = ext.create('Common.model.SmartMailProgramModel', {
      Id: 0,
      Name: 'Nuevo envío',  // mismo Name que usa OrganizationGridController
      Status: 'A',
      Query: "EXEC _desktop..organizationbyfilter @Filter='[{\"property\":\"Id:ININT\",\"value\":\"1,2,3\"}]',@limit=999999,@select='Email'",
      Body: '',
      From: '',
    });

    // title: 'Envío masivo' ← esta es la clave que discrimina el contexto
    const newTab = ext.widget('smartmailview', {
      iconCls: 'icon-email-go',
      title: 'Envío masivo',
      record: record,
      targetTab: center,
      closable: true,
    });

    center.add(newTab);
    center.setActiveTab(newTab);
  });

  // Esperar que SmartMailView y su SmartMailFormView interno se rendericen
  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    const mailView = ext.ComponentQuery.query('smartmailview')[0];
    if (!mailView || !mailView.rendered) return false;
    // El SmartMailController crea el smartmailformview "Principal" asincrónicamente
    const form = ext.ComponentQuery.query('smartmailformview')[0];
    return form && form.rendered;
  }, { timeout: 20_000, polling: 400 });

  await page.waitForTimeout(1200);

  // Verificar estado del campo Para dentro del contexto smartmailview
  const paraState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('smartmailformview')[0];
    if (!form) return null;
    const destino = form.down('#destino');
    const parentView = form.up('smartmailview');
    const isMasivoContext = !!(parentView && parentView.title === 'Envío masivo');
    return {
      visible: destino ? destino.isVisible() : null,
      fieldLabel: destino ? destino.getFieldLabel() : null,
      isMasivoContext,
      parentTitle: parentView ? parentView.title : null,
    };
  });

  console.log('[Masivo Test] Estado campo Para en Envío masivo:', JSON.stringify(paraState));

  // Screenshot: Envío masivo SIN campo Para visible (fix correcto)
  await page.screenshot({
    path: path.join(screenshotsDir, 'A-envio-masivo-para-oculto.png'),
  });
  await page.screenshot({
    path: path.join(screenshotsDir, 'A-envio-masivo-closeup.png'),
    clip: { x: 0, y: 55, width: 1920, height: 320 },
  });

  expect(paraState?.isMasivoContext, 'El form debe reconocerse como contexto masivo (title="Envío masivo")').toBe(true);
  expect(paraState?.visible, 'Para debe estar OCULTO en Envío masivo (usa Destinatarios)').toBe(false);
});

test('Regresión Masivo — campo Para VISIBLE en "Envío de mail" (title="Envío de mail")', async ({ page }) => {
  /**
   * Abre un smartmailview con title "Envío de mail" — simula SmartMailProgramGridController
   * cuando el usuario hace click en el botón de la grilla "Gestión de correo".
   * Verifica que el campo #destino (Para) SÍ es visible.
   * Garantiza que el fix no rompió el caso de envío individual.
   */
  const crm = new CrmPage(page);
  const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
  await crm.gotoLocalCrm(tokenFile, localPort);
  await crm.waitForCrmReadyLocal(120_000);

  // Crear SmartMailView con title "Envío de mail" — simula SmartMailProgramGridController
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');

    const record = ext.create('Common.model.SmartMailProgramModel', {
      Id: 0,
      Name: 'Nuevo envío',  // isNewEmail=true (mismo que usa SmartMailProgramGridController)
      Status: 'A',
      Query: "EXEC _desktop..organizationbyfilter @Filter='[]',@limit=999999,@select='Email'",
      Body: '',
      From: '',
    });

    // title: 'Envío de mail' ← desde SmartMailProgramGrid (Gestión de correo individual)
    const newTab = ext.widget('smartmailview', {
      iconCls: 'icon-email',
      title: 'Envío de mail',
      record: record,
      targetTab: center,
      closable: true,
    });

    center.add(newTab);
    center.setActiveTab(newTab);
  });

  // Esperar renderizado
  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    const form = ext.ComponentQuery.query('smartmailformview')[0];
    return form && form.rendered;
  }, { timeout: 15_000, polling: 300 });

  await page.waitForTimeout(1200);

  // Esperar que SmartMailView renderice y SmartMailController cree el smartmailformview interno
  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    const forms = ext.ComponentQuery.query('smartmailformview');
    // Buscar el form dentro del smartmailview con title 'Envío de mail'
    return forms.some((f: any) => {
      const parent = f.up('smartmailview');
      return f.rendered && parent && parent.title === 'Envío de mail';
    });
  }, { timeout: 20_000, polling: 400 });

  await page.waitForTimeout(1200);

  // Verificar estado del campo Para en contexto "Envío de mail"
  const paraState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const forms = ext.ComponentQuery.query('smartmailformview');
    const form = forms.find((f: any) => {
      const p = f.up('smartmailview');
      return p && p.title === 'Envío de mail';
    });
    if (!form) return null;
    const destino = form.down('#destino');
    const parentView = form.up('smartmailview');
    const isMasivoContext = !!(parentView && parentView.title === 'Envío masivo');
    return {
      visible: destino ? destino.isVisible() : null,
      fieldLabel: destino ? destino.getFieldLabel() : null,
      isMasivoContext,
      parentTitle: parentView ? parentView.title : null,
    };
  });

  console.log('[Masivo Test] Estado campo Para en Envío de mail:', JSON.stringify(paraState));

  // Screenshot: Envío de mail CON campo Para visible
  await page.screenshot({
    path: path.join(screenshotsDir, 'B-envio-de-mail-para-visible.png'),
  });
  await page.screenshot({
    path: path.join(screenshotsDir, 'B-envio-de-mail-closeup.png'),
    clip: { x: 0, y: 55, width: 1920, height: 320 },
  });

  expect(paraState?.isMasivoContext, 'Envío de mail NO debe reconocerse como masivo').toBe(false);
  expect(paraState?.visible, 'Para debe estar VISIBLE en Envío de mail (gestión individual)').toBe(true);
  expect(paraState?.fieldLabel, 'fieldLabel debe ser "Para"').toBe('Para');
});

test('Regresión Masivo — ambos contextos simultáneos en pantalla', async ({ page }) => {
  /**
   * Abre ambos contextos en el mismo browser:
   *   - Tab 1: Envío masivo → #destino OCULTO
   *   - Tab 2: Gestión de correo → #destino VISIBLE
   * Captura el estado completo para evidencia visual definitiva.
   */
  const crm = new CrmPage(page);
  const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
  await crm.gotoLocalCrm(tokenFile, localPort);
  await crm.waitForCrmReadyLocal(120_000);

  // Crear ambos formularios
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');

    // 1. Envío masivo (SmartMailView con title 'Envío masivo' — desde OrganizationGrid)
    const masivoRecord = ext.create('Common.model.SmartMailProgramModel', {
      Id: 1,
      Name: 'Nuevo envío',
      Status: '',
      Query: "EXEC _desktop..organizationbyfilter @Filter='[]',@limit=999999,@select='Email'",
      Body: '',
      From: '',
    });
    const masivoTab = ext.widget('smartmailview', {
      iconCls: 'icon-email-go',
      title: 'Envío masivo',   // ← title clave para contexto masivo
      record: masivoRecord,
      targetTab: center,
      closable: true,
    });
    center.add(masivoTab);

    // 2. Envío de mail (SmartMailView con title 'Envío de mail' — desde SmartMailProgramGrid)
    const correoRecord = ext.create('Common.model.SmartMailProgramModel', {
      Id: 2,
      Name: 'Nuevo envío',
      Status: 'A',
      Query: "EXEC _desktop..organizationbyfilter @Filter='[]',@limit=999999,@select='Email'",
      Body: '',
      From: '',
    });
    const correoTab = ext.widget('smartmailview', {
      iconCls: 'icon-email',
      title: 'Envío de mail',  // ← title para envío individual (Gestión de correo)
      record: correoRecord,
      targetTab: center,
      closable: true,
    });
    center.add(correoTab);
    center.setActiveTab(correoTab);
  });

  await page.waitForFunction(() => {
    const ext = (window as any).Ext;
    const forms = ext.ComponentQuery.query('smartmailformview');
    // Al menos uno dentro de 'Envío de mail' renderizado
    return forms.some((f: any) => {
      const p = f.up('smartmailview');
      return f.rendered && p && p.title === 'Envío de mail';
    });
  }, { timeout: 20_000, polling: 400 });

  await page.waitForTimeout(1500);

  // Verificar estado de ambos
  const bothStates = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const forms = ext.ComponentQuery.query('smartmailformview');
    return forms.map((form: any) => {
      const destino = form.down('#destino');
      const parentView = form.up('smartmailview');
      const isMasivo = !!(parentView && parentView.title === 'Envío masivo');
      return {
        title: form.title,
        parentTitle: parentView ? parentView.title : null,
        isMasivoContext: isMasivo,
        paraVisible: destino ? destino.isVisible() : null,
        paraLabel: destino ? destino.getFieldLabel() : null,
      };
    });
  });

  console.log('[Masivo Test] Estado de ambos formularios:', JSON.stringify(bothStates, null, 2));

  // Screenshot con el form de Gestión de correo activo (Para visible)
  await page.screenshot({
    path: path.join(screenshotsDir, 'C1-gestion-correo-activo.png'),
  });
  await page.screenshot({
    path: path.join(screenshotsDir, 'C1-gestion-correo-closeup.png'),
    clip: { x: 0, y: 55, width: 1920, height: 320 },
  });

  // Cambiar al tab Envío masivo
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');
    const masivoTab = center.query('smartmailview').find((v: any) => v.title === 'Envío masivo');
    if (masivoTab) center.setActiveTab(masivoTab);
  });

  await page.waitForTimeout(1000);

  // Screenshot con el form de Envío masivo activo (Para oculto)
  await page.screenshot({
    path: path.join(screenshotsDir, 'C2-envio-masivo-activo.png'),
  });
  await page.screenshot({
    path: path.join(screenshotsDir, 'C2-envio-masivo-closeup.png'),
    clip: { x: 0, y: 55, width: 1920, height: 320 },
  });

  // "Envío de mail" (individual) debe tener Para visible
  const envioMailSection = bothStates.find((s: any) => s.parentTitle === 'Envío de mail');
  const masivoSection = bothStates.find((s: any) => s.isMasivoContext);

  expect(envioMailSection?.paraVisible,
    '"Envío de mail" (individual): Para debe ser visible'
  ).toBe(true);

  if (masivoSection) {
    expect(masivoSection.paraVisible,
      '"Envío masivo" (desde orgs/personas): Para debe estar OCULTO'
    ).toBe(false);
  }
});
