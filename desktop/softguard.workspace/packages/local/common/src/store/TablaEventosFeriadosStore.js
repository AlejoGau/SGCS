//MIGRADO2024
Ext.define('Common.store.TablaEventosFeriadosStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaEventosFeriadosStore',
    model : 'Common.model.TablaEventosFeriadosModel',
	sorters: [{ property: 'Descripcion', 
        direction: 'ASC' }]
});