# Phase 5: AFIP revisión integral y rehabilitación - Research

**Researched:** 2026-04-08  
**Domain:** AFIP current integration in Softguard  
**Confidence:** MEDIUM

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Analizar primero y corregir después.
- Validar con homologación real.
- Emitir gap report al cierre.
- Recuperar visibilidad de configuración AFIP.

### the agent's Discretion
- Profundidad del fix técnico.
- División entre evidencia manual y automatizable.

### Deferred Ideas (OUT OF SCOPE)
- Rediseño fiscal grande.
- Cambio de proveedor o arquitectura de firma.

</user_constraints>

<research_summary>
## Summary

El repo confirma que AFIP no es una idea futura sino una integración real preexistente. En SQL aparecen `AfipCaePendingSearch.sql`, `AfipCaeSetComprobante.sql` y `AfipCaeResponseSearch.sql`, lo que respalda el patrón recordado por negocio: comprobante pendiente, proceso posterior y escritura de CAE. Además, `m_comprobantes_cab_fcSearch.sql` ya expone `cbc_cCAE`, `cbc_cVtoCAE` y compone `CodBarrasCAE`, señal clara de que la impresión ya consume este flujo.

En UI, `MoneyGuardOrganizacionFormView.js` y `org_cmetadataFormController.js` muestran que la configuración AFIP existió y todavía tiene ramas activas. El principal riesgo no es la inexistencia del feature, sino la pérdida de visibilidad o desalineación entre UI, metadata y proceso backend.

**Primary recommendation:** empezar por un gap analysis que una UI, metadata, SPs y evidencia homologación; luego corregir solo lo necesario para volver a obtener un circuito verificable de punta a punta.
</research_summary>

<architecture_patterns>
## Existing Repo Findings

### UI y configuración
- `MoneyGuardOrganizacionFormView.js` contiene `org_factelect`.
- `org_cmetadataFormController.js` evalúa explícitamente `record.get('org_factelect') == 'AfipCae'`.

### Backend AFIP
- `AfipCaePendingSearch.sql`, `AfipCaeSetComprobante.sql` y `AfipCaeResponseSearch.sql` reflejan la cadena de pending -> response -> set comprobante.
- `MG_ContabilizarComprobante.sql` condiciona una rama a `@org_factelect = 'AfipCae'`.
- `m_comprobantes_cab_fcSearch.sql` calcula `CodBarrasCAE`.

### Anti-Patterns to Avoid
- Corregir impresión sin validar el flujo real que completa CAE.
- Asumir que el problema es solo visual si la homologación no fue probada.
- Rediseñar AFIP antes de medir el gap real.

</architecture_patterns>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: UI recuperada, backend roto
**What goes wrong:** vuelve a verse AFIP pero el comprobante nunca obtiene CAE.  
**How to avoid:** validar UI y proceso de fondo como un solo flujo.

### Pitfall 2: Homologación no reproducible
**What goes wrong:** la prueba depende de un certificado no documentado o de datos informales.  
**How to avoid:** documentar prerequisitos exactos en 05-03.

### Pitfall 3: Gap report superficial
**What goes wrong:** se declara “AFIP no funciona” sin separar configuración, emisión, respuesta e impresión.  
**How to avoid:** estructurar el gap por tramo del flujo.

</common_pitfalls>

<open_questions>
## Open Questions

1. **¿Dónde vive exactamente el servicio que consume `AfipCaePendingSearch` y llama a AFIP?**
   - What we know: existen SPs y el modelo pending está claro.
   - What's unclear: el proceso/aplicación concreta que ejecuta el ciclo.
   - Recommendation: ubicarlo durante 05-01 para no dejar una parte ciega del flujo.

2. **¿El formato visual AFIP actual sigue siendo suficiente o hay que incorporar QR?**
   - What we know: el dataset actual calcula `CodBarrasCAE`.
   - What's unclear: si negocio/norma requiere un formato distinto en esta entrega.
   - Recommendation: no tocar el formato hasta cerrar el gap y una validación con negocio.

</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `softguard.workspace/apps/AdministratorSearch/app/view/MoneyGuardOrganizacionFormView.js`
- `softguard.workspace/apps/AdministratorSearch/app/controller/org_cmetadataFormController.js`
- `database/_Desktop/StoredProcedures/MG_ContabilizarComprobante.sql`
- `database/_Desktop/StoredProcedures/AfipCaePendingSearch.sql`
- `database/_Desktop/StoredProcedures/AfipCaeSetComprobante.sql`
- `database/_Desktop/StoredProcedures/AfipCaeResponseSearch.sql`
- `database/_Desktop/StoredProcedures/m_comprobantes_cab_fcSearch.sql`

### Secondary (MEDIUM confidence)
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`

</sources>

---
*Phase: 05-afip-revision-integral-rehabilitacion*  
*Research completed: 2026-04-08*  
*Ready for planning: yes*
