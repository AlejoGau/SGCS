Ext.define('SmartTrack.model.AdministratorModulesModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {name: 'Id',type: 'string',mapping: 'udm_key_reference'},
        {name: 'Name', type: 'string', mapping: 'udm_modulo'},                        
        {name: 'udm_modulo',type:'string'},        
        {name: 'udm_key_reference',type:'string'}
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
			request.url = '/Rest/Search/DesktopModules';

			return request.url;
        }
	}
});