//MIGRADO2024
function convertLatLng(v, record){
    return v.replace(/,/g,'.');
}
Ext.define('Common.model.EventoPosicionSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'gps_idCuenta'}, 
        {
    		name : 'gps_isofechahora',
			type : 'date',
			dateFormat : 'c'
		},
        {
    		name : 'gps_isorawfechahora',
			type : 'date',
			dateFormat : 'c'
		},
        {name:'gps_idRec',type:'int',defaultValue:0},
        {name:'gps_iOdometro',type:'int',defaultValue:0},
        {name:'gps_iid',type:'int',defaultValue:0},
        {name:'_distancia', type:'number', defaultValue:0},
        {name:'gps_rLatitud', convert: convertLatLng},
        {name:'gps_rLongitud', convert: convertLatLng},
        {name:'gps_rlatitud', mapping: 'gps_rLatitud'},
        {name:'gps_rlongitud', mapping: 'gps_rLongitud'},
        {name:'gps_iRumbo'},
        {name:'gps_cIMEI'},
        {name:'gps_Rumbo'},
        {name:'gps_cDireccion'},
        {name:'gps_iSentido'},
        {name:'rxl_cLog'},
        {name:'gps_iVelocidad',type:'int',defaultValue:0},
        
        //formatos
        
        {name:'for_ccodigo'},
        {name:'for_cformato'},
        
        {
			name : 'rec_cCategorizacion',
			type : 'string'
		}, {
			name : 'cod_cdescripcion',
			type : 'string'
		},{
			name : 'cod_nprioridad',
			type : 'int'
		}, {
			name : 'cod_ncolor',
			type : 'int'
		}, {
    		name : 'cod_nalerta',
			type : 'int'
		},{
			name : 'cod_nColorLetra',
			type : 'int'
		}, {
			name : 'rec_cContenido',
			type : 'string'
		}, {
			name : 'rec_cObservaciones',
			type : 'string'
		}, {
			name : 'rec_cTerminal',
			type : 'string'
		}, {
			name : 'rec_calarma',
			type : 'string'
		}, {
			name : 'zon_cdescripcion',
			type : 'string'
		}, {
			name : 'usu_cnombre',
			type : 'string'
		}, {
			name : 'rec_iMinutosEspera',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_iNYR',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_idReceptor',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_idResolucion',
			type : 'string'
		}, {
			name : 'rec_iid',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_iidcuenta',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_ioperador',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_iusuario',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_norigen',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_nestado',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'rec_isoFechaProceso',
			type : 'date',
			dateFormat : 'c'
		}, {
    		name : '_rec_isoFechaProceso',
			type : 'date',
            convert: function(v,record){
                return record.get('rec_isoFechaProceso');
            }
		}, {
			name : 'rec_isoFechaRecepcion',
			type : 'date',
			dateFormat : 'c'
		}, {
			name : 'rec_isoFechaHora',
			type : 'date',
			dateFormat : 'c'
		}, {
    		name : 'rec_czona',
			type : 'string'
		}, {
    		name : 'rxt_iSecuencia',
			type : 'int',
			defaultValue : 0
		},
        {name:'gps_rAccuracy',type:'int',defaultValue:0}, {
        	name : 'cue_clinea',
			type : 'string'
		}, {
        	name : 'cue_ncuenta',
			type : 'string'
		}, {
            name : 'cue_cnombre',
			type : 'string'
		}, {
    		name : 'rxt_iRouteID',
			type : 'int',
			defaultValue : 0
		},{
    	    name : 'gps_iBattery',
    		type : 'string'
		},{
            name : 'cue_iid',
    		type : 'int'
		},{
            name : 'gps_cMethod',
        	type : 'string'
		}
        
        
        
        
    ],
	proxy : {
		type : 'rest',
		url : '/Rest/Search/EventoPosicion',
		appendId : false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
	}
});