//MIGRADO2024
Ext.define('Common.model.EventObservacionesSearchModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'cObs',
        type: 'string'
    },
    {
        name: 'fecha',
        type: 'string'
    },{
        name: 'usuario',
        type: 'string'
    },{
        name: 'comentario',
        type: 'string'
    }],
    proxy: {
        type: 'eventobservacionessearchproxy',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
    }
});