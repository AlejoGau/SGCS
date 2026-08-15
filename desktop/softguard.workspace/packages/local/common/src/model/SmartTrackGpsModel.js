//MIGRADO2024
Ext.define('Common.model.SmartTrackGpsModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'gps_isofechahora',type:'date', dateFormat:'c'},
        {name:'gps_idCuenta',type:'int',defaultValue:0},
        {name:'gps_idRec',type:'int',defaultValue:0},
        {name:'gps_iid',type:'int',defaultValue:0},
        {name:'gps_rLatitud'},
        {name:'gps_cIMEI'},
        {name:'gps_rLongitud'},
        {name:'gps_iRumbo'},
        {name:'gps_Rumbo'},
        {name:'gps_iSentido'},
        {name:'gps_tRawfechahora'},
        {name:'gps_isorawfechahora',type:'date', dateFormat:'c'},
        {name:'gps_tfechahora'},
        {name:'gps_iVelocidad',type:'int',defaultValue:0},
        {name:'sta_cUltimaAlerta'},
        {name:'sta_dFechaUltimaAlerta',type:'date', dateFormat:'c'},
        {name:'cod_cdescripcion'},
        {name:'for_cformato'},
        {name:'gps_rAccuracy',type:'int',defaultValue:0}
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