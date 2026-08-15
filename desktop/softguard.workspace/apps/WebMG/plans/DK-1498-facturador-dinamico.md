# DK-1498 — Facturador Dinámico por Cantidad Automática

## Épica
**DK-1498** — MGF - Facturador dinámico por cantidad automática

## Tareas
- DK-1518 (BA) — Definir reglas de cantidad automática ✅
- DK-1519 (DEV) — Agregar configuración de cantidad automática en producto
- DK-1520 (DEV) — Implementar facturación dinámica por cuentas
- DK-1521 (QA) — Validar facturador dinámico

## ⚠️ DATO CLAVE: cnt_dinamico HOY

El campo `cnt_dinamico` en `crm_contrato` **ya existe pero significa otra cosa:**

```sql
-- MG_ContratoAFactura.sql (línea clave):
CASE con.cnt_dinamico WHEN 1 THEN mglpd.mglpd_valor ELSE it.Price END * it.Quantity
```

**Significado actual:**
- `cnt_dinamico = 0` → Precio fijo del item de contrato (`it.Price`)
- `cnt_dinamico = 1` → Precio de lista de precios (`mglpd.mglpd_valor` de MG_listas_precios_detalle)

**La cantidad (`it.Quantity`) siempre es fija.** No hay cálculo dinámico de cantidad.

## Propuesta: Extender cnt_dinamico

| Valor | Significado | Precio | Cantidad |
|-------|-------------|--------|----------|
| 0 | Fijo (actual) | `it.Price` | `it.Quantity` (fija) |
| 1 | Precio de lista (actual) | `mglpd.mglpd_valor` | `it.Quantity` (fija) |
| 2 | Cantidad por cuentas activas (**NUEVO**) | `it.Price` o lista | COUNT cuentas activas |
| 3 | Cantidad por cuentas del contrato (**NUEVO**) | `it.Price` o lista | COUNT cuentas vinculadas |

### Alternativa: campo separado

En vez de sobrecargar `cnt_dinamico`, agregar campo `cnt_cantidad_auto` (INT):
- 0 = deshabilitado (default)
- 1 = por cuentas activas del cliente
- 2 = por cuentas vinculadas al contrato

**Recomendación:** campo separado, porque `cnt_dinamico` ya tiene semántica establecida de "tipo de precio". Mezclar precio dinámico y cantidad dinámica en el mismo campo genera confusión.

## Cálculo de cuentas activas

Para `cnt_cantidad_auto = 1`:
```sql
-- Contar cuentas activas del cliente
SELECT COUNT(*) 
FROM _Datos..Organization 
WHERE Account = @cnt_idcliente 
    AND Status IN (7, 8, 9)  -- estados activos
```

Para `cnt_cantidad_auto = 2` (por cuentas del contrato):
```sql
-- Contar cuentas vinculadas al contrato
-- Referencia: ContratoCuentaGridController.js existe en common
-- Verificar tabla de relación contrato-cuenta
SELECT COUNT(*) 
FROM _Datos..crm_contrato_cuenta  -- ← VERIFICAR si existe esta tabla
WHERE ccc_idcontrato = @IdContrato
```

> **⚠️ VERIFICAR:** El controller `ContratoCuentaGridController.js` y `ContratoCuentaGridView.js` existen en common. Hay que verificar qué tabla/endpoint usan para la relación contrato-cuenta.

## Cambios en SP MG_ContratoAFactura

Modificar la query principal para calcular cantidad:

```sql
-- ANTES:
SELECT ... it.Quantity as cbi_icantidad ...

-- DESPUÉS:
SELECT ...
    CASE 
        WHEN @cnt_cantidad_auto = 1 THEN 
            (SELECT COUNT(*) FROM _Datos..Organization 
             WHERE Account = cnt_idcliente AND Status IN (7,8,9))
        WHEN @cnt_cantidad_auto = 2 THEN 
            (SELECT COUNT(*) FROM _Datos..crm_contrato_cuenta 
             WHERE ccc_idcontrato = cnt_iid)
        ELSE it.Quantity 
    END as cbi_icantidad
...
```

### Validación: cantidad mínima

```sql
-- Si la cantidad calculada es 0, excluir del cursor
IF @calculatedQuantity = 0
BEGIN
    PRINT '[MG_ContratoAFactura] Contrato ' + CAST(@IdContrato AS VARCHAR) 
        + ' tiene 0 cuentas activas — se excluye de facturación'
    -- No crear comprobante, continuar con siguiente contrato
END
```

## Granularidad por producto (DK-1519)

Campo nuevo en `_Datos.dbo.Product`:

| Campo | Tipo | Valores |
|-------|------|---------|
| `pro_cantidad_auto` | INT | 0=No (default), 1=Por cuentas activas, 2=Por cuentas de contrato |

**Lógica:** Si un item de contrato referencia un producto con `pro_cantidad_auto > 0`, la cantidad se calcula dinámicamente PARA ESE ITEM, independientemente de `cnt_cantidad_auto` del contrato. Esto permite contratos mixtos (items fijos + dinámicos).

### Archivos a modificar para DK-1519:
- `common/src/model/TablasProductosModel.js` — agregar field `pro_cantidad_auto`
- `apps/WebMG/app/view/STProductosFormView.js` — agregar combo selector
- `apps/WebMG/app/controller/STProductosFormController.js` — lógica del combo
- Backend: ALTER TABLE Product ADD pro_cantidad_auto INT DEFAULT 0

## Impacto en UI (DK-1520)

### Contrato Form
- `ContratoFormView.js` — agregar combo "Tipo cantidad" (Fija / Por cuentas activas / Por cuentas de contrato)
- `ContratoFormController.js` — lógica del combo, deshabilitar Quantity si es dinámico
- Indicador visual en items: "Cantidad: automática (15 cuentas activas)"

### Wizard Facturación Automática
- `FacturacionAutomaticaWizardView.js` — mostrar en resumen (card-2) si facturación es fija o dinámica
- `FacturacionAutomaticaWizardController.js` — calcular y mostrar cantidad dinámica antes de facturar
- Alerta si contrato dinámico tiene 0 cuentas

### Grilla Facturación Automática
- `FacturacionAutomaticaGridView.js` — columna "Tipo cantidad" y "Cuentas"

## Ejemplo de facturación

```
Contrato #1234 — Empresa ABC SA
  cnt_cantidad_auto: 1 (cuentas activas)
  Cuentas activas del cliente: 15

  Item 1: "Monitoreo de alarma" (pro_cantidad_auto=1)
    Price: $500.00
    Quantity contrato: 1 ← IGNORADO
    Quantity calculada: 15 ← cuentas activas
    Subtotal: 15 × $500 = $7,500.00

  Item 2: "Soporte técnico mensual" (pro_cantidad_auto=0)
    Price: $2,000.00
    Quantity: 1 ← fija
    Subtotal: 1 × $2,000 = $2,000.00

  TOTAL comprobante: $9,500.00 + IVA
```

## Snapshot / Auditoría

La cantidad calculada se persiste implícitamente en `cbi_icantidad` del comprobante generado. Si el cliente agrega cuentas después, no afecta facturas ya emitidas.

Para auditoría adicional, considerar agregar un campo `cbi_cantidad_origen` (ej: "auto:15" o "fijo:1") al item del comprobante.

## Riesgos
- **Performance:** Si un cliente tiene cientos de cuentas y hay facturación masiva, el subquery de COUNT puede ser costoso. Considerar precálculo o cache.
- **Tabla contrato-cuenta:** Verificar si `crm_contrato_cuenta` existe. Si no, el tipo 2 (por cuentas de contrato) requiere crear la tabla.
- **Retrocompatibilidad:** Todos los contratos actuales tienen `cnt_cantidad_auto = 0` (default), el comportamiento actual no cambia.

## Criterios de Aceptación
1. La facturación dinámica calcula cantidad correcta por cuentas activas
2. Items con pro_cantidad_auto=0 mantienen cantidad fija
3. Contratos mixtos (fijos + dinámicos) funcionan correctamente
4. Contrato con 0 cuentas genera alerta y se excluye
5. La cantidad calculada se persiste en el comprobante
6. El wizard muestra la cantidad calculada antes de confirmar
