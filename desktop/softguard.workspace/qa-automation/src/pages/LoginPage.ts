import { Page } from '@playwright/test';

/**
 * Page Object for the GCS login page at https://gcs.softguard.com/
 */
export class LoginPage {
  constructor(private page: Page) {}

  /** Navigate to the login page */
  async goto(): Promise<void> {
    await this.page.goto('https://gcs.softguard.com/', { waitUntil: 'networkidle' });
  }

  /** Fill in the login form and submit */
  async login(username: string, password: string): Promise<void> {
    const emailInput = this.page.locator(
      'input[type="email"], input[type="text"][name*="user"], input[name*="email"], input[name*="User"], #username, #email',
    ).first();
    const passwordInput = this.page.locator('input[type="password"]').first();
    const submitBtn = this.page.locator(
      'button[type="submit"], input[type="submit"], .login-btn, button:has-text("Ingresar"), button:has-text("Login"), button:has-text("Entrar")',
    ).first();

    await emailInput.waitFor({ state: 'visible', timeout: 30_000 });
    await emailInput.fill(username);
    await passwordInput.fill(password);
    await submitBtn.click();
  }

  /** Wait for login to complete (redirects to Desktop, UserData endpoint responds) */
  async waitForLoginComplete(): Promise<void> {
    await this.page.waitForResponse(
      (resp) => resp.url().toLowerCase().includes('/rest/security/userdata') && resp.status() === 200,
      { timeout: 60_000 },
    );
  }

  /** Check if we're on the login page (vs already authenticated) */
  async isOnLoginPage(): Promise<boolean> {
    const passwordField = this.page.locator('input[type="password"]');
    return (await passwordField.count()) > 0;
  }
}
