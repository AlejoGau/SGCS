Ext.define('SmartPanics.view.ConfiguraLandingFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.ConfiguraLandingFormView'],
    title: 'Configuracion Landing',
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true,
        anchor: '100%',
    },
    items: [
        {
            xtype: 'tabpanel',
            itemId: 'tab',
            items: [
                {
                    xtype: 'container',
                    title: getLocale('General'),
                    width: 1500,
                    itemId: 'configuraciontab',
                    layout: {
                        type: 'vbox'
                    },
                    defaults: { // defaults are applied to items, not the container
                        margin: '0 0 10 0',
                        width: 1500
                    },
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Activar Pago',
                                    name: "activarPago",
                                    itemId: "activarPago",
                                    value: "activarPago",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'principalServer',
                                    fieldLabel: getLocale('Servidor Principal'),
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    anchor: '100%',
                                    width: 500,
                                    labelWidth: 120,
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'nombreForm',
                                    fieldLabel: getLocale('Nombre Landing'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120,
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Solicitar Codigo Activacion',
                                    name: "solicitarCodigoActivacion",
                                    itemId: "solicitarCodigoActivacion",
                                    value: "solicitarCodigoActivacion",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                },
                                {
                                    xtype: 'textarea',
                                    name: 'codigoActivacion',
                                    fieldLabel: getLocale('Codigos de Activacion'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120

                                },
                                {
                                    xtype: 'textfield',
                                    name: 'Dealer',
                                    fieldLabel: getLocale('Dealer'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                },
                            ]
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Auto Activar SP',
                                    name: "autoActivarSP",
                                    itemId: "autoActivarSP",
                                    value: "autoActivarSP",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                }, {
                                    xtype: 'textfield',
                                    name: 'groupMax',
                                    fieldLabel: getLocale('Grupo Máximo'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'emailsTemplates',
                                    fieldLabel: getLocale('Mails Template'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                }
                            ]
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Automonitoreo',
                                    name: "automonitoreo",
                                    itemId: "automonitoreo",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "automonitoreo",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                }, {
                                    xtype: 'textfield',
                                    name: 'reCaptcha',
                                    fieldLabel: getLocale('Key reCaptcha'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'apptype',
                                    fieldLabel: getLocale('App Type'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                }
                            ]
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Enviar Email',
                                    name: "enviarEmail",
                                    itemId: "enviarEmail",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "enviarEmail",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                }, {
                                    xtype: 'textfield',
                                    name: 'plantillaSP',
                                    fieldLabel: getLocale('Plantilla SP'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'cuentatipo',
                                    fieldLabel: getLocale('Cuenta Tipo'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                }
                            ]
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Comportamineto Landing',
                                    name: "esLandingAcotada",
                                    itemId: "esLandingAcotada",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "esLandingAcotada",
                                    store: [["cta_existente_directa_valida_telofono", "Cta Existente Valida Telefono"], ["cta_existente_directa_valida_clave", "Cta Existente Valida Clave"], ["cta_nueva_directa", "Cta Nueva"], ["cta_seleccion_valida_telefono", "Cta Opción: Nueva, Existente Valida Telefono"], ["cta_seleccion_valida_clave", "Cta Opción: Nueva, Existente Valida Clave"], ["cta_reemplazar", "Cta Reemplazar (Tel/Email)"]],
                                    width: 400,
                                    labelWidth: 220
                                }, {
                                    xtype: 'textfield',
                                    name: 'diasprueba',
                                    fieldLabel: getLocale('Dias Prueba'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'nombreApp',
                                    fieldLabel: getLocale('Nombre Aplicacion'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                }
                            ]
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Demo',
                                    name: "demo",
                                    itemId: "demo",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "demo",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220,
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Theme',
                                    name: "theme",
                                    itemId: "theme",
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "theme",
                                    store: [
                                        ["default", "#164e63"], ["theme-1", "#3d8bfd"], ["theme-2", "#8540f5"],
                                        ["theme-3", "#59359a"], ["theme-4", "#d63384"], ["theme-5", "#dc3545"],
                                        ["theme-6", "#fd7e14"], ["theme-7", "#ffc107"], ["theme-8", "#198754"],
                                        ["theme-9", "#20c997"], ["theme-10", "#055160"], ["theme-11", "#6c757d"],
                                        ["theme-12", "#212529"]
                                    ],
                                    tpl: '<tpl for="."><div class="x-boundlist-item" style="color:white; background-color:{field2}">{field1}</div></tpl>',
                                    width: 500,
                                    labelWidth: 120,
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mostrar Fec Nac',
                                    name: "mostrarFecNac",
                                    itemId: "mostrarFecNac",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "mostrarFecNac",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 500,
                                    labelWidth: 120,
                                }
                            ]
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Dias Prueba Campo',
                                    name: "diasPruebaCampo",
                                    itemId: "diasPruebaCampo",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "diasPruebaCampo",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mostrar pais',
                                    name: "mostrarPais",
                                    itemId: "mostrarPais",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "mostrarPais",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 500,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mostrar provincia',
                                    name: "mostrarProvincia",
                                    itemId: "mostrarProvincia",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 500,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'step2LabelProvincia',
                                    fieldLabel: 'Label Provincia',
                                    labelWidth: 120,
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'lcfg_iid_json',
                                    fieldLabel: getLocale('Id Landing'),
                                    anchor: '100%',
                                    disabled: true,
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                },
                            ]
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Violencia de Genero',
                                    name: "violenciagenero",
                                    itemId: "violenciagenero",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "violenciagenero",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220,
                                    listeners: {
                                        change: function (combo, newValue) {
                                            var textField = combo.up('form').down('#dealerViolenciagenero'); // Usamos itemId para evitar afectar otros campos
                                            if (textField) {
                                                if (newValue === 'si') {
                                                    textField.setDisabled(false);
                                                    textField.show();
                                                } else {
                                                    textField.setDisabled(true);
                                                    textField.hide();
                                                    textField.setValue(""); // Opcional: Limpia el campo al ocultarlo
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'dealerViolenciagenero',
                                    itemId: 'dealerViolenciagenero', // Agregamos itemId para identificarlo de forma única
                                    fieldLabel: 'Dealer Violencia de Genero',
                                    anchor: '100%',
                                    disabled: true, // Inicialmente deshabilitado
                                    hidden: true,   // Inicialmente oculto
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 120
                                },{
                                    xtype: 'combobox',
                                    fieldLabel: 'Mostrar campo discapacidad',
                                    name: "campoDiscapacidad",
                                    itemId: "campoDiscapacidad",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "campoDiscapacidad",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 500,
                                    labelWidth: 120,
                                }
                            ]
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Label Custom',
                                    name: "labelCustom",
                                    itemId: "labelCustom",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "labelCustom",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Mostrar DNI',
                                    name: "mostrarDNI",
                                    itemId: "mostrarDNI",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "mostrarDNI",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'defaultOptionPais',
                            itemId: 'defaultOptionPais',
                            fieldLabel: 'Opción default País',
                            emptyText: 'Ej: Seleccionar país',
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'defaultOptionProvincia',
                            itemId: 'defaultOptionProvincia',
                            fieldLabel: 'Opción default Provincia',
                            emptyText: 'Ej: Seleccionar provincia',
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        }, {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Autocompletar direccion',
                                    name: "autocompletarDireccion",
                                    itemId: "autocompletarDireccion",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "autocompletarDireccion",
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Pais para autocompletar direccion',
                                    name: "paisAutocompletarDireccion",
                                    itemId: "paisAutocompletarDireccion",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    value: "paisAutocompletarDireccion",
                                    displayField: 'pro_cdescripcion',
                                    valueField: 'pro_ccodigo',
                                    queryMode: 'remote',
                                    minChars: 0,
                                    store: {
                                        fields: ['pro_ccodigo', 'pro_cdescripcion'],
                                        proxy: {
                                            type: 'ajax',
                                            url: '/rest/search/paises',
                                            reader: {
                                                type: 'json',
                                                rootProperty: 'rows'
                                            }
                                        },
                                        autoLoad: true
                                    },
                                    width: 500,
                                    labelWidth: 220
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Textos'),
                    width: 1400,
                    itemId: 'textosmodif',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'pagoPendienteTitulo',
                            fieldLabel: getLocale('Titulo pago pendiente'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'pagoPendienteSubTitulo',
                            fieldLabel: getLocale('Subtitulo pago pendiente'),
                            labelWidth: 200,
                            anchor: '100%',
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                        },
                        {
                            xtype: 'textfield',
                            name: 'pagoPendienteBajadaLinea',
                            fieldLabel: getLocale('Texto pago pendiente'),
                            anchor: '100%',
                            labelWidth: 200,
                            width: 1400,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'pagoPendienteTextoBoton',
                            fieldLabel: getLocale('Texto boton pagar'),
                            anchor: '100%',
                            width: 800,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'btnCancelarPago',
                            fieldLabel: getLocale('Texto boton cancelar'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'errorValidatePending',
                            fieldLabel: getLocale('Error imei'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'condiciones',
                            fieldLabel: getLocale('Terminos y condiciones'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'textoConfiramaPagoComun',
                            fieldLabel: getLocale('Mensaje confirmacion pago'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'btnVolver',
                            fieldLabel: getLocale('Texto boton volver'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'lblFaltaImei',
                            fieldLabel: getLocale('Mensaje falta imei'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'textoInicio',
                            fieldLabel: getLocale('Titulo inicio'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'lblTituloForm',
                            fieldLabel: getLocale('Titulo formulario'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textarea',
                            name: 'imeiValidated',
                            fieldLabel: getLocale('Mensaje imei ya registrado'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'lblTextoCodPromocional',
                            fieldLabel: getLocale('Texto código promocional'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'planTitulo',
                            fieldLabel: getLocale('Titulo medios pago'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'mostrarMensaje',
                            fieldLabel: getLocale('Mostrar Mensaje'),
                            anchor: '100%',
                            width: 1400,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Textos Paso 1'),
                    width: 1400,
                    itemId: 'step1Textos',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'step1Placeholder',
                            itemId: 'step1Placeholder',
                            fieldLabel: getLocale('Step 1 Place Holder'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step1ShowErrorCodigoTexto1',
                            itemId: 'step1ShowErrorCodigoTexto1',
                            fieldLabel: getLocale('Step 1 Show Error Codigo Texto 1'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step1ShowErrorCodigoTexto2',
                            fieldLabel: getLocale('Step 1 Show Error Codigo Texto 2'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'txtBtnSiguiente',
                            fieldLabel: getLocale('Botón Siguiente'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'txtBtnAnterior',
                            fieldLabel: getLocale('Botón Anterior'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step1MayorDeEdad',
                            itemId: 'step1MayorDeEdad',
                            fieldLabel: getLocale('Mayor de Edad'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step1NroCta',
                            fieldLabel: getLocale('Nro Cuenta'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step1DatosErroneos',
                            fieldLabel: getLocale('No Corresponde a Cuenta'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step1IngreseClave',
                            fieldLabel: getLocale('Ingrese Clave'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Textos Paso 2'),
                    width: 1400,
                    itemId: 'step2Textos',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'step2BtnYaTengoCta',
                            fieldLabel: getLocale('Botón Ya Tengo Cuenta'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2BtnSoyUsuario',
                            fieldLabel: getLocale('Botón Soy Usuario Nuevo'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2TituloDatosPersonales',
                            fieldLabel: getLocale('Título Datos Personales'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2PlaceHolderNombre',
                            fieldLabel: getLocale('Place Holder Nombre'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2ShowErrorNombre',
                            fieldLabel: getLocale('Error Nombre'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2PlaceHolderDireccion',
                            fieldLabel: getLocale('Place Holder Dirección'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2ShowErrorDireccion',
                            fieldLabel: getLocale('Error Dirección'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2Localidad',
                            itemId: 'step2Localidad',
                            fieldLabel: getLocale('Localidad'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2ViolenciaGenero',
                            itemId: 'step2ViolenciaGenero',
                            fieldLabel: getLocale('Violencia de Genero'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2Discapacidad',
                            itemId: 'step2Discapacidad',
                            fieldLabel: getLocale('Place Holder Discapacidad'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step2PlaceholderCustom',
                            itemId: 'step2PlaceholderCustom',
                            fieldLabel: getLocale('Place Holder Custom'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'tiposDNI',
                            itemId: 'tiposDNI',
                            fieldLabel: getLocale('Tipos de DNI'),
                            emptyText: 'CC,CE,PA,TI,PPT',
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Textos Paso 3'),
                    width: 1400,
                    itemId: 'step3Textos',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'step3Titulo',
                            fieldLabel: getLocale('Título Información Personal'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3PlaceHolderEmail',
                            fieldLabel: getLocale('Place Holder Email'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3ShowErrorEmail',
                            fieldLabel: getLocale('Error Email'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3ShowLabelErrorFormatMail',
                            fieldLabel: getLocale('Error Formato Email'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3ShowLabelErrorExisteMail',
                            fieldLabel: getLocale('Error Email Existente'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3PlaceHolderConfirmaMail',
                            fieldLabel: getLocale('Place Holder Confirmar Email'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3ShowLabelErrorConfirmaMail',
                            fieldLabel: getLocale('Error Confirmar Email'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3showLabelErrorFormatConfirmaMail',
                            fieldLabel: getLocale('Error Formato Confirmar Email'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3ShowLabelErrorCompareMail',
                            fieldLabel: getLocale('Error Comparación Emails'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3PlaceHolderTel',
                            fieldLabel: getLocale('Place Holder Teléfono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3PlaceHolderConfirmaTel',
                            fieldLabel: getLocale('Place Holder Confirmar Teléfono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3showLabelErrorTel',
                            fieldLabel: getLocale('Error Teléfono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3showLabelErrorLongTel',
                            fieldLabel: getLocale('Error Longitud Teléfono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3showLabelErrorExisteTel',
                            fieldLabel: getLocale('Error Teléfono Existente'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3showLabelErrorConfirmaTel',
                            fieldLabel: getLocale('Error Confirmar Teléfono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3showLabelErrorConfirmaLongTel',
                            fieldLabel: getLocale('Error Confirmar Teléfono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step3showLabelErrorCompareTel',
                            fieldLabel: getLocale('Error Confirmar Teléfono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Textos Paso 4'),
                    width: 1400,
                    itemId: 'step4Textos',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'step4TituloVerificarDatos',
                            itemId: 'step4TituloVerificarDatos',
                            fieldLabel: getLocale('Verificar Datos'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step4LabelNombre',
                            fieldLabel: getLocale('Nombre'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step4LabelDireccion',
                            fieldLabel: getLocale('Direccion'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step4LabelPais',
                            fieldLabel: getLocale('Pais'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step4LabelTelefono',
                            fieldLabel: getLocale('Telefono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step4LabelMail',
                            fieldLabel: getLocale('Mail'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step4btnVolver',
                            fieldLabel: getLocale('Boton Volver'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step4btnEnviar',
                            fieldLabel: getLocale('Boton Enviar'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'mensajeVerificaionExitosa',
                            fieldLabel: getLocale('Mensaje Verificacion'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step4FecNac',
                            fieldLabel: getLocale('Fec Nac'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        }

                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Otros pasos'),
                    width: 1400,
                    itemId: 'stepOtros',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'steepOtrosActivar',
                            fieldLabel: getLocale('Btn Activar'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step1CuentaYTelefono',
                            fieldLabel: getLocale('Cuenta y telefono'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'step1CuentaYClave',
                            fieldLabel: getLocale('Cuenta y Clave'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 1400,
                            labelWidth: 200
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Freemium'),
                    width: 1500,
                    itemId: 'freemium',
                    layout: {
                        type: 'vbox'
                    },
                    defaults: { // defaults are applied to items, not the container
                        margin: '0 0 10 0',
                        width: 1500
                    },
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: getLocale('Activar Freemium'),
                                    name: "activarFreemium",
                                    itemId: "activarFreemium",
                                    value: "activarFreemium",
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    store: [["si", "si"], ["no", "no"]],
                                    width: 400,
                                    labelWidth: 220
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'DealerFreemium',
                                    fieldLabel: getLocale('Dealer Freemium'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 220
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'textoBotonFreemium',
                                    fieldLabel: getLocale('Texto Boton Freemium'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 500,
                                    labelWidth: 220
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'textoConfiramaPagoFreemium',
                                    fieldLabel: getLocale('Texto Confirama Pago Freemium'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 700,
                                    labelWidth: 220
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'textoRegistroFreemium',
                                    fieldLabel: getLocale('Texto Registro Freemium'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 700,
                                    labelWidth: 220
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'textoInvitaPagar',
                                    fieldLabel: getLocale('Texto Invita Pagar'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 700,
                                    labelWidth: 220
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'errorFreemium',
                                    fieldLabel: getLocale('Mensaje Error Freemium'),
                                    anchor: '100%',
                                    margin: '5 25 5 5',
                                    padding: '5 5 5 5',
                                    width: 700,
                                    labelWidth: 220
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Mercado Pago'),
                    width: 1400,
                    itemId: 'mercadopago',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'Public_Key',
                            fieldLabel: getLocale('Llave Publica'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 800,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'Access_Token',
                            fieldLabel: getLocale('Token de Acceso'),
                            labelWidth: 200,
                            anchor: '100%',
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 800,
                        },
                        {
                            xtype: 'textfield',
                            name: 'preapproval_plan_id_mensual',
                            fieldLabel: getLocale('Id Plan Mensual'),
                            anchor: '100%',
                            labelWidth: 200,
                            width: 800,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'preapproval_plan_id_anual',
                            fieldLabel: getLocale('Id Plan Anual'),
                            anchor: '100%',
                            width: 800,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: '_clientId',
                            fieldLabel: getLocale('Scritp Mercado Pago'),
                            anchor: '100%',
                            width: 800,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            name: 'clientSecret',
                            fieldLabel: getLocale('Llave Secreta'),
                            anchor: '100%',
                            width: 800,
                            labelWidth: 200,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Mail empresa'),
                    width: 1400,
                    itemId: 'mailempresa',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'MailTo',
                            fieldLabel: getLocale('Destinatario'),
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 800,
                            labelWidth: 200
                        },
                        {
                            xtype: 'textfield',
                            name: 'MailSubject',
                            fieldLabel: getLocale('Asunto'),
                            labelWidth: 200,
                            anchor: '100%',
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 800,
                        },
                        {
                            xtype: 'textarea',
                            name: 'MailBodyNO',
                            fieldLabel: getLocale('Mensaje'),
                            anchor: '100%',
                            labelWidth: 200,
                            width: 800,
                            height: 300,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Mail cliente'),
                    width: 1400,
                    itemId: 'mailcliente',
                    padding: '5 5 5 5',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'MailSubjectCustomer',
                            fieldLabel: getLocale('Asunto'),
                            labelWidth: 200,
                            anchor: '100%',
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                            width: 800,
                        },
                        {
                            xtype: 'textarea',
                            name: 'MailBodyCustomer',
                            fieldLabel: getLocale('Mensaje'),
                            anchor: '100%',
                            labelWidth: 200,
                            width: 800,
                            height: 300,
                            margin: '5 25 5 5',
                            padding: '5 5 5 5',
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Validacion WhatsApp'),
                    width: 1400,
                    itemId: 'validawhatsapp',
                    padding: '5 5 5 5',
                    fieldDefaults: { labelAlign: 'left' },
                    items: [
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'keycontrol', fieldLabel: getLocale('Key de control'), labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'beaerToken', fieldLabel: getLocale('Bearer Token'), labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'msjvalidacion', fieldLabel: getLocale('Mensaje Validacion'), labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'combobox', name: 'validarTelefonoWhatsapp', itemId: 'validarTelefonoWhatsapp', fieldLabel: 'Validar Tel WhatsApp', store: [['si', 'si'], ['no', 'no']], labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'whatsappTituloModal', fieldLabel: 'Titulo Modal', labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'whatsappSubtituloModal', fieldLabel: 'Subtitulo Modal', labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'whatsappPlaceholderCodigo', fieldLabel: 'Placeholder Codigo', labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'whatsappBtnEnviarCodigo', fieldLabel: 'Btn Enviar Codigo', labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'whatsappBtnValidar', fieldLabel: 'Btn Validar', labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'whatsappBtnReenviar', fieldLabel: 'Btn Reenviar', labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'whatsappErrorCodigoVacio', fieldLabel: 'Error Codigo Vacio', labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'whatsappErrorCodigoInvalido', fieldLabel: 'Error Codigo Invalido', labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'whatsappMensajeEnviado', fieldLabel: 'Msj Codigo Enviado', labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'whatsappMensajeReenviado', fieldLabel: 'Msj Codigo Reenviado', labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'whatsappEnviandoCodigo', fieldLabel: 'Texto Enviando', labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'whatsappValidando', fieldLabel: 'Texto Validando', labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'whatsappCodigoValidado', fieldLabel: 'Msj Codigo Validado', labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'whatsappErrorEnvio', fieldLabel: 'Error al Enviar', labelWidth: 150, width: 680 }
                        ]},
                        { xtype: 'container', layout: 'hbox', margin: '5 0 5 0', items: [
                            { xtype: 'textfield', name: 'whatsappValidezCodigo', fieldLabel: 'Texto Validez Codigo', labelWidth: 150, margin: '0 15 0 0', width: 680 },
                            { xtype: 'textfield', name: 'whatsappMensajeInicial', fieldLabel: 'Msj Inicial ({telefono})', labelWidth: 150, width: 680 }
                        ]}
                    ]
                },
            ]
        }
    ],

    initComponent: function () {
        this.callParent();

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
        });
        this.addDocked(toolbar);
    } // cierro init
});