import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('FormView trace - capture network and inspect DK1493 fields', async ({ browser }) => {
  const tokenFile = path.resolve(__dirname, '..', '.auth', 'token.txt');
  const token = fs.readFileSync(tokenFile, 'utf-8').trim();

  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  await context.addCookies([{
    name: 'OAuth_Token', value: token, domain: 'gcs.softguard.com', path: '/',
    httpOnly: false, secure: true, sameSite: 'Lax',
  }]);
  const page = await context.newPage();

  const responses: { url: string; status: number; size: number; hasQr: boolean; hasFooter: boolean; hasFacturaConfig: boolean; hasInsertVar: boolean }[] = [];
  page.on('response', async (r) => {
    const url = r.url();
    if (/MoneyGuardOrganizacion|t_organizacion_fc|org_cmetadata|Application\.js/i.test(url)) {
      try {
        const body = await r.text();
        responses.push({
          url,
          status: r.status(),
          size: body.length,
          hasQr: /mostrar_qr_afip/.test(body),
          hasFooter: /footer_fijo/.test(body),
          hasFacturaConfig: /facturaConfig/.test(body),
          hasInsertVar: /insertVariable/.test(body),
        });
      } catch {}
    }
  });

  await page.goto('https://gcs.softguard.com/a/AdministratorSearch?version=', {
    waitUntil: 'domcontentloaded',
    timeout: 120_000,
  });

  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return ext && ext.isReady && ext.app && ext.app.Application && ext.app.Application.instance;
    },
    undefined,
    { timeout: 300_000, polling: 2000 },
  );

  const formViewInfo = await page.evaluate(async () => {
    return await new Promise<any>((resolve) => {
      try {
        const Ext = (window as any).Ext;
        const timer = setTimeout(() => resolve({ error: 'require timeout 30s' }), 30000);
        Ext.require('AdministratorSearch.view.MoneyGuardOrganizacionFormView', () => {
          clearTimeout(timer);
          let w: any;
          try {
            w = Ext.widget('moneyguardorganizacionformview');
          } catch (e: any) {
            resolve({ error: 'widget creation: ' + e.message });
            return;
          }
          const fields: string[] = [];
          if (w && w.items) {
            w.items.each((it: any) => {
              fields.push((it.xtype || '?') + ':' + (it.itemId || it.name || it.fieldLabel || ''));
              if (it.items) {
                it.items.each((it2: any) => fields.push('  > ' + (it2.xtype || '?') + ':' + (it2.itemId || it2.name || it2.fieldLabel || '')));
              }
            });
          }
          resolve({
            classExists: !!Ext.ClassManager.get('AdministratorSearch.view.MoneyGuardOrganizacionFormView'),
            aliasExists: !!Ext.ClassManager.getByAlias('widget.moneyguardorganizacionformview'),
            hasFacturaConfig: !!(w && w.down && w.down('#facturaConfig')),
            hasObservaciones: !!(w && w.down && w.down('#observaciones_template')),
            hasFooter: !!(w && w.down && w.down('#footer_fijo')),
            hasQR: !!(w && w.down && w.down('#mostrar_qr_afip')),
            hasFacturaLogo: !!(w && w.down && w.down('#factura_logo_display')),
            hasPreview: !!(w && w.down && w.down('button[action="previewFactura"]')),
            hasInsertVar: !!(w && w.down && w.down('button[action="insertVariable"]')),
            fieldList: fields,
          });
        });
      } catch (e: any) {
        resolve({ error: 'outer: ' + e.message });
      }
    });
  });

  const reportDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, 'formview-trace.json'), JSON.stringify({ responses, formViewInfo }, null, 2));

  console.log('=== Network responses ===');
  console.log(JSON.stringify(responses, null, 2));
  console.log('=== Runtime introspection ===');
  console.log(JSON.stringify(formViewInfo, null, 2));

  await context.close();
});
