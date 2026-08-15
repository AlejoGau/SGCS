//MIGRADO2024
function convertLatLng(v, record){
    return v.replace(/,/g,'.');
}
Ext.define('Common.model.EventosposicionesSPSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'gps_idCuenta'}, 
        /*{
    		name : 'gps_isofechahora',
			type : 'date',
			dateFormat : 'c'
		},
        {
    		name : 'gps_isorawfechahora',
			type : 'date',
			dateFormat : 'c'
		},*/
        //{name:'gps_idRec',type:'int',defaultValue:0},
        //{name:'gps_iOdometro',type:'int',defaultValue:0},
        //{name:'gps_iid',type:'int',defaultValue:0},
        //{name:'_distancia', type:'number', defaultValue:0},
        {name:'gps_rLatitud', convert: convertLatLng},
        {name:'gps_rLongitud', convert: convertLatLng},
        {name:'gps_rlatitud', mapping: 'gps_rLatitud'},
        {name:'gps_rlongitud', mapping: 'gps_rLongitud'},
        //{name:'gps_iRumbo'},
        {name:'gps_cIMEI'},
        //{name:'gps_Rumbo'},
        //{name:'gps_cDireccion'},
        {name:'gps_iSentido'},
        //{name:'rxl_cLog'},
        //{name:'gps_rAccuracy',type:'int',defaultValue:0},
        {
        	name : 'cue_clinea',
			type : 'string'
		}, {
        	name : 'cue_ncuenta',
			type : 'string'
		}, {
            name : 'cue_cnombre',
			type : 'string'
        
        },{name:'gps_iVelocidad',type:'int',defaultValue:0
		},{
    	    name : 'gps_iBattery',
    		type : 'string'      
		}, {
    		name : 'rxt_iSecuencia',
			type : 'int',
			defaultValue : 0
        }              
        
        
        
    ],
	proxy : {
		type : 'rest',
		url : '/Rest/Search/EventosposicionesSPSearch',
		appendId : false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
	}
});