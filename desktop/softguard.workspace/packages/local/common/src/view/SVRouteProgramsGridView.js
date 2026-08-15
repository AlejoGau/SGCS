
Ext.define('Common.view.SVRouteProgramsGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.svrouteprogramsgridview',
    requires: [
        'Common.view.SVRouteProgramWindow'
    ],
    border: false,
    cls: 'svroutes-programs-grid',

    viewConfig: {
        emptyText: 'Sin programaciones SofIA',
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
                    var view = grid.up('svrouteprogramsgridview');
                    var record = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit', record, grid);
                }
            }]
        },
        {
            xtype: 'gridcolumn',
            text: 'Resumen',
            dataIndex: 'Summary',
            flex: 1
        }
    ],

    initComponent: function() {
        var me = this;
        me.callParent(arguments);

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
                }
            ]
        });

        me.getSelectionModel().on('selectionchange', function(selModel, selections) {
            var deleteButton = me.down('[action="delete"]');
            if (deleteButton) {
                deleteButton.setDisabled(selections.length === 0);
            }
        });
    },

    setRecord: function(record) {
        this.record = record;
        this.routeRecord = record;
        var routeId = this.resolveRouteId(record);
        this.routeId = routeId;
        this.baseFilters = routeId ? [{
            property: 'srp_iRouteId',
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
            return record.get('svr_iid') || record.get('srp_iRouteId') || null;
        }
        return record.svr_iid || record.srp_iRouteId || null;
    },

    listeners: {
        afterrender: function(view) {
            if (view.record) {
                view.setRecord(view.record);
            }
        }
    }
});
