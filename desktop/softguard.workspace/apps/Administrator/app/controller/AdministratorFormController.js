//Ext.require(['Ext.ux.IFrame','Ext.ux.GMapPanel']);
Ext.define( 'Administrator.controller.AdministratorFormController', {
    extend: 'Ext.app.Controller',
    stores: [ 'SiNoStore', 'GrupoCuentaStore', 'OrganizationClientStore', 'LocalizationLanguageStore', 'ProvinciasStore' ],
    models: [ 'InstaladoresByTokenSearchModel', 'TablasLineasSearchModel', 'DesktopModulesAvailableByUserModel', 'EventosPendientesSearchModel', 'SmartMailProgramModel', 'soperadoresSearchModel', 'MetadataWebremotoModel', 'AdministratorSearchModel', 'AdministratorFormModel', 'GrupoCuentaSearchModel', 'GrupoCuentasModel', 'OrganizationModel', 'OrganizationSearchModel', 'AdministratorModulesByUserModel', 'ProvinciasModel' ],
    views: [ 'AdministratorFormView' ],

    init: function(config ) {
        this.control( {
            'administratorformview': {
                afterrender: this.initview,
                passwordchanged: this.onPasswordChanged,
                organizationchanged: this.onOrganizationChanged
            },
            'administratorformview button[action="save"]': {
                click: this.onSaveClick
            },
            'administratorformview button[action="passwordChange"]': {
                click: this.onPasschangeClick
            },
            'administratorformview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'administratorformview button[action="organizationChange"]': {
                click: this.onOrganizationChangeClick
            },
            'administratorformview button[action="createorganization"]': {
                click: this.onCreateOrganizationClick
            },
            'administratorformview button[action="cerrarsesion"]': {
                click: this.onCerrarSesionClick
            },
            'administratorformview button[action="enviardatos"]': {
                click: this.onEnviarDatosClick
            },
            'administratorformview #perfil': {
                change: this.onPerfilChange
            },
            'administratorformview #verperfil': {
                click: this.onVerPerfilClick
            },
            'administratorformview #btnconfigextraperfil': {
                click: this.onConfigExtraPerfilClick
            },
            'administratorformview #tipousuario': {
                change: this.onTipoUsuarioChange
            }
        });
    },
        
    onConfigExtraPerfilClick: function (btn ) {
        var view = btn.up( 'administratorformview' )
        console.log('aaaaa')
        this.onPerfilSaved( view )
    },

    onVerPerfilClick: function (btn ) {
        var view = btn.up( 'administratorformview' );
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Ver perfil',
            width: 700,
            height: 450,
            border: false,
            items: [
                Ext.create( 'Slbf.ux.IFrame', {
                    border: false,
                    itemId: 'iframeperfil'
                })
            ]
        });
        win.show();

        win.down( '#iframeperfil' ).setSrc( '/handler/HtmlUserModule?_dc=1495024081888&Filter=[{"property":"udw_idKey","value":' + view.record.get( 'Id' ) + '}]&perfil=true' )
    },
        
    onTipoUsuarioChange: function (field, values ) {
        var view = field.up( 'administratorformview' );
        if( view.up( 'administratorview' ).down( 'administratormodulesview' ) ) {
            view.up( 'administratorview' ).down( 'administratormodulesview' ).fireEvent( 'tiposuauriochange', view.up( 'administratorview' ).down( 'administratormodulesview' ), values )
        }
    },

    onPerfilChange: function (field, values, preventsave = false) {
        var view = field.up( 'administratorformview' );
        var administratorview = view.up( 'administratorview' );
        var modulesview = administratorview.down( 'administratormodulesview' );
        var tabpanel = administratorview.down( 'tabpanel' );
        var ranges = administratorview.down( 'rangedetail' );
        var controller = this;

        if( values ) {
            // valido el perfil
            tabpanel.setActiveTab( ranges );
            modulesview.tab.hide();
            view.down( '#btnconfigextraperfil' ).show()

            var storeModulosUsuario = Ext.create( 'Ext.data.Store', {
                model: this.getAdministratorModulesByUserModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true
            })
            var habilito = [];
            storeModulosUsuario.load({
                ObjectId: view.record.get( 'Id' ), callback: function( records ) {
                    Ext.Array.each( records, function( record, index, records ) {
                        Ext.Array.each( view.modulosExtraConfigPerfil, function( moduloconfigperfil ) {
                            console.log( 'udm_key_reference', record.get( 'udm_key_reference' ) )
                            if( record.get( 'udm_key_reference' ) == moduloconfigperfil.udm_key_reference ) {
                                                                
                                habilito.push( moduloconfigperfil )
                            }
                        })
                    })
                    if( habilito.length > 0 ) {
                        view.down( '#btnconfigextraperfil' ).show()
                    } else {
                        view.down( '#btnconfigextraperfil' ).show()
                    }
                   
                        controller.deshabilitarConfgExtraPerfil(values,view);

                }
            })
        } else {
            modulesview.tab.show();
            tabpanel.setActiveTab( modulesview );
            view.down( '#btnconfigextraperfil' ).show()
        }

        if( !view.inInit && !preventsave) {
            this.onSaveClick( field )
            notify( 'El perfil fue aplicado en el usuario' )
        } else {
            view.inInit = false;
        }
    },
        
    onEnviarDatosClick: function (btn ) {
        var view = btn.up( 'administratorformview' )
        var model = this.getSmartMailProgramModelModel();

        if( !view.down( '#nombre' ).getValue() &&
            !view.down( '#apellido' ).getValue() &&
            !view.down( '#password' ).getValue() &&
            !view.down( '#emailuser' ).getValue() &&
            !view.down( '#language' ).getValue() &&
            !view.down( '#provincia' ).getValue() &&
            !view.down( '#organizacion' ).getValue() ) {
            notify( 'Faltan datos para el envio' )
            return false;
        }

        Ext.Ajax.request( {
            url: '/handler/EnvioDatosUsuarioHTML',
            method: 'GET',
            scope: this,
            params: {
                id: view.record.get("Id"),
                nombre: view.down( '#nombre' ).getValue(),
                apellido: view.down( '#apellido' ).getValue(),
                clave: view.down( '#password' ).getValue(),
                email: view.down( '#emailuser' ).getValue(),
                idioma: view.down( '#language' ).getValue(),
                provincia: view.down( '#provincia' ).getRawValue(),
                organizacion: view.down( '#organizacion' ).getRawValue()
            },
            success: function( response ) {
                var smartMailModel = Ext.create( model, {
                    DateStart: new Date(),
                    Name: getLocale( ' del usuario' ),
                    Query: 'select strval as Email from dbo.ParseArray( \'' + view.down( '#emailuser' ).getValue() + '\',\',\')',
                    TransportType: 'MAIL',
                    RecurrentDateEnd: new Date( 1900, 1, 1 ),
                    DateEnd: new Date( 1900, 1, 1 ),
                    Body: response.responseText,
                    From: getParametro( 'MAILSENDER' ),
                    Status: 'A'
                }).save( {
                    callback: function() {
                        notify( 'El email esta siendo enviado.' )
                    }
                })
            }
        })
    },
        
    onCerrarSesionClick: function (btn ) {
        var view = btn.up( 'administratorformview' )
        var iframe = view.down( '#iframelogout' )
        var viewport = view.up( '#viewport' )
        var record = viewport.record;
        //console.log(record)

        Ext.Ajax.request( {
            url: '/handler/SessionsSearchHandler',
            method: 'GET',
            scope: this,
            success: function( response ) {
                var data = Ext.JSON.decode( response.responseText );
                Ext.Array.each( data, function( obj ) {
                    if( obj[ 'idKey' ] == record.get( 'udw_idKey' ) ) {
                        Ext.Ajax.request( {
                            url: '/handler/logout?token=' + obj[ 'AccessToken' ] + '&returnUrl=/handler/SessionHtml&_dc=',
                            method: 'GET',
                            scope: this,
                            success: function( response ) {
                                notify( 'Se elimino la sesion' )
                            }
                        })
                        return false;
                    }
                });
            }
        });
    },
        
    initview: function(view ) {
        console.log('aaaaaa')
        var viewport = view.up( '#viewport' )
        var record = viewport.record;
        var form = view.getForm();
        var field = form.findField( '_organization' );
        view.record = record;
        view.loadRecord( record );
        var controller = this;

        view.udw_tipo = myQueryString.filterByTipo;

        view.modulosExtraConfigPerfil = [
            { Id: 2, udm_key_reference: 'WebRemoto' },
            { Id: 3, udm_key_reference: 'SerTec' },
            { Id: 11, udm_key_reference: 'AWCC' },
            { Id: 42, udm_key_reference: 'WebRemotoMobile' }
            //tengo que agregar aqui el modulo que quiero que aparezca 
        ]

        //esto es para que no se guarde en el primer cambio el perfil
        view.inInit = true;

        if( record.get( 'Id' ) && view.perfiles != 1 ) {
            view.down( '#perfil' ).show();
            view.down( '#verperfil' ).show();
        }

        if( view.perfiles == 1 ) {
            var usuariosPerfilStore = Ext.create( 'Ext.data.Store', {
                model: 'Administrator' + '.model.AdministratorSearchModel',
                pageSize: 999,
                remoteSort: true,
                remoteFilter: true,
                remoteGroup: false,
                filters: [ {
                    property: 'udw_iperfil',
                    value: record.get( 'Id' )
                }],
                sorters: [
                    {
                        property: 'o.udw_idKey',
                        direction: 'ASC'
                    }
                ]
            }).load( {
                callback: function( records ) {
                    if( records.length > 0 ) {
                        view.down( '#delete' ).setDisabled( true )
                    }
                }
            })
        }

        // me fijo parametro USERREDUCIDO y cambio manejo de usuario y pswd
        view.USERREDUCIDO = getParametro( 'USERREDUCIDO' );
        if( view.USERREDUCIDO == 1 ) {
            Ext.apply( view.down( '#emailuser' ), { vtype: 'alphanum' });
            view.down( '#emailuser' ).isValid();
        }

        Ext.Ajax.request( {
            url: '/rest/security/UserData/' + record.get( 'Id' ) + '/MetaData',
            success: function( resp, operation ) {
                if( resp.responseText ) {
                    var metadata = Ext.JSON.decode( resp.responseText );
                    //console.log(metadata)
                    if( metadata ){{}
                        view.down( '#language' ).setValue( metadata.language );
                    }
                        
                    if( metadata.provincia ) {
                        view.down( '#provincia' ).setValue( metadata.provincia.id );
                    }
                    if( metadata.controlaIp ) {
                        view.down( '#_controlaIp' ).setValue( metadata.controlaIp );
                    }
                    view.metadata = metadata

                    view.resetOriginal();
                } else {
                    var idUsuarioLogeado = _UserData.udw_idKey;
                    // hace falta este AJAX? reemplazar por variable global?
                    Ext.Ajax.request( {
                        url: '/rest/security/UserData/' + idUsuarioLogeado + '/MetaData',
                        success: function( resp, operation ) {
                            if( resp.responseText ) {
                                var metadata = Ext.JSON.decode( resp.responseText );

                                if( metadata ) {
                                    view.down( '#language' ).setValue( metadata.language );
                                    view.down( '#provincia' ).setValue( metadata.provincia.id );
                                    view.metadata = metadata
                                    view.resetOriginal();
                                }
                            }
                        }
                    });
                }

                var store = view.down( '#tipousuario' ).getStore();
                if( _UserData.udw_tipo != 0 ) {
                    store.remove( store.findRecord( 'field1', 0 ) );
                }

                if( myQueryString.hidedealer ) {
                    store.remove( store.findRecord( 'field1', 1 ) );
                    view.down( '#tipousuario' ).setValue( 2 );
                }
            }
        });

        view.down( '#perfil' ).setValue( record.get( 'udw_iperfil' ) );

        // seteo la organizacion seleccionada
        var organizationId = parseInt( record.get( 'udw_empresa' ) );

        if( organizationId ) {
            var store = Ext.create( 'Ext.data.Store', {
                model: this.getOrganizationSearchModelModel(),
                remoteSort: true,
                filters: [ {
                    property: 'o.Id',
                    value: organizationId
                }],
                remoteFilter: true
            })

            store.load( {
                callback: function( records, operation, success ) {
                    if( success ) {
                        var record = records[ 0 ];
                        var user = view.record;

                        if( record ) {
                            field.setValue( record.get( 'Name' ) );
                            field.clearInvalid();

                        } else {
                            field.setValue( getLocale( 'No hay una organización asignada' ) );
                        }
                        view.resetOriginal();
                    }
                }
            });
        } else {
            field.setValue( getLocale( 'No hay una organización asignada' ) );
        }

        view.resetOriginal();

        if( view.perfiles ) {
            view.down( '#tipousuario' ).hide()
            view.down( '#clavecontainer' ).hide()
            view.down( '#organizacioncontainer' ).hide()
            view.down( '#provincia' ).hide()

            if( view.udw_tipo == 21 ) {
                view.down( '#emailuser' ).setFieldLabel( getLocale( 'Producto' ) );
                view.down( '#language' ).hide();
                view.down( '#_controlaIp' ).hide();
            } else {
                view.down( '#emailuser' ).setFieldLabel( getLocale( 'Perfil' ) );
            }
        }
        view.down( '#udw_estado' ).setValue( record.get( 'udw_estado' ));
        controller.definirFiltroPerfil( view, view.record )
    },
        
    definirFiltroPerfil: function (view ) {
        var idUsuarioLogeado = _UserData.udw_idKey;
        var _perfil = view.down( '#perfil' );
        var controller = this;

        _perfil.udw_idKey = idUsuarioLogeado;
        _perfil.filter = [];

        // busco los modulos disponibles para pasar como filtro

        var modulesAvailable = Ext.create( 'Ext.data.Store', {
            model: controller.getDesktopModulesAvailableByUserModelModel(),
            remoteSort: true,
            remoteFilter: true,
            sorters: [ {
                property: 'udm_modulo',
                direction: 'ASC'
            }],
            autoLoad: false
        });

        // 30/12/2019 JUAN : https://basecamp.com/2249105/projects/12939010/todos/404673943
        // Se adecúa el funcionamiento del INIT de la vista del formulario para que, si el usuario cuenta con el Modulo de Admin, el mismo no filtre los perfiles.
        // Ahora bien, si el usuario es Administrator y SOLO administra cuentas, solo podrá asignar los perfiles habilitados de él.

        /*
        var storeModulosUsuario = Ext.create( 'Ext.data.Store', {
            model: this.getAdministratorModulesByUserModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        var isAdmin = false;
        storeModulosUsuario.load( {
            ObjectId: view.record.get( 'Id' ),
            scope: this,
            callback: function( records, operation, success ) {
                //Leo los modulos que tienen asignados el usuario, si tiene Administrator no debo filtrar los perfiles
                Ext.Array.each( records, function( record, index, records ) {
                    Ext.Array.each( view.modulosExtraConfigPerfil, function( moduloconfigperfil ) {
                        if( record.get( 'udm_key_reference' ) == 'Administrator' ) {
                            isAdmin = true
                        }
                    })
                })
                controller.loadProfiles( isAdmin, modulesAvailable, _perfil, idUsuarioLogeado );
            }
        })
        */

        // Obtengo los modulos habilitados del usuario que determinan Seguridad.      
        var modulesStore = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
        var administratorModule = modulesStore.findRecord( 'KeyReference', 'Administrator' );

        // Armo los flags de habilitación segun perfil.
        var isAdmin = administratorModule ? administratorModule.get( 'Available' ) : false;
        var isNeededReadRights = false; // para la lectura de derechos del modulo segun App ejecutada, y asi ver si es SOLO ADMIN CUENTAS.

        // Reviso si tengo el modulo Administration pero con tilde de SOLO ADMIN CUENTAS.
        if( isAdmin ) {
            var security = administratorModule.get( 'Security' );
            var json;
            if( security && security != '' ) {
                json = Ext.JSON.decode( security );
            }
            // Caso en el cual se encuentra modulo Administrator habilitado y con el tilde de SOLO ADMIN CUENTAS.
            if( json && json.rights && json.modules && json.rights.cuenta ) {
                isNeededReadRights = true; // Habilito el flag de lectura de los permisos de las opciones de la vista.
                isAdmin = false; // Deshabilito el flag de Admin
            }
        }

        if( !isAdmin ) {
            // No soy Admin, debo solo filtrar perfiles que tengan mi mismo nivel de permisos
            controller.loadProfiles( isAdmin, modulesAvailable, _perfil, idUsuarioLogeado );
        }
    },

    loadProfiles: function(isAdmin, modulesAvailable, _perfil, idUsuarioLogeado ) {
        if( !isAdmin ) {
            modulesAvailable.load( {
                ObjectId: idUsuarioLogeado,
                callback: function( records ) {
                    var udm_key_reference = [];
                    Ext.Array.each( records, function( r ) {
                        console.log( r.get( 'udm_key_reference' ) );
                        udm_key_reference.push( r.get( 'udm_key_reference' ) )
                    });

                    _perfil.filter.push( {
                        property: 'modulesAvailable',
                        value: "'" + udm_key_reference.join( "','" ) + "'",
                        id: 'modulesAvailable'
                    })
                }
            });
        }

        var usuariologeado = this.getAdministratorFormModelModel().load( idUsuarioLogeado, {
            callback: function( usuarioData ) {
                var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
                var recordAdminsitrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' )
                if( recordAdminsitrator && recordAdminsitrator.get( 'Available' ) == true ) {
                    var _security = recordAdminsitrator.get( '_Security' );
                    //solo paso los derechos si no soy full admin
                    if( _security && _security.rights && _security.rights.cuenta == true && usuarioData.get( 'udw_iperfil' ) != 0 ) {
                        _perfil.filter.push( {
                            property: 'udw_idKey',
                            value: usuarioData.get( 'udw_iperfil' ),
                            id: 'udw_idKey'
                        });
                        _perfil.isAdminsCuenta = true;
                    } else {
                        _perfil.isAdminsCuenta = true;
                    }
                } else {
                    if( usuarioData.get( 'udw_iperfil' ) != 0 ) {
                        _perfil.filter.push( {
                            property: 'udw_idKey',
                            value: usuarioData.get( 'udw_iperfil' ),
                            id: 'udw_idKey'
                        })
                    } else {
                        _perfil.down( '#evento' ).hide()
                        _perfil.down( '#deleteEvent' ).hide()
                        if( !_perfil.down( '#codevento' ).getValue() ) {
                            _perfil.hide()
                        }
                    }
                }
            }
        })
    },

    deshabilitarConfgExtra: function(url,view){
        Ext.Ajax.request( { //3 es el módulo ServTec
            url: url,
            method: 'GET',
            success: function( resp, operation ) {
                if( resp.responseText ) {
                    var metadata = Ext.JSON.decode( resp.responseText );
                    
                    if( metadata.Supervisor ) {
                        view.down( '#perfil' ).down('#btnconfigextraperfil').show();
                    }
                }
            }
        });

    },

    deshabilitarConfgExtraPerfil: function (perfil,view){
        var controller = this;
        var url = '';
        var filter = [];
        if (perfil.data){
            url = '/Rest/Security/Modules/3/Security/'+perfil;
            controller.deshabilitarConfgExtra(url,view);
        }else{
            
            
                filter.push(
                    {
                        property: 'udw_idkey',
                        value: perfil
                    });
                Ext.Ajax.request( { //3 es el módulo ServTec
                    url:  '/Rest/search/DesktopUsersByAdmin',
                    method: 'GET',
                    params: {filter: Ext.encode( filter )},
                    success: function( resp, operation ) {
                        if( resp.responseText ) {
                            var metadata = Ext.JSON.decode( resp.responseText );
                            
                            if( metadata.rows.length>0 ) {
                                url = '/Rest/Security/Modules/3/Security/'+metadata.rows[0].udw_usuario;
                                controller.deshabilitarConfgExtra(url,view);    
                            }
                        }
                    }
                });
            
                                                    
        }




        
        
    },
        
    onPerfilSaved: function (view) {
        var controller = this;
        var storeModulosUsuario = Ext.create( 'Ext.data.Store', {
            model: this.getAdministratorModulesByUserModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        var habilito = [];
        storeModulosUsuario.load( {
            ObjectId: view.record.get( 'Id' ), callback: function( records ) {
                //leo los modulos que tienen asignados el usuario
                Ext.Array.each( records, function( record, index, records ) {
                    Ext.Array.each( view.modulosExtraConfigPerfil, function( moduloconfigperfil ) {
                        if( record.get( 'udm_key_reference' ) == moduloconfigperfil.udm_key_reference ) {
                            habilito.push( moduloconfigperfil );
                        }
                    })
                })

                //si tengo algun modulo para habilitar inicio el tab        
                if( habilito.length > 0 ) {
                    var newTab = Ext.widget( 'form', {
                        //title:'Configuracion',
                        itemId: 'configuracion',
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Webremoto',
                                hidden: true,
                                itemId: 'WebRemoto',
                                items: [
                                    {
                                        xtype: "combobox",
                                        fieldLabel: "Selección de operador",
                                        itemId: "operadorCombo",
                                        //multiselect: !1,
                                        editable: !1,
                                        queryMode: "local",
                                        forceSelection: !0,
                                        typeAhead: !1,
                                        displayField: "comboText",
                                        valueField: "ope_iid"
                                    }
                                ]
                            }, {
                                xtype: 'fieldset',
                                title: 'Servicio Tecnico',
                                hidden: true,
                                itemId: 'SerTec',
                                items: [
                                    {
                                        xtype: "combobox",
                                        fieldLabel: "Selección de tecnico",
                                        itemId: "instaladorCombo",
                                        //multiselect: !1,
                                        editable: !1,
                                        queryMode: "local",
                                        forceSelection: !0,
                                        typeAhead: !1,
                                        displayField: "ins_cnombre",
                                        valueField: "ins_ccodigo"
                                    }
                                ]
                            }, {
                                xtype: 'fieldset',
                                title: 'AWCC',
                                hidden: true,
                                itemId: 'AWCC',
                                items: [
                                    {
                                        xtype: 'combo',
                                        itemId: 'dealer',
                                        fieldLabel: 'Dealer',
                                        displayField: '_descripcion',
                                        queryMode: 'local',
                                        editable: false,
                                        valueField: 'lin_ccodigo'
                                    }
                                ]
                            },{       
                                xtype: 'fieldset',
                                title: 'WebRemote Mobile',
                                itemId: 'WebRemotoMobile',
                                hidden: true,
                                items:[
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Pin',
                                        itemId: 'pin',
                                        enforceMaxLength: true,
                                        maxLength: 6,
                                        minLength: 4,
                                        maskRe: /[0-9]/
                                    }
                                ]
                             }
                        ],
                        tbar: [ {
                            text: 'Guardar',
                            handler: function() {
                                console.log( arguments )
                                var win = this;
                                var cerrarWin=true;
                                Ext.Array.each( habilito, function( habilitoenform ) {
                                    if( habilitoenform.udm_key_reference == "SerTec" ) {
                                        var url = '/Rest/Security/Modules/3/Security/' + view.record.get( 'udw_usuario' );

                                        Ext.Ajax.request( {
                                            url: url,
                                            method: 'GET',
                                            params: Ext.encode( record.data ),
                                            success: function( resp, operation ) {
                                                if( resp.responseText ) {
                                                    var metadata = Ext.JSON.decode( resp.responseText );
                                                    if( metadata ) {
                                                        console.log( metadata )
                                                        
                                                        metadata.Instalador = win.up( 'form' ).down( '#instaladorCombo' ).getValue()
                                                        Ext.Ajax.request( {
                                                            url: url,
                                                            method: 'PUT',
                                                            params: Ext.encode( metadata ),
                                                            success: function( resp, operation ) {
                                                                if( resp.responseText ) {
                                                                    var metadata = Ext.JSON.decode( resp.responseText );
                                                                    if( metadata ) {
                                                                        console.log( metadata )
                                                                        notify( 'Se guardo la meta data extra' )
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        });
                                    } else if( habilitoenform.udm_key_reference == "WebRemoto" ) {
                                        var url = '/Rest/Security/Modules/2/Security/' + view.record.get( 'udw_usuario' );

                                        var metadata = controller.getMetadataWebremotoModelModel()
                                        metadata.getProxy().url = url

                                        metadata.load( 0, {
                                            callback: function( record ) {
                                                console.log( record )
                                                record.set( 'ope_iid', win.up( 'form' ).down( '#operadorCombo' ).getValue() )
                                                record.set( 'Usuario', win.up( 'form' ).down( '#operadorCombo' ).valueModels[ 0 ].get( 'ope_clogin' ) )
                                                Ext.Ajax.request( {
                                                    url: url,
                                                    method: 'PUT',
                                                    params: Ext.encode( record.data ),
                                                    success: function( resp, operation ) {
                                                        if( resp.responseText ) {
                                                            var metadata = Ext.JSON.decode( resp.responseText );
                                                            if( metadata ) {
                                                                console.log( metadata )
                                                                notify( 'Se guardo la meta data extra' )
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        })

                                    } else if( habilitoenform.udm_key_reference == "AWCC" ) {

                                        var url = '/Rest/Security/Modules/11/Security/' + view.record.get( 'udw_usuario' );
                                        Ext.Ajax.request( {
                                            url: url,
                                            method: 'GET',
                                            params: Ext.encode( record.data ),
                                            success: function( resp, operation ) {
                                                if( resp.responseText ) {
                                                    var metadata = Ext.JSON.decode( resp.responseText );
                                                    if( metadata ) {
                                                        console.log( metadata )
                                                        metadata.rights.dealer = win.up( 'form' ).down( '#dealer' ).getValue()
                                                        Ext.Ajax.request( {
                                                            url: url,
                                                            method: 'PUT',
                                                            params: Ext.encode( metadata ),
                                                            success: function( resp, operation ) {
                                                                if( resp.responseText ) {
                                                                    var metadata = Ext.JSON.decode( resp.responseText );
                                                                    if( metadata ) {
                                                                        console.log( metadata )
                                                                        notify( 'Se guardo la meta data extra' )
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        });
                                    } else if( habilitoenform.udm_key_reference == "WebRemotoMobile" ) {
                                        if(!win.up( 'form' ).isValid()){
                                            cerrarWin = false;
                                            return;
                                        }
                                        var url = '/Rest/Security/Modules/42/Security/' + view.record.get( 'udw_usuario' );
                                        Ext.Ajax.request( {
                                            url: url,
                                            method: 'GET',
                                            params: Ext.encode( record.data ),
                                            success: function( resp, operation ) {
                                                //if( resp.responseText ) {
                                                    var metadata = {};
                                                    metadata.pin = win.up('form').down('#pin').getValue();//Ext.JSON.decode( resp.responseText );
                                                    //if( metadata ) {
                                                        console.log( metadata )
                                                        //metadata.pin = win.up('form').down('#pin').getValue();
                                                        Ext.Ajax.request( {
                                                            url: url,
                                                            method: 'PUT',
                                                            params: Ext.encode( metadata ),
                                                            success: function( resp, operation ) {
                                                                if( resp.responseText ) {
                                                                    var metadata = Ext.JSON.decode( resp.responseText );
                                                                    if( metadata ) {
                                                                        console.log( metadata )
                                                                        notify( 'Se guardo la meta data extra' )
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    //}
                                                //}
                                            }
                                        });
                                    }
                                })
                                if(cerrarWin)
                                    this.up( 'window' ).hide()
                            }
                        }]
                    })

                    // agrego la paleta creada
                    // view.up('administratorview').down('tabpanel').add(newTab);
                    //view.up('administratorview').down('tabpanel').setActiveTab(newTab);

                    var win = Ext.create( 'Ext.Window', {
                        layout: 'fit',
                        title: 'Configuracion',
                        closeAction: 'hide',
                        caller: view,
                        fieldName: 'udw_clave',
                        modal: false,
                        width: 500,
                        height: 200,
                        border: false,
                        items: newTab
                    });
                    win.show();

                    var form = win

                    //habilito las parte del formulario
                    Ext.Array.each( habilito, function( habilitoenform ) {
                        form.down( '#' + habilitoenform.udm_key_reference ).show()
                        if( habilitoenform.udm_key_reference == 'WebRemoto' ) {
                            var url = '/Rest/Security/Modules/' + habilitoenform.Id + '/Security/' + view.record.get( 'udw_usuario' );
                            var metadata = controller.getMetadataWebremotoModelModel()
                            metadata.getProxy().url = url

                            metadata.load( 0, {
                                callback: function( record ) {
                                    console.log( record )
                                    form.down( '#operadorCombo' ).setValue( record.get( 'ope_iid' ) )
                                }
                            })
                        } else if( habilitoenform.udm_key_reference == 'SerTec' ) {

                            var url = '/Rest/Security/Modules/3/Security/' + view.record.get( 'udw_usuario' );

                            Ext.Ajax.request( {
                                url: url,
                                method: 'GET',
                                params: Ext.encode( record.data ),
                                success: function( resp, operation ) {
                                    if( resp.responseText ) {
                                        var metadata = Ext.JSON.decode( resp.responseText );
                                        if( metadata ) {
                                            console.log( metadata )
                                            form.down( '#instaladorCombo' ).setValue( metadata.Instalador )
                                        }
                                    }
                                }
                            });
                        } else if( habilitoenform.udm_key_reference == 'AWCC' ) {
                            var url = '/Rest/Security/Modules/11/Security/' + view.record.get( 'udw_usuario' );

                            Ext.Ajax.request( {
                                url: url,
                                method: 'GET',
                                params: Ext.encode( record.data ),
                                success: function( resp, operation ) {
                                    if( resp.responseText ) {
                                        var metadata = Ext.JSON.decode( resp.responseText );
                                        if( metadata ) {
                                            console.log( metadata )
                                            form.down( '#dealer' ).setValue( metadata.rights.dealer )
                                        }
                                    }
                                }
                            });
                        } else if( habilitoenform.udm_key_reference == 'WebRemotoMobile' ) {
                            var url = '/Rest/Security/Modules/42/Security/' + view.record.get( 'udw_usuario' );

                            Ext.Ajax.request( {
                                url: url,
                                method: 'GET',
                                params: Ext.encode( record.data ),
                                success: function( resp, operation ) {
                                    if( resp.responseText ) {
                                        var metadata = Ext.JSON.decode( resp.responseText );
                                        if( metadata ) {
                                            console.log( metadata )
                                            form.down( '#pin' ).setValue( metadata.pin )
                                        }
                                    }
                                }
                            });
                        } 
                    })

                    var combo = form.down( '#operadorCombo' );
                    var store = Ext.create( 'Ext.data.Store', {
                        model: controller.getSoperadoresSearchModelModel(),
                        remoteFilter: true,
                        pageSize: 10000,
                        sorters: [ {
                            property: 'ope_clogin',
                            direction: 'ASC'
                        }],
                        filters: [/*{
                            property: 'ope_nsupervisor',
                            value: "1"
                        }*/]
                    });

                    combo.bindStore( store );
                    store.load();

                    var comboTecnico = form.down( '#instaladorCombo' );
                    var store = Ext.create( 'Ext.data.Store', {
                        model: controller.getInstaladoresByTokenSearchModelModel(),
                        remoteFilter: true,
                        pageSize: 10000,
                        sorters: [ {
                            property: 'ins_cnombre',
                            direction: 'ASC'
                        }],
                        filters: [
                            {
                                property: 'ins_iTipo:ININT',
                                value: '1,2'
                            }
                        ]
                    });

                    comboTecnico.bindStore( store );
                    store.load();
                    var comboDealer = form.down( '#dealer' );
                    var store = Ext.create( 'Ext.data.Store', {
                        model: controller.getTablasLineasSearchModelModel(),
                        remoteFilter: true,
                        pageSize: 10000,
                        sorters: [ {
                            property: 'lin_ccodigo',
                            direction: 'ASC'
                        }]
                    });
                    comboDealer.bindStore( store );
                    store.load();
                }
            }
        });
    },
        
    onSaveClick: function(button, event, options ) {
        var view = button.up( 'administratorformview' );
        var _model = view.record;
        form = view.getForm();
        form.updateRecord( _model );
        var controller = this;
        var passFiled = view.down( '#password' );
        if( passFiled.getValue() == '' && !view.perfiles && view.USERREDUCIDO != 1 ) {
            passFiled.markInvalid( getLocale( 'Debe definir una clave.' ) );
            return false;
        } else {
            passFiled.clearInvalid();
        }
    
        var emailuser = view.down( '#emailuser' );
        if( !emailuser.isValid() ) {
            notify( 'El campo de usuario debe ser un email.' )
            return false;
        }
    
        if( _model.get( 'udw_empresa' ) == '' && !view.perfiles ) {
            form.findField( '_organization' ).markInvalid( getLocale( 'Debe seleccionar una organización' ) );
            notifyError( 'Debe seleccionar una organización' ); // no se ve el rojo invalid en los displayfield
        }
        else {
            form.findField( '_organization' ).clearInvalid();
            _model.set( 'udw_iperfil', view.down( '#perfil' ).getValue() )
            _model.save( {
                scope: this,
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Los datos se guardaron con éxito' );
                        view.up( 'administratorview' ).query( 'button' )[ 2 ].enable();
                        view.up( 'administratorview' ).down( 'administratormodulesview #addModulo' ).enable();
                        view.up( 'administratorview' ).down( 'administratormodulesview' ).getStore().load( { ObjectId: record.get( 'Id' ) });
                        
    
                        // Guardo la metadata
                        var json = Ext.encode( { controlaIp: view.down( '#_controlaIp' ).getValue(), language: view.down( '#language' ).getValue(), provincia: { nombre: view.down( '#provincia' ).getRawValue(), id: view.down( '#provincia' ).getValue() } });
    
                        // faltaba este ajax tuve que ir varias versiones atras para rescatarlo.
                        Ext.Ajax.request( {
                            url: "/rest/security/UserData/" + record.get( "Id" ) + "/MetaData",
                            method: "PUT",
                            params: json,
                            success: function() { }
                        }),
    
                            view.caller.fireEvent( 'userSaved', record, view.caller );
    
                        var id = view.record.get( 'Id' );
    
                        if( record.get( 'Id' ) && view.perfiles != 1 ) {
                            view.down( '#perfil' ).show();
                            //controller.deshabilitarConfgExtraPerfil(view.record.get('udw_usuario'),view);
                        }
                        view.record = record;
                        view.up( 'administratorview' ).down( '#rangegrid' ).store.removeAll(); //limpio lo que tiene em moemoria
                        if( view.up( 'administratorview' ).down( '#rangegrid' ).store.data.length <= 0 ) {
                            var store = Ext.create( 'Ext.data.Store', {
                                model: this.getAdministratorModulesByUserModelModel(),
                                pageSize: 50,
                                remoteSort: true,
                                remoteFilter: true
                            })
                            store.load( {
                                ObjectId: id, callback: function( records ) {
                                    var msg = true;
                                    Ext.Array.each( records, function( record, index, records ) {
                                        if( record.get( 'udm_key_reference' ) == "Administrator" ) {
                                            msg = false;
                                        }
                                    })
                                    if( msg ) {
                                        notify( 'Necesita rangos' );
                                    }
                                }
                            });
                            //si es cliente final o dealer obligo a tener un rango
                            if( view.down( '#tipousuario' ).getValue() == 1 || view.down( '#tipousuario' ).getValue() == 2 ) {
                                var rangeView = view.up( 'administratorview' ).down( '#rangegrid' );
                                view.up( 'administratorview' ).down( 'tabpanel' ).setActiveTab( rangeView )
                                //console.log(rangeView.getStore())
                                if( rangeView.getStore().data.length <= 0 ) {
                                    Ext.MessageBox.alert( 'Agregar rango', 'Para finalizar debe agregar un rango al usuario', function() {
                                        rangeView.down( 'button[action=rangoAdd]' ).fireEvent( 'click', rangeView.down( 'button[action=rangoAdd]' ) )
                                    });
                                }
                            }
                        }
                        // recalculo perfil
                        var _perfil = view.down( '#perfil' );
                        controller.onPerfilChange( _perfil, _perfil.getValue(), true );
                    }
                    else {
                        notifyError( 'Ya existe el usuario' );
                    }
                },
                button: button,
                view: view
            });
        }
    },  

    deleteObject: function(record ) {
        record.destroy();
    },      

    onPasschangeClick: function(button, event, options ) {
        var view = button.up( 'administratorformview' );
        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: 'Cambio de clave',
            closeAction: 'hide',
            caller: view,
            fieldName: 'udw_clave',
            modal: true,
            width: 300,
            height: 150,
            border: false,
            items: { xtype: 'passwordformview', hardpassword: true }
        });
        win.show();
    },
        
    isMasterWebDealer: function (callback ) {
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
        var masterModule = modules.findRecord( 'KeyReference', 'MasterWebDealer' );
        if( masterModule.get( 'KeyReference' ) == 'MasterWebDealer' && masterModule.get( 'Available' ) ) {
            callback( true );
        } else {
            callback( false );
        }
    },
        
    onOrganizationChangeClick: function(button, event, options ) {
        var view = button.up( 'administratorformview' );
        var controller = this;
        var filter = [];
        this.isMasterWebDealer( function( isMaster ) {
            if( isMaster ) {
                Ext.Ajax.request( {
                    url: '/rest/security/UserData',
                    success: function( resp, operation ) {
                        if( resp.responseText ) {
                            var metadata = Ext.JSON.decode( resp.responseText );
                            if( metadata ) {
                                var modules = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
                                var administratorModule = modules.findRecord( 'KeyReference', 'Administrator' );
                                if( !administratorModule.get( 'Available' ) ) {
                                    filter.push(
                                        {
                                            property: 'Organization:RelationParent',
                                            value: metadata.Company
                                        }
                                    );
                                }

                                var win = Ext.create( 'Ext.Window', {
                                    layout: 'fit',
                                    title: 'Seleccione una entidad',
                                    closeAction: 'destroy',
                                    caller: view,
                                    modal: true,
                                    width: 600,
                                    height: 400,
                                    border: false,
                                    items: {
                                        xtype: 'organizationhelperview',
                                        title: '',
                                        forceStatus: '7,8,9',
                                        hideTaxo: true,
                                        caller: view,
                                        filter: filter
                                    }
                                });
                                win.show();
                            }
                        }
                    }
                });
            } else {

                var win = Ext.create( 'Ext.Window', {
                    layout: 'fit',
                    title: 'Seleccione una entidad',
                    closeAction: 'destroy',
                    caller: view,
                    modal: true,
                    width: 600,
                    height: 400,
                    border: false,
                    items: {
                        xtype: 'organizationhelperview',
                        title: '',
                        forceStatus: '7,8,9',
                        hideTaxo: true,
                        caller: view,
                        filter: filter
                    }
                });
                win.show();
            }
        })
    },
        
    onDeleteClick: function(button, event, options ) {
        var myform = button.up( 'form' ).getForm();
        var record = myform.getRecord();
        var controller = this;
        var view = button.up( 'administratorformview' )

        Ext.Ajax.request( {
            url: '/Rest/Security/Modules/2/Security/' + record.get( 'Name' ),
            success: function( resp, operation ) {
                if( resp.responseText ) {
                    var metadata = Ext.JSON.decode( resp.responseText );
                    //vrifico si tiene eventos el operador
                    var filters = [];
                    filters.push( {
                        property: 'rec_ioperador',
                        value: metadata.ope_iid,
                        id: 'rec_ioperador'
                    })

                    Ext.create( 'Ext.data.Store', {
                        model: controller.getEventosPendientesSearchModelModel(),
                        remoteGroup: false,
                        remoteSort: true,
                        autoDestroy: true,
                        pageSize: 1000,
                        remoteFilter: true,
                        filters: filters
                    }).load( {
                        callback: function( records ) {
                            if( records.length > 0 ) {
                                notify( 'No es posible eliminar este usuario por que aun tiene eventos en atencion.' )
                                return false
                            }

                            Ext.Msg.buttonText.yes = 'Sí';
                            Ext.Msg.show( {
                                buttons: Ext.Msg.YESNO,
                                titel: 'Eliminar',
                                msg: getLocale( 'Se eliminará el usuario y su configuración ¿Desea continuar?' ),
                                icon: Ext.Msg.WARNING,
                                fn: function( respuesta ) {
                                    if( respuesta == 'yes' ) {
                                        record.destroy( {
                                            callback: function( record, operation ) {
                                                if( operation.success ) {
                                                    var viewport = parent.Ext.getCmp( 'viewport' )
                                                    var center = viewport.down( '#center' );
                                                    center.getActiveTab().close();
                                                    var paging = center.down( 'administratorsearchgridview' ).down( 'pagingtoolbar' );

                                                    paging.moveFirst();
                                                    paging.doRefresh();
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    })
                } else {
                    record.destroy( {
                        callback: function( record, operation ) {
                            if( operation.success ) {
                                var viewport = parent.Ext.getCmp( 'viewport' )
                                var center = viewport.down( '#center' );
                                center.getActiveTab().close();
                                var paging = center.down( 'administratorsearchgridview' ).down( 'pagingtoolbar' );
                                paging.moveFirst();
                                paging.doRefresh();
                            }
                        }
                    });
                }
            }
        })
    },
        
    onPasswordChanged: function(value, win ) {
        var fieldname = win.fieldName;
        var view = win.caller;
        view.record.set( fieldname, value );
        view.getForm().findField( fieldname ).setValue( value );
    },
        
    onOrganizationChanged: function(record, view ) {
        if( record ) {
            view.record.set( 'udw_empresa', record.get( 'Id' ).toString() );
            view.getForm().findField( '_organization' ).setValue( record.get( 'Name' ) );
        } else {
            view.record.set( 'udw_empresa', '' );
            view.getForm().findField( '_organization' ).setValue( '' );
        }
    },
        
    onCreateOrganizationClick: function(button, event, options ) {
        var view = button.up( 'administratorformview' );
        var me = this;
        model = this.getOrganizationModelModel();
        var record = model.create( {
            Name: getLocale( 'Nueva Organización' ),
            Status: 7
        });
        record.save( {
            callback: function( record, operation ) {
                if( operation.success )
                    // abro la organizacion para editar
                    var title = '(' + record.get( 'Id' ) + ') ' + record.get( 'Name' );

                var widget = 'organizationclientformview';

                var panel = Ext.widget( widget, {
                    iconCls: 'icon-Organization',
                    title: '',
                    targetTab: panel,
                    //objectId : record.get('Id'),
                    record: record,
                    overflowY: 'auto',
                    closable: false,
                    listeners: {
                        objectchanged: function( record ) {
                            me.onOrganizationChanged( record, view );
                        }
                    }
                });

                var win = Ext.widget( 'window', {
                    height: 500,
                    width: 500,
                    title: title,
                    layout: 'fit',
                    items: panel
                }).show();
            }
        });
    }
});