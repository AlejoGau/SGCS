# Decisiones y Supuestos - MoneyGuard Facturación

**Fecha de corte:** 2026-04-08

## Decisiones cerradas

| ID | Decisión | Impacto |
|----|----------|---------|
| DEC-01 | No se usará producto con precio negativo para bonificación | Obliga a modelar descuento en contrato y motor de facturación |
| DEC-02 | La bonificación vive en el contrato y no como workaround de catálogo | Impacta UI, persistencia, cálculo e impresión |
| DEC-03 | La factura incorporará bloques fijos y dinámicos en el pie | Impacta organización facturadora y render PDF/mail |
| DEC-04 | Mercado Pago será bloque fijo por organización | No requiere lógica dinámica por factura |
| DEC-05 | Pago Fácil será integración configurable por organización | Requiere metadata fija + armado dinámico por comprobante |
| DEC-06 | La exportación TXT va como reporte/handler | Se evita acoplarla a la corrida del wizard |
| DEC-07 | AFIP debe revisarse antes de rediseñar nada | Primero medir, luego corregir |
| DEC-08 | La visibilidad de integraciones en organización facturadora es parte del alcance | Incluye AFIP y otras integraciones ocultas |
| DEC-09 | La cantidad automática se diseña genérica pero v1 implementa solo `Cuentas` | Permite evolución futura sin bloquear la primera entrega |
| DEC-10 | El trabajo se ejecutará fase por fase con artefactos GSD | Cada fase debe ser planificable y ejecutable por agentes |

## Supuestos vigentes

| ID | Supuesto | Riesgo si cambia |
|----|----------|------------------|
| SUP-01 | V1 soporta una sola bonificación activa por contrato | Medio |
| SUP-02 | El límite `hasta 90` aplica al porcentaje, no al monto fijo | Medio |
| SUP-03 | `org_cmetadata` es el mejor punto de extensión para contenido fijo/observaciones | Bajo |
| SUP-04 | El patrón multipart/base64 de CRM se puede reutilizar para adjuntos embebidos | Bajo |
| SUP-05 | El layout TXT se puede cerrar sin rediseñar el wizard de facturación | Bajo |
| SUP-06 | AFIP homologación seguirá requiriendo validación manual asistida | Medio |
| SUP-07 | La cantidad automática debe mirar cuentas asociadas al contrato y no del cliente en general | Bajo |

## Dudas a resolver por BA

- Validar con negocio si se admite más de una bonificación por contrato en futuras iteraciones.
- Confirmar catálogo mínimo de variables para observaciones dinámicas.
- Confirmar si el código de barras Pago Fácil requiere formato o checksum adicional.
- Confirmar si AFIP impone nuevo QR o si el flujo vigente de impresión sigue aceptable para esta etapa.
- Confirmar naming y contenido final del TXT exportado.

## Uso de este documento

- Referenciar en `CONTEXT.md` cuando una decisión ya esté cerrada.
- Convertir supuestos en definiciones cerradas antes de ejecutar desarrollo que dependa de ellos.
- Mantener sincronizado con `BACKLOG-JIRA.md` y `ROADMAP.md` si cambia el alcance.
