//MIGRADO2024
Ext.define('Common.model.STDepositoSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {        
            name: 'Id',
            type: 'int'
        },
       {
            name: 'dep_ccodigo',
            type: 'string'
        },{
            name: 'dep_cdescripcion',
            type: 'string'
        }
        
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/Deposito',        
        appendId : false
    }
});