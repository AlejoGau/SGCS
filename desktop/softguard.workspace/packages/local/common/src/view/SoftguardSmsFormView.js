//MIGRADO2024
Ext.define( 'Common.view.SoftguardSmsFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.smsformview',
    preventHeader: true,
    frame: true,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 120,
        anchor: '100%'
    },
    monitorValid: true,
    items: [
        {
            xtype: 'checkbox',
            fieldLabel: 'Notificar eventos de alerta',
            itemId: 'eventosalerta',
            labelWidth: 200,
            name: 'sms_inotificaralertas',
            inputValue: 1
        },
        {
            xtype: 'fieldset',
            margin: '10 0 0 0',
            title: 'Eventos',
            itemId: 'eventosfieldset',
            items: [
                {
                    xtype: 'textarea',
                    fieldLabel: 'Seleccionados',
                    height: 120,
                    name: '_eventos',
                    itemId: 'eventos'
                },
                {
                    xtype: 'button',
                    text: 'Modificar',
                    itemId: 'agregarevento',
                    margin: '5 0 5 0',
                }
            ]
        }, {
            xtype: 'container',
            hidden: true,
            itemId: 'contSonido',
            style: 'margin-left: -10px;',
            layout: {
                type: 'column'
                , align: 'center' // or 'right'
                , pack: 'center' // controls vertical align
                , defaultMargins: 5
            },
            items: [ {
                xtype: 'combo',
                fieldLabel: 'Sonido',
                itemId: 'sms_cSonido',
                valueField: 'codigo',
                displayField: 'nombre',
                queryMode: 'local', //A TENER EN CUENTA
                name: 'sms_cSonido',
                padding: '10 10 0 10',
                store: {
                    fields: ['codigo', 'nombre', 'soundpath'],
                    data: []
                }
            }, {
                    xtype: 'container',
                    padding: '10 10 0 10',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-control-play',
                            itemId: 'botonSonido',
                            maxHeight: 20,
                            maxWidth: 20
                        }
                    ]
                }
            ]
        }, {
            xtype: 'combo',
            margin: '5 0 5 0',
            itemId: 'sms_czona',
            fieldLabel: 'Zona',
            displayField: 'zon_cdescripcion',
            valueField: 'zon_ccodigo',
            queryMode: 'local',
            width: '100%',
            name: 'sms_czona',
            plugins: [ 'clearbutton' ],
            store: {
                fields: ['zon_cdescripcion', 'zon_ccodigo'],
                data: []
            }
        }, {
            xtype: 'combo',
            margin: '5 0 5 0',
            itemId: 'grupos',
            fieldLabel: 'Grupo',
            displayField: 'gru_cdescripcion',
            valueField: 'Id',
            queryMode: 'local',
            width: '100%',
            name: 'sms_iGrupoAlarmas',
            plugins: [ 'clearbutton' ],
            store: {
                fields: ['gru_cdescripcion', 'Id'],
                data: []
            }
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '5 0 5 0',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Descripcion',
                    name: 'sms_cDescripcion',
                    itemId: 'descripcion',
                    flex: 1
                }, {
                    xtype: 'button',
                    iconCls: 'x-tbar-loading',
                    itemId: 'refreshnombres'
                }
            ]
        }
        , {
            xtype: 'fieldset',
            margin: '10 0 0 0',
            title: 'Sms',
            itemId: 'fieldsetsms',
            hidden: true,
            items: [ {
                xtype: 'combo',
                itemId: 'contacto',
                displayField: 'tel_cnombre',
                valueField: 'tel_ctelefono',
                fieldLabel: 'Contactos',
                queryMode: 'local',
                flex: 1,
                store: {
                    fields: ['tel_cnombre', 'tel_ctelefono'],
                    data: []
                }
            },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Numero SMS',
                            itemId: 'sms_numero',
                            flex: 1,
                            maskRe: /[0-9]/
                        }, {
                            xtype: 'button',
                            action: 'agregarsms',
                            text: 'Agregar',
                            margin: '0 0 5 0',
                        }
                    ]
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Destino Sms',
                    name: "sms_csmsparaeventos",
                    itemId: 'destinosms',
                    readOnly: false,
                    maskRe: /[0-9]/
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'combo',
                            //store: 'TablaPlantillasSmsStore',
                            queryMode: 'local',
                            displayField: 'pls_cdescripcion',
                            valueField: 'pls_ccodigo',
                            fieldLabel: 'Plantilla Sms',
                            name: 'sms_cplantillasms',
                            flex: 1,
                            itemId: 'sms_cplantillasms',
                            store: {
                                fields: ['pls_cdescripcion', 'pls_ccodigo', 'pls_mplantilla'],
                                data: []
                            },
                            validator: function( value ) {
                                var t = this;
                                if( Ext.util.Format.trim( t.up( 'smsformview' ).down( '#destinosms' ).getValue() ) != '' && value == '' ) {
                                    t.markInvalid( 'Debe seleccionar una plantilla sms.' );
                                    t.textValid = 'Debe seleccionar una plantilla sms.';
                                } else {
                                    t.clearInvalid();
                                    t.textValid = true;
                                }
                                return this.textValid;
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Ver',
                            action: 'verPlantillaSms'
                        }
                    ]
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Modem sms',
                    //  store: 'TablaModemsSmsStore',
                    itemId: 'modem',
                    name: 'sms_imodemsms',
                    displayField: 'sms_cdescripcion',
                    valueField: 'sms_icodigo',
                    anchor: '100%',
                    queryMode: 'local',
                    /*allowBlank : false,*/
                    emptyText: getLocale( 'Seleccione' ),
                    hidden: true,
                    store: {
                        fields: ['sms_cdescripcion', 'sms_icodigo', 'sms_cDealer'],
                        data: []
                    },
                    validator: function( value ) {
                        var t = this;
                        if( Ext.util.Format.trim( t.up( 'smsformview' ).down( '#destinosms' ).getValue() ) != '' && value == '' ) {
                            t.markInvalid( 'Se debe seleccionar un modem sms.' );
                            t.textValid = 'Se debe seleccionar un modem sms.';
                        } else {
                            t.clearInvalid();
                            t.textValid = true;
                        }
                        return this.textValid;
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Modem sms',
                    name: '_rep_iModemSMS',
                    itemId: 'displaymodem'
                }]
        }, {
            xtype: 'fieldset',
            margin: '10 0 0 0',
            title: 'Push',
            itemId: 'fieldsetpush',
            hidden: true,
            items: [/*{
                xtype : 'combo',
                fieldLabel : 'Smartpanics',
               
                itemId: 'smartpanics',
        		name : 'sms_cidsPushSmartpanic',
    			displayField : 'Nombre',
    			valueField : 'Id',
                anchor : '100%',
                queryMode: 'local',
        
                emptyText: getLocale('Seleccione'),
                multiSelect:true
    		},*/{
                    xtype: 'smartpanicsfield',
                    itemId: 'smartpanicsfield',
                    //se saco ocultarCuentasPropias a pedido de rodrigo el dia 6/8/2018
                    //para poder ver la pestaña de cuentas propias para dealer y admin cuenta
                    //ocultarCuentasPropias: true
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            //store: 'TablaPlantillasSmsStore',
                            queryMode: 'local',
                            displayField: 'pls_cdescripcion',
                            valueField: 'pls_ccodigo',
                            fieldLabel: 'Plantilla Push',
                            name: 'sms_cplantillapush',
                            itemId: 'sms_cplantillapush',
                            flex: 1,
                            store: {
                                fields: ['pls_cdescripcion', 'pls_ccodigo', 'pls_mplantilla'],
                                data: []
                            },
                            validator: function( value ) {
                                var t = this;
                                if( t.up( 'smsformview' ).down( '#smartpanicsfield' ).getValue() != null && t.up( 'smsformview' ).down( '#smartpanicsfield' ).getValue() != '' && value == '' ) {
                                    t.markInvalid( 'Se debe seleccionar una plantilla.' );
                                    t.textValid = 'Se debe seleccionar una plantilla.';
                                } else {
                                    t.clearInvalid();
                                    t.textValid = true;
                                }
                                return this.textValid;
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Ver',
                            action: 'verPlantillapush'
                        }
                    ]
                }
            ]
        }, {
            xtype: 'fieldset',
            margin: '10 0 0 0',
            title: 'Mail',
            itemId: 'fieldsetemail',
            hidden: true,
            items: [ {
                xtype: 'textarea',
                fieldLabel: 'Destino Mail',
                itemId: 'destinomail',
                name: "sms_cmailparaeventos",
                validator: function( value ) {
                    var reg = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;
                    if( !value.match( reg ) && value != '' ) {
                        this.markInvalid( "El email esta mal formulado." );
                        this.textValid = "El email esta mal formulado.";
                    } else {
                        this.clearInvalid();
                        this.textValid = true;
                    }
                    return this.textValid;
                },
            },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5 0 5 0',
                    items: [
                        {
                            xtype: 'combo',
                            //store: 'TablaPlantillasSmsStore',
                            queryMode: 'local',
                            displayField: 'pls_cdescripcion',
                            valueField: 'pls_ccodigo',
                            fieldLabel: 'Plantilla Mail',
                            name: 'sms_cplantillamail',
                            itemId: 'sms_cplantillamail',
                            flex: 1,
                            store: {
                                fields: ['pls_cdescripcion', 'pls_ccodigo', 'pls_mplantilla'],
                                data: []
                            },
                            validator: function( value ) {
                                var t = this;
                                if( Ext.util.Format.trim( t.up( 'smsformview' ).down( '#destinomail' ).getValue() ) != '' && value == '' ) {
                                    t.markInvalid( 'Se debe seleccionar una plantilla.' );
                                    t.textValid = 'Se debe seleccionar una plantilla.';
                                } else {
                                    t.clearInvalid();
                                    t.textValid = true;
                                }
                                return this.textValid;
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Ver',
                            action: 'verPlantillaMail'
                        }
                    ]
                }
            ]
        }
    ],
    buttons: [ {
        text: 'Aceptar',
        action: 'save',
        itemId: 'save',
        margin: '5 5 5 5'
    }, {
            text: 'Solicitar cambio',
            iconCls: 'save',
            itemId: 'solitarcambio',
            action: 'solitarcambio',
            hidden: true
        }, {
            text: 'Cancelar',
            action: 'cancel'
        }],
    initComponent: function() {
        this.callParent( arguments );
        this.down( 'smartpanicsfield' ).caller = this
        this.down( 'smartpanicsfield' ).ocultarCuentasPropias = this.ocultarCuentasPropias
    } // cierro init
});