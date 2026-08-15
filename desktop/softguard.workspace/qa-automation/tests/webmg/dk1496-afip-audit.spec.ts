import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as https from 'https';
import * as path from 'path';
import { URL } from 'url';

const GCS_BASE = process.env.BASE_URL || 'https://gcs.softguard.com';
const TOKEN_FILE = path.resolve(__dirname, '..', '..', '.auth', 'token.txt');
const TOKEN = fs.existsSync(TOKEN_FILE) ? fs.readFileSync(TOKEN_FILE, 'utf-8').trim() : '';
const REPORT_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'dk1496-afip');
const SCREENSHOT_ROOT = path.join(REPORT_ROOT, 'screenshots');
const RUN_DATE = new Date().toISOString().slice(0, 10);

/**
 * IMPORTANT:
 * This audit validates AFIP directly against GCS REST/search endpoints.
 * It does NOT navigate AdministratorSearch UI, so `?version=` does not apply here.
 * If we add UI evidence over AdministratorSearch in GCS, use:
 *   https://gcs.softguard.com/a/AdministratorSearch?version=
 * to avoid the compiled/cached bundle.
 */

interface AuditEntry {
  check: string;
  status: 'pass' | 'fail' | 'warn';
  details: unknown;
  screenshot?: string;
}

const audit: AuditEntry[] = [];

function withToken(url: string): string {
  const parsed = new URL(url, GCS_BASE);
  if (TOKEN) {
    parsed.searchParams.set('oauth_token', TOKEN);
  }
  return parsed.toString();
}

function rowsOf(body: any): any[] {
  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.rows)) return body.rows;
  if (Array.isArray(body?.data)) return body.data;
  return [];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function summarizeDetails(details: unknown): string {
  return JSON.stringify(details, null, 2).slice(0, 5000);
}

async function ensureReportDirs(): Promise<void> {
  await fsp.mkdir(REPORT_ROOT, { recursive: true });
  await fsp.mkdir(SCREENSHOT_ROOT, { recursive: true });
}

async function writeAuditReport(): Promise<void> {
  await ensureReportDirs();
  const reportPath = path.join(REPORT_ROOT, 'dk1496-afip-audit.json');
  await fsp.writeFile(
    reportPath,
    JSON.stringify(
      {
        ticket: 'DK-1496',
        generatedAt: new Date().toISOString(),
        baseUrl: GCS_BASE,
        tokenPresent: Boolean(TOKEN),
        checks: audit,
      },
      null,
      2,
    ),
    'utf-8',
  );
}

async function writeEvidenceMarkdown(): Promise<void> {
  await ensureReportDirs();
  const lines: string[] = [];
  lines.push(`# DK-1496 — Evidencia auditoría AFIP refresh ${RUN_DATE}`);
  lines.push('');
  lines.push(`Ambiente: \`${GCS_BASE}\``);
  lines.push(`Token OAuth: ${TOKEN ? 'presente en `qa-automation/.auth/token.txt` sin exponer valor.' : 'AUSENTE'}`);
  lines.push('');
  lines.push('## Metodología');
  lines.push('');
  lines.push('- Validación ejecutada directamente contra GCS consumiendo `Rest/search/*` con token OAuth.');
  lines.push('- Esta suite **no navega `AdministratorSearch` UI**, por lo que acá no aplica `?version=`.');
  lines.push('- Si se agrega evidencia UI en GCS sobre `AdministratorSearch`, debe usarse `https://gcs.softguard.com/a/AdministratorSearch?version=` para evitar el bundle compilado/cacheado.');
  lines.push('');
  lines.push('## Resultado');
  lines.push('');
  for (const entry of audit) {
    const icon = entry.status === 'pass' ? '✅' : entry.status === 'warn' ? '⚠️' : '❌';
    lines.push(`- ${icon} **${entry.check}** — ${entry.status.toUpperCase()}`);
  }
  lines.push('');
  lines.push('## Artefactos');
  lines.push('');
  lines.push('- `qa-automation/reports/dk1496-afip/dk1496-afip-audit.json`');
  lines.push('- `qa-automation/reports/dk1496-afip/DK-1496-AFIP-AUDIT-EVIDENCE.md`');
  for (const entry of audit) {
    if (entry.screenshot) {
      lines.push(`- \`${entry.screenshot}\``);
    }
  }
  lines.push('');
  lines.push('## Evidencia visual');
  lines.push('');
  for (const entry of audit) {
    if (!entry.screenshot) continue;
    lines.push(`### ${entry.check}`);
    lines.push('');
    lines.push(`![${entry.check}](${path.relative(REPORT_ROOT, path.resolve(entry.screenshot)).replace(/\\/g, '/')})`);
    lines.push('');
    lines.push('```json');
    lines.push(summarizeDetails(entry.details));
    lines.push('```');
    lines.push('');
  }
  await fsp.writeFile(path.join(REPORT_ROOT, 'DK-1496-AFIP-AUDIT-EVIDENCE.md'), lines.join('\n'), 'utf-8');
}

async function getJsonWithInsecureParser(url: string): Promise<{ status: number; body: any }> {
  return new Promise((resolve) => {
    const req = https.request(
      url,
      {
        method: 'GET',
        insecureHTTPParser: true,
        headers: {
          Accept: 'application/json,text/plain,*/*',
          Cookie: TOKEN ? `OAuth_Token=${TOKEN}` : '',
        },
      },
      (resp) => {
        let raw = '';
        resp.setEncoding('utf8');
        resp.on('data', (chunk) => {
          raw += chunk;
        });
        resp.on('end', () => {
          let body: any = null;
          try {
            body = JSON.parse(raw);
          } catch {
            body = { raw: raw.substring(0, 2000) };
          }
          resolve({ status: resp.statusCode || 0, body });
        });
      },
    );

    req.setTimeout(60000, () => {
      req.destroy(new Error('timeout'));
    });
    req.on('error', (error) => {
      resolve({ status: 0, body: { error: error.message } });
    });
    req.end();
  });
}

async function restSearch(search: string, params: Record<string, string | number> = {}): Promise<{ status: number; body: any; rows: any[] }> {
  const url = new URL(`/Rest/search/${search}`, GCS_BASE);
  url.searchParams.set('page', String(params.page ?? 1));
  url.searchParams.set('start', String(params.start ?? 0));
  url.searchParams.set('limit', String(params.limit ?? 500));
  for (const [key, value] of Object.entries(params)) {
    if (!['page', 'start', 'limit'].includes(key)) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await getJsonWithInsecureParser(withToken(url.toString()));
  return { status: response.status, body: response.body, rows: rowsOf(response.body) };
}

async function renderEvidence(page: any, screenshotFile: string, title: string, status: AuditEntry['status'], details: unknown): Promise<string> {
  const color = status === 'pass' ? '#1b5e20' : status === 'warn' ? '#ef6c00' : '#b71c1c';
  const bg = status === 'pass' ? '#e8f5e9' : status === 'warn' ? '#fff3e0' : '#ffebee';
  const pretty = escapeHtml(summarizeDetails(details));
  const absPath = path.join(SCREENSHOT_ROOT, screenshotFile);

  await page.setViewportSize({ width: 1500, height: 1000 });
  await page.setContent(`
    <html>
      <body style="font-family: Segoe UI, Arial, sans-serif; background: #f5f7fb; margin: 0; padding: 32px;">
        <div style="max-width: 1280px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,.08); overflow: hidden; border: 1px solid #d9e2f1;">
          <div style="padding: 24px 28px; background: ${bg}; border-bottom: 1px solid #d9e2f1;">
            <div style="font-size: 14px; color: #4b5563; margin-bottom: 6px;">DK-1496 · Auditoría AFIP · ${RUN_DATE}</div>
            <div style="font-size: 28px; font-weight: 700; color: ${color};">${escapeHtml(title)}</div>
            <div style="font-size: 16px; margin-top: 8px; color: ${color}; text-transform: uppercase; font-weight: 700;">${status}</div>
          </div>
          <div style="padding: 24px 28px;">
            <div style="font-size: 15px; color: #374151; margin-bottom: 12px;">Backend: ${escapeHtml(GCS_BASE)}</div>
            <pre style="white-space: pre-wrap; word-break: break-word; background: #0f172a; color: #e2e8f0; padding: 20px; border-radius: 12px; font: 13px Consolas, monospace; line-height: 1.5;">${pretty}</pre>
          </div>
        </div>
      </body>
    </html>
  `, { waitUntil: 'domcontentloaded' });

  await page.screenshot({ path: absPath, fullPage: true });
  return absPath;
}

test.describe.serial('DK-1496 AFIP integration audit @dk-1496 @afip @gcs @evidence', () => {
  test.beforeAll(async () => {
    await ensureReportDirs();
  });

  test.afterAll(async () => {
    await writeAuditReport();
    await writeEvidenceMarkdown();
  });

  test.beforeEach(() => {
    test.skip(!TOKEN, 'Falta qa-automation/.auth/token.txt — correr proyecto auth-setup antes de la auditoría AFIP');
  });

  test('t_comprobantes_fc should expose AFIP CAE codes for factura/NC/ND mappings', async ({ page }) => {
    const result = await restSearch('t_comprobantes_fc', { limit: 1000 });
    expect(result.status, 'GET /Rest/search/t_comprobantes_fc').toBeLessThan(400);
    expect(result.rows.length, 'Debe haber tipos de comprobante configurados').toBeGreaterThan(0);

    const electronicCandidates = result.rows.filter((row) => {
      const description = `${row.cbt_cdescripcion ?? ''} ${row.Name ?? ''}`.toLowerCase();
      const tipo = Number(row.cbt_ntipo ?? 0);
      return tipo === 1 || tipo === 2 || tipo === 8 || /factura|nota\s*cr[eé]dito|nota\s*d[eé]bito|nc\b|nd\b/.test(description);
    });

    const missing = electronicCandidates.filter((row) => Number(row.cbt_nCbteCAE ?? 0) <= 0);
    const summary = {
      total: result.rows.length,
      electronicCandidates: electronicCandidates.length,
      missingCount: missing.length,
      missing: missing.slice(0, 25).map((row) => ({
        Id: row.Id,
        cbt_ccodigo: row.cbt_ccodigo,
        cbt_cdescripcion: row.cbt_cdescripcion ?? row.Name,
        cbt_ntipo: row.cbt_ntipo,
        cbt_cletra: row.cbt_cletra,
        cbt_nCbteCAE: row.cbt_nCbteCAE,
        org: row.org_cnombre ?? row.cbt_idOrganizacionFacturadora,
      })),
      sample: electronicCandidates.slice(0, 12).map((row) => ({
        Id: row.Id,
        cbt_ccodigo: row.cbt_ccodigo,
        cbt_cdescripcion: row.cbt_cdescripcion ?? row.Name,
        cbt_ntipo: row.cbt_ntipo,
        cbt_cletra: row.cbt_cletra,
        cbt_nCbteCAE: row.cbt_nCbteCAE,
        org: row.org_cnombre ?? row.cbt_idOrganizacionFacturadora,
      })),
    };

    const screenshot = await renderEvidence(page, `${RUN_DATE}-01-cbte-cae-mapping.png`, 'Mapeos AFIP de tipos de comprobante', missing.length === 0 ? 'pass' : 'fail', summary);
    audit.push({ check: 't_comprobantes_fc.cbt_nCbteCAE', status: missing.length === 0 ? 'pass' : 'fail', details: summary, screenshot });
    await writeAuditReport();

    expect(electronicCandidates.length, 'Debe encontrar facturas/NC/ND para auditar').toBeGreaterThan(0);
    expect(missing, `Comprobantes electrónicos sin cbt_nCbteCAE: ${JSON.stringify(summary.missing, null, 2)}`).toHaveLength(0);
  });

  test('t_impuestos_fc should expose AFIP IVA external codes for taxable rates', async ({ page }) => {
    const result = await restSearch('t_impuestos_fc', { limit: 1000 });
    expect(result.status, 'GET /Rest/search/t_impuestos_fc').toBeLessThan(400);
    expect(result.rows.length, 'Debe haber impuestos configurados').toBeGreaterThan(0);

    const taxable = result.rows.filter((row) => Number(row.imp_nporcentaje ?? 0) > 0);
    const missing = taxable.filter((row) => String(row.imp_extcode ?? '').trim() === '');
    const knownCodes = new Set(['3', '4', '5', '6', '8', '9']);
    const unusual = taxable.filter((row) => {
      const code = String(row.imp_extcode ?? '').trim();
      return code !== '' && !knownCodes.has(code);
    });

    const summary = {
      total: result.rows.length,
      taxable: taxable.length,
      missingCount: missing.length,
      unusualCount: unusual.length,
      missing: missing.slice(0, 25).map((row) => ({
        Id: row.Id,
        imp_cdescripcion: row.imp_cdescripcion ?? row.Name,
        imp_nporcentaje: row.imp_nporcentaje,
        imp_extcode: row.imp_extcode,
        org: row.nombreOrganizacion ?? row.imp_idorganizacion,
      })),
      unusual: unusual.slice(0, 25).map((row) => ({
        Id: row.Id,
        imp_cdescripcion: row.imp_cdescripcion ?? row.Name,
        imp_nporcentaje: row.imp_nporcentaje,
        imp_extcode: row.imp_extcode,
        org: row.nombreOrganizacion ?? row.imp_idorganizacion,
      })),
    };

    const status: AuditEntry['status'] = missing.length === 0 ? (unusual.length === 0 ? 'pass' : 'warn') : 'fail';
    const screenshot = await renderEvidence(page, `${RUN_DATE}-02-iva-extcode-mapping.png`, 'Mapeos AFIP de alícuotas IVA', status, summary);
    audit.push({ check: 't_impuestos_fc.imp_extcode', status, details: summary, screenshot });
    await writeAuditReport();

    expect(taxable.length, 'Debe encontrar alícuotas IVA imponibles para auditar').toBeGreaterThan(0);
    expect(missing, `Alícuotas imponibles sin imp_extcode: ${JSON.stringify(summary.missing, null, 2)}`).toHaveLength(0);
  });

  test('AFIP CAE queue/log REST searches should be reachable for monitoring', async ({ page }) => {
    const cae = await restSearch('MG_Afip_Cae', { limit: 10 });
    const ws = await restSearch('MG_Afip_Cae_Ws', { limit: 10 });

    const summary = {
      MG_Afip_Cae: { status: cae.status, rows: cae.rows.length, bodyPreview: cae.body?.raw ?? undefined },
      MG_Afip_Cae_Ws: { status: ws.status, rows: ws.rows.length, bodyPreview: ws.body?.raw ?? undefined },
    };

    const status: AuditEntry['status'] = cae.status < 400 && ws.status < 400 ? 'pass' : 'fail';
    const screenshot = await renderEvidence(page, `${RUN_DATE}-03-cae-queue-reachability.png`, 'Reachability de MG_Afip_Cae y MG_Afip_Cae_Ws', status, summary);
    audit.push({ check: 'MG_Afip_Cae / MG_Afip_Cae_Ws reachability', status, details: summary, screenshot });
    await writeAuditReport();

    expect(cae.status, 'GET /Rest/search/MG_Afip_Cae').toBeLessThan(400);
    expect(ws.status, 'GET /Rest/search/MG_Afip_Cae_Ws').toBeLessThan(400);
  });

  test('AFIP operational searches should be callable or explicitly reported as unavailable', async ({ page }) => {
    const searches: Array<{ name: string; params: Record<string, string | number> }> = [
      { name: 'AfipCaePendingSearch', params: {} },
      { name: 'AfipCaeComprobanteImpuestoSearch', params: { cbcicodigoid: 0 } },
      { name: 'AfipCaeRetrySearch', params: { dryRun: 1, limit: 5 } },
    ];

    const results = [] as Array<{ search: string; status: number; rows: number; bodyPreview?: string }>;
    for (const search of searches) {
      const result = await restSearch(search.name, { limit: 5, ...search.params });
      results.push({
        search: search.name,
        status: result.status,
        rows: result.rows.length,
        bodyPreview: result.body?.raw ?? undefined,
      });
    }

    const unavailable = results.filter((result) => result.status >= 400);
    const summary = { results, unavailable };
    const status: AuditEntry['status'] = unavailable.length === 0 ? 'pass' : 'warn';
    const screenshot = await renderEvidence(page, `${RUN_DATE}-04-afip-operational-searches.png`, 'Searches operativos AFIP', status, summary);
    audit.push({ check: 'AFIP operational search reachability', status, details: summary, screenshot });
    await writeAuditReport();

    expect(unavailable, `Searches AFIP no disponibles vía REST: ${JSON.stringify(unavailable, null, 2)}`).toHaveLength(0);
  });

  test('writes final visual summary for Jira handoff', async ({ page }) => {
    const summary = {
      generatedAt: new Date().toISOString(),
      baseUrl: GCS_BASE,
      tokenPresent: Boolean(TOKEN),
      totalChecks: audit.length,
      passed: audit.filter((item) => item.status === 'pass').length,
      warned: audit.filter((item) => item.status === 'warn').length,
      failed: audit.filter((item) => item.status === 'fail').length,
      checks: audit.map((item) => ({
        check: item.check,
        status: item.status,
        screenshot: item.screenshot ? path.relative(REPORT_ROOT, item.screenshot).replace(/\\/g, '/') : '',
      })),
    };

    const screenshot = await renderEvidence(page, `${RUN_DATE}-00-afip-summary.png`, 'Resumen auditoría AFIP DK-1496', summary.failed > 0 ? 'fail' : summary.warned > 0 ? 'warn' : 'pass', summary);
    audit.push({ check: 'DK-1496 summary handoff', status: summary.failed > 0 ? 'fail' : summary.warned > 0 ? 'warn' : 'pass', details: summary, screenshot });
    await writeAuditReport();
    await writeEvidenceMarkdown();

    expect(summary.totalChecks, 'Debe haber checks auditados').toBeGreaterThanOrEqual(4);
  });
});
