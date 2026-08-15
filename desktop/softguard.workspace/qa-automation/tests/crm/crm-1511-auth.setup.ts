import { test as setup } from '@playwright/test';
import { loginViaUI } from '../../src/helpers/auth';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const authFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-dealer-user.json');

/**
 * Auth setup para el usuario Dealer nuevo (thtestdealer@softguard.com).
 * Este usuario fue creado DESPUÉS de DSS-1497 y reproduce el bug DSS-1511:
 * ve TODAS las organizaciones en lugar de solo las de su dealer.
 *
 * Guarda:
 *   .auth/crm-dealer-user.json  → estado de sesión (cookies/localStorage)
 *   .auth/crm-dealer-token.txt  → OAuth token para local testing
 *
 * Ejecutar antes de los tests DSS-1511:
 *   npx playwright test crm/crm-1511-auth.setup.ts --project=crm-1511-auth-setup
 */
setup('authenticate as new Dealer user (DSS-1511)', async ({ page }) => {
  const username = process.env.CRM_DEALER_TEST_USERNAME || 'thtestdealer@softguard.com';
  const password = process.env.CRM_DEALER_TEST_PASSWORD || 'Admin1234';
  const baseUrl = process.env.BASE_URL || 'https://gcs.softguard.com';

  console.log(`[Auth Setup DSS-1511] Autenticando como: ${username}`);

  // Ensure .auth directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const token = await loginViaUI(page, username, password);

  // Log and save the URL we landed on after login (versioned Desktop URL)
  const desktopUrl = page.url();
  console.log('[Auth Setup DSS-1511] Post-login URL:', desktopUrl);

  // Save Desktop URL so gotoDesktop() can navigate directly
  // Note: the Desktop URL is version-based (e.g. /apps/Desktop/26.03.0/) and shared across users
  // Only overwrite if the crm-desktop-url.txt doesn't already exist from crm-auth.setup.ts
  const desktopUrlFile = path.resolve(authDir, 'crm-desktop-url.txt');
  if (!fs.existsSync(desktopUrlFile)) {
    fs.writeFileSync(desktopUrlFile, desktopUrl, 'utf-8');
    console.log('[Auth Setup DSS-1511] Desktop URL saved to', desktopUrlFile);
  } else {
    console.log('[Auth Setup DSS-1511] Reusing existing Desktop URL from crm-auth.setup.ts');
  }

  // Save dealer-specific token
  const tokenFile = path.resolve(authDir, 'crm-dealer-token.txt');
  fs.writeFileSync(tokenFile, token, 'utf-8');
  console.log('[Auth Setup DSS-1511] Dealer token saved to', tokenFile);

  await page.context().storageState({ path: authFile });
  console.log('[Auth Setup DSS-1511] Session saved to', authFile);
});
