import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';
import * as path from 'path';

/**
 * DSS-1511 — CRM: usuario Dealer nuevo ve TODAS las organizaciones
 *
 * LOCAL version — corre contra sencha watch (localhost:1843) con las API calls
 * proxeadas a GCS via resource-override. Verifica que el fix funciona localmente.
 *
 * El fix está en:
 *   packages/local/common/src/controller/OrganizationGridController.js
 *   - Descomentado el bloque `isMasterWebDealer` en initView()
 *   - Reemplazado `controller.application.UserData.Company` → `_UserData.Company`
 *   - Agregado null-check en `isMasterWebDealer()` para masterModule/adminModule
 *
 * Prerequisitos:
 *   1. `sencha app watch --port 1843` corriendo desde apps/SgWebCrm/
 *   2. Auth setup ejecutado: npx playwright test crm/crm-1511-auth.setup.ts --project=crm-1511-auth-setup
 *
 * Para ejecutar:
 *   npx playwright test crm/crm-1511-local.spec.ts --project=crm-1511-local --reporter=list
 *
 * Cuenta Dealer nueva (bug DSS-1511): thtestdealer@softguard.com / Admin1234
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'crm-dealer-token.txt');

test.describe('DSS-1511 — Dealer nuevo: filtro RelationParent (local con fix)', () => {
  test('CRM app local carga sin errores críticos para el Dealer nuevo', async ({ page }) => {
    const crm = new CrmPage(page);
    const errors = crm.collectCrmConsoleErrors();

    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);

    await crm.waitForCrmReadyLocal(120_000);
    console.log('[Test] CRM viewport listo en localhost para Dealer');

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

    expect(criticalErrors, 'No deben haber errores críticos al cargar CRM localmente').toHaveLength(0);

    await page.screenshot({
      path: 'reports/screenshots/dss-1511-local-crm-loaded.png',
      fullPage: false,
    });
    console.log('[Test] Screenshot: CRM cargado localmente para Dealer');
  });

  test('isMasterWebDealer retorna true para el Dealer nuevo (local)', async ({ page }) => {
    const crm = new CrmPage(page);

    const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
    await crm.gotoLocalCrm(tokenFile, localPort);
    await crm.waitForCrmReadyLocal(120_000);

    const dealerInfo = await page.evaluate(() => {
      const SecurityModulesStore = (window as any).SecurityModulesStore;
      const _UserData = (window as any)._UserData;

      if (!SecurityModulesStore) {
        return { error: 'SecurityModulesStore no disponible', isMaster: false, userDataCompany: null };
      }

      const masterModule = SecurityModulesStore.findRecord('KeyReference', 'MasterWebDealer');
      const adminModule = SecurityModulesStore.findRecord('KeyReference', 'Administrator');

      const isMaster =
        masterModule != null &&
        masterModule.get('Available') === true &&
        (adminModule == null || !adminModule.get('Available'));

      return {
        isMaster,
        masterAvailable: masterModule ? masterModule.get('Available') : null,
        adminAvailable: adminModule ? adminModule.get('Available') : null,
        userDataCompany: _UserData ? _UserData.Company : null,
        userId: _UserData ? _UserData.UserId : null,
      };
    });

    console.log('[Test] Dealer info local:', dealerInfo);

    expect(dealerInfo.isMaster, 'El usuario Dealer debe tener MasterWebDealer disponible').toBe(true);
    expect(dealerInfo.userDataCompany, 'El usuario Dealer debe tener UserData.Company configurado').toBeTruthy();
  });

  test(
    'El store de organizaciones tiene filtro RelationParent — FIX DSS-1511 verificado',
    async ({ page }) => {
      /**
       * Verifica el fix de DSS-1511:
       *   1. Usuario MasterWebDealer abre el CRM local
       *   2. OrganizationGridController.initView() llama isMasterWebDealer()
       *   3. Como isMaster=true y _UserData.Company > 0, agrega el filtro RelationParent
       *   4. El store carga con ese filtro → el dealer solo ve sus orgs
       *
       * Este test PASA con el fix aplicado.
       */
      const crm = new CrmPage(page);
      const errors = crm.collectCrmConsoleErrors();

      const localPort = parseInt(process.env.CRM_LOCAL_PORT || '1843', 10);
      await crm.gotoLocalCrm(tokenFile, localPort);
      await crm.waitForCrmReadyLocal(120_000);

      // Esperar a que el organizationgridview esté presente y el store cargado
      await page.waitForFunction(
        () => {
          const ext = (window as any).Ext;
          if (!ext || !ext.ComponentQuery) return false;
          const grid = ext.ComponentQuery.query('organizationgridview')[0];
          return !!(grid && grid.getStore && grid.getStore());
        },
        undefined,
        { timeout: 30_000, polling: 500 },
      );

      // Screenshot antes de verificar — evidencia del estado con fix aplicado
      await page.screenshot({
        path: 'reports/screenshots/dss-1511-local-org-grid.png',
        fullPage: false,
      });
      console.log('[Test] Screenshot: Grilla de organizaciones del Dealer local (con filtro)');

      const result = await page.evaluate(() => {
        const ext = (window as any).Ext;
        const _UserData = (window as any)._UserData;

        const orgGrid = ext.ComponentQuery.query('organizationgridview')[0];
        if (!orgGrid) return { error: 'organizationgridview no encontrado', hasRelationFilter: false };

        const store = orgGrid.getStore();
        if (!store) return { error: 'store no disponible', hasRelationFilter: false };

        // Verificar si el filtro RelationParent está en el store
        const storeFilters = store.getFilters ? store.getFilters() : null;
        let hasRelationFilter = false;
        let filterValues: string[] = [];
        let relationFilterValue: any = null;

        if (storeFilters && storeFilters.items) {
          storeFilters.items.forEach((f: any) => {
            const prop = f.getProperty ? f.getProperty() : null;
            const val = f.getValue ? f.getValue() : null;
            filterValues.push(`${prop}=${val}`);
            if (prop === 'Organization:RelationParent') {
              hasRelationFilter = true;
              relationFilterValue = val;
            }
          });
        }

        return {
          hasRelationFilter,
          filterValues,
          relationFilterValue,
          totalCount: store.getTotalCount ? store.getTotalCount() : store.getCount(),
          userDataCompany: _UserData ? _UserData.Company : null,
          filterMatchesCompany: relationFilterValue != null && _UserData
            ? String(relationFilterValue) === String(_UserData.Company)
            : false,
        };
      });

      console.log('[Test] Estado del store local (con fix):', result);
      console.log(`[Test] Total organizaciones visibles: ${result.totalCount}`);
      console.log(`[Test] Filtros aplicados: ${JSON.stringify(result.filterValues)}`);

      if (result.error) {
        console.error('[Test] Error al acceder al store:', result.error);
      }

      // Verificar que no hubo errores críticos al aplicar el filtro
      const criticalErrors = errors.filter(
        (e) =>
          !e.includes('favicon') &&
          !e.includes('DevTools') &&
          !e.includes('El parametro') &&
          !e.includes('[Nueva palabra]'),
      );
      expect(criticalErrors, 'No deben haber errores al aplicar el filtro dealer').toHaveLength(0);

      // Assertion principal: el filtro RelationParent debe estar aplicado
      expect(
        result.hasRelationFilter,
        `El store debe tener Organization:RelationParent filter. ` +
        `Filtros actuales: [${result.filterValues.join(', ')}]`,
      ).toBe(true);

      // El valor del filtro debe coincidir con _UserData.Company
      expect(
        result.filterMatchesCompany,
        `El filtro RelationParent (valor=${result.relationFilterValue}) ` +
        `debe coincidir con _UserData.Company=${result.userDataCompany}`,
      ).toBe(true);

      console.log(
        `[Test] FIX DSS-1511 verificado: Dealer (company=${result.userDataCompany}) ` +
        `ve ${result.totalCount} organizaciones filtradas correctamente`,
      );

      // Screenshot final con la grilla filtrada (evidencia del fix)
      await page.screenshot({
        path: 'reports/screenshots/dss-1511-local-org-grid-filtered.png',
        fullPage: false,
      });
    },
  );
});
