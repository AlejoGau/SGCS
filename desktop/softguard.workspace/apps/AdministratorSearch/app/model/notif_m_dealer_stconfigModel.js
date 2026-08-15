Ext.define('AdministratorSearch.model.notif_m_dealer_stconfigModel', {
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
    	defaultValue: 'm_dealer_stconfig'
        },
		{name:'dst_cdealer',type:'string'},
        {name:'dst_config',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/m_dealer_stconfig/',
		appendId : true,
        
	}
});

																
