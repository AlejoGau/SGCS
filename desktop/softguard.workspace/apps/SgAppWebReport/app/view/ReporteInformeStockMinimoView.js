Ext.define('SgAppWebReport.view.ReporteInformeStockMinimoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteinformestockminimoview',

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
                    action: 'btnprint'
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'combo',
                                        fieldLabel: 'Producto',
                                        displayField: 'Name',
                                        queryMode: 'local',
                                        valueField: 'Id',
                                        itemId: 'producto'
                                    }

                                ]

                            }, {
                                xtype: 'button',
                                text: 'Buscar',
                                iconCls: 'icon-find',
                                action: 'search'
                            }

                        ]
                    }
                }, "-", {
                    xtype: 'button',
                    text: 'Todos',
                    iconCls: 'icon-find',
                    action: 'todos',
                    itemId: 'todos'
                }
            ]// cierro items
        });



        this.addDocked(toolbar);
    }
});