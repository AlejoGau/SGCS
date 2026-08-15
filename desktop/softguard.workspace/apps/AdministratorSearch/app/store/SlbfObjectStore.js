Ext.define('AdministratorSearch.store.SlbfObjectStore', {
    extend : 'Ext.data.Store',
    model : 'AdministratorSearch.model.SblfObjectSearchModel',
    storeId: 'SlbfObjectStore',
    remoteSort: true,
    sorters:[{
        property: 'Name',
        direction: 'ASC'
    }],
    pageSize: 100000,
    autoLoad: true
});