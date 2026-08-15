//MIGRADO2024
Ext.define('Common.model.PoiByDealerSearchModel', {
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
        {name:'CDealer',type:'string'},
        {name:'State',type:'string'},
        {name:'City',type:'string'},
        {name:'Address',type:'string'},
        {name:'Number',type:'string'},
        {name:'Organization',type:'int',defaultValue:0},
        {name:'Latitude',type:'float', convert: function(v, record){
                if (typeof(v) == "number"){
                    return v
                } else {
                    return v.replace(/\,/g,'.')
                } 
            }
        },
        {name:'Longitude',type:'float', convert: function(v, record){
            if (typeof(v) == "number"){
                    return v
                } else {
                    return v.replace(/\,/g,'.')
                } 
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
		url : '/rest/search/POIByDealer',
		appendId : true
	}
});