# Phase 7: Facturador dinámico por cantidad automática - Context

**Gathered:** 2026-04-08  
**Status:** Ready for planning

<domain>
## Phase Boundary

Introducir una arquitectura de cantidad automática para productos/servicios facturables, implementando en v1 solo la fuente `Cuentas`. La fase cubre análisis BA, configuración del producto, UX del ítem de contrato, cálculo de factura y regresión. No incluye todavía SmartPanics, VigiControl o TrackGuard como fuentes productivas.

</domain>

<decisions>
## Implementation Decisions

### Modelo funcional
- **D-01:** La cantidad automática se define en el producto/servicio y no directamente en el contrato.
- **D-02:** V1 implementa solo la fuente `Cuentas`.
- **D-03:** La cantidad debe resolverse desde las cuentas asociadas al contrato, no desde todas las cuentas del cliente.

### UX
- **D-04:** Si el producto tiene cantidad automática, el ítem de contrato no debe permitir editar manualmente `Quantity`.
- **D-05:** El usuario debe poder identificar claramente que la cantidad viene de una fuente automática.

### Cálculo
- **D-06:** La lógica actual de precio/lista (`cnt_dinamico`, `idlista`) debe mantenerse.
- **D-07:** La cantidad automática se suma como capa nueva sobre la lógica actual de precio.

### the agent's Discretion
- Elegir el shape exacto de campos del producto para `enabled + source`.
- Definir si cantidad cero produce línea en cero o exclusión, siempre que BA lo cierre primero.

</decisions>

<specifics>
## Specific Ideas

- Caso v1: un servicio “abono por cuenta” debe facturar tantas unidades como cuentas tenga el contrato asociado.
- Si el contrato pasa de 4 a 10 cuentas, la siguiente facturación debe tomar 10 sin edición manual.
- La intención futura es reutilizar el patrón para SmartPanics, VigiControl y variantes por tipo de cuenta.

</specifics>

<canonical_refs>
## Canonical References

### Producto y decisiones
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`
- `.planning/BACKLOG-JIRA.md`

### Código existente relevante
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

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ContratoCuentaGridController.js` y el propio `ContratoFormController.js` ya muestran relaciones por `crm_contrato:RelationParent`.
- `crm_contratoModel.js` ya contiene `cnt_dinamico` como selector de comportamiento de precios.

### Established Patterns
- `ContratoItemFormView.js` y `ContratoItemFormController.js` hoy trabajan con `Quantity` editable.
- `MG_ContratoAFactura.sql` usa `Quantity` manual y, si `cnt_dinamico = 1`, cambia el precio por lista, no la cantidad.
- `ProductModel.js` no muestra actualmente un contrato visible de cantidad automática.

### Integration Points
- Modelo y formulario de producto.
- UX del ítem de contrato.
- Cálculo de facturación en SQL.
- Cuentas asociadas al contrato.

</code_context>

<deferred>
## Deferred Ideas

- Nuevas fuentes automáticas además de `Cuentas`.
- Diferenciación automática por tipo de cuenta o servicio más allá del patrón base.

</deferred>

---
*Phase: 07-facturador-dinamico-cantidad-automatica*  
*Context gathered: 2026-04-08*
