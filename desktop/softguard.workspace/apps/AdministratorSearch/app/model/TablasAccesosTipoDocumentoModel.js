Ext.define('AdministratorSearch.model.TablasAccesosTipoDocumentoModel', {
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
        {name:'atd_iPideVto',type:'int',defaultValue:0
            ,convert: function(v,record){
                return typeof v === 'boolean' ? (v === true ? 1 : 0) : v;
            }
        },
        {name:'atd_iUploadFile',type:'int',defaultValue:0
            ,convert: function(v,record){
                return typeof v === 'boolean' ? (v === true ? 1 : 0) : v;
            }
        }    

        ],
		
        proxy: {
            type : 'rest',
            url : '/Rest/t_accesostipodocumento/',
            appendId : true
            }

});