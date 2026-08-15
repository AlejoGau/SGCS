import { test as setup } from '@playwright/test';
import { authenticate } from '../src/helpers/auth';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const authFile = path.resolve(__dirname, '..', '.auth', 'user.json');

/**
 * Auth setup — runs once before all tests.
 * Logs in and saves the browser storage state (cookies + localStorage)
 * so subsequent tests can reuse the session without re-logging in.
 */
setup('authenticate', async ({ page }) => {
  const username = process.env.LOGIN_USERNAME;
  const password = process.env.LOGIN_PASSWORD;
  const baseUrl = process.env.BASE_URL || 'https://gcs.softguard.com';
  const token = process.env.OAUTH_TOKEN || undefined;

  if (!username || !password) {
    if (!token) {
      throw new Error(
        'Missing credentials: set LOGIN_USERNAME + LOGIN_PASSWORD or OAUTH_TOKEN in .env',
      );
    }
  }

  // Ensure .auth directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const oauthToken = await authenticate(page, {
    username: username || '',
    password: password || '',
    token: token || undefined,
    baseUrl,
  });

  // Store token for resource-override (local mode) — write to a temp file
  const tokenFile = path.resolve(authDir, 'token.txt');
  fs.writeFileSync(tokenFile, oauthToken, 'utf-8');

  // Save browser state
  await page.context().storageState({ path: authFile });
});
