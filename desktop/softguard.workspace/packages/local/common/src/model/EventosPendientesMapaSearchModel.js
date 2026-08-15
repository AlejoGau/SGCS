//MIGRADO2024
Ext.define('Common.model.EventosPendientesMapaSearchModel', {
    extend: 'Ext.data.Model',
    autoLoad: false,
    autoSync: false,
    idProperty: 'id',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        },
        { name: 'rec_iid', type: 'string' },
        { name: 'rec_iidcuenta', type: 'string' },
        { name: 'rec_calarma', type: 'string' },
        { name: 'rec_czona', type: 'string' },
        { name: 'rec_tfechahora', type: 'date' },
        { name: 'cue_clinea', type: 'string' },
        { name: 'cue_ncuenta', type: 'string' },
        { name: 'cue_cnombre', type: 'string' },
        { name: 'cue_ccalle', type: 'string' },
        { name: 'cue_clocalidad', type: 'string' },
        { name: 'cue_cprovincia', type: 'string' },
        { name: 'cue_nparticion', type: 'string' },
        { name: 'cue_iid', type: 'string' },
        { name: 'gps_rlatitud', type: 'string' },
        { name: 'gps_rlongitud', type: 'string' },
        { name: 'cue_clatlng', type: 'string' },
        { name: 'sp_rlatitud', type: 'string' },
        { name: 'sp_rlongitud', type: 'string' },
        { name: 'cod_cdescripcion', type: 'string' },
        { name: 'selected', type: 'string' },
        { name: 'cod_ncolorletra', type: 'string' },
        { name: 'cod_ncolor', type: 'string' },
        { name: 'rec_ccontenido', type: 'string' },
        { name: 'lat', type: 'string' },
        { name: 'long', type: 'string' },
        { name: 'rec_nestado', type: 'string' },
        { name: 'usu_cnombre', type: 'string' },
        
     
        
        ],
        proxy: {
            type: 'rest',  
            reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
            },
            url : '/Rest/search/EventosPendientesMapa',
            
        }
});