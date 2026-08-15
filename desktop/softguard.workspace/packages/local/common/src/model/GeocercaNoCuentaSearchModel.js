//MIGRADO2024
Ext.define('Common.model.GeocercaNoCuentaSearchModel', {
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
        {name:'GeoGroup',type:'int'},
        {name:'GeoGroupName',type:'string'},
        {name:'Dealer',type:'string'},
        {name:'MetaData',type:'string'},
        {name:'Style',type:'string'},
        {name:'lin_crazonsocial', type:'string'}
    ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/rest/search/TGGeoFenseNoCuentaByDealer',
		appendId : true
	}
});