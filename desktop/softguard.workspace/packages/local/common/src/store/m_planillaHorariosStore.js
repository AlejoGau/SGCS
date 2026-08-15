//MIGRADO2024
Ext.define('Common.store.m_planillaHorariosStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    storeId: 'm_plantillaHorariosStore',
    model: 'Common.model.m_planillaModel',
    remoteSort: true,
    remoteFilter: true,
    sorters: [{ property: 'pla_cNombreTabla', 
        	    direction: 'M_ZONAS' }],
    
    
})