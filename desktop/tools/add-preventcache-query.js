#!/usr/bin/env node
/*
 Adds ?v=${build.timestamp} to all asset paths with remote: true
 in app.json files under softguard.workspace/apps/<app>/app.json, but only
 when the path has no existing query string. Preserves JSON validity
 and writes pretty JSON with 4-space indentation and a trailing newline.
*/

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const APPS_DIR = path.join(ROOT, 'softguard.workspace', 'apps');

function updateAppJson(filePath) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error('read error:', filePath, e.message);
    return false;
  }
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    console.error('skip (invalid json):', filePath);
    return false;
  }

  let changed = false;
  ['js', 'css'].forEach((key) => {
    const arr = json[key];
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (item && typeof item === 'object' && item.remote === true && typeof item.path === 'string') {
          const p = item.path;
          if (!p.includes('?')) {
            item.path = p + '?v=${build.timestamp}';
            changed = true;
          }
        }
      });
    }
  });

  if (changed) {
    const out = JSON.stringify(json, null, 4) + '\n';
    fs.writeFileSync(filePath, out, 'utf8');
  }
  return changed;
}

function main() {
  if (!fs.existsSync(APPS_DIR)) {
    console.error('apps dir not found:', APPS_DIR);
    process.exit(1);
  }
  const apps = fs.readdirSync(APPS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(APPS_DIR, d.name, 'app.json'))
    .filter((p) => fs.existsSync(p));

  let total = 0;
  apps.forEach((file) => {
    const changed = updateAppJson(file);
    if (changed) {
      total++;
      console.log('updated:', path.relative(ROOT, file));
    }
  });
  console.log(`done. files changed: ${total}/${apps.length}`);
}

main();
