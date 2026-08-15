Ext.define('AdministratorSearch.model.TablasGruposGeofenceSearchModel', {
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
        {name:'grg_cdescripcion',type:'string'},
        
        {
            name:'descriptionCalc',
            type:'string',
            convert: function(value,record){
                return record.get('Id')+'-'+record.get('grg_cdescripcion');
            }
        }

        ],
		
            
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_grupos_geofence/',
		appendId : true
	}
});