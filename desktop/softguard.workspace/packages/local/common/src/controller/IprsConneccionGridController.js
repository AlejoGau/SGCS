//MIGRADO2024
Ext.define( 'Common.controller.IprsConneccionGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'IprServiciosSearchModel', 'TablasIpConModel', 'IprsConeccionSearchModel', 't_iprsconeccionesModel' ],
views: [ 'IprsConeccionGridView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'iprsconecciongridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                refresh: this.onRefresh,
                deleteconexion: this.onDelete
            },
            'iprsconecciongridview button[action=search]': {
                click: this.onSearchClick
            },
            'iprsconecciongridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'iprsconecciongridview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'iprsconecciongridview button[action="create"]': {
                click: this.onCreateClick
            },
            'iprsconecciongridview button[action="createConexion"]': {
                click: this.onCreateConexionClick
            },
            'iprsconecciongridview #newConnectionSms': {
                click: this.onCreateConexionSMSClick
            },
            'iprsconecciongridview #cambiarservicio': {
                click: this.onCambioServicioClick
            },
            'iprsconecciongridview button[action=searchIPRS]': {
                click: this.onSearchIPRSClick
            },
            'iprsconecciongridview button[action=getAllIPRS]': {
                click: this.onGetAllIPRSClick
            }
        });
},
    
    
onCambioServicioClick: function(button ) {
    var view = button.up( 'iprsconecciongridview' );
    var controller = this;
    var seleccion = view.getSelectionModel().getSelection();
    if( seleccion.length <= 0 ) {
        notify( 'Debe seleccionar al menos 1 servicio' )
        return false;
    }
    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        title: getLocale( 'Cambio de conexion' ),
        translate: false,
        width: 400,
        height: 200,
        border: false,
        items: [
            {
                xtype: 'combo',
                fieldLabel: 'Servicios disponibles',
                displayField: 'iprs_ccnombre',
                itemId: 'servicios',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'Id',
                margin: '20 0 0 0',
                labelWidth: 150
            }, {
                xtype: 'component',
                html: getLocale( '<b>Información</b>:<br/><br/>Será necesario reiniciar el servicio seleccionado para dejar la conexión activa.' ),
                margin: '20 0 20 0',
                flex: 1
            }
        ],
        bbar: [ '->',
            {
                xtype: 'button',
                text: 'Cambiar',
                listeners: {
                    click: function( btn ) {
                        var win = this.up( 'window' );
                        var mask = Ext.create( 'Ext.LoadMask', view, {
                            msg: getLocale( 'Pasando la conexion' )
                        }).show();
                        var servicioSeleccionado = win.down( '#servicios' ).getValue()
                        /* Ext.Array.each(seleccion, function (record,k) {
                            
                          var rec = controller.getT_iprsconeccionesModelModel().load(record.get('Id'),{callback:function (recordLoader) {
                                recordLoader.set('iprsc_iprsiid',servicioSeleccionado)
                                recordLoader.save({callback:function () {
                                    
                                    if((seleccion.length-1)<=k) {
                                        view.getStore().load()
                                        win.close()
                                        mask.hide()
                                    }                                    
                                    
                                }})
                            }})
                            
                            
                            
                            
                                
                        })*/
                        var conexiones = []
                        seleccion.map( function( item ) {
                            conexiones.push( item.get( 'Id' ) )
                        })
                        Ext.Ajax.request( {
                            url: '/rest/search/IPRSCambioServicio',
                            scope: this,
                            method: 'GET',
                            params: {
                                servicioDestino: servicioSeleccionado,
                                conexiones: conexiones.join( ',' )
                            },
                            success: function( resp, operation ) {
                                view.getStore().load()
                                win.close()
                                mask.hide()
                            }
                        });
                    }
                }
            }
        ]
    });
    win.show();
    var serviciosStore = Ext.create( 'Ext.data.Store', {
        model: this.getIprServiciosSearchModelModel(),
        pageSize: 500,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: 'iprs_idKey:NOTININT',
            value: view.record.get( 'Id' )
        }]
    })
    win.down( '#servicios' ).bindStore( serviciosStore );
    serviciosStore.load()
},
    
onDelete: function (record, view ) {
    var controller = this;
    Ext.MessageBox.confirm( 'Confirmar', 'Está seguro que desea borrar?', function( btn ) {
        if( btn == "yes" ) {
            controller.getT_iprsconeccionesModelModel().load( record.get( 'Id' ), {
                callback: function( record ) {
record.destroy({callback:function () {
                        view.getStore().load()
                    }
                })                    
                }})
            }
        });
    },
    
onRefresh: function (view, record ) {
    view.getStore().load( )
},
initView: function(view ) {
    if( !view.filters ) {
        view.filters = [];
    }
    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getIprsConeccionSearchModelModel(),
        pageSize: 500,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters
    })
    view.bindStore( view.store );
    var toolbar = view.down( 'pagingtoolbar' );
    if( toolbar ) {
        toolbar.bindStore( view.store );
    }
    view.store.load();
    /** BC : 371312207 - Si se abre desde AdministratorSearch : Configuracion
     *  Se hace la visualizacion de una toolbar diferente y se agrega una columna.
     **/
    if( view.openFromConfiguration ) {
        view.down( '#toolbarConfiguration' ).show();
        view.down( '#toolbar' ).hide();
        view.down( "gridcolumn[dataIndex=iprs_ccnombre]" ).show();
    }
},
    
objectChanged: function (view ) {
    view.down( 'pagingtoolbar' ).doRefresh();
},
    
onCreateConexionSMSClick: function(button ) {
    var view = button.up( 'iprsconecciongridview' );
    record = this.getT_iprsconeccionesModelModel();
    var myobject = record.create( {
        'iprsc_iprsiid': view.record.get( 'Id' ),
        'iprsc_lastserviceupdate': new Date()
    });
    var viewwin = Ext.widget( 't_iprsconeccionesformnuevaview', {
        caller: view,
        record: myobject,
        mode: 'SMS'
        //    objectId : id,
    });
    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: getLocale( 'Nueva conexión' ),
        translate: false,
        width: 750,
        height: 550,
        border: false,
        items: viewwin
    });
    win.show();
},
onCreateConexionClick: function(button ) {
    var view = button.up( 'iprsconecciongridview' );
    record = this.getT_iprsconeccionesModelModel();
    var myobject = record.create( {
        'iprsc_iprsiid': view.record.get( 'Id' ),
        'iprsc_lastserviceupdate': new Date()
    });
    var viewwin = Ext.widget( 't_iprsconeccionesformnuevaview', {
        caller: view,
        record: myobject,
        //    objectId : id,
    });
    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: getLocale( 'Nueva conexión' ),
        translate: false,
        width: 750,
        height: 550,
        border: false,
        items: viewwin
    });
    win.show();
},
    
onCreateClick: function(button ) {
    var view = button.up( 'iprsconecciongridview' );
    record = this.getT_iprsconeccionesModelModel();
    var myobject = record.create( {
        'iprsc_iprsiid': view.record.get( 'Id' ),
        'iprsc_status': 'I',
        'iprsc_lastserviceupdate': new Date()
    });
    var viewwin = Ext.widget( 't_iprsconeccionesformview', {
        caller: view,
        record: myobject,
        // objectId : id,
    });
    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: getLocale( 'Nueva conexión' ),
        translate: false,
        width: 750,
        height: 550,
        border: false,
        items: viewwin
    });
    win.show();
},
   
onItemClick: function(grid, record, item, index, e, options ) {
    var id = record.get( 'Id' );
    var view = grid.up( 'iprsconecciongridview' );
    var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
    var title = getLocale( 'Conexión' );
    var controller = this;
    var model = this.getT_iprsconeccionesModelModel().load( id, {
        callback: function( recordx, operation ) {
            controller.getTablasIpConModelModel().load( recordx.get( 'iprsc_ipcidkey' ), {
                callback: function( recordIpc ) {
                    if( operation.success ) {
                        var viewwin = Ext.widget( 't_iprsconeccionesformnuevaview', {
                            caller: view,
                            record: recordx,
                            objectId: id,
                            mode: recordIpc.get( 'ipc_imodemsms' ) > 0 ? 'SMS' : ''
                        });
                        var win = Ext.create( 'Ext.Window', {
                            iconCls: 'icon-table-add',
                            layout: 'fit',
                            title: title,
                            width: 750,
                            height: 550,
                            border: false,
                            scroll: 'Auto',
                            items: viewwin
                        });
                        win.show();
                    }
                }
            })
        }
    })
},    
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'iprsconecciongridview' );
    var store = view.getStore();
    store.clearFilter();
    store.filter( view.filters );
    view.down( '#query' ).setValue( '' );
},
    
onSearchClick: function(button, event, options ) {
    var view = button.up( 'iprsconecciongridview' );
    var store = view.getStore();
    var fieldName = view.down( '#fieldName' ).getValue();
    var query = view.down( '#query' ).getValue();
    var filters = Ext.clone( view.filters );
    if( fieldName != '' ) {
        filters.push( {
            property: fieldName + ':LIKE',
            value: query
        });
    }
    if( filters.length > 0 ) {
        store.filter( filters );
    }
    else {
        store.clearFilter();
    }
},
    
onDeleteClick: function(button, event, options ) {
    var view = button.up( 'iprsconecciongridview' );
    var selection = view.getSelectionModel().getSelection();
    if( selection ) {
        view.store.remove( selection );
        var delRec = view.store.getRemovedRecords();
        Ext.Array.each( delRec, function( rec ) {
            rec.destroy( {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Se eliminio exitosamente' );
                    }
                    else {
                        notify( 'No se puede eliminar el registro' );
                    }
                    view.store.load();
                }
            });
        }, this );
    }
},
    
/** BC : 371312207 - Si se abre desde AdministratorSearch : Configuracion
 *  Se hace la visualizacion de una toolbar diferente y se agrega una columna.
 * Las funciones de los nuevos botones
 **/
onSearchIPRSClick: function(btn, event, options ) {
    var controller = this;
    var view = btn.up( 'iprsconecciongridview' );
    var connectionName = view.down( '#connectionName' ).getValue();
    var connectionPort = view.down( '#connectionPort' ).getValue();
    var connectionReceptor = view.down( '#connectionReceptor' ).getValue();
    var store = view.getStore();
    store.clearFilter( true );
    var filters = [];
    if( connectionName != '' ) {
        filters.push( {
            property: 'ipc_cdescripcion:LIKE',
            value: connectionName
        });
    }
    if( connectionPort != '' ) {
        filters.push( {
            property: 'ipc_nport:LIKE',
            value: connectionPort
        });
    }
    if( connectionReceptor != '' ) {
        filters.push( {
            property: 'rec_cdescripcion:LIKE',
            value: connectionReceptor
        });
    }
    store.filter( filters );
},
    
onGetAllIPRSClick: function(btn, event, options ) {
    var controller = this;
    var view = btn.up( 'iprsconecciongridview' );
    var store = view.getStore();
    store.clearFilter();
    var connectionName = view.down( '#connectionName' ).setValue( '' );
    var connectionPort = view.down( '#connectionPort' ).setValue( '' );
    var connectionReceptor = view.down( '#connectionReceptor' ).setValue( '' );
}
});