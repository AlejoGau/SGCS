import { Page } from '@playwright/test';

/**
 * ExtJS-aware testing utilities for Playwright.
 * Provides reliable interaction with ExtJS components via Ext.ComponentQuery and DOM evaluation.
 */

/** Wait until Ext.isReady is true and the initial app has launched */
export async function waitForExtReady(page: Page, timeout = 60_000): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return ext && ext.isReady === true && ext.ComponentQuery;
    },
    undefined, // no arg to page function
    { timeout, polling: 500 },
  );
}

/** Wait for all pending Ext.Ajax requests to complete */
export async function waitForAjaxComplete(page: Page, timeout = 30_000): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      if (!ext || !ext.Ajax) return true;
      return !ext.Ajax.isLoading();
    },
    undefined,
    { timeout, polling: 300 },
  );
}

/** Wait for a specific ExtJS store to finish loading */
export async function waitForStoreLoad(page: Page, storeId: string, timeout = 30_000): Promise<void> {
  await page.waitForFunction(
    (sid) => {
      const ext = (window as any).Ext;
      if (!ext || !ext.getStore) return false;
      const store = ext.getStore(sid);
      return store && !store.isLoading() && store.getCount() >= 0;
    },
    storeId,
    { timeout, polling: 300 },
  );
}

/** Wait for any visible loading mask to appear and then disappear */
export async function waitForMask(page: Page, timeout = 30_000): Promise<void> {
  const maskSelector = '.x-mask-msg, .x-mask.x-mask-fixed';
  try {
    // Wait for mask to appear (short timeout — it may not appear at all)
    await page.waitForSelector(maskSelector, { state: 'visible', timeout: 3_000 });
  } catch {
    // Mask never appeared — that's OK
    return;
  }
  // Now wait for it to disappear
  await page.waitForSelector(maskSelector, { state: 'hidden', timeout });
}

/** Click an ExtJS button by its visible text */
export async function clickExtButton(page: Page, text: string, options?: { timeout?: number }): Promise<void> {
  const timeout = options?.timeout ?? 15_000;
  // ExtJS buttons render text inside .x-btn-inner
  const selector = `.x-btn-inner:has-text("${text}")`;
  const btn = page.locator(selector).first();
  await btn.waitFor({ state: 'visible', timeout });
  await btn.click();
}

/** Fill an ExtJS form field identified by its fieldLabel */
export async function fillExtField(page: Page, fieldLabel: string, value: string): Promise<void> {
  // Find the label, then locate the input within the same field container
  const input = page.locator(`.x-field:has(.x-form-item-label:has-text("${fieldLabel}")) input`).first();
  await input.waitFor({ state: 'visible', timeout: 10_000 });
  await input.fill(value);
}

/** Fill an ExtJS numberfield by fieldLabel */
export async function fillExtNumberField(page: Page, fieldLabel: string, value: number): Promise<void> {
  await fillExtField(page, fieldLabel, String(value));
}

/** Select a value in an ExtJS combobox by its fieldLabel */
export async function selectExtCombo(page: Page, fieldLabel: string, displayValue: string): Promise<void> {
  // Click the combo trigger to open the dropdown
  const fieldContainer = page.locator(`.x-field:has(.x-form-item-label:has-text("${fieldLabel}"))`).first();
  await fieldContainer.waitFor({ state: 'visible', timeout: 10_000 });

  const trigger = fieldContainer.locator('.x-form-trigger').first();
  await trigger.click();

  // Wait for the boundlist (dropdown) and click the matching item
  const listItem = page.locator(`.x-boundlist-item:has-text("${displayValue}")`).first();
  await listItem.waitFor({ state: 'visible', timeout: 10_000 });
  await listItem.click();
}

/** Get the display value of an ExtJS displayfield by its fieldLabel */
export async function getExtDisplayFieldValue(page: Page, fieldLabel: string): Promise<string> {
  const field = page.locator(
    `.x-field:has(.x-form-item-label:has-text("${fieldLabel}")) .x-form-display-field`,
  ).first();
  await field.waitFor({ state: 'visible', timeout: 10_000 });
  return (await field.textContent()) ?? '';
}

/** Get all row data from an ExtJS grid, reading from the store */
export async function getExtGridRows(page: Page, widgetAlias: string): Promise<Record<string, any>[]> {
  return page.evaluate((alias: string) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query(alias)[0];
    if (!grid) return [];
    const store = grid.getStore();
    return store.getRange().map((rec: any) => rec.getData());
  }, widgetAlias);
}

/** Get the count of rows in an ExtJS grid */
export async function getExtGridRowCount(page: Page, widgetAlias: string): Promise<number> {
  return page.evaluate((alias: string) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query(alias)[0];
    if (!grid) return 0;
    return grid.getStore().getCount();
  }, widgetAlias);
}

/** Click a row in an ExtJS grid by row index (0-based) */
export async function clickExtGridRow(page: Page, widgetAlias: string, rowIndex: number): Promise<void> {
  await page.evaluate(
    ({ alias, idx }) => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query(alias)[0];
      if (!grid) throw new Error(`Grid ${alias} not found`);
      const record = grid.getStore().getAt(idx);
      if (!record) throw new Error(`Row ${idx} not found in ${alias}`);
      grid.getSelectionModel().select(record);
      grid.fireEvent('itemclick', grid.getView(), record, null, idx);
    },
    { alias: widgetAlias, idx: rowIndex },
  );
}

/** Click an action column icon in a grid row */
export async function clickExtGridAction(
  page: Page,
  widgetAlias: string,
  rowIndex: number,
  actionIconCls: string,
): Promise<void> {
  const gridEl = page.locator(`[id] .x-grid`).first(); // Fallback — refine per use
  const row = gridEl.locator(`.x-grid-row`).nth(rowIndex);
  const action = row.locator(`.${actionIconCls}`).first();
  await action.click();
}

/** Get the value of an ExtJS component by its itemId */
export async function getExtComponentValue(page: Page, itemId: string): Promise<any> {
  return page.evaluate((id: string) => {
    const ext = (window as any).Ext;
    const cmp = ext.ComponentQuery.query(`[itemId=${id}]`)[0];
    if (!cmp) return null;
    return typeof cmp.getValue === 'function' ? cmp.getValue() : cmp.getRawValue?.() ?? null;
  }, itemId);
}

/** Set the value of an ExtJS component by its itemId (programmatic — bypasses DOM) */
export async function setExtComponentValue(page: Page, itemId: string, value: any): Promise<void> {
  await page.evaluate(
    ({ id, val }) => {
      const ext = (window as any).Ext;
      const cmp = ext.ComponentQuery.query(`[itemId=${id}]`)[0];
      if (!cmp) throw new Error(`Component ${id} not found`);
      cmp.setValue(val);
    },
    { id: itemId, val: value },
  );
}

/** Check if an ExtJS component is visible (not hidden and rendered) */
export async function isExtComponentVisible(page: Page, itemId: string): Promise<boolean> {
  return page.evaluate((id: string) => {
    const ext = (window as any).Ext;
    const cmp = ext.ComponentQuery.query(`[itemId=${id}]`)[0];
    return cmp ? cmp.isVisible() : false;
  }, itemId);
}

/** Wait for an ExtJS component to become visible */
export async function waitForExtComponent(page: Page, itemId: string, timeout = 15_000): Promise<void> {
  await page.waitForFunction(
    (id: string) => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ComponentQuery) return false;
      const cmp = ext.ComponentQuery.query(`[itemId=${id}]`)[0];
      return cmp && cmp.isVisible();
    },
    itemId,
    { timeout, polling: 500 },
  );
}
