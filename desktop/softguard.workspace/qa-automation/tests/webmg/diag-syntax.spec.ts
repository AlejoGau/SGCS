/**
 * Diagnostic test: capture the exact file and line of the JS syntax error
 * in the deployed GCS AdministratorSearch app.
 * Run: node .\node_modules\@playwright\test\cli.js test tests/webmg/diag-syntax.spec.ts --project=chromium
 */
import { Page } from '@playwright/test';
import { test, expect } from '../../src/fixtures/auth.fixture';
import { waitForExtReady } from '../../src/helpers/extjs';

const ADMIN_SEARCH_URL = 'https://gcs.softguard.com/a/AdministratorSearch?version=';

async function waitForViewport(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return ext && ext.isReady && ext.getCmp && ext.getCmp('center') != null;
    },
    undefined,
    { timeout: 360_000, polling: 1000 }, // 6 min — GCS unbundled (?version=) can take 5+ min
  );
}

test('DIAG_SYNTAX - capture syntax error with openOrgFcGrid', async ({ page, navigateToApp }) => {
  const errors: string[] = [];
  const newJsRequests: string[] = [];

  page.on('pageerror', (err) => {
    errors.push(`MESSAGE: ${err.message}\nSTACK:\n${err.stack}`);
    console.log('=== PAGE ERROR ===');
    console.log('Message:', err.message);
    console.log('Stack:\n', err.stack);
    console.log('=================');
  });

  // Track new JS file requests after initial load
  const initialLoad = new Set<string>();
  let trackNew = false;
  page.on('request', (req) => {
    const url = req.url();
    if (url.endsWith('.js')) {
      if (!trackNew) {
        initialLoad.add(url);
      } else {
        newJsRequests.push(url);
        console.log('[New JS]', url);
      }
    }
  });

  // Activate fixture side-effects
  void navigateToApp;

  await page.goto(ADMIN_SEARCH_URL, { waitUntil: 'domcontentloaded' });
  await waitForExtReady(page, 360_000); // 6 min — GCS unbundled (?version=) can take 5+ min
  await waitForViewport(page);

  // Now start tracking new requests
  trackNew = true;

  // Open the org grid — this triggers lazy loading of MoneyGuardOrganizacion* files
  console.log('Opening org fc grid...');
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');
    if (!center) throw new Error('center not found');
    const tab = ext.widget('moneyguardorganizaciongridview', {
      title: 'Organizaciones facturación',
      closable: true,
    });
    center.add(tab);
    center.setActiveTab(tab);
  });

  // Wait for the error to surface or for the grid to load
  await page.waitForTimeout(15_000);

  console.log('\n=== NEW JS FILES LOADED ===');
  newJsRequests.forEach((url) => console.log(url));

  console.log('\n=== ALL ERRORS ===');
  errors.forEach((e, i) => console.log(`Error ${i + 1}:\n${e}\n`));

  await page.screenshot({ path: 'reports/test-artifacts/diag-syntax-after-grid.png', fullPage: true });

  expect(errors.length, `Errors:\n${errors.join('\n')}`).toBe(0);
});
