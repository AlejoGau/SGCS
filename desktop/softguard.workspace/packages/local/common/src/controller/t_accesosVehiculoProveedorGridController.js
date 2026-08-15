Ext.define('Common.controller.t_accesosVehiculoProveedorGridController', {
    extend: 'Ext.app.Controller',
    //stores: ['SoftguardUsuarioTipoStore'],
    models: ['t_AccesosVehiculoProveedorModel','Common.model.t_AccesosVehiculoProveedorSearchModel'],
    views: ['t_accesosVehiculoProveedorGridView'],
    init: function (config) {
        // genero los eventos
        this.control({
            't_accesosvehiculoproveedorgridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                refresh: this.refresh
            },
            't_accesosvehiculoproveedorgridview button[action=search]': {
                click: this.onSearchClick
            },
            't_accesosvehiculoproveedorgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_accesosvehiculoproveedorgridview button[action=add]': {
                click: this.onAdd
            }/*,
            't_accesosvehiculoproveedorgridview button[action="delete"]': {
                click: this.onDeleteClick
            }*/
        });
    },
    initView: function (view) {
        console.log('Init view de proveedores grid controller');
        view.filters = [];
        var _store = Ext.create('Ext.data.Store', {
            model: this.getT_AccesosVehiculoProveedorSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        _store.load();
        view.bindStore(_store);
    },
    refresh: function (view) {
        view.getStore().load()
    },
    onAdd: function (grid, record, item, index, e, options) {
        console.log('OnAdd en grid controller');
        var view = grid.up('t_accesosvehiculoproveedorgridview'); // Add conditional when call from m_usuariosFormController on saveEvent.
        var myobject = Ext.create('Common.model.t_AccesosVehiculoProveedorModel', {
            
        });
        myobject.setId(0);
        var viewWidget = Ext.widget('t_accesosvehiculoproveedorformview', {
            caller: view,
            record: myobject,
        });
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            //layout: 'fit',
            title: 'Vehículo',
            with: 600,
            height: 650,   
            resizable: false,         
            //width: 450,
            border: true,
            items: viewWidget
        });
        win.show();
    },
    // Double click event, to show user information.
    onItemClick: function (grid, record, item, index, e, options) {
        var view = grid.up('t_accesosvehiculoproveedorgridview') ? grid.up('t_accesosvehiculoproveedorgridview') : grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var vProvModel = this.getT_AccesosVehiculoProveedorModelModel();
        var titleV = record.get('Brand')+' - '+record.get('Model');
        vProvModel.load(record.get('Id'),{
            success: function(record){
                var tabUser = Ext.widget('t_accesosvehiculoproveedorformview', {
                    caller: view,
                    //closable: true,
                    title:titleV,
                    //iconCls:'icon-email-edit',
                    record: record,
                });
        
                var win = Ext.create('Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout: 'fit',
                    title: titleV,
                    translate: false,
                    width: 800,
                    height: 650,
                    border: false,
                    modal: true,
                    items: tabUser            
                });
                win.show();
            }
        });

        var title = getLocale('Ficha') + ': ' + record.get('apr_cNombre');
        
        
    },
    onObjectEdit: function (record, view) {
        this.onItemClick(view, record);
    },
    onGetAllClick: function (button, event, options) {
        var view = button.up('t_accesosvehiculoproveedorgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#brand').setValue('');
        view.down('#model').setValue('');
        store.load();
    },
    onSearchClick: function (button, event, options) {
        var view = button.up('t_accesosvehiculoproveedorgridview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);
        store.clearFilter(true);
        if (view.down('#brand').getValue()) {
            filters.push({
                property: 'vb.[NAME]:LIKE',
                value: view.down('#brand').getValue()
            });
        }
        if (view.down('#model').getValue()) {
            filters.push({
                property: 'vm.[NAME]:LIKE',
                value: view.down('#model').getValue()
            });
        }

        view.down('#brand').setValue('')
        view.down('#model').setValue('')
        store.filter(filters);
        store.load();
    },
    onDeleteClick: function (button, event, options) {
        var view = button.up('t_accesosvehiculoproveedorgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getM_usuariosSearchModelModel();
                rec.setConfig({
                    proxy: model.getProxy()
                });
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