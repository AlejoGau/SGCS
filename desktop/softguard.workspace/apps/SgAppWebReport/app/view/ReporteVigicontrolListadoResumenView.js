Ext.define('SgAppWebReport.view.ReporteVigicontrolListadoResumenView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportevigicontrollistadoresumenview',

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
                    action: 'btnprint',
                    /*handler: function (button) {
                        var iframe = button.up('reportevigicontrollistadoresumenview').down('#Iframe');
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
                                        xtype: 'combo',
                                        margin: 5,
                                        fieldLabel: 'Mes',
                                        itemId: 'mes',
                                        store:[
                                            [1, getLocale('Enero')],
                                            [2, getLocale('Febrero')],
                                            [3, getLocale('Marzo')],
                                            [4, getLocale('Abril')],
                                            [5, getLocale('Mayo')],
                                            [6, getLocale('Junio')],
                                            [7, getLocale('Julio')],
                                            [8, getLocale('Agosto')],
                                            [9, getLocale('Septiembre')],
                                            [10, getLocale('Octubre')],
                                            [11, getLocale('Noviembre')],
                                            [12, getLocale('Diciembre')]
                                        ],
                                        name:'mes',
                                        width: 200,
                                        labelWidth: 75
                                    },
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Anio',
                                        margin: 5,
                                        itemId: 'anio',
                                        store:[
                                            [2020, '2020'],
                                            [2021, '2021'],
                                            [2022, '2022'],
                                            [2023, '2023'],
                                            [2024, '2024'],
                                            [2025, '2025'],
                                            [2026, '2026'],
                                            [2027, '2027'],
                                            [2028, '2028'],
                                            [2029, '2029'],
                                            [2030, '2030'],
                                        ],
                                        name:'anio',
                                        width: 200,
                                        labelWidth: 75
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
                                                        button.up('reportevigicontrollistadoresumenview').down('#idcuenta').setValue('')
                                                        button.up('reportevigicontrollistadoresumenview').down('#nombrecuenta').setValue('')
                                                        button.up('reportevigicontrollistadoresumenview').down('#cuentaobjetivo').setValue('')
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
                                hidden: true,
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