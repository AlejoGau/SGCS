# DK-1498 — Guía QA (Manual vs Por cuentas activas)

## Objetivo

Esta guía explica **qué significa cada modo** y **cómo probarlo bien** en WebMG, para que cualquier QA (incluido Thiago) pueda validar el comportamiento sin dudas.

---

## ¿Qué significa cada opción?

### 1) Manual

- La cantidad la define el usuario en el ítem del contrato.
- El campo **Cantidad** queda editable.
- No se muestra cartel de cálculo automático.
- Al facturar, se usa la cantidad cargada manualmente (si no hay lógica automática aplicando para ese caso).

### 2) Por cuentas activas

- La cantidad **no** la define el usuario: la calcula el sistema según cuentas activas del cliente.
- El campo **Cantidad** queda bloqueado (read-only).
- Se muestra mensaje indicando que la cantidad está afectada por cuentas activas.
- Al facturar, el comprobante debe salir con:
  - `cbi_icantidad = N` (donde `N` es cuentas activas del cliente)
  - **no** con el valor manual del ítem.

---

## Dónde se ve/configura

### Producto

- Campo: `pro_cantidad_auto`
- Opciones esperadas:
  - `0` = Manual
  - `1` = Por cuentas activas

### Contrato

- Campo: `cnt_cantidad_auto`
- También debe exponer opciones Manual / Por cuentas activas.

### Ítem de contrato

- Si el producto/contrato está en auto:
  - cantidad bloqueada
  - banner/mensaje de cantidad automática visible

---

## Plan de prueba manual (paso a paso)

### Caso 1 — Producto en Manual

1. Abrir formulario de producto.
2. Seleccionar `Manual`.
3. Crear/editar ítem del contrato con ese producto.

**Esperado:**
- Cantidad editable.
- Sin cartel de cantidad automática.

### Caso 2 — Producto en Por cuentas activas

1. Abrir formulario de producto.
2. Seleccionar `Por cuentas activas`.
3. Crear/editar ítem del contrato con ese producto.

**Esperado:**
- Cantidad bloqueada (read-only).
- Cartel visible indicando cálculo por cuentas activas.

### Caso 3 — Cambio dinámico Manual ↔ Auto

1. En un ítem abierto, cambiar producto manual por auto (y viceversa).

**Esperado:**
- Manual → Auto: se bloquea cantidad + aparece cartel.
- Auto → Manual: se habilita cantidad + se oculta cartel.

### Caso 4 — Wizard de Facturación (preview)

1. Abrir `Facturación > Novedades`.
2. Ejecutar búsqueda.
3. Revisar preview.

**Esperado:**
- Refleja contratos automáticos en los contadores:
  - `cantidadContratosAutomaticos`
  - `cantidadTotalCalculada`
  - `cantidadContratosSinCuentas`

### Caso 5 — Resultado final en comprobante (validación clave DK-1498)

1. Facturar con un cliente que tenga `N > 0` cuentas activas.
2. Revisar ítem del comprobante generado.

**Esperado (clave):**
- `cbi_icantidad == N` (cuentas activas)
- No debe usar la cantidad manual del ítem cuando corresponde modo automático.

### Caso 6 — Edge sin cuentas activas

1. Probar cliente sin cuentas activas (o forzar situación equivalente).

**Esperado:**
- Se mantiene lógica de modo auto (cantidad no editable).
- El mensaje puede quedar en fallback (sin número exacto), según datos disponibles.

---

## Criterio de aprobación QA (rápido)

Marcar DK-1498 como OK si se cumple todo:

- [ ] Producto y contrato muestran opciones Manual / Por cuentas activas.
- [ ] En ítem: Manual = editable, Auto = bloqueado + cartel.
- [ ] El wizard preview refleja contratos automáticos.
- [ ] En comprobante, `cbi_icantidad` coincide con cuentas activas del cliente.
- [ ] No hay regresión visible en el flujo de facturación.

---

## Importante para QA técnico

En este stack hay un comportamiento conocido en backend:

- Los `PUT` parciales pueden resetear campos numéricos omitidos.
- Para updates de `crm_contrato`, usar siempre **PUT completo** (objeto full payload).

Esto ya quedó reforzado en la automatización de DK-1498 para evitar falsos negativos/positivos durante pruebas.

---

## Mapa rápido de pruebas automatizadas relacionadas

- `dk1498-cantidad-dinamica.spec.ts` → comportamiento UI de Manual vs Auto.
- `dk1498-ui-real.spec.ts` → validaciones reales de UI/wizard (casos A..G).
- `dk1498-flujo-real.spec.ts` → E2E real contra backend (incluye comprobante final).

Si Thiago quiere, puede usar esta guía como checklist y después contrastar con esos specs cuando necesite evidencia técnica más profunda.
