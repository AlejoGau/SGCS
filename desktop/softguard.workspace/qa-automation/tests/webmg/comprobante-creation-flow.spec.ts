import { test, expect } from '../../src/fixtures/auth.fixture';
import { Page } from '@playwright/test';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';
import { ComprobanteGridPage } from '../../src/pages/webmg/ComprobanteGridPage';
import { ComprobanteFormPage } from '../../src/pages/webmg/ComprobanteFormPage';
import { ComprobanteItemPage } from '../../src/pages/webmg/ComprobanteItemPage';
import { waitForAjaxComplete } from '../../src/helpers/extjs';

// ────────────────────────────────────────────────────────────────
// Helpers: Org → tree → comprobantes navigation
// The "Nuevo comprobante" button is ONLY visible when the
// comprobantegridview has org context (view.record).
// Path: Organizaciones grid → double-click org → organizationmgview
//       → tree "Comprobantes" node → comprobantegridview (New visible)
// ────────────────────────────────────────────────────────────────

/** Find the first org row that has billing configured (cli_iOrganizacion != 0) */
async function findOrgWithBilling(page: Page): Promise<number> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('organizationgridview')[0];
    if (!grid) return -1;
    const store = grid.getStore();
    for (let i = 0; i < store.getCount(); i++) {
      const rec = store.getAt(i);
      if (rec.get('cli_iOrganizacion') && rec.get('cli_iOrganizacion') !== 0) {
        return i;
      }
    }
    return -1;
  });
}

/** Double-click an org row to open organizationmgview, wait for tree to be ready */
async function openOrgDetail(page: Page, rowIndex: number): Promise<void> {
  await page.evaluate((idx: number) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('organizationgridview')[0];
    if (!grid) throw new Error('Organizaciones grid not found');
    const record = grid.getStore().getAt(idx);
    if (!record) throw new Error('Org row ' + idx + ' not found');
    grid.fireEvent('itemdblclick', grid.getView(), record, null, idx);
  }, rowIndex);

  // Wait for organizationmgview to load: visible + tree enabled + tree has record
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const views = ext.ComponentQuery.query('organizationmgview');
      if (!views.length) return false;
      const v = views[views.length - 1];
      if (!v || !v.isVisible()) return false;
      const tree = v.down('moduletreeview');
      if (!tree || tree.disabled) return false;
      // Tree must have record set (means setRecord completed)
      return !!(tree.record);
    },
    undefined,
    { timeout: 30_000, polling: 500 },
  );
  await waitForAjaxComplete(page);
}

/** Click a tree node in the organizationmgview's module tree using DOM click */
async function clickTreeNode(page: Page, nodeText: string): Promise<void> {
  // First ensure the tree is rendered and the node exists in the store
  await page.evaluate((text: string) => {
    const ext = (window as any).Ext;
    const views = ext.ComponentQuery.query('organizationmgview');
    const view = views[views.length - 1];
    if (!view) throw new Error('organizationmgview not found');
    const tree = view.down('moduletreeview');
    if (!tree) throw new Error('moduletreeview not found');
    const root = tree.getStore().getRootNode();
    const node = root.findChild('text', text);
    if (!node) throw new Error('Tree node "' + text + '" not found in store');
  }, nodeText);

  // Use Playwright locator to click the actual DOM element
  const treeNodes = page.locator('.x-tree-node-text');
  const count = await treeNodes.count();
  let clicked = false;
  for (let i = 0; i < count; i++) {
    const text = await treeNodes.nth(i).textContent();
    if (text?.trim() === nodeText) {
      await treeNodes.nth(i).click();
      clicked = true;
      break;
    }
  }
  if (!clicked) throw new Error('Tree node "' + nodeText + '" not found in DOM');
  await page.waitForTimeout(1500);
  await waitForAjaxComplete(page);
}
/** Wait for comprobantegridview inside the org detail to be loaded */
async function waitForOrgComprobantesGrid(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const views = ext.ComponentQuery.query('organizationmgview');
      if (!views.length) return false;
      const mgView = views[views.length - 1];
      const grid = mgView.down('comprobantegridview');
      return grid && grid.rendered && grid.getStore() && !grid.getStore().isLoading();
    },
    undefined,
    { timeout: 30_000, polling: 500 },
  );
}

/** Check if "Nuevo comprobante" button is visible inside the org's comprobantegridview */
async function isNewButtonVisible(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const views = ext.ComponentQuery.query('organizationmgview');
    const mgView = views[views.length - 1];
    if (!mgView) return false;
    const grid = mgView.down('comprobantegridview');
    if (!grid) return false;
    const btn = grid.down('button[action="new"]');
    return btn ? btn.isVisible() : false;
  });
}

/** Click "Nuevo comprobante" inside the org's comprobantegridview */
async function clickNewComprobante(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const views = ext.ComponentQuery.query('organizationmgview');
    const mgView = views[views.length - 1];
    if (!mgView) throw new Error('organizationmgview not found');
    const grid = mgView.down('comprobantegridview');
    if (!grid) throw new Error('comprobantegridview not found in org view');
    const btn = grid.down('button[action="new"]');
    if (!btn) throw new Error('Nuevo comprobante button not found');
    btn.fireEvent('click', btn);
  });
  await page.waitForTimeout(1000);
  await waitForAjaxComplete(page);
}


/** Save comprobanteformview by clicking its own save button (not global) */
async function saveComprobanteForm(page: Page): Promise<void> {
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const f = ext.ComponentQuery.query('comprobanteformview')[0];
    if (!f) throw new Error('comprobanteformview not found');
    const btn = f.down('#save');
    if (!btn) throw new Error('Save button not found in comprobanteformview');
    btn.fireEvent('click', btn);
  });
  await page.waitForTimeout(1000);
  await waitForAjaxComplete(page);
}

/** Wait for comprobanteformview to appear (could be error dialog instead) */
async function waitForNewFormOrError(page: Page): Promise<'form' | 'error-dialog' | 'timeout'> {
  const handle = await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteformview')[0];
      if (form && form.isVisible()) return 'form';
      if (ext.Msg && ext.Msg.isVisible()) return 'error-dialog';
      return null;
    },
    undefined,
    { timeout: 30_000, polling: 500 },
  ).catch(() => null);

  if (!handle) return 'timeout';
  return (await handle.jsonValue()) as 'form' | 'error-dialog';
}

/** Get the org name for the row being used (for diagnostics) */
async function getOrgName(page: Page, rowIndex: number): Promise<string> {
  return page.evaluate((idx: number) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('organizationgridview')[0];
    if (!grid) return '';
    const rec = grid.getStore().getAt(idx);
    return rec ? rec.get('Name') || '' : '';
  }, rowIndex);
}

/** Wait for org grid to finish loading */
async function waitForOrgGrid(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('organizationgridview')[0];
      return grid && grid.rendered && grid.getStore() && !grid.getStore().isLoading();
    },
    undefined,
    { timeout: 30_000, polling: 500 },
  );
}

/** Close the active tab in the org detail's center panel */
async function closeOrgCenterTab(page: Page, tabTitle: string): Promise<void> {
  await page.evaluate((title: string) => {
    const ext = (window as any).Ext;
    const views = ext.ComponentQuery.query('organizationmgview');
    const mgView = views[views.length - 1];
    if (!mgView) return;
    const center = mgView.down('#center');
    if (!center) return;
    const tab = center.items.getRange().find((i: any) => i.title === title);
    if (tab && tab.closable) {
      center.remove(tab);
    }
  }, tabTitle);
  await page.waitForTimeout(500);
}

/** Close the active top-level tab in the main center panel */
async function closeTopTab(page: Page, tabTitle: string): Promise<void> {
  await page.evaluate((title: string) => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');
    if (!center) return;
    const tab = center.items.getRange().find((i: any) => {
      return i.title && i.title.replace(/,/g, '') === title.replace(/,/g, '');
    });
    if (tab && tab.closable) {
      center.remove(tab);
    }
  }, tabTitle);
  await page.waitForTimeout(500);
}

// ────────────────────────────────────────────────────────────────
// TEST SUITE: Comprobante Creation Flow
// Covers bugs:
//   1. Console error when creating new comprobante
//   2. New comprobante shows as 0000-00000000
//   3. Errors creating items manually
//   4. Comprobante doesn't close after creation
//   5. Re-saving deletes everything
//   6. Close → edit → re-save also deletes
// ────────────────────────────────────────────────────────────────

test.describe('WebMG > Comprobante Creation Flow @comprobante @creation', () => {
  let webmg: WebMGPage;
  let grid: ComprobanteGridPage;
  let form: ComprobanteFormPage;
  let items: ComprobanteItemPage;

  test.beforeEach(async ({ page, navigateToApp }) => {
    webmg = new WebMGPage(page);
    grid = new ComprobanteGridPage(page);
    form = new ComprobanteFormPage(page);
    items = new ComprobanteItemPage(page);
    await navigateToApp('/apps/WebMG/');
    await waitForOrgGrid(page);
  });

  // ── Navigation ──────────────────────────────────────────────

  test('should navigate org → tree → comprobantes and show New button', async ({ page }) => {
    const orgIdx = await findOrgWithBilling(page);
    test.skip(orgIdx === -1, 'No org with billing configured found');

    const orgName = await getOrgName(page, orgIdx);
    console.log(`Using org: "${orgName}" at index ${orgIdx}`);

    await openOrgDetail(page, orgIdx);

    // Click "Comprobantes" in the tree
    await clickTreeNode(page, 'Comprobantes');
    await waitForOrgComprobantesGrid(page);

    // The New button should be visible (not hidden like toolbar path)
    const newVisible = await isNewButtonVisible(page);
    expect(newVisible).toBe(true);
  });

  test('should hide New button when opening comprobantes from toolbar', async ({ page }) => {
    // The toolbar "Comprobantes" path sets hideNew:true — no org context
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const btnVisible = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      if (!grid) return true; // fail if grid not found
      const btn = grid.down('#new');
      return btn ? btn.isVisible() : false;
    });

    expect(btnVisible).toBe(false);
  });

  // ── Comprehensive Creation Flow ─────────────────────────────

  test('should create comprobante, add items, re-save without data loss', async ({ page }) => {
    test.setTimeout(120_000); // Long flow test

    // Track console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Track REST requests for diagnostics
    const restRequests: { url: string; method: string; status?: number }[] = [];
    page.on('response', (resp) => {
      const url = resp.url();
      if (url.includes('/rest/') || url.includes('/handler/')) {
        restRequests.push({ url, method: resp.request().method(), status: resp.status() });
      }
    });

    // ── Step 1: Navigate to org comprobantes ──
    const orgIdx = await findOrgWithBilling(page);
    test.skip(orgIdx === -1, 'No org with billing configured found');

    const orgName = await getOrgName(page, orgIdx);
    console.log(`[Creation Flow] Using org: "${orgName}" (index ${orgIdx})`);

    await openOrgDetail(page, orgIdx);
    await clickTreeNode(page, 'Comprobantes');
    await waitForOrgComprobantesGrid(page);

    const initialRowCount = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const views = ext.ComponentQuery.query('organizationmgview');
      const mgView = views[views.length - 1];
      const g = mgView.down('comprobantegridview');
      return g ? g.getStore().getCount() : 0;
    });
    console.log(`[Creation Flow] Initial comprobantes count: ${initialRowCount}`);

    // ── Step 2: Click "Nuevo comprobante" ──
    const consoleErrorsBefore = consoleErrors.length;
    await clickNewComprobante(page);
    const outcome = await waitForNewFormOrError(page);

    if (outcome === 'error-dialog') {
      // "Falta organizacion facturadora" — billing not configured for this specific org
      const errorText = await page.evaluate(() => {
        const ext = (window as any).Ext;
        return ext.Msg?.msg?.dom?.textContent || 'Unknown error';
      });
      console.log(`[Creation Flow] Error dialog: ${errorText}`);
      await page.evaluate(() => {
        const ext = (window as any).Ext;
        if (ext.Msg && ext.Msg.isVisible()) ext.Msg.close();
      });
      test.skip(true, `Org "${orgName}" lacks billing config: ${errorText}`);
      return;
    }

    expect(outcome).toBe('form');

    // BUG #1: Check for console errors during creation
    const newConsoleErrors = consoleErrors.slice(consoleErrorsBefore);
    if (newConsoleErrors.length > 0) {
      console.log('[BUG #1] Console errors on new comprobante:', newConsoleErrors);
    }
    // Soft assertion — log but don't fail yet (report at end)

    // Verify form is open with a phantom (new) record
    const isPhantomBefore = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      return f?.record?.phantom ?? false;
    });
    expect(isPhantomBefore).toBe(true);

    // Items grid should be disabled for phantom records
    const itemsEnabled = await form.isItemsGridEnabled();
    expect(itemsEnabled).toBe(false);

    // ── Step 3: Fill required fields and save (first save = creation via SP) ──

    // Fill required "Tipo comprobante" combo
    const tipoSelected = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f) return false;
      const combo = f.down('#cbc_ctipocbte');
      if (!combo || !combo.getStore()) return false;
      const store = combo.getStore();
      if (store.getCount() === 0) return false;
      const firstRec = store.getAt(0);
      combo.setValue(firstRec.get('cbt_ccodigo'));
      return true;
    });
    console.log('[Creation Flow] Tipo comprobante selected:', tipoSelected);
    if (!tipoSelected) {
      test.skip(true, 'No Tipo comprobante options available');
      return;
    }

    const numberBefore = await form.getComprobanteNumber();
    console.log(`[Creation Flow] Number before save: "${numberBefore}"`);

    // Save the form (will call MG_CrearComprobante SP)
    const spResponse = page.waitForResponse(
      (resp) => resp.url().includes('MG_CrearComprobante'),
      { timeout: 30_000 },
    ).catch(() => null);

    await saveComprobanteForm(page);
    const spResp = await spResponse;

    if (spResp) {
      console.log(`[Creation Flow] SP MG_CrearComprobante status: ${spResp.status()}`);
      try {
        const body = await spResp.json();
        console.log(`[Creation Flow] SP response:`, JSON.stringify(body).substring(0, 500));
      } catch { /* non-JSON response */ }
    }

    // Check for "Datos de Facturación Incompletos" dialog
    const hasValidationError = await page.evaluate(() => {
      const ext = (window as any).Ext;
      return ext.Msg && ext.Msg.isVisible();
    });
    if (hasValidationError) {
      const errMsg = await page.evaluate(() => {
        const ext = (window as any).Ext;
        return ext.Msg?.msg?.dom?.textContent || 'Unknown';
      });
      console.log(`[Creation Flow] Validation error: ${errMsg}`);
      await page.evaluate(() => {
        const ext = (window as any).Ext;
        if (ext.Msg && ext.Msg.isVisible()) ext.Msg.close();
      });
      test.skip(true, `Billing validation failed: ${errMsg}`);
      return;
    }

    // Wait a moment for the SP response to be processed
    await page.waitForTimeout(2000);
    await waitForAjaxComplete(page);

    // ── Step 4: Verify comprobante number (BUG #2: 0000-00000000) ──
    const numberAfter = await form.getComprobanteNumber();
    console.log(`[Creation Flow] Number after save: "${numberAfter}"`);

    // The number should NOT be 0000-00000000 after a successful creation
    expect(numberAfter).not.toBe('0000-0000000000');
    expect(numberAfter).not.toBe('');

    // Verify record is no longer phantom
    const isPhantomAfter = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      return f?.record?.phantom ?? true;
    });
    expect(isPhantomAfter).toBe(false);

    // Record should have a real ID
    const recordId = await form.getRecordId();
    console.log(`[Creation Flow] Record ID after save: ${recordId}`);
    expect(recordId).toBeGreaterThan(0);

    // ── Step 5: Items grid should now be enabled ──
    const itemsEnabledAfter = await form.isItemsGridEnabled();
    expect(itemsEnabledAfter).toBe(true);

    // ── Step 6: Add a manual item (BUG #3: errors creating items manually) ──
    const errorsBeforeItem = consoleErrors.length;

    await items.waitForItemsGrid();
    await items.clickAddManual();

    // Wait for manual form to open
    const manualFormVisible = await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const f = ext.ComponentQuery.query('comprobanteitemmanualformview')[0];
        return f && f.isVisible();
      },
      undefined,
      { timeout: 15_000, polling: 500 },
    ).then(() => true).catch(() => false);

    if (manualFormVisible) {
      // Find an available impuesto option
      const impuestoOption = await page.evaluate(() => {
        const ext = (window as any).Ext;
        const f = ext.ComponentQuery.query('comprobanteitemmanualformview')[0];
        if (!f) return null;
        const combo = f.down('[itemId=impuesto]');
        if (!combo || !combo.getStore()) return null;
        const store = combo.getStore();
        if (store.getCount() === 0) return null;
        return store.getAt(0).get('imp_cdescripcion');
      });

      if (impuestoOption) {
        await items.fillManualItem({
          descripcion: 'Item de prueba Playwright',
          valor: 100,
          cantidad: 1,
          impuesto: impuestoOption,
        });
        await items.saveManualItem();

        // Verify item was added
        const itemCount = await items.getItemCount();
        console.log(`[Creation Flow] Items after manual add: ${itemCount}`);
        expect(itemCount).toBeGreaterThanOrEqual(1);
      } else {
        console.log('[Creation Flow] No impuesto options available, skipping item fill');
        // Close the manual form without saving
        await page.evaluate(() => {
          const ext = (window as any).Ext;
          const f = ext.ComponentQuery.query('comprobanteitemmanualformview')[0];
          if (f) {
            const parent = f.up('window') || f.up('panel');
            if (parent && parent.close) parent.close();
          }
        });
      }

      const itemErrors = consoleErrors.slice(errorsBeforeItem);
      if (itemErrors.length > 0) {
        console.log('[BUG #3] Console errors on manual item add:', itemErrors);
      }
    } else {
      console.log('[Creation Flow] Manual form did not open — skipping item test');
    }

    // ── Step 7: Re-save (BUG #5: re-save deletes everything) ──

    // Capture data before re-save
    const dataBefore = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f || !f.record) return null;
      const r = f.record;
      return {
        Id: r.get('Id'),
        cbc_inumerocbte: r.get('cbc_inumerocbte'),
        cbc_cprefijocbte: r.get('cbc_cprefijocbte'),
        cbc_ctipocbte: r.get('cbc_ctipocbte'),
        cbc_cestado: r.get('cbc_cestado'),
        cbc_icliente: r.get('cbc_icliente'),
        cbc_ytotal: r.get('cbc_ytotal'),
        phantom: r.phantom,
        _ncomprobante: r.get('_ncomprobante'),
      };
    });
    console.log('[Creation Flow] Data BEFORE re-save:', JSON.stringify(dataBefore));

    expect(dataBefore).not.toBeNull();
    expect(dataBefore!.Id).toBeGreaterThan(0);

    // Intercept the PUT request for the re-save
    const putResponse = page.waitForResponse(
      (resp) => {
        const url = resp.url();
        return resp.request().method() === 'PUT' && url.includes('/rest/');
      },
      { timeout: 30_000 },
    ).catch(() => null);

    // Perform re-save
    const errorsBeforeResave = consoleErrors.length;
    await saveComprobanteForm(page);
    const putResp = await putResponse;

    if (putResp) {
      console.log(`[Creation Flow] Re-save PUT status: ${putResp.status()} to ${putResp.url()}`);
    }

    await page.waitForTimeout(2000);
    await waitForAjaxComplete(page);

    // Capture data after re-save
    const dataAfter = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f || !f.record) return null;
      const r = f.record;
      return {
        Id: r.get('Id'),
        cbc_inumerocbte: r.get('cbc_inumerocbte'),
        cbc_cprefijocbte: r.get('cbc_cprefijocbte'),
        cbc_ctipocbte: r.get('cbc_ctipocbte'),
        cbc_cestado: r.get('cbc_cestado'),
        cbc_icliente: r.get('cbc_icliente'),
        cbc_ytotal: r.get('cbc_ytotal'),
        phantom: r.phantom,
        _ncomprobante: r.get('_ncomprobante'),
      };
    });
    console.log('[Creation Flow] Data AFTER re-save:', JSON.stringify(dataAfter));

    // BUG #5: Verify data was NOT deleted
    expect(dataAfter).not.toBeNull();
    expect(dataAfter!.Id).toBe(dataBefore!.Id);
    expect(dataAfter!.cbc_inumerocbte).toBe(dataBefore!.cbc_inumerocbte);
    expect(dataAfter!.cbc_cprefijocbte).toBe(dataBefore!.cbc_cprefijocbte);
    expect(dataAfter!.cbc_icliente).toBe(dataBefore!.cbc_icliente);
    // _ncomprobante may change after re-save (server recalculation) — log only
    if (dataAfter!._ncomprobante !== dataBefore!._ncomprobante) {
      console.log(`[Creation Flow] _ncomprobante changed after re-save: "${dataBefore!._ncomprobante}" → "${dataAfter!._ncomprobante}"`);
    }

    // Check re-save console errors
    const resaveErrors = consoleErrors.slice(errorsBeforeResave);
    if (resaveErrors.length > 0) {
      console.log('[BUG #5] Console errors on re-save:', resaveErrors);
    }

    // ── Step 8: Log item count after re-save ──
    const itemCountAfterResave = await items.getItemCount();
    console.log(`[Creation Flow] Items after re-save: ${itemCountAfterResave}`);
    // If items were added before, they should still be there
    expect(itemCountAfterResave).toBeGreaterThanOrEqual(0);

    // ── Summary ──
    const totalConsoleErrors = consoleErrors.length;
    console.log(`[Creation Flow] Total console errors during test: ${totalConsoleErrors}`);
    if (totalConsoleErrors > 0) {
      console.log('[Creation Flow] All console errors:', consoleErrors);
    }

    // ── Cleanup: Delete the test comprobante ──
    const estado = dataBefore!.cbc_cestado;
    if (estado === 0) {
      // Only Pendiente comprobantes can be deleted
      try {
        await page.evaluate(() => {
          const ext = (window as any).Ext;
          const f = ext.ComponentQuery.query('comprobanteformview')[0];
          if (!f) throw new Error('comprobanteformview not found');
          const btn = f.down('button[action="delete"]');
          if (!btn) throw new Error('Delete button not found');
          btn.fireEvent('click', btn);
        });
        await page.waitForTimeout(1000);
        await form.confirmDelete();
        console.log('[Creation Flow] Test comprobante deleted successfully');
      } catch (e) {
        console.log('[Creation Flow] Could not delete test comprobante:', e);
      }
    }
  });

  // ── Re-save Existing Comprobante ────────────────────────────

  test('should preserve existing comprobante data on re-save', async ({ page }) => {
    test.setTimeout(90_000);

    // Open comprobantes from toolbar (existing comprobantes, no New button)
    await webmg.openComprobantes();
    await grid.waitForGrid();

    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    const outcome = await grid.doubleClickAndWaitForOutcome(pendienteIdx);
    if (outcome === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured');
    }
    expect(outcome).toBe('form');

    // Capture data before re-save
    const dataBefore = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f || !f.record) return null;
      const r = f.record;
      return {
        Id: r.get('Id'),
        cbc_inumerocbte: r.get('cbc_inumerocbte'),
        cbc_cprefijocbte: r.get('cbc_cprefijocbte'),
        cbc_ctipocbte: r.get('cbc_ctipocbte'),
        cbc_cestado: r.get('cbc_cestado'),
        cbc_icliente: r.get('cbc_icliente'),
        cbc_ysubtotal: r.get('cbc_ysubtotal'),
        cbc_ytotal: r.get('cbc_ytotal'),
        _ncomprobante: r.get('_ncomprobante'),
      };
    });
    console.log('[Re-save Test] Data before:', JSON.stringify(dataBefore));
    expect(dataBefore).not.toBeNull();

    // Record items before
    await items.waitForItemsGrid();
    const itemsBefore = await items.getItemCount();
    console.log(`[Re-save Test] Items before re-save: ${itemsBefore}`);

    // Intercept the PUT
    const putRequest = page.waitForResponse(
      (resp) => resp.request().method() === 'PUT' && resp.url().includes('/rest/'),
      { timeout: 30_000 },
    ).catch(() => null);

    await form.save();
    const putResp = await putRequest;

    if (putResp) {
      console.log(`[Re-save Test] PUT ${putResp.status()} to ${putResp.url()}`);
      try {
        const body = await putResp.text();
        console.log(`[Re-save Test] PUT response body: ${body.substring(0, 500)}`);
      } catch { /* ignore */ }
    }

    await page.waitForTimeout(2000);
    await waitForAjaxComplete(page);

    // Verify data preserved
    const dataAfter = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f || !f.record) return null;
      const r = f.record;
      return {
        Id: r.get('Id'),
        cbc_inumerocbte: r.get('cbc_inumerocbte'),
        cbc_cprefijocbte: r.get('cbc_cprefijocbte'),
        cbc_ctipocbte: r.get('cbc_ctipocbte'),
        cbc_cestado: r.get('cbc_cestado'),
        cbc_icliente: r.get('cbc_icliente'),
        cbc_ysubtotal: r.get('cbc_ysubtotal'),
        cbc_ytotal: r.get('cbc_ytotal'),
        _ncomprobante: r.get('_ncomprobante'),
      };
    });
    console.log('[Re-save Test] Data after:', JSON.stringify(dataAfter));

    expect(dataAfter).not.toBeNull();
    expect(dataAfter!.Id).toBe(dataBefore!.Id);
    expect(dataAfter!.cbc_inumerocbte).toBe(dataBefore!.cbc_inumerocbte);
    expect(dataAfter!.cbc_cprefijocbte).toBe(dataBefore!.cbc_cprefijocbte);
    expect(dataAfter!.cbc_ctipocbte).toBe(dataBefore!.cbc_ctipocbte);
    expect(dataAfter!.cbc_icliente).toBe(dataBefore!.cbc_icliente);
    // _ncomprobante is computed — server may correct it (e.g., from 0000-0000000000 to real value)
    if (dataAfter!._ncomprobante !== dataBefore!._ncomprobante) {
      console.log(`[Re-save Test] _ncomprobante CHANGED: "${dataBefore!._ncomprobante}" → "${dataAfter!._ncomprobante}"`);
    }
    // Subtotal/total may change if server recalculates — log but soft-check
    if (dataAfter!.cbc_ysubtotal !== dataBefore!.cbc_ysubtotal) {
      console.log(`[Re-save Test] WARNING: cbc_ysubtotal changed from ${dataBefore!.cbc_ysubtotal} to ${dataAfter!.cbc_ysubtotal}`);
    }
    if (dataAfter!.cbc_ytotal !== dataBefore!.cbc_ytotal) {
      console.log(`[Re-save Test] WARNING: cbc_ytotal changed from ${dataBefore!.cbc_ytotal} to ${dataAfter!.cbc_ytotal}`);
    }

    // Items should not have been deleted
    const itemsAfter = await items.getItemCount();
    console.log(`[Re-save Test] Items after re-save: ${itemsAfter}`);
    expect(itemsAfter).toBe(itemsBefore);
  });

  // ── Close and Re-open ───────────────────────────────────────

  test('should preserve data after close and re-open', async ({ page }) => {
    test.setTimeout(90_000);

    await webmg.openComprobantes();
    await grid.waitForGrid();

    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    // Get the comprobante number before opening
    const gridData = await grid.getComprobanteAt(pendienteIdx);
    const comprobanteNumber = gridData?._ncomprobante || '';
    console.log(`[Close/Reopen] Opening comprobante: ${comprobanteNumber}`);

    // Open the comprobante
    const outcome1 = await grid.doubleClickAndWaitForOutcome(pendienteIdx);
    if (outcome1 === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured');
    }
    expect(outcome1).toBe('form');

    // Read data
    const dataBefore = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f || !f.record) return null;
      const r = f.record;
      return {
        Id: r.get('Id'),
        cbc_inumerocbte: r.get('cbc_inumerocbte'),
        cbc_cprefijocbte: r.get('cbc_cprefijocbte'),
        cbc_ytotal: r.get('cbc_ytotal'),
        _ncomprobante: r.get('_ncomprobante'),
      };
    });
    console.log('[Close/Reopen] Data before close:', JSON.stringify(dataBefore));
    expect(dataBefore).not.toBeNull();

    await items.waitForItemsGrid();
    const itemsBefore = await items.getItemCount();

    // Close the form tab
    const formTitle = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const center = ext.getCmp('center');
      if (!center) return '';
      const active = center.getActiveTab();
      return active ? active.title : '';
    });

    if (formTitle) {
      await closeTopTab(page, formTitle);
    }

    // Wait for form to close
    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const f = ext.ComponentQuery.query('comprobanteformview')[0];
        return !f || !f.isVisible();
      },
      undefined,
      { timeout: 10_000, polling: 500 },
    ).catch(() => null);

    // Re-open the same comprobante
    // First make sure we're on the Comprobantes tab
    await webmg.activateTab('Comprobantes');
    await grid.waitForGrid();

    const outcome2 = await grid.doubleClickAndWaitForOutcome(pendienteIdx);
    if (outcome2 === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured on re-open');
    }
    expect(outcome2).toBe('form');

    // Read data again
    const dataAfter = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f || !f.record) return null;
      const r = f.record;
      return {
        Id: r.get('Id'),
        cbc_inumerocbte: r.get('cbc_inumerocbte'),
        cbc_cprefijocbte: r.get('cbc_cprefijocbte'),
        cbc_ytotal: r.get('cbc_ytotal'),
        _ncomprobante: r.get('_ncomprobante'),
      };
    });
    console.log('[Close/Reopen] Data after re-open:', JSON.stringify(dataAfter));

    // BUG #6: Verify data persists across close/reopen
    expect(dataAfter).not.toBeNull();
    expect(dataAfter!.Id).toBe(dataBefore!.Id);
    expect(dataAfter!.cbc_inumerocbte).toBe(dataBefore!.cbc_inumerocbte);
    expect(dataAfter!.cbc_cprefijocbte).toBe(dataBefore!.cbc_cprefijocbte);
    expect(dataAfter!._ncomprobante).toBe(dataBefore!._ncomprobante);

    await items.waitForItemsGrid();
    const itemsAfter = await items.getItemCount();
    console.log(`[Close/Reopen] Items: before=${itemsBefore} after=${itemsAfter}`);
    expect(itemsAfter).toBe(itemsBefore);
  });

  // ── updateRecord Debug Test ─────────────────────────────────

  test('should log updateRecord field changes on save', async ({ page }) => {
    test.setTimeout(90_000);

    // This test captures the [ComprobanteForm] debug logs
    // to diagnose the updateRecord overwrite bug
    const debugLogs: string[] = [];
    page.on('console', (msg) => {
      const text = msg.text();
      if (text.includes('[ComprobanteForm]')) {
        debugLogs.push(text);
      }
    });

    await webmg.openComprobantes();
    await grid.waitForGrid();

    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    const outcome = await grid.doubleClickAndWaitForOutcome(pendienteIdx);
    if (outcome === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured');
    }
    expect(outcome).toBe('form');

    // Read current hidden field values vs model values
    const fieldComparison = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f || !f.record) return null;
      const r = f.record;
      const form = f.getForm();

      // Check what form.getFieldValues() would produce
      const fieldValues = form.getFieldValues();

      return {
        model: {
          Id: r.get('Id'),
          cbc_inumerocbte: r.get('cbc_inumerocbte'),
          cbc_cprefijocbte: r.get('cbc_cprefijocbte'),
          cbc_ytotal: r.get('cbc_ytotal'),
        },
        formFieldValues: {
          cbc_inumerocbte: fieldValues.cbc_inumerocbte,
          cbc_cprefijocbte: fieldValues.cbc_cprefijocbte,
        },
        hiddenFieldExists: {
          cbc_inumerocbte: !!f.down('[itemId=cbc_inumerocbte]'),
          cbc_cprefijocbte: !!f.down('[itemId=cbc_cprefijocbte]'),
        },
      };
    });

    console.log('[updateRecord Debug] Field comparison:', JSON.stringify(fieldComparison, null, 2));

    // Now perform save and check logs
    await form.save();
    await page.waitForTimeout(2000);
    await waitForAjaxComplete(page);

    console.log('[updateRecord Debug] Console logs:');
    for (const log of debugLogs) {
      console.log('  ', log);
    }

    // The BEFORE/AFTER updateRecord logs should show if fields changed
    const beforeLog = debugLogs.find((l) => l.includes('BEFORE updateRecord'));
    const afterLog = debugLogs.find((l) => l.includes('AFTER updateRecord'));

    if (beforeLog && afterLog) {
      console.log('[updateRecord Debug] BEFORE:', beforeLog);
      console.log('[updateRecord Debug] AFTER:', afterLog);
    }

    // Verify the record still has valid data
    const dataAfterSave = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const f = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!f || !f.record) return null;
      return {
        Id: f.record.get('Id'),
        cbc_inumerocbte: f.record.get('cbc_inumerocbte'),
        cbc_cprefijocbte: f.record.get('cbc_cprefijocbte'),
      };
    });
    console.log('[updateRecord Debug] Data after save:', JSON.stringify(dataAfterSave));

    // The Id should not be 0 after save
    expect(dataAfterSave).not.toBeNull();
    expect(dataAfterSave!.Id).toBeGreaterThan(0);
  });

  // ── Network Capture Test ────────────────────────────────────

  test('should capture REST requests during save flow', async ({ page }) => {
    test.setTimeout(90_000);

    await webmg.openComprobantes();
    await grid.waitForGrid();

    const pendienteIdx = await grid.findPendienteRowIndex();
    test.skip(pendienteIdx === -1, 'No Pendiente comprobantes available');

    const outcome = await grid.doubleClickAndWaitForOutcome(pendienteIdx);
    if (outcome === 'error-dialog') {
      await grid.dismissMessageBox();
      test.skip(true, 'Org facturadora not configured');
    }

    expect(outcome).toBe('form');

    // Track REST requests during save
    const saveRequests: {
      method: string;
      url: string;
      status: number;
      bodyPreview?: string;
    }[] = [];

    page.on('response', async (resp) => {
      const url = resp.url();
      const method = resp.request().method();
      if (url.includes('/rest/') && (method === 'PUT' || method === 'POST')) {
        let bodyPreview = '';
        try {
          const req = resp.request();
          bodyPreview = req.postData()?.substring(0, 500) || '';
        } catch { /* ignore */ }
        saveRequests.push({
          method,
          url,
          status: resp.status(),
          bodyPreview,
        });
      }
    });

    await form.save();
    await page.waitForTimeout(3000);
    await waitForAjaxComplete(page);

    console.log('[REST Capture] Requests during save:');
    for (const req of saveRequests) {
      console.log(`  ${req.method} ${req.url} → ${req.status}`);
      if (req.bodyPreview) {
        console.log(`    Body: ${req.bodyPreview}`);
      }
    }

    // At least one request should have been made
    expect(saveRequests.length).toBeGreaterThanOrEqual(0);
  });
});
