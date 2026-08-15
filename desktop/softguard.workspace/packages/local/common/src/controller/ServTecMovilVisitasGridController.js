//MIGRADO2024
Ext.define( 'Common.controller.ServTecMovilVisitasGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'ServTecMovilVisitasSearchModel', 'ServTecMovilVisitasModel', 'ServTecMovilesSearchModel', 'TablasMovilesPatrullaSearchModel' ],
views: [ 'ServTecMovilVisitasGridView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'servtecmovilvisitasgridview': {
                afterrender: this.initView,
                //  objectedit: this.onObjectEdit,
                productSelected: this.onProductSelected
            },
            /*   'servtecmovilvisitasgridview button[action=search]': {
                   click: this.onSearchClick
               },*/
            /* 'servtecmovilvisitasgridview button[action=getall]': {
                 click: this.onGetAllClick
             },*/
            'servtecmovilvisitasgridview button[action=add]': {
                click: this.onAdd
            },
            'servtecmovilvisitasgridview button[action="delete"]': {
                click: this.onDeleteClick
            }
        });
},
initView: function(view ) {
    if( view.up( 'sertecmultivisitasformview' ) ) {
        //si está en crear multiples visitas no muestro botón borrar 
        view.down( '#delete' ).hide();
    }
    this.initStore( view );
    view.storeCombo = Ext.create( 'Ext.data.Store', {
        model: this.getTablasMovilesPatrullaSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: 'tmp_cnumero:LIKE',
            value: 'ST'
        },
        {
                property: 'tmp_nestado',
                value: 1
            }
    ]
    })
    view.down( '#comboMoviles' ).bindStore( view.storeCombo );
    view.storeCombo.load();
},
    
initStore: function (view ) {
    if(isNaN(view.record.id)){
        view.record.id = 0;
        view.record.data.Id = 0;
    }


    if( view.record.get( 'Id' ) != 0 ) {
        view.filters = [
            {
                property: 'smv_iVisita',
                value: view.record.get( 'Id' )
            }
        ]
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getServTecMovilVisitasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        var grid = view.down('#gridMoviles');
        if (grid) {
            grid.bindStore( view.store );
        } else if (view.bindStore) {
            view.bindStore( view.store );
        }
        view.store.load();
    }
},   
onAdd: function (grid, record, item, index, e, options ) {
    const view = grid.up( 'servtecmovilvisitasgridview' );
    const comboMovilesValue = view.down( '#comboMoviles' ).getValue();
    const parentForm = view.up( 'sertecmultivisitasformview' );
    const controller = this;
    const visitas = parentForm ? parentForm.visitas : [];
    if( !comboMovilesValue ) {
        notify( 'Debe seleccionar un móvil.' );
        return;
    }
    const recordsToSave = [];
    if( visitas.length > 0 ) {
        Ext.Array.each( visitas, function( visita ) {
            recordsToSave.push( {
                Id: 0,
                smv_iMovil: comboMovilesValue,
                smv_iVisita: visita.get( 'Id' ),
            });
        });
    } else {
        recordsToSave.push( {
            Id: 0,
            smv_iMovil: comboMovilesValue,
            smv_iVisita: view.record.get( 'Id' ),
        });
    }
    const promises = recordsToSave.map( function( recordData ) {
        return new Promise( function( resolve, reject ) {
            controller
                .getServTecMovilVisitasModelModel()
                .create( recordData )
                .save( {
                    callback: function( record ) {
                        resolve( record );
                    },
                });
        });
    });
    Promise.all( promises ).then( function( records ) {
        controller.initStore( view );
        view.store.load();
        if( visitas.length > 0 ) {
            parentForm.fireEvent( 'refresh', parentForm );
        } else {
            view.caller.fireEvent( 'moviladded', records[ 0 ], view.caller );
        }
        notify( 'Se agregó un móvil con éxito.' );
    });
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
    var view = button.up( 'servtecmovilvisitasgridview' );
    var grid = view.down('#gridMoviles') || view;
    var selection = grid.getSelectionModel().getSelection();
    var controller = this;
    if( selection ) {
        Ext.Array.each( selection, function( rec ) {
            var model = controller.getServTecMovilVisitasModelModel();
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
				proxy: controller.getServTecMovilVisitasModelModel().getProxy()
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