Ext.define('Common.store.TablaAccesosCategoriaProveedorStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 10000,
    storeId: 'TablaAccesosCategoriaProveedorStore',	
    model: 'Common.model.t_AccesosCategoriaProveedor',
	sorters: [{ property: 'pro_cdescripcion', 
			    direction: 'ASC' }]
});