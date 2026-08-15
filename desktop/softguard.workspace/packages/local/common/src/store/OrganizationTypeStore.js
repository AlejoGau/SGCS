//MIGRADO2024
Ext.define('Common.store.OrganizationTypeStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueModel',
    storeId: 'OrganizationTypeStore',
    data: [
       {Name:getLocale("Cliente"),Value:'CLI'},
        {Name:getLocale("Proveedor"),Value:'PROV'},
        {Name:getLocale("Central"),Value:'CENTRAL'}
	]
});