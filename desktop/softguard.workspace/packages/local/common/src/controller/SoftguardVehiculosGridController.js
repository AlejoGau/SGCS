var t = this;

Ext.define('Common.controller.SoftguardUsuarioGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.SoftguardUsuarioStore', 'Common.store.SoftguardUsuarioTipoStore' ],
    models : [ 'Common.model.m_usuariosModel','Common.model.AC_UsuarioSearchModel' , 'SoftguardCuentaModel', 'Common.model.SoftguardUsuarioModel' ],
	views : [ 'SoftguardVehiculosGridView' ],
    

    init: function (config) {
        var me=this;
        // genero los eventos

        this.control({
            'gridvehicle button[action=delete]': {
                click: this.onDeleteClick
            },
            'gridvehicle button[action=add]': {
                click: this.onAddClick
            },
            'gridvehicle button[action=save]': {
                click: this.onSaveClick
            },
            'gridvehicle button[action=verusuariosmadre]': {
                click: this.onVerUsuariosMadreClick
            },
            'gridvehicle button[action=refresh]': {
                click: this.onRefreshClick
            },
            'gridvehicle button[action=copyusers]': {
                click: this.onCopyUsersClick
            },
            "gridvehicle button[action=search]": {
                click: this.onFilterClick,
            },
            "gridvehicle button[action=searchTodos]": {
                click: this.onFilterTodosClick,
            },
            
            'flotagpsview' : {
                vehicleSelected: this.onVehicleSelected
            },
            'gridvehicle':{
                afterrender: this.loadData,
                recordchanged: this.loadData,
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                refresh: this.onRefresh,
                cuentachanged : this.onCuentaSelected,
                controlacceso: this.onControlAcceso
            }
        });
    }, // cierro init

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
    onFilterTodosClick: function(button, view) {
        var view = button.up('gridvehicle');
        if (view && view.store) {
            var store = view.store;
            store.clearFilter(true)
            this.loadData(view) 
            view.down('#nombre').setRawValue('');
            view.down('#matricula').setRawValue('');
        }

    },
    onFilterClick: function(button, view) {
        var view = button.up('gridvehicle');
        if (view && view.store) {
            var store = view.store;
            store.clearFilter(true)
            var filters = Ext.clone(view.filters || []);
            filters.push({
                property:"usu_iidcuenta",
                value: view.record.get('cue_iid')
                
            })
            if (view.down('#nombre')) {
                filters.push({
                    property: "usu_cnombre:LIKE",
                    value: view.down('#nombre').getValue(),
                });
                
            }
            if (view.down('#matricula')) {
                filters.push({
                    property: "dominio:LIKE",
                    value: view.down('#matricula').getValue(),
                });
                
            }
            store.filter(filters);
        } else {
            console.error('No se encontró el store en la vista');
        }
    },
    
    onCopyUsersClick: function(button,event,options){
         var view = button.up('griduser');
         var hidebuttons = [];

         if(this.application._nameModule  == 'VigiControl' || this.application._nameModule  == 'TrackGuard') {
             hidebuttons.push('#fallotst')
             hidebuttons.push('#particiones')
         }
         
         //var soloVehiculo = false;
         var filterTipo = '';
         if(this.application._nameModule  == 'TrackGuard') {
             //soloVehiculo = true;
             filterTipo = 'nofilter';
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
                    filterTipo: filterTipo
                    //soloVehiculo: soloVehiculo
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
                }/*,
                { 
                    text: 'No',
                    handler: function() {
                        controller.contactoscopiar(cuenta, view, controller,0);
                        dialog.close();
                    } 
                }*/,
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
            msg: getLocale('Desea reemplazar los usuarios existentes?'),
            icon: Ext.Msg.QUESTION
        });
    },

    contactoscopiar: function(cuenta, view, controller, eliminar){
        var record = view.record;
        var cuentaOrigen = cuenta.get('cue_iid');
        var cuentaDestino = record.get('cue_iid');

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
        view.mystore.load(
                //{ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore}
            );
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
        var model = controller.getAC_UsuarioSearchModelModel();
        //view.profile = profile;

        var _store = Ext.create('Ext.data.Store', {
            model: model,
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'usu_iidcuenta',
                value: record.get('cue_iid')
            }]
        })
        view.mystore = _store;
        view.bindStore(_store);
        _store.load();
    },
    
    onRefreshClick: function (button,event,options) {
         var view = button.up('gridvehicle');
         view.mystore.load({ObjectId:view._ObjectId,view:view,store:view.mystore,callback: this.doBindStore});
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            operation.view.bindStore(operation.store);
        }
    },

    onVerUsuariosMadreClick: function(button,event,options){
        var view = button.up('gridvehicle');
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
            view.store.remove(selection);
        }
        view.store.clearFilter()
        
    },

    onAddClick: function(button,event,options){
        var view = button.up('gridvehicle');
        var myobject = Ext.create('Common.model.m_usuariosModel', {
            usu_ntipo: 7,
            usu_iidcuenta: view.record.get('cue_iid')
        });
        myobject.setId(0);

        var tabUser = Ext.widget('m_usuariosformview', {
            caller: view,
            //closable: true,
            //title:title,
            //iconCls:'icon-email-edit',
            record: myobject,
            openFromAC: true,
            filterFromSearchContainer: view.filterFromSearchContainer ? view.filterFromSearchContainer : false
        });

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Alta de vehículo',
            translate: false,
            width: 800,
            height: 650,
            border: false,
            modal: true,
            items: tabUser            
        });
        win.show();

    },

    onSaveClick: function (button,event,options) {
        var view = button.up('griduser');
        var store = view.store;

        store.sync();
        notify(getLocale('Los cambios se guardaron con éxito'));
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        var controller = this;
        this.getM_usuariosModelModel().load(record.get('Id'), {callback:function (recordx) {
            controller.openFormWindow('Edición: '+record.get('usu_cnombre'),recordx,view);
        }})
        
    },

    openFormWindow: function(title,record,grid){
        var view = grid.up('gridvehicle');


        var tabUser = Ext.widget('m_usuariosformview', {
            caller: view,
            //closable: true,
            title:title,
            //iconCls:'icon-email-edit',
            record: record,
            openFromAC: true,
            filterFromSearchContainer: view.filterFromSearchContainer ? view.filterFromSearchContainer : false
        });
        //usu_icodigo usu_cnombre
        tabUser.down('#usu_icodigo').setReadOnly(true);
        tabUser.down('#usu_cnombre').setReadOnly(true);
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            translate: false,
            width: 800,
            height: 650,
            border: false,
            modal: true,
            items: tabUser            
        });
        win.show();
        
    },
    
    onObjectEdit: function(record,view){
        this.openFormWindow('Edición - '+record.get('usu_cnombre'),record,view);
    }
});




