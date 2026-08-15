# Documento de Definición de Arquitectura: Core de Ingesta y Eventos

## 1. El Porqué del Cambio
La plataforma actual presenta limitaciones estructurales que dificultan la escalabilidad masiva y el soporte a nuevos dispositivos:

* **Dependencia Fuerte de la Base de Datos:** La lógica de negocio acoplada en Stored Procedures, Triggers y Vistas satura el motor SQL, frena el escalado horizontal e impide la portabilidad multi-motor.
* **Cuello de Botella en la Recepción:** El servicio IPReader procesa y escribe de forma síncrona en la base de datos dentro del mismo flujo de comunicación. Si la persistencia se frena, el socket se bloquea y los paneles/dispositivos pierden comunicación.
* **Modelo de Dominio Rígido:** Forzar a que cualquier dispositivo (cámaras LPR, trackers GPS, sensores IoT) se cree como una "Cuenta" contamina el dominio.
* **Tipados Acotados:** Restricciones históricas de longitud (CHAR(3) en zonas, enteros pequeños en usuarios) impiden soportar identificadores de dispositivos modernos (zonas de 5 dígitos, IDs de usuarios MQTT tipo 2700225055336).

## 2. Consensos de Arquitectura y Decisiones Técnicas

* **Arquitectura Event-Driven (Orientada a Eventos):** Desacoplamiento total entre la Recepción (IPReader) y la Persistencia/Distribución. IPReader atiende el socket, encola en memoria y responde el ACK al panel en microsegundos.
* **Stack Tecnológico Core:** C# .NET 8 como motor de procesamiento multiplataforma y de alto rendimiento. La base de datos (MSSQL, PostgreSQL, etc.) queda relegada a persistencia pura (Storage).
* **Estrategia de Identificación y Trazabilidad:**
  * **En Memoria / Tránsito:** Asignación de un UUIDv7 (Sequential GUID) al recibir el evento para observabilidad de extremo a extremo (End-to-End Tracing) sin causar fragmentación de índices en BD.
  * **En Base de Datos:** Uso de BIGINT autoincremental como Clave Primaria para asegurar la máxima velocidad de inserción e indexación nativa.
* **Modelo Normalizado Flexible:** Abstraído del concepto de "Cuenta" pura (SourceEntityId + EntityType) y ajustado a cadenas holgadas (VARCHAR(50)) para ZoneId, UserId y SourceId.
* **Soporte Multimedia y Jerarquía:** Inclusión nativa de referencias a fuentes de video/imágenes y trazabilidad de entidades superiores (Cuentas Madres / Particiones) directamente en la carga útil del evento.

## Contratos de Eventos Oficiales (DTOs)

### Bloque 1: Contrato de Ingesta (`RawAlarmEvent`)
**Propósito:** Captura de bajo nivel del socket en memoria. Utiliza `ReadOnlyMemory<byte>` y estructura de valor para lograr Zero-Allocation en la capa de red.

```csharp
namespace SoftGuard.Core.Events;

/// <summary>
/// DTO inmutable de ingesta para IPReader.
/// Diseñado como struct para cero asignación en el Heap y alto throughput.
/// </summary>
public readonly struct RawAlarmEvent
{
    // UUIDv7 para trazabilidad distribuida en memoria/logs (End-to-End Tracing)
    public Guid EventId { get; }
    
    // Identificador del driver/parser (ej: Surgard, SIA, GPS, etc.)
    public ushort DriverId { get; }
    
    // Puerto local de entrada
    public int ListenerPort { get; }
    
    // IP y Puerto de origen del emisor
    public string SourceEndpoint { get; }
    
    // Marca de tiempo exacta UTC en microsegundos tomada al recibir el socket
    public DateTimeOffset ReceivedAtUtc { get; }
    
    // Payload binario crudo (Slice directo de memoria sin copiar bytes)
    public ReadOnlyMemory<byte> RawPayload { get; }

    public RawAlarmEvent(
        ushort driverId, 
        int listenerPort, 
        string sourceEndpoint, 
        ReadOnlyMemory<byte> rawPayload)
    {
        EventId = Guid.CreateVersion7();
        DriverId = driverId;
        ListenerPort = listenerPort;
        SourceEndpoint = sourceEndpoint ?? string.Empty;
        ReceivedAtUtc = DateTimeOffset.UtcNow;
        RawPayload = rawPayload;
    }
}
```

### Bloque 2: Contrato Normalizado (`NormalizedAlarmEvent`)
**Propósito:** Representación del evento parseado e interpretado, desacoplado del motor de origen, listo para ser distribuido a la UI en tiempo real (WebSockets/SignalR) y persistido en la BD.

```csharp
namespace SoftGuard.Core.Events;

/// <summary>
/// Representa el evento de alarma totalmente parseado y normalizado.
/// Abstraído de la lógica legacy de "Cuentas" y preparado para múltiples tipos de entidades.
/// </summary>
public sealed class NormalizedAlarmEvent
{
    // ID de trazabilidad distribuida (heredado del RawAlarmEvent - UUIDv7)
    public Guid EventId { get; init; }
    
    // ID numérico asignado tras la persistencia en BD (null mientras está solo en memoria)
    public long? DbPersistenceId { get; set; }
    
    // Estado actual dentro del ciclo de vida de atención humana / automática
    public EventProcessingStatus Status { get; set; } = EventProcessingStatus.Pending;
    
    // Marca de tiempo original de ingesta en red (UTC)
    public DateTimeOffset ReceivedAtUtc { get; init; }
    
    // Marca de tiempo del evento reportada por el dispositivo/panel (UTC)
    public DateTimeOffset DeviceTimestampUtc { get; init; }

    // --- Identificación Flexible del Emisor (Agnóstico a "Cuenta") ---
    public string SourceEntityId { get; init; } = string.Empty; // Ej: "ACC-1024", "CAM-NORTH-01", "IMEI-8642..."
    public EntityType EntityType { get; init; }                 // Enum: Account, Camera, Gps, Sensor, etc.
    public ushort? PartitionNumber { get; init; }              // Número de partición del panel (Ej: 1, 2, 8)
    
    // --- Jerarquía (Cuenta Madre / Entidad Superior) ---
    public string? ParentEntityId { get; init; }               // Ej: Cuenta Madre "ACC-1000" para particiones
    
    // --- Código y Calificador del Evento ---
    public string EventCode { get; init; } = string.Empty;     // Ej: "138", "BA", "MOTION_DETECTION"
    public EventQualifier Qualifier { get; init; }              // Enum: Alarm (New), Restore, Test, Supervisory
    public string? EventDescription { get; init; }             // Descripción legible (ej: "Robo Zona 4")
    
    // --- Contexto Secundario (Panel / Dispositivo) ---
    public string? ZoneId { get; init; }                       // Soporta IDs extendidos (VARCHAR 50)
    public string? UserId { get; init; }                       // Soporta IDs largos tipo MQTT (VARCHAR 50)
    public string? SourceId { get; init; }                     // Sensor secundario, LPR, etc. (VARCHAR 50)
    
    // --- Integraciones Multimedia (Video / Imágenes / RTSP) ---
    public IReadOnlyList<MediaAttachment>? MediaAttachments { get; init; }
    
    // --- Datos de Telemetría / Payload Adicional ---
    public GeoLocation? Location { get; init; }                // Opcional para GPS / Móviles
    public IReadOnlyDictionary<string, string>? Metadata { get; init; } // Key-Value para datos extra (ej: Temp, Batería)
}

public enum EventProcessingStatus : byte
{
    Pending = 0,     // Pendiente de atención / asignación
    InProcess = 1,   // En proceso por un operador o proceso
    Waiting = 2,     // En espera (temporizador / postergado)
    Processed = 3    // Finalizado / Resuelto
}

public enum EntityType : byte
{
    Unknown = 0,
    Account = 1,      // Cuenta de monitoreo tradicional
    GpsTracker = 2,   // Vehículo / Persona
    CameraLpr = 3,    // Cámara / Analítica de Video
    IoTSensor = 4,    // Sensor ambiental, barrera, etc.
    SystemNode = 5    // Infraestructura / Heartbeat
}

public enum EventQualifier : byte
{
    Unknown = 0,
    NewEvent = 1,     // Alarma / Apertura / Evento primario
    Restore = 3,      // Cierre / Restauración
    Supervisory = 6   // Test / Supervisión
}

public enum MediaType : byte
{
    ImageSnapshot = 1,
    RecordedVideo = 2,
    LiveRtspStream = 3,
    ExternalUrl = 4
}

public readonly record struct MediaAttachment(MediaType Type, string Url, string? Description = null);

public readonly record struct GeoLocation(double Latitude, double Longitude, float? Altitude = null, float? Speed = null);
