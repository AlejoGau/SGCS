//MIGRADO2024
Ext.define('Common.model.ImeiGeofenceModel', {
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
        defaultValue: 3112
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'SmartTrackGeoFense'
        },
		{name:'GeoType',type:'string'},
        {name:'Imei',type:'string'},
        {name:'MetaData',type:'string'},
        {name:'Style',type:'string'},
        {name:'Status', type:'int'}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/rest/smarttrackgeofense',
		appendId : true
	}
});