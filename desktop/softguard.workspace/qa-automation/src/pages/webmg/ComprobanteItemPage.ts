import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { waitForAjaxComplete, getExtGridRows, waitForMask } from '../../helpers/extjs';

/**
 * Page Object for Comprobante Items (both product-based and manual).
 *
 * Items Grid (comprobanteitemsearchview):
 *   Columns: Artículo, Nombre, Cantidad, Valor, Descuento (%), Neto, Impuesto, Total
 *   Toolbar: "Agregar producto o servicio", "Agregar item manual"
 *
 * Product Item Form (comprobanteitemformview):
 *   Fields: Código, Producto, Impuesto, Valor, "Seleccione" button, Cantidad, SubTotal, Impuesto, Total
 *   Toolbar: "Guardar"
 *
 * Manual Item Form (comprobanteitemmanualformview):
 *   Fields: Descripción, Valor, Cantidad, Impuesto (combo), SubTotal, Impuesto, Total
 *   Toolbar: "Guardar"
 */
export class ComprobanteItemPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // --- Items Grid ---

  /** Check if items grid exists and is visible */
  async isItemsGridVisible(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobanteitemsearchview')[0];
      return grid ? grid.isVisible() : false;
    });
  }

  /** Wait for the items grid to be loaded */
  async waitForItemsGrid(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('comprobanteitemsearchview')[0];
        return grid && grid.isVisible() && !grid.disabled;
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    );
  }

  /** Get number of items in the grid */
  async getItemCount(): Promise<number> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobanteitemsearchview')[0];
      return grid ? grid.getStore().getCount() : 0;
    });
  }

  /** Get all items data */
  async getAllItems(): Promise<Record<string, any>[]> {
    return getExtGridRows(this.page, 'comprobanteitemsearchview');
  }

  /** Click "Agregar producto o servicio" */
  async clickAddProduct(): Promise<void> {
    await this.clickButton('Agregar producto o servicio');
    await this.page.waitForTimeout(1000);
    await waitForAjaxComplete(this.page);
  }

  /** Click "Agregar item manual" */
  async clickAddManual(): Promise<void> {
    await this.clickButton('Agregar item manual');
    await this.page.waitForTimeout(1000);
  }

  /** Delete an item by clicking the delete icon on a row */
  async deleteItem(rowIndex: number): Promise<void> {
    const deleteIcon = this.page.locator('.x-grid-row').nth(rowIndex).locator('.icon-delete').first();
    await deleteIcon.click();
    await this.page.waitForTimeout(500);
    // Confirm deletion if dialog appears
    const yesBtn = this.page.locator('.x-message-box button:has-text("Sí"), .x-message-box button:has-text("Yes")').first();
    const visible = await yesBtn.isVisible().catch(() => false);
    if (visible) {
      await yesBtn.click();
    }
    await waitForAjaxComplete(this.page);
  }

  // --- Product Item Form ---

  /** Wait for product item form to open */
  async waitForProductForm(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('comprobanteitemformview')[0];
        return form && form.isVisible();
      },
      { timeout: 15_000, polling: 500 },
    );
  }

  /** Click "Seleccione" to open product picker */
  async clickSelectProduct(): Promise<void> {
    // Find the button within the product item form
    const btn = this.page.locator('.x-btn-inner:has-text("Seleccione")').first();
    await btn.click();
    await this.page.waitForTimeout(1000);
    await waitForAjaxComplete(this.page);
  }

  /** Select a product from the product helper grid (by row index) */
  async selectProductFromHelper(rowIndex: number): Promise<void> {
    // The product helper shows a grid of products — double-click to select
    await this.page.evaluate((idx: number) => {
      const ext = (window as any).Ext;
      // Look for the product helper grid
      const grids = ext.ComponentQuery.query('gridpanel');
      const helperGrid = grids.find((g: any) =>
        g.getStore() && g.getStore().model &&
        g.getStore().model.entityName?.includes('Product'),
      );
      if (helperGrid) {
        const record = helperGrid.getStore().getAt(idx);
        if (record) {
          helperGrid.fireEvent('itemdblclick', helperGrid.getView(), record, null, idx);
        }
      }
    }, rowIndex);
    await this.page.waitForTimeout(500);
    await waitForAjaxComplete(this.page);
  }

  /** Set item quantity (product form) */
  async setQuantity(quantity: number): Promise<void> {
    await this.setComponentValue('quantityCombo', quantity);
    // Trigger change event for calculation
    await this.page.evaluate((qty: number) => {
      const ext = (window as any).Ext;
      const field = ext.ComponentQuery.query('[itemId=quantityCombo]')[0];
      if (field) {
        field.setValue(qty);
        field.fireEvent('change', field, qty);
      }
    }, quantity);
    await this.page.waitForTimeout(300);
  }

  /** Get product item form values */
  async getProductFormValues(): Promise<{
    code: string;
    name: string;
    price: string;
    vat: string;
    quantity: number;
    subtotal: string;
    tax: string;
    total: string;
  }> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteitemformview')[0];
      if (!form) throw new Error('Product form not found');
      const get = (id: string) => {
        const cmp = form.down(`[itemId=${id}]`);
        return cmp ? (cmp.getValue?.() ?? cmp.getRawValue?.() ?? '') : '';
      };
      return {
        code: String(get('Id')),
        name: String(get('Name')),
        price: String(get('Price')),
        vat: String(get('VAT')),
        quantity: Number(get('quantityCombo')),
        subtotal: String(get('_subTotal')),
        tax: String(get('_VAT')),
        total: String(get('Total')),
      };
    });
  }

  /** Save the product item form */
  async saveProductItem(): Promise<void> {
    // Click Guardar within the item form context
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteitemformview')[0];
      if (form) {
        const saveBtn = form.down('[itemId=save]');
        if (saveBtn) saveBtn.fireEvent('click', saveBtn);
      }
    });
    await waitForMask(this.page);
    await waitForAjaxComplete(this.page);
  }

  // --- Manual Item Form ---

  /** Wait for manual item form to open */
  async waitForManualForm(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('comprobanteitemmanualformview')[0];
        return form && form.isVisible();
      },
      { timeout: 15_000, polling: 500 },
    );
  }

  /** Fill the manual item form */
  async fillManualItem(data: {
    descripcion: string;
    valor: number;
    cantidad: number;
    impuesto: string; // Display value for the impuesto combo
  }): Promise<void> {
    // Fill within the manual form context
    await this.page.evaluate(
      (d) => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('comprobanteitemmanualformview')[0];
        if (!form) throw new Error('Manual form not found');

        form.down('[itemId=cbi_cdescripcion]').setValue(d.descripcion);
        form.down('[itemId=cbi_yimporte]').setValue(d.valor);
        form.down('[itemId=Quantity]').setValue(d.cantidad);
      },
      { descripcion: data.descripcion, valor: data.valor, cantidad: data.cantidad },
    );

    // Select impuesto combo
    await this.page.evaluate((impuestoText: string) => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteitemmanualformview')[0];
      if (!form) return;
      const combo = form.down('[itemId=impuesto]');
      if (combo && combo.getStore()) {
        const record = combo.getStore().findRecord('imp_cdescripcion', impuestoText);
        if (record) {
          combo.setValue(record.get('Id'));
          combo.fireEvent('select', combo, record);
        }
      }
    }, data.impuesto);

    await this.page.waitForTimeout(300);
  }

  /** Get manual item form values */
  async getManualFormValues(): Promise<{
    descripcion: string;
    valor: number;
    cantidad: number;
    subtotal: string;
    tax: string;
    total: string;
  }> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteitemmanualformview')[0];
      if (!form) throw new Error('Manual form not found');
      const get = (id: string) => {
        const cmp = form.down(`[itemId=${id}]`);
        return cmp ? (cmp.getValue?.() ?? cmp.getRawValue?.() ?? '') : '';
      };
      return {
        descripcion: String(get('cbi_cdescripcion')),
        valor: Number(get('cbi_yimporte')),
        cantidad: Number(get('Quantity')),
        subtotal: String(get('_subTotal')),
        tax: String(get('_VAT')),
        total: String(get('Total')),
      };
    });
  }

  /** Save the manual item form */
  async saveManualItem(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteitemmanualformview')[0];
      if (form) {
        const saveBtn = form.down('[itemId=save]');
        if (saveBtn) saveBtn.fireEvent('click', saveBtn);
      }
    });
    await waitForMask(this.page);
    await waitForAjaxComplete(this.page);
  }
}
