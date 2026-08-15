# Importante: Eto se va a trabajar PRIMERO en el repo de gcs.


# WebManager → React: Fase A (Paridad + Personalización básica)

Plan de trabajo para arrancar la reconstrucción de `WebManager` en React, dividido entre dos personas, sin tocar el módulo Sencha actual en producción.

## Objetivo de esta fase

Reconstruir las 4 pestañas de WebManager tal como funcionan hoy (mismos widgets, mismos datos, mismo refresco), corriendo en paralelo al módulo viejo, y sumar una primera capa de personalización: que el usuario pueda **mostrar/ocultar** los reportes que ya existen. Esto es el primer escalón hacia la Fase B (grid moldeable con drag & resize), pero acá no se construye el grid todavía — solo la capacidad de esconder/mostrar.

## Setup de trabajo

- **Rama nueva**, separada de `master`, dedicada a este desarrollo.
- **Carpeta nueva** para el proyecto React (no se toca `softguard.workspace/apps/WebManager`). El módulo viejo sigue sirviendo `/a/webmanager` sin cambios; el build nuevo corre en su propia ruta hasta el día del cutover, que es solo cambiar la `url` del módulo en el registro (`getDesktopData`).
- Mientras dure Fase A, el React app puede correr standalone (fuera del iframe del Desktop) para poder iterar rápido — se prueba embebido recién cuando hay paridad.

## División de tareas

| Quién | A cargo de |
|---|---|
| **Fede** | Scaffolding del proyecto + pestañas **Estado de mi Central** y **Evolución de mi Central** |
| **[Compañero/a — a definir]** | Pestañas **Recepción de Eventos** e **Información de Cuentas** |

### Por qué se divide así

Cada widget es independiente (pega a su propio endpoint `/Rest/search/...`, sin estado compartido entre ellos), así que repartir por pestaña permite trabajar en paralelo sin pisarse. El único punto de coordinación real es el contrato del scaffolding — por eso Fede lo arma primero y lo comparte antes de que el compañero empiece a construir widgets sobre eso.

## Scaffolding (a cargo de Fede — bloqueante para el resto)

Antes de que la segunda persona pueda arrancar sus 2 pestañas, tiene que estar definido y commiteado:

1. **Proyecto base**: setup de React, routing/entry point, conexión a `/Rest/...` (mismo dominio, cookie de sesión compartida — sin CORS).
2. **Wrapper de widget genérico**: componente base que todo widget usa (título, estado de loading/error, refresh manual, contenedor de card).
3. **Hook de datos**: `useQuery` (TanStack Query) parametrizado por endpoint, con `refetchInterval` (paridad con el refresco cada 60s que tiene hoy `webmanagerrefreshpanel`).
4. **Base de charts**: configuración común de ECharts (`echarts-for-react`) — paleta de colores, tooltip, responsive.
5. **Catálogo de widgets**: registro tipado, mismo shape para todos:
   ```ts
   type WidgetDef = {
     id: string;
     title: string;
     endpoint: string;   // /Rest/search/<Nombre>
     tab: 'estado' | 'evolucion' | 'recepcion' | 'cuentas';
     chartType: 'pie' | 'bar' | 'line' | 'area' | 'grid';
     defaultVisible: boolean;
   }
   ```
   Este catálogo es la pieza clave para el show/hide: cada pestaña se renderiza iterando los widgets de ese `tab` que estén visibles.
6. **Estructura de pestañas**: layout de las 4 tabs (fijo por ahora, como hoy — sin drag/resize).

Con esto definido, el compañero solo tiene que agregar entradas al catálogo y armar el contenido específico de cada chart para sus 2 pestañas.

## Inventario de endpoints por pestaña (referencia)

**Fede — Estado de mi Central**
- `/Rest/search/EventosPendientesPorPrioridad`
- `/Rest/search/EstadoDeEventosActuales`
- `/Rest/search/Ultimos25EventosAlertas`
- `/Rest/search/ResolucionDeEventosDelDia`
- `/Rest/search/EventosPorDiaPorOperador`
- `/Rest/search/EventosPorTipoDeHoy`

**Fede — Evolución de mi Central** (pestaña visible según permiso `dwm_idModules`/`dwm_idWeb`)
- `/Rest/search/EvolucionCuentas12meses`
- `/Rest/search/evolucionsmartpanics`
- `/Rest/search/evolucionvigicontrol`

**Compañero/a — Recepción de Eventos**
- `/Rest/search/CategorizacionDeEventos`
- `/Rest/search/CategorizacionDeEventosDelMes`
- `/Rest/search/ResolucionDeEventosPorMes`
- `/Rest/search/SearchEventosAutoprocesadosDelDia`
- `/Rest/search/AnalisisIPR30Dias`
- `/Rest/search/CantidadEventosPorReceptorPorCuenta`
- ~~`/Rest/search/AnalisisPG30Dias`~~ → no migrar, es código muerto (comentado en el original, ticket DS-6)

**Compañero/a — Información de Cuentas**
- `/Rest/search/EstadoDeCuenta`

**Pendiente de confirmar**: `gridflujosenalesreceptortotalview` → `/Rest/search/CantidadTotalEventosPorReceptorPorCuenta` no aparece referenciado en ninguna de las 4 vistas de pestaña del original. Confirmar si está anidado en otro widget o si es código huérfano antes de decidir si se migra.

## Personalización básica: mostrar/ocultar reportes

Esto es lo nuevo de esta fase respecto a una migración 1 a 1:

- Cada widget del catálogo tiene un toggle de visibilidad (mostrar/ocultar), accesible desde un ícono simple en cada pestaña (no hace falta un panel selector completo todavía — eso es Fase B).
- **Persistencia — punto abierto, decidir antes de implementar**: la idea original era guardar esto en el mismo mecanismo de `MetaData` por usuario/módulo que ya usa `SecurityRestService.cs`. Ese endpoint hoy no tiene control de autorización — antes de escribir preferencias reales de usuario ahí hay que resolver o al menos confirmar ese punto. Mientras no esté resuelto, la opción segura para Fase A es guardar la preferencia en `localStorage` (por navegador, no por cuenta) y migrar a backend cuando el endpoint esté validado.
- El show/hide de Fase A es intencionalmente simple: solo visible/oculto, sin posición ni tamaño — eso lo aporta `react-grid-layout` en Fase B, reusando el mismo catálogo.

## Fuera de alcance de esta fase

- Drag & resize del layout (`react-grid-layout`).
- Selector lateral de widgets para agregar nuevos al grid.
- Export/import de diseño entre clientes.
- Persistencia real en backend de la preferencia de visibilidad (ver punto de seguridad arriba).

## Cómo sigue el proceso

1. **Fede arma el scaffolding** (proyecto, wrapper, hook de datos, catálogo, base de charts) → primer commit compartido.
2. **Trabajo en paralelo**: Fede completa sus 2 pestañas, el compañero completa las otras 2, ambos sobre el mismo catálogo/contrato.
3. **Validación de paridad**: comparar datos y comportamiento contra el WebManager viejo (mismos números, mismo refresco) antes de dar la fase por cerrada.
4. **Show/hide**: una vez con paridad de datos, se agrega el toggle de visibilidad por widget.
5. **Cierre de Fase A**: demo interna, decidir si la persistencia de preferencias pasa a backend (según el estado del punto de seguridad de `MetaData`).
6. **Fase B** arranca recién ahí: grid moldeable, selector de widgets, export/import — descrito en `ModuleManager.md`.

---
*Documento de trabajo — Fase A de la migración de WebManager a React.*
