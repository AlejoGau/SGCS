//MIGRADO2024
Ext.define('Common.model.AwccUsuarioModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Login',
    fields: [
        {
            name: 'Name',
            type: 'string',
            mapping: 'Login'
        },
        {
            name: 'ObjectTypeId',
            type: 'int',
            defaultValue: 3063
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
        	defaultValue: 'w_usuarios'
        },
		{name:'Login'},
        {name:'Email'},
        {name:'Password'},
        {name:'CueIId'},
        {name:'Entity', type:'int', default: 0},
        {name:'LoginTemplate'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Security/AWCC/Usuarios',
		appendId : false
	}
});