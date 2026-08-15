Ext.define('AdministratorSearch.model.TablasAccesosTipoDocumentoSearchModel', {
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
    	defaultValue: 3226
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'T_AccesosTipoDocumento'
        },
        {name:'atd_cDescripcion',type:'string'},
        {name:'atd_iPideVto',type:'int',defaultValue:0},
        {name:'atd_iUploadFile',type:'int',defaultValue:0}        
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/T_AccesosTipoDocumento/',
		appendId : true
	}
});