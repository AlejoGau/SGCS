//MIGRADO2024
Ext.define('Common.model.RoutesPointsModel', {
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
{name:'checkpointId',type:'int'},
{name:'_checkpointId',type:'int',convert:function (val,rec) {
    if(rec.get('checkpointId') == 0) {
        return null;
    } else {
        return rec.get('checkpointId');
    }
}},
{name:'order',type:'int'},
{name:'routeId',type:'int'},
{name:'time',type:'int'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/VC_Route_Checkpoints/',
		appendId : true
		}
});