import { test as base, Page } from '@playwright/test';
import { applyResourceOverrideRules } from '../helpers/resource-override';
import { waitForExtReady } from '../helpers/extjs';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const localPort = parseInt(process.env.LOCAL_PORT || '1841', 10);

/**
 * Extended Playwright test fixture that:
 * 1. Applies Resource Override rules so localhost API calls go to GCS with token
 * 2. Provides a helper to navigate to an app and wait for ExtJS to be ready
 *
 * Flow: auth.setup.ts logs into GCS and saves token → this fixture reads the token
 * and intercepts all localhost:1841/rest/*, /handler/*, etc. redirecting them to
 * gcs.softguard.com with oauth_token appended (same as the Resource Override extension).
 */
export const test = base.extend<{
  /** Navigate to an app path and wait for ExtJS to initialize */
  navigateToApp: (appPath: string) => Promise<void>;
}>({
  navigateToApp: async ({ page }, use) => {
    // Read the OAuth token saved by auth.setup.ts
    const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
    let token = '';
    if (fs.existsSync(tokenFile)) {
      token = fs.readFileSync(tokenFile, 'utf-8').trim();
    }

    // Apply resource-override rules: intercept localhost API calls → GCS + token
    if (token) {
      await applyResourceOverrideRules(page, token, localPort, false);
    } else {
      console.warn('[Fixture] No OAuth token found at .auth/token.txt — API calls will fail');
    }

    // Also set the OAuth_Token cookie on localhost so ExtJS code that reads cookies works
    await page.context().addCookies([{
      name: 'OAuth_Token',
      value: token,
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    }]);

    // Capture browser console errors for debugging
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log(`[Browser Error] ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => {
      console.log(`[Page Error] ${err.message}`);
    });
    page.on('requestfailed', (req) => {
      console.log(`[Request Failed] ${req.url()} - ${req.failure()?.errorText}`);
    });
    page.on('response', (resp) => {
      if (resp.status() >= 400) {
        console.log(`[HTTP ${resp.status()}] ${resp.url()}`);
      }
    });

    const navigate = async (appPath: string) => {
      await page.goto(appPath, { waitUntil: 'domcontentloaded' });
      await waitForExtReady(page, 90_000);
    };

    await use(navigate);
  },
});

export { expect } from '@playwright/test';
