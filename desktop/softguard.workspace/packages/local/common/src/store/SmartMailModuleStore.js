 
Ext.define('Common.store.SmartMailModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'SmartMailModuleStore',
    root : {
        text : 'Online',
        expanded : true,
    	children : [{
			text : 'Enviados',
			iconCls : 'icon-email-go',
			leaf : true,
			view : 'smarttrackinggridview',
            closable: true,
            closeAction: 'destroy'
		},{
    		text : 'Destinatarios',
			iconCls : 'icon-group',
			leaf : true,
			view : 'smartsearchgridview',
            closable: true,
            closeAction: 'destroy'
		}/*,{
    		text : 'Multimedia',
			iconCls : 'icon-Attach',
			leaf : true,
			view : 'attachgridview',
            closable: true,
            closeAction: 'destroy'
		},{
        	text : 'Características',
			iconCls : 'icon-Taxonomy',
			leaf : true,
			view : 'taxonomiestree',
            closable: true,
            closeAction: 'destroy'
		}*/]
	}// cierro children
		// cierra store
})
