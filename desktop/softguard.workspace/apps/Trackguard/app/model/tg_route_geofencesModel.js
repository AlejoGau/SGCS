Ext.define('Trackguard.model.tg_route_geofencesModel', {
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
        defaultValue: 3079
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_categorizacion'
        },
		{name:'aftertolerance',type:'int'},
{name:'beforetolerance',type:'int'},
{name:'geofenceid',type:'int'},
{name:'_geofenceid',type:'int',convert:function (val,rec) {
    if(rec.get('geofenceid') == 0) {
        return null;
    } else {
        return rec.get('geofenceid');
    }
}},
{name:'order',type:'int'},
{name:'routeId',type:'int'},
{name:'time',type:'int'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/tg_route_geofences/',
		appendId : true
		}
});