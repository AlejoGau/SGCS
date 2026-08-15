//MIGRADO2024
Ext.define('Common.controller.UserByAdminHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AdministratorSearchModel' ],
    views : [ 'UserByAdminHelperView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
					'userbyadminhelperview' : {
						afterrender : this.initView,
                        itemdblclick: this.onItemClick
					},                    
                    'userbyadminhelperview button[action=removefilter]' : {
                        click: this.onRemovefilterClick
            		},
                    'userbyadminhelperview button[action=filterText]' : {
                        click: this.onFiltertextClick
                	},                    
                    
                    'userbyadminhelperview button[action=agrupar]' : {
                        click: this.onGroupOrganizacionClick
                    },
                    'userbyadminhelperview #central' : {
                        click: this.onCentralClick
                    },
                    'userbyadminhelperview #dealer' : {
                        click: this.onDealerClick
                    },
                    'userbyadminhelperview #usuarioawcc' : {
                        click: this.onUsuarioawccClick
                    },
                    'userbyadminhelperview #nuevousuario' : {
                        click: this.onNuevoUsuarioawccClick
                    },
                    'userbyadminhelperview #search' : {
                        click: this.onSearchcClick
                    }
				});
	}, //
    
    onSearchcClick: function(btn) {
        
        var view = btn.up('userbyadminhelperview')
        
        view.getStore().filter([{
            property:'udw_usuario:LIKE',
            value: view.down('#searchtext').getValue()
        }])
        
    },
    onNuevoUsuarioawccClick: function (btn) {
        var view = btn.up('userbyadminhelperview')        
        
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
        var view = btn.up('userbyadminhelperview')
        
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
        var view = btn.up('userbyadminhelperview')
        
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
        var view = btn.up('userbyadminhelperview')
        
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
        
       if(view.hideUsers != '') {
           view.filters.push(
                {
                    property: 'udw_idKey:NOTININT',
                    value: view.hideUsers
                }
            )
       }
     
        
        if(view.filterByTipo) {
            view.filters.push(
                {
                    property: 'udw_tipo',
                    value: view.filterByTipo
                }
            )
            
            
        }
         view.store =Ext.create('Ext.data.Store',{
            model: this.getAdministratorSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            remoteGroup: false,
            filters: view.filters,
            view: view,
            sorters: [
                {
                    property : 'udw_nombre',
                    direction: 'ASC'
                }
            ]
        })
        view.bindStore(view.store)
        view.store.load({callback: function(){
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
        view = view.up('userbyadminhelperview');        
    	view.caller.fireEvent('userSelected', record, view.caller)
        
        if(view.up('window')) {
            view.up('window').close()
        }
        
        
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('userbyadminhelperview');
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
        var view = button.up('userbyadminhelperview');
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