Ext.define('SgAppWebReport.view.ReportePromedioAtencionEventoByPrioridadView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportepromedioAtencionEventobyprioridadview',

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
                        console.log("Impritmi promedioF")
                        var iframe = button.up('reportepromedioAtencionEventobyprioridadview').down('#Iframe');
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
                                    }, {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha Desde',
                                        name: "fechadesde",
                                        itemId: 'fechadesde',
                                        width: 330,
                                        bindToModel: false,
                                        name: 'fechadesde'
                                    }, {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha Hasta',
                                        name: 'fechahasta',
                                        itemId: 'fechahasta',
                                        width: 330,
                                        bindToModel: false,
                                        name: 'fechahasta'
                                    },
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