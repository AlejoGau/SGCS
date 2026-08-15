//MIGRADO2024
Ext.define('Common.model.STDepositoModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {        
            name: 'Id',
            type: 'int'
        },{
            name: 'Name',
            type: 'string'
        },{
            name: 'dep_ccodigo',
            type: 'string'
        },{
            name: 'dep_cdescripcion',
            type: 'string'
        }
        
    ],
    proxy : {        
        type : 'rest',
        
        url : '/Rest/Deposito',        
        appendId : true
    }
});