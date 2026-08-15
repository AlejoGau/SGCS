# State: MoneyGuard Facturación

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-04-08)

**Core value:** MoneyGuard debe permitir facturar contratos de forma confiable, auditable y repetible sin depender de workarounds manuales ni reglas ocultas.  
**Current focus:** bootstrap de la rama de planificación y preparación de fases ejecutables.

## Workspace

- **Repo**: `D:\projects\softguard\desktop`
- **Branch**: `codex/moneyguard-facturacion-plan`
- **Scope**: documentación operativa, análisis BA, roadmap, backlog y UAT; sin cambios de producto en esta rama.
- **Starting point**: `master` local, sin mezclar trabajo previo de `fix/DK-1478-comprobante-manual-error`.

## Execution Protocol

1. Mantener el roadmap y requirements como fuente de verdad.
2. Ejecutar las fases en orden numérico salvo inserciones decimales justificadas.
3. Dentro de cada fase, avanzar en orden BA -> implementación -> validación.
4. Actualizar UAT y traceabilidad antes de marcar una fase como completa.
5. No promover cambios de alcance a desarrollo sin dejar decisión escrita en `CONTEXT.md` y `BACKLOG-JIRA.md`.

## GSD Defaults

- `ROADMAP.md` y `REQUIREMENTS.md` están listos para usarse con `$gsd-plan-phase 1`.
- Las fases ya tienen `CONTEXT`, `RESEARCH`, `PLAN` y `UAT` presembrados.
- La configuración propone `discuss_mode: auto` y gates livianos para facilitar trabajo con executors/agentes.

## Known Repo Anchors

- Contratos: `softguard.workspace/packages/local/common/src/view/ContratoFormView.js`
- Items de contrato: `softguard.workspace/packages/local/common/src/controller/ContratoItemFormController.js`
- Productos: `softguard.workspace/packages/local/common/src/model/ProductModel.js`
- Organización facturadora: `softguard.workspace/apps/AdministratorSearch/app/view/MoneyGuardOrganizacionFormView.js`
- Wizard facturación: `softguard.workspace/apps/WebMG/app/controller/FacturacionAutomaticaWizardController.js`
- Export pattern: `softguard.workspace/apps/WebMG/app/controller/RemesaExportFormController.js`
- QA automation: `softguard.workspace/qa-automation`
- SP principal de facturación: `database/_Desktop/StoredProcedures/MG_ContratoAFactura.sql`

## Current Assumptions

- V1 usa una sola bonificación activa por contrato.
- Mercado Pago se trata como bloque fijo y Pago Fácil como integración configurable.
- AFIP puede requerir validación manual asistida aunque luego se automaticen partes del flujo.
- `Cuentas` es la única fuente inicial de cantidad automática.

## Next Useful Commands

- `$gsd-plan-phase 1`
- `$gsd-plan-phase 2`
- `$gsd-progress`
- `$gsd-execute-phase 1` una vez que la fase tenga planes aprobados y contexto actualizado
