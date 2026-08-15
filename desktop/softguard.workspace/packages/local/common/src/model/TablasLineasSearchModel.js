//MIGRADO2024
Ext.define('Common.model.TablasLineasSearchModel', {
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
        {name:'_descripcion',type:'string',convert: function(v, record){
            
            return record.get('lin_ccodigo')+" ("+record.get('lin_crazonsocial')+")";
        }},
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
        {name:'lin_iEnviaMailPorFalloTest',type:'int',defaultValue:1},
        {name:'lin_cMetaData',type:'string'},
        {name:'lin_iAutoProcesa',type:'int',defaultValue:0},
        {name:'lin_iEscala',type:'int'},
        {name:'lin_iOpnDespuesAlerta',type:'int'},
        {name:'lin_iGeneraAlarmaPorDesactivacion',type:'int'},
        {name:'lin_iOrganizacion',type:'int'},
        {name:'_organization',type:'string'},
        {name:'lin_iControlaCierreDespuesDeApertura',type:'int'},
        {name:'lin_iMinutosControlCDDA',type:'int'},        
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_lineas',
		appendId : true
	}
});