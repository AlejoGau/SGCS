Guidelines for editing Sencha app.json and Windows/PowerShell notes

- Source vs build: edit only the source `app.json` under `softguard.workspace/apps/<App>/app.json`. Never edit the generated files under `softguard.workspace/build/**`.
- Prevent-cache for remote assets: for every asset with `"remote": true` in `js` or `css`, append `?v=${build.timestamp}` to the `path`. This ensures the microloader appends its cache-buster with `&` instead of producing a `/?...` on some Linux builds.
- Safer automation: prefer the Node script `tools/add-preventcache-query.js` to update all apps consistently.
  - Usage: `node tools/add-preventcache-query.js`
  - The script parses JSON and writes pretty output with 4-space indentation and a trailing newline, avoiding formatting breakage.

Windows / PowerShell cautions

- Avoid line-ending surprises:
  - Do not use `Set-Content -NoNewline` unless intentionally removing the trailing newline — it can make diffs look like "all lines changed" in some tools.
  - If you must use PowerShell, prefer `Set-Content -Encoding UTF8` (PowerShell 7 writes UTF-8 without BOM by default; Windows PowerShell may include BOM). Be consistent across runs.
  - When transforming files line-by-line with `Get-Content`, PowerShell reconstructs newlines; this can alter final newlines/encoding. Use a JSON-aware tool (Node script above) instead of regex replacements when possible.

Sencha specifics

- `production.loader.cache` controls the microloader cache-buster globally. We rely on the default behavior and only add `?v=${build.timestamp}` to remote assets.
- Keep JSON indentation to 4 spaces; avoid tabs for consistency.
- After changes, validate in a production build that remote URLs look like `.../file.js?v=<ts>&_dc=<ts>` (no trailing `/?`).

Recovery

- If a file’s formatting gets mangled by a shell edit, reformat by reading/writing via Node:
  - `node -e "const f='path/to/app.json', fs=require('fs'); const o=JSON.parse(fs.readFileSync(f,'utf8')); fs.writeFileSync(f, JSON.stringify(o,null,4)+'\n');"`

Process for editing Sencha controllers safely

- Locate the exact insertion point with a quick Node snippet (avoid manual guessing).
  - `node -e "const fs=require('fs');const text=fs.readFileSync('path','utf8');const idx=text.indexOf('texto_objetivo');console.log(idx);"`
- Capture the surrounding snippet before modifying anything:
  - `node -e "const fs=require('fs');const text=fs.readFileSync('path','utf8');const idx=text.indexOf('texto_objetivo');console.log(text.slice(idx, idx+N));"`
- Use a throwaway Node script to perform replacements atomically instead of manual editing:
  ```powershell
  $script = @'
  const fs=require("fs");
  const path="path/to/controller.js";
  let content=fs.readFileSync(path,"utf8");
  const target=`fragmento exacto`;
  const replacement=`nuevo fragmento`;
  if(!content.includes(target)) throw new Error("target not found");
  content=content.replace(target,replacement);
  fs.writeFileSync(path,content,"utf8");
  '@
  Set-Content temp-script.js $script
  node temp-script.js
  Remove-Item temp-script.js
  ```
- Después de cada modificación revisar con `git diff` que sólo cambió lo esperado y, si aplica, ejecutar los tests o lint.
- Documentar/limpiar helpers temporales de POC (por ejemplo configurar etapas) antes de cerrar la tarea para evitar que queden activados por accidente.
