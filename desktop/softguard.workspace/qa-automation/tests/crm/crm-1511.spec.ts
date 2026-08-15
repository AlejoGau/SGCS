import { test, expect } from '@playwright/test';
import { CrmPage } from '../../src/pages/crm/CrmPage';

/**
 * DSS-1511 — CRM: usuario Dealer nuevo ve TODAS las organizaciones
 *
 * Contexto:
 *   Al crear un usuario DEALER nuevo y asignarle el módulo CRM, al entrar al CRM
 *   puede ver TODAS las organizaciones del sistema en lugar de solo las que
 *   pertenecen a su dealer (filtradas por RelationParent).
 *
 *   Los usuarios Dealer creados ANTES de DSS-1497 ven correctamente porque el bug
 *   DSS-1497 impedía que nuevos Dealer users accedieran al CRM en absoluto.
 *
 * Root cause:
 *   OrganizationGridController.js → initView() — el bloque que aplica el filtro
 *   `Organization:RelationParent` usando `isMasterWebDealer()` estaba comentado.
 *   Al habilitar el acceso al CRM via DSS-1497, los nuevos Dealer users entran
 *   sin filtro y ven todas las organizaciones.
 *
 * Fix:
 *   packages/local/common/src/controller/OrganizationGridController.js
 *   - Descomentado el bloque `isMasterWebDealer` en `initView()`
 *   - Cambiado `controller.application.UserData.Company` → `_UserData.Company`
 *   - Agregado null-check en `isMasterWebDealer()` para evitar NPE
 *
 * Este test corre contra GCS (código SIN fix).
 * Se ESPERA QUE FALLE — documenta que el bug existe en producción.
 * Pasará cuando el fix sea desplegado en GCS.
 *
 * Para ejecutar:
 *   npx playwright test crm/crm-1511.spec.ts --project=crm-1511-gcs --reporter=list
 *
 * Cuentas de prueba:
 *   Dealer nuevo (bug): thtestdealer@softguard.com / Admin1234
 *   Dealer viejo (control): thtestmg@softguard.com / Admin1234
 */

test.describe('DSS-1511 — Dealer nuevo ve todas las orgs: filtro RelationParent (GCS sin fix)', () => {
  test(
    'El CRM carga correctamente para el usuario Dealer nuevo',
    async ({ page }) => {
      const crm = new CrmPage(page);
      const { frame, dss1497Active } = await crm.openCrmGcs();

      if (dss1497Active) {
        console.warn('[Test] DSS-1497 aún activo en GCS — viewport no inicializó completamente');
      }

      const loaded = await crm.isCrmLoaded(frame);
      expect(loaded, 'El viewport de CRM debe renderizar para el usuario Dealer').toBe(true);

      await page.screenshot({
        path: 'reports/screenshots/dss-1511-gcs-crm-loaded.png',
        fullPage: false,
      });
      console.log('[Test] Screenshot: CRM cargado para Dealer en GCS');
    },
  );

  test(
    'isMasterWebDealer retorna true para el usuario Dealer nuevo (GCS)',
    async ({ page }) => {
      const crm = new CrmPage(page);
      const { frame, dss1497Active } = await crm.openCrmGcs();

      if (dss1497Active) {
        console.warn('[Test] DSS-1497 activo — verificando con ClassManager disponible');
      }

      const dealerInfo = await frame.evaluate(() => {
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

      console.log('[Test] Dealer info en GCS:', dealerInfo);

      expect(dealerInfo.isMaster, 'El usuario Dealer debe tener MasterWebDealer disponible').toBe(true);
      expect(dealerInfo.userDataCompany, 'El usuario Dealer debe tener UserData.Company configurado').toBeTruthy();
    },
  );

  test(
    'El store de organizaciones tiene filtro RelationParent (DSS-1511 regression — GCS sin fix)',
    async ({ page }) => {
      /**
       * Verifica que cuando un usuario MasterWebDealer abre el CRM,
       * el organizationgridview aplica automáticamente el filtro
       * `Organization:RelationParent` con el valor de `_UserData.Company`.
       *
       * En GCS (sin fix): el filtro NO está aplicado → el test FALLA → documenta el bug.
       * En localhost (con fix): el filtro SÍ está → el test PASA.
       */
      const crm = new CrmPage(page);
      const { frame, dss1497Active } = await crm.openCrmGcs();

      if (dss1497Active) {
        console.warn('[Test] DSS-1497 activo — CRM no cargó completamente, marcando test como inconcluso');
        // Si el viewport no cargó, no podemos verificar el store
        test.skip();
        return;
      }

      // Esperar a que el organizationgridview esté presente y el store cargado
      await frame.waitForFunction(
        () => {
          const ext = (window as any).Ext;
          if (!ext || !ext.ComponentQuery) return false;
          const grid = ext.ComponentQuery.query('organizationgridview')[0];
          return !!(grid && grid.getStore && grid.getStore());
        },
        undefined,
        { timeout: 30_000, polling: 500 },
      );

      // Screenshot antes de verificar (documenta lo que el dealer ve en GCS)
      await page.screenshot({
        path: 'reports/screenshots/dss-1511-gcs-org-grid.png',
        fullPage: false,
      });
      console.log('[Test] Screenshot: Grilla de organizaciones del Dealer en GCS (sin filtro esperado)');

      const result = await frame.evaluate(() => {
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

        if (storeFilters && storeFilters.items) {
          hasRelationFilter = storeFilters.items.some(
            (f: any) => f.getProperty && f.getProperty() === 'Organization:RelationParent',
          );
          filterValues = storeFilters.items.map(
            (f: any) => `${f.getProperty ? f.getProperty() : '?'}=${f.getValue ? f.getValue() : '?'}`,
          );
        }

        return {
          hasRelationFilter,
          filterValues,
          totalCount: store.getTotalCount ? store.getTotalCount() : store.getCount(),
          userDataCompany: _UserData ? _UserData.Company : null,
        };
      });

      console.log('[Test] Estado del store en GCS:', result);
      console.log(`[Test] Total organizaciones visibles: ${result.totalCount}`);
      console.log(`[Test] Filtros aplicados: ${JSON.stringify(result.filterValues)}`);

      // Esta assertion FALLA en GCS (documenta el bug):
      // El dealer ve todas las orgs porque el filtro RelationParent NO está aplicado.
      expect(
        result.hasRelationFilter,
        `El store de organizationgridview debe tener el filtro Organization:RelationParent ` +
        `(companyId=${result.userDataCompany}). ` +
        `Filtros actuales: [${result.filterValues.join(', ')}]. ` +
        `Total orgs visibles: ${result.totalCount}`,
      ).toBe(true);
    },
  );
});
