// Discovery script — uses raw https with insecureHTTPParser to tolerate GCS malformed headers
const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const TOKEN = fs.readFileSync(path.join(__dirname, '..', '.auth', 'token.txt'), 'utf-8').trim();
const GCS = process.env.GCS_BASE || 'https://gcs.softguard.com';

function rest(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const req = https.request({
      method: 'GET',
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      headers: { oauth_token: TOKEN, accept: '*/*' },
      insecureHTTPParser: true,
    }, (res) => {
      let chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf-8');
        let body;
        try { body = JSON.parse(text); } catch { body = text.slice(0, 300); }
        resolve({ status: res.statusCode, body });
      });
    });
    req.on('error', (e) => resolve({ status: 0, body: { __error: e.message } }));
    req.end();
  });
}

(async () => {
  console.log('[1/3] Listando clientes (m_clientes_fc DESC, limit 200)...');
  const r = await rest(`${GCS}/Rest/search/m_clientes_fc?limit=200&start=0`);
  console.log('  HTTP', r.status);
  if (r.status >= 400 || typeof r.body === 'string' || r.body.__error) {
    console.log('  body:', JSON.stringify(r.body).slice(0, 500));
    return;
  }
  const rows = r.body.rows || r.body.data || [];
  console.log(`  Encontrados ${rows.length} clientes.`);

  console.log('[2/3] Consultando MG_CuentasActivasCliente...');
  const candidatos = [];
  for (let i = 0; i < rows.length; i++) {
    const c = rows[i];
    if (!c.cli_iorganizacion || !c.cli_ccategoriaimpositiva) continue;
    const r2 = await rest(`${GCS}/rest/search/MG_CuentasActivasCliente?iCliente=${c.Id}`);
    if (r2.status >= 400 || typeof r2.body === 'string' || r2.body.__error) continue;
    const rs = r2.body.rows || r2.body.data || [];
    const n = rs.length > 0 ? Number(rs[0].cuentas_activas ?? rs[0].cuentasActivas ?? 0) : 0;
    if (n > 0) {
      candidatos.push({
        Id: c.Id,
        org: c.cli_iorganizacion,
        nombre: ((c.cli_cnombre || '') + ' ' + (c.cli_capellido || c.cli_crazonsocial || '')).trim(),
        cuentas: n,
        cat: c.cli_ccategoriaimpositiva,
      });
      if (candidatos.length >= 10) break;
    }
    if (i > 0 && i % 25 === 0) console.log(`  ... revisados ${i}, candidatos: ${candidatos.length}`);
  }

  console.log('[3/3] Candidatos:');
  candidatos.sort((a, b) => b.cuentas - a.cuentas);
  console.table(candidatos);

  if (candidatos.length === 0) {
    console.log('\nNo se encontro cliente apto.');
    return;
  }

  const best = candidatos[0];
  console.log(`\nMejor: CLIENTE_ID=${best.Id}  ORG_FC=${best.org}  cuentas=${best.cuentas}`);
  fs.writeFileSync(path.join(__dirname, 'discovered-ids.json'), JSON.stringify({
    DK1498_CLIENTE_ID: best.Id,
    DK1498_ORG_FC: best.org,
    cuentas_activas: best.cuentas,
    nombre: best.nombre,
    todos: candidatos,
  }, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
