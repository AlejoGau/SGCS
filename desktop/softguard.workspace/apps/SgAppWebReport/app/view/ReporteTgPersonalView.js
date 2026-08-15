Ext.define('SgAppWebReport.view.ReporteTgPersonalView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportetgpersonalview',
    layout: 'fit',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    activeHelp: true,

    initComponent: function () {
        var me = this;
        me.callParent(arguments);
      

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [ {
                text: 'Filtros',
                itemId: 'btnfiltros',
                menu: {
                    xtype: 'menu',
                    width: 250,
                    items: [{
                        xtype: 'panel',
                        bodyPadding: 5,
                        border: 0,
                        items: [{
                            xtype: 'fieldset',
                            padding: 0,
                            border: 0,
                            layout: 'anchor',
                            defaults: {
                                labelWidth: 95,
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Dealer',
                                    itemId: 'dealer',
                                    name: 'dealer',
                                    enforceMaxLength: true,
                                    maxLength: 3
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Cuenta desde',
                                    itemId: 'cuentaDesde',
                                    name: 'cuentaDesde',
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Cuenta hasta',
                                    itemId: 'cuentaHasta',
                                    name: 'cuentaHasta',
                                }
                            ]
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
        });
        me.addDocked(toolbar);
          me.add({
            xtype: 'component',
            html: '<div font-size:13px;color:#555;">' +
                    'Use el botón <b>Exportar</b> para descargar el reporte una vez seleccionado el filtro' +
                  '</div>'
                });
        // Opcional: un texto simple en el body para que no quede “vacío”
    }
});
