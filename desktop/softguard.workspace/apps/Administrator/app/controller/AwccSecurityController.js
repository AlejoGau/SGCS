Ext.define( 'Administrator.controller.AwccSecurityController', {
    extend: 'Ext.app.Controller',
    stores: [ 'AWCCSecurityModulesStore', 'EventSecurityModuleStore', 'TablaLineasStore' ],
    models: [ 'w_usuariosModel', 'ModuleModel', 'TablasLineasSearchModel' ],
    views: [ 'AwccSecurityView', 'EventSecurityView', 'AwccSecuritySettingsView' ],
    init: function(config ) {
        // this.initConfig(config);
        // genero los eventos

        this.control( {
            'AwccSecuritySettingsView button[action=saveSecurity]': {
                click: this.onSaveSecurityClick
            },
            'AWCCSecurity': {
                afterrender: this.initview,
                objectchanged: this.onObjectChanged,
                beforeedit: function() {
                    console.log( arguments )
                }
            },
            'EventSecurity[moduleFlag=awcc]': {
                beforerender: this.initEventView
            },
            'EventSecurity[moduleFlag=awcc] button[action=saveEvent]': {
                click: this.onSaveEventClick
            },
            'AWCCSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'EventSecurity[moduleFlag=awcc] button[action=refreshModulesEvent]': {
                click: this.onRefreshModulesEventClick
            },
            'AWCCSecurity button[action=refreshModules]': {
                click: this.onRefreshModulesClick
            },
            'AWCCSecurity button[action=applyPerfil]': {
                click: this.onApplyPerfilClick
            },
            'EventSecurity[moduleFlag=awcc] button[action=applyPerfilEventos]': {
                click: this.onApplyPerfilModulosClick
            },
            'AwccSecuritySettingsView': {
                afterrender: this.initviewSettings,
            }
        });
    }, // administratormoduleformview
    initviewSettings: function (view ) {
        //var dealerStore = this.getTablaLineasStoreStore()

        var dealerStore = Ext.create( 'Ext.data.Store', {
            model: this.getTablasLineasSearchModelModel(),
            pageSize: 9999,
            remoteSort: true,
            remoteFilter: true
        })

        view.down( '#dealer' ).bindStore( dealerStore );
        dealerStore.load()

        var isAdmin = false;

        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordMaster = storeSecurity.findRecord( 'KeyReference', 'AWCC', 0, false, false, true )
        var recordAdmin = storeSecurity.findRecord( 'KeyReference', 'Administrator', 0, false, false, true )
        if( recordAdmin && recordAdmin.get( 'Available' ) == true ) {
            isAdmin = true;
        }
        if( recordMaster && recordMaster.get( 'Available' ) == true && !isAdmin ) {
            var securityMaster = recordMaster.get( '_Security' );
            if( securityMaster && securityMaster.rights ) {
                view.down( '#dealer' ).setValue( securityMaster.rights.dealer )
            }
            view.down( '#dealer' ).setDisabled( true )
        }
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
        this.limpiarEventosConMasterWebDealer( view )
    },
        
    onRefreshModulesClick: function(button, event, options ) {
        var view = button.up( 'AWCCSecurity' ) ? button.up( 'AWCCSecurity' ) : button;
        var gridstore = view.getStore();
        var store = this.getAWCCSecurityModulesStoreStore();
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
        var view = button.up( 'AWCCSecurity' );
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        var profile = view.down( '#comboPerfil' ).getValue();

        Ext.Array.each( selection, function( _module ) {
            _module.set( 'profile', profile );
        })
    },
        
    onApplyPerfilModulosClick: function(button, event, options ) {
        var view = button.up( 'EventSecurity' );
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();

        var profile = view.down( '#comboPerfilEventos' ).getValue();

        Ext.Array.each( selection, function( _module ) {
            _module.set( 'profile', profile );
        })
    },
        
    initEventView: function(view ) {
        var controller = this;
        var store = deepCloneStore( this.getEventSecurityModuleStoreStore() );
        var security = view.security;

        view.bindStore( store );

        if( security && security.event && security.event.length > 0 ) {
            store.loadData( Ext.Array.clone( security.event ) );
            if( security.event[ 0 ].Name == '' ) {
                controller.onRefreshModulesClick( view );
            }
        }

        this.limpiarEventosConMasterWebDealer( view )
    },
        
    limpiarEventosConMasterWebDealer: function (view ) {
        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var isAdmin = false;
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordMaster = storeSecurity.findRecord( 'KeyReference', 'AWCC', 0, false, false, true )
        var recordAdmin = storeSecurity.findRecord( 'KeyReference', 'Administrator', 0, false, false, true )
        if( recordAdmin && recordAdmin.get( 'Available' ) == true ) {
            isAdmin = true;
        }
        if( recordMaster && recordMaster.get( 'Available' ) == true && !isAdmin ) {
            var viewStore = view.getStore()
            var securityMaster = recordMaster.get( '_Security' );
            if( securityMaster && securityMaster.event ) {
                Ext.Array.each( securityMaster.event, function( v, k ) {
                    if( v.profile == 0 ) {
                        viewStore.remove( viewStore.findRecord( 'view', v.view ) )
                    }
                })
            } else {
                viewStore.removeAll()
            }
        }
    },
        
    onSaveEventClick: function(button, event, options ) {
        this.onSaveClick( button.up( 'tabpanel' ).down( 'AWCCSecurity' ) )
    },
        
    onSaveSecurityClick: function(button, event, options ) {
        this.onSaveClick( button.up( 'tabpanel' ).down( 'AWCCSecurity' ) )
    },
    
        
    onSaveClick: function(button, event, options ) {
        var me = this;
        var view = button.up( 'AWCCSecurity' ) ? button.up( 'AWCCSecurity' ) : button;
        var view = button.up( 'AWCCSecurity' ) ? button.up( 'AWCCSecurity' ) : button;
        var security = view.security;
        var record = view.record;
        var url = view.url;//+'/'+userId;
        var viewEvent = view.up( 'tabpanel' ).down( 'EventSecurity[moduleFlag=awcc]' );
        var viewRights = view.up( 'tabpanel' ).down( 'AwccSecuritySettingsView' );
        var modulesStore = view.getStore()
        var eventStore = viewEvent.getStore();

        security.event = Ext.pluck( eventStore.data.items, 'data' );
        security.modules = Ext.pluck( modulesStore.data.items, 'data' );
        security.rights = {
            dealer: viewRights.down( '#dealer' ).getValue()
        };

        var json = Ext.encode( security );

        Ext.Ajax.request( {
            url: url,
            method: 'PUT',
            params: json,
            success: function( resp, operation ) {
                me.initEventView( viewEvent );
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
        var controller = this;
        var tabpanel = view.up( 'tabpanel' )

        view.securityLoading = true;
        Ext.Ajax.request( {
            url: url,
            method: 'GET',
            success: function( resp, operation ) {
                if( resp.responseText )
                    var json = JSON.parse( resp.responseText );
                if( json )
                    security = json;

                Ext.Ajax.request( {
                    url: '/rest/t_parametros/',
                    params: { filter: '[{"property":"par_ccodigo", "value":"VERSIONAWCC"}]' },
                    method: 'GET',
                    scope: this,
                    success: function( response ) {
                        view.VERSIONAWCC = Ext.JSON.decode( response.responseText ).rows[ 0 ].par_ivalor;

                        if( view.VERSIONAWCC == '1' ) {

                            Ext.Array.each( tabpanel.items.items, function( i ) {
                                i.destroy()
                            })

                            tabpanel.add( {
                                xtype: 'panel',
                                layout: 'vbox',
                                title: 'Seguridad',
                                itemId: 'seguridadviejo',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Usuario',
                                        itemId: 'awccCombo',
                                        //multiselect: false,
                                        editable: true,
                                        typeAhead: true,
                                        queryMode: 'local',
                                        forceSelection: true,
                                        displayField: 'comboText',
                                        lastQuery: '',
                                        valueField: 'nombrelogin',
                                        width: '100%',
                                        margin: '5 5 5 5'
                                    }
                                ]
                            });

                            var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
                                items: [
                                    {
                                        iconCls: 'save',
                                        text: 'Guardar',
                                        scope: this,
                                        action: 'saveSecurity',
                                        VERSIONAWCC: 1, //atecion lo paso asi
                                        urlsecurity: url,
                                        handler: function( btn ) {
                                            var combo = tabpanel.down( '#awccCombo' );
                                            var value = combo.getValue();

                                            var json = Ext.encode( { Usuario: value });

                                            Ext.Ajax.request( {
                                                url: url,
                                                method: 'PUT',
                                                params: json,
                                                success: function( resp, operation ) {
                                                    notify( 'Los datos se guardaron con éxito' );
                                                }
                                            });

                                        }
                                    }]// cierro items
                            });

                            tabpanel.down( '#seguridadviejo' ).addDocked( toolbar );

                            var combo = tabpanel.down( '#awccCombo' );
                            var storeCombo = Ext.create( 'Ext.data.Store', {
                                pageSize: 10000,
                                model: me.getW_usuariosModelModel()
                            });

                            combo.bindStore( storeCombo );
                            storeCombo.load( {
                                callback: function() {
                                    combo.setValue( json.Usuario );
                                }
                            });
                        } else {
                            view.security = security;
                            view.securityLoading = false;
                            view.url = url;
                            me.setSecurity.call( me, view );
                            view.up( 'tabpanel' ).setActiveTab( view );
                            me.onRefreshModulesClick( view );
                        }
                    }
                });
            }
        })
    },
        
    limpiarSecurityConMasterWebDealer: function (view ) {
        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var isAdmin = false;
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordMaster = storeSecurity.findRecord( 'KeyReference', 'AWCC', 0, false, false, true )
        var recordAdmin = storeSecurity.findRecord( 'KeyReference', 'Administrator', 0, false, false, true )
        if( recordAdmin && recordAdmin.get( 'Available' ) == true ) {
            isAdmin = true;
        }
        if( recordMaster && recordMaster.get( 'Available' ) == true && !isAdmin ) {
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
        }
    },
        
    setSecurity: function(view ) {
        var security = view.security;
        var webdealerStore = this.getAWCCSecurityModulesStoreStore();
        // muestro la paleta de eventos
        this.showEventos( view );

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
                view.up( 'tabpanel' ).down( 'AwccSecuritySettingsView' ).down( '#dealer' ).setValue( security.rights.dealer )
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
                var tab = tabpanel.add( Ext.widget( 'EventSecurity', {
                    record: view.record,
                    modules: view.modules,
                    security: view.security,
                    url: view.url,
                    moduleFlag: 'awcc'
                }) );
                tabpanel.setActiveTab( tab );
            }
            if( !tabpanel.down( 'AwccSecuritySettingsView' ) ) {
                var tab = view.up( 'tabpanel' ).add( Ext.widget( 'AwccSecuritySettingsView', {
                    record: view.record,
                    title: 'Configuracion'
                }) );
                // tabpanel.setActiveTab(tab);
            }
        }
    },

    /*onSaveClick : function(button, event, options) {
        var view = button.up('AWCCSecurity');
        var me =this;
        var security = view.security;
        var record =  view.record;
        //var userId = record.get('Id');
        var store = view.getStore();
        var url = view.url;//+'/'+userId;
    //  var chkCreate = view.down('#chkCreate');
        var chkCopy = view.down('#chkCopy');
        var chkDelete = view.down('#chkDelete');
        var chkMulticuenta = view.down('#chkMulticuenta');
    //  var chkTiempoReal = view.down('#chkTiempoReal');
        var chkClaves = view.down('#chkClaves');
        var changeDealer = view.down('#changeDealer');
        var dealer = view.up('tabpanel').down('#dealer').getValue()
        
        
        security.modules = Ext.pluck(store.data.items, 'data');
        security.rights={
            copy: chkCopy.checked,
            delete: chkDelete.checked,
            multicuenta: chkMulticuenta.checked,
            claves: chkClaves.checked,
            changedealer: changeDealer.checked,
            dealer: dealer
        }
        
        
        
        var json = Ext.encode(security);
        //var json = Ext.encode(Ext.pluck(store.data.items, 'data'));
        
        Ext.Ajax.request({
        url: url,
        method: 'PUT',
        params: json,
        success: function(resp,operation) {
            me.initview(view);
            notify('Los datos se guardaron con éxito');
        }
        });
    }, 
    */

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
            Module: 'WebDealer'
        });
    }
});
