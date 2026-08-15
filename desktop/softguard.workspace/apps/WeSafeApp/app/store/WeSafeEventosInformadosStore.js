Ext.define('WeSafe.store.WeSafeEventosInformadosStore', {
    extend: 'Ext.data.Store',
    alias: 'store.WeSafeEventosInformadosStore',
    model: 'WeSafe.model.WeSafeEventosInformadosModel',
    pageSize: 10,
    remoteSort: true,

    proxy: {
        type: 'ajax',
        url: '/rest/search/eventosinformados_fetch',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        extraParams: {
            sort: '',
            dir: 'DESC'
        }
    },

    autoLoad: false
});
