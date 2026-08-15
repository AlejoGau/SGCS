//MIGRADO2024
Ext.define('Common.model.EventProcesamientoSearchModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ope_cnombre',
        type: 'string'
    },{
        name: 'pro_nProceso',
        type: 'string'
    },{
        name: 'pro_tfechahora',
        type: 'string'
    },{
        name: 'rec_tfechahora',
        type: 'string'
    },{
        name: 'pro_isofechahora',
        type: 'date',
    	dateFormat : 'c'
    }],
    proxy: {
        type: 'eventprocesamientosearchproxy',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
    }  
});