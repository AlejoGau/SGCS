//MIGRADO2024
Ext.define('Common.model.ServTecVisitaSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
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
            name: 'svi_cObservacion',
            type: 'string'
        },{
            name: 'svi_iEstado',
            type: 'int'
        },{
            name: 'svi_iFormaDeViaje',
            type: 'int'
        },{
            name: 'svi_tFechaHora',type: 'date', dateFormat:'n/j/Y g:i:s A'},
        {
            name: 'svi_iServicio',
            type: 'int'
        },{
            name: 'svi_tSalidaHaciaCliente',
            type: 'date', dateFormat:'n/j/Y g:i:s A'
        },{
            name: 'svi_tArriboAlCliente',
            type: 'date', dateFormat:'n/j/Y g:i:s A'
        },{
            name: 'svi_tSalidaDelCliente',
            type: 'date', dateFormat:'n/j/Y g:i:s A'
        }
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/SerTecVisitas',        
        appendId : false
	}
});