//MIGRADO2024
Ext.define('Common.model.GeocercaMapModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
        name: 'Type',
        type: 'string'
        },
        {
            name: 'Radius',
            type: 'string'
        },
        {
            name: 'CenterLat',
            type: 'string'
        },
        {
            name: 'CenterLng',
            type: 'string'
        },
		{name:'Path',type:'string'}
        ,
    	{name:'Ref',type:'string'}
    ]
});