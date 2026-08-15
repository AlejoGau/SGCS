Ext.define('GestorSim.controller.ModuleController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
    		models : [ 'ModuleModel' ],
			views : [ 'ModuleTreeView' ],

	init : function(config) {
        // genero los eventos
		this.control({

			// selección del modulo en el arbol
			'moduletreeview' : {
				//select : this.onModuleSelect,
                itemclick: this.onModuleClick
			},
            'moduletoolbar button' : {
    			click : this.onToolbarClick
			}
            ,
            '#modulemenu menuitem' : {
        		click : this.onToolbarClick
			}

		});

	}, // cierro init

    onToolbarClick: function(button, event, options){
        var title = button.text;
        var view = button.view;
        var url = button.myurl;
        var closable = button.closable;
        var viewConfig = button.viewConfig;
        
        var moduleView = {};
        
        if (button.skipRecord){
            moduleView = {record:false, skipRecord:true};
        }

        this.showModule(title,view,url,moduleView,closable, viewConfig, button);

    },
    
    showModule: function(title,view,url,moduleView,closable, viewConfig, module){
        
        var myPanel = moduleView.targetTab?moduleView.targetTab:Ext.getCmp('center');
        var record = moduleView.record;
        
        if (!record && !moduleView.skipRecord){
            if (Ext.getClassName(myPanel)=='Ext.tab.Panel'){
                record = myPanel.getActiveTab()?myPanel.getActiveTab().record:undefined;
            }else {
                record = myPanel.record;
            }
        }
        
        title = getLocale(title);
        
        var mytab = myPanel.down('[title="' + title + '"][idBtn="' + module.id + '"]');
    	if (!mytab) {
			// si el modulo es una view
			if (view) {
				//console.log('view: '+ record.get('view'),record);
				var newTab = Ext.widget(view,{
                    record: record,
                    tabConfig: {translate: false},
                    translate: false,
                    targetTab: myPanel,
                    module: module,
                    title: title,
        			closable: closable,
                    closeAction: 'destroy',
                    autoDestroy: true,
                    idBtn: module.id
                    // Parche porque el autodestroy no quiere
				});
			} // cierro if

			// como no es una view espero una URL
			else if (url){
				var newTab = Ext.create('Ext.ux.IFrame', {
					title : title,
                    tabConfig: {translate: false},
                    translate: false,
					border : false,
					src : url,
					closable : closable,
                    closeAction: 'destroy',
                    autoDestroy: false
				});
			}
            
            
            if (newTab){
                if (viewConfig){
                    Ext.apply(newTab,viewConfig);
                }
                
        		// agrego la paleta creada
    			myPanel.add(newTab);
    			myPanel.setActiveTab(newTab);
            }
			
		}
		// el existe, lo activo
		else {
            mytab.show();
		}  
    },
    
    onModuleClick: function(treeView, module) {
        var title = module.get('text');
        var view = module.get('view');
        var url = module.get('url');
        var closable = module.get('closable');
        var moduleView = treeView;
        var treepanel = treeView.up('moduletreeview');
        var store = moduleView.getStore();
        
        //agrege esto para que un item se pueda setear que no se abra al click, use opened por que vi que nadie lo usaba
        if(module.get('opened') == "noabrir") {
            return false;
        }  
        
        var viewConfig;
        if(module.viewConfig) {
            viewConfig = module.viewConfig
        } else if(module.get('viewConfig')) {
            viewConfig = module.get('viewConfig')
        }
        
        if (viewConfig && typeof viewConfig === 'string' && viewConfig!='') {
            viewConfig = Ext.JSON.decode(viewConfig);
        }
        //var moduleView = selModel.view;
        
        var position = store.find('text',title);
        
        var myPanel = treepanel.targetTab?treepanel.targetTab:Ext.getCmp('center');
        var record = moduleView.record?moduleView.record:treepanel.record;
        var cuenta = moduleView.cuenta?moduleView.cuenta:treepanel.cuenta;
        var rights = treepanel.rights;
        var security = treepanel.security;
        
        if (!record){
            if (Ext.getClassName(myPanel)=='Ext.tab.Panel' && myPanel.getActiveTab()){
                record = myPanel.getActiveTab().record;
            }else {
                record = myPanel.record;
            }
        }
        
        if (!cuenta){
            if (Ext.getClassName(myPanel)=='Ext.tab.Panel' && myPanel.getActiveTab()){
                cuenta = myPanel.getActiveTab().cuenta;
            }else {
                cuenta = myPanel.cuenta;
            }
        }
        
        title = getLocale(title);
        
    	// me fijo si el tab existe, si es nuevo lo creo
        // tengo que buscar solo los tabs y no cualquier panel que este adentro
        var mytab;
        // console.log("myPanel.items %o", myPanel.items);
        if(myPanel.items.items.find)
        {

            mytab = myPanel.items.items.find(function(i){
                return i.title === title
            });
        }

		if (!mytab) {
			// si el modulo es una view
			if (view) {
				//console.log('view: '+ record.get('view'),record);
                var _config = {
                    record: record,
                    tabConfig: {translate: false},
                    translate: false,
                    targetTab: myPanel,
                    cuenta: cuenta,
                    title: title,
                    module: module,
                    security: security,
                    rights: rights,
        			closable: closable,
                    closeAction: 'destroy',
                    autoDestroy: true
                    // Parche porque el autodestroy no quiere
				}

                if (viewConfig){
                    Ext.apply(_config,viewConfig);
                }
				var newTab = Ext.widget(view,_config);

			} // cierro if

			// como no es una view espero una URL
			else if(url) {
				var newTab = Ext.create('Ext.ux.IFrame', {
					title : title,
					border : false,
                    tabConfig: {translate: false},
                    translate: false,
					src : url,
					closable : closable,
                    closeAction: 'destroy',
                    autoDestroy: true
				});
			}

			if (newTab){
            	// agrego la paleta creada
    			myPanel.add(newTab);
    			myPanel.setActiveTab(newTab);
            }
			
		}
		// el existe, lo activo
		else {
            mytab.show();
		}

	},
    
    onModuleSelect: function(selModel, module) {
        var title = module.get('text');
        var view = module.get('view');
        var url = module.get('url');
        var closable = module.get('closable');
        var store = selModel.store;
        var moduleView = selModel.view;
        var viewConfig = module.get('viewConfig');
        
        var position = store.find('text',title);
        
        var myPanel = moduleView.targetTab?moduleView.targetTab:Ext.getCmp('center');
        var record = moduleView.record;
        var rights = moduleView.up('moduletreeview').rights;
        var security = moduleView.up('moduletreeview').security;
        
        if (!record){
            if (Ext.getClassName(myPanel)=='Ext.tab.Panel'){
                record = myPanel.getActiveTab().record;
            }else {
                record = myPanel.record;
            }
        }
        
        title = getLocale(title);
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = myPanel.down('[title="' + title + '"]');
		if (!mytab) {
			// si el modulo es una view
			if (view) {
				//console.log('view: '+ record.get('view'),record);
				var newTab = Ext.widget(view,{
                    record: record,
                    targetTab: myPanel,
                    tabConfig: {translate: false},
                    translate: false,
                    title: title,
                    module: module,
                    security: security,
                    rights: rights,
        			closable: closable,
                    closeAction: 'destroy',
                    autoDestroy: true,
                    // Parche porque el autodestroy no quiere
				});
			} // cierro if

			// como no es una view espero una URL
			else {
				var newTab = Ext.create('Ext.ux.IFrame', {
					title : title,
					border : false,
                    tabConfig: {translate: false},
                    translate: false,
					src : url,
					closable : closable,
                    closeAction: 'destroy',
                    autoDestroy: false
				});
			}
            
            
            if (viewConfig){
                Ext.apply(newTab,viewConfig);
            }

			// agrego la paleta creada
			myPanel.add(newTab);
			myPanel.setActiveTab(newTab);
			
		}
		// el existe, lo activo
		else {
            mytab.show();
		}

	}
});