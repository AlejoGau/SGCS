//MIGRADO2024
Ext.define('Common.model.EventPhoneSearchModel', {
    extend: 'Ext.data.Model',
    fields: [{
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
        name: 'ope_clogin',
        type: 'string',
        mapping:'ope_cnombre'
    },{
        name: 'rec_isoFechaHora',
        type: 'date',
		dateFormat : 'c'
    }],
    proxy: {
        type: 'eventphonesearchproxy',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
    }   
});