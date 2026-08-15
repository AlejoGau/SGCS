//MIGRADO2024
Ext.define('Common.model.AlarmasEnEventosPendientesSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'rec_cAlarma',
    fields: [
        {
            name: 'Codigo',
            type: 'string'
        },{
            name: 'Descripcion',
            type: 'string'
        },
        
        ],
 
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/AlarmasEnEventosPendientes',
		appendId : true
	},
    
  
    
    
});