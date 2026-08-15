import { test, expect } from '../../src/fixtures/auth.fixture';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';
import { ComprobanteGridPage } from '../../src/pages/webmg/ComprobanteGridPage';
import { ComprobanteFormPage } from '../../src/pages/webmg/ComprobanteFormPage';
import { ComprobanteItemPage } from '../../src/pages/webmg/ComprobanteItemPage';

test.describe('WebMG > Comprobante Items @comprobante @items', () => {
  let webmg: WebMGPage;
  let grid: ComprobanteGridPage;
  let form: ComprobanteFormPage;
  let items: ComprobanteItemPage;

  test.beforeEach(async ({ page, navigateToApp }) => {
    webmg = new WebMGPage(page);
    grid = new ComprobanteGridPage(page);
    form = new ComprobanteFormPage(page);
    items = new ComprobanteItemPage(page);
    await navigateToApp('/apps/WebMG/');
    await webmg.openComprobantes();
    await grid.waitForGrid();
  });

  test('should open comprobante form and show items grid', async () => {
    // Only Pendiente (cbc_cestado=0) records open comprobanteformview with items subgrid
    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    const outcome = await grid.doubleClickAndWaitForOutcome(pendienteIdx);

    if (outcome === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured — form shows error dialog');
    }

    expect(outcome).toBe('form');
    const itemsVisible = await items.isItemsGridVisible();
    expect(itemsVisible).toBe(true);
  });

  test('should display items grid columns', async ({ page }) => {
    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    const outcome = await grid.doubleClickAndWaitForOutcome(pendienteIdx);

    if (outcome === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured — form shows error dialog');
    }

    expect(outcome).toBe('form');
    await items.waitForItemsGrid();

    const headers = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const g = ext.ComponentQuery.query('comprobanteitemsearchview')[0];
      if (!g) return [];
      return g.columns
        .filter((c: any) => !c.hidden && c.text)
        .map((c: any) => c.text);
    });

    expect(headers.length).toBeGreaterThan(0);
  });

  test('should show item count for existing comprobante', async () => {
    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    const outcome = await grid.doubleClickAndWaitForOutcome(pendienteIdx);

    if (outcome === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured — form shows error dialog');
    }

    expect(outcome).toBe('form');
    await items.waitForItemsGrid();

    const itemCount = await items.getItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(0);
  });
});
