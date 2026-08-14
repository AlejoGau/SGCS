# Module Manager (WebManager) → React: plan de migración

Análisis del módulo `WebManager` actual (Sencha ExtJS) y plan para reconstruirlo en React como un dashboard moldeable por cliente (drag & resize) con export/import de diseño.

## Cómo está armado hoy (`apps/WebManager`)

- **4 pestañas fijas**, layout `vbox`/`hbox` escrito a mano, igual para todos los clientes:
  - Estado de mi Central (`WebManagerEstadoDeMiCentralView.js`)
  - Evolución de mi Central (`WebManagerEvolucionDeMiCentralView.js`)
  - Recepción de Eventos (`WebManagerRecepcionDeEventosView.js`)
  - Información de Cuentas (`WebManagerInformacionDeCuentasView.js`)
- Qué pestañas ve cada cliente depende de sus permisos (`dwm_idModules`, chequeado en `WebManagerController.js` contra el modelo `UsersDesktopWebModulosModelSearch`).
- Adentro de cada pestaña hay entre 15 y 20 **widgets de gráficos** (`app/view/chart*.js`), cada uno pidiendo sus datos a su propio endpoint `/Rest/search/<NombreDelReporte>` (confirmado: `chartestadodecuentasview.js` → `/Rest/search/EstadoDeCuenta`).
- Cada widget está envuelto en un `webmanagerrefreshpanel` (`WebManagerRefreshPanelController.js`) que dispara un evento `refreshData` — cada widget ya es autónomo para cargar sus propios datos.
- **No hay nada moldeable hoy**: ni drag, ni resize, ni reordenar. Layout fijo en código, igual para todos.

## Plan para la versión en React

### 1. Catálogo de widgets
Convertir cada `chart*view.js` en una entrada de un registro: `{ id, título, endpoint, tamaño por defecto }`. Los ~20 widgets ya están identificados en el código actual — falta mapear el endpoint REST exacto de cada uno (mismo patrón `/Rest/search/...` en todos).

### 2. Librería de gráficos — ECharts (`echarts-for-react`)
Cubre barras, líneas, torta, área, y variantes cercanas a los 3D que usa hoy (`Bar3D`, `Pie3D`). Alternativa más liviana: Recharts, pero se queda corta para los gráficos menos comunes (flujo de señales, evolución 12 meses con varias series).

### 3. Fetching de datos — TanStack Query, un hook por widget
Reemplaza el patrón `fireEvent('refreshData')`: cada widget usa `useQuery` con `refetchInterval` configurable + botón de refresh manual (`refetch()`). Mismo comportamiento que hoy, sin el mecanismo de eventos ExtJS.

### 4. Drag & resize — `react-grid-layout`
Estándar de la industria para esto (Grafana y similares usan el mismo patrón): grilla con drag, resize, breakpoints responsive. Su estado de layout es un array JSON plano:
```json
[{ "i": "widget-id", "x": 0, "y": 0, "w": 4, "h": 3 }]
```
Ese array **es** el export/import — no hay que inventar un formato nuevo.

### 5. Persistencia del diseño por cliente — reusar el `MetaData` que ya existe
GCS ya tiene un mecanismo genérico de `MetaData` por usuario/módulo (`SecurityRestService.cs`):
- `PUT Modules/{ModuleId}/MetaData` — guardar
- `GET Modules/{ModuleId}/MetaData` (o `UserData/{UserId}/MetaData`) — leer

Guardar ahí el JSON de layout de `react-grid-layout`, reusando el mismo patrón que ya usa el sistema de permisos — sin backend nuevo.
- **Exportar** = descargar ese JSON como archivo.
- **Importar** = subirlo (o copiarlo de un cliente a otro, para admins).

### 6. Selector de widgets
Panel lateral, filtrado por los mismos permisos `dwm_idModules` que ya existen hoy, desde donde el cliente arrastra al grid el widget que quiere agregar — solo los que tiene habilitados.

## Orden sugerido

No armar drag&drop desde el día uno:

1. **Fase A — Paridad**: migrar el contenido fijo de las 4 pestañas tal cual está hoy (mismos widgets, mismo layout por default), sin editable todavía. Sirve para comparar contra el sistema viejo con los mismos datos.
2. **Fase B — Moldeable**: sumar `react-grid-layout` + selector de widgets + export/import de diseño, una vez que la paridad de datos ya está validada.

## Referencias cruzadas

- El patrón de `MetaData` por usuario/módulo ya se investigó a fondo por el hallazgo de seguridad en el endpoint de permisos — ver memoria `gcs-security-hole-setsecurity-sp` (el mismo endpoint `SecurityRestService.cs` que se reusaría acá para guardar layouts NO tiene control de autorización hoy; si se reusa para esto, revisar ese punto también).
- Contexto general de la migración y evidencia usada en el pitch: ver memoria `softguard-pitch-migracion-artifact`.
