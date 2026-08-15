Ext.define('AccessControl.controller.m_accessControlProveedoresGridController', {
    extend: 'Ext.app.Controller',
    //stores: ['SoftguardUsuarioTipoStore'],
    models: ['m_ProveedorSearchModel','m_AccesosProveedoresModel'],
    views: ['m_accessControlProveedoresGridView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'm_accesscontrolproveedoresgridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                refresh: this.refresh
            },
            'm_accesscontrolproveedoresgridview button[action=search]': {
                click: this.onSearchClick
            },
            'm_accesscontrolproveedoresgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'm_accesscontrolproveedoresgridview button[action=add]': {
                click: this.onAdd
            }/*,
            'm_accesscontrolproveedoresgridview button[action="delete"]': {
                click: this.onDeleteClick
            }*/
        });
    },

    initView: function (view) {
        console.log('Init view de proveedores grid controller');
        view.filters = [];
        var controller = this;

        // Filers from first tab on App ( Bienvenido )
        if ( view.filterFromSearchContainer ){
            view.down('#editar').hide();
            Ext.each(view.filterFromSearchContainer, function(filter) {
                view.filters.push(filter);
            })

            // Change UI from (Bienvenido)
            /*view.down('#add').setText(view.newButtonLabel);
            view.down('#filtersInvitedUsersButton').hide();
            view.down('#searchInvitedUsersButton').hide();
            view.down('#getallInvitedUsersButton').hide();*/
        }
        


        var _store = Ext.create('Ext.data.Store', {
            model: this.getM_ProveedorSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(_store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(_store);
        var categoriaProveedores = Ext.data.StoreManager.lookup('TablaAccesosCategoriaProveedorStore'); 
        categoriaProveedores.load();
        view.down('#categoria').bindStore(categoriaProveedores);
 
        _store.load({
            callback: function(records, operation, success) {
                // the operation object
                // contains all of the details of the load operation
                console.log('Cantidad de proveedores encontrados: '+records.length);
                if(records.length==0){
                    if(view.filterFromSearchContainer){
                        // Filers from first tab on App ( Bienvenido )
                        if ( view.filterFromSearchContainer ){
                            //disparo custom event definido en el llamado del widget en AC_controlIOFormController
                            view.fireEvent('showHideLeftPanel','PERSONA');
                        }                         


                    }
                    
                }else{
                    view.fireEvent('showHideLeftPanel','PROVEEDOR');                    
                    if(records.length==1){
                        controller.onItemClick(view, records[0]);
                    }
                }
            }
        });

        var storeSecurity = SecurityModulesStore;
        var recordAccessControl = storeSecurity.findRecord('KeyReference', 'SgAppAccessControl');
        console.log('storeSecurity: '+storeSecurity);
        if (recordAccessControl && recordAccessControl.get('Available') == true) {
            var _security = recordAccessControl.get('_Security');
            if (_security && _security.hasOwnProperty('rights') && _security.rights.nuevoProveedor != true) {
                view.down('#add').hide()
            }
        }

        if(view.up('ac_controlioformview')){
            view.down('toolbar').hide();
        }
    },

    refresh: function (view) {
        view.getStore().load()
    },

    onAdd: function (grid, record, item, index, e, options) {
        console.log('OnAdd en grid controller');
        var view = grid.up('m_accesscontrolproveedoresgridview'); // Add conditional when call from m_usuariosFormController on saveEvent.
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = getLocale('Proveedor'); //view.filterFromSearchContainer ? view.newButtonLabel : 'Nuevo usuario';

        var myobject = Ext.create('AccessControl.model.m_AccesosProveedoresModel', {
            
        });
        myobject.setId(0);

        var viewWidget = Ext.widget('m_accesscontrolproveedoresformview', {
            caller: view,
            record: myobject,
            hideTipoUsuario: true,

            resizable: false,
            openFromAC: true,
            openAutomaticallyCreatedUser: view.filterFromSearchContainer ? true : false
        });

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            //layout: 'fit',
            title: title,
            with: 600,
            height: 550,   
            resizable: false,         
            //width: 450,
            border: true,
            items: viewWidget
        });
        win.show();
    }, 

    // Double click event, to show user information.
    onItemClick: function (grid, record, item, index, e, options) {
        var view = grid.up('m_accesscontrolproveedoresgridview') ? grid.up('m_accesscontrolproveedoresgridview') : grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var provModel = this.getM_AccesosProveedoresModelModel();
        provModel.load(record.get('Id'),{
            success: function(provRecord){
                var tabaProv

                if(view.filterFromSearchContainer){
                    //var tabPanel = view.up('tabpanel');

                    //var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
                    var title = getLocale('Ficha') + ': ' + record.get('apr_cNombre');
                    
                    //var tabAccProv = tabPanel.down('[title=Autorizaciones dfgdfgproveedores]');

                    
                    //if(!tabAccProv){
                        var tabAccProvNew = Ext.widget('ac_accesoproveedorview', {
                            caller: view,
                            closable:false,
                            closeAction: 'destroy',
                            record: record,
                            //title: title,
                            //iconCls:'icon-email-edit'
                        });
                        var win = Ext.create('Ext.Window', {
                            iconCls: 'icon-table-add',
                            layout: 'fit',
                            title: title,
                            translate: false,
                            width: 1280,
                            height: 650,
                            border: false,
                            modal: true,
                            items: tabAccProvNew           
                        });
                        win.show();
    
                        //tabPanel.add(tabAccProvNew);
                        //tabPanel.setActiveTab(tabAccProvNew);
                    //}else{
                                  
                    //    tabPanel.setActiveTab(tabAccProv);
                    //}
                }else{
                    var tabProv = Ext.widget('ac_accesscontrolproveedorformview', {
                        caller: view,
                        closable: false,
                        title:title,
                        iconCls:'icon-email-edit',
                        record: provRecord,
                        openFromAC: false,
                        filterFromSearchContainer: view.filterFromSearchContainer ? view.filterFromSearchContainer : false
                    });
                    var win = Ext.create('Ext.Window', {
                        iconCls: 'icon-table-add',
                        layout: 'fit',
                        title: title,
                        translate: false,
                        width: 800,
                        height: 650,
                        border: false,
                        modal: true,
                        items: tabProv            
                    });
                    win.show();
    
                }
        
            }
        });


        var title = getLocale('Ficha') + ': ' + record.get('apr_cNombre');
        
        
       /*var tabPanel = view.up('tabpanel');
       console.log('Tabpanel: '+tabPanel);
       tabPanel.add(tabUser);
       */
    },

    onObjectEdit: function (record, view) {
        this.onItemClick(view, record);
    },

    onGetAllClick: function (button, event, options) {
        var view = button.up('m_accesscontrolproveedoresgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#categoria').setValue('');
        view.down('#identificacion').setValue('');
        view.down('#nombre').setValue('');
        view.down('#apr_iStatus').setValue('');
        store.load();
    },

    onSearchClick: function (button, event, options) {
        var view = button.up('m_accesscontrolproveedoresgridview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);
        store.clearFilter(true);

        if (view.down('#nombre').getValue()) {
            filters.push({
                property: 'apr_cNombre:LIKE',
                value: view.down('#nombre').getValue()
            });

        }
        if (view.down('#identificacion').getValue()) {
            filters.push({
                property: 'apr_cIdentificacion:LIKE',
                value: view.down('#identificacion').getValue()
            });

        }
        if (view.down('#apr_iStatus').getValue()) {
            filters.push({
                property: 'apr_iStatus',
                value: view.down('#apr_iStatus').getValue()
            });

        }

        if (view.down('#categoria').getValue()) {
            filters.push({
                property: 'apr_iCategoria',
                value: view.down('#categoria').getValue()
            });

        }

        view.down('#nombre').setValue('')
        view.down('#identificacion').setValue('')
        store.filter(filters);
        store.load();
    },

    onDeleteClick: function (button, event, options) {
        var view = button.up('m_accesscontrolproveedoresgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getM_usuariosSearchModelModel();
                rec.setProxy(model.getProxy());
                rec.destroy({
                    callback: function (record, operation) {
                        if (operation.success) {
                            notify('Se eliminio exitosamente');

                        } else {
                            notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                        }
                        view.store.load();
                    }
                })
            }, this);
        }
    },

});