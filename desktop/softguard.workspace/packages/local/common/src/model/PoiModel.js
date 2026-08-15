//MIGRADO2024
Ext.define('Common.model.PoiModel', {
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
    	defaultValue: 3044
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Poi'
        },
		{name:'FullAddress',type:'string'},
        {name:'Icon',type:'string'},
        {name:'Country',type:'string'},
        {name:'State',type:'string'},
        {name:'CDealer',type:'string'},
        {name:'Organization',type:'int',defaultValue:0},
        {name:'City',type:'string'},
        {name:'Address',type:'string'},
        {name:'Number',type:'string'},
        {name:'Latitude',type:'float'},
        {name:'Longitude',type:'float'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Poi/',
		appendId : true
	}
});