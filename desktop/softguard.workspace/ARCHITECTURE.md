# ARCHITECTURE.md — SoftGuard Desktop Workspace

Documento de arquitectura global del workspace. Actualizar al tomar decisiones arquitecturales relevantes.

---

## Vision General

SoftGuard Desktop es una **plataforma web empresarial multi-modulo** construida sobre ExtJS 7.3.1 (classic toolkit). Expone funcionalidades de seguridad electronica, monitoreo, tracking vehicular y contabilidad a traves de un portal unificado (app **Desktop**) desde el cual se lanzan los modulos como "ventanas" del sistema.

---

## Estructura del Workspace

```
softguard.workspace/
├── workspace.json              ← Configuracion del workspace Sencha
├── CLAUDE.md                   ← Guia de trabajo con Claude Code
├── ARCHITECTURE.md             ← Este archivo
│
├── apps/                       ← Modulos independientes (~32 apps)
│   ├── Desktop/                ← Portal / launcher principal
│   ├── WebMG/                  ← MoneyGuard: sistema contable ★
│   ├── Trackguard/             ← Seguimiento vehicular
│   ├── SgWebCrm/               ← CRM
│   ├── Administrator/          ← Administracion del sistema
│   ├── Audit/                  ← Auditoria y bitacora
│   ├── Video/                  ← Monitoreo de video
│   ├── iOT/                    ← Integracion IoT
│   └── ...                     ← Ver workspace.json para lista completa
│
├── packages/local/             ← Paquetes compartidos
│   ├── common/                 ← Base: modelos, stores, proxies, controllers
│   ├── cuenta/                 ← Logica de cuentas y facturacion
│   └── tablas/                 ← Tablas de referencia y catalogos
│
├── ext731/                     ← ExtJS 7.3.1 (framework principal)
├── ext420/                     ← ExtJS 4.2.0 (apps legacy)
├── ext/                        ← ExtJS 7.1.0 (algunas apps)
└── build/                      ← Salida de compilacion (gitignored)
```

---

## Modulos Principales

| Modulo | App | Descripcion |
|--------|-----|-------------|
| Portal | Desktop | Launcher central, autenticacion, gestion de ventanas |
| Contabilidad | WebMG | Sistema contable completo (MoneyGuard) |
| CRM | SgWebCrm | Gestion de relacion con clientes |
| Tracking | Trackguard, TrackguardMonitoreo | Seguimiento vehicular en tiempo real |
| Administracion | Administrator, AdministratorSearch | Config del sistema |
| Auditoria | Audit, Logger | Bitacora y trazabilidad |
| Control acceso | AccessControl, SgAppAccessControl | Permisos y roles |
| Video | Video | Integracion con camaras |
| IoT | iOT | Dispositivos conectados |
| Reportes | SgAppWebReport, SgAppNotificationReport | Informes |
| Mapas | SgAppMapGuardWeb, SgFenceManager | Geocercas y mapas |
| Tecnico | SgAppSerTec | Servicio tecnico |
| Panicos | SmartPanics | Gestion de alertas de panico |
| Web remoto | WebRemoto, WebManager | Gestion remota |
| Cuentas | SgAppAccountAdministration | Admin de cuentas |

---

## Arquitectura de Paquetes Compartidos

La reutilizacion de codigo se basa en **herencia de clases por namespace** a traves de paquetes locales:

```
┌─────────────────────────────────────────────────────────┐
│                    Aplicacion (ej: WebMG)               │
│   Controllers propios + Views propias + Models propios  │
└──────────────────────┬──────────────────────────────────┘
                       │ extends / requires
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │  common  │ │  cuenta  │ │  tablas  │
    │          │ │          │ │          │
    │ modelos  │ │ modelos  │ │ catalogos│
    │ stores   │ │ stores   │ │ referencia│
    │ proxies  │ │ views    │ │          │
    │ mixins   │ │ ctrls    │ │          │
    └──────────┘ └──────────┘ └──────────┘
         │             │
         └─────────────┘
               │ requires
          ┌────▼─────┐
          │  tablas  │
          └──────────┘
```

### Dependencias entre paquetes

```
tablas    ← sin dependencias (paquete base)
common    ← independiente (no requiere tablas/cuenta)
cuenta    ← requiere tablas + common
WebMG     ← requiere common + cuenta + tablas
```

### Contenido de cada paquete

#### `common` — Namespace: `Common`

- `src/model/` — 200+ modelos base con campos y proxy REST configurado
- `src/store/` — 40+ stores reutilizables
- `src/proxy/` — 40+ configuraciones de proxy REST
- `src/controller/` — Controllers base reutilizables
- `src/view/` — Componentes de vista base
- `src/mixin/` — GeocodeHelper y otros mixins
- `src/overrides/` — Extensiones al framework ExtJS

#### `cuenta` — Namespace: `cuenta`

- Modelos y logica especifica de cuentas de clientes
- `CuentaSearchModel`, `CuentaAwccSearchModel`, `SoftguardCuentaModel`, etc.

#### `tablas` — Namespace: `tablas`

- Tablas de referencia del sistema
- `TablasParametrosSearchModel`, `VehicleBrandModel`, `TimeZoneModel`, etc.

---

## Patron MVC

Todas las apps siguen el patron MVC de ExtJS:

```
View (Grid o Form)
    │
    │ eventos (click, select, submit...)
    ▼
Controller
    │
    ├─ lee/escribe ──▶ Store ──▶ Model ──▶ REST Proxy ──▶ Backend
    │
    └─ actualiza ────▶ View (reload store, show/hide components)
```

### Ciclo tipico de operacion CRUD

```
1. View se abre → Controller carga el Store (store.load())
2. Usuario selecciona registro → Controller carga Form con record
3. Usuario edita y guarda → Controller llama record.save() o store.sync()
4. Backend responde → Controller cierra form, recarga grid
```

---

## Convencion de REST API

El backend expone:

```
GET    /Rest/<entidad>/              ← Listado / CRUD estandar
POST   /Rest/<entidad>/              ← Crear
PUT    /Rest/<entidad>/<id>          ← Actualizar
DELETE /Rest/<entidad>/<id>          ← Eliminar
GET    /Rest/Search/<nombre>         ← Busqueda dinamica via SearchObject (ver abajo)
```

Los parametros de busqueda se envian como query string. La autenticacion es via cookie de sesion.

---

## Patron SearchObject — Busquedas Dinamicas

### Como funciona

`/Rest/Search/<nombre>` es un endpoint generico que delega en un **proveedor de datos** configurado en la tabla `SearchObject` de `_Desktop`. El backend busca el registro por `Name`, determina el tipo de proveedor (`SearchType`) y ejecuta lo que indica `Content` pasandole todos los parametros del querystring.

```
GET /Rest/Search/crm_contrato?page=1&limit=50&filter=[...]&sort=[...]
         │
         ▼
  _Desktop.dbo.SearchObject
  WHERE Name = 'crm_contrato'
  → SearchType = 'Sql'
  → Content    = 'crm_contratoSearch'   ← nombre del SP a ejecutar
         │
         ▼
  EXEC crm_contratoSearch
       @page=1, @limit=50,
       @filter='[...]', @sort='[...]',
       @totalrows OUTPUT
         │
         ▼
  { rows: [...], total: N }             ← respuesta JSON
```

### Tabla SearchObject

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `Id` | int | PK |
| `Name` | varchar | Clave del endpoint — segmento en `/Rest/Search/<Name>` |
| `ObjectTypeId` | int | Tipo de objeto para filtros de permiso |
| `Content` | varchar | SP a ejecutar (para tipo `Sql`) o recurso del proveedor |
| `SearchType` | varchar | Tipo de proveedor (ver tabla abajo) |
| `IdProperty` | varchar | Columna que actua como ID en el resultado |
| `TokenProperty` | varchar | Columna para filtrar por token de sesion |
| `TotalRowsParameterName` | varchar | Nombre del parametro OUTPUT que devuelve el total de filas |

### Tipos de proveedor (SearchType)

| Tipo | Cantidad | Descripcion |
|------|----------|-------------|
| `Sql` | 681 | Ejecuta un stored procedure en `_Desktop` |
| `file` | 4 | Sirve un archivo estatico |
| `parametrofile` | 3 | Archivo estatico con parametros |
| `ParametroGoogleGeocoding` | 1 | Geocoding via Google Maps |
| `ParametroLocationiqGeocoding` | 1 | Geocoding via LocationIQ |
| `Revolver` | 1 | Proveedor custom |

### Firma estandar de los SPs tipo Sql

Todos los SPs invocados por SearchObject siguen la misma firma:

```sql
CREATE OR ALTER PROCEDURE [dbo].[MiEntidadSearch]
    @page   INT           = 1,
    @start  INT           = 0,
    @limit  INT           = 50,
    @sort   NVARCHAR(256) = '',    -- JSON de ordenamiento de ExtJS
    @group  NVARCHAR(256) = '',
    @filter NVARCHAR(2048)= '',    -- JSON de filtros de ExtJS
    @_dc    NVARCHAR(256) = '',    -- cache-buster de ExtJS (ignorar)
    @totalrows INT        = 1 OUTPUT  -- total de filas para paginacion
AS ...
```

Los parametros `@sort` y `@filter` reciben JSON generado por ExtJS y se procesan con las funciones helper:
- `dbo.GetSqlSortForJson(@sort, 'default ORDER BY')` → fragmento SQL `ORDER BY`
- `dbo.GetSqlFilterForJson(@filter, 'tabla')` → fragmento SQL `WHERE`

El resultado debe ser un recordset con las filas de la pagina solicitada. El backend lo serializa como `{ rows: [...], total: N }`.

### Conexion con Sencha: modelo → SearchObject → SP

El ciclo completo de una busqueda desde la UI:

```
1. Sencha Grid hace store.load()
   └─ Store usa modelo con proxy.url = '/Rest/search/crm_contrato'

2. ExtJS construye querystring:
   ?page=1&limit=50&sort=[{"property":"cnt_iid","direction":"DESC"}]&filter=[]

3. Backend busca en SearchObject WHERE Name = 'crm_contrato'
   └─ Content = 'crm_contratoSearch', SearchType = 'Sql'

4. EXEC crm_contratoSearch @page=1, @limit=50, @sort='[...]', @filter='[]', @totalrows OUTPUT

5. SP devuelve rows + totalrows
   Backend responde: { rows: [...], total: 47 }

6. Sencha reader (rootProperty:'rows', totalProperty:'total')
   puebla el grid con los datos y configura la paginacion
```

### Convencion de nombres

- Los SPs de tipo Search **suelen** terminar en `Search` (ej: `crm_contratoSearch`, `ClientesSearch`)
- Los modelos Sencha de busqueda **siempre** terminan en `SearchModel` (ej: `crm_contratoSearchModel`)
- La URL del proxy en el modelo **siempre** usa `/Rest/search/<Name>` (minuscula o mixta, el backend es case-insensitive)
- Los SPs autogenerados por el code generator (`EntidadByFilter`, `EntidadByName`, etc.) **NO** tienen entrada en SearchObject — tienen endpoints CRUD propios

### Ejemplo trazado: Contratos en WebMG

| Capa | Archivo / Objeto | Valor clave |
|------|-----------------|-------------|
| Sencha Model | `Common.model.crm_contratoSearchModel` | `proxy.url = '/Rest/search/crm_contrato'` |
| SearchObject | `Name = 'crm_contrato'` | `Content = 'crm_contratoSearch'` |
| Stored Procedure | `_Desktop.dbo.crm_contratoSearch` | Consulta `_Datos.dbo.crm_contrato` |
| | | |
| Sencha Model | `Common.model.ContratoItemSearchModel` | `proxy.url = '/Rest/search/crm_contrato_item'` |
| SearchObject | `Name = 'crm_contrato_item'` | `Content = 'crm_contrato_itemSearch'` |
| Stored Procedure | `_Desktop.dbo.crm_contrato_itemSearch` | Consulta `_Datos.dbo.crm_contrato_item` |

---

## Entorno de Desarrollo

Ver [CLAUDE.md](CLAUDE.md) para el flujo completo con Caddy.

**Resumen:**
- Caddy reverse proxy en `https://gcs.softguard.com` (mismo dominio que produccion)
- Frontend local: `sencha app watch` en `:1841`
- Backend remoto: `138.99.7.156:443`
- `.env` en `desktop/` (no en el workspace)

---

## Stack Tecnologico

| Componente | Version | Uso |
|-----------|---------|-----|
| ExtJS | 7.3.1 | Framework UI principal |
| ExtJS | 4.2.0 | Apps legacy |
| Sencha Cmd | - | Build system, `app watch` |
| Classic Toolkit | - | Todos los modulos |
| Theme | theme-gray | Tema visual base |
| Font Awesome | - | Iconografia |
| SASS | - | Estilos personalizados |
| Caddy | 2.x | Reverse proxy desarrollo |
| mkcert | - | Certificados TLS locales |

---

## Decisiones de Arquitectura

| Decision | Razon |
|----------|-------|
| Paquetes compartidos en vez de copy-paste | Evitar duplicacion, actualizaciones centralizadas |
| Modelos thin en cada app (solo extend) | Permite override local sin perder la base comun |
| REST puro sin GraphQL | Consistencia con el backend existente |
| Classic toolkit (no Modern) | Aplicacion desktop, no mobile-first |
| Mismo dominio dev/prod via Caddy | Cookies de sesion funcionan sin configuracion especial |
| `writeAllFields: true` en writers | El backend requiere todos los campos en PUT, no solo los modificados |
| Facturacion documentada aparte | Ver [BILLING_FLOW.md](BILLING_FLOW.md) para el circuito completo |

---

## ⚠️ REGLA CRITICA: writeAllFields en Modelos REST

### El problema

Cuando un modelo ExtJS hace un `PUT` (update), **por defecto solo envía los campos modificados**. El backend de SoftGuard **requiere todos los campos** en el body del PUT. Si no se envían todos, el backend interpreta los campos faltantes como `null`/valor por defecto y **sobreescribe el registro completo**, corrompiendo datos silenciosamente.

### La regla

**Todo modelo que tenga proxy REST y haga operaciones de escritura (POST/PUT) DEBE tener:**

```javascript
proxy: {
    type: 'rest',
    url: '/Rest/MiEntidad/',
    appendId: true,
    writer: {
        type: 'json',
        writeAllFields: true    // ← OBLIGATORIO
    }
}
```

### Qué pasa si falta

```
Sin writeAllFields: true          Con writeAllFields: true
─────────────────────────         ─────────────────────────
PUT /Rest/MiEntidad/123           PUT /Rest/MiEntidad/123
Body: { "Name": "Nuevo" }        Body: { "Id": 123, "Name": "Nuevo",
                                          "Phone": "123456",
→ Backend recibe solo Name        →       "Address": "Calle 1", ... }
→ Todos los demas campos = null
→ DATOS CORROMPIDOS               → Todos los campos preservados
                                   → UPDATE correcto
```

### Modelos que NO necesitan writer

Los modelos de **búsqueda** (`*SearchModel`) solo hacen `GET` y no necesitan writer. Sus proxies apuntan a `/Rest/search/...` y solo leen datos.

### Modelos con el bug actualmente (falta writeAllFields)

| Modelo | Ubicación |
|--------|-----------|
| `ComandosDispositivoModel` | `packages/local/common/src/model/` |
| `CheckPointsModel` | `packages/local/common/src/model/` |
| `BundleModel` | `packages/local/common/src/model/` |
| `BitacoraModel` | `packages/local/common/src/model/` |
| `AttachModel` | `packages/local/common/src/model/` |
| `ZonaModel` | `packages/local/common/src/model/` |
| `ZonaPlanillaModel` | `packages/local/common/src/model/` |
| `VehicleModel` | `packages/local/common/src/model/` |
| `SoftguardCuentasXtraInfoModel` | `packages/local/common/src/model/` |
| `ModemsSMSModel` | `packages/local/common/src/model/` |
| `InstruccionesModel` | `packages/local/common/src/model/` |
| `t_linkurlModel` | `packages/local/common/src/model/` |
| `TablasGuidedStepOptionsModel` | `packages/local/common/src/model/` |
| `TablasInstaladoresModel` | `packages/local/common/src/model/` |
| `t_autoridadesModel` | `packages/local/cuenta/src/model/` |
| `w_usuariosModel` | `apps/Administrator/app/model/` |
| `FormatosModel` | `apps/AdministratorSearch/app/model/` |
| `m_simcardModel` | `apps/GestorSim/app/model/` |

> **ACCION:** Estos modelos deben corregirse agregando el writer con `writeAllFields: true`.

---

## Planes y Trabajo en Curso

> Actualizar esta seccion con decisiones tecnicas, refactors planeados, o deuda tecnica identificada.

### Deuda tecnica identificada

- `CuentaHelperControllerBAK.js` en WebMG — archivo backup en produccion, evaluar eliminar o refactorizar
- Multiples versiones de ExtJS coexistiendo (4.2, 7.1, 7.3.1) — consolidar a 7.3.1 en apps legacy cuando sea posible
- Alta granularidad de controllers en WebMG (116) — evaluar consolidacion de controllers pequeños relacionados

---

## SLBF Generator — Workflow obligatorio para entidades del backend

Los objetos del backend C# (`Slbf.Pxp`, `Slbf.Common`, etc.) y sus stored procedures **NO se editan a mano**. Existe un generador XSLT que produce todo el codigo (.cs) y SQL desde un XML descriptor. Editar los archivos generados directamente provoca que el proximo regen sobreescriba los cambios.

> Cita Rodrigo: *"no podes tocar los objetos a mano. Hay un builder, slbf.generator. Edita un xml y eso te genera todos los .cs y los .sql. Sino te van a pisar los cambios el proximo que regenere."*

### Ubicaciones del generador

Hay dos repos del generador conviviendo:

| Repo | Path | Estado |
|------|------|--------|
| **Legacy in-tree** (activo para Product) | `D:\projects\softguard\slbf\Slbf\Generator\Pxp\` | Source-of-truth para `Product` y otras entidades del modulo Pxp. Aqui vive `Objects/Product.xml` y los archivos generados (`Source/*.cs`, `Sql/*.sql`, `CS/*.cs`, `JS/*.js`). |
| **slbf.generator (oficial)** | `D:\projects\softguard\slbf.generator\Slbf.Generator\BusinessObjects\` | Repo nuevo separado. Tiene `Producto.xml`, `SerTecProductosOrden.xml`, `MG_product_impuesto.xml`, etc. **NO** tiene `Product.xml` migrado todavia. |

> **REGLA:** Para una entidad existente, editar el XML donde ya existe. Para nuevas entidades, preferir `slbf.generator` (oficial). Migrar Product al repo oficial es deuda tecnica pendiente.

### XSLTs del generador

`D:\projects\softguard\slbf\Slbf\Generator\v1.0.4\` contiene los XSLTs que transforman el XML en codigo:

| XSLT | Output |
|------|--------|
| `CALLERGenerator.xsl` | `Source/Caller<Name>.cs` |
| `DALGenerator.xsl` | `Source/Dal<Name>.cs` |
| `SIMPLEGenerator.xsl` | `Source/Simple<Name>.cs` |
| `SPEGenerator.xsl` | `Source/Spe<Name>.cs` |
| `OBJECTGenerator.xsl` | `Source/<Name>.cs` |
| `SQLGenerator.xsl` | `Sql/<Name>.sql` (CREATE TABLE + ALTER if not exists por campo) |
| `SQLStoredProcedures.xsl` | `Sql/<Name>StoredProcedures.sql` (Sel/Del/Ins/Upd/ByFilter) |
| `CSRestService.xsl` | `CS/<Name>RestService.cs` |
| `JSModel.xsl` / `JSStore.xsl` / `JSView.xsl` | `JS/<Name>{Model,Store,View}.js` |
| `IGNORECSTableObject.xsl` / `IGNORECSTableRestService.xsl` | `IGNORECS/*.ignorecs` |
| `IGNORESQLTableStoredProcedure.xsl` | `IGNORESQL/*.ignoresql` |

### Estructura minima del XML

```xml
<NAMESPACE>Slbf.Pxp</NAMESPACE>
<OBJECT>
    <ID>403</ID>
    <NAME>Product</NAME>
    <DBTABLENAMEALIAS>_datos..Product</DBTABLENAMEALIAS>  <!-- ¡OBLIGATORIO! -->
    <DBIDFIELDALIAS>Id</DBIDFIELDALIAS>                    <!-- ¡OBLIGATORIO! -->
    <DBNAMECOLUMNDUMMY>FALSE</DBNAMECOLUMNDUMMY>           <!-- TRUE si la tabla NO tiene columna Name -->
</OBJECT>
<FIELDS>
    <FIELD>
        <NAME>pro_cantidad_auto</NAME>
        <TYPE>INT</TYPE>           <!-- ¡UPPERCASE! XSLT case-sensitive -->
    </FIELD>
    <FIELD>
        <NAME>Code</NAME>
        <TYPE>VARCHAR</TYPE>
        <LENGTH>256</LENGTH>
    </FIELD>
    <FIELD>
        <NAME>Price</NAME>
        <TYPE>DECIMAL</TYPE>
        <LENGTH>9,2</LENGTH>
    </FIELD>
</FIELDS>
```

**Reglas criticas (causantes de SQL roto silencioso):**
1. `<DBTABLENAMEALIAS>` debe estar presente. Si falta, el SQL queda con `from ` (vacio).
2. `<DBIDFIELDALIAS>` debe estar presente. Si falta, queda `where [] = @Id`.
3. `<TYPE>` debe estar en **UPPERCASE** (`INT`, `VARCHAR`, `CHAR`, `BIT`, `DECIMAL`, `TEXT`). En lowercase, el XSLT no matchea y produce parametros sin tipo (`@Code ,`).
4. `<DBNAMECOLUMNDUMMY>FALSE</DBNAMECOLUMNDUMMY>` si la tabla tiene columna `Name`. Si se omite el elemento, XSLT 1.0 evalua `node-set != 'TRUE'` como falso para nodos vacios, **omite Name del INSERT/UPDATE** y rompe los SPs.

### Como regenerar

Hay dos opciones:

**1. Script automatizado (recomendado para CI/diff/repetibilidad):**

```powershell
& "D:\projects\softguard\slbf\Slbf\Generator\regen-object.ps1" -ObjectName Product
```

El script `regen-object.ps1` usa `System.Xml.Xsl.XslCompiledTransform` para correr cada XSLT del directorio `v1.0.4/` contra `Objects/<Name>.xml` y escribe a las carpetas `Source/`, `Sql/`, `CS/`, `JS/`, `IGNORECS/`, `IGNORESQL/`. Imprime `[OK]/[ERR]` por archivo.

**2. GUI (legacy):**

`D:\projects\softguard\slbf.generator\Slbf.Generator\Ferengi.SLBF.Generator.Gui.exe` — interactivo, mas lento, sirve cuando se quiere previsualizar.

### Workflow para agregar/modificar un campo

1. Editar `Objects/<Name>.xml` — agregar el `<FIELD>` con `<NAME>` y `<TYPE>` (UPPERCASE).
2. Correr `regen-object.ps1 -ObjectName <Name>`.
3. Revisar el diff de los archivos generados (`git diff Source/ Sql/ CS/ JS/`).
4. Aplicar el `ALTER TABLE` correspondiente en la DB (`_datos..<Tabla>`) — los SPs viven en `_Desktop` y referencian la tabla cross-DB con `_datos..`.
5. Aplicar el `*StoredProcedures.sql` regenerado al DB `_Desktop`.
6. Rebuildear la solucion `Slbf` y desplegar el DLL.
7. Si el modelo ExtJS necesita el campo, actualizarlo en `packages/local/.../model/` (recordando `writeAllFields: true`).

### Anti-patrones

- ❌ Editar `Source/Caller<Name>.cs`, `Sql/<Name>StoredProcedures.sql` directamente — se pisa al regenerar.
- ❌ Hardcodear SPs en la DB sin reflejarlos en el XML — el proximo regen no los incluira y quedaran obsoletos.
- ❌ Tipos en lowercase (`int`, `varchar`) — el XSLT no los reconoce y genera SQL sin tipos.
- ❌ Olvidar `<DBTABLENAMEALIAS>` o `<DBIDFIELDALIAS>` — produce SQL invalido sin warning.

---

## Compilacion y deploy del backend C# (DLLs)

### IMPORTANTE: convencion ingles vs espaniol de entidades

El sistema tiene **dos familias paralelas de entidades** que pueden colisionar de nombre. Identificar correctamente cual aplica antes de tocar nada:

| Familia | Endpoint REST | DLL que sirve | Modulo Generator | Tabla DB | Uso tipico |
|---------|--------------|---------------|------------------|----------|-----------|
| **Ingles (legacy ACTIVO)** | `/Rest/Product/`, `/Rest/Lead/`, etc. | hasta hoy: `Slbf.Pxp.dll` (build de **2020**, sin rebuild). **Para `Product`: migrado a `SoftGuard.BusinessObjects.dll`** ver abajo | `Generator\Pxp\` (legacy) o `Generator\BusinessObjects\` (migrado) | `_Datos..Product` | **WebMG / CRM facturacion** (DK-1498, contratos, items facturables) |
| **Espaniol (mainstream)** | `/Rest/Producto/`, `/Rest/SerTec*`, etc. | `Slbf.Services.Rest.dll` + `SoftGuard.BusinessObjects.dll` (builds **2026**, activos) | `Generator\BusinessObjects\` | `_Tablas..t_productos` y otras `t_*`, `m_*` | SerTec, monitoreo, tablas base |

> **Regla del 99% de Rodrigo:** "no toques Pxp, casi nunca lo necesitas". **Solucion al 1%:** cuando una entidad de Pxp realmente necesita modificacion (ej. `Product` para WebMG), **se migra** moviendo el XML del Generator de `Pxp\Objects\` a `BusinessObjects\Objects\` y cambiando `<NAMESPACE>Slbf.Pxp</NAMESPACE>` por `<NAMESPACE>SoftGuard.BusinessObjects</NAMESPACE>`. Al regenerar, los `.cs` salen con el namespace correcto y el server CCNet los compila dentro de `SoftGuard.BusinessObjects.dll` (que si se rebuildea regularmente). Asi se evita tocar Pxp.

**Migracion ya aplicada — `Product` (WebMG):**

- Antes: `Generator\Pxp\Objects\Product.xml` con `<NAMESPACE>Slbf.Pxp</NAMESPACE>` → compilaria en `Slbf.Pxp.dll` (que no se rebuildea desde 2020).
- Ahora: `Generator\BusinessObjects\Objects\Product.xml` con `<NAMESPACE>SoftGuard.BusinessObjects</NAMESPACE>` → compila en `SoftGuard.BusinessObjects.dll`.
- Tabla y SPs no cambian: siguen siendo `_datos..Product` y `ProductSel/Ins/Upd/Del`.
- Frontend ExtJS no cambia: sigue usando `/Rest/Product/`. El cambio de namespace es interno al backend; el endpoint REST queda igual.
- Los archivos en `Generator\Pxp\Source\*Product*.cs` y `Generator\Pxp\Sql\Product*.sql` quedan como huerfanos — pendiente coordinar con Rodrigo para sacarlos del `Slbf.Pxp.csproj` (que vive solo en SVN).

**Como confirmar antes de tocar otra entidad:**

1. Ver el `url` del proxy en el modelo ExtJS del frontend (`packages\local\common\src\model\<X>Model.js`). Si dice `/Rest/Product/` → ingles → entidad heredada de Pxp. Si dice `/Rest/Producto/` → espaniol → ya esta en BusinessObjects.
2. Buscar las clases `Dal<X>`, `<X>RestService`, `Simple<X>` en los DLLs deployados (`strings <dll> | grep <X>`):
   - Aparecen en `Slbf.Pxp.dll` → familia inglesa (probable candidata a migrar a BusinessObjects si requiere cambios)
   - Aparecen en `Slbf.Services.Rest.dll` o `SoftGuard.BusinessObjects.dll` → ya esta en el lugar correcto
3. Buscar el XML correspondiente en el Generator: `Generator\Pxp\Objects\<X>.xml` vs `Generator\BusinessObjects\Objects\<X>.xml`.

### Como se compone Slbf

El backend NO es un solo DLL monolitico. Es un conjunto de DLLs:

| DLL | Origen | Donde se compila localmente |
|-----|--------|----------------------------|
| `Slbf.dll` | `Slbf\Slbf.csproj` (proyecto core: BaseObject, Search, Membership, Audit, etc.) | `Slbf.Services.Rest.sln`, `Slbf.Web.sln`, `Slbf.Ui.Application.sln` |
| `Slbf.Services.Rest.dll` | `Slbf\Slbf.Services.Rest\Slbf.Services.Rest.csproj` | `Slbf.Services.Rest.sln` |
| `Slbf.Ui.dll` / `Slbf.Ui.Rest.dll` | `Slbf.Ui*` projects | `Slbf.Ui.Application.sln` |
| `Slbf.Crm.dll` | NO compila localmente — viene precompilada en `Dependencies/` | (externo) |
| **`Slbf.Pxp.dll`** | Modulo del Generator — compila los `.cs` de `Generator\Pxp\Source\` | **NO compila localmente — falta el `.csproj`** |
| `Ferengi.eLearning.dll` | `Generator\eLearning\Source\Ferengi.eLearning.csproj` (formato VS2003 antiguo) | Standalone, manual con `csc` o `msbuild` |

> **Patron clave:** cada modulo del Generator (`Pxp`, `eLearning`, `Crm`, `Bom`, `Building`, etc.) tiene en teoria su propio `.csproj` con `<OutputType>Library</OutputType>` que compila los archivos `Source/*.cs` generados → produce un DLL homonimo. Solo `eLearning` tiene el `.csproj` presente en el checkout local; los demas viven en otro repo o en el server de build.

### Server de build (CCNet + SVN)

Existe un server de **CruiseControl.NET** que hace los builds reales. Evidencia:

- [Slbf.Release/Commit.proj](../slbf/Slbf/Slbf.Release/Commit.proj) usa `SvnCommit` con paths `C:\development\working\Ferengi.Pxp\lib` y `C:\development\working\SLBF\lib`.
- [Slbf.Release/Version.proj](../slbf/Slbf/Slbf.Release/Version.proj) genera `lib\SlbfVersionAssemblyInfo.cs` con la version `$(Major).$(Minor).$(CCNetLabel).$(Revision)` desde `SvnVersion`.
- El path `(programfiles)\VisualSVN Server\bin` y mensajes `[CCNET] Se actualizo la version de SLBF a ...` confirman el pipeline.

> **Implicacion:** este repo en Git es un mirror parcial. El build oficial corre en el server con la copia SVN completa (que incluye `Ferengi.Pxp.csproj` / `Slbf.Pxp.csproj`). Para producir un DLL nuevo de Pxp, el flujo es:
> 1. Editar el XML del Generator (en este repo).
> 2. Regenerar.
> 3. Commitear los `.cs` y `.sql` resultantes.
> 4. **Pedir al responsable del server de build (Rodrigo / CCNet) que dispare el build** o reconstruir manualmente con el `.csproj` que vive solo en SVN.

### Deploy local rapido (alternativa)

Si se necesita un DLL local urgente sin tocar el server:

1. **Compilar `Slbf.dll` + `Slbf.Services.Rest.dll`** con MSBuild (Visual Studio 2013, .NET 4.0):
   ```powershell
   & "C:\Program Files (x86)\MSBuild\12.0\Bin\MSBuild.exe" `
     "D:\projects\softguard\slbf\Slbf\Slbf.Services.Rest.sln" `
     /p:Configuration=Release /p:Platform="Any CPU"
   ```
   Output en `Slbf.Services.Rest\bin\` y `Slbf\bin\Release\`.

2. **Para `Slbf.Pxp.dll`** (cuando no esta el `.csproj`): generar uno nuevo siguiendo el formato de `Ferengi.eLearning.csproj` o moderno `.csproj` con `<TargetFramework>net40</TargetFramework>`, listando todos los `.cs` de `Generator\Pxp\Source\`, con referencias a `Slbf.dll` y `EnterpriseLibrary`. Esta deuda tecnica esta abierta.

3. **Deploy del DLL** al server: copiar via FTP/SMB/WebDeploy a `bin\` del IIS site donde corre el SLBF. El DLL `Slbf.Pxp.dll` debe ir junto a los demas en el `bin\` del WebApp en produccion.

### Deploy de Razor Templates (UI dinamica)

Las pantallas (Form, Grid, Controllers) viven en la tabla `_Desktop..Razor` y se editan/deployan via API REST sin recompilar nada:

- **Backup**: `gcs-manager.ps1 backup <App>`
- **Edit**: archivo local en `tools\gcs\backups\<App>\...` o `tools\gcs\tasks\`
- **Diff**: `gcs-manager.ps1 diff <RazorName>`
- **Publish**: `gcs-manager.ps1 publish <RazorName>` o `deploy-local-3358-3359.ps1` (UPDATE directo a la tabla `Razor`)
- **Cache invalidation**: bumpear `UIApplication.Version` (last segment +1) — el cliente recarga al detectar version nueva
- Token OAuth en [tools/gcs/gcs-config.json](tools/gcs/gcs-config.json), connection string en [tools/gcs/schema.ps1](tools/gcs/schema.ps1)

> **Resumen de cambios y a donde van:**
> - Cambio en pantalla ExtJS (Form/Grid/Controller) que vive en `Razor` table → deploy via `gcs-manager.ps1` o script PS, sin rebuild.
> - Cambio en pantalla ExtJS en `apps/<App>/` (sencha cmd, `app.json`) → `sencha app build` y deploy estatico.
> - Cambio en modelo C# (campo nuevo en entidad) → editar XML del Generator → regen → commitear → server CCNet rebuild → DLL nuevo en `bin\` produccion.
> - Cambio en SP solo (sin entidad) → editar `.sql` regenerado o aplicar directo en `_Desktop`. Si afecta una entidad, mejor editar el XML.
