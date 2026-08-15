Ext.define('AdministratorSearch.model.t_mailConnectorModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        
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
        },
        {name:'mcn_name',type:'string'},
        {name:'mcn_username',type:'string'},
        {name:'mcn_password',type:'string'},
        {name:'mcn_popserver',type:'string'},
        {name:'mcn_popport',type:'string'},
        {name:'mcn_popssl',type:'string'},
        {name:'mcn_ipconid',type:'int'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_mailConnector/',
		appendId : true
	}
});