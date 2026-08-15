# Subsistema multimedia

> Estado: análisis estático sobre `database/**/*.sql` y `softguard.workspace/**/*.js`.
> Valida contra base desplegada antes de usarlo como base de decisión de migración.

## 1. Por qué existe este documento

El análisis de eventos (`productores-de-eventos.md`) identificó que el camino de
recepción de paquetes incluye multimedia adjunta pero no lo detalló.
Este documento describe cómo se **graba**, **almacena en disco** y **sirve** el
contenido multimedia (imágenes, video, audio) asociado a eventos, y qué implica
eso para la reestructuración del sistema.

## 2. Modelo de datos

### 2.1 Tablas operacionales (activas, en `_Datos`)

#### `p_RXImg` — registro primario de multimedia

Tabla central del subsistema. Una fila por archivo recibido con un evento.

| Columna | Tipo | Default | Descripción |
|---|---|---|---|
| `rxi_iId` | int PK | — | Identificador |
| `rxi_iRecId` | int | 0 | FK → `p_recepcion.rec_iid` |
| `rxi_cImg` | varchar(1024) | `''` | Nombre de archivo o path completo (varía según origen) |
| `rxi_cCarpeta` | varchar(200) | `''` | Carpeta destino en disco (path UNC) o token especial `[D-Guard]` |
| `rxi_nEstado` | numeric(1,0) | 0 | **0** = pendiente de copia; **1** = copiado/disponible |
| `rxi_cTipo` | varchar(20) | `'jpg'` | Extensión normalizada: `JPG`, `JPEG`, `MP4`, `WEBM`, `AVI`, `MP3`, `VUP`, `CWU`, `DNL`… |
| `rxi_cConfig` | varchar(max) | — | JSON de configuración adicional (uso variable según tipo) |

**Trigger `Trg_Fill_TimeLine_RXI` (AFTER INSERT):**
- Si `rxi_cTipo = 'webm'`: actualiza `p_recepcion.rec_cContenido` con `[WEBM]` al inicio.
- Si `rxi_cTipo = 'mp4'` y `rxi_nEstado = 0`: inserta en `RemoteCallQueue` tipo `EXE` con `xcopy {rxi_cImg} {rxi_cCarpeta}\ /i /y` y avanza `rxi_nEstado → 1`. Este es el mecanismo de copia de MP4 pendientes (launcher externo).
- Siempre (si MP4): inserta en `EventosTimeLine` acción `'Audio'` con observación `'%Audio recibido de SmartPanics/VigiControl%'`.

> Este trigger resuelve el ciclo de vida de `rxi_nEstado = 0` para MP4, reemplazando al trigger `TG_UPD_ImgPendiente` que no está versionado.

---

#### `p_grabacion_mp4` — subset de video copiado

Subconjunto de `p_RXImg` para videos procesados. Almacena carpeta y archivo por separado (a diferencia de `p_RXImg` que puede tenerlos concatenados).

| Columna | Tipo | Default | Descripción |
|---|---|---|---|
| `grm_idKey` | int PK | — | Identificador |
| `grm_iidCuenta` | int | 0 | FK → `m_cuentas.cue_iid` |
| `grm_iidRecepcion` | int | 0 | FK → `p_recepcion.rec_iid` |
| `grm_dFechaHora` | datetime | `getdate()` | Fecha/hora de grabación |
| `grm_cCarpeta` | varchar(100) | `''` | Path de carpeta en disco (ej: `\\servidor\Misc\Video\202601\LIN_CUENTA`) |
| `grm_cArchivo` | varchar(100) | `''` | Nombre de archivo (ej: `12345_1706000000000.webm`) |
| `grm_cTipo` | varchar(20) | `'mp4'` | Tipo real del archivo: `mp4`, `webm`, `MP4`, `WEBM`, `AVI`… |

**Cuándo se inserta:** `IPRS_VideoLinkParser` inserta aquí cuando `rxi_nEstado = 1` (archivo ya disponible en IRS). Para grabaciones FFMPEG asíncronas, el INSERT se hace después de completar la transcripción.

**No tiene trigger ni tabla histórica versionada.**

---

#### `p_grabacion_img` — subset de imágenes copiadas

Análogo a `p_grabacion_mp4` pero para JPG/JPEG.

| Columna | Tipo | Default | Descripción |
|---|---|---|---|
| `gri_iid` | int PK | — | Identificador |
| `gri_iidcuenta` | int | 0 | FK → `m_cuentas.cue_iid` |
| `gri_iidrecepcion` | int | 0 | FK → `p_recepcion.rec_iid` |
| `gri_dfechahora` | datetime | `getdate()` | Fecha/hora de la captura |
| `gri_ccarpeta` | varchar(200) | `''` | Subcarpeta relativa dentro de `\Video\` (ej: `202601\LIN_CUENTA`) |
| `gri_carchivo` | varchar(200) | `''` | Nombre de archivo sin extensión |
| `gri_ioperador` | int | 0 | Operador que tomó la foto (si aplica) |
| `gri_cTerminal` | char(3) | `''` | Terminal del operador |

**Trigger `Trg_Fill_TimeLine_GRI` (AFTER INSERT):**
- Inserta en `EventosTimeLine` acción `'Imagen'`, observación `'%Captura de imagen en atencion de evento%'`.

**Cuándo se inserta:** `IPRS_VideoLinkParser` inserta aquí solo cuando `ext = JPG/JPEG` y `rxi_nEstado = 1`.

---

#### `p_grabacion_audio` — grabaciones de llamadas

Grabaciones de audio de llamadas telefónicas realizadas por el operador durante la atención de un evento.

| Columna | Tipo | Default | Descripción |
|---|---|---|---|
| `gra_iid` | int PK | — | Identificador |
| `gra_iidcuenta` | int | 0 | FK → `m_cuentas.cue_iid` |
| `gra_iidrecepcion` | int | 0 | FK → `p_recepcion.rec_iid` |
| `gra_dfechahora` | datetime | `getdate()` | Fecha/hora de la grabación |
| `gra_carchivo` | varchar(100) | `''` | Nombre/path del archivo de audio |
| `gra_nduracion` | numeric(10,2) | 0 | Duración en segundos |
| `gra_ioperador` | int | 0 | Operador que realizó la llamada |
| `gra_cTerminal` | char(3) | `''` | Terminal del operador |
| `gra_iidLlamado` | int | 0 | FK al registro de la llamada |
| `gra_nestado` | numeric(1,0) | — | Estado de la grabación (valores exactos: ver §2.3) |
| `gra_ctelefono` | varchar(30) | — | Teléfono al que se llamó |

**Camino de ingreso:** NO pasa por `IPRS_VideoLinkParser`. El INSERT es directo desde el sistema de telefonía / integración de llamadas. El trigger `TG_INS_pGAHistory` ejecuta `SGSP_p_grabacion_audioINS` (SP no versionado en el repo) y escribe en `EventosTimeLine`.

**Trigger `TG_INS_pGAHistory` (AFTER INSERT):**
- Inserta en `EventosTimeLine` acción `'Logger'`, observación `'%Grabacion de audio llamado telefonico%'`.
- Llama a `SGSP_p_grabacion_audioINS` (no versionado) — presumiblemente propaga a la tabla histórica en `_History`.

**Trigger `TG_UPD_pGAHistory` (AFTER UPDATE):**
- Calcula el sufijo `YYYYMM` de `gra_dfechahora`.
- Si existe `[_History].[dbo].[p_grabacion_audio{YYYYMM}]`: hace MERGE para actualizar la copia histórica.
- Si la tabla histórica no existe: solo loguea, no falla.
- El INSERT inicial en `_History` lo hace `SGSP_p_grabacion_audioINS` (desde el trigger de INSERT).

---

#### `p_grabacion_audio_aux` — metadatos extra de grabaciones

Tabla auxiliar que extiende `p_grabacion_audio` con datos de protocolo en formato JSON.

| Columna | Tipo | Descripción |
|---|---|---|
| `graaux_iid` | int PK | Identificador |
| `graaux_iidgra` | int | FK → `p_grabacion_audio.gra_iid` |
| `graaux_cjson` | nvarchar(max) | JSON con metadatos de la grabación |
| `graaux_cprotocolo` | varchar(100) | Protocolo de telefonía (SIP, etc.) |

---

#### `p_RXtraInfo` — metadatos extra del evento

No es una tabla multimedia per se, pero es consultada por el subsistema multimedia para enrutar la presentación.

| Columna | Tipo | Descripción relevante |
|---|---|---|
| `rxt_iRecId` | int | FK → `p_recepcion.rec_iid` |
| `rxt_nSPIP` | numeric(1,0) | `1` = evento de SmartPanic vía IP |
| `rxt_nSPSMS` | numeric(1,0) | `1` = evento de SmartPanic vía SMS |
| `rxt_nVCIP` | numeric(1,0) | `1` = evento de VigiControl vía IP |
| `rxt_nVCSMS` | numeric(1,0) | `1` = evento de VigiControl vía SMS |
| `rxt_iRouteID` | int | ID de ruta SofIA para `SGSP_SofiaVideoData` |
| `rxt_cData` | varchar(max) | JSON con datos extras (cuenta asignada en VigiControl, etc.) |
| `rxt_iProceso` | int | Estado del proceso de supervisión |
| `rxt_cimei` | varchar(128) | IMEI del dispositivo (solo tabla live; no en históricas) |

**Trigger `Trg_PosicionesSP` (AFTER INSERT, UPDATE):**
- Si `rxt_nSPIP + rxt_nSPSMS + rxt_nVCIP + rxt_nVCSMS > 0`: hace MERGE en `p_posicionesSP` con los datos de `p_PosicionesGPS` para el mismo `rec_iid`. Este es el mecanismo que mantiene sincronizada la posición del SmartPanic/VigiControl con el evento.

**Tablas históricas de `p_RXtraInfo`:** Existen 26+ tablas mensuales versionadas en el repo (`p_RXtraInfo202505` … `p_RXtraInfo202707`, `p_RXtraInfo202805`, `p_RXtraInfo203308`). Tienen el mismo schema que la tabla live **excepto** que no tienen `rxt_cimei`. El SP `Searchp_grabacion_audio` acepta un parámetro `@table` para apuntar a tablas históricas con sufijo.

### 2.2 Tablas históricas (`_History`)

El sistema mantiene tablas históricas mensuales en la base `_History` para audio:

| Patrón de nombre | Cómo se crea | Quién escribe |
|---|---|---|
| `[_History].[dbo].[p_grabacion_audio{YYYYMM}]` | Creación dinámica (no versionada en repo) | `SGSP_p_grabacion_audioINS` (no versionado) en trigger INSERT; `TG_UPD_pGAHistory` en UPDATE |

El SP `Searchp_grabacion_audio` soporta esto: si `@table != 'p_recepcion'` extrae el sufijo `YYYYMM` del nombre de tabla y redirige la query a `[_History].[dbo].p_grabacion_audio{sufijo}`.

**No hay tablas históricas versionadas para `p_RXImg`, `p_grabacion_mp4` ni `p_grabacion_img`** — se infiere que el historial de multimedia de video/imágenes no se particiona mensualmente o se purga directamente.

### 2.3 Estados de las tablas de grabación

| Tabla | Campo de estado | Valores conocidos |
|---|---|---|
| `p_RXImg` | `rxi_nEstado` | **0** = pendiente de copia; **1** = disponible |
| `p_grabacion_audio` | `gra_nestado` | Valores exactos no documentados en repo; el SP filtra `gra_nestado > 0` como condición de archivo grabado |
| `p_grabacion_mp4` | sin estado | No tiene campo de estado — su existencia indica que el archivo está disponible |
| `p_grabacion_img` | sin estado | Ídem |

### 2.4 Relaciones entre tablas

```
p_recepcion.rec_iid
    │
    ├── p_RXImg.rxi_iRecId          (1:N — un evento puede tener múltiples archivos)
    │       │
    │       └── [trigger] → RemoteCallQueue (si mp4 estado=0, encola xcopy)
    │
    ├── p_grabacion_mp4.grm_iidRecepcion   (1:N — subset de p_RXImg para video procesado)
    ├── p_grabacion_img.gri_iidrecepcion   (1:N — subset de p_RXImg para imágenes)
    ├── p_grabacion_audio.gra_iidrecepcion (1:N — grabaciones de llamadas, camino independiente)
    │       │
    │       ├── p_grabacion_audio_aux.graaux_iidgra  (1:1 — metadatos JSON)
    │       └── [trigger] → _History.p_grabacion_audio{YYYYMM}
    │
    └── p_RXtraInfo.rxt_iRecId      (1:1 — metadatos de origen del evento)
            │
            └── [trigger] → p_posicionesSP (MERGE de posición GPS para SP/VC)
```

## 3. Rutas de disco

Todas las rutas base se leen de parámetros en `_Tablas.dbo.t_parametros`:

| Parámetro | Uso |
|---|---|
| `SEARCHSOFTGUARDMISCFILE` | Raíz del servidor de archivos. Ej: `\\dss-sgcloudvm\SoftGuard.Final\Misc` |
| `SEARCHDESKTOPSHAREDIMG` | Carpeta compartida para imágenes del desktop. |
| `RISCOROOTPATH` | Raíz de paneles Risco Agility3. |
| `MSGHOSTIPHF` / `MSGLOCALPORTHF` | IP y puerto del servicio `TCPClientFFMpeg.exe`. |
| `DURATIONINSECONDS` | Duración de grabación RTSP por evento (en segundos). |
| `UTILIZAVI` | Flag global: `0` = multimedia desactivada. |
| `UTILIZADGUARD` | Flag: usar integración D-Guard. |

### Estructura de directorios en `SEARCHSOFTGUARDMISCFILE`

```
{SEARCHSOFTGUARDMISCFILE}\
├── SharedImages\
│   ├── PostImages\          ← recepción directa: SmartPanics, VigiControl, SofIA, Crow, HipCam
│   └── FFMPeg\              ← salida WEBM de grabaciones RTSP (iVideoID=22 / GRV)
└── Video\
    └── {YYYYMM}\
        └── {LINEA_CUENTA}\  ← grabaciones por cuenta (FFMPEG output, conversiones AVI→MP4, HIK MP4)
```

El frontend construye las URLs de descarga mapeando estas rutas:
- `/gallery/video/{YYYYMM}/{cuenta}/{archivo}` → archivos MP4
- `/gallery/SharedImages/FFMPeg/{archivo}` → archivos WEBM
- `/gallery/SharedImages/PostImages/{archivo}` → JPG de SmartPanics/SofIA
- `/gallery/{ruta relativa}` → fallback para audio MP3 y otros

## 4. Flujo de grabación (escritura)

### 4.1 Camino principal: paquete IPRS con multimedia

```
Receptor IPRS
    │  @postImages = "archivo1.jpg,archivo2.jpg"
    ▼
IPRS_packetProcesor
    │  @postImages, @cDll
    ▼
AlarmaGenerar → crea p_recepcion → @rec_iid
    │
    ▼
IPRS_VideoLinkParser(@iRecID, @idCta, @cAlarma, @cZona, @cDll, @postImages)
    │
    ├── Lee m_cuentas_video / m_cuentas_video_links
    │   ¿Tiene configurado video para esta alarma/zona?
    │
    ├── Si iVideoID=22 (GRV) y DURATIONINSECONDS>0:
    │   └── INSERT RemoteCallQueue tipo='EXE', url='TCPClientFFMpeg.exe'
    │       → graba RTSP como WEBM en {SEARCHSOFTGUARDMISCFILE}\Video\{YYYYMM}\{cuenta}\
    │
    ├── Para cada archivo en @postImages:
    │   ├── Determina carpeta según @cDll:
    │   │   ├── SmartPanics/VigiControl/SofIA → \SharedImages\PostImages\
    │   │   ├── IRS PacketParsers             → ya copiado por IRS, rxi_nEstado=1
    │   │   ├── Risco/Agility3               → {RISCOROOTPATH}\{panelID}\
    │   │   └── HikVision MP4                → {Video\YYYYMM\cuenta\} + job FFMpeg fix
    │   │
    │   ├── INSERT p_RXImg(rxi_cImg, rxi_cCarpeta, rxi_nEstado, rxi_ctipo)
    │   │
    │   ├── Si rxi_nEstado=1 (ya copiado):
    │   │   ├── INSERT p_grabacion_mp4
    │   │   └── Si ext=JPG: INSERT p_grabacion_img
    │   │
    │   └── Si AVI: INSERT RemoteCallQueue → FFMpeg convierte a MP4
    │
    ├── UPDATE p_recepcion SET rec_ccontenido=[JPG][MP4]...
    │
    └── Si VigiControl VCMU: EXEC EventoDuplicar → copia a cuenta asignada
```

### 4.2 Camino alternativo: alarma con multimedia sin paquete IPRS

`AlarmaGenerarMultimedia` es el orquestador para productores que no pasan por
`IPRS_packetProcesor` pero igualmente adjuntan archivos:

```
Productor (SmartPanics API, SofIA, etc.)
    ↓
AlarmaGenerarMultimedia(@idCta, @cAlarma, ..., @postImages)
    ├── EXEC AlarmaGenerar → @rec_iid
    └── EXEC IPRS_VideoLinkParser(@rec_iid, ..., @postImages)
```

### 4.3 Grabación de audio de llamadas

Las grabaciones de voz (llamadas del operador) se gestionan por separado:

```
Sistema de telefonía / SofIA Voice
    ↓
INSERT _datos.p_grabacion_audio(gra_iidcuenta, gra_iidrecepcion,
                                 gra_dfechahora, gra_carchivo, gra_nduracion)
```

No pasa por `IPRS_VideoLinkParser`. Es un camino independiente, sin `p_RXImg`.

## 5. Flujo de consulta (lectura)

### 5.1 Operador atendiendo un evento (desktop)

```
Frontend (ImagePanelController.js)
    │  GET /Rest/search/SGSP_VideoLinkParser?iRecID={rec_iid}
    ▼
SGSP_VideoLinkParser
    │
    ├── Lee p_recepcion → @idCta, @cAlarma, @cZona
    │
    ├── ¿Hay p_RXImg para este evento?
    │   SÍ → devuelve filas de p_RXImg + grm_* de p_grabacion_mp4 + link de cámara
    │   NO → busca en m_cuentas_video / m_cuentas_video_links por alarma/zona
    │         Si es D-Guard: INSERT p_RXImg con URL construida y devuelve
    │
    └── Retorna: rxi_cTipo, rxi_cImg, rxi_cCarpeta, rxi_nEstado,
                 cLinkVideo, cuv_cLinkDSS, tvi_nLaunch, tvi_cnombre,
                 tvi_iplatform, cuv_ivideoid, grm_*
```

El frontend **interpreta `rxi_cTipo`** para decidir cómo mostrar:

| Tipo | Renderizado |
|---|---|
| `jpg` / `jpeg` | Handler `AgilityHandler` o `vupointHandler` → `addImagenToView` |
| `webm` | IFrame en `/gallery/SharedImages/FFMPeg/{archivo}` o `/gallery/video/{ruta}` |
| `mp4` / `mpg` | IFrame en `/gallery/video/{YYYYMM}/{cuenta}/{archivo}` |
| `avi` | IFrame en `/handler/VideoTranscodeStreamWebm` (transcodificación on-demand) |
| `cwu` | IFrame a URL externa (Alarm.com, Ajax Systems, etc.) |
| D-Guard | `/handler/dguardViewer` con credenciales |
| HIK / HRT | `/handler/VideoTranscodeStream` con URL RTSP construida |
| DAH (Dahua) | `/handler/VideoTranscodeStream` con RTSP playback/realmonitor |
| GRV / GRU | `/handler/VideoTranscodeStream` con RTSP genérico |
| GSU | `/handler/GenericSnapshotUrlPlayer` |
| WEB | IFrame directo a URL |

### 5.2 SofIA / WeSafe

```
WeSafeDeniedController / WeSafeUnderReviewController
    │  loadMultimedia(id, type, title)
    ▼
SGSP_SofiaVideoData(@iRecID)
    │
    ├── Lee p_recepcion → @idCta, @cAlarma
    ├── Si cAlarma='_SR': lee p_RXtraInfo → @routeId
    │
    └── UNION de 4 fuentes:
        ├── m_cuentas_video         → configuración de cámara por cuenta
        ├── m_cuentas_video_links   → configuración por alarma+zona
        ├── p_RXImg                 → archivos recibidos con el evento
        └── p_grabacion_mp4         → videos grabados para este evento
        (Para _SR: filtra solo cámaras con punto de control en SV_Route_AnalysisPoints)
```

### 5.3 Grilla de multimedia por cuenta (historial)

```
MultimediaGridController → p_rximgSearchModel → /Rest/search/p_rximg
    (filtro: rec_iidcuenta = {cue_iid}, ordenado por fecha DESC)

MultimediaGridView → construye URL de previsualización según rxi_cTipo
```

### 5.4 Grabaciones de audio

```
LlamadaGridController → GrabacionAudioSearchModel → /rest/search/p_grabacion_audio
```

### 5.5 Grabaciones MP4 (admin)

```
Panel admin → /Rest/search/Searchp_grabacion_mp4
```

## 6. Tipos de fuente de video (t_VideoID)

Los más relevantes por frecuencia de aparición en el código:

| tvi_iid | Tipo | Mecanismo |
|---|---|---|
| 22 | GRV — Generic RTSP VLC | RTSP → FFMpeg → WEBM |
| 24 | D-Guard | HTTP API propietaria + IFrame `/handler/dguardViewer` |
| 25 | VuPoint | Handler dedicado `/handler/vupointHandler` |
| 32 | WEB | URL directa en IFrame |
| 37, 39, 45, 48 | Vigicontrol-compatible | Filtrados en `Searchm_cuentas_vc_camaras` |
| HIK / HRT | HikVision | RTSP con playback timestamped |
| DAH | Dahua | RTSP playback + realmonitor |
| GRU / GSU | Generic Snapshot URL | Snapshot periódico vía `/handler/GenericSnapshotUrlPlayer` |

## 7. Mecanismo de grabación asíncrona (RemoteCallQueue)

Cuando hay que grabar RTSP o convertir AVI, el SP no lo hace directamente:
inserta en `_Datos.dbo.RemoteCallQueue` y un servicio Windows (`TCPClientFFMpeg.exe`)
consume la cola.

| Tipo en cola | Descripción |
|---|---|
| `EXE` + `TCPClientFFMpeg.exe` | Grabación RTSP a WEBM, conversión HIK MP4, conversión AVI→MP4 |
| `HTTPGET` | Activación de grabadora D-Guard vía HTTP |

El JSON de configuración del job incluye:
- `ListenerIP` / `ListenerPort` — endpoint del servicio FFMpeg
- `FFMpegURL` — fuente (URL RTSP o path local)
- `FFMpegPars` / `FFMpegArgs` — argumentos de ffmpeg
- `AccountFolder` — carpeta destino
- `DebugMode`

## 8. Implicancias para la reestructuración

### 8.1 Acoplamiento al sistema de archivos

El subsistema tiene un acoplamiento fuerte a rutas UNC en el servidor:
- Las URLs que sirve el backend (`/gallery/...`) son alias HTTP de `{SEARCHSOFTGUARDMISCFILE}`.
- Los jobs de `RemoteCallQueue` construyen paths con `\\servidor\carpeta\`.
- `SGSP_VideoLinkParser` concatena `rxi_cCarpeta + '\' + rxi_cImg` para formar el link.

En una arquitectura con almacenamiento objeto (S3, Azure Blob, etc.) esto requiere:
- Reemplazar `RemoteCallQueue` + `TCPClientFFMpeg.exe` por un servicio de transcoding
  que deposite en object storage y registre la URL pública.
- Cambiar el esquema de `p_RXImg` de path local a URL.
- Actualizar el frontend para dejar de construir paths `/gallery/...` manualmente.

### 8.2 Estado pendiente / copiado (`rxi_nEstado`)

El flag `rxi_nEstado = 0` indica que el receptor IRS copió el archivo pero
`p_grabacion_mp4` / `p_grabacion_img` todavía no refleja la copia. El trigger
`TG_UPD_ImgPendiente` (no versionado) es el encargado de avanzar ese estado.

No tener su definición versionada es un **bloqueante menor** — no impide el
análisis funcional pero sí impide instrumentar ese punto sin acceso a la base.

### 8.3 Tabla `RemoteCallQueue` como bus de mensajes ad-hoc

`RemoteCallQueue` actúa como una cola de trabajo sin garantías de orden,
reintentos ni dead letter. En una arquitectura moderna se reemplazaría por
una cola durable (SQS, Service Bus, etc.) con worker dedicado.

### 8.4 Duplicación VigiControl

El flujo `VCMU` de VigiControl duplica el evento a otra cuenta vía `EventoDuplicar`.
Eso crea dos filas en `p_recepcion` para el mismo archivo físico, con
`p_RXImg` apuntando a los mismos paths. En un pipeline con mensajes inmutables
esto se convertiría en dos mensajes con el mismo `mediaUrl` — aceptable si los
consumidores son idempotentes.

### 8.5 Múltiples endpoints REST para el mismo dato

El frontend usa tres endpoints distintos para acceder a multimedia:

| Endpoint | Usado por |
|---|---|
| `/Rest/search/SGSP_VideoLinkParser` | Panel de atención de eventos |
| `/Rest/search/p_rximg` | MultimediaGridController (grilla de cuenta) |
| `/Rest/search/p_grabacion_audio` | LlamadaGridController |
| `/Rest/search/p_grabacion_img` | EventImagesController |
| `/Rest/search/Searchp_grabacion_mp4` | Grilla admin |
| `SGSP_SofiaVideoData` | WeSafeApp / SofIA |

Una API de media unificada reduciría este fragmentación. El modelo de
`SGSP_SofiaVideoData` (UNION de 4 fuentes con campo `source`) es un buen punto
de partida.

### 8.6 Rutas de video construidas en el frontend

`ImagePanelController.js` y `MultimediaGridView.js` construyen URLs como:
```js
'/gallery/video/' + datepath + '/' + accountpath + '/' + filename
```
Esto acopla el cliente a la estructura de directorios del servidor. Una API que
devuelva URLs absolutas (presigned URLs o URLs de CDN) desacoplaría esto.

## 9. Inventario de objetos del subsistema

### SPs de escritura

| SP | Base | Rol |
|---|---|---|
| `IPRS_VideoLinkParser` | `_Desktop` | Registra multimedia al procesar evento IPRS |
| `AlarmaGenerarMultimedia` | `_Desktop` | Wrapper: `AlarmaGenerar` + `IPRS_VideoLinkParser` |

### SPs de lectura / presentación

| SP | Base | Consumidor principal |
|---|---|---|
| `SGSP_VideoLinkParser` | `_Desktop` | Panel atención eventos (frontend desktop) |
| `SGSP_SofiaVideoData` | `_Desktop` | WeSafe/SofIA |
| `SGSP_SofiaVideoLinks` | `_Desktop` | Config de links de cámara (SofIA/WebRemoto) |
| `Searchm_cuentas_video` | `_Desktop` | Config de video por cuenta (admin) |
| `Searchm_cuentas_video_links` | `_Desktop` | Config por alarma+zona (admin) |
| `Searchm_cuentas_vc_camaras` | `_Desktop` | Cámaras Vigicontrol (WeSafe config) |
| `Searchp_grabacion_mp4` | `_Desktop` | Grilla admin MP4 |
| `Searchp_grabacion_audio` | `_Desktop` | Grilla grabaciones de audio |
| `p_RXtraInfoSearch` | `_Desktop` | Diagnóstico / debug |

### Triggers relevantes

| Objeto | Tabla | Estado en repo |
|---|---|---|
| `TG_UPD_ImgPendiente` | `_Datos.p_recepcion` | **No versionado** — solo en BD |

### Controladores frontend

| Archivo | Función |
|---|---|
| `ImagePanelController.js` | Renderizado de multimedia en panel de atención |
| `MultimediaGridController.js` | Grilla histórica de multimedia por cuenta |
| `MultimediaGridView.js` | Vista con construcción de rutas `/gallery/...` |
| `LlamadaGridController.js` | Grabaciones de llamadas (`p_grabacion_audio`) |
| `EventImagesController.js` | Imágenes de evento (`p_grabacion_img`) |

## 10. Trabajo pendiente

1. **`SGSP_p_grabacion_audioINS`** — SP llamado desde `TG_INS_pGAHistory`, no versionado. Es el que hace el INSERT inicial en `_History`. Necesario para cerrar el ciclo de vida del audio.
2. **`TG_UPD_ImgPendiente`** — trigger sobre `p_recepcion` no versionado. Su rol en el ciclo de vida de imágenes JPG (vs el rol de `Trg_Fill_TimeLine_RXI` para MP4) no está claro sin verlo.
3. **`gra_nestado` — valores exactos** — el campo existe pero sus valores no están documentados en el repo. El SP de búsqueda filtra `> 0` como condición de "grabado"; necesita mapearse a estados de negocio (ej: en progreso, completado, error).
4. Confirmar si `p_RXImg`, `p_grabacion_mp4` y `p_grabacion_img` tienen purga periódica o si crecen indefinidamente.
5. Verificar si las tablas históricas `_History.p_grabacion_audio{YYYYMM}` se crean automáticamente (stored procedure de mantenimiento) o manualmente. El trigger falla silenciosamente si no existen.
6. Mapear los tipos `tvi_iid` restantes de `t_VideoID` activos en producción.
7. Medir volumen de archivos en `{SEARCHSOFTGUARDMISCFILE}` para dimensionar migración a object storage.
8. Documentar el servicio `TCPClientFFMpeg.exe`: garantías de reintentos, dead letter, y qué pasa si el servicio está caído cuando se encola un job.
9. Confirmar si `xcopy` en `RemoteCallQueue` (desde `Trg_Fill_TimeLine_RXI`) se ejecuta en el mismo servidor de archivos o requiere acceso de red.