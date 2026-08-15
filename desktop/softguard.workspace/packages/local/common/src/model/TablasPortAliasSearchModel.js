//MIGRADO2024
Ext.define('Common.model.TablasPortAliasSearchModel', {
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
    	defaultValue: 3093
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_port_alias'
        },
		{name:'tpa_icodigo',type:'int',defaultValue:0},
        {name:'tpa_cdealer',type:'string'},
        {name:'tpa_ipuerto',type:'int'},
        {name:'tpa_iportip',type:'int'},
        {name:'rec_cdescripcion',type:'string'},
        {name:'ipc_cdescripcion',type:'string'},
        {name:'pue_cdescripcion',type:'string'}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_port_alias',
		appendId : true
	}
});