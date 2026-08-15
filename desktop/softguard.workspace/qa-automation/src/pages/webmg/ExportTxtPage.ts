import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { waitForAjaxComplete } from '../../helpers/extjs';

export class ExportTxtPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForForm(timeout = 30_000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
        return !!(view && view.isVisible && view.isVisible());
      },
      undefined,
      { timeout, polling: 300 },
    );
    await waitForAjaxComplete(this.page);
  }

  async waitForOrganizationsLoaded(timeout = 30_000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
        const combo = view?.down('#organizacionfacturadora');
        const store = combo?.getStore?.();
        return !!(combo && store && !store.isLoading() && store.getCount() > 0);
      },
      undefined,
      { timeout, polling: 300 },
    );
    await waitForAjaxComplete(this.page);
  }

  async waitForDependentFiltersReady(timeout = 30_000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
        const tipo = view?.down('#tipocomprobante');
        const categoria = view?.down('#categoriaiva');
        const tipoStore = tipo?.getStore?.();
        const categoriaStore = categoria?.getStore?.();
        return !!(
          tipo && categoria &&
          tipo.disabled === false && categoria.disabled === false &&
          tipoStore && categoriaStore &&
          !tipoStore.isLoading() && !categoriaStore.isLoading()
        );
      },
      undefined,
      { timeout, polling: 300 },
    );
    await waitForAjaxComplete(this.page);
  }

  async getOrganizations(): Promise<Array<{ id: any; name: string }>> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const combo = view?.down('#organizacionfacturadora');
      const store = combo?.getStore?.();
      if (!combo || !store) return [];
      return store.getRange().map((record: any) => ({
        id: record.get(combo.valueField),
        name: record.get(combo.displayField),
      }));
    });
  }

  async getTipoOptions(): Promise<Array<{ id: any; name: string }>> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const combo = view?.down('#tipocomprobante');
      const store = combo?.getStore?.();
      if (!combo || !store) return [];
      return store.getRange().map((record: any) => ({
        id: record.get(combo.valueField),
        name: record.get(combo.displayField),
      }));
    });
  }

  async getCategoriaOptions(): Promise<Array<{ id: any; name: string }>> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const combo = view?.down('#categoriaiva');
      const store = combo?.getStore?.();
      if (!combo || !store) return [];
      return store.getRange().map((record: any) => ({
        id: record.get(combo.valueField),
        name: record.get(combo.displayField),
      }));
    });
  }

  async getState(): Promise<{
    orgValue: any;
    periodo: string | null;
    tipoDisabled: boolean;
    categoriaDisabled: boolean;
    exportDisabled: boolean;
    orgCount: number;
    tipoCount: number;
    categoriaCount: number;
  }> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const org = view?.down('#organizacionfacturadora');
      const periodo = view?.down('#periodo');
      const tipo = view?.down('#tipocomprobante');
      const categoria = view?.down('#categoriaiva');
      const exportBtn = view?.down('#export');
      const periodoValue = periodo?.getValue?.();

      return {
        orgValue: org?.getValue?.() ?? null,
        periodo: periodoValue ? ext.Date.format(periodoValue, 'Ym') : null,
        tipoDisabled: !!tipo?.disabled,
        categoriaDisabled: !!categoria?.disabled,
        exportDisabled: !!exportBtn?.disabled,
        orgCount: org?.getStore?.()?.getCount?.() ?? 0,
        tipoCount: tipo?.getStore?.()?.getCount?.() ?? 0,
        categoriaCount: categoria?.getStore?.()?.getCount?.() ?? 0,
      };
    });
  }

  async selectOrganization(orgId: any): Promise<void> {
    await this.page.evaluate((value: any) => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const combo = view?.down('#organizacionfacturadora');
      if (!combo) throw new Error('organizacionfacturadora combo not found');
      combo.setValue(value);
      combo.fireEvent('change', combo, value);
    }, orgId);
    await waitForAjaxComplete(this.page);
  }

  async setPeriodo(periodoYyyymm: string): Promise<void> {
    await this.page.evaluate((value: string) => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const field = view?.down('#periodo');
      if (!field) throw new Error('periodo field not found');
      const year = parseInt(value.substring(0, 4), 10);
      const month = parseInt(value.substring(4, 6), 10) - 1;
      const date = new Date(year, month, 1);
      field.setValue(date);
      field.fireEvent('change', field, date);
    }, periodoYyyymm);
    await waitForAjaxComplete(this.page);
  }

  async enableWindowOpenCapture(): Promise<void> {
    await this.page.evaluate(() => {
      const win = window as any;
      if (win.__exportTxtOpenCaptureEnabled) {
        win.__exportTxtOpenedUrls = [];
        return;
      }

      win.__exportTxtOpenedUrls = [];
      win.__exportTxtOriginalOpen = window.open.bind(window);
      window.open = function(url?: string | URL, target?: string, features?: string) {
        win.__exportTxtOpenedUrls.push(String(url || ''));
        return null;
      } as typeof window.open;
      win.__exportTxtOpenCaptureEnabled = true;
    });
  }

  async clickExport(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const btn = view?.down('#export');
      if (!btn) throw new Error('export button not found');
      btn.fireEvent('click', btn);
    });
    await waitForAjaxComplete(this.page);
  }

  async waitForOpenedUrl(timeout = 15_000): Promise<string> {
    await this.page.waitForFunction(
      () => {
        const win = window as any;
        return Array.isArray(win.__exportTxtOpenedUrls) && win.__exportTxtOpenedUrls.length > 0;
      },
      undefined,
      { timeout, polling: 200 },
    );

    return this.page.evaluate(() => {
      const win = window as any;
      return win.__exportTxtOpenedUrls[win.__exportTxtOpenedUrls.length - 1] || '';
    });
  }
}
