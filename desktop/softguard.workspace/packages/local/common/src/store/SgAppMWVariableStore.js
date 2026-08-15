//MIGRADO2024
Ext.define('Common.store.SgAppMWVariableStore', {
    extend : 'Ext.data.TreeStore',
    model : 'Common.model.ModuleModel',
    id: 'sgappmwvariablestore',
    root : {
        text : 'Tablas del sistema',
        expanded : true,
        children : [
            {
                	text : 'Foto de zona',
        			iconCls : 'icon-photo',
        			leaf : true,
        			view : 'zonaimagenbyeventoview',
                    closable: true,
                    closeAction: 'destroy'
        		},{
                	text : 'Foto de cuenta',
        			iconCls : 'icon-page-white-code',
        			leaf : true,
        			view : 'cuentaimagenview',
                    closable: true,
                    closeAction: 'destroy'
        		},{
                    text : 'Descripción de panel',
        			iconCls : 'icon-page-white-code',
        			leaf : true,
        			view : 'paneldescripcionbyeventoview',
                    closable: true,
                    closeAction: 'destroy'
        		},{
                    text : 'Eventos de Particiones',
                	iconCls : 'icon-application-cascade',
                    view : 'particioneschooserview',
    				leaf : true,
                    profile: '0',
                    closable: true,
                    closeAction: 'destroy',
                    viewConfig: '{ultimaAlarma: true, hideEdit:true}'
    			}
            
        ]
	}// cierro children
		// cierra store
})