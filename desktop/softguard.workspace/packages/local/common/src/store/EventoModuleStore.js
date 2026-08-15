//MIGRADO2024
Ext.define('Common.store.EventoModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'EventModuleStore',
    root : {
        text : 'Online',
        expanded : true,
    	children : [{
            text : 'Imagenes',
    		iconCls : 'icon-photo',
			leaf : true,
			view : 'eventimagesgridview',
            closable: false
		},{
            text : 'Llamadas',
        	iconCls : 'icon-telephone',
			leaf : true,
			view : 'eventphonegridview',
            closable: false
		},{
            text : 'Observaciones',
            iconCls : 'icon-book-open',
			leaf : true,
			view : 'eventobservacionesgridview',
            closable: false
		},{
            text : 'Sms',
            iconCls : 'icon-email',
    		leaf : true,
			view : 'eventsmsgridview',
            closable: false
		},{
            text : 'Gestión',
            iconCls : 'icon-cog',
    		leaf : true,
			view : 'eventprocesamientogridview',
            closable: false
		},{
            text : 'Sonido',
            iconCls : 'icon-sound',
        	leaf : true,
			view : 'eventsoundview',
            closable: false
		}]
	}// cierro children
		// cierra store
})