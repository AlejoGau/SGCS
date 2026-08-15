Ext.define('Common.view.SVRouteAnalysisPointsGridView', {
    extend : 'Ext.grid.Panel',
    alias  : 'widget.svrouteanalysispointsgridview',
    requires: [
        'Common.view.SVRouteAnalysisPointWindow'
    ],
    border : false,
    cls    : 'svroutes-analysis-grid',

    viewConfig: {
        emptyText: 'Sin configuraciones de camaras',
        deferEmptyText: false,
        stripeRows: true
    },

    columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            align: 'center',
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex) {
                    var view = grid.up('svrouteanalysispointsgridview');
                    var record = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit', record, grid);
                }
            }]
        },
        {
            xtype: 'gridcolumn',
            text: 'Nombre',
            dataIndex: 'sra_cReference',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            text: 'Tipo de camara',
            dataIndex: 'sra_cCameraType',
            width: 200
        }
    ],

    initComponent: function() {
        var me = this;
        var comboSearch = [
            ['sra_cReference', getLocale('Nombre')],
            ['sra_cCameraType', 'Tipo de camara']
        ];

        me.callParent(arguments);

        me.onSelectChange = function(selModel, selections) {
            var deleteButton = me.down('[action="delete"]');
            if (deleteButton) {
                deleteButton.setDisabled(selections.length === 0);
            }
        };

        me.getSelectionModel().on('selectionchange', me.onSelectChange, me);

        me.addDocked({
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true
        });

        me.addDocked({
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: me,
                    action: 'add',
                    itemId: 'add'
                },
                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    disabled: true,
                    scope: me,
                    itemId: 'delete'
                },
                '-',
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [
                                {
                                    xtype: 'combo',
                                    queryMode: 'local',
                                    itemId: 'fieldName',
                                    store: comboSearch,
                                    displayField: 1,
                                    valueField: 0,
                                    fieldLabel: 'Campo'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'query',
                                    fieldLabel: 'Valor'
                                }
                            ]
                        }]
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
                }
            ]
        });
    },

    setRecord: function(record) {
        this.record = record;
        this.routeRecord = record;
        var routeId = this.resolveRouteId(record);
        var cuentaId = this.resolveCuentaId(record) || this.cuentaId || null;
        this.routeId = routeId;
        this.cuentaId = cuentaId;
        this.baseFilters = routeId ? [{
            property: 'sra_iRouteId',
            value: routeId
        }] : [];
        this.filters = Ext.clone(this.baseFilters || []);
        this.fireEvent('recordchange', this, record);
    },

    resolveRouteId: function(record) {
        if (!record) {
            return null;
        }
        if (Ext.isFunction(record.get)) {
            return record.get('svr_iid') || record.get('sra_iRouteId') || null;
        }
        return record.svr_iid || record.sra_iRouteId || null;
    },

    resolveCuentaId: function(record) {
        if (!record) {
            return null;
        }

        if (Ext.isFunction(record.get)) {
            return record.get('svr_iCuentaId') || record.get('cue_iid') || record.get('CuentaId') || null;
        }

        return record.svr_iCuentaId || record.cue_iid || record.CuentaId || null;
    },

    listeners: {
        afterrender: function(view) {
            if (view.record) {
                view.setRecord(view.record);
            }
        }
    }
});
