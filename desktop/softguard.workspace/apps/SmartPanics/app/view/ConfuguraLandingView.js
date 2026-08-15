Ext.define('SmartPanics.view.ConfuguraLandingView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.ConfuguraLandingView',
    title: 'con',
    autoHeight: true,
    stateful: false,
    columns: [{
        xtype: 'gridcolumn',
        header: 'Id',
        dataIndex: 'lcfg_iid',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        header: 'Nombre',
        dataIndex: 'nombreForm',
        flex: 1
    }],

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
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                }, "-", {
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
                                        store: [
                                            ['enc_descripcion', getLocale('Descripcion')],
                                            ['enc_name', getLocale('Nombre')]
                                        ],
                                        fieldLabel: 'Campo'
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'query',
                                        fieldLabel: 'Valor'
                                    }
                                ]
                            }
                        ]
                    }
                }, {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                }, '-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
        });
        this.addDocked(toolbar);
    }

});