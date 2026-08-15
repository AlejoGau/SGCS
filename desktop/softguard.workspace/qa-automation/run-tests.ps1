Set-Location "d:\projects\softguard\desktop\softguard.workspace\qa-automation"
$env:PATH = ".\node_modules\.bin;$env:PATH"
node .\node_modules\@playwright\test\cli.js test tests/webmg/factura-config.spec.ts tests/webmg/cantidad-dinamica.spec.ts tests/webmg/dk1498-cantidad-dinamica.spec.ts --project=chromium
