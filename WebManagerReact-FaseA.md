# WebManager → React: Fase A (Paridad + Personalización básica)

Plan de trabajo para arrancar la reconstrucción de `WebManager` en React, dividido entre dos personas, sin tocar el módulo Sencha actual en producción.

## Objetivo de esta fase

Reconstruir las 4 pestañas de WebManager tal como funcionan hoy (mismos widgets, mismos datos, mismo refresco), corriendo en paralelo al módulo viejo, y sumar una primera capa de personalización: que el usuario pueda **mostrar/ocultar** los reportes que ya existen. Esto es el primer escalón hacia la Fase B (grid moldeable con drag & resize), pero acá no se construye el grid todavía — solo la capacidad de esconder/mostrar.

## Setup de trabajo

- **Rama**: `feature/webmanager-react-fase-a`, creada desde `origin/master`.
- **Carpeta nueva**: `softguard.workspace/apps/WebManagerReact` (no se toca `softguard.workspace/apps/WebManager`). El módulo viejo sigue sirviendo `/a/webmanager` sin cambios; el build nuevo corre en su propia ruta hasta el día del cutover, que es solo cambiar la `url` del módulo en el registro (`getDesktopData`).
- Mientras dure Fase A, el React app puede correr standalone (fuera del iframe del Desktop) para poder iterar rápido — se prueba embebido recién cuando hay paridad.

## Identidad visual (negro/grisáceo + naranja, marca Softguard)

- Paleta validada con la skill de dataviz (`node validate_palette.js "#d95926,#3987e5,#199e70,#e66767,#9085e9,#c98500" --mode dark --surface #121316` → ALL CHECKS PASS). Naranja de marca siempre primero en el orden categórico; el WARN de separación CVD entre rojo/aqua exige leyenda + label visible siempre (nunca color solo) — ya aplicado en `PieWidget`.
- Tokens en `src/theme.css` (CSS vars) y `src/widgets/charts/theme.ts` (para las opciones de ECharts).
- Profundidad visual sin salir de la paleta: gradientes (tinte más claro del mismo hex validado) + sombra + highlight en hover, en vez de charts 3D reales (`echarts-gl` es una dependencia pesada y no valía la pena para este alcance).
- **Cada card es resizeable a mano** (esquina inferior derecha, resize nativo del navegador) — el chart de adentro se redibuja solo vía `ResizeObserver` (`useAutoResizeChart`).
- **Cada card se puede reordenar arrastrando desde el título** (drag-and-drop nativo del navegador, sin librería nueva — deliberadamente liviano en vez de traer `react-grid-layout` ahora, que sigue siendo la base de la Fase B real con posiciones libres + persistencia).
- Ninguna de las dos (resize ni reorden) **persiste** entre recargas todavía; eso queda ligado a la misma decisión de persistencia (`MetaData` + el punto de seguridad pendiente) ya anotada para Fase B — no es trabajo nuevo, es el mismo punto abierto.

## Auth en dev standalone (resuelto)

Al conectar el primer widget real apareció "Missing Authorization Token". Investigado a fondo (incluyendo el código del backend, `Slbf.Services.Rest/Global.asax.cs`):

- Hay una validación de firma HMAC global (`_t`/`_n`/`_h`) en el backend, pero está gateada por config (`HMACINVALIDREQUEST`) y en `gcs.softguard.com` **no está bloqueando** — no hace falta replicarla para dev.
- El error real era que no había ningún token identificable en la request. El backend resuelve el usuario vía `oauth_token` (querystring), header `Authorization`, header `oauth_token`, o cookie `OAuth_Token`, en ese orden.
- El token hardcodeado de dev que usa el Ext original (`7D450B5B-D9C7-4836-96D3-D89856FBD7ED`, ver `Common.Application.getToken()`) **no sirve contra `gcs.softguard.com`** — es un token de otro ambiente. Devuelve `Invalid Token`.
- **Solución para dev standalone**: usar un `OAuth_Token` real, obtenido logueándose a mano en la app real y copiando el valor de la cookie. Se guarda en `softguard.workspace/apps/WebManagerReact/.env.local` (gitignorado, `VITE_DEV_OAUTH_TOKEN=...`) y `src/lib/api.ts` lo agrega como `?oauth_token=...` solo en modo dev (`import.meta.env.DEV`). En producción, embebido en el iframe de Desktop, no hace falta — ahí sí viaja la cookie de sesión real del dominio.
- **Cada persona que clone el repo necesita su propio `.env.local`** con su propio token (expira, es de sesión) — no hay nada que compartir ni commitear acá.

## Ojo con los nombres de campo del JSON real

El primer widget conectado (`EventosPendientesPorPrioridad`) reveló que el modelo ExtJS original no siempre es confiable como referencia 1 a 1: el modelo decía campo `prioridad` (minúscula) pero el JSON real devuelve `"Prioridad"` (mayúscula), y `cantidad` viene como **string** (`"387"`), no como número. Para cada widget nuevo, conviene pegarle una vez al endpoint real (con el token de dev) y mirar la respuesta cruda antes de tipar el `Row`, en vez de copiar los nombres de campo del `.js` viejo a ciegas.

## División de tareas

| Quién | A cargo de |
|---|---|
| **Fede** | Scaffolding del proyecto + pestañas **Estado de mi Central** y **Evolución de mi Central** |
| **Alejo** | Pestañas **Recepción de Eventos** e **Información de Cuentas** |

### Por qué se divide así

Cada widget es independiente (pega a su propio endpoint `/Rest/search/...`, sin estado compartido entre ellos), así que repartir por pestaña permite trabajar en paralelo sin pisarse. El único punto de coordinación real es el contrato del scaffolding — por eso Fede lo arma primero y lo comparte antes de que el compañero empiece a construir widgets sobre eso.

## Scaffolding (armado por Fede)

Ya está armado y commiteado en `softguard.workspace/apps/WebManagerReact` (Vite + React 18 + TypeScript, fijado a Vite 4.x por compatibilidad con Node 16 instalado):

1. **Proyecto base**: Vite + React + TS, conexión a `/Rest/...` (mismo dominio, cookie de sesión compartida — sin CORS). En dev standalone hay un proxy de Vite hacia el dominio real, pero **la sesión no viaja en dev standalone** (la cookie es del dominio real, no de localhost) — para ver datos reales de una cuenta logueada hace falta probar embebido en el iframe de Desktop más adelante, o mockear la respuesta.
2. **Wrapper de widget genérico** (`src/widgets/WidgetCard.tsx`): título, estado de loading/error, botón de refresh manual.
3. **Hook de datos** (`src/widgets/useWidgetData.ts`): TanStack Query, con `refetchInterval` a 60s (paridad con `webmanagerrefreshpanel`).
4. **Base de charts** (`src/widgets/charts/base.ts`): configuración común de ECharts (`echarts-for-react`) — paleta de colores, tooltip.
5. **Catálogo de widgets** (`src/widgets/catalog.ts`): registro tipado, mismo shape para todos:
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
6. **Estructura de pestañas** (`src/App.tsx`): layout de las 4 tabs (fijo por ahora, como hoy — sin drag/resize).
7. **Primer widget real, de punta a punta**: "Eventos pendientes por prioridad" (`/Rest/search/EventosPendientesPorPrioridad`), cableado completo como plantilla para el resto.

Con esto definido, el compañero solo tiene que agregar entradas al catálogo y armar el contenido específico de cada chart para sus 2 pestañas.

## Inventario de endpoints por pestaña (referencia)

**Fede — Estado de mi Central** — ✅ las 6 completas (bar/pie/grid genéricos vía `WidgetRenderer`)
- `/Rest/search/EventosPendientesPorPrioridad` ✅ — bar. Ojo: el JSON real usa `Prioridad` (mayúscula) y `cantidad` como string, distinto del modelo Ext viejo.
- `/Rest/search/EstadoDeEventosActuales` ✅ — pie (`situacion`/`cantidad`)
- `/Rest/search/Ultimos25EventosAlertas` ✅ — grid (columnas con ancho fijo + truncado, los campos de fecha/cuenta vienen con padding fijo del SP, hay que hacer `.trim()`)
- `/Rest/search/ResolucionDeEventosDelDia` ✅ — pie (`descripcion`/`cantidad`). Sin datos al momento de probar, pero el widget maneja el estado vacío.
- `/Rest/search/EventosPorDiaPorOperador` ✅ — pie (`operador`/`cantidad`). Sin datos al momento de probar.
- `/Rest/search/EventosPorTipoDeHoy` ✅ — bar horizontal (`tipo`/`cant`), labels largos truncados con tooltip.

**Fede — Evolución de mi Central** — ✅ las 3 completas (pestaña visible según permiso `dwm_idModules`/`dwm_idWeb`, eso queda pendiente para cuando se conecte el gate de permisos real)
- `/Rest/search/EvolucionCuentas12meses` ✅ — area/línea (`fecha_format`/`cantidad`)
- `/Rest/search/evolucionsmartpanics` ✅ — area/línea, misma forma
- `/Rest/search/evolucionvigicontrol` ✅ — area/línea, misma forma

**Hallazgo importante sobre estos 3 endpoints**: sin filtro de fecha devuelven el histórico completo (`EvolucionCuentas12meses` sin filtrar: **5006 filas**, desde 2011). El original nunca los carga sin filtro (`autoLoad:false` + filtro inicial de 365 días siempre puesto). Repliqué el toolbar 30 días / 60 días / 12 meses del Ext original como botones en cada card — cambiar el rango dispara un nuevo fetch con el filtro correspondiente, nunca sin filtro.

**Formato del filtro de fecha — no es el que parece.** Probé contra el backend real 3 formatos para `sts_tfechahora:GT`:
- ISO (`2026-07-16T21:52:49.203Z`) → **no filtra nada**, devuelve las 5006 filas igual.
- `M/D/YYYY` (`7/16/2026`) → **no filtra nada**, mismo resultado.
- `/Date(<ms epoch>)/` (formato viejo de ASP.NET AJAX, el mismo que usa `Ext.JSON.encodeDate` en `Application.js`) → **funciona** (30 días de filtro → 30 filas).

Quedó implementado en `src/lib/api.ts` (`dateGteFilter`). Cualquier otro endpoint que filtre por fecha en las pestañas que faltan probablemente necesita el mismo formato — probarlo primero contra el real antes de asumir ISO.

**Trampa con la que nos cruzamos**: si arman un array de `filters` directo en el body del componente (ej. `const filters = [dateGteFilter(...)]`, sin memoizar), `Date.now()` cambia en cada render → la queryKey de React Query cambia en cada render → dispara fetch tras fetch sin parar y el widget queda pegado en "Cargando...". Se resuelve con `useMemo(() => [dateGteFilter(...)], [dias])` — ver `TimeSeriesWidget.tsx`. Cualquier widget que arme un filtro dinámico (fecha, texto, lo que sea) tiene que memoizarlo por sus dependencias reales, no recalcularlo suelto en cada render.

**Alejo — Recepción de Eventos**
- `/Rest/search/CategorizacionDeEventos`
- `/Rest/search/CategorizacionDeEventosDelMes`
- `/Rest/search/ResolucionDeEventosPorMes`
- `/Rest/search/SearchEventosAutoprocesadosDelDia`
- `/Rest/search/AnalisisIPR30Dias`
- `/Rest/search/CantidadEventosPorReceptorPorCuenta`
- ~~`/Rest/search/AnalisisPG30Dias`~~ → no migrar, es código muerto (comentado en el original, ticket DS-6)

**Alejo — Información de Cuentas**
- `/Rest/search/EstadoDeCuenta`

**Pendiente de confirmar**: `gridflujosenalesreceptortotalview` → `/Rest/search/CantidadTotalEventosPorReceptorPorCuenta` no aparece referenciado en ninguna de las 4 vistas de pestaña del original. Confirmar si está anidado en otro widget o si es código huérfano antes de decidir si se migra.

## Onboarding para Alejo — cómo arrancar

Todo lo de acá arriba ya está resuelto y probado contra el backend real; el objetivo de esta sección es que puedas arrancar directo con tu sesión de Claude sin tener que redescubrir nada.

### 1. Levantar el proyecto

```bash
git fetch origin
git checkout feature/webmanager-react-fase-a
git pull
cd softguard.workspace/apps/WebManagerReact
npm install
npm run dev
```

Abre en `http://localhost:5183`. Vas a ver el shell con las 4 pestañas — "Estado de mi Central" y "Evolución de mi Central" ya tienen contenido (mío), "Recepción de Eventos" e "Información de Cuentas" van a estar vacías hasta que agregues tus widgets al catálogo.

**Node**: el proyecto está fijado a Vite 4.x porque el Node instalado acá era v16.14.2 (Vite 5+ pide Node 18+). Si tu máquina tiene Node 18+, no hace falta que cambies nada — el proyecto igual corre con Vite 4. Si te tira error de versión, avisá antes de tocar el `package.json`.

### 2. Tu propio token de dev (no el mío, no está commiteado)

Sin esto vas a ver "Missing Authorization Token" en cada widget. Pasos:
1. Logueate con tu usuario en la app real (`gcs.softguard.com`).
2. DevTools → Application/Storage → Cookies → copiá el valor de `OAuth_Token`.
3. Creá `softguard.workspace/apps/WebManagerReact/.env.local` (ya está en `.gitignore`, no se sube) con:
   ```
   VITE_DEV_OAUTH_TOKEN=tu-token-aca
   ```
4. Reiniciá `npm run dev`.

El token es tuyo, de tu sesión, expira — no lo compartas ni lo pegues en el repo. El mecanismo completo (por qué hace falta, qué formatos NO funcionan, cómo se resolvió) está documentado arriba en "Auth en dev standalone".

### 3. El patrón para agregar un widget

Por cada endpoint de tu lista (arriba, "Alejo — Recepción de Eventos" / "Alejo — Información de Cuentas"):

1. **Mirá el `.js` original** en `softguard.workspace/apps/WebManager/app/view/chart<nombre>view.js` (o `grid<nombre>view.js`) para saber qué tipo de chart es (`Ext.chart.PolarChart` con `pie3d` = pie; `Ext.chart.CartesianChart` con `bar3d` = bar; con `area`/filtro de fecha = serie de tiempo; `Ext.grid.GridPanel` = grid) y qué endpoint pega.
2. **No confíes en los nombres de campo del modelo Ext viejo.** Probá el endpoint real primero:
   ```bash
   TOKEN=$(grep VITE_DEV_OAUTH_TOKEN .env.local | cut -d= -f2)
   curl -s "http://127.0.0.1:5183/Rest/search/<Nombre>?oauth_token=${TOKEN}" | head -c 600
   ```
   Ya nos pasó que el modelo decía `prioridad` y el JSON real devuelve `Prioridad` — verificá siempre antes de tipar.
3. **Si es pie, bar o serie de tiempo**: no escribas un componente nuevo. Agregá una entrada al catálogo en `src/widgets/catalog.ts` (bloques `--- Alejo: ... ---` ya están marcados con TODO) con `chartType: 'pie' | 'bar' | 'area'`, `labelField`, `valueField` (y `horizontal: true` si son muchas categorías con nombres largos, `dateFilterField` si lleva filtro de fecha). Los componentes genéricos (`PieWidget`, `BarWidget`, `TimeSeriesWidget`) ya resuelven el resto vía `WidgetRenderer` — es el mismo patrón que usé para las 9 cards de mis pestañas, mirá esos catalog entries como ejemplo.
4. **Si es un grid** (como `Ultimos25EventosAlertas` en mi pestaña): las columnas son específicas por endpoint, así que no hay componente genérico — copiá la estructura de `src/widgets/UltimosEventosGridWidget.tsx` como base (mismo patrón: `table-layout: fixed`, `.trim()` en campos con padding fijo del SP, `text-overflow: ellipsis` + `title` para texto largo).
5. **Si el endpoint necesita filtro de fecha** (`sts_tfechahora:GT` u otro campo de fecha): usá `dateGteFilter` de `src/lib/api.ts`, y memoizá el array de filtros con `useMemo` por sus dependencias reales — si lo recalculás suelto en el body del componente entra en loop infinito de requests (nos pasó, ver más abajo el `TimeSeriesWidget.tsx` como referencia). Y ojo con el formato: **no es ISO ni M/D/YYYY**, es `/Date(<ms>)/` — ver la sección de arriba.

### 4. Trabajando en la misma rama que yo

Compartimos `feature/webmanager-react-fase-a`. Como tocamos pestañas distintas, el único archivo realmente compartido es `src/widgets/catalog.ts` — hacé `git pull` antes de arrancar cada sesión para tener mis entradas actualizadas, y agregá las tuyas solo en los bloques `--- Alejo: ... ---` que ya están marcados, para minimizar conflictos de merge. El resto de tus archivos (`RecepcionGridWidget.tsx` o lo que sea que crees) son nuevos, no deberían pisarse con nada mío.

## Personalización básica: mostrar/ocultar reportes

Esto es lo nuevo de esta fase respecto a una migración 1 a 1:

- Cada widget del catálogo tiene un toggle de visibilidad (mostrar/ocultar), accesible desde un ícono simple en cada pestaña (no hace falta un panel selector completo todavía — eso es Fase B).
- **Persistencia — punto abierto, decidir antes de implementar**: la idea original era guardar esto en el mismo mecanismo de `MetaData` por usuario/módulo que ya usa `SecurityRestService.cs`. Ese endpoint hoy no tiene control de autorización — antes de escribir preferencias reales de usuario ahí hay que resolver o al menos confirmar ese punto. Mientras no esté resuelto, la opción segura para Fase A es guardar la preferencia en `localStorage` (por navegador, no por cuenta) y migrar a backend cuando el endpoint esté validado.
- El show/hide de Fase A es intencionalmente simple: solo visible/oculto, sin posición ni tamaño — eso lo aporta `react-grid-layout` en Fase B, reusando el mismo catálogo.

## Fuera de alcance de esta fase

- **Nota**: terminamos sumando un resize y un reorden livianos (nativos del navegador, sin `react-grid-layout`) porque surgió naturalmente charlando el diseño — ver "Identidad visual" arriba. Lo que sigue fuera de alcance es la versión *real* de Fase B:
- Grid con posiciones libres persistidas (`react-grid-layout` + guardado de layout por cliente).
- Selector lateral de widgets para agregar nuevos al grid.
- Export/import de diseño entre clientes.
- Persistencia real en backend de cualquier preferencia (visibilidad, orden, tamaño) — bloqueado por el punto de seguridad de `MetaData` (ver arriba).

## Cómo sigue el proceso

1. ✅ **Scaffolding armado** (proyecto, wrapper, hook de datos, catálogo, base de charts, primer widget real) → verificado que compila y buildea con el Node instalado (v16.14.2, por eso todo fijado a Vite 4.x).
2. **Trabajo en paralelo**: Fede completa sus 2 pestañas, el compañero completa las otras 2, ambos sobre el mismo catálogo/contrato.
3. **Validación de paridad**: comparar datos y comportamiento contra el WebManager viejo (mismos números, mismo refresco) antes de dar la fase por cerrada.
4. **Show/hide**: una vez con paridad de datos, se agrega el toggle de visibilidad por widget.
5. **Cierre de Fase A**: demo interna, decidir si la persistencia de preferencias pasa a backend (según el estado del punto de seguridad de `MetaData`).
6. **Fase B** arranca recién ahí: grid moldeable, selector de widgets, export/import — descrito en `ModuleManager.md`.

---
*Documento de trabajo — Fase A de la migración de WebManager a React.*
