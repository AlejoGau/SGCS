# DK-1188 - SofIA: Rutas de verificacion de video (Plan)

## Resumen rapido
- Backend listo: REST publicados y probados.
- Las rutas SofIA no requieren asignar operador humano.
- Scheduler expuesto via endpoint existente (mismo que rutas clasicas).
- `sra_cConfig` se almacena como JSON hasta cerrar el modelo definitivo.
- Los modulos nuevos conviven con el stack actual sin reutilizar vistas legacy.

## Alcance funcional
- ABM de Planes de Control (rutas SofIA) por cuenta.
- ABM de Configuracion de Camaras (puntos) con selector desde inventario de video.
- ABM de Programaciones para ejecutar cada plan.
- Contenedor SofIA dentro de DealerSearch con pestañas dedicadas.
- Accion de regenerar plan que dispara el scheduler.

## Modelo de datos
- **Planes** `/Rest/SV_Routes/`: campos `svr_cName`, `svr_dDateStart`, `svr_iTime`, `svr_iParallel`, `svr_cRouteType`, `svr_iCuentaId`.
- **Configuraciones de camara** `/Rest/SV_Route_AnalysisPoints/`: campos `sra_iRouteId`, `sra_iOrder`, `sra_cReference`, `sra_cCameraType`, `sra_iCameraRefId`, `sra_cConfig` (JSON).
- **Programas** `/Rest/SV_Route_Programs/`: `srp_cProgramType`, `srp_iStartHour`, `srp_iStartMinutes`, `srp_iDayOfWeek`, `srp_iDayOfMonth`.
- **Camaras disponibles** `SofiaVideoData`: `video_id`, `nombre`, `source`, `iidCuenta`, etc.

## Componentes previstos (Common) (Common) (Common)
### Modelos y stores
- `SVRoutesModel` / `SVRoutesSearchModel`.
- `SVRouteAnalysisPointModel` / `SVRouteAnalysisPointSearchModel`.
- `SVRouteAnalysisPointsModel` / `SVRouteAnalysisPointsSearchModel`.
- `SVRouteProgramsModel` / `SVRouteProgramsSearchModel`.
- `SofiaVideoDataSearchModel` (solo search).

### Vistas
- `SVRoutesGridView` y `SVRoutesFormView` (planes).
- `SVRouteAnalysisPointsGridView` y `SVRouteAnalysisPointFormView` (configuraciones de camara).
- `SVRouteProgramsGridView` y `SVRouteProgramFormView` (horarios).
- `SofiaCameraConfigPanel` (UI sobre `sra_cConfig`).
- (Opcional) `SVRoutesPointsMapView`.

### Controladores
- `SVRoutesGridController`, `SVRoutesFormController`.
- `SVRouteAnalysisPointsGridController`, `SVRouteAnalysisPointFormController`.
- `SVRouteProgramsGridController`, `SVRouteProgramFormController`.
- (Opcional) `SVRoutesPointsMapController`.

## Integracion DealerSearch
- Agregar entrada "SofIA VideoVerificacion" en `Common.store.WebDealerSecurityModulesStore` que abre `cuentasofiaview`.
- Stubs DealerSearch* que extienden Common para grid/form/puntos/programas.
- Registrar controladores en `app.js` de DealerSearch si se usa lista explicita.

## Contenedor SofIA (Cuenta)
- `Common.view.CuentaSofIAView` agrupa pestañas: `SofiaRoutesTabView`, `SofiaCheckPointsTabView`, `SofiaCalendarTabView`.
- Controladores asociados (`CuentaSofIAController`, `SofiaRoutesTabController`, `SofiaCheckPointsTabController`, `SofiaCalendarTabController`).
- Cada pestaña reenvia `record`/`cuentaId` a sus vistas hijas.

## Milestones
1. Modelos y stores comunes (SV* + SofiaVideoData).
2. Grid/form de Planes de Control.
3. Grid/form de Configuracion de Camaras con selector y editor JSON.
4. Grid/form de Programaciones.
5. Accion "Regenerar" en grid de planes (scheduler).
6. Integrar contenedor SofIA y acceso en DealerSearch.
7. QA end-to-end (crear plan, agregar configuraciones, programar, regenerar).

## Estado actual
### Hecho
- Contenedor SofIA por cuenta y registro en menu General.
- Grid/form de Planes de Control con nueva terminologia y sin usuario.
- Grid de configuraciones reducido (nombre + tipo) con textos alineados.
- Selector de camaras SofIA integrado al formulario: filtra por cuenta, precarga tipo/ID, obliga seleccion.
- Panel `SofiaCameraConfigPanel` inicial con toggles/sensibilidades y serializacion JSON.
- Formulario de configuraciones sincroniza `Name` con `sra_cReference` para cumplir `SV_Route_AnalysisPointsIns`.
- Pestaña global `SofiaCheckPointsTabView` removida del contenedor SofIA tras deprecar el objeto legacy.
- Limpieza de charset (ASCII) en nuevos archivos para evitar escapes en build.

### Pendiente (detalle)
- Ampliar `SofiaCameraConfigPanel` con el resto de opciones vistas en mock (rangos horarios, sentido, regiones, etc.) y validaciones por tipo.
- Persistir orden de configuraciones (`sra_iOrder`) con acciones subir/bajar.
- Construir formularios y stores para programaciones (Milestone 4) y wiring en vista principal.
- Agregar acción "Regenerar" consumiendo endpoint scheduler (Milestone 5) con feedback.
- Revisar nomenclatura y textos finales (definir si se reintroducen tildes con UTF-8 o se mantiene ASCII).
- QA end-to-end: escenarios crear/editar/eliminar plan, configuraciones y programas; verificación de JSON generado.
- Documentar esquema definitivo de `sra_cConfig` cuando se cierre con backend.

## Riesgos y mitigacion
- Esquema de configuracion aun abierto → usar panel modular que evolucione sin romper JSON guardado.
- Seleccion de camaras depende de data de SofiaVideoData → definir fallback si API retorna vacio.
- Coordinacion con scheduler → validar con backend formato de llamada antes de exponer boton.

## Notas de build/cache
- Ante cambios en `app.json`, correr `node tools/add-preventcache-query.js` para mantener `?v=${build.timestamp}` en assets remotos.
- Mantener indentacion a 4 espacios y newline final en JSON.















