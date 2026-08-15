//MIGRADO2024
Ext.define('Common.store.TablaCodigosAlarmasStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaCodigosAlarmasStore',
    model: 'Common.model.SoftguardCodigoAlarmaModel',
    remoteSort: false,
    remoteFilter: false,
	sorters: [{ property: 'Descripcion', 
			    direction: 'ASC' }]
})