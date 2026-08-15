Ext.define('Administrator.model.DesktopModuleDetailByUserModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{name: 'Id', mapping: 'dwm_idKey'},
        {name: 'Name', type:'string'},
        {name:'dwm_idKey',type:'int'},
        {name:'dwm_idWeb',type:'int'},
        {name:'dwm_idModules',type:'int'},
        {name:'dwm_idTabla',type:'string'},
        {name:'dwm_dealer',type:'string'},
        {name:'dwm_cuenta_desde',type:'string'},
        {name:'dwm_cuenta_hasta',type:'string'},
        {name:'dwm_data',type:'string'}
    ],
    proxy : {
        
        type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
        appendId : false,
        
        buildUrl: function (request) {
            var operation = request.operation;
            var id = operation.ObjectId;
            var _module = operation.Module;
			var url = '/Rest/Search/DesktopModuleDetailByUser';

            if (id){url = Ext.urlAppend(url,'Id='+id);}
            if (_module){url = Ext.urlAppend(url,'Module='+_module);}
            
			return url;
        }
	}
});