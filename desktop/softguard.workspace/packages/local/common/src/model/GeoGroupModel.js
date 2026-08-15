//MIGRADO2024
Ext.define('Common.model.GeoGroupModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: '__type', type: 'string' },
        { name: 'grg_cdescripcion', type: 'string' }
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/rest/t_grupos_geofence',
		appendId : true
	}
});