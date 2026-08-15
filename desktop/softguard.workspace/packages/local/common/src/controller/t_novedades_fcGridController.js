//MIGRADO2024
Ext.define( 'Common.controller.t_novedades_fcGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'm_novedades_facturacion_fcModel', 't_novedades_fcInsSearchModel', 't_novedades_fcModel', 't_novedades_fcSearchModel' ],
views: [ 't_novedades_fcGridView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'novedadesfcgridview': {
                afterrender: this.initView,
                //itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                bloquear: this.onBloquear,
                desbloquear: this.onDesbloquear
            },
            'novedadesfcgridview button[action=search]': {
                click: this.onSearchClick
            },
            'novedadesfcgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'novedadesfcgridview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'novedadesfcgridview button[action=add]': {
                click: this.onAddClick
            }
        });
},
    
onBloquear: function (record, view ) {
    var controller = this
    controller.getM_novedades_facturacion_fcModelModel().load( record.get( 'nfc_icodigo_ID' ), {
        callback: function( rec ) {
            rec.set( 'nfc_nestado', 9 )
            rec.save( {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Se bloqueo exitosamente' );
                    } else {
                        notify( 'No se puede bloquear el registro.' );
                    }
                    view.store.load();
                }
            })
        }
    })
},
onAddClick: function(button, event, options ) {
    var panel = button.up( 'tabpanel' );
    var view = button.up( 'novedadesfcgridview' );
    var record = view.record;
    var parentId = "";
    var cli_icodigo_ID = "";
    var cli_iOrganizacion = "";
    if( record != undefined ) {
        parentId = record.get( 'Id' );
        cli_icodigo_ID = record.get( 'cli_icodigo_ID' );
        cli_iOrganizacion = record.get( 'cli_iOrganizacion' );
    }
    
    var model = this.getT_novedades_fcInsSearchModelModel();
    var myobject = model.create( {
        nfc_icliente: cli_icodigo_ID,
        nfc_nrecurrente: 0,
        nfc_nestado: 0
    });
    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: 'Novedad facturación',
        width: 450,
        height: 450,
        border: false,
        items: [ {
            xtype: 't_novedades_fcformview',
            caller: view,
            record: myobject,
            organizationId: cli_iOrganizacion,
            recordOrganizacion: record
        }]
    });
    win.show();
},
    
onDesbloquear: function (record, view ) {
    var controller = this
    controller.getM_novedades_facturacion_fcModelModel().load( record.get( 'nfc_icodigo_ID' ), {
        callback: function( rec ) {
            rec.set( 'nfc_nestado', 0 )
            rec.save( {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Se bloqueo exitosamente' );
                    } else {
                        notify( 'No se puede bloquear el registro.' );
                    }
                    view.store.load();
                }
            })
        }
    })
},
initView: function(view ) {
    view.filters = [];
    if(!view.record)
    {
        view.down("#btnCrear").hide();
    }
    //si no tiene account relacionada a la organizacion no dejo continuar
    if( view.record && view.record.get( 'Account' ) == '' && view.enabledAccount ) {
        Ext.MessageBox.alert( 'Falta configurar', 'Necesita configurar la informacion de facturacion.', function() {
            view.up( 'tabpanel' ).remove( view )
        });
        return false;
    }
    if( view.record && view.record.get( 'Account' ) ) {
        view.filters.push( {
            property: 'cli_icodigo_ID',
            value: view.record.get( 'Account' )
        })
        view.down( '[dataIndex=cli_cnombre]' ).hide()
    }
    view.filters.push( {
        property: 'nfc_nestado:ININT',
        value: '0,9'
    })
    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getT_novedades_fcSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters
    })
    view.bindStore( view.store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.store );
    view.store.load();
},
    
objectChanged: function (view ) {
    view.down( 'pagingtoolbar' ).doRefresh();
},
  
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'novedadesfcgridview' );
    var store = view.getStore();
    store.clearFilter( true );
    store.filter( view.filters );
    view.down( '#query' ).setValue( '' );
},
    
onSearchClick: function(button, event, options ) {
    var view = button.up( 'novedadesfcgridview' );
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
    var controller = this
    var view = button.up( 'novedadesfcgridview' );
    var selection = view.getSelectionModel().getSelection();
    if( selection ) {
        Ext.MessageBox.confirm( getLocale( 'Borrar' ), getLocale( 'Esta a punto de eliminar una novedad, esta seguro?' ), function( btn ) {
            if( btn === 'yes' ) {
                var _proxy = controller.getM_novedades_facturacion_fcModelModel().getProxy();
                Ext.Array.each( selection, function( _m ) {
                    _m.setProxy( _proxy );
                    _m.destroy();
                });
                view.store.load();
            }
            else {
                //some code
            }
        });
    }
}
});