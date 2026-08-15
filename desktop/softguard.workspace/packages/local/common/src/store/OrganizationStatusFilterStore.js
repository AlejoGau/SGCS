Ext.define('Common.store.OrganizationStatusFilterStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'OrganizationStatusFilterStore',
    data: [
        {Name:getLocale("Prospecto"),Value:0},
        {Name:getLocale("En Proceso"),Value:1},
        {Name:getLocale("Organizaciones"),Value:2},
        {Name:getLocale("Inactivo"),Value:3}
    	
	]
});