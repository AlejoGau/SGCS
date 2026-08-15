---
status: partial
phase: 07-facturador-dinamico-cantidad-automatica
source: 07-01-PLAN.md, 07-02-PLAN.md, 07-03-PLAN.md, 07-04-PLAN.md
started: 2026-04-08T00:00:00-03:00
updated: 2026-04-08T00:00:00-03:00
---

## Current Test

[testing pending - preseeded from planning]

## Tests

### 1. Producto con cantidad automática
expected: El producto puede declararse con cantidad automática y fuente `Cuentas`
result: pending

### 2. Ítem de contrato sin edición manual
expected: El ítem del contrato bloquea `Quantity` cuando el producto es automático
result: pending

### 3. Facturación por cuentas asociadas
expected: La cantidad facturada coincide con las cuentas asociadas al contrato
result: pending

### 4. Cambio posterior de cuentas
expected: Una modificación de cuentas impacta la siguiente facturación sin edición manual
result: pending

### 5. Caso cero cuentas
expected: El comportamiento con cero cuentas sigue la regla BA final y es consistente
result: pending

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps

- Ninguno todavía; archivo presembrado para futura ejecución UAT.
