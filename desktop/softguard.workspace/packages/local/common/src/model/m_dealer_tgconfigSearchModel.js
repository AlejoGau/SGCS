Ext.define('Common.model.m_dealer_tgconfigSearchModel', {
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
    	defaultValue: 'm_dealer_tgconfig'
        },
        //dtg_cdealer,dtg_config,dtg_parking_velocidad,dtg_parking_eventos
		{name:'dtg_cdealer',type:'string'},
        {name:'dtg_config',type:'string'},
        {name:'dtg_parking_eventos',type:'string'},
        {name:'dtg_parking_eventos_hide',type:'string'},
        {name:'dtg_parking_velocidad',type:'int'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/rest/m_dealer_tgconfig/',
		appendId : true,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
	}
});

																
