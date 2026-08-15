# Phase 2: Pie de factura y observaciones dinámicas - Context

**Gathered:** 2026-04-08  
**Status:** Ready for planning

<domain>
## Phase Boundary

Extender la organización facturadora y la impresión de factura para soportar contenido fijo en markdown, adjuntos/imágenes embebidas y observaciones dinámicas con variables. Esta fase no incorpora todavía nuevos medios de pago; solo deja el pie de factura listo para consumirlos.

</domain>

<decisions>
## Implementation Decisions

### Contenido fijo
- **D-01:** El pie debe soportar contenido fijo configurable por organización facturadora.
- **D-02:** Ese contenido fijo debe admitir markdown y archivos/imágenes embebidas.
- **D-03:** Se reutilizará, si el código existente lo permite, el patrón multipart/base64 mencionado por negocio.

### Contenido dinámico
- **D-04:** Se agrega un nuevo template/campo de observaciones de factura.
- **D-05:** Las variables reemplazables salen de cliente, organización del cliente, contrato y comprobante.
- **D-06:** Debe existir una bolsa/catálogo de variables para no depender de texto libre sin contrato.

### Render
- **D-07:** El orden esperado del footer es observaciones dinámicas -> bloque fijo -> medios de pago.
- **D-08:** La fase debe dejar el pie preparado para que Fase 3 agregue Mercado Pago y Pago Fácil sin reordenar el render.

### the agent's Discretion
- Formato exacto del catálogo de variables.
- Forma exacta de representar adjuntos embebidos en metadata.

</decisions>

<specifics>
## Specific Ideas

- Ejemplo esperado: `Hola {nombreUsuario}, su contrato {contratoId} está por vencer {fechaVencimiento}`.
- El bloque fijo puede incluir instrucciones comerciales, branding e imágenes comunes.
- El pie debe ser reutilizable para PDF y cualquier salida que comparta el handler actual.

</specifics>

<canonical_refs>
## Canonical References

### Producto y decisiones
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`
- `.planning/BACKLOG-JIRA.md`

### Código existente relevante
- `softguard.workspace/apps/AdministratorSearch/app/view/MoneyGuardOrganizacionFormView.js`
- `softguard.workspace/apps/AdministratorSearch/app/controller/MoneyGuardOrganizacionFormController.js`
- `softguard.workspace/apps/AdministratorSearch/app/view/org_cmetadataFormView.js`
- `softguard.workspace/apps/AdministratorSearch/app/controller/org_cmetadataFormController.js`
- `database/_Desktop/StoredProcedures/m_comprobantes_cab_fcSearch.sql`
- `softguard.workspace/apps/WebMG/app/controller/FacturaPrintController.js`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `m_comprobantes_cab_fcSearch.sql` ya expone `orgfac_org_cmetadata`.
- `FacturaPrintController` ya centraliza la salida PDF.
- `org_cmetadata` ya existe como mecanismo de metadata para organización facturadora.

### Established Patterns
- La configuración adicional de organización facturadora hoy se canaliza por metadata/configuración.
- No hay evidencia actual de un motor específico de markdown en la capa relevada; debe definirse en implementación.

### Integration Points
- Formulario de organización facturadora.
- Metadata de organización.
- Dataset/handler de impresión.

</code_context>

<deferred>
## Deferred Ideas

- Nuevos medios de pago del pie (Fase 3).
- Templates avanzados con condicionales o lógica compleja.

</deferred>

---
*Phase: 02-pie-factura-observaciones-dinamicas*  
*Context gathered: 2026-04-08*
