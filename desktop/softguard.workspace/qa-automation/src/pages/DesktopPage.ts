import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { waitForExtReady, waitForAjaxComplete } from '../helpers/extjs';

/**
 * Page Object for the Softguard Desktop shell.
 * Handles module navigation (opening apps like WebMG, SmartTrack, etc.)
 */
export class DesktopPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to the Desktop app */
  async goto(): Promise<void> {
    await this.page.goto('/apps/Desktop/', { waitUntil: 'domcontentloaded' });
    await waitForExtReady(this.page);
    await waitForAjaxComplete(this.page);
  }

  /** Open a module/app by clicking its icon or menu entry in the Desktop */
  async openModule(moduleName: string): Promise<void> {
    // Desktop modules are typically displayed as icons or in a taskbar/start menu.
    // Try multiple strategies:

    // Strategy 1: Click a desktop shortcut icon with matching text
    const shortcut = this.page.locator(`.x-desktop-shortcut:has-text("${moduleName}"), .sg-module-item:has-text("${moduleName}")`).first();
    const shortcutVisible = await shortcut.isVisible().catch(() => false);

    if (shortcutVisible) {
      await shortcut.dblclick();
    } else {
      // Strategy 2: Use the taskbar/start menu
      // Click "Inicio" or menu button, then find the module
      const menuBtn = this.page.locator('.x-taskbar-start, button:has-text("Inicio"), .sg-start-menu').first();
      const menuVisible = await menuBtn.isVisible().catch(() => false);

      if (menuVisible) {
        await menuBtn.click();
        const menuItem = this.page.locator(`.x-menu-item:has-text("${moduleName}")`).first();
        await menuItem.waitFor({ state: 'visible', timeout: 10_000 });
        await menuItem.click();
      } else {
        // Strategy 3: Direct navigation via evaluate (open module programmatically)
        await this.page.evaluate((name: string) => {
          const ext = (window as any).Ext;
          // Try to find and launch the module via the Desktop controller
          const desktop = ext.ComponentQuery.query('desktopview')[0] ||
                          ext.ComponentQuery.query('viewport')[0];
          if (desktop && desktop.fireEvent) {
            desktop.fireEvent('openmodule', name);
          }
        }, moduleName);
      }
    }

    // Wait for the module window/tab to open and app to load
    await this.page.waitForTimeout(2000);
    await waitForAjaxComplete(this.page);
  }

  /** Check if a module window is open */
  async isModuleOpen(moduleName: string): Promise<boolean> {
    return this.page.evaluate((name: string) => {
      const ext = (window as any).Ext;
      const windows = ext.ComponentQuery.query('window');
      return windows.some((w: any) => w.title && w.title.includes(name));
    }, moduleName);
  }

  /** Get list of available modules for the current user */
  async getAvailableModules(): Promise<string[]> {
    return this.page.evaluate(() => {
      const ext = (window as any).Ext;
      const store = ext.getStore('DesktopModules') || ext.getStore('desktopModulesStore');
      if (!store) return [];
      return store.getRange().map((r: any) => r.get('Name') || r.get('name'));
    });
  }
}
