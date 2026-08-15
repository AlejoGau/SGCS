//MIGRADO2024
Ext.define('Common.model.m_stock_cabeceraSearchModel', {
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
        },{
            name: 'nameOrigen',
            type: 'string'
        },{
            name: 'nameDestino',
            type: 'string'
        },{
            name: 'ins_cnombre',
            type: 'string'
        },{
            name: '_stc_tipomov',
            type: 'string',
            convert: function(v, record){
                
                if(record.get('stc_tipomov') == 'EG') {
                    return 'Egreso';
                } else if(record.get('stc_tipomov') == 'IN') {
                    return 'Ingreso';
                } else if(record.get('stc_tipomov') == 'Mo') {
                    return 'Movimiento';
                } else {
                    return 'No definido';
                }
            }
        },{
            name: 'udw_usuario',
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
        url : '/Rest/search/m_stock_cabecera',        
        appendId : false
    }
});