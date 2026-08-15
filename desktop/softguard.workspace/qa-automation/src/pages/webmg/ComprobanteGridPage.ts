import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { waitForAjaxComplete, getExtGridRows } from '../../helpers/extjs';

/**
 * Page Object for the Comprobantes (Invoices) grid.
 * xtype: comprobantegridview
 * Tab itemId: 'Comprobantes'
 *
 * Grid columns: N Comprobante, Cliente, Tipo, Fecha, Subtotal, Total, Estado, Empresa facturadora
 * Action columns: Edit (icon-money), PDF (icon-page-white-acrobat)
 * Toolbar: "Nuevo comprobante" (action=new), "Filtrar" (menu), "Buscar" (action=search), "Todos" (action=getall)
 * Filter fields (inside Filtrar menu): datedesde, datehasta, estado, cbc_ctipocbte, prefijo, numerocomprobante
 */
export class ComprobanteGridPage extends BasePage {
  private readonly gridQuery = 'comprobantegridview';

  constructor(page: Page) {
    super(page);
  }

  /** Wait for the comprobantes grid to be rendered and its store loaded */
  async waitForGrid(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('comprobantegridview')[0];
        return grid && grid.rendered && grid.getStore() && !grid.getStore().isLoading();
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    );
  }

  /** Get number of rows from the store */
  async getRowCount(): Promise<number> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      return grid ? grid.getStore().getCount() : 0;
    });
  }

  /** Get total count from the store (server-side total, may differ from loaded count) */
  async getTotalCount(): Promise<number> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      return grid ? grid.getStore().getTotalCount() : 0;
    });
  }

  /** Get all comprobante data from the grid store */
  async getAllComprobantes(): Promise<Record<string, any>[]> {
    return getExtGridRows(this.page, this.gridQuery);
  }

  /** Get a specific comprobante row data by index */
  async getComprobanteAt(index: number): Promise<Record<string, any> | null> {
    return this.page.evaluate((idx: number) => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      if (!grid) return null;
      const record = grid.getStore().getAt(idx);
      return record ? record.getData() : null;
    }, index);
  }

  /** Click "Nuevo comprobante" button (action=new). Requires org context via view.record */
  async clickNewComprobante(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('comprobantegridview button[action="new"]')[0];
      if (!btn) throw new Error('Button "Nuevo comprobante" not found');
      btn.fireEvent('click', btn);
    });
    await this.page.waitForTimeout(1000);
    await waitForAjaxComplete(this.page);
  }

  /** Click "Buscar" button (action=search) to apply filters */
  async clickSearch(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('comprobantegridview button[action="search"]')[0];
      if (!btn) throw new Error('Button "Buscar" not found');
      btn.fireEvent('click', btn);
    });
    await waitForAjaxComplete(this.page);
  }

  /** Click "Todos" button (action=getall) to clear filters */
  async clickGetAll(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('comprobantegridview button[action="getall"]')[0];
      if (!btn) throw new Error('Button "Todos" not found');
      btn.fireEvent('click', btn);
    });
    await waitForAjaxComplete(this.page);
  }

  /** Set the "Fecha desde" filter */
  async setFechaDesde(dateStr: string): Promise<void> {
    await this._setFilterField('datedesde', dateStr);
  }

  /** Set the "Fecha hasta" filter */
  async setFechaHasta(dateStr: string): Promise<void> {
    await this._setFilterField('datehasta', dateStr);
  }

  /** Set the "Estado" filter (0=Pendiente, 1=Activo, 2=Cancelado) */
  async setEstadoFilter(value: number): Promise<void> {
    await this._setFilterField('estado', value);
  }

  /**
   * Find the first row with cbc_cestado === 0 (Pendiente).
   * Only Pendiente comprobantes open the edit form; others open a print preview.
   * Returns the row index, or -1 if none found.
   */
  async findPendienteRowIndex(): Promise<number> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      if (!grid) return -1;
      const store = grid.getStore();
      for (let i = 0; i < store.getCount(); i++) {
        if (store.getAt(i).get('cbc_cestado') === 0) return i;
      }
      return -1;
    });
  }

  /**
   * Double-click a Pendiente row and wait for the form or an error dialog.
   * The form may self-close with "Falta organizacion facturadora" if the
   * comprobante's org lacks billing config.
   * Returns 'form' | 'error-dialog' | 'printview' | 'timeout'.
   */
  async doubleClickAndWaitForOutcome(rowIndex: number): Promise<'form' | 'error-dialog' | 'printview' | 'timeout'> {
    await this.doubleClickRow(rowIndex);
    const handle = await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('comprobanteformview')[0];
        if (form && form.isVisible()) return 'form';
        const pv = ext.ComponentQuery.query('facturaprintview')[0];
        if (pv && pv.isVisible()) return 'printview';
        if (ext.Msg && ext.Msg.isVisible()) return 'error-dialog';
        return null;
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    ).catch(() => null);
    if (!handle) return 'timeout';
    return (await handle.jsonValue()) as 'form' | 'error-dialog' | 'printview' | 'timeout';
  }

  /** Dismiss Ext.Msg dialog if visible (click OK / Aceptar) */
  async dismissMessageBox(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      if (ext.Msg && ext.Msg.isVisible()) ext.Msg.close();
    });
  }

  /** Double-click on a grid row to open its edit form or print view */
  async doubleClickRow(rowIndex: number): Promise<void> {
    await this.page.evaluate((idx: number) => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      if (!grid) throw new Error('Comprobantes grid not found');
      const record = grid.getStore().getAt(idx);
      if (!record) throw new Error('Row ' + idx + ' not found');
      grid.fireEvent('itemdblclick', grid.getView(), record, null, idx);
    }, rowIndex);
    await this.page.waitForTimeout(1000);
    await waitForAjaxComplete(this.page);
  }

  /** Click the edit action icon (icon-money) on a specific row */
  async clickEditAction(rowIndex: number): Promise<void> {
    // Use DOM click on the action column icon within the row
    const row = this.page.locator('.x-grid-row').nth(rowIndex);
    const editIcon = row.locator('.icon-money').first();
    await editIcon.click();
    await this.page.waitForTimeout(1000);
    await waitForAjaxComplete(this.page);
  }

  /** Click the PDF action icon (icon-page-white-acrobat) on a specific row */
  async clickPdfAction(rowIndex: number): Promise<void> {
    const row = this.page.locator('.x-grid-row').nth(rowIndex);
    const pdfIcon = row.locator('.icon-page-white-acrobat').first();
    await pdfIcon.click();
    await this.page.waitForTimeout(500);
  }

  /** Get the column headers currently displayed */
  async getColumnHeaders(): Promise<string[]> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      if (!grid) return [];
      return grid.columns
        .filter((c: any) => !c.hidden && c.text)
        .map((c: any) => c.text);
    });
  }

  // --- Private helpers ---

  private async _setFilterField(itemId: string, value: any): Promise<void> {
    await this.page.evaluate(
      ({ id, val }: { id: string; val: any }) => {
        const ext = (window as any).Ext;
        const field = ext.ComponentQuery.query('comprobantegridview #' + id)[0];
        if (!field) throw new Error('Filter field #' + id + ' not found');
        field.setValue(val);
      },
      { id: itemId, val: value },
    );
  }
}
