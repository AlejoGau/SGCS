//MIGRADO2024
Ext.define('Common.model.p_GpsSpModel', {
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
        {name:'gps_cIMEI'},
        {name:'gps_tRawfechahora'},
        {name:'gps_isorawfechahora',type:'date', dateFormat:'c'},
        {name:'gps_tfechahora',type:'date', dateFormat:'n/j/Y g:i:s A'},
        {name:'gps_iVelocidad',type:'int',defaultValue:0},
        {name:'gps_rAccuracy'}    
        
        
        ],
    	proxy : {
    		type : 'rest',
    		url : '/Rest/Search/p_gpssp',
    		appendId : false,
            reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
            }
    	}
});
																