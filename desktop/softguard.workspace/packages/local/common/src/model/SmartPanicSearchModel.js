 
Ext.define('Common.model.SmartPanicSearchModel', {
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
    	defaultValue: 3067
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
        {name:'Config',type:'string'},
        {name:'fechaAlta',type:'date'},
        {name:'pushToken',type:'string'},
        {name:'EnFalloDeTesteo',type:'string'},        
        {name:'EnFalloDeTesteoDesde',type:'date'},
        {name:'cue_cnombre',type:'string'},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        
        {name:'_nombreCuenta',type:'string', convert: function(value, record) {
            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta');//+' '+record.get('cue_cnombre')
        }},
        {name:'_nombreTelefono',type:'string', convert: function(value, record) {
            return record.get('Nombre')+' ('+record.get('Telefono')+')';
        }},
        {name:'cue_iid',type:'int'},
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
        {name:'awccUserId',type:'int'},
        {name:'udw_usuario',type:'string'},
        {name:'udw_nombre',type:'string'},
        {name:'udw_apellido',type:'string'},
        {name:'udw_idKey',type:'int'},
        {name:'tel_iidcuenta',type:'string'},
        {name:'tel_iid',type:'string'},
        {name:'tel_clista',type:'string'},
        {name:'tel_cnombre',type:'string'},
        {name:'tel_cobservacion',type:'string'},
        {name:'tel_ctelefono',type:'string'},
        {name:'tel_ndiscado',type:'string'},
        {name:'tel_cpredigito',type:'string'},
        {name:'tel_cpostdigito',type:'string'},
        {name:'tel_norden',type:'string'},
        {name:'tel_ntr',type:'string'},
        {name:'tel_cclave',type:'string'},
        {name:'tel_cpermiso',type:'string'},
        {name:'tel_nsms',type:'string'},
        {name:'tel_idKey',type:'string'},
        {name:'tel_nsp',type:'string'},
        
        {name:'gps_rLatitud',type:'string'},
        {name:'gps_rLongitud',type:'string'},
        {name:'gps_rlatitud',type:'string', mapping: 'gps_rLatitud'},
        {name:'gps_rlongitud',type:'string', mapping: 'gps_rLongitud'},
        {name:'gps_tfechahora',type:'string'},
        {name:'gps_rAccuracy',type:'string'},     
        {name:'gps_cIMEI',type:'string'},
        {name:'srb_idkey',type:'int'},
        {name:'srb_button_uuid',type:'string'},
        
        {name:'_usado',type:'string', defaultValue : 'false'},
        
        // BC 399646583 : Se agrega visualización de usu_cidentificacion como DNI
        {name:'usu_cidentificacion', type:'string', defaultValue : 'false'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/SmartPanicCuenta',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});
