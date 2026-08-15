Ext.define('AdministratorSearch.store.AdministratorTareasEstadoStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueModel',
    storeId: 'AdministradorTareasEstadosStore',
    data: [
        {Name:'Pendiente', Value: 0},
    	{Name:'Terminado', Value: 1}
	]
});