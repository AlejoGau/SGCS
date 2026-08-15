import { test as setup } from '@playwright/test';
import { loginViaUI } from '../../src/helpers/auth';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const authFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-user.json');

/**
 * Auth setup for the CRM test user (pruebacas@soporte.com).
 * This user has the CRM module assigned in GCS and is used to reproduce DSS-1497.
 * Runs once before CRM tests to save session state.
 */
setup('authenticate as CRM test user', async ({ page }) => {
  const username = process.env.CRM_TEST_USERNAME || 'pruebacas@soporte.com';
  const password = process.env.CRM_TEST_PASSWORD || 'Admin1234';
  const baseUrl = process.env.BASE_URL || 'https://gcs.softguard.com';

  // Ensure .auth directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const token = await loginViaUI(page, username, password);

  // Log and save the URL we landed on after login (versioned Desktop URL, e.g. /apps/Desktop/26.03.0/)
  const desktopUrl = page.url();
  console.log('[Auth Setup] Post-login URL:', desktopUrl);

  // Save Desktop URL so gotoDesktop() can navigate directly (bypassing the session interstitial)
  const desktopUrlFile = path.resolve(authDir, 'crm-desktop-url.txt');
  fs.writeFileSync(desktopUrlFile, desktopUrl, 'utf-8');
  console.log('[Auth Setup] CRM desktop URL saved to', desktopUrlFile);

  // Save token so the crm-local fixture can inject it for localhost API calls
  const tokenFile = path.resolve(authDir, 'crm-token.txt');
  fs.writeFileSync(tokenFile, token, 'utf-8');
  console.log('[Auth Setup] CRM token saved to', tokenFile);

  await page.context().storageState({ path: authFile });
});
