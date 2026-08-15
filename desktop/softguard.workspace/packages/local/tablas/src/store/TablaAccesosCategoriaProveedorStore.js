Ext.define('Tablas.store.TablaAccesosCategoriaProveedorStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 10000,
    storeId: 'TablaAccesosCategoriaProveedorStore',	
    model: 'Tablas.model.t_AccesosCategoriaProveedor',
	sorters: [{ property: 'pro_cdescripcion', 
			    direction: 'ASC' }]
});