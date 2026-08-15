import { test, expect } from '@playwright/test';
import * as path from 'path';
import {
  ADMINSEARCH_GCS_URL,
  EvidenceEntry,
  buildOrgName,
  ensureEvidenceDirs,
  finalizeOrganizationAndClose,
  gotoGcsAdministratorSearch,
  runFlowUntilTemplate,
  tryDeleteOrganization,
  writeEvidenceReport,
} from './dk1654-categorias-impositivas.shared';

const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1654-categorias-impositivas-gcs');
const REPORT_JSON = 'dk1654-categorias-impositivas-gcs.json';
const REPORT_MD = 'DK-1654-CATEGORIAS-IMP-GCS-EVIDENCE.md';

let screenshotsDir = '';
const evidenceEntries: EvidenceEntry[] = [];
let cleanupResult: any = null;
let createdOrgId: number | null = null;
let createdOrgName = '';

test.describe('DK-1654 — categorías impositivas GCS @dk-1654 @adminsearch @gcs @deploy @evidence', () => {
  test.beforeAll(async () => {
    screenshotsDir = await ensureEvidenceDirs(REPORT_ROOT);
  });

  test.afterAll(async () => {
    await writeEvidenceReport({
      reportRoot: REPORT_ROOT,
      ticket: 'DK-1654',
      title: 'DK-1654 — Evidencia deployada en GCS (categorías impositivas)',
      environment: 'AdministratorSearch deployado en GCS con ?version=',
      appUrl: ADMINSEARCH_GCS_URL,
      jsonFileName: REPORT_JSON,
      markdownFileName: REPORT_MD,
      methodologyLines: [
        'Se navegó la app deployada de AdministratorSearch en GCS usando ?version= para evitar el bundle compilado/cacheado.',
        'Se creó una organización facturadora nueva sobre el build publicado y se verificó el flujo real del fix DK-1654.',
        'La evidencia valida que el combo de categoría se habilita, que se crean categorías asociadas y que quedan referencias impositivas resolubles.',
        'Se cierra el formulario seleccionando una categoría válida y luego se intenta limpiar el registro de prueba.',
      ],
      entries: evidenceEntries,
      extraMetadata: {
        createdOrgId,
        createdOrgName,
        cleanupResult,
      },
    });
  });

  test('el deploy publicado vuelve a crear categorías y referencias impositivas al guardar una nueva organización', async ({ page }) => {
    test.slow();

    createdOrgName = buildOrgName('gcs');
    let currentOrgId = 0;

    try {
      await gotoGcsAdministratorSearch(page);

      const flow = await runFlowUntilTemplate(page, {
        orgName: createdOrgName,
        screenshotsDir,
        screenshotPrefix: 'gcs',
      });

      currentOrgId = flow.creationState.orgId;
      createdOrgId = currentOrgId;

      evidenceEntries.push({
        check: 'AdministratorSearch deployado abre el grid de organizaciones facturadoras',
        status: 'pass',
        details: flow.gridState,
        screenshot: flow.screenshots.grid,
      });

      expect(flow.preSaveState.orgId).toBe(0);
      expect(flow.preSaveState.orgName).toBe(createdOrgName);
      expect(flow.preSaveState.categoryComboDisabled).toBe(true);
      expect(flow.preSaveState.categoryStoreCount).toBe(0);

      evidenceEntries.push({
        check: 'El formulario deployado inicia sin categorías para una organización nueva',
        status: 'pass',
        details: flow.preSaveState,
        screenshot: flow.screenshots.formBeforeSave,
      });

      expect(flow.attentionMessage.message).toContain('Debe completar el campo de Categoría Impositiva');

      evidenceEntries.push({
        check: 'El deploy mantiene abierta la ventana y exige categoría después del primer Guardar',
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
        check: 'El build deployado crea categorías y deja referencias de impuestos resolubles automáticamente',
        status: 'pass',
        details: {
          creationState: flow.creationState,
          taxSearchFilterUsed: flow.creationState.taxSearch.filterProperty,
        },
        screenshot: flow.screenshots.categories,
      });

      const finalize = await finalizeOrganizationAndClose(page, {
        screenshotsDir,
        screenshotPrefix: 'gcs',
      });

      expect(finalize.selection.selectedCode).toBeTruthy();
      expect(finalize.formClosed).toBe(true);

      evidenceEntries.push({
        check: 'El formulario deployado cierra correctamente al guardar con categoría seleccionada',
        status: 'pass',
        details: finalize,
        screenshot: finalize.screenshot,
      });
    } finally {
      if (currentOrgId > 0) {
        cleanupResult = await tryDeleteOrganization(page, currentOrgId);

        evidenceEntries.push({
          check: 'Cleanup de la organización de prueba deployada',
          status: cleanupResult?.ok ? 'pass' : 'warn',
          details: cleanupResult,
        });
      }
    }
  });
});
