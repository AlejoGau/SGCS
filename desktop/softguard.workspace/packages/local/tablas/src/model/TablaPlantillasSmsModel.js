Ext.define('Tablas.model.TablaPlantillasSmsModel', {    
    extend: 'Ext.data.Model',
    idProperty: 'pls_ccodigo',
    fields: [
    	{name:'pls_ccodigo',type:'string'},
    	{name:'pls_cdescripcion',type:'string'},
    	{name:'pls_mplantilla',type:'string'},
    	{name:'pls_mplantillaOpnClo',type:'string'}
	],
    proxy : {
    	type : 'rest',
		url : '/Rest/t_plantillas_sms',
		appendId : false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
	}
    
   
});