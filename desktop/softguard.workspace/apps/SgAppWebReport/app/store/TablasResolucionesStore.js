Ext.define('SgAppWebReport.store.TablasResolucionesStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 500,
    remoteFilter: false,            
    sorters: [{
         property: 'res_cdescripcion',
         direction: 'ASC'
     }],
    storeId: 'TablasResolucionesStore',    
    model: 'SgAppWebReport.model.TablasResolucionesActivasSearchModel'
});