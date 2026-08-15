# MoneyGuard Facturación

## What This Is

Iniciativa brownfield para ordenar y ejecutar la evolución del módulo de facturación de MoneyGuard dentro del repo `desktop`. El objetivo no es rediseñar el producto completo, sino dejar una secuencia operable de análisis BA, implementación, QA y automatización para bonificaciones contractuales, factura configurable, integraciones de cobro, exportación TXT, rehabilitación AFIP y facturación dinámica.

## Core Value

MoneyGuard debe permitir facturar contratos de forma confiable, auditable y repetible sin depender de workarounds manuales ni reglas ocultas.

## Requirements

### Validated

- ✅ El sistema ya tiene wizard de facturación, comprobantes PDF y procesos de facturación automática.
- ✅ Existe organización facturadora con logo, selector de integración y soporte histórico para AFIP.
- ✅ El repositorio ya dispone de `qa-automation` con Playwright para WebMG y de stored procedures de facturación en `database/_Desktop`.

### Active

- [ ] Modelar bonificación contractual sin usar productos con precio negativo.
- [ ] Extender la factura con contenido fijo, adjuntos embebidos y observaciones dinámicas.
- [ ] Incorporar Mercado Pago fijo y Pago Fácil configurable en el pie de factura.
- [ ] Generar exportación TXT mensual como reporte/handler.
- [ ] Revisar, corregir y revalidar la integración AFIP actual.
- [ ] Formalizar cobertura Playwright y UAT por fase.
- [ ] Implementar cantidad automática por fuente, empezando por `Cuentas`.

### Out of Scope

- Rediseño visual general de WebMG o migración de ExtJS a otra tecnología, porque esta rama es solo de planificación operativa.
- Implementación inicial de múltiples fuentes de cantidad automática además de `Cuentas`, porque v1 debe demostrar el patrón con alcance acotado.
- Reemplazo completo de AFIP por otro proveedor o rediseño total del flujo fiscal, porque primero hace falta recuperar visibilidad y medir gaps reales.

## Context

El repositorio combina apps ExtJS (`softguard.workspace/apps`), lógica común compartida (`softguard.workspace/packages/local/common`), automatización QA en `softguard.workspace/qa-automation` y SQL/stored procedures en `database/_Desktop`. La facturación actual ya integra contrato, organización facturadora, impresión y procesos de AFIP, pero hay gaps funcionales: bonificaciones no modeladas, integraciones ocultas, contenido de factura limitado y cantidades que hoy se mantienen manualmente.

Los hallazgos ya confirmados en el repo marcan los principales puntos de apoyo:
- `softguard.workspace/apps/WebMG/app/controller/FacturacionAutomaticaWizardController.js` concentra el wizard actual.
- `softguard.workspace/apps/AdministratorSearch/app/view/MoneyGuardOrganizacionFormView.js` y `softguard.workspace/apps/AdministratorSearch/app/controller/MoneyGuardOrganizacionFormController.js` son el punto natural para configuraciones de organización facturadora.
- `softguard.workspace/packages/local/common/src/view/ContratoFormView.js` y `softguard.workspace/packages/local/common/src/controller/ContratoFormController.js` son el ancla de UI de contrato.
- `softguard.workspace/packages/local/common/src/model/ProductModel.js` y `softguard.workspace/apps/SgWebCrm/app/view/ProductFormView.js` son el ancla para cantidad automática.
- `database/_Desktop/StoredProcedures/MG_ContratoAFactura.sql` confirma que hoy la facturación usa `Price * Quantity`, sin resolver multiplicadores dinámicos por relaciones.

## Constraints

- **Tech stack**: ExtJS + SQL stored procedures + packages comunes existentes - los planes deben respetar patrones ya implementados.
- **Branching**: esta rama está dedicada solo a planificación - no debe mezclar cambios de producto ni de build.
- **Dependencias externas**: AFIP homologación requiere CUIT, certificado y entorno real - no puede asumirse como totalmente automatizable.
- **Ejecución por fases**: el trabajo futuro debe poder avanzarse fase por fase con agents/executors - cada plan necesita entregables y criterios observables.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Bonificación contractual en vez de producto negativo | La alternativa de producto negativo ya fue revisada y no funciona como se esperaba | - Pending |
| `.planning/` estándar GSD | Permite usar agentes, contexto persistente y ejecución por fases sin inventar otra convención | - Pending |
| Roadmap por valor de entrega | Da releases parciales utilizables por negocio y simplifica priorización | - Pending |
| Mercado Pago fijo y Pago Fácil configurable en v1 | Responde al requerimiento actual sin mezclar más integraciones en la primera ola | - Pending |
| TXT como reporte/handler | Evita acoplar la exportación a la corrida del wizard | - Pending |
| Cantidad automática genérica con implementación inicial solo para `Cuentas` | Reduce riesgo técnico y deja base extensible | - Pending |

---
*Last updated: 2026-04-08 after planning bootstrap for MoneyGuard facturación*
