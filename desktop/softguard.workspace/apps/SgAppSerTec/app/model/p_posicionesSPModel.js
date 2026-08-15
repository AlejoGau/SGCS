function convertLatLng(v, record){
    return v.replace(/,/g,'.');
}


Ext.define('SgAppSerTec.model.p_posicionesSPModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
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
    	defaultValue: 3105
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'p_posicionesSP'
        },
		{name:'sp_tfechahora',type:'date', dateFormat:'n/j/Y g:i:s A' },// 1/18/2016 5:48:05 PM
      
        
       {name:'sp_cIMEI',type:'string'},
        {name:'sp_rLatitud'},
        {name:'sp_rLongitud'},
        {name:'sp_rAccuracy' ,type: 'int'},
        {name:'sp_iVelocidad',type:'int',defaultValue:0},
        {name:'sp_iSecuencia',type:'int',defaultValue:0},
        {name:'sp_iRumbo',type:'int',defaultValue:0, convert: function(value){
            if (value < 0){
                return null;
            } else {
                return parseInt(value);
            }
        }},
        {name:'sp_iOdometro',type:'int',defaultValue:0},
        {name:'sp_iBatt',type:'int',defaultValue:0, convert: function(value){
            if (value < 0){
                return null;
            } else{
                return value;
            }
        }},
        {name:'rec_calarma'},
        {name:'cod_cdescripcion'},
        {name:'gps_cMethod' ,type: 'string'},
        
    ],
	proxy : {
		type : 'rest',
		url : '/rest/search/p_posicionesSp',
		appendId : false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
	}
});