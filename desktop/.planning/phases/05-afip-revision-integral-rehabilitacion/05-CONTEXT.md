# Phase 5: AFIP revisión integral y rehabilitación - Context

**Gathered:** 2026-04-08  
**Status:** Ready for planning

<domain>
## Phase Boundary

Revisar la integración AFIP existente de punta a punta, recuperar la visibilidad de su configuración y validar el flujo en homologación. La fase no busca rediseñar el modelo fiscal ni cambiar de proveedor; primero debe medir y rehabilitar lo que ya existe.

</domain>

<decisions>
## Implementation Decisions

### Estrategia
- **D-01:** AFIP se analiza primero y se corrige después; no al revés.
- **D-02:** La validación debe hacerse con homologación, CUIT y certificado válidos.
- **D-03:** Debe existir un gap report final con lo que funciona, lo que falla y lo que quedó obsoleto.

### Flujo esperado
- **D-04:** La organización facturadora debe volver a mostrar su configuración AFIP.
- **D-05:** La facturación AFIP mantiene el patrón actual: comprobante pendiente, proceso posterior, numeración/CAE e impresión.
- **D-06:** La fase debe validar la salida impresa fiscal con los datos que hoy genera el backend.

### the agent's Discretion
- Elegir el nivel de profundidad del fix técnico siempre que no se pierda trazabilidad del gap.
- Determinar qué parte del flujo puede automatizarse y cuál queda manual.

</decisions>

<specifics>
## Specific Ideas

- Negocio recordó que el flujo histórico dejaba la factura pendiente, luego un servicio completaba número/CAE y después impresión consumía esa respuesta.
- También se detectó que hoy dejaron de verse AFIP y otras integraciones en organización facturadora.
- Existe incertidumbre sobre si AFIP hoy exige QR nuevo o si el barcode fiscal actual sigue siendo suficiente para esta etapa.

</specifics>

<canonical_refs>
## Canonical References

### Producto y decisiones
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`
- `.planning/BACKLOG-JIRA.md`

### Código existente relevante
- `softguard.workspace/apps/AdministratorSearch/app/view/MoneyGuardOrganizacionFormView.js`
- `softguard.workspace/apps/AdministratorSearch/app/controller/org_cmetadataFormController.js`
- `database/_Desktop/StoredProcedures/MG_ContabilizarComprobante.sql`
- `database/_Desktop/StoredProcedures/AfipCaePendingSearch.sql`
- `database/_Desktop/StoredProcedures/AfipCaeSetComprobante.sql`
- `database/_Desktop/StoredProcedures/AfipCaeResponseSearch.sql`
- `database/_Desktop/StoredProcedures/m_comprobantes_cab_fcSearch.sql`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- AFIP ya existe como tipo de integración visible en código (`org_factelect = 'AfipCae'`).
- Hay stored procedures dedicados al ciclo AFIP.

### Established Patterns
- `m_comprobantes_cab_fcSearch.sql` ya compone `CodBarrasCAE`, por lo que la impresión fiscal ya espera datos AFIP.
- `org_cmetadataFormController.js` ya contiene lógica específica cuando `org_factelect == 'AfipCae'`.

### Integration Points
- Pantalla de organización facturadora.
- Stored procedures AFIP.
- Flujo de impresión del comprobante.

</code_context>

<deferred>
## Deferred Ideas

- Rediseño normativo completo si AFIP cambió formato visual.
- Cambio de proveedor o de arquitectura de firma.

</deferred>

---
*Phase: 05-afip-revision-integral-rehabilitacion*  
*Context gathered: 2026-04-08*
