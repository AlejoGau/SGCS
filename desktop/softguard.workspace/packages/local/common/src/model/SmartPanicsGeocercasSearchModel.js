//MIGRADO2024
Ext.define('Common.model.SmartPanicsGeocercasSearchModel', {
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
        defaultValue: 3060
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'GeoFense'
        },
		{name:'GeoType',type:'string'},
        {name:'Imei',type:'string'},
        {name:'MetaData',type:'string'},
        {name:'Style',type:'string'},
        {name:'Status', type:'string'}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/rest/SmartTrackGeoFense/',
		appendId : true
	}
});