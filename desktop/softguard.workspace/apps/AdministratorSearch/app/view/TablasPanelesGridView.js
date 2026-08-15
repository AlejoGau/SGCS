Ext.define( 'AdministratorSearch.view.TablasPanelesGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: [ 'widget.tablaspanelesgridview', 'widget.tablaspanelessearchview' ],
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
            items: [ {
                iconCls: 'icon-table-edit',
                tooltip: getLocale( 'Editar' ),
                handler: function( grid, rowIndex, colIndex, item, event ) {
                    var view = grid.up( 'tablaspanelesgridview' );
                    var rec = grid.getStore().getAt( rowIndex );
                    view.fireEvent( 'objectedit', rec, grid );
                }
            }]
        }, {
            xtype: 'gridcolumn',
            header: 'Codigo',
            dataIndex: 'pan_ccodigo',
            width: 50
        }, {
            xtype: 'gridcolumn',
            header: 'Descripcion',
            dataIndex: 'pan_cdescripcion',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'GPRS',
            dataIndex: 'pan_nesgprs',
            flex: 1,
            renderer: function( v ) {
                /*if(v != 1) {
                    return getLocale('No');
                } else {
                    return getLocale('Si');    
                }*/
                /**
                 *         {Name: getLocale('Seleccione'),    Value: 0},
                            {Name: getLocale('Si'),    Value: 1},
                            {Name: getLocale('No'),    Value: 2},
                            {Name: getLocale('GPS'),    Value: 3}
                 * 
                 */
                if( v == 0 )
                    return getLocale( 'No' );
                if( v == 1 )
                    return getLocale( 'Si' );
                if( v == 2 )
                    return getLocale( 'No' );
                if( v == 3 )
                    return getLocale( 'GPS' );


            }
        }
        /**
         * BC 384713978 : Agregada columna de Marca-Modelo
         */
        , {
            xtype: 'gridcolumn',
            header: 'Marca - Modelo',
            dataIndex: 'Descripcion',
            flex: 1
        }
    ],

    initComponent: function() {
        var comboSearch = [
            [ 'pan_ccodigo', getLocale( 'Codigo' ) ],
            [ 'pan_cdescripcion', getLocale( 'Descripcion' ) ],
            [ 'pam_cMarca', getLocale( 'Marca' ) ],
            [ 'pam_cModelo', getLocale( 'Modelo' ) ]
        ];

        this.onSelectChange = function( selModel, selections ) {
            this.down( '[action="delete"]' ).setDisabled( selections.length == 0 );
        };

        //this.getSelectionModel().on( 'selectionchange', this.onSelectChange, this );


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