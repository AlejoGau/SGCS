Ext.define('SgAppWebReport.view.ReporteSmartPanicsDispositivosDetView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportesmartpanicsdispositivosdetview',

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
                        var iframe = button.up('reportesmartpanicsdispositivosdetview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 450,
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Dealer desde',
                                    itemId: 'dealer',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 200,
                                    name: 'dealer'
                                }, {
                                    xtype: 'textfield',
                                    itemId: 'cuentadesde',
                                    fieldLabel: 'Cuenta desde',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 200,
                                    labelWidth: 110,
                                    margin: '0 0 0 9',
                                    name: 'cuentadesde'
                                }]
                            }, {
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Dealer hasta',
                                    itemId: 'dealerhasta',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 200,
                                    name: 'dealerhasta'
                                }, {
                                    xtype: 'textfield',
                                    itemId: 'cuentahasta',
                                    fieldLabel: 'Cuenta hasta',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 200,
                                    margin: '0 0 0 9',
                                    labelWidth: 110,
                                    name: 'cuentahasta'
                                }]
                            }, {
                                xtype: 'combo',
                                itemId: 'estado',
                                fieldLabel: 'Estado',
                                queryMode: 'local',
                                width: "100%",
                                store: [
                                    ['1', getLocale('Activado')],
                                    ['0', getLocale('Sin asignar')]
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
                    text: 'Exportar reporte detallado',
                    iconCls: 'icon-page-excel',
                    action: 'export'
                }
            ]// cierro items
        });



        this.addDocked(toolbar);
    }
});