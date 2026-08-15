# Phase 6: Automatización de facturación y AFIP - Context

**Gathered:** 2026-04-08  
**Status:** Ready for planning

<domain>
## Phase Boundary

Definir y ejecutar la automatización Playwright útil para organización facturadora, wizard de facturación, comprobantes y la parte AFIP que resulte automatizable. La fase también debe consolidar evidencia manual donde la automatización no alcance.

</domain>

<decisions>
## Implementation Decisions

### Cobertura
- **D-01:** La fase debe cubrir smoke, happy path y regresión crítica del roadmap.
- **D-02:** AFIP puede quedar parcialmente manual si homologación o credenciales impiden automatización completa.
- **D-03:** Cada escenario automatizado debe mapear a una fase y a evidencia observable.

### Operación
- **D-04:** La matriz de automatización en `.planning/PLAYWRIGHT-MATRIX.md` es la fuente base de cobertura.
- **D-05:** Si la suite actual no está versionada o está incompleta, la fase debe dejar explícito ese gap antes de extenderla.

### the agent's Discretion
- Estructura exacta de tests y helpers Playwright.
- Priorización fina entre smoke y regresión si el tiempo obliga a recortar.

</decisions>

<specifics>
## Specific Ideas

- Casos candidatos obvios: bonificación, pie de factura, integraciones visibles, TXT y facturador dinámico.
- AFIP debe dejar al menos evidencia reproducible, aunque una parte siga siendo manual por homologación.

</specifics>

<canonical_refs>
## Canonical References

### Planificación y cobertura
- `.planning/PLAYWRIGHT-MATRIX.md`
- `.planning/BACKLOG-JIRA.md`
- `.planning/ROADMAP.md`

### Evidencia y suite actual
- `softguard.workspace/qa-automation/.env`
- `softguard.workspace/qa-automation/reports/agent-summary.json`
- `softguard.workspace/qa-automation/reports/json/results.json`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Existe la carpeta `softguard.workspace/qa-automation` con dependencias Playwright instaladas y reportes previos.
- Hay artefactos de prueba previos con referencias a `webmg-comprobante-crud` en `reports/test-artifacts`.

### Established Patterns
- La evidencia actual sugiere que ya se ejecutó automatización, pero la estructura fuente no quedó clara en archivos versionados del repo relevado.

### Integration Points
- WebMG.
- AdministratorSearch.
- Evidencia UAT sembrada por fases 1 a 5 y 7.

</code_context>

<deferred>
## Deferred Ideas

- Automatización completa de AFIP real sin precondiciones externas.
- Cobertura de escenarios no priorizados por negocio.

</deferred>

---
*Phase: 06-automatizacion-facturacion-afip*  
*Context gathered: 2026-04-08*
