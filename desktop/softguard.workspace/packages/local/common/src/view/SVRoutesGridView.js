Ext.define('Common.view.SVRoutesGridView', {
    extend : 'Ext.grid.Panel',
    alias  : 'widget.svroutesgridview',
    border : false,
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
            align: 'center',
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex) {
                    var view = grid.up('svroutesgridview');
                    var record = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit', record, grid);
                }
            }]
        },
        {
            xtype: 'gridcolumn',
            text: 'Nombre',
            dataIndex: 'svr_cName',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            text: 'Descripcion',
            dataIndex: 'svr_cDescripcion',
            flex: 1
        },
        {
            xtype: 'datecolumn',
            hidden: true,
            text: 'Fecha inicio',
            dataIndex: 'svr_dDateStart',
            format: 'd/m/Y',
            width: 130
        },
        {
            xtype: 'gridcolumn',
            text: 'Tipo de ruta',
            hidden: true,
            dataIndex: 'svr_cRouteType',
            width: 140
        }
    ],

    initComponent: function() {
        var me = this;
        var comboSearch = [
            ['svr_cName', getLocale('Nombre')]
        ];

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
                    iconCls: 'x-tbar-loading',
                    text: 'Regenerar',
                    action: 'rebuild',
                    scope: me,
                    itemId: 'rebuild'
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
        this.cuentaRecord = record;
        var cuentaId = this.resolveCuentaId(record) || this.cuentaId || this.resolveCuentaId(this.caller ? this.caller.record : null);
        this.cuentaId = cuentaId;
        this.baseFilters = cuentaId ? [{
            property: 'svr_iCuentaId',
            value: cuentaId
        }] : [];
        this.filters = Ext.clone(this.baseFilters || []);
        this.fireEvent('recordchange', this, record);
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




