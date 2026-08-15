//MIGRADO2024
Ext.define('Common.model.p_rxlogSearchModel', {
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
        defaultValue: 3092
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'p_rxlog'
        },
		{name:'rxl_iId',type:'int',defaultValue:0},
        {name:'rxl_iRecId',type:'int',defaultValue:0},
        {name:'rxl_cLog',type:'string'},
        {name:'rxl_cDll',type:'string'},
        {name:'rxl_cEvento',type:'string'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/rest/search/p_rxlog',
		appendId : true
	}
});