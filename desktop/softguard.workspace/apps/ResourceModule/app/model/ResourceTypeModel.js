Ext.define('ResourceModule.model.ResourceTypeModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int'},
        { name: 'Name',type: 'string'},
        { name: 'rmt_itipo',type: 'int'},
        { name:'rmt_cNombre',type:'string'},
        { name:'rmt_idOrg',type:'int',defaultValue:0 },
        { name:'rmt_cIcono',type:'string' }        
        ],
    proxy: {
		type : 'rest',
		url : '/Rest/t_ResourcesModule_Type/',
		appendId : true
	}
});