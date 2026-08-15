Ext.define('Cuenta.controller.SoftguardPanelController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['Cuenta.model.TablasPanelesSearchModel',
        'Cuenta.model.ReceptoresSearchModel',
        'Cuenta.model.t_receptorprocolmodelSearchModel',
        'Cuenta.model.ModemsSMSModel',
        'Cuenta.model.PanelModel'],
    views: ['Cuenta.view.CuentaPanelFormView'],

    init: function (config) {
        var me = this;
        // genero los eventos
        this.control({
            'panelformview': {
                afterrender: this.initview
            },
            /*   'panelview':{
                   beforerender: this.initcontainer
               },*/
            'panelformview button[action=save]': {
                click: this.onSaveClick
            },
            'panelformview button[action=btnManual]': {
                click: this.onManualClick
            },
            'panelformview button[action=btnManual2]': {
                click: this.onManual2Click
            },
            'panelformview #cambioEstado': {
                click: this.onCambioEstado
            },
            'panelformview #pan_ireceptor': {
                //change: this.onPan_ireceptorChange,
                select: this.onPan_ireceptorSelect
            },
            'panelformview #paneles': {
                change: this.onPanelChange
            },
            'panelformview #configurar': {
                click: this.onConfigurarClick
            }
        });
    }, // cierro init

    onConfigurarClick: function (button, event, options) {
        var view = button.up('panelformview');
        var combo = view.down('#paneles');
        var _recordpanel = combo.findRecordByValue(combo.getValue());
        var metadata = _recordpanel.get('pam_cMetadata');
        var json;
        var pan_cconfig;
        var jsonReceptor;

        var record = view.record;

        try {
            json = Ext.decode(metadata);
        } catch (e) {
            console.log(e)
        }


        if (json && json.items) {
            var win = Ext.create('Ext.window.Window', {
                title: 'Configurar',
                closeAction: 'destroy',
                width: 350,
                height: (50 + (json.items.length * 32)), //Genero la alturo dependiendo la cantidad de items
                layout: 'fit',
                items: {
                    xtype: 'form',
                    items: json.items,
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Aceptar',
                            handler: function (btn) {
                                var _form = btn.up('form');
                                if (_form.isValid()) {
                                    var values = _form.getValues();
                                    // guardo el icono como un parametro mas de la metadata.
                                    var _receptor = Ext.JSON.encode(values);

                                    // me fijo si tiene commands en una propiedad
                                    if (_form.jsonConfig.commands) {
                                        _form.jsonConfig.receptor = _receptor;
                                    } else {
                                        var commands = Ext.clone(_form.jsonConfig);
                                        _form.jsonConfig = { receptor: _receptor, commands: commands };
                                    }


                                    record.set('pan_cconfig', Ext.JSON.encode(_form.jsonConfig));
                                    win.close();
                                } else {
                                    notifyError("El formulario tiene errores.");
                                }
                            }
                        }
                    ]
                }
            }).show()

            // aplico los valores
            if (record) {
                var form = win.down('form');

                pan_cconfig = record.get('pan_cconfig');
                if (pan_cconfig) {
                    try {
                        form.jsonConfig = Ext.decode(pan_cconfig);
                        jsonReceptor = form.jsonConfig.receptor;
                        receptor = Ext.decode(jsonReceptor);

                        Ext.Object.each(receptor, function (key, value, myself) {

                            var _field = form.getForm().findField(key);
                            if (_field) {
                                _field.setValue(value);
                            }
                        });

                    } catch (e) {
                        console.log(e);
                        form.jsonConfig = {};
                    }
                } else {
                    form.jsonConfig = {};
                }
            }
        }
    },

    onPanelChange: function (combo, newValue, oldValue) {
        var view = combo.up('panelformview');
        // si hay seleccion busco el record

        if (newValue) {
            var _record = combo.findRecordByValue(newValue);

            // me fijo si el record tiene metadata y muestro el boton config
            if (_record.get('pam_cMetadata')) {
                view.down('#configurar').show();
            } else {
                view.down('#configurar').hide();
            }
        }
    },

    onCambioEstado: function (btn) {
        var view = btn.up('panelformview')
        var myWindow = Ext.widget('window', {
            title: 'Cambio de estado',
            height: 100,
            width: 300,
            //autoScroll: true,
            modal: true,
            items: [{
                xtype: 'combo',
                fieldLabel: 'Evento',
                itemId: 'evento',
                store: [
                    ['OPV', getLocale('Apertura Verificable')],
                    ['CLV', getLocale('Cierre Verificable')]
                ],
                margin: '15 15 15 15'
            }],
            bbar: [{
                text: 'Guardar',
                iconCls: 'save',
                listeners: {
                    click: function () {
                        var params = {};
                        params.cAlarma = myWindow.down('#evento').getValue()
                        params.idCta = view.record.get('pan_iidcuenta')

                        //TODO: para veridfacar si el origen 3 es MANUAL
                        params.rec_norigen = 3;

                        Ext.Ajax.request({
                            url: '/rest/search/AlarmaGenerar',
                            method: 'GET',
                            params: params,
                            success: function (resp, operation) {
                                Ext.Ajax.request({
                                    url: '/rest/search/CambioMStatusSegunAlarma',
                                    method: 'GET',
                                    params: {
                                        CodigoAlarma: params.cAlarma,
                                        idCuenta: view.record.get('pan_iidcuenta')
                                    },
                                    success: function (resp, operation) {
                                        notify('El evento se generó con éxito');
                                        myWindow.close()
                                    }
                                })
                            }
                        }
                        );
                    }
                }
            }]
        }).show();
    },

    initview: function (view) {
        if (view.profile < 2) {
            view.down('toolbar').hide();
            var forms = view.query('form');
            Ext.Array.each(forms, function (form) {
                form.disableForm();
            })
        }

        var objectId = view.record.get('Id');
        if (objectId == 0) {
            view.down('#cambioEstado').hide()
        }

        var controller = this;

        //como equipos

        var storeEquipos = Ext.create('Ext.data.Store', {
            model: this.getTablasPanelesSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'o.pan_nesgprs',
                    value: 1
                }
            ],
            sorters: [{ "property": "o.pan_cdescripcion", "direction": "ASC" }],
        })

        view.down('#equipos').bindStore(storeEquipos);
        storeEquipos.load({
            callback: function (records) {
                view.loadRecord(view.record);
            }
        });



        var storePaneles = Ext.create('Ext.data.Store', {
            model: this.getTablasPanelesSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: false,
            sorters: [{ "property": "o.pan_cdescripcion", "direction": "ASC" }],
        })

        view.down('#paneles').bindStore(storePaneles);
        storePaneles.load({
            callback: function () {
                view.loadRecord(view.record);
            }
        });

        var comboReceptores = view.down('#pan_ireceptor');
        var storeReceptores = Ext.create('Ext.data.Store', {
            model: this.getReceptoresSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: false,
            filters: [
                // dedalo 03/03/2020 vimos con pablo de sacarlo para mostrar aca receptores que son solo de comandos con valor iesirs = 2
                /*{
                    property : "rec_iesirs",
                    value : 1
                },*/

                /*{
                    property : "_tienecomandos",
                    value : 1
                }
                */
            ],
            sorters: [{
                property: 'rec_cdescripcion', direction: 'ASC'
            }]

        })

        comboReceptores.bindStore(storeReceptores);
        storeReceptores.load({
            callback: function () {


                view.loadRecord(view.record);
            }
        });

        // modelos de receptores
        var comboModelos = view.down('#pan_rpmidkey');
        var filterModelos = [];
        if (view.record.get('pan_rpmidkey')) {
            filterModelos.push(
                { property: 'rpm_ireceptor', value: view.record.get('pan_ireceptor') }
            );
            filterModelos.push(
                {
                    property: 'hasCommands',
                    id: 'hasCommands',
                    value: 1
                }
            );
        }

        var storeModelos = Ext.create('Ext.data.Store', {
            model: this.getT_receptorprocolmodelSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            filters: filterModelos,
            sorters: [{
                property: 'rpm_cMarca', direction: 'ASC'
            },
            {
                property: 'rpm_cModelo', direction: 'ASC'
            }
            ]
        });

        comboModelos.bindStore(storeModelos);
        storeModelos.load(
            {
                callback: function () {
                    view.loadRecord(view.record);
                }
            }
        );

        var storeModemsSMS = Ext.create('Ext.data.Store', {
            model: this.getModemsSMSModelModel(),
            remoteFilter: true,
            filters: [{
                property: 'sms_nEstado', value: 2
            }],
            sorters: [{
                property: 'sms_cdescripcion', direction: 'ASC'
            }]
        });

        var comboModemsSMS = view.down('#pan_cModemSMS');

        storeModemsSMS.load({
            callback: function () {

                view.loadRecord(view.record);
                /**Daniel O. Medina https://softguard.atlassian.net/browse/DS-687 debido a una race condition
                 * se agrega dentro de este callback el load de modelos
                 */
                storeModelos.load({
                    callback: function () {
                        //view.down('#pan_rpmidkey').setValue(view.record.get('rpm_idKey'));
                        if (objectId > 0) {
                            //model.load(objectId,{callback: function(r){
                            //    view.record = r;
                            //view.loadRecord(r);
                            //}});
                        }
                        else {
                            //view.loadRecord(view.record);
                        }
                    }
                });


            }
        });
        comboModemsSMS.bindStore(storeModemsSMS);
    },

    onPan_ireceptorSelect: function (combo, records, eOpts) {
        var view = combo.up('panelformview');
        var comboModelo = view.down('#pan_rpmidkey');
        if (records.length > 0) {
            comboModelo.store.clearFilter(true);
            comboModelo.store.filter([{
                property: 'rpm_ireceptor',
                id: 'rpm_ireceptor',
                value: records[0].get("Id")
            }, {
                property: 'hasCommands',
                id: 'hasCommands',
                value: 1
            }]);
            comboModelo.store.load();
        }
    },

    createRecord: function (view) {
        var model = this.getPanelModelModel();
        view.record = model.create({
            pan_iidcuenta: view.record.get('pan_iidcuenta'),
            pan_nmostrar: 2
        });
        view.loadRecord(view.record);
    },

    onSaveClick: function (button, event, options) {
        var view = button.up('form');
        var myform = view.getForm();
        var record = view.record;
        if (myform.isValid()) {
            myform.updateRecord(record);
            //record.setProxy(this.getPanelModelModel().getProxy());
            if (view.new) {
                record.set('Id', 0);
            }
            record.save({
                controller: this,
                failure: function (record, operation) {
                    notify('Ocurrio un error al guardar el panel');
                },// cierro function
                success: function (record, operation) {
                    var controller = operation.controller;
                    notify(getLocale('Los cambios se guardaron con éxito'));
                    if (view.caller) {
                        view.caller.fireEvent('refresh', view.caller)
                    }
                    if (view.up('window')) {
                        view.up('window').close()
                    }
                }// cierro function
            });// cierro save

        } else {
            notifyError('Datos inválidos');
        }
    },

    onManualClick: function (button, event, options) {
        var view = button.up('form');
        var form = view.getForm();
        var combo = form.findField('pan_ccodigo');
        var record = combo.valueModels[0];
        var myWindow = Ext.widget('window', {
            title: record.get('Descripcion'),
            height: 420,
            width: 700,
            //autoScroll: true,
            modal: true,
            items: [{
                xtype: 'box',
                padding: 5,
                autoScroll: true,
                html: '<xmp>' + record.get('pan_mobservacion') + '</xmp>'
            }],
            layout: 'fit'
        }).show();
    },

    onManual2Click: function (button, event, options) {
        var view = button.up('form');
        var form = view.getForm();
        var combo = form.findField('pan_cgprs');
        var record = combo.valueModels[0];

        var myWindow = Ext.widget('window', {
            title: record.get('Descripcion'),
            height: 420,
            width: 700,
            //autoScroll: true,
            modal: true,
            items: [{
                xtype: 'box',
                padding: 5,
                autoScroll: true,
                html: '<xmp>' + record.get('pan_mobservacion') + '</xmp>'
            }],
            layout: 'fit'
        }).show();
    }
});