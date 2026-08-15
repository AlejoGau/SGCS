//MIGRADO2024
Ext.define('Common.model.m_cuentas_videoModel', {
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
    	defaultValue: 3109
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_cuentas_video'
        },
        {name:'cuv_iidcuenta',type:'int',defaultValue:0},
		{name:'cuv_clink',type:'string'},
        {name:'cuv_meventos',type:'string'},
        {name:'cuv_clinkdss',type:'string'},
        {name:'cuv_ivideoid',type:'int'},
        {name:'cuv_rlatitud',type:'float', defaultValue:0},
        {name:'cuv_rlongitud',type:'float', defaultValue:0},
        {name:'cuv_iTodosLosEventos',type:'int'}
        
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/m_cuentas_video/',
		appendId : true
		}
});