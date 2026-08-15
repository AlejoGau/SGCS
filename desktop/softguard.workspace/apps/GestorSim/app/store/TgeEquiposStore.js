Ext.define('GestorSim.store.TgeEquiposStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 1000,
    storeId: 'TgeEquiposStore',
    model: 'GestorSim.model.TgeEquipoSearchModel',
    remoteSort: true,
    remoteFilter: true,
    sorters: [{ property: 'Equipo', 
        	    direction: 'ASC' }]
    
})