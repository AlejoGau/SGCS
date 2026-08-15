import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { waitForAjaxComplete, waitForMask } from '../../helpers/extjs';

/**
 * Page Object for the Facturación Automática Wizard (Batch Invoicing).
 * This is a 3-card wizard:
 *   Card 0: Select Organizacion Facturadora + Tipo Comprobante
 *   Card 1: Filters (Categoria Fiscal, Condición de Pago) → "Buscar" → Grid of contracts → "Facturar"
 *   Card 2: Results (success/error list)
 */
export class FacturacionWizardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Wait for the wizard to open */
  async waitForWizard(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const wizard = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
        return wizard && wizard.isVisible();
      },
      { timeout: 30_000, polling: 500 },
    );
  }

  /** Get current card index (0, 1, or 2). The card layout lives inside #cardspanel, not the wizard itself. */
  async getCurrentCard(): Promise<number> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const wizard = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      if (!wizard) return -1;
      const cardsPanel = wizard.down('#cardspanel');
      if (!cardsPanel) return -1;
      const layout = cardsPanel.getLayout();
      const active = layout.getActiveItem ? layout.getActiveItem() : null;
      return active ? cardsPanel.items.indexOf(active) : -1;
    });
  }

  // --- Card 0: Organization + Type ---

  /** Select the billing organization */
  async selectOrganizacionFacturadora(orgName: string): Promise<void> {
    await this.clickButton('Seleccione Organizacion');
    await this.page.waitForTimeout(1000);
    // Organization helper grid usually opens — select the matching row
    await this.page.evaluate((name: string) => {
      const ext = (window as any).Ext;
      const grids = ext.ComponentQuery.query('gridpanel');
      for (const grid of grids) {
        const store = grid.getStore();
        if (!store) continue;
        const idx = store.findExact('Name', name);
        if (idx >= 0) {
          const rec = store.getAt(idx);
          grid.getSelectionModel().select(rec);
          grid.fireEvent('itemdblclick', grid.getView(), rec, null, idx);
          return;
        }
      }
    }, orgName);
    await waitForAjaxComplete(this.page);
  }

  /** Select tipo comprobante in the wizard */
  async selectTipoComprobante(tipo: string): Promise<void> {
    await this.selectCombo('Tipo comprobante', tipo);
  }

  /** Move to next card */
  async next(): Promise<void> {
    await this.clickButton('Siguiente');
    await this.page.waitForTimeout(500);
  }

  // --- Card 1: Filters + Search ---

  /** Click "Buscar" to search contracts matching filters */
  async buscar(): Promise<void> {
    await this.clickButton('Buscar');
    await waitForMask(this.page);
    await waitForAjaxComplete(this.page);
  }

  /** Get number of contracts found */
  async getContractCount(): Promise<number> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      // The wizard's card 1 should have a grid with search results
      const wizard = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      if (!wizard) return 0;
      const grids = wizard.query('gridpanel');
      // Usually the second or last grid is the results
      const grid = grids[grids.length - 1];
      return grid ? grid.getStore().getCount() : 0;
    });
  }

  /** Select all contracts in the results grid */
  async selectAllContracts(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const wizard = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      if (!wizard) return;
      const grids = wizard.query('gridpanel');
      const grid = grids[grids.length - 1];
      if (grid) {
        grid.getSelectionModel().selectAll();
      }
    });
  }

  /** Click "Facturar" to generate invoices */
  async facturar(): Promise<void> {
    await this.clickButton('Facturar');
    await waitForMask(this.page);
    await waitForAjaxComplete(this.page);
  }

  // --- Card 2: Results ---

  /** Get the results summary from card 2 */
  async getResults(): Promise<{ success: number; errors: number }> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const wizard = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      if (!wizard) return { success: 0, errors: 0 };
      // Read from the results grid/display
      const grids = wizard.query('gridpanel');
      const resultsGrid = grids[grids.length - 1];
      if (!resultsGrid) return { success: 0, errors: 0 };
      const store = resultsGrid.getStore();
      let success = 0;
      let errors = 0;
      store.each((rec: any) => {
        if (rec.get('_status') === 'OK' || rec.get('_result') === 'OK') success++;
        else errors++;
      });
      return { success, errors };
    });
  }

  /** Close the wizard */
  async close(): Promise<void> {
    await this.clickButton('Cerrar');
  }
}
