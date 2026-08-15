Ext.define('AdministratorSearch.store.ActivadoDesactivadoStore', {    
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'ActivadoDesactivadoStore',
	data: [
        {Name: getLocale('Seleccione'),    Value: 0},
		{Name: getLocale('Activado'),    Value: 1},
		{Name: getLocale('Desactivado'),    Value: 2}
	]
});