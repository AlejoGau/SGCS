//MIGRADO2024
Ext.define('Common.store.SoftguardAlarmasSmsStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'SoftguardAlarmasSmsStore',
    model: 'Common.model.SoftguardCodigoAlarmaModel',
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
        url: '/Rest/Search/codigosalarmas?cod_nSms=1'       
    }
    
})