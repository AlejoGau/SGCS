Ext.define('ResourceModule.model.ResourceModuleSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'ObjectTypeId',
            type: 'int',
            defaultValue: 7054
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'ResourceModule'
        },
        {
            name: 'Id',
            type: 'int'
        },
        {
            name: 'rmo_cImagen',
            type: 'string'
        },
        {
            name: 'rmo_cMarcaModelo',
            type: 'string'
        },
        {
            name: 'rmo_cNombre',
            type: 'string'
        },
        {
            name: 'rmo_cNumeroSerie',
            type: 'string'
        },
        {
            name: 'rmo_cObservacion',
            type: 'string'
        },
        {
            name: 'rmo_iTypeId',
            type: 'int'
        },
        {
            name: 'rmo_iestado',
            type: 'int'
        },
        {
            name: 'rmt_cNombre',
            type: 'string'
        },
        {
            name: 'estadoStr',
            type: 'string',
            calculate: function (data) {
                if (data.rmo_iestado === 1) {
                    return 'Asignado';
                } else if (data.rmo_iestado === 0) {
                    return 'No Asignado';
                } else {
                    return 'No se encuentra el estado';
                }
            }
        },
        { name: 'rmo_tfechaasignacion', type: 'date' },
        { name: 'rmo_tfechadevolucion', type: 'date' },
        { name: 'rmo_tfechaentrega', type: 'date' },
        { name: 'rmo_cDocumento', type: 'string' },
        { name: 'cue_clinea', type: 'string' },
        { name: 'cue_ncuenta', type: 'string' },
        { name: 'cue_cnombre', type: 'string' },
        {
            name: 'cuentaVinculada', type: 'string',
            calculate: function (data) {
                return data.cue_clinea + ' - ' + data.cue_ncuenta + ' - ' + data.cue_cnombre;
            }

        },
        { name: 'rmo_rmbidkey', type: 'int' },
        { name: 'rmb_cNombre', type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/search/ResourceModuleSearch',
        appendId: true,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total'
        }
    },

});