Ext.define('SgAppWebReport.view.CantidadEventosPorDiaView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cantidadeventospordiaview',
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
        this.callParent(arguments);

        var toolbar = Ext.create("Ext.toolbar.Toolbar", {
            items: [
                {
                    text: "Imprimir",
                    iconCls: "icon-printer",
                    itemId: 'btnprint',
                    action: 'btnprint',
                    /*handler: function() {
                        var panel = this.up('panel'); // Obtiene el panel principal
                        var printWindow = window.open('', '', 'height=600,width=800');
                        printWindow.document.write('<html><head><title>Print</title>');
                        printWindow.document.write('</head><body >');
                        printWindow.document.write(panel.getEl().dom.innerHTML);
                        printWindow.document.write('</body></html>');
                        printWindow.document.close();
                        printWindow.print();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 500,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        itemId: 'fechas',
                                        title: 'Fechas',
                                        layout: 'vbox',
                                        items: [
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Tabla Histórico',
                                                displayField: '_periodo',
                                                queryMode: 'local',
                                                valueField: 'c_periodo',
                                                width: 400,
                                                itemId: 'combohistorico',
                                                name: 'tablahistorico',
                                                //plugins: ['clearbutton']
                                            },
                                            {
                                                xtype: 'datefield',
                                                name: 'fechaDesde',
                                                itemId: 'fechaDesde',
                                                value: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                                                fieldLabel: 'Fecha Desde',
                                                bindToModel: false,
                                                width: 230,
                                                //plugins: ['clearbutton'],
                                                validator: function (value) {
                                                    if (value != '') {
                                                        return true
                                                    }
                                                    return 'Este campo es obligatorio'
                                                },
                                                action: "search"
                                            },
                                            {
                                                xtype: 'datefield',
                                                name: 'fechaHasta',
                                                itemId: 'fechaHasta',
                                                value: new Date(),
                                                fieldLabel: 'Fecha Hasta',
                                                bindToModel: false,
                                                width: 230,
                                                //plugins: ['clearbutton'],
                                                validator: function (value) {
                                                    if (value != '') {
                                                        return true
                                                    }
                                                    return 'Este campo es obligatorio'
                                                },
                                                action: "search"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: "button",
                    text: "Buscar",
                    itemId: "buscar",
                    iconCls: "icon-find",
                    action: "search",
                },
                "->",
            ], // cierro items
        });

        this.addDocked(toolbar);
    }
});