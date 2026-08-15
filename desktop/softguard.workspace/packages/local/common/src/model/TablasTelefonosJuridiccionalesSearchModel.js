//MIGRADO2024
Ext.define('Common.model.TablasTelefonosJuridiccionalesSearchModel', {
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
        defaultValue: 3099
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_telefonos_jurisdiccionales'
        },
		{name:'tel_clista',type:'string'},
        {name:'tel_cnombre',type:'string'},
        {name:'tel_cobservacion',type:'string'},
        {name:'tel_ctelefono',type:'string'},
        {name:'tel_ndiscado',type:'int',defaultValue:0},
        {name:'tel_cpredigito',type:'string'},
        {name:'tel_cpostdigito',type:'string'},
        {name:'tel_cprovincia',type:'string'}, {
            name : '_usado',
            type : 'string',
            defaultValue : 'false'
        }
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/m_telefonos_jurisdiccionales',
		appendId : true
	}
});