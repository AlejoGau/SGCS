//MIGRADO2024
Ext.define('Common.model.CheckPointsModel', {
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
        defaultValue: 3083
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 't_tags_ag'
        },
		{name:'chp_idKey',type:'string'},
        {name:'chp_cReference',type:'string'},
        {name:'chp_cZona',type:'string'},
        {name:'chp_iCuenta',type:'int',defaultValue:0},
        {name:'chp_rLatitud',type:'string'},
        {name:'chp_rLongitud',type:'string'},
        {name:'chp_nTipo',type:'int'},
        {name:'_chp_nTipoCombo',type:'string'},
        {name:'chp_iTolerancia',type:'int',defaultValue:1}
        
        
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_checkpoints_VC/',
		appendId : true
		}
});