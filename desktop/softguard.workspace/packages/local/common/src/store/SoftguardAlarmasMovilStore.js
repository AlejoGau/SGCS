//MIGRADO2024
Ext.define('Common.store.SoftguardAlarmasMovilStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'SoftguardAlarmasMovilStore',
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
        url: '/Rest/Search/codigosalarmas?cod_nMovil=1'       
    }
    
})