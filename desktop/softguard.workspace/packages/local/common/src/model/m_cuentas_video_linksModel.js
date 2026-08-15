//MIGRADO2024
Ext.define('Common.model.m_cuentas_video_linksModel', {
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
        defaultValue: 3110
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_cuentas_video_links'
        },
        {name:'cvl_iidcuenta',type:'int',defaultValue:0},
		{name:'cvl_calarma',type:'string'},
        {name:'cvl_czona',type:'string'},
        {name:'cvl_clink',type:'string'},
        {name:'cvl_clinkdss',type:'string'},
        {name:'cvl_ivideoid',type:'int'},
        {name:'cvl_rlatitud',type:'float', defaultValue:0},
        {name:'cvl_rlongitud',type:'float', defaultValue:0},
        {name:'cuv_iTodosLosEventos',type:'int'}
        
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/m_cuentas_video_links/',
		appendId : true,
        listeners:{
              'exception' : function(proxy, response, options) {
                    notifyError('Hubo un error al guardar los datos. Recuerde que no se puede repetir la cuenta, la alarma y la zona en más de un registro');
                    
              }
        },
        writer:{ writeAllFields:true }
	}
});