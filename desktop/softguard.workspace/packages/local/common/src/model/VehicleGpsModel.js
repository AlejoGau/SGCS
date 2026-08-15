//MIGRADO2024
Ext.define('Common.model.VehicleGpsModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
		{name:'gps_isofechahora',type:'date', dateFormat:'c'},
        {name:'gps_idCuenta',type:'int',defaultValue:0},
        {name:'gps_idRec',type:'int',defaultValue:0},
        {name:'gps_iid',type:'int',defaultValue:0},
        {name:'gps_iOdometro',type:'int',defaultValue:0},
        {name:'gps_rLatitud'},
        {name:'gps_rLongitud'},
        {name:'gps_iRumbo'},
        {name:'gps_Rumbo'},
        {name:'gps_iSentido'},
        {name:'gps_iBattery'},
        
        {name: 'tip_curlimagen', type:'string'},
        {name: 'tip_cdescripcion', type:'string'},
        
        {name:'gps_cIMEI'},
        {name:'gps_tRawfechahora'},
        {name:'gps_isorawfechahora',type:'date', dateFormat:'c'},
        {name:'gps_tfechahora',type:'date', dateFormat:'n/j/Y g:i:s A'},
        {name:'gps_iVelocidad',type:'int',defaultValue:0},
        {name:'sta_cUltimaAlerta'},
        {name:'sta_dFechaUltimaAlerta',type:'date', dateFormat:'c'},
        {name:'cod_cdescripcion'},
        {name:'cLatLng', type:'string'},
        
        {name:'tmp_nestado',type:'int',defaultValue:0},
        {name:'_cestado', type: 'string', convert: function(value, record){
            switch(record.get('tmp_nestado'))
            {
            case 1:
              return getLocale('Disponible');
              break;
            case 2:
              return getLocale('Fuera de servicio');
            case 3:
              return getLocale('Asignado');
              break;
            default:
              return '';
            }
        }},
        {name:'cue_iEngineStatus', type:'int'},
         
        
        ],
    	proxy : {
    		type : 'rest',
    		url : '/Rest/Search/TGGPS',
    		appendId : false,
            reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
            }
    	}
});
																