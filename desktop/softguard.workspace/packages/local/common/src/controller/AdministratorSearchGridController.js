//MIGRADO2024
Ext.define('Common.controller.AdministratorSearchGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'moduleComboModel', 'AdministratorSearchModel', 'OrganizationSearchModel' ],
    views : [ 'AdministratorSearchGridView' ],
    init : function(config) {
		// genero los eventos
		this.control({
            'administratorsearchgridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit
            },                    
            'administratorsearchgridview button[action=removefilter]' : {
                click: this.onRemovefilterClick
            },
            'administratorsearchgridview button[action=filterText]' : {
                click: this.onFiltertextClick
            },
            'administratorsearchgridview button[action=crearUsuario]' : {
                click: this.onCrearusuarioClick
            },
            'administratorsearchgridview button[action=reporte]' : {
                click: this.onReporteClick
            },
            'administratorsearchgridview button[action=agrupar]' : {
                click: this.onGroupOrganizacionClick
            },
            'administratorsearchgridview #central' : {
                click: this.onCentralClick
            },
            'administratorsearchgridview #dealer' : {
                click: this.onDealerClick
            },
            'administratorsearchgridview #usuarioawcc' : {
                click: this.onUsuarioawccClick
            },
            'administratorsearchgridview #usuariosbloqueados' : {
                toggle: this.onUsuariosBloqueadosToggle
            },
            'administratorsearchgridview #nuevoperfil' : {
                click: this.onNuevoPerfilClick
            }
        });
	}, //
    
    
    onNuevoPerfilClick : function (btn) {
        var view = btn.up('administratorsearchgridview')
        var udw_usuario = getLocale('Nuevo perfil');
        if (view.filterByTipo == 21){
            udw_usuario = getLocale('Nuevo prducto');
        }
        var record = this.getAdministratorSearchModelModel().create({
            udw_tipo: 3,
            udw_usuario: udw_usuario,
        })
        this.onItemClick(btn,record)
        
    },
    
    onCentralClick: function (btn) {
        var view = btn.up('administratorsearchgridview')
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        var filters = [];
       
        filters.push({
            property: 'o.udw_tipo',
            value: 0
        })
        store.filter(filters);
    },
    
    onDealerClick: function (btn) {
        var view = btn.up('administratorsearchgridview')
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        var filters = [];
    
        filters.push({
            property: 'o.udw_tipo',
            value:1
        })
        store.filter(filters);
    },
    
    onUsuarioawccClick: function (btn) {
        var view = btn.up('administratorsearchgridview')
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        var filters = [];
       
        filters.push({
            property: 'o.udw_tipo',
            value: 2
        })
        store.filter(filters);
    },
    onUsuariosBloqueadosToggle: function(btn, pressed) {
        var view = btn.up('administratorsearchgridview')
        var store = view.getStore();
        var query = view.down('#query');
        var bloqueados = 0;
        if (pressed) {
            bloqueados = 1;
        } else {
            bloqueados = 0;
        }
        store.currentPage = 1;
        store.clearFilter(true);
        var filters = [];
       
        filters.push({
            property: 'o.udw_estado',
            value: bloqueados
        })
        store.filter(filters);
    },
	initView : function(view) {
        var record = view.record;
        view.filters = [];
        var controller = this;
        
        if(view.filterByTipo) {
            view.down('#central').hide()
            view.down('#dealer').hide()
            view.down('#usuarioawcc').hide()
        }
        if(view.perfiles) {
            view.down('#central').hide()
            view.down('#dealer').hide()
            view.down('#usuarioawcc').hide()
            
            if (view.down('#agrupar')){
                view.down('#agrupar').hide();
            }
            
            
            view.down('#copycol').hide()
            
            view.down('#rangomenu').hide()
            view.down('#provincia').hide()
            
            view.down('#nuevoperfil').show()
            
            if(view.down("gridcolumn[dataIndex=udw_nombre]")) {
                view.down("gridcolumn[dataIndex=udw_nombre]").setVisible(false)
            }
            
            if(view.down("gridcolumn[dataIndex=udw_apellido]")) {
                view.down("gridcolumn[dataIndex=udw_apellido]").setVisible(false)
            }
            
            if(view.down("gridcolumn[dataIndex=udw_empresa]")) {
                view.down("gridcolumn[dataIndex=udw_empresa]").setVisible(false)
            }
            if(view.down("#Perfil")) {
                view.down("#Perfil").setVisible(false)
            }
            if(view.down("#Idioma")) {
                view.down("#Idioma").setVisible(false)
            }
            
            if (!view.filterByTipo){
                view.filterByTipo = 11
            } else if (view.filterByTipo == 21){
                view.down('#nuevoperfil').setText(getLocale('Nuevo producto'));
            }
            
        }
        
        //console.log(this.application.UserData.Company)
        
    //    var groupingFeature = view.getView().features[0];
     //   groupingFeature.startCollapsed = true;
        
        var securitymodules = SecurityModulesStore;
            
        securitymodules.load({callback: function(){
            var masterModule = securitymodules.findRecord('KeyReference','MasterWebDealer');     
            var isMaster = masterModule?masterModule.get('Available'):false;
            //si es masterwebdealer le agrego un filtro para que solo traiga su porpia organizacion y la que creo
            if(isMaster) {
               var organizacion = _UserData.Company;
               view.store =Ext.create('Ext.data.Store',{
                    model: controller.getOrganizationSearchModelModel(),
                    pageSize: 500,
                    remoteFilter: true,
                    remoteGroup: false,
                    filters: view.filters,
                    
                }).load({callback:function (records){
                    
                    var arrayId = [];
                    arrayId.push(organizacion);
                    
                    if(records.length>0) {
                        Ext.Array.each(records, function (rec,k) {
                            arrayId.push(rec.get('Id'))
                        })
                    }
                    //TODO: nose cual es el campo que debo filtrar para este REST.                    
                    /*view.filters.push({
                        property:':inint',
                        value:arrayId.join(',')
                    })*/
                    controller.loadData(view)
                }})
            } else {
                controller.loadData(view)
            }
        }}) 
	},
    loadData: function (view) {
    
        var controller = this;
        var record = view.record;
        if (record && record.get('ObjectTypeName') == 'Organization'){
            view.filters = [
                {
                    property: 'udw_empresa',
                    value: record.get('Id')
                }
            ]
        }
        
        if(view.filterByTipo) {
            view.filters.push(
                {
                    property: 'o.udw_tipo',
                    value: view.filterByTipo
                }
            ) 
        }
        
        console.log(this.application)
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getAdministratorSearchModelModel(), //'AdministratorSearch'+'.model.AdministratorSearchModel',
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            remoteGroup: false,
            filters: view.filters,
            view: view,
            sorters: [
                {
                    property : 'o.udw_idKey',
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
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load({callback: function(){
        }});
        
        
        Ext.Ajax.request({
              url: '/Rest/Security/KeyModules',
             
              method: 'GET',
              scope: this,
              success: function(response){
                var response = Ext.JSON.decode(response.responseText);
             /*  var modelModulos =  Ext.define('combomodules', {
                        extend: 'Ext.data.Model',
                        fields: [{
                                        name: 'field1',
                                        type: 'string'
                                    },{
                                        name: 'field2',
                                        type: 'string'
                                    }]
               })*/
                
                var storeComboModulos =Ext.create('Ext.data.Store',{
                    model: controller.getModuleComboModelModel(),
                    pageSize: 50,
                    remoteSort: true,
                    remoteFilter: true,
                    remoteGroup: false
                })
               view.down('#combomodulos').bindStore(storeComboModulos)
                Ext.Array.each(response, function (v,k) {
                    if(v.Module != 'Desktop') {
                        storeComboModulos.add(controller.getModuleComboModelModel().create({
                            "field1": getLocale(v.Module),
                            "field2": v.Module
                        }));    
                    }
                })
                
                storeComboModulos.add(controller.getModuleComboModelModel().create({
                    "field1": getLocale('Administrador de cuentas'),
                    "field2": 'admin-cuentas'
                }));
        
            }
        });
    },
    onGroupOrganizacionClick: function(button, event, options){
        var view = button.up('administratorsearchgridview');
        var myStore = view.store;
            
      /*  if (button.pressed){
            myStore.sorters.clear();
            myStore.group('udw_empresa','ASC');
            
            
        }else {
            myStore.clearGrouping();
        }*/
        
        
        var grouping = view.getView().features[0];
    
        if (button.pressed){
            grouping.enable();
            myStore.group('udw_empresa','ASC');
        }else {
            grouping.disable();
            myStore.clearGrouping();
            //view.getView().refresh()
        }
    },
    
    onItemClick: function(btn,record,item,index,e,options){
        var id = record.get('udw_idKey');
        var panel = btn.up('#center');
        var title = record.get('udw_usuario');
        var view = btn.up('administratorsearchgridview')?btn.up('administratorsearchgridview'):btn
        var controller = this;
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordAdminsitrator = storeSecurity.findRecord('KeyReference', 'Administrator')
        if(_UserData.udw_idKey == record.get('Id') && (!recordAdminsitrator || recordAdminsitrator.get('Available') == false)) {
            notify('No tiene permiso para autogestionar su cuenta. Contacte a la central.')
            return false;
        }
        
    	// me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
		if (!mytab) {
            
            var language = myQueryString.Language;
            var version = myQueryString.Version ? myQueryString.Version : myQueryString.version;
        
            /**
             * BC 384938074 : Agregado cuando estoy con ?version=
             */
            if (version == "") {
				var src = '/apps/administrator/?version=';
        	} else {
				var src = '/apps/administrator/';
        	}
            
            if (language){
                src =Ext.String.urlAppend(src, 'Language='+language);
            }
            
            src = Ext.String.urlAppend(src, 'objectId='+id);
            
            var createlangkey = myQueryString.createLangKey;
            if (createlangkey){
                src =Ext.String.urlAppend(src, 'createLangKey='+createlangkey);
            }
            
            src =Ext.String.urlAppend(src, 'autocreateviewport=true');
            
            
            if (view.perfiles){
                src =Ext.String.urlAppend(src, 'perfiles=1');
                src =Ext.String.urlAppend(src, 'filterByTipo='+view.filterByTipo);
            }
            var newTab = Ext.create('Ext.ux.IFrame', {
    			title : title,
                translate: false,
                tabConfig: {
                    translate: false
                },
    			objectId : id,
    			border : false,
    			src : src,
    			closable : true,
                closeAction: 'destroy'
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('administratorsearchgridview');
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        
        var dealer = view.down('#dealerfield');
        var cuenta = view.down('#cuenta');
        
        var perfil = view.down('#perfil');
        
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        var filters = [];
        if(query.getValue()) {
            filters.push({
                property: 'udw_usuario:LIKE',
                value: query.getValue()
            })
        }
        
        if(combo.getValue() && combo.getValue() != 'admin-cuentas') {
            filters.push({
                property: 'udm_modulo',
                value: combo.getValue()
            })
        } else if ( combo.getValue() == 'admin-cuentas') {
            filters.push({
                    property:"udm_modulo",
                value:"Administrator"
                
                })
            
            store.proxy.extraParams = {isAdminsCuenta:1};
        }
        
        
         if(cuenta.getValue()) {
            filters.push({
                property: 'cuenta',
                value: cuenta.getValue()
            })
        }
        
        
        if(perfil.getValue()) {
            filters.push({
                property: 'udw_iperfil',
                value: perfil.getValue()
            })
        }
        
        
        if(dealer.getValue()) {
            filters.push({
                property: 'dealer',
                value: dealer.getValue()
            })
        }
        
        
        if(view.filterByTipo) {
            filters.push(
                {
                    property: 'o.udw_tipo',
                    value: view.filterByTipo
                }
            ) 
        }
        
        store.filter(filters);
        
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('administratorsearchgridview');
        var store = view.getStore();
        store.currentPage = 1;
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
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
    
    onReporteClick: function(button, event, options){
        var title = getLocale('Reporte de usuarios');
        var src= '/handler/htmlusermodule';
        var iframe = Ext.create('Ext.ux.IFrame', {
    		//title : title,
			border : false,
            id:'frame-reporte',
			src : src,
            tbar: [
                { xtype: 'button', text: 'Imprimir', iconCls: 'icon-printer', handler: function(){
                   
                    document.getElementById('iframe-frame-reporte').contentWindow.printMe();
                }}
            ]
		});
        
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
        	title : title,
			closeAction : 'destroy',
            modal: true,
			width : 640,
			height : 480,
			border : false,
			items : [iframe]
		});
		win.show();
    }
});