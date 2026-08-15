Ext.define('WebRemoto.controller.AtencionEventoController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SmartPanicSearchModel', 'ModuleModel', 'VehicleSearchModel', 'SoftguardCuentaModel', 'EventImagesSearchModel', 'EventosTiemLineModel', 'p_GpsSpModel', 'AtencionEventoTablasPlantillasSearchModel'],
    requires: [
        'Common.view.EventosPendientesPosterioresGridView'
    ],
    views: ['AtencionEventoView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'atencioneventoview': {
                afterrender: this.initView,
                beforerender: this.beforeInit,
                refreshTimeline: this.onRefreshTimeline,
                click: this.onClickPanel,
                forceEvaluateEvent: this.onForceEvaluateEvent,
                smartpanicsSelected: this.onSmartpanicsSelected,
                beforedestroy: this.beforeDestroy,
                //refresh: this.initView
            },
            'atencioneventoview button[action=espera]': {
                click: this.onEsperaClick
            },
            'atencioneventoview button[action=esperaIlimitado]': {
                click: this.onEsperaIlimitadoClick
            },
            'atencioneventoview button[action=procesa]': {
                click: this.onProcesarClick
            },
            'atencioneventoview button[action=supervision]': {
                click: this.onSupervisionClick
            },
            'atencioneventoview button[action=pendiente]': {
                click: this.onPendienteClick
            },
            'atencioneventoview #procesarmultiple': {
                click: this.onProcesarMultipleClick
            },
            /* 'atencioneventoview button[action=procesa-todos]' : {
                 click : this.onProcesarTodosClick
             },*/
            /*  'atencioneventoview button[action=agregar-observacion]' : {
                  click : this.onAgregarObservacionClick
              },*/
            'atencioneventoview button[action=guardarnota]': {
                click: this.onGuardarNotaClick
            },
            'atencioneventoview button[action=llamada]': {
                click: this.onLlamadaClick
            },
            'atencioneventoview button[action=estado]': {
                click: this.onEstadoClick
            },
            'atencioneventoview button[action=mapguard]': {
                click: this.onMapguardClick
            },
            'atencioneventoview button[action=servtec]': {
                click: this.onServtecClick
            },
            'atencioneventoview button[action=autoridad]': {
                click: this.onAutoridadClick
            },
            'atencioneventoview #stopeventosp': {
                click: this.onEnviarStopSpClick
            },
            'atencioneventoview #observaciones': {
                select: this.onSelectPredefinidas
            },
            'atencioneventoview #imagePanel': {
                hascontent: this.onImagePanelHasContet,
                aftermaximize: this.onImagePanelAfterMaximize,
                windowclose: this.onWindowClose
            },
            'atencioneventoview button[action=cerrar]': {
                click: this.onCerrarClick
            },
            'atencioneventoview #enviarsms': {
                click: this.onEnviarSmsClick
            },
            'atencioneventoview #enviarwhatsapp': {
                click: this.onEnviarWhatsAppClick
            },
            'atencioneventoview #spchat': {
                click: this.onSpChatClick
            },
            'atencioneventoview #eventosnuevos': {
                click: this.onEventosnuevosClick
            },
            'atencioneventoview #predefinidas': {
                change: this.onChangePredefinidasClick
            },
            'atencioneventoview #posponercierre': {
                click: this.onPosponerCierreClick
            },
            'atencioneventoview #enviaremail': {
                click: this.onEnviarEmailClick
            },
            'atencioneventoview #enviarpush': {
                click: this.onEnviarPushClick
            },
            'atencioneventoview #imgeventosposteriores': {
                click: this.onImgeventosPosterioresClick
            },
            'atencioneventoview #comandos': {
                click: this.onComandosClick
            }


        });
    }, // cierro init

    getRecepcionPocConfig: function (view) {
        var poc = {};
        if (typeof window !== 'undefined' && window.__RECEPCION_POC_CONFIG__) {
            Ext.apply(poc, window.__RECEPCION_POC_CONFIG__);
        }
        if (view && view.recepcionPocConfig) {
            Ext.apply(poc, view.recepcionPocConfig);
        }
        return poc;
    },

    logRecepcionPoc: function (poc, message) {
        if (!poc || poc.log === false) {
            return;
        }
        var logger = (poc.logger && typeof poc.logger.log === 'function') ? poc.logger : console;
        if (logger && typeof logger.log === 'function') {
            logger.log('[RecepcionPOC]', message);
        }
    },

    runRecepcionPocStage: function (name, poc, view, fn) {
        if (!fn || typeof fn !== 'function') {
            return true;
        }

        poc = poc || {};

        if (poc.breakBefore === name) {
            this.logRecepcionPoc(poc, Ext.String.format('Pausa solicitada antes de la etapa "{0}"', name));
            return false;
        }

        if (poc.skipStages && Ext.Array.contains(poc.skipStages, name)) {
            this.logRecepcionPoc(poc, Ext.String.format('Saltando etapa "{0}" por configuración POC', name));
            return true;
        }

        var me = this;
        var execute = function () {
            try {
                me.logRecepcionPoc(poc, Ext.String.format('Ejecutando etapa "{0}"', name));
                fn();
            } catch (error) {
                console.error('[RecepcionPOC] error en etapa "' + name + '"', error);
            }
        };

        if (poc.defer && poc.defer[name]) {
            Ext.Function.defer(execute, poc.defer[name]);
        } else {
            execute();
        }

        if (poc.breakAfter === name) {
            this.logRecepcionPoc(poc, Ext.String.format('Pausa solicitada después de la etapa "{0}"', name));
            return false;
        }

        return true;
    },

    beforeDestroy: function (view) {
        Ext.Array.each(view.windowsHijas, function (v) {
            if (v) {
                v.close()
            }
        })
    },


    onProcesarMultipleClick: function (btn) {
        var view = btn.up('atencioneventoview')
        var controller = this;

        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordWebremoto = storeSecurity.findRecord('KeyReference', 'WebRemoto')
        if (recordWebremoto && recordWebremoto.get('Available') == true) {
            var _security = recordWebremoto.get('_Security');
            if (_security && _security.procesarporlote && _security.procesarporlote == "true") {
                controller.onProcesarLotesClick(btn)
            } else if (_security && _security.procesartodos && _security.procesartodos == "true") {
                controller.onProcesarTodosClick(btn)
            }
            //lo nuevo
            else if (_security && _security.procesarporloteproceso && _security.procesarporloteproceso == "true") {
                controller.onProcesarLotesClick(btn)
            }
            else if (_security && _security.procesartodosproceso && _security.procesartodosproceso == "true") {
                controller.onProcesarTodosClick(btn)
            }
        }
    },

    onSmartpanicsSelected: function (records, view) {
        var controller = this;
        var myWindow = Ext.widget('window', {
            title: 'Enviar mensaje',
            height: 400,
            width: 400,
            closeAction: 'destroy',
            modal: true,
            listeners: {
                afterrender: function (win, eOpts) {
                    //-----------------Se agregan plantillas manuales------------------
                    var comboPlantillas = myWindow.down('#plantillaNotificaciones');
                    var storePlantillas = Ext.create('Ext.data.Store', {
                        model: controller.getAtencionEventoTablasPlantillasSearchModelModel(),
                        remoteFilter: true,
                        autoload: false,
                        remoteSort: true,
                        sorters: [
                            {
                                property: 'pls_cdescripcion',
                                direction: 'ASC'
                            }
                        ],
                        filters: [
                            {
                                property: 'pls_iTipo:ININT',
                                value: '1'
                            }
                        ]
                    });
                    comboPlantillas.bindStore(storePlantillas);
                    storePlantillas.load();
                    //-----------------------------------------
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Asunto',
                    itemId: 'asunto',
                    width: '100%',
                    labelWidth: 50
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Mensaje'
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Aplicar plantilla',
                    itemId: 'plantillaNotificaciones',
                    emptyText: getLocale('Seleccione'),
                    labelWidth: 80,
                    displayField: 'pls_cdescripcion',
                    valueField: 'Id',
                    anchor: '100%',
                    queryMode: 'local',
                    listeners: {
                        change: function (combo, newValue, oldValue, eOpts) {

                            var store = combo.getStore();

                            var index = store.find('Id', newValue);
                            var item = store.getAt(index);


                            var pls_cdescripcion = item.data.pls_mplantilla;
                            pls_cdescripcion = pls_cdescripcion.replace('<<CTADEALER>>', view.record.data.cue_clinea);
                            pls_cdescripcion = pls_cdescripcion.replace('<<CTACODIGO>>', view.record.data.cue_ncuenta);
                            pls_cdescripcion = pls_cdescripcion.replace('<<CTANOMBRE>>', view.record.data.cue_cnombre);
                            pls_cdescripcion = pls_cdescripcion.replace('<<CTADIR>>', view.record.data.cue_ccalle);
                            pls_cdescripcion = pls_cdescripcion.replace('<<EVENTODESC>>', view.record.data._eventDescripcion);
                            var date = new Date(Date.parse(view.record.data.rec_tfechahora));

                            var dateStr = ("00" + date.getDate()).slice(-2) + "/"
                                + ("00" + (date.getMonth() + 1)).slice(-2) + "/"
                                + date.getFullYear();
                            var horaStr = ("00" + date.getHours()).slice(-2) + ":"
                                + ("00" + date.getMinutes()).slice(-2) + ":"
                                + ("00" + date.getSeconds()).slice(-2);

                            pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOFECHA>>', dateStr);
                            pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOHORA>>', horaStr);
                            pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOCODZONA>>', view.record.data.zon_ccodigo);

                            pls_cdescripcion = pls_cdescripcion.replace('<<EVENTODESZONA>>', view.record.data._zon_cdescripcion);
                            pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOCODUSUARIO>>', view.record.data.rec_iusuario);
                            pls_cdescripcion = pls_cdescripcion.replace('<<EVENTONOMUSUARIO>>', view.record.data._usu_cnombre);
                            pls_cdescripcion = pls_cdescripcion.replace('<<DEALERNOMBRE>>', view.record.data.cue_cnombre);

                            myWindow.down('#mensaje').setValue(pls_cdescripcion);

                        }
                    }

                }, {
                    xtype: 'htmleditor',
                    fieldLabel: '',
                    itemId: 'mensaje',
                    width: '100%',
                    height: 250
                    /**
                     * HAY QUE METER EL CODIGO DEL COMBO AQUI, EL ONCHANGE Y EL BINDING DE TAGS
                     * 
                     */
                }
            ], tbar: [
                {
                    text: 'Enviar',
                    iconCls: 'icon-email-go',
                    listeners: {
                        click: function () {
                            var Ids = [];
                            if (records && records.length > 0) {
                                Ext.Array.each(records, function (rec) {
                                    if (rec && typeof rec.get === 'function') {
                                        Ids.push(rec.get('Id'));
                                    } else if (records[0] && records[0].data && records[0].data.Id) {
                                        // fallback si vino como un raw record sin .get()
                                        Ids.push(records[0].data.Id);
                                    }
                                });
                            }

                            Ext.Ajax.request({
                                url: '/rest/search/SmartpanicSendMessage',
                                method: 'GET',
                                params: {
                                    ids: Ids.join(','),
                                    subject: myWindow.down('#asunto').getValue(),
                                    body: myWindow.down('#mensaje').getValue(),
                                    fromId: _UserData.udw_idKey
                                },
                                success: function (resp, operation) {
                                    notify('El mensaje fue enviado')
                                    myWindow.close()
                                }
                            })
                        }
                    }
                }
            ]
        });


        myWindow.show();
    },

    onEnviarPushClick: function (btn) {
        var view = btn.up('atencioneventoview');
        var myWindow = Ext.widget('window', {
            title: 'Selector de smartpanics',
            height: 400,
            width: 900,
            closeAction: 'destroy',
            modal: true,
            items: [{
                xtype: 'smartpanicshelperview',
                //  eventSelected: view.eventosSeleccionados,
                caller: view,
                filter: [{
                    property: 'cue_iid',
                    value: view.record.get('rec_iidcuenta')
                }],
                simpleSelect: false,
                closeAction: 'destroy',
                limitEventSelect: 50,
                record: view.record,
                toEvent: 'smartpanicsSelected'
            }],
            layout: 'fit'
        }).show();

        myWindow.on("beforeclose", function (com, eOpts) {
            myWindow.down('grid').destroy()
            myWindow.down('grid').destroy()
        });
    },

    onForceEvaluateEvent: function (view) {
        view.evaluarEvento(view)
        view.up().hide()//ESTO OCULTA ATENCIONEVENTOVIEW
    },

    onPosponerCierreClick: function (btn) {
        var view = btn.up('atencioneventoview');
        var record = view.record

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre'),
            closeAction: 'hide',
            translate: false,
            width: 600,
            height: 500,
            border: true,
            modal: false,
            view: view,
            items: [
                {
                    xtype: 'posponercierreview',
                    caller: view,
                    record: record
                }
            ]
        });
        win.show();
    },

    onRefreshTimeline: function (view) {
        var record = view.record;
        view.down('eventotimelinefullgridview').fireEvent('objectchanged', { record: record, view: view.down('eventotimelinefullgridview') });
    },

    onChangePredefinidasClick: function (combo, newvalue, oldvalue) {
        var view = combo.up('atencioneventoview');
        var textarea = view.down('#obsfield');
        //  var predefinida = view.down('#predefinidas').getValue();

        textarea.setValue(newvalue);
    },

    playVoice: function (view, record, controller) {
        if (!controller.application.MUTE) {
            var text = '';
            var baseurl = '/rest/request/get/?http://translate.google.com/translate_tts?tl=' + locale + '&q=';
            var target = view.down('#sound');
            var separador = '';

            view.audio = new Audio();
            //view.mystore.data.items
            var data = records;
            var d = 0;
            var dLen = data.length - 1;


            if (text != '') {
                separador = ' - ';
            }

            var rsonido = record.get('cod_cSonido');
            if (!rsonido) {
                rsonido = "prioridad" + record.get('rec_iprioridad') + '_' + locale + ".mp3";
            }
            if (view.DSSSONIDO == 0 && record.get('rec_iprioridad') != 0) {
                var source = document.createElement('source');
                source.type = 'audio/mp3';
                source.src = '/gallery/codAlarmSound/' + rsonido;
                view.audio.appendChild(source);
                view.audio.play();
            } else {
                text = text + separador + record.get('cod_cdescripcion');
            }

            if (text != '' && view.DSSSONIDO != 0) {
                target.setSrc(baseurl + text);
            }
        }
    },

    onClickPanel: function (btn) {
        var view = btn.up('atencioneventoview')

        Ext.TaskManager.stop(view.taskSound);
    },

    beforeInit: function (view) {
        Ext.suspendLayouts();
    },

    initView: function (view) {
        view.windowsHijas = [];
        //this.application.CARGANDOEVENTO lo crea eventospendientes
        if (this.application.CARGANDOEVENTO) {
            this.application.CARGANDOEVENTO.hide()
            delete this.application.CARGANDOEVENTO
        }

        var record = view.record;
        var rec_iid = record.get('rec_iid');
        var controller = this;

        if (record.get('_situacioncuenta') == 'Prueba' || record.get('_situacioncuenta') == 'Prueba x Zonas') {
            view.down('#avisoestadocuenta').setValue(getLocale('Atencion - cuenta en modo ' + record.get('_situacioncuenta')))
            view.down('#avisoestadocuenta').show();
        }

        var storePanics = Ext.create('Ext.data.Store', {
            model: this.getSmartPanicSearchModelModel(),
            pageSize: 500,
            remoteFilter: true,
            filters: [
                {
                    property: 'Telefono',
                    value: record.get('SPTelefono')
                }
            ]
        });

        storePanics.load({
            callback: function (records, operation, success) {
                console.log('Record Smartrack', records)
                var token = records[0].data.pushToken
                view.record.set('token', token)
            }
        });


        if (view.atencionAutomatica == true) {
            view.taskSound = Ext.TaskManager.start({
                args: [view, record, this],
                run: this.playVoice,
                interval: 5000
            });
        }
        var module = this.getModuleModelModel().create({
            profile: 3
        });

        view.module = module;

        if (view.hideBtnPendiente) {
            view.down('#pendiente').hide()
        }

        //le sumo 1 segundo para que traiga solo posteriores
        var fecha = new Date(record.get('rec_isoFechaHora')).setSeconds(record.get('rec_isoFechaHora').getSeconds() + 1);

        var ultimoEventoReciid;

        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';

        if (record.get('rec_cobservaciones') && record.get('rec_cobservaciones').match(/\[SmartPanics\]|\[VigiControl\]/g)) {
            view.down('eventoformview').down('#comment').show()
        }


        // me fijo si tengo que mostrar el boton de eseperailimitada
        var ESPERAILIMITADA = getParametro('ESPERAILIMITADA');
        var btnEsperaIlimitada = view.down('#esperaIlimitado');

        if (ESPERAILIMITADA == 1 && btnEsperaIlimitada) {
            btnEsperaIlimitada.show();
        }

        var newTabUltimosEventos = Ext.widget('eventospendientesposteriorestrgridview', {
            itemId: 'ultimoseventos',
            title: 'Eventos posteriores',
            showEstadosFilter: false,
            interval: 10000,
            pageSize: 50,
            estados: [0, 1, 2, 3, 4, 5, 6, 7, 9],
            showMaximizer: false,
            hiddenDealerFilter: true,
            evaluarNuevosEventosYEnviarAlFrente: true,
            record: record,
            FechaDesde: Ext.Date.format(new Date(fecha), 'Y-m-d\\TH:i:s'),
            condiciones: view.condiciones,
            nombreEvento: nombreEvento,
            noResaltarEventosMismaCuenta: true,
            sorters: [
                {
                    property: 'rec_tfechahora',
                    direction: 'ASC'
                }
            ],
            /* listeners: {
                 storeLoaded: function (viewUltimoEvento,store) {
                                                         
                     if(!viewUltimoEvento.ultimosEventosCantidad) {
                         viewUltimoEvento.ultimosEventosCantidad=0;
                     }
                     
                     if(store.data.length > viewUltimoEvento.ultimosEventosCantidad) {
                         viewUltimoEvento.ultimosEventosCantidad = store.data.length;                                        
                     
                         //notify('Se encontraron eventos posteriores.')
                        // this.up('tabpanel').setActiveTab(this);
                         var btnEventoNuevo =  view.down('eventoformview').down('#eventosnuevos');
                         if(viewUltimoEvento.ultimosEventosCantidad>1) {
                             btnEventoNuevo.setText(getLocale('Hay ')+viewUltimoEvento.ultimosEventosCantidad+' '+getLocale(' eventos posteriores.'));
                         } else {
                             btnEventoNuevo.setText(getLocale('Hay 1 evento posterior.')); 
                         }
                         
                         //verifico si el ultimo evento de la lista es igual al almacenado en la variable ultimoEventoReciid
                         //en caso negativo lo considero como nuevo evento para mostrar en un notify                        
                         if(store.data.items[store.data.items.length-1].get('rec_iid') != ultimoEventoReciid) {
                            
                              Ext.create('widget.uxNotification', {
                                 corner: 'br',
                                 manager: Ext.getCmp('viewport'),
                                 cls: 'ux-notification-light',
                                 iconCls: 'ux-notification-icon-information',
                                 closable: true,
                                 title: 'Ultimo Evento',                        		
                                 slideInDelay: 800,
                                 slideDownDelay: 1500,
                                 autoDestroyDelay: 4000,
                                 slideInAnimation: 'elasticIn',
                                 slideDownAnimation: 'elasticIn',
                                 height:300,
                                 width:300,                                
                                 padding:0,
                                 items: [
                                          {
                                             xtype:'eventoformverticalview',
                                             record: store.data.items[store.data.items.length-1],
                                             eventoformverticalview: true,
                                             title: '',
                                             closable: false,
                                         }                                    
                                     ]
                                 
                             })
    
                             ultimoEventoReciid = store.data.items[0].get('rec_iid')
                         }
     
                         btnEventoNuevo.show()
                         viewUltimoEvento.down('toolbar').hide();
                     }
                 },
                 added: function () {
                     this.fireEvent('renderManual', this)
                 }
             }*/
        });

        //newTabUltimosEventos.POSTERIORES = 'POSTERIOIRES';
        //newTabUltimosEventos.on( 'added', function() {
        //this.POSTERIORES = 'POSTERIOIRES'
        //this.fireEvent( 'renderManual', this )
        //});
        newTabUltimosEventos.on('storeLoaded', function (viewUltimoEvento, store) {
            if (!viewUltimoEvento.ultimosEventosCantidad) {
                viewUltimoEvento.ultimosEventosCantidad = 0;
            }

            if (store.data.length > viewUltimoEvento.ultimosEventosCantidad) {
                viewUltimoEvento.ultimosEventosCantidad = store.data.length;

                //notify('Se encontraron eventos posteriores.')
                // this.up('tabpanel').setActiveTab(this);
                var btnEventoNuevo = view.down('eventoformview').down('#eventosnuevos');
                if (viewUltimoEvento.ultimosEventosCantidad > 1) {
                    btnEventoNuevo.setText(getLocale('Hay ') + viewUltimoEvento.ultimosEventosCantidad + ' ' + getLocale(' eventos posteriores.'));
                } else {
                    btnEventoNuevo.setText(getLocale('Hay 1 evento posterior.'));
                }

                //verifico si el ultimo evento de la lista es igual al almacenado en la variable ultimoEventoReciid
                //en caso negativo lo considero como nuevo evento para mostrar en un notify                        
                if (store.data.items[store.data.items.length - 1].get('rec_iid') != ultimoEventoReciid) {

                    Ext.create('widget.uxNotification', {
                        corner: 'br',
                        manager: Ext.getCmp('viewport'),
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        closable: true,
                        title: 'Ultimo Evento',
                        slideInDelay: 800,
                        slideDownDelay: 1500,
                        autoDestroyDelay: 4000,
                        slideInAnimation: 'elasticIn',
                        slideDownAnimation: 'elasticIn',
                        height: 300,
                        width: 300,
                        padding: 0,
                        items: [
                            {
                                xtype: 'eventoformverticalview',
                                record: store.data.items[store.data.items.length - 1],
                                eventoformverticalview: true,
                                title: '',
                                closable: false,
                            }
                        ]

                    })

                    ultimoEventoReciid = store.data.items[0].get('rec_iid')
                }

                btnEventoNuevo.show()
                //viewUltimoEvento.down('toolbar').hide();
            }
        })

        var newTabeventosdelaceunta = Ext.widget('recepcionview', {//eventostrgridview cambio 26/02/2018
            itemId: 'eventoscuenta',
            title: 'Eventos de la cuenta',
            showEstadosFilter: true,
            estados: [0, 1, 2, 3, 4, 5, 6, 7, 9],
            interval: 2000,
            showMaximizer: false,
            hiddenDealerFilter: true,
            condiciones: view.condiciones,
            record: view.record,
            nombreEvento: nombreEvento,
            mostrar: 100,
            short: 1,
            hideImprimir: true,
            hideExportar: true,
            hideEnviar: true,
            /*showprocesartodos: true,
            procesartodosFilters: [
                    {
                        property:'o.cue_clinea',
                        value:view.record.get('cue_clinea')
                    },{
                        property:'o.cue_ncuenta',
                        value:view.record.get('cue_ncuenta')
                    }
                ],*/
            sorters: [
                {
                    property: 'rec_tfechahora',
                    direction: 'DESC'
                }
            ]
        })
        //Federico V. Modificado para cumplir con lo pedido en la tarea DS-738.
        function refreshTab(tab) {

            setInterval(function () {
                if (!tab) return;
                var grid = tab.down('grid');
                if (grid) { // 17/11/2023 agregué este if porque la línea de abajo tiraba error y daba problemas para wildix
                    var store = grid.getStore();
                    if (store.loading == false) {
                        store.load();
                        store.loading = true;
                    }
                }
            }, 5000); // Refrescar cada 5 segundos (5000 milisegundos)

        }


        var MODOATENCIONEVENTOS = getParametro('MODOATENCIONEVENTOS', true, true);;
        var MODOATENCIONEVENTOSObj = MODOATENCIONEVENTOS.get('par_ivalor');
        // Determinar qué pestaña debe ser activada
        var activeTab;
        if (MODOATENCIONEVENTOSObj === 1) {
            activeTab = newTabeventosdelaceunta;
            refreshTab(newTabeventosdelaceunta);
        } else if (MODOATENCIONEVENTOSObj === 0) {
            activeTab = newTabUltimosEventos;
        }

        var eventostabstpanel = view.down('#eventostabstpanel');
        eventostabstpanel.add(newTabeventosdelaceunta);
        eventostabstpanel.add(newTabUltimosEventos);
        eventostabstpanel.setActiveTab(activeTab);

        //si el usuario es adminsitrador le doy permiso a operar el eveneto en modo colaboracion        
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordAdminsitrator = storeSecurity.findRecord('KeyReference', 'Administrator')
        if (recordAdminsitrator && recordAdminsitrator.get('Available') == true) {
            var _security = recordAdminsitrator.get('_Security');
            if (_security && _security.rights && _security.rights.cuenta == false) {
                view.hideProcessOperations = false
            }
        }
        var btnSupervision = view.down('#supervision');
        if (btnSupervision) {
            btnSupervision.hide();
        }
        var recordWebremoto = storeSecurity.findRecord('KeyReference', 'WebRemoto')
        if (recordWebremoto && recordWebremoto.get('Available') == true) {
            var _security = recordWebremoto.get('_Security');
            view.operadorId = _security.ope_iid;
            if (btnSupervision && _security && _security.supervision && _security.supervision > 0) {
                btnSupervision.show();
            }
        }

        /*
        //Se saco el dia 25/09/2017
        var recordWebremoto = storeSecurity.findRecord('KeyReference', 'WebRemoto')
        if(recordWebremoto && recordWebremoto.get('Available') == true) {  
            var _security = recordWebremoto.get('_Security');
            if(_security && _security.procesartodos && _security.procesartodos == "false") {
                view.down('#procesa-todos2').hide()
            }
        }*/
        view.down('#procesarmultiple').hide();

        if (recordWebremoto && recordWebremoto.get('Available') == true) {
            var _security = recordWebremoto.get('_Security');
            //lo viejo
            if (_security && _security.procesartodos && _security.procesartodos == "true") {
                view.down('#procesarmultiple').show();
            } else if (_security && _security.procesarporlote && _security.procesarporlote == "true") {
                view.down('#procesarmultiple').show();
            }
            //lo nuevo 
            else if (_security && _security.procesartodosproceso && _security.procesartodosproceso == "true") {
                view.down('#procesarmultiple').show();
            } else if (_security && _security.procesarporloteproceso && _security.procesarporloteproceso == "true") {
                view.down('#procesarmultiple').show();
            }

            if (_security && _security.comandos) {
                view.down('#comandos').show()
            }
        }

        // verifico si escondo los botones de procesar evento
        if (view.hideProcessOperations) {
            view.down('#espera').hide()
            view.down('#pendiente').hide()

            if (view.down('#procesa-todos2')) {
                view.down('#procesa-todos2').hide()
            }

            view.down('#procesa2').hide()

            view.down('#minutosEspera').hide()
            // newTab.down('#predefinidas').hide()
            /** se volvio a agrergar el dia 29/03/2017 a pedido de leonardo */
            view.down('#categorizacion').hide()
            view.down('#resolucion').hide()
            view.down('#cerrar').show()
        }

        if (view.fireObservacionColaboracion) {
            var colaboracionRecord = controller.getEventosTiemLineModelModel().create({
                etl_icuenta: view.record.get('cue_iid'),
                etl_tfechahora: new Date(),
                etl_caccion: 'Procesamiento',
                etl_cobservacion: "Colaboracion",
                etl_cowner: '%MWR%',
                etl_ioperador: view.up('viewport').operadorId,
                etl_irecid: view.record.get('rec_iid')
            });
            colaboracionRecord.set('Id', 0);
            colaboracionRecord.save();
        }

        //SMS
        if (view.showSmsSender) {
            view.down('#enviarsms').show()
        }

        // oculto los botones segun los módulos de la llave
        this.applyKeyData(view);

        var spPanel = view.down('#smartpanics');

        // agrego smartpanics
        if ((record.get('rxt_nSPIP') == 1 || record.get('rxt_nSPSMS') == 1 || record.get('rxt_nVCIP') == 1 || record.get('rxt_nVCSMS') == 1) && record.get('gps_rlatitud')) {
            spPanel.show();

            //se agrego el IF para que en el activate no vuelva a generar el mapa
            if (!view.down('smartpanicgpsview')) {
                spPanel.add(Ext.widget('smartpanicgpsview', {
                    layout: 'fit',
                    //eventId:6426446,
                    eventId: record.get('rec_iid'),
                    center: record.get('gps_rlatitud') + ',' + record.get('gps_rlongitud'),
                    record: record,
                    flex: 1
                }));

                spPanel.addTool({
                    type: 'maximize',
                    itemId: 'maximizer',
                    handler: function (event, img, view, tool) {
                        var view = tool.up('eventomonitoreoview');
                        var tabpanel = tool.up('tabpanel');
                        var record = view.record;

                        var win = Ext.create('Ext.Window', {
                            layout: 'fit',
                            title: getLocale('Mapa') + ' (' + record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre') + ') ' + nombreEvento,
                            closeAction: 'hide',
                            translate: false,
                            width: 750,
                            height: 550,
                            border: true,
                            modal: false,
                            view: view,
                            items: [
                                {
                                    xtype: 'smartpanicgpsview',
                                    caller: view,
                                    showMaximizer: false,
                                    //center: record.get('gps_rLatitud')+','+record.get('gps_rLongitud'),
                                    eventId: record.get('rec_iid'),
                                    record: record

                                }
                            ]
                        });

                        win.show();
                        if (win.down('eventotimelinegridview'))
                            win.down('eventotimelinegridview').setTitle('');
                    }
                });
            }
        } else if (record.get('gps_rlatitud')) { //18-07-2017 se saco || record.get('cue_clatlng') para que no se muestre el mapa en eventos comunaes a pedido de LEO // no es smartpanic pero tiene posicion GPS, puede ser de VigiControl
            // muestro contenedor trackguardmonitoreo
            spPanel.show();

            if (record.get('tip_ntipo') == 5) {
                //VIGICONTROL
                var smarttrackgpsview = spPanel.add(Ext.widget('smarttrackgpsview', {
                    layout: 'fit',
                    eventId: record.get('rec_iid'),
                    center: record.get('gps_rlatitud') + ',' + record.get('gps_rlongitud'),
                    flex: 1
                }));

                spPanel.addTool({
                    type: 'maximize',
                    itemId: 'maximizer',
                    handler: function (event, img, view, tool) {
                        var view = tool.up('eventomonitoreoview');
                        var tabpanel = tool.up('tabpanel');
                        var record = view.record;

                        var win = Ext.create('Ext.Window', {
                            layout: 'fit',
                            translate: false,
                            title: getLocale('Mapa') + ' (' + record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre') + ') ' + nombreEvento,
                            closeAction: 'hide',
                            width: 750,
                            height: 550,
                            border: true,
                            modal: false,
                            view: view,
                            items: [
                                {
                                    xtype: 'smarttrackgpsview',
                                    caller: view,
                                    center: record.get('gps_rlatitud') + ',' + record.get('gps_rlongitud'),
                                    eventId: record.get('rec_iid'),
                                    record: record
                                }
                            ]
                        });
                        win.show();
                    }
                });
            }
            else if (record.get('rec_cdll') == 'VivecarPacketParser' ||
                (record.get('gps_rlatitud') && record.get('gps_rlatitud') != '0.0'
                    && record.get('gps_rlongitud') && record.get('gps_rlongitud') != '0.0')
            ) {
                //vivecar
                var smarttrackgpsview = spPanel.add(Ext.widget('smartpanicgpsview', {
                    layout: 'fit',
                    eventId: record.get('rec_iid'),
                    center: record.get('gps_rlatitud') + ',' + record.get('gps_rlongitud'),
                    shortToolbar: true,
                    flex: 1,
                    record: record
                }));

                spPanel.addTool({
                    type: 'maximize',
                    itemId: 'maximizer',
                    handler: function (event, img, view, tool) {
                        var view = tool.up('eventomonitoreoview');
                        var tabpanel = tool.up('tabpanel');
                        var record = view.record;

                        var win = Ext.create('Ext.Window', {
                            layout: 'fit',
                            translate: false,
                            title: getLocale('Mapa') + ' (' + record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre') + ') ' + nombreEvento,
                            closeAction: 'hide',
                            width: 750,
                            height: 550,
                            border: true,
                            modal: false,
                            view: view,
                            items: [
                                {
                                    xtype: 'smartpanicgpsview',
                                    caller: view,
                                    center: record.get('gps_rlatitud') + ',' + record.get('gps_rlongitud'),
                                    eventId: record.get('rec_iid'),
                                    shortToolbar: true,
                                    record: record
                                }
                            ]
                        });
                        win.show();
                    }
                });
            }
            else {
                // busco el vehiculo
                var vehiclestore = Ext.create('Ext.data.Store', {
                    model: this.getVehicleSearchModelModel(),
                    pageSize: 150,
                    remoteFilter: true,
                    sorters: [
                        {
                            property: 'Name',
                            direction: 'ASC'
                        }
                    ],
                    filters: [
                        {
                            property: 'cue_iid',
                            value: record.get('cue_iid')
                        }
                    ]
                });

                // realmente hace falta? me parece que estan todos los datos... 
                // sino sumar directamente por join, es mejor que hacer otro query
                vehiclestore.load({
                    callback: function (records, operation, success) {
                        if (records.length > 0) {
                            var viewport = Ext.getCmp('viewport');

                            var flotagpsview = spPanel.add(Ext.widget('vehicleslavegpsview', {
                                layout: 'fit',
                                vehicleSelected: records[0],
                                hideDatapanel: true,
                                hideToolbar: true,
                                center: record.get('gps_rlatitud') + ',' + record.get('gps_rlongitud'),
                                record: records[0],
                                eventId: record.get('rec_iid'),
                                flex: 1
                            }));
                            //var gmap = flotagpsview.down('#googlemap');
                            //gmap.fireEvent('markersChange',gmap,records);

                            spPanel.addTool({
                                type: 'maximize',
                                itemId: 'maximizer',
                                handler: function (event, img, view, tool) {
                                    var view = tool.up('eventomonitoreoview');
                                    var tabpanel = tool.up('tabpanel');
                                    var record = view.record;
                                    var vehicle = controller.getVehicleSearchModelModel().create(Ext.clone(records[0].data));
                                    var win = Ext.create('Ext.Window', {
                                        layout: 'fit',
                                        title: 'Mapa (' + record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre') + ') ' + nombreEvento,
                                        closeAction: 'hide',
                                        width: 750,
                                        height: 550,
                                        border: true,
                                        modal: false,
                                        view: view,
                                        items: [
                                            {
                                                xtype: 'vehicleslavegpsview',
                                                caller: view,
                                                record: vehicle,
                                                collapseDatapanel: true,
                                                showInfoWindow: true,
                                                center: record.get('gps_rlatitud') + ',' + record.get('gps_rlongitud'),
                                                vehicleSelected: records[0],
                                                eventId: record.get('rec_iid')
                                            }
                                        ]
                                    });
                                    win.show();
                                }
                            });
                        } else {
                            view.down('#smartpanics').hide(); //
                        }
                    }
                });
            }
        } else {
            //si no tiene posicion busco la ultima
            //se agrego el IF para que en el activate no vuelva a generar el mapa
            if (!view.down('smartpanicgpsview')) {
                //si es smartpanics o vigicontrol sin cordenados
                if (record.get('tip_ntipo') == 5 || record.get('rxt_nSPIP') == 1 || record.get('rxt_nSPSMS') == 1) {
                    spPanel.show();
                    var storeLastPosition = Ext.create('Ext.data.Store', {
                        model: this.getP_GpsSpModelModel(),
                        remoteFilter: true,
                        pageSize: 100,
                        remoteGroup: false,
                        filters: [{
                            property: 'gps_idCuenta',
                            value: record.get('cue_iid')
                        }, {
                            property: 'gps_rLatitud:NOT',
                            value: 0
                        }
                        ],
                        sorters: [
                            {
                                property: 'gps_iid',
                                direction: 'DESC'
                            }
                        ]
                    }).load({
                        callback: function (records) {
                            if (records.length > 0) {

                                record.set('gps_rlatitud', records[0].get('gps_rLatitud'))
                                record.set('gps_rlongitud', records[0].get('gps_rLongitud'))
                                spPanel.add(Ext.widget('smartpanicgpsview', {
                                    layout: 'fit',
                                    //eventId:6426446,
                                    eventId: records[0].get('gps_idRec'),
                                    center: records[0].get('gps_rLatitud') + ',' + records[0].get('gps_rLongitud'),
                                    record: record,
                                    flex: 1
                                }));
                            }
                        }
                    })
                }
            }
        }

        /** lo cambie de posicion para que simpre se evalue si teine video */
        Ext.Ajax.request({
            url: '/Rest/search/p_rximg',
            params: {
                rxi_irecid: record.get('rec_iid'),
                rxi_cTipo: 'mp4'
            },
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var total = parametros.total;
                if (total > 0) {
                    var video = view.down('#imagePanel').down('#videosmartpanic');
                    //VOLVER ATRAS video.tab.show()
                    //VOLVER ATRAS view.down( '#imagePanel' ).setActiveTab( video )

                    view.down('#imagePanel').show()

                }
            }
        })

        controller.addImagenToPanel(record, view);

        // verifico que la nota temporal este entre fechas
        var objectId = record.get('cue_iid');

        //defino tiempo en espera
        var TIEMPOENESPERA = getParametro('TIEMPOENESPERA', true, true);
        var TIEMPOENESPERAObj = TIEMPOENESPERA.get('_par_cvalor');

        var tiempoenespera = 50;
        if (TIEMPOENESPERAObj && TIEMPOENESPERAObj.default) {
            tiempoenespera = TIEMPOENESPERAObj.default == 999 ? null : TIEMPOENESPERAObj.default;
        } else {
            tiempoenespera = TIEMPOENESPERA.get('par_ivalor')
        }
        view.down('#minutosEspera').setValue(tiempoenespera)

        /**
         * BC 390361159 : Agregado personalizacion para mostar / ocultar bitacora, timeline, notas.
         */
        if (view.bitacora == "false") {
            view.down('#bitacora').hide();
            view.down('#notas').width = '100%';
        }
        if (view.timeline == "false") {
            view.down('#c3_r2').hide();
        }

        const notaroview = view.down('#notas');

        if (view.notas == "false" || view.notas == "true") {
            if (view.notas == "false") {
                notaroview.hide();
                view.down('#bitacora').width = '100%';
            }
        } else {
            if (view.notas == "0") {
                notaroview.hide();
                view.down('#bitacora').width = '100%';
            }
            if (view.notas == "1") {
                notaroview.notas = view.notas;
            }
            if (view.notas == "2") {
                notaroview.notas = view.notas;
            }
        }

        Ext.resumeLayouts(true);
    },

    onEnviarStopSpClick: function (button, record) {
        var view = button.up('atencioneventoview');
        //enviar push
        var token = view.record.get('token');
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

    onImgeventosPosterioresClick: function (btn) {
        var view = btn.up('atencioneventoview')
        var record = view.record;
        var target = view.down('#imagenesSlider');
        if (btn._state == 1) {
            //view.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + record.get( 'rec_iid' ) + '&cue_iid=' + record.get( 'cue_iid' ) + '&thum=false&onlyEvent=false&moduleCaller=' + this.application._nameModule )

            target.load({
                src: '/handler/EventImagenGalleryHTML?rec_iid=' + record.get('rec_iid') + '&cue_iid=' + record.get('cue_iid') + '&thum=false&onlyEvent=false&moduleCaller=' + this.application._nameModule + '&refresh=true',
            });
            btn._state = 0
            btn.setText(getLocale('Ver imagenes del evento'))
        } else {
            //view.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + record.get( 'rec_iid' ) + '&cue_iid=' + record.get( 'cue_iid' ) + '&thum=false&onlyEvent=true&moduleCaller=' + this.application._nameModule )
            target.load({
                src: '/handler/EventImagenGalleryHTML?rec_iid=' + record.get('rec_iid') + '&cue_iid=' + record.get('cue_iid') + '&thum=false&onlyEvent=true&moduleCaller=' + this.application._nameModule + '&refresh=true',
            });
            btn._state = 1
            btn.setText(getLocale('Ver imagenes de eventos posteriores'))
        }
    },

    addImagenToPanel: function (record, view) {
        var controller = this;
        if (view.down('#imagePanel') && view.down('#imagePanel').down('#containerImagenIframe')) {
            view.down('#imagePanel').down('#containerImagenIframe').tab.show()
            view.down('#imagePanel').setActiveTab(view.down('#imagePanel').down('#containerImagenIframe'))
            view.down('#imagePanel').show()

            //view.down( '#imagenesSlider' ).setSrc( '/handler/EventImagenGalleryHTML?rec_iid=' + record.get( 'rec_iid' ) + '&cue_iid=' + record.get( 'cue_iid' ) + '&thum=false&onlyEvent=false&moduleCaller=' + this.application._nameModule + '&refresh=true' )
            var target = view.down('#imagenesSlider');
            target.load({
                src: '/handler/EventImagenGalleryHTML?rec_iid=' + record.get('rec_iid') + '&cue_iid=' + record.get('cue_iid') + '&thum=false&onlyEvent=false&moduleCaller=' + this.application._nameModule + '&refresh=true',
            });
        }
    },

    onEventosnuevosClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var record = view.record;
        var fecha = new Date(record.get('rec_isoFechaHora')).setSeconds(record.get('rec_isoFechaHora').getSeconds() + 1);
        var newTabUltimosEventos = Ext.widget('eventospendientesposteriorestrgridview', {
            itemId: 'ultimoseventos',
            title: 'Eventos posteriores',
            showEstadosFilter: false,
            estados: [0, 1, 2, 3, 4, 5, 6, 7, 9],
            showMaximizer: false,
            hiddenDealerFilter: true,
            evaluarNuevosEventosYEnviarAlFrente: true,
            record: view.record,
            noResaltarEventosMismaCuenta: true,
            FechaDesde: Ext.Date.format(new Date(fecha), 'Y-m-d\\TH:i:s'),
            condiciones: view.condiciones,
            short: 1,
            sorters: [
                {
                    property: 'rec_tfechahora',
                    direction: 'ASC'
                }
            ]
        });

        var myWindow = Ext.widget('window', {
            title: 'Eventos posteriores',
            height: 380,
            width: 600,
            modal: true,
            items: newTabUltimosEventos,
            closable: true,
            layout: 'fit',
            closeAction: 'destroy'
        }).show();

        //newTabUltimosEventos.down('toolbar').hide();
    },

    onEnviarEmailClick: function (button, object, options) {
        var view = button.up('atencioneventoview')
        var newView = Ext.widget('mailformview', {
            recordEvent: view.record,
            caller: view,
            emailsAccountAndNotificaction: true
        });

        var myWindow = Ext.widget('window', {
            title: 'Enviar Email',
            height: 380,
            width: 600,
            modal: true,
            items: newView,
            closable: true,
            layout: 'fit',
            closeAction: 'destroy'
        }).show();

        view.windowsHijas.push(myWindow);
    },

    onEnviarSmsClick: function (button, object, options) {
        var view = button.up('atencioneventoview')
        var newView = Ext.widget('smsenvioformview', {
            record: view.record,
            caller: view
        });

        var myWindow = Ext.widget('window', {
            title: 'Enviar Sms',
            height: 380,
            width: 400,
            modal: true,
            items: newView,
            closable: true,
            layout: 'fit'
        }).show();

        view.windowsHijas.push(myWindow);
    },

    onEnviarWhatsAppClick: function (button, object, options) {
        var view = button.up('atencioneventoview')
        var newView = Ext.widget('whatsappenvioformview', {
            record: view.record,
            caller: view
        });

        var myWindow = Ext.widget('window', {
            title: 'Enviar WhatsApp',
            height: 380,
            width: 400,
            modal: true,
            items: newView,
            closable: true,
            layout: 'fit'
        }).show();

        view.windowsHijas.push(myWindow);
    },

    onSpChatClick: function (button, object, options) {
        var view = button.up('atencioneventoview')
        var newView = Ext.widget('spchatformview', {
            record: view.record,
            closeAction: 'destroy',
            caller: view
        });

        var myWindow = Ext.widget('window', {
            title: 'Chat',
            height: 600,
            width: 500,
            modal: false,
            items: newView,
            closable: true,
            closeAction: 'destroy',
            layout: 'fit',
            listeners: {
                beforeclose: function () {
                    newView.close();
                }
            }
        }).show();

        view.windowsHijas.push(myWindow);
    },

    onCerrarClick: function (button, object, options) {
        button.up('atencioneventoview').up('eventomonitoreoview').close()
    },

    onComandosClick: function (button, object, options) {
        var view = button.up('atencioneventoview')
        var newView = Ext.widget('comandosgpsconfigview', {
            record: view.record,
            module: { profile: 1 },
            caller: view
        });

        var myWindow = Ext.widget('window', {
            title: 'Comandos',
            height: 400,
            width: 1200,
            modal: true,
            items: newView,
            closable: true,
            layout: 'fit'
        }).show();

        view.windowsHijas.push(myWindow);
    },

    onImagePanelHasContet: function (imagepanel) {
        if (imagepanel.hascontent) {
            var view = imagepanel.up('atencioneventoview');
            //18/07/2017 se saco por cambio de posicion
            //view.down('notaroview').hide();

            // BC 374402728 : El scroll de la grilla de camaras, se rompia sin un alto. Desaparecían los demás paneles.
            //adrian 31/1/2019 lo saque
            //  imagepanel.height = 1;

            imagepanel.show();
        }
    },

    // ToDo : JUAN - Si solo funciona con X evento, agregar lo de EventoMonitoreoController en estas 2 funciones.
    onImagePanelAfterMaximize: function (imagepanel) {
        var view = imagepanel.up('atencioneventoview');
        //18/07/2017 se saco por cambio de posicion
        //view.down('notaroview').show();
        //imagepanel.hide(); // no lo uso se oculta el padre y no la view
    },

    onWindowClose: function (imagepanel) {
        var view = imagepanel.up('atencioneventoview');
        imagepanel.hasimages = false;
        //18/07/2017 se saco por cambio de posicion
        //view.down('notaroview').hide();
        //imagepanel.show(); // hay que regenerar todos los tabs, ver eventomonitoreocontroler.
    },

    onGuardarNotaClick: function (button, object, options) {
        // var controller = this;
        var view = button.up('atencioneventoview');
        var record = view.record;
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';

        var newView = Ext.widget('formnote', {
            record: view.record,
            module: view.module,
            tipo: 'win',
            title: ''
        });

        var myWindow = Ext.widget('window', {
            title: 'Modificar notas ' + nombreEvento,
            height: 380,
            width: 400,
            modal: true,
            items: newView,
            closable: true,
            layout: 'fit',

        }).show();
        view.windowsHijas.push(myWindow);
    },

    onLlamadaClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        view.down('#procesa2').setDisabled(true)
        view.down('#procesarmultiple').setDisabled(true)
        view.down('#pendiente').setDisabled(true)
        view.down('#espera').setDisabled(true)
        view.down('#cerrar').setDisabled(true)


        var operadores = view.up('tabpanel').up('tabpanel').operador;
        var operadorId = view.up('viewport').operadorId;
        view.operadorId = operadorId;
        var record = view.record;
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';

        var stateWindow = 1;
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: getLocale('Realizar contacto ') + nombreEvento,
            closeAction: 'destroy',
            itemId: 'contacto',
            translate: false,
            width: 900,
            height: 600,
            border: true,
            modal: false,
            view: view,
            closable: false,
            minimizable: true,
            //   maximizable: true,
            listeners: {
                minimize: function () {
                    var llamadahelperview = this.down('llamadahelperview')
                    if (stateWindow == 1) {
                        if (this.down('llamadahelperview').llamando) {
                            this.setHeight(200)
                            this.setWidth(380)
                            stateWindow = 0;
                            llamadahelperview.down('#agenda').hide()
                            llamadahelperview.down('#llamadahelperBig').hide()
                            llamadahelperview.down('toolbar').hide()
                            llamadahelperview.down('#resolucionesMini').setValue('')
                            llamadahelperview.down('#colgarMini').setText(getLocale('Colgar'))
                            llamadahelperview.down('#llamadahelperMini').show()

                        } else {
                            notify('Para minimizar debe inciar la llamada')
                        }

                    } else {
                        this.setHeight(560)
                        this.setWidth(900)
                        stateWindow = 1;
                        llamadahelperview.down('#llamadahelperMini').hide()
                        llamadahelperview.down('toolbar').show()
                        llamadahelperview.down('#agenda').show()
                        llamadahelperview.down('#llamadahelperBig').show()
                        this.center()
                    }
                },
            },
            items: [{
                xtype: 'llamadahelperview',
                record: view.record,
                operador: operadores,
                operadorId: operadorId,
                called: view,
                operadorId: view.up('viewport').operadorId
            }]
        });
        win.show();
        view.windowsHijas.push(win);
    },

    onEstadoClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var record = view.record;
        var operadores = view.up('tabpanel').operador;
        var hidecontrols = ['#btndeshabilitar', '#btnEliminar'];

        if (record.get('rec_czona').trim() == '') {
            hidecontrols.push('#btnxzonas');
        }

        var cuenta = ' ' + record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre')

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: getLocale('Cambiar estado de la cuenta') + cuenta,
            closeAction: 'destroy',
            translate: false,
            itemId: 'contacto',
            width: 800,
            height: 300,
            border: true,
            modal: false,
            view: view,
            closable: true,
            items: [{
                xtype: 'estadoview',
                module: Ext.create(this.getModuleModelModel(), {
                    profile: 3
                }),
                forceZona: record.get('rec_czona'),
                hideControls: hidecontrols,
                record: record,
                called: view,
                operadorId: view.up('viewport').operadorId,
                rec_iid: record.get('rec_iid')
            }]
        });
        win.show();
    },

    onSelectPredefinidas: function (combo, records) {
        var view = combo.up('eventobservacionesformview');
        var textarea = view.down('#obsfield');

        // dedalo 12/11/2019 a padido de Fer, se agrega predefinida a textarea.
        if (combo.getValue()) {
            textarea.setValue(combo.getValue());
        }
    },

    onEsperaIlimitadoClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var minutosEspera = 999;
        var record = view.record;
        var rec_iid = record.get('rec_iid');
        var observaciones = view.down('#obsfield').getValue();
        var controller = this;

        Ext.Ajax.request({
            url: '/rest/search/AtencionEventoEspera',
            params: {
                rec_iid: rec_iid,
                rec_iMinutosEspera: minutosEspera,
                rec_cObservaciones: observaciones
            },
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];

                if (rec.Error == 0) {
                    //actualizo las pantallas
                    notify('El evento se pasó a espera');

                    var parentTabPanel = view.up('tabpanel').up('tabpanel').up('tabpanel');
                    if (view.itemIdTabReturn) {
                        parentTabPanel.setActiveTab(parentTabPanel.down('#' + view.itemIdTabReturn))
                    }

                    view.up('eventomonitoreoview').close();
                } else {
                    notifyError(rec.Message);
                }
            }
        });
    },

    onEsperaClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var minutosEspera = view.down('#minutosEspera').getValue();
        var record = view.record;
        var rec_iid = record.get('rec_iid');
        var observaciones = view.down('#obsfield').getValue();
        var controller = this;

        if (!view.down('#minutosEspera').isValid()) {
            notifyError('Debe seleccionar un valor para espera válido');
        } else {
            Ext.Ajax.request({
                url: '/rest/search/AtencionEventoEspera',
                params: {
                    rec_iid: rec_iid,
                    rec_iMinutosEspera: minutosEspera,
                    rec_cObservaciones: observaciones
                },
                method: 'GET',
                scope: this,
                success: function (response) {
                    var parametros = Ext.JSON.decode(response.responseText);
                    var rec = parametros.rows[0];

                    if (rec.Error == 0) {
                        //actualizo las pantallas
                        notify('El evento se pasó a espera');

                        /* controller.getEventosTiemLineModelModel().create({
                             etl_icuenta: record.get('cue_iid'),
                             etl_tfechahora: new Date(),
                             etl_caccion: '%EventoEspera%',
                             etl_cobservacion: getLocale('A Espera por')+' '+minutosEspera+' '+getLocale('Minutos'),
                             etl_cowner: '%MWR%',
                             etl_ioperador: view.up('viewport').operadorId,
                             etl_irecid: rec_iid
                         }).save({callback:function () {*/

                        // retorno al panel que abrio este evento
                        var parentTabPanel = view.up('tabpanel').up('tabpanel').up('tabpanel');
                        if (view.itemIdTabReturn) {
                            parentTabPanel.setActiveTab(parentTabPanel.down('#' + view.itemIdTabReturn))
                        }

                        view.up('eventomonitoreoview').close();
                        /* }});*/

                    } else {
                        notifyError(rec.Message);
                    }
                }
            });
        }
    },

    onSupervisionClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var record = view.record;
        // var categorizacion = view.record.get('rec_ccategorizacion')//view.down('#categorizacion').getValue();
        var observaciones = view.down('#obsfield').getValue();
        //var resolucion = view.record.get('rec_idresolucion')//view.down('#resolucion').getValue();

        var rec_iid = record.get('rec_iid');

        if (view.isLlamadaOpen) {
            notify('La ventana de llamados debe estar cerrada para poder procesar.');
            return false;
        }

        // me fijo si el form es valido

        var form = view.down('eventobservacionesformview');
        // if (form.isValid()){
        Ext.Ajax.request({
            url: '/rest/search/AtencionEventoSupervisor',
            params: {
                rec_iid: rec_iid,
                rec_cObservaciones: observaciones
            },
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];

                if (parametros.success) {
                    //actualizo las pantallas
                    notify('El evento se pasó a supervision');

                    // retorno al panel que abrio este evento
                    var parentTabPanel = view.up('tabpanel').up('tabpanel').up('tabpanel');
                    if (view.itemIdTabReturn) {
                        parentTabPanel.setActiveTab(parentTabPanel.down('#' + view.itemIdTabReturn))
                    }
                    view.up('eventomonitoreoview').close();
                } else {
                    if (rec)
                        notifyError(rec.Message);
                }
            }
        });
        /* } else {
             notifyError('Por favor corrija los valores del formulario');
         }*/
    },

    onProcesarClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var record = view.record;
        var categorizacion = view.record.get('rec_ccategorizacion')//view.down('#categorizacion').getValue();
        var observaciones = view.down('#obsfield').getValue();
        var resolucion = view.record.get('rec_idresolucion')//view.down('#resolucion').getValue();
        var rec_iid = record.get('rec_iid');

        if (view.isLlamadaOpen) {
            notify('La ventana de llamados debe estar cerrada para poder procesar.');
            return false;
        }

        var categorizacionRequerida = getParametro('CATEGORIZACIONOBLIGATORIA')
        if (categorizacionRequerida == 1 || categorizacionRequerida == 2) {
            if (Ext.util.Format.trim(resolucion) == '') {
                notify('Debe seleccionar una categoria para poder procesar el evento.');
                return false;
            }
        }

        // me fijo si el form es valido

        var form = view.down('eventobservacionesformview');
        if (form.isValid()) {
            Ext.Ajax.request({
                url: '/rest/search/AtencionEventoProcesar',
                params: {
                    rec_iid: rec_iid,
                    rec_idResolucion: Ext.String.leftPad(resolucion, 3, '0'),
                    rec_cObservaciones: observaciones,
                    rec_cCategorizacion: Ext.String.leftPad(categorizacion, 3, '0')

                },
                method: 'GET',
                scope: this,
                success: function (response) {
                    var parametros = Ext.JSON.decode(response.responseText);
                    var rec = parametros.rows[0];

                    if (parametros.success) {
                        //actualizo las pantallas
                        notify('El evento se pasó a procesado');

                        // retorno al panel que abrio este evento
                        var parentTabPanel = view.up('tabpanel').up('tabpanel').up('tabpanel');
                        if (view.itemIdTabReturn) {
                            parentTabPanel.setActiveTab(parentTabPanel.down('#' + view.itemIdTabReturn))
                        }

                        //envio los push
                        Ext.Ajax.request({
                            url: '/handler/sendPushFromQueue',
                            method: 'GET'
                        });

                        if (getParametro('NOTIFICAEVENTODEALER') != '') {

                            var NOTIFICAEVENTODEALER = getParametro('NOTIFICAEVENTODEALER', true, true).get('_par_cvalor')
                            var subject = getLocale('Procesamiento de evento') + ' [' + record.get('rec_calarma') + ' ' + record.get('rec_tfechaproceso') + ']'

                            var preSubject = '';
                            if (NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.nombreCuenta && NOTIFICAEVENTODEALER.numeroCuenta) {
                                preSubject = Ext.util.Format.trim(record.get('cue_ncuenta')) + '-' + Ext.util.Format.trim(record.get('cue_cnombre'))
                            } else if (NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.numeroCuenta) {
                                preSubject = Ext.util.Format.trim(record.get('cue_ncuenta'))
                            } else if (NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.nombreCuenta) {
                                preSubject = Ext.util.Format.trim(record.get('cue_cnombre'))
                            }

                            subject = preSubject + ' ' + subject

                            Ext.Ajax.request({
                                url: '/rest/search/EnviarEventoADealer',
                                params: {
                                    rec_iid: rec_iid,
                                    dealer: record.get('cue_clinea'),
                                    subject: subject,
                                    cuentaId: record.get('rec_iidcuenta')
                                },
                                method: 'GET',
                                scope: this,
                                success: function (response) {
                                }
                            })
                        }

                        view.up('eventomonitoreoview').close();
                    } else {
                        if (rec)
                            notifyError(rec.Message);
                    }

                }
            });
        } else {
            notifyError('Por favor corrija los valores del formulario');
        }
    },

    onPendienteClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var record = view.record;
        var rec_iid = record.get('rec_iid');

        Ext.Ajax.request({
            url: '/rest/Search/AtencionEventoDevolver?rec_iid=' + rec_iid,
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];

                if (rec.Error == 0) {
                    //actualizo las pantallas
                    notify('El evento se pasó a pendiente');

                    // retorno al panel que abrio este evento
                    var parentTabPanel = view.up('tabpanel').up('tabpanel').up('tabpanel');
                    if (view.itemIdTabReturn) {
                        parentTabPanel.setActiveTab(parentTabPanel.down('#' + view.itemIdTabReturn))
                    }

                    view.up('eventomonitoreoview').close();
                } else {
                    notifyError(rec.Message);
                }

            }
        });


        /**
         * BC 390368233 : Stopeo la tarea creada de refresh de Video
         *
        Ext.TaskManager.stop(view.down('speventovideoview').task)
         */

    },

    onProcesarLotesClick: function (button, event, options) {
        var view = button.up('atencioneventoview');
        var record = view.record;
        var store = view.store;
        const ultimoseventos = view.down('#ultimoseventos')

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            translate: false,
            forceClose: true,
            title: getLocale('Debe seleccionar los eventos a procesar'),
            closeAction: 'destroy',
            caller: view,
            fieldName: 'udw_clave',
            modal: true,
            width: 700,
            height: 630,
            border: false,
            record: record,
            closable: false,
            items: [
                {
                    xtype: 'procesarporloteview',
                    estados: view.estados,
                    ultimoseventos: ultimoseventos,
                    closeAction: 'destroy',
                    condiciones: view.condiciones,
                    record: record,
                    caller: view,
                    filters: [
                        {
                            property: 'o.cue_clinea',
                            value: view.record.get('cue_clinea')
                        }, {
                            property: 'o.cue_ncuenta',
                            value: view.record.get('cue_ncuenta')
                        }
                    ],
                    observacion: view.down('eventobservacionesformview').down('#obsfield').getValue(),
                    categorizacion: view.down('eventobservacionesformview').down('#categorizacion').getValue(),
                    resolucion: view.down('eventobservacionesformview').down('#resolucion').getValue(),
                    closerOnFinish: true,
                    noReservar: true,
                    callerString: 'atencionEvento' //arme este flag por que no puedo colgarme de xtype por que la view tiene extencion
                }
            ]
        });
        win.show();
    },

    onProcesarTodosClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var record = view.record;
        var cue_iid = record.get('cue_iid');

        if (view.isLlamadaOpen) {
            notify('La ventan de llamados debe estar cerrada para poder procesar');
            return false;
        }

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            translate: false,
            forceClose: true,
            title: getLocale('Se procesaran todos los  elementos'),
            closeAction: 'destroy',
            caller: view,
            fieldName: 'udw_clave',
            modal: true,
            width: 700,
            height: 630,
            border: false,
            record: record,
            closable: false,

            items: [
                {
                    xtype: 'procesartodoformview',
                    estados: view.estados,
                    condiciones: view.condiciones,
                    record: record,
                    caller: view,
                    filters: [
                        {
                            property: 'o.cue_clinea',
                            value: view.record.get('cue_clinea')
                        }, {
                            property: 'o.cue_ncuenta',
                            value: view.record.get('cue_ncuenta')
                        }
                    ],
                    observacion: view.down('eventobservacionesformview').down('#obsfield').getValue(),
                    categorizacion: view.down('eventobservacionesformview').down('#categorizacion').getValue(),
                    resolucion: view.down('eventobservacionesformview').down('#resolucion').getValue(),
                    noReservar: true
                }
            ]
        });
        win.show();
    },

    onMapguardClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var tabpanel = button.up('tabpanel')
        var record = view.record;
        var cuenta = view.cuenta;
        var rec_iid = record.get('rec_iid');
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';

        var title = getLocale('Mapguard');
        var mytab = tabpanel.down('[title=' + title + ']');
        if (!mytab) {
            var newTab = Ext.widget('mapguardeventosview', {
                record: record,
                targetTab: tabpanel,
                cuenta: cuenta,
                title: title,
                keepSelected: true,
                forceCuenta: true,
                closable: true,
                closeAction: 'destroy',
                autoDestroy: true,
                translate: false,
                operadorId: view.up('viewport').operadorId,
                forceEvaluateData: true //sirve para que verifique si tiene los datos necesarios para iniciar
            });

            tabpanel.add(newTab);
            tabpanel.setActiveTab(newTab);
        } else {
            tabpanel.setActiveTab(mytab);
        }
    },

    onServtecClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var tabpanel = button.up('tabpanel')
        var record = view.record;
        var cuenta = view.cuenta;
        var rec_iid = record.get('rec_iid');
        var operador = view.up('tabpanel').operador;
        var nombreEvento = '(' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ')';
        var title = getLocale('Servicio técnico') + ' ' + nombreEvento;
        var mytab = tabpanel.down('[title=' + title + ']');

        if (!mytab) {
            var newTab = Ext.widget('multicuentaserviciotecnicogridview', { //servtecgridview
                record: record,
                targetTab: tabpanel,
                simpleForm: true,
                title: title,
                translate: false,
                closable: true,
                closeAction: 'destroy',
                autoDestroy: true,
                newServtecShowWithCuenta: true,
                noOpenServtecAfterCreate: true,
                noOpenServtecEditForm: false,
                //metodo: 'readonly',
                module: { profile: 3 }
            });

            tabpanel.add(newTab);
            tabpanel.setActiveTab(newTab);
        } else {
            tabpanel.setActiveTab(mytab);
        }
    },

    onAutoridadClick: function (button, object, options) {
        var view = button.up('atencioneventoview');
        var tabpanel = button.up('tabpanel')
        var record = view.record;
        var cuenta = view.cuenta;
        var rec_iid = record.get('rec_iid');
        var controller = this;

        Ext.Ajax.request({
            url: '/rest/search/ReporteAutoridadesEventosManuales?rec_iid=' + rec_iid,
            success: function (resp, operation) {
                var d = new Date();
                var ticks = d.getTime();
                var response = Ext.JSON.decode(resp.responseText);
                if (response.total > 0) {

                    // 27/12 : JUAN, por algun motivo habia un signo + delante de response.rows[0].tad_curl que hacia no entrar al IF cuando debía hacerlo.
                    if (response.rows[0].aut_idestino != '1' && response.rows[0].tad_curl) {
                        Ext.widget('window', {
                            title: 'Reporte a autoridad',
                            width: 600,
                            height: 600,
                            layout: 'fit',
                            html: "<iframe style='overflow:auto;width:100%;height:100%;' frameborder='0'  src='" + response.rows[0].tad_curl + "?rec_iid=" + rec_iid + "&_dc=" + ticks + "'></iframe>"
                        }).show();
                    } else {
                        button.disable();
                        notify('El evento se reportó con éxito.');
                        //guardo en eventostimeline
                        controller.getEventosTiemLineModelModel().create({
                            etl_icuenta: record.get('cue_iid'),
                            etl_tfechahora: new Date(),
                            etl_caccion: '%ReporteAutoridadesManual%',
                            etl_cobservacion: '%ReporteAutoridadesManual%',
                            etl_cowner: '%MWR%',
                            etl_ioperador: view.up('viewport').operadorId,
                            etl_irecid: rec_iid
                        }).save();
                    }

                } else {
                    notifyError('No hay autoridades configuradas para reportar');
                }
            }
        });
    },

    applyKeyData: function (view) {
        var keymodulestore = SecurityModulesStore;//this.getKeyModulesStoreStore();

        if (keymodulestore.isModuleAvailable('SgAppSerTec')) {
            var btnservtec = view.down('#btnservtec');
            btnservtec.show();
        }
        if (keymodulestore.isModuleAvailable('WebReporteAut')) {
            var btnautoridad = view.down('#btnautoridad');
            btnautoridad.show();
        }

        // dedalo 14/05/2020
        // Ocultar multimadia con llave vencida o no disponible INCLUYENDO SmartPanics.
        if (!keymodulestore.isModuleAvailable('Video')) {
            view.down('#imagePanel').hide();
        }
    },

    setRecord: function (record, viewport) {
        // var controller = this;
        var myPanel = viewport.down('tabpanel');
        var center = viewport.down('#center');
        var title = 'Datos del evento';
        var rec_iid = record.get('rec_iid');
        var estadoStore = Ext.data.StoreManager.lookup('EventoEstadoStore');
        var estadoRec = estadoStore.findRecord('Value', record.get('rec_nestado'));

        if (estadoRec)
            var estado = estadoRec.get('Name');

        var rec_nOrigen = record.get('rec_nOrigen');
        var rec_ipuerto = record.get('rec_iPuerto');
        var origenStore = Ext.data.StoreManager.lookup('EventoOrigenStore');
        var origenRec = origenStore.findRecord('Value', rec_nOrigen);
        if (origenRec)
            var origen = origenRec.get('Name');

        if (rec_nOrigen == 2 && rec_ipuerto < 100)
            origen = 'PortGuard';
        if (rec_nOrigen == 2 && rec_ipuerto > 100)
            origen = 'IpReader';
        if (rec_nOrigen == 6 && rec_ipuerto < 0)
            origen = 'TR';

        if (rec_ipuerto < 0)
            var puerto = 0;
        else
            var puerto = rec_ipuerto

        origen = origen + ' : ' + puerto;

        record.set('_eventDescripcion', record.get('rec_calarma') + '-' + record.get('cod_cdescripcion'));
        record.set('_FechaHora', Ext.Date.format(record.get('rec_isoFechaHora'), 'Y-m-d H:i:s'));
        record.set('_estado', estado);
        record.set('_origen', origen);


        var _win = viewport.up('window');
        if (_win) {
            _win.setTitle(record.get('_eventDescripcion') + ' ' + record.get('_FechaHora'));
        }

        if (center) { center.record = record; }
    }
});
