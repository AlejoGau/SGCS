//MIGRADO2024
Ext.define('Common.model.m_stock_cabeceraModel', {
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
            name: 'stc_iddepositoorigen',
            type: 'int'
        },{
            name: 'stc_iddepositodestino',
            type: 'int'
        },{
            name: 'stc_iusuariodss',
            type: 'int'
        },{
            name: 'stc_itecnico',
            type: 'int'
        },{
            name: 'stc_tipomov',
            type: 'string'
        },{
            name: 'stc_comprobantetipo',
            type: 'string'
        },{
            name: 'stc_comprobante',
            type: 'string'
        },{
            name: 'stc_referencia',
            type: 'string'
        },{
            name: 'stc_descripcion',
            type: 'string'
        },{
            name: 'stc_fecha',
            type: 'date'
        }
        
    ],
    proxy : {        
        type : 'rest',
        
        url : '/Rest/m_stock_cabecera',        
        appendId : true
    }
});