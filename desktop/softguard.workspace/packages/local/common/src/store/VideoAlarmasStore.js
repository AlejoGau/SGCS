//MIGRADO2024
Ext.define('Common.store.VideoAlarmasStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'VideoAlarmasStore',
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
        url: '/Rest/Search/codigosalarmas?cod_nVideo=1'       
    }
    
})