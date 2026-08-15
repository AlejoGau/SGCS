Ext.define('SgAppWebReport.view.ReporteTiemposEventosView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportetiemposeventosview',

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
                        var iframe = button.up('reportetiemposeventosview').down('#Iframe');
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
                                        anchor: '100%',
                                        itemId: 'combohistorico',
                                        name: 'tablahistorico',
                                        width: 330,
                                        //plugins: ['clearbutton'],
                                        //  hidden:true // se pidio habilitar el dia 5/6/2017
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId: 'minutos',
                                        fieldLabel: 'Minutos',
                                        value: 3,
                                        width: 330
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fechadesde',
                                        itemId: 'fechadesde',
                                        fieldLabel: 'Fecha Desde',
                                        width: 330
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fechahasta',
                                        itemId: 'fechahasta',
                                        fieldLabel: 'Fecha Hasta',
                                        width: 330
                                    }, {
                                        xtype: 'checkbox',
                                        name: 'mostrarcuentas',
                                        itemId: 'mostrarcuentas',
                                        labelWidth: 150,
                                        fieldLabel: 'Mostrar Cuentas',
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
                }, '->',
                {
                    xtype: 'button',
                    text: 'Exportar',
                    itemId: 'btnExportar',
                    action: 'export',
                    iconCls: 'icon-page-excel'
                }

            ]// cierro items
        });



        this.addDocked(toolbar);
    }
});
