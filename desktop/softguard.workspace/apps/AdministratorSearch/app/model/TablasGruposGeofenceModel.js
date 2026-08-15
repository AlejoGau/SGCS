Ext.define('AdministratorSearch.model.TablasGruposGeofenceModel', {
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
    	defaultValue: 3241
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_grupos_geofence'
        },
{name:'grg_cdescripcion',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_grupos_geofence/',
		appendId : true
		}
});