Ext.define('GestorSim.controller.SimNewController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['m_simcardModel', 'm_simcardSearchModel', 'T_SimCard_APNModel', 'T_SimCard_EstadoModel'
        , 'T_SimCard_MarcaModel', 'SimCardTimeLineModel'],
    views: ['SimNewView'],
    readonly: false,

    init: function (config) {
        // genero los eventos
        this.control({
            'simnewview': {
                beforerender: this.initview,
                cuentachanged: this.onCuentaChanged
            },
            'simnewview #cuenta': {
                click: this.onCuentaClick
            },
            'simnewview button[action="create"]': {
                click: this.saveObject
            },
            'simnewview button[action="cancel"]': {
                click: this.onCancelClick
            },
            'simnewview #sim_ClaveMaster': {
                blur: this.onClaveMasterBlur,
                keydown: this.onClaveMasterKeyDown
            },
            'simnewview button[action="filterText"]': {
                click: this.onSearchClick
            }
        });
    }, // cierro init

    initview: function (view) {
        var objectId = view.objectId;
        var controller = this;
        var mostrarClave = getRight('GestionTarjetaSim', 'mostrar');
        console.log('videoEdit------', mostrarClave)
        // Busca el campo por itemId
        var campoClave = view.down('#sim_ClaveMaster');

        campoClave.on('afterrender', function (cmp) {
            cmp.inputEl.dom.type = mostrarClave ? 'text' : 'password';
        });
        
        var vMarca = Ext.create('Ext.data.Store', {
            model: this.getT_SimCard_MarcaModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false
        });
        view.down('#sim_marca').bindStore(vMarca);
        vMarca.load();

        var vEstado = Ext.create('Ext.data.Store', {
            model: this.getT_SimCard_EstadoModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false
        });
        view.down('#sim_estado').bindStore(vEstado);
        vEstado.load();


        var vAPN = Ext.create('Ext.data.Store', {
            model: this.getT_SimCard_APNModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false
        });
        view.down('#sim_apn').bindStore(vAPN);
        vAPN.load();

        // if (objectId > 0) {

        view.down('#sim_cuenta').setValue(view.record.get('sim_cuenta'));
        view.down('#nombrecuenta').setValue(view.record.get('cue_ncuenta') + " - " + view.record.get('cue_cnombre'));
        // }

        var txtClaveMaster = view.down('#sim_ClaveMaster').getValue();
        //view.down('#sim_ClaveMaster').setValue(txtClaveMaster.replaceAll('_','0'));

        // if (objectId > 0)
        view.loadRecord(view.record);

        view.store_mismo_codigo = Ext.create('Ext.data.Store', {
            model: controller.getM_simcardSearchModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false

        });

        view.timelineFilters = [
            {
                property: 'Stl_simcardidkey',
                value: view.record.get('Id')
            }
        ];
        var timeLineStore = Ext.create('Ext.data.Store', {
            model: controller.getSimCardTimeLineModelModel(),
            remoteSort: true,
            remoteFilter: true,
            filters: view.timelineFilters
        });
        timeLineStore.load();
        var timelineGrid = view.down('#timelineGrid');
        timelineGrid.bindStore(timeLineStore);


    },
    initData: function (view, record) {
        view.loadRecord(record);
    },
    onSearchClick: function (button, event, options) {
        var view = button.up('simnewview');

        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechaHasta = view.down('#fechaHasta').getValue();
        var accion = view.down('#accion').getValue();
        var usuario = view.down('#usuario').getValue();

        var filters = view.timelineFilters;
        if (fechaDesde) {
            filters.push(
                {
                    property: 'Stl_tFechaHora:GTEDATESTRING',
                    value: Ext.Date.format(fechaDesde, 'Y-m-d H:i:s')
                });
        }
        if (fechaHasta) {
            filters.push(
                {
                    property: 'Stl_tFechaHora:LTEDATESTRING',
                    value: Ext.Date.format(fechaHasta, 'Y-m-d H:i:s')
                }
            );
        }
        if (accion) {
            filters.push(
                {
                    property: 'Stl_cAccion',
                    value: accion
                }
            );
        }

        if (usuario) {
            filters.push(
                {
                    property: 'Stl_cUserDss:LIKE',
                    value: usuario
                }
            );
        }
        var store = view.down('#timelineGrid').getStore();
        store.clearFilter();
        store.filter(filters);
        store.load();
    },
    onCancelClick: function (button, event, options) {
        let myWin = button.up('window');
        myWin.close();
    },
    onClaveMasterKeyDown: function (txtfield, e) {
        var code = e.keyCode;
        if (!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8
            && code != 46 && code != 8 && code != 37 && code != 39 && code != 9) {
            e.stopEvent();
        }
    },
    onClaveMasterBlur: function (txtfield) {
        var value = txtfield.getValue();
        if (!value)
            return;
        var intvalue = 1000000 + parseInt(value);
        value = intvalue + '';
        value = value.substring(1, 7);
        txtfield.setValue(value.replaceAll('_', '0'));

    },

    saveObject: function (button, event, options) {

        var controller = this;
        var view = button.up('simnewview');
        var myform = button.up('form').getForm();
        var win = button.up('window');
        var record = myform.getRecord();
        // 
        var model = this.getM_simcardModelModel();
        var record_save = Ext.create(model, {
            Id: record.get("Id")

        })

        myform.updateRecord(record_save);
        record_save.set('sim_udw_idKey', _UserData.udw_idKey);
        record_save.set("sim_cuenta", view.down('#sim_cuenta').getValue());
        /*if(!(view.down('#sim_cuenta').getValue()>0)){
            notifyError(getLocale('Debe seleccionar una cuenta'));
            return;
        }*/
        if (!(view.down('#sim_ClaveMaster').getValue() > 0)) {
            notifyError(getLocale('Clave master debe ser mayor a cero'));
            return;
        }
        record_save.set("Name", "m_simcard");
        if (myform.isValid()) {
            button.disable();
            // view.store_mismo_codigo.filters.clear()
            view.store_mismo_codigo.remoteFilter = true;
            view.store_mismo_codigo.filter([
                {
                    property: 'sim_codigo',
                    value: Ext.String.trim(record_save.get("sim_codigo")),
                    id: 'sim_codigo'
                }
            ]);
            view.store_mismo_codigo.remoteFilter = true;
            view.store_mismo_codigo.load({
                callback: function (records, operation) {
                    if (operation.success) {
                        if (records.length == 0) {
                            record_save.save({
                                win: win,
                                view: view,
                                callback: function (rec, operation) {
                                    if (operation.success) {
                                        view.fireEvent('objectcreated', view);
                                        notify('Se guardo con exito el registro');
                                        button.enable();
                                        if (win) win.close();

                                    }
                                    else {
                                        console.log(operation);
                                        notify(getLocale('Ocurrió un error'));
                                        button.enable();
                                    }
                                }
                            });
                        }
                        else if (records.length == 1 && records[0].get("Id") == record_save.get("Id")) {
                            record_save.save({
                                win: win,
                                view: view,
                                callback: function (rec, operation) {
                                    if (operation.success) {
                                        view.fireEvent('objectcreated', view);
                                        button.enable();
                                        notify('Se guardo con exito el registro');
                                        if (win) win.close();
                                        var grid = view.down('#timelineGrid');
                                        grid.getStore().load();
                                    }
                                    else {
                                        console.log(operation);
                                        button.enable();
                                        notify(getLocale('Ocurrió un error'));
                                    }
                                }
                            });
                        }
                        else if (records.length > 0) {
                            Ext.Msg.alert(getLocale('Aviso'), getLocale('Este número de teléfono ya se ha utilizado'), Ext.emptyFn);
                            console.log(operation);
                            button.enable();
                        }

                    }

                }
            });




        }

    },
    onCuentaClick: function (btn) {
        var view = btn.up('simnewview')
        var filterTipo = '';
        var filterTipoNOT = '';
        var sinVehiculo = '';
        var soloVehiculo = '';



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
                    filterTipo: filterTipo,
                    filterTipoNOT: filterTipoNOT,
                    selectionEvent: 'cuentachanged',
                    soloVehiculo: soloVehiculo,
                    sinVehiculo: sinVehiculo,
                    caller: view
                }
            ]
        });
        win.show();
    },

    onCuentaChanged: function (cuenta, view) {
        // var _view = view.up('simnewview');

        var cuentaId = cuenta.get('Id');
        view.down('#sim_cuenta').setValue(cuenta.get('Id'));
        view.down('#nombrecuenta').setValue(cuenta.get('cue_ncuenta') + " - " + cuenta.get('cue_cnombre'));
        view.down('#sim_agente').setValue(`${cuenta.get('cue_clinea')}-${cuenta.get('lin_crazonsocial')}`);

    }
});