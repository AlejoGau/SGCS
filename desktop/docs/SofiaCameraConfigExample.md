# Configuración de cámara SofIA – ejemplo de intercambio

Este documento resume el payload JSON que envía el Administrador cuando se guarda la configuración de una cámara con zonas de detección. Úselo como referencia para validar el backend de detección y acordar ajustes.

```json
{
    "analytics": {
        "people": {
            "enabled": true,
            "minConfidence": 50
        },
        "vehicles": {
            "enabled": true,
            "minConfidence": 50
        },
        "motionZone": {
            "enabled": true,
            "polygon": [
                [0.07627634959177929, 0.08119661380083133],
                [0.3993994360571509, 0.13888892149313903],
                [0.5015015748170045, 0.7692307692307693],
                [0.05945945945945946, 0.9337608141776843]
            ],
            "snapshotUrl": null
        },
        "smokeFire": {
            "enabled": true,
            "sensitivity": 50
        }
    },
    "integrity": {
        "connection": {
            "enabled": true
        },
        "outOfFocus": {
            "enabled": true,
            "threshold": 20
        },
        "difference": {
            "enabled": true,
            "threshold": 10
        },
        "cover": {
            "enabled": true
        }
    }
}
```

### Notas
- Los valores de `polygon` están normalizados (0..1) en base al ancho/alto del snapshot para facilitar la adaptación a distintos tamaños de imagen.
- `snapshotUrl` queda en `null` cuando no se adjunta imagen de referencia; el microloader y la UI toleran este caso.
- Las secciones `analytics` e `integrity` pueden extenderse (por ejemplo, nuevos módulos). Acordar cualquier cambio con anticipación para mantener compatibilidad con el backend de detección.
