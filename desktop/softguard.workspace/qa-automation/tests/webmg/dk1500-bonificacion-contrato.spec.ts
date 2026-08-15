import { expect, test } from '@playwright/test';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import { URL } from 'url';

const TOKEN = (() => {
  const tf = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
  return fs.existsSync(tf) ? fs.readFileSync(tf, 'utf-8').trim() : '';
})();

const GCS_BASE = process.env.GCS_BASE || 'https://gcs.softguard.com';
const CLIENTE_ID = parseInt(process.env.DK1500_CLIENTE_ID || '0', 10);
const ORG_FC = parseInt(process.env.DK1500_ORG_FC || '0', 10);
const UNIT_PRICE = parseFloat(process.env.DK1500_UNIT_PRICE || '1000');
const QUANTITY = parseFloat(process.env.DK1500_QUANTITY || '2');

const EVIDENCE_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1500-bonificacion');
const SCREENSHOTS_DIR = path.join(EVIDENCE_ROOT, 'screenshots');
const PAYLOADS_DIR = path.join(EVIDENCE_ROOT, 'payloads');
for (const dir of [EVIDENCE_ROOT, SCREENSHOTS_DIR, PAYLOADS_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

type BonificacionTipo = 'monto_fijo' | 'porcentaje';

interface Scenario {
  key: string;
  label: string;
  tipo: BonificacionTipo;
  valor: number;
  permanente: boolean;
  desde?: string;
  hasta?: string;
  expectedDiscount: number;
  expectedApplied: boolean;
}

interface CleanupState {
  productoId: number;
  contratoId: number;
  itemId: number;
  clienteOrgOriginal?: number;
  clienteSnapshot?: any;
  clienteCategoria?: string;
}

const scenarios: Scenario[] = [
  {
    key: 'monto-fijo',
    label: 'Monto fijo',
    tipo: 'monto_fijo',
    valor: 250,
    permanente: false,
    desde: offsetDate(-2),
    hasta: offsetDate(10),
    expectedDiscount: 250,
    expectedApplied: true,
  },
  {
    key: 'porcentaje',
    label: 'Porcentaje',
    tipo: 'porcentaje',
    valor: 25,
    permanente: false,
    desde: offsetDate(-2),
    hasta: offsetDate(10),
    expectedDiscount: 500,
    expectedApplied: true,
  },
  {
    key: 'vencida',
    label: 'Vencida',
    tipo: 'porcentaje',
    valor: 25,
    permanente: false,
    desde: offsetDate(-20),
    hasta: offsetDate(-5),
    expectedDiscount: 0,
    expectedApplied: false,
  },
  {
    key: 'permanente',
    label: 'Permanente',
    tipo: 'porcentaje',
    valor: 10,
    permanente: true,
    expectedDiscount: 200,
    expectedApplied: true,
  },
];

function offsetDate(deltaDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + deltaDays);
  return d.toISOString().slice(0, 10);
}

function formatPdfMoney(value: number): string {
  return value.toFixed(2).replace('.', ',');
}

async function apiCall(
  step: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: any,
): Promise<{ status: number; body: any }> {
  const target = new URL(url);
  const headers: Record<string, string> = {
    oauth_token: TOKEN,
    Accept: 'application/json',
  };
  let payload: string | undefined;

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = typeof body === 'string' ? body : JSON.stringify(body);
    headers['Content-Length'] = Buffer.byteLength(payload).toString();
  }

  const result: { status: number; body: any } = await new Promise((resolve) => {
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
          try { parsed = JSON.parse(raw); } catch { /* keep raw */ }
          resolve({ status: resp.statusCode || 0, body: parsed });
        });
      },
    );
    req.on('error', (e) => resolve({ status: 0, body: { __error: e.message } }));
    if (payload) req.write(payload);
    req.end();
  });

  fs.writeFileSync(
    path.join(PAYLOADS_DIR, `${step}.json`),
    JSON.stringify(
      {
        step,
        method,
        url: url.replace(TOKEN, '<TOKEN>'),
        requestBody: body,
        responseStatus: result.status,
        responseBody: result.body,
      },
      null,
      2,
    ),
  );

  return result;
}

function rowsOf(body: any): any[] {
  if (!body || typeof body !== 'object') return [];
  return body.rows || body.data || [];
}

function bonificacionMetadataFor(scenario: Scenario): string {
  return JSON.stringify({
    bonificacion: {
      activa: true,
      tipo: scenario.tipo,
      valor: scenario.valor,
      permanente: scenario.permanente,
      vigencia_desde: scenario.desde || '',
      vigencia_hasta: scenario.hasta || '',
    },
  });
}

async function createScenarioData(scenario: Scenario): Promise<CleanupState> {
  const cleanup: CleanupState = { productoId: 0, contratoId: 0, itemId: 0 };
  const productCode = `DK1500-${scenario.key}-${Date.now()}`;
  const gross = UNIT_PRICE * QUANTITY;

  const prod = await apiCall(
    `${scenario.key}-01-product`,
    'POST',
    `${GCS_BASE}/Rest/Product/`,
    {
      Id: 0,
      Code: productCode,
      Name: `Servicio bonificacion ${scenario.label}`,
      Price: UNIT_PRICE,
      Status: '1',
      Body: scenario.label,
      Weight: 0,
      pro_iidorganizacion: ORG_FC,
      pro_itipo: 2,
      pro_currency: 'ARS',
      pro_cantidad_auto: 0,
    },
  );
  expect(prod.status, 'Crear producto').toBeLessThan(400);
  cleanup.productoId = Number(prod.body?.Id || 0);
  expect(cleanup.productoId).toBeGreaterThan(0);

  const today = new Date();
  const venc = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
  const contract = await apiCall(
    `${scenario.key}-02-contract`,
    'POST',
    `${GCS_BASE}/Rest/crm_contrato/`,
    {
      Id: 0,
      Name: '',
      ObjectTypeId: 3148,
      ObjectTypeName: 'Order',
      cnt_idcliente: CLIENTE_ID,
      cnt_estado: 1,
      cnt_fechavto: `/Date(${venc.getTime()}-0300)/`,
      cnt_fechaalta: `/Date(${today.getTime()}-0300)/`,
      cnt_org_fc: ORG_FC,
      cnt_dinamico: 0,
      cnt_formapago: 0,
      cnt_tmp_id: 0,
      cnt_metadata: bonificacionMetadataFor(scenario),
    },
  );
  expect(contract.status, 'Crear contrato').toBeLessThan(400);
  cleanup.contratoId = Number(contract.body?.Id || 0);
  expect(cleanup.contratoId).toBeGreaterThan(0);

  const item = await apiCall(
    `${scenario.key}-03-item`,
    'POST',
    `${GCS_BASE}/Rest/crm_contrato_item/`,
    {
      Id: 0,
      ProductId: cleanup.productoId,
      idcontrato: cleanup.contratoId,
      Description: `Servicio ${scenario.label}`,
      Code: productCode,
      Name: `Servicio ${scenario.label}`,
      Status: '1',
      Quantity: QUANTITY,
      QuantityDelivered: 0,
      Price: UNIT_PRICE,
      Currency: 'ARS',
      VAT: 0,
      ObjectTypeId: 625,
      ObjectTypeName: 'OrderItem',
    },
  );
  expect(item.status, 'Crear item de contrato').toBeLessThan(400);
  cleanup.itemId = Number(item.body?.Id || 0);
  expect(cleanup.itemId).toBeGreaterThan(0);

  fs.writeFileSync(
    path.join(PAYLOADS_DIR, `${scenario.key}-expected.json`),
    JSON.stringify(
      {
        grossSubtotal: gross,
        expectedDiscount: scenario.expectedDiscount,
        expectedNetSubtotal: gross - scenario.expectedDiscount,
        metadata: JSON.parse(bonificacionMetadataFor(scenario)),
      },
      null,
      2,
    ),
  );

  return cleanup;
}

async function ensureClientOrgForFacturacion(scenario: Scenario, cleanup: CleanupState): Promise<void> {
  const client = await apiCall(
    `${scenario.key}-00-client-get`,
    'GET',
    `${GCS_BASE}/Rest/m_clientes_fc/${CLIENTE_ID}`,
  );
  expect(client.status, 'Leer cliente de prueba').toBeLessThan(400);

  cleanup.clienteSnapshot = client.body;
  cleanup.clienteOrgOriginal = Number(client.body?.cli_iorganizacion || 0);
  cleanup.clienteCategoria = String(client.body?.cli_ccategoriaimpositiva || '');

  if (cleanup.clienteOrgOriginal === ORG_FC) {
    return;
  }

  const updated = { ...client.body, cli_iorganizacion: ORG_FC };
  const put = await apiCall(
    `${scenario.key}-00-client-set-org`,
    'PUT',
    `${GCS_BASE}/Rest/m_clientes_fc/${CLIENTE_ID}`,
    updated,
  );
  expect(put.status, 'Asignar org facturadora al cliente').toBeLessThan(400);
}

async function facturarAndFindComprobante(
  scenario: Scenario,
  contratoId: number,
  productId: number,
): Promise<any> {
  const preFilter = encodeURIComponent(JSON.stringify([{ property: 'cbc_icliente', value: CLIENTE_ID }]));
  const sortDesc = encodeURIComponent(JSON.stringify([{ property: 'Id', direction: 'DESC' }]));
  const before = await apiCall(
    `${scenario.key}-04-snapshot-pre`,
    'GET',
    `${GCS_BASE}/Rest/search/m_comprobantes_cab_fc?filter=${preFilter}&sort=${sortDesc}&limit=10`,
  );
  const previousMaxId = Math.max(0, ...rowsOf(before.body).map((row: any) => Number(row.Id || 0)));

  const fact = await apiCall(
    `${scenario.key}-05-facturar`,
    'GET',
    `${GCS_BASE}/rest/search/MG_ContratosGenerarFacturas?idorganizacion=${ORG_FC}&template=0`,
  );
  expect(fact.status, 'Facturar contratos').toBeLessThan(400);

  const directRow = rowsOf(fact.body)[0];
  const directComprobanteId = Number(directRow?.cbc_iCodigo_ID || directRow?.Id || 0);
  if (directComprobanteId > 0) {
    const direct = await apiCall(
      `${scenario.key}-05b-comprobante-direct`,
      'GET',
      `${GCS_BASE}/Rest/m_comprobantes_cab_fc/${directComprobanteId}`,
    );
    if (direct.status < 400) {
      return direct.body;
    }

    const directFilter = encodeURIComponent(JSON.stringify([
      { property: 'cbc_icodigo_id', value: directComprobanteId },
    ]));
    const directSearch = await apiCall(
      `${scenario.key}-05c-comprobante-search`,
      'GET',
      `${GCS_BASE}/Rest/search/m_comprobantes_cab_fc?filter=${directFilter}&limit=1`,
    );
    const directSearchRow = rowsOf(directSearch.body)[0];
    if (directSearch.status < 400 && directSearchRow) {
      return directSearchRow;
    }
  }

  const contratoFilter = encodeURIComponent(JSON.stringify([
    { property: 'cfc_cntiid', value: contratoId },
  ]));
  const comprobanteByContrato = await apiCall(
    `${scenario.key}-05d-comprobante-por-contrato`,
    'GET',
    `${GCS_BASE}/Rest/search/m_comprobantes_cab_fc?filter=${contratoFilter}&limit=5`,
  );
  const comprobanteByContratoRows = rowsOf(comprobanteByContrato.body);
  const comprobanteByContratoRow = comprobanteByContratoRows.find(
    (row: any) => Number(row.cfc_cntiid || 0) === contratoId,
  );
  if (comprobanteByContrato.status < 400 && comprobanteByContratoRow) {
    return comprobanteByContratoRow;
  }

  const after = await apiCall(
    `${scenario.key}-06-snapshot-post`,
    'GET',
    `${GCS_BASE}/Rest/search/m_comprobantes_cab_fc?filter=${preFilter}&sort=${sortDesc}&limit=20`,
  );

  const rows = rowsOf(after.body).filter((row: any) => Number(row.Id || 0) > previousMaxId);
  expect(rows.length, 'Debe generarse algun comprobante nuevo').toBeGreaterThan(0);

  const novedadesProductoFilter = encodeURIComponent(JSON.stringify([
    { property: 'nov_idproducto', value: productId },
  ]));
  const novedadesProducto = await apiCall(
    `${scenario.key}-07-novedades-producto`,
    'GET',
    `${GCS_BASE}/Rest/search/t_novedades_fc?filter=${novedadesProductoFilter}&sort=${sortDesc}&limit=20`,
  );
  const novedadIds = new Set<number>(
    rowsOf(novedadesProducto.body)
      .map((row: any) => Number(row.nov_icodigo_ID || row.Id || 0))
      .filter((id: number) => id > 0),
  );

  let comprobanteId = 0;
  for (const row of rows) {
    const currentId = Number(row.Id || 0);
    const itemFilter = encodeURIComponent(JSON.stringify([{ property: 'cbi_icodigocab', value: currentId }]));
    const itemsResp = await apiCall(
      `${scenario.key}-08-items-cb-${currentId}`,
      'GET',
      `${GCS_BASE}/Rest/search/m_comprobantes_item_fc?filter=${itemFilter}`,
    );
    const found = rowsOf(itemsResp.body).some(
      (item: any) =>
        novedadIds.has(Number(item.cbi_inovedad || 0)) ||
        novedadIds.has(Number(item.cbi_iproducto || 0)),
    );
    if (found) {
      comprobanteId = currentId;
      break;
    }
  }

  const ours = rows.find((row: any) => Number(row.Id || 0) === comprobanteId)
    || rows.find((row: any) => Number(row.cfc_cntiid || 0) === contratoId)
    || rows[0];

  expect(ours, `Debe encontrarse comprobante nuevo para contrato ${contratoId}`).toBeTruthy();
  return ours;
}

async function fetchPdfHtml(stepKey: string, comprobanteId: number): Promise<string> {
  const pdf = await apiCall(
    `${stepKey}-07-pdf`,
    'GET',
    `${GCS_BASE}/handler/ComprobantePdfMG?idComprobante=${comprobanteId}&oauth_token=${TOKEN}`,
  );
  expect(pdf.status, 'PDF/HTML del comprobante').toBeLessThan(400);
  const html =
    typeof pdf.body === 'string'
      ? pdf.body
      : typeof pdf.body === 'object'
        ? JSON.stringify(pdf.body)
        : String(pdf.body);
  expect(html.toLowerCase()).toContain('<html');
  return html;
}

async function fetchComprobanteItems(stepKey: string, comprobanteId: number): Promise<any[]> {
  const itemFilter = encodeURIComponent(JSON.stringify([{ property: 'cbi_icodigocab', value: comprobanteId }]));
  const items = await apiCall(
    `${stepKey}-items-direct`,
    'GET',
    `${GCS_BASE}/Rest/search/m_comprobantes_item_fc?filter=${itemFilter}`,
  );
  expect(items.status, `Items del comprobante ${comprobanteId}`).toBeLessThan(400);
  return rowsOf(items.body);
}

async function cleanupScenario(stepKey: string, cleanup: CleanupState): Promise<void> {
  if (cleanup.contratoId) {
    await apiCall(
      `${stepKey}-cleanup-contract`,
      'PUT',
      `${GCS_BASE}/Rest/crm_contrato/${cleanup.contratoId}`,
      { Id: cleanup.contratoId, cnt_estado: 2 },
    ).catch(() => undefined);
  }
  if (cleanup.itemId) {
    await apiCall(
      `${stepKey}-cleanup-item`,
      'DELETE',
      `${GCS_BASE}/Rest/crm_contrato_item/${cleanup.itemId}`,
    ).catch(() => undefined);
  }
  if (cleanup.productoId) {
    await apiCall(
      `${stepKey}-cleanup-product`,
      'DELETE',
      `${GCS_BASE}/Rest/Product/${cleanup.productoId}`,
    ).catch(() => undefined);
  }
  if (
    cleanup.clienteSnapshot &&
    cleanup.clienteOrgOriginal !== undefined &&
    cleanup.clienteOrgOriginal !== ORG_FC
  ) {
    const restored = { ...cleanup.clienteSnapshot, cli_iorganizacion: cleanup.clienteOrgOriginal };
    await apiCall(
      `${stepKey}-cleanup-client-org`,
      'PUT',
      `${GCS_BASE}/Rest/m_clientes_fc/${CLIENTE_ID}`,
      restored,
    ).catch(() => undefined);
  }
}

test.describe.serial('DK-1500/DK-1501 - Bonificacion por contrato @dk-1500 @dk-1501 @e2e-real', () => {
  test.skip(!TOKEN, 'Falta qa-automation/.auth/token.txt');
  test.skip(CLIENTE_ID === 0 || ORG_FC === 0, 'Setear DK1500_CLIENTE_ID y DK1500_ORG_FC');

  for (const scenario of scenarios) {
    test(`Escenario real - ${scenario.label}`, async ({ page }) => {
      const cleanup: CleanupState = { productoId: 0, contratoId: 0, itemId: 0 };
      const gross = UNIT_PRICE * QUANTITY;
      const expectedNet = gross - scenario.expectedDiscount;

      try {
        await ensureClientOrgForFacturacion(scenario, cleanup);
        const created = await createScenarioData(scenario);
        cleanup.productoId = created.productoId;
        cleanup.contratoId = created.contratoId;
        cleanup.itemId = created.itemId;

        const comprobante = await facturarAndFindComprobante(
          scenario,
          cleanup.contratoId,
          cleanup.productoId,
        );
        const comprobanteId = Number(comprobante.Id || 0);
        expect(comprobanteId).toBeGreaterThan(0);

        const comprobanteItems = await fetchComprobanteItems(scenario.key, comprobanteId);
        expect(comprobanteItems.length, 'Debe existir al menos un item en el comprobante').toBeGreaterThan(0);
        const firstItem = comprobanteItems[0];
        expect(
          Math.abs(Number(firstItem.cbi_icantidad || 0) - QUANTITY),
          'La cantidad del item debe coincidir con la quantity del contrato en este escenario',
        ).toBeLessThan(0.02);
        expect(
          Math.abs(Number(firstItem.cbi_yimporte || 0) - UNIT_PRICE),
          'cbi_yimporte debe persistirse como precio unitario; si vale Quantity x Price, el ambiente sigue con el SP viejo',
        ).toBeLessThan(0.02);

        const subtotal = Number(comprobante.cbc_ysubtotal || 0);
        const total = Number(comprobante.cbc_ytotal || 0);

        expect(
          Math.abs(subtotal - expectedNet),
          `Subtotal neto esperado para ${scenario.label}`,
        ).toBeLessThan(0.02);
        expect(total).toBeGreaterThanOrEqual(subtotal);

        const html = await fetchPdfHtml(scenario.key, comprobanteId);
        fs.writeFileSync(path.join(EVIDENCE_ROOT, `${scenario.key}.html`), html, 'utf-8');

        await page.setViewportSize({ width: 1100, height: 1500 });
        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(300);
        await page.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${scenario.key}.png`),
          fullPage: true,
        });

        expect(html.toLowerCase()).toContain('descuento');
        expect(html.toLowerCase()).not.toContain('no hay comprobantes');

        if (scenario.expectedApplied) {
          expect(html).toContain(formatPdfMoney(scenario.expectedDiscount));
          expect(html).toContain(formatPdfMoney(gross));
          expect(html).toContain(formatPdfMoney(expectedNet));
        } else {
          expect(Math.abs(subtotal - gross), 'Bonificacion vencida no debe aplicar').toBeLessThan(0.02);
          expect(html).not.toContain(formatPdfMoney(300));
        }
      } finally {
        await cleanupScenario(scenario.key, cleanup);
      }
    });
  }
});
