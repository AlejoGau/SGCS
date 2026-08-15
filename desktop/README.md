# Desktop

Conjunto de aplicaciones desktop cloudsecurity suite. El proyecto tendrá un enfoque monolítico, con lo cual DLLs de backoffice y las apps de UI compartirán el mismo proyecto para sincronizar versiones.

## Migración Sencha CMD
Se modifica la compilación de las aplicaciones de Sencha para utilizar Sencha CMD y el fuente está en GIT en lugar del SQL.

[Cómo migrar UiApplication a Sencha CMD](https://gitlab.softguard.com/synapticlinks/desktop/-/wikis/Migrar-UiApplication-a-Sencha-CMD)


## Dev Proxy con Caddy (Windows) 

Usando caddy, el dominio de desarrollo es el mismo que espera el backend: `gcs.softguard.com`. Esto permite que sesiones y cookies funcionen correctamente.

- Dominio local: `gcs.softguard.com` (mapeado a `127.0.0.1` por el script).
- Frontend local: `sencha app watch` de la app en `softguard.workspace/apps/<app>`.
- Backend real: se configura mediante `.env` (ver sección Variables: `UPSTREAM_HOST` y `UPSTREAM_PORT`).

### Estructura
- `/.env.example`
- `/caddy/Caddyfile`
- `/scripts/dev-proxy.ps1`
- `/.vscode/tasks.json` y `/.vscode/launch.json`

## Instalación (Windows)

- Instalar Chocolatey (PowerShell Admin):
  - `Set-ExecutionPolicy Bypass -Scope Process -Force`
  - `[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12`
  - `iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`
- Instalar dependencias con Chocolatey:
  - `choco install mkcert caddy -y`
- Instalar Sencha Cmd y verificar PATH:
  - https://www.sencha.com/products/sencha-cmd/
  - Verificar: `sencha which`

## Variables (.env)

El script lee `.env` (claves actuales de este repo):
- `DEV_DOMAIN` (ej.: `gcs.softguard.com`)
- `APP_LOCAL` (ej.: `http://127.0.0.1:1841`)
- `UPSTREAM_HOST` (IP del backend)
- `UPSTREAM_PORT` (puerto del backend, ej.: `443`)

## Uso

- Copiar `.env.example` a `.env` y ajustar valores.
- VS Code: ejecutar la tarea `Dev Windows` (o `dev:win`).
- Abrir `https://gcs.softguard.com/apps/<app>/`.

## Herramientas SQL (`tools/`)

Scripts para sincronizar stored procedures entre el repositorio y SQL Server.

### `push-sp.sh` — Deploy automático (recomendado)

Lee credenciales de `tools/.sql-creds` (gitignored). No requiere tipear password.

```bash
# SP individual
bash tools/push-sp.sh crm_contrato_itemSearch

# SP en otra base
bash tools/push-sp.sh MiSP OtraBase

# Todos los SPs de _Desktop
bash tools/push-sp.sh --all
```

**Setup inicial:** crear `tools/.sql-creds` (no se sube al repo):

```bash
SQL_SERVER="gcs.softguard.com,3341"
SQL_USER="RodrigoR"
SQL_PASSWORD="<password>"
```

### `push-sp.ps1` — Deploy manual (PowerShell)

Alternativa cuando se prefiere ingresar la password interactivamente.

```powershell
.\tools\push-sp.ps1 -Database _Desktop -File crm_contrato_itemSearch
.\tools\push-sp.ps1 -Database _Desktop   # aplica todos
.\tools\push-sp.ps1 -Database _Desktop -WhatIf  # dry run
```

### `pull-db.ps1` — Bajar SPs desde SQL Server al repo

```powershell
.\tools\pull-db.ps1 -Database _Desktop -Password <pass>
```

---

## Cleanup (finalizar sesión)

Para detener Caddy y remover la entrada de hosts de `gcs.softguard.com`:

Ejecutar desde la raíz del repositorio (directorio `Desktop/`) o usar ruta absoluta al script.

```
powershell -ExecutionPolicy Bypass -File scripts/dev-proxy.ps1 -Cleanup -EnvFile .env
```

