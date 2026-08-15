Ext.define('Common.model.PlantillasModel', {
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
        {name:'RowNumber',type:'int'},
        {name:'pls_ccodigo',type:'int'},
        {name:'pls_cdescripcion',type:'string'},
        {name:'pls_mplantilla',type:'string'},
        
        
    ],
        
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/t_plantillas_smsSearch',
		
	}
});	