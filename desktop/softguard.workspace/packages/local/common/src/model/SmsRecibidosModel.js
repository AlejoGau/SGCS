//MIGRADO2024
Ext.define('Common.model.SmsRecibidosModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'rec_tFechaHora',
            type: 'string'
        },{
            name: 'rec_cContenido',
            type: 'string'
        },{
            name: 'rec_cObservaciones',
            type: 'string'
        },{
            name: 'ope_cnombre',
            type: 'string'
        },{
            name: 'rec_isoFechaHora',
            type: 'date',
            dateFormat : 'c'
        }],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/smsinbox'
        
    }
    
});