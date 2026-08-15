//DK-1437
Ext.define('Common.model.SerTecVisitasConflictoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'},
        {name: 'svi_idKey', type: 'int'},
        {name: 'svi_iServicio', type: 'int'},
        {name: 'stc_inumero', type: 'int'},
        {name: 'stc_iid', type: 'int'},
        {name: 'stv_iTecnico', type: 'int'},
        {name: 'ins_idKey', type: 'int'},
        {name: 'svi_tSalidaHaciaCliente', type: 'date', dateFormat: 'n/j/Y g:i:s A'},
        {name: 'svi_tFinEstimado', type: 'date', dateFormat: 'n/j/Y g:i:s A'},
        {name: 'svi_nDuracionEstimada', type: 'float'},
        {name: 'ins_cnombre', type: 'string'},
        {name: 'ins_ccodigo', type: 'string'},
        {name: 'cue_cnombre', type: 'string'},
        {name: 'cue_clinea', type: 'string'},
        {name: 'cue_ncuenta', type: 'string'},
        {name: 'tip_cdescripcion', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/search/SerTecVisitasConflicto',
        appendId: false
    }
});
