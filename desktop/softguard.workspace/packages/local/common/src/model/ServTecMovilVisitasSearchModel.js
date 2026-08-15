//MIGRADO2024
Ext.define('Common.model.ServTecMovilVisitasSearchModel', {
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
            name: 'smv_iMovil',
            type: 'int'
        },{
            name: 'smv_iVisita',
            type: 'int'
        },{
            name: 'mov_ccodigo',
            type: 'string'
        },{
            name: 'mov_cdescripcion',
            type: 'string'
        },{
            name: 'mov_mobservaciones',
            type: 'string'
        },{
            name: 'mov_ipatrullaID',
            type: 'int'
        },{
            name: 'tmp_cflota',
            type: 'string'
        },{
            name: 'tmp_clicencia',
            type: 'string'
        },{
            name: 'tmp_cmarca',
            type: 'string'
        },{
            name: 'tmp_cmodelo',
            type: 'string'
        },{
            name: 'tmp_cnombre',
            type: 'string'
        },{
            name: 'tmp_cnumero',
            type: 'string'
        },{
            name: 'tmp_cpathfoto',
            type: 'string'
        },{
            name: 'tmp_iAsignado',
            type: 'string'
        },{
            name: 'tmp_icuenta',
            type: 'string'
        },{
            name: 'tmp_idKey',
            type: 'string'
        },{
            name: 'tmp_iid',
            type: 'string'
        },{
            name: 'tmp_nestado',
            type: 'string'
        },{
            name: 'tmp_iid',
            type: 'int'
        }        
        
        
        
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/SerTecMovilesVisitas',        
        appendId : false
    }
});