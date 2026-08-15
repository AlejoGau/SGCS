//MIGRADO2024
Ext.define('Common.model.m_dealer_spconfigModel', {
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
		{name:'dsp_cdealer',type:'string'},
        {name:'dsp_config',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/m_dealer_spconfig/',
		appendId : true,
        
	}
});
																