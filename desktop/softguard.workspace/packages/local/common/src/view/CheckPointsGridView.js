//MIGRADO2024
Ext.define('Common.view.CheckPointsGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.checkpointsgridview',
    title: 'Templates',
    autoHeight: true,

    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },

    columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function (grid, rowIndex, colIndex, item, event) {
                    var view = grid.up('checkpointsgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit', rec, grid);
                }
            }]
        },
        {
            xtype: 'actioncolumn',
            width: 30,
            items: [{
                //iconCls: 'icon-qrcode',
                tooltip: 'QR Code',
                handler: function (grid, rowIndex, colIndex, item, event) {
                    var view = grid.up('checkpointsgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    if (rec.get('chp_nTipo') !== 1) {
                        view.fireEvent('openqr', rec, grid);
                    }
                },
                getClass: function (value, metadata, record) {
                    var cls = 'x-hide-display';
                    switch (record.get('chp_nTipo')) {
                        case 0:
                            cls = 'icon-qrcode';
                            break;
                        case 1:
                            cls = 'icon-transmit-blue';
                            break;
                        case 2:
                            cls = 'icon-ipod-cast';
                            break;
                        case 3:
                            cls = 'icon-nfc';
                            break;
                        case 3:
                            cls = 'icon-tag-purple';
                            break;
                        default:
                            cls = 'x-hide-display';
                    }

                    return cls;
                }
            }]
        },
        {
            xtype: 'actioncolumn',
            header: 'Foto',
            width: 50,
            renderer: function (value, metadata, record) {
                if (record.get('zon_cimagen')) {
                    return '<img src="/gallery/' + record.get('zon_cimagen') + '" width="32" heigth="32" style="float:right" >';
                }
            },
            iconCls: 'icon-photo',
            tooltip: 'Ver imagen',
            handler: function (grid, rowIndex) {
                var view = grid.up('checkpointsgridview');
                var rec = grid.getStore().getAt(rowIndex);
                var photo = rec.get('zon_cimagen');
                var zona = rec.get('zon_cdescripcion');
                var model = Ext.ModelManager.getModel('SgAppMapGuardWeb' + '.model.SoftguardZonaModel');

                model.load(rec.get('zon_idKey'), {
                    callback: function (rzona) {
                        Ext.create('Ext.Window', {
                            title: 'Foto: ',
                            height: 252 + 32,
                            width: 360 + 10,
                            record: rzona,
                            closeAction: 'destroy',
                            border: false,
                            layout: 'fit',
                            modal: true,
                            items: Ext.widget('photopanel', {
                                field: 'zon_cimagen',
                                record: rzona,
                                profile: view.profile
                            })
                        }).show();
                    }
                });
            }
        },
        {
            xtype: 'gridcolumn',
            header: 'Nombre',
            dataIndex: 'zon_cdescripcion',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            header: 'Observacion',
            dataIndex: 'zon_mobservacion',
            flex: 1
        }
    ],

    initComponent: function () {
        var comboSearch = [
            ['chp_cReference', getLocale('Referencia')]
        ];

        var me = this;

        me.onSelectChange = function (selModel, selections) {
            var deleteButton = me.down('[action="delete"]');
            if (deleteButton) {
                deleteButton.setDisabled(selections.length === 0);
            }
        };

        me.callParent(arguments);

        var selectionModel = me.getSelectionModel();
        if (selectionModel) {
            selectionModel.on('selectionchange', me.onSelectChange, me);
        }

        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        me.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-flag-green',
                    text: 'Nuevo',
                    scope: me,
                    action: 'add',
                    itemId: 'add'
                },
                '-',
                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    itemId: 'delete',
                    disabled: true,
                    scope: me
                },
                '-',
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'combo',
                                        queryMode: 'local',
                                        itemId: 'fieldName',
                                        store: comboSearch,
                                        fieldLabel: 'Campo'
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'query',
                                        fieldLabel: 'Valor'
                                    }
                                ]
                            }
                        ]
                    }

                },
                {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: me,
                    action: 'search'
                },
                '-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: me,
                    action: 'getall'
                },
                '-',
                {
                    iconCls: 'icon-add',
                    text: 'Importar desde una cuenta',
                    action: 'copycheck',
                    itemId: 'copycheck'
                }
            ] // cierro items
        });

        me.addDocked(toolbar);
    }
});
