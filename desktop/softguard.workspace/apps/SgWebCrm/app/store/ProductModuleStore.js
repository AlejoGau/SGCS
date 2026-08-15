Ext.define('SGWebCrm.store.ProductModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'ProductModuleStore',
    rootProperty : {
        text : 'Online',
        expanded : true,
		children : [{
			text : 'Cuerpo',
			iconCls : 'icon-html',
			leaf : true,
			view : 'contentdescriptionformview',
            closable: true,
            closeAction: 'destroy'
		}/*,{
    		text : 'Resumen',
			iconCls : 'icon-html',
			leaf : true,
			view : 'contentlargecommentview',
            closable: true,
            closeAction: 'destroy'
		},
        {
    		text : 'Relaciones',
			iconCls : 'icon-Relation',
			leaf : true,
			view : 'relationgridview',
            closable: true,
            closeAction: 'destroy'
		},{
    		text : 'Multimedia',
			iconCls : 'icon-Attach',
			leaf : true,
			view : 'attachgridview',
            closable: true,
            closeAction: 'destroy'
		}*/,{
        	text : 'Rubros',
			iconCls : 'icon-Taxonomy',
			leaf : true,
			view : 'taxonomiestree',
            closable: true,
            closeAction: 'destroy'
		}/*,{
            text : 'Metadata',
        	iconCls : 'icon-Metadata',
			leaf : true,
			view : 'metadatagridview',
            closable: true,
            closeAction: 'destroy'
		}*/]
	}// cierro children
		// cierra store
})