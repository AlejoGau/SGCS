import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('dump app html and inspect controllers list', async ({ browser }) => {
  const tokenFile = path.resolve(__dirname, '..', '.auth', 'token.txt');
  const token = fs.readFileSync(tokenFile, 'utf-8').trim();

  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  await context.addCookies([{
    name: 'OAuth_Token', value: token, domain: 'gcs.softguard.com', path: '/',
    httpOnly: false, secure: true, sameSite: 'Lax',
  }]);
  const page = await context.newPage();

  const allRequests: { url: string; status?: number }[] = [];
  page.on('response', (r) => {
    const url = r.url();
    if (url.includes('.js') || url.includes('AdministratorSearch')) {
      allRequests.push({ url, status: r.status() });
    }
  });
  page.on('console', (m) => {
    if (m.type() === 'error' || m.text().includes('FormView') || m.text().includes('MoneyGuard')) {
      console.log(`[${m.type()}] ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => console.log(`[PageError] ${e.message}`));

  await page.goto('https://gcs.softguard.com/a/AdministratorSearch?version=', {
    waitUntil: 'domcontentloaded',
    timeout: 120_000,
  });

  // Save raw HTML
  const html = await page.content();
  const htmlFile = path.resolve(__dirname, '..', 'reports', 'admin-search-html.html');
  fs.writeFileSync(htmlFile, html);
  console.log('HTML size:', html.length);

  // Extract controllers array
  const ctrlMatch = html.match(/controllers\s*:\s*\[([\s\S]*?)\]/);
  if (ctrlMatch) {
    const list = ctrlMatch[1];
    console.log('Controllers array size:', list.length, 'chars');
    const ctrls = list.split(',').map((s) => s.trim().replace(/['"]/g, ''));
    console.log('Total controllers:', ctrls.length);
    console.log('MoneyGuard controllers:');
    ctrls.filter((c) => c.includes('MoneyGuard')).forEach((c) => console.log(' ', c));
    console.log('Has FormController?', ctrls.some((c) => c === 'MoneyGuardOrganizacionFormController'));
    console.log('Has GridController?', ctrls.some((c) => c === 'MoneyGuardOrganizacionGridController'));
    console.log('Has org_cmetadata?', ctrls.some((c) => c.includes('org_cmetadata')));
  } else {
    console.log('NO controllers array found in HTML!');
  }

  // Wait for app to actually boot — let it fully load
  console.log('=== Waiting up to 5 min for app instance to register ===');
  try {
    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        return ext && ext.isReady && ext.app && ext.app.Application && ext.app.Application.instance;
      },
      undefined,
      { timeout: 300_000, polling: 2000 },
    );
    console.log('App instance registered!');
  } catch (e: any) {
    console.log('App instance NEVER registered after 5 min:', e.message);
    const partial = await page.evaluate(() => {
      const ext = (window as any).Ext;
      return {
        hasExt: !!ext,
        isReady: ext?.isReady,
        appNamespace: !!ext?.app,
        appApplication: !!ext?.app?.Application,
        appInstance: !!ext?.app?.Application?.instance,
        applicationCtor: typeof ext?.app?.Application,
        // Try direct namespace
        adminSearchApp: !!(window as any).AdministratorSearch,
        adminSearchApp_app: !!(window as any).AdministratorSearch?.app,
      };
    });
    console.log('Partial state:', JSON.stringify(partial, null, 2));
  }

  // Final state
  const finalState = await page.evaluate(() => {
    const ext = (window as any).Ext;
    const app = ext.app?.Application?.instance;
    const out: any = {
      appExists: !!app,
      aliasFormView: !!ext.ClassManager.getByAlias('widget.moneyguardorganizacionformview'),
      aliasGridView: !!ext.ClassManager.getByAlias('widget.moneyguardorganizaciongridview'),
      formCtrlClass: !!ext.ClassManager.get('AdministratorSearch.controller.MoneyGuardOrganizacionFormController'),
      formViewClass: !!ext.ClassManager.get('AdministratorSearch.view.MoneyGuardOrganizacionFormView'),
    };
    if (app) {
      out.controllerNames = Object.keys((app.controllers && app.controllers.map) || {});
      out.totalControllers = out.controllerNames.length;
      out.moneyGuardControllers = out.controllerNames.filter((n: string) => n.includes('MoneyGuard'));
    }
    return out;
  });
  console.log('=== FINAL STATE ===');
  console.log(JSON.stringify(finalState, null, 2));

  // List all MoneyGuard requests
  console.log('=== All MoneyGuard JS requests ===');
  allRequests.filter((r) => r.url.includes('MoneyGuard')).forEach((r) => {
    console.log(`  ${r.status} ${r.url}`);
  });

  await page.screenshot({ path: 'reports/admin-search-loaded.png', fullPage: true });
  await context.close();
});
