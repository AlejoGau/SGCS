import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { waitForAjaxComplete, getExtGridRows } from '../../helpers/extjs';

/**
 * Page Object for the Cuenta Corriente (Current Account) panel.
 * Shows invoices with balances and payment status.
 */
export class CuentaCorrientePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Wait for the cuenta corriente panel to load */
  async waitForPanel(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const panel = ext.ComponentQuery.query('cuentacorrientepanelview')[0];
        return panel && panel.isVisible();
      },
      { timeout: 30_000, polling: 500 },
    );
    await waitForAjaxComplete(this.page);
  }

  /** Get all cuenta corriente records */
  async getAllRecords(): Promise<Record<string, any>[]> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const panel = ext.ComponentQuery.query('cuentacorrientepanelview')[0];
      if (!panel) return [];
      const grid = panel.down('gridpanel') || panel;
      if (!grid.getStore) return [];
      return grid.getStore().getRange().map((r: any) => r.getData());
    });
  }

  /** Get the total balance display */
  async getBalance(): Promise<string> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const panel = ext.ComponentQuery.query('cuentacorrientepanelview')[0];
      if (!panel) return '';
      const display = panel.down('[itemId=saldo]') || panel.down('displayfield[fieldLabel=Saldo]');
      return display ? (display.getValue?.() ?? display.getRawValue?.() ?? '') : '';
    });
  }

  /** Click "Nuevo pago" to open payment form */
  async clickNuevoPago(): Promise<void> {
    await this.clickButton('Nuevo pago');
    await this.page.waitForTimeout(1000);
    await waitForAjaxComplete(this.page);
  }

  /** Get the row count of the account records */
  async getRecordCount(): Promise<number> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const panel = ext.ComponentQuery.query('cuentacorrientepanelview')[0];
      if (!panel) return 0;
      const grid = panel.down('gridpanel') || panel;
      if (!grid.getStore) return 0;
      return grid.getStore().getCount();
    });
  }
}
