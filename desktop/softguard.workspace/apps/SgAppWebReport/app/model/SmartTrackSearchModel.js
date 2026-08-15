Ext.define('SgAppWebReport.model.SmartTrackSearchModel', {
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
        defaultValue: 3113
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'SmartPanic'
        },
		{name:'Telefono',type:'string'},
        {name:'Imei',type:'string'},
        {name:'Modelo',type:'string'},
        {name:'Marca',type:'string'},
        {name:'Version',type:'string'},
        {name:'Tipo',type:'string'},
        {name:'CuentaId',type:'int',defaultValue:0},    
        {name:'Nombre',type:'string'},
        {name:'pushToken',type:'string'},
        
        {name:'HBTime',type:'int', defaultValue:0},
        {name:'EnFalloDeTesteo',type:'int', defaultValue:0},
        {name:'EnFalloDeTesteoDesde',type:'string'},
        
        {name:'cue_cnombre',type:'string'},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_cprovincia',type:'int'},
        {name:'cue_ccodigopostal',type:'int'},
        {name:'cue_ccallecorreo',type:'string'},
        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_ccodigopostalcorreo',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso'},
        {name:'cue_ctipo',type:'int'},
        {name:'cue_cubicacion',type:'string'},
        {name:'cue_nparticion',type:'int'},
        {name:'cue_cobservacion',type:'string'},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_dfechaalta',type:'date', dateFormat:'c'},
        {name:'cue_dservicio',type:'date', dateFormat:'c'},
        {name:'cue_nmostrar',type:'int'},
        {name:'cue_nsonidoul',type:'int'},
        {name:'cue_nllaveul',type:'int'},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cLatLng',type:'string'},
        {name:'cue_nEfectiva',type:'int'},
        {name:'cue_iid',type:'int'},
        
        {name:'_cuenta',type:'string', convert: function (v,r) {
            return r.get('cue_clinea')+'-'+r.get('cue_ncuenta')+' '+r.get('cue_cnombre')
        }},
        
        
        {name:'gps_cDireccion',type:'string'},
        {name:'gps_cIMEI',type:'string'},
        {name:'gps_cMethod',type:'string'},
        {name:'gps_iBattery',type:'string'},
        {name:'gps_iNivelSenial',type:'string'},
        {name:'gps_iOdometro',type:'string'},
        {name:'gps_iRumbo',type:'string'},
        {name:'gps_iSatelites',type:'string'},
        {name:'gps_iVelocidad',type:'string'},
        {name:'gps_idCuenta',type:'string'},
        {name:'gps_idRec',type:'string'},
        {name:'gps_iid',type:'string'},
        {name:'gps_rAccuracy',type:'string'},
        {name:'gps_rLatitud',type:'string'},
        {name:'gps_rLongitud',type:'string'},
        {name:'gps_tRawfechahora',type:'string'},
        {name:'gps_tfechahora',type:'string'},
        
        {name:'usu_iid',type:'int'},
        {name:'usu_cnombre',type:'string'},
        {name:'Config',type:'string'},
        
        {name:'state',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/smarttrackcuenta',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});