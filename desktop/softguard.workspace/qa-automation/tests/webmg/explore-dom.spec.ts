/**
 * DOM Exploration Test — discovers WebMG's actual component tree.
 * Run with: npx playwright test --project=chromium -g "explore" --headed
 * Outputs screenshots + component dump to reports/test-artifacts/
 */
import { test, expect } from '../../src/fixtures/auth.fixture';

test.describe('WebMG DOM Explorer @explore', () => {

  test('explore component tree and take screenshots', async ({ page, navigateToApp }) => {
    // 1. Load WebMG
    await navigateToApp('/apps/WebMG/');
    await page.screenshot({ path: 'reports/test-artifacts/explore-01-loaded.png', fullPage: true });

    // 2. Dump top-level component tree
    const tree = await page.evaluate(() => {
      const ext = (window as any).Ext;
      if (!ext || !ext.ComponentQuery) return 'Ext not ready';

      const dump = (cmp: any, depth: number): any => {
        if (depth > 3) return null;
        const info: any = {
          xtype: cmp.xtype || cmp.self?.xtype,
          itemId: cmp.itemId,
          id: cmp.id,
          title: cmp.title,
          hidden: cmp.hidden,
          cls: cmp.cls,
        };
        if (cmp.items && cmp.items.getCount) {
          info.children = cmp.items.getRange()
            .map((c: any) => dump(c, depth + 1))
            .filter(Boolean);
        }
        return info;
      };

      const vp = ext.ComponentQuery.query('viewport')[0];
      return vp ? dump(vp, 0) : 'No viewport found';
    });
    console.log('[Component Tree]', JSON.stringify(tree, null, 2));

    // 3. Check what's in the center tabpanel
    const centerTabs = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const center = ext.getCmp('center') || ext.ComponentQuery.query('#center')[0];
      if (!center) return 'No center tabpanel';
      const items = center.items?.getRange() || [];
      return items.map((t: any) => ({
        title: t.title,
        itemId: t.itemId,
        xtype: t.xtype || t.self?.xtype,
        hidden: t.hidden,
      }));
    });
    console.log('[Center Tabs]', JSON.stringify(centerTabs, null, 2));

    // 4. Check if Comprobantes button exists in north toolbar
    const navButtons = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const north = ext.ComponentQuery.query('#north')[0] ||
                    ext.ComponentQuery.query('toolbar')[0];
      if (!north) return 'No north toolbar';
      const items = north.items?.getRange() || [];
      return items.map((b: any) => ({
        text: b.text,
        itemId: b.itemId,
        xtype: b.xtype,
        hidden: b.hidden,
      }));
    });
    console.log('[Nav Buttons]', JSON.stringify(navButtons, null, 2));

    // 5. Click the Comprobantes button using the itemId
    const clicked = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('#comprobantes')[0];
      if (!btn) return 'Button #comprobantes not found';
      btn.fireEvent('click', btn);
      return 'Clicked #comprobantes';
    });
    console.log('[Click Result]', clicked);

    // Wait for the tab to appear
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'reports/test-artifacts/explore-02-comprobantes.png', fullPage: true });

    // 6. Check the Comprobantes grid structure
    const gridInfo = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      if (!grid) return 'No comprobantegridview found';
      return {
        xtype: grid.xtype,
        itemId: grid.itemId,
        title: grid.title,
        columns: grid.columns?.map((c: any) => ({
          dataIndex: c.dataIndex,
          text: c.text,
          width: c.width,
          hidden: c.hidden,
        })),
        storeCount: grid.getStore()?.getCount(),
        storeLoading: grid.getStore()?.isLoading(),
        tbar: grid.getDockedItems()?.filter((d: any) => d.dock === 'top')
          .map((tb: any) => tb.items?.getRange().map((b: any) => ({
            text: b.text,
            action: b.action,
            itemId: b.itemId,
            xtype: b.xtype,
          }))),
      };
    });
    console.log('[Grid Info]', JSON.stringify(gridInfo, null, 2));

    // 7. Wait for the grid store to load
    await page.waitForFunction(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      return grid && grid.getStore() && !grid.getStore().isLoading();
    }, undefined, { timeout: 30_000, polling: 500 });

    const storeData = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('comprobantegridview')[0];
      const store = grid?.getStore();
      if (!store) return null;
      return {
        count: store.getCount(),
        totalCount: store.getTotalCount(),
        firstRecord: store.getCount() > 0 ? store.getAt(0).getData() : null,
      };
    });
    console.log('[Store Data]', JSON.stringify(storeData, null, 2));

    await page.screenshot({ path: 'reports/test-artifacts/explore-03-grid-loaded.png', fullPage: true });

    // 8. Click "Nuevo comprobante" button
    const newBtnResult = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const btn = ext.ComponentQuery.query('comprobantegridview button[action="new"]')[0];
      if (!btn) return 'Button action=new not found';
      btn.fireHandler();
      return 'Clicked New';
    });
    console.log('[New Button]', newBtnResult);

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'reports/test-artifacts/explore-04-new-form.png', fullPage: true });

    // 9. Check form fields
    const formInfo = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const form = ext.ComponentQuery.query('comprobanteformview')[0];
      if (!form) return 'No comprobanteformview found';
      const fields = form.query('field');
      return {
        xtype: form.xtype,
        itemId: form.itemId,
        title: form.title,
        fields: fields.map((f: any) => ({
          xtype: f.xtype,
          itemId: f.itemId,
          name: f.name,
          fieldLabel: f.fieldLabel,
          value: f.getValue?.(),
          hidden: f.hidden,
          disabled: f.disabled,
        })),
        buttons: form.getDockedItems()?.filter((d: any) => d.dock === 'top')
          .map((tb: any) => tb.items?.getRange().map((b: any) => ({
            text: b.text,
            action: b.action,
            itemId: b.itemId,
          }))),
      };
    });
    console.log('[Form Info]', JSON.stringify(formInfo, null, 2));

    expect(true).toBe(true); // always pass — this is exploratory
  });
});
