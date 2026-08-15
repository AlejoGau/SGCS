//MIGRADO2024
Ext.define('Common.store.ModulesStore', {
	extend : 'Ext.data.TreeStore',
	model : 'Common.model.ModuleModel',
	//autoLoad : true,
	root : {
		text : 'Modulestree',
		expanded : true,
		children : [{
					text : 'Paneles de prueba',
					expanded : false
				}
		]
	}// cierro children
		// cierra store
	})