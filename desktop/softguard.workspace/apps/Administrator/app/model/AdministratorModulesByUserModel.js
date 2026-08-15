Ext.define('Administrator.model.AdministratorModulesByUserModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{name: 'Id', type: 'int'},
        {name: 'Name', mapping:'udm_modulo'},
        {name:'udm_modulo',type:'string'},
        {name: 'udm_idKey', type: 'int'},
        {name:'udm_key_reference',type:'string'},
        {name:'dwm_idKey',type:'int'},
        {name:'ums_security',type:'string'},
        {name:'_localeModule', type: 'string', convert:function(v, record){
           // console.log(record.get('udm_modulo'));
            return getLocale(record.get('udm_modulo'));
        }}
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
			request.url = '/Rest/Search/DesktopModulesByUser?Id='+id;

			return request.url;
        }
	}
});