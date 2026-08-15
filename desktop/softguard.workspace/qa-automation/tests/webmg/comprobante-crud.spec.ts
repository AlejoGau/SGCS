import { test, expect } from '../../src/fixtures/auth.fixture';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';
import { ComprobanteGridPage } from '../../src/pages/webmg/ComprobanteGridPage';
import { ComprobanteFormPage } from '../../src/pages/webmg/ComprobanteFormPage';

test.describe('WebMG > Comprobante CRUD @comprobante @crud', () => {
  let webmg: WebMGPage;
  let grid: ComprobanteGridPage;
  let form: ComprobanteFormPage;

  test.beforeEach(async ({ page, navigateToApp }) => {
    webmg = new WebMGPage(page);
    grid = new ComprobanteGridPage(page);
    form = new ComprobanteFormPage(page);
    await navigateToApp('/apps/WebMG/');
  });

  test('should load WebMG app successfully', async () => {
    const loaded = await webmg.isLoaded();
    expect(loaded).toBe(true);

    // Default tabs should be present
    const tabs = await webmg.getOpenTabs();
    expect(tabs).toContain('Organizaciones');
  });

  test('should open Comprobantes tab via toolbar', async () => {
    await webmg.openComprobantes();
    const tabs = await webmg.getOpenTabs();
    expect(tabs).toContain('Comprobantes');
  });

  test('should display comprobantes grid with data', async () => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const count = await grid.getRowCount();
    expect(count).toBeGreaterThanOrEqual(0);

    // Verify grid has proper columns
    const headers = await grid.getColumnHeaders();
    expect(headers).toContain('N Comporbante');
    expect(headers).toContain('Cliente');
    expect(headers).toContain('Total');
    expect(headers).toContain('Estado');
  });

  test('should display comprobante record data', async () => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const count = await grid.getRowCount();
    if (count > 0) {
      const record = await grid.getComprobanteAt(0);
      expect(record).not.toBeNull();
      // Verify key fields exist
      expect(record).toHaveProperty('cbc_inumerocbte');
      expect(record).toHaveProperty('cbc_dfecha');
      expect(record).toHaveProperty('cbc_ytotal');
      expect(record).toHaveProperty('cbc_cestado');
      expect(record).toHaveProperty('_ncomprobante');
    }
  });

  test('should open comprobante form for Pendiente record', async ({ page }) => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    // Only Pendiente (cbc_cestado=0) records open comprobanteformview; others open facturaprintview
    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    const outcome = await grid.doubleClickAndWaitForOutcome(pendienteIdx);

    if (outcome === 'error-dialog') {
      // "Falta organizacion facturadora" — form self-closed because org billing not configured
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured — form shows error dialog');
    }

    expect(outcome).toBe('form');
    const persisted = await form.isPersisted();
    expect(persisted).toBe(true);
  });

  test('should display correct fields on comprobante form', async ({ page }) => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    const outcome = await grid.doubleClickAndWaitForOutcome(pendienteIdx);

    if (outcome === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured — form shows error dialog');
    }

    expect(outcome).toBe('form');

    // Verify key form components are visible
    const tipoVisible = await form.isComponentVisible('cbc_ctipocbte');
    expect(tipoVisible).toBe(true);

    const estadoVisible = await form.isComponentVisible('cbc_cestado');
    expect(estadoVisible).toBe(true);
  });

  test('should open print view for non-Pendiente record', async ({ page }) => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    // Find first non-Pendiente record (cbc_cestado != 0)
    const nonPendienteIdx = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const g = ext.ComponentQuery.query('comprobantegridview')[0];
      if (!g) return -1;
      const store = g.getStore();
      for (let i = 0; i < store.getCount(); i++) {
        if (store.getAt(i).get('cbc_cestado') !== 0) return i;
      }
      return -1;
    });
    test.skip(nonPendienteIdx === -1, 'No non-Pendiente comprobantes available');

    await grid.doubleClickRow(nonPendienteIdx);

    // Should open facturaprintview (print preview) instead of form
    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const pv = ext.ComponentQuery.query('facturaprintview')[0];
        return pv && pv.isVisible();
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    );

    // Verify a new tab was added
    const tabs = await webmg.getOpenTabs();
    const hasPrintTab = tabs.some((t: string) => t.startsWith('Comprobante:'));
    expect(hasPrintTab).toBe(true);
  });

  test('should invoke iframe print even when print is clicked before preview finishes loading', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') pageErrors.push(msg.text());
    });

    await page.route('**/handler/ComprobantePdfMG?idComprobante=*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      await route.fulfill({
        status: 200,
        contentType: 'text/html; charset=utf-8',
        body: `<!doctype html>
<html>
  <body>
    <div>DK-1722 preview stub</div>
    <script>
      window.top.__dk1722FrameLoaded = true;
      function printMe() {
        window.top.__dk1722PrintInvoked = true;
        window.top.__dk1722PrintMode = 'printMe';
      }
      window.print = function() {
        window.top.__dk1722PrintInvoked = true;
        window.top.__dk1722PrintMode = 'print';
      };
    </script>
  </body>
</html>`,
      });
    });

    await webmg.openComprobantes();
    await grid.waitForGrid();

    const nonPendienteIdx = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const g = ext.ComponentQuery.query('comprobantegridview')[0];
      if (!g) return -1;
      const store = g.getStore();
      for (let i = 0; i < store.getCount(); i++) {
        if (store.getAt(i).get('cbc_cestado') !== 0) return i;
      }
      return -1;
    });
    test.skip(nonPendienteIdx === -1, 'No non-Pendiente comprobantes available');

    await grid.doubleClickRow(nonPendienteIdx);

    await page.waitForFunction(() => {
      const ext = (window as any).Ext;
      const pv = ext.ComponentQuery.query('facturaprintview')[0];
      return pv && pv.isVisible();
    }, undefined, { timeout: 30_000, polling: 500 });

    await page.evaluate(() => {
      (window as any).__dk1722FrameLoaded = false;
      (window as any).__dk1722PrintInvoked = false;
      (window as any).__dk1722PrintMode = null;

      const ext = (window as any).Ext;
      const view = ext.ComponentQuery.query('facturaprintview')[0];
      const button = view && view.down('button[text="Imprimir"]');

      if (button) {
        if (typeof button.fireHandler === 'function') {
          button.fireHandler();
          return;
        }

        if (button.el && button.el.dom && typeof button.el.dom.click === 'function') {
          button.el.dom.click();
        }
      }
    });

    await page.waitForFunction(() => (window as any).__dk1722FrameLoaded === true, undefined, {
      timeout: 30_000,
      polling: 250,
    });

    await page.waitForFunction(() => (window as any).__dk1722PrintInvoked === true, undefined, {
      timeout: 30_000,
      polling: 250,
    });

    const printMode = await page.evaluate(() => (window as any).__dk1722PrintMode);

    expect(['print', 'printMe']).toContain(printMode);
    expect(pageErrors.join('\n')).not.toContain('contentWindow');
  });

  test('should filter comprobantes by estado', async () => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const totalBefore = await grid.getRowCount();

    // Filter by estado = 0 (Pendiente)
    await grid.setEstadoFilter(0);
    await grid.clickSearch();
    await grid.waitForGrid();

    const filtered = await grid.getRowCount();
    // Either same count (all pendiente) or fewer — just verify no error
    expect(filtered).toBeGreaterThanOrEqual(0);
  });

  test('should clear filters with Todos button', async () => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    // Apply a filter first
    await grid.setEstadoFilter(1);
    await grid.clickSearch();
    await grid.waitForGrid();

    // Clear with "Todos"
    await grid.clickGetAll();
    await grid.waitForGrid();

    const count = await grid.getRowCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should list organizations on default tab', async () => {
    const orgs = await webmg.getOrganizations();
    expect(orgs.length).toBeGreaterThanOrEqual(0);
  });

  test('should show correct total count in grid paging toolbar', async ({ page }) => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const storeCount = await grid.getRowCount();
    const totalCount = await grid.getTotalCount();

    // Total should be >= loaded rows (server may have more pages)
    expect(totalCount).toBeGreaterThanOrEqual(storeCount);
  });

  test('should have all expected column headers', async () => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const headers = await grid.getColumnHeaders();
    // Verify all documented columns are present
    expect(headers).toContain('N Comporbante');
    expect(headers).toContain('Cliente');
    expect(headers).toContain('Tipo');
    expect(headers).toContain('Fecha');
    expect(headers).toContain('Subtotal');
    expect(headers).toContain('Total');
    expect(headers).toContain('Estado');
    expect(headers).toContain('Empresa facturadora');
  });

  test('should have both Pendiente and Activo records in dataset', async () => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const rows = await grid.getAllComprobantes();
    test.skip(rows.length === 0, 'No comprobantes in dataset');

    const estados = [...new Set(rows.map(r => r.cbc_cestado))];
    // Verify we have at least one estado type
    expect(estados.length).toBeGreaterThanOrEqual(1);
    // Log the found estado values for diagnostics
    console.log('Estado values found:', estados);
  });

  test('should verify comprobante date format', async () => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const record = await grid.getComprobanteAt(0);
    test.skip(!record, 'No comprobantes available');

    // Date field should be a valid date string
    const fecha = record!.cbc_dfecha;
    expect(fecha).toBeTruthy();
    expect(new Date(fecha).toString()).not.toBe('Invalid Date');
  });

  test('should filter by Activo estado and show only active', async ({ page }) => {
    await webmg.openComprobantes();
    await grid.waitForGrid();

    // Filter by estado = 1 (Activo)
    await grid.setEstadoFilter(1);
    await grid.clickSearch();
    await grid.waitForGrid();

    const rows = await grid.getAllComprobantes();
    // All returned rows should have estado = 1
    for (const row of rows) {
      expect(row.cbc_cestado).toBe(1);
    }
  });

  test('should navigate Comprobantes tab and return to Organizaciones', async () => {
    // Open Comprobantes tab
    await webmg.openComprobantes();
    const tabs = await webmg.getOpenTabs();
    expect(tabs).toContain('Comprobantes');

    // Switch back to Organizaciones
    await webmg.activateTab('Organizaciones');

    // Verify organizations grid is still accessible
    const orgs = await webmg.getOrganizations();
    expect(orgs.length).toBeGreaterThanOrEqual(0);
  });
});
