Ext.define('Administrator.store.OrganizationClientStore', {
    extend : 'Ext.data.Store',
    storeId: 'OrganizationClientStore',
    autoLoad: true,
    pageSize: 10000,
    remoteFilter: true,
    filters:[
        {
            property: 'Status',
            value: 7
        }
    ],
    model : 'Administrator'+'.model.OrganizationSearchModel'
});