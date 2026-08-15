Ext.define('Common.store.EventModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'PersonModuleStore',
    root : {
        text : 'Online',
        expanded : true,
		children : [{
            text : 'Datos principales',
			iconCls : 'icon-page-white-text',
			leaf : true,
            closable: true,
			view : 'eventformview'
		},{
        	text : 'Nota',
			iconCls : 'icon-page-white-text',
			leaf : true,
            closable: true,
			view : 'eventdescriptionformview'
		},{
            text : 'Contactos de la agenda',
    		iconCls : 'icon-Person',
			leaf : true,
            closable: true,
			view : 'persongridview'
		}]
        
	}// cierro children
		// cierra store
})