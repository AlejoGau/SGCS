Ext.define( 'Administrator.view.WebDealerSecurityView', {
    extend: 'Ext.grid.Panel',
    title: 'Seguridad',
    alias: 'widget.WebDealerSecurity',
    selModel: Ext.create( 'Ext.selection.CheckboxModel' ),
    ignoreDirty: true,
    viewConfig: {
        markDirty: false
    },
    activeHelp: true,
    plugins: [
        Ext.create( 'Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        }) ],

    columns: [ {
        xtype: 'gridcolumn',
        sortable: false,
        dataIndex: 'iconCls',
        width: 25,
        renderer: function( value, metadata, record ) {
            if( value )
                return '<span style="position:absolute; width:16px;height:16px;" class="' + value + '" />';
        },
    },
        {
            xtype: 'gridcolumn',
            header: 'Función',
            sortable: false,
            renderer: function( value, metadata, record ) {
                return getLocale( value );
            },
            dataIndex: 'text',
            width: 150
        },
        {
            xtype: 'gridcolumn',
            header: 'Perfil',
            sortable: false,
            dataIndex: 'profile',

            renderer: function( value, metaData, record ) {
                switch( value ) {
                    case '0':
                        text = getLocale( 'Denegado' );
                        break;
                    case '1':
                        text = getLocale( 'Lectura' );
                        break;
                    case '2':
                        text = getLocale( 'Lectura y escritura' );
                        break;
                    case '3':
                        text = getLocale( 'Sin restricciones' );
                        break;
                }
                return text;

            },
            editor: {
                xtype: 'combobox',
                forceSelection: true,
                multiSelect: false,
                editable: false,
                store: [
                    [ '0', getLocale( 'Denegado' ) ],
                    [ '1', getLocale( 'Lectura' ) ],
                    [ '2', getLocale( 'Lectura y escritura' ) ],
                    [ '3', getLocale( 'Sin restricciones' ) ]
                ]
            },
            width: 200
        }
    ],

    initComponent: function() {

        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [

                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSecurity'
                }, '-',
                {
                    text: 'Permisos Especiales',
                    menu: {
                        items: [
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Cambiar numero de cuenta' ),
                                checked: false,
                                itemId: 'chkCambioNumero'
                            }, {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Crear Cuenta' ),
                                checked: false,
                                itemId: 'chkCreate'
                            },
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Copiar Cuenta' ),
                                checked: false,
                                itemId: 'chkCopy'
                            },
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Solicitar baja' ),
                                checked: false,
                                itemId: 'chkDelete'
                            },
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Reporte Multicuenta' ),
                                checked: false,
                                itemId: 'chkMulticuenta'
                            },
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Eventos Tiempo Real' ),
                                checked: false,
                                itemId: 'chkTiempoReal',
                                hidden: true /*se saco el dia 30/09/2016*/
                            },
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Ver claves' ),
                                checked: false,
                                itemId: 'chkClaves'
                            },
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Cambiar Dealer' ),
                                checked: false,
                                itemId: 'changeDealer'
                            },
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Exportar' ),
                                checked: false,
                                itemId: 'exportar'
                            },
                            {
                                xtype: 'menucheckitem',
                                text: getLocale( 'Victimarios' ),
                                checked: false,
                                itemId: 'chkVictimario'
                            }

                        ]
                    }
                }, '-', {
                    iconCls: 'x-tbar-loading',
                    text: 'Reset',
                    scope: this,
                    action: 'refreshModules'
                }, '-', {
                    xtype: 'combobox',
                    forceSelection: true,
                    multiSelect: false,
                    editable: false,
                    itemId: 'comboPerfil',
                    store: [
                        [ '0', getLocale( 'Denegado' ) ],
                        [ '1', getLocale( 'Lectura' ) ],
                        [ '2', getLocale( 'Lectura y Escritura' ) ],
                        [ '3', getLocale( 'Sin restricciones' ) ]
                    ]
                }, {
                    iconCls: 'icon-table-edit',
                    text: 'Aplicar perfil',
                    action: 'applyPerfil'
                }
            ]// cierro items
        });
        this.callParent( arguments );
        this.addDocked( toolbar );
    } // cierro init

});
