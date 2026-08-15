# Tasas de Datos SofIA – Rutas, Puntos de Control y Programaciones

Este documento resume los campos principales expuestos por el Administrador para que otros equipos (por ejemplo, detección o automatización) puedan consumir las configuraciones. Cada tabla corresponde al modelo REST consumido/actualizado por el frontend.

## Tabla `SV_Routes`

| Campo              | Tipo    | Notas                                                                 |
|--------------------|---------|-----------------------------------------------------------------------|
| `svr_iid`          | int     | Identificador único de la ruta (clave primaria).                     |
| `svr_iCuentaId`    | int     | Cuenta asociada. Necesario para filtrar las rutas por cliente.       |
| `svr_cName`        | string  | Nombre visible del plan de control.                                  |
| `svr_cDescripcion` | string  | Texto libre descriptivo (opcional).                                  |
| `svr_cRouteType`   | string  | Tipo/clasificación de la ruta (placeholder actual).                  |
| `svr_dDateStart`   | date    | Fecha de inicio (ISO8601).                                           |
| `svr_iParallel`    | int     | Indicador de ejecución paralela (0 = no). Actualmente oculto en UI.  |

## Tabla `SV_Route_AnalysisPoints`

| Campo               | Tipo    | Notas                                                                                                    |
|---------------------|---------|----------------------------------------------------------------------------------------------------------|
| `sra_iid`           | int     | Identificador único del punto de control (clave primaria).                                              |
| `sra_iRouteId`      | int     | Ruta asociada (`svr_iid`).                                                                               |
| `sra_iAnalysisPointId` | int  | Identificador lógico del punto (reserva para backend).                                                   |
| `sra_iOrder`        | int     | Orden de ejecución dentro de la ruta.                                                                   |
| `sra_cReference`    | string  | Nombre visible del punto de control.                                                                    |
| `sra_cCameraType`   | string  | Tipo de cámara según catálogo.                                                                          |
| `sra_iCameraRefId`  | int     | Identificador de la cámara SofIA seleccionada.                                                          |
| `sra_cConfig`       | string  | JSON persistido con la configuración de analíticas (incluye el polígono normalizado y opciones varias). |

## Tabla `SV_Route_Programs`

| Campo              | Tipo    | Notas                                                                                                    |
|--------------------|---------|----------------------------------------------------------------------------------------------------------|
| `srp_iid`          | int     | Identificador único del programa (clave primaria).                                                       |
| `srp_iRouteId`     | int     | Ruta asociada (`svr_iid`).                                                                               |
| `srp_cProgramType` | string  | Tipo de repetición (`1` = diario, `2` = lunes a viernes, `3` = día específico semana, `4` = día del mes).|
| `srp_iDayOfWeek`   | int     | Día de la semana (`0` domingo .. `6` sábado). Válido sólo cuando el tipo = `3`.                          |
| `srp_iDayOfMonth`  | int     | Día del mes (1..31). Válido sólo cuando el tipo = `4`.                                                   |
| `srp_iStartHour`   | int     | Hora programada (0..23).                                                                                  |
| `srp_iStartMinutes`| int     | Minutos programados (0..59).                                                                             |
| `Summary`          | string  | Descripción legible (se genera en el frontend al guardar).                                               |

### Notas generales
- Los endpoints de detalle usan el patrón REST `/Rest/<tabla>/`. Por ejemplo: `/Rest/SV_Routes/`, `/Rest/SV_Route_AnalysisPoints/`.
- Los puntos de control y programas se enlazan a la ruta mediante `svr_iRouteId`.
- La configuración de cámara (`sra_cConfig`) es un JSON estructurado. Ver `SofiaCameraConfigExample.md` para un payload de referencia.
- Contactarse con el equipo de detección ante cualquier cambio en la estructura de `sra_cConfig` o nuevos tipos de programa.
