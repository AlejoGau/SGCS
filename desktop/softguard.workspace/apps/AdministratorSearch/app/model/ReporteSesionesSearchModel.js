Ext.define('AdministratorSearch.model.ReporteSesionesSearchModel', {
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
        defaultValue: 3089
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'reporte_sessiones'
        },
		{name:'clave',type:'string'},
        {name:'valor',type:'string'}
             
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/ReporteSesiones',
		appendId : true
	}
});