Ext.define('WebRemoto.model.HorariosAlternativosSearchModel', {
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
        defaultValue: 3044
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'horario'
        },
    	{name:'alt_iidcuenta',type:'int'},
        {name:'alt_ndiaapertura',type:'string'},
        {name:'alt_choraapertura',type:'string'},
        {name:'alt_ndiacierre',type:'string'},
        {name:'alt_choracierre',type:'string'},
        {name:'alt_idKey',type:'string'}
        
    ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/rest/search/HorarioAlternativo',
		appendId : true
	}
});