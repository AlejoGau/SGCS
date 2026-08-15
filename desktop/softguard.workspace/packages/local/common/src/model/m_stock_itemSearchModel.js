//MIGRADO2024
Ext.define('Common.model.m_stock_itemSearchModel', {
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
            name: 'sti_idcabecera',
            type: 'int'
        },{
            name: 'sti_idproducto',
            type: 'int'
        },{
            name: 'sti_cant',
            type: 'int'
        },{
            name: 'nombreProducto',
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
        url : '/Rest/search/m_stock_item',        
        appendId : false
    }
});