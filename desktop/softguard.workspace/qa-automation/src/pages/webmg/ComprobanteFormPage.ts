import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { waitForAjaxComplete, waitForMask } from '../../helpers/extjs';

/**
 * Page Object for the Comprobante (Invoice) form.
 * Alias: comprobanteformview
 *
 * Fields:
 *   - Comprobante (display: _ncomprobante)
 *   - Tipo comprobante (combo: cbc_ctipocbte)
 *   - Fecha (date: cbc_dfecha)
 *   - Organizacion (display + "Seleccionar una organizacion" button)
 *   - Impuesto 1/2/3 (number fields)
 *   - Condicion de pago (combo)
 *   - Estado (combo: Pendiente/Activo/Cancelado)
 *   - CAE (text, disabled)
 *   - Enviar por mail (checkbox)
 *   - Template (combo, hidden by default)
 *
 * Toolbar buttons: Guardar, Eliminar, Imprimir
 * Embedded: ComprobanteItemGridView (items sub-grid)
 */
export class ComprobanteFormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Wait for the comprobante form to be visible */
  async waitForForm(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const form = ext.ComponentQuery.query('comprobanteformview')[0];
        return form && form.isVisible();
      },
      { timeout: 30_000, polling: 500 },
    );
  }

  // --- Field getters ---

  async getComprobanteNumber(): Promise<string> {
    return this.getComponentValue('_ncomprobante') ?? '';
  }

  async getTipoComprobante(): Promise<string> {
    return this.getComponentValue('cbc_ctipocbte') ?? '';
  }

  async getFecha(): Promise<string> {
    return this.getComponentValue('cbc_dfecha') ?? '';
  }

  async getEstado(): Promise<number> {
    return this.getComponentValue('cbc_cestado') ?? 0;
  }

  async getOrganizacion(): Promise<string> {
    return this.getDisplayValue('Organizacion');
  }

  async getCAE(): Promise<string> {
    return this.getComponentValue('cbc_ccae') ?? '';
  }

  async getImpuesto1(): Promise<number> {
    return this.getComponentValue('cbc_yimpuesto1') ?? 0;
  }

  async getImpuesto2(): Promise<number> {
    return this.getComponentValue('cbc_yimpuesto2') ?? 0;
  }

  async getImpuesto3(): Promise<number> {
    return this.getComponentValue('cbc_yimpuesto3') ?? 0;
  }

  // --- Field setters ---

  async selectTipoComprobante(displayValue: string): Promise<void> {
    await this.selectCombo('Tipo comprobante', displayValue);
  }

  async setFecha(dateStr: string): Promise<void> {
    await this.setComponentValue('cbc_dfecha', dateStr);
  }

  async selectEstado(displayValue: string): Promise<void> {
    await this.selectCombo('Estado', displayValue);
  }

  async selectCondicionPago(displayValue: string): Promise<void> {
    await this.selectCombo('Condicion de pago', displayValue);
  }

  async clickSelectOrganizacion(): Promise<void> {
    await this.clickButton('Seleccionar una organizacion');
    await this.page.waitForTimeout(1000);
  }

  async setPrefijo(value: string): Promise<void> {
    await this.setComponentValue('cbc_cprefijocbte', value);
  }

  async setNumero(value: number): Promise<void> {
    await this.setComponentValue('cbc_inumerocbte', value);
  }

  // --- Actions ---

  async save(): Promise<void> {
    await this.clickButton('Guardar');
    await waitForMask(this.page);
    await waitForAjaxComplete(this.page);
  }

  async delete(): Promise<void> {
    await this.clickButton('Eliminar');
    // Usually a confirmation dialog appears
    await this.page.waitForTimeout(500);
  }

  async confirmDelete(): Promise<void> {
    // Click "Sí" or "Yes" on the confirmation messagebox
    const yesBtn = this.page.locator('.x-message-box button:has-text("Sí"), .x-message-box button:has-text("Yes")').first();
    await yesBtn.click();
    await waitForAjaxComplete(this.page);
  }

  async print(): Promise<void> {
    await this.clickButton('Imprimir');
  }

  // --- Assertions ---

  /** Check if the form has a persisted record (ID > 0, not phantom) */
  async isPersisted(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!form || !form.record) return false;
      return !form.record.phantom && form.record.get('Id') > 0;
    });
  }

  /** Get the record ID */
  async getRecordId(): Promise<number> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!form || !form.record) return 0;
      return form.record.get('Id') || 0;
    });
  }

  /** Check if the items grid is enabled (it's disabled until first save) */
  async isItemsGridEnabled(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobanteitemsearchview')[0];
      return grid ? !grid.disabled : false;
    });
  }
}
