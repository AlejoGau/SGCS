//MIGRADO2024
Ext.define('Common.model.RoutesSearchModel', {
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
        defaultValue: 3079
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 't_categorizacion'
        },
		{name:'cuentaId',type:'int'},
        {name:'datestart',type:'date', format:'m/d/Y h:i:s A'},
        {name:'endaftertolerance',type:'int'},
        {name:'endbeforetolerance',type:'int'},
        {name:'routetype',type:'int'},
        {name:'startaftertolerance',type:'int'},
        {name:'startbeforetolerance',type:'int'},
        {name:'time',type:'int'},
        {name:'userId',type:'int'},
        {name:'_userId',type:'int',convert:function (val,rec) {
            if(rec.get('userId') == 0) {
                return null;
            } 
            return rec.get('userId');
        }},
    'usu_iidcuenta', 
    {
    	name : 'usu_icodigo',
		type : 'int',
		defaultValue : 1
    },
    'usu_cnombre', 
    {
		name : 'usu_iid',
		type : 'int',
		defaultValue : 1
    },
    'usu_cclave', 
    { 
        name:'usu_ntipo', 
        type : 'int'
    },
    'usu_cimagen', 
    'usu_mobservacion'
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/VC_Route',
		appendId : true
	}
});