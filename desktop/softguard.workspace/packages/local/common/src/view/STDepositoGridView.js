//MIGRADO2024
Ext.define( 'Common.view.STDepositoGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: [ 'widget.stdepositoview' ],
    title: 'Templates',
    autoHeight: true,
    // selModel: Ext.create('Ext.selection.CheckboxModel'),
    //plugins: [ { ptype: '//pagingselectpersist' }],
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            items: [ {
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function( grid, rowIndex, colIndex, item, event ) {
                    var view = grid.up( 'stdepositoview' );
                    var rec = grid.getStore().getAt( rowIndex );
                    view.fireEvent( 'objectedit', rec, grid );
                }
            }]
        }, {
            xtype: 'gridcolumn',
            header: 'Nombre',
            dataIndex: 'Name',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Organizacion',
            dataIndex: 'organizationName',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Estado',
            dataIndex: '_tsd_estado',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Tipo',
            dataIndex: '',
            flex: 1,
            renderer: function( value, obk, record ) {
                if( record.get( 'tsd_idtecnico' ) != 0 ) {
                    return getLocale( 'Tecnico/Instlador' )
                } else if( record.get( 'tsd_idorganizacion' ) != 0 ) {
                    return getLocale( 'Deposito' )
                } else {
                    return getLocale( 'No definido' )
                }
            },
        }
    ],
    onSelectChange: function(selModel, selections) {
        this.down('[action="delete"]').setDisabled(selections.length == 0);
    },
    initComponent: function() {
        var comboSearch = [
            [ 'o.[Name]', getLocale( 'Nombre deposito' ) ],
            [ 'org.[Name]', getLocale( 'Nombre organizacion' ) ]
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
                    action: 'delete',
                    disabled: true,
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
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo',
                                        store: [
                                            [ 'todos', getLocale( 'Todos' ) ],
                                            [ 'tecnico', getLocale( 'Tecnico/Instalador' ) ],
                                            [ 'deposito', getLocale( 'Deposito' ) ]
                                        ],
                                        itemId: 'tipo',
                                        anchor: '100%',
                                        queryMode: 'local',
                                        allowBlank: false,
                                        valued: 'todos'
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