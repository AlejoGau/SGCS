Ext.define( 'Administrator.controller.RangeDetailController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'AdministratorModuleModel', 'DesktopModuleDetailByUserModel', 'UsersDesktopWebModulosModel', 'UsersDesktopWebModulosModelSearch', 'AdministratorSearchModel' ],
views: [ 'RangeDetailView' ],

init: function(config ) {
    this.control( {
        'rangedetail button[action=rangoDelete]': {
            click: this.onDeleteClick
        },
        'rangedetail button[action=rangoAdd]': {
            click: this.onAddClick
        },

        'rangedetail': {
            afterrender: this.initview,
            objectchanged: this.onObjectChanged,
            userSelected: this.onUserSelected,

            itemdblclick: this.onItemClick
        },
        'rangedetail button[action=copyuser]': {
            click: this.onCopyUserClick
        }


    });
}, // administratormoduleformview

onUserSelected: function (record, view ) {
    /*view.down('#idusuario').setValue(record.get('udw_idKey'))
    view.down('#nombreusuario').setValue(record.get('_nombre'))*/

    var idkey = record.get( 'Id' );
    var nombre = record.get( '_nombre' );
    var controller = this;

    Ext.MessageBox.show( {
        title: 'Copiar Rangos',
        msg: getLocale( 'Como se deben tratar los rangos?' ),
        buttonText: {
            yes: 'Agregar', no: 'Remplazar', cancel: 'Cancelar'
        },
        buttons: Ext.Msg.YESNOCANCEL,
        fn: function( btn ) {

            view.setLoading( true )

            var modules = Ext.create( 'Ext.data.Store', {
                remoteFilter: true,
                model: controller.getUsersDesktopWebModulosModelSearchModel(),
                pageSize: 500,
                filters: [ {
                    property: 'dwm_idModules',
                    value: 0
                }, {
                        property: 'dwm_idWeb',
                        value: idkey
                    }]
            })

            var model = controller.getAdministratorModuleModelModel();

            if( btn == "no" ) {
                if( view.modules.data.items.length > 0 ) {
                    view.modules.each( function( recordModules, indexModules ) {
                        var object = model.create( { Id: recordModules.get( 'dwm_idKey' ) });
                        object.destroy( {
                            callback: function() {
                                if( view.modules.data.items.length <= ( indexModules + 1 ) ) {
                                    modules.load( {
                                        callback: function( records, indexmodule ) {
                                            if( modules.data.items.length > 0 ) {
                                                //traigo los rangos del usuario logeado
                                                var userLogueadoRangosStore = Ext.create( 'Ext.data.Store', {
                                                    model: controller.getUsersDesktopWebModulosModelSearchModel(),
                                                    pageSize: 500,
                                                    remoteFilter: true,
                                                    filters: [ {
                                                        property: 'dwm_idModules',
                                                        value: 0
                                                    }, {
                                                            property: 'dwm_idWeb',
                                                            value: _UserData.udw_idKey
                                                        }]
                                                }).load( {
                                                    callback: function( recordsLogueado ) {
                                                        if( recordsLogueado.length > 0 ) {
                                                            Ext.Array.each( recordsLogueado, function( rec, index ) {
                                                                Ext.each( records, function( record ) {
                                                                    controller.crearRangoSegunUsuarioLogueado( view, record, rec, model, function() {
                                                                        if( recordsLogueado.length <= index ) { //+1
                                                                            view.modules.load();
                                                                        } else {
                                                                            view.modules.load( {
                                                                                callback: function() {
                                                                                    view.setLoading( false )
                                                                                }
                                                                            });
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        } else {
                                                            controller.crearRangoSegunUsuarioLogueado( view, record, null, model, function() {

                                                                if( records.length <= indexmodule + 1 ) {
                                                                    view.modules.load();
                                                                } else {
                                                                    view.modules.load( {
                                                                        callback: function() {
                                                                            view.setLoading( false )
                                                                        }
                                                                    });
                                                                }

                                                            })
                                                        }

                                                    }
                                                });



                                            } else {
                                                view.modules.load();
                                                view.setLoading( false )
                                            }
                                        }
                                    })
                                }
                            }
                        });
                    });
                } else {
                    modules.load( {
                        callback: function( records ) {
                            if( modules.data.items.length > 0 ) {
                                //traigo los rangos del usuario logeado
                                var userLogueadoRangosStore = Ext.create( 'Ext.data.Store', {
                                    model: controller.getUsersDesktopWebModulosModelSearchModel(),
                                    pageSize: 500,
                                    remoteFilter: true,
                                    filters: [ {
                                        property: 'dwm_idModules',
                                        value: 0
                                    }, {
                                            property: 'dwm_idWeb',
                                            value: _UserData.udw_idKey
                                        }]
                                }).load( {
                                    callback: function( recordsLogueado ) {
                                        if( recordsLogueado.length > 0 ) {
                                            Ext.Array.each( recordsLogueado, function( rec, index ) {
                                                Ext.each( records, function( record ) {
                                                    controller.crearRangoSegunUsuarioLogueado( view, record, rec, model, function() {

                                                        if( recordsLogueado.length <= index ) {
                                                            view.modules.load();
                                                        } else {
                                                            view.modules.load( {
                                                                callback: function() {
                                                                    view.setLoading( false )
                                                                }
                                                            });
                                                        }
                                                    })
                                                })
                                            })
                                        } else {
                                            Ext.each( records, function( record, indexmodule ) {
                                                controller.crearRangoSegunUsuarioLogueado( view, record, null, model, function() {

                                                    if( records.length <= indexmodule + 1 ) {
                                                        view.modules.load();
                                                    } else {
                                                        view.modules.load( {
                                                            callback: function() {
                                                                view.setLoading( false )
                                                            }
                                                        });
                                                    }

                                                })
                                            })
                                        }

                                    }
                                });

                            } else {
                                notify( 'El usuario que selecciono, no tiene rangos.' )
                                view.modules.load();
                                view.setLoading( false )
                            }

                        }
                    })
                }




            } else if( btn == "yes" ) {

                modules.load( {
                    callback: function( records ) {
                        if( modules.data.items.length > 0 ) {
                            Ext.each( records, function( record, indexmodule ) {
                                var copiar = true;
                                if( view.modules ) {
                                    view.modules.each( function( recordModules, indexModules ) {
                                        if( recordModules.get( 'dwm_dealer' ) == record.get( 'dwm_dealer' ) &&
                                            recordModules.get( 'dwm_cuenta_desde' ) == record.get( 'dwm_cuenta_desde' ) &&
                                            recordModules.get( 'dwm_cuenta_hasta' ) == record.get( 'dwm_cuenta_hasta' ) ) {

                                            copiar = false;

                                        }

                                    })
                                }
                                if( copiar == true ) {

                                    /* var modelModule = model.create({
                                         dwm_idWeb: view.record.get('Id'), 
                                         dwm_idModules: 0,
                                         dwm_dealer:record.get('dwm_dealer'),
                                         dwm_cuenta_desde:record.get('dwm_cuenta_desde'),
                                         dwm_cuenta_hasta:record.get('dwm_cuenta_hasta')
                                         
                                     });
                                     modelModule.save({
                                             scope : this,
                                             callback:function (){
                                            
                                                if(records.length<=index+1){
                                                   view.modules.load();   
                                                   view.setLoading(false)
                                                 } else {
                                                     view.setLoading(false)
                                                 }
                                         
                                         }});*/

                                    //traigo los rangos del usuario logeado
                                    var userLogueadoRangosStore = Ext.create( 'Ext.data.Store', {
                                        model: controller.getUsersDesktopWebModulosModelSearchModel(),
                                        pageSize: 500,
                                        remoteFilter: true,
                                        filters: [ {
                                            property: 'dwm_idModules',
                                            value: 0
                                        }, {
                                                property: 'dwm_idWeb',
                                                value: _UserData.udw_idKey
                                            }]
                                    }).load( {
                                        callback: function( recordsLogueado ) {

                                            if( recordsLogueado.length > 0 ) {

                                                Ext.Array.each( recordsLogueado, function( rec, index ) {


                                                    Ext.each( records, function( record ) {


                                                        controller.crearRangoSegunUsuarioLogueado( view, record, rec, model, function() {

                                                            if( recordsLogueado.length <= index ) { //+1
                                                                view.modules.load();
                                                            } else {
                                                                view.modules.load( {
                                                                    callback: function() {
                                                                        view.setLoading( false )
                                                                    }
                                                                });
                                                            }

                                                        })
                                                    })

                                                })

                                            } else {

                                                controller.crearRangoSegunUsuarioLogueado( view, record, null, model, function() {

                                                    if( records.length <= indexmodule + 1 ) {
                                                        view.modules.load();
                                                    } else {
                                                        view.modules.load( {
                                                            callback: function() {
                                                                view.setLoading( false )
                                                            }
                                                        });
                                                    }

                                                })
                                            }

                                        }
                                    });

                                } else {
                                    notify( '%El rango% ' + record.get( 'dwm_dealer' ) + ' %que se intentar copiar ya se encuentran utilizados por el usuario.%' )
                                    view.modules.load();
                                    view.setLoading( false )
                                }

                            })

                        } else {
                            notify( 'El usuario que selecciono, no tiene rangos.' )
                            view.modules.load();
                            view.setLoading( false )
                        }

                    }
                })

            } else if( btn == "cancel" ) {
                view.setLoading( false )
            }
        },
    });
},
    
crearRangoSegunUsuarioLogueado: function (view, record, recLogueado, model, callback ) {
    //evaluo lo que voy a copiar con lo que tiene el usuario logueado


    if( recLogueado ) {
        if( record.get( 'dwm_dealer' ) == recLogueado.get( 'dwm_dealer' ) &&
            record.get( 'dwm_cuenta_desde' ) <= recLogueado.get( 'dwm_cuenta_desde' ) &&
            record.get( 'dwm_cuenta_desde' ) >= recLogueado.get( 'dwm_cuenta_desde' ) ) {

            var modelModule = model.create( {
                dwm_idWeb: view.record.get( 'Id' ),
                dwm_idModules: 0,
                dwm_dealer: record.get( 'dwm_dealer' ),
                dwm_cuenta_desde: record.get( 'dwm_cuenta_desde' ),
                dwm_cuenta_hasta: record.get( 'dwm_cuenta_hasta' )

            });
            modelModule.save( {
                scope: this,
                callback: function() {

                    if( callback ) {
                        callback();
                    }

                }
            });
        } else {
            notify( '%El rango% ' + record.get( 'dwm_dealer' ) + ':' + record.get( 'dwm_cuenta_desde' ) + '>' + record.get( 'dwm_cuenta_hasta' ) + ' %NO puede ser agregado%' )
        }
    } else {

        var modelModule = model.create( {
            dwm_idWeb: view.record.get( 'Id' ),
            dwm_idModules: 0,
            dwm_dealer: record.get( 'dwm_dealer' ),
            dwm_cuenta_desde: record.get( 'dwm_cuenta_desde' ),
            dwm_cuenta_hasta: record.get( 'dwm_cuenta_hasta' )

        });
        modelModule.save( {
            scope: this,
            callback: function() {

                if( callback ) {
                    callback();
                }

            }
        });
    }
},
    
onCopyUserClick: function (btn ) {
    var view = btn.up( 'rangedetail' )
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione un usuario',
        closeAction: 'destroy',
        modal: true,
        width: 640,
        height: 480,
        border: false,
        items: [ {
            xtype: 'usuarioselecterhelperview',
            caller: view,
            // record: view.record,
            //cuentaWithRango: true,
            //  filterByTipo: 2,
            //  cuentaNumero:Ext.util.Format.trim(view.recordSearch.get('cue_ncuenta')),
            //  dealer:view.recordSearch.get('cue_clinea')

        }]
    });
    win.show();
},
    
onItemClick: function(grid, record, item, index, e, options ) {
    var view = grid.up( 'rangedetail' );


    this.openFormWindow( 'Módulo', record, view );

},
    

initview: function(view ) {
    //var grid = view.down('#gridModules');
    var record = view.record;
    var idUsuario = record.get( 'Id' );
    console.log( "record view RangeDetailController", record )
    const userId = _UserData.udw_idKey
    console.log( "User Id - - - ", userId )
    console.log("record id asdasd", record.get( 'Id' ) )
    if( idUsuario ) {
        view.modules = Ext.create( 'Ext.data.Store', {
            model: this.getUsersDesktopWebModulosModelSearchModel(),
            pageSize: 500,
            remoteFilter: true,
            filters: [ {
                property: 'dwm_idModules',
                value: 0
            }, {
                    property: 'dwm_idWeb',
                    value: record.get( 'Id' )
                }]
        })

        view.bindStore( view.modules );
        view.modules.load();
    }


},

onAddClick: function(button, event, options ) {
    var view = button.up( 'rangedetail' );
    var record = view.record;

    var module = this.getAdministratorModuleModelModel();

    this.openFormWindow( 'Módulo', module.create( {
        dwm_idWeb: record.get( 'Id' ), // id del usuario
        dwm_idModules: 0 // id del modulo en la tabla modules
    }), view );
}, 
    
    
openFormWindow: function(title, record, grid ) {

    record.setConfig({
        proxy: this.getAdministratorModuleModelModel().getProxy()
    });
    var newView = Ext.widget( 'rangeformview', {
        record: record,
        scope: this,
        grid: grid
    }
    );
    // Lo agregamos al panel
    var myWindow = Ext.widget( 'window', {
        title: title,
        height: 250,
        width: 400,
        modal: true,
        items: newView,
        layout: 'fit'
    }).show();
},

onDeleteClick: function(button, event, options ) {
    var win = button.up( 'window' );
    var view = button.up( 'rangedetail' );
    var model = this.getAdministratorModuleModelModel();
    var record = view.getSelectionModel().getSelection();

    view.setLoading( true )
    var i = 1;
    Ext.Array.each( record, function( rec ) {

        var object = model.create( { Id: rec.get( 'dwm_idKey' ) });

        object.destroy( {
            success: function() {
                //cuanod termino de borrar todos refresco la grilla
                if( i >= record.length ) {
                    view.fireEvent( 'objectchanged', { win: win, view: view });
                    view.setLoading( false )
                }
                i++;
            }
        });




    })


},
    
onObjectChanged: function(event ) {
    var view = event.view;
    var store = view.getStore();

    store.load();
}
});