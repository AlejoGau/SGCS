//MIGRADO2024
Ext.define('Common.model.EventImagesSearchModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'gri_carchivo',
        type: 'string'
    },{
        name: 'gri_ccarpeta',
        type: 'string'
    },{
        name: 'gri_isofechahora',
        type: 'date',
        dateFormat: 'c'
    }],
    proxy: {
        type: 'eventimagessearchproxy',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
    }  
});