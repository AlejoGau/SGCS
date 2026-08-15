Ext.define('AdministratorSearch.model.LogGatewaySearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'},
        {name: 'MachineName', type: 'string'},
        {name: 'Logged', type: 'date', dateFormat: 'c'},
        {name: 'Level', type: 'string'},
        {name: 'ServiceName', type: 'string'},
        {name: 'Message', type: 'string'},
        {name: 'Logger', type: 'string'},
        {name: 'Properties', type: 'string'},
        {name: 'Callsite', type: 'string'},
        {name: 'Exception', type: 'string'},
        {name: '_Message', type: 'string'}
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SearchLogGateway',
		appendId : true
	}
});

																
