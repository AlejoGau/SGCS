Ext.define( 'Administrator.controller.AdministratorSecurityController', {
    extend: 'Ext.app.Controller',
    stores: [ 'AdministratorSecurityModulesStore', 'EventSecurityModuleStore' ],
models: [ 'ModuleModel' ],
views: [ 'AdministratorSecurityView', 'AdministratorAccountSecurityView', 'EventSecurityView' ],

init: function(config ) {
    this.control( {
        'AdministratorSecurity button[action=saveSecurity]': {
            click: this.onSaveClick
        },
        'AdministratorSecurity': {
            beforerender: this.initview
        },
        'AdministratorAccountSecurity button[action=refreshModules]': {
            click: this.onRefreshModulesClick
        },
        'AdministratorAccountSecurity button[action=applyPerfil]': {
            click: this.onApplyPerfilClick
        },
        'AdministratorAccountSecurity button[action=saveSecurity]': {
            click: this.onSaveSecurityClick
        },
        'EventSecurity[moduleFlag=administrator] button[action=applyPerfilEventos]': {
            click: this.onApplyPerfilEventClick
        },
        'EventSecurity[moduleFlag=administrator]': {
            beforerender: this.initEventView
        },
        'EventSecurity[moduleFlag=administrator] button[action=saveEvent]': {
            click: this.onSaveEventClick
        },
        'EventSecurity[moduleFlag=administrator] button[action=refreshModulesEvent]': {
            click: this.onRefreshModulesEventClick
        },
        'AdministratorSecurity #chkCuenta': {
            change: this.onCheckCuenta
        }

    });
}, // administratormoduleformview


onCheckCuenta: function (view, value ) {
    if( value == true ) {
        if( view.up( 'tabpanel' ).down( 'EventSecurity' ) ) {
            view.up( 'tabpanel' ).down( 'EventSecurity' ).tab.show();
        }
        if( view.up( 'tabpanel' ).down( 'AdministratorAccountSecurity' ) ) {
            view.up( 'tabpanel' ).down( 'AdministratorAccountSecurity' ).tab.show();
        }
    } else {
        if( view.up( 'tabpanel' ).down( 'EventSecurity' ) ) {
            view.up( 'tabpanel' ).down( 'EventSecurity' ).tab.hide();
        }
        if( view.up( 'tabpanel' ).down( 'AdministratorAccountSecurity' ) ) {
            view.up( 'tabpanel' ).down( 'AdministratorAccountSecurity' ).tab.hide();
        }
    }
},
    
initview: function(view ) {
    var record = view.record;
    var modules = view.modules;
    var module = view.module;
    var moduleId = module.get( 'udm_idKey' );
    var userName = record.get( 'Name' );
    var url = '/Rest/Security/Modules/' + moduleId + '/Security/' + userName;
    var security = { modules: [], rights: [], event: [] },
        me = this;
    view.url = url;
    view.security = security;

    Ext.Ajax.request( {
        url: url,
        method: 'GET',
        success: function( resp, operation ) {
            if( resp.responseText )
                var json = JSON.parse( resp.responseText );
            if( json )
                security = json;

            if( security.rights ) {
                var chkCuenta = view.down( '#chkCuenta' );
                chkCuenta.setValue( security.rights.cuenta );

                view.security.rights = security.rights;
            }

            if( security.modules )
                view.security.modules = security.modules;

            if( security.event )
                view.security.event = security.event;

            view.url = url;
            me.setSecurity.call( me, view );
            view.up( 'tabpanel' ).setActiveTab( view );
        }
    });

    this.showEventos( view );
},
    
    
showEventos: function(view ) {
    var record = view.record;
    var modules = view.modules;
    var tabpanel = view.up( 'tabpanel' );
    var me = this;

    if( view.securityLoading ) {
        Ext.Function.defer( me.showEventos, 500, me, arguments );
    } else {
        if( !tabpanel.down( 'EventSecurity' ) ) {
            var tab = tabpanel.add( Ext.widget( 'EventSecurity', {
                record: view.record,
                modules: view.modules,
                security: view.security,
                url: view.url,
                moduleFlag: 'administrator'
            }) );
        }
    }
},
    
onSaveEventClick: function(button, event, options ) {
    var me = this;
    var view = button.up( 'EventSecurity' );
    var security = view.security;
    var record = view.record;
    var store = view.getStore();
    var url = view.url;//+'/'+userId;

    security.event = Ext.pluck( store.data.items, 'data' );
    var json = Ext.encode( security );

    //var json = Ext.encode(Ext.pluck(store.data.items, 'data'));

    Ext.Ajax.request( {
        url: url,
        method: 'PUT',
        params: json,
        success: function( resp, operation ) {
            me.initEventView( view );
            notify( 'Los datos se guardaron con éxito' );
        }
    });
},
    
initEventView: function(view ) {
    var store = deepCloneStore( this.getEventSecurityModuleStoreStore() );
    var security = view.security;

    if( security && security.event && security.event.length > 0 ) {
        store.loadData( Ext.Array.clone( security.event ) );
    }

    view.bindStore( store );
},
    
onRefreshModulesEventClick: function(button, event, options ) {
    var view = button.up( 'EventSecurity' ) ? button.up( 'EventSecurity' ) : button;
    var gridstore = view.getStore();
    var store = this.getEventSecurityModuleStoreStore();
    var cantidad = store.data.length - 1;

    store.each( function( pstore, i ) {
        gridstore.each( function( gstore ) {
            if( pstore.get( 'text' ) == gstore.get( 'text' ) ) {
                var profile = gstore.get( 'profile' ) ? gstore.get( 'profile' ) : 0;
                pstore.set( 'profile', profile );
            }
        }, this );
    }, this );
    view.bindStore( store );
},
    
    
setSecurity: function(view ) {
    var me = this;
    var security = view.security;
    var webdealerStore = this.getAdministratorSecurityModulesStoreStore();

    var account = Ext.widget( 'AdministratorAccountSecurity', {
        security: security
    })
    view.cuentaview = account;
    view.up( 'tabpanel' ).add( account );

    var store = Ext.create( 'Ext.data.Store', {
        model: this.getModuleModelModel()
    });

    if( security ) {
        //Proceso modules
        if( security.modules && security.modules.length > 0 ) {
            store.loadData( Ext.Array.clone( security.modules ) );
            account.bindStore( store );
        }
        else {
            //Actualizo si es viejo

            account.bindStore( webdealerStore );
            var gridStore = account.getStore();
            Ext.Array.each( security, function( _module ) {
                var coincide = gridStore.findRecord( 'text', _module.text, 0, false, true, true );
                if( coincide ) {
                    coincide.set( 'profile', _module.profile )
                }
            });

        }

        if( security.rights ) {
            var chkCreate = account.down( '#chkCreate' );
            chkCreate.setChecked( security.rights.create );

            var chkCopy = account.down( '#chkCopy' );
            chkCopy.setChecked( security.rights.copy );

            var chkDelete = account.down( '#chkDelete' );
            chkDelete.setChecked( security.rights.delete );

            var chkMulticuenta = account.down( '#chkMulticuenta' );
            chkMulticuenta.setChecked( security.rights.multicuenta )

            var chkTiempoReal = account.down( '#chkTiempoReal' );
            chkTiempoReal.setChecked( security.rights.tiemporeal )

            var chkClaves = account.down( '#chkClaves' );
            chkClaves.setChecked( security.rights.claves )

            var changeDealer = account.down( '#changeDealer' );
            changeDealer.setChecked( security.rights.changedealer )

            var checkgeoreferencia = account.down( '#chkgeoreferencias' );
            checkgeoreferencia.setChecked( security.rights.chkgeoreferencias )

            var cambionumerocuenta = account.down( '#chkCambioNumero' );
            cambionumerocuenta.setChecked( security.rights.cambionumerocuenta )

            var exportar = account.down( '#exportar' );
            exportar.setChecked( security.rights.exportar )

            var exportardatosdelacuenta = account.down( '#exportardatosdelacuenta' );
            exportardatosdelacuenta.setChecked( security.rights.exportardatosdelacuenta )


            var dealerreadonly = account.down( '#dealerreadonly' );
            dealerreadonly.setChecked( security.rights.dealerreadonly )


            var solicitudescambio = account.down( '#solicitudescambio' );
            solicitudescambio.setChecked( security.rights.solicitudescambio )

            var chkGenerarEventos = view.down( '#chkGenerarEventos' );
            chkGenerarEventos.setValue( security.rights.generareventos )

            var procesarporlote = view.down( '#procesarporlote' );
            procesarporlote.setValue( security.rights.procesarporlote )

            var chkvictimario = account.down( '#chkVictimario' );
            chkvictimario.setChecked( security.rights.chkvictimario )
        }
    } else {
        account.bindStore( webdealerStore );
    }

    me.onRefreshModulesClick( account );
    me.onCheckCuenta( view.down( '#chkCuenta' ), view.down( '#chkCuenta' ).getValue() )
},

onRefreshModulesClick: function(button, event, options ) {
    var view = button.up( 'AdministratorAccountSecurity' ) ? button.up( 'AdministratorAccountSecurity' ) : button;
    var gridstore = view.getStore();
    var store = this.getAdministratorSecurityModulesStoreStore();
    var cantidad = store.data.length - 1;

    store.each( function( pstore, i ) {
        gridstore.each( function( gstore ) {
            if( pstore.get( 'text' ) == gstore.get( 'text' ) ) {
                var profile = gstore.get( 'profile' ) ? gstore.get( 'profile' ) : 0;
                pstore.set( 'profile', profile );
            }
        }, this );
    }, this );
    view.bindStore( store );
},
    
onSaveSecurityClick: function(button, event, options ) {
    var view = button.up( 'tabpanel' ).down( 'AdministratorSecurity' );
    var btn = view.down( 'button[action=saveSecurity]' );

    this.onSaveClick( btn );
},

onSaveClick: function(button, event, options ) {
    var view = button.up( 'AdministratorSecurity' );
    var url = view.url;
    var cuenta = view.cuentaview;
    var store = cuenta.getStore();
    //var chkAdmin = view.down('#chkAdmin');
    //var chkOrganization = view.down('#chkOrganization');
    var chkCuenta = view.down( '#chkCuenta' );

    var chkCreate = cuenta.down( '#chkCreate' );
    var chkCopy = cuenta.down( '#chkCopy' );
    var chkDelete = cuenta.down( '#chkDelete' );
    var chkMulticuenta = cuenta.down( '#chkMulticuenta' );
    var chkTiempoReal = cuenta.down( '#chkTiempoReal' );
    var chkClaves = cuenta.down( '#chkClaves' );
    var changeDealer = cuenta.down( '#changeDealer' );

    var checkgeoreferencia = cuenta.down( '#chkgeoreferencias' );
    var cambionumerocuenta = cuenta.down( '#chkCambioNumero' );

    var exportar = cuenta.down( '#exportar' );
    var exportardatosdelacuenta = cuenta.down( '#exportardatosdelacuenta' );

    var dealerreadonly = cuenta.down( '#dealerreadonly' );
    var solicitudescambio = cuenta.down( '#solicitudescambio' );
    var chkGenerarEventos = view.down( '#chkGenerarEventos' );
    var procesarporlote = view.down( '#procesarporlote' );
    var chkVictimario = cuenta.down( '#chkVictimario' );

    view.security.rights = {
        cuenta: chkCuenta.checked,
        copy: chkCopy.checked,
        create: chkCreate.checked,
        delete: chkDelete.checked,
        multicuenta: chkMulticuenta.checked,
        tiemporeal: chkTiempoReal.checked,
        claves: chkClaves.checked,
        changedealer: changeDealer.checked,
        checkgeoreferencia: checkgeoreferencia.checked,
        cambionumerocuenta: cambionumerocuenta.checked,
        exportar: exportar.checked,
        dealerreadonly: dealerreadonly.checked,
        solicitudescambio: solicitudescambio.checked,
        generareventos: chkGenerarEventos.checked,
        procesarporlote: procesarporlote.checked,
        exportardatosdelacuenta: exportardatosdelacuenta.checked,
        chkvictimario: chkVictimario.checked,
    }

    view.security.modules = Ext.pluck( store.data.items, 'data' );
    var json = Ext.encode( view.security );

    Ext.Ajax.request( {
        url: url,
        method: 'PUT',
        params: json,
        success: function( resp, operation ) {
            notify( 'Los datos se guardaron con éxito' );
        }
    });
},
    
onApplyPerfilClick: function(button, event, options ) {
    var view = button.up( 'AdministratorAccountSecurity' );
    var selmodel = view.getSelectionModel();
    var selection = selmodel.getSelection();
    var profile = view.down( '#comboPerfil' ).getValue();

    Ext.Array.each( selection, function( _module ) {
        _module.set( 'profile', profile );
    })
},
    
onApplyPerfilEventClick: function(button, event, options ) {
    var view = button.up( 'EventSecurity' );
    var selmodel = view.getSelectionModel();
    var selection = selmodel.getSelection();
    var profile = view.down( '#comboPerfilEventos' ).getValue();

    Ext.Array.each( selection, function( _module ) {
        _module.set( 'profile', profile );
    })
}
});