# Documentación de Cambios - Migración Sencha 4.2 a 7.0

## Archivo: SoftguardZonaController.js
**Ubicación:** `packages/local/common/src/controller/SoftguardZonaController.js`

### Problema Identificado
En el método `onSavePlantillaClick`, cuando se envían operaciones POST a través de Sencha 7, el framework automáticamente asigna IDs temporales con formato `DealerSearch.model.ZonaModel-1`, `DealerSearch.model.ZonaModel-2`, etc. Para operaciones POST (insertar), el ID debe ser `0`.

### Causa del Problema
En Sencha 7.0, cuando se crea un modelo usando `model.create({...})`, automáticamente se le asigna un ID temporal único para evitar conflictos. Sin embargo, para operaciones POST en el servidor, se requiere que el ID sea explícitamente `0` para indicar que es un nuevo registro a insertar.

### Cambios Realizados

#### 1. Corrección en creación de zona desde plantilla (línea 345)
**Ubicación:** Método `onSavePlantillaClick` - Creación de nueva zona cuando no existe
**Antes:**
```javascript
var zonaRecord = controller.getZonaModelModel().create({
  zon_iidcuenta: view.record.get('cue_iid'),
  zon_ccodigo: record.get('zon_ccodigo'),
  // ... otros campos
})
zonaRecord.save({
```

**Después:**
```javascript
var zonaRecord = controller.getZonaModelModel().create({
  zon_iidcuenta: view.record.get('cue_iid'),
  zon_ccodigo: record.get('zon_ccodigo'),
  // ... otros campos
})
zonaRecord.set("Id", 0);
zonaRecord.save({
```

#### 2. Corrección en reemplazo de zona existente (línea 402)
**Ubicación:** Método `pedirConfirmacion` - Reemplazo de zona existente
**Antes:**
```javascript
var zonaRecord = controller.getZonaModelModel().create({
  zon_iidcuenta: record.get('Id'),
  zon_ccodigo: record.get('zon_ccodigo'),
  // ... otros campos
})

zonaRecord.save({
```

**Después:**
```javascript
var zonaRecord = controller.getZonaModelModel().create({
  zon_iidcuenta: record.get('Id'),
  zon_ccodigo: record.get('zon_ccodigo'),
  // ... otros campos
})
zonaRecord.set("Id", 0);

zonaRecord.save({
```

#### 3. Simplificación en creación de zona en plantilla (línea 516)
**Ubicación:** Método `onCreatePlantillaClick` - Creación de zona en plantilla
**Antes:**
```javascript
var newZonaModel = modelZona.create({
  zon_iid: idPlantilla,
  zon_ccodigo: record.get('zon_ccodigo'),
  // ... otros campos
})

if (isNaN(newZonaModel.id)) {
  newZonaModel.id = 0
  newZonaModel.data.Id = 0
}
```

**Después:**
```javascript
var newZonaModel = modelZona.create({
  zon_iid: idPlantilla,
  zon_ccodigo: record.get('zon_ccodigo'),
  // ... otros campos
})

newZonaModel.set("Id", 0);
```

#### 4. Simplificación en creación de plantilla (línea 471)
**Ubicación:** Método `onCreatePlantillaClick` - Creación de nueva plantilla
**Antes:**
```javascript
var newPlanillaModel = controller
  .getM_planillaModelModel()
  .create({
    pla_cNombreTabla: 'M_ZONAS',
    pla_cDescripcion: nombrePlantilla.getValue()
  })

if (isNaN(newPlanillaModel.id)) {
  newPlanillaModel.id = 0
  newPlanillaModel.data.Id = 0
}
```

**Después:**
```javascript
var newPlanillaModel = controller
  .getM_planillaModelModel()
  .create({
    pla_cNombreTabla: 'M_ZONAS',
    pla_cDescripcion: nombrePlantilla.getValue()
  })

newPlanillaModel.set("Id", 0);
```

### Resultado Esperado
Con estos cambios, todas las operaciones POST en el método `onSavePlantillaClick` enviarán correctamente `Id: 0` al servidor en lugar de IDs temporales como `DealerSearch.model.ZonaModel-1`.

### Notas Técnicas
- Los cambios solo afectan operaciones POST (insertar nuevos registros)
- Las operaciones GET, PUT y DELETE mantienen sus IDs reales
- Se simplificó la lógica de verificación `isNaN` por el método estándar `set("Id", 0)`
- Todos los cambios son compatibles con Sencha 7.0
- No se modificó la lógica de negocio, solo la gestión de IDs

### Principio Aplicado
**Para operaciones de modelo en Sencha 7:**
- **POST (insertar)**: `model.set("Id", 0)`
- **GET (leer)**: Usar ID real del registro
- **PUT (actualizar)**: Usar ID real del registro
- **DELETE (eliminar)**: Usar ID real del registro

#### 9. Corrección del método pedirConfirmacion - Problema de destroy() (línea 425-495)
**Problema:** El método `destroy()` no ejecutaba su callback en Sencha 7, causando que el proceso de reemplazo se quedara colgado.

**Solución:** Aplicar el mismo patrón que usa el método `onDeleteClick` que sí funciona:

**Antes:**
```javascript
records[index].viejo.setConfig({
  proxy: controller.getZonaModelModel().getProxy()
});
records[index].viejo.destroy({
  callback: function (viejo, operation) {
    // Este callback nunca se ejecutaba
  }
});
```

**Después:**
```javascript
// Primero cargar el registro completo y luego borrarlo (igual que onDeleteClick)
var zonaModel = controller.getSoftguardZonaModelModel();
var idABorrar = records[index].viejo.get('Id');

zonaModel.load(idABorrar, {
  callback: function (recordErase) {
    recordErase.erase({
      callback: function (record, operation) {
        // Ahora sí se ejecuta correctamente
        if (operation.success) {
          // Continuar con el flujo...
        }
      }
    });
  }
});
```

#### 10. Manejo de estructura de datos Sencha 7 en plantillas (línea 328-363)
**Problema:** Aplicar la misma corrección de estructura de datos que se hizo en HorarioController.

**Solución:**
```javascript
// En Sencha 7, los datos pueden estar en records[0].data.rows[]
var actualRecords = records;
if (records.length > 0 && records[0].data && records[0].data.rows) {
  actualRecords = records[0].data.rows;
}

Ext.each(actualRecords, function (record) {
  var recordData = record.data || record;
  var codigo = recordData.zon_ccodigo;
  // Usar recordData en lugar de record.get()
});
```

### Resultado Final
Con todos estos cambios, el método `onSavePlantillaClick` funciona correctamente en Sencha 7.0:
- ✅ Carga plantillas correctamente
- ✅ Detecta zonas existentes
- ✅ Pide confirmación para reemplazar
- ✅ Borra registros existentes de la BD
- ✅ Inserta nuevos registros correctamente
- ✅ Actualiza la grilla sin errores

### Lecciones Aprendidas Adicionales
1. **Patrón de eliminación**: En Sencha 7, usar `model.load()` → `record.erase()` en lugar de `record.destroy()` directamente
2. **Debugging efectivo**: Los logs detallados fueron clave para identificar que el callback de `destroy()` no se ejecutaba
3. **Reutilizar patrones existentes**: Revisar métodos que ya funcionan para aplicar la misma lógica
4. **Protección contra errores**: Usar try-catch en `findRecord()` para manejar stores inconsistentes

#### 11. Refactorización: Función genérica de borrado de zonas (líneas 144-159)
**Problema:** La lógica de DELETE estaba duplicada entre `onDeleteClick` y `pedirConfirmacion`, y ambos tenían el mismo problema de envío incorrecto al servidor.

**Solución:** Crear una función genérica `borrarZona` que encapsule el patrón correcto de borrado:

**Nueva función `borrarZona`:**
```javascript
borrarZona: function (zonaId, controller, onSuccess, onError) {
  var zonaModel = controller.getSoftguardZonaModelModel();
  zonaModel.load(zonaId, {
    callback: function (recordErase) {
      recordErase.erase({
        callback: function (record, operation) {
          if (!operation.success) {
            if (onError) onError(operation);
          } else {
            if (onSuccess) onSuccess(record, operation);
          }
        }
      });
    }
  });
}
```

#### 12. Refactorización del método `onDeleteClick` (líneas 175-184)
**Antes:**
```javascript
var zonaModel = controller.getSoftguardZonaModelModel();
for (var key in selection) {
  zonaModel.load(selection[key].get('Id'), {
    callback: function (recordErase) {
      recordErase.erase({
        callback: function (record, operation) {
          // lógica específica...
        }
      });
    }
  });
}
```

**Después:**
```javascript
for (var key in selection) {
  controller.borrarZona(
    selection[key].get('Id'),
    controller,
    function (record, operation) {
      view.getStore().load();
    },
    function (operation) {
      notify('No se pudo eliminar la zona. Verifique no tenga un video relacionado.');
    }
  );
}
```

#### 13. Corrección final del método `pedirConfirmacion` (líneas 388-445)
**Antes:**
```javascript
records[index].viejo.erase({
  callback: function (record, operation) {
    // El problema: registro del grid sin proxy correcto
  }
});
```

**Después:**
```javascript
controller.borrarZona(
  idABorrar,
  controller,
  function (record, operation) {
    console.log('DEBUG - Resultado del erase: ÉXITO');
    store.remove(records[index].viejo);
    // Continuar con inserción...
  },
  function (operation) {
    console.log('DEBUG - Error al eliminar zona:', operation);
    notify('Error al eliminar la zona existente.');
    // Manejar error...
  }
);
```

### Resultado Final Completo
Con todas estas correcciones, el método `onSavePlantillaClick` funciona completamente en Sencha 7.0:

#### ✅ Funcionalidades Operativas:
1. **Carga plantillas** - Maneja estructura de datos Sencha 7 (`records[0].data.rows`)
2. **Detecta zonas existentes** - Busca correctamente en el store
3. **Pide confirmación** - Modal de confirmación funciona
4. **Borra registros existentes** - DELETE con payload completo al endpoint correcto
5. **Inserta nuevos registros** - POST con `Id: 0` correcto
6. **Actualiza la grilla** - Refleja cambios inmediatamente
7. **Manejo de errores** - Logs detallados y notificaciones al usuario

#### 🔧 Patrones de Borrado Implementados:
**Endpoint correcto:**
- ❌ **Incorrecto**: `DELETE /rest/Zona/` con `{Id: 16747}`
- ✅ **Correcto**: `DELETE /rest/Zona/16747` con payload completo

**Patrón implementado:**
1. `zonaModel.load(zonaId)` - Obtener registro completo de la BD
2. `recordErase.erase()` - Eliminar con proxy y datos correctos
3. Callbacks específicos para cada contexto de uso

#### 🏗️ Beneficios de la Refactorización:
1. **Reutilización de código** - Una sola función para todas las operaciones DELETE
2. **Consistencia** - Mismo patrón en `onDeleteClick` y `pedirConfirmacion`
3. **Mantenibilidad** - Un solo lugar para modificar lógica de borrado
4. **Corrección técnica** - Resuelve el problema de 405 Method Not Allowed
5. **Debugging mejorado** - Logs centralizados y claros

### Lecciones Aprendidas Finales
1. **Encapsulación de patrones**: Cuando se encuentra un patrón que funciona, encapsularlo en una función reutilizable
2. **Sencha 7 quirks**: Los registros del grid no siempre tienen el proxy correcto para operaciones CRUD
3. **Debugging sistemático**: Los logs detallados fueron clave para identificar el problema del payload incorrecto
4. **Refactoring incremental**: Mejor hacer cambios pequeños y probar que cambios grandes que rompan todo
5. **Reutilización vs duplicación**: Duplicar código lleva a duplicar bugs

### Fecha de Modificación
20 de septiembre de 2025

### Desarrollador
Claude Code (Documentación automática)