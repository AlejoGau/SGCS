Ext.define('SgAppWebReport.view.ReporteHorasPorObjetivoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportehorasporobjectivoview',

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
        //('cuentachanged');

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint',
                    /*handler: function (button) {
                        var iframe = button.up('reportehorasporobjectivoview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [{
                                    xtype: 'datefield',
                                    name: 'fechaDesde',
                                    itemId: 'fechaDesde',
                                    fieldLabel: 'Fecha Desde',
                                    bindToModel: false,
                                    width: 230,
                                    //plugins: ['clearbutton']
                                }, {
                                    xtype: 'datefield',
                                    name: 'fechaHasta',
                                    itemId: 'fechaHasta',
                                    fieldLabel: 'Fecha Hasta',
                                    bindToModel: false,
                                    width: 230,
                                    //plugins: ['clearbutton']
                                }, {
                                    xtype: 'fieldset',
                                    padding: '0 0 0 0',
                                    border: 0,
                                    layout: 'hbox',
                                    margin: '0 0 10 0',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Seleccione una cuenta',
                                            iconCls: 'icon-find',
                                            itemId: 'seleccionarcuenta',
                                            margin: '0 10 0 0',
                                            action: 'seleccionarCuenta'
                                        }, {
                                            xtype: 'button',
                                            text: '',
                                            iconCls: 'icon-cancel',
                                            itemId: 'sacarcuenta',
                                            hidden: true,
                                            margin: '0 5 0 0',
                                            listeners: {
                                                click: function (button) {
                                                    button.up('reportehorasporobjectivoview').down('#idcuenta').setValue('')
                                                    button.up('reportehorasporobjectivoview').down('#nombrecuenta').setValue('')
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
                                        }
                                    ]
                                }, {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Tipo Horas',
                                    itemId: 'Ths',
                                    width: 230
                                }
                                    , {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Identificador',
                                    itemId: 'iden',
                                    width: 230
                                }
                                    , {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Observaciones',
                                    itemId: 'Obs',
                                    width: 230
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