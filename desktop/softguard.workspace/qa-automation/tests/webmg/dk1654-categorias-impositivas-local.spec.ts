import { test, expect } from '@playwright/test';
import * as path from 'path';
import {
  EvidenceEntry,
  buildOrgName,
  ensureEvidenceDirs,
  finalizeOrganizationAndClose,
  gotoLocalAdministratorSearch,
  runFlowUntilTemplate,
  tryDeleteOrganization,
  writeEvidenceReport,
} from './dk1654-categorias-impositivas.shared';

const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1654-categorias-impositivas-local');
const LOCAL_PORT = Number(process.env.DK1654_LOCAL_PORT || 1844);
const LOCAL_URL = process.env.ADMINSEARCH_LOCAL_BASE_URL || `http://localhost:${LOCAL_PORT}/apps/AdministratorSearch/`;
const REPORT_JSON = 'dk1654-categorias-impositivas-local.json';
const REPORT_MD = 'DK-1654-CATEGORIAS-IMP-LOCAL-EVIDENCE.md';

let screenshotsDir = '';
const evidenceEntries: EvidenceEntry[] = [];
let cleanupResult: any = null;
let createdOrgId: number | null = null;
let createdOrgName = '';

test.describe('DK-1654 — categorías impositivas local @dk-1654 @adminsearch @local @evidence', () => {
  test.beforeAll(async () => {
    screenshotsDir = await ensureEvidenceDirs(REPORT_ROOT);
  });

  test.afterAll(async () => {
    await writeEvidenceReport({
      reportRoot: REPORT_ROOT,
      ticket: 'DK-1654',
      title: 'DK-1654 — Evidencia local AdministratorSearch (categorías impositivas)',
      environment: 'AdministratorSearch local con Sencha watch + resource override a GCS',
      appUrl: LOCAL_URL,
      jsonFileName: REPORT_JSON,
      markdownFileName: REPORT_MD,
      methodologyLines: [
        'Se abrió AdministratorSearch desde el watch local en localhost:1844.',
        'Las llamadas /Rest y /rest se redirigen a GCS con el token OAuth del auth setup.',
        'Se creó una organización facturadora nueva y se verificó que el template se aplique automáticamente al guardar.',
        'La evidencia incluye el estado inicial del grid, el aviso de categoría obligatoria, las categorías y referencias impositivas generadas, y el cierre final del formulario.',
      ],
      entries: evidenceEntries,
      extraMetadata: {
        localPort: LOCAL_PORT,
        createdOrgId,
        createdOrgName,
        cleanupResult,
      },
    });
  });

  test('guardar una nueva organización crea categorías y referencias impositivas automáticamente', async ({ page }) => {
    test.slow();

    createdOrgName = buildOrgName('local');
    let currentOrgId = 0;

    try {
      await gotoLocalAdministratorSearch(page, LOCAL_PORT);

      const flow = await runFlowUntilTemplate(page, {
        orgName: createdOrgName,
        screenshotsDir,
        screenshotPrefix: 'local',
      });

      currentOrgId = flow.creationState.orgId;
      createdOrgId = currentOrgId;

      evidenceEntries.push({
        check: 'AdministratorSearch local abre el grid de organizaciones facturadoras',
        status: 'pass',
        details: flow.gridState,
        screenshot: flow.screenshots.grid,
      });

      expect(flow.preSaveState.orgId).toBe(0);
      expect(flow.preSaveState.orgName).toBe(createdOrgName);
      expect(flow.preSaveState.currencyValue).toBe('ARS');
      expect(flow.preSaveState.categoryComboDisabled).toBe(true);
      expect(flow.preSaveState.categoryStoreCount).toBe(0);

      evidenceEntries.push({
        check: 'Formulario nuevo inicia con categoría impositiva deshabilitada',
        status: 'pass',
        details: flow.preSaveState,
        screenshot: flow.screenshots.formBeforeSave,
      });

      expect(flow.attentionMessage.message).toContain('Debe completar el campo de Categoría Impositiva');

      evidenceEntries.push({
        check: 'Guardar nueva organización mantiene la ventana abierta y pide completar la categoría',
        status: 'pass',
        details: flow.attentionMessage,
        screenshot: flow.screenshots.attention,
      });

      expect(flow.creationState.orgId).toBeGreaterThan(0);
      expect(flow.creationState.orgName).toBe(createdOrgName);
      expect(flow.creationState.categoryComboDisabled).toBe(false);
      expect(flow.creationState.categoryStoreCount).toBeGreaterThan(0);
      expect(flow.creationState.categorySearch.total).toBeGreaterThan(0);
      expect(flow.creationState.referencedTaxCodes.length).toBeGreaterThan(0);
      expect(flow.creationState.resolvedTaxMatches).toBeGreaterThan(0);

      evidenceEntries.push({
        check: 'El template crea categorías impositivas y deja referencias de impuestos resolubles al guardar',
        status: 'pass',
        details: {
          creationState: flow.creationState,
          taxSearchFilterUsed: flow.creationState.taxSearch.filterProperty,
        },
        screenshot: flow.screenshots.categories,
      });

      const finalize = await finalizeOrganizationAndClose(page, {
        screenshotsDir,
        screenshotPrefix: 'local',
      });

      expect(finalize.selection.selectedCode).toBeTruthy();
      expect(finalize.formClosed).toBe(true);

      evidenceEntries.push({
        check: 'Seleccionar categoría impositiva permite cerrar el formulario al guardar',
        status: 'pass',
        details: finalize,
        screenshot: finalize.screenshot,
      });
    } finally {
      if (currentOrgId > 0) {
        cleanupResult = await tryDeleteOrganization(page, currentOrgId);

        evidenceEntries.push({
          check: 'Cleanup de la organización de prueba local',
          status: cleanupResult?.ok ? 'pass' : 'warn',
          details: cleanupResult,
        });
      }
    }
  });
});
