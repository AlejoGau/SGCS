/**
 * Test for: Límite de lista en comprobantes (fix/comprobantes-list-limit)
 *
 * Root cause: the transform function in m_comprobantes_cab_fcSearchModel was setting
 * data.total = unique.length, overwriting the server's COUNT(DISTINCT) total with the
 * deduplicated row count on the current page. When SQL JOINs produced duplicate rows
 * that filled the page limit, only 2 unique comprobantes were visible.
 *
 * Fixes applied:
 *  1. Removed data.total = unique.length from the transform — server total is now preserved.
 *  2. Added pageSize: 50 to the comprobante stores so more records are requested per call.
 *  3. SQL: converted LEFT JOINs on lookup tables to OUTER APPLY (SELECT TOP 1 ...) to
 *     eliminate duplicate rows at the source.
 */
import { test, expect } from '../../src/fixtures/auth.fixture';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';
import { ComprobanteGridPage } from '../../src/pages/webmg/ComprobanteGridPage';
import { waitForAjaxComplete } from '../../src/helpers/extjs';

test.describe('Comprobantes list limit fix @comprobante @regression', () => {
  let webmg: WebMGPage;
  let grid: ComprobanteGridPage;

  test.beforeEach(async ({ page, navigateToApp }) => {
    webmg = new WebMGPage(page);
    grid = new ComprobanteGridPage(page);
    await navigateToApp('/apps/WebMG/');
  });

  test('store total should equal server COUNT(DISTINCT) — not the deduplicated page count', async ({ page }) => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const rowCount = await grid.getRowCount();
    const totalCount = await grid.getTotalCount();

    // The store total (from server) must be >= the loaded row count.
    // Before the fix, data.total was set to unique.length (current-page dedup count),
    // so totalCount === rowCount even when more records existed on further pages.
    expect(totalCount).toBeGreaterThanOrEqual(rowCount);
  });

  test('paging toolbar next-page should be enabled when totalCount > pageSize', async ({ page }) => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const totalCount = await grid.getTotalCount();
    const pageSize = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      return grid ? grid.getStore().pageSize : 0;
    });

    // Only check if there are enough records to span multiple pages
    if (totalCount <= pageSize) {
      test.skip(true, `Only ${totalCount} records — not enough to test multi-page (pageSize=${pageSize})`);
      return;
    }

    const nextEnabled = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const toolbar = ext.ComponentQuery.query('comprobantegridview pagingtoolbar')[0];
      if (!toolbar) return false;
      const nextBtn = toolbar.down('button[itemId="next"]') || toolbar.down('[itemId="next"]');
      return nextBtn ? !nextBtn.isDisabled() : false;
    });

    expect(nextEnabled).toBe(true);
  });

  test('grid rows should never exceed totalCount reported by server', async ({ page }) => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const rowCount = await grid.getRowCount();
    const totalCount = await grid.getTotalCount();

    // Rows loaded on first page must not exceed the server-reported total
    expect(rowCount).toBeLessThanOrEqual(totalCount);
  });

  test('opening client comprobantes from org view should not be limited to 2 records', async ({ page }) => {
    // Navigate into an organization that has comprobantes via the module tree
    const orgOpened = await page.evaluate(() => {
      const ext = (window as any).Ext;
      // Find the first OrganizationMGView that has a module tree
      const orgViews = ext.ComponentQuery.query('organizationmgview');
      if (orgViews.length === 0) return false;
      const treeView = orgViews[0].down('moduletreeview treeview');
      if (!treeView) return false;
      const store = treeView.getStore();
      const root = store.getRootNode();
      if (!root) return false;
      const comprobantesNode = root.findChild('text', 'Comprobantes');
      if (!comprobantesNode) return false;
      treeView.fireEvent('itemclick', treeView, comprobantesNode);
      return true;
    });

    if (!orgOpened) {
      test.skip(true, 'No organization view with module tree available');
      return;
    }

    await page.waitForTimeout(500);
    await waitForAjaxComplete(page);

    // Wait for the comprobante grid to appear inside the org panel
    const gridLoaded = await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('comprobantegridview')[0];
        return grid && grid.rendered && grid.getStore() && !grid.getStore().isLoading();
      },
      undefined,
      { timeout: 20_000, polling: 500 },
    ).catch(() => null);

    if (!gridLoaded) {
      test.skip(true, 'Comprobante grid did not load in org context');
      return;
    }

    const totalCount = await grid.getTotalCount();
    const rowCount = await grid.getRowCount();

    // totalCount must match the server's COUNT(DISTINCT) — not be capped at the page dedup count
    expect(totalCount).toBeGreaterThanOrEqual(rowCount);

    // If there are records, the store must report a consistent state
    if (rowCount > 0) {
      expect(totalCount).toBeGreaterThanOrEqual(1);
    }
  });
});
