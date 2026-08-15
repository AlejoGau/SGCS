Ext.define( 'AdministratorSearch.view.TablasModemsSmsFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.tablasmodemssmsformview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true
    },
    items: [
        {
            xtype: 'textfield',
            name: 'sms_cdescripcion',
            fieldLabel: 'Descripción',
            allowBlank: false,
            maxLength: 40,
            anchor: '100%',
            regex: /^[A-Za-z0-9 \.\,\-\_\/]*$/,
            regexText: getLocale( 'Los caracteres válidos son<br/>- Números<br/>- Letras mayúsculas y minúsculas<br>- Espacios y caracteres .,-_/' )
        }, {
            xtype: 'combo',
            fieldLabel: 'Gateway Mensajería',
            name: 'sms_iGateway',
            displayField: 'tgm_cdescripcion',
            valueField: 'Id',
            anchor: '100%',
            itemId: 'gateways',
            queryMode: 'local',
            allowBlank: false
        },
        {
            xtype: 'combo',
            fieldLabel: 'Principal',
            name: 'sms_ndefault',
            itemId: 'sms_ndefault',
            store: [
                [ 0, getLocale( 'No' ) ],
                [ 1, getLocale( 'Si' ) ]
            ],
            allowBlank: false,
            inputWidth: 100
        }
        , {
            xtype: 'combo',
            fieldLabel: 'Estado',
            name: 'sms_nEstado',
            itemId: 'sms_nEstado',
            store: [
                [ 2, getLocale( 'Habilitado' ) ],
                [ 1, getLocale( 'Deshabilitado' ) ]
            ],
            allowBlank: false,
            inputWidth: 100
        }, {
            xtype: 'textfield',
            itemId: 'sms_csourceImei',
            fieldLabel: 'IMEI',
            anchor: '100%',
            allowBlank: false,
            hidden: true
        }, , {
            xtype: 'selecterfield',
            itemId: 'dealer',
            simpleSelect: false,
            config: {
                disponible: {
                    title: 'Dealer',
                    field: 'lin_ccodigo',
                    searchField: 'o.[lin_ccodigo]'
                },
                selecionado: {
                    title: 'Dealer',
                    field: 'lin_ccodigo'
                },
                valueField: 'lin_ccodigo',
                //prefijoParaFiltro:'o',
                valueFieldFilter: ':IN',
                modelItems: 'AdministratorSearch.model.TablasLineasSearchModel'
            },
            title: 'Asginacion dealer'

        }, {
            xtype: 'combo',
            fieldLabel: 'Terminal',
            itemId: 'terminal',
            name: 'sms_cterminal',
            store: 'TablasTerminalesStore',
            displayField: '_ter_cdescripcion',
            valueField: 'ter_ccodigo',
            anchor: '100%',
            queryMode: 'local',
            allowBlank: false
        }, {
            xtype: 'fieldset',
            title: 'Modem SMS',
            //  collapsible: true,
            itemId: 'smpp',
            hidden: true,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 200,
                enforceMaxLength: true
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'numberfield',
                    name: 'sms_nport',
                    fieldLabel: 'Puerto',
                    allowBlank: false,
                    value: 0,
                    minValue: 0,
                    maxValue: 15,
                    itemId: 'puerto',
                    labelWidth: 150,
                    listeners: {
                        change: function( v ) {
                            /* if(v.getValue() == 0) {
                                 v.up('tablasmodemssmsformview').down('#smpp').hide();
                             } else {
                                 v.up('tablasmodemssmsformview').down('#smpp').show();
                             }*/

                        }
                    },
                    validator: function( value ) {
                        var form = this.up( 'form' ).getForm();
                        this.textValid = true;
                        var record = this.up( 'tablasmodemssmsformview' ).record;
                        if( form.findField( 'sms_iGateway' ).getValue() == 0 ) {
                            if( value != '' ) {
                                this.clearInvalid();
                                this.textValid = true;
                            } else {
                                this.markInvalid( 'No puede estar vacio.' );
                                this.textValid = false;
                            }

                        } else {
                            this.clearInvalid();
                            this.textValid = true;
                        }
                        return this.textValid;
                    }
                }, {
                    xtype: 'textfield',
                    name: 'sms_cseteo',
                    fieldLabel: 'Seteo',
                    allowBlank: false,
                    itemId: 'seteo',
                    maxLength: 200,
                    labelWidth: 150,
                    enforceMaxLength: true,
                    validator: function( value ) {
                        var form = this.up( 'form' ).getForm();
                        this.textValid = true;
                        var record = this.up( 'tablasmodemssmsformview' ).record;
                        if( form.findField( 'sms_iGateway' ).getValue() == 0 ) {
                            if( value != '' ) {
                                this.clearInvalid();
                                this.textValid = true;
                            } else {
                                this.markInvalid( 'No puede estar vacio.' );
                                this.textValid = false;
                            }

                        } else {
                            this.clearInvalid();
                            this.textValid = true;
                        }
                        return this.textValid;
                    }
                }, {
                    xtype: 'textfield',
                    name: 'sms_cinbox',
                    fieldLabel: 'Inbox Desde/Hasta',
                    itemId: 'inbox',
                    allowBlank: true,
                    maxLength: 5,
                    labelWidth: 150,
                    enforceMaxLength: true,
                    validator: function( value ) {
                        var form = this.up( 'form' ).getForm();
                        this.textValid = true;
                        var record = this.up( 'tablasmodemssmsformview' ).record;
                        if( form.findField( 'sms_iGateway' ).getValue() == 0 ) {
                            if( value != '' ) {
                                this.clearInvalid();
                                this.textValid = true;
                            } else {
                                this.markInvalid( 'No puede estar vacio.' );
                                this.textValid = false;
                            }

                        } else {
                            this.clearInvalid();
                            this.textValid = true;
                        }
                        return this.textValid;
                    }
                }, {
                    xtype: 'textfield',
                    name: 'sms_csource',
                    fieldLabel: 'Source (N° Origen)',
                    allowBlank: true,
                    maxLength: 20,
                    labelWidth: 150,
                    enforceMaxLength: true,
                    anchor: '100%',
                    itemId: 'source',
                    validator: function( value ) {
                        var form = this.up( 'form' ).getForm();
                        this.textValid = true;
                        var record = this.up( 'tablasmodemssmsformview' ).record;
                        if( form.findField( 'sms_iGateway' ).getValue() == 0 ) {
                            if( value != '' ) {
                                this.clearInvalid();
                                this.textValid = true;
                            } else {
                                this.markInvalid( 'No puede estar vacio.' );
                                this.textValid = false;
                            }

                        } else {
                            this.clearInvalid();
                            this.textValid = true;
                        }
                        return this.textValid;
                    }
                },


            ]
        }
    ],

    initComponent: function() {
        
        this.callParent();
        console.log( "this", this )
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'/*,
                    formBind: true*/
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    } // cierro init
});