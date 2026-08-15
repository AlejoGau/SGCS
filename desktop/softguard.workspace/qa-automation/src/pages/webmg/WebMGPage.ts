import { Page } from '@playwright/test';
import * as fs from 'fs';
import { BasePage } from '../BasePage';
import { waitForExtReady, waitForAjaxComplete } from '../../helpers/extjs';
import { applyResourceOverrideRules } from '../../helpers/resource-override';

/**
 * Page Object for the WebMG module.
 *
 * Layout:
 *   North: moduletoolbar with buttons — Contratos, Comprobantes, Facturación, Cobranzas, Productos, Configuración
 *   Center: tabpanel (id='center') — tabs are added dynamically when toolbar buttons are clicked
 *
 * Default tabs on load: "Organizaciones", "Proveedores (Beta)"
 */
export class WebMGPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Check if the WebMG app is loaded (viewport + north toolbar + center tabpanel) */
  async isLoaded(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ComponentQuery) return false;
      const vp = ext.ComponentQuery.query('viewport')[0];
      const north = ext.ComponentQuery.query('#north')[0];
      const center = ext.getCmp('center');
      return !!(vp && north && center);
    });
  }

  /** Open the Comprobantes tab via the toolbar button (itemId='comprobantes') */
  async openComprobantes(): Promise<void> {
    await this._clickToolbarButton('comprobantes');
    await this._waitForTab('Comprobantes', 'comprobantegridview');
  }

  /** Open the Productos tab via the toolbar button (itemId='productos') */
  async openProductos(): Promise<void> {
    await this._clickToolbarButton('productos');
    await this._waitForTab('Productos');
  }

  /** Open a menu item by clicking a toolbar menu button then the sub-item */
  async openMenuItem(menuButtonText: string, menuItemId: string): Promise<void> {
    // Click the menu button to open its dropdown
    await this.page.evaluate((btnText: string) => {
      const ext = (window as any).Ext;
      const toolbar = ext.ComponentQuery.query('#north')[0];
      const btn = toolbar.items.getRange().find((b: any) => b.text === btnText);
      if (btn) btn.showMenu();
    }, menuButtonText);
    await this.page.waitForTimeout(300);

    // Click the menu item
    await this.page.evaluate((itemId: string) => {
      const ext = (window as any).Ext;
      const item = ext.ComponentQuery.query('#' + itemId)[0];
      if (item) item.fireEvent('click', item);
    }, menuItemId);
    await waitForAjaxComplete(this.page);
  }

  /** Open Facturación > Novedades wizard */
  async openFacturacionWizard(): Promise<void> {
    await this.openMenuItem('Facturación', 'facturadorwizard');
    await this.page.waitForFunction(() => {
      const ext = (window as any).Ext;
      const w = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      return w && w.isVisible();
    }, undefined, { timeout: 15_000, polling: 500 });
  }

  /** Open Cobranzas > Remesa Export */
  async openRemesaExport(): Promise<void> {
    await this.openMenuItem(' Cobranzas', 'remesaExport');
  }

  /** Get the list of currently open tab titles in the center panel */
  async getOpenTabs(): Promise<string[]> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const center = ext.getCmp('center');
      if (!center) return [];
      return center.items.getRange().map((t: any) => t.title || '');
    });
  }

  /** Switch to an already-open tab by its title */
  async activateTab(title: string): Promise<void> {
    await this.page.evaluate((t: string) => {
      const ext = (window as any).Ext;
      const center = ext.getCmp('center');
      const tab = center.items.getRange().find((item: any) => item.title === t);
      if (tab) center.setActiveTab(tab);
    }, title);
  }

  /** Double-click an organization row in the default "Organizaciones" tab to open its detail */
  async openOrganization(rowIndex: number): Promise<void> {
    await this.page.evaluate((idx: number) => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('organizationgridview')[0];
      if (!grid) throw new Error('Organizaciones grid not found');
      const record = grid.getStore().getAt(idx);
      if (!record) throw new Error('Organization row ' + idx + ' not found');
      grid.fireEvent('itemdblclick', grid.getView(), record, null, idx);
    }, rowIndex);
    await this.page.waitForTimeout(2000);
    await waitForAjaxComplete(this.page);
  }

  /** Wait for the Organizaciones grid store to finish its initial load */
  async waitForOrganizationsLoaded(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const grid = ext.ComponentQuery.query('organizationgridview')[0];
        if (!grid) return false;
        const store = grid.getStore();
        // Wait until the store has finished loading (isLoading=false) AND
        // has been loaded at least once (check totalCount or loaded flag)
        return store && !store.isLoading() && (store.loadCount > 0 || store.getCount() > 0 || store.getTotalCount() > 0);
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    );
  }

  /** Get organization names from the default Organizaciones grid */
  async getOrganizations(): Promise<string[]> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('organizationgridview')[0];
      if (!grid) return [];
      return grid.getStore().getRange().map((r: any) => r.get('Name') || '');
    });
  }

  // --- DK-1498: Local mode (sencha watch + resource-override to GCS) ---

  /** Collect console + page errors from the WebMG page (local mode). */
  collectConsoleErrors(): string[] {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    this.page.on('pageerror', (err) => {
      errors.push(`[PageError] ${err.message}`);
    });
    return errors;
  }

  /**
   * Navigate to the local WebMG app at /apps/WebMG/ with OAuth token + resource-override.
   * The AccessControl sencha watch (port 1841) maps the entire workspace, so /apps/WebMG/
   * is served from there too — no separate watch needed.
   */
  async gotoLocal(tokenFile: string, localPort = 1841): Promise<void> {
    if (!fs.existsSync(tokenFile)) {
      throw new Error(`Token file not found: ${tokenFile}`);
    }
    const token = fs.readFileSync(tokenFile, 'utf-8').trim();
    if (!token) throw new Error(`Token file is empty: ${tokenFile}`);
    
    function parseDesktopDataScript(scriptText: string): any | null {
      const match = scriptText.match(/var\s+desktopData\s*=\s*(\{[\s\S]*\});?/);
      if (!match) return null;
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
    
    const desktopDataUrl = `https://gcs.softguard.com/js/Desktop/getDesktopData.js?oauth_token=${encodeURIComponent(token)}`;
    const desktopDataResp = await fetch(desktopDataUrl, { method: 'GET', redirect: 'follow' });
    const desktopDataScript = await desktopDataResp.text();
    const desktopData = parseDesktopDataScript(desktopDataScript);
    const userData = desktopData?.infoUser || {};

    await this.page.addInitScript(
      ({ initialDesktopData, initialUserData }) => {
        (window as any).desktopData = initialDesktopData;
        (window as any)._UserData = initialUserData;
        (window as any).eval(`var _UserData = window._UserData; var desktopData = window.desktopData;`);
      },
      { initialDesktopData: desktopData, initialUserData: userData },
    );

    await applyResourceOverrideRules(this.page, token, localPort, false);

    await this.page.context().addCookies([{
      name: 'OAuth_Token',
      value: token,
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    }]);

    await this.page.goto('/apps/WebMG/', { waitUntil: 'domcontentloaded' });
    await waitForExtReady(this.page);
  }

  /** Wait for WebMG viewport (top-level app, no iframe) to be rendered locally. */
  async waitForReadyLocal(timeout = 180_000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        if (!ext || !ext.isReady || !ext.ComponentQuery) return false;
        const vp = ext.ComponentQuery.query('viewport')[0];
        return !!(vp && vp.rendered);
      },
      undefined,
      { timeout, polling: 500 },
    );
    await waitForAjaxComplete(this.page);
  }

  /**
   * Execute an AJAX request from the real ExtJS runtime while the app is loaded
   * locally with resource-override enabled.
   */
  async localAjax<T = any>(config: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    params?: Record<string, any>;
    jsonData?: any;
  }): Promise<{ status: number; ok: boolean; body: T | string | null; text: string }> {
    return await this.page.evaluate((options) => {
      const Ext = (window as any).Ext;

      return new Promise<any>((resolve) => {
        Ext.Ajax.request({
          url: options.url,
          method: options.method || (options.jsonData ? 'POST' : 'GET'),
          params: options.params,
          jsonData: options.jsonData,
          success: function(resp: any) {
            const text = resp && typeof resp.responseText === 'string'
              ? resp.responseText
              : '';
            let body: any = null;

            try {
              body = text ? Ext.decode(text) : null;
            } catch (_e) {
              body = text;
            }

            resolve({
              status: Number(resp && resp.status ? resp.status : 200),
              ok: true,
              body,
              text,
            });
          },
          failure: function(resp: any) {
            const text = resp && typeof resp.responseText === 'string'
              ? resp.responseText
              : '';
            let body: any = null;

            try {
              body = text ? Ext.decode(text) : null;
            } catch (_e) {
              body = text;
            }

            resolve({
              status: Number(resp && resp.status ? resp.status : 0),
              ok: false,
              body,
              text,
            });
          },
        });
      });
    }, config);
  }

  /**
   * DK-1498 — Open the real ContratoItemFormView programmatically inside an Ext.window.Window.
   * Mirrors what Common.controller.ContratoItemFormController does when "Nuevo item" is clicked.
   */
  async openContratoItemForm(idCliente: number, cnt_dinamico = 1): Promise<string> {
    return await this.page.evaluate(({ idCliente, cnt_dinamico }) => {
      const Ext = (window as any).Ext;

      // Plain object with .get() — avoids the Ext.data.Model field-registry pitfall
      const orgRecord = { get: (key: string) => (key === 'org_csymbol' ? 'ARS' : null) };

      let emptyRecord;
      try {
        emptyRecord = Ext.create('Common.model.ContratoItemModel', {});
      } catch (_e) {
        // Fall-back: define an inline model class so .getData() works in loadRecord
        if (!Ext.ClassManager.get('Dk1498.fakeContratoItemModel')) {
          Ext.define('Dk1498.fakeContratoItemModel', {
            extend: 'Ext.data.Model',
            fields: ['Id', 'Code', 'Description', 'VAT', 'Price', 'ProductId', 'mglp_idkey', 'Quantity', '_subTotal', '_VAT', 'Total', 'cbi_icantidad', 'cbi_iproducto'],
          });
        }
        emptyRecord = Ext.create('Dk1498.fakeContratoItemModel', {});
      }

      const formView = Ext.create('Common.view.ContratoItemFormView', {
        idCliente: idCliente,
        cnt_dinamico: cnt_dinamico,
        recordOrganizacion: orgRecord,
        record: emptyRecord,
      });
      const win = Ext.create('Ext.window.Window', {
        title: 'Item de contrato — DK-1498 UI test',
        width: 600,
        height: 540,
        modal: false,
        layout: 'fit',
        items: [formView],
        itemId: 'dk1498TestWindow',
      });
      win.show();
      return win.id;
    }, { idCliente, cnt_dinamico });
  }

  /**
   * DK-1520 — Open the real ContratoFormView in a window and read the
   * cnt_cantidad_auto combo state.
   */
  async openContratoForm(opts: {
    clienteId: number;
    orgId: number;
    organizationName?: string;
    cntCantidadAuto?: 0 | 1;
    cntDinamico?: 0 | 1;
  }): Promise<{ ok: boolean; comboValue: number | null; comboOptions: number[]; displayText: string | null; error?: string }> {
    return await this.page.evaluate((data) => {
      const Ext = (window as any).Ext;
      return new Promise<any>((resolve) => {
        Ext.require([
          'Common.model.crm_contratoModel',
          'Common.view.ContratoFormView',
        ], () => {
          try {
            const record = Ext.create('Common.model.crm_contratoModel', {
              Id: 0,
              Name: '',
              ObjectTypeId: 3148,
              ObjectTypeName: 'Order',
              cnt_idcliente: data.clienteId,
              cnt_estado: 1,
              cnt_fechaalta: new Date(),
              cnt_fechavto: Ext.Date.add(new Date(), Ext.Date.DAY, 30),
              cnt_org_fc: data.orgId,
              cnt_formapago: 0,
              cnt_tmp_id: 0,
              cnt_dinamico: data.cntDinamico ?? 0,
              cnt_cantidad_auto: data.cntCantidadAuto ?? 0,
              cnt_metadata: '',
            });

            const recordOrganizacion = {
              get: (key: string) => {
                const values: Record<string, any> = {
                  Id: data.orgId,
                  nombreOrganizacion: data.organizationName || 'Cliente DK-1520',
                  org_csymbol: 'ARS',
                };
                return values[key];
              },
            };

            const view = Ext.create('Common.view.ContratoFormView', {
              record,
              recordOrganizacion,
              clienteId: data.clienteId,
            });

            view.loadRecord(record);

            const win = Ext.create('Ext.window.Window', {
              title: 'Contrato — DK-1520 UI test',
              width: 1180,
              height: 860,
              modal: false,
              layout: 'fit',
              items: [view],
              itemId: 'dk1520ContratoTestWindow',
            });
            win.show();

            const combo = view.down('#cnt_cantidad_auto');
            const comboValue = combo ? combo.getValue() : null;
            const comboRecord = combo && combo.findRecordByValue
              ? combo.findRecordByValue(comboValue)
              : null;

            resolve({
              ok: !!combo,
              comboValue,
              comboOptions: combo
                ? combo.getStore().getRange().map((r: any) => r.get(combo.valueField))
                : [],
              displayText: comboRecord ? comboRecord.get(combo.displayField) : null,
            });
          } catch (err: any) {
            resolve({
              ok: false,
              comboValue: null,
              comboOptions: [],
              displayText: null,
              error: String(err && err.stack ? err.stack : err),
            });
          }
        });
      });
    }, opts);
  }

  /**
   * DK-1498 — drive the real banner / readOnly logic by invoking
   * ContratoItemFormController.onProductChanged with a fake product record.
   * The controller fires loadCantidadAfectada which hits /rest/search/MG_CuentasActivasCliente
   * (proxied to GCS by resource-override).
   */
  async selectProductWithCantidadAuto(productData: {
    Id: number;
    Code: string;
    Name: string;
    final_price: number;
    imp_nporcentaje: number;
    pro_cantidad_auto: number;
    mglp_idkey?: number;
  }): Promise<{ ok: boolean; error?: string; quantityReadOnly?: boolean; bannerHidden?: boolean }> {
    return await this.page.evaluate((data) => {
      try {
        const Ext = (window as any).Ext;
        const view = (Ext.ComponentQuery.query('contratoitemformview')[0]) as any;
        if (!view) throw new Error('contratoitemformview not found');

        let controller = null;
        const app = Ext.app.Application.instance;
        if (app && app.getController) {
          try {
            controller = app.getController('Common.controller.ContratoItemFormController');
          } catch (_e) { /* fall through */ }
        }
        if (!controller) {
          controller = Ext.create('Common.controller.ContratoItemFormController');
        }

        // Define a fake product-record class once
        if (!Ext.ClassManager.get('Dk1498.fakeProductRecord')) {
          Ext.define('Dk1498.fakeProductRecord', {
            extend: 'Ext.data.Model',
            fields: ['Id', 'Code', 'Name', 'final_price', 'imp_nporcentaje', 'pro_cantidad_auto', 'mglp_idkey', 'VAT'],
          });
        }
        const fakeRecord = Ext.create('Dk1498.fakeProductRecord', data);

        controller.onProductChanged(fakeRecord, view);

        const lbl = view.down('#cantidadAutoLabel');
        const qty = view.down('#quantityCombo');
        return {
          ok: true,
          quantityReadOnly: !!(qty && qty.readOnly),
          bannerHidden: !!(lbl && lbl.isHidden()),
        };
      } catch (err: any) {
        return { ok: false, error: String(err && err.stack ? err.stack : err) };
      }
    }, productData);
  }

  /**
   * DK-1498 — wait until banner is visible, Quantity is readOnly, and banner contains
   * "Cantidad afectada: <N>" (MG_CuentasActivasCliente resolved).
   */
  async waitForCantidadAutoBanner(timeoutMs = 30_000): Promise<{ text: string; quantityReadOnly: boolean; cuentasActivas: number | null; hasNumber: boolean }> {
    // Phase 1: wait for the banner to be visible AND quantity readOnly (regardless of N).
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const view = ext.ComponentQuery.query('contratoitemformview')[0];
        if (!view) return false;
        const lbl = view.down('#cantidadAutoLabel');
        const qty = view.down('#quantityCombo');
        if (!lbl || !qty) return false;
        return !lbl.isHidden() && qty.readOnly === true;
      },
      undefined,
      { timeout: timeoutMs, polling: 250 },
    );

    // Phase 2: optionally wait up to 10s for "Cantidad afectada: N" (REST may resolve later).
    try {
      await this.page.waitForFunction(
        () => {
          const ext = (window as any).Ext;
          const view = ext.ComponentQuery.query('contratoitemformview')[0];
          const lbl = view?.down('#cantidadAutoLabel');
          const html = lbl?.getValue ? (lbl.getValue() || '') : '';
          return /Cantidad afectada/.test(html);
        },
        undefined,
        { timeout: 10_000, polling: 250 },
      );
    } catch (_e) {
      // REST not resolved — banner still shows generic auto text. Don't fail; let caller decide.
    }

    return await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext.ComponentQuery.query('contratoitemformview')[0];
      const lbl = view.down('#cantidadAutoLabel');
      const qty = view.down('#quantityCombo');
      const html = lbl.getValue() || '';
      const m = html.match(/<b>(\d+)<\/b>/);
      return {
        text: html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
        quantityReadOnly: !!qty.readOnly,
        cuentasActivas: m ? parseInt(m[1], 10) : null,
        hasNumber: m !== null,
      };
    });
  }

  /**
   * DK-1498 Caso A — Open STProductosFormView with a given pro_cantidad_auto value.
   * Renders the form inside a window so we can screenshot the real combo + label widget.
   */
  async openProductoForm(opts: {
    proCantidadAuto: 0 | 1;
    code?: string;
    name?: string;
    price?: number;
  }): Promise<{ comboValue: number | null; comboOptions: number[]; displayText: string | null }> {
    return await this.page.evaluate((data) => {
      const Ext = (window as any).Ext;
      const record = Ext.create('Common.model.TablasProductosModel', {
        Id: 998001,
        Code: data.code || 'DK1498-A',
        Name: data.name || 'Producto DK-1498 Caso A',
        Price: data.price ?? 1500,
        Weight: 0,
        Status: '1',
        pro_itipo: 2,
        pro_currency: 'ARS',
        pro_cantidad_auto: data.proCantidadAuto,
      });

      const formView = Ext.widget('stproductosformview', {
        record,
        title: 'Producto — DK-1498 UI test (Caso A)',
      });
      const win = Ext.create('Ext.window.Window', {
        title: 'Configuración de producto — DK-1498 Caso A',
        width: 720,
        height: 600,
        modal: false,
        layout: 'fit',
        items: [formView],
        itemId: 'dk1498ProductoTestWindow',
      });
      win.show();

      const combo = formView.down('#proCantidadAuto');
      let displayText: string | null = null;
      if (combo) {
        const v = combo.getValue();
        const rec = combo.findRecordByValue ? combo.findRecordByValue(v) : null;
        displayText = rec ? rec.get(combo.displayField) : null;
      }
      return {
        comboValue: combo ? combo.getValue() : null,
        comboOptions: combo ? combo.getStore().getRange().map((r: any) => r.get(combo.valueField)) : [],
        displayText,
      };
    }, opts);
  }

  /**
   * DK-1498 Caso C — Open the FacturacionAutomaticaWizardView programmatically and
   * read the state of the wizard cards so we can screenshot the real "Configuración de facturación".
   */
  async openFacturacionWizardLocal(): Promise<{ ok: boolean; cards: string[]; activeCard: string | null; error?: string }> {
    return await this.page.evaluate(() => {
      try {
        const Ext = (window as any).Ext;
        const view = Ext.widget('facturacionautomaticawizardview');
        const win = Ext.create('Ext.window.Window', {
          title: 'Facturación automática — DK-1498 UI test (Caso C)',
          width: 820,
          height: 620,
          modal: false,
          layout: 'fit',
          items: [view],
          itemId: 'dk1498WizardTestWindow',
        });
        win.show();

        const cardsPanel = view.down('#cardspanel');
        const cards = cardsPanel
          ? cardsPanel.items.getRange().map((c: any) => c.itemId || c.id)
          : [];
        const active = cardsPanel ? cardsPanel.getLayout().getActiveItem() : null;
        return {
          ok: true,
          cards,
          activeCard: active ? (active.itemId || active.id) : null,
        };
      } catch (err: any) {
        return { ok: false, cards: [], activeCard: null, error: String(err && err.stack ? err.stack : err) };
      }
    });
  }

  /**
   * DK-1498 Caso C-real — open the wizard and wait until card-0 has the orgs +
   * tipo de comprobante combos populated by the controller's initview.
   */
  async openFacturacionWizardReal(): Promise<{ ok: boolean; orgValue: any; orgText: string | null; comprobanteValue: any; comprobanteText: string | null; error?: string }> {
    await this.page.evaluate(() => {
      const Ext = (window as any).Ext;
      const view = Ext.create('WebMG.view.FacturacionAutomaticaWizardView');
      const win = Ext.create('Ext.window.Window', {
        title: 'Facturación automática — DK-1498 UI test (real flow)',
        width: 860,
        height: 640,
        modal: false,
        layout: 'fit',
        items: [view],
        itemId: 'dk1498WizardRealWindow',
      });
      win.show();
    });

    // Wait until both combos in card-0 have a value (initview's stores have loaded).
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const view = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
        if (!view) return false;
        const org = view.down('#organizacionfacturadora');
        const cbt = view.down('#cbc_ctipocbte');
        return !!(org && cbt && org.getValue() && cbt.getValue());
      },
      undefined,
      { timeout: 30_000, polling: 300 },
    );

    return await this.page.evaluate(() => {
      try {
        const Ext = (window as any).Ext;
        const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
        const orgCombo = view.down('#organizacionfacturadora');
        const cbtCombo = view.down('#cbc_ctipocbte');
        const orgValue = orgCombo.getValue();
        const cbtValue = cbtCombo.getValue();
        const orgRec = orgCombo.findRecordByValue ? orgCombo.findRecordByValue(orgValue) : null;
        const cbtRec = cbtCombo.findRecordByValue ? cbtCombo.findRecordByValue(cbtValue) : null;
        return {
          ok: true,
          orgValue,
          orgText: orgRec ? orgRec.get(orgCombo.displayField) : null,
          comprobanteValue: cbtValue,
          comprobanteText: cbtRec ? cbtRec.get(cbtCombo.displayField) : null,
        };
      } catch (err: any) {
        return { ok: false, orgValue: null, orgText: null, comprobanteValue: null, comprobanteText: null, error: String(err) };
      }
    });
  }

  async wizardClickMoveNext(): Promise<string | null> {
    return await this.page.evaluate(() => {
      const Ext = (window as any).Ext;
      const btn = Ext.getCmp('move-next');
      if (btn && !btn.isDisabled()) btn.handler.call(btn, btn);
      const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      const active = view.down('#cardspanel').getLayout().getActiveItem();
      return active ? (active.itemId || active.id) : null;
    });
  }

  /**
   * Caso C-real — click "Generar Novedades" (#contratoAnovedad) which calls
   * /rest/search/MG_ContratosGenerarNovedades?idorganizacion=X to materialize
   * pending novedades from active contracts. Waits for the AJAX response.
   */
  async wizardClickGenerarNovedades(): Promise<{ status: number; ok: boolean; bodyPreview: string }> {
    const responsePromise = this.page.waitForResponse(
      (resp) => /MG_ContratosGenerarNovedades/i.test(resp.url()),
      { timeout: 60_000 },
    );

    await this.page.evaluate(() => {
      const Ext = (window as any).Ext;
      const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      const btn = view.down('#contratoAnovedad');
      if (btn) btn.fireEvent('click', btn);
    });

    const resp = await responsePromise;
    let body = '';
    try { body = (await resp.text()).slice(0, 400); } catch (_e) { /* ignore */ }
    return { status: resp.status(), ok: resp.ok(), bodyPreview: body };
  }

  /** Switch the wizard to a specific organizacion facturadora by name match. */
  async wizardSelectOrganizacionByName(needle: string): Promise<{ ok: boolean; orgValue: any; orgText: string | null }> {
    return await this.page.evaluate((q: string) => {
      const Ext = (window as any).Ext;
      const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      const combo = view.down('#organizacionfacturadora');
      const store = combo.getStore();
      const re = new RegExp(q, 'i');
      const rec = store.getRange().find((r: any) => re.test(r.get(combo.displayField)));
      if (!rec) return { ok: false, orgValue: null, orgText: null };
      combo.setValue(rec);
      // setValue normally fires change; ensure controller reacts
      combo.fireEvent('change', combo, rec.get(combo.valueField));
      return { ok: true, orgValue: rec.get(combo.valueField), orgText: rec.get(combo.displayField) };
    }, needle);
  }

  async wizardListOrganizaciones(): Promise<Array<{ id: any; name: string }>> {
    return await this.page.evaluate(() => {
      const Ext = (window as any).Ext;
      const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      const combo = view.down('#organizacionfacturadora');
      const store = combo.getStore();
      return store.getRange().map((r: any) => ({
        id: r.get(combo.valueField),
        name: r.get(combo.displayField),
      }));
    });
  }

  /**
   * Caso C-real — click #buscar in card-1 and wait for the stats display fields
   * (cantidadClientes / cantidadDeNovedades) to be populated.
   */
  async wizardClickBuscar(): Promise<{ cantidadClientes: number; cantidadDeNovedades: number; cantidadProvincias: number; cantidadCategoriasImpositivas: number }> {
    await this.page.evaluate(() => {
      const Ext = (window as any).Ext;
      const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      const btn = view.down('#buscar');
      if (btn) btn.fireEvent('click', btn);
    });

    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const view = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
        const cli = view?.down('#cantidadClientes');
        // displayfield value "" until set; treat any non-undefined as populated
        return cli && cli.getValue() !== undefined && cli.getValue() !== '';
      },
      undefined,
      { timeout: 30_000, polling: 300 },
    );

    return await this.page.evaluate(() => {
      const Ext = (window as any).Ext;
      const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      const num = (sel: string) => {
        const f = view.down(sel);
        const v = f ? f.getValue() : 0;
        const n = parseInt(v, 10);
        return Number.isNaN(n) ? 0 : n;
      };
      return {
        cantidadClientes: num('#cantidadClientes'),
        cantidadDeNovedades: num('#cantidadDeNovedades'),
        cantidadProvincias: num('#cantidadProvincias'),
        cantidadCategoriasImpositivas: num('#cantidadCategoriasImpositivas'),
      };
    });
  }

  async wizardGetCantidadPreview(useFinalCard = false): Promise<{
    cantidadTotalCalculada: number;
    cantidadContratosAutomaticos: number;
    cantidadContratosSinCuentas: number;
  }> {
    return await this.page.evaluate((isFinalCard) => {
      const Ext = (window as any).Ext;
      const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      const prefix = isFinalCard ? '#fin_' : '#';
      const num = (suffix: string) => {
        const field = view?.down(prefix + suffix);
        const value = field ? field.getValue() : 0;
        const parsed = parseInt(value, 10);
        return Number.isNaN(parsed) ? 0 : parsed;
      };

      return {
        cantidadTotalCalculada: num('cantidadTotalCalculada'),
        cantidadContratosAutomaticos: num('cantidadContratosAutomaticos'),
        cantidadContratosSinCuentas: num('cantidadContratosSinCuentas'),
      };
    }, useFinalCard);
  }

  /**
   * Caso C-real — click #facturar in card-2 and wait for the AJAX request to
   * /rest/search/MG_LoteFacturasByFilters to complete. Returns the response status.
   */
  async wizardClickFacturar(): Promise<{ status: number; ok: boolean; url: string; bodyPreview: string }> {
    const responsePromise = this.page.waitForResponse(
      (resp) => /MG_LoteFacturasByFilters/i.test(resp.url()),
      { timeout: 60_000 },
    );

    await this.page.evaluate(() => {
      const Ext = (window as any).Ext;
      const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      const btn = view.down('#facturar');
      if (btn) btn.fireEvent('click', btn);
    });

    const resp = await responsePromise;
    let body = '';
    try {
      body = (await resp.text()).slice(0, 400);
    } catch (_e) { /* ignore */ }

    return {
      status: resp.status(),
      ok: resp.ok(),
      url: resp.url(),
      bodyPreview: body,
    };
  }

  // --- Private helpers ---

  private async _clickToolbarButton(itemId: string): Promise<void> {
    await this.page.evaluate((id: string) => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('#' + id)[0];
      if (!btn) throw new Error('Toolbar button #' + id + ' not found');
      btn.fireEvent('click', btn);
    }, itemId);
  }

  private async _waitForTab(title: string, xtype?: string): Promise<void> {
    const query = xtype || 'panel';
    await this.page.waitForFunction(
      ({ t, q }: { t: string; q: string }) => {
        const ext = (window as any).Ext;
        const center = ext.getCmp('center');
        if (!center) return false;
        const tab = center.items.getRange().find((item: any) => item.title === t);
        return tab && tab.isVisible();
      },
      { t: title, q: query },
      { timeout: 15_000, polling: 500 },
    );
    await waitForAjaxComplete(this.page);
  }
}
