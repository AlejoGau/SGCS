//MIGRADO2024
Ext.define('Common.store.ControlAccesoStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'ControlAccesoStore',
	data: [
        {Name: '1.' + getLocale('Usuario'), Value: 1},
        {Name: '2.' + getLocale('Usuario'), Value: 2},
        {Name: '3.' + getLocale('Usuario'), Value: 3},
        {Name: '4.' + getLocale('Usuario'), Value: 4},
        {Name: '5.' + getLocale('Supervisor'), Value: 5},
        {Name: '6.' + getLocale('Supervisor'), Value: 6},
        {Name: '7.' + getLocale('Admin'), Value: 7},
        {Name: '8.' + getLocale('Super Usuario'), Value: 8},
	]
});