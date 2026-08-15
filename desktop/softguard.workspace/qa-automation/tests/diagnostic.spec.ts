import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Diagnostic test: loads WebMG directly from GCS (no resource-override)
 * to verify Playwright + ExtJS works at all. Run with:
 *   npx playwright test diagnostic --project=auth-setup && npx playwright test diagnostic --project=diagnostic-gcs --headed
 */
test.describe('Diagnostic', () => {
  test('load WebMG directly from GCS', async ({ browser }) => {
    const tokenFile = path.resolve(__dirname, '..', '.auth', 'token.txt');
    const token = fs.readFileSync(tokenFile, 'utf-8').trim();

    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: { width: 1920, height: 1080 },
    });

    // Set OAuth_Token cookie on gcs domain
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

    // Log ALL responses that aren't 200/304
    page.on('response', (resp) => {
      if (resp.status() >= 400) {
        console.log(`[HTTP ${resp.status()}] ${resp.url()}`);
      }
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log(`[Console Error] ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => {
      console.log(`[Page Error] ${err.message}`);
    });
    page.on('requestfailed', (req) => {
      console.log(`[Request Failed] ${req.url()} - ${req.failure()?.errorText}`);
    });

    console.log(`[Diag] Navigating to GCS with token: ${token.substring(0, 8)}...`);
    await page.goto('https://gcs.softguard.com/apps/WebMG/', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    // Wait for Ext.isReady with explicit long timeout
    console.log('[Diag] Waiting for Ext.isReady...');
    try {
      await page.waitForFunction(
        () => {
          const ext = (window as any).Ext;
          return ext && ext.isReady === true && ext.ComponentQuery;
        },
        undefined,
        { timeout: 120_000, polling: 1000 },
      );
      console.log('[Diag] ExtJS is READY!');
    } catch {
      // Check partial state
      const state = await page.evaluate(() => {
        const ext = (window as any).Ext;
        return {
          extExists: !!ext,
          isReady: ext?.isReady,
          hasComponentQuery: !!ext?.ComponentQuery,
          bodyClasses: document.body?.className,
          title: document.title,
        };
      });
      console.log('[Diag] ExtJS state at timeout:', JSON.stringify(state, null, 2));
      await page.screenshot({ path: 'reports/test-artifacts/diagnostic-gcs.png' });
      throw new Error(`ExtJS did not reach ready state. State: ${JSON.stringify(state)}`);
    }

    // If we get here, app loaded!
    await page.screenshot({ path: 'reports/test-artifacts/diagnostic-gcs-success.png' });
    const title = await page.title();
    console.log(`[Diag] SUCCESS! Page title: ${title}`);
    expect(title).toBeTruthy();

    await context.close();
  });
});
