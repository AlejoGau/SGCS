
Ext.define('AdministratorSearch.model.s_ip_rangeSearchModel', {
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
    	defaultValue: 3182
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 's_ip_range'
        },
		{name:'ipr_name'},
        {name:'ipr_desde',type:'string'},
        {name:'ipr_hasta',type:'string'},
        {name:'ipr_estado',type:'int',defaultValue:0}
    ],
	proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/s_ip_range/',
		appendId : false
	}	

});

																
