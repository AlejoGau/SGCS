Ext.define('SgAppWebReport.view.ReporteEventosAlDiaView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteeventosaldiaview',

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
                        var iframe = button.up('reporteeventosaldiaview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 350,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Tabla Histórico',
                                        displayField: '_periodo',
                                        queryMode: 'local',
                                        valueField: 'c_periodo',
                                        itemId: 'combohistorico',
                                        name: 'tablahistorico',
                                        width: 330,
                                        //plugins: ['clearbutton']
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fechadesde',
                                        itemId: 'fechadesde',
                                        fieldLabel: 'Fecha Desde',
                                        bindToModel: false,
                                        width: 330
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fechahasta',
                                        itemId: 'fechahasta',
                                        fieldLabel: 'Fecha Hasta',
                                        bindToModel: false,
                                        width: 330
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
                }

            ]// cierro items
        });

        this.addDocked(toolbar);
    }
});