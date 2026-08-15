# Minutas - MoneyGuard Facturación

**Fecha:** 2026-04-08

## Contexto

Se revisó el alcance funcional y técnico necesario para mejorar el módulo de facturación de MoneyGuard, priorizando entregas pequeñas pero utilizables por negocio.

## Participantes mencionados

- Nico
- Thiago
- Equipo funcional/técnico

## Temas tratados

- Bonificación en contratos
- Configuración fija y dinámica de factura
- Integraciones de cobro en factura
- Exportación TXT
- Revisión de integración AFIP
- Escenarios Playwright
- Facturador dinámico por cantidades automáticas

## Lo conversado

- Primero se evaluó la idea de crear un producto de bonificación con precio negativo.
- Durante la revisión se confirmó que esa alternativa no funciona como se esperaba.
- A partir de eso se decidió avanzar directamente con la solución larga: bonificación configurada en el contrato.
- La bonificación del contrato debe permitir monto o porcentaje, tener descripción y fecha de vencimiento.
- Si la bonificación no tiene fecha hasta, debe considerarse permanente.
- La organización facturadora hoy ya permite logo, pero necesita poder configurar más contenido en la factura.
- La factura debe soportar contenido fijo y contenido dinámico.
- El contenido fijo debería poder armarse en markdown y admitir adjuntos o imágenes embebidas.
- En CRM ya existe un mecanismo multipart que convierte archivos a base64; se propuso reutilizar ese enfoque.
- Mercado Pago debe aparecer como bloque fijo en el footer de la factura.
- También se necesita un nuevo texto/plantilla de observaciones con variables reemplazables.
- Las variables van a salir de datos del cliente, organización del cliente y contrato.
- Para Pago Fácil se necesita una integración configurable con una parte fija a nivel organización y otra parte dinámica por cliente/comprobante.
- Esa integración debe darse de alta desde organización facturadora, con formulario propio.
- Cuando la organización tenga la integración activa, la factura debería mostrar automáticamente el código de barras correspondiente.
- Para la exportación TXT se discutió si agregarla al wizard o hacerla como reporte.
- Se acordó que es mejor hacerlo como reporte/handler, pidiendo el mes facturado.
- Sobre AFIP, se indicó que existe una integración previa, pero hay que revisarla a fondo porque fue implementada hace años.
- También se detectó que en configuración de organización facturadora dejaron de verse AFIP y otras integraciones.
- Sobre el facturador dinámico, se explicó que hoy el contrato factura cantidades fijas y no toma automáticamente las entidades asociadas al contrato.
- Se definió que la primera iteración debe dejar un framework genérico de cantidad automática, pero implementando primero la fuente `Cuentas`.
- La idea futura es extenderlo luego a SmartPanics, VigiControl, TrackGuard y otros casos.
- Se acordó ir armando backlog y entregar primero lo más chico y de mayor valor.

## Decisiones tomadas

- Se descarta la estrategia de producto negativo para bonificación.
- La bonificación se resuelve a nivel contrato.
- La factura tendrá contenido fijo y dinámico.
- Mercado Pago entra como bloque fijo.
- Pago Fácil entra como integración configurable.
- La exportación TXT se hace como reporte con handler.
- AFIP requiere revisión integral y escenarios de prueba.
- La cantidad automática se diseña genérica, pero la implementación inicial será solo para `Cuentas`.

## Pendientes de definición

- Confirmar si el límite `hasta 90` aplica solo a porcentaje.
- Confirmar si v1 soporta una sola bonificación por contrato.
- Cerrar catálogo de variables disponibles para observaciones dinámicas.
- Confirmar layout exacto del TXT.
- Confirmar formato AFIP actual esperado en impresión.
- Confirmar campos definitivos de la integración Pago Fácil.

## Próximos pasos

- Convertir estas definiciones en backlog formal.
- Crear tareas separadas de análisis BA, desarrollo y validación.
- Priorizar entregas cortas de mayor impacto operativo.
