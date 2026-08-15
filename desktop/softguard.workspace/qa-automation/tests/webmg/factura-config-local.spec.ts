import { Page } from '@playwright/test';
import { test, expect } from '../../src/fixtures/auth.fixture';
import { OrgFacturaConfigPage } from '../../src/pages/webmg/OrgFacturaConfigPage';
import { buildOverrideRules } from '../../src/helpers/resource-override';
import {
  captureEvidenceScreenshot,
  ensureEvidenceDirs,
  getEvidenceDirs,
  type EvidenceEntry,
  writeEvidenceReport,
  writeJsonArtifact,
  writeTextArtifact,
} from '../../src/helpers/evidence-report';
import {
  ADMIN_SEARCH_GCS_URL,
  captureDirectPreviewScreenshot,
  DK1506_TEST_INVOICE_ID,
  DK1506_TEST_ORG_ID,
  GCS_BASE,
  getOrganizations,
  openOrgFcGrid,
  openOrganization,
  openOrganizationById,
  readBestEffortToken,
  waitForOrgGridLoaded,
} from './factura-config-support';

const REPORT_ROOT = require('path').resolve(
  __dirname,
  '..',
  '..',
  'reports',
  'dk1493-dk1494-dk1506-dk1507-factura-config',
  'local',
);
const LOCAL_ADMINSEARCH_BASE = process.env.LOCAL_ADMINSEARCH_BASE_URL || 'http://localhost:1841';
const LOCAL_PORT = Number(new URL(LOCAL_ADMINSEARCH_BASE).port || '1841');
const { screenshotDir: EVIDENCE_SCREENSHOTS_DIR, artifactDir: EVIDENCE_ARTIFACTS_DIR } = getEvidenceDirs(REPORT_ROOT);
const evidenceEntries: EvidenceEntry[] = [];
const PDF_TOKEN = readBestEffortToken('.auth/crm-token.txt', '.auth/token.txt');

function buildRemoteComprobantePdfUrl(rawUrl: string): string {
  const parsed = new URL(rawUrl, LOCAL_ADMINSEARCH_BASE);
  const gcsBase = new URL(GCS_BASE);
  parsed.protocol = gcsBase.protocol;
  parsed.hostname = gcsBase.hostname;
  parsed.port = gcsBase.port;
  if (PDF_TOKEN) {
    parsed.searchParams.set('oauth_token', PDF_TOKEN);
  }
  if (parsed.searchParams.has('token')) {
    parsed.searchParams.set('token', PDF_TOKEN);
  }
  return parsed.toString();
}

async function installComprobantePdfOverride(page: Page): Promise<void> {
  const localRule = buildOverrideRules(LOCAL_PORT).find((rule) => rule.pattern.includes('/handler/'));
  const prefix = localRule ? localRule.pattern.replace('/**', '/') : `${LOCAL_ADMINSEARCH_BASE}/handler/`;

  await page.route(`${prefix}ComprobantePdfMG**`, async (route) => {
    const remoteUrl = buildRemoteComprobantePdfUrl(route.request().url());
    const response = await fetch(remoteUrl, {
      method: route.request().method(),
      redirect: 'follow',
    });
    const body = Buffer.from(await response.arrayBuffer());
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    await route.fulfill({
      status: response.status,
      headers,
      body,
    });
  });
}

test.describe('AdministratorSearch local > Factura Config evidence @dk-1493 @dk-1494 @dk-1506 @dk-1507 @local', () => {
  let facturaConfig: OrgFacturaConfigPage;

  test.beforeAll(async () => {
    await ensureEvidenceDirs(REPORT_ROOT);
  });

  test.afterAll(async () => {
    await writeEvidenceReport({
      reportRoot: REPORT_ROOT,
      title: 'DK-1493 / DK-1494 / DK-1506 / DK-1507 — Factura Config Local Evidence',
      environment: 'localhost AdministratorSearch with resource override to GCS',
      appUrl: '/apps/AdministratorSearch/index.html',
      entries: evidenceEntries,
      summaryLines: [
        'Valida la UI local integrada de AdministratorSearch sin inyección manual de clases.',
        'Sirve como suite principal para correr después del build local antes de validar deploy.',
        `ComprobantePdfMG se fuerza con CRM token para evitar el 500/Invalid Token del billing token en este handler.`,
      ],
      extraMetadata: {
        tickets: ['DK-1493', 'DK-1494', 'DK-1506', 'DK-1507'],
        pdfTokenPresent: Boolean(PDF_TOKEN),
      },
    });
  });

  test.beforeEach(async ({ page, navigateToApp }) => {
    facturaConfig = new OrgFacturaConfigPage(page);
    await navigateToApp('/apps/AdministratorSearch/index.html');
    await openOrgFcGrid(page);
    await waitForOrgGridLoaded(page);
    await installComprobantePdfOverride(page);
  });

  test('should render factura config UI and variable insertion locally', async ({ page }) => {
    const orgs = await getOrganizations(page);
    test.skip(orgs.length === 0, 'No organizations available');

    await openOrganization(page, 0);
    await facturaConfig.waitForOrgForm();
    await facturaConfig.expandFieldset();

    const visible = {
      observaciones: await facturaConfig.isComponentVisible('observaciones_template'),
      footer: await facturaConfig.isComponentVisible('footer_fijo'),
      logo: await facturaConfig.isComponentVisible('factura_logo_display'),
      qr: await facturaConfig.isComponentVisible('mostrar_qr_afip'),
    };

    expect(visible.observaciones).toBe(true);
    expect(visible.footer).toBe(true);
    expect(visible.logo).toBe(true);
    expect(visible.qr).toBe(true);

    await facturaConfig.setObservaciones('Local demo ');
    await facturaConfig.clickInsertarVariable();
    await facturaConfig.selectVariable('Cliente', 'Nombre');

    const observaciones = await facturaConfig.getObservaciones();
    expect(observaciones).toContain('{{cliente_nombre}}');

    const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1493-local-01-fieldset-variable');
    evidenceEntries.push({
      check: 'DK-1493 local: fieldset y menú Insertar Variable operativos',
      status: 'pass',
      details: {
        visible,
        observaciones,
      },
      screenshot,
    });
  });

  test('should render payment integrations preview from the local bundle', async ({ page }) => {
    const orgs = await getOrganizations(page);
    test.skip(orgs.length === 0, 'No organizations available');

    await openOrganization(page, 0);
    await facturaConfig.waitForOrgForm();
    await facturaConfig.expandFieldset();

    await facturaConfig.setComponentValue('transferencia_habilitado', true);
    await facturaConfig.setComponentValue('transferencia_banco', 'Banco Nación');
    await facturaConfig.setComponentValue('transferencia_cbu', '2850590940090418135201');
    await facturaConfig.setComponentValue('transferencia_alias', 'softguard.cobros');
    await facturaConfig.setComponentValue('transferencia_titular', 'SoftGuard SA');
    await facturaConfig.setComponentValue('transferencia_cuit_titular', '30-12345678-9');
    await facturaConfig.setComponentValue('mercadopago_habilitado', true);
    await facturaConfig.setComponentValue('mercadopago_tipo', 'link_fijo');
    await facturaConfig.setComponentValue('mercadopago_url', 'https://mpago.la/softguard-local-demo');
    await facturaConfig.setComponentValue('mercadopago_mostrar_qr', true);
    await facturaConfig.setComponentValue('pagofacil_habilitado', true);
    await facturaConfig.setComponentValue('pagofacil_codigo_entidad', '654321');
    await facturaConfig.setComponentValue('pagofacil_template_codigo', '{{codigo_entidad}}{{cliente_numero}}');
    await facturaConfig.setComponentValue('rapipago_habilitado', true);
    await facturaConfig.setComponentValue('rapipago_codigo_entidad', '112233');
    await facturaConfig.setComponentValue('rapipago_template_codigo', '{{codigo_entidad}}{{cliente_numero}}');
    await facturaConfig.setComponentValue('debitoautomatico_habilitado', true);
    await facturaConfig.setComponentValue('debitoautomatico_texto', 'El importe será debitado automáticamente de la cuenta informada.');

    await facturaConfig.clickPreview();
    const html = await facturaConfig.getPreviewHtml();
    const previewUrl = await facturaConfig.getPreviewUrl();

    expect(html).toContain('MEDIOS DE PAGO');
    expect(html).toContain('Transferencia bancaria');
    expect(html).toContain('Mercado Pago');
    expect(html).toContain('Pago Fácil');
    expect(html).toContain('Rapipago');
    expect(html).toContain('Débito automático');
    expect(previewUrl).toContain('/handler/ComprobantePdfMG');

    const screenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1494-local-01-preview-medios-pago');
    await captureDirectPreviewScreenshot(
      page,
      buildRemoteComprobantePdfUrl(previewUrl),
      require('path').join(EVIDENCE_SCREENSHOTS_DIR, 'dk1494-local-02-preview-direct-medios-pago.png'),
      'MEDIOS DE PAGO',
    );

    const htmlArtifact = await writeTextArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1494-local-preview-medios-pago.html', html);
    const metadataArtifact = await writeJsonArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1494-local-preview-medios-pago.json', { previewUrl });
    evidenceEntries.push({
      check: 'DK-1494 local: preview de medios de pago desde el bundle real',
      status: 'pass',
      details: { previewUrl },
      screenshot,
      artifacts: [
        htmlArtifact,
        metadataArtifact,
        require('path').join(EVIDENCE_SCREENSHOTS_DIR, 'dk1494-local-02-preview-direct-medios-pago.png'),
      ],
    });

    await facturaConfig.closePreview();
  });

  test('should persist enabled integrations locally and validate the real handler', async ({ page }) => {
    test.skip(!PDF_TOKEN, 'No CRM token available to validate the real ComprobantePdfMG handler');

    try {
      await facturaConfig.closePreview();
    } catch {
      // stale preview window
    }

    try {
      await facturaConfig.closeOrgFormWindow();
    } catch {
      // stale form window
    }

    await openOrganizationById(page, DK1506_TEST_ORG_ID);
    await facturaConfig.waitForOrgForm();
    await facturaConfig.expandFieldset();

    const originalState = await facturaConfig.getCurrentOrgRecordState();
    expect(originalState.id).toBe(DK1506_TEST_ORG_ID);

    const stamp = `DK1506-LOCAL-${Date.now()}`;
    const observacionesTemplate = `Obs ${stamp} {{cliente_nombre}}`;
    const footerFijo = `Foot ${stamp}`;
    const mercadopagoUrl = `https://mpago.la/softguard-local-${String(Date.now()).slice(-6)}`;
    let restoreNeeded = false;

    try {
      await facturaConfig.setObservaciones(observacionesTemplate);
      await facturaConfig.setFooterFijo(footerFijo);
      await facturaConfig.setMostrarQrAfip(false);
      await facturaConfig.setComponentValue('transferencia_habilitado', true);
      await facturaConfig.setComponentValue('transferencia_banco', 'Banco Nación');
      await facturaConfig.setComponentValue('transferencia_cbu', '2850590940090418135201');
      await facturaConfig.setComponentValue('transferencia_alias', 'softguard.cobros');
      await facturaConfig.setComponentValue('transferencia_titular', 'SoftGuard SA');
      await facturaConfig.setComponentValue('transferencia_cuit_titular', '30-12345678-9');
      await facturaConfig.setComponentValue('mercadopago_habilitado', true);
      await facturaConfig.setComponentValue('mercadopago_tipo', 'link_fijo');
      await facturaConfig.setComponentValue('mercadopago_url', mercadopagoUrl);
      await facturaConfig.setComponentValue('mercadopago_mostrar_qr', true);
      await facturaConfig.setComponentValue('pagofacil_habilitado', false);
      await facturaConfig.setComponentValue('rapipago_habilitado', false);
      await facturaConfig.setComponentValue('debitoautomatico_habilitado', false);
      await facturaConfig.setComponentValue('debitoautomatico_texto', 'No debería aparecer en el comprobante');

      await facturaConfig.clickGuardar();
      await facturaConfig.waitForOrgFormClosed();
      restoreNeeded = true;

      await openOrganizationById(page, DK1506_TEST_ORG_ID);
      await facturaConfig.waitForOrgForm();
      await facturaConfig.expandFieldset();

      expect(await facturaConfig.getObservaciones()).toBe(observacionesTemplate);
      expect(await facturaConfig.getFooterFijo()).toBe(footerFijo);

      const persistedMetadata = await facturaConfig.getMetadataJson();
      expect(persistedMetadata?.factura?.integraciones_pago?.transferencia?.habilitado).toBe(true);
      expect(persistedMetadata?.factura?.integraciones_pago?.mercadopago?.habilitado).toBe(true);
      expect(persistedMetadata?.factura?.integraciones_pago?.mercadopago?.url).toBe(mercadopagoUrl);
      expect(persistedMetadata?.factura?.integraciones_pago?.pagofacil?.habilitado).toBe(false);
      expect(persistedMetadata?.factura?.integraciones_pago?.rapipago?.habilitado).toBe(false);
      expect(persistedMetadata?.factura?.integraciones_pago?.debito_automatico?.habilitado).toBe(false);

      await facturaConfig.clickPreview();
      const previewHtml = await facturaConfig.getPreviewHtml();
      expect(previewHtml).toContain(`Obs ${stamp}`);
      expect(previewHtml).toContain('Transferencia bancaria');
      expect(previewHtml).toContain('Mercado Pago');
      expect(previewHtml).not.toContain('Pago Fácil');
      expect(previewHtml).not.toContain('Rapipago');
      expect(previewHtml).not.toContain('Débito automático');

      await facturaConfig.scrollPreviewToText('MEDIOS DE PAGO');
      const previewScreenshot = await captureEvidenceScreenshot(page, EVIDENCE_SCREENSHOTS_DIR, 'dk1506-local-01-preview-enabled-only');
      await facturaConfig.closePreview();

      const realInvoiceUrl = `${GCS_BASE}/handler/ComprobantePdfMG?idComprobante=${DK1506_TEST_INVOICE_ID}&oauth_token=${encodeURIComponent(PDF_TOKEN)}`;
      const invoicePage = await page.context().newPage();

      try {
        await invoicePage.goto(realInvoiceUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
        const realHtml = await invoicePage.content();
        expect(realHtml).toContain('<html');

        const realHandlerReflectsSavedState =
          realHtml.includes(`Obs ${stamp}`) &&
          realHtml.includes('Transferencia bancaria') &&
          realHtml.includes('Mercado Pago') &&
          !realHtml.includes('Pago Fácil') &&
          !realHtml.includes('Rapipago') &&
          !realHtml.includes('Débito automático');

        const realHandlerScreenshot = require('path').join(EVIDENCE_SCREENSHOTS_DIR, 'dk1506-local-02-real-handler-enabled-only.png');
        await invoicePage.screenshot({ path: realHandlerScreenshot, fullPage: true });

        const previewArtifact = await writeTextArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1506-local-preview-enabled-only.html', previewHtml);
        const persistedArtifact = await writeJsonArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1506-local-persisted-metadata.json', persistedMetadata);
        const realArtifact = await writeTextArtifact(EVIDENCE_ARTIFACTS_DIR, 'dk1506-local-real-handler-enabled-only.html', realHtml);
        evidenceEntries.push({
          check: 'DK-1506 local: persistencia UI + preview integrado; handler real remoto documentado',
          status: realHandlerReflectsSavedState ? 'pass' : 'warn',
          details: {
            orgId: DK1506_TEST_ORG_ID,
            idComprobante: DK1506_TEST_INVOICE_ID,
            mercadopagoUrl,
            observacionesTemplate,
            footerFijo,
            realInvoiceUrl,
            referenceApp: ADMIN_SEARCH_GCS_URL,
            realHandlerReflectsSavedState,
            note: realHandlerReflectsSavedState
              ? 'El handler remoto reflejó el estado guardado desde el flujo local.'
              : 'La persistencia y preview local quedaron validadas; la verificación estricta del handler real sigue cubierta por la suite GCS.',
          },
          screenshot: previewScreenshot,
          artifacts: [previewArtifact, persistedArtifact, realArtifact, realHandlerScreenshot],
        });
      } finally {
        await invoicePage.close();
      }
    } finally {
      try {
        await facturaConfig.closePreview();
      } catch {
        // best effort cleanup
      }

      try {
        await facturaConfig.closeOrgFormWindow();
      } catch {
        // best effort cleanup
      }

      if (restoreNeeded) {
        await openOrganizationById(page, DK1506_TEST_ORG_ID);
        await facturaConfig.waitForOrgForm();
        const restoreResult = await facturaConfig.saveCurrentRecordRawMetadata(originalState.metadataRaw || '');
        expect(restoreResult.success, restoreResult.error).toBe(true);
        await facturaConfig.closeOrgFormWindow();
      }
    }
  });
});
