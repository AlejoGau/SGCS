Ext.define('SgAppWebReport.view.ReporteTgVehicularView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportetgvehicularview',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    activeHelp: true,

    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'component',
            flex: 1,
            html:
                '<div style="font-size:13px;color:#555;padding:10px;">' +
                'Use el botón <b>Exportar</b> para descargar el reporte una vez seleccionado el filtro' +
                '</div>'
        }];

        me.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text: 'Filtros',
                itemId: 'btnfiltros',
                menu: {
                    xtype: 'menu',
                    width: 260,
                    items: [{
                        xtype: 'panel',
                        border: 0,
                        bodyPadding: 5,
                        items: [{
                            xtype: 'fieldset',
                            padding: 0,
                            border: 0,
                            layout: 'anchor',
                            defaults: {
                                labelWidth: 95,
                                anchor: '100%'
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Dealer',
                                itemId: 'dealer',
                                maxLength: 3
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Cuenta desde',
                                itemId: 'cuentaDesde'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Cuenta hasta',
                                itemId: 'cuentaHasta'
                            }]
                        }]
                    }]
                }
            }, {
                xtype: 'button',
                itemId: 'buscar',
                text: 'Buscar',
                iconCls: 'icon-find'
            }, '->', {
                xtype: 'button',
                itemId: 'exportar',
                text: 'Exportar',
                iconCls: 'icon-page-excel'
            }]
        }];

        me.callParent(arguments);
    }
});
