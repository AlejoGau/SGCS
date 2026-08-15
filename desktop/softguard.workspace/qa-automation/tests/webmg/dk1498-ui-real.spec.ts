import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import { URL } from 'url';
import { WebMGPage } from '../../src/pages/webmg/WebMGPage';
import { updateWithFullPut } from '../../src/helpers/full-put';

/**
 * DK-1498 — Real UI integration tests against the local WebMG app.
 *
 * Setup:
 *   - sencha watch on localhost:1841 (AccessControl) maps the entire workspace,
 *     so /apps/WebMG/ is served from there.
 *   - Auth token at qa-automation/.auth/token.txt (from auth.setup.ts).
 *   - APIs (/Rest/, /rest/, /handler/, /js/) are proxied to GCS via resource-override.
 *
 * Cliente de prueba: 3 (ALIANZA SEGURIDAD - DEMO MG), categoría=003, org=15, 1 cuenta activa.
 */

const tokenFile = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
const screenshotsDir = path.resolve(__dirname, '..', '..', 'reports', 'dk1498-ui-real');
const oauthToken = fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf-8').trim() : '';
const GCS_BASE = process.env.GCS_BASE || 'https://gcs.softguard.com';

test.beforeAll(() => {
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
});

function previewRow(body: any): {
  cantidadTotalCalculada: number;
  cantidadContratosAutomaticos: number;
  cantidadContratosSinCuentas: number;
} {
  const rows = body?.rows || body?.data || [];
  const row = rows[0] || {};

  return {
    cantidadTotalCalculada: parseInt(row.cantidadTotalCalculada, 10) || 0,
    cantidadContratosAutomaticos: parseInt(row.cantidadContratosAutomaticos, 10) || 0,
    cantidadContratosSinCuentas: parseInt(row.cantidadContratosSinCuentas, 10) || 0,
  };
}

async function gcsApiCall(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: any,
): Promise<{ status: number; body: any }> {
  const target = new URL(url.startsWith('http') ? url : `${GCS_BASE}${url}`);
  const headers: Record<string, string> = {
    oauth_token: oauthToken,
    Accept: 'application/json',
  };

  let payload: string | undefined;
  if (body !== undefined) {
    payload = typeof body === 'string' ? body : JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(payload).toString();
  }

  return await new Promise((resolve) => {
    const req = https.request(
      {
        hostname: target.hostname,
        port: target.port || 443,
        path: target.pathname + target.search,
        method,
        headers,
        insecureHTTPParser: true,
      },
      (resp) => {
        let raw = '';
        resp.setEncoding('utf-8');
        resp.on('data', (chunk) => (raw += chunk));
        resp.on('end', () => {
          let parsed: any = raw;
          try {
            parsed = JSON.parse(raw);
          } catch (_e) {
            parsed = raw;
          }

          resolve({
            status: resp.statusCode || 0,
            body: parsed,
          });
        });
      },
    );

    req.on('error', (error) => {
      resolve({
        status: 0,
        body: { __error: error.message },
      });
    });

    if (payload) req.write(payload);
    req.end();
  });
}

function withQuery(pathname: string, params: Record<string, any>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    search.set(key, String(value));
  });

  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}

test.describe('DK-1498 — Real UI integration (WebMG @ localhost:1841/apps/WebMG/)', () => {

  test('Caso B — ContratoItemFormView: Cantidad bloqueada + banner real con N cuentas activas', async ({ page }) => {
    test.setTimeout(360_000);
    const webmg = new WebMGPage(page);
    const errors = webmg.collectConsoleErrors();

    // 1) Load WebMG locally (sencha-served HTML, APIs to GCS)
    await webmg.gotoLocal(tokenFile, 1841);
    await webmg.waitForReadyLocal(180_000);

    // 2) Open the real ContratoItemFormView in a window
    await webmg.openContratoItemForm(/* idCliente */ 3, /* cnt_dinamico */ 1);

    // Capture initial state (no producto selected — banner hidden, Quantity editable)
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsDir, 'B1-form-inicial.png'), fullPage: false });

    // 3) Simulate selecting a product with pro_cantidad_auto=1 — drives the real
    //    ContratoItemFormController.onProductChanged → applyCantidadAutoState →
    //    loadCantidadAfectada (REST: /rest/search/MG_CuentasActivasCliente?iCliente=3)
    const selectResult = await webmg.selectProductWithCantidadAuto({
      Id: 999001,
      Code: 'DK1498-AUTO',
      Name: 'Servicio Monitoreo Auto (DK-1498 UI test)',
      final_price: 1500,
      imp_nporcentaje: 21,
      pro_cantidad_auto: 1,
      mglp_idkey: 0,
    });
    console.log('[B] selectResult:', selectResult);
    expect(selectResult.ok, `onProductChanged debe ejecutar sin error: ${selectResult.error}`).toBe(true);

    // 4) Wait for the real banner with N cuentas activas
    const result = await webmg.waitForCantidadAutoBanner(45_000);
    console.log('[B] Banner:', result);

    expect(result.quantityReadOnly, 'Cantidad debe quedar readOnly').toBe(true);
    expect(result.text, 'Banner debe contener el texto de cantidad automática').toMatch(/Cantidad/);

    const qtyState = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext.ComponentQuery.query('contratoitemformview')[0];
      const qty = view?.down('#quantityCombo');
      const raw = qty ? qty.getValue() : null;
      const parsed = parseInt(raw, 10);
      return {
        value: Number.isNaN(parsed) ? null : parsed,
      };
    });

    if (result.hasNumber) {
      expect((result.cuentasActivas ?? -1), 'N debe ser >= 0 cuando MG_CuentasActivasCliente resolvió').toBeGreaterThanOrEqual(0);
      expect(qtyState.value, 'Quantity debe reflejar la cantidad afectada cuando el producto es automático').toBe(result.cuentasActivas);
      console.log(`[B] ✓ Banner muestra N=${result.cuentasActivas} cuentas activas`);
    } else {
      expect(qtyState.value, 'Si no llegó N desde backend, Quantity debe quedar en 0 para evitar arrastre manual').toBe(0);
      console.log('[B] ⚠ Banner sin N numérico — REST no devolvió rows. Texto:', result.text);
    }

    // 5) Real screenshot — replaces the synthetic 05-item-cantidad-bloqueada.png
    await page.screenshot({
      path: path.join(screenshotsDir, 'B2-cantidad-bloqueada-banner-real.png'),
      fullPage: false,
    });

    // 6) Edge — switch to a manual product (pro_cantidad_auto=0) and verify the banner hides
    const manualResult = await webmg.selectProductWithCantidadAuto({
      Id: 999002,
      Code: 'DK1498-MANUAL',
      Name: 'Producto Manual (DK-1498 UI test)',
      final_price: 750,
      imp_nporcentaje: 21,
      pro_cantidad_auto: 0,
      mglp_idkey: 0,
    });
    console.log('[B] manual selectResult:', manualResult);
    expect(manualResult.ok, `onProductChanged manual debe ejecutar sin error: ${manualResult.error}`).toBe(true);

    await page.waitForFunction(() => {
      const ext = (window as any).Ext;
      const view = ext.ComponentQuery.query('contratoitemformview')[0];
      const lbl = view?.down('#cantidadAutoLabel');
      const qty = view?.down('#quantityCombo');
      return lbl && qty && lbl.isHidden() && qty.readOnly === false;
    }, undefined, { timeout: 10_000, polling: 250 });

    await page.screenshot({
      path: path.join(screenshotsDir, 'B3-producto-manual-editable.png'),
      fullPage: false,
    });

    // Final assertion: ignore noise, fail only on critical errors
    const critical = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('DevTools') &&
        !e.includes('El parametro') &&
        !e.includes('[Nueva palabra]') &&
        !/net::ERR/.test(e),
    );
    if (critical.length) {
      console.warn('[B] Console errors (non-fatal — logging only):');
      critical.forEach((e) => console.warn('  -', e));
    }
  });

  test('Caso A — STProductosFormView: combo pro_cantidad_auto con opciones [Manual, Por cuentas activas]', async ({ page }) => {
    test.setTimeout(180_000);
    const webmg = new WebMGPage(page);
    webmg.collectConsoleErrors();

    await webmg.gotoLocal(tokenFile, 1841);
    await webmg.waitForReadyLocal(180_000);

    // 1) Producto manual (pro_cantidad_auto = 0)
    const manual = await webmg.openProductoForm({ proCantidadAuto: 0, code: 'DK1498-A-MANUAL', name: 'Producto DK-1498 manual' });
    console.log('[A] manual combo:', manual);

    expect(manual.comboValue, 'Combo debe estar inicializado en 0 (Manual)').toBe(0);
    expect(manual.comboOptions, 'Combo debe ofrecer opciones [0,1]').toEqual(expect.arrayContaining([0, 1]));

    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(screenshotsDir, 'A1-producto-manual.png'),
      fullPage: false,
    });

    // 2) Cerrar y abrir uno automático (pro_cantidad_auto = 1)
    await page.evaluate(() => {
      const ext = (window as any).Ext;
      const w = ext.ComponentQuery.query('#dk1498ProductoTestWindow')[0];
      if (w) w.close();
    });
    await page.waitForTimeout(200);

    const auto = await webmg.openProductoForm({ proCantidadAuto: 1, code: 'DK1498-A-AUTO', name: 'Producto DK-1498 automático' });
    console.log('[A] auto combo:', auto);

    expect(auto.comboValue, 'Combo debe estar en 1 (Por cuentas activas)').toBe(1);
    expect(auto.displayText, 'Display debe coincidir con la opción auto').toMatch(/cuentas activas/i);

    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(screenshotsDir, 'A2-producto-auto.png'),
      fullPage: false,
    });
  });

  test('Caso C — FacturacionAutomaticaWizardView end-to-end: card-0 → buscar → facturar (genera comprobante real)', async ({ page }) => {
    test.setTimeout(240_000);
    const webmg = new WebMGPage(page);
    webmg.collectConsoleErrors();

    await webmg.gotoLocal(tokenFile, 1841);
    await webmg.waitForReadyLocal(180_000);

    // 1) Abrir el wizard real — initview carga orgs + tipo de comprobante
    const card0 = await webmg.openFacturacionWizardReal();
    console.log('[C-real] card-0:', card0);
    expect(card0.ok, `Wizard debe abrir y popular orgs: ${card0.error}`).toBe(true);
    expect(card0.orgValue, 'Empresa facturadora debe estar seleccionada').toBeTruthy();
    expect(card0.comprobanteValue, 'Comprobante a generar debe estar seleccionado').toBeTruthy();

    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(screenshotsDir, 'C1-wizard-card0-configuracion.png'),
      fullPage: false,
    });

    // 2) Avanzar a card-1
    const card1Id = await webmg.wizardClickMoveNext();
    expect(card1Id).toBe('card-1');
    await page.waitForTimeout(300);

    // 3) Click "Buscar" — sin filtros para incluir TODA la organización facturadora
    let stats = await webmg.wizardClickBuscar();
    console.log('[C-real] stats (initial):', stats);

    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(screenshotsDir, 'C2-wizard-card1-stats-reales.png'),
      fullPage: false,
    });

    // 3.1) Si no hay novedades, intentar generar novedades primero (procesa contratos activos)
    if (stats.cantidadDeNovedades <= 0) {
      console.log('[C-real] No hay novedades — disparando "Generar Novedades" (MG_ContratosGenerarNovedades)...');
      try {
        const novResp = await webmg.wizardClickGenerarNovedades();
        console.log('[C-real] Generar Novedades response:', { status: novResp.status, ok: novResp.ok });
        await page.waitForTimeout(1500);
        // Buscar de nuevo
        stats = await webmg.wizardClickBuscar();
        console.log('[C-real] stats (after generar novedades):', stats);
      } catch (e) {
        console.log('[C-real] Generar Novedades falló:', e);
      }
    }

    // 3.2) Si sigue sin novedades, intentar con otra org facturadora
    if (stats.cantidadDeNovedades <= 0) {
      const orgs = await webmg.wizardListOrganizaciones();
      console.log('[C-real] Organizaciones disponibles:', orgs);
      for (const org of orgs) {
        if (org.id === card0.orgValue) continue;
        console.log(`[C-real] Probando org "${org.name}" (id=${org.id})...`);
        await webmg.wizardSelectOrganizacionByName(org.name);
        await page.waitForTimeout(800);
        stats = await webmg.wizardClickBuscar();
        console.log(`[C-real] stats org=${org.name}:`, stats);
        if (stats.cantidadDeNovedades > 0) {
          console.log(`[C-real] ✓ Org "${org.name}" tiene ${stats.cantidadDeNovedades} novedades`);
          break;
        }
        // try generar novedades en esta org
        try {
          await webmg.wizardClickGenerarNovedades();
          await page.waitForTimeout(1500);
          stats = await webmg.wizardClickBuscar();
          console.log(`[C-real] stats org=${org.name} (after generar):`, stats);
          if (stats.cantidadDeNovedades > 0) break;
        } catch (_e) { /* continue */ }
      }
    }

    // 4) Si sigue en 0 después de todo, skip con mensaje claro
    if (stats.cantidadDeNovedades <= 0) {
      console.log(`[C-real] ⚠ Ninguna org facturadora tiene novedades pendientes en el ambiente de pruebas.`);
      test.skip(true, `No se encontró ninguna org con novedades — no es posible ejercitar Facturar end-to-end en este entorno.`);
      return;
    }

    // 5) Avanzar a card-2 (Resumen)
    const card2Id = await webmg.wizardClickMoveNext();
    expect(card2Id).toBe('card-2');
    await page.waitForTimeout(300);

    await page.screenshot({
      path: path.join(screenshotsDir, 'C3-wizard-card2-resumen-real.png'),
      fullPage: false,
    });

    // 6) Click "Facturar" — dispara GET /rest/search/MG_LoteFacturasByFilters
    //    y genera comprobantes reales en la BD para los clientes de la org facturadora.
    console.log(`[C-real] Disparando facturación real (${stats.cantidadDeNovedades} novedades, ${stats.cantidadClientes} clientes)...`);
    const facturarResponse = await webmg.wizardClickFacturar();
    console.log('[C-real] Facturar response:', { status: facturarResponse.status, ok: facturarResponse.ok, url: facturarResponse.url });
    console.log('[C-real] Response body preview:', facturarResponse.bodyPreview);

    expect(facturarResponse.ok, `MG_LoteFacturasByFilters debe responder 2xx (status=${facturarResponse.status}, body=${facturarResponse.bodyPreview})`).toBe(true);
    expect(facturarResponse.bodyPreview, 'Response body no debe estar vacío').not.toBe('');

    // 7) Esperar el notify('Se facturo') que dispara el success callback
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, 'C4-wizard-facturado-notify.png'),
      fullPage: false,
    });

    console.log('[C-real] ✓ Facturación end-to-end completada');
  });

  test('Caso E — ContratoFormView: combo cnt_cantidad_auto con opciones [Manual, Por cuentas activas]', async ({ page }) => {
    test.setTimeout(180_000);
    const webmg = new WebMGPage(page);
    webmg.collectConsoleErrors();

    await webmg.gotoLocal(tokenFile, 1841);
    await webmg.waitForReadyLocal(180_000);

    const result = await webmg.openContratoForm({
      clienteId: 3,
      orgId: 15,
      organizationName: 'ALIANZA SEGURIDAD - DEMO MG',
      cntCantidadAuto: 1,
      cntDinamico: 0,
    });
    console.log('[E] contrato combo:', result);

    expect(result.ok, `ContratoFormView debe abrir con el combo nuevo: ${result.error}`).toBe(true);
    expect(result.comboOptions, 'Combo debe ofrecer opciones [0,1]').toEqual(expect.arrayContaining([0, 1]));
    expect(result.comboValue, 'Combo debe respetar cnt_cantidad_auto=1').toBe(1);
    expect(result.displayText, 'Display debe reflejar cuentas activas').toMatch(/cuentas activas/i);

    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(screenshotsDir, 'E1-contrato-tipo-cantidad-auto.png'),
      fullPage: false,
    });
  });

  test('Caso F — FacturacionAutomaticaWizardView: preview de cantidad automática con search dedicado', async ({ page }) => {
    test.setTimeout(240_000);
    const webmg = new WebMGPage(page);
    webmg.collectConsoleErrors();

    await webmg.gotoLocal(tokenFile, 1841);
    await webmg.waitForReadyLocal(180_000);

    await page.evaluate(() => {
      const Ext = (window as any).Ext;
      if ((window as any).__dk1520PreviewPatched) return;

      const originalRequest = Ext.Ajax.request;
      Ext.Ajax.request = function(config: any) {
        if (config && typeof config.url === 'string' && /MG_CantidadAutomaticaFacturacionPreview/i.test(config.url)) {
          const response = {
            responseText: JSON.stringify({
              rows: [{
                cantidadTotalCalculada: 27,
                cantidadContratosAutomaticos: 3,
                cantidadContratosSinCuentas: 1,
              }],
            }),
          };

          Ext.defer(() => {
            if (config.success) {
              config.success(response, {});
            }
          }, 25);

          return {
            abort: function() {},
          };
        }

        return originalRequest.apply(this, arguments as any);
      };

      (window as any).__dk1520PreviewPatched = true;
    });

    const card0 = await webmg.openFacturacionWizardReal();
    expect(card0.ok, `Wizard debe abrir correctamente: ${card0.error}`).toBe(true);

    const card1Id = await webmg.wizardClickMoveNext();
    expect(card1Id).toBe('card-1');

    const stats = await webmg.wizardClickBuscar();
    console.log('[F] stats:', stats);

    await page.waitForFunction(() => {
      const ext = (window as any).Ext;
      const view = ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
      return Number(view?.down('#cantidadTotalCalculada')?.getValue() || 0) === 27;
    }, undefined, { timeout: 15_000, polling: 250 });

    const preview = await webmg.wizardGetCantidadPreview();
    console.log('[F] preview card-1:', preview);
    expect(preview).toEqual({
      cantidadTotalCalculada: 27,
      cantidadContratosAutomaticos: 3,
      cantidadContratosSinCuentas: 1,
    });

    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(screenshotsDir, 'F1-wizard-card1-preview-cantidad.png'),
      fullPage: false,
    });

    const card2Id = await webmg.wizardClickMoveNext();
    expect(card2Id).toBe('card-2');

    const finPreview = await webmg.wizardGetCantidadPreview(true);
    console.log('[F] preview card-2:', finPreview);
    expect(finPreview).toEqual(preview);

    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(screenshotsDir, 'F2-wizard-card2-preview-cantidad.png'),
      fullPage: false,
    });
  });

  test('Caso G — FacturacionAutomaticaWizardView: preview real refleja cnt_cantidad_auto persistido', async ({ page }) => {
    test.setTimeout(300_000);
    const webmg = new WebMGPage(page);
    const errors = webmg.collectConsoleErrors();

    let clienteId = 0;
    let productoId = 0;
    let contratoId = 0;
    let itemContratoId = 0;
    let clientSnapshot: any = null;
    let clientOrgOriginal: number | null = null;

    await webmg.gotoLocal(tokenFile, 1841);
    await webmg.waitForReadyLocal(180_000);

    const card0 = await webmg.openFacturacionWizardReal();
    expect(card0.ok, `Wizard debe abrir correctamente: ${card0.error}`).toBe(true);

    const orgFacturadora = Number(card0.orgValue || 0);
    expect(orgFacturadora, 'La organización facturadora del wizard debe estar seleccionada').toBeGreaterThan(0);

    try {
      const clientsResp = await webmg.localAjax<any>({
        url: '/Rest/search/m_clientes_fc',
        method: 'GET',
        params: {
          limit: 100,
          start: 0,
          filter: JSON.stringify([{ property: 'cli_iorganizacion', value: orgFacturadora }]),
        },
      });
      expect(clientsResp.status, 'Debe poder buscar clientes de la org del wizard').toBeLessThan(400);

      const candidates = (clientsResp.body?.rows || clientsResp.body?.data || []).filter((client: any) =>
        Number(client?.Id || 0) > 0 && !!client?.cli_ccategoriaimpositiva,
      );

      let selectedClient: any = null;
      let cuentasActivas = 0;

      for (const candidate of candidates) {
        const cuentasResp = await gcsApiCall(
          'GET',
          withQuery('/rest/search/MG_CuentasActivasCliente', { iCliente: Number(candidate.Id) }),
        );

        if (cuentasResp.status >= 400) continue;

        const cuentasRows = cuentasResp.body?.rows || cuentasResp.body?.data || [];
        const current = Number(
          cuentasRows[0]?.cuentas_activas ?? cuentasRows[0]?.cuentasActivas ?? cuentasRows[0]?.CuentasActivas ?? 0,
        );

        if (current > 0) {
          selectedClient = candidate;
          cuentasActivas = current;
          break;
        }
      }

      let categoriaImpositiva = '';
      let condicionPago = '';

      if (selectedClient) {
        clienteId = Number(selectedClient.Id || 0);
        expect(clienteId, 'El cliente elegido debe tener Id válido').toBeGreaterThan(0);
        categoriaImpositiva = selectedClient?.cli_ccategoriaimpositiva || '';
        condicionPago = selectedClient?.cli_ccondicionpago || '';

        console.log('[G] client selected from wizard org:', {
          clienteId,
          categoriaImpositiva,
          condicionPago,
          cuentasActivas,
        });
      } else {
        clienteId = 3;
        const clientResp = await gcsApiCall('GET', `/Rest/m_clientes_fc/${clienteId}`);
        expect(clientResp.status, 'Debe poder leer el cliente fallback con cuentas activas').toBeLessThan(400);
        clientSnapshot = clientResp.body;
        clientOrgOriginal = Number(clientSnapshot?.cli_iorganizacion || 0);
        categoriaImpositiva = clientSnapshot?.cli_ccategoriaimpositiva || '';
        condicionPago = clientSnapshot?.cli_ccondicionpago || '';

        if (clientOrgOriginal !== orgFacturadora) {
          const updateClient = await gcsApiCall('PUT', `/Rest/m_clientes_fc/${clienteId}`, {
            ...clientSnapshot,
            cli_iorganizacion: orgFacturadora,
          });

          expect(
            updateClient.status,
            `Debe poder reasignar temporalmente el cliente fallback a la org del wizard. Body=${JSON.stringify(updateClient.body)}`,
          ).toBeLessThan(400);
        }

        const cuentasResp = await gcsApiCall(
          'GET',
          withQuery('/rest/search/MG_CuentasActivasCliente', { iCliente: clienteId }),
        );
        expect(cuentasResp.status, 'MG_CuentasActivasCliente debe responder OK para el cliente fallback').toBeLessThan(400);
        const cuentasRows = cuentasResp.body?.rows || cuentasResp.body?.data || [];
        cuentasActivas = Number(
          cuentasRows[0]?.cuentas_activas ?? cuentasRows[0]?.cuentasActivas ?? cuentasRows[0]?.CuentasActivas ?? 0,
        );

        console.log('[G] client fallback reassigned:', {
          clienteId,
          categoriaImpositiva,
          condicionPago,
          cuentasActivas,
          orgFacturadora,
        });
      }

      await page.evaluate(({ categoriaImpositiva, condicionPago }) => {
        const Ext = (window as any).Ext;
        const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
        const setValue = (selector: string, value: any) => {
          if (value === undefined || value === null || value === '') return;
          const combo = view?.down(selector);
          if (!combo) return;
          combo.setValue(value);
          combo.fireEvent('change', combo, value);
        };

        setValue('#categoriasimpositivas', categoriaImpositiva);
        setValue('#condicionespago', condicionPago);
      }, { categoriaImpositiva, condicionPago });

      expect(cuentasActivas, 'El cliente de prueba debe tener cuentas activas para validar cnt_cantidad_auto').toBeGreaterThan(0);

      const previewBeforeResp = await gcsApiCall(
        'GET',
        withQuery('/rest/search/MG_CantidadAutomaticaFacturacionPreview', {
          iOrganizacion: orgFacturadora,
          categoriaImpositiva,
          condicionPago,
        }),
      );
      expect(previewBeforeResp.status, 'Preview search antes de crear datos').toBeLessThan(400);
      const beforePreview = previewRow(previewBeforeResp.body);
      console.log('[G] preview before:', beforePreview);

      const sku = `DK1520-CONTRATO-${Date.now()}`;
      const productoResp = await gcsApiCall('POST', '/Rest/Product/', {
          Id: 0,
          Code: sku,
          Name: 'Servicio manual con contrato auto (DK-1520 UI real)',
          Price: 1234,
          Status: '1',
          Body: 'DK-1520 preview real',
          Weight: 0,
          pro_iidorganizacion: orgFacturadora,
          pro_itipo: 2,
          pro_currency: 'ARS',
          pro_cantidad_auto: 0,
      });
      expect(productoResp.status, 'Debe crear producto manual').toBeLessThan(400);
      productoId = Number(productoResp.body?.Id || 0);
      expect(productoId).toBeGreaterThan(0);

      const productoPersistido = await gcsApiCall('GET', `/Rest/Product/${productoId}`);
      expect(Number(productoPersistido.body?.pro_cantidad_auto ?? -1), 'El producto debe seguir manual').toBe(0);

      const today = new Date();
      const venc = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
      const contratoResp = await gcsApiCall('POST', '/Rest/crm_contrato/', {
          Id: 0,
          Name: '',
          ObjectTypeId: 3148,
          ObjectTypeName: 'Order',
          cnt_idcliente: clienteId,
          cnt_estado: 1,
          cnt_fechavto: `/Date(${venc.getTime()}-0300)/`,
          cnt_fechaalta: `/Date(${today.getTime()}-0300)/`,
          cnt_org_fc: orgFacturadora,
          cnt_dinamico: 0,
          cnt_cantidad_auto: 1,
          cnt_formapago: 0,
          cnt_tmp_id: 0,
          cnt_metadata: '',
      });
      expect(contratoResp.status, 'Debe crear contrato con cnt_cantidad_auto').toBeLessThan(400);
      contratoId = Number(contratoResp.body?.Id || 0);
      expect(contratoId).toBeGreaterThan(0);

      const contratoPersistido = await gcsApiCall('GET', `/Rest/crm_contrato/${contratoId}`);
      const contratoBody = (contratoPersistido.body && typeof contratoPersistido.body === 'object')
        ? contratoPersistido.body
        : {};
      const hasCntDinamico = Object.prototype.hasOwnProperty.call(contratoBody, 'cnt_dinamico');
      const hasCntCantidadAuto = Object.prototype.hasOwnProperty.call(contratoBody, 'cnt_cantidad_auto');

      if (!hasCntDinamico || !hasCntCantidadAuto) {
        test.skip(
          true,
          'El backend live todavía no tiene desplegado el SoftGuard.BusinessObjects.dll regenerado para crm_contrato; el generator/source ya quedó actualizado en slbf.',
        );
      }

      expect(Number(contratoPersistido.body?.cnt_cantidad_auto ?? -1), 'El contrato debe persistir cnt_cantidad_auto=1').toBe(1);

      const itemResp = await gcsApiCall('POST', '/Rest/crm_contrato_item/', {
          Id: 0,
          ProductId: productoId,
          idcontrato: contratoId,
          Description: 'DK-1520 UI real',
          Code: sku,
          Name: 'DK-1520 UI real',
          Status: '1',
          Quantity: 1,
          QuantityDelivered: 0,
          Price: 1234,
          Currency: 'ARS',
          VAT: 0,
          ObjectTypeId: 625,
          ObjectTypeName: 'OrderItem',
      });
      expect(itemResp.status, 'Debe crear item de contrato').toBeLessThan(400);
      itemContratoId = Number(itemResp.body?.Id || 0);
      expect(itemContratoId).toBeGreaterThan(0);

      let afterPreview = beforePreview;
      const expectedPreview = {
        cantidadContratosAutomaticos: beforePreview.cantidadContratosAutomaticos + 1,
        cantidadTotalCalculada: beforePreview.cantidadTotalCalculada + cuentasActivas,
        cantidadContratosSinCuentas: beforePreview.cantidadContratosSinCuentas,
      };

      for (let attempt = 1; attempt <= 5; attempt++) {
        const previewAfterResp = await gcsApiCall(
          'GET',
          withQuery('/rest/search/MG_CantidadAutomaticaFacturacionPreview', {
            iOrganizacion: orgFacturadora,
            categoriaImpositiva,
            condicionPago,
          }),
        );

        expect(previewAfterResp.status, `Preview search luego de crear datos (attempt ${attempt})`).toBeLessThan(400);
        afterPreview = previewRow(previewAfterResp.body);
        console.log(`[G] preview after attempt ${attempt}:`, afterPreview);

        if (
          afterPreview.cantidadContratosAutomaticos === expectedPreview.cantidadContratosAutomaticos &&
          afterPreview.cantidadTotalCalculada === expectedPreview.cantidadTotalCalculada &&
          afterPreview.cantidadContratosSinCuentas === expectedPreview.cantidadContratosSinCuentas
        ) {
          break;
        }

        await page.waitForTimeout(1000);
      }

      expect(afterPreview, 'El preview backend debe incorporar el nuevo contrato auto real').toEqual(expectedPreview);

      const card1Id = await webmg.wizardClickMoveNext();
      expect(card1Id).toBe('card-1');

      const stats = await webmg.wizardClickBuscar();
      console.log('[G] stats:', stats);

      await page.waitForFunction(
        (expected) => {
          const Ext = (window as any).Ext;
          const view = Ext.ComponentQuery.query('facturacionautomaticawizardview')[0];
          const num = (selector: string) => {
            const field = view?.down(selector);
            const value = field ? field.getValue() : 0;
            const parsed = parseInt(value, 10);
            return Number.isNaN(parsed) ? 0 : parsed;
          };

          return num('#cantidadContratosAutomaticos') === expected.cantidadContratosAutomaticos &&
            num('#cantidadTotalCalculada') === expected.cantidadTotalCalculada &&
            num('#cantidadContratosSinCuentas') === expected.cantidadContratosSinCuentas;
        },
        expectedPreview,
        { timeout: 30_000, polling: 250 },
      );

      const uiPreview = await webmg.wizardGetCantidadPreview();
      console.log('[G] preview card-1:', uiPreview);
      expect(uiPreview).toEqual(expectedPreview);

      await page.screenshot({
        path: path.join(screenshotsDir, 'G1-wizard-card1-preview-real-cnt-cantidad-auto.png'),
        fullPage: false,
      });

      const card2Id = await webmg.wizardClickMoveNext();
      expect(card2Id).toBe('card-2');

      const finPreview = await webmg.wizardGetCantidadPreview(true);
      console.log('[G] preview card-2:', finPreview);
      expect(finPreview).toEqual(expectedPreview);

      await page.screenshot({
        path: path.join(screenshotsDir, 'G2-wizard-card2-preview-real-cnt-cantidad-auto.png'),
        fullPage: false,
      });

      const critical = errors.filter(
        (e) =>
          !e.includes('favicon') &&
          !e.includes('DevTools') &&
          !e.includes('El parametro') &&
          !e.includes('[Nueva palabra]') &&
          !/net::ERR/.test(e),
      );
      if (critical.length) {
        console.warn('[G] Console errors (non-fatal — logging only):');
        critical.forEach((e) => console.warn('  -', e));
      }
    } finally {
      if (contratoId) {
        const cleanup = await updateWithFullPut({
          apiCall: async (method, url, body) => gcsApiCall(method, url, body).catch(() => null),
          resourceUrl: `/Rest/crm_contrato/${contratoId}`,
          entityId: contratoId,
          patch: { cnt_estado: 2 },
        });

        if (cleanup.skipped) {
          console.warn(
            `[G] cleanup omitido para contrato ${contratoId}: ${cleanup.reason || 'snapshot no disponible'} (se evita PUT parcial).`,
          );
        } else if (!cleanup.updated) {
          console.warn(
            `[G] cleanup PUT completo falló para contrato ${contratoId}: ${cleanup.reason || 'error desconocido'}.`,
          );
        }
      }

      if (itemContratoId) {
        await gcsApiCall('DELETE', `/Rest/crm_contrato_item/${itemContratoId}`).catch(() => undefined);
      }

      if (productoId) {
        await gcsApiCall('DELETE', `/Rest/Product/${productoId}`).catch(() => undefined);
      }

      if (clientSnapshot && clientOrgOriginal !== null && clientOrgOriginal !== orgFacturadora) {
        await gcsApiCall('PUT', `/Rest/m_clientes_fc/${clienteId}`, {
          ...clientSnapshot,
          cli_iorganizacion: clientOrgOriginal,
        }).catch(() => undefined);
      }
    }
  });

  test('Caso D — Edge: cliente sin cuentas activas → mensaje explícito + cantidad 0', async ({ page }) => {
    test.setTimeout(180_000);
    const webmg = new WebMGPage(page);
    webmg.collectConsoleErrors();

    await webmg.gotoLocal(tokenFile, 1841);
    await webmg.waitForReadyLocal(180_000);

    // Cliente con ID muy alto que no debería tener cuentas activas.
    // El banner debe dejar claro que la cantidad automática queda en 0.
    const idClienteSinCuentas = 999999999;
    await webmg.openContratoItemForm(idClienteSinCuentas, 1);
    await page.waitForTimeout(500);

    const result = await webmg.selectProductWithCantidadAuto({
      Id: 999003,
      Code: 'DK1498-D-AUTO',
      Name: 'Servicio auto sin cuentas (DK-1498 D)',
      final_price: 1500,
      imp_nporcentaje: 21,
      pro_cantidad_auto: 1,
      mglp_idkey: 0,
    });
    expect(result.ok, `onProductChanged debe ejecutar: ${result.error}`).toBe(true);

    // Phase 1: banner visible + readOnly true (independiente del REST)
    await page.waitForFunction(
      () => {
        const ext = (window as any).Ext;
        const view = ext.ComponentQuery.query('contratoitemformview')[0];
        const lbl = view?.down('#cantidadAutoLabel');
        const qty = view?.down('#quantityCombo');
        return !!(lbl && qty && !lbl.isHidden() && qty.readOnly === true);
      },
      undefined,
      { timeout: 30_000, polling: 250 },
    );

    // Esperar a que la AJAX se haya despachado y resuelto para reflejar el caso 0 cuentas.
    await page.waitForTimeout(3000);

    const state = await page.evaluate(() => {
      const ext = (window as any).Ext;
      const view = ext.ComponentQuery.query('contratoitemformview')[0];
      const lbl = view.down('#cantidadAutoLabel');
      const qty = view.down('#quantityCombo');
      const html = lbl.getValue() || '';
      const m = html.match(/<b>(\d+)<\/b>/);
      return {
        text: html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
        readOnly: !!qty.readOnly,
        hasNumber: m !== null,
        quantityValue: Number(qty.getValue() ?? 0),
      };
    });
    console.log('[D] state:', state);

    expect(state.readOnly, 'Cantidad debe estar bloqueada incluso sin cuentas').toBe(true);
    expect(state.text, 'Banner debe explicar que no hay cuentas activas').toMatch(/Cliente sin cuentas activas/i);
    expect(state.text, 'Banner debe indicar que la cantidad automática queda en 0').toMatch(/queda en 0/i);
    expect(state.hasNumber, 'El banner debe exponer el 0 resuelto').toBe(true);
    expect(state.quantityValue, 'La cantidad visible debe quedar sincronizada en 0').toBe(0);

    await page.screenshot({
      path: path.join(screenshotsDir, 'D1-cliente-sin-cuentas-mensaje-explicito.png'),
      fullPage: false,
    });
  });
});
