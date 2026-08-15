//MIGRADO2024
Ext.define( 'Common.model.ServTecVisitaModel', {
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
            name: 'svi_cObservacion',
            type: 'string'
        }, {
            name: 'svi_iEstado',
            type: 'int'
        }, {
            name: 'svi_iFormaDeViaje',
            type: 'int'
        }, {
            name: 'svi_tFechaHora',
            type: 'date', dateFormat: 'MS'
        }, {
            name: 'svi_iServicio',
            type: 'int'
        }, {
            name: 'svi_tSalidaHaciaCliente',
            type: 'date', dateFormat: 'MS'
        }, {
            name: 'svi_tArriboAlCliente',
            type: 'date', dateFormat: 'MS'
        }, {
            name: 'svi_tSalidaDelCliente',
            type: 'date', dateFormat: 'MS'
        },
        {
            name: 'svi_cHorasPlanificadas',
            type: 'string'
        },
        {
            name: 'svi_nDuracionEstimada',
            type: 'float',
            defaultValue: 1
        }
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/SerTecVisitas/',
        appendId: true,
        writer: { writeAllFields: true }
    }
});