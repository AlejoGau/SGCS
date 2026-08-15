//MIGRADO2024
Ext.define('Common.controller.UsuariosSelecterHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'UserByCuentaWithRangoModel', 'UserByDealerWithRangoModel' ],
    views : [ 'UsuariosSelecterHelperView' ],
    init : function(config) {
        // genero los eventos
		this.control({
					'usuarioselecterhelperview' : {
						afterrender : this.initView,
                        itemdblclick: this.onItemClick
					},                    
                    'usuarioselecterhelperview button[action=removefilter]' : {
                        click: this.onRemovefilterClick
            		},
                    'usuarioselecterhelperview button[action=filterText]' : {
                        click: this.onFiltertextClick
                	},                    
                    
                    'usuarioselecterhelperview button[action=agrupar]' : {
                        click: this.onGroupOrganizacionClick
                    },
                    'usuarioselecterhelperview #central' : {
                        click: this.onCentralClick
                    },
                    'usuarioselecterhelperview #dealer' : {
                        click: this.onDealerClick
                    },
                    'usuarioselecterhelperview #usuarioawcc' : {
                        click: this.onUsuarioawccClick
                    },
                    'usuarioselecterhelperview #nuevousuario' : {
                        click: this.onNuevoUsuarioawccClick
                    },
                    'usuarioselecterhelperview #search' : {
                        click: this.onSearchcClick
                    }
				});
	}, //
    
    onSearchcClick: function(btn) {
        
        var view = btn.up('usuarioselecterhelperview')
        
        
        var store = view.getStore();
        
        var filters = Ext.clone(view.filters);
        
        filters.push({
            property:'udw_usuario:LIKE',
            value: view.down('#searchtext').getValue()
        })
        
        store.clearFilter(true);
        view.getStore().filter(filters)
        
    },
    onNuevoUsuarioawccClick: function (btn) {
        var view = btn.up('usuarioselecterhelperview')        
        
        var recordUsuario = this.getAdministratorFormModelModel().create()
        
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
            title : 'Nuevo usuario',
			closeAction : 'destroy',
            modal: true,
			width : 640,
			height : 480,
			border : false,
			items : [{
                xtype:'awccusuariosformview',
                caller: view,
                record:recordUsuario,
                recordCuenta: view.record
			}]
		});
		win.show();
        
    },
    
    
    onCentralClick: function (btn) {
        var view = btn.up('usuarioselecterhelperview')
        
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        var filters = [];
       
            filters.push({
                property: 'udw_tipo',
                value: 0
            })
        
        
        store.filter(filters);
    
    
    },
    
    onDealerClick: function (btn) {
        var view = btn.up('usuarioselecterhelperview')
        
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        var filters = [];
       
            filters.push({
                property: 'udw_tipo',
                value:1
            })
        
        
        store.filter(filters);
    },
    
    onUsuarioawccClick: function (btn) {
        var view = btn.up('usuarioselecterhelperview')
        
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        var filters = [];
       
            filters.push({
                property: 'udw_tipo',
                value: 2
            })
        
        
        store.filter(filters);
    
    
    },
	initView : function(view) {
        var record = view.record;
        view.filters = [];
        var controller = this;
        
       // if(view.filterByTipo) {
            
           /* view.down('#central').hide()
            view.down('#dealer').hide()
            view.down('#usuarioawcc').hide()*/
       // }
        
     
       controller.loadData(view)
     
        
        
        
	},
    
    
    loadData: function (view) {
    
    
        var record = view.record;
        
       
     
        
        if(view.filterByTipo) {
            view.filters.push(
                {
                    property: 'udw_tipo',
                    value: view.filterByTipo
                }
            )
            
            
        }
        
        console.log(this.application)
        
        var model = this.getUserByDealerWithRangoModelModel()
        
        if(view.cuentaWithRango) {
            model = this.getUserByCuentaWithRangoModelModel();
            view.filters.push(
                {
                    property: 'dealer',
                    value: view.dealer
                }
            )
            view.filters.push(
                {
                    property: 'cuenta',
                    value: view.cuentaNumero
                }
            )
        }
        if(view.udw_tipo) {
            view.filters.push(
                {
                    property: 'udw_tipo',
                    value: view.udw_tipo
                }
            )
        }
        
        view.store =Ext.create('Ext.data.Store',{
            model: model,
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            remoteGroup: false,
            filters: view.filters,
            view: view,
            sorters: [
                {
                    property : 'udw_idKey',
                    direction: 'ASC'
                }
            ],
            listeners: {
                groupchange: function(store){
                    var view = store.view;
                    var groupingFeature = view.getView().features[0];
                    groupingFeature.collapseAll();
            
                    //console.log(arguments)
                }
            }
        })
        view.bindStore(view.store)
        view.store.load({callback: function(records){
   console.log(records)
        
        }});
        
        
      
    },
    
    
     onGroupOrganizacionClick: function(button, event, options){
        var view = button.up('awccUsuariobydealergridview');
        
        var myStore = view.store;
            
        if (button.pressed){
            myStore.sorters.clear();
            myStore.group('udw_empresa','ASC');
            
            
        }else {
            myStore.clearGrouping();
        }
        
        
    },
    
    onItemClick: function(view,record,item,index,e,options){        
        view = view.up('usuarioselecterhelperview');        
    	view.caller.fireEvent('userSelected', record, view.caller)
        
        if(view.up('window')) {
            view.up('window').close()
        }
        
        
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('usuarioselecterhelperview');
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        var filters = [];
        if(query.getValue()) {
            filters.push({
                property: 'udw_usuario',
                value: query.getValue()
            })
        }
        
       /* if(combo.getValue()) {
            filters.push({
                property: 'udm_modulo',
                value: combo.getValue()
            })
        }*/
        
        
        if(view.filterByTipo) {
            filters.push(
                {
                    property: 'udw_tipo',
                    value: view.filterByTipo
                }
            )
            
            
        }
        
        filters.push(
                {
                    property: 'dealer',
                    value: view.record.get('cue_clinea')
                }
            )
        
        store.filter(filters);
        
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('usuarioselecterhelperview');
        var store = view.getStore();
        store.currentPage = 1;
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
  
    
    onCrearusuarioClick: function(button, event, options){        
        var panel = button.up('#center');
        var title = getLocale("Nuevo usuario");
        var language = myQueryString.Language;
        
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
		if (!mytab) {
			var src = '/apps/administrator/';
            
            if (language){
                src =Ext.String.urlAppend(src, 'Language='+language);
            }
            
            if (myQueryString.createLangKey){
                src =Ext.String.urlAppend(src, 'createLangKey='+createlangkey);
            }
            
            src =Ext.String.urlAppend(src, 'objectId=0');
            src =Ext.String.urlAppend(src, 'autocreateviewport=true');
            var newTab = Ext.create('Ext.ux.IFrame', {
    			title : title,
    			objectId : 0,
    			border : false,
    			src : src,
    			closable : true
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
    },
    
    onCuentaCreated: function(view){
        var record = view.record;
        var grid = view.caller;
        this.onItemClick(grid, record);
    },
    
});