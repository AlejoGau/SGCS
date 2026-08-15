import { test, expect } from '../../src/fixtures/auth.fixture';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';
import { ComprobanteGridPage } from '../../src/pages/webmg/ComprobanteGridPage';

test.describe('WebMG > Comprobante PDF @comprobante @pdf', () => {
  let webmg: WebMGPage;
  let grid: ComprobanteGridPage;

  test.beforeEach(async ({ page, navigateToApp }) => {
    webmg = new WebMGPage(page);
    grid = new ComprobanteGridPage(page);
    await navigateToApp('/apps/WebMG/');
    await webmg.openComprobantes();
    await grid.waitForGrid();
  });

  test('should trigger PDF action for existing comprobante', async ({ page }) => {
    const count = await grid.getRowCount();
    test.skip(count === 0, 'No comprobantes available');

    // Listen for any PDF-related response
    const pdfPromise = page.waitForResponse(
      (resp) =>
        resp.url().toLowerCase().includes('pdf') ||
        resp.url().toLowerCase().includes('print') ||
        resp.headers()['content-type']?.includes('application/pdf'),
      { timeout: 30_000 },
    ).catch(() => null);

    await grid.clickPdfAction(0);

    const pdfResponse = await pdfPromise;
    // Verify the PDF action triggered a request (the server may return 500
    // because Html2PdfNreco is a server-side rendering service that may not
    // work in the test environment — that's acceptable)
    expect(pdfResponse).not.toBeNull();
  });
});
