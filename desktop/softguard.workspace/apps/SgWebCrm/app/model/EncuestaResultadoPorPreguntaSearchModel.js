Ext.define('SGWebCrm.model.EncuestaResultadoPorPreguntaSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [

        {name:'epr_cuser', type:'string'},
        {name:'enc_idkey', type:'int'},
        {name:'enc_name',type:'string'},
        {name:'epg_name', type:'string'},
        {name:'epg_descripcion', type:'string'},
        {name:'enr_eprcuser',type:'string'},
        {name:'epr_cvalue', type:'string'},
        {name:'Resultado',type:'string'}        
        
    ],
    	
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/p_encuesta_respuestasPorDispositivo',
		appendId : false
	}
});