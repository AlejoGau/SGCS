Ext.define('AdministratorSearch.model.s_ip_rangeModel', {
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
        {
            xtype : 'combo',
    		fieldLabel : 'Activo',
			store : 'SiNoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
			valueField : 'Value',
			name : "ipr_estado",
            itemId: 'ipr_estado'
            
		}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/s_ip_range/',
		appendId : true
		}
});

																
