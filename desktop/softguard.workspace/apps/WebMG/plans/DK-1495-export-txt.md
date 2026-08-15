# DK-1495 — Exportación TXT Mensual

## Épica
**DK-1495** — MGF - Exportación TXT mensual

## Tareas
- DK-1509 (BA) — Definir layout del TXT ✅
- DK-1510 (DEV) — Implementar reporte TXT mensual
- DK-1511 (QA) — Validar exportación TXT

## Objetivo
Generar un archivo TXT de exportación mensual de comprobantes para que los clientes importen en sus sistemas contables.

## Layout del TXT

### Convenciones
- Encoding: UTF-8 con BOM
- Delimitador: Pipe `|` (configurable en org_cmetadata)
- Fin de línea: CRLF
- Formato fecha: `YYYYMMDD`
- Formato numérico: punto decimal, sin separador de miles
- Nombre archivo: `MG_FACTURACION_{org_cnombre}_{YYYYMM}.txt`

### Registro Header (H)
```
H|{org_cnombre}|{org_cidentificacion}|{YYYYMM}|{fecha_generacion}|{cantidad_registros}
```

### Registro Detalle (D) — uno por comprobante
```
D|{tipo_cbte}|{punto_venta}|{numero}|{fecha}|{cuit_receptor}|{nombre_receptor}|{cat_iva}|{subtotal}|{iva}|{total}|{cae}|{vto_cae}|{condicion_pago}
```

### Registro Totales (T)
```
T|{cantidad_comprobantes}|{total_subtotal}|{total_iva}|{total_general}
```

## Query base

```sql
-- ⚠️ JOIN de condiciones de pago: con_ccodigo NO es único, OBLIGATORIO filtrar por org
SELECT
    cbt.cbt_cdescripcion,
    cbc.cbc_cprefijocbte,
    RIGHT('0000000000' + CAST(cbc.cbc_inumerocbte AS VARCHAR), 10) as numero,
    CONVERT(VARCHAR, cbc.cbc_dfecha, 112) as fecha,
    cli.cli_cidentificacion,
    cli.cli_cnombre,
    cli.cli_ccategoriaimpositiva,
    cbc.cbc_ysubtotal,
    cbc.cbc_ytotal - cbc.cbc_ysubtotal as iva,
    cbc.cbc_ytotal,
    cbc.cbc_ccae,
    CONVERT(VARCHAR, cbc.cbc_cvtocae, 112) as vto_cae,
    cp.con_cdescripcion
FROM _Datos..m_comprobantes_cab_fc cbc
INNER JOIN _Tablas..t_organizacion_fc org 
    ON cbc.cbc_iorganizacionfacturadora = org.org_icodigo_id
INNER JOIN _Datos..m_clientes_fc cli 
    ON cbc.cbc_icliente = cli.cli_icodigo_id
INNER JOIN _Tablas..t_comprobantes_fc cbt 
    ON cbc.cbc_ctipocbte = cbt.cbt_ccodigo 
    AND cbt.cbt_idOrganizacionFacturadora = org.org_icodigo_id
LEFT JOIN _Tablas..t_condiciones_pago_fc cp 
    ON cli.cli_ccondicionpago = cp.con_ccodigo 
    AND cp.con_orgidcodigoid = cli.cli_iOrganizacion  -- ⚠️ OBLIGATORIO
WHERE cbc.cbc_cestado = 1  -- solo activos
    AND cbc.cbc_iorganizacionfacturadora = @idOrganizacion
    AND LEFT(CONVERT(VARCHAR, cbc.cbc_dfecha, 112), 6) = @periodo  -- YYYYMM
    -- filtros opcionales:
    AND (@tipoCbte IS NULL OR cbc.cbc_ctipocbte = @tipoCbte)
    AND (@catIva IS NULL OR cli.cli_ccategoriaimpositiva = @catIva)
ORDER BY cbc.cbc_dfecha, cbc.cbc_inumerocbte
```

## Implementación (DK-1510)

### Backend
1. Crear SP `MG_ExportacionTxtMensual` con la query anterior + parámetros de filtro
2. Crear handler `/handler/ExportTxtMG` o reutilizar patrón de `RemoteCall_ComprobanteExport` (SP existente en el repo)
3. Generar TXT en memoria y retornar como descarga (Content-Disposition: attachment)

### Frontend
1. Crear `WebMG/app/view/ExportTxtView.js`:
   - Combo org facturadora (filtrado por usuario)
   - DateField mes/año (monthPicker)
   - Combo tipo comprobante (opcional, clearable)
   - Combo categoría impositiva (opcional, clearable)
   - Botón "Exportar"
2. Crear `WebMG/app/controller/ExportTxtController.js`:
   - initView: cargar combos
   - onExportClick: construir URL del handler con parámetros → window.open() para descarga
3. Agregar entrada en `MoneyGuardModuleStore.js` para el menú lateral

## Referencia
- SP existente `RemoteCall_ComprobanteExport` — evaluar si ya hace algo similar
- El patrón SearchObject puede servir para los combos de filtro

## Criterios de Aceptación
1. El TXT se genera con los 3 tipos de registro (H, D, T)
2. El total del footer coincide con la suma de los detalles
3. El JOIN de condiciones de pago usa con_orgidcodigoid
4. Los filtros opcionales funcionan correctamente
5. El archivo se descarga con el nombre correcto
