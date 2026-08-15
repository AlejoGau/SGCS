# Copilot Instructions — SoftGuard Desktop Workspace

## Arquitectura

Leer [ARCHITECTURE.md](../ARCHITECTURE.md) para contexto general del workspace.
Leer [BILLING_FLOW.md](../BILLING_FLOW.md) para el flujo de facturación de WebMG.

## Reglas obligatorias para modelos ExtJS

### writeAllFields: true (CRITICO)

**Todo modelo con proxy REST que haga escritura DEBE tener `writeAllFields: true` en el writer.**

```javascript
// ✅ CORRECTO
proxy: {
    type: 'rest',
    url: '/Rest/MiEntidad/',
    appendId: true,
    writer: {
        type: 'json',
        writeAllFields: true
    }
}

// ❌ INCORRECTO - causa corrupción de datos
proxy: {
    type: 'rest',
    url: '/Rest/MiEntidad/',
    appendId: true
}
```

Sin `writeAllFields: true`, ExtJS solo envía campos modificados en el PUT. El backend interpreta los campos faltantes como null y sobreescribe todo el registro, corrompiendo datos.

Los modelos `*SearchModel` (solo lectura vía `/Rest/search/`) NO necesitan writer.

### Filtros por organización facturadora

Cuando se trabaja con categorías impositivas, condiciones de pago, productos o listas de precios, **siempre filtrar por la organización facturadora seleccionada**, nunca usar `_UserData.Company` como valor hardcodeado.

## Convenciones de código

- Framework: ExtJS 7.3.1 (Classic toolkit)
- Patrón: MVC de ExtJS
- Paquetes compartidos: `packages/local/common`, `packages/local/cuenta`, `packages/local/tablas`
- REST API: `/Rest/<entidad>/` para CRUD, `/Rest/search/<nombre>` para búsquedas
- Idioma de UI: Español (usar `getLocale()` para strings)
- Notificaciones: usar `notify()` para mensajes toast

## Workflow de testing con Playwright (SgWebCrm y otros módulos)

Framework en `qa-automation/`. Cada tarea sigue este patrón:

### Estructura de archivos por tarea

| Archivo | Propósito |
|---------|-----------|
| `tests/crm/crm-<dss>.spec.ts` | Corre contra **GCS** (sin fix). Se espera que **falle** — documenta el bug. |
| `tests/crm/crm-<dss>-local.spec.ts` | Corre contra **localhost:1843** (con fix). Debe **pasar** — verifica la solución. |

### Proyectos en playwright.config.ts

Cada tarea necesita dos proyectos nuevos:

```typescript
// GCS — documenta el bug
{ name: 'crm-<dss>-gcs', testMatch: 'crm/crm-<dss>.spec.ts',
  use: { baseURL: gcsBaseURL, storageState: '.auth/crm-user.json', ...devices['Desktop Chrome'],
         viewport: { width: 1920, height: 1080 },
         launchOptions: { args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'] } },
  dependencies: ['crm-auth-setup'] },

// Local — verifica el fix
{ name: 'crm-<dss>-local', testMatch: 'crm/crm-<dss>-local.spec.ts',
  use: { baseURL: 'http://localhost:1843', ...devices['Desktop Chrome'],
         viewport: { width: 1920, height: 1080 },
         launchOptions: { args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'] } },
  dependencies: ['crm-auth-setup'] },
```

Agregar ambos al array `testIgnore` del proyecto `chromium`.

### Setup estándar en specs GCS

```typescript
import { CrmPage } from '../../src/pages/crm/CrmPage';

const crm = new CrmPage(page);
const { frame, dss1497Active } = await crm.openCrmGcs();
// frame = iframe real ExtJS (/apps/SgWebCrm/{version}/)
// dss1497Active = true si Ext.isReady no se alcanzó (bug DSS-1497 activo)
```

### Setup estándar en specs locales

```typescript
import * as path from 'path';
import { CrmPage } from '../../src/pages/crm/CrmPage';

const crm = new CrmPage(page);
const tokenFile = path.resolve(__dirname, '../../.auth/crm-token.txt');
await crm.gotoLocalCrm(tokenFile, 1843);
await crm.waitForCrmReadyLocal();
// Usar page.evaluate() directamente — no hay iframe
```

### Credenciales CRM de prueba

- Usuario: `pruebacas@soporte.com` / `Admin1234`
- Auth setup: `tests/crm/crm-auth.setup.ts` (proyecto `crm-auth-setup`)
- Sesión guardada: `.auth/crm-user.json`, token: `.auth/crm-token.txt`

### Estructura de frames en GCS (CRÍTICO)

GCS Desktop crea DOS frames para CRM:
1. `/a/SgWebCrm/?version=...` — proxy/gateway, **sin ExtJS**
2. `/apps/SgWebCrm/{version}/` — app real, **con ExtJS**

`CrmPage.getCrmFrame()` ya prioriza el frame real (#2). Nunca buscar frames manualmente en los specs.

### Comandos para correr tests

```bash
cd qa-automation

# GCS (documenta bug — se espera que falle)
npx playwright test crm/crm-<dss>.spec.ts --project=crm-<dss>-gcs --reporter=list

# Local (verifica fix — debe pasar)
npx playwright test crm/crm-<dss>-local.spec.ts --project=crm-<dss>-local --reporter=list
```
