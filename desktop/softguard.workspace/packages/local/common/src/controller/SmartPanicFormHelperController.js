//MIGRADO2024
/**
 * ATENCION
 * [04/07/2018] (Adrian)
 * El json que genera este controller, no es igual al global ni el dealer (administratorsearch)
 */
Ext.define('Common.controller.SmartPanicFormHelperController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['m_dealer_spconfigModel', 'm_dealer_spconfigSearchModel', 'TablasPlantillasSmsModel', 'SmartPanicModel', 'TelefonoSearchModel', 'SoftguardTelefonoModel', 'SoftguardUsuarioModel', 'SmartMailProgramModel', 'SmartPanicSearchModel', 'UserByCuentaWithRangoModel'],
    views: ['SmartPanicFormView'],
    init: function (config) {
        // genero los eventos
        this.control({
            'smartpanicform button[action="save"]': {
                click: this.saveObject
            },
            'smartpanicform button[action="cancel"]': {
                click: this.onCancelClick
            },
            'smartpanicform #seleccionarusuario': {
                click: this.onSeleccionarUsuarioClick
            },
            'smartpanicform #qrButton': {
                click: this.onQrClick
            },
            'smartpanicform #borrarusuario': {
                click: this.onBorrarUsuarioClick
            },
            'smartpanicform #btdelete': {
                click: this.onBtDeleteClick
            },
            'smartpanicform': {
                afterrender: this.initview,
                userSelected: this.onUserSelected,
                cuentanew: this.onCuentaSelected,
            },
            'smartpanicform #cambiarimei': {
                click: this.onCambiarImeiClick
            },
            'smartpanicform #enviarcomando': {
                click: this.onEnviarComandoClick
            },
            /*'smartpanicform #modoVecinal' : {
                change : this.onModoVecinalChange
            },*/
            'smartpanicform #funcMiGrupo': {
                change: this.onFuncMiGrupoChange
            },

            'smartpanicform #funcMisComandos': {
                change: this.funcMisComandos
            },

            'smartpanicform #trackingTrigger': {
                change: this.onTrackingTriggerChange
            },
            /* 'smartpanicform #btnExtras': {
                 change: this.onBtnExtrasChange
             },*/
            'smartpanicform #selectcuenta': {
                click: this.onSelectCuentaClick
            },
            'smartpanicform #deletecuenta': {
                click: this.onDeleteCuentaClick
            },
            'smartpanicform #modoVecinal': {
                change: this.onModoVecinalChange
            }
        });
    }, // cierro init

    onModoVecinalChange: function (combo, value) {
        var view = combo.up('smartpanicform')
        if (value != 1) {
            view.down('#funcMisCuentas').setDisabled(false)
            view.down('#funcMisMoviles').setDisabled(false)
            view.down('#funcMisCamaras').setDisabled(false)
            view.down('#funcMiGrupo').setDisabled(false)
            view.down('#funcMisComandos').setDisabled(false)
        } else {
            //lo diferio para que funcione cuando se estan setiando todo los campos en el inicio
            setTimeout(function () {
                view.down('#funcMisCuentas').setDisabled(true)
                view.down('#funcMisMoviles').setDisabled(true)
                view.down('#funcMisCamaras').setDisabled(true)
                view.down('#funcMiGrupo').setDisabled(true)
                view.down('#funcMisComandos').setDisabled(true)

                view.down('#funcMisCuentas').setValue(2)
                view.down('#funcMisMoviles').setValue(2)
                view.down('#funcMisCamaras').setValue(2)
                view.down('#funcMiGrupo').setValue(2)
                view.down('#funcMisComandos').setValue(2)
            }, 30)
        }
    },
    onDeleteCuentaClick: function (button, event, options) {
        var view = button.up('smartpanicform');
        view.down('#idcuenta').setValue(0);
        view.down('#nombrecuenta').setValue('No hay seleccionada');
    },

    onBtDeleteClick: function (button, event, options) {
        var view = button.up('smartpanicform');
        var record = view.recordSearch;
        var srb_idkey = record.get('srb_idkey');
        if (srb_idkey > 0) {
            var url = '/rest/p_spremotebtn/' + srb_idkey;
            Ext.Ajax.request({
                url: url,
                method: 'DELETE',
                callback: function () {
                    notify('El botón se eliminó con éxito');
                    view.down('#hasbutton').hide();
                }
            });
        }

    },
    onSelectCuentaClick: function (button, event, options) {
        var view = button.up('smartpanicform');
        var filters = [];
        if (view.byDealer) {
            filters.push({
                property: 'cue_clinea',
                value: view.record.get('cue_clinea') ? view.record.get('cue_clinea') : view.record.get('lin_ccodigo')
            })
        }
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
                    metodo: 'new',
                    filter: filters
                }
            ]
        });
        win.show();
    },

    onCuentaSelected: function (cuenta, view) {
        view.down('#idcuenta').setValue(cuenta.get('Id'));
        view.down('#nombrecuenta').setValue(cuenta.get('Name'));
    },

    onFuncMiGrupoChange: function (combo, value) {
        var view = combo.up('smartpanicform')
        if ((value == 0 || value == 2) /*&& view.down('#modoVecinal').getValue() == 0*/) {
            view.down('#tabgrupo').setDisabled(true)
        } else {
            view.down('#tabgrupo').setDisabled(false)
        }
    },

    onTrackingTriggerChange: function (combo, value) {
        var view = combo.up('smartpanicform')
        if (value == 0) {
            view.down('#distance').setValue(3000);
            view.down('#time').setValue(30);
        } else if (value == 1) {
            view.down('#distance').setValue(1500);
            view.down('#time').setValue(15);
        } else if (value == 2) {
            view.down('#distance').setValue(500);
            view.down('#time').setValue(5);
        }
    },
    onEnviarComandoClick: function (btn) {
        var view = btn.up('smartpanicform')
        //enviar push
        var record = view.record;
        var token = record.get('pushToken');

        if (token) {
            Ext.Ajax.request({
                url: '/Rest/Search/CreatePushMessage',
                method: 'GET',
                scope: this,
                params: {
                    spToken: token,
                    msgType: 'ALARM_STOP'
                },
                success: function (response) {
                    console.log(response);
                    notify('El comando fue enviado.')
                }
            })
        } else {
            notifyError('El dispositivo no posee push activo.')
        }
    },
    onCambiarImeiClick: function (btn) {
        var view = btn.up('smartpanicform')
        var win = Ext.create('Ext.Window', {
            layout: 'vbox',
            title: 'Cambio dispositivo',
            closeAction: 'destroy',
            modal: true,
            width: 400,
            height: 110,
            border: false,
            items: [{
                xtype: 'displayfield',
                translate: false,
                value: getLocale('El Imei debe ser del teléfono') + ' ' + view.record.get('Telefono')
            }, {
                xtype: 'textfield',
                name: 'Imei',
                fieldLabel: 'Imei',
                labelWidth: 50,
                itemId: 'imeicampocambio',
                width: '100%'
            }
            ],
            bbar: [
                "->", {
                    text: 'Aceptar',
                    handler: function (btn) {
                        var viewWin = btn.up('window')
                        view.down('#imeicampo').setValue(viewWin.down('#imeicampocambio').getValue())
                        viewWin.close()
                    }
                }]
        });
        win.show();
    },
    onUserSelected: function (record, view) {
        view.down('#idusuario').setValue(record.get('udw_idKey'));
        view.down('#nombreusuario').update(record.get('_nombre'));
        view.down('#borrarusuario').show();
    },

    onBorrarUsuarioClick: function (btn) {
        var view = btn.up('smartpanicform');
        view.down('#idusuario').setValue(0);
        view.down('#nombreusuario').update('');
        view.down('#borrarusuario').hide();
    },

    onSeleccionarUsuarioClick: function (btn) {
        var view = btn.up('smartpanicform')
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione un usuario',
            closeAction: 'destroy',
            modal: true,
            width: 640,
            height: 480,
            border: false,
            items: [{
                xtype: 'usuarioselecterhelperview',
                caller: view,
                record: view.record,
                cuentaWithRango: true,
                filterByTipo: 2,
                cuentaNumero: Ext.util.Format.trim(view.recordSearch.get('cue_ncuenta')),
                dealer: view.recordSearch.get('cue_clinea')

            }]
        });
        win.show();
    },
    onQrClick: function (btn) {
        var view = btn.up('smartpanicform');
        var urlDominio = getParametro('DESKTOPEXTERNALURL') + '/handler/QrCodeHandler?Language=';
        var url = urlDominio + _UserData.metadata.language + '&Oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87&showLink=true&title=Configuracion%20del%20servicio&code=/https://gcs.softguard.com:443/Pedro%20Reyes/1533662255/35475/0/'
        var record = view.record
        var html = Ext.widget('uxiframe', {
            src: url,
            height: 0,
            border: false,
            width: '100%'
        });
        var nombre = encodeURI(record.get('Nombre'))
        var telefono = encodeURI(record.get('Telefono'))
        var cuentaId = encodeURI(record.get('CuentaId'))
        var params = nombre + '/' + telefono + '/' + cuentaId
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'CODIGO QR',
            bodyStyle: {
                background: 'white'
            },
            closeAction: 'destroy',
            modal: true,
            width: 640,
            height: 480,
            border: false,
            html: '<iframe id="iframe-uxiframe-1524" style="overflow:auto;width:100%;height:100%;" allow="camera *;microphone *" frameborder="0"  src="' + urlDominio + _UserData.metadata.language + '&Oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87&showLink=true&title=' + nombre + '&code=/' + getParametro('DESKTOPEXTERNALURL') + '/' + params + '/0/" name="iframe-uxiframe-1524"></iframe>',
            listeners: {
                close: function () {
                    // Re-habilitar boton save
                    view.down('button[action="save"]').setDisabled(false);
                }
            },
            buttons: [{
                text: 'Listo',
                handler: function (button) {

                    console.log('Click en botón Listo');

                    var winQR = button.up('window');
                    winQR.close();

                    var formWin = view.up('window');

                    if (view.caller) {
                        view.caller.fireEvent('smartpanicchange', view.record, view.caller);
                    }

                    if (formWin) {
                        formWin.close();
                    }
                }
            }]
        });
        view.down('button[action="save"]').setDisabled(true);
        win.show();
        console.log(getParametro('DESKTOPEXTERNALURL'))
    },
    initview: function (view) {
        var _ObjectId = 30;
        var _ObjectTypeName = 'UiApplication';
        var _restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        view.urlConfigGlobal = '/' + _restPath + '/' + _ObjectTypeName + '/' + _ObjectId + '/Metadata';
        var controller = this;
        view.recordSearch = view.record;
        view.ajaxRunning = true;
        if (view.metodo == 'readonly') {
            view.items.each(function (f) {
                f.setDisabled(true);
            });
            view.down('button[action="save"]').hide()

        } else if (getModuleData('SmartPanics', 'cambioimei')) {
            view.down('#cambiarimei').show()
        }

        //[DEDALO 5/11/2018]lo saco de adentro del if de la config del dealer
        if (view.metodo != 'edit') {
            view.down('#emailaviso').show()
        }
        if (view.record) {
            var record = view.record;
            if (!view.record.get('Imei')) {
                view.down('#geocercas').tab.hide();
                view.down('#qrButton').show()

            }
            if (view.record.get('awccUserId')) {
                var usauriosStore = Ext.create('Ext.data.Store', {
                    model: controller.getUserByCuentaWithRangoModelModel(),
                    remoteFilter: true,
                    autoload: false,
                    filters: [{
                        property: 'udw_idKey',
                        value: view.record.get('awccUserId')
                    }]

                });
                usauriosStore.load({
                    callback: function (rec) {
                        if (rec.length > 0) {
                            view.down('#idusuario').setValue(rec[0].get('udw_idKey'));
                            view.down('#nombreusuario').update(rec[0].get('_nombre'));
                            view.down('#borrarusuario').show();
                        }
                    }
                });
            }
            // muestro el boton para liminar el BT si esta relacionado
            if (record.get('srb_idkey') > 0) {
                view.down('#hasbutton').show();
                view.down('#srb_button_uuid').setValue(record.get('srb_button_uuid'));
            }
            view.down('#telefono').originalValue = view.record.get('Telefono');
            view.down('#fechaAlta').setValue(Ext.Date.format(view.record.get('fechaAlta'), 'd/m/Y'))
            view.down('#imeicampo').setValue(view.record.get('Imei'));

            var model = this.getSmartPanicModelModel();
            model.load(view.record.get('Id'), {
                callback: function (recordx) {
                    //view.loadRecord(recordx);
                    view.record = recordx;
                    controller.initForm(view)
                    controller.popularComboUsuarios(view);
                }
            })
            view.down('#NombreCuenta').setValue(view.record.get('Nombre'));
            view.down('#telefono').setValue(view.record.get('Telefono'));
            if (view.metodo == 'edit') {
                view.down('#imeicampo').show();
            }
        } else if (view.metodo == 'preconfig') {
            view.down('#configuraciontab').hide()
            view.down('#configuraciontab').tab.hide()
            view.down('tabpanel').setActiveTab(view.down('#funcionestab'))
            view.down('button[action="save"]').setDisabled(false)
            view.down('#geocercas').tab.hide();
            view.down('#licencia').tab.hide();
            // view.down('#btn-extras-config').hide();
            view.down('#conexion').tab.hide();
            var spconfigStore = Ext.create('Ext.data.Store', {
                model: controller.getM_dealer_spconfigSearchModelModel(),
                remoteFilter: true,
                autoload: false,
                filters: [{
                    property: 'dsp_cdealer',
                    value: view.recordDealer.get('lin_ccodigo')
                }]

            }).load({
                callback: function (records) {
                    if (records.length > 0) {
                        view.down('#msgdata').update(getLocale('Configuracion del dealer'))
                        view.loadRecord(records[0]);
                        view.record = records[0];
                        controller.initForm(view)
                    } else {
                        Ext.Ajax.request({
                            url: view.urlConfigGlobal,
                            scope: this,
                            success: function (resp, operation) {
                                view.down('#msgdata').update(getLocale('Configuracion global'))
                                var metadata = Ext.JSON.decode(resp.responseText);
                                metadata = Ext.JSON.decode(metadata.Config);
                                controller.popularCampos(view, metadata)
                            }
                        });
                    }
                }
            })
        } else {
            view.down('#geocercas').tab.hide();

            var spconfigStore = Ext.create('Ext.data.Store', {
                model: controller.getM_dealer_spconfigSearchModelModel(),
                remoteFilter: true,
                autoload: false,
                filters: [{
                    property: 'dsp_cdealer',
                    value: view.cuenta.get('cue_clinea')
                }]

            }).load({
                callback: function (records) {
                    if (records.length > 0) {
                        var metadata = Ext.JSON.decode(records[0].get('dsp_config'));
                        metadata = metadata.Config ? Ext.JSON.decode(metadata.Config) : metadata;
                        controller.popularCampos(view, metadata)
                        view.recordSearch = view.cuenta
                        controller.popularComboUsuarios(view);
                    } else {
                        Ext.Ajax.request({
                            url: view.urlConfigGlobal,
                            scope: this,
                            success: function (resp, operation) {
                                var metadata = Ext.JSON.decode(resp.responseText);
                                metadata = Ext.JSON.decode(metadata.Config);
                                controller.popularCampos(view, metadata)
                                view.recordSearch = view.cuenta
                                controller.popularComboUsuarios(view);
                            }
                        });
                    }
                }
            })
        }
        var helper = view;
    },

    initForm: function (view) {
        var controller = this;
        var configObj = '';
        //tomo todos los campos del formualrio, esto es para respetar los campos que existen 
        //configObj = view.getForm().getFieldValues(); // si traigo los valores de los campos despues no sabe que pisar y que no.
        var metadataGlobal = null;

        Ext.Ajax.request({
            url: view.urlConfigGlobal,
            async: false, // importante: la necesitamos antes
            success: function (resp) {
                var mg = Ext.JSON.decode(resp.responseText);
                metadataGlobal = Ext.JSON.decode(mg.Config);
            }
        });

        //traigo metadata del dealer  
        var spconfigStore = Ext.create('Ext.data.Store', {
            model: controller.getM_dealer_spconfigSearchModelModel(),
            remoteFilter: true,
            autoload: false,
            filters: [{
                property: 'dsp_cdealer',
                value: view.recordSearch.get('cue_clinea')
            }]

        }).load({
            callback: function (records) {
                if (records.length > 0) {
                    view.down('#msgdata').update(getLocale('Configuracion del dealer'))
                    var metadata = Ext.JSON.decode(records[0].get('dsp_config'));

                    console.log('METADATA DEALER')
                    /*if(metadata) {
                        console.log('Existe metadata, agrego datos dealer.');
                        configObj = controller.mixMetadata(configObj, metadata);
                        controller.popularDesdeDealer(view,configObj) ;
                        view.down('#msgdata').update(view.down('#msgdata').html + ' ' +getLocale('+ dealer'))
                    } else {
                        configObj = metadata
                        controller.popularCampos(view,configObj) ;
                        view.down('#msgdata').update(getLocale('Configuracion de dealer'))
                    }*/
                    if (metadata) {

                        view.down('#msgdata').update(getLocale('Configuracion de dealer'));

                        // 1. Partimos SIEMPRE de la global
                        // 1. Partimos de la global
                        configObj = Ext.clone(metadataGlobal);

                        // 2. Si el dealer tiene metadata...
                        if (metadata && typeof metadata === 'object') {

                            //Mezclar campo por campo
                            Ext.Object.each(metadata, function (key, value) {

                                // Si el dealer trae valor, lo pisa
                                if (value !== undefined && value !== null && value !== '') {
                                    configObj[key] = value;
                                }
                            });

                            // si btnVideoControl NO viene en dealer → usar global
                            if (!metadata.btnVideoControl &&
                                metadataGlobal.btnVideoControl !== undefined &&
                                metadataGlobal.btnVideoControl !== "") {

                                configObj.btnVideoControl = metadataGlobal.btnVideoControl;
                            }
                        }



                        controller.popularCampos(view, configObj);
                    }

                } else {
                    Ext.Ajax.request({
                        url: view.urlConfigGlobal,
                        scope: this,
                        success: function (resp, operation) {
                            var metadata = Ext.JSON.decode(resp.responseText);
                            metadata = Ext.JSON.decode(metadata.Config);
                            if (metadata != '') {
                                console.log('METADATA GLOBAL')
                                if (configObj) {
                                    configObj = controller.mixMetadata(configObj, metadata)
                                    view.down('#msgdata').update(view.down('#msgdata').html + ' ' + getLocale('+ global'))
                                } else {
                                    configObj = metadata
                                    view.down('#msgdata').update(getLocale('Configuracion de global'))
                                }
                            }
                            controller.popularCampos(view, configObj)
                            controller.setDefaultValues(view)
                        }
                    });
                }

            }
        });
        if (view.record.get('Config') && view.record.get('Config') != '') {
            configObj = Ext.JSON.decode(view.record.get('Config'));
            controller.popularCampos(view, configObj)
            view.down('#msgdata').update(getLocale('Configuracion propia del smartpanics'));

        }
    },

    setDefaultValues: function (view) {
        if (view.down('#funcbtnBluetooth').getValue() == '' || view.down('#funcbtnBluetooth').getValue() == 0) {
            view.down('#funcbtnBluetooth').setValue(0)
        }
    },

    mixMetadata: function (metadataPrincipal, metdataAgregada) {
        console.log('MIX METADATA');
        console.log('metadataPersonalizada', metadataPrincipal);
        console.log('metadataDealer', metdataAgregada);
        if (metadataPrincipal == "") {
            console.log("sin metadata personalizada")
            var emptyObjject = {};
            metadataPrincipal = emptyObjject;
        }
        for (var keyMetdataAgregada in metdataAgregada) {
            //si tiene el campo la metadata principal
            if (metadataPrincipal.hasOwnProperty(keyMetdataAgregada)) {
                if ((metadataPrincipal[keyMetdataAgregada] === '' || metadataPrincipal[keyMetdataAgregada] == null)) { // si tiene valor 0 tengo que guarda igual && parseInt(metadataPrincipal[keyMetdataAgregada]) != 0
                    //si el campo de la metadataprincipal no tiene ningun valor
                    metadataPrincipal[keyMetdataAgregada] = metdataAgregada[keyMetdataAgregada]
                }
            } else {
                metadataPrincipal[keyMetdataAgregada] = metdataAgregada[keyMetdataAgregada]
            }
        }
        console.log('return', metadataPrincipal)
        return metadataPrincipal;
    },
    popularDesdeDealer: function (view, metadata) {
        if (metadata) {
            view.down('#btnHomePanico').setValue(metadata.btnHomePanico);
            view.down('#btnHomePanicoTipo').setValue(metadata.btnHomePanicoTipo);
            view.down('#btnHomePanicoNombre').setValue(metadata.btnHomePanicoNombre);
            view.down('#btnHomePanicoColor').setValue(metadata.btnHomePanicoColor);
            view.down('#CIDESOS').setValue(metadata.CIDESOS);
            view.down('#CIDRSOS').setValue(metadata.CIDRSOS);
            view.down('#btnHomePanicoTelefono').setValue(metadata.btnHomePanicoTelefono);
            view.down('#btnHomePanicoUrl').setValue(metadata.btnHomePanicoUrl);
            view.down('#btnHomePanicoActividad').setValue(metadata.btnHomePanicoActividad);
            view.down('#btnHomeFuego').setValue(metadata.btnHomeFuego);
            view.down('#btnHomeFuegoTipo').setValue(metadata.btnHomeFuegoTipo);
            view.down('#BTNFIRE').setValue(metadata.BTNFIRE);
            view.down('#btnHomeFuegoColor').setValue(metadata.btnHomeFuegoColor);
            view.down('#CIDEFIRE').setValue(metadata.CIDEFIRE);
            view.down('#CIDRFIRE').setValue(metadata.CIDRFIRE);
            view.down('#btnHomeFuegoTelefono').setValue(metadata.btnHomeFuegoTelefono);
            view.down('#btnHomeFuegoUrl').setValue(metadata.btnHomeFuegoUrl);
            view.down('#btnHomeFuegoActividad').setValue(metadata.btnHomeFuegoActividad);

            view.down('#btnHomeAsistencia').setValue(metadata.btnHomeAsistencia);
            view.down('#btnHomeAsistenciaTipo').setValue(metadata.btnHomeAsistenciaTipo);
            view.down('#BTNASSIST').setValue(metadata.BTNASSIST);
            view.down('#btnHomeAsistenciaColor').setValue(metadata.btnHomeAsistenciaColor);
            view.down('#CIDEASSIST').setValue(metadata.CIDEASSIST);
            view.down('#CIDRASSIST').setValue(metadata.CIDRASSIST);
            view.down('#btnHomeAsistenciaTelefono').setValue(metadata.btnHomeAsistenciaTelefono);
            view.down('#btnHomeAsistenciaUrl').setValue(metadata.btnHomeAsistenciaUrl);
            view.down('#btnHomeAsistenciaActividad').setValue(metadata.btnHomeAsistenciaActividad);
            view.down('#btnHomeEnCamino').setValue(metadata.btnHomeEnCamino);
            view.down('#btnHomeEnCaminoNombre').setValue(metadata.btnHomeEnCaminoNombre);
            view.down('#btnHomeEnCaminoColor').setValue(metadata.btnHomeEnCaminoColor);
            view.down('#btnEstoyAqui').setValue(metadata.btnEstoyAqui);
            view.down('#btnHomeEstoyAquiNombre').setValue(metadata.btnHomeEstoyAquiNombre);
            view.down('#btnHomeEstoyAquiColor').setValue(metadata.btnHomeEstoyAquiColor);
            view.down('#btnExtras').setValue(metadata.btnExtras);
            view.down('#btnExtrasNombre').setValue(metadata.btnExtrasNombre);
            view.down('#btnEstoyAqui').setValue(metadata.btnEstoyAqui);
            view.down('#btnHomeEstoyAquiNombre').setValue(metadata.btnHomeEstoyAquiNombre);
            view.down('#btnHomeEstoyAquiColor').setValue(metadata.btnHomeEstoyAquiColor);
            view.down('#modoVecinal').setValue(metadata.modoVecinal);
            view.down('#funcMisCuentas').setValue(metadata.funcMisCuentas);
            view.down('#funcbtnBluetooth').setValue(metadata.funcbtnBluetooth);
            view.down('#btnRequestService').setValue(metadata.btnRequestService);
            view.down('#btnRequestServiceNombre').setValue(metadata.btnRequestServiceNombre);
            view.down('#btnRequestService').setValue(metadata.btnRequestService);
            view.down('#btnRequestServiceNombre').setValue(metadata.btnRequestServiceNombre);
            if (view.down('#btnChat'))
                view.down('#btnChat').setValue(metadata.btnChat);
            view.down('#btnChatNombre').setValue(metadata.btnChatNombre);
            if (view.down('#btnVideoControl'))
                view.down('#btnVideoControl').setValue(metadata.btnVideoControl);
            view.down('#btnVideoControlNombre').setValue(metadata.btnVideoControlNombre);
            view.down('#btnIdioma').setValue(metadata.btnIdioma);
            view.down('#btnSugerir').setValue(metadata.btnSugerir);
            view.down('#funcMisCuentas').setValue(metadata.funcMisCuentas);
            view.down('#funcMisMoviles').setValue(metadata.funcMisMoviles);
            view.down('#funcMisCamaras').setValue(metadata.funcMisCamaras);
            view.down('#funcMiGrupo').setValue(metadata.funcMiGrupo);
            view.down('#funcMisComandos').setValue(metadata.funcMisComandos);
            if (!view.record.get('Config') || view.record.get('Config') == '')
                if (metadata["extraFieldConfig"]) {
                    view.down('#camposExtra').add(Ext.JSON.decode(metadata["extraFieldConfig"]));
                    //view.doLayout();
                }
        }
        /*
        btnChat
        btnChatNombre
        btnIdioma
        btnSugerir
        
        funcbtnBluetooth
        */
    },


    popularCampos: function (view, metadata) {
        var form = view.getForm();

        // Campos extra
        if (metadata["extraFieldConfig"]) {
            view.down('#camposExtra').add(Ext.JSON.decode(metadata["extraFieldConfig"]));
        }

        Ext.Object.each(metadata, function (key, value) {
            var field = form.findField(key) ? form.findField(key) : view.down('#' + key);

            if (!field) return;

            // Caso especial remoteDesktopURLs
            if (key === 'remoteDesktopURLs') {
                if (form.findField('remoteUrl')) {
                    form.findField('remoteUrl').setValue(value[0].remoteUrl);
                }
                return;
            }

            // *** REGLA FUNDAMENTAL ***
            // NO pisar valores si:
            // - el form ya tiene un valor
            // - y lo que viene en metadata es vacío
            var currentValue = field.getValue();

            var isMetadataEmpty =
                value === null ||
                value === undefined ||
                value === "" ||
                (Ext.isArray(value) && value.length === 0);

            if (currentValue && isMetadataEmpty) {
                // No pisamos lo que ya está
                // console.log("NO piso", key, "-> metadata venía vacío");
                return;
            }

            // Si el value es válido, asignar
            field.setValue(value);
        });

        view.ajaxRunning = false;
    },

    popularComboUsuarios: function (view) {
        var controller = this;
        var usauriosStore = Ext.create('Ext.data.Store', {
            model: controller.getUserByCuentaWithRangoModelModel(),
            remoteFilter: true,
            autoload: false,
            filters: [{
                property: 'dealer',
                value: view.recordSearch.get('cue_clinea')

            }, {
                property: 'cuenta',
                value: view.recordSearch.get('cue_ncuenta')

            }, {
                property: 'udw_tipo',
                value: 2

            }]
        });
    },
    saveObject: function (button, event, options) {
        var view = button.up('smartpanicform');
        var emailAviso = view.down('#emailaviso');
        var myform = view.getForm();
        var win = button.up('window');
        var controller = this;
        if (myform.isValid()) {
            button.disable();

            // var selection = view.getSelectionModel().getSelection();
            var model = this.getSmartPanicModelModel();
            var telefonoModel = this.getTelefonoSearchModelModel();
            var t = this;

            if (view.metodo == 'preconfig') {
                var record = view.record;
            } else if (view.metodo != 'edit') {
                var record = model.create({
                    'CuentaId': view.cuenta.get('cue_iid')
                });
            } else {
                var record = view.record;
            }
            var configObj = view.getForm().getFieldValues();

            //evaluo que no se reptita ningun formato o restauracion en ningun boton  
            var camposEvaluar = []
            camposEvaluar.push('CIDEASSIST')
            camposEvaluar.push('CIDEFIRE')
            camposEvaluar.push('CIDESOS')
            camposEvaluar.push('CIDRASSIST')
            camposEvaluar.push('CIDRFIRE')
            camposEvaluar.push('CIDRSOS')
            var isUsed = false;
            for (var key in camposEvaluar) {
                if (configObj.hasOwnProperty(camposEvaluar[key])) {
                    //console.log(key + " -> " + configObj[camposEvaluar[key]]);
                    if (configObj[camposEvaluar[key]] != '') {

                        for (var keyObj in camposEvaluar) {
                            if (configObj.hasOwnProperty(camposEvaluar[keyObj])) {

                                if (configObj[camposEvaluar[key]] == configObj[camposEvaluar[keyObj]] &&
                                    camposEvaluar[key] != camposEvaluar[keyObj] &&
                                    configObj[camposEvaluar[keyObj]] != '') {

                                    isUsed = true;
                                    console.log(configObj[camposEvaluar[key]] + " -> " + configObj[camposEvaluar[keyObj]]);
                                }
                            }
                        }
                    }
                }
            }

            if (isUsed) {
                notify('Formatos o Restauraciones duplicados.')
                button.setDisabled(false);
                return false
            }
            //meto en array el ip2
            configObj.remoteDesktopURLs = []
            configObj.remoteDesktopURLs.push({
                remoteUrl: configObj.remoteUrl
            })
            delete configObj.remoteUrl
            if (view.metodo == 'preconfig') {
                if (!record) {
                    record = controller.getM_dealer_spconfigModelModel().create({
                        dsp_cdealer: view.recordDealer.get('lin_ccodigo')
                    })
                }


                record.setConfig({
                    proxy: controller.getM_dealer_spconfigModelModel().getProxy()
                });
                record.set('dsp_config', Ext.encode(configObj));
                record.save({
                    callback: function (rec) {
                        view.caller.fireEvent('smartpanicchange', rec, view.caller);
                        win.close();
                    }
                })
            } else {
                myform.updateRecord(record);

                if (record.get("awccUserId") === null || isNaN(record.get("awccUserId"))) {
                    record.set("awccUserId", 0);
                }
                record.set('Config', Ext.encode(configObj));

                record.setConfig({
                    proxy: model.getProxy()
                });
                //fuerzo el cambio en record por que los campos disabled los ignora el updateRecord
                if (record.get('Imei') != myform.findField('Imei').value) {
                    record.set('Imei', myform.findField('Imei').value)
                }

                var imeiValue = record.get('Imei');
                if (!imeiValue || imeiValue.trim() === '') {
                    record.set('Modelo', '');
                    record.set('Marca', '');
                    record.set('Version', '');
                    record.set('Tipo', '');
                    record.set('fechaAlta', '');
                    record.set('AppVersion', '');
                }

                if (isNaN(record.id)) {
                    record.id = 0;
                    record.data.Id = 0;
                }
                record.modified = record.data;



                record.save({
                    callback: function (rec) {
                        if (view.metodo != 'edit') {
                            var parametros = 'cuentaid=' + view.cuenta.get('cue_iid') + '&smartpanicid=' + rec.id;
                            Ext.Ajax.request({
                                url: '/rest/search/smartpanicasignarcuenta',
                                method: 'GET',
                                params: parametros,
                                success: function (resp, operation) {
                                    notify('Los datos se guardaron con éxito');
                                    var caller = view.caller;

                                    if (emailAviso.getValue()) {
                                        //envio mail
                                        var DESKTOPEXTERNALURL = getParametro('DESKTOPEXTERNALURL');
                                        var groupenabled = configObj.groupEnabled ? configObj.groupEnabled : 0;
                                        var url = DESKTOPEXTERNALURL + '/' + rec.get('Nombre') + '/' + rec.get('Telefono') + '/' + rec.get('CuentaId') + '/' + groupenabled;
                                        var qr = DESKTOPEXTERNALURL + '/handler/QrCodeHandler?Oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87&showLink=true&title=' + getLocale('Configuracion del servicio') + '&code=/' + url + '/';
                                        //8CDCD4D5-8284-48C0-B75A-4D3AAF379C87
                                        // me fijo si hay plantilla _AT
                                        Ext.Ajax.request({
                                            url: '/Rest/t_plantillas_sms/',
                                            params: { filter: '[{"property":"pls_ccodigo:LIKE","value":"_AT"}]' },
                                            method: 'GET',
                                            callback: function (options, success, response) {
                                                var body = getLocale('Bienvenido. Se le ha asignado la cuenta: <<CTACODIGO>> <<CTANOMBRE>> <BR>Para empezar a utilizar el servicio de SmartPanics presione aqui:<BR> <<QRLINK>> <BR><BR>o sino realice la lectura de:<BR> <<QRCODE>>');
                                                var name_emailalerta = getLocale('Aviso de alta temprana.');
                                                if (response.responseText != '') {
                                                    var _json = Ext.JSON.decode(response.responseText, true);
                                                    if (_json && _json.total > 0) {
                                                        body = _json.rows[0].pls_mplantilla;
                                                        name_emailalerta = _json.rows[0].pls_cdescripcion;
                                                    }
                                                }
                                                body = body
                                                    .replace('<<CTACODIGO>>', view.cuenta.get('cue_clinea') + '-' + view.cuenta.get('cue_ncuenta'))
                                                    .replace('<<CTANOMBRE>>', view.cuenta.get('cue_cnombre'))
                                                    .replace(/\[\[LF\]\]/g, '<BR>')
                                                    .replace('<<QRLINK>>', '<a href="http://softdemonitoreo.com/spapps/index.html?code=/' + url + '">http://softdemonitoreo.com/spapps/index.html?code=/' + url + '</a>')
                                                    .replace('<<QRCODE>>', '<a href="' + qr + '">' + qr + '</a>')
                                                var smartMailProgramModel = controller.getSmartMailProgramModelModel().create({
                                                    Name: name_emailalerta,
                                                    From: getParametro('MAILSENDERNAME') + " <" + getParametro('MAILSENDER') + ">",
                                                    Body: body,
                                                    Query: 'select \'' + emailAviso.getValue() + '\' as Email',
                                                    DateStart: new Date(),
                                                    TransportType: 'MAIL',
                                                    Status: 'A'
                                                });
                                                smartMailProgramModel.set("Id",0);
                                                smartMailProgramModel.save({
                                                    callback: function () {
                                                        notify('Se envio por mail de aviso de alta temprana.');
                                                        win.close();
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    caller.fireEvent('smartpanicchange', rec, caller);
                                    win.close();
                                }
                            });
                        } else {
                            var caller = view.caller;
                            caller.fireEvent('smartpanicchange', record, caller);
                            win.close();
                        }
                    }
                });
            }
        }
    },
    onCancelClick: function (button, event, options) {
        var myWin = button.up('window');
        myWin.close();
    }
});

