# Contrato de ingreso entre IPRS e Ingress

Estado: propuesta inicial para POC.

## 1. Decisión resumida

La opción base es:

```text
Panel/receptor
    → IPRS local
    → spool durable local
    → HTTPS saliente por puerto 443
    → Ingress API stateless
    → broker durable
    → Normalizer
```

IPRS no se conecta a SQL y tampoco se conecta directamente al broker de cloud.
Publica observaciones versionadas mediante HTTPS y elimina un elemento del spool
sólo cuando el Ingress API confirma que quedó durablemente aceptado.

El mismo contrato permite:

- IPRS e Ingress en la instalación del cliente;
- IPRS local e Ingress en cloud;
- IPRS local, Edge Relay local e Ingress en cloud;
- operación temporal sin conectividad gracias al spool.

### 1.1 IPRS no es el único productor externo

Este documento se llama "contrato IPRS" porque IPRS es el caso más exigente:
protocolos propietarios, ACK al panel, spool obligatorio. Pero el Ingress recibe
observaciones de otros productores externos que hoy entran por vías distintas —
app SmartPanic, control de acceso, canal de voz, telemetría GPS— y varios de
ellos no pasan por IPRS: entran por triggers sobre tablas de telemetría.

El contrato debe leerse como **"contrato de productor de observaciones"**. IPRS
es una implementación de ese rol, no el rol mismo. Cada productor necesita su
propia identidad de instalación, sus propios límites de tamaño y tasa, y puede
tener requisitos de spool más laxos si el dispositivo retransmite.

Además, el Ingress cubre sólo los productores **externos**. Los eventos generados
internamente —temporizadores vencidos, reglas sobre estado acumulado, efectos de
otros contextos— no entran por acá: usan el comando `GenerateAlarm` descrito en
[`arquitectura-eventos-tiempo-real.md`](arquitectura-eventos-tiempo-real.md).

El inventario completo de productores y su clasificación está en
[`productores-de-eventos.md`](productores-de-eventos.md).

## 2. Límite de responsabilidad

### IPRS

IPRS conserva las responsabilidades cercanas al dispositivo:

- escuchar conexiones y protocolos de los paneles;
- reconocer los límites del paquete;
- conservar los bytes o texto originales;
- ejecutar el parser completo correspondiente y traducir el formato propietario
  a los campos comunes de recepción que hoy entrega a
  `IPRS_packetProcesor`;
- registrar puerto, conexión, dirección remota y parser utilizado;
- asignar identidad y secuencia antes de cualquier reintento;
- entregar al spool antes de confirmar al dispositivo cuando el protocolo lo
  requiera.

IPRS no debe:

- resolver IDs internos de cuenta;
- consultar tablas de receptores, cuentas, tags o configuración de negocio;
- decidir la categorización final de la alarma;
- crear `p_recepcion` o `EventosPendientes`;
- ejecutar reglas de atención, notificación o autoproceso;
- necesitar como respuesta `rec_iid`, `cue_iid` u otro ID de SQL.

### Dos niveles de normalización

El límite no convierte a IPRS en un forwarder de bytes:

```text
Paquete propietario
    → IPRS / parser de protocolo
    → ReceiverObservation
       - campos comunes ya interpretados
       - paquete original como evidencia
    → Ingress API
    → Normalizer de negocio
    → AlarmNormalized
```

La **normalización de protocolo** sigue en IPRS. Incluye framing, checksum, ACK
al dispositivo, selección de parser e interpretación de cuenta, evento, zona,
usuario, partición, GPS y demás capacidades.

La **normalización de negocio** sale de SQL y pasa al pipeline. Incluye resolver
receptor y cuenta internos, consultar configuración, mapear a código y taxonomía
SoftGuard, aplicar reglas y decidir si se crea una alarma.

El flujo normal consume los campos interpretados. `data.raw` no obliga a
reparsear en cloud: se conserva para auditoría, diagnóstico, comparación de
versiones y reproceso excepcional.

### Edge Relay

El Edge Relay es opcional pero recomendable para una migración gradual. Puede
correr en la misma máquina que IPRS y asumir:

- spool local;
- batches, reintentos y backoff;
- mTLS y rotación de certificados;
- compresión;
- actualización independiente del receptor;
- métricas de conectividad y edad del backlog.

Con Edge Relay, IPRS realiza un envío local muy simple. Sin Edge Relay, esas
capacidades forman parte del Outbound Adapter dentro de IPRS.

### Ingress API

El Ingress API:

- autentica la instalación, no a un usuario humano;
- deriva o valida `tenantId`, `installationId` y receptores permitidos;
- valida versión, esquema, tamaño y límites;
- rechaza datos imposibles de procesar;
- publica el mensaje sin modificarlo en el broker durable;
- devuelve el ACK sólo después del ACK del broker;
- expone métricas y trazabilidad.

No resuelve cuentas, no clasifica alarmas y no escribe el estado de atención.
Es una frontera de seguridad y durabilidad, no el nuevo
`IPRS_packetProcesor`.

## 3. Transporte

### 3.1 HTTPS como opción inicial

Se recomienda HTTPS porque:

- la conexión siempre se inicia desde la red del cliente;
- usa normalmente el puerto 443 y atraviesa NAT y firewalls conocidos;
- funciona igual contra un Ingress local o cloud;
- permite balancear instancias stateless sin sticky sessions;
- tiene timeouts, códigos de error y observabilidad conocidos;
- evita entregar credenciales y topología del broker a cada cliente;
- un batch reduce el costo por request sin introducir un stream permanente.

Se reutilizan conexiones HTTP y se habilita HTTP/2 donde la infraestructura lo
soporte. No se abre un request nuevo a nivel TCP por cada alarma.

Modo de envío adaptativo:

- cola casi vacía: enviar inmediatamente para priorizar latencia;
- ráfaga: formar un micro-batch limitado por cantidad, bytes y demora máxima;
- recuperación de backlog: batches mayores y compresión;
- siempre respetar un tamaño máximo configurado por el servidor.

Los límites concretos se obtienen del POC. No deben quedar codificados como una
suposición del protocolo.

### 3.2 gRPC streaming

gRPC con client streaming o bidirectional streaming es la segunda opción si:

- el volumen sostenido hace significativo el overhead HTTP/JSON;
- se necesitan ACKs continuos sobre una conexión;
- IPRS también debe recibir comandos cloud en tiempo real;
- Protobuf y generación multilenguaje aportan valor real;
- los proxies on-premise soportan HTTP/2 extremo a extremo.

Un contrato conceptual sería:

```protobuf
service ReceiverIngress {
  rpc Publish(stream ReceiverObservation)
      returns (stream IngressReceipt);
}
```

El spool y la idempotencia siguen siendo obligatorios. Una conexión gRPC no
convierte una red intermitente en almacenamiento durable. Los streams largos
también son más difíciles de balancear, operar y depurar; deben elegirse por una
medición, no sólo por menor tamaño de mensaje.

### 3.3 MQTT 5

MQTT es razonable cuando SoftGuard pasa a administrar una flota edge más amplia:

- muchas instalaciones con conectividad irregular;
- publicación y comandos bidireccionales;
- sesiones persistentes;
- necesidad explícita de QoS por enlace;
- broker MQTT ya operado en edge o cloud.

Para un único proceso IPRS que sólo sube alarmas, agrega otro broker, bridge,
credenciales y semántica de topics. QoS 1 también admite duplicados, por lo que
no reemplaza `eventId`, spool ni deduplicación.

### 3.4 Acceso directo al broker

No se recomienda dar acceso directo desde cada IPRS al NATS o Kafka interno:

- acopla el edge a subjects, particiones y evolución del broker;
- amplía la superficie de red y credenciales;
- dificulta aplicar cuotas, validación de esquema y compatibilidad;
- hace más costosa una migración futura de broker;
- mezcla el dominio de seguridad del cliente con el de la plataforma.

NATS Leaf Node puede evaluarse como perfil avanzado cuando una instalación
necesita procesamiento local, servicios locales y store-and-forward entre dos
dominios NATS. Es una topología operativa distinta, no el transporte mínimo del
primer corte.

### 3.5 Protocolos que no aplican

- SSE es servidor → cliente y no sirve para publicar desde IPRS.
- WebSocket exigiría inventar ACK, retry, replay, backpressure y versionado que
  HTTP o gRPC ya estructuran mejor.
- UDP no ofrece la confirmación durable requerida.

## 4. API HTTP

### 4.1 Evento individual

```http
POST /api/v1/ingress/observations HTTP/2
Content-Type: application/cloudevents+json
Authorization: Bearer <credencial-de-instalacion>
Idempotency-Key: 01J...
```

El body contiene un CloudEvent `ReceiverObservation`.

### 4.2 Batch

```http
POST /api/v1/ingress/observation-batches HTTP/2
Content-Type: application/cloudevents-batch+json
Content-Encoding: gzip
Authorization: Bearer <credencial-de-instalacion>
```

El body es un batch de CloudEvents de la misma versión de especificación. Un
batch es una optimización de transporte: cada observación conserva su propio
`id`.

### 4.2.1 Relación entre `Idempotency-Key` y `id`

Son dos claves para lo mismo si no se las distingue. La regla es:

- **La deduplicación de observaciones es siempre `source + id`.** Es la única
  autoridad. Un reintento conserva ambos valores y por eso no puede duplicar una
  alarma, con o sin header.
- **`Idempotency-Key` identifica el *request*, no la observación.** Sirve para que
  el Ingress pueda devolver la misma respuesta ante un reintento idéntico sin
  reconsultar el estado de cada elemento. Es una optimización, no una garantía.

Consecuencia práctica: un cliente puede reenviar las mismas observaciones
agrupadas en batches distintos, con `Idempotency-Key` distintos, y el resultado
sigue siendo correcto. La agrupación es libre; la identidad de la observación no.

En el `POST` individual el header es redundante y puede omitirse.

### 4.3 ACK durable

Respuesta conceptual:

```http
HTTP/2 202 Accepted
Content-Type: application/json
```

```json
{
  "receiptId": "01J...",
  "durableAt": "2026-07-30T18:03:12.512Z",
  "results": [
    {
      "eventId": "01JOBSERVATION...",
      "status": "accepted"
    },
    {
      "eventId": "01JREPEATED...",
      "status": "duplicate"
    }
  ]
}
```

En este contrato, `202` significa:

- autenticación y validación de ingreso correctas;
- todos los IDs informados están durables en el broker o ya habían sido
  aceptados;
- SoftGuard asumió responsabilidad por procesarlos;
- normalización, creación de alarma y persistencia de dominio todavía pueden
  estar pendientes.

No significa que exista ya un `alarmId` ni que el evento sea una alarma válida.

Si el Ingress pierde conexión después de publicar pero antes de contestar, IPRS
reintenta el mismo batch con los mismos IDs. El resultado debe ser `accepted` o
`duplicate`, nunca una segunda alarma.

#### Batch parcialmente válido

Un batch de cincuenta observaciones donde cuarenta y nueve son válidas y una
tiene esquema inválido necesita una regla explícita. Sin ella, el spool no sabe
si poner **un** elemento en cuarentena o reintentar el batch completo — y
reintentarlo en loop es el modo de falla más probable.

La regla de este contrato es: **`202` significa que ninguna observación quedó sin
resolver.** Cada elemento recibe su propio `status`, y un elemento inválido no
impide aceptar los demás:

```json
{
  "receiptId": "01J...",
  "durableAt": "2026-07-30T18:03:12.512Z",
  "results": [
    { "index": 0, "eventId": "01JA...", "status": "accepted" },
    { "index": 1, "eventId": "01JB...", "status": "duplicate" },
    {
      "index": 2,
      "eventId": "01JC...",
      "status": "rejected",
      "reason": "schema-violation",
      "detail": "data.observed.eventCode: required"
    }
  ]
}
```

Acción del cliente por `status`:

| `status` | Significado | Acción sobre el spool |
|---|---|---|
| `accepted` | Durable en el broker | Compactar |
| `duplicate` | Ya había sido aceptado | Compactar |
| `rejected` | Inválido; no mejora con reintento | Cuarentena + alarma operativa |

Los códigos `400`, `413` y `422` quedan reservados para fallas **del batch como
unidad**: envelope ilegible, tamaño excedido, versión de especificación no
soportada. No se usan para un elemento individual defectuoso.

Si ninguna observación del batch pudo hacerse durable —por ejemplo, broker
inaccesible— la respuesta es `503` y no `202` con todos los elementos en
`rejected`. La distinción importa: `503` es reintentable, `rejected` no.

### 4.4 Errores

| HTTP | Significado | Acción de IPRS |
|---|---|---|
| `400` | Envelope ilegible | Cuarentena y alarma operativa |
| `401`/`403` | Credencial inválida o alcance incorrecto | Detener envío y renovar/escalar |
| `413` | Batch demasiado grande | Dividir y reintentar |
| `422` | Esquema o versión inválidos | Cuarentena; no repetir sin modificar |
| `429` | Cuota o backpressure | Respetar `Retry-After` |
| `503` | No existe destino durable disponible | Mantener spool y reintentar |

Para `429`, `503`, timeout o corte de conexión se usa backoff exponencial con
jitter. No se reintenta en loop cerrado.

El Ingress no devuelve éxito si sólo dejó el evento en memoria. Si el broker y
cualquier spool durable del Ingress están inaccesibles, devuelve `503`.

## 5. Contrato `ReceiverObservation`

### 5.1 Envelope

Ejemplo de una observación de alarma:

```json
{
  "specversion": "1.0",
  "id": "01JOBSERVATION...",
  "source": "urn:softguard:iprs:installation:site-23:receiver:rx-4",
  "type": "com.softguard.receiver.alarm-observation.v1",
  "subject": "connection/c-891",
  "time": "2026-07-30T18:03:12.345Z",
  "datacontenttype": "application/json",
  "dataschema": "urn:softguard:schema:receiver-alarm-observation:1",
  "tenantid": "tenant-7",
  "installationid": "site-23",
  "receiverid": "rx-4",
  "connectionepoch": "01JEPOCH...",
  "sourcesequence": "18452",
  "data": {
    "edge": {
      "iprsInstanceId": "iprs-a",
      "softwareVersion": "next-poc",
      "enqueuedAt": "2026-07-30T18:03:12.351Z"
    },
    "transport": {
      "kind": "tcp",
      "localPort": 9010,
      "remoteAddress": "192.0.2.25",
      "remotePort": 48122,
      "connectionId": "c-891"
    },
    "protocol": {
      "name": "CONTACT_ID",
      "model": "receiver-model",
      "parser": "ContactIdPacketParser",
      "parserVersion": "3.2.0"
    },
    "observed": {
      "account": "001234",
      "eventCode": "130",
      "zone": "004",
      "user": "0",
      "partition": "01",
      "reference": null,
      "callerId": null
    },
    "telemetry": {
      "deviceId": null,
      "location": null,
      "batteryPercent": null,
      "signalLevel": null
    },
    "timestamps": {
      "deviceReportedAt": null,
      "edgeReceivedAt": "2026-07-30T18:03:12.345Z",
      "clockQuality": "edge"
    },
    "raw": {
      "mediaType": "application/octet-stream",
      "encoding": "base64",
      "value": "MTIzNDU2Nzg5MA==",
      "sha256": "base64-or-hex-digest"
    }
  }
}
```

### 5.2 Reglas del envelope

- `id` se genera antes de escribir al spool y nunca cambia en un retry.
- La clave de deduplicación es `source + id`.
- `source` identifica de forma estable instalación y receptor.
- `time` es cuando IPRS terminó de recibir el paquete, no cuando llegó a cloud.
- `connectionepoch` cambia al reiniciar o recrear la sesión del receptor.
- `sourcesequence` crece dentro de ese epoch y permite detectar huecos.
- El Ingress obtiene el tenant permitido desde la credencial y exige que
  coincida con `tenantid`; no confía solamente en el body.
- `ingestedAt` lo agrega el Ingress y no lo falsifica IPRS.
- Los nombres de clase actuales se aceptan durante la migración, pero
  `protocol.name`, `model` y versiones estables son el contrato futuro.
- Las IP admiten IPv4 e IPv6; no se conserva la limitación SQL de 15
  caracteres.
- El payload tiene límites explícitos y nunca contiene contraseñas o
  credenciales.

### 5.3 Original y parseado

Se conservan ambos:

- `raw` permite reprocesar, auditar y comparar parsers;
- `observed` contiene lo que IPRS pudo extraer sin consultar negocio;
- el Normalizer produce después la cuenta, alarma, zona y usuario canónicos.

Un valor de `observed.account` es una afirmación del parser, no `cue_iid`.
`observed.eventCode` tampoco es todavía `rec_calarma`.

Si el paquete original es texto se puede conservar UTF-8 junto con sus bytes,
pero debe existir una representación exacta que no dependa de conversiones de
encoding. CloudEvents permite representar datos binarios como Base64; cuando el
body del evento es el objeto JSON anterior, el binario vive dentro de
`data.raw`.

Imágenes o adjuntos grandes no se embeben en este mensaje. Se suben mediante un
flujo de adjuntos con checksum y el evento contiene referencias
content-addressed. El POC debe identificar qué representa hoy `postimages`.

## 6. No copiar la firma del stored procedure

La firma actual de
[`IPRS_packetProcesor`](../../database/_Desktop/StoredProcedures/IPRS_packetProcesor.sql)
sirve para descubrir datos, no como contrato nuevo.

| Parámetros actuales | Destino propuesto |
|---|---|
| `cCuenta`, `cEvento`, `cZona`, `cUsuario`, `cParticion` | `data.observed`, todavía no canónicos |
| `iPuerto`, `remoteIp`, `remotePort`, `rxt_iConexion` | `data.transport` |
| `cData` | `data.raw` o dato observado específico |
| `rawFechaHora` | `deviceReportedAt`; no reemplaza `edgeReceivedAt` |
| `cProtocolo`, `AssemblyClassName`, `ProtocolModel` | `data.protocol` con nombres versionados |
| `lat`, `lng`, `rAccuracy`, `cMethod` | `data.telemetry.location` |
| `imei`, baterías, señal, satélites, velocidad, rumbo, odómetro, combustible | `data.telemetry` |
| `cReference`, `cCallerID`, `cLineCard`, `rec_ccontenido` | Extensiones observadas específicas del protocolo |
| `postimages` | Flujo separado de adjuntos |
| `cDebug` | Configuración local; no viaja |
| `preventNotification`, `spGeoAutoproceso` | Reglas downstream; no autoridad del edge |
| `rec_iid`, `cue_iid`, `cue_ncuenta`, `cue_clinea`, `rec_calarma` de salida | Desaparecen de la respuesta síncrona |

`IPRS_packetProcesor` no procesa una sola clase de ocurrencia. El nuevo contrato
se divide al menos en:

- `com.softguard.receiver.alarm-observation.v1`;
- `com.softguard.receiver.command-acknowledged.v1`;
- `com.softguard.receiver.telemetry-observation.v1`;
- `com.softguard.receiver.external-event-update.v1`.

Un ACK de comando como `ACKCMD` no debe fingir ser una alarma con campos vacíos.
Cada tipo tiene su propio JSON Schema, límites y consumidor.

## 7. Spool local

### 7.1 Estados

```text
RECEIVED
   ↓ fsync/commit local
READY
   ↓ envío
IN_FLIGHT
   ├─ ACK durable → ACKED → compactación
   ├─ error retryable → READY
   └─ error permanente → QUARANTINED
```

Puede implementarse con SQLite o un log append-only, pero debe sobrevivir a:

- reinicio del proceso;
- reinicio del servidor;
- pérdida de red;
- respuesta HTTP perdida;
- disco casi lleno;
- actualización de IPRS o Edge Relay.

Nunca se borra por haber “enviado”; se borra o compacta después del ACK durable.
Conviene retener por un período corto los metadatos del ACK para diagnóstico.

### 7.2 Capacidad y backpressure

Se definen:

- capacidad mínima por horas o días de desconexión;
- high-water marks de disco;
- edad máxima del elemento más antiguo;
- política explícita cuando se agota el disco;
- alarmas operativas antes del límite;
- prioridad entre alarmas críticas, telemetría y adjuntos.

No se descarta silenciosamente una alarma crítica para hacer lugar a
telemetría. Si existe degradación, se reduce o pausa primero el tráfico no
crítico.

### 7.3 Orden

La red no es la fuente de verdad del orden. Cada observación lleva:

- `connectionepoch`;
- `sourcesequence`;
- `edgeReceivedAt`;
- `deviceReportedAt` cuando existe;
- `eventId`.

IPRS puede enviar varios batches en paralelo, pero debe preservar orden por
receptor/conexión cuando el protocolo lo requiera. El pipeline usa después su
propia clave de partición por tenant y cuenta.

## 8. Seguridad

La identidad es de instalación o workload, no de operador.

Perfil recomendado:

- TLS 1.2 o superior;
- mTLS con certificado por instalación o credencial de workload de vida corta;
- rotación y revocación sin reinstalar IPRS;
- permisos limitados a publicar para receptores asignados;
- cuota por instalación;
- límite de tamaño y tasa;
- validación estricta de JSON Schema;
- secretos fuera del archivo de configuración plano;
- logs sin payload completo por defecto;
- cifrado del spool cuando los datos o la política del cliente lo requieran.

El tenant se deriva de la credencial. Un cliente no obtiene acceso a otro tenant
cambiando `tenantid` en el JSON.

El endpoint cloud sólo necesita tráfico saliente desde el cliente. No se abre un
puerto entrante hacia IPRS.

## 9. Topologías

### Local completo

```text
IPRS → Edge Relay/Ingress local → broker local → pipeline local
```

Usa el mismo contrato y endpoint; cambia DNS/configuración.

### IPRS local y plataforma cloud

```text
IPRS → spool local → HTTPS 443 → Ingress cloud → broker cloud
```

Es el perfil recomendado para el primer POC híbrido.

### Edge con procesamiento local

```text
IPRS → NATS/servicios edge → mirror o leaf → cloud
```

Sólo se justifica si el cliente necesita continuar normalizando, atendiendo o
integrando localmente durante una desconexión. Requiere operación y
actualización de infraestructura edge.

## 10. Canal de comandos hacia IPRS

La subida de eventos y la bajada de comandos son capacidades distintas. No se
debe elegir WebSocket para alarmas sólo porque en el futuro podría haber
comandos.

Si cloud debe enviar comandos a dispositivos conectados a IPRS, se evalúa:

- gRPC bidireccional con ACK por comando;
- MQTT con topics y QoS;
- NATS Leaf en el perfil edge;
- long polling HTTP para un volumen bajo.

Los comandos necesitan identidad, expiración, deduplicación, autorización y
resultado propio. `receiver.command-acknowledged.v1` correlaciona mediante
`commandId`.

La existencia real, frecuencia y criticidad de estos comandos es uno de los
datos que puede cambiar la elección HTTPS versus gRPC/MQTT.

## 11. Migración

1. Capturar DTOs y paquetes reales que hoy llegan a
   `IPRS_packetProcesor`.
2. Asignar `eventId` y persistirlos en el spool sin dejar de ejecutar SQL.
3. Enviar en shadow al nuevo Ingress.
4. Validar envelope, duplicados, orden y tolerancia a cortes.
5. Ejecutar el Normalizer nuevo sin efectos productivos.
6. Comparar su salida con IDs y valores generados por el procedimiento.
7. Separar alarmas, ACK de comandos, telemetría y actualizaciones.
8. Hacer que el pipeline nuevo sea la vía primaria para un protocolo acotado.
9. Mantener un consumidor/adaptador hacia SQL durante la transición.
10. Retirar la dependencia de IPRS sobre outputs SQL cuando ningún flujo los
    necesite.

No se propone portar los parsers de IPRS como parte de este corte. Sí deben
clasificarse las ramas especiales del stored procedure: interpretación
sintáctica faltante vuelve al parser; lookup, política y efectos pasan al
pipeline correspondiente.

## 12. Pruebas de aceptación

- El panel recibe su ACK aun si cloud está caído, sólo después del commit local
  cuando el protocolo lo permite.
- Reiniciar IPRS después del commit local no pierde el paquete.
- Cortar la respuesta HTTP después del publish provoca retry y un solo efecto.
- Reiniciar el Ingress durante un batch no duplica alarmas.
- Un evento inválido queda en cuarentena y no bloquea eternamente la cola.
- Un batch con un solo elemento inválido acepta los demás y pone en cuarentena
  únicamente ese elemento.
- Reagrupar las mismas observaciones en batches distintos no duplica alarmas.
- Un `429` o `503` no genera un loop de reintentos.
- Recuperar un backlog no degrada la latencia de alarmas nuevas por encima del
  SLO.
- Cambiar `tenantid` manualmente produce rechazo.
- Rotar o revocar una credencial funciona sin pérdida de mensajes.
- La secuencia detecta paquetes faltantes y reinicios de conexión.
- El mismo cliente funciona contra Ingress local y cloud cambiando sólo
  configuración.

## 13. Decisiones pendientes del POC

1. Eventos por segundo promedio, pico y ráfaga por IPRS.
2. Tamaño P50/P95/P99 del paquete y presencia de imágenes.
3. Horas de desconexión que debe absorber el spool.
4. Lenguaje y capacidad de modificación del IPRS actual.
5. Posibilidad de incorporar Edge Relay como proceso separado.
6. Momento exacto en que cada protocolo confirma al panel.
7. Necesidad y frecuencia de comandos cloud → IPRS.
8. Soporte HTTP/2 y mTLS de los proxies reales.
9. Campos de salida SQL que IPRS todavía utiliza y por qué.
10. Retención y clasificación de datos crudos e IP remota.

## 14. Referencias oficiales

- [CloudEvents](https://github.com/cloudevents/spec/blob/ce@stable/cloudevents/spec.md)
- [CloudEvents JSON Format](https://github.com/cloudevents/spec/blob/main/cloudevents/formats/json-format.md)
- [gRPC: conceptos y streaming](https://grpc.io/docs/what-is-grpc/core-concepts/)
- [gRPC: recomendaciones de rendimiento](https://grpc.io/docs/guides/performance/)
- [MQTT 5.0](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html)
- [NATS Leaf Nodes](https://docs.nats.io/running-a-nats-service/configuration/leafnodes)
- [HTTP Semantics RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html)
- [HTTP/2 RFC 9113](https://www.rfc-editor.org/rfc/rfc9113.html)
