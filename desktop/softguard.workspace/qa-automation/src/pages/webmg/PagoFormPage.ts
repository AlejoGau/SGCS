import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { waitForAjaxComplete, waitForMask } from '../../helpers/extjs';

/**
 * Page Object for the Payment (Pago) form.
 * Used to record payments allocated to invoices.
 *
 * Fields:
 *   - Forma de pago (combo)
 *   - Importe (number)
 *   - Fecha (date)
 *   - Observaciones (text)
 * 
 * Actions: "Realizar Pago", imputación (allocate to invoices)
 */
export class PagoFormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Wait for the payment form to be visible */
  async waitForForm(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('pagoformview')[0];
        return form && form.isVisible();
      },
      { timeout: 30_000, polling: 500 },
    );
  }

  /** Select payment method */
  async selectFormaDePago(value: string): Promise<void> {
    await this.selectCombo('Forma de pago', value);
  }

  /** Set payment amount */
  async setImporte(amount: number): Promise<void> {
    await this.fillNumber('Importe', amount);
  }

  /** Set payment date */
  async setFecha(dateStr: string): Promise<void> {
    await this.fillField('Fecha', dateStr);
  }

  /** Set observations text */
  async setObservaciones(text: string): Promise<void> {
    await this.fillField('Observaciones', text);
  }

  /** Click "Realizar Pago" to submit the payment */
  async realizarPago(): Promise<void> {
    await this.clickButton('Realizar Pago');
    await waitForMask(this.page);
    await waitForAjaxComplete(this.page);
  }

  /** Get the total amount shown in the form */
  async getTotalImporte(): Promise<string> {
    return this.getDisplayValue('Total');
  }

  /** Add imputación (allocate payment to a specific invoice) */
  async agregarImputacion(): Promise<void> {
    await this.clickButton('Agregar');
    await this.page.waitForTimeout(500);
  }

  /** Get all imputaciones from the grid */
  async getImputaciones(): Promise<Record<string, any>[]> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('pagoformview')[0];
      if (!form) return [];
      const grid = form.down('gridpanel');
      if (!grid) return [];
      return grid.getStore().getRange().map((r: any) => r.getData());
    });
  }
}
