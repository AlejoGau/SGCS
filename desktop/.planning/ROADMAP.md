# Roadmap: MoneyGuard Facturación

## Overview

Este roadmap organiza la evolución del módulo de facturación de MoneyGuard en siete fases ejecutables y trazables. La secuencia prioriza valor operativo temprano: primero se resuelven bonificaciones y la composición visible de la factura, luego medios de pago y exportación, después AFIP y automatización, y por último el facturador dinámico por cantidades automáticas.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions if new priority appears

- [ ] **Phase 1: Bonificación por contrato** - Reemplazar producto negativo por bonificación contractual operativa.
- [ ] **Phase 2: Pie de factura y observaciones dinámicas** - Soportar contenido fijo markdown, adjuntos embebidos y variables reemplazables.
- [ ] **Phase 3: Medios de pago e integraciones visibles** - Incorporar Mercado Pago, Pago Fácil y recuperar integraciones ocultas.
- [ ] **Phase 4: Exportación TXT mensual** - Generar salida TXT por mes facturado vía reporte/handler.
- [ ] **Phase 5: AFIP revisión integral y rehabilitación** - Revalidar el flujo AFIP y dejarlo visible y medible.
- [ ] **Phase 6: Automatización de facturación y AFIP** - Formalizar smoke/regresión Playwright y evidencia QA.
- [ ] **Phase 7: Facturador dinámico por cantidad automática** - Introducir cantidad automática extensible con v1 para `Cuentas`.

## Phase Details

### Phase 1: Bonificación por contrato
**Goal**: reemplazar el workaround de producto negativo por una bonificación contractual clara, vigente y visible en factura.
**Depends on**: Nothing (first phase)
**Requirements**: [BON-01, BON-02, BON-03, BON-04]
**Success Criteria** (what must be TRUE):
  1. Usuario puede guardar bonificación por monto o porcentaje en contrato.
  2. La facturación aplica la bonificación solo si está vigente.
  3. La factura refleja la bonificación aplicada sin depender de productos negativos.
**Plans**: 3 plans

Plans:
- [ ] 01-01: Análisis BA de reglas, vigencia, límites y representación de bonificación
- [ ] 01-02: Modelo de datos, UI de contrato y cálculo de factura
- [ ] 01-03: Validación funcional, regresión y evidencia de la fase

### Phase 2: Pie de factura y observaciones dinámicas
**Goal**: habilitar un pie de factura configurable con contenido fijo, adjuntos embebibles y observaciones dinámicas.
**Depends on**: Phase 1
**Requirements**: [INV-01, INV-02, INV-03, INV-04]
**Success Criteria** (what must be TRUE):
  1. Organización facturadora puede guardar markdown y adjuntos para el pie de factura.
  2. Se pueden definir observaciones dinámicas con variables reemplazables.
  3. El PDF final renderiza observaciones, bloque fijo y adjuntos sin romper la impresión actual.
**Plans**: 3 plans

Plans:
- [ ] 02-01: Análisis BA de bloques, variables y orden del footer
- [ ] 02-02: Metadata y render de PDF/mail para contenido fijo y observaciones
- [ ] 02-03: Validación visual, funcional y regresión de impresión

### Phase 3: Medios de pago e integraciones visibles
**Goal**: agregar Mercado Pago fijo, Pago Fácil configurable y recuperar integraciones ocultas en organización facturadora.
**Depends on**: Phase 2
**Requirements**: [PAY-01, PAY-02, PAY-03, PAY-04]
**Success Criteria** (what must be TRUE):
  1. Organización facturadora puede configurar Mercado Pago y Pago Fácil.
  2. La factura renderiza el código de barras de Pago Fácil cuando la integración está activa.
  3. AFIP y demás integraciones relevantes vuelven a ser visibles en alta y edición.
**Plans**: 3 plans

Plans:
- [ ] 03-01: Análisis BA de integraciones, metadata y composición del código de barras
- [ ] 03-02: Implementación de configuración y render de medios de pago
- [ ] 03-03: Corrección de visibilidad AFIP/integraciones y validación integral

### Phase 4: Exportación TXT mensual
**Goal**: entregar una exportación TXT mensual operable como reporte/handler independiente.
**Depends on**: Phase 3
**Requirements**: [EXP-01, EXP-02, EXP-03]
**Success Criteria** (what must be TRUE):
  1. Usuario puede pedir el TXT por mes facturado.
  2. El archivo se genera con el layout acordado.
  3. La solución no depende de modificar el flujo central del wizard para dispararse.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Análisis BA del layout, filtros y datos fuente
- [ ] 04-02: Implementación del reporte/handler y verificación de salida

### Phase 5: AFIP revisión integral y rehabilitación
**Goal**: recuperar visibilidad y confianza sobre la integración AFIP existente antes de cualquier rediseño mayor.
**Depends on**: Phase 4
**Requirements**: [AFIP-01, AFIP-02, AFIP-03, AFIP-04]
**Success Criteria** (what must be TRUE):
  1. La configuración AFIP vuelve a estar visible en organización facturadora.
  2. El flujo de homologación puede probarse de punta a punta con evidencia.
  3. Existe un informe de gaps actuales y riesgos remanentes.
**Plans**: 4 plans

Plans:
- [ ] 05-01: Gap analysis funcional y técnico de AFIP punta a punta
- [ ] 05-02: Corrección de configuración y visibilidad AFIP
- [ ] 05-03: Validación de emisión pendiente, numeración, CAE e impresión
- [ ] 05-04: Informe final de gaps remanentes y acciones futuras

### Phase 6: Automatización de facturación y AFIP
**Goal**: dejar una base Playwright útil para smoke, happy path y regresión de facturación.
**Depends on**: Phase 5
**Requirements**: [QA-01, QA-02, QA-03, QA-04]
**Success Criteria** (what must be TRUE):
  1. Existe una matriz clara de cobertura manual vs automatizable.
  2. Playwright cubre los flujos críticos de organización facturadora, facturación y comprobantes.
  3. AFIP tiene evidencia automatizable cuando el entorno lo permite y evidencia manual donde no.
**Plans**: 3 plans

Plans:
- [ ] 06-01: Matriz de escenarios, datos y estrategia de automatización
- [ ] 06-02: Escenarios Playwright de organización facturadora, facturación y comprobante
- [ ] 06-03: Evidencia AFIP, reporting y consolidación QA

### Phase 7: Facturador dinámico por cantidad automática
**Goal**: habilitar cantidades automáticas por fuente con implementación inicial basada en `Cuentas`.
**Depends on**: Phase 6
**Requirements**: [AUTO-01, AUTO-02, AUTO-03, AUTO-04]
**Success Criteria** (what must be TRUE):
  1. Producto puede declararse con cantidad automática y fuente seleccionada.
  2. El ítem del contrato deja de depender de cantidad manual cuando corresponde.
  3. La facturación usa la cantidad de cuentas asociadas al contrato y deja preparado el patrón para futuras fuentes.
**Plans**: 4 plans

Plans:
- [ ] 07-01: Análisis BA de reglas, fuentes y comportamiento UX
- [ ] 07-02: Configuración de cantidad automática en producto/servicio
- [ ] 07-03: UX de ítem de contrato y cálculo dinámico de facturación
- [ ] 07-04: Regresión, evidencia y expansión futura documentada

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Bonificación por contrato | 0/3 | Not started | - |
| 2. Pie de factura y observaciones dinámicas | 0/3 | Not started | - |
| 3. Medios de pago e integraciones visibles | 0/3 | Not started | - |
| 4. Exportación TXT mensual | 0/2 | Not started | - |
| 5. AFIP revisión integral y rehabilitación | 0/4 | Not started | - |
| 6. Automatización de facturación y AFIP | 0/3 | Not started | - |
| 7. Facturador dinámico por cantidad automática | 0/4 | Not started | - |
