# Phase 7: Facturador dinámico por cantidad automática - Research

**Researched:** 2026-04-08  
**Domain:** Products + contract items + SQL billing  
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- La cantidad automática se define en el producto.
- V1 implementa solo `Cuentas`.
- La cantidad sale de cuentas asociadas al contrato.
- `Quantity` manual se bloquea cuando aplica cantidad automática.
- `cnt_dinamico`/listas de precio deben seguir funcionando.

### the agent's Discretion
- Shape exacto de los campos en producto.
- Comportamiento final para cantidad cero, una vez cerrado BA.

### Deferred Ideas (OUT OF SCOPE)
- Nuevas fuentes además de `Cuentas`.
- Variantes por tipo de cuenta en esta misma fase.

</user_constraints>

<research_summary>
## Summary

La estructura actual del repo confirma exactamente el problema descrito por negocio. `database/_Desktop/StoredProcedures/MG_ContratoAFactura.sql` calcula el comprobante usando `it.Quantity` y, si `con.cnt_dinamico = 1`, solo cambia el precio por lista con `mglpd.mglpd_valor`; no existe ninguna resolución dinámica de cantidad. A la vez, el contrato ya tiene relaciones explícitas a cuentas mediante `crm_contrato:RelationParent`, por lo que el dato fuente para la cantidad automática ya existe a nivel contrato.

En UI, `ContratoItemFormView.js` y `ContratoItemFormController.js` exponen `Quantity` editable. En productos, `ProductModel.js` no muestra campos de auto quantity, por lo que la arquitectura requerida debe añadirse desde el catálogo hasta el cálculo SQL.

**Primary recommendation:** agregar configuración de auto quantity al producto, bloquear `Quantity` manual en el ítem de contrato cuando aplique y resolver la cantidad en SQL desde las cuentas asociadas al contrato, sin tocar la lógica actual de listas de precio salvo para combinarla con la nueva cantidad.
</research_summary>

<architecture_patterns>
## Existing Repo Findings

### Producto
- `ProductModel.js` es el lugar natural para nuevos campos.
- `ProductFormView.js` es el anchor de UI para habilitar cantidad automática y fuente.

### Contrato e ítems
- `crm_contratoModel.js` y `ContratoFormView.js` ya manejan `cnt_dinamico`.
- `ContratoItemModel.js` expone `Quantity` e `idlista`.
- `ContratoItemFormController.js` y `ContratoItemFormView.js` manejan el flujo actual de edición manual.

### Relaciones al contrato
- `ContratoCuentaGridController.js` filtra por `crm_contrato:RelationParent`.
- `ContratoFormController.js` también referencia esa relación en varios puntos, confirmando que las cuentas son assets del contrato.

### Anti-Patterns to Avoid
- Mezclar cantidad automática con el flag actual `cnt_dinamico`, que hoy significa otra cosa.
- Calcular la cantidad en cliente/UI y no en la fuente real de facturación.
- Hacer depender la cantidad de cuentas del cliente completo en vez del contrato.

</architecture_patterns>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Duplicar conceptos de dinamismo
**What goes wrong:** `cnt_dinamico` termina significando precio y cantidad al mismo tiempo.  
**How to avoid:** mantener precio dinámico y cantidad automática como capas separadas.

### Pitfall 2: UX inconsistente
**What goes wrong:** el producto es automático pero el formulario sigue dejando editar `Quantity`.  
**How to avoid:** bloquear u ocultar el campo en el ítem de contrato cuando el producto lo exige.

### Pitfall 3: Fuente equivocada
**What goes wrong:** la facturación toma cuentas del cliente y no las asociadas al contrato concreto.  
**How to avoid:** basar el conteo en `crm_contrato:RelationParent`.

</common_pitfalls>

<open_questions>
## Open Questions

1. **¿Qué hacer con cantidad cero?**
   - What we know: negocio quiere el conteo real del contrato.
   - What's unclear: si una fuente vacía produce línea en cero, línea omitida o warning.
   - Recommendation: cerrar en 07-01 antes de tocar SQL.

2. **¿Cómo se nombra y presenta la fuente automática en UI?**
   - What we know: debe ser extensible y arrancar por `Cuentas`.
   - What's unclear: si se usa combo técnico o catálogo más amigable.
   - Recommendation: decidirlo en 07-01 y reflejarlo en `ProductFormView`.

</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `softguard.workspace/packages/local/common/src/model/ProductModel.js`
- `softguard.workspace/apps/SgWebCrm/app/view/ProductFormView.js`
- `softguard.workspace/packages/local/common/src/model/crm_contratoModel.js`
- `softguard.workspace/packages/local/common/src/view/ContratoFormView.js`
- `softguard.workspace/packages/local/common/src/controller/ContratoFormController.js`
- `softguard.workspace/packages/local/common/src/view/ContratoItemFormView.js`
- `softguard.workspace/packages/local/common/src/controller/ContratoItemFormController.js`
- `softguard.workspace/packages/local/common/src/model/ContratoItemModel.js`
- `softguard.workspace/packages/local/common/src/controller/ContratoCuentaGridController.js`
- `database/_Desktop/StoredProcedures/MG_ContratoAFactura.sql`

### Secondary (MEDIUM confidence)
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`

</sources>

---
*Phase: 07-facturador-dinamico-cantidad-automatica*  
*Research completed: 2026-04-08*  
*Ready for planning: yes*
