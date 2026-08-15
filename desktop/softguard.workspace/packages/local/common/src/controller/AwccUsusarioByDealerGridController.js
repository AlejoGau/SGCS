//MIGRADO2024
Ext.define('Common.controller.AwccUsusarioByDealerGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'UserByCuentaWithRangoModel', 'AdministratorFormModel', 'UsersDesktopWebModulosModel' ],
    views : [ 'AwccUsusarioByDealerGridView' ],
    init : function(config) {
    	// genero los eventos
		this.control({
            'awccUsuariobydealergridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                userSaved: this.onUserSaved,
                userSelected: this.onUserSelected
            },                    
            'awccUsuariobydealergridview button[action=removefilter]' : {
                click: this.onRemovefilterClick
            },
            'awccUsuariobydealergridview button[action=filterText]' : {
                click: this.onFiltertextClick
            },                    
            'awccUsuariobydealergridview button[action=reporte]' : {
                click: this.onReporteClick
            },
            'awccUsuariobydealergridview button[action=agrupar]' : {
                click: this.onGroupOrganizacionClick
            },
            'awccUsuariobydealergridview #central' : {
                click: this.onCentralClick
            },
            'awccUsuariobydealergridview #dealer' : {
                click: this.onDealerClick
            },
            'awccUsuariobydealergridview #usuarioawcc' : {
                click: this.onUsuarioawccClick
            },
            'awccUsuariobydealergridview #nuevousuario' : {
                click: this.onNuevoUsuarioawccClick
            },
            'awccUsuariobydealergridview #asignarusaurio' : {
                click: this.onAsignarUsuarioawccClick
            }
            
        });
	}, //
    
    
    initView : function(view) {
        var record = view.record;
        view.filters = [];
        var controller = this;
        var module = view.module;
        var profile = module?module.get('profile'):1;
        view.profile = profile;
        view.down('#central').hide()
        view.down('#dealer').hide()
        view.down('#usuarioawcc').hide()
        
        if (profile == 1){
            view.down('#asignarusaurio').hide()
        }
        
        var securitymodulestore = SecurityModulesStore;//this.getSecurityModulesStoreStore();
        // falta preguntar por fulladmin?
        
        if (profile != 1 && ( securitymodulestore.isModuleAvailable('Administrator') || securitymodulestore.isModuleAvailable('MasterWebDealer'))){
            view.hasAdmin = true;
        } else {
            view.down('#nuevousuario').hide();
            view.down('#actioncolumn').hide();
            view.hasAdmin = false;
        }
     
        controller.loadData(view) 
    },
    
    
    onUserSelected: function (record, view) {
          //agrego rango
        var recordUdw = this.getUsersDesktopWebModulosModelModel().create({
           // Id:0,
            dwm_cuenta_desde:view.record.get('cue_ncuenta'),
            dwm_cuenta_hasta:view.record.get('cue_ncuenta'),
            dwm_dealer:view.record.get('cue_clinea'),
            dwm_idWeb:record.get('Id')
        });
        recordUdw.set("Id",0);
        recordUdw.save({callback:function (record) {
            notify('El usuario se asignó con éxito');
            view.getStore().load();
        }})
    },
    
    
    onAsignarUsuarioawccClick: function (btn) {
        var view = btn.up('awccUsuariobydealergridview')
        
        var idUsuarioExistentes = [];
        view.getStore().each(function (v,k) {
            idUsuarioExistentes.push(v.get('udw_idKey'))
        })
        
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
            title : 'Seleccione un usuario',
    		closeAction : 'destroy',
            modal: true,
			width : 640,
			height : 480,
			border : false,
			items : [{
                xtype:'userbyadminhelperview',
                caller: view,
                record: view.record,
                cuentaWithRango: true,
                cuentaNumero:Ext.util.Format.trim(view.record.get('cue_ncuenta')),
                dealer:view.record.get('cue_clinea'),
                filterByTipo: 2,
                hideUsers:idUsuarioExistentes.join(',')
			}]
		});
		win.show();
    },
    onUserSaved: function (record, view) {
            
            view.getStore().load()
    },
    onNuevoUsuarioawccClick: function (btn) {
        var view = btn.up('awccUsuariobydealergridview')        
        
        var recordUsuario = this.getAdministratorFormModelModel().create();
        recordUsuario.set('Id',0);
        /*
        {
            udw_empresa: _UserData.Company
        }
        */
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
                recordCuenta: view.record,
                forceTypeUser: 2
			}]
		});
		win.show();
        
    },
    
    
    onCentralClick: function (btn) {
        var view = btn.up('awccUsuariobydealergridview')
        
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
        var view = btn.up('awccUsuariobydealergridview')
        
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
        var view = btn.up('awccUsuariobydealergridview')
        
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
    
    
    loadData: function (view) {
        var record = view.record;
        
        view.filters.push(
                {
                    property: 'dealer',
                    value: record.get('cue_clinea')
                }
            )
            
        view.filters.push(
                {
                    property: 'cuenta',
                    value: record.get('cue_ncuenta')
                }
            )
        if(view.filterByTipo) {
            view.filters.push(
                {
                    property: 'udw_tipo',
                    value: view.filterByTipo
                }
            )
            
            
        } else {
            view.filters.push(
                {
                    property: 'udw_tipo',
                    value: 2
                }
            )
        }
        
        console.log(this.application)
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getUserByCuentaWithRangoModelModel(),
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
        
        view.store.load();
        
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
        var id = record.get('udw_idKey');
        var panel = view.up('#center');
        var title = record.get('udw_usuario');
        var awccview = view.up('awccUsuariobydealergridview');
    	// me fijo si el tab existe, si es nuevo lo creo
        
        if (awccview.hasAdmin){ 
            var mytab = panel.down('[title="' + title + '"]');
        	if (!mytab) {
                
                var language = myQueryString.Language;
            
                var src = "/a/administrator/" ;
                
                if (language){
                    src =Ext.String.urlAppend(src, 'Language='+language);
                }
                
                src =Ext.String.urlAppend(src, 'objectId='+id);
                
                var createlangkey = myQueryString.createLangKey;
                if (createlangkey){
                    src =Ext.String.urlAppend(src, 'createLangKey='+createlangkey);
                }
                
                src =Ext.String.urlAppend(src, 'autocreateviewport=true');
    
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
        } else {
            notifyError('No posee derechos para modificar los datos')
        }
        
        
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('awccUsuariobydealergridview');
        var store = view.getStore();
        var query = view.down('#query');
        var combo = view.down('#combomodulos');
        store.currentPage = 1;
        //store.filter('udw_usuario',query.getValue());
        store.clearFilter(true);
        
        var filters = Ext.clone(view.filters);
        
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
        
        
      /*  if(view.filterByTipo) {
            filters.push(
                {
                    property: 'o.udw_tipo',
                    value: view.filterByTipo
                }
            )
            
            
        }*/
        
       /* filters.push(
                {
                    property: 'dealer',
                    value: view.record.get('cue_clinea')
                }
            )
        */
        store.filter(filters);
        
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('awccUsuariobydealergridview');
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
			var src = '/a/administrator/';
            
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