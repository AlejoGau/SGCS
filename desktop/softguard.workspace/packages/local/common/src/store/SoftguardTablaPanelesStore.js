//MIGRADO2024
Ext.define('Common.store.SoftguardTablaPanelesStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'SoftguardTablaPanelesStore',
    model: 'Common.model.SoftguardTablaPanelesModel',
    sorters: [{ property: 'pan_ccodigo', 
			    direction: 'ASC' }]
})