# SelecterField y Helper (Resumen)

## Familia de componentes
- `Common.view.SelecterField`: fieldset reutilizable que se embebe en formularios.
- `Common.view.SelecterHelperView`: ventana modal que abre el SelecterField para elegir registros.
- `Common.controller.SelecterHelperController`: orquesta carga remota, selección y eventos.
- `Common.model.selecterModel`: modelo `{ name }` usado para renderizar la grilla de seleccionados.

## Estructura general
```
<fieldset.selecterfield>
  [Seleccione] botón (#evento)
  [Eliminar] botón (#deleteEvent)
  grid #gridname  -> resumen de ítems seleccionados
  displayfield oculto #codevento -> ids separados por coma
```

## Configuración relevante
| Config | Valor por defecto | Descripción |
| --- | --- | --- |
| `title` | `''` | Título del fieldset. |
| `valueField` | _(requerido)_ | Campo con el identificador real. |
| `filterValueField` | `null` | Campo alternativo para reconstruir selección (prefill). |
| `valueFieldFilter` | `''` | Sufijo opcional para el filtro. |
| `prefijoParaFiltro` | `null` | Prefijo (alias de asociación) para el filtro. |
| `selecionado.field` | _(requerido)_ | Campo mostrado en la grilla de seleccionados. |
| `disponible.field` | _(requerido)_ | Campo mostrado en la grilla del helper. |
| `modelItems` | _(requerido)_ | Modelo usado por los stores remotos. |
| `simpleSelect` | `true` | Cierra helper tras elegir un ítem. |
| `autoLoadSelected` | `true` | Si es `false`, evita el fetch en `setValue`. |
| `buildSelectedDisplay(values, field)` | `undefined` | Callback para armar el resumen cuando `autoLoadSelected` es `false`. |

## Flujo de eventos
1. **Bind inicial**: `form.loadRecord` → `selecterfield.setValue(idsExistentes)`.
2. **`setValue`**:
   - *Modo auto-load* (`autoLoadSelected !== false`): crea un store temporal filtrado y carga los registros para poblar `#gridname` y disparar `change`.
   - *Modo prefill* (`autoLoadSelected === false`): no hace request; usa `buildSelectedDisplay` (si existe) para poblar el resumen y sólo actualiza `#codevento`.
3. **Botón “Seleccione”** (`#evento`): el helper abre una ventana con `SelecterHelperView` y las filtraciones recibidas en `selecterfield.filter`.
4. **Ventana helper**: el store remoto (`combostore`) trae resultados, se seleccionan filas que luego disparan `selectedEvents` → `eventsSelected` actualiza la grilla de resumen y el hidden.

## Configuración típica
```javascript
{
    xtype: 'selecterfield',
    filter: [{ property: 'iidCuenta', value: cuentaId }],
    config: {
        disponible: { field: 'nombre', searchField: 'nombre' },
        selecionado: { field: 'nombre' },
        valueField: 'video_id',
        filterValueField: 'id',
        autoLoadSelected: false,
        buildSelectedDisplay: function(values, field) {
            var form = field.up('svrouteanalysispointformview');
            if (!form) { return values; }
            var resumen = form.down('#cameraSummary');
            var texto = resumen ? resumen.getValue() : '';
            return texto ? [{ name: texto }] : values;
        },
        modelItems: 'Common.model.SofiaVideoDataSearchModel'
    }
}
```

## Guía de depuración
- El componente emite `console.debug` con el prefijo `[SelecterField]` indicando la rama (`autoload` o `prefill`), filtros y resultados.
- Para investigar problemas, habilitar la consola del navegador antes de aplicar cambios y revisar estos logs.

## Notas
- `#gridname` es informativo; los ids reales viajan en `#codevento`.
- Los controladores deben alimentar `selecterfield.filter` para limitar resultados (ej.: por cuenta).
- Con `autoLoadSelected` desactivado, mostrar el resumen vía `buildSelectedDisplay` o con un displayfield aledaño.
