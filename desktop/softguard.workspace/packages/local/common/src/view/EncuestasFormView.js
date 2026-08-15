//MIGRADO2024
Ext.define( 'Common.view.EncuestasFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.encuestasformview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true,
        anchor: '100%',
    },
    items: [
        {
            fieldLabel: 'Nombre',
            name: 'enc_name',
            xtype: 'textfield'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Descripcion',
            name: 'enc_descripcion'
        }, {
            xtype: 'combo',
            fieldLabel: 'Estado',
            name: 'enc_status',
            store: [
                [ 0, getLocale( 'Deshabilitado' ) ],
                [ 1, getLocale( 'Habilitado' ) ]
            ],
            queryMode: 'local'
        }, {
            xtype: 'panel',
            title: 'Preguntas',
            itemId: 'preguntas',
            hidden: true,
            items: [ {
                xtype: 'grid',
                itemId: 'preguntasgrid',
                columns: [ {
                    xtype: 'actioncolumn',
                    header: '',
                    width: 40,
                    items: [
                        {
                            iconCls: 'icon-delete',
                            tooltip: getLocale( 'Eliminar' ),
                            handler: function( grid, rowIndex, colIndex, item, event ) {
                                Ext.MessageBox.confirm( getLocale( 'Delete' ), getLocale( 'Esta a punto de borrar una pregunta, esta seguro ?' ), function( btn ) {
                                    if( btn === 'yes' ) {
                                        var view = grid.up( 'encuestasformview' );
                                        var rec = grid.getStore().getAt( rowIndex );
                                        view.fireEvent( 'deletePregunta', rec, view );
                                    }
                                    else {
                                        //some code
                                    }
                                });
                            }
                        }
                    ]
                }, {
                        xtype: 'gridcolumn',
                        header: 'Pregunta',
                        dataIndex: 'epg_name',
                        flex: 1
                    }, {
                        xtype: 'gridcolumn',
                        header: 'Tipo',
                        dataIndex: '_epg_tipo',
                        flex: 1
                    }, {
                        xtype: 'gridcolumn',
                        header: 'Estado',
                        dataIndex: 'epg_status',
                        flex: 1,
                        renderer: function( value, obj, record ) {
                            return record.get( '_epg_status' )
                        }
                    }
                ]
            }]
        }
    ],
    initComponent: function() {
        this.callParent();
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'addPregunta'
                }
            ]// cierro items
        });
        this.down( '#preguntasgrid' ).addDocked( toolbar );
    } // cierro init
});