//MIGRADO2024
Ext.define('Common.model.m_stock_totalesSearchModel', {
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
            name: 'stt_iddeposito',
            type: 'int'
        },{
            name: 'depositoName',
            type: 'string'
        },{
            name: 'stt_idproducto',
            type: 'int'
        },{
            name: 'productoName',
            type: 'string'
        },{
            name: 'stt_cant',
            type: 'int'
        },{
            name: 'stt_fecha',
            type: 'date'
        },{
            name: 'Code',
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
        url : '/Rest/search/m_stock_totales',        
        appendId : false
    }
});