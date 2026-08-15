//MIGRADO2024
Ext.define('Common.model.m_cuentas_video_linksSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'cvl_idKey',
    fields: [{
            name: 'Id',
            type: 'int',
            mapping:'cvl_idKey'
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
    		defaultValue: 'm_cuentas_video_links'
        },
        {name:'cvl_iidcuenta',type:'int',defaultValue:0},
		{name:'cvl_calarma',type:'string'},
        {name:'cvl_czona',type:'string'},
        {name:'cvl_clink',type:'string'},
        {name:'cvl_clinkdss',type:'string'},
        {name:'cvl_ivideoid',type:'int'},
        {name:'cvl_rlatitud',type:'float', defaultValue:0},
        {name:'cvl_rlongitud',type:'float', defaultValue:0},
        
        {name:'zon_cAlarmaAGenerar',type:'string'},
        {name:'zon_ccodigo',type:'string'},
        {name:'zon_ccodigorestauracion',type:'string'},
        {name:'zon_ccuenta',type:'string'},
        {name:'zon_cdealer',type:'string'},
        {name:'zon_cdescripcion',type:'string'},
        {name:'zon_cimagen',type:'string'},
        {name:'zon_clistaemergencia',type:'string'},
        {name:'zon_codigoalarma',type:'string'},
        {name:'zon_idKey',type:'string'},
        {name:'zon_iidcuenta',type:'string'},
        {name:'zon_mobservacion',type:'string'},
        {name:'zon_nautoprocesa',type:'string'},
        {name:'zon_nminutosrestauracion',type:'string'},
        {name:'zon_nmostrar',type:'string'},
        
        {name:'cod_ccodigo',type:'string'},
        {name:'cod_cdescripcion',type:'string'},
        {name:'cod_nalerta',type:'string'},
        {name:'cod_nprioridad',type:'string'},
        {name:'cod_ntipo',type:'string'},
        {name:'cod_nsistema',type:'string'},
        {name:'cod_ncolor',type:'string'},
        {name:'cod_cSonido',type:'string'},
        {name:'cod_nColorLetra',type:'string'},
        {name:'cod_nResuelve',type:'string'},
        {name:'cod_cGrupo',type:'string'},
        {name:'cod_nSms',type:'string'},
        {name:'cod_nMail',type:'string'},
        {name:'cod_nVideo',type:'string'},
        {name:'cod_nManual',type:'string'},
        {name:'cod_nMovil',type:'string'},
        {name:'cod_nAutoridad',type:'string'},
        {name:'cod_nLeeSonido',type:'string'},
        {name:'cod_nMultiMonitor',type:'string'},
        {name:'cod_idKey',type:'string'},
        {name:'cod_cinstrucciones_DSS',type:'string'},
        {name:'cod_cconfiguracion_DSS',type:'string'},
        {name:'cod_nWebCliente',type:'string'},
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
        {name:'cue_dfechaalta',type:'date', dateFormat:'MS'},
        {name:'cue_dservicio',type:'date', dateFormat:'MS'},
        {name:'cue_cLatLng',type:'string'},
        {name:'_cuenta',type:'string', convert: function(v, record){
           
            return record.get('cue_clinea')+"-"+record.get('cue_ncuenta') + " "+record.get('cue_cnombre') ;
        }},
        {name:'tvi_iid',type:'string'},
        {name:'tvi_cdescripcion',type:'string'},
        {name:'tvi_cnombre',type:'string'},
        {name:'tvi_cConfig',type:'string'},
        {name:'tvi_nLaunch',type:'string'},
        {name:'tvi_iPlatform',type:'int'},
        {name:'cuv_iTodosLosEventos',type:'int'}
        ],
		
  
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/m_cuentas_video_links',
		appendId : true
	}
});