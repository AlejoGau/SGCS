Ext.define('SgAppWebReport.view.ReporteOperadorTiempoYPrioridadView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteoperadortiempoyprioridadview',

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
        //( 'cuentachanged' );

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint',
                    /*handler: function (button) {
                        console.log("Ffassaf")
                        var iframe = button.up('reporteoperadortiempoyprioridadview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, "-", {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 420,
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
                                        //plugins: ['clearbutton'],
                                        labelWidth: 100,
                                        width: 250
                                    }, {
                                        xtype: 'fieldset',
                                        title: 'Fecha',
                                        layout: 'vbox',
                                        items: [
                                            {
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
                                                        width: 150
                                                    }, {
                                                        fieldLabel: 'Hora',
                                                        xtype: 'timefield',
                                                        itemId: 'horadesde',
                                                        format: 'H:i',
                                                        altFormats: 'H:i',
                                                        value: '00:00',
                                                        increment: 10,
                                                        labelWidth: 40,
                                                        width: 130,
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
                                                        width: 150
                                                    }, {
                                                        fieldLabel: 'Hora',
                                                        xtype: 'timefield',
                                                        itemId: 'horahasta',
                                                        format: 'H:i',
                                                        altFormats: 'H:i',
                                                        increment: 10,
                                                        labelWidth: 40,
                                                        width: 130,
                                                        margin: '0 0 0 7'
                                                    }
                                                ]
                                            }
                                        ]
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'combooperador',
                                        fieldLabel: 'Operador',
                                        displayField: 'ope_cnombre',
                                        valueField: 'ope_iid',
                                        queryMode: 'local',
                                        width: '100%'
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
                }, {
                    xtype: 'button',
                    text: 'todos',
                    iconCls: 'icon-find',
                    action: 'removeFilter'
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