import { test, expect } from '../../src/fixtures/auth.fixture';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';
import { FacturacionWizardPage } from '../../src/pages/webmg/FacturacionWizardPage';

test.describe('WebMG > Facturación Automática @facturacion @wizard', () => {
  let webmg: WebMGPage;
  let wizard: FacturacionWizardPage;

  test.beforeEach(async ({ page, navigateToApp }) => {
    webmg = new WebMGPage(page);
    wizard = new FacturacionWizardPage(page);
    await navigateToApp('/apps/WebMG/');
  });

  test('should open facturación wizard via menu', async () => {
    await webmg.openFacturacionWizard();

    const currentCard = await wizard.getCurrentCard();
    expect(currentCard).toBe(0);
  });

  test('should display Card 0 with organization and type combos', async ({ page }) => {
    await webmg.openFacturacionWizard();

    // Check that combos exist in the wizard
    const combosExist = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const w = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      if (!w) return false;
      const combos = w.query('combo');
      return combos.length > 0;
    });
    expect(combosExist).toBe(true);
  });
});
