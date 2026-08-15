//MIGRADO2024
Ext.define('Common.model.ServTecHistoricoSearchModel', {
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
        },{
            name: 'stl_iServicio',
            type: 'int'
        },{
            name: 'stl_tFechaHora',
            type: 'date'
        },{
            name: 'stl_cAccion',
            type: 'string'
        },{
            name: 'stl_cObservacion',
            type: 'string'
        },{
            name: 'stl_iUsuarioDSS',
            type: 'string'
        }
        
        
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/SerTecTimeLine',        
        appendId : false
	}
});