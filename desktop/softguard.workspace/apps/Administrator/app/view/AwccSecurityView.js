Ext.define( 'Administrator.view.AwccSecurityView', {
    // NUEVO SISTEMA
    extend: 'Ext.grid.Panel',
    title: 'Seguridad',
    alias: 'widget.AWCCSecurity',
    selType: 'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    ignoreDirty: true,
    viewConfig: {
        markDirty: false
    },
    plugins: [
        Ext.create( 'Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: function( e, editor ) {
                    editor.column.field.store.removeAll()
                    switch( editor.record.get( 'view' ) ) {
                        case 'griduser':
                        case 'gridphones':
                        case 'gridzone':
                        case 'medicalinfoview':
                        case 'notificacionespanelview':
                            editor.column.field.store.add( [
                                [ '0', getLocale( 'Denegado' ) ],
                                [ '1', getLocale( 'Lectura' ) ],
                                [ '4', getLocale( 'Solicitud de cambios' ) ],
                            ] )
                            break;
                        /*case 'multicuentaserviciotecnicoextdelaersearchgridview':
                            editor.column.field.store.add( [
                                [ '0', getLocale( 'Denegado' ) ],
                                [ '1', getLocale( 'Lectura' ) ]
                            ] )
                            break;*/
                        default:
                            editor.column.field.store.add( [
                                [ '0', getLocale( 'Denegado' ) ],
                                [ '1', getLocale( 'Lectura' ) ]
                            ] 
                        )
                    }
                    console.log( editor.column.field.store.data )
                }
            }
        })
    ],
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

            renderer: function( value ) {
                var text = '';
                switch( value ) {
                    case "0":
                        text = getLocale( 'Denegado' );
                        break;
                    case "1":
                        text = getLocale( 'Lectura' );
                        break;
                    case "2":
                        text = getLocale( 'Lectura y escritura' );
                        break;

                    case "3":
                        text = getLocale( 'Sin restricciones' );
                        break;
                    case "4":
                        text = getLocale( 'Solicitud de cambios' );
                        break;
                }
                return text;
            },
            listeners: {
                beforeedit: function( combo, opt ) {
                    console.log( arguments )
                }
            },
            editor: {
                xtype: 'combobox',
                forceSelection: true,
                multiSelect: false,
                editable: false,

                store: [
                    [ '0', getLocale( 'Denegado' ) ],
                    [ '1', getLocale( 'Lectura' ) ],
                    [ '4', getLocale( 'Solicitud de cambios' ) ],
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
                /*{
            		text : 'Permisos Especiales',
					menu: {
                        items: [

                            {
                                xtype: 'menucheckitem',
                                text  : getLocale('Copiar Cuenta'),
                                checked   : false,
                                itemId : 'chkCopy'
                            },
                            {
                                xtype: 'menucheckitem',
                                text  : getLocale('Solicitar baja'),
                                checked   : false,
                                itemId : 'chkDelete'
                            },
                            {
                                xtype: 'menucheckitem',
                                text  : getLocale('Reporte Multicuenta'),
                                checked   : false,
                                itemId : 'chkMulticuenta'
                            },
                            {
                                xtype: 'menucheckitem',
                                text  : getLocale('Ver claves'),
                                checked   : false,
                                itemId : 'chkClaves'
                            },
                            {
                                xtype: 'menucheckitem',
                                text  : getLocale('Cambiar Dealer'),
                                checked   : false,
                                itemId : 'changeDealer'
                            }
                        ]
            	    }
				},'-',*/{
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
                        [ '1', getLocale( 'Lectura' ) ]
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