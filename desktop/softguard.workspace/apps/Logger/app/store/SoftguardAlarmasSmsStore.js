Ext.define('Logger.store.SoftguardAlarmasSmsStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'SoftguardAlarmasSmsStore',
    model: 'Logger'+'.model.SoftguardCodigoAlarmaModel',
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