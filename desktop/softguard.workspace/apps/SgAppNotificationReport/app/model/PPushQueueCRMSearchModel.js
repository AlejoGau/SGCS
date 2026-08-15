Ext.define('SgAppNotificationReport.model.PPushQueueCRMSearchModel', {
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
        },{
            name: 'ppq_idcuenta',
            type: 'int'
        },{
            name: 'ppq_idmessage',
            type: 'int'
        },{
            name: 'idOrigen',
            type: 'int'
        },{
            name: 'lineaOrigen',
            type: 'string'
        },{
            name: 'nombreOrigen',
            type: 'string'
        },{
            name: 'msgTitle',
            type: 'string'
        },{
            name: 'msgBody',
            type: 'string'
        },{
            name: 'clineaDestino',
            type: 'string'
        },{
            name: 'ncuentaDestino',
            type: 'string'
        },{
            name: 'cnombreDestino',
            type: 'string'
        },{
            name: 'fechacreacion',
            type:'date'
        },{
            name: 'fechaenvio',
            type:'date'
        }       
        
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/SearchPPushQueueCRM'
    }
});