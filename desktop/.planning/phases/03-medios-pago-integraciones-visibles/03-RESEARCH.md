# Phase 3: Medios de pago e integraciones visibles - Research

**Researched:** 2026-04-08  
**Domain:** Organización facturadora + integraciones de cobro  
**Confidence:** MEDIUM

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Mercado Pago es bloque fijo por organización.
- Pago Fácil es integración configurable.
- Pago Fácil combina parte fija y dinámica.
- La visibilidad de AFIP y otras integraciones es parte del alcance.

### the agent's Discretion
- Elegir cómo persistir metadata de integración.
- Elegir el punto de composición del código de barras.

### Deferred Ideas (OUT OF SCOPE)
- Otros medios de pago.
- Rediseño fiscal completo.

</user_constraints>

<research_summary>
## Summary

El repositorio ya tiene una base clara para organización facturadora: `MoneyGuardOrganizacionFormView.js` expone `org_factelect`, `t_organizacion_fcModel.js` lo modela y `MoneyGuardOrganizacionFormController.js` conecta la acción de configuración. Además, `org_cmetadataFormController.js` muestra que ya existe una ruta de configuración complementaria, aunque hoy el flujo detectado está centrado en `AfipCae`.

No se encontraron referencias actuales a Pago Fácil en el repo y las apariciones de Mercado Pago están fuera de MoneyGuard, en apps no relacionadas. Esto indica que ambas piezas deben agregarse como capacidad nueva y no como simple activación de código oculto. El caso AFIP sí aparece en SQL y UI, lo que refuerza que la parte de visibilidad es una regresión local, no una implementación desde cero.

**Primary recommendation:** reutilizar la UI de organización facturadora y su mecanismo de configuración, agregar Pago Fácil como integración nueva y tratar Mercado Pago como metadata fija del footer, manteniendo la visibilidad de AFIP como corrección de la misma fase.
</research_summary>

<architecture_patterns>
## Existing Repo Findings

### Organización facturadora
- `MoneyGuardOrganizacionFormView.js` contiene el campo `org_factelect`.
- `MoneyGuardOrganizacionFormController.js` maneja `#btnConfigurar`.
- `t_organizacion_fcModel.js` modela `org_factelect`.

### Facturación e integraciones
- `MG_ContabilizarComprobante.sql` usa `@org_factelect` y aplica lógica específica para `AfipCae`.
- `org_cmetadataFormController.js` tiene ramas explícitas para `AfipCae`, lo que sugiere que otras integraciones pueden haber quedado invisibles u obsoletas.

### Anti-Patterns to Avoid
- Pegar Mercado Pago y Pago Fácil directamente en el PDF sin configuración administrativa.
- Resolver visibilidad con condicionales ad hoc sin revisar el flujo completo de alta/edición.
- Introducir Pago Fácil como texto fijo sin contrato formal de metadata.

</architecture_patterns>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Integración visible pero no usable
**What goes wrong:** aparece en UI pero no tiene formulario o metadata suficiente.  
**How to avoid:** definir los campos mínimos en 03-01 y probar alta/edición en 03-03.

### Pitfall 2: Pago Fácil sin contrato de composición
**What goes wrong:** el barcode se arma distinto en cada punto.  
**How to avoid:** fijar quién arma la parte fija, quién arma la parte dinámica y dónde se unen.

### Pitfall 3: Corregir AFIP solo en una pantalla
**What goes wrong:** alta nueva funciona, edición existente no, o viceversa.  
**How to avoid:** tratar alta y edición como escenarios separados de validación.

</common_pitfalls>

<open_questions>
## Open Questions

1. **¿La configuración de Pago Fácil vive en `org_cmetadata` o en una integración formal de base?**
   - What we know: negocio pidió una integración en base de integraciones, pero el repo ya usa metadata para config complementaria.
   - What's unclear: cuál es el punto de persistencia más alineado con el modelo actual.
   - Recommendation: decidirlo en 03-01 y dejarlo explícito antes de tocar UI.

2. **¿Qué integraciones históricas, además de AFIP, deben reaparecer?**
   - What we know: se mencionó al menos Visa/exportaciones antiguas.
   - What's unclear: si basta con exponer el mecanismo o si hay que rehabilitar tipos concretos.
   - Recommendation: cerrar un inventario mínimo en BA para no abrir alcance indefinido.

</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `softguard.workspace/apps/AdministratorSearch/app/view/MoneyGuardOrganizacionFormView.js`
- `softguard.workspace/apps/AdministratorSearch/app/controller/MoneyGuardOrganizacionFormController.js`
- `softguard.workspace/apps/AdministratorSearch/app/controller/org_cmetadataFormController.js`
- `softguard.workspace/apps/AdministratorSearch/app/model/t_organizacion_fcModel.js`
- `database/_Desktop/StoredProcedures/MG_ContabilizarComprobante.sql`
- `database/_Desktop/StoredProcedures/m_comprobantes_cab_fcSearch.sql`

### Secondary (MEDIUM confidence)
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`
- Búsquedas de repo sin resultados para `Pago Fácil` y `PagoFacil`

</sources>

---
*Phase: 03-medios-pago-integraciones-visibles*  
*Research completed: 2026-04-08*  
*Ready for planning: yes*
