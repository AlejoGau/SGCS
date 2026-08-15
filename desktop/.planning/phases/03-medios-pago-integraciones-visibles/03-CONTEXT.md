# Phase 3: Medios de pago e integraciones visibles - Context

**Gathered:** 2026-04-08  
**Status:** Ready for planning

<domain>
## Phase Boundary

Agregar al pie de factura un bloque fijo de Mercado Pago, una integración configurable de Pago Fácil y restaurar la visibilidad de AFIP y otras integraciones en organización facturadora. No incluye todavía más medios de pago ni rediseño fiscal de AFIP.

</domain>

<decisions>
## Implementation Decisions

### Alcance funcional
- **D-01:** Mercado Pago se implementa como bloque fijo por organización.
- **D-02:** Pago Fácil se implementa como integración configurable por organización.
- **D-03:** El código de barras de Pago Fácil mezcla metadata fija organizacional y datos dinámicos del cliente/comprobante.

### Configuración
- **D-04:** La organización facturadora debe poder dar de alta la integración y abrir un formulario de configuración.
- **D-05:** Si la integración está activa, la factura muestra automáticamente el bloque correspondiente.
- **D-06:** Recuperar la visibilidad de AFIP y otras integraciones forma parte de la fase, no es un extra.

### Alcance técnico
- **D-07:** La fase debe aprovechar la base de footer dejada por Fase 2.
- **D-08:** No se implementan otros proveedores ni nuevos flujos contables fuera de la factura.

### the agent's Discretion
- Reusar `org_cmetadata`, una tabla de integración existente o un esquema mixto, siempre que el contrato de configuración quede claro.
- Elegir el punto exacto donde se compone el código de barras de Pago Fácil.

</decisions>

<specifics>
## Specific Ideas

- La parte fija de Pago Fácil puede incluir código cliente, hash o identificador institucional.
- La parte dinámica debe tomar datos como CUIT, factura u otros campos definidos por negocio.
- El pie debe quedar listo para que negocio vea un QR fijo de Mercado Pago y un código de barras condicionado a la integración activa.

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
- `softguard.workspace/apps/AdministratorSearch/app/controller/org_cmetadataFormController.js`
- `softguard.workspace/apps/AdministratorSearch/app/model/t_organizacion_fcModel.js`
- `database/_Desktop/StoredProcedures/MG_ContabilizarComprobante.sql`
- `database/_Desktop/StoredProcedures/m_comprobantes_cab_fcSearch.sql`
- `softguard.workspace/apps/WebMG/app/controller/FacturaPrintController.js`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- La pantalla de organización facturadora ya tiene selector `org_factelect` y botón de configuración.
- `MG_ContabilizarComprobante.sql` ya ramifica por `org_factelect`.

### Established Patterns
- `org_cmetadataFormController.js` ya orquesta formularios de configuración adicionales.
- No se encontraron referencias a `Pago Fácil` o `PagoFacil` en el repo relevado.

### Integration Points
- UI y controller de organización facturadora.
- Metadata/configuración de integración.
- Render de factura del pie creado en Fase 2.

</code_context>

<deferred>
## Deferred Ideas

- Más medios de pago además de Mercado Pago y Pago Fácil.
- Rediseño de integraciones fiscales más allá de recuperar visibilidad.

</deferred>

---
*Phase: 03-medios-pago-integraciones-visibles*  
*Context gathered: 2026-04-08*
