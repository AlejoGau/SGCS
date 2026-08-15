Ext.define( 'AdministratorSearch.view.t_controlAcceso_puertaGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: [ 'widget.t_controlacceso_puertagridview' ],
    title: 'Templates',
    autoHeight: true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp: true,
    columns: [
        {
            xtype: 'gridcolumn',
            header: 'Nombre',
            dataIndex: 'cap_nombre',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Dealer',
            dataIndex: 'cue_clinea',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Cuenta',
            dataIndex: 'cue_ncuenta',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Nombre',
            dataIndex: 'cue_cnombre',
            flex: 1
        }
    ],

    initComponent: function() {

        var comboSearch = [
            [ 'cap_nombre', getLocale( 'Nombre' ) ]
        ];

        this.callParent( arguments );
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked( pagingtoolbar );

        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                }, "-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    itemId: 'btnEliminar',
                    action: 'delete',
                    //disabled: true,
                    scope: this
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
                                        store: comboSearch,
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

        this.addDocked( toolbar );
    }
});