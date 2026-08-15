# Phase 4: Exportación TXT mensual - Context

**Gathered:** 2026-04-08  
**Status:** Ready for planning

<domain>
## Phase Boundary

Crear una exportación TXT mensual de facturación como reporte/handler, parametrizada por mes facturado. La fase no modifica el flujo principal del wizard salvo referencias o accesos secundarios si luego fueran necesarios.

</domain>

<decisions>
## Implementation Decisions

### Alcance funcional
- **D-01:** El TXT se genera como reporte/handler y no como side effect de la corrida del wizard.
- **D-02:** El parámetro mínimo esperado es el mes facturado.
- **D-03:** Debe existir un layout acordado por negocio antes de implementar el formato final.

### Alcance técnico
- **D-04:** Se debe reutilizar un patrón de exportación existente si el repo ya lo tiene.
- **D-05:** El archivo generado debe poder validarse tanto con datos como sin datos.

### the agent's Discretion
- Nombre exacto del reporte y wiring de acceso.
- Punto exacto de lectura de datos si no rompe el contrato funcional.

</decisions>

<specifics>
## Specific Ideas

- El TXT debe incluir fecha, número de factura y demás columnas pedidas por negocio.
- Se discutió explícitamente que el mejor patrón es similar a un handler de exportación.

</specifics>

<canonical_refs>
## Canonical References

### Producto y decisiones
- `.planning/inputs/2026-04-08-moneyguard-facturacion-minutas.md`
- `.planning/inputs/2026-04-08-moneyguard-facturacion-decisiones.md`
- `.planning/BACKLOG-JIRA.md`

### Código existente relevante
- `softguard.workspace/apps/WebMG/app/controller/FacturacionAutomaticaWizardController.js`
- `softguard.workspace/apps/WebMG/app/controller/RemesaExportFormController.js`
- `softguard.workspace/apps/WebMG/ARCHITECTURE.md`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `RemesaExportFormController.js` es el patrón más cercano de exportación identificado en WebMG.
- El wizard de facturación ya existe y no conviene sobrecargarlo con una lógica lateral de TXT si el handler puede vivir solo.

### Established Patterns
- WebMG ya usa controllers dedicados para exportaciones/reportes.

### Integration Points
- Parámetro de mes facturado.
- Handler de exportación.
- Eventual acceso desde UI/reportes.

</code_context>

<deferred>
## Deferred Ideas

- Lanzar la exportación automáticamente al finalizar una corrida del wizard.
- Múltiples formatos de archivo además de TXT.

</deferred>

---
*Phase: 04-exportacion-txt-mensual*  
*Context gathered: 2026-04-08*
