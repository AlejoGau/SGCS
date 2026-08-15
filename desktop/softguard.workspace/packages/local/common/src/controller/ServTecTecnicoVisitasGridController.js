//MIGRADO2024
Ext.define( 'Common.controller.ServTecTecnicoVisitasGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'ServTecTecnicoVisitasModel', 'ServTecTecnicoVisitaSearchModel', 'TecnicosSearchModel', 'ServTecFormaViajeSearchModel', 'InstaladoresByTokenSearchModel' ],
views: [ 'ServTecTecnicoVisitaGridView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'servtectecnicovisitasgridview': {
                afterrender: this.initView,
                // objectedit: this.onObjectEdit,
                productSelected: this.onProductSelected,
                refresh: this.initView
            },
            /*'servtectecnicovisitasgridview button[action=search]': {
                click: this.onSearchClick
            },
            'servtectecnicovisitasgridview button[action=getall]': {
                click: this.onGetAllClick
            },*/
            'servtectecnicovisitasgridview button[action=add]': {
                click: this.onAdd
            },
            'servtectecnicovisitasgridview button[action="delete"]': {
                click: this.onDeleteClick
            }
        });
},
initView: function(view ) {
    this.initStore( view );
    if( view.up( 'sertecmultivisitasformview' ) ) {
        //si está en crear multiples visitas no muestro botón borrar 
        view.down( '#delete' ).hide();
    }
    view.storeCombo = Ext.create( 'Ext.data.Store', {
        model: this.getInstaladoresByTokenSearchModelModel(),
        pageSize: 450,
        remoteSort: true,
        remoteFilter: true,
        filters: [
            {
                property: 'ins_iTipo:ININT',
                value: "1,2"
            }
        ]
    })
    view.down( '#comboTecnicos' ).bindStore( view.storeCombo );
    view.storeCombo.load();
    view.storeCombo = Ext.create( 'Ext.data.Store', {
        model: this.getServTecFormaViajeSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true
    })
    view.down( '#comboViajes' ).bindStore( view.storeCombo );
    view.storeCombo.load();
},
    
initStore: function (view ) {
    if( view.record.get( 'Id' ) != 0 ) {
        view.filters = [
            {
                property: 'stv_iVisita',
                value: view.record.get( 'Id' )
            }
        ]
        console.log( "view filters", view.filters )
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getServTecTecnicoVisitaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        var grid = view.down('#gridTecnicos');
        if (grid) {
            grid.bindStore( view.store );
        } else if (view.bindStore) {
            view.bindStore( view.store );
        }
        view.store.load(( records => console.log( "records tecn", records ) ) );
    }
},
onAdd: function(grid, record, item, index, e, options ) {
    var id = 0;
    var view = grid.up( 'servtectecnicovisitasgridview' );
    var controller = this;
    var comboTecnicoValue = view.down( '#comboTecnicos' ).getValue();
    var comboViajeValue = view.down( '#comboViajes' ).getValue();
    const visitas = view.up().visitas;
    console.log("view on Add tecnico",view)

    // DK-1552 P4: no permitir agregar el mismo tecnico mas de una vez en la misma visita.
    if( comboTecnicoValue && view.store && view.store.getRange ) {
        var yaAsignado = false;
        Ext.Array.each( view.store.getRange(), function( r ) {
            var tecId = r.get( 'stv_iTecnico' ) || r.get( 'ins_idKey' );
            if( tecId == comboTecnicoValue ) { yaAsignado = true; return false; }
        } );
        if( yaAsignado ) {
            notifyError( 'Ese tecnico ya esta asignado a la visita.' );
            return;
        }
    }

    if( comboTecnicoValue && comboViajeValue ) {
        if( visitas ) {
            view.visitas = visitas;
            visitas.forEach(( visita, i ) => {
                controller.getServTecTecnicoVisitasModelModel().create( {
                    Id: 0,
                    stv_iTecnico: comboTecnicoValue,
                    stv_iVisita: visita.get( 'Id' ),
                    stv_iFormaDeViaje: comboViajeValue
                }).save( {
                    callback: function( record ) {
                        controller.initStore( view );
                        view.store.load();
                        // view.caller.fireEvent( 'tecnicoadded', record, view.caller );
                        view.up( 'sertecmultivisitasformview' ).fireEvent( 'refresh', view.up( 'sertecmultivisitasformview' ) )
                        notify( 'Se agrego un tecnico con exito.' )
                    }
                });
            });
        } else {
            controller.getServTecTecnicoVisitasModelModel().create( {
                Id: 0,
                stv_iTecnico: comboTecnicoValue,
                stv_iVisita: view.record.get( 'Id' ),
                stv_iFormaDeViaje: comboViajeValue
            }).save( {
                callback: function( record ) {
                    console.log( "TECNIVO AGREGADO: ", record )
                    controller.initStore( view );
                    view.store.load();
                    console.log("view caler cuando agrego tecnico",view.caller)
                    view.caller.fireEvent( 'tecnicoadded', record, view.caller );
                    notify( 'Se agrego un tecnico con exito.' )
                }
            });
        }
    } else {
        notify( 'Seben estar seleccionado tecnico y forma de viaje.' )
    }
},    
onProductSelected: function(record, view ) {
    var controller = this;
    Ext.MessageBox.prompt( 'Cantidad', 'Ingrese la cantidad:', function( btn, cantidad ) {
        controller.getServTecProductosOrdenModelModel().create( {
            spr_iServicio: view.record.get( 'Id' ),
            spr_iProducto: record.get( 'Id' ),
            spr_iCantidad: cantidad
        }).save( {
            callback: function() {
                var toolbar = view.down( 'pagingtoolbar' );
                toolbar.doRefresh();
                notify( 'El producto se agrego con exito.' )
            }
        });
    });
},
onDeleteClick: function(button, event, options ) {
    var view = button.up( 'servtectecnicovisitasgridview' );
    var grid = view.down('#gridTecnicos') || view;
    var selection = grid.getSelectionModel().getSelection();
    var controller = this;
    const visitas = view.up().visitas;
    if( selection ) {
        Ext.Array.each( selection, function( rec ) {
            var model = controller.getServTecTecnicoVisitasModelModel();
            model.load(rec.get('Id'),{
                callback: function(record){
                    record.erase({
                        callback: function(recdel,operation){
                            if( operation.success ) {
                                notify( 'Se eliminio exitosamente' );
                            }
                            else {
                                notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                            }
                            view.store.load();
                        }
                    });
                }
            });

            /*rec.setConfig({
				proxy: controller.getServTecTecnicoVisitasModelModel().getProxy()
			});
            rec.destroy( {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Se eliminio exitosamente' );
                    }
                    else {
                        notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                    }
                    view.store.load();
                }
            })*/
        }, this );
    }
}
});