Ext.define('Tablas.model.t_AccesosTipoDocumentoSearchModel', {
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
        {name:'atd_iPideVto',type:'int'},
        {name:'atd_iUploadFile',type:'int'}

        ],
           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    url : '/Rest/T_AccesosTipoDocumento/',
	}
});
