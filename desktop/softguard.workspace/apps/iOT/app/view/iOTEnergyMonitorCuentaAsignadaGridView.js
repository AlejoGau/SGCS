Ext.define('iOT.view.iOTEnergyMonitorCuentaAsignadaGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.iotenergymonitorcuentaasignadagridview',
    title: 'Medidores sin asignar',
    autoHeight: true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.setWidth(400);
                });
            }
        }
    },
    activeHelp: true,
    columns: [
        {
            xtype: 'gridcolumn',
            header: 'Cuenta',
            sortable: true,
            width: 250,
            flex: 1,
            minWidth: 100,
            dataIndex: 'cue_clinea',
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                return record.get('cue_clinea') + ' - ' + record.get('cue_ncuenta');
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Nombre',
            flex: 1, minWidth: 100,
            dataIndex: 'cue_cnombre'
        }, {
            xtype: 'gridcolumn',
            header: 'Dispositivo',
            flex: 1, minWidth: 100,
            dataIndex: 'ped_cName'
        }, {
            xtype: 'gridcolumn',
            header: 'Identificador',
            flex: 1, minWidth: 100,
            dataIndex: 'ped_cDeviceID'
        },
        {
            xtype: 'actioncolumn',
            width: 100,
            header: 'Tablero',
            items: [{
                iconCls: 'icon-medidor',
                tooltip: getLocale('Ver medidor'),
                handler: function (b, c, f, h, g) {
                    var i = b.up('iotenergymonitorcuentaasignadagridview');
                    var a = b.getStore().getAt(c);
                    var d = a.get('cue_clinea') + ' - ' + a.get('ped_idCta') + '  ' + a.get('ped_cName');
                    var e = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title: d,
                        translate: !1,
                        closeAction: 'hide',
                        border: !0,
                        modal: !1,
                        width: '85%',
                        height: 500,
                        rec: a,
                        items: [{
                            xtype: 'iotenergydevicesdashboardview',
                            rec: a
                        }]
                    });
                    e.show()
                }
            }, {
                iconCls: 'icon-link',
                tooltip: getLocale('Link a Tablero'),
                handler: function (c, d, g, i, h) {
                    var j = c.up('iotenergymonitorcuentaasignadagridview');
                    var e = c.getStore().getAt(d);
                    var f = e.get('Id');
                    var a = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title: 'Link medidor',
                        translate: !1,
                        closeAction: 'hide',
                        border: !0,
                        modal: !1,
                        width: 400,
                        height: 150,
                        items: [{
                            xtype: 'uxiframe',
                            itemId: 'Iframe'
                        }],
                        buttons: [{
                            text: 'Cerrar',
                            handler: function () {
                                a.close()
                            }
                        }]
                    });
                    var b = a.down('#Iframe');
                    if (b) {
                        b.src = '/handler/EnergyDevicesDashboardHandler?id=' + f + '&mostrar_url=1'
                    } else {
                        console.error('No se pudo encontrar el elemento DOM del iframe.')
                    }
                    a.show()
                }
            }]
        }

    ],
    initComponent: function () {
        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    xtype: 'datefield',
                    value: new Date(),
                    itemId: 'datedesde',
                    fieldLabel: 'Desde',
                    format: 'd/m/Y',
                    labelWidth: 35
                }, {
                    xtype: 'datefield',
                    value: new Date(),
                    itemId: 'datehasta',
                    format: 'd/m/Y',
                    fieldLabel: 'Hasta',
                    labelWidth: 35
                }, {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search',
                    itemId: 'search'
                }, {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'todos',
                    itemId: 'todos'
                }, {
                    iconCls: 'icon-link-break',
                    text: 'Descinvular Dispositivo',
                    scope: this,
                    action: 'desvincular',
                    itemId: 'desvincular'
                }

            ]
        });

        this.addDocked(toolbar);
    }
});
