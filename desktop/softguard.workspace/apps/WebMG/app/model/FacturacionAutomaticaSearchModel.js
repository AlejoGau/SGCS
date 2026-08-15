Ext.define('WebMG.model.FacturacionAutomaticaSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'Name',type:'string'},
        {name:'Value',type:'string'},
        {name:'Count',type:'string'},
        {name:'cantidadTipo',type:'int'},
        {name:'cantidadTipoLabel',type:'string'},
        {name:'cantidadCalculada',type:'string'},
        
    ],
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/MG_FacturacionAutomaticaTree',
		appendId : false
	}
});

																
