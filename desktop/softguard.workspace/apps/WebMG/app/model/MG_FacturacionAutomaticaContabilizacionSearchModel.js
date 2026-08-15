


Ext.define('WebMG.model.MG_FacturacionAutomaticaContabilizacionSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'cantidadClientes',type:'int'},
        {name:'cantidadProvincias',type:'int'},
        {name:'cantidadCategoriasImpositivas',type:'int'},
        {name:'cantidadDeNovedades',type:'int'},

        ],
		
   proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/MG_FacturacionAutomaticaContabilizacion',
		appendId : true
		}
});

																
