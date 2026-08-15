Ext.define( 'AdministratorSearch.controller.AdministratorSearchController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'SecurityModulesModel', 'AdministratorSearchModel' ],
views: [ 'AdministratorSearchToolbarView', 'MetadataViewport', 'ExtUxNotification' ],

init: function(config ) {
    // genero los eventos
    this.control( {
        'viewport': {
            beforerender: this.initview
        },
        'moduletoolbar button[action=crearUsuario]': {
            click: this.onCrearusuarioClick
        },
        'moduletoolbar button[action=openconfiguracion]': {
            click: this.onOpenconfiguracionClick
        }/*,
            'moduletoolbar button[action=eliminarcuenta]' : {
                click: this.onEliminarCuentaClick
            }*/,
        'moduletoolbar button[action=opentablas]': {
            click: this.onOpentablasClick
        },
        'moduletoolbar button[action=openparametros]': {
            click: this.onOpenparametrosClick
        },
        'moduletoolbar button[action=crearUsuario]': {
            click: this.onCrearusuarioClick
        },
        'moduletoolbar #perfilesusuario': {
            click: this.onPerfilesUsuarioClick
        },
        'moduletoolbar #procesarlotes': {
            click: this.onProcesarLotesClick
        }

    });
}, // cierro init

onProcesarLotesClick: function(button, event, options ) {
    var view = button.up( 'moduletoolbar' );
    var record = view.record;

    var store = view.store;
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        translate: false,
        forceClose: true,
        title: getLocale( 'Debe seleccionar los eventos a procesar' ),
        closeAction: 'destroy',
        caller: view,
        fieldName: 'udw_clave',
        modal: true,
        width: 700,
        height: 630,
        border: false,
        record: record,
        closable: false,
        items: [
            {
                xtype: 'procesarporloteview',
                estados: view.estados,
                closeAction: 'destroy',
                condiciones: view.condiciones,
                record: record,
                preventProcesarTodos: true,
                filters: view.searchFilters,
                caller: view
            }
        ]
    });
    win.show();
},
    
initview: function(view ) {
    var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
    var myPanel = Ext.getCmp( 'center' );
    const currentURL = window.location.href;
    const url = new URL( currentURL );
    var controller = this;
    const superuserParam = url.searchParams.get( "SUPERUSER" );

    var isMaster = false;
    var webMasterDealer = modules.findRecord( 'KeyReference', 'MasterWebDealer' );

    if( webMasterDealer && webMasterDealer.get( 'Available' ) == true && webMasterDealer.get( 'Security' ) ) {
        isMaster = true;
        var metaDataMasterDealer = JSON.parse( webMasterDealer.get( 'Security' ) );
        if( metaDataMasterDealer.CantidadOperadores >= 0 ) {
            var usuarios = Ext.create( 'Ext.data.Store', {
                model: controller.getAdministratorSearchModelModel(),
                pageSize: 10000,
                remoteSort: true,
                remoteFilter: true,
                remoteGroup: false,
                filters: [ {
                    property: 'udw_tipo:ININT',
                    value: '1'
                }]
            }).load( {
                callback: function( records ) {
                    if( metaDataMasterDealer.CantidadOperadores <= records.length ) {
                        view.hidedealer = true;
                    }
                }
            })
        }
    }

    var administratorModule = modules.findRecord( 'KeyReference', 'Administrator' );
    var masterModule = modules.findRecord( 'KeyReference', 'MasterWebDealer' );

    if( administratorModule.get( 'Available' ) ) {
        view.down( '#audit' ).show();
        view.down( '#aplicaciones' ).show();
        view.down( '#actualizaciones' ).show();
        view.down( '#configuracion' ).show();
        view.down( '#eliminarcuenta' ).show();
        view.down( '#btnsistema' ).show();
        view.down( '#scripts' ).show()

        if( myPanel.down( '#reporte' ) ) {
            myPanel.down( '#reporte' ).show();
        }

        view.down( '#perfilesusuario' ).show();

        if( administratorModule && administratorModule.get( '_Security' )
            && administratorModule.get( '_Security' ).rights.cuenta == true
            && administratorModule.get( '_Security' ).rights.procesarporlote == true ) {

            view.down( '#procesarlotes' ).show()

        } else if( administratorModule && administratorModule.get( '_Security' )
            && administratorModule.get( '_Security' ).rights.cuenta == true
            && administratorModule.get( '_Security' ).rights.procesarporlote == false ) {
        } else {
            view.down( '#procesarlotes' ).show()
        }
    }

    if( isMaster ) {
        view.down( '#eliminarcuenta' ).hide();
        if( masterModule.get( '_Security' ) ) {
            var json = masterModule.get( '_Security' );
            if( json.ElimnarCuenta == true ) {
                view.down( '#eliminarcuenta' ).show();
            }
        }
        //solcitado por daniel banda https://basecamp.com/2249105/projects/9661053/todos/227299361#comment_371593365

        if( administratorModule.get( 'Available' ) ) {
            view.down( '#audit' ).hide();
            view.down( '#aplicaciones' ).hide();
            view.down( '#actualizaciones' ).hide();
            view.down( '#configuracion' ).hide();
            view.down( '#btnsistema' ).hide();
            if( myPanel.down( '#reporte' ) )
                myPanel.down( '#reporte' ).hide();
        }
    } else {

        if( administratorModule.get( 'Available' ) ) {
            var sessionview = Ext.widget( 'sessionpanelview', {
                title: 'Estado'
            });

            myPanel.add( sessionview );
            myPanel.setActiveTab( sessionview );
        }


    }



    /////

    var tabpanelUsuarios = Ext.widget( 'tabpanel', {
        closable: false,
        title: 'Administración de usuarios'
    })
    myPanel.add( tabpanelUsuarios );


    if( administratorModule.get( 'Available' ) ) {
        var grid = Ext.widget( 'administratorsearchgridview', {
            closable: false,
            title: getLocale( 'Central' ),
            filterByTipo: "0"
        });


        tabpanelUsuarios.add( grid )
        tabpanelUsuarios.setActiveTab( grid );
    }

    var grid = Ext.widget( 'administratorsearchgridview', {
        closable: false,
        title: getLocale( 'Dealer' ),
        filterByTipo: "1"
    });

    tabpanelUsuarios.add( grid )

    var grid = Ext.widget( 'administratorsearchgridview', {
        closable: false,
        title: getLocale( 'Usuario final (AWCC)' ),
        filterByTipo: "2"
    });

    tabpanelUsuarios.add( grid )
    if( !superuserParam ) {
        view.down( '#actualizaciones' ).hide();
        view.down( '#aplicaciones' ).hide();
    }

    if( !currentURL.includes( "SUPERUSER" ) ) {
        view.down( '#aplicaciones' ).hide()
        view.down( '#actualizaciones' ).hide()
    }
},
    
openObjectById: function(id ) {
    var myLocation = "/a/administrator?" + "objectId=" + id;
    //+ "&token=" + Ext.Ajax.defaultHeaders.Authorization;
    //+ "&token=" +this.myQueryString.token;

    var newTab = Ext.create( 'Ext.ux.IFrame', {
        title: 'usuario',
        id: id,
        border: false,
        src: myLocation,
        closable: true
    });

    panel.add( newTab );
    panel.setActiveTab( newTab );
},
    
 
    
onEliminarCuentaClick: function(button, event, options ) {

    var panel = button.up( 'viewport' ).down( '#center' );
    var title = getLocale( "Eliminar cuentas" );

    var newTab = Ext.widget( 'eliminarcuentaview', {
        title: title,
        closable: true
    });

    panel.add( newTab );
    panel.setActiveTab( newTab );

},
    

onOpenconfiguracionClick: function(button, event, options ) {

    var panel = button.up( 'viewport' ).down( '#center' );
    var title = "Configuracion";

    var newTab = Ext.widget( 'systemconfigurationview', {
        title: title,
        closable: true
    });

    panel.add( newTab );
    panel.setActiveTab( newTab );

},
    
    
onPerfilesUsuarioClick: function(button, event, options ) {

    var panel = button.up( 'viewport' ).down( '#center' );
    var title = getLocale( "Perfiles de usuario" );

    var newTab = Ext.widget( 'administratorsearchgridview', {
        title: title,
        closable: true,
        perfiles: true
    });

    panel.add( newTab );
    panel.setActiveTab( newTab );

},
    
    
onOpentablasClick: function(button, event, options ) {

    var panel = button.up( 'viewport' ).down( '#center' );
    var title = getLocale( "Tablas" );

    var newTab = Ext.widget( 'systemtablesview', {
        title: title,
        closable: true
    });

    panel.add( newTab );
    panel.setActiveTab( newTab );

},
    
onOpenparametrosClick: function(button, event, options ) {

    var panel = button.up( 'viewport' ).down( '#center' );
    var title = getLocale( "Parametros" );

    var newTab = Ext.widget( 'systemparametersview', {
        title: title,
        closable: true
    });

    panel.add( newTab );
    panel.setActiveTab( newTab );

},
    
onCrearusuarioClick: function(button, event, options ) {
    var panel = button.up( 'viewport' ).down( '#center' );
    var view = button.up( 'viewport' );
    var title = getLocale( "Nuevo usuario" );
    var src = '/apps/administrator/';
    var controller = this

    var language = myQueryString.Language;

    if( language ) {
        src = Ext.String.urlAppend( src, 'Language=' + language );
    }

    src = Ext.String.urlAppend( src, 'objectId=0' );
    src = Ext.String.urlAppend( src, 'autocreateviewport=true' );


    var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
    var webMasterDealer = modules.findRecord( 'KeyReference', 'MasterWebDealer' );


    if( webMasterDealer && webMasterDealer.get( 'Available' ) == true && webMasterDealer.get( 'Security' ) ) {
        isMaster = true;
        var metaDataMasterDealer = JSON.parse( webMasterDealer.get( 'Security' ) );
        if( metaDataMasterDealer.CantidadOperadores >= 0 ) {
            var usuarios = Ext.create( 'Ext.data.Store', {
                model: controller.getAdministratorSearchModelModel(),
                pageSize: 10000,
                remoteSort: true,
                remoteFilter: true,
                remoteGroup: false,
                filters: [ {
                    property: 'udw_tipo:ININT',
                    value: '1'
                }]

            }).load( {
                callback: function( records ) {
                    if( metaDataMasterDealer.CantidadOperadores <= records.length ) {
                        src = Ext.String.urlAppend( src, 'hidedealer=true' );
                    }

                    var newTab = Ext.create( 'Ext.ux.IFrame', {
                        title: title,
                        id: 0,
                        border: false,
                        src: src,
                        closable: true
                    });

                    panel.add( newTab );
                    panel.setActiveTab( newTab );
                }
            })
        } else {
            var newTab = Ext.create( 'Ext.ux.IFrame', {
                title: title,
                id: 0,
                border: false,
                src: src,
                closable: true
            });

            panel.add( newTab );
            panel.setActiveTab( newTab );
        }
    } else {
        var newTab = Ext.create( 'Ext.ux.IFrame', {
            title: title,
            id: 0,
            border: false,
            src: src,
            closable: true
        });

        panel.add( newTab );
        panel.setActiveTab( newTab );
    }
}
});