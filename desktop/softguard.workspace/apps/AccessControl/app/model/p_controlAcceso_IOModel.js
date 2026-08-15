Ext.define('AccessControl.model.p_controlAcceso_IOModel', {
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
        {name:'cac_fecha',type:'date', dateFormat:'MS'},
        {name:'cac_idautorizado',type:'int'},
        {name:'cac_autorizatipo',type:'int'},
        {name:'cac_autorizaid',type:'int'},
        {name:'cac_autorizacodigo',type:'string'},
        {name:'cac_cobservacion',type:'string'},
        {name:'cac_autorizadotipoid',type:'int'}
        ],
     proxy: {
        type : 'rest',
        writer:{ writeAllFields:true },
        url : '/Rest/p_controlAcceso_IO/',
		appendId : true,
        writer: {
            type: 'json',
            writeAllFields: true,
            
        },
	}	
           
   
});
