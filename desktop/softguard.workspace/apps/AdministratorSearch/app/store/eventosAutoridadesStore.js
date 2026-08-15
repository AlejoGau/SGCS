Ext.define('AdministratorSearch.store.eventosAutoridadesStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'eventosAutoridadesStore',
    model: 'AdministratorSearch.model.SoftguardCodigoAlarmaModel',
    remoteSort: false,
    remoteFilter: false,
    sorters: [{ property: 'Descripcion', 
                direction: 'ASC' }],
    proxy: {
        type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
        url: '/Rest/Search/codigosalarmas'       
    }
    
})