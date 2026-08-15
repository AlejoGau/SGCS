# Eventos: análisis y arquitectura

Documentos de trabajo sobre el flujo de eventos de SoftGuard y su evolución hacia
un pipeline en tiempo real.

Todos son borradores de análisis, no especificaciones aprobadas.

## Orden de lectura

| # | Documento | Qué responde |
|---|---|---|
| 1 | [`flujo-principal-eventos.md`](flujo-principal-eventos.md) | Cómo funciona hoy el camino de recepción, atención y depuración. |
| 2 | [`productores-de-eventos.md`](productores-de-eventos.md) | Quién genera eventos: inventario de ~60 productores en seis familias. |
| 3 | [`arquitectura-eventos-tiempo-real.md`](arquitectura-eventos-tiempo-real.md) | Arquitectura objetivo, garantías, opciones de broker y estrategia de migración. |
| 4 | [`contrato-ingress-iprs.md`](contrato-ingress-iprs.md) | Contrato de ingreso entre productores externos e Ingress API. |

El documento 2 conviene leerlo antes del 3: cambia qué componentes necesita la
arquitectura y por dónde se puede cortar la migración.

## Estado de las definiciones

### Bloqueantes abiertos

1. **`SGSP_pRecepcionINS`** — único punto de creación de eventos del sistema, y
   el único objeto del camino principal sin definición versionada. Prerrequisito
   para instrumentar la migración.
2. **Agregado: alarma o cuenta** — el invariante de atención actual es por cuenta.
   Determina clave de partición, contrato de comandos y esquema.
3. **Multi-tenancy** — `tenantId` no existe hoy. Si es constante, buena parte del
   modelo propuesto es costo sin beneficio.

### Resuelto respecto de la primera versión

- Significado de los estados `6` (modo prueba), `7` (cuenta inhabilitada) y `8`
  (llamado telefónico), con evidencia en código.
- `AlarmaGenerar` no es el embudo del sistema; `SGSP_pRecepcionINS` sí.
- La arquitectura objetivo necesita un servicio de deadlines durables que no
  estaba previsto.

## Método

Los conteos y afirmaciones sobre el código provienen de análisis estático sobre
`database/**/*.sql` y del código del workspace. No sustituyen la validación
contra una base desplegada: el repositorio contiene objetos legados y no permite
saber qué está habilitado en producción.

Cada documento indica sus limitaciones y lo que queda por verificar.
