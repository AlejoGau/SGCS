//MIGRADO2024
Ext.define('Common.store.TablasObservacionesStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 500,
    sorters: [{
         property: 'obs_cdescripcion',
         direction: 'ASC'
     }],
    storeId: 'TablasObservacionesStore',    
    model: 'Common.model.TablasObservacionesSearchModel'
});