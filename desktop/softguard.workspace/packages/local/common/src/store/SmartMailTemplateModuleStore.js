//MIGRADO2024
Ext.define('Common.store.SmartMailTemplateModuleStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'SmartMailTemplateModuleStore',
    root : {
        text : 'Online',
        expanded : true,
        children : [{            
            text : 'Informacion',
    		iconCls : 'icon-page-white-text',
			leaf : true,
			view : 'smartmailtemplatedatosview',
            closable: true,
            closeAction: 'destroy'
		},{            
            text : 'Html',
        	iconCls : 'icon-html',
			leaf : true,
			view : 'smartmailtemplateeditorview',
            closable: true,
            closeAction: 'destroy'
		},{            
            text : 'Texto plano',
            iconCls : 'icon-textfield',
			leaf : true,
			view : 'smartmailtemplatetextareaview',
            closable: true,
            closeAction: 'destroy'
		}]
	}// cierro children
		// cierra store
})