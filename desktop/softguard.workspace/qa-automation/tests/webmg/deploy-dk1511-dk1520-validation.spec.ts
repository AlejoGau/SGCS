import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { Page } from '@playwright/test';
import { test, expect } from '../../src/fixtures/auth.fixture';
import { waitForAjaxComplete, waitForExtReady } from '../../src/helpers/extjs';
import { ExportTxtPage } from '../../src/pages/webmg/ExportTxtPage';

const DEPLOY_URL = (process.env.WEBMG_DEPLOY_URL || 'https://gcs.softguard.com/apps/WebMG/DK-1493-DK-1498-facturacion-moneyguard').trim();
const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'deploy-dk1511-dk1520');
const SCREENSHOTS_DIR = path.join(REPORT_ROOT, 'screenshots');
const ARTIFACTS_DIR = path.join(REPORT_ROOT, 'artifacts');

async function ensureReportDirs(): Promise<void> {
  for (const dir of [REPORT_ROOT, SCREENSHOTS_DIR, ARTIFACTS_DIR]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

async function requireAuthenticatedSession(page: Page): Promise<void> {
  const cookies = await page.context().cookies(DEPLOY_URL);
  const hasAspSession = cookies.some((cookie) => cookie.name === 'ASP.NET_SessionId');
  const hasOAuthToken = cookies.some((cookie) => cookie.name === 'OAuth_Token');

  if (!hasAspSession || !hasOAuthToken) {
    throw new Error(
      'El deploy de WebMG debe abrirse con sesión autenticada real (ASP.NET_SessionId + OAuth_Token). Ejecutá con --project=chromium para usar storageState .auth/user.json.',
    );
  }
}

async function gotoDeploy(page: Page): Promise<void> {
  await requireAuthenticatedSession(page);
  await page.goto(DEPLOY_URL, { waitUntil: 'domcontentloaded' });
  await waitForExtReady(page, 360_000);
  await waitForAjaxComplete(page, 60_000);
}

async function openMenuItem(page: Page, menuButtonText: string, menuItemId: string): Promise<void> {
  await page.evaluate(({ btnText, itemId }) => {
    const ext = (window as any).Ext;
    const toolbar = ext?.ComponentQuery?.query('#north')[0];
    const btn = toolbar?.items?.getRange?.().find((b: any) => b.text === btnText);
    if (!btn) throw new Error(`Menu button not found: ${btnText}`);
    btn.showMenu();

    const item = ext?.ComponentQuery?.query('#' + itemId)[0];
    if (!item) throw new Error(`Menu item not found: ${itemId}`);
    item.fireEvent('click', item);
  }, { btnText: menuButtonText, itemId: menuItemId });

  await waitForAjaxComplete(page, 60_000);
}

async function getUserOrgContext(page: Page): Promise<{
  candidates: number[];
  raw: Record<string, unknown>;
}> {
  return page.evaluate(() => {
    const user = (window as any)._UserData || {};
    const infoUser = (window as any).desktopData?.infoUser || {};

    const raw = {
      user_company: user.Company,
      user_organization_id: user.OrganizationId,
      user_org_organizacionId: user.org_organizacionId,
      user_org_id: user.org_id,
      info_organization_id: infoUser.OrganizationId,
      info_org_organizacionId: infoUser.org_organizacionId,
      info_company: infoUser.Company,
    } as Record<string, unknown>;

    const parsed = Object.values(raw)
      .map((value) => parseInt(String(value ?? ''), 10))
      .filter((value) => Number.isInteger(value) && value > 0);

    const candidates = Array.from(new Set(parsed));
    return { candidates, raw };
  });
}

test.describe('Deploy validation DK-1511 + DK-1520 @deploy @dk-1511 @dk-1520', () => {
  test.beforeAll(async () => {
    await ensureReportDirs();
  });

  test('DK-1511: Export TXT debe listar solo la organización del usuario y bloquear export con org inválida', async ({ page }) => {
    await gotoDeploy(page);

    const userOrgContext = await getUserOrgContext(page);

    await openMenuItem(page, 'Facturación', 'exportTxt');

    const exportTxt = new ExportTxtPage(page);
    await exportTxt.waitForForm(60_000);
    await exportTxt.waitForOrganizationsLoaded(60_000);

    const orgState = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const combo = view?.down('#organizacionfacturadora');
      const store = combo?.getStore?.();
      const ids = store ? store.getRange().map((r: any) => Number(r.get(combo.valueField))) : [];
      const names = store ? store.getRange().map((r: any) => String(r.get(combo.displayField) || '')) : [];
      return { ids, names, count: ids.length };
    });

    const uniqueOrgIds = Array.from(new Set(orgState.ids));
    expect(orgState.count, 'El combo de org facturadora debe tener al menos 1 opción').toBeGreaterThan(0);
    expect(
      uniqueOrgIds.length,
      `El combo de org facturadora no debe exponer múltiples organizaciones. Recibidas: ${JSON.stringify(uniqueOrgIds)}`,
    ).toBe(1);

    const guardState = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('exporttxtformview')[0];
      const combo = view?.down('#organizacionfacturadora');
      const periodo = view?.down('#periodo');
      const btn = view?.down('#export');
      const win = window as any;

      if (!view || !combo || !periodo || !btn) {
        return { openedCount: -1, missing: true };
      }

      win.__dk1511OpenedUrls = [];
      const originalOpen = window.open;
      window.open = function(url?: string | URL) {
        win.__dk1511OpenedUrls.push(String(url || ''));
        return null;
      } as typeof window.open;

      // Fuerza valor inválido para asegurar que el guard de permisos se ejecute.
      combo.setValue(999999);
      combo.fireEvent('change', combo, 999999);
      periodo.setValue(new Date());
      periodo.fireEvent('change', periodo, periodo.getValue());
      btn.fireEvent('click', btn);

      const openedCount = Array.isArray(win.__dk1511OpenedUrls) ? win.__dk1511OpenedUrls.length : 0;
      window.open = originalOpen;

      return { openedCount, missing: false };
    });

    expect(guardState.missing, 'El formulario de export debe estar renderizado con sus controles').toBe(false);
    expect(guardState.openedCount, 'Con org inválida, no debe abrir /handler/ExportTxtMG').toBe(0);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1511-exporttxt-org-restriction.png'),
      fullPage: false,
    });

    await fsp.writeFile(
      path.join(ARTIFACTS_DIR, 'dk1511-exporttxt-org-restriction.json'),
      JSON.stringify({ DEPLOY_URL, userOrgContext, orgState, guardState }, null, 2),
      'utf-8',
    );
  });

  test('DK-1511: Facturador novedades debe listar solo org del usuario y bloquear búsqueda con org inválida', async ({ page }) => {
    await gotoDeploy(page);

    const userOrgContext = await getUserOrgContext(page);

    await openMenuItem(page, 'Facturación', 'facturadorwizard');

    await page.waitForFunction(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('facturacionautomaticawizardview')[0];
      const combo = view?.down('#organizacionfacturadora');
      const store = combo?.getStore?.();
      return !!(view && combo && store && !store.isLoading() && store.getCount() > 0);
    }, undefined, { timeout: 60_000, polling: 300 });

    const wizardState = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('facturacionautomaticawizardview')[0];
      const combo = view?.down('#organizacionfacturadora');
      const store = combo?.getStore?.();
      const ids = store ? store.getRange().map((r: any) => Number(r.get(combo.valueField))) : [];
      const names = store ? store.getRange().map((r: any) => String(r.get(combo.displayField) || '')) : [];
      return { ids, names, count: ids.length };
    });

    const uniqueOrgIds = Array.from(new Set(wizardState.ids));
    expect(wizardState.count, 'Facturador novedades debe tener orgs cargadas').toBeGreaterThan(0);
    expect(
      uniqueOrgIds.length,
      `Facturador novedades no debe listar múltiples organizaciones. Recibidas: ${JSON.stringify(uniqueOrgIds)}`,
    ).toBe(1);

    const guardState = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext?.ComponentQuery?.query('facturacionautomaticawizardview')[0];
      const combo = view?.down('#organizacionfacturadora');
      const buscarBtn = view?.down('#buscar');
      const moveNext = ext?.getCmp?.('move-next');

      if (!view || !combo || !buscarBtn || !moveNext) {
        return { moveNextDisabled: null, missing: true };
      }

      combo.setValue(999999);
      combo.fireEvent('change', combo, 999999);
      buscarBtn.fireEvent('click', buscarBtn);

      return {
        moveNextDisabled: !!moveNext.isDisabled(),
        missing: false,
      };
    });

    expect(guardState.missing, 'El wizard debe estar disponible para validar guard de permisos').toBe(false);
    expect(guardState.moveNextDisabled, 'Con org inválida, Buscar debe bloquear avance').toBe(true);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1511-wizard-org-restriction.png'),
      fullPage: false,
    });

    await fsp.writeFile(
      path.join(ARTIFACTS_DIR, 'dk1511-wizard-org-restriction.json'),
      JSON.stringify({ DEPLOY_URL, userOrgContext, wizardState, guardState }, null, 2),
      'utf-8',
    );
  });

  test('DK-1520: cambiar de cantidad manual a servicio automático no debe arrastrar cantidad previa', async ({ page }) => {
    await gotoDeploy(page);

    const state = await page.evaluate(() => {
      const Ext = (window as any).Ext;

      // Objeto mínimo de organización para renderers de moneda.
      const orgRecord = { get: (key: string) => (key === 'org_csymbol' ? 'ARS' : null) };

      let itemRecord;
      try {
        itemRecord = Ext.create('Common.model.ContratoItemModel', {
          Id: 0,
          ProductId: 0,
          Description: 'Seleccione un servicio...',
          Price: 0,
          Quantity: 1,
          VAT: 0,
          Code: '',
        });
      } catch (_e) {
        if (!Ext.ClassManager.get('Dk1520.fakeContratoItemModel')) {
          Ext.define('Dk1520.fakeContratoItemModel', {
            extend: 'Ext.data.Model',
            fields: ['Id', 'Code', 'Description', 'VAT', 'Price', 'ProductId', 'mglp_idkey', 'Quantity', '_subTotal', '_VAT', 'Total'],
          });
        }
        itemRecord = Ext.create('Dk1520.fakeContratoItemModel', {
          Id: 0,
          ProductId: 0,
          Description: 'Seleccione un servicio...',
          Price: 0,
          Quantity: 1,
          VAT: 0,
          Code: '',
        });
      }

      const view = Ext.create('Common.view.ContratoItemFormView', {
        idCliente: 3,
        cnt_dinamico: 1,
        recordOrganizacion: orgRecord,
        record: itemRecord,
      });

      const win = Ext.create('Ext.window.Window', {
        title: 'DK-1520 Validate',
        width: 580,
        height: 520,
        layout: 'fit',
        modal: false,
        items: [view],
        itemId: 'dk1520ValidationWindow',
      });
      win.show();

      let controller = null;
      const app = Ext.app.Application.instance;
      if (app && app.getController) {
        try {
          controller = app.getController('Common.controller.ContratoItemFormController');
        } catch (_e) {
          controller = null;
        }
      }
      if (!controller) {
        controller = Ext.create('Common.controller.ContratoItemFormController');
      }

      const qty = view.down('#quantityCombo');
      qty.setValue(10);
      qty.fireEvent('change', qty, 10);

      if (!Ext.ClassManager.get('Dk1520.fakeProductRecord')) {
        Ext.define('Dk1520.fakeProductRecord', {
          extend: 'Ext.data.Model',
          fields: ['Id', 'Code', 'Name', 'final_price', 'imp_nporcentaje', 'pro_cantidad_auto', 'mglp_idkey'],
        });
      }

      const fakeAutoProduct = Ext.create('Dk1520.fakeProductRecord', {
        Id: 902001,
        Code: 'DK1520-AUTO',
        Name: 'Servicio Auto DK-1520',
        final_price: 500,
        imp_nporcentaje: 10.5,
        pro_cantidad_auto: 1,
        mglp_idkey: 0,
      });

      controller.onProductChanged(fakeAutoProduct, view);

      const label = view.down('#cantidadAutoLabel');
      const immediateQty = parseInt(qty.getValue(), 10);
      const immediateText = String(label.getValue() || '');
      const match = immediateText.match(/<b>(\d+)<\/b>/);
      const cuentasActivas = match ? parseInt(match[1], 10) : null;

      return {
        manualBefore: 10,
        immediateQty: Number.isNaN(immediateQty) ? null : immediateQty,
        readOnly: !!qty.readOnly,
        hasNumber: cuentasActivas !== null,
        cuentasActivas,
      };
    });

    expect(state.readOnly, 'Producto automático debe bloquear campo cantidad').toBe(true);
    expect(state.immediateQty, 'No debe arrastrar la cantidad manual previa (10)').not.toBe(10);

    if (state.hasNumber) {
      expect(state.immediateQty, 'Cantidad debe reflejar cuentas activas cuando el backend responde N').toBe(state.cuentasActivas);
    } else {
      expect(state.immediateQty, 'Si no llegó N, la cantidad debe resetearse a 0 en modo automático').toBe(0);
    }

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dk1520-quantity-no-manual-carryover.png'),
      fullPage: false,
    });

    await fsp.writeFile(
      path.join(ARTIFACTS_DIR, 'dk1520-quantity-no-manual-carryover.json'),
      JSON.stringify({ DEPLOY_URL, state }, null, 2),
      'utf-8',
    );
  });
});
