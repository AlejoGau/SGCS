Ext.define('AdministratorSearch.model.p_lista_correosModel', {
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
        defaultValue: 403
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'p_lista_correo'
        },
		{name:'plc_name',type:'string'},
        {name:'plc_dealer',type:'string'},
        {name:'plc_correos',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/p_lista_correo/',
		appendId : true
		}
});