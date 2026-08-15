Ext.define( 'AdministratorSearch.view.TablasFormaDePagoGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: [ 'widget.tablasformadepagogridview' ],
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
            xtype: 'actioncolumn',
            width: 30,
            items: [ {
                iconCls: 'icon-table-edit',
                tooltip: getLocale( 'Editar' ),
                handler: function( grid, rowIndex, colIndex, item, event ) {
                    var view = grid.up( 'tablasformadepagogridview' );
                    var rec = grid.getStore().getAt( rowIndex );
                    view.fireEvent( 'objectedit', rec, view );
                }
            }]
        }/*,{
            xtype : 'gridcolumn',            
            header : 'Codigo',
            dataIndex : 'fpg_ccodigo',
            flex:1
        },*/, {
            xtype: 'gridcolumn',
            header: 'Descripcion',
            dataIndex: 'fpg_cdescripcion',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Tipo',
            dataIndex: 'tfp_cdescripcion',
            renderer: function(v){
                return getLocale(v);
            },
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Empresa Facturadora',
            dataIndex: 'org_cnombre',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Cuenta',
            dataIndex: '_mgmc_descripcion',
            flex: 1
        }
    ],

    initComponent: function() {
        this.callParent( arguments );
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked( pagingtoolbar );

        this.onSelectChange = function( selModel, selections ) {
            this.down( '[action="delete"]' ).setDisabled( selections.length == 0 );
        };

        this.getSelectionModel().on( 'selectionchange', this.onSelectChange, this );
        var comboSearch = [
            [ 'fpg_ccodigo', getLocale( 'Codigo' ) ],
            [ 'fpg_cdescripcion', getLocale( 'Descripcion' ) ],
            [ 'fpg_cdescripcionreducida', getLocale( 'Descripcion reducida' ) ]
        ];

        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-money-add',
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
                                        value: 'fpg_ccodigo',
                                        fieldLabel: 'Campo'


                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'query',
                                        fieldLabel: 'Valor'

                                    }, {
                                        xtype: 'button',
                                        iconCls: 'icon-find',
                                        text: 'Buscar',
                                        scope: this,
                                        action: 'search'
                                    }
                                ]
                            }
                        ]
                    }

                }, '-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }, '-',
                {
                    xtype: 'displayfield',
                    text: 'Filtros',
                    scope: this,
                    itemId: 'filtros'
                }
            ]// cierro items
        });

        this.addDocked( toolbar );
    }
});