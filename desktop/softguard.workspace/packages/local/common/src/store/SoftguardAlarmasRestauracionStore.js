//MIGRADO2024
Ext.define('Common.store.SoftguardAlarmasRestauracionStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'SoftguardAlarmasRestauracionStore',
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
        url: '/Rest/Search/codigosalarmas?cod_ntipo=4'       
    }
    
})