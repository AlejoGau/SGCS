    Ext.define('SGWebCrm.store.AttachModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'AttachModuleStore',
    rootProperty : {
        text : 'Online',
        expanded : true,
        children : [{
			text : 'Descripción',
			iconCls : 'icon-html',
			leaf : true,
			view : 'attachdescriptionformview',
            closable: true,
            closeAction: 'destroy'
		},
        {
    		text : 'Relaciones',
			iconCls : 'icon-search',
			leaf : true,
			view : 'relationgridview',
            closable: true,
            closeAction: 'destroy'
		},{
    		text : 'Taxononías',
			iconCls : 'icon-Taxonomy',
			leaf : true,
			view : 'taxonomiestree',
            closable: true,
            closeAction: 'destroy'
		},{
        	text : 'Viewer',
			iconCls : 'icon-monitor',
			leaf : true,
			view : 'attachviewer',
            closable: true,
            closeAction: 'destroy'
		}]
	}// cierro children
		// cierra store
});