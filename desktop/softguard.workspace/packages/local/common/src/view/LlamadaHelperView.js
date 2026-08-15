//MIGRADO2024
Ext.define( 'Common.view.LlamadaHelperView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.llamadahelperview',
    ignoreDirty: true,
    title: '',
    border: 0,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            itemId: 'llamadahelperMini',
            width: 400,
            height: 400,
            hidden: true,
            items: [
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: '',
                            itemId: 'llamada',
                            labelWidth: 150,
                            fieldStyle: {
                                'font-size': '18px',
                                'font-weight': 'bold'
                            },
                            margin: '0 15 0 0'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Clave cuenta',
                            itemId: 'ccuentaclave',
                            labelWidth: 150,
                            margin: '0 15 0 0'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Clave contacto',
                            itemId: 'contactoclave',
                            labelWidth: 150,
                            margin: '0 15 0 0'
                        },
                        {
                            xtype: 'displayfield',
                            fieldStyle: 'font-weight:bold;font-size:12px',
                            itemId: 'timerMini',
                            margin: '0 15 0 0'
                        }, {
                            xtype: 'button',
                            text: 'Colgar',
                            itemId: 'colgarMini',
                            hidden: true
                        }
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            fieldLabel: '',
                            emptyText: getLocale( 'Resolucion' ),
                            xtype: 'combobox',
                            itemId: 'resolucionesMini',
                            queryMode: 'local',
                            displayField: 'rll_cdescripcion',
                            valueField: 'rll_ccodigo',
                            width: '50%',
                            editable: false,
                            forceSelection: true,
                            labelWidth: 40,
                            validator: function( value ) {
                                var t = this;
                                if( value == '' ) {
                                    t.markInvalid( 'Debe seleccionar una resolucion' );
                                    t.textValid = 'Debe seleccionar una resolucion';
                                } else {
                                    t.clearInvalid();
                                    t.textValid = true;
                                    var telefono = t.up( 'llamadahelperview' ).down( '#llamada' ).getValue();
                                    if( telefono == '' ) {
                                        t.markInvalid( 'Debe seleccionar un telefono' );
                                        t.textValid = 'Debe seleccionar un telefono';
                                    } else {
                                        t.clearInvalid();
                                        t.textValid = true;
                                        t.up( 'llamadahelperview' ).down( '#resoluciones' ).setValue( t.value )
                                    }
                                }
                                return t.textValid;
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            resizeTabs: true,
            enableTabScroll: true,
            deferredRender: false,
            layoutOnTabChange: true,
            flex: 1,
            margin: '0 5 0 0',
            itemId: 'agenda',
            items: [
                {
                    title: 'Emergencia',
                    xtype: 'llamadacontactargridview',
                    margin: '0 0 0 0',
                    itemId: 'listaemergencia'
                },
                {
                    title: 'Contactos',
                    xtype: 'llamadacontactargridview',
                    margin: '0 0 0 0',
                    itemId: 'contactar'
                }, {
                    xtype: 'llamadasmartpanicsgridview',
                    margin: '0 0 0 0'
                }, {
                    title: 'Contactos Dealer',
                    xtype: 'llamadatelefonosdealergridview',
                    margin: '0 0 0 0'
                }, {
                    title: 'Jurisdiccionales',
                    xtype: 'llamadacontactarjuridiccionalesgridview',
                    margin: '0 0 0 0'
                }, {
                    xtype: 'llamadarealizadasgridview',
                    margin: '0 0 0 0',
                    abrir: true
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'Contacto seleccionado',
            autoScroll: true,
            itemId: 'llamadahelperBig',
            bodyStyle: {
                'background-color': '#e7e7e7',
                'padding': '5px'
            },
            flex: 1,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: '',
                    itemId: 'llamada',
                    labelWidth: 150,
                    listeners: {
                        change: function() {
                            var t = this;
                            t.up( 'llamadahelperview' ).down( '#resoluciones' ).validate();
                        }
                    },
                    fieldStyle: {
                        'font-size': '18px',
                        'font-weight': 'bold'
                    },
                    hidden: true
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '',
                    itemId: 'llamadanombre',
                    fieldStyle: {
                        'font-size': '18px',
                        'font-weight': 'bold'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Clave',
                    itemId: 'clavecontacto',
                    labelWidth: 80
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Permiso',
                    itemId: 'permisoscontacto',
                    labelWidth: 80
                }
                , {
                    xtype: 'displayfield',
                    fieldLabel: 'Observación',
                    itemId: 'tel_cobservacion',
                    labelWidth: 80,
                    //height: 100,
                    autoScroll: true,
                    width: '100%'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: '',
                    itemId: 'llamadatelefono',
                    fieldStyle: {
                        'font-size': '18px',
                        'font-weight': 'bold'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Logger',
                    itemId: 'loggerLauncher',
                    iconCls: 'icon-telephone-link',
                    hidden: true
                }, {
                    xtype: 'fieldset',
                    //layout:'hbox',
                    hidden: false,
                    itemId: 'btnsllamado',
                    defaults: {
                        style: {
                            float: 'left'
                        }
                    },
                    items: []
                }
                , {
                    xtype: 'displayfield',
                    fieldStyle: 'font-weight:bold;font-size:12px',
                    itemId: 'timer'
                },
                {
                    xtype: 'fieldset',
                    width: '100%',
                    itemId: 'formllamada',
                    items: [
                        {
                            fieldLabel: 'Usuario del panel',
                            xtype: 'combobox',
                            itemId: 'usuarios',
                            queryMode: 'local',
                            displayField: '_usuario_contrasena',
                            valueField: 'Id',
                            width: '100%',
                            margin: '5 0 0 0',
                            labelWidth: 150
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Clave',
                            itemId: 'claveusuario',
                            labelWidth: 150,
                            width: 200
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Observación',
                            itemId: 'descripcionusuario',
                            labelWidth: 150,
                            width: '100%'
                        },
                        {
                            xtype: 'displayfield',
                            value: getLocale( 'Observación' ),
                            itemId: 'observaciontitle',
                            fieldLabel: '',
                            width: '100%'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: '',
                            width: '100%',
                            itemId: 'observaciones'
                        },
                        {
                            fieldLabel: 'Resolución',
                            xtype: 'combobox',
                            itemId: 'resoluciones',
                            queryMode: 'local',
                            displayField: 'rll_cdescripcion',
                            valueField: 'rll_ccodigo',
                            width: '100%',
                            labelWidth: 80,
                            editable: false,
                            forceSelection: true,
                            validator: function( value ) {
                                var t = this;
                                if( value == '' ) {
                                    t.markInvalid( 'Debe seleccionar una resolucion' );
                                    t.textValid = 'Debe seleccionar una resolucion';
                                } else {
                                    t.clearInvalid();
                                    t.textValid = true;
                                    //t.up('llamadahelperview').down('[action="save"]').setDisabled(false);
                                    var telefono = t.up( 'llamadahelperview' ).down( '#llamada' ).getValue();
                                    if( telefono == '' ) {
                                        t.markInvalid( 'Debe seleccionar un telefono' );
                                        t.textValid = 'Debe seleccionar un telefono';
                                        //   t.up('llamadahelperview').down('[action="save"]').setDisabled(true);     
                                    } else {
                                        t.clearInvalid();
                                        t.textValid = true;
                                        //  t.up('llamadahelperview').down('[action="save"]').setDisabled(false);
                                    }
                                }
                                return t.textValid;
                            }
                        }
                    ]
                }
            ]
        }
    ],
    initComponent: function() {
        this.callParent();
        this.down( 'llamadarealizadasgridview' ).record = this.record;
        this.down( 'llamadacontactargridview' ).record = this.record;
        this.down( 'llamadacontactargridview' ).caller = this;
        if( this.down( 'llamadasmartpanicsgridview' ) ) {
            this.down( 'llamadasmartpanicsgridview' ).caller = this;
        }
        if( this.down( 'llamadacontactarjuridiccionalesgridview' ) ) {
            this.down( 'llamadacontactarjuridiccionalesgridview' ).caller = this;
        }
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: '',
                    value: getLocale( 'Datos de la cuenta' ) + ':',
                    fieldStyle: 'font-weight:bold',
                    margin: '0 10 0 0'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Telefono',
                    itemId: 'telfonocuenta',
                    labelAlign: 'right',
                    margin: '0 10 0 0',
                    labelWidth: 60
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Clave',
                    itemId: 'clavetelefono',
                    labelAlign: 'right',
                    margin: '0 10 0 0',
                    labelWidth: 60,
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Permiso',
                    labelAlign: 'right',
                    itemId: 'permisotelefono',
                    labelWidth: 60,
                }, "->", {
                    xtype: 'button',
                    iconCls: 'icon-cancel',
                    text: 'Cerrar',
                    action: 'close',
                    itemId: 'close'
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    }
});