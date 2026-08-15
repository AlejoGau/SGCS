Ext.define('Tablas.model.TablasLineasModel', {
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
    	defaultValue: 3090
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_lineas'
        },
		{name:'lin_ccodigo',type:'string'},
        {name:'lin_crazonsocial',type:'string'},
        {name:'lin_ccalle',type:'string'},
        {name:'lin_inumero',type:'int',defaultValue:0},
        {name:'lin_npiso',type:'int',defaultValue:0},
        {name:'lin_cdepartamento',type:'string'},
        {name:'lin_clocalidad',type:'string'},
        {name:'lin_cprovincia',type:'string'},
        {name:'lin_cestado',type:'string'},
        {name:'lin_ccodigopostal',type:'string'},
        {name:'lin_ctelfono',type:'string'},
        {name:'lin_cfax',type:'string'},
        {name:'lin_cimagen',type:'string'},
        {name:'lin_cusuario',type:'string'},
        {name:'lin_cclave',type:'string'},
        {name:'lin_nacceso',type:'int',defaultValue:0},
        {name:'lin_cmail',type:'string'},
        {name:'lin_cMetaData',type:'string'},
        {name:'lin_iAutoProcesa',type:'int'},
        {name:'lin_iEscala',type:'int'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_lineas/',
		appendId : true
		}
});