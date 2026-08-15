//MIGRADO2024
Ext.define( 'Common.controller.HorarioExcepcionController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.TablaEventosFeriadosStore' ],
models: [ 'HorarioExcepcionSearchModel', 'HorarioExcepcionCuentaModel', 'TablaEventosFeriadosModel', 'HorarioExcepcionModel', 'HorarioExcepcionAllModel' ],
views: [ 'HorarioExcepcionGridView' ],
init: function (config ) {
    var me = this;
    // genero los eventos
    this.control( {
        'horarioexcepciongridview button[action=save]': {
            click: this.onSaveClick
        },
        'horarioexcepciongridview button[action=delete]': {
            click: this.onDeleteClick
        },
        'horarioexcepciongridview button[action=getall]': {
            click: this.onGetAllClick
        },
        'horarioexcepciongridview button[action=add]': {
            click: this.onAddClick
        },
        'horarioexcepciongridview': {
            validateedit: this.validateHorario,
            itemdblclick: this.onItemDblClick,
            beforerender: this.initView,
            refresh: this.onRefresh,
            selectionchange: this.onSelectionChange
        }
    });

}, // cierro init


onRefresh: function (view ) {
    view.store.load()
},
initView: function(view ) {
    // hago que en el load resetee los valores iniciales, osea que no deja el form en Dirty
    var record = view.record;

    var module = view.module;
    var profile = module.get( 'profile' );
    view.profile = profile;
    view.record = record;

    if( profile < 2 ) {
        view.down( 'toolbar' ).hide();
    }

    /*var mystore =Ext.create('Ext.data.Store',{
        model: 'DealerSearch'+'.model.HorarioExcepcionModel'
    });
    
    var _ObjectId = record.get('cue_iid');
    // una vez que cargue el store hago el binding con la view
    mystore.load({objectId:_ObjectId,view:view,store:mystore,callback: this.doBindStore});*/


    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getHorarioExcepcionSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: 'exc_iidcuenta',
            value: record.get( 'cue_iid' )
        }]
    })
    view.bindStore( view.store );
    console.log( 'view', view )
    view.store.load( records => console.log( "MIS FERIADOS :$ ", records ) )
},

//Federico.V funcion creada el 11/09/2023 para traer y guardar todos los eventos feriados segun la tarea DS-770     
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'horarioexcepciongridview' );
    var record = view.record;
    var controller = this;

    // Mostrar la máscara de carga en la vista
    //view.setLoading( 'Cargando eventos feriados...' );

    Ext.Msg.confirm( 'Confirmación', '¿Estás seguro de traer todos los feriados?', function( btn ) {
        if( btn === 'yes' ) {
            // Crear y configurar el almacén de datos
            view.store = Ext.create( 'Ext.data.Store', {
                model: this.getHorarioExcepcionAllModelModel(),
                pageSize: null,
                proxy: {
                    type: 'rest',
                    url: '/Rest/Search/HorarioExcepcionAll',
                    extraParams: {
                        idCta: record.get( 'cue_iid' )
                    },
                    reader: {
                        type: 'json',
                        root: 'rows',
                        totalProperty: 'total'
                    },
                    simpleSortMode: true,
                    pageParam: undefined,
                    startParam: undefined,
                    limitParam: undefined,
                },
            });

            view.store.clearFilter();
            view.bindStore( view.store );

          



            // ... código anterior ...

            const modelExepcion = this.getHorarioExcepcionCuentaModelModel();
            const maxEventsToFetch = 15; 
            view.store.load( {
                callback: function( records, operation, success ) {
                    if( success ) {
                        let eventsToSave = [];

                        Ext.each( records, function( record, i ) {
                            if( record.get( 'exc_idKey' ) === 0 && eventsToSave.length < maxEventsToFetch ) {
                                var myobject = modelExepcion.create( {
                                    
                                    exc_cHoraApertura: '00:00',
                                    exc_cHoraCierre: '23:59',
                                    exc_cevento: record.get( 'exc_cevento' ),
                                    exc_iidcuenta: view.record.get( 'cue_iid' )
                                });
                                myobject.set("Id",0);
                                eventsToSave.push( myobject );
                            }
                        });

                        if( eventsToSave.length > 0 ) {
                            
                            Ext.Array.each( eventsToSave, function( eventToSave, i ) {
                                setTimeout( function() {
                                    eventToSave.save( {
                                        callback: function() {
                                            if( i === eventsToSave.length - 1 ) {
                                                controller.initView( view );
                                            }
                                        }
                                    });
                                }, i * 1000 );
                            });
                        } else {
                           
                            controller.initView( view );
                        }
                    } else {
                        console.error( 'Error al cargar los datos.' );
                        
                        view.setLoading( false );
                    }
                }
            });

        }
    }, this );
},

deleteHorario: function(view,selection, key,model){
    var controller = this;
    var index = key;
    if(key<selection.length){
        if(!isNaN(selection[key].get('Id'))){
            model.load(selection[key].get('Id'),{
                callback: function(recordErase){
                    recordErase.erase({
                        callback: function(record){
                            index++;
                            controller.deleteHorario(view,selection,index, model);                   
                        }
                    });
                }
            });
        }
    }else{
        view.store.load();
    }
},


onDeleteClick: function(button, object, options ) {
    var view = button.up( 'horarioexcepciongridview' );
    var controller = this;
    /*
    var selection = view.getSelectionModel().getSelection()[0];
    var controller = this;
    if( selection ) {
        var model = this.getHorarioExcepcionModelModel();
        model.load(selection.get("Id"),{
            callback: function(record){
                record.erase({
                    callback: function(){
                        view.store.load();
                    }
                });
            }
        });      
    }*/
        button.disable();
        var selection = view.getSelectionModel().getSelection();
        if (selection.length>0) {
            var len = selection.length-1;

            var model = this.getHorarioExcepcionModelModel();
            controller.deleteHorario(view,selection,0, model);
            /*for(var key in selection) {
                model.load(selection[key].get('Id'),{
                    callback: function(recordErase){
                        recordErase.erase({
                            callback: function(record){
                                console.log(key , len);
                                if(key >= len) {
                                    view.getStore().load();
                                }                                 
                            }
                        });
                    }
                });

                    

            } */
        }   

},
	
onAddClick: function(button, object, options ) {
    var view = button.up( 'horarioexcepciongridview' );
    var store = view.getStore();
    var cuenta = view.record;
    var model = store.model;

    var rec = this.getHorarioExcepcionCuentaModelModel().create( {
        exc_iidcuenta: cuenta.get( 'Id' ),
        exc_cevento: ''
    });
    rec.set("Id",0);
    var win = Ext.widget( 'window', {
        title: 'Nuevo feriado',
        autoShow: true,
        modal: true,
        closeAction: 'destroy',
        closable: false,
        items: [
            Ext.widget( 'horarioexcepcionformview', {
                record: rec,
                caller: view
            })
        ]
    })
},
    
onItemDblClick: function(grid, record, item, index, e, options ) {
    var view = grid.up( 'horarioexcepciongridview' );
    var store = view.getStore();
    var cuenta = view.record;
    var model = store.model;
    var controller = this;

    if( view.profile < 2 ) {
        return false;
    }

    controller.getHorarioExcepcionModelModel().load( record.get( 'Id' ), {
        callback: function( recordx ) {
            Ext.widget( 'window', {
                title: 'Día Feriado',
                autoShow: true,
                modal: true,
                closeAction: 'destroy',
                closable: false,
                items: [
                    Ext.widget( 'horarioexcepcionformview', {
                        record: recordx,
                        caller: view
                    })
                ]
            })

        }
    })

},

onSaveClick: function (button, event, options ) {
    var view = button.up( 'horarioexcepciongridview' );
    var store = view.store;
    store.sync();
},



validateHorario: function(editor, event ) {
    var record = event.record;
    var values = event.newValues;
    var store = event.store;
    var sb = Ext.getCmp( 'statusbar' );
    var error = false;

    // valido que el registro sea valido
    // modifico para medir "distancia entre dias", pedido por GASPAR, acordado con Pablo Canonico 29/04/2020
    var cantDias = 0;
    // me fijo si el dia de cierre es menor al de apertura 
    if( ( values.diaCierre - values.diaApertura ) >= 0 ) {
        cantDias = values.diaCierre - values.diaApertura;
    } else {
        cantDias = ( 7 - values.diaApertura ) + values.diaCierre;
    }

    if( cantDias > 6 ) {
        Ext.Msg.show( {
            title: getLocale( 'Error!' ),
            msg: getLocale( 'El dia de cierre no puede ser anterior al de apertura!' ),
            icon: Ext.Msg.ERROR
        });
        valid = false;
        return false;
    }

    // hora apertura menor que hora cierre si es mismo dia (hay que mejorar la comparacion de texto no siempre funciona)
    if( values.alt_ndiacierre == values.alt_ndiaapertura && values.alt_choracierre < values.alt_choraapertura ) {
        sb.setStatus( {
            text: 'El horario de cierre no puede ser anterior al de apertura!',
            iconCls: 'x-status-error',
            clear: false
        })// cierro setStatus
        return false;
    }

    // interseccion con los otros registros
    store.each( function( item ) {
        // no tomo en cuenta el registro que estoy editando
        if( record != item ) {

            // Los dias no se pueden cruzar
            if( values.alt_ndiaapertura <= item.get( 'alt_ndiaapertura' ) && values.alt_ndiacierre > item.get( 'alt_ndiaapertura' ) ) {
                sb.setStatus( {
                    text: getLocale( 'El horario se solapa con otros horarios!' ),
                    iconCls: 'x-status-error',
                    clear: false
                })// cierro setStatus
                error = true;
                return false;
            }

            if( values.alt_ndiaapertura >= item.get( 'alt_ndiaapertura' ) && values.alt_ndiaapertura < item.get( 'alt_ndiacierre' ) ) {
                sb.setStatus( {
                    text: getLocale( 'El horario se solapa con otros horarios!' ),
                    iconCls: 'x-status-error',
                    clear: false
                })// cierro setStatus
                error = true;
                return false;
            }

        }
    });

    if( error ) { return false }

},
onSelectionChange: function (selModel, selections) {
    var grid = selModel.view;
    var view = grid.up('horarioexcepciongridview');
    view.down('button[action=delete]').setDisabled(selections.length === 0);
}   
});




