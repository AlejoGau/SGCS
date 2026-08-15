Ext.define('SgAppAccessControl.model.AC_AdministratorSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {name: 'Id',type: 'int'},
        {name: 'Name', type: 'string', mapping: 'udw_usuario'},
        {name: 'ObjectTypeName', type: 'int', defaultValue: 3050},
        {name: 'ObjectTypeName', type: 'string', defaultValue: 'UsersDesktopWeb'},
        {name: 'udw_idKey', type:'int', defaultValue:0},
        {name: 'udw_usuario', type:'string'},
        {name: 'udw_nombre', type:'string'},
        {name: 'udw_apellido', type:'string'},
        {name: 'udw_empresa', type:'string'}, 
        {name: 'udw_metadata', type:'string'},        
        {name: 'OrganizationName', type:'string'},   
        {name: 'udw_tipo', type:'int'},
        
        {name: 'udw_iperfil', type:'int'},
        {name: 'nombrePerfil', type:'string'},

        // BC https://basecamp.com/2249105/projects/12939010/todos/413600618
        {name: 'udw_usuario_LIKE', type: 'string', convert:function( newValue, model ){
            return model.get('udw_usuario');
        }}
        
    ],
    proxy : {
        
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/DesktopUsersByAdmin',
		appendId : false
	}
});