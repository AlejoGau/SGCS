//MIGRADO2024
Ext.define('Common.model.RoutesPointsSearchModel', {
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
        {name:'time',type:'int'},
        {name:'chp_idKey',type:'string'},
        {name:'chp_cReference',type:'string'},
        {name:'chp_cZona',type:'string'},
        {name:'chp_iCuenta',type:'int',defaultValue:0},
        {name:'chp_rLatitud',type:'string'},
        {name:'chp_rLongitud',type:'string'},
        {name:'zon_cdescripcion',type:'string'},
        {name:'chp_nTipo',type:'int'},
        
        
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/VC_Route_Checkpoints',
		appendId : true
	}
});