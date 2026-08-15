import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { waitForAjaxComplete, waitForExtComponent } from '../../helpers/extjs';

/**
 * Page Object for the "Configuración de Factura" fieldset
 * inside MoneyGuardOrganizacionFormView.
 *
 * DK-1493: Fieldset itemId='facturaConfig', collapsed by default.
 * Contains: observaciones_template, footer_fijo, factura_logo_display,
 *           mostrar_qr_afip, payment integrations, and related buttons.
 */
export class OrgFacturaConfigPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Wait for the MoneyGuardOrganizacionFormView to be visible */
  async waitForOrgForm(): Promise<void> {
    try {
      await this.page.waitForFunction(
        () => {
          const ext = (window as any).Ext;
          const form = ext?.ComponentQuery?.query('moneyguardorganizacionformview')[0];
          return !!(form && form.isVisible && form.isVisible());
        },
        undefined,
        { timeout: 30_000, polling: 500 },
      );
    } catch (e) {
      const state = await this.page.evaluate(() => {
        const ext = (window as any).Ext;
        const forms = ext?.ComponentQuery?.query('moneyguardorganizacionformview') || [];
        const wins = ext?.ComponentQuery?.query('window') || [];
        const grids = ext?.ComponentQuery?.query('moneyguardorganizaciongridview') || [];
        const anyWidget = ext?.ComponentQuery?.query('#facturaConfig') || [];
        return {
          formCount: forms.length,
          formsVisible: forms.map((f: any) => ({
            id: f.id,
            visible: f.isVisible(),
            rendered: f.rendered,
            destroyed: f.destroyed,
          })),
          windowCount: wins.length,
          windowTitles: wins.map((w: any) => `${w.title} (visible=${w.isVisible()})`),
          gridCount: grids.length,
          facturaConfigCount: anyWidget.length,
        };
      });
      console.log('[DIAGNOSTIC] waitForOrgForm state:', JSON.stringify(state));
      throw e;
    }

    await waitForAjaxComplete(this.page);
  }

  /** Expand the "Configuración de Factura" fieldset (collapsed by default) */
  async expandFieldset(): Promise<void> {
    const expanded = await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const fs = ext.ComponentQuery.query('#facturaConfig')[0];
      if (!fs) {
        throw new Error('facturaConfig fieldset not found');
      }

      if (fs.collapsed) {
        fs.expand();
        return false;
      }

      return true;
    });

    if (!expanded) {
      await this.page.waitForTimeout(500);
    }

    await waitForExtComponent(this.page, 'observaciones_template');
  }

  /** Collapse the fieldset */
  async collapseFieldset(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const fs = ext.ComponentQuery.query('#facturaConfig')[0];
      if (fs && !fs.collapsed) {
        fs.collapse();
      }
    });
  }

  /** Check if the fieldset is expanded */
  async isFieldsetExpanded(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const fs = ext.ComponentQuery.query('#facturaConfig')[0];
      return fs ? !fs.collapsed : false;
    });
  }

  // --- Field getters ---

  async getObservaciones(): Promise<string> {
    return (await this.getComponentValue('observaciones_template')) ?? '';
  }

  async getFooterFijo(): Promise<string> {
    return (await this.getComponentValue('footer_fijo')) ?? '';
  }

  async getMostrarQrAfip(): Promise<boolean> {
    return (await this.getComponentValue('mostrar_qr_afip')) ?? false;
  }

  async getLogoDisplay(): Promise<string> {
    return (await this.getComponentValue('factura_logo_display')) ?? '';
  }

  // --- Field setters ---

  async setObservaciones(value: string): Promise<void> {
    await this.setComponentValue('observaciones_template', value);
  }

  async setFooterFijo(value: string): Promise<void> {
    await this.setComponentValue('footer_fijo', value);
  }

  async setMostrarQrAfip(checked: boolean): Promise<void> {
    await this.setComponentValue('mostrar_qr_afip', checked);
  }

  // --- Insertar Variable ---

  async clickInsertarVariable(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('moneyguardorganizacionformview button[action=insertVariable]')[0];
      if (!btn) {
        throw new Error('Insertar Variable button not found');
      }

      btn.fireEvent('click', btn);
    });

    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const menus = ext.ComponentQuery.query('menu{isVisible()}');
        return menus.length > 0;
      },
      undefined,
      { timeout: 5_000 },
    );
  }

  async selectVariable(category: string, variableText: string): Promise<void> {
    await this.page.evaluate(
      ({ cat, text }) => {
        const ext = (window as any).Ext;
        const menus = ext.ComponentQuery.query('menu{isVisible()}');
        const topMenu = menus[0];
        if (!topMenu) {
          throw new Error('No visible menu found');
        }

        const catItem = topMenu.items.getRange().find(
          (i: any) => i.text && i.text.indexOf(cat) !== -1,
        );
        if (!catItem) {
          throw new Error(`Category "${cat}" not found in menu`);
        }

        catItem.activated = true;
        const subMenu = catItem.menu;
        if (!subMenu) {
          throw new Error(`No submenu for category "${cat}"`);
        }

        subMenu.show();

        const varItem = subMenu.items.getRange().find(
          (i: any) => i.text && i.text.indexOf(text) !== -1,
        );
        if (!varItem) {
          throw new Error(`Variable "${text}" not found in submenu`);
        }

        if (varItem.handler) {
          varItem.handler.call(varItem.scope || varItem, varItem);
        } else {
          varItem.fireEvent('click', varItem);
        }

        topMenu.hide();
      },
      { cat: category, text: variableText },
    );
  }

  async isMenuVisible(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const menus = ext.ComponentQuery.query('menu{isVisible()}');
      return menus.length > 0;
    });
  }

  // --- Preview ---

  async clickPreview(waitForContent: boolean = true): Promise<void> {
    const buttonDomId = await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('moneyguardorganizacionformview button[action=previewFactura]')[0];
      if (!btn) {
        throw new Error('Preview Factura button not found');
      }

      const dom = btn.getEl?.()?.dom || btn.el?.dom;
      if (dom?.scrollIntoView) {
        dom.scrollIntoView({ block: 'center', inline: 'nearest' });
      }

      return dom?.id || '';
    });

    if (buttonDomId) {
      await this.page.locator(`#${buttonDomId}`).click();
    } else {
      await this.page.evaluate(() => {
        const ext = (window as any).Ext;
        const btn = ext.ComponentQuery.query('moneyguardorganizacionformview button[action=previewFactura]')[0];
        if (!btn) {
          throw new Error('Preview Factura button not found');
        }

        btn.fireEvent('click', btn);
      });
    }

    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const wins = ext.ComponentQuery.query('window{isVisible()}');
        return wins.some((w: any) => w.title && w.title.indexOf('Preview') !== -1);
      },
      undefined,
      { timeout: 10_000 },
    );

    if (!waitForContent) {
      return;
    }

    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const wins = ext.ComponentQuery.query('window{isVisible()}');
        const previewWin = wins.find((w: any) => w.title && w.title.indexOf('Preview') !== -1);
        if (!previewWin) {
          return false;
        }

        const iframe = previewWin.el?.dom?.querySelector('iframe');
        const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
        if (doc?.body?.innerText) {
          return doc.body.innerText.length > 100;
        }

        const panel = previewWin.down('panel');
        const html = panel?.body?.dom?.innerText || '';
        return html.length > 20;
      },
      undefined,
      { timeout: 20_000, polling: 500 },
    );
  }

  async getPreviewHtml(): Promise<string> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const wins = ext.ComponentQuery.query('window{isVisible()}');
      const previewWin = wins.find((w: any) => w.title && w.title.indexOf('Preview') !== -1);
      if (!previewWin) {
        return '';
      }

      const iframe = previewWin.el?.dom?.querySelector('iframe');
      const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
      if (doc?.documentElement) {
        return doc.documentElement.outerHTML;
      }

      const panel = previewWin.down('panel');
      return panel?.body?.dom?.innerHTML || '';
    });
  }

  async getPreviewUrl(): Promise<string> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const wins = ext.ComponentQuery.query('window{isVisible()}');
      const previewWin = wins.find((w: any) => w.title && w.title.indexOf('Preview') !== -1);
      if (!previewWin) {
        return '';
      }

      const iframe = previewWin.el?.dom?.querySelector('iframe') as HTMLIFrameElement | null;
      return iframe ? iframe.src : '';
    });
  }

  async getPreviewMetadata(): Promise<any> {
    const previewUrl = await this.getPreviewUrl();
    if (!previewUrl) {
      return null;
    }

    try {
      const metadata = new URL(previewUrl).searchParams.get('metadata') || '{}';
      return JSON.parse(metadata);
    } catch {
      return null;
    }
  }

  async scrollPreviewToText(text: string): Promise<boolean> {
    return this.page.evaluate((needle: string) => {
      const ext = (window as any).Ext;
      const wins = ext.ComponentQuery.query('window{isVisible()}');
      const previewWin = wins.find((w: any) => w.title && w.title.indexOf('Preview') !== -1);
      if (!previewWin) {
        return false;
      }

      const findAndScroll = (root: ParentNode | null | undefined) => {
        if (!root) {
          return false;
        }

        const elements = Array.from(root.querySelectorAll('*')) as HTMLElement[];
        const target = elements.find((el) => (el.textContent || '').indexOf(needle) !== -1);
        if (!target) {
          return false;
        }

        target.scrollIntoView({ block: 'center', inline: 'nearest' });
        return true;
      };

      const iframe = previewWin.el?.dom?.querySelector('iframe');
      const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
      if (doc?.body) {
        return findAndScroll(doc.body);
      }

      const panelBody = previewWin.down('panel')?.body?.dom;
      return findAndScroll(panelBody);
    }, text);
  }

  async closePreview(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const wins = ext.ComponentQuery.query('window{isVisible()}');
      const previewWin = wins.find((w: any) => w.title && w.title.indexOf('Preview') !== -1);
      if (previewWin) {
        previewWin.close();
      }
    });
  }

  async isPreviewVisible(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const wins = ext.ComponentQuery.query('window{isVisible()}');
      return wins.some((w: any) => w.title && w.title.indexOf('Preview') !== -1);
    });
  }

  async isComponentDisabled(itemId: string): Promise<boolean> {
    return this.page.evaluate((id: string) => {
      const ext = (window as any).Ext;
      const cmp = ext.ComponentQuery.query('#' + id)[0];
      return cmp ? !!cmp.disabled : false;
    }, itemId);
  }

  async scrollComponentIntoView(itemId: string): Promise<boolean> {
    return this.page.evaluate((id: string) => {
      const ext = (window as any).Ext;
      const cmp = ext.ComponentQuery.query('#' + id)[0];
      if (!cmp) {
        return false;
      }

      const dom = (cmp.getEl && cmp.getEl() && cmp.getEl().dom)
        || (cmp.el && cmp.el.dom)
        || (cmp.inputEl && cmp.inputEl.dom);

      if (!dom || !dom.scrollIntoView) {
        return false;
      }

      dom.scrollIntoView({ block: 'center', inline: 'nearest' });
      return true;
    }, itemId);
  }

  // --- Logo Upload ---

  async clickSubirLogo(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('moneyguardorganizacionformview button[action=facturaLogo]')[0];
      if (!btn) {
        throw new Error('Subir logo button not found');
      }

      btn.fireEvent('click', btn);
    });
  }

  async isUploadWindowVisible(): Promise<boolean> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const wins = ext.ComponentQuery.query('window{isVisible()}');
      return wins.some((w: any) => {
        const form = w.down('form');
        return form && w.isVisible();
      });
    });
  }

  async closeOrgFormWindow(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      const win = form?.up?.('window');
      if (win) {
        win.close();
      }
    });

    await this.waitForOrgFormClosed();
  }

  async waitForOrgFormClosed(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const forms = ext?.ComponentQuery?.query('moneyguardorganizacionformview') || [];
        return forms.filter((form: any) => {
          if (!form || form.destroyed) {
            return false;
          }

          return !(form.isVisible && !form.isVisible());
        }).length === 0;
      },
      undefined,
      { timeout: 30_000, polling: 500 },
    );

    await waitForAjaxComplete(this.page);
  }

  async getCurrentOrgRecordState(): Promise<{
    id: number | null;
    name: string;
    metadataRaw: string;
    categoriaImpositiva: string;
  }> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      const record = form?.record;

      if (!record) {
        return {
          id: null,
          name: '',
          metadataRaw: '',
          categoriaImpositiva: '',
        };
      }

      return {
        id: record.get('Id') ?? null,
        name: record.get('org_cnombre') || '',
        metadataRaw: record.get('org_cmetadata') || '',
        categoriaImpositiva: record.get('org_ccategoriaimpositiva') || '',
      };
    });
  }

  async saveCurrentRecordRawMetadata(metadataRaw: string): Promise<{ success: boolean; error: string }> {
    const result = await this.page.evaluate(async (raw: string) => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      const record = form?.record;

      if (!record) {
        return { success: false, error: 'Org form record not found' };
      }

      try {
        record.set('org_cmetadata', raw || '');

        return await new Promise<{ success: boolean; error: string }>((resolve) => {
          record.save({
            callback: function (_savedRecord: any, operation: any) {
              if (operation && operation.success) {
                resolve({ success: true, error: '' });
                return;
              }

              let error = 'Unknown save error';
              try {
                if (operation && operation.getError) {
                  error = String(operation.getError() || error);
                }
              } catch (_e) {
                // keep default error
              }

              resolve({ success: false, error });
            },
          });
        });
      } catch (e: any) {
        return { success: false, error: e?.message ?? String(e) };
      }
    }, metadataRaw);

    await waitForAjaxComplete(this.page);
    return result;
  }

  // --- Save / Form toolbar ---

  async clickGuardar(): Promise<void> {
    await this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      if (!form) {
        throw new Error('Org form not found');
      }

      const btn = form.down('button[action=save]') || form.down('button[text=Guardar]');
      if (!btn) {
        throw new Error('Guardar button not found');
      }

      btn.fireEvent('click', btn);
    });

    await waitForAjaxComplete(this.page);
  }

  async getMetadataJson(): Promise<any> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      if (!form || !form.record) {
        return null;
      }

      const raw = form.record.get('org_cmetadata');
      if (!raw) {
        return null;
      }

      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    });
  }

  async getMetadataRaw(): Promise<string> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('moneyguardorganizacionformview')[0];
      if (!form || !form.record) {
        return '';
      }

      return form.record.get('org_cmetadata') || '';
    });
  }

  async getFieldsetComponents(): Promise<string[]> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const fs = ext.ComponentQuery.query('#facturaConfig')[0];
      if (!fs) {
        return [];
      }

      const items: string[] = [];
      fs.cascade((c: any) => {
        if (c.itemId && c !== fs) {
          items.push(c.itemId);
        }
      });

      return items;
    });
  }
}
