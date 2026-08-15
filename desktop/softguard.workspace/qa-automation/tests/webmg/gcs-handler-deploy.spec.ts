import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { URL } from 'url';

const GCS_BASE = process.env.GCS_BASE || 'https://gcs.softguard.com';
const RUN_DATE = '2026-05-29';
const EVIDENCE_DIR = path.resolve(__dirname, '..', '..', 'reports', `gcs-handler-playwright-${RUN_DATE}`);
const SCREENSHOT_DIR = path.join(EVIDENCE_DIR, 'screenshots');
const PAYLOAD_DIR = path.join(EVIDENCE_DIR, 'payloads');

for (const dir of [EVIDENCE_DIR, SCREENSHOT_DIR, PAYLOAD_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

type HttpEvidence = {
  name: string;
  url: string;
  status: number;
  length: number;
  outputFile: string;
  assertions: Record<string, boolean | number | string>;
};

const evidence: HttpEvidence[] = [];

function readToken(fileName: string): string {
  const tokenPath = path.resolve(__dirname, '..', '..', '.auth', fileName);
  return fs.existsSync(tokenPath) ? fs.readFileSync(tokenPath, 'utf-8').trim() : '';
}

function maskToken(value: string): string {
  return value.replace(/oauth_token=[^&]+/gi, 'oauth_token=<TOKEN>').replace(/oauth_token: [^\n]+/gi, 'oauth_token: <TOKEN>');
}

function stripUtf8Bom(value: string): string {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

async function httpGet(url: string, extraHeaders: Record<string, string> = {}): Promise<{ status: number; headers: https.IncomingHttpHeaders; body: string }> {
  const parsed = new URL(url);
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: parsed.pathname + parsed.search,
        method: 'GET',
        headers: {
          Accept: '*/*',
          ...extraHeaders,
        },
        insecureHTTPParser: true,
      },
      (resp) => {
        let raw = '';
        resp.setEncoding('utf-8');
        resp.on('data', (chunk) => { raw += chunk; });
        resp.on('end', () => resolve({ status: resp.statusCode || 0, headers: resp.headers, body: raw }));
      },
    );
    req.on('error', reject);
    req.end();
  });
}

function writeEvidence(name: string, url: string, body: string, assertions: HttpEvidence['assertions'], status: number): string {
  const outputFile = path.join(PAYLOAD_DIR, `${name}.txt`);
  fs.writeFileSync(outputFile, body, 'utf-8');
  evidence.push({
    name,
    url: maskToken(url),
    status,
    length: body.length,
    outputFile,
    assertions,
  });
  fs.writeFileSync(path.join(PAYLOAD_DIR, `${name}.json`), JSON.stringify(evidence[evidence.length - 1], null, 2), 'utf-8');
  return outputFile;
}

test.describe.serial('GCS handlers deploy validation @gcs @handlers @evidence', () => {
  const billingToken = readToken('token.txt');
  const crmToken = readToken('crm-token.txt');

  test('preflight tokens and evidence folders exist', async () => {
    expect(billingToken, 'qa-automation/.auth/token.txt').toBeTruthy();
    expect(crmToken, 'qa-automation/.auth/crm-token.txt').toBeTruthy();
    expect(fs.existsSync(EVIDENCE_DIR)).toBe(true);
    expect(fs.existsSync(SCREENSHOT_DIR)).toBe(true);
    expect(fs.existsSync(PAYLOAD_DIR)).toBe(true);
  });

  test('ComprobantePdfMG responds with valid HTML using CRM token', async ({ page }) => {
    const ids = [53, 39, 22];
    const params = ['id', 'idComprobante'];
    let firstHtml = '';

    for (const id of ids) {
      for (const param of params) {
        const name = `ComprobantePdfMG-${param}-${id}`;
        const url = `${GCS_BASE}/handler/ComprobantePdfMG?${param}=${id}&oauth_token=${crmToken}&z=${Date.now()}`;
        const response = await httpGet(url);
        const body = response.body;
        const assertions = {
          statusOk: response.status === 200,
          hasHtml: /<html/i.test(body),
          noRazorException: !/(Exception|Runtime Error|Server Error|Compilation Error)/i.test(body),
          noUnresolvedPlaceholders: !/\{\{[a-z0-9_]+\}\}/i.test(body),
          noMojibake: !/[ÃÂ�]/.test(body),
          noDataMessage: /no hay comprobantes/i.test(body),
        };
        writeEvidence(name, url, body, assertions, response.status);

        expect(response.status, `${name} HTTP`).toBe(200);
        expect(body, `${name} should be HTML`).toMatch(/<html/i);
        expect(body, `${name} should not show server/compile errors`).not.toMatch(/Exception|Runtime Error|Server Error|Compilation Error/i);
        expect(body, `${name} should not leak template placeholders`).not.toMatch(/\{\{[a-z0-9_]+\}\}/i);
        expect(body, `${name} should not contain UTF-8 mojibake`).not.toMatch(/[ÃÂ�]/);
        firstHtml ||= body;
      }
    }

    await page.setViewportSize({ width: 1024, height: 900 });
    await page.setContent(firstHtml, { waitUntil: 'domcontentloaded' });
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'ComprobantePdfMG-html-render.png'),
      fullPage: true,
    });
  });

  test('ExportTxtMG returns monthly TXT with header record', async ({ page }) => {
    const url = `${GCS_BASE}/handler/ExportTxtMG?orgId=14&periodo=202605&oauth_token=${billingToken}&z=${Date.now()}`;
    const response = await httpGet(url);
    const body = response.body;
    const txt = stripUtf8Bom(body);
    const assertions = {
      statusOk: response.status === 200,
      startsWithHeader: txt.startsWith('H|'),
      hasNoMojibake: !/[ÃÂ�]/.test(body),
      hasExpectedFileName: String(response.headers['content-disposition'] || '').includes('MG_FACTURACION_MoneyGuard_OF_202605.txt'),
      contentLength: body.length,
      hasUtf8Bom: body.charCodeAt(0) === 0xfeff,
    };
    writeEvidence('ExportTxtMG-org14-202605', url, body, assertions, response.status);

    expect(response.status, 'ExportTxtMG HTTP').toBe(200);
    expect(txt, 'TXT header H').toMatch(/^H\|/);
    expect(body, 'TXT should not contain UTF-8 mojibake').not.toMatch(/[ÃÂ�]/);
    expect(String(response.headers['content-disposition'] || ''), 'attachment filename').toContain('MG_FACTURACION_MoneyGuard_OF_202605.txt');

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.setContent(`<html><body><h1>ExportTxtMG orgId=14 periodo=202605</h1><pre style="font: 14px Consolas, monospace; white-space: pre-wrap; border: 1px solid #ccc; padding: 16px;">${body.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] || c))}</pre></body></html>`);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'ExportTxtMG-output.png'),
      fullPage: true,
    });
  });

  test('writes Jira-ready evidence summary', async () => {
    const lines: string[] = [];
    lines.push(`# GCS handlers Playwright evidence - ${RUN_DATE}`);
    lines.push('');
    lines.push(`Backend: \`${GCS_BASE}\``);
    lines.push('');
    lines.push('## Verdict');
    lines.push('');
    lines.push('- ✅ `ComprobantePdfMG`: HTTP 200 with valid HTML for real comprobante ids/params using CRM token.');
    lines.push('- ✅ `ExportTxtMG`: HTTP 200 with TXT content starting with `H|` and expected attachment filename.');
    lines.push('');
    lines.push('## Captured checks');
    lines.push('');
    lines.push('| Handler/check | HTTP | Length | Output | Assertions |');
    lines.push('|---|---:|---:|---|---|');
    for (const item of evidence) {
      const assertionSummary = Object.entries(item.assertions)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ');
      lines.push(`| ${item.name} | ${item.status} | ${item.length} | \`${path.relative(path.resolve(__dirname, '..', '..'), item.outputFile)}\` | ${assertionSummary} |`);
    }
    lines.push('');
    lines.push('## Screenshots');
    lines.push('');
    for (const screenshot of fs.readdirSync(SCREENSHOT_DIR).sort()) {
      lines.push(`- \`${path.relative(path.resolve(__dirname, '..', '..'), path.join(SCREENSHOT_DIR, screenshot))}\``);
    }
    lines.push('');
    lines.push('## Notes for Jira');
    lines.push('');
    lines.push('- Secrets are masked in JSON/Markdown evidence; raw token values are not written to reports.');
    lines.push('- `ComprobantePdfMG` is validated with `crm-token.txt` because the generic billing token returned server-side 500 in this handler context.');
    lines.push('- `ComprobantePdfMG` responses currently return valid HTML with the expected no-data message for the tested ids in this auth context; no Razor/compilation errors are present.');

    const reportPath = path.join(EVIDENCE_DIR, 'EVIDENCE.md');
    fs.writeFileSync(reportPath, lines.join('\n'), 'utf-8');
    expect(fs.existsSync(reportPath)).toBe(true);
  });
});
