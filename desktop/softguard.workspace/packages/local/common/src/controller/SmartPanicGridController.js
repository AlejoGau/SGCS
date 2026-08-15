//MIGRADO2024
Ext.define('Common.controller.SmartPanicGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SPCuentaSeguimientoModel', 'CuentaSearchModel', 'TelefonoSearchModel', 'SoftguardTelefonoModel', 'SoftguardUsuarioModel', 'KeyModulesModel', 'SmartPanicAsignarCuentaModel', 'SmartPanicSearchModel', 'SmartPanicModel', 'SoftguardCuentaModel'],
    views: ['SmartPanicGridView'],
    init: function (config) {
        // genero los eventos
        this.control(
            {
                'smartpanicgridview': {
                    afterrender: this.initView,
                    objectedit: this.onObjectEdit,
                    cuentachanged: this.onCuentaChanged,
                    cuentanew: this.onCuentaNew,
                    mostrarEventos: this.onMostrarEventos,
                    smartpanicchange: this.onSmartPanicChange,
                    itemdblclick: this.onItemClick,
                    selectionchange: this.onSelectionChange,
                    enviaMensaje: this.onEnviarMensaje,
                    mostrarMensajesSP: this.onMostrarMensajesSP,
                    enviarLog: this.enviarLog
                },
                'smartpanicpendinggridview': {
                    smartpanicchange: this.onSmartPanicChange
                },
                'smartpanicgridview button[action=search]': {
                    click: this.onSearchClick
                },
                'smartpanicgridview button[action=getall]': {
                    click: this.onGetAllClick
                },
                'smartpanicgridview button[action=sacarcuenta]': {
                    click: this.onSacarCuentaClick
                },
                'smartpanicgridview button[action=groupCuenta]': {
                    click: this.onGroupCuentaClick
                },
                'smartpanicgridview button[action=groupDealer]': {
                    click: this.onGroupDealerClick
                },
                'smartpanicgridview button[action=nuevo]': {
                    click: this.onNewClick
                },
                'smartpanicgridview button[action=sinasignar]': {
                    click: this.onSinAsignarClick
                },
                'smartpanicgridview #enviarmensaje': {
                    click: this.onEnviarMensajeClick
                },
                'smartpanicgridview #fallodetesteo': {
                    click: this.onFalloDeTesteoClick
                },
                'smartpanicgridview #bluetooth': {
                    click: this.onBluetoothClick
                },
                'smartpanicgridview #dispositivos-todos': {
                    click: this.onDispositivosTodosClick
                },
                'smartpanicgridview #dispositivos-seleccionados': {
                    click: this.onDispositivosSeleccionadosClick
                },
                'smartpanicgridview #dispositivos-filtro': {
                    click: this.onDispositivosFiltroClick
                },
                'smartpanicgridview #dispersoSmartPanic': {
                    click: this.onSubfixFiltroClick
                },
                'smartpanicgridview #viejasSmartPanic': {
                    click: this.onSubfixFiltroClick
                },
                'smartpanicgridview #actualesSmartPanic': {
                    click: this.onSubfixFiltroClick
                },
            });
    },
    onSubfixFiltroClick: function (btn) {
        var view = btn.up('smartpanicgridview')
        this.onSearchClick(btn)
        this.armoUrlGeoJson(view)
    },
    onDispositivosTodosClick: function (btn) {
        var view = btn.up('smartpanicgridview')
        view.down('#toolbarfiltro').setDisabled(true);
        view.filtroDispositivos = 'todos'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
    },
    onDispositivosSeleccionadosClick: function (btn) {
        var view = btn.up('smartpanicgridview')
        view.down('#toolbarfiltro').setDisabled(false);
        view.filtroDispositivos = 'seleccionados'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
    },
    onDispositivosFiltroClick: function (btn) {
        var view = btn.up('smartpanicgridview')
        view.down('#toolbarfiltro').setDisabled(false);
        view.filtroDispositivos = 'filtro'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
    },


    onMostrarMensajesSP: function (rec, view) {
        var id = rec.get('CuentaId');
        var spId = rec.get('Id');
        var model = this.getSoftguardCuentaModelModel();
        var panel = view.up('#center');
        model.load(id, {
            callback: function (recordCuenta) {
                var title = getLocale("Mensajes recibidos");
                // me fijo si el tab existe, si es nuevo lo creo
                var mytab = panel.down('[title="' + title + '"]');
                if (!mytab) {
                    var newTab = Ext.widget('ppushqueuespview', {
                        tabConfig: { translate: false },
                        spId: spId,
                        title: title,
                        translate: false,
                        record: recordCuenta,
                        closable: true,
                        closeAction: 'destroy',
                    });
                    panel.add(newTab);
                    panel.setActiveTab(newTab);
                }
                // el existe, lo activo
                else {
                    mytab.show();
                }
            }
        });
    },


    onFalloDeTesteoClick: function (btn) {
        var view = btn.up('smartpanicgridview')
        this.onSearchClick(btn)
    },
    onBluetoothClick: function (btn) {
        var view = btn.up('smartpanicgridview')
        console.log("btn", btn)
        this.onSearchClick(btn)
    },

    onEnviarMensaje: function (rec, view) {
        var spform = Ext.widget('spinboxgridview', {
            caller: view,
            cuenta: rec
        });
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: getLocale('Mensajes del dispositivo') + ' ' + rec.get('Nombre'),
            translate: false,
            closeAction: 'destroy',
            width: 600,
            height: 550,
            border: true,
            modal: true,
            view: view,
            items: [spform]
        });
        win.show();
    },

    onEnviarMensajeClick: function (btn) {
        var view = btn.up('smartpanicgridview')
        var spform = Ext.widget('spinboxgridview', {
            caller: view
        });
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: getLocale('Mensajes del dispositivo'),
            translate: false,
            closeAction: 'destroy',
            width: 450,
            height: 550,
            border: true,
            modal: true,
            view: view,
            items: [spform]
        });
        win.show();
    },
    initView: function (view) {
        view.licenseViolation = false;
        var controller = this;
        var isAdmin = view.isAdmin;
        var storeKeyModule = KeyModulesStore;//Ext.StoreManager.get( 'KeyModulesStore' );
        //var SecurityModulesStore = SecurityModulesStore;//Ext.StoreManager.get('SecurityModulesStore');
        var administratorModule = SecurityModulesStore.findRecord('KeyReference', 'Administrator');
        var isAdmin = administratorModule ? administratorModule.get('Available') : false;
        view.groupingFeature = view.getView().getFeature('grouping');
        if (!isAdmin && !SecurityModulesStore.isModuleAvailable('SmartPanics') && controller.application._nameModule == 'AWCC') {
            view.profile = view.module.get('profile')
            if (view.profile < 2) {
                view.down('#sacarcuenta').hide()
                view.down('#nuevo').hide()
                view.filters = [{
                    property: 'CuentaId',
                    value: view.record.get('cue_iid')
                }];
                var store = Ext.create('Ext.data.Store', {
                    model: controller.getSmartPanicSearchModelModel(),
                    pageSize: 50,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: view.filters,

                })
                view.bindStore(store);
                var toolbar = view.down('pagingtoolbar');
                toolbar.bindStore(store);
                store.load();
                view.CONFIGURAR = false;
            }
        } else if (!isAdmin && !SecurityModulesStore.isModuleAvailable('SmartPanics') && controller.application._nameModule != 'SgAppMapGuardWeb') {
            notify('No tiene permisos para acceder a este modulo.')
            if (view.up('tab')) {
                view.up('tab').hide();
            } else {
                view.hide();
            }
        } else {
            if (view.preventHeader) {
                view.down('#sacarcuenta').hide()
                view.down('#nuevo').hide()
            }
            if (!isAdmin && view.down('#toolbardisplayfield'))
                view.down('#toolbardisplayfield').hide();
            if (view.record) {
                view.filters = [{
                    property: 'CuentaId',
                    value: view.record.get('cue_iid')
                }];
                //view.down('#btnconfig').hide()
            } else {
                view.filters = [{
                    property: 'cue_ncuenta:NOT',
                    value: ''
                }];
            }
            if (!view.pageSize) {
                view.pageSize = 50;
            }
            var store = Ext.create('Ext.data.Store', {
                model: controller.getSmartPanicSearchModelModel(),
                //groupField: 'cue_clinea',
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: view.filters,
                sorters: [
                    {
                        property: 'cue_clinea',
                        direction: 'DESC'
                    }
                ]
            })
            //view.bindStore( store );
            view.reconfigure(store);
            var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(store);
            var module = storeKeyModule.getModuleAvailable('SmartPanics');
            if (module) {
                view.QtyUsers = module.get('QuantityOfUsers');
                controller.tieneUsuariosDisponibles(view);
            }
            if (isAdmin) {
                controller.aplicasPermisos({
                    alta: 'true',
                    asignardesasignar: 'true',
                    configurar: 'true',
                    seguimiento: 'true'
                }, view)
            } else {
                // usar modules!!!!!???
                var url = '/Rest/Security/Modules/' + controller.application.getModuleIdByName('SmartPanics') + '/Security';
                Ext.Ajax.request({
                    url: url,
                    method: 'GET',
                    success: function (resp, operation) {
                        var json = resp.responseText ? JSON.parse(resp.responseText) : null;
                        if (json) {
                            controller.aplicasPermisos(json, view)
                        }
                    }
                })
            }
            store.load();
        }
        if (view.sacarcuentaHide) {
            view.down('#sacarcuenta').hide()
        }
        if (view.nuevoHide) {
            view.down('#nuevo').hide()
        }
        //inico con el boton de selccionados
        view.filtroDispositivos = 'seleccionados'
        if (view.GMAPPANEL) {
            console.log('Inicia task smartpanics')
            view.task = Ext.TaskManager.start({
                args: [view],
                run: this.armoUrlGeoJson,
                scope: controller,
                interval: 5000
            });
        }
    },

    aplicasPermisos: function (json, view) {
        var tabpanel = view.up('tabpanel');
        if (json.alta && json.alta == 'true') {
            view.down('#nuevo').show()
        }
        if (json.asignardesasignar && json.asignardesasignar == 'true') {
            view.down('#sacarcuenta').show()
        }
        if (json.configurar && json.configurar == 'true') {
            view.CONFIGURAR = true
        }
        if (json.seguimiento != 'true') {
            tabpanel.remove(tabpanel.down('#seguimiento'))
        }
        if (json.ocultaractivos == 'true') {
            tabpanel.remove(tabpanel.down('#activos'))
        }
        if (json.ocultarsinasignar == 'true') {
            tabpanel.remove(tabpanel.down('#sinasignar'))
        }
        if (json.ocultarformularios == 'true') {
            tabpanel.remove(tabpanel.down('#formularios'))
        }
    },

    onItemClick: function (view, record, item, index, e, options) {
        var gridview = view.up('smartpanicgridview');
        if (!gridview) {
            gridview = view;
        }
        if (gridview.noEditDblClick) {
            return false;
        }
        if (gridview.CONFIGURAR == true) {
            var spform = Ext.widget('smartpanicformview', {
                caller: gridview,
                record: record,
                metodo: 'edit',
                tipoForm: 'dealer'
            });
        } else {
            var spform = Ext.widget('smartpanicformview', {
                caller: gridview,
                // cuenta: cuenta,
                record: record,
                metodo: 'readonly'
            });
        }
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Modificar SmartPanic',
            closeAction: 'destroy',
            itemId: 'cuentaNew',
            width: 1200,
            height: 500,
            border: true,
            modal: true,
            view: gridview,
            items: [spform]
        });
        spform.ajaxRunning = true;
        spform.up('window').on('beforeclose', function (view, eOpts) {
            if (spform.ajaxRunning) {
                notify(getLocale('Existen peticiones pendientes. Aguarde unos segundos e intente de nuevo'));
                return false;
            }
        });
        win.show();
    },
    onSmartPanicChange: function (record, view) {
        var gridview = view.up('viewport').down('smartpanicgridview');
        gridview.down('pagingtoolbar').doRefresh();
        this.tieneUsuariosDisponibles(gridview);
    },
    onSinAsignarClick: function (button, event, options) {
        var view = button.up('smartpanicgridview');
        var store = view.getStore();
        var queryType = view.down('#queryType').getValue();
        var query = view.down('#query').getValue();
        var filters = Ext.clone(view.filters);
        filters.push({
            property: 'cue_ncuenta:NOT',
            value: ''
        });
        filters.push({
            property: 'Imei:ISEMPTY',
            value: ""
        });
        if (queryType == 'telefono')
            filters.push({
                property: 'Telefono:LIKE',
                value: query,
                id: 'search'
            });
        if (queryType == 'nombre')
            filters.push({
                property: 'cue_cnombre:LIKE',
                value: query,
                id: 'search'
            });
        if (queryType == 'usuario')
            filters.push({
                property: 'Nombre:LIKE',
                value: query,
                id: 'search'
            });
        if (queryType == 'cuenta')
            filters = [{
                property: 'cue_ncuenta:LIKE',
                value: query,
                id: 'search'
            }];
        if (queryType == 'dealer')
            filters = [{
                property: 'cue_clinea:LIKE',
                value: query,
                id: 'search'
            }];
        store.clearFilter(true);
        store.filter(filters);
    },

    onNewClick: function (button, event, options) {
        var view = button.up('smartpanicgridview');
        if (view.record) {
            this.onCuentaNew(view.record, view)
        } else {
            this.tieneUsuariosDisponibles(view, function () {
                var win = Ext.create('Ext.Window', {
                    layout: 'fit',
                    title: 'Seleccione una Cuenta',
                    closeAction: 'destroy',
                    itemId: 'cuentaWin',
                    width: 750,
                    height: 550,
                    border: true,
                    modal: true,
                    view: view,
                    items: [
                        {
                            xtype: 'cuentahelperview',
                            caller: view,
                            metodo: 'new'
                        }
                    ]
                });
                win.show();
            });
        }
    },

    onMostrarEventos: function (record, view) {
        if (view.licenseViolation) {
            notifyError('Hay mas dispositivos asociados que los permitidos!')
            return false
        }
        var id = record.get('CuentaId');
        var model = this.getSoftguardCuentaModelModel();
        var panel = view.up('#center');
        model.load(id, {
            callback: function (recordCuenta) {
                var title = recordCuenta.get('cue_clinea') + '-' + recordCuenta.get('cue_ncuenta') + ' - ' + recordCuenta.get('cue_cnombre') + ' (' + record.get('Nombre') + ' ' + getLocale('Eventos') + ')';
                title = title.replace(',', '');
                // me fijo si el tab existe, si es nuevo lo creo
                var mytab = panel.down('[title="' + title + '"]');
                if (!mytab) {
                    var newTab = Ext.widget('cuentarecepcionspview', {
                        tabConfig: { translate: false },
                        title: title,
                        translate: false,
                        record: recordCuenta,
                        closable: true,
                        closeAction: 'destroy',
                        gps_cIMEI: record.get("Imei")
                    });
                    panel.add(newTab);
                    panel.setActiveTab(newTab);
                }
                // el existe, lo activo
                else {
                    mytab.show();
                }
            }
        });
    },

    onGroupCuentaClick: function (button, event, options) {
        var view = button.up('smartpanicgridview');
        var store = view.store;
        store.sorters.clear();
        //store.groupers.clear();
        view.groupingFeature.disable();
        view.groupingFeature.lastGroupers = null;
        view.groupingFeature.block();
        if (button.pressed) {
            store.sorters.clear();
            //store.clearGrouping();
            view.groupingFeature.lastGroupers = null;

            view.getStore().sort([
                {
                    property: '_nombreCuenta',
                    direction: 'DESC'
                }
            ]);
            view.getStore().pageSize = 999;
            view.groupingFeature.block();
            view.groupingFeature.enable();
            store.group('_nombreCuenta');
            view.groupingFeature.pruneGroupedHeader();
            view.groupingFeature.unblock();
            //view.getView().refresh();
            view.getStore().loadPage(1);
            //view.groupingFeature.refreshIf();
        } else {
            view.groupingFeature.disable();
            store.clearGrouping();
            store.sort([{ property: 'cue_clinea', direction: 'ASC' }]);
            view.getStore().pageSize = 50;
            store.loadPage(1);
            //view.getView().refresh();
        }
        view.reconfigure(store);
    },

    onGroupDealerClick: function (button, event, options) {
        var view = button.up('smartpanicgridview');
        var store = view.store;
        if (button.pressed) {
            store.sorters.clear();
            store.sort([{ property: 'cue_clinea', direction: 'ASC' }]);
            //store.clearGrouping();
            view.groupingFeature.lastGroupers = null;
            view.getStore().pageSize = 999;
            view.groupingFeature.block();
            view.groupingFeature.enable();
            store.group({ property: 'cue_clinea', direction: 'ASC' });
            view.groupingFeature.pruneGroupedHeader();
            view.groupingFeature.unblock();
            //view.getView().refresh();
            view.getStore().loadPage(1);
            //view.groupingFeature.refreshIf();
        } else {
            view.groupingFeature.disable();
            store.clearGrouping();
            view.getStore().pageSize = 50;
            store.loadPage(1);
            //view.getView().refresh();
        }
        console.log('GRUPOS DE: ', store.getGroups());
        //view.reconfigure(store);
    },
    onSacarCuentaClick: function (button, event, options) {
        var view = button.up('smartpanicgridview');
        var selection = view.getSelectionModel().getSelection();
        var model = this.getSmartPanicModelModel();
        var t = this;
        Ext.Array.each(selection, function (record, index, arr) {
            model.load(record.get('Id'), {
                callback: function (recToSave) {
                    recToSave.set('CuentaId', 0);
                    recToSave.set('awccUserId', 0);
                    recToSave.save({
                        success: function () {
                            //console.log(index, arr.length-1);
                            if (index == (arr.length - 1)) {
                                view.fireEvent('smartpanicchange', model, view);
                            }
                        }
                    });
                }
            });
            /*record.setConfig({
                proxy: model.getProxy()
            });
            record.set( 'CuentaId', 0 );
            record.set( 'awccUserId', 0 );
            record.save( {
                success: function() {
                    //console.log(index, arr.length-1);
                    if( index == ( arr.length - 1 ) ) {
                        view.fireEvent( 'smartpanicchange', model, view );
                    }
                }
            });
            */
        });
    },

    onObjectEdit: function (record, view) {
        this.tieneUsuariosDisponibles(view, function () {
            this.onItemClick(view, record);
        });
    },
    onGetAllClick: function (button, event, options) {
        var view = button.up('smartpanicgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        //view.down( '#queryType' ).setValue( '' );
        view.down('#query').setValue('');
        view.down('#actualesSmartPanic').toggle(true);
        view.down('#dispersoSmartPanic').toggle(true);
        view.down('#viejasSmartPanic').toggle(true);
        view.down('#bluetooth').toggle(false);
        view.down('#fallodetesteo').toggle(false);
        // this.armoUrlGeoJson(view)
        /*  view.down('#Name').setValue('');
          view.down('#LastName').setValue('');
          view.down('#Email').setValue('');*/
        /*var taxonomytree = view.query('taxonomiesmastertree')[0]; 
        var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
        var taxonomiesArray = [];
        Ext.Array.each(taxonomiesSelected, function (rec) {
            if (rec.get('checked'))
            rec.set('checked', false)
        },this);*/
    },

    onSearchClick: function (button, event, options) {
        const view = button.up('smartpanicgridview');
        var menu = view.down('#filtrostr').menu;
        var telefono = menu.down('#telefonoId').getValue();
        var nombreCuenta = menu.down('#nombreCuenta').getValue();
        var usuario = menu.down('#usuarioId').getValue();
        var cuenta = menu.down('#cuentaId').getValue();
        var imei = menu.down('#imeiId').getValue();
        var dealer = menu.down('#dealerId').getValue();
        var telefono = menu.down('#telefonoId').getValue();
        var nombreCuenta = menu.down('#nombreCuenta').getValue();
        var usuario = menu.down('#usuarioId').getValue();
        var cuenta = menu.down('#cuentaId').getValue();
        var imei = menu.down('#imeiId').getValue();
        var dealer = menu.down('#dealerId').getValue();
        var fechaDesde = menu.down('#fechadesde').getValue();
        var fechaHasta = menu.down('#fechahasta').getValue();
        // ...
        // Construir filtro de búsqueda para el número de teléfono
        var telefonoFilter = null;
        if (telefono) {
            telefonoFilter = {
                property: 'Telefono:LIKE',
                value: '%' + telefono + '%',
            };
        }
        // Aplicar todos los filtros
        var store = view.getStore();
        var filters = Ext.clone(view.filters);
        if (telefonoFilter) {
            filters.push(telefonoFilter);
        }
        if (nombreCuenta) {
            filters.push({
                property: 'cue_cnombre:LIKE',
                value: '%' + nombreCuenta + '%',
            });
        }
        if (usuario) {
            filters.push({
                property: 'Nombre:LIKE',
                value: '%' + usuario + '%',
            });
        }
        if (cuenta) {
            filters.push({
                property: 'cue_ncuenta:LIKE',
                value: '%' + cuenta + '%',
            });
        }
        if (imei) {
            filters.push({
                property: 'Imei:LIKE',
                value: '%' + imei + '%',
            });
        }
        if (dealer) {
            filters.push({
                property: 'cue_clinea:LIKE',
                value: '%' + dealer + '%',
            });
        }
       

        if(fechaDesde) {
            filters.push({
                property: 'cue_dfechaalta:GTE',
                value: fechaDesde
            });
        }

        if (fechaHasta) {

            fechaHasta = Ext.Date.add(fechaHasta, Ext.Date.HOUR, 23);
            fechaHasta = Ext.Date.add(fechaHasta, Ext.Date.MINUTE, 59);
            fechaHasta = Ext.Date.add(fechaHasta, Ext.Date.SECOND, 59);

            filters.push({
                property: 'cue_dfechaalta:LTE',
                value: fechaHasta
            });
        }
        // Aplicar los filtros a la tienda
        store.load({
            filters: filters,
            callback: function () {
            }
        });
        if (view.down('#fallodetesteo').pressed) {
            filters = [{
                property: 'EnFalloDeTesteo',
                value: 1,
                id: 'EnFalloDeTesteo'
            }];
            view.down("gridcolumn[dataIndex=EnFalloDeTesteoDesde]").setVisible(true)
        } else {
            view.down("gridcolumn[dataIndex=EnFalloDeTesteoDesde]").setVisible(false)
        }
        if (view.down('#bluetooth').pressed) {
            filters.push({
                property: 'srb_idkey:GTINT',
                value: 0,
                id: 'bluetooth'
            });
        }
        var states = []
        if (view.down('#actualesSmartPanic').pressed) {
            states.push('current')
        }
        if (view.down('#dispersoSmartPanic').pressed) {
            states.push('disper')
        }
        if (view.down('#viejasSmartPanic').pressed) {
            states.push('old')
        }
        filters.push({
            property: 'state:IN',
            value: states.join(','),
            id: 'state'
        });
        if (filters.length > 0) {
            store.clearFilter(true);
            store.filter(filters);
        } else {
            store.clearFilter();
        }
        this.armoUrlGeoJson(view)
    },

    onCuentaChanged: function (cuenta, view) {
        var gridview = view.up('viewport').down('smartpanicgridview');
        var selection = view.getSelectionModel().getSelection();
        var model = this.getSmartPanicModelModel();
        var telefonoModel = this.getTelefonoSearchModelModel();
        var t = this;
        Ext.Array.each(selection, function (record, key) {
            var telefono = record.get('Telefono');;
            var filters = [{
                property: 'tel_ctelefono',
                value: telefono
            }, {
                property: 'tel_iidcuenta',
                value: cuenta.get('Id')
            }];
            var store = Ext.create('Ext.data.Store', {
                model: telefonoModel,
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: filters
            })
            store.load(function () {
                record.setConfig({
                    proxy: model.getProxy()
                });
                record.set('CuentaId', cuenta.get('cue_iid'));
                record.save({
                    success: function (record) {
                        var parametros = 'cuentaid=' + cuenta.get('cue_iid') + '&smartpanicid=' + record.get('Id');
                        Ext.Ajax.request({
                            url: '/rest/search/smartpanicasignarcuenta',
                            method: 'GET',
                            params: parametros,
                            success: function (resp, operation) {
                                notify('Los datos se guardaron con éxito');
                                gridview.down('pagingtoolbar').doRefresh();
                            }
                        });
                    }
                });
            });
        });
    },

    onCuentaNew: function (cuenta, view) {
        var gridview = view.up('viewport').down('smartpanicgridview');
        var spform = Ext.widget('smartpanicformview', {
            caller: view,
            cuenta: cuenta
        });
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Nuevo SmartPanic',
            closeAction: 'destroy',
            itemId: 'cuentaNew',
            width: 450,
            height: 385,
            border: true,
            modal: true,
            view: gridview,
            items: [spform]
        });
        win.show();
    },


    tieneUsuariosDisponibles: function (view, callback) {
        /*
            https://basecamp.com/2249105/projects/12939010/todos/444184599
            var fieldToolBar = view.up('viewport').down('#toolbardisplayfield');
        
        if (fieldToolBar.hidden && view.up('viewport').down('smartpanicnorthview')){
            fieldToolBar = view.up('viewport').down('smartpanicnorthview').down('#toolbardisplayfield');
        }*/
        if (view.QtyUsers != 0) { //==0 solo para testeo
            var store = Ext.create('Ext.data.Store', {
                model: this.getSmartPanicSearchModelModel(),
                //pageSize: 1000, // estaba tirando 25 max 
                pageSize: 1,// no necesito traer muchos, solo miro el total
                remoteFilter: true,
                filters: view.filters
            })
            store.load(function () {
                var asignados = this.getTotalCount();
                if (asignados == view.QtyUsers) {
                    // actualizo cantidades en la barra
                    {
                        var t = view.down('toolbar');
                        var countMsg = getLocale('Disponibles/Usados') + ' (' + view.QtyUsers + '/' + asignados + ')';
                        // fieldToolBar.setValue(countMsg);
                        if (northView) {
                            northView.fireEvent('changeCount', northView, countMsg)
                        }
                    }
                    view.down('[action="nuevo"]').setDisabled(true);
                    var msg = getLocale('Se supero la cantidad de asignaciones disponibles') + '. (' + asignados + '\/' + view.QtyUsers + ')';
                    Ext.Msg.alert('Atención', msg, Ext.emptyFn);
                } else if (asignados > view.QtyUsers) {
                    // actualizo cantidades en la barra
                    var countMsg = getLocale('Disponibles/Usados') + ' (' + view.QtyUsers + '/' + asignados + ')';
                    if (fieldToolBar) {
                        fieldToolBar.setValue(countMsg);
                        fieldToolBar.show();
                    }
                    if (view.down('[action="groupAlarmas"]'))
                        view.down('[action="groupAlarmas"]').setDisabled(true);
                    if (view.down('[action="configurar"]'))
                        view.down('[action="configurar"]').setDisabled(true);
                    if (view.down('[action="nuevo"]'))
                        view.down('[action="nuevo"]').setDisabled(true);
                    Ext.Msg.alert('Atención', getLocale('Se supero la cantidad de asignaciones disponibles. Por favor comuniquese con el administrador') + '.(' + asignados + '/' + view.QtyUsers + ')', Ext.emptyFn);
                    view.licenseViolation = true;
                    view.fireEvent('licenseviolation');
                } else {
                    // actualizo cantidades en la barra
                    /*
                        https://basecamp.com/2249105/projects/12939010/todos/444184599
                      if(fieldToolBar) {
                        fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');
                        fieldToolBar.show();
                      }
                    */
                    view.down('[action="nuevo"]').setDisabled(false);
                    if (callback) {
                        callback();
                    }
                }
            });
        } else {
            // actualizo cantidades en la barra
            /*
              https://basecamp.com/2249105/projects/12939010/todos/444184599
            var t = view.down('toolbar');    
            var countMsg =  getLocale('Dispositivos ilimitados');
            if(fieldToolBar) {
                fieldToolBar.setValue(countMsg);
                fieldToolBar.show();
              }
              */
            if (callback) {
                callback();
            }
        }
    },

    onSelectionChange: function (selectionModel, records, options) {
        var controller = this;
        var view = selectionModel.view.up('smartpanicgridview');
        if (view.fireSelectionChange) {
            //si le pasamos GMAPPANEL doy por entendido que tengo que pegarle el layer al mapa que se paso
            view.down('#dispositivos-seleccionados').toggle(true)
            view.filtroDispositivos = 'seleccionados'
            this.armoUrlGeoJson(view)
        }
    },

    armoUrlGeoJson: function (view) {
        var controller = this
        var continueLoad = true;
        if (view.GMAPPANEL) {
            //armo url para geojson           
            var urlgeojson = '/handler/smartpanicsGeoJson';
            urlgeojson += '?token=' + Ext.util.Cookies.get('OAuth_Token');
            if (view.filtroDispositivos == 'seleccionados') {
                var ids = []
                Ext.Array.each(view.getSelectionModel().getSelection(), function (record) {
                    ids.push(record.get('Id'))
                })
                urlgeojson += '&filter=' + Ext.encode([{
                    property: 'Id:ININT',
                    value: ids.join(',')
                }]);
                if (ids.length > 0) {
                } else {
                    //notify('Debe seleccionar algun smartpanics para continuar.')
                    continueLoad = false;
                    if (view.GMAPPANEL.smartpanics) {
                        view.GMAPPANEL.smartpanics.forEach(function (feature) {
                            view.GMAPPANEL.smartpanics.remove(feature)
                        })
                    }
                }
            } else if (view.filtroDispositivos == 'filtro') {
                var filters = Ext.clone(view.filters);
                var queryType = view.down('#queryType').getValue();
                var query = view.down('#query').getValue();
                if (queryType == 'imei')
                    filters.push({
                        property: 'Imei:LIKE',
                        value: query,
                        id: 'search'
                    });
                if (queryType == 'telefono')
                    filters.push({
                        property: 'Telefono:LIKE',
                        value: query,
                        id: 'search'
                    });
                if (queryType == 'nombre')
                    filters.push({
                        property: 'cue_cnombre:LIKE',
                        value: query,
                        id: 'search'
                    });
                if (queryType == 'usuario')
                    filters.push({
                        property: 'Nombre:LIKE',
                        value: query,
                        id: 'search'
                    });
                if (queryType == 'cuenta')
                    filters = [{
                        property: 'cue_ncuenta:LIKE',
                        value: query,
                        id: 'search'
                    }];
                if (queryType == 'dealer')
                    filters = [{
                        property: 'cue_clinea:LIKE',
                        value: query,
                        id: 'search'
                    }];
                if (view.down('#fallodetesteo').pressed) {
                    filters = [{
                        property: 'EnFalloDeTesteo',
                        value: 1,
                        id: 'EnFalloDeTesteo'
                    }];
                }
                var states = []
                if (view.down('#actualesSmartPanic').pressed) {
                    states.push('current')
                }
                if (view.down('#dispersoSmartPanic').pressed) {
                    states.push('disper')
                }
                if (view.down('#viejasSmartPanic').pressed) {
                    states.push('old')
                }
                filters.push({
                    property: 'state:IN',
                    value: states.join(','),
                    id: 'state'
                });
                urlgeojson += '&filter=' + Ext.encode(filters);
            } else {
            }
            var dateNow = new Date()
            urlgeojson += "&_dc=" + dateNow.getTime();
            console.log(urlgeojson, view.GMAPPANEL)
            view.urlGeoJson = urlgeojson
            //esto es para frenar el load
            if (continueLoad) {
                controller.onMarkersGeoJsonChange(view, false)
            }
        }
    },


    getSmartPanicIcon: function (cuenta, gmappanel6) {
        //    var iconUrl = '/resources/global/images/icons/';
        var tipo = 'Casa';// cuenta.get('tip_cdescripcion');
        if (cuenta.get('selected')) {
            tipo = tipo + '_selected';
        }
        cuenta.isOld = false;
        cuenta.isDisperso = false;
        cuenta.isActual = false;
        if (Ext.Date.add(new Date(Ext.Date.now()), Ext.Date.MINUTE, gmappanel6.TIEMPODISPOSITIVOS * -1) > new Date(cuenta.get('gps_tfechahora'))) {
            iconUrl = '/resources/softguard/images/mapguard-cservice/sp_old.png';
            cuenta.isOld = true;
        } else if (cuenta.get('gps_rAccuracy') > gmappanel6.DISPERSIONDISPOSITIVOS) {
            iconUrl = '/resources/softguard/images/mapguard-cservice/sp_disper.png';
            cuenta.isDisperso = true;
        } else {
            iconUrl = '/resources/softguard/images/mapguard-cservice/sp.png';
            cuenta.isActual = true;
        }
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48, 48),
            new google.maps.Point(0, 0),
            new google.maps.Point(15, 35)
        );
        return image;
    },



    getMarkerInfoWindowHtmlSmartPanics: function (marker, address) {
        if (marker && marker.Telefono) {
            var cargando = '';
        } else {
            var cargando = '<span class="x-mask-msg-text"></span>';
        }
        var html = '\
            <div style="width:280px;">\
            <table>\
            <tr>\
                <td style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="/resources/softguard/images/mapguard-cservice/sp.png" style="float:left; margin:0 5px 0 0"/>\
                </td>\
                <td  style="padding:5px 0 0 5px; font-size:13px; ">\
                    <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
             <tr>\
                <td colspan="2" style="padding:5px; font-size:13px;">\
                   <hr />\
                </td>\
            </tr>\
            ';
        html += '\
        <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblLocalidad}:</span><span> {localidad}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbltelefono}:</span><span> {telefono}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblusuario}:</span><span> {usuario}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneSO}:</span><span> {phoneSO}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneModel}:</span><span> {phoneModel}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneBrand}:</span><span> {phoneBrand}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblgps_tfechahora}:</span><span> {gps_tfechahora}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbldireccionactual}:</span><span> {direccionActual}</span><br/>\
                        </td>\
                    </tr>\
                    ';
        html += '</table>';
        html = html.replace(/\{direccionActual\}/, address ? address : cargando);
        html = html.replace(/\{nombre\}/, marker ? marker.cue_clinea + '-' + marker.cue_ncuenta + ' <br/> ' + (marker.cue_cnombre ? marker.cue_cnombre : cargando) : cargando);
        html = html.replace(/\{localidad\}/, marker.cue_clocalidad ? marker.cue_clocalidad : cargando);
        html = html.replace(/\{telefono\}/, marker.Telefono ? marker.Telefono : cargando);
        html = html.replace(/\{phoneSO\}/, marker.Tipo ? marker.Tipo : cargando);
        html = html.replace(/\{usuario\}/, marker.Nombre ? marker.Nombre : cargando);
        html = html.replace(/\{phoneBrand\}/, marker.Marca ? marker.Marca : cargando);
        html = html.replace(/\{phoneModel\}/, marker.Modelo ? marker.Modelo : cargando);
        html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'));
        html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'));
        html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'));
        html = html.replace(/\{lblusuario\}/, getLocale('Usuario'));
        html = html.replace(/\{lblphoneSO\}/, getLocale('S.O.'));
        html = html.replace(/\{lblphoneModel\}/, getLocale('Modelo'));
        html = html.replace(/\{lblphoneBrand\}/, getLocale('Marca'));
        html = html.replace(/\{lbldireccionactual\}/, getLocale('Direccion actual'));
        html = html.replace(/\{gps_tfechahora\}/, marker.gps_tfechahora ? Ext.Date.format(new Date(marker.gps_tfechahora), 'd-m-Y H:i:s') : cargando);
        html = html.replace(/\{lblgps_tfechahora\}/, getLocale('Fecha de posicion'));
        return html;
    },

    onMarkersGeoJsonChange: function (view, ultimos) {
        var loading = view.caller.down('#loadingmap');
        loading.show();
        //cuando esta definido ultimo en true, intenta enviar la ultima fecha de load
        var controller = this;
        if (view) {
            var gmappanel6 = view.GMAPPANEL//view.down('#googlemap'); 
            if (view.geojsonAjax) {
                return false;
            }
            if (gmappanel6.smartpanics) {
                //cuando gmappanel6.dispositivos esta en true aplico filtro de ultima llamada para traer solo los registros que se actualizaron
                var urlParametroUltimaCarga = '';
                if (ultimos) {
                    //tomo fecha y armao string para filtro
                    if (view.ultimaCarga) {
                        urlParametroUltimaCarga = '&ultimaCarga=' + Ext.Date.format(view.ultimaCarga, 'Y-m-d g:i')
                    }
                    view.ultimaCarga = new Date();
                }
                //Ext.Ajax.abort(view.geojsonAjax);
                view.geojsonAjax = true
                Ext.Ajax.request({
                    url: view.urlGeoJson + urlParametroUltimaCarga,
                    success: function (response, opts) {
                        view.geojsonAjax = false;
                        var obj = Ext.JSON.decode(response.responseText);
                        if (!ultimos) {
                            //elimino los features
                            gmappanel6.smartpanics.forEach(function (feature) {
                                gmappanel6.smartpanics.remove(feature)
                            })
                        } else {
                            //elimino solo los features que llegan
                            for (var i in obj.features) {
                                gmappanel6.smartpanics.forEach(function (feature) {
                                    if (feature.getProperty("cue_iid") == obj.features[i].properties.cue_iid) {
                                        gmappanel6.smartpanics.remove(feature)
                                    }
                                })
                            }
                        }
                        gmappanel6.smartpanics.addGeoJson(obj)
                        loading.hide();
                    }
                })
            } else {
                view.geojsonAjax = true
                gmappanel6.smartpanics = new google.maps.Data();
                gmappanel6.smartpanics.loadGeoJson(view.urlGeoJson, null, function () {
                    view.geojsonAjax = false
                    loading.hide();
                });
                gmappanel6.smartpanics.setStyle({ visible: true });
                gmappanel6.smartpanics.setStyle(function (feature) {
                    return {
                        icon: feature.getProperty('icon'),
                        title: feature.getProperty('title')
                    };
                });
                gmappanel6.smartpanics.setMap(gmappanel6.getMap());
                gmappanel6.smartpanics.addListener('mouseover', function (event) {
                    var address = '';
                    var infoRecord = getProperties(event.feature);
                    if (gmappanel6.infowindowOpened) {
                        gmappanel6.infowindowOpened.close();
                    }
                    gmappanel6.infowindowOpened = new google.maps.InfoWindow({
                        pixelOffset: new google.maps.Size(0, -60)
                    });
                    gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartPanics(infoRecord, address))
                    //busco la direccion
                    var geocoder = gmappanel6.getGeocoder();
                    geocoder.geocode({
                        location: event.feature.getGeometry().get()
                    }, function (result, status) {
                        if (status == 'OK') {
                            address = result[0].formatted_address;
                            //actualizo contenido
                            gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartPanics(infoRecord, address))
                        } else {
                            gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartPanics(infoRecord, ''))
                        }
                    });
                    Ext.Ajax.request({
                        url: '/rest/search/smartpaniccuenta',
                        method: 'GET',
                        params: { filter: Ext.encode([{ property: 'cue_iid', value: event.feature.getProperty("cue_iid") }, { property: 'Telefono', value: event.feature.getProperty("Telefono") }]) },
                        success: function (response, opts) {
                            var obj = Ext.JSON.decode(response.responseText);
                            infoRecord = obj.rows[0]
                            gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartPanics(obj.rows[0], address))
                        }
                    })
                    gmappanel6.infowindowOpened.setPosition(event.feature.getGeometry().get());
                    gmappanel6.infowindowOpened.open(gmappanel6.getMap());
                });
                gmappanel6.smartpanics.addListener('mouseout', function (event) {
                    gmappanel6.infowindowOpened.close();
                });
                gmappanel6.smartpanics.addListener('click', function (event) {
                    var tabpanel = view.caller.up('tabpanel')
                    Ext.Ajax.request({
                        url: '/rest/search/smartpaniccuenta',
                        method: 'GET',
                        params: { filter: Ext.encode([{ property: 'cue_iid', value: event.feature.getProperty("cue_iid") }, { property: 'Telefono', value: event.feature.getProperty("Telefono") }]) },
                        success: function (response, opts) {
                            var obj = Ext.JSON.decode(response.responseText);
                            infoRecord = obj.rows[0]
                            var title = getLocale('SmartPanics:') + " " + event.feature.getProperty('cue_clinea') + "-" + event.feature.getProperty('cue_ncuenta');
                            var recordSp = controller.getSPCuentaSeguimientoModelModel().create(Ext.clone(infoRecord))
                            var tab = Ext.widget('spseguimientomapview', {
                                title: title,
                                record: recordSp,
                                closable: true,
                                translate: false,
                                forceCuenta: true
                            });
                            tabpanel.add(tab)
                            tabpanel.setActiveTab(tab);
                        }
                    })
                });
            }
        }
    },

    // BC 372261945 : Se agrega el envio de Log
    enviarLog: function (rec, view) {
        var controller = this;
        var spToken = rec.get('pushToken');
        var spId = rec.get('Id');
        if (spToken != '') {
            Ext.Msg.show({
                title: 'Enviar Log',
                msg: 'Desea enviar log a la central?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: '/rest/search/createPushMessage',
                            method: 'GET',
                            scope: this,
                            params: {
                                spId: spId,
                                spToken: spToken,
                                msgType: 'SENDLOG'
                            },
                            success: function (response) {
                                notify('Se envio log al dispositivo');
                            }
                        })
                    } else if (btn === 'no') {
                    } else {
                    }
                }
            })
        } else {
            notify('El dispositivo no se encuentra dado de alta en el sistema');
        }
    }

});