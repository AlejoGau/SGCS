//MIGRADO2024
Ext.define( 'Common.controller.PPushQueueGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'PPushQueueSearchModel' ],
views: [ 'PPushQueueGridView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'ppushqueuegridview': {
            afterrender: this.initView,
            itemdblclick: this.onItemClick
        },
        'ppushqueuegridview button[action=search]': {
            click: this.onSearchClick
        },
        'ppushqueuegridview button[action=getall]': {
            click: this.onGetAllClick
        },
        'ppushqueuegridview button[action=export]': {
            click: this.onExportClick
        }
    });
},
    
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'ppushqueuegridview' );
    var store = view.getStore();
    store.clearFilter( true );
    var filters = Ext.clone( view.filters );
    if( filters.length > 0 ) {
        store.filter( filters );
    }
    else {
        store.load();
    }
    view.down( '#message' ).setValue( '' );
    view.down( '#fechacreacion' ).setValue( '' );
},
    
onSearchClick: function(button, event, options ) {
    var view = button.up( 'ppushqueuegridview' );
    /* Obtengo los valores de los filtros */
    var store = view.getStore();
    var tipomensaje = view.down( '#message' ).getValue();
    var fechacreacion = view.down( '#fechacreacion' ).getValue();
    /* Limpio los filtros - probar por lo de idcuenta */
    store.clearFilter( true );
    /* Cargo en la variable de filtros lo mismo declarado en la view */
    var filters = Ext.clone( view.filters );
    /* Comparo los filtro para aplicar segun corresponda */
    if( tipomensaje == 'UPDATE_LOGIN' ) {
        filters.push( {
            property: 'ppq_msg:LIKE',
            value: '%' + tipomensaje + '%'
        });
    } else if( tipomensaje == 'INBOX_MESSAGE' ) {
        filters.push( {
            property: 'ppq_msg:LIKE',
            value: '%' + tipomensaje + '%'
        });
    } else if( tipomensaje == 'ALARM_STOP' ) {
        filters.push( {
            property: 'ppq_msg:LIKE',
            value: '%' + tipomensaje + '%'
        });
    }
    if( fechacreacion ) {
        filters.push( {
            property: 'o.ppq_fechacreacion',
            value: Ext.Date.format( fechacreacion, 'Y-m-d H:i:s' )
        }, {
                property: 'o.ppq_fechacreacionEND',
                value: Ext.Date.format( fechacreacion, 'Y-m-d H:i:s' )
            })
    }
    /* recargo el Store con los filtros */
    if( filters.length > 0 ) {
        store.filter( filters );
    }
    else {
        store.clearFilter();
    }
},
    
onItemClick: function(grid, record, item, index, e, options ) {
    var view = grid.up( 'ppushqueuegridview' );
    var estado = record.get( 'ppq_estado' );
    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        title: getLocale( "Mensaje" ),
        translate: false,
        width: 450,
        height: 300,
        border: false,
        items: [ {
            xtype: 'displayfield',
            fieldLabel: 'Destino',
            value: record.get( 'nombreDestino' ) + " - " + getLocale( "Teléfono" ) + ":" + record.get( 'telefonoDestino' )
        }, {
                xtype: 'displayfield',
                fieldLabel: 'Fecha',
                value: Ext.Date.format( new Date( record.get( 'ppq_fechacreacion' ) ), 'd/m/Y H:i:s' )
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Estado',
                renderer: function( value, metadata, record ) {
                    console.log( 'estado', estado )
                    switch( estado ) {
                        case 0:
                            return getLocale( "Pendiente " );
                            break;
                        case 1:
                            return getLocale( "Enviado" );
                            break;
                        case 2:
                            return getLocale( "Rechazado" );
                            break;
                        case 3:
                            return getLocale( "Error" );
                            break;
                    }
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Asunto',
                value: record.get( 'ppq_msg' ),
                renderer: function( value, metadata, record, item ) {
                    var notificacion = Ext.JSON.decode( value );
                    //console.log(notificacion.data.action);
                    var action = notificacion.data.action;
                    /* Guardo en el campo Action el record del mensaje */
                    if( action === "INBOX_MESSAGE" ) {
                        return notificacion.notification.text
                    }
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Mensaje',
                value: record.get( 'msgBody' )
            }]
    });
    win.show();
},
    
initView: function(view ) {
    view.filters = [];
    if( view.record ) {
        view.filters = [
            {
                property: 'ppq_idcuenta',
                value: view.record.get( 'Id' )
            }
        ]
    }
    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getPPushQueueSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters
    })
    view.bindStore( view.store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.store );
    view.store.load( records => console.log( 'records', records ) );
    // BC 404430734 - Cargo la seguridad del modulo en base CuentaView (Si se abre notificaciones desde AdminCuentas / DealerSearch)
    var existCuentaView = view.up( 'cuentaview' )
    if( existCuentaView )
        var _security = view.up( 'cuentaview' ).security
    if( _security ) {
        var btnExport = view.down( '#btnExport' );
        if( _security.rights && !_security.rights.exportar && btnExport ) {
            btnExport.hide();
        }
    }
},
    
/* Funcion de exportacion */
onExportClick: function(button, e, eOpts ) {
    var view = button.up( 'ppushqueuegridview' );
    var store = view.getStore();
    var filters = store.filters;
    var url = '/handler/ReportePPushQueueGridHTML';
    /* Agrego los filtros aplicados al Store en la URL */
    var min = [],
        length = filters.getCount(),
        i = 0;
    for( ;i < length;i++ ) {
        min[ i ] = {
            property: filters.items[i]._property,
            value: filters.items[i]._value
        };
    }
    url = Ext.urlAppend( url, 'filter=' + Ext.encode( min ) );
    /* Obtengo por separado FechaDesde y FechaHasta para el encabezado */
    var fechacreacion = view.down( '#fechacreacion' ).getValue();
    if( fechacreacion ) {
        url = Ext.String.urlAppend( url, 'fechacreacion=' + Ext.Date.format( new Date( fechacreacion ), 'd/m/Y' ) );
    }
    /* Agrego _DC */
    url = Ext.String.urlAppend( url, '_dc=' + new Date().getTime() );
    /* Pongo el flag de export en Yes y procede a exportar */
    var exportToExcel = 'yes';
    if( exportToExcel ) {
        url = Ext.String.urlAppend( url, "exportToExcel=" + exportToExcel );
    }
    /* Redirijo a la URL armada */
    location.href = url;
}
});