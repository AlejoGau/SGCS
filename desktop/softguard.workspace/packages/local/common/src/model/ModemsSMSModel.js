//MIGRADO2024
Ext.define('Common.model.ModemsSMSModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'sms_cdescripcion',
            type: 'string'
        }, 
        {
            name: 'sms_icodigo',
            type: 'int'
        },       
        {
            name: 'sms_nEstado',
            type: 'int'
            
        }
        
    ],
    proxy: { 
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url: '/Rest/t_modems_sms' ,
    	appendId : true      
    }
});