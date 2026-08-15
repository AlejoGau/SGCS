Ext.define( 'Trackguard.controller.VehicleController', {
    extend: 'Ext.app.Controller',
    stores: [ 'TrackGuardSecurityModuleStore' ],
models: [ 'VehicleSearchModel', 'VehicleModel', 'SoftguardCuentaModel', 'ModuleModel' ],
views: [ 'VehicleView', 'ModuleTreeView' ],

init: function(config ) {
    // genero los eventos
    this.control( {
        'vehicleview': {
            afterrender: this.initview
        }
    });
}, // cierro init

initview: function(view ) {
    var controller = this;
    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordTrackGuard = storeSecurity.findRecord( 'KeyReference', 'TrackguardMonitoreo' );
    var masterModule = storeSecurity.findRecord( 'KeyReference', 'MasterWebDealer' );
    var administratorModule = storeSecurity.findRecord( 'KeyReference', 'Administrator' );
    var _security = recordTrackGuard.get( 'Security' );

    var datos = view.down( '#west' );
    datos.record = view.record;

    /*if (_security) {
        var json = JSON.parse(_security);
        //console.log(json);

        if (masterModule.get('Available') || administratorModule.get('Available')) {
            var masterDealerModules = deepCloneStore(controller.getTrackGuardSecurityModuleStoreStore());
            var root = datos.getRootNode();
            masterDealerModules.each(function(_module){
                _module.set('profile', '3');
                root.appendChild(_module)
            })
        } else if (json && json.modules && json.modules.length>0){
            var modules = json.modules;
                datos.rights = json.rights;
                var root = datos.getRootNode();
                Ext.Array.each(modules,function(_module){
                    var model = controller.getModuleModelModel();
                    var node = Ext.create(model, _module);
                    if (_module.profile!='0')
                    root.appendChild(node)
                })
                
        } else {
            notifyError('Falta de derechos, configure el módulo.');
        }

    } else if (administratorModule.get('Available')) {
        var masterDealerModules = deepCloneStore(controller.getTrackGuardSecurityModuleStoreStore());
        var root = datos.getRootNode();
        masterDealerModules.each(function(_module){
            _module.set('profile', '3');
            root.appendChild(_module)
        })
    } else {
        notifyError('Falta de derechos, configure el módulo.');
    }*/
    if(isNaN(recordTrackGuard.id)){
        recordTrackGuard.id = 0;
        recordTrackGuard.data.Id = 0;
    }

    var url = '/Rest/Security/Modules/' + recordTrackGuard.get( 'ModuleId' ) + '/Security';
    var modules = deepCloneStore( SecurityModulesStore );
    console.log('url', url)
    modules.load( {
        callback: function() {
            var masterModule = modules.findRecord( 'KeyReference', 'MasterWebDealer' );
            var administratorModule = modules.findRecord( 'KeyReference', 'Administrator' );

            Ext.Ajax.request( {
                url: url,
                method: 'GET',
                success: function( resp, operation ) {
                    var json = resp.responseText ? JSON.parse( resp.responseText ) : null;
                    if( json && json.modules && json.modules.length > 0 ) {
                        var modules = json.modules;
                        datos.rights = json.rights;
                        var root = datos.getRootNode();
                        Ext.Array.each( modules, function( module ) {
                            var model = controller.getModuleModelModel();
                            var node = Ext.create( model, module );
                            if( module.profile != '0' )
                                root.appendChild( node )
                        })
                    } else if( masterModule.get( 'Available' ) || administratorModule.get( 'Available' ) ) {
                        var masterDealerModules = deepCloneStore( controller.getTrackGuardSecurityModuleStoreStore() );
                        var root = datos.getRootNode();
                        masterDealerModules.each( function( _module ) {
                            _module.set( 'profile', '3' );
                            root.appendChild( _module )
                        })
                    } else {
                        notifyError( 'Falta de derechos, configure el módulo.' )
                    }
                }
            });
        }
    })


    var record = view.record;
    view.searchRecord = view.record;

    if( record ) {
        this.openObjectById( record.get( 'Id' ), view );
    } else {
        this.openObjectById( 0, view );
    }
},

openObjectById: function(objectId, view ) {
    // var viewport = view;
    record = this.getVehicleModelModel();

    if( objectId == 0 ) {
        var now = new Date();
        var myobject = record.create( {
            Name: 'Nuevo vehículo',
            OwnerTypeId: 3001,
            Year: now.getFullYear(),
            OwnerId: view.cuenta.get( 'cue_iid' )
        });

        myobject.save( {
            scope: this,
            callback: function( record, operation ) {
                this.setRecord( record, view );
            }
        });
    }
    else {
        record.load( objectId, {
            callback: function( record, operation ) {
                if( operation.success ) {
                    this.setCuenta( record, view );
                }
            },
            scope: this
        });
    }
},
    
    
setRecord: function(record, view ) {
    var text = 'Datos del dispositivo';
    // Lo agregamos al panel
    var myPanel = view.down( 'tabpanel' );

    view.record = view.cuenta;

    // si el modulo es una view
    if( record.get( 'view' ) != '' ) {
        var myPanel = view.down( '#dmtab' )

        var posicionTab = Ext.widget( 'vehicleslavegpsview', {
            record: view.record,
            tabConfig: { translate: false },
            translate: false,
            targetTab: myPanel,
            cuenta: view.cuenta,
            searchRecord: view.searchRecord,
            title: 'Posición',
            closable: true,
            closeAction: 'destroy',
            caller: view.caller,
            autoDestroy: true
        });

        var newTab = Ext.widget( 'vehicleformview', {
            record: record,
            tabConfig: { translate: false },
            cuenta: view.cuenta,
            searchRecord: view.searchRecord,
            title: 'Dispositivo Móvil',
            closable: false,
            caller: view.caller
        });

    } // cierro if

    myPanel.add( newTab );

    // agrego la paleta creada
    if( view.openPosicion ) {
        myPanel.add( posicionTab );
        myPanel.setActiveTab( posicionTab );
    } else {
        myPanel.setActiveTab( newTab );
    }
},
    
/*onDeleteClick: function(button, event){
    var record = button.up('viewport').record;
    
    Ext.Msg.buttonText.yes = 'Sí';
    Ext.Msg.show({
        buttons: Ext.Msg.YESNO,
        titel: 'Eliminar',
        msg: 'Será borrado el dispositivo móvil ¿desea continuar?',
        icon: Ext.Msg.WARNING,
        fn: function(respuesta){
            if (respuesta == 'yes'){
                record.destroy({callback: function(record, operation){
                    if (operation.success){
                        var viewport = parent.Ext.getCmp('viewport')
                        var center = viewport.down('#center');
                        center.getActiveTab().close();
                        var paging = center.down('flotagridview').down('pagingtoolbar');
                
                        paging.moveFirst();
                        paging.doRefresh();
        
                    }
                }});
            }
        }
    });
},*/

setCuenta: function(vehicle, view ) {
    var viewport = view;
    var controller = this;

    var cuenta = this.getSoftguardCuentaModelModel();

    //var cuentaModel = this.getVehicleSearchModelModel();

    // si el vehiculo tiene cuenta la cargo
    var cuentaId = vehicle.get( 'OwnerId' );

    if( cuentaId ) {
        cuenta.load( cuentaId, {
            callback: function( record, operation ) {
                if( record ) {
                    view.cuenta = record;
                    this.setRecord( vehicle, view );
                } else {
                    console.log( 'no se pudo cargar la cuenta' );
                }
            },
            scope: this
        });

        /*
        var store =Ext.create('Ext.data.Store',{
            model: cuentaModel,
            remoteFilter: true,
            remoteSort: true
        }).load({callback:function(records) {
            view.cuenta = records[0];
            controller.setRecord(vehicle, view);
        }})
        */


    } else {// si no la creo
        viewport.cuenta = cuenta.create( {
            cue_dfechaalta: new Date(),
            cue_dservicio: new Date()
        });
        this.setRecord( vehicle, viewport.cuenta, view );
    }
}
});