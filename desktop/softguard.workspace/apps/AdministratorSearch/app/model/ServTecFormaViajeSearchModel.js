Ext.define('AdministratorSearch.model.ServTecFormaViajeSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {        
            name: 'Id',
            type: 'int'
        },
       {
            name: 'sfv_cNombre',
            type: 'string'
        },{
            name: 'sfv_idKey',
            type: 'int'
        }

        
        
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/SerTecFormaViajeVisitas/',        
        appendId : false
    }
});