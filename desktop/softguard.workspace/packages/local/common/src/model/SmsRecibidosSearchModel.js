//MIGRADO2024
Ext.define('Common.model.SmsRecibidosSearchModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'rec_tFechaHora', type: 'date', dateFormat:'n/j/Y g:i:s A', defaultValue: new Date(-62135586000000)},
        {
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
        },{
            name: 'rec_iidcuenta',
            type: 'int'
            
        },{
            name: 'cue_clinea',
            type: 'string'
        },{
            name: 'cue_cnombre',
            type: 'string'
        },{
            name: 'cue_ncuenta',
            type: 'string'
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