//MIGRADO2024
Ext.define('Common.model.m_dealer_vcconfigSearchModel', {
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
		defaultValue: 'm_dealer_spconfig'
        },
		{name:'dvc_cdealer',type:'string'},
        {name:'dvc_config',type:'string'},
        {name:'dvc_apptype',type:'string',defaultValue:'VIGICONTROL'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/m_dealer_vcconfig',
		appendId : true,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
	}
});
																