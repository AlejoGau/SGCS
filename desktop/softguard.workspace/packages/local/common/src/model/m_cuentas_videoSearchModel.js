//MIGRADO2024
Ext.define('Common.model.m_cuentas_videoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'cuv_idKey',
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
        defaultValue: 3110
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_cuentas_video'
        },
        {name:'cuv_iidCuenta',type:'int',defaultValue:0},
		{name:'cuv_iidcuenta',type:'int',maping:'cuv_iidCuenta'},
        {name:'cuv_meventos',type:'string'},
        {name:'cuv_clink',type:'string'},
        {name:'cuv_cLinkDSS',type:'string'},
        {name:'cuv_idKey',type:'string'},
        {name:'_cuenta',type:'string', convert: function(v, record){
            return record.get('cue_clinea')+"-"+record.get('cue_ncuenta') + " "+record.get('cue_cnombre') ;
        }},
         
        {name:'cuv_iTodosLosEventos',type:'int',defaultValue:0},
        {name:'cuv_meventos',type:'string'},
        {name:'cuv_clink',type:'string'},
        {name:'cuv_clinkdss',type:'string'},
        {name:'cuv_idKey',type:'string'},
        {name:'cue_iid',type:'int',defaultValue:0},
        {name:'cue_cnombre',type:'string'},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_cprovincia',type:'string'},
        {name:'cue_ccodigopostal',type:'string'},
        {name:'cue_ccallecorreo',type:'string'},
        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_provincia',type:'string'},
        {name:'cue_ccodigopostalcorreo',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso',type:'string'},
        {name:'cue_ctipo',type:'string'},
        {name:'cue_cubicacion',type:'string'},
        {name:'cue_nparticion',type:'int',defaultValue:0},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_cLatLng',type:'string'},
        {name:'cue_dfechaalta',type:'date', dateFormat:'MS'},
        {name:'cue_dservicio',type:'date', dateFormat:'MS'},
         {name:'tvi_iid',type:'string'},
        {name:'tvi_cdescripcion',type:'string'},
        {name:'tvi_cnombre',type:'string'},
        {name:'tvi_cConfig',type:'string'},
        {name:'tvi_nLaunch',type:'string'},
        {name:'tvi_iPlatform',type:'int'}
        
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total',
            writer:{ writeAllFields:true }
        },
    	url : '/Rest/search/m_cuentas_video',
		appendId : true,
            writer:{ writeAllFields:true }        
	}
});