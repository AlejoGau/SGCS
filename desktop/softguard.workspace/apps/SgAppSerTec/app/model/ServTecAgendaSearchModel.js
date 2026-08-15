Ext.define('SgAppSerTec.model.ServTecAgendaSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'},
        {name: 'svi_idKey', type: 'int'},
        {name: 'stc_inumero', type: 'int'},
        {name: 'stc_iid', type: 'int'},
        {name: 'svi_tSalidaHaciaCliente', type: 'date', dateFormat: 'n/j/Y g:i:s A'},
        {name: 'svi_cHorasPlanificadas', type: 'string'},
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
        url: '/Rest/search/SerTecVisitasAgenda2',
        appendId: false
    }
});
