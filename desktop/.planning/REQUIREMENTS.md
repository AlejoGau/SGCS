# Requirements: MoneyGuard Facturación

**Defined:** 2026-04-08
**Core Value:** MoneyGuard debe permitir facturar contratos de forma confiable, auditable y repetible sin depender de workarounds manuales ni reglas ocultas.

## v1 Requirements

### Bonificaciones

- [ ] **BON-01**: Usuario puede configurar en el contrato una bonificación por `monto` o `porcentaje`.
- [ ] **BON-02**: Usuario puede definir `descripción` y `fecha hasta` opcional; si está vacía, la bonificación es permanente.
- [ ] **BON-03**: La facturación aplica la bonificación solo si está vigente en la fecha del comprobante.
- [ ] **BON-04**: La factura muestra de forma visible la bonificación aplicada y el total ajustado.

### Factura e Impresión

- [ ] **INV-01**: Organización facturadora puede configurar contenido fijo del pie de factura en markdown.
- [ ] **INV-02**: Organización facturadora puede adjuntar archivos o imágenes embebibles reutilizables en PDF.
- [ ] **INV-03**: Organización facturadora puede definir observaciones dinámicas con variables de cliente, organización cliente, contrato y comprobante.
- [ ] **INV-04**: El render final de factura respeta el orden observaciones dinámicas + bloque fijo + medios de pago.

### Pagos e Integraciones

- [ ] **PAY-01**: Organización facturadora puede configurar un bloque fijo de Mercado Pago para todas sus facturas.
- [ ] **PAY-02**: Organización facturadora puede dar de alta una integración Pago Fácil con metadata fija configurable.
- [ ] **PAY-03**: La factura genera el código de barras de Pago Fácil combinando metadata fija y datos dinámicos del comprobante/cliente.
- [ ] **PAY-04**: AFIP y demás integraciones relevantes vuelven a estar visibles en alta y edición de organización facturadora.

### Exportación

- [ ] **EXP-01**: Usuario puede solicitar exportación TXT por mes facturado.
- [ ] **EXP-02**: La exportación TXT se entrega como reporte/handler independiente del wizard.
- [ ] **EXP-03**: El TXT generado respeta el layout y nombre de archivo acordados con negocio.

### AFIP

- [ ] **AFIP-01**: Usuario puede ver y configurar AFIP desde organización facturadora con los campos vigentes del sistema actual.
- [ ] **AFIP-02**: El flujo pendiente -> numeración -> CAE funciona en homologación con datos válidos.
- [ ] **AFIP-03**: La impresión usa correctamente los datos fiscales devueltos por el flujo AFIP actual.
- [ ] **AFIP-04**: Existe un gap analysis que documenta comportamiento actual, faltantes y obsolescencias antes de rediseños mayores.

### QA y Evidencia

- [ ] **QA-01**: Existe smoke coverage para organización facturadora y wizard de facturación.
- [ ] **QA-02**: Existe cobertura automatizable para los cambios introducidos en factura, pagos y contratos.
- [ ] **QA-03**: AFIP cuenta con evidencia manual y/o automatizada acorde a las restricciones del entorno de homologación.
- [ ] **QA-04**: Cada fase tiene UAT, evidencia esperada y gaps manuales explícitos.

### Cantidad Automática

- [ ] **AUTO-01**: Producto/servicio puede declararse con cantidad automática habilitada y una fuente seleccionable.
- [ ] **AUTO-02**: Cuando un ítem del contrato usa un producto con cantidad automática, la cantidad manual deja de editarse.
- [ ] **AUTO-03**: La facturación resuelve la cantidad desde las cuentas asociadas al contrato en v1.
- [ ] **AUTO-04**: La arquitectura deja preparada la expansión a nuevas fuentes sin rediseñar contrato ni producto.

## v2 Requirements

### Backlog futuro

- **BON-05**: Soporte para múltiples bonificaciones simultáneas por contrato.
- **PAY-05**: Soporte para más integraciones de cobro además de Mercado Pago y Pago Fácil.
- **AUTO-05**: Nuevas fuentes de cantidad automática para SmartPanics, VigiControl, TrackGuard y variantes por tipo.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Reemplazo total del motor de facturación | La meta es extender y recuperar el flujo actual, no reescribirlo completo |
| Nueva app de configuración separada | La configuración debe convivir con las pantallas actuales |
| Automatización 100% end to end de AFIP real | Depende de homologación, certificados y terceros externos |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BON-01 | Phase 1 | Pending |
| BON-02 | Phase 1 | Pending |
| BON-03 | Phase 1 | Pending |
| BON-04 | Phase 1 | Pending |
| INV-01 | Phase 2 | Pending |
| INV-02 | Phase 2 | Pending |
| INV-03 | Phase 2 | Pending |
| INV-04 | Phase 2 | Pending |
| PAY-01 | Phase 3 | Pending |
| PAY-02 | Phase 3 | Pending |
| PAY-03 | Phase 3 | Pending |
| PAY-04 | Phase 3 | Pending |
| EXP-01 | Phase 4 | Pending |
| EXP-02 | Phase 4 | Pending |
| EXP-03 | Phase 4 | Pending |
| AFIP-01 | Phase 5 | Pending |
| AFIP-02 | Phase 5 | Pending |
| AFIP-03 | Phase 5 | Pending |
| AFIP-04 | Phase 5 | Pending |
| QA-01 | Phase 6 | Pending |
| QA-02 | Phase 6 | Pending |
| QA-03 | Phase 6 | Pending |
| QA-04 | Phase 6 | Pending |
| AUTO-01 | Phase 7 | Pending |
| AUTO-02 | Phase 7 | Pending |
| AUTO-03 | Phase 7 | Pending |
| AUTO-04 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-08*
*Last updated: 2026-04-08 after initial MoneyGuard planning setup*
