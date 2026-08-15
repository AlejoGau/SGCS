Ext.define( 'Administrator.controller.WebRemotoSecurityController', {
    extend: 'Ext.app.Controller',
    stores: [ 'EventoOrigenStore', 'EventoEstadoStore', 'EventoTipoStore', 'EventoPrioridadesStore', 'EventSecurityModuleMWRStore' ],
models: [ 'soperadoresSearchModel', 'MetadataWebremotoModel', 'TablasGruposSearchModel', 'ModuleModel', 'AdministratorModulesByUserModel' ],
views: [ 'AjustesOperadorMWRView', 'PreferenciasVisualesMWRView', 'ControlOperadorMWRView', 'LlamadasNotificacionesMWRView', 'EventosMWRView', 'WebRemotoSecurityView', 'EventSecurityMWRView', 'WebRemotoFiltrosView' ],

init: function(config ) {
    this.control( {
        'WebRemotoSecurity button[action=saveSecurity]': {
            click: this.onSaveClick
        },
        'WebRemotoFiltros button[action=saveSecurity]': {
            click: this.onSaveFiltrosClick
        },
        'WebRemotoFiltros button[action=selectall]': {
            click: this.onSelectAllClick
        },
        'WebRemotoFiltros #mostrar': {
            change: this.onMostrarChange
        },
        'WebRemotoFiltros #agregarevento': {
            click: this.onAgregarEventoClick
        },
        'WebRemotoFiltros': {
            selectedEvents: this.eventsSelected
        },
        'WebRemotoSecurity': {
            beforerender: this.initview
        },
        'EventSecurityMWR': {
            beforerender: this.initEventView
        },
        'AjustesOperadorMWRView': {
            beforerender: this.initAjusteOperadorView
        },
        'EventSecurityMWR button[action=saveEvent]': {
            click: this.onSaveEventClick
        },
        'EventSecurityMWR button[action=refreshModulesEvent]': {
            click: this.onRefreshModulesEventClick
        },
        'EventSecurityMWR button[action=applyPerfilEventos]': {
            click: this.onApplyPerfilEventClick
        },
        'EventosMWRView #procesarmultiple': {
            change: this.onProcesoMultipleChange
        },
        'EventosMWRView #procesarmultiplependientes': {
            change: this.onProcesoMultiplePendientesChange
        },
        'EventosMWRView #procesarmultipleproceso': {
            change: this.onProcesoMultipleProcesoChange
        },

        'AjustesOperadorMWRView #ajustesOperadorSave': {
            click: this.onSaveClick
        },
        'PreferenciasVisualesMWRView button[action=saveSecurity]': {
            click: this.onSaveClick
        },
        'ControlOperadorMWRView #controlOperadorSave': {
            click: this.onSaveClick
        },
        'LlamadasNotificacionesMWRView #llamdasNotificacionesSave': {
            click: this.onSaveClick
        },
        'EventosMWRView #eventosSave': {
            click: this.onSaveClick
        }
    });
}, // administratormoduleformview

onAgregarEventoClick: function (btn ) {
    var view = btn.up( 'WebRemotoFiltros' );
    var filter = [];

    var myWindow = Ext.widget( 'window', {
        title: 'Selector de eventos',
        height: 400,
        width: 900,
        //autoScroll: true,
        modal: true,
        items: [ {
            xtype: 'eventselecterhelperview',
            eventSelected: view.down( '#eventoshide' ).getValue(),
            caller: view,
            filter: filter
        }],
        layout: 'fit'
    }).show();

    myWindow.on( 'selectedEvents', function() {
        console.log( arguments )
    })
},

eventsSelected: function(records, view ) {
    var textarea = view.down( '#eventos' );
    var text = '';
    var arrayEventos = [];

    Ext.Array.each( records.items, function( record ) {
        text = text + record.get( 'Descripcion' ) + '\r\n';
        arrayEventos.push( record.get( 'cod_ccodigo' ) );
    })

    textarea.setValue( text );
    view.down( '#eventoshide' ).setValue( arrayEventos.join( ',' ) );
    view.record.set( 'filtroAlarmas', arrayEventos.join( ',' ) );
}, 
    
onProcesoMultipleProcesoChange: function (check, value ) {
    var view = check.up( 'EventosMWRView' )

    if( check.getValue() ) {
        view.down( '#procesartodosproceso' ).setDisabled( false )
        view.down( '#procesarporloteproceso' ).setDisabled( false )
    } else {
        view.down( '#procesartodosproceso' ).setValue( false )
        view.down( '#procesarporloteproceso' ).setValue( false )
        view.down( '#procesartodosproceso' ).setDisabled( true )
        view.down( '#procesarporloteproceso' ).setDisabled( true )
    }
},
    
onProcesoMultiplePendientesChange: function (check, value ) {
    var view = check.up( 'EventosMWRView' )

    if( check.getValue() ) {
        view.down( '#procesartodospendientes' ).setDisabled( false )
        view.down( '#procesarporlotependientes' ).setDisabled( false )
    } else {
        view.down( '#procesartodospendientes' ).setValue( false )
        view.down( '#procesarporlotependientes' ).setValue( false )
        view.down( '#procesartodospendientes' ).setDisabled( true )
        view.down( '#procesarporlotependientes' ).setDisabled( true )
    }
},
    
onProcesoMultipleChange: function (check, value ) {
    var view = check.up( 'EventosMWRView' )

    if( check.getValue() ) {
        view.down( '#procesartodos' ).setDisabled( false )
        view.down( '#procesarporlote' ).setDisabled( false )
    } else {
        view.down( '#procesartodos' ).setValue( false )
        view.down( '#procesarporlote' ).setValue( false )
        view.down( '#procesartodos' ).setDisabled( true )
        view.down( '#procesarporlote' ).setDisabled( true )
    }
},

onMostrarChange: function (combo, value ) {
    var view = combo.up( 'WebRemotoFiltros' )

    if( value == 'todos' ) {
        view.down( '#checks' ).hide();
        view.down( '#filtroAlarmas' ).hide();

        if( view.down( '#estado' ) ) {
            Ext.Array.each( view.down( '#estado' ).items.items, function( v, k ) {
                v.setValue( false )
            })
        }
        if( view.down( '#origen' ) ) {
            Ext.Array.each( view.down( '#origen' ).items.items, function( v, k ) {
                v.setValue( false )
            })
        }
        if( view.down( '#prioridad' ) ) {
            Ext.Array.each( view.down( '#prioridad' ).items.items, function( v, k ) {
                v.setValue( false )
            })
        }
        if( view.down( '#grupo' ) ) {
            Ext.Array.each( view.down( '#grupo' ).items.items, function( v, k ) {
                v.setValue( false )
            })
        }

    } else {
        view.down( '#checks' ).show();
        view.down( '#filtroAlarmas' ).show();
    }
},

initAjusteOperadorView: function(view ) {
    var combo = view.down( '#operadorCombo' );
},
    
initview: function(view ) {
    var record = view.record;
    var modules = view.modules;
    var moduleId = 2;
    var userName = record.get( 'Name' );
    var url = '/Rest/Security/Modules/' + moduleId + '/Security/' + userName;
    // var combo = view.down('#operadorCombo');
    view.url = url;
    var controller = this;
    var security = { modules: [], rights: [], event: [] };
    view.security = security;


    view.tabPanel = view.up( 'tabpanel' )
    if( !view.tabPanel.down( 'AjustesOperadorMWRView' ) ) {
        var tab = view.tabPanel.insert( 0, Ext.widget( 'AjustesOperadorMWRView', {
            /* record: view.record,
             modules: view.modules,
             security: view.security,
             hidden: true,
             url: view.url,
             moduleFlag:'webremoto'*/
        }) );


        var storeOperador = Ext.create( 'Ext.data.Store', {
            model: this.getSoperadoresSearchModelModel(),
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

        view.tabPanel.down( '#operadorCombo' ).bindStore( storeOperador );
        storeOperador.load();
        view.tabPanel.setActiveTab( tab )
    }

    if( !view.tabPanel.down( 'WebRemotoFiltros' ) ) {
        var tab = view.tabPanel.insert( 1, Ext.widget( 'WebRemotoFiltros', {
        }) );
    }

    if( !view.tabPanel.down( 'PreferenciasVisualesMWRView' ) ) {
        var tab = view.tabPanel.insert( 2, Ext.widget( 'PreferenciasVisualesMWRView', {
        }) );
    }

    if( !view.tabPanel.down( 'ControlOperadorMWRView' ) ) {
        var tab = view.tabPanel.insert( 3, Ext.widget( 'ControlOperadorMWRView', {
        }) );
    }

    if( !view.tabPanel.down( 'LlamadasNotificacionesMWRView' ) ) {
        var tab = view.tabPanel.insert( 4, Ext.widget( 'LlamadasNotificacionesMWRView', {
        }) );
    }

    if( !view.tabPanel.down( 'EventosMWRView' ) ) {
        var tab = view.tabPanel.insert( 5, Ext.widget( 'EventosMWRView', {
        }) );
    }

    view.metadata = this.getMetadataWebremotoModelModel()
    view.metadata.getProxy().url = url;
    var metadata = view.metadata;

    var me = this;

    metadata.load( 0, {
        callback: function( record ) {
            if( record ) {
                view.tabPanel.down( 'WebRemotoFiltros' ).record = record;

                if( record.get( 'Security' ) ) {
                    view.security = Ext.JSON.decode( record.get( 'Security' ) );
                }
                view.tabPanel.down( '#operadorCombo' ).setValue( record.get( 'Usuario' ) );

                // view.tabPanel.down('#atencionautomatica').setValue(record.get('AtenderAuto'));  

                if( record.get( 'AtenderAuto' ) == "true" ) {
                    view.tabPanel.down( '#modoatencionCombo' ).setValue( 'automatica' )
                }

                view.tabPanel.down( '#controloperador' ).setValue( record.get( 'ControlOperador' ) );
                view.tabPanel.down( '#enviosmsmasivo' ).setValue( record.get( 'EnvioSMSMasivo' ) );
                view.tabPanel.down( '#oredeneventos' ).setValue( record.get( 'eventOrder' ) );
                view.tabPanel.down( '#oredenprioridad' ).setValue( record.get( 'eventOrderPriority' ) );
                view.tabPanel.down( '#colaborador' ).setValue( record.get( 'colaborador' ) );
                view.tabPanel.down( '#enviosmssimple' ).setValue( record.get( 'EnvioSmsSimple' ) );
                view.tabPanel.down( '#generadoreventos' ).setValue( record.get( 'generadorEventos' ) );
                view.tabPanel.down( '#sineventosdeposicion' ).setValue( record.get( 'sineventosdeposicion' ) );
                view.tabPanel.down( '#grabarllamadasCombo' ).setValue( record.get( 'grabarLlamadasEntrantes' ) );
                view.tabPanel.down( '#supervision' ).setValue( record.get( 'supervision' ) );
                view.tabPanel.down( '#otrasorganizaciones' ).setValue( record.get( 'otrasorganizaciones' ) );
                view.tabPanel.down( '#asignaciones' ).setValue( record.get( 'asignaciones' ) );
                view.tabPanel.down( '#horaIngreso' ).setValue( record.get( 'horaIngreso' ) );

                /**
                 * BC 390361159 : Se agrega permiso de ver o no bitacora al atender evento
                 */
                view.tabPanel.down( '#bitacora' ).setValue( record.get( 'bitacora' ) );
                view.tabPanel.down( '#timeline' ).setValue( record.get( 'timeline' ) );
                view.tabPanel.down( '#notas' ).setValue( record.get( 'notas' ) );
                view.tabPanel.down( '#tareasVC' ).setValue( record.get( 'tareasVC' ) );
                view.tabPanel.down( '#comandos' ).setValue( record.get( 'comandos' ) );

                // NET2PHONE
                view.tabPanel.down( '#net2phone_extension' ).setValue( record.get( 'net2phone_extension' ) );
                view.tabPanel.down( '#net2phone_callerid' ).setValue( record.get( 'net2phone_callerid' ) );
                view.tabPanel.down( '#net2phone_callerid_name' ).setValue( record.get( 'net2phone_callerid_name' ) );
                view.tabPanel.down( '#net2phone_callerid_number' ).setValue( record.get( 'net2phone_callerid_number' ) );


                // WILDIX
                view.tabPanel.down( '#wildix_extension' ).setValue( record.get( 'wildix_extension' ) );
                view.tabPanel.down( '#wildix_password' ).setValue( record.get( 'wildix_password' ) );


                /*if(record.get('procesartodos') == null || record.get('procesartodos') == '') {
                    view.tabPanel.down('#procesartodos').setValue(true);
                } else {
                    view.tabPanel.down('#procesartodos').setValue(record.get('procesartodos'));
                }
                
                view.tabPanel.down('#procesarporlote').setValue(record.get('procesarporlote'));
                view.tabPanel.down('#procesarmultiple').setValue(record.get('procesarmultiple'));*/

                //pendientes
                view.tabPanel.down( '#procesartodospendientes' ).setValue( record.get( 'procesartodospendientes' ) );
                view.tabPanel.down( '#procesarporlotependientes' ).setValue( record.get( 'procesarporlotependientes' ) );
                view.tabPanel.down( '#procesarmultiplependientes' ).setValue( record.get( 'procesarmultiplependientes' ) );

                //atencion
                view.tabPanel.down( '#procesartodosproceso' ).setValue( record.get( 'procesartodosproceso' ) );
                view.tabPanel.down( '#procesarporloteproceso' ).setValue( record.get( 'procesarporloteproceso' ) );
                view.tabPanel.down( '#procesarmultipleproceso' ).setValue( record.get( 'procesarmultipleproceso' ) );

                // tiempo atención automática 
                var tiempoatencion = record.get( 'tiempoatencion' );
                if( tiempoatencion > 0 ) {
                    view.tabPanel.down( '#tiempoatencion' ).setValue( tiempoatencion );
                }

                //https://basecamp.com/2249105/projects/14758734/todos/417307087
                // mostrar informes
                view.tabPanel.down( '#informeLlamada' ).setValue( record.get( 'informeLlamada' ) );
                view.tabPanel.down( '#informeNotificaciones' ).setValue( record.get( 'informeNotificaciones' ) );
                view.tabPanel.down( '#informeMultimedia' ).setValue( record.get( 'informeMultimedia' ) );
                view.tabPanel.down( '#informeHistorico' ).setValue( record.get( 'informeHistorico' ) );
                view.tabPanel.down( '#informeSertec' ).setValue( record.get( 'informeSertec' ) );



                //compatibilidad para atras
                if( record.get( 'procesartodos' ) == 'true' ) {
                    view.tabPanel.down( '#procesarmultipleproceso' ).setValue( true );
                    view.tabPanel.down( '#procesarmultiplependientes' ).setValue( true );
                    view.tabPanel.down( '#procesartodospendientes' ).setValue( true );
                    view.tabPanel.down( '#procesartodosproceso' ).setValue( true );
                }

                if( record.get( 'procesarporlote' ) == 'true' ) {
                    view.tabPanel.down( '#procesarmultipleproceso' ).setValue( true );
                    view.tabPanel.down( '#procesarmultiplependientes' ).setValue( true );
                    view.tabPanel.down( '#procesarporloteproceso' ).setValue( true );
                    view.tabPanel.down( '#procesarporlotependientes' ).setValue( true );
                }

                if( view.tabPanel.down( '#procesarporlotependientes' ).getValue() == true || view.tabPanel.down( '#procesartodospendientes' ).getValue() == true ) {
                    view.tabPanel.down( '#procesarmultiplependientes' ).setValue( true );
                }

                if( view.tabPanel.down( '#procesarporloteproceso' ).getValue() == true || view.tabPanel.down( '#procesartodosproceso' ).getValue() == true ) {
                    view.tabPanel.down( '#procesarmultipleproceso' ).setValue( true );
                }

                if( record.get( 'rights' ) != '' ) {
                    var rights = Ext.JSON.decode( record.get( 'rights' ) )
                    view.tabPanel.down( '#claves' ).setValue( rights.claves );
                }

                if( record.get( 'sonido' ) != 'false' ) {
                    view.tabPanel.down( '#sonido' ).setValue( true );
                }

                //DS-589|adrianlara|22/03/2023 => agrego posibilidad para mutear
                if( record.get( 'nomutealarm' ) == 'true' ) {
                    view.tabPanel.down( '#nomutealarm' ).setValue( true );
                } else {
                    view.tabPanel.down( '#nomutealarm' ).setValue( false );
                }

                /**
                 * BC 390361159 : Se agrega permiso de ver o no bitacora al atender evento
                 * Al iniciar debe ser true si o si
                 */
                if( record.get( 'bitacora' ) != 'false' ) {
                    view.tabPanel.down( '#bitacora' ).setValue( true );
                }
                if( record.get( 'timeline' ) != 'false' ) {
                    view.tabPanel.down( '#timeline' ).setValue( true );
                } 
                view.tabPanel.down( '#notas' ).notas = record.get( 'notas' )
                if( record.get( 'notas' ) != 'false' ) {

                    view.tabPanel.down( '#notas' ).setValue( true );
                }
                // operador desde y hasta
                var horadesde = record.get( 'ControlOperadorHoraDesde' );
                var horahasta = record.get( 'ControlOperadorHoraHasta' );
                view.tabPanel.down( '#horadesde' ).setValue( horadesde.slice( 0, 2 ) + ":" + horadesde.slice( 2 ) );
                view.tabPanel.down( '#horahasta' ).setValue( horahasta.slice( 0, 2 ) + ":" + horahasta.slice( 2 ) );

                view.siptag = getParametro( "SIPPROTOCOLTAG" );
                //view.down('#sipprotocol').setValue(view.siptag)

                if( view.siptag != '' && view.siptag != '[]' ) {
                    var groupoProtocolos = Ext.create( 'Ext.form.CheckboxGroup', {
                        fieldLabel: getLocale( 'Protocolos' ),
                        itemId: 'protocolosgroup',
                        columns: 2,
                        vertical: true,
                    });

                    Ext.Array.each( Ext.JSON.decode( view.siptag ), function( r ) {
                        var checked = false;
                        try {
                            Ext.Array.each( Ext.JSON.decode( record.get( 'SIPPROTOCOLTAG' ) ), function( meta ) {
                                if( r.protocolo == meta.protocolo ) {
                                    checked = true;
                                }
                            })
                        } catch( e ) {
                            if( record.get( 'SIPPROTOCOLTAG' ) != '' ) {
                                if( r.protocolo == record.get( 'SIPPROTOCOLTAG' ) ) {
                                    checked = true;
                                }
                            }
                        }

                        var checkbox = Ext.create( 'Ext.form.field.Checkbox', {
                            boxLabel: getLocale( r.protocolo ),
                            name: 'protocolo',
                            inputValue: r.protocolo,
                            checked: checked
                        });

                        groupoProtocolos.add( checkbox );

                        // habilito net2phone
                        if( r.protocolo == 'Net2Phone' ) {
                            view.tabPanel.down( '#Net2Phone' ).show();
                        }
                        if( r.protocolo.toUpperCase() == 'WILDIX' ) {
                            view.tabPanel.down( '#Wildix' ).show();
                        }

                    })
                    view.tabPanel.down( '#protocolos' ).add( groupoProtocolos );
                } else {
                    var display = Ext.create( 'Ext.form.field.Display', {
                        fieldLabel: '',
                        value: getLocale( 'No hay protocolos configurados en los paramentros.' )
                    });
                    view.tabPanel.down( '#protocolos' ).add( display );
                }
            }

            var metadataEstado = [];
            var metadataOrigen = [];
            var metadataPrioridad = [];
            var metadataGrupo = [];
            var metadataOtros = [];

            if( record && record.get( 'Filtros' ) ) {
                var filtrosGuardados = Ext.JSON.decode( record.get( 'Filtros' ) );

                metadataEstado = filtrosGuardados.Estado;
                metadataOrigen = filtrosGuardados.Origen;
                metadataPrioridad = filtrosGuardados.Prioridad;
                metadataGrupo = filtrosGuardados.Grupo;
                metadataOtros = filtrosGuardados.Otros;

                view.tabPanel.down( '#eventoshide' ).setValue( filtrosGuardados.filtroAlarmas );
                view.tabPanel.down( '#eventos' ).setValue( filtrosGuardados.filtroAlarmasDesc );
            }

            //ORIGENES
            var eventoOrigenStore = Ext.getStore( 'EventoOrigenStore' );

            view.groupoOrigenes = Ext.create( 'Ext.form.CheckboxGroup', {
                fieldLabel: getLocale( 'Origen del evento' ),
                itemId: 'origen',
                columns: 2,
                vertical: true,
            });

            eventoOrigenStore.load( {
                callback: function( records ) {
                    Ext.Array.each( records, function( r ) {
                        var checked = false;
                        Ext.Array.each( metadataOrigen, function( meta ) {
                            if( r.get( 'Name' ) == meta.Name ) {
                                checked = true;
                            }
                        })

                        var checkbox = Ext.create( 'Ext.form.field.Checkbox', {
                            boxLabel: getLocale( r.get( 'Name' ) ),
                            name: r.get( 'Name' ),
                            inputValue: r.get( 'Value' ),
                            checked: checked
                        });
                        view.groupoOrigenes.add( checkbox );
                    })
                }
            })

            //ESTADO
            var eventoEstadoStore = Ext.getStore( 'EventoTipoStore' );

            view.groupoEstado = Ext.create( 'Ext.form.CheckboxGroup', {
                fieldLabel: getLocale( 'Condicion del codigo de alarma' ),
                itemId: 'estado',
                columns: 2,
                vertical: true,
            });

            eventoEstadoStore.load( {
                callback: function( records ) {
                    Ext.Array.each( records, function( r ) {
                        var checked = false;
                        Ext.Array.each( metadataEstado, function( meta ) {
                            if( r.get( 'Name' ) == meta.Name ) {
                                checked = true;
                            }
                        })

                        var checkbox = Ext.create( 'Ext.form.field.Checkbox', {
                            boxLabel: getLocale( r.get( 'Name' ) ),
                            name: r.get( 'Name' ),
                            inputValue: r.get( 'Value' ),
                            checked: checked
                        });

                        view.groupoEstado.add( checkbox );
                    })
                }
            })

            //PRIORIDADES
            var eventoPrioridadesStore = Ext.getStore( 'EventoPrioridadesStore' );

            view.groupoPrioridades = Ext.create( 'Ext.form.CheckboxGroup', {
                fieldLabel: getLocale( 'Prioridad del evento' ),
                itemId: 'prioridad',
                columns: 2,
                vertical: true,
            });

            eventoPrioridadesStore.load( {
                callback: function( records ) {
                    Ext.Array.each( records, function( r ) {
                        var checked = false;
                        Ext.Array.each( metadataPrioridad, function( meta ) {
                            if( r.get( 'Name' ) == meta.Name ) {
                                checked = true;
                            }
                        })

                        var checkbox = Ext.create( 'Ext.form.field.Checkbox', {
                            boxLabel: getLocale( r.get( 'Name' ) ),
                            name: r.get( 'Name' ),
                            inputValue: r.get( 'Value' ),
                            checked: checked
                        });

                        view.groupoPrioridades.add( checkbox );
                    })
                }
            })

            //GRUPO
            view.groupoGrupos = Ext.create( 'Ext.form.CheckboxGroup', {
                fieldLabel: getLocale( 'Grupos de codigos de alarma' ),
                itemId: 'grupo',
                columns: 2,
                vertical: true,
            });

            var combostore = Ext.create( 'Ext.data.Store', {
                model: controller.getTablasGruposSearchModelModel(),
                pageSize: 200,
                remoteSort: true
            });

            combostore.load( {
                callback: function( records ) {
                    Ext.Array.each( records, function( r ) {
                        var checked = false;
                        Ext.Array.each( metadataGrupo, function( meta ) {
                            if( r.get( 'gru_cdescripcion' ) == meta.Name ) {
                                checked = true;
                            }
                        })

                        var checkbox = Ext.create( 'Ext.form.field.Checkbox', {
                            boxLabel: r.get( 'gru_cdescripcion' ),
                            name: r.get( 'gru_cdescripcion' ),
                            inputValue: r.get( 'gru_ccodigo' ),
                            checked: checked
                        });

                        view.groupoGrupos.add( checkbox );
                    })
                }
            });

            var store = KeyModulesStore;//controller.getKeyModulesStoreStore();
            var moduleRecord = store.getModuleAvailable( 'Desktop' );

            if( moduleRecord ) {
                if( moduleRecord.get( 'WebMonRanges' ) == "Si" || store.getModuleAvailable( 'WebMonRanges' ) ) {
                    var checked = false;
                    Ext.Array.each( metadataOtros, function( meta ) {
                        if( 'porrango' == meta.Name ) {
                            checked = true;
                        }
                    })

                    var checkbox = Ext.create( 'Ext.form.field.Checkbox', {
                        boxLabel: getLocale( 'Visualizar eventos por rango' ),
                        name: 'porrango',
                        inputValue: 'porrango',
                        checked: checked,
                        boxLabelAlign: 'before',
                        itemId: 'porrango',
                        width: 300,
                        labelWidth: 250,
                    });

                    view.tabPanel.down( '#visualizacion' ).add( checkbox );
                }
            }

            me.setSecurity.call( me, view );

            if( record.get( 'mostrarFiltros' ) ) {
                view.up( 'tabpanel' ).down( 'WebRemotoFiltros' ).down( '#mostrar' ).setValue( record.get( 'mostrarFiltros' ) );
            } else {
                view.up( 'tabpanel' ).down( 'WebRemotoFiltros' ).down( '#mostrar' ).setValue( 'todos' );
            }
        }
    });
},

onSelectAllClick: function (btn ) {
    var view = btn.up( 'WebRemotoFiltros' )
    // console.log(Ext.query('checkbox'))

    Ext.Array.each( view.down( '#checks' ).items.items, function( item ) {
        Ext.Array.each( item.getBoxes(), function( check ) {
            check.setValue( true )
        })
    })
},

setSecurity: function(view ) {
    var security = view.security;
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

            //   view.bindStore(webdealerStore);
            var gridStore = view.up( 'tabpanel' ).down( 'EventSecurityMWR' ).getStore();
            Ext.Array.each( security.event, function( _module ) {
                var coincide = gridStore.findRecord( 'text', _module.text, 0, false, true, true );
                if( coincide ) {
                    coincide.set( 'profile', _module.profile )
                }
            });

            view.security = { modules: [], rights: [], event: [] };
        }

    } else {
        //   view.bindStore(webdealerStore);
    }
},
    
onSaveFiltrosClick: function(button, event, options ) {
    this.onSaveClick( button.up( 'tabpanel' ).down( 'WebRemotoSecurity' ) )
},
    
onSaveClick: function(button, event, options ) {
    var tabPanel = button.up( 'tabpanel' );
    var view = tabPanel.down( 'WebRemotoSecurity' ) ? tabPanel.down( 'WebRemotoSecurity' ) : button;
    var url = view.url;
    var model = view.metadata;
    var combo = tabPanel.down( 'AjustesOperadorMWRView' ).down( '#operadorCombo' );
    var value = combo.getValue();
    var store = combo.getStore();
    var operador = store.findRecord( 'ope_clogin', value );

    if( tabPanel.down( '#procesarmultiplependientes' ) && tabPanel.down( '#procesarmultiplependientes' ).getValue() == true ) {
        if( tabPanel.down( '#procesarporlotependientes' ).getValue() == false && tabPanel.down( '#procesartodospendientes' ).getValue() == false ) {
            notify( 'El proceso multiple de pendientes debe tener alguna opcion tildada.' )
            return false;
        }
    }

    if( tabPanel.down( '#procesarmultipleproceso' ) && tabPanel.down( '#procesarmultipleproceso' ).getValue() == true ) {
        if( tabPanel.down( '#procesarporloteproceso' ).getValue() == false && tabPanel.down( '#procesartodosproceso' ).getValue() == false ) {
            notify( 'El proceso multiple de proceso debe tener alguna opcion tildada.' )
            return false;
        }
    }

    var arrEstado = [];
    if( tabPanel.down( 'WebRemotoFiltros' ).down( '#estado' ) ) {
        Ext.Array.each( tabPanel.down( 'WebRemotoFiltros' ).down( '#estado' ).items.items, function( chk ) {
            if( chk.value == true ) {
                arrEstado.push( {
                    Name: chk.name,
                    Value: chk.inputValue
                })
            }
        })
    }

    var arrOrigen = [];
    if( tabPanel.down( 'WebRemotoFiltros' ).down( '#origen' ) ) {
        Ext.Array.each( tabPanel.down( 'WebRemotoFiltros' ).down( '#origen' ).items.items, function( chk ) {
            if( chk.value == true ) {
                arrOrigen.push( {
                    Name: chk.name,
                    Value: chk.inputValue
                })
            }
        })
    }

    var arrPrioridad = [];
    if( tabPanel.down( 'WebRemotoFiltros' ).down( '#prioridad' ) ) {
        Ext.Array.each( tabPanel.down( 'WebRemotoFiltros' ).down( '#prioridad' ).items.items, function( chk ) {
            if( chk.value == true ) {
                arrPrioridad.push( {
                    Name: chk.name,
                    Value: chk.inputValue
                })
            }
        })
    }

    var arrGrupo = [];
    if( tabPanel.down( 'WebRemotoFiltros' ).down( '#grupo' ) ) {
        Ext.Array.each( tabPanel.down( 'WebRemotoFiltros' ).down( '#grupo' ).items.items, function( chk ) {
            if( chk.value == true ) {
                arrGrupo.push( {
                    Name: chk.name,
                    Value: chk.inputValue
                })
            }
        })
    }

    var arrOtros = [];
    if( tabPanel.down( '#porrango' ) ) {
        if( tabPanel.down( '#porrango' ).getValue() == true ) {
            arrOtros.push( {
                Name: tabPanel.down( '#porrango' ).name,
                Value: tabPanel.down( '#porrango' ).inputValue
            })
        }
    }

    var arrProtocolos = [];
    if( tabPanel.down( '#protocolosgroup' ) ) {
        Ext.Array.each( tabPanel.down( '#protocolosgroup' ).getValue().protocolo, function( chk ) {
            arrProtocolos.push( {
                protocolo: chk
            })
        })
    }

    var viewEvent = tabPanel.down( 'EventSecurityMWR' );
    var store = viewEvent.getStore();
    view.security.event = Ext.pluck( store.data.items, 'data' );

    var atencionautomatica = false;
    if( tabPanel.down( '#modoatencionCombo' ).getValue() == 'automatica' ) {
        var atencionautomatica = true
    }

    // armo net2phone callerId
    var net2phone_callerid_name = view.tabPanel.down( '#net2phone_callerid_name' ).getValue();
    var net2phone_callerid_number = view.tabPanel.down( '#net2phone_callerid_number' ).getValue();
    var net2phone_callerid = net2phone_callerid_name + ' <' + net2phone_callerid_number + '>';

    var metadata = model.create( {
        Usuario: value,
        ope_iid: operador ? operador.get( 'ope_iid' ) : '',
        ControlOperador: tabPanel.down( '#controloperador' ).value,
        AtenderAuto: atencionautomatica,
        ControlOperadorHoraDesde: Ext.Date.format( tabPanel.down( '#horadesde' ).getValue(), 'Hi' ),
        ControlOperadorHoraHasta: Ext.Date.format( tabPanel.down( '#horahasta' ).getValue(), 'Hi' ),
        Filtros: Ext.encode( {
            Estado: arrEstado,
            Origen: arrOrigen,
            Prioridad: arrPrioridad,
            Grupo: arrGrupo,
            Otros: arrOtros,
            filtroAlarmas: tabPanel.down( '#eventoshide' ).getValue(),
            filtroAlarmasDesc: tabPanel.down( '#eventos' ).getValue()
        }),
        mostrarFiltros: tabPanel.down( 'WebRemotoFiltros' ).down( '#mostrar' ).getValue(),
        EnvioSMSMasivo: tabPanel.down( '#enviosmsmasivo' ).value,
        eventOrder: tabPanel.down( '#oredeneventos' ).value,
        eventOrderPriority: tabPanel.down( '#oredenprioridad' ).value,
        colaborador: tabPanel.down( '#colaborador' ).value,
        EnvioSmsSimple: tabPanel.down( '#enviosmssimple' ).value,
        Security: Ext.encode( view.security ),
        generadorEventos: tabPanel.down( '#generadoreventos' ).value,
        SIPPROTOCOLTAG: Ext.JSON.encode( arrProtocolos ), //view.down('#sipprotocol').value,
        rights: Ext.JSON.encode( {
            claves: tabPanel.down( '#claves' ).value
        }),
        grabarLlamadasEntrantes: tabPanel.down( '#grabarllamadasCombo' ).getValue(),
        sonido: tabPanel.down( '#sonido' ).getValue(),
        nomutealarm: tabPanel.down( '#nomutealarm' ).getValue(), //DS-589|adrianlara|22/03/2023 => agrego posibilidad para mutear
        sineventosdeposicion: tabPanel.down( '#sineventosdeposicion' ).getValue(),
        supervision: tabPanel.down( '#supervision' ).getValue(),
        otrasorganizaciones: tabPanel.down( '#otrasorganizaciones' ).getValue(),
        asignaciones: tabPanel.down( '#asignaciones' ).getValue(),
        horaIngreso: tabPanel.down('#horaIngreso').getValue(),

        // NET2PHONE
        net2phone_extension: view.tabPanel.down( '#net2phone_extension' ).getValue(),
        net2phone_callerid: net2phone_callerid,
        net2phone_callerid_name: net2phone_callerid_name,
        net2phone_callerid_number: net2phone_callerid_number,

        // WILDIX
        wildix_extension: view.tabPanel.down( '#wildix_extension' ).getValue(),
        wildix_password: view.tabPanel.down( '#wildix_password' ).getValue(),

        procesartodospendientes: tabPanel.down( '#procesartodospendientes' ).getValue(),
        procesarporlotependientes: tabPanel.down( '#procesarporlotependientes' ).getValue(),
        procesarmultiplependientes: tabPanel.down( '#procesarmultiplependientes' ).getValue(),

        procesartodosproceso: tabPanel.down( '#procesartodosproceso' ).getValue(),
        procesarporloteproceso: tabPanel.down( '#procesarporloteproceso' ).getValue(),
        procesarmultipleproceso: tabPanel.down( '#procesarmultipleproceso' ).getValue(),

        // mostrar informes
        informeLlamada: tabPanel.down( '#informeLlamada' ).getValue(),
        informeNotificaciones: tabPanel.down( '#informeNotificaciones' ).getValue(),
        informeMultimedia: tabPanel.down( '#informeMultimedia' ).getValue(),
        informeHistorico: tabPanel.down( '#informeHistorico' ).getValue(),
        informeSertec: tabPanel.down( '#informeSertec' ).getValue(),

        /**
         * BC 390361159 : Se agrega permiso de ver o no bitacora al atender evento
         */
        bitacora: tabPanel.down( '#bitacora' ).getValue(),
        timeline: tabPanel.down( '#timeline' ).getValue(),
        notas: tabPanel.down( '#notas' ).getValue(),
        tareasVC: tabPanel.down( '#tareasVC' ).getValue(),
        comandos: tabPanel.down( '#comandos' ).getValue(),

        // tiempo atención automática
        tiempoatencion: tabPanel.down( '#tiempoatencion' ).getValue()
    });
    var json = Ext.encode( metadata.data );

    Ext.Ajax.request( {
        url: url,
        method: 'PUT',
        params: json,
        success: function( resp, operation ) {
            notify( 'Los datos se guardaron con éxito' );
        }
    });
},
    
onSaveEventClick: function(button, event, options ) {
    var me = this;
    var view = button.up( 'EventSecurityMWR' );
    //   var viewParent = view.up('tabpanel').down('WebRemotoSecurity');
    // var security = view.security;
    //  var record =  view.record;

    // var store = view.getStore();
    // var url = view.url;//+'/'+userId;

    //viewParent.security.event = Ext.pluck(store.data.items, 'data');

    // var json = Ext.encode(view.security);
    //var json = Ext.encode(Ext.pluck(store.data.items, 'data'));
    // view.up('tabpanel').down('WebRemotoSecurity').security = json;
    this.onSaveClick( view.up( 'tabpanel' ).down( 'WebRemotoSecurity' ) )

},
    
initEventView: function(view ) {
    var store = view.getStore();
    var security = view.security;
    var id = view.record.get( 'Id' );

    if( security && security.event && security.event.length > 0 ) {
        store.removeAll()
        store.loadData( Ext.Array.clone( security.event ) );
    }


    //busco si el usuario tiene guardado WEBREMOTO
    var storeModules = Ext.create( 'Ext.data.Store', {
        model: this.getAdministratorModulesByUserModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true
    })

    storeModules.load( {
        ObjectId: id, callback: function( records ) {
            var mostrar = storeModules.findRecord( 'udm_key_reference', 'WebRemoto' )
            //SI el usaurio tiene webremoto muestro llamdas y llamdas posprocesado
            if( mostrar == null ) {
                store.remove( store.findRecord( 'view', 'llamadahelperview' ) );
                store.remove( store.findRecord( 'view', 'eventphonegridview' ) );
            }
        }
    });
},
    
showEventos: function(view ) {
    var record = view.record;
    var modules = view.modules;
    var tabpanel = view.up( 'tabpanel' );
    var me = this;

    if( view.securityLoading ) {
        Ext.Function.defer( me.showEventos, 500, me, arguments );
    } else {
        var checks = view.up( 'tabpanel' ).down( 'WebRemotoFiltros' ).down( '#checks' );
        checks.add( view.groupoPrioridades );
        checks.add( view.groupoOrigenes );
        checks.add( view.groupoEstado );
        checks.add( view.groupoGrupos );

        if( !tabpanel.down( 'EventSecurityMWR' ) ) {
            var tab = tabpanel.add( Ext.widget( 'EventSecurityMWR', {
                record: view.record,
                modules: view.modules,
                security: view.security,
                hidden: true,
                url: view.url,
                moduleFlag: 'dealersearch'
            }) );
        }
    }
},
    
onRefreshModulesEventClick: function(button, event, options ) {
    var view = button.up( 'EventSecurityMWR' ) ? button.up( 'EventSecurityMWR' ) : button;
    var gridstore = view.getStore();
    var store = this.getEventSecurityModuleMWRStoreStore();
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
    
onApplyPerfilEventClick: function(button, event, options ) {
    var view = button.up( 'EventSecurityMWR' );
    var selmodel = view.getSelectionModel();
    var selection = selmodel.getSelection();
    var profile = view.down( '#comboPerfilEventos' ).getValue();

    Ext.Array.each( selection, function( _module ) {
        _module.set( 'profile', profile );
    })
}
});