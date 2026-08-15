//MIGRADO2024
Ext.define('Common.view.SmartPanicConfigView', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.smartpanicconfigview',
    autoScroll: true,
    layout: 'fit',
    padding: '0 0 0 0',
    bodyPadding: '0 0 0 0',
    fieldDefaults: {
        labelWidth: 100,
        margin: '0 5 0 0'
    },
    urlValidator: function (view) {
        var readerIp = view.down('#readerIp');
        var readerPort = view.down('#readerPort');
        var ipValue = readerIp.getValue();
        var portValue = readerPort.getValue();
        var url = ipValue;
        if (portValue) {
            url += ':' + portValue;
        }
        // valido la URL 
        var pattern = new RegExp('^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?|^((http://www.|https://www.|http://|https://)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$', 'i');
        /*
        var pattern = new RegExp( '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
            '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i' );
            */
        var isValid = pattern.test(url);
        if (!isValid) {
            isValid = 'Ip + puerto deben formar una URL válida'
        }
        return isValid;
    },
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    xtype: 'container',
                    title: getLocale('Conexion'),
                    itemId: 'conexion',
                    autoScroll: true,
                    padding: '5',
                    defaults: { // defaults are applied to items, not the container
                        margin: '0 0 10 0',
                        width: 700
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'IP',
                        name: "readerIp",
                        vtype: 'url',
                        validator: function () {
                            var view = this.up('smartpanicconfigview');
                            return view.urlValidator(view);
                        },
                        itemId: "readerIp"
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Puerto',
                        name: "readerPort",
                        itemId: "readerPort",
                        validator: function () {
                            var view = this.up('smartpanicconfigview');
                            return view.urlValidator(view);
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Url alternativa',
                        name: "remoteUrl",
                        itemId: "remoteUrl",
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Ruta web Imágenes',
                        name: "images",
                        itemId: "images"
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Sms eventos',
                        name: "smsTel"
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Email',
                        vtype: 'email',
                        name: "email"
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Telefono CRA',
                        name: "TELCRA"
                    },/* {
                            xtype : 'textfield',
                            fieldLabel : 'Botón Fuego',
                            name : "BTNFIRE"
                        }, {
                            xtype : 'textfield',
                            fieldLabel : 'Botón Asistencia',
                            name : "BTNASSIST"
                        },*/
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Key Google',
                        name: "googleKey",
                        itemId: "googleKey"
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Url Landing Mobile',
                        name: "LandingMobileURL",
                        itemId: "LandingMobileURL"
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'top'
                        },
                        itemId: 'cuentapordefecto',
                        items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Cuenta por defecto',
                                value: getLocale('No hay seleccionada'),
                                itemId: 'nombrecuenta',
                                name: 'NOMBRECUENTA',
                                labelWidth: 220
                            },
                            {
                                xtype: 'textfield',
                                hidden: true,
                                itemId: 'idcuenta',
                                name: 'DEFAULTIDCUENTA'
                            },
                            {
                                xtype: 'button',
                                text: 'Seleccionar cuenta',
                                itemId: 'selectcuenta',
                                margin: '0 0 0 5'
                            },
                            {
                                xtype: 'button',
                                text: 'Borrar',
                                itemId: 'deletecuenta',
                                margin: '0 0 0 5'
                            }
                        ]
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Firebase',
                        name: "firebasekey",
                        itemId: "firebasekey",
                        hidden: true
                    }, {
                        xtype: 'fieldset'
                        , title: 'Activación SMS'
                        , padding: '5 5 5 5'
                        , items: [
                            {
                                xtype: 'checkbox',
                                hidden: false,
                                fieldLabel: 'Usar activación SMS',
                                labelWidth: 220,
                                itemId: 'SMSACTIVATION',
                                name: 'SMSACTIVATION'
                            }, {
                                xtype: 'combo',
                                fieldLabel: 'Modem sms',
                                //  store: 'TablaModemsSmsStore',
                                itemId: 'SMSMODEM',
                                name: 'SMSMODEM',
                                displayField: 'sms_cdescripcion',
                                valueField: 'sms_icodigo',
                                queryMode: 'local',
                                labelWidth: 220,
                                anchor: '100%',
                                /*allowBlank : false,*/
                                emptyText: getLocale('Seleccione'),
                                hidden: true,
                                validator: function (value) {
                                    var t = this;
                                    if (t.up('smartpanicconfigview').down('#SMSACTIVATION').getValue() && value == '') {
                                        t.markInvalid('Se debe seleccionar un modem sms.');
                                        t.textValid = 'Se debe seleccionar un modem sms.';
                                    } else {
                                        t.clearInvalid();
                                        t.textValid = true;
                                    }
                                    return this.textValid;
                                }
                            }
                        ]
                    }, {
                        xtype: 'fieldset'
                        , title: 'Login con usuario/clave'
                        , padding: '5 5 5 5'
                        , items: [
                            {
                                xtype: 'checkbox',
                                //hidden: false,
                                fieldLabel: 'USAR LOGIN CON USUARIO Y CLAVE',
                                labelWidth: 220,
                                inputValue: '1',
                                uncheckedValue: '0',
                                itemId: 'NewLogin',
                                name: 'NewLogin'
                            }
                        ]
                    }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Contrato de licencia'),
                    autoScroll: true,
                    defaults: { // defaults are applied to items, not the container
                        labelWidth: 220
                    },
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'textareafield',
                            fieldLabel: '',
                            emptyText: getLocale('Contrato en la aplicación'),
                            name: "AGREEMENT",
                            grow: true,
                            itemId: 'agreement',
                            enableKeyEvents: true
                        }, {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'LicenseVersion',
                            itemId: 'LicenseVersion',
                            itemId: 'LicenseVersion'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Pantalla principal'),
                    padding: '5',
                    autoScroll: true,
                    defaults: { // defaults are applied to items, not the container
                        labelWidth: 220
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            autoScroll: true,
                            items: [
                                {
                                    xtype: 'toolbar',
                                    hidden: true,
                                    //layout:'hbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: getLocale('Agregar Botón Home'),
                                            itemId: 'agregarBotonHome',
                                            action: 'agregar_boton_home'
                                        }, {
                                            xtype: 'button',
                                            text: getLocale('Remover Botón Home'),
                                            action: 'remover_boton_home'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    width: '97%',
                                    itemId: 'fieldsetBotonHome',
                                    cantBotones: 0,// https://basecamp.com/2249105/projects/16594557/todos/440533902
                                    //  se agrega una carga dinámica de N botones
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '5 0 10 0',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Botón de pánico',
                                                    name: "btnHomePanico",
                                                    itemId: "btnHomePanico",
                                                    labelWidth: 120,
                                                    value: 1,
                                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                                    //plugins: ['clearbutton'],
                                                    listeners: {
                                                        change: function (combo, value) {
                                                            if (value == '' && parseInt(value) != 0) {
                                                                var view = this.up('smartpanicconfigview')
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
                                                    name: "btnHomePanicoTipo",
                                                    itemId: "btnHomePanicoTipo",
                                                    labelWidth: 60,
                                                    value: 0,
                                                    store: [[0, getLocale('Evento')], [1, getLocale('Telefono')], [2, getLocale('Url')], [3, getLocale('Único evento')], [4, getLocale('Función interna')]],
                                                    //plugins: ['clearbutton'],
                                                    listeners: {
                                                        change: function (combo, value) {
                                                            var view = this.up('smartpanicconfigview');
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
                                                    padding: '0 5 0 0',
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
                                        //fuego                                
                                        , {
                                            xtype: 'container',
                                            margin: '0 0 10 0',
                                            layout: 'hbox',
                                            items: [{
                                                xtype: 'combobox',
                                                fieldLabel: 'Botón de fuego',
                                                name: "btnHomeFuego",
                                                itemId: "btnHomeFuego",
                                                value: 1,
                                                store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                                //plugins: ['clearbutton'],                                                                
                                                labelWidth: 120,
                                                listeners: {
                                                    change: function (combo, value) {
                                                        if (value == '' && parseInt(value) != 0) {
                                                            var view = this.up('smartpanicconfigview')
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
                                                name: "btnHomeFuegoTipo",
                                                itemId: "btnHomeFuegoTipo",
                                                labelWidth: 60,
                                                value: 0,
                                                store: [[0, getLocale('Evento')], [1, getLocale('Telefono')], [2, getLocale('Url')], [3, getLocale('Único evento')], [4, getLocale('Función interna')]],
                                                //plugins: ['clearbutton'],
                                                listeners: {
                                                    change: function (combo, value) {
                                                        var view = this.up('smartpanicconfigview');
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
                                                padding: '0 5 0 0',
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
                                                items:
                                                    [
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
                                                labelWidth: 120,
                                                name: "btnHomeAsistencia",
                                                itemId: "btnHomeAsistencia",
                                                value: 1,
                                                store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                                //plugins: ['clearbutton'],
                                                listeners: {
                                                    change: function (combo, value) {
                                                        if (value == '' && parseInt(value) != 0) {
                                                            var view = this.up('smartpanicconfigview')
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
                                                itemId: "btnHomeAsistenciaTipo",
                                                labelWidth: 60,
                                                value: 0,
                                                store: [[0, getLocale('Evento')], [1, getLocale('Telefono')], [2, getLocale('Url')], [3, getLocale('Único evento')], [4, getLocale('Función interna')]],
                                                //plugins: ['clearbutton'],
                                                listeners: {
                                                    change: function (combo, value) {
                                                        var view = this.up('smartpanicconfigview');
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
                                                padding: '0 5 0 0',
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
                                        , {
                                            xtype: 'textfield',
                                            fieldLabel: 'CIDTST',
                                            name: "CIDTST",
                                            margin: '0 0 10 0',
                                            labelWidth: 120,
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'CIDREAD',
                                            name: "CIDREAD",
                                            margin: '0 0 10 0',
                                            labelWidth: 120,
                                        }
                                        //,{ xtype:'component', width:'100%', height:20, html:'<hr />'}
                                        //estoy aqui
                                        , {
                                            xtype: 'container',
                                            margin: '0 0 10 0',
                                            layout: 'hbox',
                                            items: [{
                                                xtype: 'combobox',
                                                fieldLabel: 'Estoy aquí',
                                                name: "btnEstoyAqui",
                                                itemId: "btnEstoyAqui",
                                                labelWidth: 120,
                                                value: 1,
                                                store: [[1, getLocale('Visible')], [0, getLocale('Oculto')], [2, getLocale('Grisado')]],
                                                plugins: ['clearbutton'],
                                                listeners: {
                                                    change: function (combo, value) {
                                                        if (value == '' && parseInt(value) != 0) {
                                                            var view = this.up('smartpanicconfigview')
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
                                                labelWidth: 60,
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
                                            }
                                            ]
                                        }
                                        //fin estoy aqui
                                    ]
                                }
                                , {
                                    xtype: 'fieldset',
                                    collapsible: true,
                                    collapsed: false,
                                    title: 'Envío de audio y video automático luego de SOS',
                                    width: '97%',
                                    margin: '0 0 10 0',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Habilitar en device',
                                            name: "habilitarMultimedia",
                                            itemId: 'habilitarMultimedia',
                                            value: '',
                                            store: [[2, getLocale('Deshabilitado')], [1, getLocale('Habilitado')]],
                                            listeners: {
                                                change: function (combo, value) {
                                                    var view = combo.up('smartpanicconfigview')
                                                    if (value == 1) {
                                                        view.down('#envioAudioAuto').show()
                                                        view.down('#envioVideoAuto').show()
                                                        //view.down('#envioAudioAuto').setDisabled(true)
                                                        // view.down('#envioVideoAuto').setDisabled(true)
                                                    } else {
                                                        /**
                                                         * BC 386521427 : Al deshabilitar la multimedia, no seteaba en 0 los combo de Audio / Video por lo tanto la metadata lo seguía viendo.
                                                         * 
                                                         */
                                                        view.down('#envioAudioAuto').setValue(0);
                                                        view.down('#envioVideoAuto').setValue(0);
                                                        view.down('#envioAudioAuto').hide()
                                                        view.down('#envioVideoAuto').hide()
                                                    }
                                                }
                                            }
                                        }, {
                                            xtype: 'combobox',
                                            fieldLabel: 'Audio',
                                            name: "envioAudioAuto",
                                            itemId: 'envioAudioAuto',
                                            labelWidth: 120,
                                            hidden: true,
                                            value: '',
                                            emptyText: getLocale('Seleccione'),
                                            store: [[1, getLocale('Sí')], [0, getLocale('No')]],
                                            listeners: {
                                                change: function (combo, newvalue, oldvalue) {
                                                    var view = combo.up('smartpanicconfigview');
                                                    if (newvalue == 1) {
                                                        view.down('#envioVideoAuto').disable();
                                                    } else {
                                                        view.down('#envioVideoAuto').enable();
                                                    }
                                                }
                                            },
                                            margin: '0 0 10 0'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Video',
                                            name: "envioVideoAuto",
                                            itemId: 'envioVideoAuto',
                                            labelWidth: 120,
                                            hidden: true,
                                            value: '',
                                            emptyText: getLocale('Seleccione'),
                                            store: [[2, getLocale('Cámara frontal')], [1, getLocale('Cámara trasera')], [0, getLocale('Desactivado')]],
                                            listeners: {
                                                change: function (combo, newvalue, oldvalue) {
                                                    var view = combo.up('smartpanicconfigview');
                                                    if (newvalue == 0) {
                                                        view.down('#envioAudioAuto').enable();
                                                    } else {
                                                        view.down('#envioAudioAuto').disable();
                                                        view.down('#envioAudioAuto').setValue(0);
                                                    }
                                                }
                                            },
                                            margin: '0 0 10 0'
                                        }
                                    ]
                                }
                                , {
                                    xtype: 'fieldset',
                                    title: 'En camino',
                                    width: '97%',
                                    items: [
                                        //en camino
                                        {
                                            xtype: 'container',
                                            margin: '0 0 10 0',
                                            layout: 'hbox',
                                            items: [{
                                                xtype: 'combobox',
                                                fieldLabel: 'Botón en Camino',
                                                name: "btnHomeEnCamino",
                                                itemId: "btnHomeEnCamino",
                                                value: 1,
                                                store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                                plugins: ['clearbutton'],
                                                labelWidth: 200,
                                                listeners: {
                                                    change: function (combo, value) {
                                                        if (value == '' && parseInt(value) != 0) {
                                                            var view = this.up('smartpanicconfigview')
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
                                                labelWidth: 60,
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
                                            }
                                            ]
                                        }
                                        // fin en camino
                                        , {
                                            xtype: 'textfield',
                                            fieldLabel: 'Inicio SOS Demorado',
                                            value: 'E126',
                                            name: "CIDESOSDEMORADOI",
                                            labelWidth: 200
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Cancelación de Inicio SOS Demorado',
                                            value: 'R126',
                                            name: "CIDRSOSDEMORADOI",
                                            labelWidth: 200,
                                            margin: '10 0 0 0'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Evento SOS Demorado',
                                            value: 'E125',
                                            name: "CIDESOSDEMORADO",
                                            labelWidth: 200,
                                            margin: '10 0 0 0'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Restauración de SOS Demorado',
                                            value: 'R125',
                                            name: "CIDRSOSDEMORADO",
                                            labelWidth: 200,
                                            margin: '10 0 0 0'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Enviar ahora',
                                            value: 'E125',
                                            name: "CIDESOSDEMORADONOW",
                                            labelWidth: 200,
                                            margin: '10 0 0 0'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'X Minutos',
                                            value: 'E128',
                                            name: "CIDESOSDEMORADOMIN",
                                            labelWidth: 200,
                                            margin: '10 0 10 0'
                                        }
                                    ]
                                }
                                //,{ xtype:'component', width:'100%', height:10, html:'<hr />'}
                                //boton extra
                                , {
                                    xtype: 'fieldset',
                                    width: '97%',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '10 0 10 0',
                                            layout: 'hbox',
                                            itemId: 'btn-extra-set',
                                            items: [{
                                                xtype: 'combobox',
                                                fieldLabel: 'Botones extra',
                                                name: "btnExtras",
                                                itemId: "btnExtras",
                                                labelWidth: 120,
                                                value: 0,
                                                store: [[1, getLocale('Visible')], [0, getLocale('Oculto')]],
                                                plugins: ['clearbutton'],
                                                listeners: {
                                                    change: function (combo, value) {
                                                        if (value == '' && parseInt(value) != 0) {
                                                            var view = this.up('smartpanicconfigview')
                                                            view.down('#btnExtrasNombre').setValue('')
                                                        }
                                                    }
                                                }
                                            }, {
                                                xtype: 'textfield',
                                                name: 'btnExtrasNombre',
                                                fieldLabel: 'Nombre',
                                                itemId: 'btnExtrasNombre',
                                                labelWidth: 60,
                                                width: 170,
                                                //maxLength: 18,
                                                enforceMaxLength: true
                                            }]
                                        }
                                        //fin boton extra
                                        , {
                                            xtype: 'fieldset',
                                            collapsible: true,
                                            collapsed: false,
                                            title: 'Botones extras',
                                            hidden: true,
                                            itemId: 'btn-extras-config',
                                            items: [
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Funciones'),
                    autoScroll: true,
                    padding: '5',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Funciones principales',
                            autoScroll: true,
                            defaults: { // defaults are applied to items, not the container
                                margin: '10 0 0 0'
                            },
                            padding: '5 5 5 5',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mis alarmas',//https://basecamp.com/2249105/projects/16594557/todos/440228417
                                            name: "btnMisAlarmas",
                                            itemId: "btnMisAlarmas",
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            labelAlign: 'left',
                                            name: 'btnMisAlarmasNombre',
                                            itemId: "btnMisAlarmasNombre"
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'URL',
                                            name: 'btnMisAlarmasURL',
                                            itemId: 'btnMisAlarmasURL',
                                            labelAlign: 'left'
                                        }, {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Orden',
                                            labelAlign: 'left',
                                            name: "btnMisAlarmasSort",
                                            itemId: "btnMisAlarmasSort",
                                            value: 1,
                                            minValue: 1,
                                            maxValue: 10
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container', //no estaba antes en la anterior versión de la interfaz
                                    // botones extras son supuestamente Alertas
                                    //https://basecamp.com/2249105/projects/16594557/todos/440533902
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    }, items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mis Alertas',
                                            name: 'funcMisAlertas',
                                            itemId: 'funcMisAlertas',
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'funcMisAlertasNombre',
                                            itemId: 'funcMisAlertasNombre'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'URL',
                                            name: 'funcMisAlertasURL',
                                            itemId: 'funcMisAlertasURL',
                                            labelAlign: 'left'
                                        }, {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Orden',
                                            labelAlign: 'left',
                                            name: "funcMisAlertasSort",
                                            itemId: "funcMisAlertasSort",
                                            value: 2,
                                            minValue: 1,
                                            maxValue: 10
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mis cuentas',
                                            name: "funcMisCuentas",
                                            itemId: "funcMisCuentas",
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'funcMisCuentasNombre',
                                            itemId: 'funcMisCuentasNombre'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'URL',
                                            name: 'funcMisCuentasURL',
                                            itemId: 'funcMisCuentasURL',
                                            labelAlign: 'left'
                                        }, {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Orden',
                                            labelAlign: 'left',
                                            name: "funcMisCuentasSort",
                                            itemId: "funcMisCuentasSort",
                                            value: 2,
                                            minValue: 1,
                                            maxValue: 10
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center',
                                        title: 'Grupo'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mi grupo', //https://basecamp.com/2249105/projects/16594557/todos/440228417
                                            name: "funcMiGrupo",
                                            itemId: "funcMiGrupo",
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'funcMiGrupoNombre',
                                            itemId: 'funcMiGrupoNombre'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'URL',
                                            name: 'funcMiGrupoURL',
                                            itemId: 'funcMiGrupoURL',
                                            labelAlign: 'left'
                                        }, {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Orden',
                                            labelAlign: 'left',
                                            name: "funcMiGrupoSort",
                                            itemId: "funcMiGrupoSort",
                                            value: 4,
                                            minValue: 1,
                                            maxValue: 10
                                        }

                                    ]
                                },

                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mis móviles', //https://basecamp.com/2249105/projects/16594557/todos/440228417
                                            name: "funcMisMoviles",
                                            itemId: "funcMisMoviles",
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'funcMisMovilesNombre',
                                            itemId: 'funcMisMovilesNombre'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'URL',
                                            name: 'funcMisMovilesURL',
                                            itemId: 'funcMisMovilesURL',
                                            labelAlign: 'left'
                                        }, {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Orden',
                                            labelAlign: 'left',
                                            name: "funcMisMovilesSort",
                                            itemId: "funcMisMovilesSort",
                                            value: 3,
                                            minValue: 1,
                                            maxValue: 10
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mis cámaras', //https://basecamp.com/2249105/projects/16594557/todos/440228417
                                            name: "funcMisCamaras",
                                            itemId: "funcMisCamaras",
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'funcMisCamarasNombre',
                                            itemId: 'funcMisCamarasNombre'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'URL',
                                            name: 'funcMisCamarasURL',
                                            itemId: 'funcMisCamarasoURL',
                                            labelAlign: 'left'
                                        }, {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Orden',
                                            labelAlign: 'left',
                                            name: "funcMisCamarasSort",
                                            itemId: "funcMisCamarasSort",
                                            value: 6,
                                            minValue: 1,
                                            maxValue: 10
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mi entorno', //https://basecamp.com/2249105/projects/16594557/todos/440228417
                                            name: "funcMiEntorno",
                                            itemId: "funcMiEntorno",
                                            value: 1,
                                            store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'funcMiEntornoNombre',
                                            itemId: 'funcMiEntornoNombre'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'URL',
                                            name: 'funcMiEntornoURL',
                                            itemId: 'funcMiEntornoURL',
                                            labelAlign: 'left'
                                        }, {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Orden',
                                            labelAlign: 'left',
                                            name: "funcMiEntornoSort",
                                            itemId: "funcMiEntornoSort",
                                            value: 7,
                                            minValue: 1,
                                            maxValue: 10
                                        }
                                    ]
                                },
                                {

                                }
                            ]
                        }, /*{
                            xtype: 'fieldset',
                            title: 'Ordenamiento de funciones',
                            defaults: { // defaults are applied to items, not the container
                                margin: '10 0 10 0'
                            },
                            padding: '5 5 5 5',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Mis alarmas',
                                    labelAlign: 'left',
                                    name: "btnMisAlarmasSort",
                                    itemId: "btnMisAlarmasSort",
                                    value: 1,
                                    minValue: 1,
                                    maxValue: 7
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Mis cuentas',
                                    labelAlign: 'left',
                                    name: "funcMisCuentasSort",
                                    itemId: "funcMisCuentasSort",
                                    value: 2,
                                    minValue: 1,
                                    maxValue: 7
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Mis móviles',
                                    labelAlign: 'left',
                                    name: "funcMisMovilesSort",
                                    itemId: "funcMisMovilesSort",
                                    value: 3,
                                    minValue: 1,
                                    maxValue: 7
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Mi grupo',
                                    labelAlign: 'left',
                                    name: "funcMiGrupoSort",
                                    itemId: "funcMiGrupoSort",
                                    value: 4,
                                    minValue: 1,
                                    maxValue: 7
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Botones extras',
                                    labelAlign: 'left',
                                    name: "btnExtrasSort",
                                    itemId: "btnExtrasSort",
                                    value: 5,
                                    minValue: 1,
                                    maxValue: 7
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Mis cámaras',
                                    labelAlign: 'left',
                                    name: "funcMisCamarasSort",
                                    itemId: "funcMisCamarasSort",
                                    value: 6,
                                    minValue: 1,
                                    maxValue: 7
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Mis comandos',
                                    labelAlign: 'left',
                                    name: "funcMisComandosSort",
                                    itemId: "funcMisComandosSort",
                                    value: 7,
                                    minValue: 1,
                                    maxValue: 7
                                }
                            ]
                        },*/
                        {
                            xtype: 'container',
                            title: getLocale('Funciones'),
                            autoScroll: true,
                            //padding:'5',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Opciones del menú',
                                    defaults: { // defaults are applied to items, not the container
                                        margin: '10 0 0 0'
                                    },
                                    padding: '5 5 5 5',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mis contactos',
                                            name: "btnMenuMisContactos",
                                            itemId: "btnMenuMisContactos",
                                            value: 1,
                                            store: [[1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        }, {
                                            xtype: 'combobox',
                                            fieldLabel: 'Conexión',
                                            name: "btnConfigConexion",
                                            itemId: "btnConfigConexion",
                                            value: 1,
                                            store: [[1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        }, {
                                            xtype: 'combobox',
                                            fieldLabel: 'Mis alarmas',
                                            name: "btnConfigMisAlarmas",
                                            itemId: "btnConfigMisAlarmas",
                                            value: 1,
                                            store: [[1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        //---------------------------------------
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                        /*mandar a opciones de menu*/ fieldLabel: 'Mis mensajes', //https://basecamp.com/2249105/projects/16594557/todos/440228417
                                                    name: "btnMisMensajes",//name: "funcMisMensajes",
                                                    itemId: "btnMisMensajes",//itemId: "funcMisMensajes",
                                                    value: 1,
                                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Nombre',
                                                    name: 'btnMisMensajesNombre',//name: 'funcMisMensajesNombre',
                                                    itemId: 'btnMisMensajesNombre'//itemId: 'funcMisMensajesNombre'
                                                }/*,{
                                                        xtype: 'textfield',
                                                        fieldLabel: 'URL',
                                                        name: 'btnMisMensajesURL',
                                                        itemId: 'btnMisMensajesURL', 
                                                        labelAlign: 'left'                                            
                                                    },{   //no tenia orden
                                                        xtype: 'numberfield',
                                                        fieldLabel: 'Orden',
                                                        labelAlign: 'left',
                                                        name: "btnMisMensajesNombreSort",
                                                        itemId: "btnMisMensajesNombreSort",
                                                        value: 4,
                                                        minValue: 1,
                                                        maxValue: 10                                            
                                                    }*/
                                            ]
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
                                                        /*mandar a opciones de menu*/ fieldLabel: 'Mis comandos',//https://basecamp.com/2249105/projects/16594557/todos/440228417
                                                    name: "funcMisComandos",
                                                    itemId: "funcMisComandos",
                                                    value: 1,
                                                    store: [[2, getLocale('Grisado')], [1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Nombre',
                                                    name: 'funcMisComandosNombre',
                                                    itemId: 'funcMisComandosNombre'
                                                }/*,{
                                                        xtype: 'textfield',
                                                        fieldLabel: 'URL',
                                                        name: 'funcMisComandosURL',
                                                        itemId: 'funcMisComandosURL', 
                                                        labelAlign: 'left'
                                                    },{
                                                        xtype: 'numberfield',
                                                        fieldLabel: 'Orden',
                                                        labelAlign: 'left',
                                                        name: "funcMisComandosSort",
                                                        itemId: "funcMisComandosSort",
                                                        value: 7,
                                                        minValue: 1,
                                                        maxValue: 10                                            
                                                    }*/

                                            ]
                                        }/*,
                                            {
                                                xtype: 'container',
                                                autoScroll: true,
                                                labelWidth:100,
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'center'
                                                },
                                                items:[                                    
                                                    {
                                                        xtype: 'combobox', // Mi entorno no tenia orden
                                                        //mandar a opciones de menu
                                                        fieldLabel: 'Mi entorno',
                                                        name: "funcMiEntorno",
                                                        itemId: "funcMiEntorno",
                                                        value: 1,
                                                        store: [ [ 2, getLocale( 'Grisado' ) ], [ 1, getLocale( 'Visible' ) ], [ 0, getLocale( 'Oculto' ) ] ]//store: [ [ 1, getLocale( 'Visible' ) ], [ 0, getLocale( 'Oculto' ) ] ]
                                                    },{
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Nombre',
                                                        name: 'funcMiEntornoNombre',
                                                        itemId : 'funcMiEntornoNombre'
                                                    }
                                                ]
                                                
                                            }*/
                                        //---------------------------------------
                                    ]
                                }
                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Seguimiento',
                            collapsed: false,
                            collapsible: true,
                            defaults: {
                                margin: '0 0 10 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Disponible',
                                    margin: '0 0 10 0',
                                    name: "trackingEnabled",// 0- no disponible ,1- disponible apagado, 2 - diponible
                                    store: [[0, getLocale('No disponible')], [1, getLocale('Disponible apagado')], [2, getLocale('Disponible')]]
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Frecuencia de reporte',
                                    itemId: 'trackingTrigger',
                                    name: "trackingTrigger",
                                    margin: '0 0 10 0',
                                    store: [[2, getLocale('Frecuencia alta')], [1, getLocale('Frecuencia media')], [0, getLocale('Frecuencia baja')]]
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Distancia',
                                    itemId: "trackingDistance",
                                    minValue: 500,
                                    hidden: true,
                                    width: 50,
                                    margin: '0 0 10 0',
                                    name: "trackingDistance" // metros
                                }, {
                                    xtype: 'numberfield',
                                    itemId: "trackingTime",
                                    hidden: true,
                                    fieldLabel: 'Tiempo', minValue: 5,
                                    width: 50,
                                    margin: '0 0 10 0',
                                    name: "trackingTime" // segundos
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
                        }, {
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
                                            labelWidth: 200,
                                            margin: '0 0 10 0',
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
                                            labelWidth: 200,
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
                            xtype: 'fieldset',
                            title: 'Configuración',
                            collapsed: false,
                            collapsible: true,
                            defaults: {
                                margin: '0 0 10 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Idioma',
                                    name: "btnIdioma",
                                    itemId: "btnIdioma",
                                    store: [[0, getLocale('No')], [1, getLocale('Si')]],
                                    margin: '0 0 10 0'
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Sugerir cliente',
                                    itemId: 'btnSugerir',
                                    name: "btnSugerir",
                                    store: [[0, getLocale('No')], [1, getLocale('Si')]],
                                    margin: '0 0 10 0'
                                },
                                //---------------------------
                                {
                                    xtype: 'container',
                                    autoScroll: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox', //Modo vecinal no tenia orden
                                          /*en verde*/  fieldLabel: 'Modo vecinal',
                                            name: "modoVecinal",
                                            itemId: "modoVecinal",
                                            value: 1,
                                            store: [[1, getLocale('Visible')], [0, getLocale('Oculto')]]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            name: 'modoVecinalNombre',
                                            itemId: 'modoVecinalNombre'
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'URL',
                                            name: 'modoVecinalURL',
                                            itemId: 'modoVecinalURL',
                                            labelAlign: 'left'
                                        }, {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Orden',
                                            labelAlign: 'left',
                                            name: "modoVecinalSort",
                                            itemId: "modoVecinalSort",
                                            value: 4,
                                            minValue: 1,
                                            maxValue: 10
                                        }
                                    ]
                                }
                                //---------------------------                            
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
                                    name: "funcbtnBluetooth",
                                    itemId: "funcbtnBluetooth",
                                    store: [[0, getLocale('No habiltado')], [1, getLocale('Botón blanco')], [2, getLocale('Botón V.ALERT')], [3, getLocale('Botón BT-650')], [4, getLocale('Botón KKM')]],
                                    margin: '0 0 10 0'
                                }
                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Encuesta',
                            collapsed: false,
                            collapsible: true,
                            defaults: {
                                margin: '0 0 10 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Estado',
                                    name: "btnEncuesta",
                                    itemId: "btnEncuesta",
                                    store: [[0, getLocale('Grisado')], [1, getLocale('Visible')], [2, getLocale('Oculto')]],
                                    margin: '0 0 10 0',
                                    value: 0
                                }
                            ]
                        }, {
                            xtype: 'fieldset',
                            title: 'Control de geocerca',
                            collapsed: false,
                            collapsible: true,
                            hidden: true,
                            defaults: {
                                margin: '0 0 10 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Evento',
                                    name: "ctrlGeoEvent",
                                    itemId: "ctrlGeoEvent",
                                    store: [['', getLocale('Sin control')], ['I', getLocale('Inclusión')], ['E', getLocale('Exclusión')], ['X', getLocale('Inclusión y Exclusión')]],
                                    margin: '0 0 10 0',
                                    value: ''
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: 'Frecuencia de reporte',
                                    itemId: 'ctrlGeoEventTracking',
                                    name: "ctrlGeoEventTracking",
                                    margin: '0 0 10 0',
                                    store: [[2, getLocale('Frecuencia alta')], [1, getLocale('Frecuencia media')], [0, getLocale('Frecuencia baja')]]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: getLocale('Área de control'),
                    autoScroll: true,
                    padding: 0,
                    items: [{
                        xtype: 'areacontrolview'
                    }]
                }
                , {
                    xtype: 'container',
                    layout: 'fit',
                    title: getLocale('Campos extra'),
                    padding: '5 5 5 5',
                    perfiles: true,
                    hidden: false,
                    items: [
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Configuracion',
                            width: '100%',
                            height: '100%',
                            name: 'extraFieldConfig',
                            itemId: 'extraFieldConfig'
                        }
                    ]
                }, {
                    xtype: 'container',
                    itemId: 'tabCategorias',
                    title: getLocale('Categorías'),
                    padding: '5 5 5 5',
                    autoScroll: true,
                    items: [
                        {
                            xtype: 'container',
                            margin: '10 0 10 0',
                            width: '97%',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    //layout:'hbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: getLocale('Agregar Categoría'),
                                            itemId: 'addCategorias',
                                            action: 'agregar_categoria'
                                        }, {
                                            xtype: 'button',
                                            text: getLocale('Remover Categoría'),
                                            action: 'remover_categoria'

                                        }
                                    ]
                                }
                                , {
                                    xtype: 'container',
                                    margin: '10 0 10 0',
                                    //layout:'vbox',
                                    cantCateg: 0,
                                    itemId: 'cnt-btn-categoria',

                                    items: [
                                    ]
                                }
                            ]
                        }
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    title: getLocale('We-Safe'),
                    items: [
                        {
                            xtype: 'textfield',
                            width: 650,
                            labelWidth: 200,
                            itemId: 'idsPublicidad',
                            fieldLabel: 'Ids de Publicidad'
                        }
                    ]
                }/*,{
                    xtype: 'container',
                    itemId: 'tabMenuInferior',
                    title: 'Menú Inferior',
                    padding: '5 5 5 5',
                    autoScroll: true,
                    items:[
                        {
                            xtype: 'fieldset',
                            collapsible: true,
                            collapsed: false,
                            title: 'Botones Menú inferior',
                            itemId: 'btn-menuinferior-config',
                            items: [
                            ]
                        }                            
                    ]                    
                }*/


                /*,{
                    xtype: 'container',
                    itemId: 'tabModoParking',
                    title: 'Modo Parking',
                    padding: '5 5 5 5',
                    autoScroll: true,
                    items:[
                        {
                            xtype: 'checkbox',
                            padding: '5 5 5 5',
                            fieldLabel: 'Habilitado'
                        },{
                            xtype: 'fieldset',
                            title: 'Control Parking por posición',
                            padding: '5 5 5 5',
                            items: [
                                {
                                    xtype : 'checkbox',
                                    fieldLabel: 'Habilitado',
                                    padding: '5 5 5 5'
                                },{
                                    xtype: 'numberfield',
                                    padding: '5 5 5 5',
                                    fieldLabel: 'Distancia de control'
                                }
                            ]
                        },{
                            xtype: 'fieldset',
                            title: 'Control Parking por eventos',
                            items: [
                                    {
                                        xtype : 'textarea',
                                        fieldLabel : 'Seleccionados',
                                        anchor: '100%',
                                        height:120,
                                        name: '_eventos',
                                        itemId:'eventos'
                                        
                                    },
                                    {
                                        xtype : 'textarea',
                                        fieldLabel : 'Seleccionados',
                                        name: 'cuv_meventos',
                                        itemId:'eventoshide',
                                        hidden: true
                                    },
                                    {
                                        xtype:'button',
                                        text:'Modificar',
                                        itemId:'agregarevento',
                                        margin: '0 0 10 0',
                                    }
                                        
                            ]
                        }                            
                    ]                    
                }*/

                /*
                ,{
                    xtype: 'administratorsearchgridview',
                    title: 'Productos In-APP',
                    perfiles: true,
                    hidden:true,
                    filterByTipo: 21
                }*/
            ]
        }
    ],
    // cierro items
    initComponent: function () {
        this.callParent();
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: 'Guardar',
                iconCls: 'save',
                action: 'save'
            }, {
                text: 'Borrar',
                iconCls: 'delete',
                action: 'delete',
                itemId: 'delete',
                hidden: true
            }]
        });
        this.addDocked(toolbar);
    }
});