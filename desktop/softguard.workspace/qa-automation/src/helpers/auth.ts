import { Page, BrowserContext } from '@playwright/test';

/**
 * Authentication helpers for Softguard GCS.
 * Supports 3 strategies: UI login, token injection, and local dev mode.
 */

const GCS_BASE = 'https://gcs.softguard.com';

/**
 * Strategy A — Log in via the GCS web UI.
 * Navigates to gcs.softguard.com, fills the login form, submits, and waits for redirect.
 * Returns the OAuth_Token from cookies.
 */
export async function loginViaUI(page: Page, username: string, password: string): Promise<string> {
  await page.goto(GCS_BASE, { waitUntil: 'domcontentloaded' });

  // GCS "Desktop Security Suite" login form has Email + Password + LOGIN button
  // The LOGIN button may be an image, anchor, or styled div — use broad text matching
  const emailInput = page.locator('input[type="text"], input[type="email"]').first();
  const passwordInput = page.locator('input[type="password"]').first();

  await emailInput.waitFor({ state: 'visible', timeout: 30_000 });
  await emailInput.fill(username);
  await passwordInput.fill(password);

  // Click the LOGIN element — try multiple strategies
  // First, dump all clickable elements for debugging if needed
  const loginBtn = page.getByRole('button', { name: /login/i })
    .or(page.getByRole('link', { name: /login/i }))
    .or(page.locator('img[alt*="Login" i], img[alt*="login" i]'))
    .or(page.locator('[onclick*="login" i], [onclick*="Login" i]'))
    .or(page.locator('input[type="image"]'))
    .or(page.locator('input[type="submit"]'))
    .or(page.locator('#loginBtn, #btnLogin, .login-button, .btn-login'))
    .first();

  // If the composite locator doesn't find it, fall back to broader search
  try {
    await loginBtn.click({ timeout: 5_000 });
  } catch (clickErr) {
    // If the click triggered a navigation (context destroyed), that's actually success — skip fallback
    const msg = clickErr instanceof Error ? clickErr.message : String(clickErr);
    if (msg.includes('context was destroyed') || msg.includes('navigation')) {
      // Click worked but navigated the page — fall through to waitForResponse
    } else {
      // Button truly not found — try form.submit()
      try {
        const submitted = await page.evaluate(() => {
          const forms = document.querySelectorAll('form');
          if (forms.length > 0) {
            forms[0].submit();
            return true;
          }
          return false;
        });

        if (!submitted) {
          await passwordInput.press('Enter');
        }
      } catch (submitErr) {
        // form.submit may also trigger navigation — that's fine
        const submitMsg = submitErr instanceof Error ? submitErr.message : String(submitErr);
        if (!submitMsg.includes('context was destroyed') && !submitMsg.includes('navigation')) {
          throw submitErr;
        }
      }
    }
  }

  // Wait for successful login — should redirect away from login page
  // The Desktop app loads and makes a call to /Rest/Security/UserData
  await page.waitForResponse(
    (resp) => resp.url().toLowerCase().includes('/rest/security/userdata') && resp.status() === 200,
    { timeout: 60_000 },
  );

  // Extract OAuth_Token from cookies
  const token = await extractOAuthToken(page);
  if (!token) {
    throw new Error('Login succeeded but OAuth_Token cookie not found');
  }

  return token;
}

/**
 * Strategy B — Inject a pre-existing OAuth token directly via cookies.
 * Fastest strategy — skips UI login entirely.
 */
export async function loginViaToken(context: BrowserContext, token: string, baseUrl: string): Promise<void> {
  const url = new URL(baseUrl);
  await context.addCookies([
    {
      name: 'OAuth_Token',
      value: token,
      domain: url.hostname,
      path: '/',
      httpOnly: false,
      secure: url.protocol === 'https:',
      sameSite: 'Lax',
    },
  ]);
}

/**
 * Extract the OAuth_Token cookie value from the current page's context.
 */
export async function extractOAuthToken(page: Page): Promise<string | null> {
  const cookies = await page.context().cookies();
  const tokenCookie = cookies.find(
    (c) => c.name === 'OAuth_Token' || c.name === 'oauth_token',
  );
  return tokenCookie?.value ?? null;
}

/**
 * Check if the current session is authenticated by calling the UserData endpoint.
 */
export async function isAuthenticated(page: Page, baseUrl: string): Promise<boolean> {
  try {
    const resp = await page.request.get(`${baseUrl}/Rest/Security/UserData`);
    return resp.status() === 200;
  } catch {
    return false;
  }
}

/**
 * Full auth flow: tries token injection first (if available), falls back to UI login.
 * Returns the OAuth token for use in resource-override rules.
 */
export async function authenticate(
  page: Page,
  config: {
    username: string;
    password: string;
    token?: string;
    baseUrl: string;
  },
): Promise<string> {
  // Strategy B: direct token if available
  if (config.token) {
    await loginViaToken(page.context(), config.token, config.baseUrl);
    // Verify the token works
    const valid = await isAuthenticated(page, config.baseUrl);
    if (valid) return config.token;
    // Token expired — fall through to UI login
    console.warn('[Auth] Provided token is invalid/expired, falling back to UI login');
  }

  // Strategy A: UI login
  return loginViaUI(page, config.username, config.password);
}
