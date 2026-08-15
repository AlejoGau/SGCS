Ext.define( 'Administrator.controller.MasterWebDealerController', {
    extend: 'Ext.app.Controller',
    stores: [ 'MasterWebDealerSecurityModuleStore', 'MasterEventSecurityModuleStore' ],
models: [ 'ModuleModel', 'AdministratorModuleModel', 'DesktopModuleDetailByUserModel' ],
views: [ 'MasterWebDealerSecurityView', 'MasterEventSecurityView', 'MasterWebDealerConfigView' ],

init: function(config ) {
    this.control( {
        'MasterWebDealerConfig button[action=saveSecurity]': {
            click: this.onSaveDetailClick
        },
        'MasterWebDealerConfig': {
            afterrender: this.initviewDetail
        },
        'MasterWebDealerSecurity': {
            beforerender: this.initview
        },
        'MasterWebDealerSecurity button[action=saveSecurity]': {
            click: this.onSaveClick
        },
        'MasterWebDealerSecurity button[action=applyPerfil]': {
            click: this.onApplyPerfilClick
        },
        'MasterWebDealerSecurity button[action=refreshModules]': {
            click: this.onRefreshModulesClick
        },
        'MasterEventSecurity[moduleFlag=masterdealersearch]': {
            beforerender: this.initEventView
        },
        'MasterEventSecurity button[action=saveEvent]': {
            click: this.onSaveEventClick
        },
        'MasterEventSecurity button[action=refreshModulesEvent]': {
            click: this.onRefreshModulesEventClick
        },
        'MasterEventSecurity button[action=applyPerfilEventos]': {
            click: this.onApplyPerfilEventClick
        },
    });
}, // administratormoduleformview

initEventView: function(view ) {
    var store = deepCloneStore( this.getMasterEventSecurityModuleStoreStore() );
    var security = view.security;
    var id = view.record.get( 'Id' );

    if( security && security.event && security.event.length > 0 ) {
        store.loadData( Ext.Array.clone( security.event ) );
    }

    view.bindStore( store );
    this.limpiarEventosConMasterWebDealer( view )
},
        
onRefreshModulesEventClick: function(button, event, options ) {
    var view = button.up( 'MasterEventSecurity' ) ? button.up( 'MasterEventSecurity' ) : button;
    var gridstore = view.getStore();
    var store = deepCloneStore( this.getMasterEventSecurityModuleStoreStore() );
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

    this.limpiarEventosConMasterWebDealer( view )
},
        
onApplyPerfilEventClick: function(button, event, options ) {
    var view = button.up( 'MasterEventSecurity' );
    var selmodel = view.getSelectionModel();
    var selection = selmodel.getSelection();
    var profile = view.down( '#comboPerfilEventos' ).getValue();

    Ext.Array.each( selection, function( _module ) {
        _module.set( 'profile', profile );
    })
},
        
onRefreshModulesClick: function(button, event, options ) {
    var view = button.up( 'MasterWebDealerSecurity' ) ? button.up( 'MasterWebDealerSecurity' ) : button;
    var gridstore = view.getStore();
    var store = this.getMasterWebDealerSecurityModuleStoreStore();
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
    this.limpiarSecurityConMasterWebDealer( view )
},
        
onApplyPerfilClick: function(button, event, options ) {
    var view = button.up( 'MasterWebDealerSecurity' );
    var selmodel = view.getSelectionModel();
    var selection = selmodel.getSelection();
    var profile = view.down( '#comboPerfil' ).getValue();

    Ext.Array.each( selection, function( _module ) {
        _module.set( 'profile', profile );
    })
},
         
onSaveEventClick: function(button, event, options ) {
    this.onSaveClick( button.up( 'tabpanel' ).down( 'MasterWebDealerSecurity' ) )
},
        
onSaveDetailClick: function(button, event, options ) {

    this.onSaveClick( button.up( 'tabpanel' ).down( 'MasterWebDealerSecurity' ) )
    /*var view = button.up('MasterWebDealerDetail');
    var url = view.url;
    var model = view.metadata; 
    
    
    var metadata = model.create({               
            CantidadCuentas: view.down('#cantidadcuentas').value,
            ElimnarCuenta: view.down('#eliminarcuenta').value,
            CantidadOperadores: view.down('#cantidadoperadores').value,
        });
    
    var json = Ext.encode(metadata.data);
    
    Ext.Ajax.request({
    url: url,
    method: 'PUT',
    params: json,
    success: function(resp,operation) {
        notify('Los datos se guardaron con éxito');
    }
    });*/

},
        
onSaveClick: function(button, event, options ) {
    var view = button.up( 'MasterWebDealerSecurity' ) ? button.up( 'MasterWebDealerSecurity' ) : button;
    var me = this;
    var security = view.security;
    var record = view.record;
    //var userId = record.get('Id');
    var store = view.getStore();
    var url = view.url;//+'/'+userId;
    var chkCreate = view.down( '#chkCreate' );
    var chkCopy = view.down( '#chkCopy' );
    var chkDelete = view.down( '#chkDelete' );
    var chkMulticuenta = view.down( '#chkMulticuenta' );
    var chkTiempoReal = view.down( '#chkTiempoReal' );
    var chkClaves = view.down( '#chkClaves' );
    var changeDealer = view.down( '#changeDealer' );
    var exportar = view.down( '#exportar' );
    const cambionumerocuenta = view.down( '#chkCambioNumero' );

    security.modules = Ext.pluck( store.data.items, 'data' );
    security.rights = {
        create: chkCreate.checked,
        copy: chkCopy.checked,
        delete: chkDelete.checked,
        multicuenta: chkMulticuenta.checked,
        tiemporeal: chkTiempoReal.checked,
        claves: chkClaves.checked,
        changedealer: changeDealer.checked,
        exportar: exportar.checked,
        cambionumerocuenta: cambionumerocuenta.checked
    }


    var viewEvent = view.up( 'tabpanel' ).down( 'MasterEventSecurity' );
    var store = viewEvent.getStore();

    security.event = Ext.pluck( store.data.items, 'data' );
    security.CantidadCuentas = view.up( 'tabpanel' ).down( 'MasterWebDealerConfig' ).down( '#cantidadcuentas' ).value
    security.ElimnarCuenta = view.up( 'tabpanel' ).down( 'MasterWebDealerConfig' ).down( '#eliminarcuenta' ).value
    security.CantidadOperadores = view.up( 'tabpanel' ).down( 'MasterWebDealerConfig' ).down( '#cantidadoperadores' ).value

    var json = Ext.encode( security );

    Ext.Ajax.request( {
        url: url,
        method: 'PUT',
        params: json,
        success: function( resp, operation ) {
            //me.initview(view);
            notify( 'Los datos se guardaron con éxito' );
        }
    });
}, 
        
initview: function(view ) {
    var security = { modules: [], rights: [], event: [] }
    var record = view.record;
    var modules = view.modules;
    var moduleId = modules.getAt( 0 ).get( 'dwm_idModules' );
    var userName = record.get( 'Name' );
    var url = '/Rest/Security/Modules/' + moduleId + '/Security/' + userName;
    var me = this;

    view.securityLoading = true;
    Ext.Ajax.request( {
        url: url,
        method: 'GET',
        success: function( resp, operation ) {
            if( resp.responseText )
                var json = JSON.parse( resp.responseText );
            if( json )
                security = json;

            view.security = security;
            view.securityLoading = false;
            view.url = url;

            me.setSecurity.call( me, view );

            view.up( 'tabpanel' ).setActiveTab( view );
            me.onRefreshModulesClick( view );
        }
    });
},
        
limpiarEventosConMasterWebDealer: function (view ) {
    //Limpio el Store segun lo que tiene el MASTER WEBDEALER
    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordMaster = storeSecurity.findRecord( 'KeyReference', 'MasterWebDealer' );
    var recordAdministrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' );
    if( recordAdministrator && recordAdministrator.get( 'Available' ) == true ) {
        // nada por ahora, pero no sacar no puedo eliminar en este caso.
    } else if( recordMaster && recordMaster.get( 'Available' ) == true ) {
        var viewStore = view.getStore()
        if( recordMaster.get( '_Security' ) ) {
            Ext.Array.each( recordMaster.get( '_Security' ).event, function( v, k ) {
                if( v.profile == 0 ) {
                    viewStore.remove( viewStore.findRecord( 'view', v.view ) )
                }
            })
        }
        else {
            viewStore.removeAll()
        }
    }
},
          
limpiarSecurityConMasterWebDealer: function (view ) {
    //Limpio el Store segun lo que tiene el MASTER WEBDEALER
    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordMaster = storeSecurity.findRecord( 'KeyReference', 'MasterWebDealer' )
    var recordAdministrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' );
    if( recordAdministrator && recordAdministrator.get( 'Available' ) == true ) {
        // nada por ahora, pero no sacar no puedo eliminar en este caso.
    } else if( recordMaster && recordMaster.get( 'Available' ) == true ) {
        //console.log(recordMaster.get('_Security').modules)
        var viewStore = view.getStore()

        var securityMaster = recordMaster.get( '_Security' );

        if( securityMaster && securityMaster.modules ) {

            Ext.Array.each( securityMaster.modules, function( v, k ) {
                if( v.profile == 0 ) {
                    viewStore.remove( viewStore.findRecord( 'view', v.view ) )
                }
            })
        } else {
            viewStore.removeAll()
        }

        if( securityMaster && securityMaster.rights ) {
            //constroll de checkbox
            if( !securityMaster.rights.create ) {
                view.down( '#chkCreate' ).hide()
            }
            if( !securityMaster.rights.copy ) {
                view.down( '#chkCopy' ).hide()
            }
            if( !securityMaster.rights.delete ) {
                view.down( '#chkDelete' ).hide()
            }
            if( !securityMaster.rights.multicuenta ) {
                view.down( '#chkMulticuenta' ).hide()
            }
            if( !securityMaster.rights.tiemporeal ) {
                view.down( '#chkTiempoReal' ).hide()
            }
            if( !securityMaster.rights.claves ) {
                view.down( '#chkClaves' ).hide()
            }
            if( !securityMaster.rights.changedealer ) {
                view.down( '#changeDealer' ).hide()
            }
            if( !securityMaster.rights.exportar ) {
                view.down( '#exportar' ).hide()
            }
        } else {
            view.down( '#chkCreate' ).hide()
            view.down( '#chkCopy' ).hide()
            view.down( '#chkMulticuenta' ).hide()
            view.down( '#chkTiempoReal' ).hide()
            view.down( '#chkClaves' ).hide()
            view.down( '#changeDealer' ).hide()
            view.down( '#exportar' ).hide()
        }
    }
},

setSecurity: function(view ) {
    var security = view.security;
    var webdealerStore = deepCloneStore( this.getMasterWebDealerSecurityModuleStoreStore() );
    this.showEventos( view );
    this.showDetails( view );
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getModuleModelModel()
    });

    if( security ) {

        //Proceso modules
        if( security.modules && security.modules.length > 0 ) {
            store.loadData( Ext.Array.clone( security.modules ) );
            view.bindStore( store );
        }
        else {
            //Actualizo si es viejo

            view.bindStore( webdealerStore );
            var gridStore = view.getStore();
            Ext.Array.each( security, function( _module ) {
                var coincide = gridStore.findRecord( 'text', _module.text, 0, false, true, true );
                if( coincide ) {
                    coincide.set( 'profile', _module.profile )
                }
            });

            view.security = { modules: [], rights: [], event: [] };
        }

        if( security.rights ) {

            var chkCreate = view.down( '#chkCreate' );
            chkCreate.setChecked( security.rights.create );

            var chkCopy = view.down( '#chkCopy' );
            chkCopy.setChecked( security.rights.copy );

            var chkDelete = view.down( '#chkDelete' );
            chkDelete.setChecked( security.rights.delete );

            var chkMulticuenta = view.down( '#chkMulticuenta' );
            chkMulticuenta.setChecked( security.rights.multicuenta )

            var chkTiempoReal = view.down( '#chkTiempoReal' );
            chkTiempoReal.setChecked( security.rights.tiemporeal )

            var chkClaves = view.down( '#chkClaves' );
            chkClaves.setChecked( security.rights.claves )

            var changeDealer = view.down( '#changeDealer' );
            changeDealer.setChecked( security.rights.changedealer )

            var exportar = view.down( '#exportar' );
            exportar.setChecked( security.rights.exportar )

            var chkCambioNumero = view.down( '#chkCambioNumero' );
            chkCambioNumero.setChecked( security.rights.cambionumerocuenta )
        }
    } else {
        view.bindStore( webdealerStore );
    }
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
            var tab = tabpanel.add( Ext.widget( 'MasterEventSecurity', {
                record: view.record,
                modules: view.modules,
                security: view.security,
                url: view.url,
                moduleFlag: 'masterdealersearch'
            }) );

            tabpanel.setActiveTab( tab );
        }
    }
},

showDetails: function(view ) {
    var record = view.record;
    var modules = view.modules;
    var tabpanel = view.up( 'tabpanel' );
    var me = this;

    if( view.securityLoading ) {
        Ext.Function.defer( me.showDetails, 500, me, arguments );
    } else {
        if( !tabpanel.down( 'EventSecurity' ) ) {
            var tab = tabpanel.add( Ext.widget( 'MasterWebDealerConfig', {
                record: view.record,
                modules: view.modules,
                security: view.security,
                url: view.url,
            }) );
            tabpanel.setActiveTab( tab );
        }
    }
},

initviewDetail: function(view ) {
    view.down( '#cantidadcuentas' ).setValue( view.security.CantidadCuentas );
    view.down( '#eliminarcuenta' ).setValue( view.security.ElimnarCuenta );
    view.down( '#cantidadoperadores' ).setValue( view.security.CantidadOperadores );
}
});