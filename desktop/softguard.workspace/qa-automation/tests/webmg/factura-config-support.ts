import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { waitForAjaxComplete } from '../../src/helpers/extjs';

export const GCS_BASE = process.env.BASE_URL || 'https://gcs.softguard.com';
export const ADMIN_SEARCH_GCS_URL = `${GCS_BASE}/a/AdministratorSearch?version=`;
export const DK1506_TEST_ORG_ID = 14;
export const DK1506_TEST_INVOICE_ID = 22;

const WORKSPACE_APP_DIR = path.resolve(__dirname, '..', '..', '..', 'apps', 'AdministratorSearch', 'app');

export type EvidenceStatus = 'pass' | 'warn' | 'fail';

export interface EvidenceEntry {
  check: string;
  status: EvidenceStatus;
  details?: unknown;
  screenshot?: string;
  artifacts?: string[];
}

export interface EvidenceContext {
  reportRoot: string;
  screenshotsDir: string;
  artifactsDir: string;
  entries: EvidenceEntry[];
  ensureDirs(): Promise<void>;
  add(entry: EvidenceEntry): void;
  writeReports(extra?: Record<string, unknown>): Promise<void>;
}

function summarizeDetails(details: unknown): string {
  try {
    return JSON.stringify(details, null, 2).slice(0, 5000);
  } catch {
    return String(details ?? '');
  }
}

function relative(reportRoot: string, target: string): string {
  return path.relative(reportRoot, target).replace(/\\/g, '/');
}

export function createEvidenceContext(
  reportRoot: string,
  title: string,
  metadata: {
    environment: string;
    spec: string;
    project: string;
    appUrl: string;
    tickets: string[];
    notes?: string[];
  },
): EvidenceContext {
  const screenshotsDir = path.join(reportRoot, 'screenshots');
  const artifactsDir = path.join(reportRoot, 'artifacts');
  const entries: EvidenceEntry[] = [];

  return {
    reportRoot,
    screenshotsDir,
    artifactsDir,
    entries,
    async ensureDirs(): Promise<void> {
      await fsp.mkdir(reportRoot, { recursive: true });
      await fsp.mkdir(screenshotsDir, { recursive: true });
      await fsp.mkdir(artifactsDir, { recursive: true });
    },
    add(entry: EvidenceEntry): void {
      entries.push(entry);
    },
    async writeReports(extra: Record<string, unknown> = {}): Promise<void> {
      await this.ensureDirs();

      const jsonPayload = {
        title,
        generatedAt: new Date().toISOString(),
        ...metadata,
        ...extra,
        checks: entries,
      };

      await fsp.writeFile(
        path.join(reportRoot, 'evidence.json'),
        JSON.stringify(jsonPayload, null, 2),
        'utf-8',
      );

      const lines: string[] = [];
      lines.push(`# ${title}`);
      lines.push('');
      lines.push(`Fecha: ${new Date().toISOString().slice(0, 10)}`);
      lines.push('');
      lines.push('## Contexto');
      lines.push('');
      lines.push(`- Ambiente: \`${metadata.environment}\``);
      lines.push(`- Spec: \`${metadata.spec}\``);
      lines.push(`- Proyecto Playwright: \`${metadata.project}\``);
      lines.push(`- App/URL base: \`${metadata.appUrl}\``);
      lines.push(`- Tareas cubiertas: ${metadata.tickets.map((ticket) => `\`${ticket}\``).join(', ')}`);
      if (metadata.notes && metadata.notes.length > 0) {
        lines.push('');
        lines.push('## Notas');
        lines.push('');
        for (const note of metadata.notes) {
          lines.push(`- ${note}`);
        }
      }
      lines.push('');
      lines.push('## Resultado');
      lines.push('');
      for (const entry of entries) {
        const icon = entry.status === 'pass' ? '✅' : entry.status === 'warn' ? '⚠️' : '❌';
        lines.push(`- ${icon} **${entry.check}** — ${entry.status.toUpperCase()}`);
      }
      lines.push('');
      lines.push('## Evidencia visual');
      lines.push('');
      for (const entry of entries) {
        if (!entry.screenshot) {
          continue;
        }
        lines.push(`### ${entry.check}`);
        lines.push('');
        lines.push(`![${entry.check}](${relative(reportRoot, entry.screenshot)})`);
        lines.push('');
        if (entry.artifacts && entry.artifacts.length > 0) {
          lines.push('Artefactos asociados:');
          for (const artifact of entry.artifacts) {
            lines.push(`- \`${relative(reportRoot, artifact)}\``);
          }
          lines.push('');
        }
        if (entry.details !== undefined) {
          lines.push('```json');
          lines.push(summarizeDetails(entry.details));
          lines.push('```');
          lines.push('');
        }
      }

      await fsp.writeFile(path.join(reportRoot, 'EVIDENCE.md'), lines.join('\n'), 'utf-8');
    },
  };
}

export async function captureEvidenceScreenshot(
  page: Page,
  screenshotsDir: string,
  fileName: string,
  fullPage = true,
): Promise<string> {
  const target = path.join(screenshotsDir, `${fileName}.png`);
  await fsp.mkdir(path.dirname(target), { recursive: true });
  await page.screenshot({ path: target, fullPage });
  return target;
}

export async function writeTextArtifact(
  artifactsDir: string,
  fileName: string,
  content: string,
): Promise<string> {
  const target = path.join(artifactsDir, fileName);
  await fsp.mkdir(path.dirname(target), { recursive: true });
  await fsp.writeFile(target, content, 'utf-8');
  return target;
}

export async function writeJsonArtifact(
  artifactsDir: string,
  fileName: string,
  content: unknown,
): Promise<string> {
  return writeTextArtifact(artifactsDir, fileName, JSON.stringify(content, null, 2));
}

export async function setupMoneyguardRequestLog(page: Page, targetPath: string): Promise<void> {
  const moneyguardUrls: string[] = [];

  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('MoneyGuard') || url.includes('moneyguard')) {
      moneyguardUrls.push(`[request] ${url}`);
    }
  });

  page.on('response', (resp) => {
    const url = resp.url();
    if (url.includes('MoneyGuard') || url.includes('moneyguard')) {
      moneyguardUrls.push(`[response ${resp.status()}] ${url}`);
    }
  });

  page.once('close', async () => {
    try {
      await fsp.mkdir(path.dirname(targetPath), { recursive: true });
      await fsp.writeFile(targetPath, moneyguardUrls.join('\n'), 'utf-8');
    } catch {
      // best effort only
    }
  });
}

export async function captureDirectPreviewScreenshot(
  page: Page,
  previewUrl: string,
  screenshotPath: string,
  anchorText: string,
): Promise<void> {
  const previewPage = await page.context().newPage();
  try {
    await previewPage.goto(previewUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await previewPage.locator(`text=${anchorText}`).waitFor({ timeout: 60_000 });
    await previewPage.locator(`text=${anchorText}`).scrollIntoViewIfNeeded();
    await previewPage.screenshot({ path: screenshotPath, fullPage: true });
  } finally {
    await previewPage.close();
  }
}

export async function injectFacturaConfigClasses(page: Page): Promise<void> {
  const modelFiles = [
    'model/OrganizationSearchModel.js',
    'model/t_organizacion_fcModel.js',
    'model/t_provinciasSearchModel.js',
    'model/t_categorias_impositivas_fcSearchModel.js',
  ];
  const modelCodes: string[] = [];
  for (const modelFile of modelFiles) {
    modelCodes.push(await fsp.readFile(path.join(WORKSPACE_APP_DIR, modelFile), 'utf-8'));
  }

  const provinciasStoreCode = await fsp.readFile(path.join(WORKSPACE_APP_DIR, 'store', 'ProvinciasStore.js'), 'utf-8');
  const formViewCode = await fsp.readFile(path.join(WORKSPACE_APP_DIR, 'view', 'MoneyGuardOrganizacionFormView.js'), 'utf-8');
  const formControllerCode = await fsp.readFile(path.join(WORKSPACE_APP_DIR, 'controller', 'MoneyGuardOrganizacionFormController.js'), 'utf-8');

  const result = await page.evaluate(
    (args: { modelSrcs: string[]; storeSrc: string; viewSrc: string; ctrlSrc: string }) => {
      const ext = (window as any).Ext;
      const log: Record<string, unknown> = {};
      const bases: Record<string, string> = {
        'Common.model.OrganizationSearchModel': '/Rest/Search/OrganizationOAT',
        'Common.model.t_provinciasSearchModel': '/Rest/search/t_provincias',
        'Common.model.t_categorias_impositivas_fcSearchModel': '/Rest/search/t_categorias_impositivas_fc',
      };

      Object.keys(bases).forEach((className) => {
        if (!ext.ClassManager.get(className)) {
          ext.define(className, {
            extend: 'Ext.data.Model',
            idProperty: 'Id',
            fields: ['Id', 'Name', 'org_cnombre', 'pro_ccodigo', 'pro_cdescripcion', 'cat_ccodigo', 'cat_cdescripcion', 'cat_orgicodigoid'],
            proxy: {
              type: 'rest',
              url: bases[className],
              appendId: true,
              reader: {
                type: 'json',
                rootProperty: 'rows',
                totalProperty: 'total',
              },
            },
          });
          log[`stub:${className.split('.').pop()}`] = 'created';
        } else {
          log[`stub:${className.split('.').pop()}`] = 'existed';
        }
      });

      const evalG = globalThis.eval;
      const allSrcs = [...args.modelSrcs, args.storeSrc, args.viewSrc, args.ctrlSrc];
      const labels = ['model0', 'model1', 'model2', 'model3', 'store', 'view', 'ctrl'];
      allSrcs.forEach((src, index) => {
        try {
          evalG(src);
          log[labels[index]] = 'ok';
        } catch (e: any) {
          log[labels[index]] = e?.message ?? String(e);
        }
      });

      log.aliasOk = !!ext.ClassManager.getByAlias('widget.moneyguardorganizacionformview');
      const ctrlClass = ext.ClassManager.get('AdministratorSearch.controller.MoneyGuardOrganizacionFormController');
      log.ctrlInCM = !!ctrlClass;
      if (!ctrlClass) {
        return { ...log, ok: false, error: 'ctrl not in ClassManager after eval' };
      }

      try {
        const ctrl = new ctrlClass({ id: 'MoneyGuardOrganizacionFormController' });
        ctrl.doInit(null);
        return { ...log, ok: true, ctrlClass: ctrl.$className, method: 'direct new+doInit' };
      } catch (e: any) {
        return { ...log, ok: false, error: 'direct init threw: ' + (e?.message ?? String(e)) };
      }
    },
    {
      modelSrcs: modelCodes,
      storeSrc: provinciasStoreCode,
      viewSrc: formViewCode,
      ctrlSrc: formControllerCode,
    },
  );

  console.log('[injectLocalJsFiles]', JSON.stringify(result));
  if (!result.ok) {
    throw new Error(`No se pudieron inyectar las clases de factura config: ${JSON.stringify(result)}`);
  }
}

export async function waitForViewport(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      return ext && ext.isReady && ext.getCmp && ext.getCmp('center') != null;
    },
    undefined,
    { timeout: 600_000, polling: 1000 },
  );
}

export async function openOrgFcGrid(page: Page): Promise<void> {
  await waitForViewport(page);
  await page.evaluate(() => {
    const ext = (window as any).Ext;
    const center = ext.getCmp('center');
    if (!center) {
      throw new Error('center tabpanel not found');
    }

    const existing = center.items.getRange().find((tab: any) => tab.xtype === 'moneyguardorganizaciongridview');
    if (existing) {
      center.setActiveTab(existing);
      return;
    }

    const tab = ext.widget('moneyguardorganizaciongridview', {
      title: 'Organizaciones facturación',
      closable: true,
    });
    center.add(tab);
    center.setActiveTab(tab);
  });
}

export async function waitForOrgGridLoaded(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const ext = (window as any).Ext;
      const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
      if (!grid) {
        return false;
      }
      const store = grid.getStore();
      return store && !store.isLoading() && store.getCount() > 0;
    },
    undefined,
    { timeout: 60_000, polling: 500 },
  );
}

export async function getOrganizations(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) {
      return ['Organización fixture DK-1493'];
    }

    return grid.getStore().getRange().map((record: any) => record.get('org_cnombre') || '');
  });
}

export async function findOrganizationRowIndexById(page: Page, orgId: number): Promise<number> {
  return page.evaluate((targetOrgId: number) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) {
      return -1;
    }

    const store = grid.getStore();
    return store.findBy((record: any) => Number(record.get('Id')) === Number(targetOrgId));
  }, orgId);
}

export async function openOrganizationById(page: Page, orgId: number): Promise<void> {
  const rowIndex = await findOrganizationRowIndexById(page, orgId);
  if (rowIndex < 0) {
    throw new Error(`Organization row not found for Id=${orgId}`);
  }

  await openOrganization(page, rowIndex);
}

export async function openOrganization(page: Page, rowIndex: number): Promise<void> {
  const result = await page.evaluate((index: number) => {
    const ext = (window as any).Ext;
    const grid = ext.ComponentQuery.query('moneyguardorganizaciongridview')[0];
    if (!grid) {
      const existing = ext.ComponentQuery.query('window moneyguardorganizacionformview')[0];
      if (existing) {
        existing.up('window')?.destroy();
      }

      const Model = ext.ClassManager.get('AdministratorSearch.model.t_organizacion_fcModel');
      if (!Model) {
        throw new Error('t_organizacion_fcModel not loaded');
      }

      const record = new Model({
        Id: 59,
        org_cnombre: 'Organización fixture DK-1493',
        org_csymbol: '$',
        org_cmetadata: '',
        org_organizacionId: 0,
      });
      const win = ext.create('Ext.window.Window', {
        title: 'Organización facturación DK-1493',
        width: 900,
        height: 700,
        modal: true,
        layout: 'fit',
        closeAction: 'destroy',
        items: [{
          xtype: 'moneyguardorganizacionformview',
          record,
          objectId: record.get('Id'),
        }],
      });
      win.show();
      return {
        aliasRegistered: true,
        formCreateError: '',
        formType: 'direct fixture',
        recordId: record.get('Id'),
      };
    }

    const record = grid.getStore().getAt(index);
    if (!record) {
      throw new Error(`Org row ${index} not found`);
    }

    const aliasRegistered = !!ext.ClassManager.getByAlias('widget.moneyguardorganizacionformview');
    let formCreateError = '';
    let formType = '';
    try {
      const testForm = ext.widget('moneyguardorganizacionformview', {
        record,
        objectId: record.get('Id'),
      });
      formType = testForm ? testForm.$className : 'null';
      if (testForm) {
        testForm.destroy();
      }
    } catch (e: any) {
      formCreateError = e?.message || String(e);
    }

    const gridView = grid.getView();
    grid.fireEvent('itemdblclick', gridView, record, null, index);
    return {
      aliasRegistered,
      formCreateError,
      formType,
      recordId: record.get('Id'),
    };
  }, rowIndex);

  console.log('[openOrganization diagnostic]', JSON.stringify(result));
  await page.waitForTimeout(1000);
  await waitForAjaxComplete(page);
}

export function readBestEffortToken(...relativePaths: string[]): string {
  for (const relativePath of relativePaths) {
    const absolutePath = path.resolve(__dirname, '..', '..', relativePath);
    if (fs.existsSync(absolutePath)) {
      const token = fs.readFileSync(absolutePath, 'utf-8').trim();
      if (token) {
        return token;
      }
    }
  }

  return '';
}
