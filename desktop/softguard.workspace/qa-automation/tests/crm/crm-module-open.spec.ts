import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';

/**
 * DSS-1497 — CRM: módulo no abre para usuario con CRM asignado
 *
 * Contexto:
 *   Usuario pruebacas@soporte.com en GCS tiene el módulo CRM asignado.
 *   Al intentar abrir el módulo CRM desde el Desktop, se genera un error
 *   en consola y el módulo no abre.
 *
 * Estos tests corren directamente contra GCS usando la sesión de crm-user.json.
 * Para ejecutar:
 *   npx playwright test crm --project=crm-auth-setup
 *   npx playwright test crm --project=crm-gcs
 */

test.describe('DSS-1497 — CRM module open for assigned user', () => {
  test('Desktop loads and shows CRM module available to user', async ({ page }) => {
    const crm = new CrmPage(page);
    const errors = crm.collectCrmConsoleErrors();

    await crm.gotoDesktop();

    const modules = await crm.getAvailableModules();
    console.log('[Test] Available modules:', modules.map((m) => `${m.keyReference}(available=${m.keyAvailable})`).join(', '));

    const crmModule = modules.find(
      (m) => m.keyReference === 'WebCrm' || m.name?.toLowerCase().includes('crm'),
    );

    expect(crmModule, 'CRM module should be present in desktopData.modules').toBeTruthy();
    expect(crmModule?.keyAvailable, 'CRM module should be available (unlocked) for this user').toBe(true);

    // No critical errors at desktop level
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('DevTools'),
    );
    if (criticalErrors.length > 0) {
      console.warn('[Test] Desktop-level console errors:', criticalErrors);
    }
  });

  test('CRM module opens without console errors (DSS-1497 regression)', async ({ page }) => {
    const crm = new CrmPage(page);
    const errors = crm.collectCrmConsoleErrors();

    await crm.gotoDesktop();

    const modules = await crm.getAvailableModules();
    const availableCount = modules.filter((m) => m.keyAvailable && m.keyReference !== 'Desktop').length;

    console.log(`[Test] Total available modules: ${availableCount}`);

    // If only one module is assigned, it auto-opens. Otherwise open manually.
    if (availableCount > 1) {
      console.log('[Test] Multiple modules available — opening CRM manually');
      await crm.openCrmModuleManually();
    } else {
      console.log('[Test] Single module — CRM should auto-open on Desktop load');
    }

    // Wait for the CRM iframe to appear and ExtJS to initialize
    let frame;
    try {
      frame = await crm.waitForCrmReady(120_000);
      console.log('[Test] CRM iframe ready. URL:', frame.url());
    } catch (err) {
      // Dump captured errors to help diagnose
      console.error('[Test] CRM failed to load. Captured errors:');
      errors.forEach((e) => console.error('  -', e));

      // Also dump available frames
      const frames = page.frames().map((f) => `${f.url()} (name=${f.name()})`);
      console.error('[Test] Page frames at failure:', frames);

      throw err;
    }

    // Assert the CRM viewport rendered
    const loaded = await crm.isCrmLoaded(frame);
    expect(loaded, 'CRM viewport+center should render without errors').toBe(true);

    // Assert no unhandled errors were thrown
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('DevTools') &&
        !e.includes('El parametro') && // known missing-param warnings
        !e.includes('[Nueva palabra]'),
    );

    if (criticalErrors.length > 0) {
      console.error('[Test] CRM console errors captured:');
      criticalErrors.forEach((e) => console.error('  -', e));
    }

    expect(criticalErrors, 'No unhandled console errors should occur when opening CRM').toHaveLength(0);
  });

  test('CRM toolbar is visible after load', async ({ page }) => {
    const crm = new CrmPage(page);
    crm.collectCrmConsoleErrors();

    await crm.gotoDesktop();

    const modules = await crm.getAvailableModules();
    const availableCount = modules.filter((m) => m.keyAvailable && m.keyReference !== 'Desktop').length;
    if (availableCount > 1) {
      await crm.openCrmModuleManually();
    }

    const frame = await crm.waitForCrmReady(120_000);

    // The CrmNorthView toolbar should be rendered
    const toolbarVisible = await frame.evaluate(() => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ComponentQuery) return false;
      const toolbar = ext.ComponentQuery.query('crmnorthview')[0];
      return !!(toolbar && toolbar.rendered && toolbar.isVisible());
    });

    expect(toolbarVisible, 'CRM north toolbar (crmnorthview) should be visible').toBe(true);
  });
});
