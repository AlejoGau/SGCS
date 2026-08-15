Ext.define('AdministratorSearch.model.w_destinatarios_correoModel', {
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
        defaultValue: 3107
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
		url : '/Rest/w_destinatarios_correo/',
		appendId : true
		}
});