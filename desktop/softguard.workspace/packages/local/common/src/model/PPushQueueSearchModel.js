//MIGRADO2024
Ext.define('Common.model.PPushQueueSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
            name: 'Id',
            type: 'int'
        },{
            name: 'ppq_msg',
            type: 'string'
        },{
            name: 'ppq_estado',
            type: 'int'
        },{
            name: 'ppq_fechacreacion',
            type:'date'
        },{
            name: 'ppq_fechaenvio',
            type:'date'
        },
        /* Se agregaron en la tabla P_PUSH_QUEUE nuevos campos */
        {
            name: 'ppq_idcuenta',
            type: 'int'
        },{
            name: 'ppq_idmessage',
            type: 'int'
        },{        
            name: 'msgBody',
            type: 'string'
        },{        
            name: 'idDestino',
            type: 'string'
        },{
            name: 'cuentaOrigen',
            type: 'string'
        },{
            name: 'clineaOrigen',
            type: 'string'
        },{
            name: 'ncuentaOrigen',
            type: 'string'
        },{
            name: 'nombreOrigen',
            type: 'string'
        },{
            name: 'telefonoDestino',
            type: 'string'
        },{
            name: 'lineaDestino',
            type: 'string'
        },{
            name: 'nombreDestino',
            type: 'string'
        },{
            name: 'fechacreacion',
            type: 'string'
        },{
            name: 'fechaenvio',
            type: 'string'
        },{
            name: 'msStatus',
            type: 'int'
        },{
            name: 'msName',
            type: 'string'
        }
  
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/SearchPPushQueue'
	}
});