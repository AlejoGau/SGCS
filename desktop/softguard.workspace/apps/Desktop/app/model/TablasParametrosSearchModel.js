Ext.define('Desktop.model.TablasParametrosSearchModel', {
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
    	defaultValue: 3094
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_parametros'
        },
		{name:'par_ccodigo',type:'string'},
        {name:'par_cdescripcion',type:'string'},
        {name:'par_ivalor',type:'int',defaultValue:0},
        {name:'par_mobservacion',type:'string'},
        {name:'par_cconfig',type:'string'},
        {name:'par_ccategoria',type:'string'},
        {name:'par_cvalor',type:'string'}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_parametros/',
		appendId : true
	}
});