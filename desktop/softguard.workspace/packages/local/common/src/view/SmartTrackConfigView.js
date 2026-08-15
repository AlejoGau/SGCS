//MIGRADO2024
Ext.define( 'Common.view.SmartTrackConfigView', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.smarttrackconfigview',
    autoScroll: true,
    items: [
        /*{
			xtype : 'textfield',
			fieldLabel : 'IP',
			name : "readerIp"
		}, {
    		xtype : 'textfield',
			fieldLabel : 'Puerto',
			name : "readerPort"
		},*/
        {
            xtype: 'textfield',
            fieldLabel: 'Servicio Url',
            name: 'serviceUrl',
            vtype: 'url'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ruta web Imágenes',
            name: "images"
        }, {
            xtype: 'textfield',
            fieldLabel: 'Sms',
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
        }, {
            xtype: 'fieldset',
            title: 'Seguimiento',
            collapsed: true,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 220
            },
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Disponible',
                    name: "trackingEnabled",// 0- no disponible ,1- disponible apagado, 2 - diponible
                    store: [ [ 0, getLocale( 'No disponible' ) ], [ 1, getLocale( 'Disponible apagado' ) ], [ 2, getLocale( 'Disponible' ) ] ]
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Distancia',
                    minValue: 500,
                    width: 50,
                    name: "trackingDistance" // metros
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo', minValue: 5,
                    width: 50,
                    name: "trackingTime" // segundos
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Control distancia sin mov.',
            collapsed: true,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 220
            },
            items: [ {
                xtype: 'combobox',
                fieldLabel: 'Disponible',
                name: "controlDistanciaEnabled",// 0- no disponible ,1- disponible apagado, 2 - diponible
                store: [ [ 0, getLocale( 'No disponible' ) ], [ 1, getLocale( 'Disponible' ) ] ]
            }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Dispersion Admitida',
                    minValue: 0,
                    width: 50,
                    name: "dispercionAdmitida" // metros
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo de control sin movimiento',
                    minValue: 0,
                    width: 50,
                    name: "tiempoControlSinMovimiento" // segundos
                }
            ]
        },
        /**
         * Nuevo para control de tiempo PREVIO a comenzar una ronda ASIGNADA al vigilador
         */
        {
            xtype: 'fieldset',
            title: 'Control de tiempo previo a recorrido',
            collapsed: true,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 220
            },
            items: [ {
                xtype: 'combobox',
                fieldLabel: 'Disponible',
                name: "controlTiempoPrevioRonda",    // 0- Inactivo ,1- Activo
                store: [ [ 0, getLocale( 'Inactivo' ) ], [ 1, getLocale( 'Activo' ) ] ]
            }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo previo al inicio de ronda',
                    minValue: 10,
                    width: 50,
                    name: "tiempoPrevioRonda" // metros
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo previo al inicio de checkpoint',
                    minValue: 10,
                    width: 50,
                    name: "tiempoPrevioCheckpoint" // metros
                }]
        }, {
            xtype: 'fieldset',
            title: 'Presencia',
            collapsed: true,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 70
            },
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Disponible',
                    name: "manAliveEnabled",// 0- no disponible ,1- disponible apagado, 2 - diponible
                    store: [ [ 0, getLocale( 'No habilitado' ) ], [ 1, getLocale( 'Habilitado' ) ] ]
                }, {
                    xtype: 'textfield',
                    name: 'btnHomeHombreVivoNombre',
                    fieldLabel: 'Nombre',
                    itemId: 'btnHomeHombreVivoNombre',
                    labelWidth: 60,
                    width: 170
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tolerancia',
                    itemId: 'manAliveTimeSpan',
                    minValue: 2,
                    width: 50,
                    name: 'manAliveTimeSpan', // metros
                   
                },
                {
                    xtype: 'numberfield',
                    itemId: 'manAliveOfflineRandomMin',
                    fieldLabel: 'Mínimo',
                    minValue: 1,
                    width: 50,
                    name: 'manAliveOfflineRandomMin', // metros
                }, {
                    xtype: 'numberfield',
                    itemId: 'manAliveOfflineRandomMax',
                    fieldLabel: 'Máximo',
                    minValue: 2,
                    width: 50,
                    name: 'manAliveOfflineRandomMax',
                    listeners: {
                        blur: function( field ) {
                            // Obtener el campo mínimo
                            var minField = Ext.ComponentQuery.query( '#manAliveOfflineRandomMin' )[ 0 ];
                            // Validar si el valor mínimo es mayor que el valor máximo
                            if( minField.getValue() > field.getValue() ) {
                                // Establecer el estilo de error en el campo mínimo
                                minField.setFieldStyle( 'border-color: red;' );
                                // Mostrar un mensaje de error
                                minField.setActiveError( 'El mínimo no puede ser mayor que el máximo' );
                                // Forzar la validación del campo mínimo
                                minField.validate();
                            } else {
                                // Restaurar el estilo y mensaje por defecto
                                minField.setFieldStyle( '' ); // Restablecer el estilo
                                minField.setActiveError( '' ); // Limpiar el mensaje de error
                                minField.clearInvalid(); // Limpiar cualquier error existente
                            }
                        }
                    }
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Acceso al carrete para envío de Multimedia',
            collapsed: true,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 70
            },
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Disponible',
                    name: "CarreteHabilitado",// 0- no disponible ,1- disponible 
                    store: [ [ 0, getLocale( 'No habilitado' ) ], [ 1, getLocale( 'Habilitado' ) ] ]
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Recorrido',
            collapsed: true,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 70
            },
            items: [ {
                xtype: 'container',
                margin: '0 0 10 0',
                layout: 'hbox',
                items: [ {
                    xtype: 'combobox',
                    fieldLabel: 'Control Recorrido',
                    name: "btnControlRonda",
                    itemId: "btnControlRonda",
                    margin: '0 10 0 0',
                    store: [
                        [ 1, getLocale( 'Visible' ) ],
                        [ 0, getLocale( 'Oculto' ) ]
                    ],
                    plugins: [ 'clearbutton' ],
                    labelWidth: 160,
                }, {
                        xtype: 'textfield',
                        name: 'btnControlRondaNombre',
                        fieldLabel: 'Nombre',
                        itemId: 'btnControlRondaNombre',
                        labelWidth: 60,
                        width: 170,
                        margin: '0 10 0 0',
                    }]
            }, {
                    xtype: 'container',
                    margin: '0 0 10 0',
                    layout: 'hbox',
                    items: [ {
                        xtype: 'combobox',
                        fieldLabel: 'Ver recorridos',
                        name: "btnVerRondas",
                        itemId: "btnVerRondas",
                        margin: '0 10 0 0',
                        store: [
                            [ 1, getLocale( 'Visible' ) ],
                            [ 0, getLocale( 'Oculto' ) ]
                        ],
                        plugins: [ 'clearbutton' ],
                        labelWidth: 160,
                    }, {
                            xtype: 'textfield',
                            name: 'btnVerRondasNombre',
                            fieldLabel: 'Nombre',
                            itemId: 'btnVerRondasNombre',
                            labelWidth: 60,
                            width: 170,
                            margin: '0 10 0 0',
                        }]
                },
                {
                    xtype: 'container',
                    margin: '0 0 10 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Seleccionar Ronda',
                            name: "btnSeleccionarRonda",
                            itemId: "btnSeleccionarRonda",
                            margin: '0 10 0 0',
                            store: [
                                [ 1, getLocale( 'SI' ) ],
                                [ 0, getLocale( 'NO' ) ]
                            ],
                            //plugins: ['clearbutton'],
                            labelWidth: 160
                        }
                    ]
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Pantalla principal',
            collapsed: true,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 70
            },
            items: [
                {
                    xtype: 'container',
                    margin: '0 0 10 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Botón de pánico',
                            name: "btnHomePanico",
                            itemId: "btnHomePanico",
                            labelWidth: 160,
                            value: 1,
                            margin: '0 10 0 0',
                            store: [ [ 2, getLocale( 'Grisado' ) ], [ 1, getLocale( 'Visible' ) ], [ 0, getLocale( 'Oculto' ) ] ],
                            plugins: [ 'clearbutton' ],
                            listeners: {
                                change: function( combo, value ) {
                                    if( value == '' && parseInt( value ) != 0 ) {
                                        var view = this.up( 'smarttrackconfigview' )
                                        view.down( '#btnHomePanicoNombre' ).setValue( '' )
                                        view.down( '#CIDESOS' ).setValue( '' )
                                        view.down( '#CIDRSOS' ).setValue( '' )
                                        view.down( '#btnHomePanicoColor' ).setValue( '' )
                                    }
                                }
                            }
                        }, {
                            xtype: 'textfield',
                            name: 'btnHomePanicoNombre',
                            fieldLabel: 'Nombre',
                            itemId: 'btnHomePanicoNombre',
                            labelWidth: 60,
                            width: 170,
                            margin: '0 10 0 0',
                        }, {
                            xtype: 'textfield',
                            name: 'CIDESOS',
                            fieldLabel: 'Formato',
                            itemId: 'CIDESOS',
                            labelWidth: 60,
                            width: 110,
                            maxLength: 4,
                            enforceMaxLength: true,
                            margin: '0 10 0 0',
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
                    xtype: 'container',
                    margin: '0 0 10 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Botón de Novedades',
                            name: "btnHomeNovedades",
                            itemId: "btnHomeNovedades",
                            labelWidth: 160,
                            value: 1,
                            margin: '0 10 0 0',
                            store: [ [ 2, getLocale( 'Grisado' ) ], [ 1, getLocale( 'Visible' ) ], [ 0, getLocale( 'Oculto' ) ] ],
                            plugins: [ 'clearbutton' ],
                            listeners: {
                                change: function( combo, value ) {
                                    if( value == '' && parseInt( value ) != 0 ) {
                                        var view = this.up( 'smarttrackconfigview' )
                                        view.down( '#btnHomeNovedadesNombre' ).setValue( '' )
                                    }
                                }
                            }
                        }, {
                            xtype: 'textfield',
                            name: 'btnHomeNovedadesNombre',
                            fieldLabel: 'Nombre',
                            itemId: 'btnHomeNovedadesNombre',
                            labelWidth: 60,
                            width: 170
                        }
                    ]
                }, {
                    xtype: 'container',
                    margin: '0 0 10 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Botón de Asignacion',
                            name: "btnHomeAsignacion",
                            itemId: "btnHomeAsignacion",
                            labelWidth: 160,
                            value: 1,
                            margin: '0 10 0 0',
                            store: [ [ 2, getLocale( 'Grisado' ) ], [ 1, getLocale( 'Visible' ) ], [ 0, getLocale( 'Oculto' ) ] ],
                            plugins: [ 'clearbutton' ],
                            listeners: {
                                change: function( combo, value ) {
                                    if( value == '' && parseInt( value ) != 0 ) {
                                        var view = this.up( 'smarttrackconfigview' )
                                        view.down( '#btnHomeAsignacionNombre' ).setValue( '' )
                                    }
                                }
                            }
                        }, {
                            xtype: 'textfield',
                            name: 'btnHomeAsignacionNombre',
                            fieldLabel: 'Nombre',
                            itemId: 'btnHomeAsignacionNombre',
                            labelWidth: 60,
                            width: 170
                        }
                    ]
                }
            ]
        }, {
            xtype: 'fieldset',
            title: 'Configuracion de botones extras',
            collapsed: true,
            collapsible: true,
            defaults: { // defaults are applied to items, not the container
                labelWidth: 70
            },
            items: [ {
                xtype: 'container',
                margin: '10 0 10 0',
                layout: 'hbox',
                itemId: 'btn-extra-set',
                items: [ {
                    xtype: 'combobox',
                    fieldLabel: 'Botones extra',
                    name: "btnExtras",
                    itemId: "btnExtras",
                    labelWidth: 160,
                    value: 0,
                    margin: '0 10 0 0',
                    store: [ [ 1, getLocale( 'Visible' ) ], [ 0, getLocale( 'Oculto' ) ] ],
                    plugins: [ 'clearbutton' ],
                    listeners: {
                        change: function( combo, value ) {
                            if( value == '' && parseInt( value ) != 0 ) {
                                var view = this.up( 'smarttrackconfigview' )
                                view.down( '#btnExtrasNombre' ).setValue( '' )
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
                        maxLength: 18,
                        enforceMaxLength: true
                    }]
            }, {
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
        }, {
            xtype: 'fieldset',
            title: 'Control Horario',
            collapsed: true,
            collapsible: true,
            itemId: 'fieldSetControlHorario',
            hidden: true,
            margin: '0 0 10 0',
            layout: 'hbox',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Hora Diurna',
                    items: [
                        {
                            name: 'txtf-hr-diurna-inicio',
                            itemId: 'txtf-hr-diurna-inicio',
                            fieldLabel: 'Inicio Hora Diurna',
                            xtype: 'timefield',
                            format: 'H:i',
                            altFormats: 'H:i',
                            value: '00:00',
                            increment: 60,
                            labelWidth: 40,
                            width: 123
                        }, {
                            name: 'dt-hr-diurna-inicio',
                            itemId: 'dt-hr-diurna-inicio',
                            hidden: true,
                            xtype: 'textfield'
                        }, {
                            name: 'txtf-hr-diurna-fin',
                            itemId: 'txtf-hr-diurna-fin',
                            fieldLabel: 'Fin Hora Diurna',
                            xtype: 'timefield',
                            format: 'H:i',
                            altFormats: 'H:i',
                            value: '00:00',
                            increment: 60,
                            labelWidth: 40,
                            width: 123
                        }, {
                            name: 'dt-hr-diurna-fin',
                            itemId: 'dt-hr-diurna-fin',
                            hidden: true,
                            xtype: 'textfield'
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    title: 'Hora Nocturna',
                    items: [
                        {
                            name: 'txtf-hr-nocturna-inicio',
                            itemId: 'txtf-hr-nocturna-inicio',
                            fieldLabel: 'Inicio Hora Nocturna',
                            xtype: 'timefield',
                            format: 'H:i',
                            altFormats: 'H:i',
                            value: '00:00',
                            increment: 60,
                            labelWidth: 40,
                            width: 200
                        }, {
                            name: 'dt-hr-nocturna-inicio',
                            itemId: 'dt-hr-nocturna-inicio',
                            hidden: true,
                            xtype: 'textfield'
                        }, {
                            name: 'txtf-hr-nocturna-fin',
                            itemId: 'txtf-hr-nocturna-fin',
                            fieldLabel: 'Fin Hora Nocturna',
                            xtype: 'timefield',
                            format: 'H:i',
                            altFormats: 'H:i',
                            value: '00:00',
                            increment: 60,
                            labelWidth: 40,
                            width: 200
                        }, {
                            name: 'dt-hr-nocturna-fin',
                            itemId: 'dt-hr-nocturna-fin',
                            name: 'dt-hr-nocturna-fin',
                            hidden: true,
                            xtype: 'textfield'
                        }
                    ]
                }
            ]
        }
    ],
    // cierro items
    initComponent: function() {
        this.callParent();
        //fieldSetControlHorario
        if( this.showcontrolhorario ) {
            this.down( '#fieldSetControlHorario' ).show();
        }
        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [ {
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
        this.addDocked( toolbar );
    }
});