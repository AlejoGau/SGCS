Ext.define('ResourceModule.model.ResourceModuleModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string', defaultValue: 'ResourceModule' },
        { name: 'rmo_cNombre', type: 'string' },
        { name: 'rmo_iTypeId', type: 'int' },
        { name: 'rmo_cImagen', type: 'string' },
        { name: 'rmo_cObservacion', type: 'string' },
        { name: 'rmo_cMarcaModelo', type: 'string' },
        { name: 'rmo_cNumeroSerie', type: 'string' },
        { name: 'rmo_iCuentaId', type: 'int' },
        { name: 'rmo_tfechaasignacion', type: 'date', dateFormat: 'MS' },
        { name: 'rmo_tfechadevolucion', type: 'date', dateFormat: 'MS' },
        { name: 'rmo_iestado', type: 'int' }, //0: no asignado, 1: asignado
        { name: 'rmo_tfechaentrega', type: 'date', dateFormat: 'MS' },
        { name: 'rmo_cDocumento', type: 'string' },
        { name: 'rmo_rmbidkey', type: 'int' }
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/ResourceModule/',
        appendId: true,
        writer: {
            writeAllFields: true
        }
    }
});