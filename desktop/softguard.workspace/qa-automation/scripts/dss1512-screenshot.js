// DSS-1512 screenshot script — captura visual del fix del campo Para
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  const token = fs.readFileSync(path.join(__dirname, '../.auth/crm-token.txt'), 'utf8').trim();
  const browser = await chromium.launch({
    args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  console.log('Navegando al CRM local...');
  await page.goto('http://localhost:1843/apps/SgWebCrm/?token=' + token, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  console.log('Esperando ExtJS...');
  await page.waitForFunction(() => window.Ext && window.Ext.isReady, {
    timeout: 90000,
    polling: 500,
  });
  console.log('ExtJS listo!');
  await page.waitForTimeout(2000);

  // Screenshot 1: App cargada
  const shot1 = path.join(__dirname, '../reports/dss1512-01-app-loaded.png');
  await page.screenshot({ path: shot1 });
  console.log('Captura 1 guardada:', shot1);

  // Abrir formulario de nuevo correo y verificar campo Para
  const formState = await page.evaluate(() => {
    const ext = window.Ext;
    const record = ext.create('Common.model.SmartMailProgramModel', {
      Id: 0,
      Name: 'Nuevo envío',
      Status: 'A',
      Query: "EXEC _desktop..organizationbyfilter @Filter='[]',@limit=999999,@select='Email'",
      Body: '',
      From: '',
    });

    const view = ext.widget('smartmailformview', {
      record: record,
      floating: true,
      width: 920,
      height: 640,
      title: 'Nuevo Email — DSS-1512 Fix Demo',
    });
    view.show();
    view.center();

    const destino = view.down('#destino');
    return {
      visible: destino ? destino.isVisible() : null,
      fieldLabel: destino ? destino.getFieldLabel() : null,
      hasRegex: destino ? !!destino.regex : null,
    };
  });

  console.log('Estado del formulario:', JSON.stringify(formState));
  await page.waitForTimeout(1500);

  // Screenshot 2: Formulario nuevo correo con campo Para visible
  const shot2 = path.join(__dirname, '../reports/dss1512-02-new-email-para-visible.png');
  await page.screenshot({ path: shot2 });
  console.log('Captura 2 guardada:', shot2);

  // Screenshot 3: Solo el formulario (recorte centrado)
  const shot3 = path.join(__dirname, '../reports/dss1512-03-form-closeup.png');
  await page.screenshot({
    path: shot3,
    clip: { x: 480, y: 200, width: 960, height: 640 },
  });
  console.log('Captura 3 guardada:', shot3);

  await browser.close();
  console.log('Listo!');
})().catch((e) => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
