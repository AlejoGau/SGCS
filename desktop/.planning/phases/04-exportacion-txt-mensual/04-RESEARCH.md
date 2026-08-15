# Phase 4: Exportación TXT mensual - Research

**Researched:** 2026-04-08  
**Domain:** Reportes/handlers WebMG  
**Confidence:** MEDIUM

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- TXT como reporte/handler.
- Parámetro mínimo: mes facturado.
- No sobrecargar el wizard como side effect de la corrida.

### the agent's Discretion
- Nombre y wiring exacto del reporte.
- Punto de acceso de usuario.

### Deferred Ideas (OUT OF SCOPE)
- Automatizar el TXT al final del wizard.
- Otros formatos de archivo.

</user_constraints>

<research_summary>
## Summary

El patrón más alineado encontrado en el repo es `softguard.workspace/apps/WebMG/app/controller/RemesaExportFormController.js`, que confirma que WebMG ya resuelve exportaciones mediante controllers dedicados en vez de incrustarlas en el wizard principal. Esto encaja con la decisión funcional de generar el TXT como reporte independiente.

La recomendación es usar el wizard existente solo como referencia de filtros/datos, pero montar la exportación como flujo aislado con su propio controller/handler y un contrato claro de salida. El paso crítico de esta fase no es técnico sino BA: cerrar el layout final del TXT.

**Primary recommendation:** basarse en el patrón de `RemesaExportFormController.js`, cerrar primero el layout y luego implementar un handler autocontenido por mes facturado.
</research_summary>

<architecture_patterns>
## Existing Repo Findings

### Exportaciones
- `RemesaExportFormController.js` es el anchor principal para exportes tipo handler.
- `FacturacionAutomaticaWizardController.js` es una referencia de flujo, no el lugar recomendado para incrustar el TXT.

### Anti-Patterns to Avoid
- Agregar ramas de TXT al wizard sin contrato de reporte.
- Cerrar el layout después de implementar el archivo.
- Asumir que "sin datos" equivale a error técnico.

</architecture_patterns>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Layout tardío
**What goes wrong:** se programa una salida y luego negocio pide otro orden/columnas.  
**How to avoid:** cerrar ejemplo de archivo en 04-01.

### Pitfall 2: Flujo acoplado al wizard
**What goes wrong:** el TXT queda dependiente de una corrida previa específica.  
**How to avoid:** tratar el reporte como handler con parámetro independiente.

### Pitfall 3: Mes sin datos tratado como falla
**What goes wrong:** el sistema devuelve error en lugar de salida controlada.  
**How to avoid:** definir explícitamente qué archivo o mensaje corresponde sin datos.

</common_pitfalls>

<sources>
## Sources

### Primary (HIGH confidence)
- `softguard.workspace/apps/WebMG/app/controller/FacturacionAutomaticaWizardController.js`
- `softguard.workspace/apps/WebMG/app/controller/RemesaExportFormController.js`
- `softguard.workspace/apps/WebMG/ARCHITECTURE.md`

### Secondary (MEDIUM confidence)
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`

</sources>

---
*Phase: 04-exportacion-txt-mensual*  
*Research completed: 2026-04-08*  
*Ready for planning: yes*
