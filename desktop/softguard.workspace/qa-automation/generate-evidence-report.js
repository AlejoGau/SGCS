/**
 * generate-evidence-report.js
 * Generates a self-contained HTML evidence report for DK-1493 + DK-1498 sprint.
 * Run from: qa-automation/
 *   node generate-evidence-report.js
 */

const fs   = require('fs');
const path = require('path');

const REPORTS_DIR  = path.join(__dirname, 'reports');
const SCREENS_DIR  = path.join(REPORTS_DIR, 'screenshots');
const OUT_FILE     = path.join(REPORTS_DIR, 'DK-sprint-evidence.html');
const JSON_RESULTS = path.join(REPORTS_DIR, 'json', 'results.json');

function imgBase64(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return 'data:image/png;base64,' + fs.readFileSync(filePath).toString('base64');
}

function formatDuration(ms) {
  const s = Math.round(ms / 1000);
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}

// ── load test results ────────────────────────────────────────────────────────
const results    = JSON.parse(fs.readFileSync(JSON_RESULTS, 'utf8'));
const stats      = results.stats;
const runDate    = new Date(stats.startTime).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
const duration   = formatDuration(stats.duration);

// ── screenshot helper ────────────────────────────────────────────────────────
function ss(name, fromRoot = false) {
  const p = fromRoot
    ? path.join(REPORTS_DIR, name)
    : path.join(SCREENS_DIR, name);
  return imgBase64(p);
}

// ── build test list ──────────────────────────────────────────────────────────
const allTests = [];
for (const suite of results.suites || []) {
  function collectTests(s, prefix) {
    if (s.specs) {
      for (const spec of s.specs) {
        for (const test of spec.tests || []) {
          allTests.push({
            title: (prefix ? prefix + ' › ' : '') + spec.title,
            status: test.status,
            duration: test.results && test.results[0] ? test.results[0].duration : 0,
          });
        }
      }
    }
    if (s.suites) {
      for (const child of s.suites) {
        collectTests(child, (prefix ? prefix + ' › ' : '') + (s.title || ''));
      }
    }
  }
  collectTests(suite, '');
}

function testRowsHtml(filterFn) {
  return allTests
    .filter(filterFn)
    .map(t => {
      const icon  = t.status === 'expected' ? '✅' : t.status === 'skipped' ? '⏭' : '❌';
      const dur   = formatDuration(t.duration);
      const title = t.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<tr><td class="status-${t.status}">${icon}</td><td>${title}</td><td class="dur">${dur}</td></tr>`;
    })
    .join('\n');
}

// ── image card helper ────────────────────────────────────────────────────────
function imgCard(label, src, caption) {
  if (!src) return `<div class="img-card missing"><div class="img-label">${label}</div><div class="missing-msg">Imagen no encontrada</div></div>`;
  return `
  <div class="img-card">
    <div class="img-label">${label}</div>
    <img src="${src}" alt="${label}" loading="lazy" />
    ${caption ? `<div class="img-caption">${caption}</div>` : ''}
  </div>`;
}

// ── screenshots ──────────────────────────────────────────────────────────────
const dk1493_01 = ss('dk1493-01-fieldset-expanded.png');
const dk1493_02 = ss('dk1493-02-variable-inserted-emisor-nombre.png');
const dk1493_03 = ss('dk1493-03-preview-interpolated.png');
const dk1493_04 = ss('dk1493-04-qr-afip-checkbox-enabled.png');
const dk1498_01 = ss('dk1498-01-producto-form-combo.png');
const dk1498_02 = ss('dk1498-02-quantity-manual-unlocked.png');
const dk1498_03 = ss('dk1498-03-quantity-auto-locked.png');
const pdfReal   = ss('pdf-evidence-real-comprobante22.png', true);
const pdfPrev   = ss('pdf-evidence-preview-org14.png', true);

// ── HTML ─────────────────────────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Sprint Evidence — DK-1493 &amp; DK-1498</title>
<style>
  :root {
    --blue:#1565c0; --green:#2e7d32; --red:#c62828; --gray:#546e7a;
    --bg:#f5f7fa; --card:#fff; --border:#e0e6ef;
    --pass:#e8f5e9; --fail:#ffebee;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:#222;font-size:14px}
  header{background:var(--blue);color:#fff;padding:24px 32px;display:flex;justify-content:space-between;align-items:center}
  header h1{font-size:22px;font-weight:700;letter-spacing:.5px}
  header .meta{font-size:12px;opacity:.85;text-align:right;line-height:1.7}
  .badge{display:inline-block;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:700;margin-left:6px}
  .badge-pass{background:#43a047;color:#fff}
  .badge-fail{background:#e53935;color:#fff}
  main{max-width:1200px;margin:0 auto;padding:24px 20px}
  .summary-row{display:flex;gap:16px;margin-bottom:24px;flex-wrap:wrap}
  .stat-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px 24px;flex:1;min-width:130px;text-align:center}
  .stat-card .val{font-size:28px;font-weight:800;color:var(--blue)}
  .stat-card .val.pass{color:var(--green)}
  .stat-card .val.fail{color:var(--red)}
  .stat-card .lbl{font-size:11px;color:var(--gray);margin-top:4px;text-transform:uppercase;letter-spacing:.5px}
  section{background:var(--card);border:1px solid var(--border);border-radius:8px;margin-bottom:28px;overflow:hidden}
  section .sec-header{background:var(--blue);color:#fff;padding:12px 20px;display:flex;align-items:center;gap:10px}
  section .sec-header h2{font-size:15px;font-weight:700}
  section .sec-header .ticket{font-size:11px;background:rgba(255,255,255,.25);padding:2px 8px;border-radius:10px;font-weight:600}
  section .sec-body{padding:20px}
  .ticket-desc{font-size:13px;color:#444;margin-bottom:16px;padding:10px 14px;background:#f0f4ff;border-left:3px solid var(--blue);border-radius:4px}
  table{width:100%;border-collapse:collapse;margin-bottom:4px}
  table th{background:#f0f4ff;font-size:11px;text-transform:uppercase;letter-spacing:.5px;padding:7px 12px;text-align:left;color:var(--blue)}
  table td{padding:7px 12px;border-bottom:1px solid var(--border);font-size:13px;vertical-align:middle}
  table tr:last-child td{border-bottom:none}
  .status-expected{color:var(--green);font-size:16px}
  .status-unexpected{color:var(--red);font-size:16px}
  .dur{color:var(--gray);font-size:12px;white-space:nowrap}
  .screenshots{display:flex;flex-wrap:wrap;gap:14px;margin-top:18px}
  .img-card{border:1px solid var(--border);border-radius:8px;overflow:hidden;flex:1;min-width:280px;max-width:580px;background:#fff}
  .img-card.missing{background:#fff8e1;border-color:#ffe082}
  .img-label{background:#f5f7fa;border-bottom:1px solid var(--border);padding:8px 12px;font-size:11px;font-weight:700;text-transform:uppercase;color:var(--gray);letter-spacing:.5px}
  .img-card img{width:100%;display:block;cursor:zoom-in}
  .img-caption{padding:8px 12px;font-size:11px;color:#555;border-top:1px solid var(--border)}
  .missing-msg{padding:24px;text-align:center;color:#f57f17;font-size:13px}
  footer{text-align:center;padding:20px;color:var(--gray);font-size:11px;border-top:1px solid var(--border);margin-top:8px}
  @media(max-width:700px){.screenshots{flex-direction:column}.img-card{max-width:100%}}
  /* lightbox */
  #lightbox{display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;cursor:zoom-out;align-items:center;justify-content:center}
  #lightbox.open{display:flex}
  #lightbox img{max-width:92vw;max-height:92vh;border-radius:4px;box-shadow:0 8px 40px rgba(0,0,0,.6)}
</style>
</head>
<body>

<header>
  <div>
    <h1>Sprint Evidence Report
      <span class="badge badge-pass">✅ ${stats.expected} PASSED</span>
      ${stats.unexpected > 0 ? `<span class="badge badge-fail">❌ ${stats.unexpected} FAILED</span>` : ''}
    </h1>
    <div style="font-size:13px;margin-top:6px;opacity:.9">DK-1493: Config dinámica factura &nbsp;|&nbsp; DK-1498: Cantidad dinámica contrato</div>
  </div>
  <div class="meta">
    <div>Fecha: ${runDate}</div>
    <div>Duración total: ${duration}</div>
    <div>Rama: feature/DK-1493-config-dinamica-factura</div>
    <div>Framework: Playwright + ExtJS 7.3.1</div>
  </div>
</header>

<main>

  <!-- Summary Stats -->
  <div class="summary-row">
    <div class="stat-card"><div class="val">${stats.expected + stats.skipped}</div><div class="lbl">Total Tests</div></div>
    <div class="stat-card"><div class="val pass">${stats.expected}</div><div class="lbl">Pasaron ✅</div></div>
    <div class="stat-card"><div class="val ${stats.unexpected > 0 ? 'fail' : ''}">${stats.unexpected}</div><div class="lbl">Fallaron ❌</div></div>
    <div class="stat-card"><div class="val">${stats.skipped}</div><div class="lbl">Salteados</div></div>
    <div class="stat-card"><div class="val">${duration}</div><div class="lbl">Duración</div></div>
  </div>

  <!-- ════════════════════════════════════════════ DK-1493 ════════════════ -->
  <section>
    <div class="sec-header">
      <h2>DK-1493 — Configuración Dinámica de Factura (WebMG)</h2>
      <span class="ticket">@dk-1493</span>
    </div>
    <div class="sec-body">
      <div class="ticket-desc">
        Permite configurar por organización facturadora: texto de <strong>observaciones</strong> con variables interpolables
        (emisor, cliente, comprobante), <strong>footer fijo</strong> y habilitación del <strong>QR AFIP</strong>.
        La configuración se persiste en <code>org_cmetadata</code> y se aplica al template PDF (Id=8359).
      </div>

      <table>
        <thead><tr><th></th><th>Test</th><th>Duración</th></tr></thead>
        <tbody>
          ${testRowsHtml(t => t.title.includes('dk-1493') || t.title.includes('factura-config') || t.title.includes('Factura Config') || t.title.includes('DK-1493'))}
        </tbody>
      </table>

      <div class="screenshots">
        ${imgCard('DK-1493-01 · Fieldset expandido',     dk1493_01, 'Fieldset "Configuración de Factura" visible y expandido en AdministratorSearch')}
        ${imgCard('DK-1493-02 · Variable insertada',      dk1493_02, 'Variable {{emisor_nombre}} insertada en el textarea de Observaciones via menú contextual')}
        ${imgCard('DK-1493-03 · Preview interpolado',     dk1493_03, 'Vista previa muestra las variables reemplazadas con datos de ejemplo')}
        ${imgCard('DK-1493-04 · Checkbox QR AFIP',        dk1493_04, 'Checkbox "Mostrar QR AFIP" habilitado y funcional')}
        ${imgCard('PDF Evidence · Comprobante real #22',  pdfReal,   'Comprobante real renderizado via ComprobantePdfMG (id=22, template id=8359)')}
        ${imgCard('PDF Evidence · Preview org 14',        pdfPrev,   'Preview de comprobante via handler con parámetros de org')}
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════ DK-1498 ════════════════ -->
  <section>
    <div class="sec-header">
      <h2>DK-1498 — Cantidad Dinámica en Contrato (por cuentas activas)</h2>
      <span class="ticket">@dk-1498</span>
    </div>
    <div class="sec-body">
      <div class="ticket-desc">
        Agrega campo <code>pro_cantidad_auto</code> a <strong>Product</strong>. Cuando un producto tiene cantidad automática,
        el campo <em>Cantidad</em> en <code>ContratoItemFormView</code> se bloquea y se muestra un aviso informativo.
        El SP <code>MG_ContratoAFactura</code> fue actualizado para calcular la cantidad a partir de cuentas activas.
      </div>

      <table>
        <thead><tr><th></th><th>Test</th><th>Duración</th></tr></thead>
        <tbody>
          ${testRowsHtml(t => t.title.includes('dk-1498') || t.title.includes('DK-1498') || t.title.includes('cantidad') || t.title.includes('Cantidad') || t.title.includes('pro_cantidad_auto') || t.title.includes('ContratoItem') || t.title.includes('STProductos'))}
        </tbody>
      </table>

      <div class="screenshots">
        ${imgCard('DK-1498-01 · Combo en form de Producto',   dk1498_01, 'STProductosFormView con el combo pro_cantidad_auto (0=Manual / 1=Automático)')}
        ${imgCard('DK-1498-02 · Cantidad manual (editable)',  dk1498_02, 'Producto manual: campo Cantidad editable, sin aviso de bloqueo')}
        ${imgCard('DK-1498-03 · Cantidad auto (bloqueada)',   dk1498_03, 'Producto automático: campo Cantidad bloqueado + aviso "calculada automáticamente por cuentas activas"')}
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════ All Tests ═════════════ -->
  <section>
    <div class="sec-header">
      <h2>Todos los tests — Detalle completo</h2>
    </div>
    <div class="sec-body">
      <table>
        <thead><tr><th></th><th>Test</th><th>Duración</th></tr></thead>
        <tbody>
          ${testRowsHtml(() => true)}
        </tbody>
      </table>
    </div>
  </section>

</main>

<footer>
  Generado automáticamente · SoftGuard QA Automation · ${new Date().toISOString().slice(0,10)}
</footer>

<!-- Lightbox -->
<div id="lightbox"><img id="lb-img" src="" alt=""/></div>
<script>
  document.querySelectorAll('.img-card img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('lb-img').src = img.src;
      document.getElementById('lightbox').classList.add('open');
    });
  });
  document.getElementById('lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('open');
  });
</script>

</body>
</html>`;

fs.writeFileSync(OUT_FILE, html, 'utf8');
const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`✅ Reporte generado: ${OUT_FILE}`);
console.log(`   Tamaño: ${kb} KB`);
console.log(`   Tests: ${stats.expected} pasaron, ${stats.unexpected} fallaron`);
console.log(`   Screenshots incluidos: ${[dk1493_01,dk1493_02,dk1493_03,dk1493_04,dk1498_01,dk1498_02,dk1498_03,pdfReal,pdfPrev].filter(Boolean).length}/9`);
