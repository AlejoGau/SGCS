//MIGRADO2024
Ext.define( 'Common.view.SPSeguimientoGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: [ 'widget.spseguimientogridview' ],
    title: 'SmartPanic',
    autoHeight: true,
    viewConfig: {
       
    },
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: [
                '<input class="grpCheckbox" type="checkbox">{children:this.getHeader} ({rows.length})</input>',
                {
                    getHeader: function( c ) {
                        return c[ 0 ].get( 'cue_clinea' ) + '-' + c[ 0 ].get( 'cue_ncuenta' ) + c[ 0 ].get( 'cue_cnombre' );
                    }
                }
            ],
            groupByText: getLocale( 'Agrupar' ),
            id: 'grouping',
            showGroupsText: getLocale( 'Mostrar en grupos' )
        }
    ],
    columns: [ {
        xtype: 'actioncolumn',
        //header : 'Acciones',
        width: 20,
        items: [ {
            iconCls: 'icon-map',
            tooltip: getLocale( 'Seguimiento' ),
            itemId: 'icoseguimiento',
            handler: function( grid, rowIndex, colIndex, item, event ) {
                var rec = grid.getStore().getAt( rowIndex );
                if( rec.get( 'CuentaId' ) != '' ) {
                    var view = grid.up( 'spseguimientogridview' );
                    view.fireEvent( 'mostrarSeguimiento', rec, view );
                } else {
                    notify( 'El dispositivo no tiene cuenta asociada' );
                }
            }
        }]
    }, {
            xtype: 'gridcolumn',
            header: 'Cuenta',
            dataIndex: 'cue_ncuenta',
            renderer: function( value, p, r ) {
                var linea = r.data[ 'cue_clinea' ];
                var ncuenta = r.data[ 'cue_ncuenta' ];
                if( linea != '' && ncuenta != 0 ) {
                    return r.data[ 'cue_clinea' ] + "-" + Ext.String.leftPad( r.data[ 'cue_ncuenta' ], 4, '0' );
                } else {
                    return '';
                }
            },
            width: 80
        }, {
            xtype: 'gridcolumn',
            header: 'Nombre de cuenta',
            dataIndex: 'cue_cnombre',
            width: 200
        }, {
            xtype: 'gridcolumn',
            header: 'Usuario',
            dataIndex: 'Nombre',
            width: 150,
            sortable: true
        }, {
            xtype: 'gridcolumn',
            header: 'Telefono',
            dataIndex: 'Telefono',
            width: 80
        }, {
            xtype: 'datecolumn',
            header: 'Último evento',
            dataIndex: 'sp_tfechahora',
            format: 'd/m/Y G:i:s',
            width: 120
        }, {
            xtype: 'gridcolumn',
            header: 'Id',
            dataIndex: 'Id',
            hidden: true
        }, {
            xtype: 'gridcolumn',
            header: 'Modelo',
            dataIndex: 'Modelo',
            sortable: true
        }, {
            xtype: 'gridcolumn',
            header: 'Marca',
            dataIndex: 'Marca',
            sortable: true
        }, {
            xtype: 'gridcolumn',
            header: 'Version',
            dataIndex: 'Version',
            sortable: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            header: 'Tipo',
            dataIndex: 'Tipo'
        }, {
            xtype: 'gridcolumn',
            header: 'Imei',
            dataIndex: 'Imei',
            flex: 1,
            sortable: true
        }, {
            xtype: 'datecolumn',
            header: 'Ultima posicion',
            dataIndex: 'gps_tfechahora',
            flex: 1,
            sortable: true,
            format: 'd/m/Y H:i:s'
        }
    ],
    initComponent: function() {
        this.callParent( arguments );
     
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked( pagingtoolbar );
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    xtype: 'combo',
                    hideOnClick: false,
                    store: [
                        [ 'telefono', getLocale( 'Telefono' ) ],
                        [ 'nombre', getLocale( 'Nombre de cuenta' ) ],
                        [ 'usuario', getLocale( 'Usuario' ) ],
                        [ 'cuenta', getLocale( 'Cuenta' ) ],
                        [ 'imei', getLocale( 'Imei' ) ],
                        [ 'dealer', getLocale( 'Dealer' ) ]
                    ],
                    queryMode: 'local',
                    value: 'telefono',
                    itemId: 'queryType',
                    editable: false,
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                }, '-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    hidden: true,
                    scope: this,
                    action: 'getall'
                },
                {
                    iconCls: 'icon-application-view-list',
                    text: 'Agrupar',
                    enableToggle: true,
                    toggleGroup: 'group',
                    pressed: false,
                    action: 'groupCuenta'
                }
            ],// cierro items
        });
        this.addDocked( toolbar );
    }
});