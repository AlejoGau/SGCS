Ext.define('SgAppWebReport.view.ReporteHorasPorTecnicoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportehorasportecnicoview',

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
                        var iframe = button.up('reportehorasportecnicoview').down('#Iframe');
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
                                        width: 230
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fechaHasta',
                                        itemId: 'fechaHasta',
                                        fieldLabel: 'Fecha Hasta',
                                        bindToModel: false,
                                        width: 230
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Tecnico',
                                        displayField: 'ins_cnombre',
                                        queryMode: 'local',
                                        valueField: 'ins_cnombre',
                                        itemId: 'tecnico',
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