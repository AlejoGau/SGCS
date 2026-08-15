# Phase 1: Bonificación por contrato - Context

**Gathered:** 2026-04-08  
**Status:** Ready for planning

<domain>
## Phase Boundary

Agregar bonificación contractual operativa para reemplazar el intento fallido de producto negativo. La fase cubre definición BA, persistencia, UI de contrato, cálculo de factura y visibilidad del descuento en el comprobante. No incluye múltiples bonificaciones simultáneas ni promociones globales.

</domain>

<decisions>
## Implementation Decisions

### Modelo de descuento
- **D-01:** Se descarta el uso de producto con precio negativo.
- **D-02:** V1 modela una sola bonificación activa por contrato.
- **D-03:** La bonificación debe soportar `monto` o `porcentaje`; el tope `hasta 90` se mantiene como supuesto hasta cierre BA.

### Vigencia y representación
- **D-04:** `fecha hasta` vacía significa bonificación permanente.
- **D-05:** El contrato debe guardar descripción, valor y vigencia.
- **D-06:** La factura debe mostrar el descuento aplicado de forma visible, no solo como metadata interna.

### Alcance técnico
- **D-07:** La fase debe cubrir contrato, motor de facturación y salida impresa.
- **D-08:** No se rediseña la lógica de lista de precios; solo se agrega la capa de bonificación contractual.

### the agent's Discretion
- Persistencia en campos dedicados o metadata, siempre que quede justificada en research y sea trazable.
- Forma exacta de la línea/leyenda de descuento en el comprobante, mientras sea observable y testeable.

</decisions>

<specifics>
## Specific Ideas

- Ejemplo esperado: contrato con bonificación `Hola cliente, bonificación comercial abril`, porcentaje 10, vencimiento opcional.
- Si la bonificación venció antes de la corrida, no debe alterar el comprobante.
- Si la bonificación es permanente, debe seguir aplicando sin intervención manual.

</specifics>

<canonical_refs>
## Canonical References

### Producto y definición funcional
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md` - conversación base y decisiones de negocio.
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md` - supuestos y decisiones cerradas.
- `.planning/BACKLOG-JIRA.md` - mapping con tareas BA/DEV/QA.

### Código existente relevante
- `softguard.workspace/packages/local/common/src/view/ContratoFormView.js` - UI base de contrato.
- `softguard.workspace/packages/local/common/src/controller/ContratoFormController.js` - comportamiento del formulario de contrato.
- `softguard.workspace/packages/local/common/src/controller/ContratoItemFormController.js` - manejo actual de ítems del contrato.
- `softguard.workspace/packages/local/common/src/model/ContratoItemModel.js` - shape actual de los ítems facturables.
- `database/_Desktop/StoredProcedures/MG_ContratoAFactura.sql` - cálculo actual de facturación por `Price * Quantity`.
- `softguard.workspace/apps/WebMG/app/controller/FacturaPrintController.js` - entrada al PDF del comprobante.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ContratoFormView` y `ContratoFormController` ya concentran la edición de contrato.
- `FacturaPrintController` ya resuelve la impresión del comprobante final.

### Established Patterns
- La facturación actual calcula desde stored procedures, no desde lógica cliente.
- No se encontraron referencias actuales a bonificaciones en código ni SQL del repo (`git grep bonif` sin resultados).

### Integration Points
- Persistencia del contrato.
- Stored procedure `MG_ContratoAFactura.sql`.
- Dataset o render de impresión que exponga el descuento aplicado.

</code_context>

<deferred>
## Deferred Ideas

- Múltiples bonificaciones activas por contrato.
- Bonificaciones derivadas de campañas, listas o reglas automáticas fuera del contrato.

</deferred>

---
*Phase: 01-bonificacion-contrato*  
*Context gathered: 2026-04-08*
