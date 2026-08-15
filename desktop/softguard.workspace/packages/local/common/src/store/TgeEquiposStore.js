//MIGRADO2024
Ext.define('Common.store.TgeEquiposStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 1000,
    storeId: 'TgeEquiposStore',
    model: 'Common.model.TgeEquipoSearchModel',
    remoteSort: true,
    remoteFilter: false,
    sorters: [{ property: 'Equipo', 
        	    direction: 'ASC' }]
    
})