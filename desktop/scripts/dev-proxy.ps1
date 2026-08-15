<#
.SYNOPSIS
  Configura y ejecuta el proxy de desarrollo de SoftGuard Desktop usando Caddy y certificados locales.
.DESCRIPTION
  Carga variables desde un archivo .env, garantiza la instalacion de Chocolatey, mkcert y Caddy cuando faltan,
  emite o reutiliza certificados TLS locales con mkcert y actualiza la entrada del archivo hosts antes de iniciar Caddy.
.PARAMETER EnvFile
  Ruta al archivo .env que contiene DEV_DOMAIN, APP_LOCAL y demas parametros requeridos por Caddy.
.PARAMETER Cleanup
  Detiene Caddy si esta en ejecucion y elimina la entrada 127.0.0.1 <DEV_DOMAIN> del archivo hosts.
.EXAMPLE
  powershell -File scripts/dev-proxy.ps1 -EnvFile .env
  Inicia el proxy de desarrollo usando la configuracion indicada en .env.
.EXAMPLE
  powershell -File scripts/dev-proxy.ps1 -Cleanup -EnvFile .env
  Limpia la entrada de hosts y detiene Caddy que fue iniciado por el script previamente.
.NOTES
  Ejecutar la consola como Administrador cuando sea necesario instalar dependencias o modificar el archivo hosts.
#>
param(
  [string]$EnvFile = ".env",
  [switch]$Cleanup = $false
)
$ErrorActionPreference = "Stop"

function Test-IsAdministrator {
  $currentIdentity = [System.Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object System.Security.Principal.WindowsPrincipal($currentIdentity)
  return $principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Ensure-Chocolatey {
  if (Get-Command choco -ErrorAction SilentlyContinue) { return }

  Write-Host "[dev-proxy] Chocolatey no encontrado; intentando instalarlo" -ForegroundColor Yellow
  if (-not (Test-IsAdministrator)) {
    throw "Chocolatey no encontrado y se requieren privilegios de administrador para instalarlo automaticamente."
  }

  Set-ExecutionPolicy Bypass -Scope Process -Force | Out-Null
  try {
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
  } catch {}

  $installScript = "https://community.chocolatey.org/install.ps1"
  try {
    $scriptContent = (Invoke-WebRequest -UseBasicParsing -Uri $installScript).Content
    Invoke-Expression $scriptContent
  } catch {
    throw "No se pudo instalar Chocolatey: $($_.Exception.Message)"
  }

  $chocoBin = Join-Path $env:ProgramData "chocolatey\bin"
  if (Test-Path $chocoBin -and -not ($env:PATH.Split(';') -contains $chocoBin)) {
    $env:PATH = "$env:PATH;$chocoBin"
  }
}

function Ensure-ChocoPackage {
  param(
    [Parameter(Mandatory=$true)][string]$PackageName,
    [Parameter(Mandatory=$true)][string]$CommandName,
    [string]$DisplayName = $PackageName
  )

  if (Get-Command $CommandName -ErrorAction SilentlyContinue) { return }

  Ensure-Chocolatey

  Write-Host "[dev-proxy] Instalando $DisplayName con Chocolatey" -ForegroundColor Yellow
  if (-not (Test-IsAdministrator)) {
    throw "$DisplayName no esta disponible y se requieren privilegios de administrador para instalarlo (choco install $PackageName)."
  }

  $process = Start-Process choco -ArgumentList @("install", $PackageName, "-y", "--no-progress") -Wait -PassThru
  if ($process.ExitCode -ne 0) {
    throw "No se pudo instalar $DisplayName (choco install $PackageName)"
  }

  if (-not (Get-Command $CommandName -ErrorAction SilentlyContinue)) {
    $chocoBin = Join-Path $env:ProgramData "chocolatey\bin"
    if (Test-Path $chocoBin -and -not ($env:PATH.Split(';') -contains $chocoBin)) {
      $env:PATH = "$env:PATH;$chocoBin"
    }
  }

  if (-not (Get-Command $CommandName -ErrorAction SilentlyContinue)) {
    throw "$DisplayName se instalo pero no se pudo encontrar el comando en PATH."
  }
}

Write-Host "[dev-proxy] Loading environment from $EnvFile"
if (-not (Test-Path $EnvFile)) { throw "Env file not found: $EnvFile" }

# Load .env (KEY=VALUE), ignore comments and blanks
Get-Content $EnvFile | Where-Object { $_ -and $_ -notmatch "^\s*#" } | ForEach-Object {
  $k, $v = $_.Split('=', 2)
  if ($k -and $v -ne $null) {
    [System.Environment]::SetEnvironmentVariable($k.Trim(), $v.Trim(), "Process") | Out-Null
  }
}

$DEV_DOMAIN = $env:DEV_DOMAIN
$APP_LOCAL = $env:APP_LOCAL

if (-not $DEV_DOMAIN) { throw "DEV_DOMAIN no definido en $EnvFile" }
if (-not $APP_LOCAL) { $APP_LOCAL = "http://127.0.0.1:1841" }

Write-Host "[dev-proxy] DEV_DOMAIN=$DEV_DOMAIN"
Write-Host "[dev-proxy] APP_LOCAL=$APP_LOCAL"

# Cleanup mode: stop Caddy and remove hosts mapping for DEV_DOMAIN
if ($Cleanup) {
  Write-Host "[dev-proxy] Cleanup solicitado: deteniendo Caddy y limpiando hosts para $DEV_DOMAIN"
  try { & caddy stop 2>$null | Out-Null } catch {}

  $hosts = Join-Path $env:SystemRoot "System32\drivers\etc\hosts"
  if (Test-Path $hosts) {
    $content = Get-Content -Raw $hosts
    $pattern = "(?m)^\s*127\.0\.0\.1\s+" + [Regex]::Escape($DEV_DOMAIN) + "\s*$"
    if ($content -match $pattern) {
      $new = [System.Text.RegularExpressions.Regex]::Replace($content, $pattern, "", [System.Text.RegularExpressions.RegexOptions]::Multiline)
      # Collapse extra blank lines left by removal
      $new = [regex]::Replace($new, "\r?\n{2,}", "`r`n")
      $temp = New-Item -ItemType File -Force -Path (Join-Path $env:TEMP ("hosts_" + [Guid]::NewGuid().ToString() + ".tmp"))
      Set-Content -Path $temp -Value $new -NoNewline
      # Need elevation to overwrite hosts
      $ps = "Copy-Item -Force -Path '" + $temp.FullName + "' -Destination '" + $hosts + "'"
      Start-Process -Verb RunAs powershell "-NoProfile -Command $ps"
      Start-Sleep -Seconds 2
      Remove-Item -Force $temp.FullName -ErrorAction SilentlyContinue
      Write-Host "[dev-proxy] Entrada 127.0.0.1 $DEV_DOMAIN eliminada de hosts (si existia)"
    } else {
      Write-Host "[dev-proxy] No se encontro entrada 127.0.0.1 $DEV_DOMAIN en hosts"
    }
  }
  Write-Host "[dev-proxy] Ejecutando ipconfig /flushdns"
  try {
    & ipconfig /flushdns | Out-Null
    if ($LASTEXITCODE -ne 0) {
      Write-Host "[dev-proxy] ipconfig /flushdns devolvio codigo $LASTEXITCODE" -ForegroundColor Yellow
    } else {
      Write-Host "[dev-proxy] Cache DNS limpiada"
    }
  } catch {
    Write-Host "[dev-proxy] No se pudo ejecutar ipconfig /flushdns: $($_.Exception.Message)" -ForegroundColor Yellow
  }
  Write-Host "[dev-proxy] Cleanup finalizado"
  return
}

# Derivar UPSTREAM_SNI del URL del upstream si no esta definido
if (-not $env:UPSTREAM_SNI -or [string]::IsNullOrWhiteSpace($env:UPSTREAM_SNI)) {
  try {
    $u = [System.Uri]::new($UPSTREAM_HTTPS)
    if ($u.Host) {
      $env:UPSTREAM_SNI = $u.Host
      Write-Host "[dev-proxy] UPSTREAM_SNI derivado: $($env:UPSTREAM_SNI)"
    }
  } catch {}
}

$CERT_DIR = Join-Path (Get-Location).Path "caddy/certs"
New-Item -ItemType Directory -Force -Path $CERT_DIR | Out-Null
# Ensure logs dir exists for Caddy access.log
New-Item -ItemType Directory -Force -Path (Join-Path (Get-Location).Path "logs") | Out-Null

# mkcert
Ensure-ChocoPackage -PackageName "mkcert" -CommandName "mkcert" -DisplayName "mkcert"

Write-Host "[dev-proxy] Installing mkcert root CA (if needed)"
mkcert -install | Out-Null

$certPath = Join-Path $CERT_DIR "$DEV_DOMAIN.pem"
$keyPath  = Join-Path $CERT_DIR "$DEV_DOMAIN-key.pem"
if (-not (Test-Path $certPath) -or -not (Test-Path $keyPath)) {
  Write-Host "[dev-proxy] Generating certificate for $DEV_DOMAIN"
  Push-Location $CERT_DIR
  try { mkcert $DEV_DOMAIN } finally { Pop-Location }
}

# hosts
$hosts = Join-Path $env:SystemRoot "System32\drivers\etc\hosts"
$line = "127.0.0.1 $DEV_DOMAIN"
$present = $false
if (Test-Path $hosts) {
  $present = Select-String -Path $hosts -Pattern "^\s*127\.0\.0\.1\s+$([Regex]::Escape($DEV_DOMAIN))\s*$" -Quiet
}
if (-not $present) {
  Write-Host "[dev-proxy] Agregando '$line' a hosts (requiere privilegios)"
  $cmd = "Add-Content -Path '$hosts' -Value '$line'"
  Start-Process -Verb RunAs powershell "-NoProfile -Command $cmd"
  Start-Sleep -Seconds 2
}

# caddy
Ensure-ChocoPackage -PackageName "caddy" -CommandName "caddy" -DisplayName "Caddy"

$CADDYFILE = Join-Path (Get-Location).Path "caddy/Caddyfile"
if (-not (Test-Path $CADDYFILE)) { throw "Caddyfile no encontrado en $CADDYFILE" }

Write-Host "[dev-proxy] Iniciando Caddy con $CADDYFILE"

# Intentar detener instancias previas (evita conflicto del admin :2019)
try {
  & caddy stop 2>$null | Out-Null
  Start-Sleep -Milliseconds 300
} catch {}

# Iniciar en background para que VS Code no quede bloqueado
& caddy start --config "$CADDYFILE"
if ($LASTEXITCODE -ne 0) {
  throw "No se pudo iniciar Caddy (caddy start)"
}
Write-Host "[dev-proxy] Caddy iniciado en segundo plano. Para detener: 'caddy stop'"

