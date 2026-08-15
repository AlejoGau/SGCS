Ext.define( 'AdministratorSearch.view.TablasCondicionesDePagoFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.tablascondicionesdepagoformview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 120,
        enforceMaxLength: true,
        anchor: '100%'
    },
    items: [
        {
            xtype: 'textfield',
            name: 'con_cdescripcion',
            fieldLabel: 'Descripcion',
            allowBlank: false
        }, {
            xtype: 'combo',
            name: 'con_orgidcodigoid',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Empresa Facturadora',
            lastQuery: '',
            itemId: 'organizacionfacturadora',
            displayField: 'org_cnombre',
            valueField: 'Id',
            forceSelection: true,
            allowBlank: false
        }, {
            xtype: 'combo',
            fieldLabel: 'Pide datos',
            store: 'SiNoStore',
            queryMode: 'local',
            hidden: true,
            forceSelection: true,
            editable: false,
            valueField: 'Value',
            displayField: 'Name',
            itemId: 'con_nPideDatos',
            name: "con_nPideDatos"
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Forma de pago',
                    displayField: '_fpg_cdescripcion',
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    valueField: 'fpg_ccodigo',
                    name: "con_cFormaPagoCobrAut",
                    itemId: 'tipodepago',
                    // hidden:true,
                    validator: function( value ) {
                        var cobranzaauto = 1//this.up('tablascondicionesdepagoformview').down('#cobranzaauto').getValue()
                        var t = this;

                        if( cobranzaauto == 1 ) {
                            if( value == '' || value == 0 ) {
                                t.markInvalid( 'Se requiere definir una forma de pago.' );
                                t.textValid = false;
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                            }
                        } else {
                            t.clearInvalid();
                            t.textValid = true;
                        }

                        return t.textValid;
                    }
                }, {
                    xtype: 'button',
                    text: 'Nueva forma de pago',
                    itemId: 'nuevaformadepago',
                    iconCls: 'icon-money'
                }
            ]
        },{
            xtype: 'fieldset',
            title: 'Cobranza automatica',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Activar',
                    store: 'SiNoStore',
                    displayField: 'Name',
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    valueField: 'Value',
                    name: "con_nCobranzaAut",
                    value: 0,
                    itemId: 'cobranzaauto',
                    listeners: {
                        change: function( combo, value ) {
                            var view = this.up( 'tablascondicionesdepagoformview' )
                            if( value == 1 ) {
                                view.down( '#con_nPideDatos' ).show();
                                view.down('#con_iRemesa').show();
                                view.down('#confRemesa').show();
                            } else {
                                view.down( '#con_nPideDatos' ).hide();
                                view.down('#con_iRemesa').hide();
                                view.down('#confRemesa').hide();
                            }
                        }
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Integración',
                    displayField: 'rem_cdescripcion',
                    queryMode: 'local',
                    hidden: true,
                    forceSelection: true,
                    editable: false,
                    valueField: 'rem_icodigo_ID',
                    itemId: 'con_iRemesa',
                    name: 'con_iRemesa',
                    plugins : ['clearbutton']
                }, {
                    xtype: 'form',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    itemId:'confRemesa',
                    hidden:true,
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 120,
                        enforceMaxLength: true,
                        anchor: '100%'
                    },
                    items: []
                }
            ]
        }
        
        
         , {
            xtype: 'numberfield',
            name: 'con_ncuotas',
            hidden: true,
            fieldLabel: 'Cuotas',
            itemId: 'cuotas',
            listeners: {
                change: function( combo, value ) {

                    var view = combo.up( 'tablascondicionesdepagoformview' )
                    if( value > 1 ) {
                        view.down( '#diasvencimiento' ).show()
                        view.down( '#frecuencia' ).show()
                    } else {
                        view.down( '#diasvencimiento' ).hide()
                        view.down( '#frecuencia' ).hide()
                    }
                }
            }
        }, {
            xtype: 'numberfield',
            name: 'con_idias',
            fieldLabel: 'Dias 1er vencimiento',
            itemId: 'diasvencimiento',
            hidden: true,
            validator: function( value ) {
                var cuotas = this.up( 'tablascondicionesdepagoformview' ).down( '#cuotas' ).getValue()
                var t = this;

                if( cuotas > 1 ) {
                    if( value <= 1 ) {
                        t.markInvalid( 'Se requiere definir dia de vencimiento.' );
                        t.textValid = false;
                    } else {
                        t.clearInvalid();
                        t.textValid = true;
                    }
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
                return t.textValid;
            }
        }, {
            xtype: 'numberfield',
            name: 'con_ifrecuencia',
            itemId: 'frecuencia',
            hidden: true,
            fieldLabel: 'Frecuencia',
            validator: function( value ) {
                var cuotas = this.up( 'tablascondicionesdepagoformview' ).down( '#frecuencia' ).getValue()
                var t = this;

                if( cuotas > 1 ) {
                    if( value <= 1 ) {
                        t.markInvalid( 'Se requiere definir frecuencia.' );
                        t.textValid = false;
                    } else {
                        t.clearInvalid();
                        t.textValid = true;
                    }
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
                return t.textValid;
            }
        }
    ],

    initComponent: function() {
        
        this.callParent();
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    } // cierro init
});