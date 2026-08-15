//MIGRADO2024
Ext.define( 'Common.view.ResolucionFormView', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.resolucionformview',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [


        {
            xtype: 'textfield',
            fieldLabel: 'Imei',
            name: "cue_cIMEI",
            itemId: 'imei',
            validator: function( value ) {
                var t = this;
                if( !value ) {
                    t.clearInvalid();
                    t.textValid = true;
                    return t.textValid;
                }
                if( value != t.originalValue && value.length > 4 && value != '' ) {

                    var record = t.up( 'resolucionformview' ).record

                    var filters = [ {
                        property: 'cue_cIMEI',
                        value: value
                    }, {
                            property: 'cue_iid:NOT INT',
                            value: record.get( 'cue_iid' )
                        }];

                    var model = 'Common.model.CuentaSearchModel';

                    var storeSP = Ext.create( 'Ext.data.Store', {
                        model: model,
                        pageSize: 50,
                        remoteFilter: true,
                        filters: filters
                    })

                    storeSP.load( {
                        callback: function( records, operation, success ) {

                            if( records.length > 0 ) {

                                t.markInvalid( 'El Imei ya existe' );
                                t.textValid = false;
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                            }


                        }
                    })
                } else {
                    t.markInvalid( '' );
                    t.clearInvalid();
                    t.textValid = true;
                }
                return t.textValid;
            }
        },


        {
            xtype: 'textfield',
            fieldLabel: 'Id. Ext.',
            name: "cue_cIdExtendido",
            maxLength: 100,
            enforceMaxLength: true,
            itemId: 'idext'
        },
        {
            xtype: 'container',
            itemId: 'selectores',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            margin: '20 0 0 0',
            scrollable: true,
            items: [
                {
                    xtype: 'gridpanel',
                    itemId: 'gridtodos',
                    flex: 1,
                    autoScroll: true,
                    scroll: true,
                    title: 'Disponibles',
                    selType: 'checkboxmodel',
                    selModel: {
                        checkOnly: true,
                        mode: "MULTI"
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            header: 'Receptores',
                            dataIndex: 'iprs_ccnombre',
                            renderer: function( value, metaData, record ) {
                                return record.get( 'ipc_cdescripcion' ) + ' - ' + value;
                            },
                            //sorter: true,
                            flex: 1
                        }

                    ]
                }, {
                    xtype: 'container',
                    layout: 'vbox',
                    margin: '120 5 0 5',
                    itemId: 'botones',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Agregar',
                            iconCls: 'icon-add',
                            itemId: 'agregar',
                            margin: '0 0 5 0',
                            width: 120
                        }, {
                            xtype: 'button',
                            text: 'Quitar',
                            iconCls: 'icon-cancel',
                            itemId: 'quitar',
                            width: 120
                        }
                    ]
                }, {
                    xtype: 'gridpanel',
                    itemId: 'gridselecionados',
                    flex: 1,
                    autoScroll: true,
                    scroll: true,
                    title: 'Seleccionados',
                    selType: 'checkboxmodel',
                    selModel: {
                        checkOnly: true,
                        mode: "MULTI"
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            header: 'Receptores',
                            dataIndex: 'iprs_ccnombre',
                            renderer: function( value, metaData, record ) {
                                return record.get( 'ipc_cdescripcion' ) + ' - ' + value;
                            },
                            //sorter: true,
                            flex: 1
                        }

                    ],
                    flex: 1
                }
            ]
        }
    ],

    initComponent: function() {
        this.callParent();


        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Guardar',
                    iconCls: 'save',
                    itemId: 'save',
                    action: 'save'
                }

            ]
        });
        this.addDocked( toolbar );


        var toolbarTodos = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: '',
                    itemId: 'query',
                    flex: 1

                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    itemId: 'buscar'
                }, {
                    xtype: 'button',
                    text: 'Todos',
                    itemId: 'todos'
                }
            ]// cierro items
        });

        this.down( '#gridtodos' ).addDocked( toolbarTodos );
    }
});