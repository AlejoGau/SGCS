# Phase 6: Automatización de facturación y AFIP - Research

**Researched:** 2026-04-08  
**Domain:** Playwright suite + QA evidence  
**Confidence:** MEDIUM

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Cubrir smoke, happy path y regresión crítica.
- AFIP puede quedar parcialmente manual.
- La matriz `.planning/PLAYWRIGHT-MATRIX.md` es la base de cobertura.

### the agent's Discretion
- Organización de tests/helpers.
- Priorización fina si la suite necesita acotarse.

### Deferred Ideas (OUT OF SCOPE)
- Automatización completa de AFIP real.
- Escenarios no priorizados por negocio.

</user_constraints>

<research_summary>
## Summary

La carpeta `softguard.workspace/qa-automation` existe y contiene dependencias Playwright, `.auth` y reportes previos (`reports/agent-summary.json`, `reports/json/results.json`, `reports/test-artifacts`). Eso confirma que hubo una suite ejecutada recientemente. Sin embargo, en la revisión actual no aparecieron archivos fuente versionados de tests o configuración dentro de `git ls-files`, lo que implica que la fase debe contemplar un inventario inicial de la suite real antes de extenderla.

La recomendación es tratar Fase 6 como una mezcla de descubrimiento ligero y ejecución: primero inventariar el estado real de la suite, luego mapear escenarios contra la matriz y recién después agregar/normalizar los tests faltantes.

**Primary recommendation:** empezar por un inventario de suite y cobertura real, y usar `.planning/PLAYWRIGHT-MATRIX.md` como contrato de expansión para no automatizar a ciegas.
</research_summary>

<architecture_patterns>
## Existing Repo Findings

### Suite actual
- `softguard.workspace/qa-automation` contiene dependencias y evidencia de ejecución.
- `reports/test-artifacts` incluye directorios con nombres truncados que sugieren al menos un caso `webmg-comprobante-crud`.

### Gaps del estado actual
- `git ls-files softguard.workspace/qa-automation` no devolvió archivos versionados.
- No se ubicó una fuente clara de tests/fixtures dentro del índice del repo.

### Anti-Patterns to Avoid
- Asumir cobertura existente sin inventariarla.
- Mezclar en la misma tarea descubrimiento, reparación de suite y nuevos escenarios sin dejar evidencia.
- Forzar AFIP a full automation cuando el entorno dependa de terceros.

</architecture_patterns>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Suite local no reproducible
**What goes wrong:** los tests corren solo en una máquina o dependen de archivos no versionados.  
**How to avoid:** inventariar primero qué está realmente en repo y qué es local.

### Pitfall 2: Casos demasiado amplios
**What goes wrong:** se automatizan flujos largos y frágiles sin valor de regresión.  
**How to avoid:** derivar cada caso desde la matriz y desde UAT por fase.

### Pitfall 3: AFIP como blocker de toda la fase
**What goes wrong:** la automatización no avanza porque homologación no está disponible.  
**How to avoid:** separar smoke no fiscal, evidencia parcial y tramo manual AFIP.

</common_pitfalls>

<open_questions>
## Open Questions

1. **¿Dónde están los tests fuente reales de `qa-automation`?**
   - What we know: hay dependencias y reportes, pero no aparecieron archivos versionados.
   - What's unclear: si viven fuera del repo, si están ignorados o si la suite fue limpiada.
   - Recommendation: resolverlo al principio de 06-01.

2. **¿Qué nivel de assert visual es estable para PDFs/comprobantes?**
   - What we know: varias fases dependen de evidencia de factura impresa.
   - What's unclear: si conviene assert estructural, textual o snapshot.
   - Recommendation: decidirlo una vez inventariada la suite real.

</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `.planning/PLAYWRIGHT-MATRIX.md`
- `softguard.workspace/qa-automation/.env`
- `softguard.workspace/qa-automation/reports/agent-summary.json`
- `softguard.workspace/qa-automation/reports/json/results.json`

### Secondary (MEDIUM confidence)
- Evidencia local en `softguard.workspace/qa-automation/reports/test-artifacts`
- `.planning/BACKLOG-JIRA.md`
- `.planning/ROADMAP.md`

</sources>

---
*Phase: 06-automatizacion-facturacion-afip*  
*Research completed: 2026-04-08*  
*Ready for planning: yes*
