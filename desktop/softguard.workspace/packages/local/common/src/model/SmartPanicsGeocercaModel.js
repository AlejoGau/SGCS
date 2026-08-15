//MIGRADO2024
Ext.define('Common.model.SmartPanicsGeocercaModel', {
    extend: 'Ext.data.Model',
    //Property: 'Id',
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
        {name:'Status', type:'string', defaultValue:0}
    ],
		
    proxy: {
		type : 'rest',
		url : '/rest/SmartTrackGeoFense/',
		appendId : true
	}
});