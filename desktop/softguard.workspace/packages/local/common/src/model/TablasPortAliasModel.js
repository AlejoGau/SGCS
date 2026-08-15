//MIGRADO2024
Ext.define('Common.model.TablasPortAliasModel', {
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
        {name:'tpa_iportip',type:'int'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_port_alias/',
		appendId : true
		}
});