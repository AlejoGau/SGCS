Ext.define('SgAppWebReport.store.OrganizationStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'OrganizationStore',    
    model: 'Common.model.OrganizationSearchModel',
})