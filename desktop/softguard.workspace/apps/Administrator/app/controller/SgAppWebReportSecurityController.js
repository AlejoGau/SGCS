Ext.define( 'Administrator.controller.SgAppWebReportSecurityController', {
    extend: 'Ext.app.Controller',
    stores: [ 'WPModuleStoreNUEVO', 'WPSecurityModulesStore' ],
    models: [ '' ],
    views: [ 'WebReportSecurityView' ],

    init: function(config ) {
        // this.initConfig(config);
        // genero los eventos

        this.control( {
            'SgAppWebReportSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'SgAppWebReportSecurity': {
                beforerender: this.initview,
                objectchanged: this.onObjectChanged
            },
            'SgAppWebReportSecurity button[action=refreshModules]': {
                click: this.onRefreshModulesClick
            },
            'SgAppWebReportSecurity button[action=applyPerfil]': {
                click: this.onApplyPerfilClick
            }
        });
    }, 

    onRefreshModulesClick: function(button, event, options ) {
        var view = button.up( 'SgAppWebReportSecurity' ) ? button.up( 'SgAppWebReportSecurity' ) : button;
        var gridstore = view.getStore();
        var store = this.getWPSecurityModulesStoreStore();
        var cantidad = store.data.length - 1;

        store.each( function( pstore, i ) {
            gridstore.each( function( gstore ) {
                if( pstore.get( 'text' ) == gstore.get( 'text' ) ) {
                    var profile = gstore.get( 'profile' ) ? gstore.get( 'profile' ) : 1;
                    pstore.set( 'profile', profile );
                }
            }, this );
        }, this );
        view.bindStore( store );
        this.limpiarSecurityConMasterWebDealer(view)
    },
        
    onApplyPerfilClick: function(button, event, options ) {
        var view = button.up( 'SgAppWebReportSecurity' );
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        var profile = view.down( '#comboPerfil' ).getValue();

        Ext.Array.each( selection, function( _module ) {
            _module.set( 'profile', profile );
        })
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
        
    setSecurity: function(view ) {
        var security = view.security;
        var webreportStore = deepCloneStore( this.getWPSecurityModulesStoreStore() );

        // muestro la paleta de eventos
        // this.showEventos(view);

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
                view.bindStore( webreportStore );
                var gridStore = view.getStore();
                Ext.Array.each( security, function( _module ) {
                    var coincide = gridStore.findRecord( 'text', _module.text, 0, false, true, true );
                    if( coincide ) {
                        coincide.set( 'profile', _module.profile )
                    }
                });

                view.security = { modules: [], rights: [], event: [] };
            }
        } else {
            view.bindStore( webreportStore );
        }
    },

    limpiarSecurityConMasterWebDealer: function (view) {
        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordMaster = storeSecurity.findRecord('KeyReference', 'MasterWebDealer');
        var recordReport = storeSecurity.findRecord('KeyReference', 'SgappWebReport');
        if(recordMaster && recordMaster.get('Available') == true) {
            //console.log(recordMaster.get('_Security').modules)
            var viewStore = view.getStore()
            var securityMaster = recordReport.get('_Security');
            if(securityMaster && securityMaster.modules) {
                Ext.Array.each(securityMaster.modules, function (v,k) {
                    if(v.profile == 0) {
                        viewStore.remove(viewStore.findRecord('view', v.view))
                    }
                })
            } else {
                viewStore.removeAll()
            }
        }
    },

    onSaveClick: function(button, event, options ) {
        var view = button.up( 'SgAppWebReportSecurity' ) ? button.up( 'SgAppWebReportSecurity' ) : button;
        var me = this;
        var security = view.security;
        var record = view.record;
        //var userId = record.get('Id');
        var store = view.getStore();
        var url = view.url;//+'/'+userId;

        security.modules = Ext.pluck( store.data.items, 'data' );
        var json = Ext.encode( security );
        //var json = Ext.encode(Ext.pluck(store.data.items, 'data'));

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
        
    openFormWindow: function(title, record, grid ) {
        var newView = Ext.widget( 'administratormoduleformview', {
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
        
    onObjectChanged: function(event ) {
        var view = event.view;
        var store = view.getStore();

        // una vez que cargue el store hago el binding con la view
        store.load( {
            ObjectId: view.record.get( 'Id' ),
            Module: 'SgAppWebReportSecurity'
        });
    }
});