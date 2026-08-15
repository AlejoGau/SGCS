//MIGRADO2024
Ext.define('Common.model.m_stock_itemModel', {
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
        }
        
    ],
    proxy : {        
        type : 'rest',
        
        url : '/Rest/m_stock_item',        
        appendId : true
    }
});