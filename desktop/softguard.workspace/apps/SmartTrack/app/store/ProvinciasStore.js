Ext.define('SmartTrack.store.ProvinciasStore', {
    extend: 'Ext.data.Store',
    requires: [
        'SmartTrack.model.t_provinciasSearchModel'
    ],
    autoLoad: true,
    pageSize: 10000,
    remoteFilter: true,
    remoteSort: true,
    storeId: 'ProvinciasStore',
    model: 'SmartTrack.model.t_provinciasSearchModel',
    sorters: [{ property: 'pro_cdescripcion', direction: 'ASC' }]
});
