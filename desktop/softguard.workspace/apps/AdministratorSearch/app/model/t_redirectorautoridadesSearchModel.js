Ext.define('AdministratorSearch.model.t_redirectorautoridadesSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        mappgin:'trd_idkey'
        
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3029
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'redirector'
        },
		{name:'trd_cnombre',type:'string'},
        {name:'trd_cdealer',type:'string'},
        {name:'trd_ceventos',type:'string'},
        {name:'trd_idestino',type:'int',defaultValue:1}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_redirector/',
		appendId : true
	}
});