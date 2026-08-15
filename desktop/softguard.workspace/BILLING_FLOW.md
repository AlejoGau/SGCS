# BILLING_FLOW.md — Flujo de Facturación WebMG (MoneyGuard)

Documento de referencia para entender, probar y debuggear el circuito completo de facturación.

---

## Resumen del Circuito

```
┌─────────────────┐    ┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌─────────────┐
│  1. Configurar   │    │  2. Crear        │    │  3. Generar       │    │  4. Facturar       │    │  5. Cobrar   │
│  Info Contable   │───▶│  Contrato        │───▶│  Novedades        │───▶│  Periodo           │───▶│  (Pago)      │
│                  │    │  + Activarlo      │    │  desde Contratos  │    │  (Generar Factura) │    │              │
└─────────────────┘    └─────────────────┘    └──────────────────┘    └──────────────────┘    └─────────────┘
```

---

## Paso 0: Pre-requisitos (AdministratorSearch)

Antes de iniciar el circuito, en **AdministratorSearch** deben existir:

| Entidad | Endpoint REST | ¿Para qué? |
|---------|--------------|-------------|
| **Organizaciones Facturadoras** | `/Rest/t_organizacion_fc/` | Empresa que emite las facturas |
| **Categorías Impositivas** | `/Rest/search/t_categorias_impositivas_fc` | IVA Resp. Inscripto, Monotributo, etc. |
| **Condiciones de Pago** | `/Rest/search/t_condiciones_pago_fc` | Contado, 30 días, etc. |
| **Tipos de Comprobante** | `/Rest/search/t_comprobantes_fc` | Factura A, B, C, Recibo, NC, ND |
| **Productos/Servicios** | `/Rest/search/TablasProductos` | Ítems facturables |
| **Listas de Precios** | `/Rest/search/mg_listas_precios` | Precios por organización y moneda |
| **Formas de Pago** | `/Rest/search/TablasFormaDePago` | Efectivo, cheque, transferencia |

> **Regla crítica de filtros:** Categorías, condiciones de pago, productos y listas de precios están **vinculados a una organización facturadora**. Al seleccionar una organización, los combos solo deben mostrar datos de esa organización.

---

## Paso 1: Configurar Información Contable

### Qué es
Asociar una **cuenta/organización de SoftGuard** con un **cliente contable** en las tablas de facturación (`m_clientes_fc`).

### Dónde se hace
- **Vista:** `ClienteFormView` (ventana modal)
- **Controller:** `ClienteFormController` → `initview()`
- **Trigger:** Se dispara automáticamente al abrir la pestaña de Contratos si la organización no tiene `Account` configurado, o manualmente desde `MGCuentaController.addInfoContable()`

### Campos clave del formulario

| Campo | Modelo | Filtrado por Org |
|-------|--------|:---:|
| Empresa Facturadora | `t_organizacion_fcSearchModel` | — |
| Categoría Impositiva | `t_categorias_impositivas_fcSearchModel` | ✅ `cat_orgicodigoid` |
| Condición de Pago | `t_condiciones_pago_fcSearchModel` | ✅ `con_orgidcodigoid` |

### Flujo interno

```
1. Se abre ClienteFormView con recordCliente + recordOrganizacion
2. Controller carga stores de Org Facturadora, Categorías (filtradas), Condiciones (filtradas)
3. Al cambiar Empresa Facturadora → onOrganizacionFacturadoraChange()
   → Re-filtra categorías por cat_orgicodigoid = newvalue
   → Re-filtra condiciones por con_orgidcodigoid = newvalue
4. Al guardar:
   - POST /Rest/m_clientes_fc/ (si es nuevo) o PUT /Rest/m_clientes_fc/<id> (si existe)
   - Actualiza Organization.Account con el ID del cliente creado
```

### Verificación

- **Network (F12):** POST/PUT a `/Rest/m_clientes_fc/` debe responder con el ID del cliente
- **Resultado:** La organización ahora tiene `Account != 0`, lo que habilita todo el circuito

### Archivos clave

| Archivo | Ubicación |
|---------|-----------|
| Vista formulario | `packages/local/common/src/view/ClienteFormView.js` |
| Controller | `apps/WebMG/app/controller/ClienteFormController.js` |
| Controller alternativo | `packages/local/common/src/controller/MGCuentaController.js` |
| Modelo cliente | `packages/local/common/src/model/m_clientes_fcModel.js` |
| Modelo búsqueda | `packages/local/common/src/model/m_clientes_fcSearchModel.js` |

---

## Paso 2: Crear y Activar un Contrato

### Qué es
Un contrato define qué servicios/productos se le facturan a un cliente, con qué periodicidad y a qué precios.

### Dónde se hace
- **Grilla:** `ContratoGridView`
- **Controller:** `ContratoGridController` → botón "Nuevo contrato"
- **Formulario:** `ContratoFormView` para cabecera + `ContratoItemFormView` para ítems

### Campos clave del contrato

| Campo | Descripción | Obligatorio |
|-------|-------------|:-----------:|
| `cnt_fechavto` | Fecha de vencimiento | ✅ **No puede ser null** |
| `cnt_idcliente` | ID del cliente contable (Account) | ✅ Auto |
| `cnt_estado` | Estado del contrato | ✅ |
| `cnt_org_fc` | ID organización facturadora | ✅ |

### Estados del contrato

| Valor | Estado | Descripción |
|:-----:|--------|-------------|
| 0 | Pendiente | Recién creado, no se factura |
| 1 | **Activo** | Se incluye en la facturación |
| 2 | Cancelado | Ya no se factura |
| 3 | Vencido | Contrato expirado |

### Flujo interno

```
1. Se abre ContratoGridView → validateAndSetupRecord()
   → Verifica que Organization.Account exista
   → Si no existe, ofrece configurar info contable
   → Filtra contratos por cnt_idcliente = Account

2. "Nuevo contrato" → ContratoFormView
   → Agregar ítems (servicios/productos) desde ProductHelperView
   → Guardar cabecera: POST /Rest/crm_contrato/
   → Guardar ítems: POST /Rest/crm_contrato_item/

3. Activar contrato → Cambiar cnt_estado a 1
   → PUT /Rest/crm_contrato/<id>
```

### Verificación

- **Network:** POST a `/Rest/crm_contrato/` devuelve ID del contrato
- **Grilla:** El contrato debe aparecer en la lista después de guardar
- **Ítems:** GET a `/Rest/search/crm_contrato_item?filter=[{"property":"idcontrato","value":<id>}]` devuelve los ítems

### Problema conocido: "No veo el contrato después de crearlo"

**Causa:** El filtro de la grilla usa `cnt_idcliente = Account`. Si `Account` no se actualizó correctamente:
- Verificar en F12 Console: `validateAndSetupRecord - Account: <valor>` → debe ser un número > 0
- Verificar en Network: la request a `/Rest/search/crm_contrato` debe llevar el filtro `cnt_idcliente` correcto

### Problema conocido: `POST /Rest/crm_contrato/` devuelve 500 con `unexpected message format 'Raw'`

**Síntoma:** al guardar un contrato nuevo, el backend responde con fault WCF similar a:

`The incoming message has an unexpected message format 'Raw'. The expected message formats for the operation are 'Xml', 'Json'.`

**Root cause:** el servicio backend `crm_contratoRestService` espera **JSON** (`RequestFormat = WebMessageFormat.Json` en `slbf/Slbf/Generator/BusinessObjects/CS/crm_contratoRestService.cs`). Si el frontend fuerza `Content-Type: application/octet-stream`, WCF interpreta el body como `Raw` y rechaza el alta/actualización.

**Qué verificar / corregir:**
- En `packages/local/common/src/model/crm_contratoModel.js`, **no** forzar `application/octet-stream`
- El modelo debe usar `writer: { type: 'json', writeAllFields: true }`
- En Network, el `POST`/`PUT` a `/Rest/crm_contrato/` debe salir con `Content-Type: application/json`

**Impacto funcional:** si el `POST` falla, el contrato nunca se crea en backend y por eso tampoco aparecerá en la lista, aunque el contexto cliente/facturadora esté bien resuelto.

### Archivos clave

| Archivo | Ubicación |
|---------|-----------|
| Grilla contratos | `packages/local/common/src/view/ContratoGridView.js` |
| Controller grilla | `packages/local/common/src/controller/ContratoGridController.js` |
| Formulario contrato | `packages/local/common/src/view/ContratoFormView.js` |
| Controller form | `packages/local/common/src/controller/ContratoFormController.js` |
| Formulario ítems | `packages/local/common/src/view/ContratoItemFormView.js` |
| Controller ítems | `packages/local/common/src/controller/ContratoItemFormController.js` |
| Modelo contrato | `packages/local/common/src/model/crm_contratoModel.js` |
| Modelo ítem | `packages/local/common/src/model/ContratoItemModel.js` |

---

## Paso 3: Generar Novedades desde Contratos

### Qué es
Tomar los contratos activos y generar "novedades" (líneas de facturación) para el período actual. Es el paso previo a la facturación.

### Dónde se hace
- **Wizard:** `FacturacionAutomaticaWizardView` → Botón "Contrato a Novedad"
- **Controller:** `FacturacionAutomaticaWizardController.onContratoAnovedadClick()`

### Flujo interno

```
1. Seleccionar Organización Facturadora en el wizard
2. Click "Contrato a Novedad"
3. GET /rest/search/MG_ContratosGenerarNovedades?idorganizacion=<orgId>
4. Backend procesa todos los contratos activos de esa organización
5. Notifica: "Los contratos se procesaron con éxito"
```

### Verificación

- **Network:** GET a `MG_ContratosGenerarNovedades` con `idorganizacion` correcto
- **Resultado:** Las novedades deben aparecer en la grilla de novedades del cliente

---

## Paso 4: Facturar Período (Generar Factura)

### Qué es
Tomar las novedades pendientes y generar los comprobantes (facturas) formales.

### Dónde se hace
- **Wizard:** `FacturacionAutomaticaWizardView` (wizard de 3 cards)
- **Controller:** `FacturacionAutomaticaWizardController`

### Flujo del wizard

#### Card 0 — Configuración
| Campo | Descripción |
|-------|-------------|
| Empresa Facturadora | Organización que emite la factura |
| Tipo de Comprobante | Factura A, B, C, etc. (filtrado por org) |
| Enviar por mail | Checkbox + seleccionar template |

#### Card 1 — Filtros y búsqueda
| Campo | Filtro que aplica |
|-------|-------------------|
| Categoría Impositiva | `cli_ccategoriaimpositiva` |
| Condición de Pago | `cli_ccondicionpago` |
| Organización | `cli_iorganizacion` |

Click **"Buscar"** → Muestra resumen:
- Cantidad de clientes
- Cantidad de provincias
- Cantidad de categorías impositivas
- Cantidad de novedades

#### Card 2 — Facturar
Click **"Facturar"** → Genera las facturas

### Flujo interno

```
1. Card 0: Seleccionar org → filtros se aplican a tipos de comprobante
2. Card 1: Click "Buscar"
   → GET /Rest/search/MG_FacturacionAutomaticaContabilizacion
     con filtros: cli_iorganizacion, cli_ccategoriaimpositiva, cli_ccondicionpago
   → Devuelve contadores de resumen

3. Card 2: Click "Facturar"
   → GET /rest/search/MG_LoteFacturasByFilters
     params: filter (JSON), codigoTipoComprobante, envio (0/1), tipoEnvio, template
   → Backend genera las facturas
   → Notifica: "Se facturó"
```

### Verificación

- **Buscar:** Debe devolver cantidades > 0 si hay novedades pendientes
- **Facturar:** Request a `MG_LoteFacturasByFilters` debe responder exitosamente
- **Resultado:** Las facturas deben aparecer en la sección de Comprobantes del cliente

### Archivos clave

| Archivo | Ubicación |
|---------|-----------|
| Vista wizard | `apps/WebMG/app/view/FacturacionAutomaticaWizardView.js` |
| Controller wizard | `apps/WebMG/app/controller/FacturacionAutomaticaWizardController.js` |

---

## Paso 5: Visualizar Factura Generada

### Dónde se ve
- **Grilla de comprobantes:** `ComprobanteGridView` (en la pestaña del cliente o en la sección general)
- **PDF:** Botón para generar/descargar PDF

### Datos que muestra la grilla

| Columna | Campo |
|---------|-------|
| Nro. Comprobante | Formato XXXX-YYYYYYYYYY |
| Cliente | Nombre del cliente |
| Tipo | Factura A, B, C, etc. |
| Fecha | Fecha de emisión |
| Total | Monto total |
| Estado | Pendiente / Activo / Pagado |

### Generar PDF

```
GET /handler/ComprobantePdfMG?id=<comprobanteId>
→ Devuelve PDF para preview/descarga
```

### Archivos clave

| Archivo | Ubicación |
|---------|-----------|
| Grilla | `packages/local/common/src/view/ComprobanteGridView.js` |
| Controller | `packages/local/common/src/controller/ComprobanteGridController.js` |
| Modelo búsqueda | `packages/local/common/src/model/m_comprobantes_cab_fcSearchModel.js` |

---

## Paso 6: Registrar Pago (Cobro)

### Qué es
Registrar el cobro de una factura, cerrando el circuito.

### Dónde se hace
1. Ir a **Cuenta Corriente** del cliente → `CuentaCorrientePanelView`
2. Ver facturas pendientes con saldo
3. Click **"Nuevo pago"** → Se abre `PagoFormView`

### Flujo del formulario de pago

```
1. Seleccionar Forma de Pago (efectivo, cheque, transferencia)
   → Según la forma, se muestran campos adicionales:
     - Cheque: número, vencimiento, banco, firmante
     - Transferencia: número de operación

2. Ingresar importe y click "Agregar"
   → Se suma a la grilla de pagos

3. En la grilla de comprobantes pendientes:
   → Doble-click o "Imputar todo" para asignar el monto a una factura
   → El sistema calcula automáticamente:
     - Si el pago cubre el total → imputa el total
     - Si el pago es menor → imputa lo que alcanza
     - Si ya no queda saldo → notifica

4. Seleccionar tipo de Recibo

5. Click "Realizar Pago"
   → POST /handler/SearchPost?search=MG_RealizarPago
```

### Payload del pago

```json
{
  "arrayPagos": [{"forma": "001", "importe": 1000, ...}],
  "arrayComprobantesImputados": [
    {"Id": 123, "imputar": 1000, "IdComprobante": 456}
  ],
  "clienteId": 789,
  "codigoComprobante": "REC",
  "fechaComprobante": "2026-03-26"
}
```

### Verificación

- **Network:** POST a `MG_RealizarPago` debe responder con `Error != '1'`
- **Resultado:** El saldo de la factura en cuenta corriente debe quedar en $0
- **Recibo:** Se debe generar un comprobante de tipo Recibo

### Archivos clave

| Archivo | Ubicación |
|---------|-----------|
| Panel cuenta corriente | `apps/WebMG/app/view/CuentaCorrientePanelView.js` |
| Controller panel | `apps/WebMG/app/controller/CuentaCorrientePanelController.js` |
| Formulario pago | `apps/WebMG/app/view/PagoFormView.js` |
| Controller pago | `apps/WebMG/app/controller/PagoFormController.js` |

---

## Diagrama de Endpoints

```
Circuito completo - Requests por paso:

PASO 1 - Info Contable
  POST/PUT  /Rest/m_clientes_fc/                          → Crear/editar cliente
  PUT       /Rest/Organization/<id>                       → Asociar Account

PASO 2 - Contrato
  POST      /Rest/crm_contrato/                           → Crear contrato
  POST      /Rest/crm_contrato_item/                      → Agregar ítems
  PUT       /Rest/crm_contrato/<id>                       → Activar (estado=1)
  GET       /Rest/search/crm_contrato?filter=[...]        → Listar contratos

PASO 3 - Novedades
  GET       /rest/search/MG_ContratosGenerarNovedades     → Procesar contratos → novedades

PASO 4 - Facturación
  GET       /Rest/search/MG_FacturacionAutomaticaContabilizacion  → Búsqueda/resumen
  GET       /rest/search/MG_LoteFacturasByFilters                 → Generar facturas

PASO 5 - Visualización
  GET       /Rest/search/m_comprobantes_cab_fc?filter=[...]       → Listar facturas
  GET       /handler/ComprobantePdfMG?id=<id>                     → Descargar PDF

PASO 6 - Cobro
  GET       /Rest/search/MGCuentaCorriente?filter=[...]           → Ver cuenta corriente
  POST      /handler/SearchPost?search=MG_RealizarPago            → Registrar pago
```

---

## Relaciones entre Modelos

```
Organization (cuenta SoftGuard)
  │
  │ Account (FK)
  ▼
m_clientes_fc (cliente contable)
  │  cli_iorganizacion → t_organizacion_fc.Id
  │  cli_ccategoriaimpositiva → t_categorias_impositivas_fc.cat_ccodigo
  │  cli_ccondicionpago → t_condiciones_pago_fc.con_ccodigo
  │
  ├──▶ crm_contrato (contratos)
  │      cnt_idcliente = m_clientes_fc.Id
  │      cnt_estado: 0=Pendiente, 1=Activo, 2=Cancelado, 3=Vencido
  │      │
  │      └──▶ crm_contrato_item (ítems del contrato)
  │             idcontrato = crm_contrato.Id
  │
  ├──▶ t_novedades_fc (novedades generadas)
  │      Generadas desde contratos activos
  │
  ├──▶ m_comprobantes_cab_fc (facturas/comprobantes)
  │      Generadas desde novedades
  │      │
  │      └──▶ m_comprobantes_item_fc (ítems de la factura)
  │
  └──▶ m_cuenta_corriente_fc (cuenta corriente)
         Refleja facturas emitidas y pagos realizados
         cta_ySaldo: saldo pendiente
```

---

## Filtros Críticos por Organización Facturadora

Cuando se selecciona una organización facturadora, **todo** debe filtrarse por ella:

| Entidad | Propiedad de filtro | Dónde se aplica |
|---------|-------------------|-----------------|
| Categorías Impositivas | `cat_orgicodigoid` | ClienteFormController, FacturacionAutomaticaWizardController |
| Condiciones de Pago | `con_orgidcodigoid` | ClienteFormController, FacturacionAutomaticaWizardController |
| Tipos de Comprobante | `cbt_idOrganizacionFacturadora` | FacturacionAutomaticaWizardController |
| Listas de Precios | `mglp_idorganizacion` | ProductHelperController, ProductGridController |
| Contratos | `cnt_idcliente` (indirecto) | ContratoGridController |

---

## Checklist de Testing End-to-End

### Setup
- [ ] Existen al menos 2 organizaciones facturadoras en AdministratorSearch
- [ ] Cada org tiene categorías impositivas asociadas
- [ ] Cada org tiene condiciones de pago asociadas
- [ ] Existen productos con listas de precios para cada org
- [ ] Existen tipos de comprobante (Factura + Recibo) para cada org
- [ ] Existen formas de pago configuradas

### Circuito (por cada organización)
- [ ] **Info Contable:** Se puede crear/editar cliente contable
- [ ] **Info Contable:** Categorías filtran por org seleccionada
- [ ] **Info Contable:** Condiciones de pago filtran por org seleccionada
- [ ] **Contrato:** Se puede crear un contrato nuevo
- [ ] **Contrato:** El contrato aparece en la grilla después de guardar
- [ ] **Contrato:** Se pueden agregar ítems/servicios al contrato
- [ ] **Contrato:** Se puede activar el contrato (estado = 1)
- [ ] **Novedades:** "Contrato a Novedad" genera novedades exitosamente
- [ ] **Facturación:** El wizard de facturación muestra contratos a facturar
- [ ] **Facturación:** Se genera la factura correctamente
- [ ] **Factura:** La factura aparece en la grilla de comprobantes
- [ ] **Factura:** Se puede generar/descargar el PDF
- [ ] **Cuenta Corriente:** La factura aparece con saldo pendiente
- [ ] **Pago:** Se puede registrar un pago
- [ ] **Pago:** Se puede imputar el pago a la factura
- [ ] **Pago:** El saldo queda en $0 después del pago completo

### Debug con F12

| Qué verificar | Dónde | Qué buscar |
|---------------|-------|------------|
| Account de la org | Console | `validateAndSetupRecord - Account: <número>` |
| Filtros de categorías | Network | Request a `t_categorias_impositivas_fc` con `cat_orgicodigoid` |
| Filtros de condiciones | Network | Request a `t_condiciones_pago_fc` con `con_orgidcodigoid` |
| Creación de contrato | Network | POST a `/Rest/crm_contrato/` con response exitoso |
| Generación de novedades | Network | GET a `MG_ContratosGenerarNovedades` |
| Generación de facturas | Network | GET a `MG_LoteFacturasByFilters` |
| Registro de pago | Network | POST a `MG_RealizarPago` con `Error != '1'` |

---

## Script de Test Automático

En `scripts/billing-flow-test.js` hay un script que verifica automáticamente la configuración y el estado del circuito de facturación.

### Cómo usarlo

1. Abrir WebMG en el navegador y loguearse
2. Abrir la consola del navegador (F12 → Console)
3. Copiar y pegar el contenido de `scripts/billing-flow-test.js`
4. Ejecutar los comandos:

```javascript
// Verificación completa (solo lectura, no modifica datos)
BillingTest.runAll()

// Solo verificar que la configuración base existe
BillingTest.checkConfig()

// Verificar filtros por organización (reemplazar 1 con el ID de la org)
BillingTest.checkOrg(1)

// Verificar flujo completo de un cliente contable específico
BillingTest.checkCliente(123)

// Verificar modelos que tengan writeAllFields (solo los ya cargados en memoria)
BillingTest.checkWriteAllFields()
```

### Qué verifica

| Comando | Qué hace |
|---------|----------|
| `runAll()` | Orgs, categorías, condiciones, comprobantes, formas de pago, productos, listas, clientes, contratos |
| `checkConfig()` | Solo la configuración previa (orgs, categorías, condiciones, productos) |
| `checkOrg(id)` | Que los filtros por org funcionen correctamente en cada entidad |
| `checkCliente(id)` | Datos del cliente + contratos + comprobantes + cuenta corriente |
| `checkWriteAllFields()` | Modelos REST cargados que les falte `writeAllFields: true` |
