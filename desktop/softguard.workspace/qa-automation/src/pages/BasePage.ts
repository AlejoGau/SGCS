import { Page } from '@playwright/test';
import {
  waitForExtReady,
  waitForAjaxComplete,
  waitForMask,
  clickExtButton,
  fillExtField,
  fillExtNumberField,
  selectExtCombo,
  getExtDisplayFieldValue,
  getExtComponentValue,
  setExtComponentValue,
  isExtComponentVisible,
  waitForExtComponent,
} from '../helpers/extjs';

/**
 * Base page object for all ExtJS-based pages.
 * Provides common navigation and interaction methods.
 */
export class BasePage {
  constructor(protected page: Page) {}

  /** Wait for ExtJS framework to be fully ready */
  async waitForReady(): Promise<void> {
    await waitForExtReady(this.page);
  }

  /** Wait for all pending AJAX requests to finish */
  async waitForAjax(): Promise<void> {
    await waitForAjaxComplete(this.page);
  }

  /** Wait for loading masks to appear and disappear */
  async waitForLoading(): Promise<void> {
    await waitForMask(this.page);
  }

  /** Click a button by its visible text */
  async clickButton(text: string): Promise<void> {
    await clickExtButton(this.page, text);
  }

  /** Fill a form field by its label */
  async fillField(label: string, value: string): Promise<void> {
    await fillExtField(this.page, label, value);
  }

  /** Fill a number field by its label */
  async fillNumber(label: string, value: number): Promise<void> {
    await fillExtNumberField(this.page, label, value);
  }

  /** Select a combo box value by field label */
  async selectCombo(label: string, displayValue: string): Promise<void> {
    await selectExtCombo(this.page, label, displayValue);
  }

  /** Get the text of a display field */
  async getDisplayValue(label: string): Promise<string> {
    return getExtDisplayFieldValue(this.page, label);
  }

  /** Get a component's value by itemId */
  async getComponentValue(itemId: string): Promise<any> {
    return getExtComponentValue(this.page, itemId);
  }

  /** Set a component's value by itemId */
  async setComponentValue(itemId: string, value: any): Promise<void> {
    await setExtComponentValue(this.page, itemId, value);
  }

  /** Check if a component is visible */
  async isComponentVisible(itemId: string): Promise<boolean> {
    return isExtComponentVisible(this.page, itemId);
  }

  /** Wait for a component to become visible */
  async waitForComponent(itemId: string, timeout?: number): Promise<void> {
    await waitForExtComponent(this.page, itemId, timeout);
  }

  /** Take a screenshot (for debugging/reporting) */
  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true });
  }
}
