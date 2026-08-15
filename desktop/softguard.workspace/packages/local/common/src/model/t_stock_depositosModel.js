//MIGRADO2024
Ext.define('Common.model.t_stock_depositosModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {        
            name: 'Id',
            type: 'int'
        },
       {
            name: 'Name',
            type: 'string'
        },{
            name: 'tsd_idorganizacion',
            type: 'int'
        },{
            name: 'tsd_estado',
            type: 'int'
        },{
            name: 'tsd_idtecnico',
            type: 'int'
        }
        
    ],
    proxy : {        
        type : 'rest',
        
        url : '/Rest/t_stock_depositos',        
        appendId : true
    }
});