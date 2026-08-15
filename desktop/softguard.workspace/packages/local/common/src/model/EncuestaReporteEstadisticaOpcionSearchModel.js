//MIGRADO2024
Ext.define('Common.model.EncuestaReporteEstadisticaOpcionSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
    	{name:'Cantidad', type:'int', defaultValue:0},
        {name:'epo_idkey',type:'int',defaultValue:0},
        {name:'NombreOpcion',type:'string'},
        {name:'NombrePregunta',type:'string'},
        {name:'epg_idkey',type:'int',defaultValue:0}
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/ReporteEncuestaPorOpcion',
		appendId : false
	}
});
																