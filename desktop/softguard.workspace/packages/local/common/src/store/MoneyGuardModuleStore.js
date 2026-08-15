//MIGRADO2024
Ext.define('Common.store.MoneyGuardModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'MoneyGuardModuleStore',
    root : {
        text : 'Online',
        expanded : true,
		children : [{
        	text : 'Comprobantes',
			//iconCls : 'icon-Action',
			leaf : true,
            closable: true,
			view : 'mgcomprobantesgridview'
		},{
			text : 'Exportación TXT',
			leaf : true,
			closable: true,
			view : 'exporttxtformview'
		}]
        
	}// cierro children
		// cierra store
});