# Caddy Dev Proxy para ExtJS

## Objetivo
Servir la app ExtJS local bajo **el mismo dominio** que el backend de desarrollo. Evitar CORS y reutilizar cookies del servidor. Resultado: navegar `https://$DEV_DOMAIN/app/` con frontend local y backend real.

---

## Estructura a crear en el repo
```
/.vscode/tasks.json
/.vscode/launch.json              # opcional
/caddy/Caddyfile
/scripts/dev-proxy.ps1
/scripts/dev-proxy.sh
/.env.example
```

---

## Variables de entorno
Crear `.env` a partir de `.env.example`.

**`/.env.example`**
```
DEV_DOMAIN=dev.tuempresa.com
UPSTREAM_HTTPS=https://REAL_DEV_SERVER   # ej: https://dev.api.tuempresa.com
APP_LOCAL=http://127.0.0.1:1841          # puerto de sencha app watch
```

---

## Caddyfile
Ruta: `caddy/Caddyfile`

```Caddyfile
{$DEV_DOMAIN} {
  tls caddy/certs/{$DEV_DOMAIN}.pem caddy/certs/{$DEV_DOMAIN}-key.pem

  # App local de ExtJS
  @app path /app/* /index.html /app.html
  handle @app {
    reverse_proxy {$APP_LOCAL}
  }

  # API del backend real
  handle_path /api/* {
    header_up Host {$DEV_DOMAIN}
    reverse_proxy {$UPSTREAM_HTTPS} {
      transport http { tls_server_name {$DEV_DOMAIN} }
    }
  }

  # Resto de rutas al backend real
  handle {
    header_up Host {$DEV_DOMAIN}
    reverse_proxy {$UPSTREAM_HTTPS} {
      transport http { tls_server_name {$DEV_DOMAIN} }
    }
  }
}
```

Notas:
- `header_up Host {$DEV_DOMAIN}` preserva el host para que el backend setee cookies y rutas correctas.
- Si tu app no cuelga de `/app/`, ajustá el matcher `@app` y las rutas del `index.html`.

---

## Script Windows (PowerShell)
Ruta: `scripts/dev-proxy.ps1`

```powershell
param([string]$EnvFile = ".env")
$ErrorActionPreference = "Stop"

# Cargar .env
Get-Content $EnvFile | Where-Object {$_ -and $_ -notmatch "^#"} | ForEach-Object {
  $k,$v = $_.Split('=',2); [System.Environment]::SetEnvironmentVariable($k.Trim(), $v.Trim(), "Process")
}

$DEV_DOMAIN = $env:DEV_DOMAIN
if (-not $DEV_DOMAIN) { throw "DEV_DOMAIN no definido" }
$CERT_DIR = "caddy/certs"
New-Item -ItemType Directory -Force -Path $CERT_DIR | Out-Null

# mkcert
if (-not (Get-Command mkcert -ErrorAction SilentlyContinue)) {
  Write-Host "Instalar mkcert y nss-tools: choco install mkcert nss-tools"
  throw "mkcert no encontrado"
}
mkcert -install | Out-Null
$cert = Join-Path $CERT_DIR "$DEV_DOMAIN.pem"
$key  = Join-Path $CERT_DIR "$DEV_DOMAIN-key.pem"
if (-not (Test-Path $cert) -or -not (Test-Path $key)) {
  Push-Location $CERT_DIR
  mkcert $DEV_DOMAIN
  Pop-Location
}

# hosts
$hosts = "$env:SystemRoot\System32\drivers\etc\hosts"
$line = "127.0.0.1 $DEV_DOMAIN"
if (-not (Select-String -Path $hosts -Pattern "^\s*127\.0\.0\.1\s+$DEV_DOMAIN" -Quiet)) {
  Write-Host "Agregando $DEV_DOMAIN a hosts (requiere privilegios)"
  Start-Process -Verb RunAs powershell "-NoProfile -Command `"Add-Content -Path '$hosts' -Value '$line'`""
  Start-Sleep -Seconds 2
}

# caddy
if (-not (Get-Command caddy -ErrorAction SilentlyContinue)) {
  Write-Host "Instalar Caddy: choco install caddy"
  throw "caddy no encontrado"
}

$CADDYFILE = Join-Path (Get-Location).Path "caddy\Caddyfile"
Write-Host "Levantando Caddy con $CADDYFILE"
caddy run --config "$CADDYFILE"
```

---

## Script macOS/Linux (bash)
Ruta: `scripts/dev-proxy.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-.env}"
if [[ -f "$ENV_FILE" ]]; then
  # Cargar .env (simple). Evita espacios y CR.
  export $(grep -v '^#' "$ENV_FILE" | tr -d '\r')
fi

: "${DEV_DOMAIN:?DEV_DOMAIN no definido}"
: "${APP_LOCAL:?APP_LOCAL no definido}"
: "${UPSTREAM_HTTPS:?UPSTREAM_HTTPS no definido}"

CERT_DIR="caddy/certs"
mkdir -p "$CERT_DIR"

# mkcert
if ! command -v mkcert >/dev/null 2>&1; then
  echo "Instalar mkcert. macOS: brew install mkcert nss; Linux: paquete mkcert."
  exit 1
fi
mkcert -install >/dev/null
if [[ ! -f "$CERT_DIR/${DEV_DOMAIN}.pem" || ! -f "$CERT_DIR/${DEV_DOMAIN}-key.pem" ]]; then
  (cd "$CERT_DIR" && mkcert "$DEV_DOMAIN")
fi

# hosts
if ! grep -qE "^[[:space:]]*127\\.0\\.0\\.1[[:space:]]+$DEV_DOMAIN" /etc/hosts; then
  echo "Agregando $DEV_DOMAIN a /etc/hosts (requiere sudo)"
  echo "127.0.0.1 $DEV_DOMAIN" | sudo tee -a /etc/hosts >/dev/null
fi

# caddy
if ! command -v caddy >/dev/null 2>&1; then
  echo "Instalar Caddy. macOS: brew install caddy. Linux: usar pkg del sistema."
  exit 1
fi

exec caddy run --config "caddy/Caddyfile"
```

Dar permisos:
```bash
chmod +x scripts/dev-proxy.sh
```

---

## VS Code Tasks
Ruta: `/.vscode/tasks.json`

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "sencha:watch",
      "type": "shell",
      "command": "sencha app watch",
      "options": { "cwd": "${workspaceFolder}" },
      "isBackground": true,
      "problemMatcher": []
    },
    {
      "label": "proxy:caddy:win",
      "type": "shell",
      "command": "powershell -ExecutionPolicy Bypass -File scripts/dev-proxy.ps1 -EnvFile .env",
      "isBackground": true,
      "problemMatcher": [],
      "windows": { "command": "powershell -ExecutionPolicy Bypass -File scripts/dev-proxy.ps1 -EnvFile .env" }
    },
    {
      "label": "proxy:caddy:unix",
      "type": "shell",
      "command": "bash scripts/dev-proxy.sh .env",
      "isBackground": true,
      "problemMatcher": [],
      "linux": { "command": "bash scripts/dev-proxy.sh .env" },
      "osx": { "command": "bash scripts/dev-proxy.sh .env" }
    },
    {
      "label": "dev:win",
      "dependsOn": ["sencha:watch", "proxy:caddy:win"],
      "dependsOrder": "parallel"
    },
    {
      "label": "dev:unix",
      "dependsOn": ["sencha:watch", "proxy:caddy:unix"],
      "dependsOrder": "parallel"
    }
  ]
}
```

---

## VS Code Launch (opcional)
Ruta: `/.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-msedge",
      "request": "launch",
      "name": "Abrir app en DEV_DOMAIN",
      "url": "https://${env:DEV_DOMAIN}/app/",
      "runtimeArgs": ["--user-data-dir=${workspaceFolder}/.vscode/.chrome-dev"]
    }
  ],
  "compounds": [
    {
      "name": "Dev Windows",
      "configurations": ["Abrir app en DEV_DOMAIN"],
      "preLaunchTask": "dev:win"
    },
    {
      "name": "Dev Unix",
      "configurations": ["Abrir app en DEV_DOMAIN"],
      "preLaunchTask": "dev:unix"
    }
  ]
}
```

---

## Uso
1. Copiar `.env.example` a `.env` y completar `DEV_DOMAIN`, `UPSTREAM_HTTPS`, `APP_LOCAL`.
2. Instalar herramientas si faltan:
   - Windows: `choco install mkcert nss-tools caddy`
   - macOS: `brew install mkcert nss caddy`
   - Linux: instalar `mkcert` y `caddy` según distro.
3. VS Code:
   - Windows: ejecutar tarea `dev:win`.
   - macOS/Linux: ejecutar tarea `dev:unix`.
4. Abrir `https://$DEV_DOMAIN/app/`.

---

## Notas clave
- Cookies: ideal `SameSite=None; Secure` si el backend así lo requiere. Con mismo origen no hay CORS.
- El proxy envía SNI (`tls_server_name`) y preserva `Host`.
- Ajustar rutas si la app no vive en `/app/`.
- No se inyectan tokens por URL. Se usan cookies del dominio.

---

## Checklist previa para Codex
- Definir valores finales:
  - `DEV_DOMAIN`
  - `UPSTREAM_HTTPS`
  - `APP_LOCAL`
- Confirmar permiso para editar `hosts` localmente.
- Confirmar puertos y rutas de API (ej. `/api`).
- Asegurar disponibilidad de `mkcert` y `caddy` en los devs o permitir su instalación.
- Verificar que el backend acepte el dominio de `DEV_DOMAIN` y emita cookies válidas.