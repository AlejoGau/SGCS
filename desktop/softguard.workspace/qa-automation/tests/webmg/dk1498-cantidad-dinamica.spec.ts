import { Page } from '@playwright/test';
import * as path from 'path';
import { test, expect } from '../../src/fixtures/auth.fixture';

const SCREENSHOTS_DIR = path.resolve(__dirname, '..', '..', 'reports', 'screenshots');

async function requireDk1498Classes(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    return new Promise<void>((resolve) => {
      ext.require([
        'Common.model.TablasProductosModel',
        'Common.model.TablasProductosSearchModel',
        'Common.model.ProductSearchModel',
        'Common.model.ContratoItemModel',
        'Common.view.STProductosFormView',
        'Common.view.ContratoItemFormView',
        'Common.controller.ContratoItemFormController',
      ], () => resolve());
    });
  });
}

async function destroyOverlay(page: Page): Promise<void> {
  await page.evaluate(() => {
    const form = (window as any).__dk1498Form;
    if (form && !form.destroyed) form.destroy();
    document.getElementById('dk1498-overlay')?.remove();
    delete (window as any).__dk1498Form;
  });
}

async function renderContratoItem(page: Page, cantidadAuto: 0 | 1): Promise<void> {
  await page.evaluate((auto) => {
    const ext = (window as any).Ext;
    document.getElementById('dk1498-overlay')?.remove();

    const overlay = document.createElement('div');
    overlay.id = 'dk1498-overlay';
    overlay.style.cssText = [
      'position:fixed',
      'top:72px',
      'right:24px',
      'z-index:99999',
      'background:#fff',
      'border:2px solid #1565c0',
      'padding:12px',
      'width:460px',
      'box-shadow:0 4px 20px rgba(0,0,0,.25)',
    ].join(';');
    document.body.appendChild(overlay);

    const record = ext.create('Common.model.ContratoItemModel', {
      Id: 1498,
      ProductId: 176,
      Description: auto ? 'Producto con cantidad auto' : 'Producto manual',
      Code: auto ? 'AUTO' : 'MANUAL',
      Price: 500,
      Quantity: 3,
      VAT: 21,
    });

    const form = ext.widget('contratoitemformview', {
      record,
      renderTo: overlay,
      recordOrganizacion: { get: (name: string) => name === 'org_csymbol' ? '$' : 'ARS' },
    });
    form.loadRecord(record);

    const ctrlClass = ext.ClassManager.get('Common.controller.ContratoItemFormController');
    const product = ext.create('Common.model.ProductSearchModel', {
      Id: 176,
      Name: record.get('Description'),
      Code: record.get('Code'),
      final_price: 500,
      imp_nporcentaje: 21,
      mglp_idkey: 1,
      pro_cantidad_auto: auto,
    });

    const controller = {
      calculateTotal: function() {},
      applyCantidadAutoState: ctrlClass.prototype.applyCantidadAutoState,
      getCantidadAutoText: ctrlClass.prototype.getCantidadAutoText,
      loadCantidadAfectada: function() {},
    };
    ctrlClass.prototype.onProductChanged.call(controller, product, form);
    (window as any).__dk1498Form = form;
  }, cantidadAuto);
}

test.describe('DK-1498 cantidad dinamica @dk-1498', () => {
  test.beforeEach(async ({ page, navigateToApp }) => {
    await navigateToApp('/apps/WebMG/');
    await requireDk1498Classes(page);
  });

  test.afterEach(async ({ page }) => {
    await destroyOverlay(page);
  });

  test('models expose pro_cantidad_auto in product edit/search flows', async ({ page }) => {
    const fields = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const fieldNames = (className: string) => {
        const model = ext.ClassManager.get(className);
        return model.getFields().map((field: any) => field.name);
      };

      return {
        tablas: fieldNames('Common.model.TablasProductosModel'),
        tablasSearch: fieldNames('Common.model.TablasProductosSearchModel'),
        productSearch: fieldNames('Common.model.ProductSearchModel'),
      };
    });

    expect(fields.tablas).toContain('pro_cantidad_auto');
    expect(fields.tablasSearch).toContain('pro_cantidad_auto');
    expect(fields.productSearch).toContain('pro_cantidad_auto');
  });

  test('product form shows and binds Cantidad automatica', async ({ page }) => {
    const result = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const overlay = document.createElement('div');
      overlay.id = 'dk1498-overlay';
      overlay.style.cssText = 'position:fixed;top:72px;right:24px;z-index:99999;background:#fff;border:2px solid #1565c0;padding:12px;width:520px;';
      document.body.appendChild(overlay);

      const record = ext.create('Common.model.TablasProductosModel', {
        Id: 176,
        Code: 'DK1498',
        Name: 'Producto DK-1498',
        Price: 100,
        Weight: 0,
        Status: '1',
        pro_itipo: 2,
        pro_currency: 'ARS',
        pro_cantidad_auto: 1,
      });

      const form = ext.widget('stproductosformview', { record, renderTo: overlay });
      const combo = form.down('#proCantidadAuto');
      (window as any).__dk1498Form = form;

      return {
        exists: !!combo,
        value: combo ? combo.getValue() : null,
        options: combo ? combo.getStore().getRange().map((r: any) => r.get(combo.valueField)) : [],
      };
    });

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1498-producto-cantidad-automatica.png'),
      fullPage: false,
    });

    expect(result.exists).toBe(true);
    expect(result.value).toBe(1);
    expect(result.options).toEqual(expect.arrayContaining([0, 1]));
  });

  test('manual product keeps Quantity editable and hides the auto message', async ({ page }) => {
    await renderContratoItem(page, 0);

    const state = await page.evaluate(() => {
      const form = (window as any).__dk1498Form;
      const quantity = form.down('#quantityCombo');
      const label = form.down('#cantidadAutoLabel');
      return {
        readOnly: quantity.readOnly === true,
        labelVisible: label ? label.isVisible() : false,
      };
    });

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1498-contrato-item-manual.png'),
      fullPage: false,
    });

    expect(state.readOnly).toBe(false);
    expect(state.labelVisible).toBe(false);
  });

  test('automatic product locks Quantity and shows the active-account message', async ({ page }) => {
    await renderContratoItem(page, 1);

    const state = await page.evaluate(() => {
      const form = (window as any).__dk1498Form;
      const quantity = form.down('#quantityCombo');
      const label = form.down('#cantidadAutoLabel');
      return {
        readOnly: quantity.readOnly === true,
        labelVisible: label ? label.isVisible() : false,
        labelText: label ? label.getValue() : '',
      };
    });

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1498-contrato-item-auto-locked.png'),
      fullPage: false,
    });

    expect(state.readOnly).toBe(true);
    expect(state.labelVisible).toBe(true);
    expect(state.labelText).toContain('Cantidad calculada');
  });

  test('opening an existing contract item loads product cantidad mode before editing', async ({ page }) => {
    const state = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const overlay = document.createElement('div');
      overlay.id = 'dk1498-overlay';
      overlay.style.cssText = 'position:fixed;top:72px;right:24px;z-index:99999;background:#fff;border:2px solid #1565c0;padding:12px;width:460px;';
      document.body.appendChild(overlay);

      const item = ext.create('Common.model.ContratoItemModel', {
        Id: 1498,
        ProductId: 176,
        Description: 'Producto existente',
        Code: 'AUTO',
        Price: 500,
        Quantity: 1,
        VAT: 21,
      });
      const form = ext.widget('contratoitemformview', { record: item, renderTo: overlay });
      form.loadRecord(item);

      const ctrlClass = ext.ClassManager.get('Common.controller.ContratoItemFormController');
      const originalCreate = ext.create;
      ext.create = function(nameOrConfig: any, config: any) {
        if (nameOrConfig === 'Ext.data.Store' && config && config.model) {
          return {
            load: function(cfg: any) {
              const product = ext.create('Common.model.ProductSearchModel', {
                Id: 176,
                pro_cantidad_auto: 1,
              });
              cfg.callback.call(cfg.scope, [product], null, true);
            },
          };
        }
        return originalCreate.apply(ext, arguments as any);
      };
      const controller = {
        applyCantidadAutoState: ctrlClass.prototype.applyCantidadAutoState,
        getCantidadAutoText: ctrlClass.prototype.getCantidadAutoText,
        loadCantidadAfectada: function() {},
        getProductSearchModelModel: function() {
          return ext.ClassManager.get('Common.model.ProductSearchModel');
        },
      };

      ctrlClass.prototype.loadProductCantidadAuto.call(controller, form);
      ext.create = originalCreate;
      (window as any).__dk1498Form = form;

      return {
        readOnly: form.down('#quantityCombo').readOnly === true,
        labelVisible: form.down('#cantidadAutoLabel').isVisible(),
      };
    });

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1498-contrato-item-existing-load.png'),
      fullPage: false,
    });

    expect(state.readOnly).toBe(true);
    expect(state.labelVisible).toBe(true);
  });
});
