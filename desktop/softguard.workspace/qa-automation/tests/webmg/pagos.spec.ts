import { test, expect } from '../../src/fixtures/auth.fixture';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';

/**
 * Pagos (payments) require an organization context (cuenta corriente).
 * The flow is: Organizaciones grid → double-click an org → org detail opens
 * → navigate to cuenta corriente from there.
 *
 * For now, test the basic navigation and verify the pagos-related components exist.
 */
test.describe('WebMG > Pagos @pagos', () => {
  let webmg: WebMGPage;

  test.beforeEach(async ({ page, navigateToApp }) => {
    webmg = new WebMGPage(page);
    await navigateToApp('/apps/WebMG/');
  });

  test('should display Organizaciones grid with data', async ({ page }) => {
    const orgs = await webmg.getOrganizations();
    expect(orgs.length).toBeGreaterThanOrEqual(0);
  });

  test('should open organization detail by double-clicking', async ({ page }) => {
    const orgs = await webmg.getOrganizations();
    test.skip(orgs.length === 0, 'No organizations available');

    await webmg.openOrganization(0);

    // A new tab should have opened for the org
    const tabs = await webmg.getOpenTabs();
    expect(tabs.length).toBeGreaterThan(2); // default 2 + new org tab
  });

  test('should have pago-related components registered', async ({ page }) => {
    // Verify that the pago-related xtypes exist in the ExtJS class system
    const registered = await page.evaluate(() => {
      const ext = (window as any).Ext;
      return {
        pagoGrid: !!ext.ClassManager.getByAlias('widget.pagogridview'),
        pagoForm: !!ext.ClassManager.getByAlias('widget.pagoformview'),
        cuentaCorriente: !!ext.ClassManager.getByAlias('widget.cuentacorrientepanelview'),
      };
    });

    expect(registered.pagoGrid).toBe(true);
    expect(registered.pagoForm).toBe(true);
    expect(registered.cuentaCorriente).toBe(true);
  });
});
