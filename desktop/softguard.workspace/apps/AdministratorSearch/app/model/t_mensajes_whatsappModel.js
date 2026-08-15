Ext.define('AdministratorSearch.model.t_mensajes_whatsappModel', {
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
		url : '/Rest/t_mensajes_whatsapp/',
		appendId : true
	}
});