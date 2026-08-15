Ext.define('SgAppWebReport.controller.SgAppWebReportController', {
    extend: 'Ext.app.Controller',
    stores: [ 'WPModuleStoreNUEVO', 'WPSecurityModulesStore' ],
models: [ 'ModuleModel' ],
views: [ 'WPView', 'ExtUxNotification' ],

init: function(config ) {
    // genero los eventos
    this.control( {
        'wpview': {
            beforerender: this.initview
        },
        'wpview button[action=todos]': {
            click: this.onTodosClick
        },
        'wpview button[action=searchReport]': {
            click: this.onSearchClick
        },
    });
}, // cierro init


/* Funcion del boton de todos */
onTodosClick: function(button, event, eOps ) {
    var controller = this;
    var view = button.up('moduletreeview');
    var WPSecurityModulesStore = controller.getWPSecurityModulesStoreStore();
    var viewStore = view.getStore();

    WPSecurityModulesStore.clearFilter();
    /* Ejecuto la función de Filtrado del Store */
    controller.onFiltrarStore( view, controller, WPSecurityModulesStore, viewStore );

},
    
/* Funcion del boton de buscar */
onSearchClick: function(button, event, eOps ) {
    var controller = this;
    var view = button.up('moduletreeview');
    var WPSecurityModulesStore = controller.getWPSecurityModulesStoreStore();
    var viewStore = view.getStore();

    var textField = view.down('#query').getValue();

    /* Aplico los filtros el Store principal */
    WPSecurityModulesStore.filter( {
        property: 'text',
        value: textField,
        anyMatch: true,
        caseSensitive: false,
        id: 'text'
    });
    /* Ejecuto la función de Filtrado del Store */
    controller.onFiltrarStore( view, controller, WPSecurityModulesStore, viewStore );

},

    
    
/* Funcion de inicio de la App */
initview: function(view ) {
    var controller = this;
    var tabpanelView = view.down('tabpanel');
    var record = '';
    this.application._nameModule = 'SgAppWebReport';
    this.application._idModule = controller.application.getModuleIdByName( controller.application._nameModule );

    var me = this;

    // reemplazar este ajax por el modulo en el store
    var url = '/Rest/Security/Modules/' + controller.application._idModule + '/Security';
    var modulesStore = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
    var reserved = false;
    var readonly = view.readonly;

    // cargo la lista de modulos
    var datos = Ext.widget('moduletreeview', {
        store: Ext.getStore('WPModuleStoreNUEVO'),

        targetTab: view.down('#center'),
        preventHeader: true,
        record: '',
        rootVisible: false,
        bodyPadding: '0 0 5 0',
        collapsed: false,
        /* DESCOMENTAR PARA AGREGAR BUSCADOR - AL 17/5 SE QUITA DEBIDO A QUE
         * NO LOGRA INTEGRARSE CON EL GETLOCALE, DADO QUE EL TREESTORE TIENE Y EJECUTA
         * TODO SOLO EN ESPAÑOL EN EL FILTER Y EN LOS TEXT DE LOS ELEMENTOS.
         * VER CON MAYOR DETENIMIENTO
         
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype : 'textfield',
                    width : 200,
                    margin : '0 10px 0 0',
                    itemId: 'query',
                },{ 
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'searchReport' 
                },{ 
                    xtype: 'button',
                    text: 'Todos',
                    //iconCls: 'icon-find',
                    action: 'todos' 
                }
            ]
        }]
        */

    });
    var west = view.down('#west');
    west.setTitle( getLocale('Reportes') );
    /* Agrego al panel, el moduletreeview donde iran los reportes */
    west.insert( 0, datos );
    /* Clono el TreeStore con las carpetas principales 
    west.down('moduletreeview').setRootNode(deepCloneRoot(controller.getWPModuleStoreNUEVOStore().getRootNode())); */

    var masterModule = modulesStore.findRecord('KeyReference', 'MasterWebDealer');
    var administratorModule = modulesStore.findRecord('KeyReference', 'Administrator');
    var accountAdministrationModule = modulesStore.findRecord('KeyReference', 'SgAppAccountAdministration');
    var isMaster = masterModule ? masterModule.get('Available') : false;
    var isAdmin = administratorModule ? administratorModule.get('Available') : false;
    var isAccount = accountAdministrationModule ? accountAdministrationModule.get('Available') : false;
    var isAdminRights = false; //administrador con derechos

    // ajusto el admin para el caso de operador
    var cuentaModule;

    if( isAdmin && administratorModule.get('_Security') && administratorModule.get('_Security').rights && !administratorModule.get('_Security').rights.cuenta ) {
        masterDealerModules = deepCloneStore( controller.getWPSecurityModulesStoreStore() );
        var root = datos.getRootNode();
        //root.removeAll();
        var modulesArray = [];


        masterDealerModules.each( function( module2 ) {

            if( reserved || readonly ) {
                if( module2.get('text') != 'Situación')
                    module2.set('profile', 1 );
            } else {
                module2.set('profile', 3 );
            }

            if( module2.data.folder === 'cuentas') {
                root.childNodes[ 0 ].appendChild( module2 );
            } else if( module2.data.folder === 'eventos') {
                root.childNodes[ 1 ].appendChild( module2 );
            } else if( module2.data.folder === 'operadores') {
                root.childNodes[ 2 ].appendChild( module2 );
            } else if( module2.data.folder === 'tecnico') {
                root.childNodes[ 3 ].appendChild( module2 );
            } else if( module2.data.folder === 'vigicontrol') {
                root.childNodes[ 4 ].appendChild( module2 );
            } else if( module2.data.folder === 'crm') {
                root.childNodes[ 5 ].appendChild( module2 );
            } else if( module2.data.folder === 'sistema') {
                root.childNodes[ 6 ].appendChild( module2 );
            } else if( module2.data.folder === 'smartpanics') {
                root.childNodes[ 7 ].appendChild( module2 );
            } else if( module2.data.folder === 'trackguard') {
                root.childNodes[ 8 ].appendChild( module2 );
            } else if( module2.data.folder === 'cleanapp') {
                root.childNodes[ 9 ].appendChild( module2 );
            } else if( module2.data.folder === 'controlaccesos') {
                root.childNodes[ 10 ].appendChild( module2 );
            } else if( module2.data.folder === 'moneyguard') {
                root.childNodes[ 11 ].appendChild( module2 );
            } /** else if (module2.data.folder === 'redirector') {
                    root.childNodes[12].appendChild(module2);
                }*/ else {
                console.log('no tiene carpeta asignada', module2 )
            }

        })

        var order = false

        Ext.Array.each( root.childNodes, function( node, index ) {

            if( node.childNodes.length > 0 ) {
                order = true;
            } else {
                node.remove();
            }

        }, this, true );

        if( order ) {
            /* Por pedido de Marcos, se quita el expandir */
            //node.expand(true);
            var store = datos.getStore();
            store.sort('text', 'ASC');

            datos.record = record;
        }

        view.security = { modules: modulesArray };
        datos.security = view.security;

    } else {
        Ext.Ajax.request( {
            url: url,
            method: 'GET',
            success: function( resp, operation ) {
                var json = resp.responseText ? JSON.parse( resp.responseText ) : null;
                if( json ) {
                    var modules = json.modules;
                    datos.rights = json.rights;
                    view.rights = datos.rights;
                    view.security = json;
                    datos.security = view.security;
                    var root = datos.getRootNode();
                    console.log( root )

                    /* Chequeo sobre el Store WPModuleStore características de los reportes */
                    var masterDealerModules = deepCloneStore( controller.getWPSecurityModulesStoreStore() );

                    Ext.Array.each( modules, function( module ) {
                        if( module.profile != '0') {
                            masterDealerModules.each( function( module2 ) {

                                if( module.text === module2.data.text ) {
                                    if( module2.data.folder === 'cuentas') {
                                        root.childNodes[ 0 ].appendChild( module );
                                    } else if( module2.data.folder === 'eventos') {
                                        root.childNodes[ 1 ].appendChild( module );
                                    } else if( module2.data.folder === 'operadores') {
                                        root.childNodes[ 2 ].appendChild( module );
                                    } else if( module2.data.folder === 'tecnico') {
                                        root.childNodes[ 3 ].appendChild( module );
                                    } else if( module2.data.folder === 'vigicontrol') {
                                        root.childNodes[ 4 ].appendChild( module );
                                    } else if( module2.data.folder === 'crm') {
                                        root.childNodes[ 5 ].appendChild( module );
                                    } else if( module2.data.folder === 'sistema') {
                                        root.childNodes[ 6 ].appendChild( module );
                                    } else if( module2.data.folder === 'smartpanics') {
                                        root.childNodes[ 7 ].appendChild( module2 );
                                    } else if( module2.data.folder === 'trackguard') {
                                        root.childNodes[ 8 ].appendChild( module2 );
                                    } else if( module2.data.folder === 'cleanapp') {
                                        root.childNodes[ 9 ].appendChild( module2 );
                                    } else if( module2.data.folder === 'controlaccesos') {
                                        root.childNodes[ 10 ].appendChild( module2 );
                                    }/**  else if (module2.data.folder === 'moneyguard') {
                                        root.childNodes[11].appendChild(module2);
                                    }*/ else {
                                        console.log('no tiene carpeta asignada')
                                    }
                                }
                            })
                        }
                    });

                    /* FORZADO: "Reporte de Viajes" se inyecta siempre bajo TrackGuard,
                       sin importar lo que devuelva el server en json.modules.
                       Esto evita depender del alta del permiso server-side. */
                    var forzados = ['Reporte de Viajes'];
                    Ext.Array.each(forzados, function(textoForzado) {
                        var yaEsta = false;
                        var trackguardNode = root.childNodes[8];
                        if (trackguardNode && trackguardNode.childNodes) {
                            Ext.Array.each(trackguardNode.childNodes, function(child) {
                                if (child.data && child.data.text === textoForzado) {
                                    yaEsta = true;
                                }
                            });
                        }
                        if (!yaEsta && trackguardNode) {
                            masterDealerModules.each(function(module2) {
                                if (module2.data.text === textoForzado && module2.data.folder === 'trackguard') {
                                    trackguardNode.appendChild(module2);
                                }
                            });
                        }
                    });

                    var order = false

                    Ext.Array.each( root.childNodes, function( node, index ) {

                        if( node.childNodes.length > 0 ) {
                            order = true;
                        } else {
                            node.remove();
                        }

                    }, this, true );

                    if( order ) {
                        /* Por pedido de Marcos, se quita el expandir */
                        //node.expand(true);
                        var store = datos.getStore();
                        store.sort('text', 'ASC');
                    }

                    datos.record = record;

                } else {
                    masterDealerModules = deepCloneStore( controller.getWPSecurityModulesStoreStore() );
                    var root = datos.getRootNode();
                    console.log( root )
                    var modulesArray = [];
                    masterDealerModules.each( function( module2 ) {

                        if( module2.data.folder === 'cuentas') {
                            root.childNodes[ 0 ].appendChild( module2 );
                        } else if( module2.data.folder === 'eventos' && module2.data.profile == "" ) {
                            root.childNodes[ 1 ].appendChild( module2 );
                        } else if( module2.data.folder === 'operadores') {
                            root.childNodes[ 2 ].appendChild( module2 );
                        } else if( module2.data.folder === 'tecnico') {
                            root.childNodes[ 3 ].appendChild( module2 );
                        } else if( module2.data.folder === 'vigicontrol') {
                            root.childNodes[ 4 ].appendChild( module2 );
                        } else if( module2.data.folder === 'crm') {
                            root.childNodes[ 5 ].appendChild( module2 );
                        } else if( module2.data.folder === 'sistema') {
                            root.childNodes[ 6 ].appendChild( module2 );
                        } else if( module2.data.folder === 'smartpanics') {
                            root.childNodes[ 7 ].appendChild( module2 );
                        } else if( module2.data.folder === 'trackguard') {
                            root.childNodes[ 8 ].appendChild( module2 );
                        } else if( module2.data.folder === 'cleanapp') {
                            root.childNodes[ 9 ].appendChild( module2 );
                        } else if( module2.data.folder === 'controlaccesos') {
                            root.childNodes[ 10 ].appendChild( module2 );
                        }
                      /**  else if (module2.data.folder === 'moneyguard') {
                            root.childNodes[11].appendChild(module2);
                        }*/ else {
                            console.log('no tiene carpeta asignada')
                        }
                    })

                    var order = false;

                    Ext.Array.each( root.childNodes, function( node, index ) {

                        if( node.childNodes.length > 0 ) {
                            order = true;
                        } else {
                            node.remove();
                        }

                    }, this, true );

                    if( order ) {
                        /* Por pedido de Marcos, se quita el expandir */
                        //node.expand(true);
                        var store = datos.getStore();
                        store.sort('text', 'ASC');
                    }

                    view.security = { modules: modulesArray };

                }
            }
        });
    }

}
});