Ext.define('SgAppWebReport.view.ReporteHorasVigiladorMesView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportehorasvigiladormesview',

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
        console.log("afsfsaa")
        this.callParent();
        //('cuentachanged');

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint'
                    /*handler: function (button) {
                        var iframe = button.up('reportehorasvigiladormesview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 250,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'datefield',
                                        name: 'fechaDesde',
                                        itemId: 'fechaDesde',
                                        fieldLabel: 'Fecha Desde',
                                        bindToModel: false,
                                        width: 230,
                                        editable: false,
                                        listeners: {
                                            change: function (field, newValue) {
                                                var fechaHastaField = field.up('panel').down('#fechaHasta');
                                                var fechaHasta = fechaHastaField.getValue();
                                                var oneMonthLater = new Date(newValue.getFullYear(), newValue.getMonth() + 1, newValue.getDate());

                                                if (fechaHasta && oneMonthLater.getTime() > fechaHasta.getTime()) {
                                                    oneMonthLater = fechaHasta;
                                                }

                                                if (oneMonthLater.getDate() > new Date().getDate()) {
                                                    oneMonthLater.setDate(new Date().getDate());
                                                }

                                                fechaHastaField.setValue(oneMonthLater);
                                            }
                                        }
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fechaHasta',
                                        itemId: 'fechaHasta',
                                        fieldLabel: 'Fecha Hasta',
                                        bindToModel: false,
                                        width: 230,
                                        editable: false,
                                        listeners: {
                                            change: function (field, newValue) {
                                                var fechaDesdeField = field.up('panel').down('#fechaDesde');
                                                var fechaDesde = fechaDesdeField.getValue();
                                                var oneMonthEarlier = new Date(newValue.getFullYear(), newValue.getMonth() - 1, newValue.getDate());

                                                if (fechaDesde && oneMonthEarlier.getTime() < fechaDesde.getTime()) {
                                                    oneMonthEarlier = fechaDesde;
                                                }

                                                fechaDesdeField.setValue(oneMonthEarlier);
                                            }
                                        }
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: 'Vigilador',
                                        //displayField : 'usu_cnombre',
                                        //queryMode: 'local',
                                        //valueField : 'usu_iid',
                                        itemId: 'vigilador',
                                        width: 230
                                    }, {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Identificador',
                                        itemId: 'extid',
                                        width: 230
                                    }, {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Observaciones',
                                        itemId: 'Obs',
                                        width: 230
                                    },
                                    //DS-645|adrianlara|20230427 => se agrega nuevo filtro por cuenta
                                    {
                                        xtype: 'fieldset',
                                        padding: '0 0 0 0',
                                        border: 0,
                                        layout: 'column',
                                        margin: '0 0 10 0',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: 'Seleccione una cuenta',
                                                iconCls: 'icon-find',
                                                itemId: 'seleccionarcuenta',
                                                margin: '0 10 0 0',
                                                action: 'seleccionarCuenta'
                                            },
                                            {
                                                xtype: 'button',
                                                text: '',
                                                iconCls: 'icon-cancel',
                                                itemId: 'sacarcuenta',
                                                hidden: true,
                                                margin: '0 5 0 0',
                                                listeners: {
                                                    click: function (button) {
                                                        button.up('reportehorasvigiladormesview').down('#idcuenta').setValue('')
                                                        button.up('reportehorasvigiladormesview').down('#nombrecuenta').setValue('')
                                                        button.up('reportehorasvigiladormesview').down('#cuentaobjetivo').setValue('')
                                                        button.hide()
                                                    }
                                                }
                                            },

                                        ]
                                    },
                                    {
                                        xtype: 'displayfield',
                                        itemId: 'nombrecuenta',
                                        name: 'nombrecuenta'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        hidden: true,
                                        itemId: 'idcuenta',
                                        name: 'idcuenta'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        hidden: true,
                                        itemId: 'cuentaobjetivo',
                                        name: 'cuentaobjetivo'
                                    }
                                ]
                            }

                        ]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }, '->', {
                    text: 'Exportar',
                    menu: {
                        xtype: 'menu',
                        items: [{
                            xtype: 'container',
                            layout: 'vbox',
                            padding: 10,
                            items: [{
                                xtype: 'button',
                                text: 'Exportar a Excel',
                                itemId: 'btnExportar',
                                action: 'export',
                                iconCls: 'icon-page-excel',
                                width: 170,
                            },/**  {
                                    xtype: 'button',
                                    text: 'Exportar a Csv',
                                    itemId: 'btnExportarCsv',
                                    action: 'exportCsv',
                                    iconCls: 'icon-page-excel',
                                    width: 170,
                                    margin: '10 0 0 0'
                                }, */{
                                xtype: 'button',
                                text: 'Exportar Contenido Split',
                                itemId: 'btnExportarSplit',
                                action: 'exportSplit',
                                iconCls: 'icon-page-excel',
                                width: 170,
                                margin: '10 0 0 0'
                            }]
                        }]
                    }
                }

            ]// cierro items
        });

        this.addDocked(toolbar);
    }
});