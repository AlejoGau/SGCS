import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';
import * as path from 'path';

/**
 * DSS-1497 — CRM: módulo no abre para usuario con CRM asignado
 *
 * LOCAL version — corre contra sencha watch (localhost:1843) con las API calls
 * proxeadas a GCS via resource-override. Permite debuggear el código local sin
 * necesitar un deploy.
 *
 * Prerequisitos:
 *   1. `sencha app watch --port 1843` corriendo desde apps/SgWebCrm/
 *   2. Auth setup ejecutado: npx playwright test crm --project=crm-auth-setup
 *
 * Ejecutar:
 *   npx playwright test crm/crm-module-local.spec.ts --project=crm-local --headed
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-token.txt');

test.describe('DSS-1497 — CRM local (sencha watch @ localhost:1843)', () => {
  test('CRM app carga sin errores de consola críticos', async ({ page }) => {
    const crm = new CrmPage(page);
    const errors = crm.collectCrmConsoleErrors();

    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);

    await crm.waitForCrmReadyLocal(120_000);
    console.log('[Test] CRM viewport listo en localhost');

    const loaded = await crm.isCrmLoadedLocal();
    expect(loaded, 'El viewport de CRM y el panel center deben renderizar localmente').toBe(true);

    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('DevTools') &&
        !e.includes('El parametro') &&
        !e.includes('[Nueva palabra]'),
    );

    if (criticalErrors.length > 0) {
      console.error('[Test] Errores de consola capturados:');
      criticalErrors.forEach((e) => console.error('  -', e));
    }

    expect(criticalErrors, 'No deben haber errores de consola al cargar CRM localmente').toHaveLength(0);
  });

  test('CRM toolbar (CrmNorthView) es visible tras la carga', async ({ page }) => {
    const crm = new CrmPage(page);
    crm.collectCrmConsoleErrors();

    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);

    await crm.waitForCrmReadyLocal(120_000);

    const toolbarVisible = await page.evaluate(() => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ComponentQuery) return false;
      const toolbar = ext.ComponentQuery.query('crmnorthview')[0];
      return !!(toolbar && toolbar.rendered && toolbar.isVisible());
    });

    expect(toolbarVisible, 'El toolbar CrmNorthView debe ser visible').toBe(true);
  });
});
