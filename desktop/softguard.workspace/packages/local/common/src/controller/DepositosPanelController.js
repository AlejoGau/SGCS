//MIGRADO2024
Ext.define('Common.controller.DepositosPanelController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.DepositosModulesStore' ],
    models : [  ],
    views : [ 'DepositosPanelView' ],
    readonly: false,
    init : function(config) {
        // genero los eventos
		this.control({
            'despositopanelview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        var controller = this;
        var treePanel = view.down('moduletreeview')
        
        //defino donde abre el tab
        var tabPanel = view.down('tabpanel')
        treePanel.targetTab = tabPanel
        
        //paso record al tree
        treePanel.record = view.record
        
        var modulesStore = deepCloneStore(controller.getDepositosModulesStoreStore());
        var root = treePanel.getRootNode();
        root.removeAll();
        modulesStore.each(function(_module){
            _module.viewConfig= {caller: view.caller, idOrganizacion:view.idOrganizacion}       
            root.appendChild(_module);
        });
        
        //abro formulario
        
        var newTab = Ext.widget('stdepositoformview',{
            record: view.record,
            caller:view.caller,
            title: 'Deposito',
            closable: false,
            idOrganizacion:view.idOrganizacion
    	});
		// agrego la paleta creada
		tabPanel.add(newTab);
		tabPanel.setActiveTab(newTab);
        
        
    }
})