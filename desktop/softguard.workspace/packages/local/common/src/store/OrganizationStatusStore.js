//MIGRADO2024
Ext.define('Common.store.OrganizationStatusStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'OrganizationStatusStore',
    data: [
        {Name:getLocale("Inactivo"),Value:0},
        {Name:getLocale("Prospecto 1"),Value:1},
        {Name:getLocale("Prospecto 2"),Value:2},
        {Name:getLocale("Prospecto 3"),Value:3},
        {Name:getLocale("Oportunidad 4"),Value:4},
        {Name:getLocale("Oportunidad 5"),Value:5},
        {Name:getLocale("Oportunidad 6"),Value:6},
        {Name:getLocale("Cliente 7"),Value:7},
        {Name:getLocale("Cliente 8"),Value:8},
        {Name:getLocale("Cliente 9"),Value:9},
    	
	]
});