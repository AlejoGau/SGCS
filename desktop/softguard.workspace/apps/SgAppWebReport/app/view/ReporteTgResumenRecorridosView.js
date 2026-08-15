Ext.define('SgAppWebReport.view.ReporteTgResumenRecorridosView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportetgresumenrecorridosview',

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

        this.callParent();
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint',
                    /*handler: function (button) {
                        var iframe = button.up('reportetgresumenrecorridosview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 400,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [{
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [{
                                    xtype: 'datefield',
                                    fieldLabel: 'Desde',
                                    name: "FechaDesde",
                                    bindToModel: false,
                                    itemId: 'FechaDesde',
                                    labelWidth: 50,
                                    width: 230,
                                    name: 'FechaDesde'
                                }, {
                                    fieldLabel: 'Hora',
                                    xtype: 'timefield',
                                    itemId: 'HoraDesde',
                                    format: 'H:i',
                                    altFormats: 'H:i',
                                    value: '00:00',
                                    increment: 10,
                                    labelWidth: 40,
                                    width: 123,
                                    margin: '0 0 0 7',
                                    name: 'HoraDesde'
                                }]
                            }, {
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [{
                                    xtype: 'datefield',
                                    fieldLabel: 'Hasta',
                                    itemId: 'FechaHasta',
                                    bindToModel: false,
                                    name: "FechaHasta",
                                    labelWidth: 50,
                                    width: 230,
                                    name: 'FechaHasta'
                                }, {
                                    fieldLabel: 'Hora',
                                    xtype: 'timefield',
                                    itemId: 'HoraHasta',
                                    format: 'H:i',
                                    altFormats: 'H:i',
                                    value: '23:50',
                                    increment: 10,
                                    labelWidth: 40,
                                    width: 123,
                                    margin: '0 0 0 7',
                                    name: 'HoraHasta'
                                }]
                            }, {
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 10 0',
                                hidden: true,
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'Seleccione un vehículo',
                                        iconCls: 'icon-find',
                                        itemId: 'seleccionarcuenta',
                                        margin: '0 10 0 0',
                                        listeners: {
                                            click: function (button) {
                                                var view = button.up('reportetgresumenrecorridosview');
                                                view.fireEvent('onsSeleccionarCuenta', button, view);
                                            }
                                        }
                                    }, {
                                        xtype: 'button',
                                        text: '',
                                        iconCls: 'icon-cancel',
                                        itemId: 'sacarcuenta',
                                        hidden: true,
                                        margin: '0 5 0 0',
                                        listeners: {
                                            click: function (button) {
                                                button.up('reportetgresumenrecorridosview').down('#idcuenta').setValue('')
                                                button.up('reportetgresumenrecorridosview').down('#nombrecuenta').setValue('')
                                                button.hide()
                                            }
                                        }
                                    }, {
                                        xtype: 'displayfield',
                                        itemId: 'nombrecuenta',
                                        name: 'nombrecuenta'
                                    }, {
                                        xtype: 'displayfield',
                                        hidden: true,
                                        itemId: 'idcuenta',
                                        name: 'idcuenta'
                                    }, {
                                        xtype: 'displayfield',
                                        hidden: true,
                                        itemId: 'cue_cimei',
                                        name: 'cue_cimei'
                                    }
                                ]
                            }, {
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Dealer desde',
                                        itemId: 'dealer',
                                        enforceMaxLength: true,
                                        labelWidth: 80,
                                        width: 180,
                                        maxLength: 3,
                                        name: 'dealer'
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'cuentadesde',
                                        fieldLabel: 'Cuenta desde',
                                        enforceMaxLength: true,
                                        maxLength: 4,
                                        labelWidth: 80,
                                        width: 180,
                                        margin: '0 0 0 9',
                                        name: 'cuentadesde'
                                    }
                                ]
                            }, {
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Dealer hasta',
                                        itemId: 'dealerhasta',
                                        enforceMaxLength: true,
                                        maxLength: 3,
                                        labelWidth: 80,
                                        width: 180,
                                        name: 'dealerhasta'
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'cuentahasta',
                                        fieldLabel: 'Cuenta hasta',
                                        enforceMaxLength: true,
                                        maxLength: 4,
                                        labelWidth: 80,
                                        width: 180,
                                        margin: '0 0 0 9',
                                        name: 'cuentahasta'
                                    }
                                ]
                            },
                             {
                            xtype: 'fieldset',
                            padding: 0,
                            border: 0,
                            margin: '0 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            defaults: {
                                xtype: 'numberfield',
                                labelWidth: 80,
                                width: 180,
                                minValue: 0,
                                allowDecimals: true,
                            },
                            items: [
                                {
                                    fieldLabel: 'Consumo L/Km',
                                    itemId: 'consumoLitrosKm',
                                    name: 'consumoLitrosKm',
                                    decimalPrecision: 3
                                },
                                {
                                    fieldLabel: 'Precio gasolina',
                                    itemId: 'precioGasolina',
                                    name: 'precioGasolina',
                                    decimalPrecision: 2,
                                    margin: '0 0 0 9'
                                }
                            ]
                        }
                        ]
                        }]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                },
                "->"
                , {
                    xtype: 'button',
                    text: 'Exportar',
                    iconCls: 'icon-page-excel',
                    action: 'export'
                }
            ]// cierro items
        });
        this.addDocked(toolbar);
    }
});