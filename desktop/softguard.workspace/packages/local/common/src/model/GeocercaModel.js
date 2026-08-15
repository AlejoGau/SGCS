//MIGRADO2024
Ext.define('Common.model.GeocercaModel', {
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
        {name:'Dealer',type:'string'},
        {name:'MetaData',type:'string'},
        {name:'Style',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/GeoFense/',
		appendId : true,
        listeners:{
            'exception': function(proxy, response, operation){
                notifyError('Error. La cantidad de puntos de la ruta excede la capacidad configurada en el motor de base de datos.');
            }
        }     
	}
});