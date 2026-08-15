# Playwright Matrix - MoneyGuard Facturación

## Objetivo

Definir qué se automatiza, qué queda manual y qué depende de terceros o de preparación especial para el roadmap de facturación MoneyGuard.

## Repositorio y anclas

- Suite principal: `softguard.workspace/qa-automation`
- Foco UI: `softguard.workspace/apps/WebMG`
- Pantallas de configuración: `softguard.workspace/apps/AdministratorSearch`
- Dependencias externas: AFIP homologación, certificados y datos fiscales reales

## Datos de prueba mínimos

| Dataset | Uso | Fases |
|---------|-----|-------|
| Organización facturadora base con logo | Validar que no se rompa la configuración existente | 2, 3, 5, 6 |
| Organización con bloque Mercado Pago | Validar bloque fijo en factura | 3, 6 |
| Organización con Pago Fácil configurado | Validar código de barras y render | 3, 6 |
| Cliente/contrato con bonificación fija | Validar descuento por monto | 1, 6 |
| Cliente/contrato con bonificación porcentual | Validar descuento por porcentaje y vigencia | 1, 6 |
| Contrato con cuentas asociadas | Validar cantidad automática | 7 |
| Organización con AFIP homologación | Validar configuración y flujo CAE | 5, 6 |

## Smoke Coverage

| Scenario | Phase | Tipo | Automatización objetivo | Notas |
|----------|-------|------|-------------------------|-------|
| Alta/edición de organización facturadora | 3, 5 | Smoke | Sí | Cubrir visibilidad de integraciones |
| Wizard de facturación abre y completa corrida base | 1, 6 | Smoke | Sí | Verificar que cambios no rompan flujo base |
| Impresión de comprobante estándar | 2, 3, 6 | Smoke | Sí | Validar render PDF o preview si existe |
| Reporte TXT por mes | 4, 6 | Smoke | Parcial | Puede requerir validación del archivo descargado |

## Happy Path y Regresión

| Scenario | Phase | Tipo | Automatización objetivo | Datos |
|----------|-------|------|-------------------------|-------|
| Bonificación por monto vigente | 1 | Happy path | Sí | Contrato con descuento fijo |
| Bonificación por porcentaje vigente | 1 | Happy path | Sí | Contrato con descuento porcentual |
| Bonificación vencida no aplicada | 1 | Regresión | Sí | Contrato con fecha vencida |
| Markdown fijo + observaciones dinámicas | 2 | Happy path | Sí | Organización con template y adjunto |
| Mercado Pago fijo visible en factura | 3 | Happy path | Sí | Organización con QR fijo |
| Pago Fácil visible con integración activa | 3 | Happy path | Sí | Organización con metadata fija |
| Integraciones visibles en alta/edición | 3 | Regresión | Sí | AFIP + otras integraciones históricas |
| TXT con datos / sin datos | 4 | Regresión | Parcial | Puede requerir asserts sobre contenido descargado |
| Configuración AFIP visible | 5 | Smoke | Sí | Sin necesidad de llegar a homologación real |
| Factura pendiente -> CAE -> impresión | 5, 6 | Regresión | Parcial | Depende de homologación disponible |
| Cantidad automática por cuentas | 7 | Happy path | Sí | Contrato con cuentas asociadas |
| Cambio posterior de cuentas impacta próxima facturación | 7 | Regresión | Sí | Dataset mutable o setup previo |

## Manual / Condicional

| Scenario | Motivo | Fase |
|----------|--------|------|
| Emisión AFIP en homologación con certificado válido | Requiere terceros, CUIT y credenciales vigentes | 5, 6 |
| Validación fiscal exacta del artefacto impreso AFIP | Puede depender de criterio normativo actualizado | 5 |
| Verificación del layout definitivo del TXT con negocio | Necesita aprobación humana del archivo final | 4 |

## Evidencia esperada por fase

| Phase | Evidencia mínima |
|-------|------------------|
| 1 | Capturas o logs de factura con y sin bonificación |
| 2 | PDF con markdown, adjuntos y observaciones reemplazadas |
| 3 | Factura con Mercado Pago y Pago Fácil; pantalla de integraciones visible |
| 4 | Archivo TXT generado y ejemplo validado |
| 5 | Evidencia homologación o gap explícito documentado |
| 6 | Reporte Playwright + lista de escenarios manuales |
| 7 | Factura calculada con cuentas asociadas y regresión sin cuentas |

## Criterio de automatización

- Automatizar todo lo que sea estable, repetible y no dependa de terceros externos.
- Mantener como manual lo que requiera homologación AFIP, certificados o aprobación explícita de negocio.
- Cuando un caso sea parcialmente automatizable, automatizar la preparación y el smoke, y documentar el tramo manual restante en el `UAT.md` de la fase.
