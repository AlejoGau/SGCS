//MIGRADO2024
Ext.define('Common.model.UserByCuentaWithRangoModel', {
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
        defaultValue: 3067
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'UserByCuentaWithRango'
        },
		{name:'dwm_idKey',type:'int'},
        {name:'dwm_idWeb',type:'int'},
        {name:'dwm_idModules',type:'int'},
        {name:'dwm_idTabla',type:'int'},
        {name:'dwm_dealer',type:'string'},
        {name:'dwm_cuenta_desde',type:'string'},
        {name:'dwm_cuenta_hasta',type:'string'},
        {name:'dwm_data',type:'string'},
        {name:'udw_usuario',type:'string'},
        {name:'udw_clave',type:'string'},
        {name:'udw_nombre',type:'string'},
        {name:'udw_apellido',type:'string'},
        {name:'udw_empresa',type:'string'},
        {name:'udw_estado',type:'string'},
        {name:'udw_metadata',type:'string'},
        {name:'udw_tipo',type:'string'},
        {name:'udw_idKey',type:'int'},
        {name:'OrganizationName',type:'string'},
        {name:'_nombre',type:'string', convert: function(v,r){
            var n = r.get("udw_usuario");//+"("+r.get('udw_nombre')+" "+r.get('udw_apellido')+")";
            return n;
        }}
    ],
		
    proxy: {
		type : 'rest',
		url : '/rest/search/UserByCuentaWithRango',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});