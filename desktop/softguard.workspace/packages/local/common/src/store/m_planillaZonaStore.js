//MIGRADO2024
Ext.define('Common.store.m_planillaZonaStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    storeId: 'm_plantillaZonaStore',
    model: 'Common.model.m_planillaSearchModel',
    remoteSort: true,
    remoteFilter: true,
    sorters: [{ property: 'pla_cNombreTabla', 
    		    direction: 'M_ZONAS' }],
                
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/m_planillas/',
		appendId : true
	}
    
    
})