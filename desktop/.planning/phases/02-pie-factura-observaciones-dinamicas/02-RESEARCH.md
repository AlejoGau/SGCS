# Phase 2: Pie de factura y observaciones dinámicas - Research

**Researched:** 2026-04-08  
**Domain:** Organización facturadora + metadata + impresión PDF  
**Confidence:** MEDIUM

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- El pie debe soportar contenido fijo por organización.
- Debe admitir markdown y adjuntos embebidos.
- Debe existir un template de observaciones dinámicas.
- Variables desde cliente, organización del cliente, contrato y comprobante.
- Orden del footer: observaciones dinámicas -> bloque fijo -> medios de pago.

### the agent's Discretion
- Shape exacto del catálogo de variables.
- Shape exacto de metadata para adjuntos embebidos.

### Deferred Ideas (OUT OF SCOPE)
- Medios de pago del pie.
- Templates con condicionales avanzados.

</user_constraints>

<research_summary>
## Summary

La base técnica más prometedora para esta fase ya existe: `database/_Desktop/StoredProcedures/m_comprobantes_cab_fcSearch.sql` incluye `orgfac_org_cmetadata`, lo que permite transportar metadata de la organización facturadora hasta la impresión sin abrir un canal paralelo. Además, `softguard.workspace/apps/WebMG/app/controller/FacturaPrintController.js` ya apunta al handler `ComprobantePdfMG`, por lo que el render final puede centralizarse ahí o en el dataset que consume.

La recomendación es usar `org_cmetadata` como contrato de configuración del footer y no introducir una segunda fuente de verdad. La fase debe definir un shape claro de metadata para: bloque fijo, adjuntos embebibles y template dinámico.

**Primary recommendation:** extender `org_cmetadata` con un contrato explícito para footer fijo y observaciones dinámicas, y hacer que impresión consuma ese contrato sin duplicar configuración.
</research_summary>

<architecture_patterns>
## Existing Repo Findings

### Organización facturadora
- `MoneyGuardOrganizacionFormView.js` es la pantalla de alta/edición.
- `MoneyGuardOrganizacionFormController.js` ya maneja el botón `btnConfigurar`.
- `org_cmetadataFormController.js` ya existe para configuración específica por integración/metadata.

### Impresión
- `m_comprobantes_cab_fcSearch.sql` ya devuelve `orgfac_org_cmetadata`.
- `FacturaPrintController.js` usa `/handler/ComprobantePdfMG`.

### Anti-Patterns to Avoid
- Guardar el bloque fijo en un lugar distinto de la metadata de organización.
- Resolver variables dinámicas con reemplazos ad hoc sin catálogo.
- Empujar archivos embebidos directamente al PDF sin un contrato estable de metadata.

</architecture_patterns>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Variables sin fuente canónica
**What goes wrong:** el template usa placeholders que luego nadie sabe de dónde salen.  
**How to avoid:** publicar un catálogo mínimo y mapearlo a campos reales.

### Pitfall 2: Footer que rompe impresión
**What goes wrong:** el contenido fijo altera el layout del PDF o tapa otros bloques.  
**How to avoid:** fijar orden de render y validar con casos visuales concretos.

### Pitfall 3: Adjuntos sin lifecycle claro
**What goes wrong:** se cargan imágenes pero no queda claro si viajan como archivo, base64 o URL.  
**How to avoid:** cerrar un shape único antes de implementar.

</common_pitfalls>

<open_questions>
## Open Questions

1. **¿Dónde está el flujo exacto multipart/base64 que negocio quiere reutilizar?**
   - What we know: existe la referencia verbal y el repo tiene múltiples usos de base64/multipart.
   - What's unclear: cuál es el caso CRM exacto que conviene copiar.
   - Recommendation: resolver en 02-01 y documentar el anchor definitivo antes de 02-02.

2. **¿El handler `ComprobantePdfMG` ya interpreta HTML/markdown o requiere preprocesado?**
   - What we know: `FacturaPrintController` delega al handler, pero no se inspeccionó el backend del handler.
   - What's unclear: dónde conviene transformar markdown.
   - Recommendation: revisarlo en 02-02 antes de fijar el formato final.

</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `softguard.workspace/apps/AdministratorSearch/app/view/MoneyGuardOrganizacionFormView.js`
- `softguard.workspace/apps/AdministratorSearch/app/controller/MoneyGuardOrganizacionFormController.js`
- `softguard.workspace/apps/AdministratorSearch/app/view/org_cmetadataFormView.js`
- `softguard.workspace/apps/AdministratorSearch/app/controller/org_cmetadataFormController.js`
- `database/_Desktop/StoredProcedures/m_comprobantes_cab_fcSearch.sql`
- `softguard.workspace/apps/WebMG/app/controller/FacturaPrintController.js`

### Secondary (MEDIUM confidence)
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`

</sources>

---
*Phase: 02-pie-factura-observaciones-dinamicas*  
*Research completed: 2026-04-08*  
*Ready for planning: yes*
