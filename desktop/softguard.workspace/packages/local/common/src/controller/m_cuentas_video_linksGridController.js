//MIGRADO2024
Ext.define('Common.controller.m_cuentas_video_linksGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['m_cuentas_video_linksSearchModel', 'm_cuentas_video_linksModel', 'm_cuentas_videoSearchModel'],
    views: ['m_cuentas_video_linksGridView'],
    init: function (config) {
        // genero los eventos
        this.control(
            {
                'videolinksgridview': {
                    afterrender: this.initView,
                    itemdblclick: this.onItemClick,
                    objectedit: this.onObjectEdit,
                    objectchanged: this.objectChanged
                },
                'videolinksgridview button[action=search]': {
                    click: this.onSearchClick
                },
                'videolinksgridview button[action=getall]': {
                    click: this.onGetAllClick
                },
                'videolinksgridview button[action=add]': {
                    click: this.onAdd
                },
                'videolinksgridview button[action="delete"]': {
                    click: this.onDeleteClick
                }
            });
    },
    initView: function (view) {
        view.cuenta = view.record;
        if (view.all) {
            view.filters = [];
            view.columns[1].setVisible(true);
            //view.columns[5].setVisible(true);
            //console.log(view.down('#fieldName').getStore())
            view.down('#fieldName').getStore().insert(0, {
                field1: 'cue_ncuenta',
                field2: getLocale('Cuenta')
            })
            view.down('#fieldName').getStore().insert(0, {
                field1: 'cue_clinea',
                field2: getLocale('Dealer')
            })
            view.down('#fieldName').getStore().insert(0, {
                field1: 'codigoCuenta',
                field2: getLocale('Dealer-Cuenta')
            })
            view.down('#fieldName').getStore().insert(0, {
                field1: 'cue_cnombre',
                field2: getLocale('Nombre cuenta')
            })
        } else {
            view.filters = [
                {
                    property: 'cvl_iidcuenta',
                    value: view.record.get('cue_iid')
                }
            ];
        }

        if (view.hideControls) {
            Ext.Array.each(view.hideControls, function (query) {
                var control = view.down(query);

                if (control)
                    control.hide();
            })
        }
        var storeVideo = Ext.create('Ext.data.Store', {
            model: this.getM_cuentas_video_linksSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(storeVideo);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(storeVideo);

        storeVideo.load();

        view.profile = view.module.profile ? view.module.profile : view.module.get('profile');
        if (view.profile < 2) {

            view.down('#addvideo').hide()
            if (view.down('#deletevideolink')) {
                view.down('#deletevideolink').hide()
            }

        }
    },

    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },

    onAdd: function (grid, record, item, index, e, options) {
        var controller = this;
        var id = 0;
        var view = grid.up('videolinksgridview');
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = 'Nuevo Video';
        record = this.getM_cuentas_video_linksModelModel();
        var myobject = record.create({
            cvl_iidcuenta: view.record.get('cue_iid'),
            cvl_ivideoid: view.recordVideoAccount.get('cuv_ivideoid'),
            cvl_clink: view.recordVideoAccount.get('cuv_clink'),
            cvl_clinkdss: view.recordVideoAccount.get('cuv_clinkdss'),
        });

        var codZonas = '';
        view.store.data.items.forEach(element => {
            codZonas = codZonas + element.data.zon_ccodigo + ","
        })

        if (codZonas) {
            codZonas = codZonas.slice(0, -1);
        }

        var alarmas = null;
        if (view.up('videoxcuentapanelview')) {
            alarmas = view.up('videoxcuentapanelview').down('cuentavideoformview').down('#eventoshide').getValue();

            var view = Ext.widget('videoxcuentaformview', {
                caller: view,
                record: myobject,
                cuenta: view.cuenta,
                alarmas: alarmas,
                codZonas: codZonas,
                objectId: id,
                recordVideoAccount: view.recordVideoAccount
            });

            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout: 'fit',
                title: title,
                width: 450,
                height: 500,
                border: false,
                items: view
            });
            win.show();

        } else {
            var storeCuentaVideo = Ext.create('Ext.data.Store', {
                model: controller.getM_cuentas_videoSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property: 'cue_iid',
                    value: view.record.get('cue_iid')
                }]
            }).load({
                callback: function (r) {
                    var view = Ext.widget('videoxcuentaformview', {
                        caller: view,
                        record: myobject,
                        cuenta: record,
                        alarmas: r[0].get('cuv_meventos').split(','),
                        objectId: id,
                        recordVideoAccount: view.recordVideoAccount
                    });

                    var win = Ext.create('Ext.Window', {
                        iconCls: 'icon-table-add',
                        layout: 'fit',
                        title: title,
                        width: 450,
                        height: 500,
                        border: false,
                        items: view
                    });
                    win.show();

                }
            })
        }

    },
    onItemClick: function (grid, record, item, index, e, options) {
        var view = grid.up('videolinksgridview');
        var id = record.get('Id');
        var controller = this;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = getLocale('Video');
        // me fijo si tengo derechos de edicion
        if (view.module.profile == 1) {
            notifyError('No posee derechos para la operación.');
            return false;
        }

        var alarmas = null;

        if (view.up('videoxcuentapanelview')) {
            alarmas = view.up('videoxcuentapanelview').down('cuentavideoformview').down('#eventoshide').getValue();

            var view = Ext.widget('videoxcuentaformview', {
                caller: view,
                record: record,
                objectId: id,
                cuenta: view.cuenta,
                alarmas: alarmas
            });

            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout: 'fit',
                title: title,
                translate: false,
                width: 450,
                height: 500,
                border: false,
                items: view
            });
            win.show();
        } else {
            var storeCuentaVideo = Ext.create('Ext.data.Store', {
                model: controller.getM_cuentas_videoSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property: 'cue_iid',
                    value: record.get('cue_iid')
                }]
            }).load({
                callback: function (r) {
                    var items = Ext.widget('videoxcuentaformview', {
                        caller: view,
                        record: record,
                        objectId: id,
                        cuenta: record,
                        alarmas: r[0].get('cuv_meventos').split(','),
                    });

                    var win = Ext.create('Ext.Window', {
                        iconCls: 'icon-table-add',
                        layout: 'fit',
                        title: title,
                        translate: false,
                        width: 450,
                        height: 500,
                        border: false,
                        items: items
                    });
                    win.show();
                }
            })
        }
    },

    onObjectEdit: function (record, view) {
        this.onItemClick(view, record);
    },
    onGetAllClick: function (button, event, options) {
        var view = button.up('videolinksgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        store.load();

    },

    onSearchClick: function (button, event, options) {
        var view = button.up('videolinksgridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        store.clearFilter(true);
        var filters = Ext.clone(view.filters);


        if (fieldName != '') {
            if (fieldName == 'codigoCuenta') {
                var values = query.split('-');

                filters.push({
                    property: 'cue_clinea',
                    value: values[0]
                });

                filters.push({
                    property: 'cue_ncuenta',
                    value: values[1]
                });

            } else {
                filters.push({
                    property: fieldName + ':LIKE',
                    value: query
                });
            }

        }

        if (filters.length > 0) {
            store.filter(filters);
        }
        else {
            store.clearFilter();
        }


    },

    onDeleteClick: function (button, event, options) {
        var view = button.up('videolinksgridview');
        var selection = view.getSelectionModel().getSelection();
    
        if (selection && selection.length > 0) {
            var model = this.getM_cuentas_video_linksModelModel();
    
            Ext.Array.each(selection, function (rec) {
                
                var tempRecord = Ext.create(model.getName(), rec.getData());
                tempRecord.getProxy().setUrl(model.getProxy().getUrl()); 
    
                // Realizar la eliminación
                tempRecord.erase({
                    callback: function (record, operation) {
                        if (operation.success) {
                            notify('Se eliminó exitosamente');
                        } else {
                            notify('No se puede eliminar el registro, está siendo utilizado en el sistema.');
                        }
                        view.store.load(); 
                    }
                });
            }, this);
        } else {
            notify('No hay elementos seleccionados para eliminar.');
        }
    }
});