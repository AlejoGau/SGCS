# DK-1493 — Configuración Fija y Dinámica de Factura

## Épica
**DK-1493** — MGF - Configuración fija y dinámica de factura

## Tareas
- DK-1502 (BA) — Definir contenido fijo y dinámico ✅
- DK-1503 (DEV) — Implementar configuración fija y observaciones dinámicas
- DK-1504 (QA) — Validar contenido fijo y dinámico

## Objetivo
Permitir que cada organización facturadora configure:
1. **Observaciones dinámicas** con variables interpoladas `{{variable}}` en el PDF de factura
2. **Footer fijo** (texto legal/informativo) en el pie de factura
3. **Logo embebido** en el header

## Almacenamiento

Campo existente: `org_cmetadata` (VARCHAR) en `_Tablas.dbo.t_organizacion_fc`.
Ya existe en el modelo Sencha (`t_organizacion_fcModel.js` y `t_organizacion_fcSearchModel.js`).
**No requiere migración de schema.**

### Estructura JSON propuesta

```json
{
  "factura": {
    "observaciones_template": "Servicio de {{cliente_servicio}} prestado a {{cliente_nombre}} durante {{periodo_facturacion}}.",
    "footer_fijo": "Los importes incluyen IVA.\nPago mediante transferencia bancaria a CBU indicado.",
    "logo_url": "/uploads/org/123/logo.png",
    "mostrar_qr_afip": true
  }
}
```

> **⚠️ RIESGO:** Si `org_cmetadata` ya tiene contenido en producción, hay que mergear el JSON existente con la nueva estructura, no pisar.

## Catálogo de Variables

### Emisor (t_organizacion_fc)

| Variable | Campo | Tabla |
|----------|-------|-------|
| `{{emisor_nombre}}` | `org_cnombre` | t_organizacion_fc |
| `{{emisor_cuit}}` | `org_cidentificacion` | t_organizacion_fc |
| `{{emisor_domicilio}}` | `org_ccallefiscal` | t_organizacion_fc |
| `{{emisor_localidad}}` | `org_clocalidadfiscal` | t_organizacion_fc |
| `{{emisor_provincia}}` | `org_cprovinciafiscal` | t_organizacion_fc |
| `{{emisor_cp}}` | `org_ccodigopostalfiscal` | t_organizacion_fc |
| `{{emisor_telefono}}` | `org_ctelefono` | t_organizacion_fc |
| `{{emisor_email}}` | `org_cmail` | t_organizacion_fc |
| `{{emisor_iva}}` | `org_ccategoriaimpositiva` | t_organizacion_fc |
| `{{emisor_simbolo}}` | `org_csymbol` | t_organizacion_fc |

### Cliente (m_clientes_fc)

| Variable | Campo | Tabla |
|----------|-------|-------|
| `{{cliente_nombre}}` | `cli_cnombre` | m_clientes_fc |
| `{{cliente_cuit}}` | `cli_cidentificacion` | m_clientes_fc |
| `{{cliente_iva}}` | `cli_ccategoriaimpositiva` | m_clientes_fc |
| `{{cliente_domicilio}}` | `cli_ccallefiscal` | m_clientes_fc |
| `{{cliente_localidad}}` | `cli_clocalidadfiscal` | m_clientes_fc |
| `{{cliente_provincia}}` | `cli_cprovinciafiscal` | m_clientes_fc |
| `{{cliente_cp}}` | `cli_ccodigopostalfiscal` | m_clientes_fc |
| `{{cliente_telefono}}` | `cli_ctelefono` | m_clientes_fc |
| `{{cliente_contacto}}` | `cli_ccontacto` | m_clientes_fc |
| `{{cliente_servicio}}` | `cli_cservicio` | m_clientes_fc |
| `{{cliente_observacion}}` | `cli_cobservacion` | m_clientes_fc |

### Comprobante (m_comprobantes_cab_fc + relacionadas)

| Variable | Campo | Tabla/Lógica |
|----------|-------|-------------|
| `{{comprobante_tipo}}` | `cbt_cdescripcion` | t_comprobantes_fc (via cbc_ctipocbte) |
| `{{comprobante_numero}}` | `cbc_cprefijocbte`-`cbc_inumerocbte` | Concatenado con padding |
| `{{comprobante_fecha}}` | `cbc_dfecha` | m_comprobantes_cab_fc |
| `{{comprobante_subtotal}}` | `cbc_ysubtotal` | m_comprobantes_cab_fc |
| `{{comprobante_total}}` | `cbc_ytotal` | m_comprobantes_cab_fc |
| `{{comprobante_cae}}` | `cbc_ccae` | m_comprobantes_cab_fc |
| `{{comprobante_vto_cae}}` | `cbc_cvtocae` | m_comprobantes_cab_fc |

### Calculadas

| Variable | Lógica |
|----------|--------|
| `{{periodo_facturacion}}` | Mes/año del comprobante (ej: "Abril 2026") |
| `{{fecha_actual}}` | Fecha de generación del PDF |
| `{{condicion_pago}}` | `con_cdescripcion` de t_condiciones_pago_fc (⚠️ JOIN con con_orgidcodigoid) |
| `{{cantidad_items}}` | COUNT de items del comprobante |

## Implementación (DK-1503)

### Paso 1 — Backend: Motor de interpolación en ComprobantePdfMG

Handler: `/handler/ComprobantePdfMG` (server-side .NET)

1. Al generar el PDF, cargar `org_cmetadata` de la org facturadora
2. Parsear como JSON, extraer `factura.observaciones_template` y `factura.footer_fijo`
3. Construir diccionario de variables con datos del comprobante, cliente y org:
   ```csharp
   var vars = new Dictionary<string, string> {
       {"emisor_nombre", org.org_cnombre},
       {"cliente_nombre", cli.cli_cnombre},
       {"comprobante_total", cbc.cbc_ytotal.ToString("N2")},
       // ... etc
   };
   ```
4. Regex replace `{{(\w+)}}` con el valor del diccionario (string vacío si no existe)
5. Renderizar en el PDF:
   - Observaciones: después de totales, antes del footer
   - Footer fijo: al pie de la factura

### Paso 2 — Frontend: UI de configuración

Archivos a modificar:
- `apps/AdministratorSearch/app/view/t_organizacion_fcFormView.js` — agregar fieldset "Configuración de Factura":
  - `textarea` para observaciones_template (con botón "Insertar Variable" que muestre combo con catálogo)
  - `textarea` para footer_fijo
  - `filefield` para logo (upload)
  - `checkbox` para mostrar_qr_afip
  - `button` "Preview" (abre ventana con render de ejemplo)
- `apps/AdministratorSearch/app/controller/t_organizacion_fcFormController.js` — lógica de guardado:
  - Al guardar, leer campos del fieldset → construir JSON → serializar en `org_cmetadata`
  - Al cargar, parsear `org_cmetadata` → popular los campos

### Paso 3 — Preview

Crear endpoint temporal o usar el mismo `ComprobantePdfMG` con parámetro `preview=true` que use datos de ejemplo en vez de un comprobante real.

## Query de datos para el handler

```sql
-- Obtener todos los datos para interpolación
SELECT 
    org.org_cnombre, org.org_cidentificacion, org.org_ccallefiscal,
    org.org_clocalidadfiscal, org.org_cprovinciafiscal, org.org_ccodigopostalfiscal,
    org.org_ctelefono, org.org_cmail, org.org_ccategoriaimpositiva,
    org.org_csymbol, org.org_cmetadata,
    cli.cli_cnombre, cli.cli_cidentificacion, cli.cli_ccategoriaimpositiva,
    cli.cli_ccallefiscal, cli.cli_clocalidadfiscal, cli.cli_cprovinciafiscal,
    cli.cli_ccodigopostalfiscal, cli.cli_ctelefono, cli.cli_ccontacto,
    cli.cli_cservicio, cli.cli_cobservacion,
    cbc.cbc_dfecha, cbc.cbc_cprefijocbte, cbc.cbc_inumerocbte,
    cbc.cbc_ysubtotal, cbc.cbc_ytotal, cbc.cbc_ccae, cbc.cbc_cvtocae,
    cbt.cbt_cdescripcion,
    cp.con_cdescripcion as condicion_pago
FROM _Datos..m_comprobantes_cab_fc cbc
INNER JOIN _Tablas..t_organizacion_fc org ON cbc.cbc_iorganizacionfacturadora = org.org_icodigo_id
INNER JOIN _Datos..m_clientes_fc cli ON cbc.cbc_icliente = cli.cli_icodigo_id
INNER JOIN _Tablas..t_comprobantes_fc cbt ON cbc.cbc_ctipocbte = cbt.cbt_ccodigo 
    AND cbt.cbt_idOrganizacionFacturadora = org.org_icodigo_id
LEFT JOIN _Tablas..t_condiciones_pago_fc cp ON cli.cli_ccondicionpago = cp.con_ccodigo 
    AND cp.con_orgidcodigoid = cli.cli_iOrganizacion  -- ⚠️ JOIN OBLIGATORIO
WHERE cbc.cbc_icodigo_id = @idComprobante
```

## Criterios de Aceptación
1. El PDF de factura muestra observaciones con variables resueltas
2. El PDF muestra footer fijo configurado por org
3. Variables sin valor se renderizan como string vacío (no se muestra el placeholder)
4. La UI de org facturadora permite editar template y footer
5. El preview muestra el render con datos de ejemplo
