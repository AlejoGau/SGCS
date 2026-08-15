//MIGRADO2024
Ext.define('Common.model.w_destinatarios_correoSearchModel', {
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
        defaultValue: 500
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'w_destinatarios_correo'
        },
		{name:'destino',type:'string'},
        {name:'email_destino',type:'string'}
      ],  
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/w_destinatarios_correo',
		appendId : true,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
	}
});
																