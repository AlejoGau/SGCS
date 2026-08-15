Ext.define('WebRemoto.model.t_mensajes_whatsappSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 3220
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_mensajes_whatsapp'
        },
        {name:'tmw_ctitulo',type:'string'},
        {name:'tmw_cmensaje',type:'string'}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_mensajes_whatsapp/',
		appendId : true
	}
});