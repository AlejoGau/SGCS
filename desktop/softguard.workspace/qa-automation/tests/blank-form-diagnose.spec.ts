import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Diagnose why MoneyGuardOrganizacion form opens BLANK on GCS production.
 *
 * Loads AdministratorSearch directly from GCS, navigates to Organizaciones
 * facturación, clicks Nuevo, and captures full state of:
 *   - Ext class registry (alias, controller class)
 *   - JS load errors / page errors
 *   - The Window's component tree (or lack thereof)
 *   - DOM of the Window
 *   - Network responses for MoneyGuardOrganizacion* JS files
 */
test('diagnose blank Nueva Organizacion form', async ({ browser }) => {
  const tokenFile = path.resolve(__dirname, '..', '.auth', 'token.txt');
  const token = fs.readFileSync(tokenFile, 'utf-8').trim();

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
  });

  await context.addCookies([{
    name: 'OAuth_Token',
    value: token,
    domain: 'gcs.softguard.com',
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Lax',
  }]);

  const page = await context.newPage();

  const consoleLogs: string[] = [];
  const pageErrors: string[] = [];
  const moneyGuardResponses: { url: string; status: number; size: number }[] = [];
  const failedRequests: string[] = [];

  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push(`[${msg.type()}] ${text}`);
    if (text.includes('FormView') || text.includes('initview') || text.includes('FormController') || text.includes('MoneyGuard') || msg.type() === 'error') {
      console.log(`[Browser ${msg.type()}] ${text}`);
    }
  });
  page.on('pageerror', (err) => {
    pageErrors.push(`${err.message}\n${err.stack || ''}`);
    console.log(`[PageError] ${err.message}`);
  });
  page.on('requestfailed', (req) => {
    if (req.url().includes('MoneyGuard') || req.url().includes('AdministratorSearch')) {
      failedRequests.push(`${req.url()} - ${req.failure()?.errorText}`);
    }
  });
  page.on('response', async (resp) => {
    const url = resp.url();
    if (url.includes('MoneyGuardOrganizacion') || url.includes('org_cmetadata') || url.includes('t_organizacion_fc')) {
      let size = 0;
      try { size = (await resp.body()).length; } catch {}
      moneyGuardResponses.push({ url, status: resp.status(), size });
      console.log(`[NET ${resp.status()}] ${size}B ${url}`);
    }
    if (resp.status() >= 400 && (url.includes('AdministratorSearch') || url.includes('MoneyGuard'))) {
      console.log(`[HTTP ${resp.status()}] ${url}`);
    }
  });

  console.log('=== Step 1: Navigate to AdministratorSearch ===');
  await page.goto('https://gcs.softguard.com/a/AdministratorSearch?version=', {
    waitUntil: 'domcontentloaded',
    timeout: 120_000,
  });

  console.log('=== Step 2: Wait for Ext.isReady ===');
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return ext && ext.isReady === true && ext.ComponentQuery && ext.app;
    },
    undefined,
    { timeout: 240_000, polling: 1000 },
  );
  console.log('Ext is ready');

  // Give controllers a moment to register
  await page.waitForTimeout(3000);

  console.log('=== Step 3: Inspect class registry BEFORE opening form ===');
  const registryState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const cm = ext.ClassManager;
    const out: any = {};
    out.aliasFormView = !!cm.getByAlias('widget.moneyguardorganizacionformview');
    out.aliasGridView = !!cm.getByAlias('widget.moneyguardorganizaciongridview');
    out.formCtrlClass = !!cm.get('AdministratorSearch.controller.MoneyGuardOrganizacionFormController');
    out.gridCtrlClass = !!cm.get('AdministratorSearch.controller.MoneyGuardOrganizacionGridController');
    out.formViewClass = !!cm.get('AdministratorSearch.view.MoneyGuardOrganizacionFormView');
    out.orgFcModelClass = !!cm.get('AdministratorSearch.model.t_organizacion_fcModel');
    out.provinciasStore = !!cm.get('AdministratorSearch.store.ProvinciasStore');
    out.metadataCtrl = !!cm.get('AdministratorSearch.controller.org_cmetadataFormController');
    // Try app instance
    const apps = ext.app && ext.app.Application && ext.app.Application.instance;
    out.appExists = !!apps;
    if (apps) {
      const ctrlNames = Object.keys((apps.controllers && apps.controllers.map) || {});
      out.totalCtrls = ctrlNames.length;
      out.moneyGuardCtrls = ctrlNames.filter((n) => n.indexOf('MoneyGuard') >= 0);
      out.allCtrlNames = ctrlNames;
    }
    return out;
  });
  console.log('Registry:', JSON.stringify(registryState, null, 2));

  console.log('=== Step 4: Open Organizaciones grid via ComponentQuery ===');
  // Try clicking the menu item programmatically — directly invoke the grid
  const openGridResult = await page.evaluate(() => {
    const ext = (window as any).Ext;
    try {
      // Find moduleController — opens an "module" tab
      const apps = ext.app.Application.instance;
      if (!apps) return { error: 'no app instance' };
      const moduleCtrl = apps.getController('ModuleController');
      // Try to open MoneyGuardOrganizacion module
      // Look for desktop main panel (TabPanel)
      const mainTabs = ext.ComponentQuery.query('viewport tabpanel')[0]
        || ext.ComponentQuery.query('tabpanel[region=center]')[0]
        || ext.ComponentQuery.query('tabpanel')[0];
      if (!mainTabs) return { error: 'no main tabs' };
      // Create grid view directly
      const grid = ext.widget('moneyguardorganizaciongridview', { title: 'Organizaciones facturación' });
      if (!grid) return { error: 'widget grid returned null' };
      mainTabs.add(grid);
      mainTabs.setActiveTab(grid);
      return {
        ok: true,
        gridXtype: grid.xtype,
        gridItemsCount: grid.items && grid.items.length,
      };
    } catch (e: any) {
      return { error: e.message, stack: e.stack };
    }
  });
  console.log('OpenGrid:', JSON.stringify(openGridResult, null, 2));

  // Wait for grid store to load
  await page.waitForTimeout(5000);

  console.log('=== Step 5: Inspect grid + click Nuevo button ===');
  const gridState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) return { error: 'grid not found' };
    const newBtn = grid.down('button[action=new]')
      || grid.down('button[itemId=new]')
      || ext.ComponentQuery.query('button', grid).find((b: any) => /nuevo|new/i.test(b.text || ''));
    return {
      hasGrid: true,
      storeCount: grid.getStore && grid.getStore().getCount(),
      hasNewBtn: !!newBtn,
      newBtnText: newBtn?.text,
      newBtnAction: newBtn?.action,
    };
  });
  console.log('Grid:', JSON.stringify(gridState, null, 2));

  console.log('=== Step 6: Click Nuevo button (programmatic fire) ===');
  const clickResult = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) return { error: 'no grid' };
    const buttons = ext.ComponentQuery.query('button', grid);
    const newBtn = buttons.find((b: any) => /nuevo|new/i.test(b.text || ''))
      || buttons.find((b: any) => b.action === 'new')
      || buttons[0];
    if (!newBtn) return { error: 'no new button', btnCount: buttons.length };
    try {
      newBtn.fireEvent('click', newBtn);
      return { ok: true, fired: newBtn.text, action: newBtn.action };
    } catch (e: any) {
      return { error: e.message, stack: e.stack };
    }
  });
  console.log('Click:', JSON.stringify(clickResult, null, 2));

  await page.waitForTimeout(3000);

  console.log('=== Step 7: Inspect the opened Nueva Organizacion window ===');
  const formState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const wins = ext.ComponentQuery.query('window');
    const win = wins.find((w: any) => /nueva organi/i.test(w.title || ''))
      || ext.ComponentQuery.query('window')[ext.ComponentQuery.query('window').length - 1];
    if (!win) return { error: 'no window opened', winCount: wins.length };

    const form = win.down('moneyguardorganizacionformview') || win.down('form');
    const desc: any = {
      winTitle: win.title,
      winXtype: win.xtype,
      winItemsCount: win.items && win.items.length,
      winChildXtypes: (win.items && win.items.items || []).map((i: any) => i.xtype),
      hasForm: !!form,
    };
    if (form) {
      desc.formXtype = form.xtype;
      desc.formItemsCount = form.items && form.items.length;
      desc.formChildXtypes = (form.items && form.items.items || []).map((i: any) => ({
        xtype: i.xtype,
        itemId: i.itemId,
        name: i.name,
      }));
      desc.formIsRendered = form.rendered;
      desc.formHasController = !!form.getController && !!form.getController();
      // Get controller class name
      try {
        const ctrl = form.getController && form.getController();
        if (ctrl) desc.controllerClassName = ctrl.$className;
      } catch (e: any) { desc.ctrlError = e.message; }

      // Check if alias is registered
      desc.aliasResolved = !!ext.ClassManager.getByAlias('widget.moneyguardorganizacionformview');
      // Try widget creation manually too
      try {
        const test = ext.widget('moneyguardorganizacionformview');
        desc.manualWidget = !!test;
        desc.manualWidgetItems = test && test.items && test.items.length;
        if (test) test.destroy();
      } catch (e: any) {
        desc.manualWidgetError = e.message;
      }
    }
    return desc;
  });
  console.log('Form state:', JSON.stringify(formState, null, 2));

  console.log('=== Step 8: Screenshot ===');
  await page.screenshot({ path: 'reports/blank-form-diagnose.png', fullPage: true });

  console.log('=== Summary ===');
  console.log('Page errors count:', pageErrors.length);
  pageErrors.forEach((e, i) => console.log(`  [PE ${i}] ${e.substring(0, 500)}`));
  console.log('MoneyGuard responses:', moneyGuardResponses.length);
  moneyGuardResponses.forEach((r) => console.log(`  ${r.status} ${r.size}B ${r.url}`));
  console.log('Failed requests:', failedRequests.length);
  failedRequests.forEach((r) => console.log(`  ${r}`));

  // Save full report
  const reportFile = path.resolve(__dirname, '..', 'reports', 'blank-form-report.json');
  fs.writeFileSync(reportFile, JSON.stringify({
    registryState,
    openGridResult,
    gridState,
    clickResult,
    formState,
    pageErrors,
    moneyGuardResponses,
    failedRequests,
    consoleLogs: consoleLogs.slice(-200),
  }, null, 2));
  console.log('Report saved to', reportFile);

  await context.close();
});
