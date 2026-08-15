Ext.define('SgAppWebReport.view.EstadisticaEventosView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.estadisitcaseventosview',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%'
        }
    ],
    activeHelp: true,
    initComponent: function () {
        this.callParent(arguments);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint',
                    /*handler: function (button) {
                        var iframe = button.up('estadisitcaseventosview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 400,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: 'Eventos',
                                        layout: 'vbox',
                                        items: [
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Tabla Histórico',
                                                displayField: '_periodo',
                                                queryMode: 'local',
                                                valueField: 'c_periodo',
                                                itemId: 'combohistorico',
                                                name: 'tablahistorico',
                                                width: 320,
                                                //plugins: ['clearbutton']
                                            }, {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 5 0',
                                                items: [
                                                    {
                                                        xtype: 'datefield',
                                                        fieldLabel: 'Desde',
                                                        name: "fechadesde",
                                                        bindToModel: false,
                                                        itemId: 'fechadesde',
                                                        labelWidth: 40,
                                                        width: 180
                                                    }, {
                                                        fieldLabel: 'Hora',
                                                        xtype: 'timefield',
                                                        itemId: 'horadesde',
                                                        format: 'H:i',
                                                        altFormats: 'H:i',
                                                        increment: 10,
                                                        labelWidth: 40,
                                                        width: 150,
                                                        margin: '0 0 0 7'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 5 0',
                                                items: [
                                                    {
                                                        xtype: 'datefield',
                                                        fieldLabel: 'Hasta',
                                                        itemId: 'fechahasta',
                                                        bindToModel: false,
                                                        name: "fhasta",
                                                        labelWidth: 40,
                                                        width: 180
                                                    }, {
                                                        fieldLabel: 'Hora',
                                                        xtype: 'timefield',
                                                        itemId: 'horahasta',
                                                        format: 'H:i',
                                                        altFormats: 'H:i',
                                                        increment: 10,
                                                        labelWidth: 40,
                                                        width: 150,
                                                        margin: '0 0 0 7'
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                    , {
                                        xtype: 'fieldset',
                                        layout: 'hbox',
                                        title: 'Eventos',
                                        margin: '0 0 5 0',
                                        items: [{
                                            xtype: 'button',
                                            text: 'Seleccionar alarma',
                                            iconCls: 'icon-bell',
                                            itemId: 'evento',
                                            margin: '0 5 0 0'
                                        }, {
                                            xtype: 'displayfield',
                                            itemId: 'nombreevento',
                                            flex: 1
                                        }, {
                                            xtype: 'button',
                                            text: '',
                                            itemId: 'limpiarevento',
                                            iconCls: 'icon-cancel'
                                        }, {
                                            xtype: 'displayfield',
                                            itemId: 'codevento',
                                            hidden: true
                                        }
                                        ]
                                    }
                                    , {
                                        xtype: 'fieldset',
                                        itemId: 'dealerbloque',
                                        title: 'Dealer',
                                        layout: 'vbox',
                                        items: [
                                            {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 5 0',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Dealer desde',
                                                        itemId: 'dealerdesde',
                                                        width: 150
                                                    }, {
                                                        xtype: 'textfield',
                                                        fieldLabel: ' - Dealer hasta',
                                                        itemId: 'dealerhasta',
                                                        width: 150
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                    , {
                                        xtype: 'fieldset',
                                        itemId: 'rango',
                                        title: 'Cuentas',
                                        layout: 'vbox',
                                        items: [
                                            {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 5 0',
                                                items: [

                                                    {
                                                        xtype: 'textfield',
                                                        itemId: 'cuentadesde',
                                                        fieldLabel: 'Cuenta desde',
                                                        enforceMaxLength: true,
                                                        maxLength: 4,
                                                        width: 150
                                                    }, {
                                                        xtype: 'textfield',
                                                        itemId: 'cuentahasta',
                                                        fieldLabel: ' - Cuenta hasta',
                                                        enforceMaxLength: true,
                                                        maxLength: 4,
                                                        width: 150
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'nombrecuenta',
                                                fieldLabel: 'Nombre'
                                            }
                                        ]
                                    }, {
                                        xtype: 'container',
                                        layput: 'hbox',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: 'Buscar',
                                                iconCls: 'icon-find',
                                                action: 'search',
                                                listeners: {
                                                    'click': function () {
                                                        this.up('menu').closeable = true
                                                        this.up('menu').hide()
                                                    }
                                                }
                                            }, {
                                                xtype: 'button',
                                                text: 'Cerrar',
                                                iconCls: 'icon-cancel',
                                                listeners: {
                                                    'click': function () {
                                                        this.up('menu').closeable = true
                                                        this.up('menu').hide()
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        });
        this.addDocked(toolbar);
    }
});