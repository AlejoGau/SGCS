//MIGRADO2024
var t = this;
Ext.define('Common.controller.SoftguardUsuarioGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.SoftguardUsuarioStore', 'Common.store.SoftguardUsuarioTipoStore' ],
    models : [ 'UsuarioModel', 'SoftguardCuentaModel', 'SoftguardUsuarioModel' ],
	views : [ 'Common.view.SoftguardUsuarioGridView' ],
    
    init: function (config) {
        var me=this;
        // genero los eventos
        this.control({
            'griduser button[action=delete]': {
                click: this.onDeleteClick
            },
            'griduser button[action=add]': {
                click: this.onAddClick
            },
            'griduser button[action=save]': {
                click: this.onSaveClick
            },
            'griduser button[action=verusuariosmadre]': {
                click: this.onVerUsuariosMadreClick
            },
            'griduser button[action=refresh]': {
                click: this.onRefreshClick
            },
            'griduser button[action=copyusers]': {
                click: this.onCopyUsersClick
            },
            
            'flotagpsview' : {
                vehicleSelected: this.onVehicleSelected
            },
            'griduser':{
                afterrender: this.loadData,
                beforerender: this.onBeforeRender,
                recordchanged: this.loadData,
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                refresh: this.onRefresh,
                cuentachanged : this.onCuentaSelected,
                controlacceso: this.onControlAcceso,
                selectionchange: this.onRowSelectChange
            }
        });
    }, // cierro init
    onBeforeRender: function(view){
        //Verifico si la cuenta cumple las condiciones par el control de acceso
        var record = view.record;
        Ext.Ajax.request({
            url: '/rest/search/CheckControlAcceso?cue_iid='+record.get('cue_iid'),
            method: 'GET',
            success: function(response,operation) {
                try{
                    var _json = Ext.JSON.decode(response.responseText);
                    console.log(_json)
                    if(_json.rows.length>0)
                        view.isControlAcceso = JSON.parse(_json.rows[0].Existe.toLowerCase());
                    console.log(view.isControlAcceso);
                    console.log('ID: ' + record.get('cue_iid'));
                    console.log('SoftguardUsuarioGridController - isControlAcceso: ' + view.isControlAcceso);
                }
catch(e) {
                    console.log('Error al validar control de acceso');
                }
                
                // una vez que cargue el store hago el binding con la view
                //view.mystore.load({ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore});
            }
        });
    },
    onControlAcceso: function (record, view) {
        var newView = Ext.widget('p_controlacceso_autorizacionview',{
            record: record,
            caller:view
        });
        
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: 'Control de acceso',
            closable: true,
            height: 550,
            width: 800,
            modal: true, 
            items: newView,
            layout: 'fit'
        }).show();
    },
    onRowSelectChange: function(selModel, selections){
        var grid = selModel.view.up('griduser');
        var btn = grid.down('#delete');
        
        if(selections.length>0){
            btn.enable();
        }else{
            btn.disable(true);
        }

    },
    onCopyUsersClick: function(button,event,options){
         var view = button.up('griduser');
         var hidebuttons = [];
         if(this.application._nameModule  == 'VigiControl' || this.application._nameModule  == 'TrackGuard') {
             hidebuttons.push('#fallotst')
             hidebuttons.push('#particiones')
         }
         
         var soloVehiculo = false;
         //var filterTipo = '';
         if(this.application._nameModule  == 'TrackGuard') {
             soloVehiculo = true;
             //filterTipo = 'nofilter';
         }
         
         var win = Ext.create('Ext.Window', {
            layout: 'fit',
        	title : 'Seleccione Cuentas',
			closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentahelperview',                    
                    caller: view,                    
                    multiSelect: false,
                    tip_nCondicion: view.tip_nCondicion,
                    selectionEvent: 'cuentachanged',
                    hidebuttons: hidebuttons,
                    //filterTipo: filterTipo
                    soloVehiculo: soloVehiculo
                }
            ]
		});
		win.show();
    },
	onCuentaSelected:  function (cuenta,view) {
        var controller = this;
      
        var dialog = Ext.create('Ext.window.MessageBox', {
            buttons: [
                { 
                    text: 'Si',
                    handler: function() {
                        controller.contactoscopiar(cuenta, view, controller,1);
                         dialog.close();
                    } 
                },
                { 
                    text: 'No (actualizar existentes)',
                    handler: function() {
                        controller.contactoscopiar(cuenta, view, controller,2);
                        dialog.close();
                    } 
                },
                { 
                    text: 'No (copiar duplicados)',
                    handler: function() {
                        controller.contactoscopiar(cuenta, view, controller,0);
                        dialog.close();
                    } 
                },
                { 
                    text: 'Cancelar',
                    handler: function() {
                        dialog.close();
                    } 
                }
            ]
        });
        dialog.show({
            title:getLocale('Eliminar usuarios'),
            msg: getLocale('Desea reemplazar los contactos existentes (caso contrario se sumarán al listado actual)'),
            icon: Ext.Msg.QUESTION
        });
    },
    contactoscopiar: function(cuenta, view, controller, eliminar){
        if(this.application._nameModule  == 'TrackGuard') {
             var cuentaDestino = view.record.get('OwnerId')
         }else{
             var cuentaDestino = view.record.get('Id')
         }
        var cuentaOrigen = cuenta.get('Id')
        
        Ext.Ajax.request({
            url: '/rest/search/CuentaCopyUsers',
            params: { 
                cuentaOrigen: cuentaOrigen,
                cuentaDestino: cuentaDestino,
                eliminar: eliminar
            },
            method: 'GET',
            scope: this,
            success: function(response){
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                controller.loadData(view)
            }
        });
    },
    onRefresh: function (view) {
        //view.mystore.load({ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore});
        var store = view.store;
        store.load({ObjectId: view._ObjectId});
    },
    onVehicleSelected: function(record, view){
        var dataPanel = view.down('#datapanel');
        
        if (dataPanel)
            var grid = dataPanel.down('griduser');
        
        if (grid){
            grid.record = record;
            //if (!grid.collapsed){
                this.loadData(grid);
            //}
        } 
    },
    loadData: function (view) {
        var record = view.record;
        var module = view.module;
        var profile = view.module.profile?view.module.profile:view.module.get('profile');
        var controller = this;
        view.profile = profile;
        
        if (profile < 2){
            view.down('toolbar').hide();
        }
        if (profile == 4){
            view.down('#save').hide();
            view.down('#delete').hide();
        }
        
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        view.mystore =Ext.create('Ext.data.Store',{
            model: 'Common.model.SoftguardUsuarioModel'
        });
        
        //si tiene el id de la madre muestro el boton
        if(record.get('cue_nparticion') != 0) {
            view.down('#verusuariosmadre').show();
        }
        
        view._ObjectId = record.get('cue_iid');
        
        // una vez que cargue el store hago el binding con la view
        if(controller.application._nameModule != 'TrackGuard'){
            view.mystore.load({ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore});
        }
        //verifico de donde saco los rights en webremoto viene con view.security.rights y en el resto en view.rights
        var rights;
        if(view.rights) {
            rights = view.rights;
        } else if (view.security && view.security.rights) {
            rights = view.security.rights;
        }
        
        if ((profile > 2 && profile != 4) || (rights && rights.claves == true)){
            view.down('#usu_cclave').show();
        } else {
            view.down('#usu_cclave').hide();
        }
        
        var modules =  SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');
        view.isAdmin = modules.isModuleAvailable('Administrator');
        
        if(view.isAdmin) {
           view.down('#usu_cclave').show(); 
        }
        
        if(controller.application._nameModule && ( controller.application._nameModule == 'TrackGuard' || controller.application._nameModule == 'TrackguardMonitoreo')) {
            view.down('#verusuariosmadre').hide()
        }
        if (profile < 2){
            view.down('toolbar').hide();
        }
        if (profile == 4){
            view.down('#save').hide();
            view.down('#delete').hide();
        }
        
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        view.mystore =Ext.create('Ext.data.Store',{
            model: 'Common.model.SoftguardUsuarioModel'
        });
        
        //si tiene el id de la madre muestro el boton
        if(record.get('cue_nparticion') != 0) {
            view.down('#verusuariosmadre').show();
        }
        
        view._ObjectId = record.get('cue_iid');
        // una vez que cargue el store hago el binding con la view
          if(controller.application._nameModule != 'TrackGuard'){
            view.mystore.load({ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore});
         }
        
        //verifico de donde saco los rights en webremoto viene con view.security.rights y en el resto en view.rights
        var rights;
        if(view.rights) {
            rights = view.rights;
        } else if (view.security && view.security.rights) {
            rights = view.security.rights;
        }
        
        if ((profile > 2 && profile != 4) || (rights && rights.claves == true)){
            view.down('#usu_cclave').show();
        } else {
            view.down('#usu_cclave').hide();
        }
        
        var modules =  SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');
        view.isAdmin = modules.isModuleAvailable('Administrator');
        
        if(view.isAdmin) {
           view.down('#usu_cclave').show(); 
        }
        
        if(controller.application._nameModule && ( controller.application._nameModule == 'TrackGuard' || controller.application._nameModule == 'TrackguardMonitoreo')) {
            view.down('#verusuariosmadre').hide()
        }
        if (profile < 2){
            view.down('toolbar').hide();
        }
        if (profile == 4){
            view.down('#save').hide();
            view.down('#delete').hide();
        }
        
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        view.mystore =Ext.create('Ext.data.Store',{
            model: 'Common.model.SoftguardUsuarioModel'
        });
        
        //si tiene el id de la madre muestro el boton
        if(record.get('cue_nparticion') != 0) {
            view.down('#verusuariosmadre').show();
        }
        
        view._ObjectId = record.get('cue_iid');
        
        
        // una vez que cargue el store hago el binding con la view
         if(controller.application._nameModule != 'TrackGuard'){
            view.mystore.load({ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore});
         }
        //verifico de donde saco los rights en webremoto viene con view.security.rights y en el resto en view.rights
        var rights;
        if(view.rights) {
            rights = view.rights;
        } else if (view.security && view.security.rights) {
            rights = view.security.rights;
        }
        
        if ((profile > 2 && profile != 4) || (rights && rights.claves == true)){
            view.down('#usu_cclave').show();
        } else {
            view.down('#usu_cclave').hide();
        }
        
        var modules =  SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');
        view.isAdmin = modules.isModuleAvailable('Administrator');
        
        if(view.isAdmin) {
           view.down('#usu_cclave').show(); 
        }
        
        if(controller.application._nameModule && ( controller.application._nameModule == 'TrackGuard' || controller.application._nameModule == 'TrackguardMonitoreo')) {
            view.down('#verusuariosmadre').hide()
        }
        //Verifico si la cuenta cumple las condiciones par el control de acceso
        /*Ext.Ajax.request({
            url: '/rest/search/CheckControlAcceso?cue_iid='+record.get('cue_iid'),
            method: 'GET',
            success: function(response,operation) {
                var _json = Ext.JSON.decode(response.responseText);
                console.log(_json)
                view.isControlAcceso = JSON.parse(_json.rows[0].Existe.toLowerCase());
                console.log(view.isControlAcceso);
                console.log('ID: ' + record.get('cue_iid'));
                console.log('SoftguardUsuarioGridController - isControlAcceso: ' + view.isControlAcceso);
                // una vez que cargue el store hago el binding con la view
                //view.mystore.load({ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore});
            }
        });*/
        console.log('Name aplication')
        console.log(controller.application);
        console.log(controller.application._nameModule)
    },
    
    onRefreshClick: function (button,event,options) {
         var view = button.up('griduser');
         console.log('se actualizo')
         view.mystore.load({ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore});
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            operation.view.bindStore(operation.store);
        }
    },
    onVerUsuariosMadreClick: function(button,event,options){
        var view = button.up('griduser');
        var record = view.record;
        var panel = view.up('#center');
        var recordCuenta = this.getSoftguardCuentaModelModel();    
        var objectId = record.get('cue_nparticion');
        
        recordCuenta.load(objectId, {
            callback : function(record,operation) {
                if (operation.success){
                    var title = "Usuarios de: "+record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');
    
                    var mytab = panel.down('[title="' + title + '"]');
                    if (!mytab) {
                        var newTab = Ext.widget('griduser', {
                            tabConfig: {translate: false},
                            title : title,
                            record: record,
                            module: view.module,
                            translate: false,
                            closable: true,
                            closeAction: 'destroy',
                            itemId: record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + '-' + record.get('cue_cnombre')
                        });
                        panel.add(newTab);
                        panel.setActiveTab(newTab);
                    }
                    // el existe, lo activo
                    else {
                        mytab.show();
                    }
                }
            }
        });
    },
    onDeleteClick: function(button,event,options){
        var view = button.up('griduser');
        var selection = view.getSelectionModel().getSelection()[0];
        
        if (selection) {
            
            Ext.MessageBox.confirm(getLocale('Eliminar')
                    ,getLocale('En caso de tener invitaciones pendientes no se podra eliminar, desea continuar?')
                    ,function(btn){
                        if(btn=='yes'){
                            //view.store.remove(selection);
                            selection.erase({
                                success: function (record) {
                                    notify("Registro eliminado con éxito");
                                    controller.initView(view);
                                },
                                failure: function (record, operation) {
                                    notify("Error al eliminar el registro");
                                }                                
                            });
                        }
                    });
  
    }
        
    },
    onAddClick: function(button,event,options){
        var view = button.up('griduser');
		var cuenta =  view.record;
        var store = view.getStore();
		
        /*var records = store.add({
                usu_iidcuenta: cuenta.get('cue_iid'),
                usu_ntipo: 2
            });*/
            
        var record = this.getSoftguardUsuarioModelModel().create({
                usu_iidcuenta: cuenta.get('cue_iid'),
                usu_ntipo: 2,
                usu_cimagen: ''
            }) 
            
        
        this.openFormWindow(getLocale('Nuevo Usuario'),record,view);
    },
    onSaveClick: function (button,event,options) {
        var view = button.up('griduser');
        var store = view.store;
        store.sync();
        notify(getLocale('Los cambios se guardaron con éxito'));
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        var controller = this;
        if(isNaN(record.id)){
            record.id = record.data.usu_iid;
            record.data.Id = record.data.usu_iid;
        }
        this.getUsuarioModelModel().load(record.data.Id, {callback:function (recordx) {
            controller.openFormWindow(record.get('usu_cnombre'),recordx,view);
        }}) 
    },
    openFormWindow: function(title,record,grid){
        var view = grid.up('griduser')?grid.up('griduser'):grid;
        
            var newView = Ext.widget('usuarioformview',{
                profile: view.profile,
                rights: view.rights,
                record: record,
                hideTipo: view.hideTipo,
                storeSearch:view.mystore,
                caller:view,
                isControlAcceso: view.isControlAcceso
                }
            );
            // Lo agregamos al panel
            var myWindow = Ext.widget('window',{
                title: title,
                closable: false,
                height: 350,
                translate: false,
                width: 400,
                modal: true, 
                items: newView,
                layout: 'fit'
            }).show();
        
    },
    
    onObjectEdit: function(record,view){
        this.openFormWindow(record.get('usu_cnombre'),record,view);
    }
});