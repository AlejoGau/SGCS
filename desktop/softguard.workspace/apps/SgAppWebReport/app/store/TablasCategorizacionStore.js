Ext.define('SgAppWebReport.store.TablasCategorizacionStore', {    
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
    model: 'SgAppWebReport.model.TablasCategorizacionSearchModel'
});