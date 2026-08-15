//MIGRADO2024
Ext.define('Common.store.TablasCategorizacionStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    remoteFilter: false,
    pageSize: 500,
    sorters: [{
         property: 'cat_cDescripcion',
         direction: 'ASC'
     }],
    filters: [
        {
            property: 'cat_iEstado',
            value: 1
        }
    ],
    storeId: 'TablasCategorizacionStore',    
    model: 'Common.model.TablasCategorizacionSearchModel'
});