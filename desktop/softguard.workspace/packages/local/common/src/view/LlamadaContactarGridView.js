//MIGRADO2024
Ext.define( 'Common.view.LlamadaContactarGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.llamadacontactargridview',
    title: 'Llamadas contactar',
    ignoreDirty: true,
    autoHeight: true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns: [
        {
            xtype: 'actioncolumn',
            width: 55,
            items: [ {
                iconCls: 'icon-telephone-go',
                tooltip: 'Llamar',
                handler: function( grid, rowIndex, colIndex, item, event ) {
                    var view = grid.up( 'llamadacontactargridview' );
                    var rec = grid.getStore().getAt( rowIndex );
                    view.up( 'llamadahelperview' ).fireEvent( 'llamar', view.caller, rec )
                }
            }, {
                    iconCls: 'icon-smartpanic',
                    tooltip: getLocale( 'Smartpanics' ),
                    getClass: function( value, metadata, record, a, b, c, view ) {
                        if( record.get( 'tel_nsp' ) == 0 || record.get( 'tel_nsp' ) == 2 ) {
                            this.items[ 1 ].tooltip = getLocale( 'Usuario' );
                            return 'icon-user';
                        } else {
                            this.items[ 1 ].tooltip = getLocale( 'Smartpanics' );
                            return 'icon-smartpanic';
                        }
                    }
                }
            ]
        },
        {
            xtype: 'gridcolumn',
            header: '#',
            sortable: false,
            dataIndex: 'tel_norden',
            width: 18
        },
        {
            xtype: 'gridcolumn',
            header: 'Nombre',
            sortable: false,
            dataIndex: 'tel_cnombre',
            flex: 1,
            renderer: function( value, object, record ) {
                if( record.get( '_usado' ) == 'true' ) {
                    object.style = "background-color:#42983D;";
                }
                return value;
            }
        },
        {
            xtype: 'gridcolumn',
            header: 'Pre',
            sortable: false,
            dataIndex: 'tel_cpredigito',
            width: 70
        }, {
            xtype: 'gridcolumn',
            header: 'Telefono',
            sortable: false,
            dataIndex: 'tel_ctelefono',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Post',
            sortable: false,
            dataIndex: 'tel_cpostdigito',
            width: 70
        }, {
            xtype: 'gridcolumn',
            header: 'Observacion',
            sortable: false,
            dataIndex: 'tel_cobservacion',
            flex: 1
        }
    ],
    initComponent: function() {
        this.callParent( arguments );
    } // cierro init
});