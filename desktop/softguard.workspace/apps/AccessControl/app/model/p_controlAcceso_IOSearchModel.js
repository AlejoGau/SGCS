Ext.define('AccessControl.model.p_controlAcceso_IOSearchModel', {
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
        defaultValue: 3071
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_firmante_fc'
        },
            {name:'cac_tipoacceso',type:'int'},
        {name:'cac_idpuerta',type:'int'},
        {name:'cac_fecha',type:'date'},
        {name:'cac_idautorizado',type:'int'},
        {name:'cac_autorizatipo',type:'int'},
        {name:'_cac_autorizatipo',type:'string', convert:function (value,record) {
            if(record.get('cac_autorizatipo')==3227){// solo para proveedor
                return record.get('cac_autorizatipo')+'-'+getLocale('PROVEEDOR')
            }else if(record.get('cac_autorizatipo') == 1) {
                return record.get('cac_autorizatipo')+'-'+getLocale('Contacto propietario')
            } else if (record.get('cac_autorizatipo') == 2) {
                return record.get('cac_autorizatipo')+'-'+getLocale('Autorizacion supervisor')
            } else if (record.get('cac_autorizatipo') == 3) {
                return record.get('cac_autorizatipo')+'-'+getLocale('Autorizacion preexistente')
            } else{
                return record.get('cac_autorizatipo')
            }
        
        }},
        {name: '_proveedorusuario_nombre', type:'string',convert:function(value,record){
            
            return (record.get('cac_autorizadotipoid')==3227?record.get('apr_cNombre'):record.get('usu_cnombre'));
        }},
        {name:'cac_autorizaid',type:'int'},
        {name:'cac_autorizacodigo',type:'string'},
        {name:'cap_nombre',type:'string'},

        {name:'usu_cnombre',type:'string'},
        {name:'cac_cobservacion',type:'string'},
        {nme:'cac_autorizadotipoid',type:'int'},
        {
            name: 'apr_idKey',
            type: 'int'
            },
        {name:'apr_cNombre',type:'string'},
        {name:'apr_cIdentificacion',type:'string'},        
        {name:'apr_cDireccion',type:'string'},                
        {name:'apr_cCodigoPostal',type:'string'},  
        {name:'apr_cLocalidad',type:'string'},                
        {name:'apr_iProvincia',type:'int'},
        {name:'apr_cTelefono',type:'string'},                
        {name:'apr_iCategoria',type:'int'},
        {name:'apr_tFechaAlta',type:'string'},
        {name:'apr_iStatus',type:'int'},
        {name:'apr_cObservaciones',type:'string'},                
        {name:'apr_cPathPicture',type:'string'},

        {name:'_apr_iStatus',type:'string',convert: function(v, record){
            return (record.get('apr_iStatus')==0?'NO':'SI');
        }}


        ],

           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    url : '/Rest/search/p_controlAcceso_IO',
		appendId : true
	}
});
