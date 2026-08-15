//MIGRADO2024
Ext.define('Common.view.SmartPanicFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.smartpanicform', 'widget.smartpanicformview'],
    title: 'Evento',
    preventHeader: true,
    layout: 'fit',
    autoScroll: true,
    bodyPadding: 0,
    items: [
        {
            xtype: 'tabpanel',
            /*  layout: {
                  type: 'hbox',
                  align: 'stretch'
              },*/
            itemId: 'tab',
            items: [
                {
                    xtype: 'container',
                    title: getLocale('Configuracion'),
                    width: '100%',
                    itemId: 'configuraciontab',
                    layout: {
                        type: 'vbox'
                    },
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelWidth: 120,
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'hbox',
                            items: [
                                /* {
                                    xtype : 'checkboxfield',
                                    fieldLabel : 'Enviar alarma',                    
                                    itemId: 'enviaralarma'
                                },*/{
                                    xtype: 'component',
                                    html: getLocale('Detener envío de alarmas'),
                                    margin: '0 10 0 0',
                                }, {
                                    xtype: 'button',
                                    text: 'Enviar',
                                    itemId: 'enviarcomando'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'Telefono',
                            fieldLabel: 'Telefono',
                            itemId: 'telefono'/** ,
                            validator: function(value){
                                var t = this;
                                if( t.up('smartpanicformview').metodo == 'preconfig') {
                                    this.setDisabled(false)
                                    return true;
                                }
                                if(!value ) {
                                    return'';  
                                }
                                if(value != this.originalValue) {                  
                                    var filters = [{
                                        property : 'Telefono',
                                        value : value
                                    }];      
                            
                                    var model = 'Common.model.SmartPanicSearchModel';
                                    var storeSP =Ext.create('Ext.data.Store',{
                                        model: model,
                                        pageSize: 50,
                                        remoteFilter: true,
                                        filters: filters
                                    })
                                    
                                    storeSP.load({callback: function (records, operation, success) {
                                        if (records.length > 0){
                                            
                                            t.markInvalid('El telefono ya existe');
                                            t.textValid = false;
                                        } else {
                                            t.clearInvalid();
                                            t.textValid = true;
                                        }   
                                    }})
                                } else {
                                    t.markInvalid('');
                                    t.clearInvalid();
                                    t.textValid = true;
                                }
                                return t.textValid;
                            }
                            */
                        }, {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                center: 'stretch'
                            },
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'Imei',
                                    fieldLabel: 'Imei',
                                    itemId: 'imeicampo',
                                    disabled: true,
                                    hidden: true,
                                    margin: '0 5 0 0'
                                }, {
                                    xtype: 'button',
                                    text: 'Cambio de dispositivo',
                                    itemId: 'cambiarimei',
                                    hidden: true
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'Nombre',
                            fieldLabel: 'Nombre',
                            itemId: 'NombreCuenta'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Estado',
                            editable: false,
                            name: "userEnabled",// 0- inhabilitado ,1- habilitado
                            store: [[0, getLocale('Inhabilitado')], [1, getLocale('Habilitado')]],
                            itemId: 'userEnabled',
                            value: 1
                        },
                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: 'Fecha de Alta',
                            name: 'fechaAlta',
                            itemId: 'fechaAlta',
                            readOnly: true
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Usuario Awcc',
                            width: '99%',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Seleccionar un usuario',
                                    itemId: 'seleccionarusuario',
                                    margin: '0 10 0 0'
                                }, {
                                    xtype: 'component',
                                    itemId: 'nombreusuario'
                                }, {
                                    xtype: 'textfield',
                                    itemId: 'idusuario',
                                    name: 'awccUserId',
                                    margin: '0 10 0 0',
                                    hidden: true
                                }, {
                                    xtype: 'button',
                                    text: 'Borrar selección',
                                    itemId: 'borrarusuario',
                                    hidden: true
                                }
                            ]
                        }, {
                            xtype: 'textfield',
                            itemId: 'emailaviso',
                            fieldLabel: 'Email de aviso de alta',
                            hidden: true
                        }, {
                            xtype: 'button',
                            text: 'QR DISPOSITIVO',
                            itemId: 'qrButton',
                            margin: '0 10 0 0',
                            hidden: true
                        },
                    ]
                }
                , {
                    xtype: 'container',
                    title: getLocale('Funciones'),
                    itemId: 'funcionestab',
                    layout: 'vbox',
                    padding: '5 5 5 5',
                    autoScroll: true,
                    fieldDefaults: {
                        labelWidth: 120,
                        anchor: '100%',
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Modo vecinal',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Habilitado',
                                    editable: false,
                                    name: "modoVecinal",
                                    itemId: "modoVecinal",
                                    value: 0,
                                    emptyText: getLocale('Seleccione'),
                                    store: [[1, getLocale('Sí')], [0, getLocale('No')]]
                                }
                            ]
                        },
                        /*  {
                            //existe para que viaje en ejson y tenga retrocompatibilidad
                            xtype : 'displayfield',
                            fieldLabel : 'Modo vecinal',
                            name : "modoVecinal",
                            value: 0,
                            hidden:true 
                            
                        },  */
                        {
                            xtype: 'container',
                            itemId: 'funcionescontainer',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mis cuentas',
                                    name: "funcMisCuentas",
                                    editable: false,
                                    itemId: "funcMisCuentas",
                                    value: 1,
                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mis moviles',
                                    name: "funcMisMoviles",
                                    editable: false,
                                    itemId: "funcMisMoviles",
                                    value: 1,
                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mis camaras',
                                    name: "funcMisCamaras",
                                    editable: false,
                                    itemId: "funcMisCamaras",
                                    value: 1,
                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mi grupo',
                                    editable: false,
                                    name: "funcMiGrupo",
                                    itemId: "funcMiGrupo",
                                    value: 1,
                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                },
                                {
                                    xtype: 'container',
                                    autoScroll: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mis comandos',
                                            //labelWidth: 100, // achica el label
                                            name: "funcMisComandos",
                                            itemId: "funcMisComandos",
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            labelWidth: 60, // más compacto
                                            name: 'funcMisComandosNombre',
                                            itemId: 'funcMisComandosNombre',
                                            margin: '0 0 0 20'
                                        }
                                    ]
                                }

                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Seguimiento',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Disponible',
                                    editable: false,
                                    name: "trackingEnabled",// 0- no disponible ,1- disponible apagado, 2 - diponible
                                    store: [[0, getLocale('No disponible')], [1, getLocale('Disponible apagado')], [2, getLocale('Disponible')]],
                                    itemId: 'disponible',
                                    emptyText: 'Valor por defecto'
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Frecuencia de reporte',
                                    editable: false,
                                    itemId: 'trackingTrigger',
                                    name: "trackingTrigger",
                                    store: [[2, getLocale('Frecuencia alta')], [1, getLocale('Frecuencia media')], [0, getLocale('Frecuencia baja')]]
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Distancia',
                                    minValue: 500,
                                    width: 50,
                                    hidden: true,
                                    name: "trackingDistance",
                                    itemId: 'distance'
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Tiempo'
                                    , minValue: 5,
                                    hidden: true,
                                    width: 50,
                                    name: "trackingTime",
                                    itemId: 'time'
                                }
                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Tiemp de cancelacion de alarma',
                            collapsed: false,
                            collapsible: true,
                            defaults: {
                                margin: '0 0 10 0'
                            },
                            items: [
                                , {
                                    xtype: 'numberfield',
                                    maxValue: 10,
                                    minValue: 0,
                                    value: 5,
                                    validator() {
                                        value = this.getValue();
                                        if (value === 0 || (value >= 1 && value <= 10)) {
                                            return true;
                                        }
                                        return 'Not valid';
                                    },
                                    fieldLabel: 'Segundos',
                                    itemId: 'tiempoalarmasinpos',
                                    name: 'tiempoalarmasinpos',
                                    margin: '10px 0',
                                }
                            ]
                        },


                        {
                            xtype: 'fieldset',
                            title: 'Servicio técnico',
                            padding: '5 5 5 5',
                            collapsed: false,
                            collapsible: true,
                            items: [
                                {
                                    xtype: 'container',
                                    autoScroll: true,
                                    labelWidth: 100,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Pedir nuevo servicio',
                                            editable: false,
                                            //labelWidth: 140,
                                            itemId: 'btnRequestService',
                                            name: "btnRequestService",// 0- no disponible ,1- disponible 
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]//store: [[0,getLocale('No habilitado')],[1,getLocale('Habilitado')]]
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'btnRequestServiceNombre',
                                            itemId: 'btnRequestServiceNombre'
                                        }
                                    ]
                                }
                            ]
                            //----------
                        }, {
                            xtype: 'fieldset',
                            title: 'Chat',
                            padding: '5 5 5 5',
                            collapsed: false,
                            collapsible: true,
                            items: [
                                {
                                    xtype: 'container',
                                    autoScroll: true,
                                    labelWidth: 100,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Chat',
                                            editable: false,
                                            //labelWidth: 200,
                                            margin: '0 0 10 0',
                                            name: "btnChat",// 0- no disponible ,1- disponible 
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]//store: [[0,getLocale('No habilitado')],[1,getLocale('Habilitado')]]
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'btnChatNombre',
                                            itemId: 'btnChatNombre'
                                        }
                                    ]
                                }
                            ]

                            //----------
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Video Control',
                            padding: '5 5 5 5',
                            collapsed: false,
                            collapsible: true,
                            items: [
                                {
                                    xtype: 'container',
                                    autoScroll: true,
                                    labelWidth: 100,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Video control',
                                            editable: false,
                                            //labelWidth: 200,
                                            margin: '0 0 10 0',
                                            name: "btnVideoControl",// 0- no disponible ,1- disponible 
                                            store: [[0, getLocale('Oculto')], [1, getLocale('Visible')], [2, getLocale('Grisado')]]//store: [[0,getLocale('No habilitado')],[1,getLocale('Habilitado')]]
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'btnVideoControlNombre',
                                            itemId: 'btnVideoControlNombre'
                                        }
                                    ]
                                }
                            ]

                            //----------
                        }, {
                            xtype: 'container',
                            itemId: 'cont',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mis mensajes',
                                    editable: false,
                                    name: "btnMisMensajes",
                                    itemId: "btnMisMensajes",
                                    value: 1,
                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mis alarmas',
                                    editable: false,
                                    name: "btnMisAlarmas",
                                    itemId: "btnMisAlarmas",
                                    value: 1,
                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                }
                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Configuracion',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Idioma',
                                    editable: false,
                                    name: "btnIdioma",
                                    store: [[1, getLocale('Sí')], [0, getLocale('No')]],
                                    itemId: 'btnIdioma',
                                    emptyText: 'Valor por defecto'
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Sugerir cliente',
                                    editable: false,
                                    itemId: 'btnSugerir',
                                    name: "btnSugerir",
                                    store: [[1, getLocale('Sí')], [0, getLocale('No')]]
                                }
                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Botón bluetooth',
                            collapsed: false,
                            collapsible: true,
                            defaults: {
                                margin: '0 0 10 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Disponible',
                                    editable: false,
                                    name: "funcbtnBluetooth",
                                    itemId: "funcbtnBluetooth",
                                    store: [[0, getLocale('No habiltado')], [1, getLocale('Botón blanco')], [2, getLocale('Botón V.ALERT')], [3, getLocale('Botón BT-650')], [4, getLocale('Botón KKM')]],
                                    margin: '0 0 10 0'
                                }, {
                                    xtype: 'container',
                                    hidden: true,
                                    itemId: 'hasbutton',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'uuid',
                                            itemId: 'srb_button_uuid',
                                            name: 'srb_button_uuid'
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'btdelete',
                                            text: 'Eliminar relación'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Control de geocerca',
                            collapsed: false,
                            hidden: true,
                            collapsible: true,
                            defaults: {
                                margin: '0 0 10 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Evento',
                                    editable: false,
                                    name: "ctrlGeoEvent",
                                    itemId: "ctrlGeoEvent",
                                    store: [['', getLocale('Sin control')], ['I', getLocale('Inclusión')], ['E', getLocale('Exclusión')], ['X', getLocale('Inclusión y Exclusión')]],
                                    margin: '0 0 10 0',
                                    value: ''
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Frecuencia de reporte',
                                    editable: false,
                                    itemId: 'ctrlGeoEventTracking',
                                    name: "ctrlGeoEventTracking",
                                    margin: '0 0 10 0',
                                    store: [[2, getLocale('Frecuencia alta')], [1, getLocale('Frecuencia media')], [0, getLocale('Frecuencia baja')]]
                                }
                            ]
                        }
                    ]
                }, {
                    xtype: 'container',
                    title: getLocale('Alarmas'),
                    layout: 'anchor',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelWidth: 120,
                        anchor: '100%',
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Velocidad Max.'
                            , minValue: 0,
                            width: 50,
                            name: "speedmax",
                            itemId: 'speedmax'
                        }, {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Control Batería'
                            , minValue: 0,
                            width: 50,
                            name: "battcontrol",
                            itemId: 'battcontrol'
                        }, {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Control HeartBeat'
                            , minValue: 0,
                            width: 50,
                            name: "HBcontrol",
                            itemId: 'HBcontrol'
                        }
                    ]
                }, {
                    xtype: 'container',
                    title: getLocale('Grupos'),
                    layout: 'anchor',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelWidth: 120,
                        anchor: '100%',
                        labelAlign: 'left'
                    },
                    itemId: 'tabgrupo',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Disponible',
                            name: "groupEnabled",
                            store: [
                                [0, getLocale('No disponible')],
                                [1, getLocale('Disponible')]
                            ],
                            itemId: 'groupEnabled',
                            emptyText: 'Valor por defecto',
                            editable: false,
                            triggerAction: 'all',
                            margin: '0 15 0 0',
                            anchor: '95%',
                            validator: function (value) {
                                var t = this;
                                if (this.getValue() == 0) {
                                    t.up('smartpanicformview').down('#groupMax').hide();
                                } else {
                                    t.up('smartpanicformview').down('#groupMax').show();
                                }
                                t.markInvalid('');
                                t.clearInvalid();
                                t.textValid = true;

                                return t.textValid;
                            }
                        }, {
                            xtype: 'numberfield',
                            fieldLabel: 'Cantidad',
                            minValue: 0,
                            width: 50,
                            margin: '0 15 0 0',
                            anchor: '95%',
                            name: "groupMax",
                            itemId: 'groupMax'
                        }
                    ]
                }, {
                    xtype: 'container',
                    title: getLocale('Acciones'),
                    layout: 'vbox',
                    padding: '5 5 5 5',
                    autoScroll: true,
                    fieldDefaults: {
                        labelWidth: 50,
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            items: [
                                //panico
                                {
                                    xtype: 'container',
                                    margin: '5 0 10 0',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Botón de pánico',
                                            editable: false,
                                            name: "btnHomePanico",
                                            itemId: "btnHomePanico",
                                            labelWidth: 120,
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                            //plugins: ['clearbutton'],
                                            listeners: {
                                                change: function (combo, value) {
                                                    if (value == '' && parseInt(value) != 0) {
                                                        var view = this.up('smartpanicformview')
                                                        view.down('#btnHomePanicoNombre').setValue('')
                                                        view.down('#CIDESOS').setValue('')
                                                        view.down('#CIDRSOS').setValue('')
                                                        view.down('#btnHomePanicoColor').setValue('')
                                                    }
                                                }
                                            }
                                        }, {
                                            xtype: 'combobox',
                                            fieldLabel: 'Tipo',
                                            editable: false,
                                            name: "btnHomePanicoTipo",
                                            itemId: "btnHomePanicoTipo",
                                            labelWidth: 60,
                                            value: 0,
                                            store: [[0, getLocale('Evento')], [1, getLocale('Telefono')], [2, getLocale('Url')], [3, getLocale('Único evento')], [4, getLocale('Función interna')]],
                                            //plugins: ['clearbutton'],
                                            listeners: {
                                                change: function (combo, value) {
                                                    var view = this.up('smartpanicformview');
                                                    if (value == 0 || value == 3) {
                                                        // si es 0, muestro las opciones de boton
                                                        view.down('#btnHomePanicoTipoBoton').show();
                                                        view.down('#btnHomePanicoTelefono').hide();
                                                        view.down('#btnHomePanicoUrl').hide();
                                                        view.down('#btnHomePanicoActividad').hide();
                                                    } else if (value == 1) {
                                                        // si es 1, muestro las opciones de telefono
                                                        view.down('#btnHomePanicoTipoBoton').hide();
                                                        view.down('#btnHomePanicoTelefono').show();
                                                        view.down('#btnHomePanicoUrl').hide();
                                                        view.down('#btnHomePanicoActividad').hide();
                                                    } else if (value == 2) {
                                                        // si es 1, muestro las opciones de telefono
                                                        view.down('#btnHomePanicoTipoBoton').hide();
                                                        view.down('#btnHomePanicoTelefono').hide();
                                                        view.down('#btnHomePanicoUrl').show();
                                                        view.down('#btnHomePanicoActividad').hide();
                                                    } else if (value == 4) {
                                                        // si es 1, muestro las opciones de telefono
                                                        view.down('#btnHomePanicoTipoBoton').hide();
                                                        view.down('#btnHomePanicoTelefono').hide();
                                                        view.down('#btnHomePanicoUrl').hide();
                                                        view.down('#btnHomePanicoActividad').show();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'btnHomePanicoNombre',
                                            fieldLabel: 'Nombre',
                                            itemId: 'btnHomePanicoNombre',
                                            labelWidth: 60,
                                            width: 170
                                        }, {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            itemId: 'containerpickerPanico',
                                            padding: '0 0 0 5',
                                            items: [{
                                                xtype: 'textfield',
                                                name: 'btnHomePanicoColor',
                                                fieldLabel: 'Color',
                                                itemId: 'btnHomePanicoColor',
                                                labelWidth: 50,
                                                width: 120,
                                                listeners: {
                                                    change: function (field, value) {
                                                        field.setFieldStyle('background-color:' + value)
                                                    }
                                                }
                                            }, {
                                                xtype: 'button',
                                                text: 'Color picker',
                                                menu: {
                                                    xtype: 'menu',
                                                    layout: 'fit',
                                                    items: {
                                                        xtype: 'colorpicker',
                                                        fieldLabel: 'Color letra',
                                                        allowBlank: false,
                                                        listeners: {
                                                            select: function (picker, selColor) {
                                                                var container = this.up('#containerpickerPanico');
                                                                container.down('#btnHomePanicoColor').setValue('#' + selColor)
                                                                this.up('menu').hide();
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            itemId: 'btnHomePanicoTipoBoton',
                                            hidden: false,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'CIDESOS',
                                                    fieldLabel: 'Formato',
                                                    itemId: 'CIDESOS',
                                                    labelWidth: 60,
                                                    width: 110,
                                                    maxLength: 4,
                                                    enforceMaxLength: true
                                                }, {
                                                    xtype: 'textfield',
                                                    name: 'CIDRSOS',
                                                    fieldLabel: 'Restauracion',
                                                    itemId: 'CIDRSOS',
                                                    labelWidth: 90,
                                                    width: 130,
                                                    maxLength: 4,
                                                    enforceMaxLength: true,
                                                    margin: '0 0 10 0'
                                                }

                                            ]
                                        }, {
                                            xtype: 'textfield',
                                            name: 'btnHomePanicoTelefono',
                                            fieldLabel: 'Número de Telefono',
                                            itemId: 'btnHomePanicoTelefono',
                                            hidden: true,
                                            labelWidth: 150,
                                            labelAlign: 'right',
                                            width: 300
                                        }, {
                                            xtype: 'textfield',
                                            name: 'btnHomePanicoUrl',
                                            fieldLabel: 'Url',
                                            itemId: 'btnHomePanicoUrl',
                                            labelAlign: 'right',
                                            hidden: true,
                                            labelWidth: 50,
                                            width: 300
                                        }, {
                                            xtype: 'combobox',
                                            editable: false,
                                            name: 'btnHomePanicoActividad',
                                            fieldLabel: 'Función',
                                            itemId: 'btnHomePanicoActividad',
                                            labelAlign: 'right',
                                            hidden: true,
                                            labelWidth: 50,
                                            width: 300,
                                            store: [
                                                [0, getLocale('Mis cuentas')],
                                                [1, getLocale('Mis Moviles')],
                                                [2, getLocale('Mi grupo')],
                                                [3, getLocale('Extras')],
                                                [4, getLocale('Mis camaras')],
                                                [5, getLocale('Mis comandos')]
                                            ]
                                        }
                                    ]
                                }
                                // fin panico
                                //fuego                                
                                , {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Botón de fuego',
                                            editable: false,
                                            name: "btnHomeFuego",
                                            itemId: "btnHomeFuego",
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                            //plugins: ['clearbutton'],                                                                
                                            labelWidth: 120,
                                            listeners: {
                                                change: function (combo, value) {
                                                    if (value == '' && parseInt(value) != 0) {
                                                        var view = this.up('smartpanicformview')
                                                        view.down('#BTNFIRE').setValue('')
                                                        view.down('#CIDEFIRE').setValue('')
                                                        view.down('#CIDRFIRE').setValue('')
                                                        view.down('#btnHomeFuegoColor').setValue('')
                                                    }
                                                }
                                            }
                                        }, {
                                            xtype: 'combobox',
                                            fieldLabel: 'Tipo',
                                            editable: false,
                                            name: "btnHomeFuegoTipo",
                                            itemId: "btnHomeFuegoTipo",
                                            labelWidth: 60,
                                            value: 0,
                                            store: [[0, getLocale('Evento')], [1, getLocale('Telefono')], [2, getLocale('Url')], [3, getLocale('Único evento')], [4, getLocale('Función interna')]],
                                            //plugins: ['clearbutton'],
                                            listeners: {
                                                change: function (combo, value) {
                                                    var view = this.up('smartpanicformview');
                                                    if (value == 0 || value == 3) {
                                                        // si es 0, muestro las opciones de boton
                                                        view.down('#btnHomeFuegoTipoBoton').show();
                                                        view.down('#btnHomeFuegoTelefono').hide();
                                                        view.down('#btnHomeFuegoUrl').hide();
                                                        view.down('#btnHomeFuegoActividad').hide();
                                                    } else if (value == 1) {
                                                        // si es 1, muestro las opciones de telefono
                                                        view.down('#btnHomeFuegoTipoBoton').hide();
                                                        view.down('#btnHomeFuegoTelefono').show();
                                                        view.down('#btnHomeFuegoUrl').hide();
                                                        view.down('#btnHomeFuegoActividad').hide();
                                                    } else if (value == 2) {
                                                        // si es 1, muestro las opciones de telefono
                                                        view.down('#btnHomeFuegoTipoBoton').hide();
                                                        view.down('#btnHomeFuegoTelefono').hide();
                                                        view.down('#btnHomeFuegoUrl').show();
                                                        view.down('#btnHomeFuegoActividad').hide();
                                                    } else if (value == 4) {
                                                        // si es 1, muestro las opciones de telefono
                                                        view.down('#btnHomeFuegoTipoBoton').hide();
                                                        view.down('#btnHomeFuegoTelefono').hide();
                                                        view.down('#btnHomeFuegoUrl').hide();
                                                        view.down('#btnHomeFuegoActividad').show();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'BTNFIRE',
                                            fieldLabel: 'Nombre',
                                            itemId: 'BTNFIRE',
                                            labelWidth: 60,
                                            width: 170
                                        }, {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            itemId: 'containerpickerFuego',
                                            padding: '0 0 0 5',
                                            items: [{
                                                xtype: 'textfield',
                                                name: 'btnHomeFuegoColor',
                                                fieldLabel: 'Color',
                                                itemId: 'btnHomeFuegoColor',
                                                labelWidth: 50,
                                                width: 120,
                                                listeners: {
                                                    change: function (field, value) {
                                                        field.setFieldStyle('background-color:' + value)
                                                    }
                                                }
                                            }, {
                                                xtype: 'button',
                                                text: 'Color picker',
                                                menu: {
                                                    xtype: 'menu',
                                                    layout: 'fit',
                                                    items: {
                                                        xtype: 'colorpicker',
                                                        fieldLabel: 'Color letra',
                                                        allowBlank: false,
                                                        listeners: {

                                                            select: function (picker, selColor) {
                                                                var container = this.up('#containerpickerFuego');
                                                                container.down('#btnHomeFuegoColor').setValue('#' + selColor)
                                                                this.up('menu').hide();
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            itemId: 'btnHomeFuegoTipoBoton',
                                            hidden: false,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'CIDEFIRE',
                                                    fieldLabel: 'Formato',
                                                    itemId: 'CIDEFIRE',
                                                    labelWidth: 60,
                                                    width: 110,
                                                    maxLength: 4,
                                                    enforceMaxLength: true
                                                }, {
                                                    xtype: 'textfield',
                                                    name: 'CIDRFIRE',
                                                    fieldLabel: 'Restauracion ',
                                                    itemId: 'CIDRFIRE',
                                                    labelWidth: 90,
                                                    width: 130,
                                                    maxLength: 4,
                                                    enforceMaxLength: true
                                                }
                                            ]
                                        }, {
                                            xtype: 'textfield',
                                            name: 'btnHomeFuegoTelefono',
                                            fieldLabel: 'Número de Telefono',
                                            itemId: 'btnHomeFuegoTelefono',
                                            labelWidth: 150,
                                            labelAlign: 'right',
                                            hidden: true,
                                            width: 300
                                        }, {
                                            xtype: 'textfield',
                                            name: 'btnHomeFuegoUrl',
                                            fieldLabel: 'Url',
                                            itemId: 'btnHomeFuegoUrl',
                                            hidden: true,
                                            labelAlign: 'right',
                                            labelWidth: 50,
                                            width: 300
                                        }, {
                                            xtype: 'combobox',
                                            name: 'btnHomeFuegoActividad',
                                            editable: false,
                                            fieldLabel: 'Función',
                                            itemId: 'btnHomeFuegoActividad',
                                            labelAlign: 'right',
                                            hidden: true,
                                            labelWidth: 50,
                                            width: 300,
                                            store: [
                                                [0, getLocale('Mis cuentas')],
                                                [1, getLocale('Mis Moviles')],
                                                [2, getLocale('Mi grupo')],
                                                [3, getLocale('Extras')],
                                                [4, getLocale('Mis camaras')],
                                                [5, getLocale('Mis comandos')]
                                            ]
                                        }
                                    ]
                                }
                                //fin fuego
                                //asistencia
                                , {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: 'hbox',
                                    items: [{
                                        xtype: 'combobox',
                                        fieldLabel: 'Botón de asistencia',
                                        editable: false,
                                        labelWidth: 120,
                                        name: "btnHomeAsistencia",
                                        itemId: "btnHomeAsistencia",
                                        value: 1,
                                        store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                        //plugins: ['clearbutton'],
                                        listeners: {
                                            change: function (combo, value) {
                                                if (value == '' && parseInt(value) != 0) {
                                                    var view = this.up('smartpanicformview')
                                                    view.down('#BTNASSIST').setValue('')
                                                    view.down('#CIDEASSIST').setValue('')
                                                    view.down('#CIDRASSIST').setValue('')
                                                    view.down('#btnHomeAsistenciaColor').setValue('')
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: 'combobox',
                                        fieldLabel: 'Tipo',
                                        name: "btnHomeAsistenciaTipo",
                                        editable: false,
                                        itemId: "btnHomeAsistenciaTipo",
                                        labelWidth: 60,
                                        value: 0,
                                        store: [[0, getLocale('Evento')], [1, getLocale('Telefono')], [2, getLocale('Url')], [3, getLocale('Único evento')], [4, getLocale('Función interna')]],
                                        //plugins: ['clearbutton'],
                                        listeners: {
                                            change: function (combo, value) {
                                                var view = this.up('smartpanicformview');
                                                if (value == 0 || value == 3) {
                                                    // si es 0, muestro las opciones de boton
                                                    view.down('#btnHomeAsistenciaTipoBoton').show();
                                                    view.down('#btnHomeAsistenciaTelefono').hide();
                                                    view.down('#btnHomeAsistenciaUrl').hide();
                                                    view.down('#btnHomeAsistenciaActividad').hide();
                                                } else if (value == 1) {
                                                    // si es 1, muestro las opciones de telefono
                                                    view.down('#btnHomeAsistenciaTipoBoton').hide();
                                                    view.down('#btnHomeAsistenciaTelefono').show();
                                                    view.down('#btnHomeAsistenciaUrl').hide();
                                                    view.down('#btnHomeAsistenciaActividad').hide();
                                                } else if (value == 2) {
                                                    // si es 1, muestro las opciones de telefono
                                                    view.down('#btnHomeAsistenciaTipoBoton').hide();
                                                    view.down('#btnHomeAsistenciaTelefono').hide();
                                                    view.down('#btnHomeAsistenciaUrl').show();
                                                    view.down('#btnHomeAsistenciaActividad').hide();
                                                } else if (value == 4) {
                                                    // si es 1, muestro las opciones de telefono
                                                    view.down('#btnHomeAsistenciaTipoBoton').hide();
                                                    view.down('#btnHomeAsistenciaTelefono').hide();
                                                    view.down('#btnHomeAsistenciaUrl').hide();
                                                    view.down('#btnHomeAsistenciaActividad').show();
                                                }
                                            }
                                        }
                                    }
                                        , {
                                        xtype: 'textfield',
                                        name: 'BTNASSIST',
                                        fieldLabel: 'Nombre',
                                        itemId: 'BTNASSIST',
                                        labelWidth: 60,
                                        width: 170
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        itemId: 'containerpickerAsistencia',
                                        padding: '0 0 0 5',
                                        items: [{
                                            xtype: 'textfield',
                                            name: 'btnHomeAsistenciaColor',
                                            fieldLabel: 'Color',
                                            itemId: 'btnHomeAsistenciaColor',
                                            labelWidth: 50,
                                            width: 120,
                                            listeners: {
                                                change: function (field, value) {
                                                    field.setFieldStyle('background-color:' + value)
                                                }
                                            }
                                        }, {
                                            xtype: 'button',
                                            text: 'Color picker',
                                            menu: {
                                                xtype: 'menu',
                                                layout: 'fit',
                                                items: {
                                                    xtype: 'colorpicker',
                                                    fieldLabel: 'Color letra',
                                                    allowBlank: false,
                                                    listeners: {

                                                        select: function (picker, selColor) {
                                                            var container = this.up('#containerpickerAsistencia');
                                                            container.down('#btnHomeAsistenciaColor').setValue('#' + selColor)
                                                            this.up('menu').hide();
                                                            return false;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        ]
                                    }
                                        , {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        itemId: 'btnHomeAsistenciaTipoBoton',
                                        hidden: false,
                                        items:
                                            [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'CIDEASSIST',
                                                    fieldLabel: 'Formato',
                                                    itemId: 'CIDEASSIST',
                                                    labelWidth: 60,
                                                    width: 110,
                                                    maxLength: 4,
                                                    enforceMaxLength: true
                                                }, {
                                                    xtype: 'textfield',
                                                    name: 'CIDRASSIST',
                                                    fieldLabel: 'Restauracion',
                                                    itemId: 'CIDRASSIST',
                                                    labelWidth: 90,
                                                    width: 130,
                                                    maxLength: 4,
                                                    enforceMaxLength: true
                                                }

                                            ]
                                    }, {
                                        xtype: 'textfield',
                                        name: 'btnHomeAsistenciaTelefono',
                                        fieldLabel: 'Número de Telefono',
                                        itemId: 'btnHomeAsistenciaTelefono',
                                        labelWidth: 150,
                                        labelAlign: 'right',
                                        hidden: true,
                                        width: 300
                                    }, {
                                        xtype: 'textfield',
                                        name: 'btnHomeAsistenciaUrl',
                                        fieldLabel: 'Url',
                                        itemId: 'btnHomeAsistenciaUrl',
                                        hidden: true,
                                        labelAlign: 'right',
                                        labelWidth: 50,
                                        width: 300
                                    }, {
                                        xtype: 'combobox',
                                        editable: false,
                                        name: 'btnHomeAsistenciaActividad',
                                        fieldLabel: 'Función',
                                        itemId: 'btnHomeAsistenciaActividad',
                                        labelAlign: 'right',
                                        hidden: true,
                                        labelWidth: 50,
                                        width: 300,
                                        store: [
                                            [0, getLocale('Mis cuentas')],
                                            [1, getLocale('Mis Moviles')],
                                            [2, getLocale('Mi grupo')],
                                            [3, getLocale('Extras')],
                                            [4, getLocale('Mis camaras')],
                                            [5, getLocale('Mis comandos')]
                                        ]
                                    }
                                    ]
                                }
                                // fin asistencia
                                // envio de audio y video
                                , {
                                    xtype: 'fieldset',
                                    collapsible: true,
                                    collapsed: false,
                                    title: 'Envío de audio y video automático luego de SOS',
                                    defaults: { // defaults are applied to items, not the container
                                        labelWidth: 140
                                    },
                                    margin: '0 0 10 0',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            editable: false,
                                            fieldLabel: 'Habilitar en device',
                                            name: "habilitarMultimedia",
                                            itemId: 'habilitarMultimedia',
                                            value: '',
                                            store: [[2, getLocale('Deshabilitado')], [1, getLocale('Habilitado')]],
                                            listeners: {
                                                change: function (combo, value) {
                                                    var view = combo.up('smartpanicformview')
                                                    if (value == 1) {
                                                        view.down('#envioAudioAuto').show();
                                                        view.down('#envioVideoAuto').show();
                                                        // view.down('#envioAudioAuto').setDisabled(true)
                                                        // view.down('#envioVideoAuto').setDisabled(true)
                                                    } else {
                                                        view.down('#envioAudioAuto').hide();
                                                        view.down('#envioVideoAuto').hide();

                                                        /**
                                                         * BC 386521427 : Se realiza el seteo de videoAuto y audioAuto en 0
                                                         * Para que no funcionen al momento de deshabilitar el device.
                                                         */
                                                        view.down('#envioVideoAuto').setValue(0);
                                                        view.down('#envioAudioAuto').setValue(0);
                                                    }

                                                }
                                            }
                                        }, {
                                            xtype: 'combobox',
                                            // plugins: ['clearbutton'],
                                            fieldLabel: 'Audio',
                                            editable: false,
                                            name: "envioAudioAuto",
                                            itemId: 'envioAudioAuto',
                                            hidden: true,
                                            value: '',
                                            emptyText: getLocale('Seleccione'),
                                            store: [[1, getLocale('Sí')], [0, getLocale('No')]],
                                            listeners: {
                                                change: function (combo, newvalue, oldvalue) {
                                                    var view = combo.up('smartpanicformview');
                                                    if (newvalue == 1) {
                                                        view.down('#envioVideoAuto').disable();
                                                    } else {
                                                        view.down('#envioVideoAuto').enable();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Video',
                                            //   plugins: ['clearbutton'],
                                            name: "envioVideoAuto",
                                            itemId: 'envioVideoAuto',
                                            editable: false,
                                            hidden: true,
                                            value: 0,
                                            emptyText: getLocale('Seleccione'),
                                            store: [[2, getLocale('Cámara frontal')], [1, getLocale('Cámara trasera')], [0, getLocale('Desactivado')]],
                                            listeners: {
                                                change: function (combo, newvalue, oldvalue) {
                                                    var view = combo.up('smartpanicformview');
                                                    if (newvalue == 0) {
                                                        view.down('#envioAudioAuto').enable();
                                                    } else {
                                                        view.down('#envioAudioAuto').disable();
                                                        view.down('#envioAudioAuto').setValue(0);
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }

                                // ,{ xtype:'component', width:'100%', height:1, html:'<hr />'}
                                //en camino
                                , {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: 'hbox',
                                    items: [{
                                        xtype: 'combobox',
                                        fieldLabel: 'Botón en Camino',
                                        editable: false,
                                        name: "btnHomeEnCamino",
                                        itemId: "btnHomeEnCamino",
                                        store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                        //plugins: ['clearbutton'],
                                        listeners: {
                                            change: function (combo, value) {
                                                if (value == '' && parseInt(value) != 0) {
                                                    var view = this.up('smartpanicformview')
                                                    view.down('#btnHomeEnCaminoNombre').setValue('')
                                                    view.down('#btnHomeEnCaminoColor').setValue('')
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: 'textfield',
                                        name: 'btnHomeEnCaminoNombre',
                                        fieldLabel: 'Nombre',
                                        itemId: 'btnHomeEnCaminoNombre',
                                        labelWidth: 50,
                                        width: 170
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        itemId: 'containerpickerEnCamino',
                                        items: [{
                                            xtype: 'textfield',
                                            name: 'btnHomeEnCaminoColor',
                                            fieldLabel: 'Color',
                                            itemId: 'btnHomeEnCaminoColor',
                                            labelWidth: 50,
                                            width: 120,
                                            listeners: {
                                                change: function (field, value) {
                                                    field.setFieldStyle('background-color:' + value)
                                                }
                                            }
                                        }, {
                                            xtype: 'button',
                                            text: 'Color picker',
                                            menu: {
                                                xtype: 'menu',
                                                layout: 'fit',
                                                items: {
                                                    xtype: 'colorpicker',
                                                    fieldLabel: 'Color letra',
                                                    allowBlank: false,
                                                    listeners: {

                                                        select: function (picker, selColor) {
                                                            var container = this.up('#containerpickerEnCamino');
                                                            container.down('#btnHomeEnCaminoColor').setValue('#' + selColor)
                                                            this.up('menu').hide();
                                                            return false;
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                        ]
                                    }]
                                }
                                // fin en camino
                                //,{ xtype:'component', width:'100%', height:20, html:'<hr />'}
                                //estoy aqui
                                , {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: 'hbox',
                                    items: [{
                                        xtype: 'combobox',
                                        fieldLabel: 'Estoy aquí',
                                        editable: false,
                                        name: "btnEstoyAqui",
                                        itemId: "btnEstoyAqui",
                                        store: [[1, getLocale('Visible')], [0, getLocale('Oculto')], [2, getLocale('Grisado')]],
                                        //plugins: ['clearbutton'],
                                        listeners: {
                                            change: function (combo, value) {
                                                if (value == '' && parseInt(value) != 0) {
                                                    var view = this.up('smartpanicformview')
                                                    view.down('#btnHomeEstoyAquiNombre').setValue('')
                                                    view.down('#btnHomeEstoyAquiColor').setValue('')
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: 'textfield',
                                        name: 'btnHomeEstoyAquiNombre',
                                        fieldLabel: 'Nombre',
                                        itemId: 'btnHomeEstoyAquiNombre',
                                        labelWidth: 50,
                                        width: 170
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        itemId: 'containerpickerEstoyAqui',
                                        items: [{
                                            xtype: 'textfield',
                                            name: 'btnHomeEstoyAquiColor',
                                            fieldLabel: 'Color',
                                            itemId: 'btnHomeEstoyAquiColor',
                                            labelWidth: 50,
                                            width: 120,
                                            listeners: {
                                                change: function (field, value) {
                                                    field.setFieldStyle('background-color:' + value)
                                                }
                                            }
                                        }, {
                                            xtype: 'button',
                                            text: 'Color picker',
                                            menu: {
                                                xtype: 'menu',
                                                layout: 'fit',
                                                items: {
                                                    xtype: 'colorpicker',
                                                    fieldLabel: 'Color letra',
                                                    allowBlank: false,
                                                    listeners: {

                                                        select: function (picker, selColor) {
                                                            var container = this.up('#containerpickerEstoyAqui');
                                                            container.down('#btnHomeEstoyAquiColor').setValue('#' + selColor)
                                                            this.up('menu').hide();
                                                            return false;
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                        ]
                                    }]
                                }
                                //fin estoy aqui
                                //,{ xtype:'component', width:'100%', height:10, html:'<hr />'}
                                //boton extra
                                , {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: 'hbox',
                                    itemId: 'btn-extra-set',
                                    items: [{
                                        xtype: 'combobox',
                                        fieldLabel: 'Botones extra',
                                        editable: false,
                                        name: "btnExtras",
                                        itemId: "btnExtras",
                                        store: [[1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                        //plugins: ['clearbutton'],
                                        listeners: {
                                            change: function (combo, value) {
                                                if (value == '' && parseInt(value) != 0) {
                                                    var view = this.up('smartpanicformview')
                                                    view.down('#btnExtrasNombre').setValue('')
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: 'textfield',
                                        name: 'btnExtrasNombre',
                                        fieldLabel: 'Nombre',
                                        itemId: 'btnExtrasNombre',
                                        labelWidth: 50,
                                        width: 170
                                    }]
                                }
                                //fin boton extra
                                /* ,{
                                    xtype: 'fieldset',
                                    collapsible: true,
                                    collapsed: false,
                                    title: 'Botones extras',
                                    hidden:true,
                                    itemId:'btn-extras-config',
                                    items: [                                        
                                    ]
                                }*/
                            ]
                        }
                    ]
                }, {
                    xtype: 'smartpanicsgeocercagridview',
                    title: 'Geocercas',
                    itemId: 'geocercas',
                    module: { profile: 1 }
                }, {
                    xtype: 'form',
                    title: 'Campos extra',
                    itemId: 'camposExtra',
                    hidden: false
                }
            ]
        }
    ],
    /*buttons : [{
                text : 'Guardar',
                action: 'save',
                formBind : true
            }, {
                text : 'Cancelar',
                action: 'cancel'
            }],*/
    initComponent: function () {
        this.callParent();
        this.down('#geocercas').record = this.record
        this.down('#geocercas').module = { profile: 1 }



        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            dock: 'bottom',
            items: [
                {
                    xtype: 'component',
                    itemId: 'msgdata'
                }, "->",
                {
                    text: 'Guardar',
                    action: 'save',
                    formBind: true
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }
            ]
        });
        this.addDocked(toolbar);
    } // cierro init
});