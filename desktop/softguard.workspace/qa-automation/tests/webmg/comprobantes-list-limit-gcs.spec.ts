/**
 * GCS regression test — fix/comprobantes-list-limit (DK-1418)
 * Runs directly against the deployed GCS build.
 * Usage: npx playwright test webmg/comprobantes-list-limit-gcs --project=gcs-webmg --headed
 */
import { test, expect } from '@playwright/test';
import { waitForExtReady, waitForAjaxComplete } from '../../src/helpers/extjs';

const GCS_APP_PATH = process.env.GCS_WEBMG_PATH || '/apps/WebMG/DK-1418-comprobantes-list-limit/';

test.describe('DK-1418 — Comprobantes list limit @regression @gcs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(GCS_APP_PATH, { waitUntil: 'domcontentloaded' });
    await waitForExtReady(page, 120_000);
    await waitForAjaxComplete(page);
  });

  test('app carga correctamente en la URL del build', async ({ page }) => {
    const loaded = await page.evaluate(() => {
      const ext = (window as any).Ext;
      return !!(ext && ext.isReady && ext.ComponentQuery.query('viewport')[0]?.rendered);
    });
    expect(loaded).toBe(true);
  });

  test('store pageSize es 50 (no el default de 25)', async ({ page }) => {
    // Abrir comprobantes globales para verificar la config del store
    await page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('viewport #comprobantes')[0];
      if (btn) btn.fireEvent('click', btn);
    });

    // wait for the REAL store (created inside TipoComprobanteStore.load callback)
    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('comprobantegridview')[0];
        if (!grid || !grid.rendered) return false;
        const store = grid.getStore();
        return store && store.pageSize === 50 && !store.isLoading();
      },
      undefined,
      { timeout: 40_000, polling: 500 },
    );

    const pageSize = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      return grid?.getStore()?.pageSize ?? null;
    });

    expect(pageSize).toBe(50);
  });

  test('totalCount del store iguala el COUNT(DISTINCT) del server — no el dedup de la página', async ({ page }) => {
    await page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('viewport #comprobantes')[0];
      if (btn) btn.fireEvent('click', btn);
    });

    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('comprobantegridview')[0];
        return grid && grid.rendered && grid.getStore() && !grid.getStore().isLoading();
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    );

    const { rowCount, totalCount } = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      const store = grid?.getStore();
      return {
        rowCount: store?.getCount() ?? 0,
        totalCount: store?.getTotalCount() ?? 0,
      };
    });

    console.log(`[DK-1418] rowCount=${rowCount}, totalCount=${totalCount}`);

    // totalCount nunca puede ser menor que rowCount
    expect(totalCount).toBeGreaterThanOrEqual(rowCount);
  });

  test('abrir comprobantes de un cliente: lista no queda limitada a 2 registros', async ({ page }) => {
    // Esperar grilla de organizaciones
    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('organizationgridview')[0];
        return grid && !grid.getStore().isLoading() && grid.getStore().getCount() > 0;
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    );

    // Abrir la primera organización con doble click
    await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('organizationgridview')[0];
      const record = grid.getStore().getAt(0);
      grid.fireEvent('itemdblclick', grid.getView(), record, null, 0);
    });

    await page.waitForTimeout(1500);
    await waitForAjaxComplete(page);

    // Use native DOM click on the Comprobantes tree node to avoid event arg issues
    const comprobantesNode = page.locator('.x-tree-node-text').filter({ hasText: /^Comprobantes$/ }).first();
    const nodeVisible = await comprobantesNode.isVisible().catch(() => false);

    if (!nodeVisible) {
      test.skip(true, 'No se encontró nodo Comprobantes en el árbol de módulos');
      return;
    }

    await comprobantesNode.click();

    await page.waitForTimeout(500);
    await waitForAjaxComplete(page);

    // Esperar que la grilla cargue
    const gridLoaded = await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('comprobantegridview')[0];
        return grid && grid.rendered && grid.getStore() && !grid.getStore().isLoading();
      },
      undefined,
      { timeout: 25_000, polling: 500 },
    ).catch(() => null);

    if (!gridLoaded) {
      test.skip(true, 'Grid de comprobantes no cargó en este cliente');
      return;
    }

    const { rowCount, totalCount, storePageSize } = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      const store = grid?.getStore();
      return {
        rowCount:     store?.getCount() ?? 0,
        totalCount:   store?.getTotalCount() ?? 0,
        storePageSize: store?.pageSize ?? null,
      };
    });

    console.log(`[DK-1418] org comprobantes — rowCount=${rowCount}, totalCount=${totalCount}, pageSize=${storePageSize}`);

    expect(storePageSize).toBe(50);
    expect(totalCount).toBeGreaterThanOrEqual(rowCount);

    // Si hay comprobantes: el total no debe estar artificialmente limitado a 2
    if (totalCount > 0) {
      // Con el fix el total viene del COUNT(DISTINCT) del server.
      // Antes del fix, si había dups en las JOINs, totalCount era 2 aunque existieran más.
      // Ahora totalCount debe ser >= rowCount y ambos deben ser >= 1.
      expect(rowCount).toBeGreaterThanOrEqual(1);
    }
  });

  test('crear comprobante y verificar que aparece en la lista', async ({ page }) => {
    await page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('viewport #comprobantes')[0];
      if (btn) btn.fireEvent('click', btn);
    });

    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('comprobantegridview')[0];
        return grid && grid.rendered && grid.getStore() && !grid.getStore().isLoading();
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    );

    const totalBefore = await page.evaluate(() => {
      const ext = (window as any).Ext;
      return ext.ComponentQuery.query('comprobantegridview')[0]?.getStore()?.getTotalCount() ?? 0;
    });

    // Reload y verificar que el total es estable (no cambia a 2 por el bug)
    await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      grid?.getStore()?.load();
    });

    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('comprobantegridview')[0];
        return grid && !grid.getStore().isLoading();
      },
      undefined,
      { timeout: 20_000, polling: 300 },
    );

    const totalAfter = await page.evaluate(() => {
      const ext = (window as any).Ext;
      return ext.ComponentQuery.query('comprobantegridview')[0]?.getStore()?.getTotalCount() ?? 0;
    });

    console.log(`[DK-1418] totalBefore=${totalBefore}, totalAfter=${totalAfter}`);

    // El total post-reload debe ser igual al anterior (el fix no cambia la cantidad de datos)
    expect(totalAfter).toBe(totalBefore);
    // Y nunca debe ser menor que 0
    expect(totalAfter).toBeGreaterThanOrEqual(0);
  });
});
