# Phase 1: Bonificación por contrato - Research

**Researched:** 2026-04-08  
**Domain:** Softguard contracts + billing stored procedures  
**Confidence:** MEDIUM

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- No usar producto negativo.
- V1 con una sola bonificación activa por contrato.
- Debe soportar monto o porcentaje.
- `fecha hasta` vacía significa permanente.
- La fase cubre contrato, cálculo y salida visible.

### the agent's Discretion
- Elegir campos dedicados vs metadata.
- Elegir cómo se visualiza el descuento en la factura.

### Deferred Ideas (OUT OF SCOPE)
- Múltiples bonificaciones simultáneas.
- Reglas promocionales fuera del contrato.

</user_constraints>

<research_summary>
## Summary

El repo ya tiene anclas claras para contrato y facturación, pero no presenta soporte explícito a bonificaciones. El cálculo de facturación identificado en `database/_Desktop/StoredProcedures/MG_ContratoAFactura.sql` sigue un esquema `Price * Quantity`, lo que confirma que la bonificación contractual debe agregarse como lógica nueva y no como simple reutilización de un mecanismo existente.

La recomendación es resolver primero el contrato funcional y la fuente de verdad del descuento, y recién después tocar el stored procedure y el dataset de impresión. Si se intenta modelar esto solo desde UI, el cambio quedaría inconsistente con la generación real de comprobantes.

**Primary recommendation:** modelar la bonificación a nivel contrato y aplicar el descuento en el flujo SQL de facturación, dejando la impresión como consumo de esa salida ya calculada.
</research_summary>

<architecture_patterns>
## Existing Repo Findings

### Contrato
- `softguard.workspace/packages/local/common/src/view/ContratoFormView.js` y `.../ContratoFormController.js` son el punto natural para cargar la bonificación.
- `ContratoItemModel.js` solo refleja `Price`, `Quantity`, `VAT`, `ProductId`, `idlista`; no existe shape visible para bonificación.

### Cálculo
- `database/_Desktop/StoredProcedures/MG_ContratoAFactura.sql` es el anchor principal del cálculo actual.
- No se encontraron referencias a "bonificación" o "bonif" en `softguard.workspace` ni `database`.

### Impresión
- `softguard.workspace/apps/WebMG/app/controller/FacturaPrintController.js` delega al handler `/handler/ComprobantePdfMG`, por lo que la salida visible dependerá del dataset que alimente ese PDF.

### Anti-Patterns to Avoid
- Resolver la bonificación solo como texto en la factura sin impactar el cálculo.
- Simular el descuento duplicando ítems manualmente en el contrato.
- Guardar una regla sin criterio claro de vigencia.

</architecture_patterns>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Descuento visible pero no contable
**What goes wrong:** la factura muestra una leyenda, pero el total no cambia.  
**How to avoid:** el descuento debe existir en el cálculo fuente antes de llegar a impresión.

### Pitfall 2: Vigencia ambigua
**What goes wrong:** una bonificación vencida sigue aplicándose o una permanente deja de aplicarse.  
**How to avoid:** dejar una sola regla explícita: `fecha hasta null => permanente`.

### Pitfall 3: Persistencia opaca
**What goes wrong:** se guarda en metadata sin contrato BA de lectura/escritura.  
**How to avoid:** documentar en el plan cómo se guarda y cómo la consume SQL.

</common_pitfalls>

<open_questions>
## Open Questions

1. **¿Campos dedicados o metadata?**
   - What we know: `cnt_metadata` existe en SQL del contrato.
   - What's unclear: si conviene usarla para una regla financiera o si es mejor sumar campos explícitos.
   - Recommendation: cerrar esto en 01-01 antes de tocar implementación.

2. **¿Cómo exponer la bonificación en impresión?**
   - What we know: la impresión pasa por `ComprobantePdfMG`.
   - What's unclear: si el PDF espera una línea separada o consume solo totales.
   - Recommendation: revisar el dataset/handler durante 01-02 y fijar output observable en 01-03.

</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `softguard.workspace/packages/local/common/src/view/ContratoFormView.js`
- `softguard.workspace/packages/local/common/src/controller/ContratoFormController.js`
- `softguard.workspace/packages/local/common/src/controller/ContratoItemFormController.js`
- `softguard.workspace/packages/local/common/src/model/ContratoItemModel.js`
- `database/_Desktop/StoredProcedures/MG_ContratoAFactura.sql`
- `softguard.workspace/apps/WebMG/app/controller/FacturaPrintController.js`

### Secondary (MEDIUM confidence)
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`

</sources>

---
*Phase: 01-bonificacion-contrato*  
*Research completed: 2026-04-08*  
*Ready for planning: yes*
