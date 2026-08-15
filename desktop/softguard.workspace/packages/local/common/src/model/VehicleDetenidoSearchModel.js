//MIGRADO2024
Ext.define('Common.model.VehicleDetenidoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'RowNumber',
    fields: [
		{name: 'RowNumber', type: 'int'},
        {name:'gps_idCuenta'}, 
        {name : 'min_fecha',type : 'date',dateFormat : 'n/j/Y g:i:s A'} // 1/14/2020 4:50:51 PM
        ,{name : 'max_fecha',type : 'date',dateFormat : 'n/j/Y g:i:s A'},
        {name:'gps_rlatitud'},
        {name:'gps_rlongitud'},
        {name:'gps_cdireccion'},
        {name:'minutos',type:'int',defaultValue:0}
    ],
	proxy : {
		type : 'rest',
		url : '/Rest/Search/TrackGuard_TiempoDetenido_Hist',
		appendId : false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
	}
});