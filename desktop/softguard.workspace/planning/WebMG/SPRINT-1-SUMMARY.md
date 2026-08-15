# Sprint 1 — Resumen de Trabajo
**Fecha:** Abril 2026  
**Repo:** softguard.workspace  
**Apps:** WebMG (AdministratorSearch + SgWebCrm)

---

## Tareas completadas

| Tarea | Descripción | Estado | Tests |
|-------|-------------|--------|-------|
| **DK-1498** | Cantidad dinámica por cuentas activas en facturación | ✅ Completo | 13/13 pass |
| **DSS-1497** | CRM no abre para usuario con CRM asignado | ✅ Completo | 3/3 local pass |
| **CRM Adjuntos** | Archivos adjuntos no funciona en Gestión de Correo | ✅ Completo | — |
| **DK-1493** | Configuración fija y dinámica de factura | ✅ Completo | 20/20 pass |

---

## DK-1498 — Cantidad Dinámica por Cuentas Activas

### Qué hace
Cuando un producto tiene `pro_cantidad_auto = 1`, al facturar un contrato la cantidad
se calcula automáticamente como el número de **cuentas activas** del cliente.

### Cambios en DB
```sql
ALTER TABLE _Datos.dbo.Product ADD pro_cantidad_auto INT NOT NULL DEFAULT 0
```
- Script: `tools/gcs/migrations/DK-1498-add-pro-cantidad-auto.sql`
- SP `MG_ContratoAFactura` actualizado: `tools/gcs/migrations/DK-1498-update-MG_ContratoAFactura.sql`

### Lógica del SP
```sql
-- Calcular cuentas activas del cliente
SELECT @cuentasActivas = COUNT(*)
FROM m_relacion_cliente_cuentas_fc rel
INNER JOIN m_cuentas cue ON cue.cue_iid = rel.rel_icuenta
WHERE rel.rel_icliente = @idcliente AND cue.cue_nEfectiva = 1

-- En cursor de items de contrato:
CASE WHEN ISNULL(p.pro_cantidad_auto, 0) = 1
     THEN CAST(@cuentasActivas AS float)
     ELSE it.Quantity
END as cbi_icantidad
```

### Archivos frontend modificados
- `packages/local/common/src/model/ProductModel.js` — campo `pro_cantidad_auto` (int, default 0)
- `packages/local/common/src/view/STProductosFormView.js` — combo "Cantidad automática" [0=Manual, 1=Por cuentas activas]
- `packages/local/common/src/view/ContratoItemFormView.js` — `cantidadAutoLabel` displayfield (oculto por defecto)
- `packages/local/common/src/controller/ContratoItemFormController.js` — `onProductChanged()` bloquea `Quantity` y muestra aviso cuando `pro_cantidad_auto = 1`

### Cómo funciona el handler `onProductChanged`
```javascript
// ContratoItemFormController.js — onProductChanged
onProductChanged: function(combo, record) {
    var view = combo.up('contratoitemformview');
    var cantidadField = view.down('[name=Quantity]');
    var autoLabel = view.down('#cantidadAutoLabel');

    if (record && record.get('pro_cantidad_auto') == 1) {
        cantidadField.setReadOnly(true);
        cantidadField.setValue(null);
        autoLabel.show();
        autoLabel.setValue(getLocale('autoQuantityHint'));
    } else {
        cantidadField.setReadOnly(false);
        autoLabel.hide();
    }
}
```

### Tests
- Archivo: `qa-automation/tests/webmg/cantidad-dinamica.spec.ts`
- 10 tests: validación DB, ejecución SP, comportamiento UI, bloqueo de campo

---

## DSS-1497 — CRM no abre para usuario con CRM asignado

### Root cause
`CrmController.js` → `initview()` llamado en `afterrender` del viewport.
Cuando `_security.rights.grupos != true`, el código llamaba:
```javascript
view.down('#btngrupos').hide()  // ❌ null reference — #btngrupos está COMENTADO en CrmNorthView.js
```

### Fix aplicado
`apps/SgWebCrm/app/controller/CrmController.js` — todos los `.hide()` en `initview()` 
protegidos con null check:
```javascript
// ✅ Correcto
var btnGrupos = view.down('#btngrupos');
if (btnGrupos) btnGrupos.hide();
```

Mismo patrón aplicado a: `btnEncuestas`, `btnOrganization`, `btnPerson`, `btnProduct`,
`btnCalendar`, `cotizaciones`, `btnContratos`, `btnsmartmail`, `btnSmartpanics`.

### Regla general
> Siempre que hagas `view.down('#itemId').someMethod()` en un `initview`, guardá el resultado en variable y verificá null primero.  
> Los items pueden estar comentados en la View por distintas razones (permisos, versión, feature flag).

### Branch
`DSS-1497-crm-asignado-visualizacion-modulo`

### Tests
- `crm-local` project (localhost:1843) → 3/3 passing con fix
- `crm-gcs` → comportamiento esperado (producción sin fix muestra el error correctamente)

---

## CRM Adjuntos — Bug fix en Gestión de Correo

### Root cause
`packages/local/common/src/controller/SmartMailFormController.js` → `initview()`:
- El fieldset `#adjuntos` en `SmartMailFormView.js` tiene `disabled: true` por defecto
- `initview` nunca llamaba `setDisabled(false)` → el usuario **nunca podía usar "Archivos adjuntos"**

**Segundo bug (mismo archivo):**
```javascript
// ❌ itemId incorrecto — null reference silencioso en modo readonly
view.down("smpattachgridview").down("#adjuntararchivo").hide()
// ✅ Correcto
var btn = view.down("smpattachgridview").down("#adjuntararchivoId");
if (btn) btn.hide();
```

### Fix aplicado
```javascript
// SmartMailFormController.js — initview, después de setValue programstart
if (view.record.get("Id") > 0) {
    view.down("#adjuntos").setDisabled(false);
}

// En bloque if (view.readonly):
// 1. Re-habilitar adjuntos DESPUÉS de disableForm() si Id > 0
// 2. Usar itemId correcto + null guard en botón adjuntararchivo
```

### Nota de diseño
- Para "Nuevo envío" (Id=0): adjuntos permanece deshabilitado.
- El handler `beforeupload` en `SMPAttachGridView` también protege contra upload con Id=0.

---

## DK-1493 — Configuración Fija y Dinámica de Factura

### Qué hace
Agrega un fieldset colapsable "Configuración de Factura" en el formulario de Organización
(app AdministratorSearch) con:
- **Observaciones con variables dinámicas** — plantilla con tokens `{{variable}}`
- **Footer fijo** — texto que aparece al pie de todas las facturas de la organización
- **Logo** — upload de imagen para el encabezado del PDF
- **QR AFIP** — checkbox para incluir código QR del CAE

### Archivos frontend
| Archivo | Qué hace |
|---------|----------|
| `apps/AdministratorSearch/app/view/MoneyGuardOrganizacionFormView.js` | Fieldset + campos + botones |
| `apps/AdministratorSearch/app/controller/MoneyGuardOrganizacionFormController.js` | Load/save/handlers de todos los botones |
| `apps/AdministratorSearch/app/controller/org_cmetadataFormController.js` | Fix bug merge destructivo en metadata |
| `apps/AdministratorSearch/app/model/t_organizacion_fcModel.js` | `writeAllFields: true` (crítico) |

### Estructura del fieldset (View)
```javascript
// MoneyGuardOrganizacionFormView.js
{
    xtype: 'fieldset',
    itemId: 'facturaConfig',
    title: 'Configuración de Factura',
    collapsible: true,
    collapsed: true,
    items: [
        { xtype: 'textareafield', itemId: 'observaciones_template', fieldLabel: 'Observaciones', height: 80 },
        { xtype: 'button', text: 'Insertar Variable', action: 'insertVariable' },
        { xtype: 'textareafield', itemId: 'footer_fijo', fieldLabel: 'Footer fijo', height: 60 },
        { xtype: 'displayfield', itemId: 'factura_logo_display', fieldLabel: 'Logo factura' },
        { xtype: 'button', text: 'Subir logo', action: 'facturaLogo' },
        { xtype: 'checkboxfield', itemId: 'mostrar_qr_afip', fieldLabel: 'Mostrar QR AFIP' },
        { xtype: 'button', text: 'Preview Factura', action: 'previewFactura' }
    ]
}
```

### Cómo se registran los handlers (Controller)
```javascript
// MoneyGuardOrganizacionFormController.js — init()
init: function() {
    this.control({
        'moneyguardorganizacionformview': {
            beforerender: this.initview,
            organizationchanged: this.onOrganizationChanged
        },
        'button[action=insertVariable]': { click: this.onInsertVariableClick },
        'button[action=previewFactura]': { click: this.onPreviewFacturaClick },
        'button[action=facturaLogo]':    { click: this.onFacturaLogoClick },
        'button[action=save]':           { click: this.onSaveClick }
    });
}
```

> **Patrón general:** en ExtJS MVC, los handlers se registran en `init()` con `this.control()`.
> El selector puede ser un xtype, un `[action=xxx]`, un itemId, etc. Cualquier componente que
> matchee el selector en el Component Manager de la app disparará el evento al controller.

### Load/Save de configuración en org_cmetadata
```javascript
// Cargar — loadFacturaConfig(view, record)
var raw = record.get('org_cmetadata') || '{}';
var meta = JSON.parse(raw);
var cfg = meta.factura || {};
view.down('#observaciones_template').setValue(cfg.observaciones_template || '');
view.down('#footer_fijo').setValue(cfg.footer_fijo || '');
view.down('#mostrar_qr_afip').setValue(!!cfg.mostrar_qr_afip);

// Guardar — saveFacturaConfig(view, record)
var raw = record.get('org_cmetadata') || '{}';
var meta = JSON.parse(raw);
meta.factura = {
    observaciones_template: view.down('#observaciones_template').getValue(),
    footer_fijo: view.down('#footer_fijo').getValue(),
    logo_url: view.down('#factura_logo_display').getValue(),
    mostrar_qr_afip: view.down('#mostrar_qr_afip').getValue()
};
record.set('org_cmetadata', JSON.stringify(meta));
```

> **Importante:** Siempre hacer `JSON.parse(raw)` del valor actual y mergear solo la clave `factura`.
> NO hacer `record.set('org_cmetadata', JSON.stringify({ factura: ... }))` — eso destruye otras claves.

### Menu "Insertar Variable"
```javascript
// onInsertVariableClick — genera menu cascada programáticamente
onInsertVariableClick: function(btn) {
    var categories = {
        'Emisor': [
            { text: 'Nombre', token: '{{emisor_nombre}}' },
            { text: 'CUIT',   token: '{{emisor_cuit}}' },
            // ...
        ],
        'Cliente': [ /* ... */ ],
        'Comprobante': [ /* ... */ ],
        'Calculadas': [ /* ... */ ]
    };

    var menuItems = [];
    Ext.Object.each(categories, function(catName, vars) {
        menuItems.push({
            text: catName,
            menu: vars.map(function(v) {
                return {
                    text: v.text + ' — ' + v.token,
                    handler: function() {
                        var field = btn.up('fieldset').down('#observaciones_template');
                        var current = field.getValue() || '';
                        field.setValue(current + v.token);
                    }
                };
            })
        });
    });

    Ext.create('Ext.menu.Menu', { items: menuItems }).showBy(btn);
}
```

### Backend — Razor ComprobantePdfMG (Id=8359)
- Archivo: `tools/gcs/tasks/ComprobantePdfMG_8359.cshtml`
- Interpolación: regex `{{(\w+)}}` → `BuildInterpolationVars()` con 32+ variables
- Secciones: observaciones (después de tabla totales), footer fijo (al pie), QR AFIP (si `mostrar_qr_afip=true` y hay CAE)
- Preview URL: `/handler/ComprobantePdfMG?previewOrgId=<id>&oauth_token=...`

> **Gotcha crítico del backend:** `SearchObject.LoadByName("t_organizacion_fc")` NO existe.
> Hay que usar `DataService.ExecuteTable("t_organizacion_fcSel", new { @Id = orgId })`.

### Branch
`feature/DK-1493-config-dinamica-factura`

---

## Infraestructura de Tests Playwright

### Arquitectura
```
qa-automation/
├── playwright.config.ts          ← workers:1, sequential, timeout 120s
├── src/
│   ├── fixtures/auth.fixture.ts  ← navigateToApp(), OAuth token, resource override
│   ├── helpers/extjs.helpers.ts  ← waitForExtReady, getExtGridRows, etc.
│   └── pages/
│       ├── BasePage.ts            ← fillField, clickButton, screenshot, etc.
│       └── webmg/
│           └── OrgFacturaConfigPage.ts  ← Page Object para DK-1493
└── tests/
    └── webmg/
        ├── factura-config.spec.ts    ← 20 tests DK-1493
        ├── cantidad-dinamica.spec.ts ← 13 tests DK-1498
        └── comprobante.spec.ts       ← 12+ tests base WebMG
```

### Cómo funcionan los tests (flujo base)
```typescript
// 1. Importar fixture personalizado
import { test, expect } from '../fixtures/auth.fixture';

// 2. navigateToApp() hace:
//    a. Lee OAuth_Token de .auth/token.txt
//    b. Aplica resource-override rules (localhost → GCS production)
//    c. Setea cookie OAuth_Token para ExtJS
//    d. Navega a la URL local (localhost:1841)
//    e. Espera Ext.isReady === true

// 3. Interacción con ExtJS siempre vía page.evaluate()
const value = await page.evaluate(() => {
    const cmp = Ext.ComponentQuery.query('[itemId=observaciones_template]')[0];
    return cmp ? cmp.getValue() : null;
});
```

### Cómo se inyectan archivos JS en tests de DK-1493
El deploy del servidor (21/04) no incluye `MoneyGuardOrganizacionFormController` ni `MoneyGuardOrganizacionFormView`.
Los tests los inyectan en runtime:

```typescript
// factura-config.spec.ts — función injectLocalJsFiles()
async function injectLocalJsFiles(page) {
    // 1. Leer archivos locales con fs.readFileSync
    const modelSrcs = [model0, model1, model2, model3].map(p => fs.readFileSync(p, 'utf-8'));
    const storeSrc = fs.readFileSync(storePath, 'utf-8');
    const viewSrc  = fs.readFileSync(viewPath, 'utf-8');
    const ctrlSrc  = fs.readFileSync(ctrlPath, 'utf-8');

    // 2. UNA SOLA llamada page.evaluate() con todo el código
    await page.evaluate(({ modelSrcs, storeSrc, viewSrc, ctrlSrc }) => {
        // 3. Stub de clases base que no existen en producción
        ['Common.model.OrganizationSearchModel', 
         'Common.model.t_provinciasSearchModel',
         'Common.model.t_categorias_impositivas_fcSearchModel'].forEach(cls => {
            Ext.define(cls, { extend: 'Ext.data.Model' });
        });

        // 4. Evaluar cada archivo (define las clases en Ext.ClassManager)
        [...modelSrcs, storeSrc, viewSrc, ctrlSrc].forEach(src => {
            (0, eval)(src);  // (0, eval) = eval en scope global, no local
        });

        // 5. Instanciar controller directamente (sin app reference)
        const ctrlClass = Ext.ClassManager.get(
            'AdministratorSearch.controller.MoneyGuardOrganizacionFormController'
        );
        const ctrl = new ctrlClass({ id: 'MoneyGuardOrganizacionFormController' });
        ctrl.doInit(null);  // registra this.control() handlers en EventBus global
    }, { modelSrcs, storeSrc, viewSrc, ctrlSrc });
}
```

**Por qué funciona:**
- `Ext.app.EventBus` es un **singleton global** que `Ext.app.BaseController` usa en su constructor
- `ctrl.doInit(null)` registra todos los `this.control()` handlers sin necesidad de app reference
- `(0, eval)(src)` ejecuta en scope global → `Ext.define()` funciona correctamente

**Error no bloqueante esperado:**
```
[initview ERROR] Cannot read properties of undefined (reading 'indexOf')
```
`initview` intenta cargar el store de categorías impositivas con URL nula → error en `buildUrl`.
El try-catch del controller lo captura. **No afecta los tests.**

### Cómo ejecutar los tests
```powershell
cd qa-automation

# Tests específicos de DK-1493
npx playwright test tests/webmg/factura-config.spec.ts --project=chromium

# Con filtro por nombre
npx playwright test tests/webmg/factura-config.spec.ts --project=chromium -g "should insert"

# Tests de DK-1498
npx playwright test tests/webmg/cantidad-dinamica.spec.ts --project=chromium

# Suite completa
npx playwright test --project=chromium
```

### Cómo agregar nuevos tests

#### 1. Crear Page Object (si es un módulo nuevo)
```typescript
// src/pages/webmg/MiModuloPage.ts
import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class MiModuloPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async expandSeccion(): Promise<void> {
        await this.page.evaluate(() => {
            const cmp = Ext.ComponentQuery.query('[itemId=miSeccion]')[0];
            if (cmp) cmp.expand();
        });
    }
}
```

#### 2. Crear spec file
```typescript
// tests/webmg/mi-modulo.spec.ts
import { test, expect } from '../fixtures/auth.fixture';
import { MiModuloPage } from '../../src/pages/webmg/MiModuloPage';

test.describe('Mi Módulo @mi-tag', () => {
    test.beforeEach(async ({ navigateToApp }) => {
        await navigateToApp('/index.html');
    });

    test('should do something', async ({ page }) => {
        const modulo = new MiModuloPage(page);
        await modulo.expandSeccion();
        // ...
    });
});
```

#### 3. Registrar en playwright.config.ts si necesita nuevo proyecto
```typescript
// playwright.config.ts
projects: [
    { name: 'auth-setup', ... },
    { name: 'chromium', dependencies: ['auth-setup'], ... },
    // Para CRM local:
    { name: 'crm-local', use: { baseURL: 'http://localhost:1843' }, ... }
]
```

---

## Patrones y gotchas importantes

### ExtJS — writeAllFields: true (CRÍTICO)
```javascript
// ✅ Todo modelo con proxy REST que haga escritura DEBE tener esto
proxy: {
    type: 'rest',
    url: '/Rest/MiEntidad/',
    appendId: true,
    writer: {
        type: 'json',
        writeAllFields: true  // ← Sin esto, PUT solo envía campos modificados
    }                         //   El backend interpreta los faltantes como null → corrupción
}
```

### ExtJS — Null guards en initview
```javascript
// ✅ Siempre así cuando el componente puede no existir
var btn = view.down('#miBoton');
if (btn) btn.hide();

// ❌ Nunca así — null reference si el item está comentado o ausente
view.down('#miBoton').hide();
```

### ExtJS — Merge seguro de JSON en campos metadata
```javascript
// ✅ Merge parcial — preserva otras claves
var meta = JSON.parse(record.get('org_cmetadata') || '{}');
meta.miClave = { nuevosValores: '...' };
record.set('org_cmetadata', JSON.stringify(meta));

// ❌ Overwrite total — destruye otras claves
record.set('org_cmetadata', JSON.stringify({ miClave: { ... } }));
```

### Playwright — page.evaluate con variables locales
```typescript
// ✅ Pasar variables como segundo argumento
const valor = 'hola';
await page.evaluate((v) => { console.log(v); }, valor);

// ❌ Closure no funciona en evaluate — la función se serializa
await page.evaluate(() => { console.log(valor); }); // ReferenceError en browser
```

### Playwright — No usar dos page.evaluate() consecutivos para una operación
```typescript
// ❌ El resultado del primero no está disponible en el segundo
const result = await page.evaluate(() => doSomething());
await page.evaluate(() => {
    useResult(result); // 'result' es una var de Node, no existe en browser
});

// ✅ Todo en un solo evaluate
await page.evaluate(() => {
    const result = doSomething();
    useResult(result);
});
```

---

## Estado de producción (GCS)
- **URL:** `https://gcs.softguard.com`
- **Backend:** `138.99.7.156`
- **Deploy activo (21/04):** DK-1493 frontend + backend Razor QR AFIP deployado
- **Pendiente deploy:** DSS-1497 fix CRM, CRM adjuntos fix
- **Credenciales de test:** `pruebacas@soporte.com` / `Admin1234`
- **Org de prueba DK-1493:** Org 14 (MoneyGuard_OF), comprobante ID=22

---

## Branches activos

| Branch | Tarea | Estado |
|--------|-------|--------|
| `feature/DK-1493-config-dinamica-factura` | Configuración factura | ✅ Deploy hecho |
| `feature/DK-1498-cantidad-dinamica` | Cantidad dinámica | ✅ Deploy hecho |
| `DSS-1497-crm-asignado-visualizacion-modulo` | Fix CRM | Pendiente deploy |
