# ARCHITECTURE.md — WebMG (MoneyGuard)

Sistema contable integrado dentro del workspace SoftGuard Desktop.
Arquitectura global del workspace: [../../ARCHITECTURE.md](../../ARCHITECTURE.md)

---

## Descripcion del Modulo

**WebMG** (MoneyGuard) es el modulo de **gestion contable y facturacion** de SoftGuard. Maneja el ciclo completo de facturacion: desde la configuracion de contratos y listas de precios, pasando por la emision de comprobantes, hasta el registro de pagos y la consulta de movimientos de cuenta corriente.

**Configuracion base:**
- Framework: ExtJS 7.3.1 (classic toolkit)
- Tema: theme-gray
- Namespace: `WebMG`
- Dependencias: `common`, `cuenta`, `tablas`, `font-awesome`, `ux`

---

## Estructura de Directorios

```
apps/WebMG/
├── app.json                    ← Configuracion del modulo
├── app.js                      ← Entry point (lanza WebMG.Application)
├── index.html
├── ARCHITECTURE.md             ← Este archivo
│
├── app/
│   ├── controller/             ← 116 controllers
│   ├── model/                  ← 189 modelos
│   ├── store/                  ← 56 stores
│   └── view/                   ← 21 vistas principales
│
├── overrides/                  ← Overrides de ExtJS especificos de WebMG
├── sass/                       ← Estilos SASS del modulo
└── resources/                  ← Assets estaticos
```

---

## Dominio Funcional

```
┌────────────────────────────────────────────────────────────────┐
│                          WebMG                                 │
├─────────────────┬──────────────────┬───────────────────────────┤
│   Comprobantes  │      Pagos       │   Maestro de Cuentas      │
│   (Facturas)    │                  │   (Plan contable)         │
├─────────────────┴──────────────────┴───────────────────────────┤
│   Contratos     │    Clientes      │   Listas de Precios       │
├─────────────────┴──────────────────┴───────────────────────────┤
│ Fact. Automatica│  Remesas/Export  │   Cuenta Corriente        │
└────────────────────────────────────────────────────────────────┘
```

---

## Entidades Principales y REST Endpoints

| Entidad | Modelo | Endpoint REST |
|---------|--------|---------------|
| Comprobante (cabecera) | `m_comprobantes_cab_fcModel` | `/Rest/m_comprobantes_cab_fc/` |
| Comprobante (items) | `m_comprobantes_item_fcModel` | `/Rest/m_comprobantes_item_fc/` |
| Pagos | `PagosModel` / `m_pagos_fcSearchModel` | `/Rest/m_pagos_fc/` |
| Maestro de cuentas | `mg_maestrocuentasModel` | `/Rest/Search/mg_maestrocuentas` |
| Informacion de pago | `MG_informacion_pagoModel` | `/Rest/MG_informacion_pago/` |
| Listas de precios | `mg_listas_preciosModel` | `/Rest/mg_listas_precios/` |
| Detalle lista precios | `mg_listas_precios_detalleModel` | `/Rest/mg_listas_precios_detalle/` |
| Productos/impuestos | `MG_product_impuestoModel` | `/Rest/MG_product_impuesto/` |
| Cuenta corriente | `MGCuentaCorrienteSearchModel` | `/Rest/Search/MGCuentaCorriente` |
| Movimientos cuenta | `MG_MovientosCuentasSearchModel` | `/Rest/Search/MG_MovientosCuentas` |
| Novedades facturacion | `m_novedades_facturacion_fcModel` | `/Rest/m_novedades_facturacion_fc/` |

---

## Controllers por Dominio

### Comprobantes (Facturas)

| Controller | Responsabilidad |
|-----------|-----------------|
| `ComprobanteFormController` | Alta/edicion de cabecera de comprobante |
| `ComprobanteGridController` | Listado y busqueda de comprobantes |
| `ComprobanteItemFormController` | Items de comprobante (lineas) |
| `ComprobanteItemGridController` | Grilla de items |
| `ComprobanteItemManualFormController` | Carga manual de items |
| `ComprobantesDePagoGridController` | Comprobantes de pago asociados |

### Facturacion Automatica

| Controller | Responsabilidad |
|-----------|-----------------|
| `FacturacionAutomaticaGridController` | Listado de facturas automaticas |
| `FacturacionAutomaticaWizardController` | Wizard de configuracion multistep |
| `FacturaPrintController` | Impresion/exportacion de facturas |

### Pagos

| Controller | Responsabilidad |
|-----------|-----------------|
| `PagoFormController` | Registro de pagos |
| `PagoGridController` | Listado de pagos |
| `mg_informacionPagoFormController` | Informacion de pago del cliente |

### Clientes y Cuentas

| Controller | Responsabilidad |
|-----------|-----------------|
| `ClienteFormController` | Datos del cliente/contratante |
| `MGClientFormController` | Vista MG del cliente |
| `MGClientHelperController` | Helper de carga de datos del cliente |
| `CuentaController` / `CuentaFormController` | Cuenta asociada |
| `MGCuentaController` | Vista MG de la cuenta |

### Contratos

| Controller | Responsabilidad |
|-----------|-----------------|
| `ContratoFormController` | Alta/edicion de contrato |
| `ContratoGridController` | Listado de contratos |
| `ContratoItemFormController` | Items/servicios del contrato |
| `ContratoCuentaGridController` | Cuentas asociadas al contrato |
| `ContratoTabPanelController` | Navegacion por pestanas del contrato |
| `ContratoTemplateFormController` | Plantillas de contrato |
| `ContratoTemplateGridController` | Listado de plantillas |

### Maestro de Cuentas (Plan Contable)

| Controller | Responsabilidad |
|-----------|-----------------|
| `mg_maestrocuentasFormController` | Alta/edicion de cuenta contable |
| `mg_maestrocuentasGridController` | Listado del plan de cuentas |
| `MG_MovientosCuentasController` | Movimientos y transacciones |

### Precios y Productos

| Controller | Responsabilidad |
|-----------|-----------------|
| `mg_listas_preciosGridController` | Listas de precios |

### Utilitarios y Admin

| Controller | Responsabilidad |
|-----------|-----------------|
| `OrganizationMGController` | Configuracion contable de la organizacion |
| `RemesaExportFormController` | Exportacion de remesas/lotes |
| `TaxonomyTreeController` | Arbol de taxonomia |
| `BitacoraController` | Log de auditoría |

---

## Vistas Principales

| Vista | Tipo | Descripcion |
|-------|------|-------------|
| `MetadataViewport` | Viewport | Contenedor principal, UI generada por metadatos |
| `WebMGView` | Panel | Layout border principal del modulo |
| `WebMGNorthView` | Toolbar | Barra de herramientas superior |
| `mg_maestrocuentasGridView` | Grid | Plan de cuentas |
| `mg_maestrocuentasFormView` | Form | Alta/edicion cuenta contable |
| `ComprobantesDePagoGridView` | Grid | Comprobantes de pago |
| `FacturacionAutomaticaGridView` | Grid | Facturas automaticas |
| `FacturacionAutomaticaWizardView` | Wizard | Configuracion de facturacion automatica |
| `PagoGridView` | Grid | Listado de pagos |
| `PagoFormView` | Form | Registro de pago |
| `ClienteFormView` | Form | Datos del cliente |
| `ComprobanteItemManualFormView` | Form | Carga manual de items |
| `mg_informacionPagoFormView` | Form | Info de pago del cliente |
| `FacturaPrintView` | Panel | Vista de impresion de factura |
| `RemesaExportFormView` | Form | Exportacion de remesas |
| `OrganizationMGView` | Form | Config contable de organizacion |
| `CuentaCorrientePanelView` | Panel | Resumen de cuenta corriente |
| `ContratoTemplateGridView` | Grid | Plantillas de contratos |
| `STProductosGridView` | Grid | Productos |
| `ExtUxNotification` | Component | Notificaciones toast |

---

## Flujos de Negocio Clave

### Flujo de Facturacion

```
1. Cliente existe en el sistema (ClienteFormController)
2. Contrato activo asociado al cliente (ContratoFormController)
   └─ Items de contrato definen servicios y precios
3. Facturacion automatica genera Comprobantes periodicamente
   └─ FacturacionAutomaticaWizardController configura el proceso
4. Comprobante generado: cabecera + items
   └─ m_comprobantes_cab_fc + m_comprobantes_item_fc
5. Cliente realiza Pago
   └─ PagoFormController registra el pago
   └─ ComprobantesDePagoGridController vincula pago con comprobante
6. Movimiento registrado en Cuenta Corriente
   └─ MG_MovientosCuentasController
```

### Flujo de Alta de Cliente

```
ClienteFormController
  ├─ Datos personales/empresa
  ├─ Informacion de pago (mg_informacionPagoFormController)
  │   └─ Condiciones de pago, forma de pago
  └─ Cuenta corriente inicializada
```

---

## Patrones de Implementacion

### Patron Form/Grid (par tipico)

La mayoria de entidades tienen un par de controllers:

```javascript
// GridController: carga, lista, abre form
Ext.define('WebMG.controller.ComprobanteGridController', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'comprobantegrid button[action=nuevo]': { click: this.onNuevo },
            'comprobantegrid': { itemdblclick: this.onEditar }
        });
    },
    onNuevo: function() { /* abre ComprobanteFormView con record phantom */ },
    onEditar: function(grid, record) { /* abre ComprobanteFormView con record */ }
});

// FormController: valida y guarda
Ext.define('WebMG.controller.ComprobanteFormController', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'comprobanteform button[action=guardar]': { click: this.onGuardar }
        });
    },
    onGuardar: function() {
        var form = ..., record = form.getRecord();
        // writeAllFields: true para garantizar envio completo
        record.getProxy().getWriter().setWriteAllFields(true);
        record.save({ success: ..., failure: ... });
    }
});
```

### Carga encadenada de datos relacionados

```javascript
// Patron comun: cargar entidad A, luego cargar entidades relacionadas B, C
onClienteLoad: function(record) {
    // 1. Cargar condiciones de pago del cliente
    condicionesStore.load({ params: { clienteId: record.get('Id') } });
    // 2. Cargar informacion de pago
    infoPagoStore.load({ params: { clienteId: record.get('Id') } });
}
```

### Escritura de todos los campos (critico)

```javascript
// Al guardar, siempre forzar escritura de todos los campos
// porque el backend requiere el objeto completo en PUT
record.getProxy().getWriter().setWriteAllFields(true);
```

---

## CSS y Assets Remotos

WebMG carga CSS adicional desde el servidor remoto (con cache-buster):

```
/css/desktop/FamFamFamCss.css      ← Iconos FamFamFam
/css/desktop/SoftguardCss.css      ← Estilos SoftGuard
/css/desktop/Desktop6Css.css       ← Estilos Desktop v6
/css/desktop/SgDesktopCss.css      ← Estilos SG Desktop
/css/desktop/UxNotificationCss.css ← Estilos notificaciones
/css/desktop/ClearbuttonCss.css    ← Estilos boton clear
/css/desktop/ObjectIconCss.css     ← Iconos de objetos
```

Estos se sirven desde el backend remoto y NO estan en el workspace.

---

## Deuda Tecnica Identificada

| Item | Descripcion | Prioridad |
|------|-------------|-----------|
| `CuentaHelperControllerBAK.js` | Archivo backup en produccion | Media |
| 116 controllers | Alta granularidad, evaluar consolidacion de controllers relacionados pequenos | Baja |
| CSS remotos hardcodeados | Los paths de CSS en app.json son fijos, sin variable de entorno | Baja |

---

## Diccionario de Datos

Tablas relevantes para MoneyGuard. Las relaciones son por convencion de nombre de columna — no hay foreign keys de SQL.

---

### 1. Organizaciones

#### `_Datos.dbo.Organization` — Organizacion principal (cliente/empresa)

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `Id` | int | PK |
| `Name` | varchar | Razon social |
| `Account` | int | FK → `m_clientes_fc.cli_icodigo_ID` |
| `Address`, `City`, `State`, `Country`, `Zip` | varchar | Domicilio |
| `Phone`, `Mobile`, `Email` | varchar | Contacto |
| `NationalTax`, `StateTax` | varchar | CUIT, ingresos brutos |
| `Status` | int | 0=activo |
| `ObjectTypeId` | int | 600 |

#### `_Tablas.dbo.t_Organizacion_fc` — Organizacion facturadora

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `org_icodigo_ID` | int | PK |
| `org_cnombre` | varchar | Nombre |
| `org_csymbol` | varchar | Simbolo de moneda (ej: "$", "USD") |
| `org_cidentificacion` | varchar | CUIT/RUT fiscal |
| `org_ccategoriaimpositiva` | char | FK → `t_categorias_impositivas_fc.cat_ccodigo` |
| `org_ccallefiscal`, `org_clocalidadfiscal`, `org_cprovinciafiscal` | varchar | Domicilio fiscal |
| `org_ctelefono`, `org_cmail` | varchar | Contacto |
| `org_factelect` | char | Habilita factura electronica |
| `org_organizacionId` | int | FK → `_Datos.Organization.Id` |

---

### 2. Clientes

#### `_Datos.dbo.m_clientes_fc` — Campos de facturacion del cliente

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `cli_icodigo_ID` | int | PK |
| `cli_cnombre` | varchar | Nombre / razon social |
| `cli_cidentificacion` | varchar | CUIT, DNI u otro identificador fiscal |
| `cli_ccategoriaimpositiva` | char | FK → `t_categorias_impositivas_fc.cat_ccodigo` |
| `cli_iOrganizacion` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |
| `cli_ccondicionpago` | char | FK → `t_condiciones_pago_fc.con_ccodigo` (**siempre combinar con cli_iOrganizacion**) |
| `cli_ivendedor` | int | Vendedor asignado |
| `cli_icobrador` | int | Cobrador asignado |
| `cli_czona` | char | Zona de cobranza |
| `cli_dproximafactura` | datetime | Fecha proxima factura automatica |
| `cli_cformatoimpresion` | char | Formato de impresion de factura |
| `cli_mgmcidkey` | int | FK → `MG_MaestroCuentas.mgmc_idkey` (cuenta contable del cliente) |
| `cli_ccallefiscal`, `cli_clocalidadfiscal`, `cli_cprovinciafiscal` | varchar | Domicilio fiscal |
| `cli_inumero` | varchar | Numero de cliente |

**Relacion con Organization:** `_Datos.dbo.Organization.Account = cli_icodigo_ID`

**⚠️ JOIN critico — condiciones de pago:** `con_ccodigo` no es unico, se repite por org facturadora:
```sql
-- CORRECTO
LEFT JOIN _Tablas..t_condiciones_pago_fc cp
    ON cp.con_ccodigo = cli.cli_ccondicionpago
    AND cp.con_orgidcodigoid = cli.cli_iOrganizacion  -- OBLIGATORIO

-- INCORRECTO — puede devolver multiples filas
LEFT JOIN _Tablas..t_condiciones_pago_fc cp
    ON cp.con_ccodigo = cli.cli_ccondicionpago
```

#### `_Datos.dbo.MG_informacion_pago` — Metodos de pago del cliente (tarjeta, debito, etc.)

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `Id` | int | PK |
| `mip_idcliente` | int | FK → `Organization.Id` |
| `mip_fpgidkey` | int | FK → `t_formas_pago_fc.fpg_idkey` |
| `mip_codigo` | varchar | Numero de tarjeta / codigo de pago |
| `mip_nombreusuario` | varchar | Nombre en la tarjeta / usuario |
| `mip_clave` | varchar | CVV u codigo de validacion |
| `mip_emisor` | int | FK → `MG_MaestroCuentas.mgmc_idkey` (cuenta del medio de pago) |
| `mip_fechadesde`, `mip_fechahasta` | datetime | Vigencia |
| `ObjectTypeId` | int | 3221 |

---

### 3. Contratos

#### `_Datos.dbo.crm_contrato` — Contrato de servicio

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `cnt_iid` | int | PK |
| `cnt_idcliente` | int | FK → `Organization.Account` |
| `cnt_estado` | int | Estado (activo, vencido, etc.) |
| `cnt_fechaalta` | datetime | Fecha de alta |
| `cnt_fechavto` | datetime | Fecha de vencimiento |
| `cnt_formapago` | int | FK → `t_condiciones_pago_fc` |
| `cnt_org_fc` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |
| `cnt_tmp_id` | int | FK → plantilla de contrato |
| `cnt_dinamico` | int | 0=estatico (precio fijo), 1=dinamico (precio de lista) |
| `cnt_metadata` | varchar | Metadatos adicionales |
| `ObjectTypeId` | int | 3148 |

#### `_Datos.dbo.crm_contrato_item` — Items/servicios del contrato

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `Id` | int | PK |
| `idcontrato` | int | FK → `crm_contrato.cnt_iid` |
| `ProductId` | int | FK → `Product.Id` |
| `Price` | decimal | Precio unitario (override manual si contrato estatico) |
| `Quantity` | int | Cantidad |
| `VAT` | decimal | % de IVA |
| `Currency` | char | Codigo de moneda |
| `Status` | char | P=pendiente |
| `Description` | varchar | Descripcion del item |
| `Code` | varchar | Codigo del item |
| `idlista` | int | FK → `MG_listas_precios.mglp_idkey` (si contrato dinamico) |
| `QuantityDelivered` | decimal | Cantidad entregada |
| `ObjectTypeId` | int | 625 |

**⚠️ cnt_dinamico vs mglp_tipo:**
- `cnt_dinamico = 1` → contrato dinamico → precio tomado de lista (`idlista`)
- `cnt_dinamico = 0` → contrato estatico → precio fijo en `crm_contrato_item.Price`
- `mglp_tipo = 0` → lista dinamica (usa multiplicador); `mglp_tipo = 1` → lista estatica (precio fijo por producto)

#### `_Datos.dbo.mg_comprobantefacturacioncontrato` — Vinculo contrato ↔ comprobante generado

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `cfc_idkey` | int | PK |
| `cfc_cntiid` | int | FK → `crm_contrato.cnt_iid` |
| `cfc_cbcicodigoid` | int | FK → `m_comprobantes_cab_fc.cbc_icodigo_id` |
| `cfc_icliente` | int | FK → `Organization.Id` |
| `cfc_iorganizacionfacturadora` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |
| `cfc_userid` | int | Usuario que genero |
| `cfc_fecha` | datetime | Fecha de generacion |

---

### 4. Facturacion (Comprobantes)

#### `_Datos.dbo.m_comprobantes_cab_fc` — Cabecera de comprobante (factura, NC, ND, recibo)

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `cbc_icodigo_id` | int | PK |
| `cbc_icliente` | int | FK → `m_clientes_fc.cli_icodigo_id` |
| `cbc_dfecha` | datetime | Fecha del comprobante |
| `cbc_ctipocbte` | char | FK → `t_comprobantes_fc.cbt_ccodigo` |
| `cbc_cprefijocbte` | char | Prefijo/punto de venta |
| `cbc_inumerocbte` | int | Numero de comprobante |
| `cbc_ysubtotal` | decimal | Subtotal sin impuestos |
| `cbc_yimpuesto1` | decimal | IVA u otro impuesto 1 |
| `cbc_yimpuesto2` | decimal | Impuesto 2 |
| `cbc_yimpuesto3` | decimal | Impuesto 3 |
| `cbc_ytotal` | decimal | Total del comprobante |
| `cbc_cestado` | int | Estado (emitido, anulado, etc.) |
| `cbc_ccae` | varchar | Codigo CAE (AFIP) |
| `cbc_cvtocae` | datetime | Vencimiento CAE |
| `cbc_iorganizacionfacturadora` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |
| `cbc_iversion` | int | Version (default 1) |
| `ObjectTypeId` | int | 624 |

#### `_Datos.dbo.m_comprobantes_item_fc` — Items del comprobante

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `cbi_idkey` | int | PK |
| `cbi_icodigocab` | int | FK → `m_comprobantes_cab_fc.cbc_icodigo_id` |
| `cbi_iproducto` | int | FK → `Product.Id` |
| `cbi_cdescripcion` | varchar | Descripcion |
| `cbi_ccodigo` | varchar | Codigo del item |
| `cbi_icantidad` | decimal | Cantidad |
| `cbi_yimporte` | decimal | Importe unitario |
| `cbi_ndescuento` | decimal | % descuento |
| `cbi_cimpuestos` | varchar | Impuestos aplicados (codigos) |
| `cbi_irenglon` | int | Numero de renglon |
| `cbi_inovedad` | int | FK → `m_novedades_facturacion_fc.nfc_icodigo_id` |
| `cbi_inovedadTabla` | int | FK → `t_novedades_fc.nov_icodigo_id` |
| `ObjectTypeId` | int | 625 |

#### `_Datos.dbo.MG_comprobante_impuesto` — Impuestos calculados por comprobante

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `mci_idkey` | int | PK |
| `mci_cbcicodigoid` | int | FK → `m_comprobantes_cab_fc.cbc_icodigo_id` |
| `mci_impidkey` | int | FK → `t_impuestos_fc.imp_idkey` |
| `mci_baseimponible` | decimal | Base imponible |
| `mci_total` | decimal | Importe del impuesto |
| `mci_mgmidkey` | int | FK → `MG_MaestroCuentas.mgmc_idkey` (cuenta contable del impuesto) |

#### `_Datos.dbo.m_novedades_facturacion_fc` — Novedades de facturacion (items recurrentes/adicionales)

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `nfc_icodigo_id` | int | PK |
| `nfc_icliente` | int | FK → `m_clientes_fc.cli_icodigo_id` |
| `nfc_inovedad` | int | FK → `t_novedades_fc.nov_icodigo_id` |
| `nfc_nrecurrente` | int | 1=recurrente |
| `nfc_nestado` | int | Estado |
| `ObjectTypeId` | int | 3107 |

---

### 5. Pagos

#### `_Datos.dbo.m_pagos_fc` — Pagos recibidos

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `pag_icodigo_id` | int | PK |
| `pag_icodigocbte` | int | FK → `m_comprobantes_cab_fc.cbc_icodigo_id` (comprobante de pago) |
| `pag_yimporte` | decimal | Importe del pago |
| `pag_cformapago` | char | FK → `t_formas_pago_fc.fpg_ccodigo` |
| `pag_inumero` | varchar | Numero de cheque / referencia |
| `pag_cbanco` | int | Banco (cheque) |
| `pag_dvencimiento` | datetime | Vencimiento (cheque diferido) |
| `pag_cfirmante` | varchar | Firmante del cheque |
| `pag_icodigocaja` | int | Caja registradora |
| `ObjectTypeId` | int | 625 |

#### `_Datos.dbo.m_imputaciones_fc` — Imputaciones pago ↔ comprobante

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `imp_dfecha` | datetime | Fecha de imputacion |
| `imp_icodigocbtedbito` | int | FK → comprobante debito (factura) |
| `imp_ncuotadbito` | int | Cuota del debito |
| `imp_icodigocbtecredito` | int | FK → comprobante credito (recibo/pago) |
| `imp_ncuotacredito` | int | Cuota del credito |
| `imp_yimporteimputado` | decimal | Importe imputado |

---

### 6. Cuenta Corriente

#### `_Datos.dbo.m_cuenta_corriente_fc` — Registros de cuenta corriente (deuda por cuota)

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `cta_icodigocbte` | int | FK → `m_comprobantes_cab_fc.cbc_icodigo_id` |
| `cta_ncuota` | int | Numero de cuota |
| `cta_ytotal` | decimal | Total de la cuota |
| `cta_ysaldo` | decimal | Saldo pendiente |
| `cta_dvencimiento` | datetime | Fecha de vencimiento |
| `cta_dcobro` | datetime | Fecha de cobro efectivo |

---

### 7. Plan de Cuentas

#### `_Datos.dbo.MG_MaestroCuentas` — Plan de cuentas contable

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `mgmc_idkey` | int | PK |
| `mgmc_idorganizacion` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |
| `mgmc_ccodigo` | varchar | Codigo de cuenta (jerarquico) |
| `mgmc_descripcion` | varchar | Descripcion |
| `mgmc_ctipo` | char | Tipo: `C`=Cliente, `CASH`=Caja, `IMPD`=Impuesto debito, `PROV`=Proveedor |
| `mgmc_saldo` | decimal | Saldo actual |
| `mgmc_moncodigo` | char | FK → `t_monedas.mon_ccodigo` |
| `mgmc_capitulo`, `mgmc_rubro`, `mgmc_subrubro`, `mgmc_imputacion` | int | Jerarquia del plan |
| `mgmc_metadata` | varchar | Metadatos |
| `ObjectTypeId` | int | 3211 |

#### `_Datos.dbo.MG_MovimientosCuentas` — Asientos contables / movimientos

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `mgm_idkey` | int | PK |
| `mgm_idcuenta` | int | FK → `MG_MaestroCuentas.mgmc_idkey` |
| `mgm_idcomprobante` | int | FK → `m_comprobantes_cab_fc.cbc_icodigo_id` |
| `mgm_monto` | decimal | Monto del movimiento |
| `mgm_saldo` | decimal | Saldo post-movimiento |
| `mgm_fecha` | datetime | Fecha |
| `mgm_estado` | int | Estado |

---

### 8. Productos y Precios

#### `_Datos.dbo.Product` — Productos / servicios

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `Id` | int | PK |
| `Name` | varchar | Nombre del producto |
| `Code` | varchar | Codigo |
| `Price` | decimal | Precio base |
| `VAT` | decimal | % IVA por defecto |
| `pro_currency` | char | Moneda |

#### `_Datos.dbo.MG_listas_precios` — Listas de precios

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `mglp_idkey` | int | PK |
| `mglp_nombre` | varchar | Nombre de la lista |
| `mglp_tipo` | int | 0=dinamica (multiplicador sobre `Product.Price`), 1=estatica (precio por producto en detalle) |
| `mglp_multiplicador` | decimal | Factor multiplicador (solo si tipo=0) |
| `mglp_idorganizacion` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |
| `mglp_currency` | char | Moneda |
| `ObjectTypeId` | int | 600 |

#### `_Datos.dbo.MG_listas_precios_detalle` — Items de lista de precios estatica

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `mglpd_idkey` | int | PK |
| `mglpd_idlista` | int | FK → `MG_listas_precios.mglp_idkey` |
| `mglpd_idproducto` | int | FK → `Product.Id` |
| `mglpd_valor` | decimal | Precio override para este producto en esta lista |

#### `_Datos.dbo.MG_product_impuesto` — Relacion producto ↔ impuesto

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `Id` | int | PK |
| `mpi_idproduct` | int | FK → `Product.Id` |
| `mpi_impidkey` | int | FK → `t_impuestos_fc.imp_idkey` |
| `ObjectTypeId` | int | 3107 |

---

### 9. Catalogos (_Tablas)

#### `_Tablas.dbo.t_condiciones_pago_fc` — Condiciones de pago

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `con_idKey` | int | PK |
| `con_ccodigo` | char | Codigo — **NO es unico**, se repite por org facturadora |
| `con_cdescripcion` | varchar | Nombre visible (ej: "Efectivo", "30 dias") |
| `con_ncuotas` | numeric | Cantidad de cuotas |
| `con_idias` | smallint | Dias de vencimiento |
| `con_ifrecuencia` | smallint | Frecuencia de cobro |
| `con_orgidcodigoid` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |
| `con_cFormaPagoCobrAut` | char | FK → `t_formas_pago_fc.fpg_ccodigo` |
| `con_iRemesa` | int | FK → `t_remesas_fc.rem_icodigo_ID` |

#### `_Tablas.dbo.t_comprobantes_fc` — Tipos de comprobante por organizacion

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `cbt_idkey` | int | PK |
| `cbt_ccodigo` | char | Codigo (FK desde `cbc_ctipocbte`) |
| `cbt_ntipo` | int | Tipo numerico AFIP |
| `cbt_cletra` | char | Letra (A, B, C, X) |
| `cbt_cprefijo` | char | Punto de venta |
| `cbt_inumero` | int | Ultimo numero emitido |
| `cbt_cdescripcion` | varchar | Descripcion |
| `cbt_nCbteCAE` | int | Codigo AFIP para CAE |
| `cbt_idorganizacionfacturadora` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |

#### `_Tablas.dbo.t_impuestos_fc` — Tipos de impuesto

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `imp_idkey` | int | PK |
| `imp_cdescripcion` | varchar | Nombre (ej: IVA 21%) |
| `imp_nporcentaje` | decimal | Porcentaje |
| `imp_idorganizacion` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |
| `imp_mgmcidkey` | int | FK → `MG_MaestroCuentas` (cuenta debito) |
| `imp_mgmcidkeycredito` | int | FK → `MG_MaestroCuentas` (cuenta credito) |

#### `_Tablas.dbo.t_formas_pago_fc` — Formas de pago

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `fpg_idkey` | int | PK |
| `fpg_ccodigo` | char | Codigo |
| `fpg_cdescripcion` | varchar | Nombre (ej: Efectivo, Cheque, Tarjeta) |
| `fpg_mgmcidkey` | int | FK → `MG_MaestroCuentas` (cuenta contable asociada) |
| `fpg_orgidcodigoid` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |

#### `_Tablas.dbo.t_novedades_fc` — Tipos de novedad de facturacion

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `nov_icodigo_id` | int | PK |
| `nov_cdescripcion` | varchar | Descripcion |
| `nov_mimporte` | decimal | Importe base |
| `nov_cimpuesto1`, `nov_cimpuesto2`, `nov_cimpuesto3` | char | Impuestos aplicables |
| `nov_idproducto` | int | FK → `Product.Id` |

#### `_Tablas.dbo.t_categorias_impositivas_fc` — Categorias impositivas

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `cat_ccodigo` | char | PK / codigo (ej: RI, MO, EX) |
| `cat_cdescripcion` | varchar | Nombre (ej: Responsable Inscripto, Monotributo) |
| `cat_cbtidkey` | int | FK → tipo de comprobante por defecto |
| `cat_orgicodigoid` | int | FK → `t_Organizacion_fc.org_icodigo_ID` |

#### `_Tablas.dbo.t_monedas` — Monedas

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `mon_ccodigo` | char | PK / codigo (ej: ARS, USD) |
| `mon_csymbol` | varchar | Simbolo (ej: $, U$D) |

---

## Planes y Mejoras

> Agregar aqui decisiones tecnicas, features planeadas, o cambios de arquitectura para WebMG.
