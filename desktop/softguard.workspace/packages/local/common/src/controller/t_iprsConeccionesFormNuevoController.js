//MIGRADO2024
Ext.define( 'Common.controller.t_iprsConeccionesFormNuevoController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'T_ReceptorProtocolModelDistinctSearchModel', 'TablasLineasSearchModel', 'TablasPortAliasSearchModel', 'TablasPortAliasModel', 'TablasModemsSmsSearchModel', 'IprServiciosModel', 't_iprsconeccionesModel', 'TablasIpConSearchModel', 'm_receptores_cabSearchModel', 'TablasIpConModel' ],
views: [ 't_iprsConeccionesFormNuevoView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        't_iprsconeccionesformnuevaview': {
            afterrender: this.initview
        },
        't_iprsconeccionesformnuevaview button[action="save"]': {
            click: this.onSaveClick
        }/*,
                't_iprsconeccionesformview #iprsc_ipcidkey' : {
                    select : this.onIprsc_ipcidkeySelect
                }*/,
        't_iprsconeccionesformnuevaview #ipc_ireceptor': {
            change: this.onIprsc_ipcidkeyChange
        },
        't_iprsconeccionesformnuevaview #receptores': {
            changeRecord: this.onReceptoresChange
        },
        't_iprsconeccionesformnuevaview #marcas': {
            change: this.onMarcasChange
        },
        't_iprsconeccionesformnuevaview combo[name="connectionMethod"]': {
            change: this.onComboConexionChange
        },
        't_iprsconeccionesformnuevaview button[action="configPuerto"]': {
            click: this.onConfigPuertoClick
        }
    });
}, 
        
onMarcasChange: function (combo, value ) {
    var view = combo.up( 't_iprsconeccionesformnuevaview' )
    view.down( '#receptores' ).setValue( '' )
    if( value == getLocale( 'Todos los receptores' ) ) {
        value = '';
    }
    view.storeReceptores.clearFilter( true )
    view.storeReceptores.filter( [
        {
            property: 'rpm_cMarca',
            value: value
        }, {
            property: 'rec_iEsIRS',
            value: 1
        }
    ] )
},
initview: function(view ) {
    var controller = this;
    var record = view.record;
    var items = [];
    view.maskLoading = Ext.create( 'Ext.LoadMask', view, {
        msg: getLocale( "Cargando" )
    }).show();
    var filters = []
    if( view.mode == 'SMS' ) {
        filters.push( {
            property: 'rpm_cModelo:LIKE',
            value: 'SMS'
        })
        view.down( '#modemsms' ).show()
        view.down( '#ipc_cresetxhb' ).hide()
        view.down( '#ipc_itiempoinactividad' ).hide()
    }
    var comboMarcas = view.down( '#marcas' );
    storeMarcas = Ext.create( 'Ext.data.Store', {
        // model: this.getReceptoresSearchModelModel(),
        model: controller.getT_ReceptorProtocolModelDistinctSearchModelModel(),
        pageSize: 1000,
        remoteSort: true,
        remoteFilter: false, // reemplazado Juan por issue Pablo
        filters: filters
    })
    comboMarcas.bindStore( storeMarcas );
    storeMarcas.load( {
        callback: function() {
            storeMarcas.add( {
                rpm_cMarca: getLocale( 'Todos los receptores' )
            })
            var comboReceptores = view.down( '#receptores' );
            view.storeReceptores = Ext.create( 'Ext.data.Store', {
                // model: this.getReceptoresSearchModelModel(),
                model: controller.getM_receptores_cabSearchModelModel(),
                pageSize: 1000,
                remoteSort: true,
                remoteFilter: true,
                filters: [ {
                    property: "rec_iEsIRS",
                    value: 1
                }],
                sorters: [ {
                    property: 'rec_cdescripcion', direction: 'ASC'
                }]
            })
            view.storeReceptores.load( {
                callback: function( records ) {
                    if( record.get( 'iprsc_ipcidkey' ) != 0 ) {
                        view.loadRecord( view.record );
                        controller.getTablasIpConModelModel().load( record.get( 'iprsc_ipcidkey' ), {
                            callback: function( record ) {
                                var config = Ext.JSON.decode( view.record.get( 'iprsc_config' ) )
                                if( config && config.marcaSelected && config.marcaSelected ) {
                                    comboMarcas.setValue( config.marcaSelected )
                                }
                                if( config && config.receptorSelected ) {
                                    view.storeReceptores.data.items.map( function( recordfind ) {
                                        recordfind.get( 'rec_iid' ) == record.get( 'ipc_ireceptor' ) && console.log( recordfind.data )
                                        if( recordfind.get( 'rec_iid' ) == record.get( 'ipc_ireceptor' )){
                                            //federico v. 15/12/2023 Modifico el parametro del if a rpm_idKey porque con rpm_cModelo mostraba dos receptores los cuales tenian el mismo modelo
                                            if( recordfind.get( 'rpm_idKey' ) == config.receptorSelected.rpm_idKey || !config.receptorSelected.rpm_idKey ) {
                                                comboReceptores.setValue( recordfind.get( 'rpm_idKey' ) );
                                                controller.onReceptoresChange( comboReceptores, recordfind );
                                            }
                                        }
                                    })
                                } else {
                                    // no tiene config nuevo seteo el receptor
                                    // no veo que el record tenga el valor receptores, comento porque da error 
                                    // dedalo 30/06/2023
                                    //var f = view.storeReceptores.findRecord( 'rec_iid', record.get( 'receptores' ) );
                                    // comboReceptores.setValue( record.get( 'receptores' ) ); // el selecter no tiene select
                                    //ontroller.onReceptoresChange(comboReceptores, record.get( 'receptores' ));
                                }
                                view.conectionRecord = record
                                view.down( '#ipc_nport' ).setValue( record.get( 'ipc_nport' ) );
                                view.down( '#ipc_nport' ).originalValue = record.get( 'ipc_nport' )
                                view.down( '#ipc_cdescripcion' ).setValue( record.get( 'ipc_cdescripcion' ) );
                                view.down( ' #ipc_ireceptor' ).setValue( record.get( 'ipc_ireceptor' ) );
                                view.down( '#ipc_itiempoinactividad' ).setValue( record.get( 'ipc_itiempoinactividad' ) );
                                view.down( '#ipc_cresetxhb' ).setValue( record.get( 'ipc_cresetxhb' ) );
                                view.down( '#modemsms' ).setValue( record.get( 'ipc_imodemsms' ) );
                                //cargo las asignaciones
                                if( record.get( 'iprsc_ipcidkey' ) != 0 ) {
                                    var storePorAlias = Ext.create( 'Ext.data.Store', {
                                        model: controller.getTablasPortAliasSearchModelModel(),
                                        pageSize: 500,
                                        remoteSort: true,
                                        remoteFilter: true,
                                        filters: [ {
                                            property: 'tpa_iportip',
                                            value: record.get( 'ipc_icodigo' )
                                        }]
                                    }).load( {
                                        callback: function( records ) {
                                            var arrDealers = Ext.Array.pluck( Ext.Array.pluck( records, 'data' ), 'tpa_cdealer' )
                                            view.down( '#dealer' ).setValue( arrDealers.join( ',' ) )
                                        }
                                    })
                                }
                                view.maskLoading.hide()
                            }
                        })
                    } else {
                        view.loadRecord( view.record );
                        comboMarcas.setValue( getLocale( 'Todos los receptores' ) )
                        view.maskLoading.hide()
                    }
                }
            });
        }
    })
    view.store = Ext.create( 'Ext.data.Store', {
        model: controller.getTablasModemsSmsSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters
    })
    view.down( '#modemsms' ).bindStore( view.store );
    view.store.load();
},
onReceptoresChange: function(selecter, record ) {
    var view = selecter.up( 't_iprsconeccionesformnuevaview' );
    var connectionMethod = view.down( '[name="connectionMethod"]' );
    view.receptorSelected = record;
    // llamar al método setConnection con los parámetros apropiados
    if( record.data ) {
        view.rec_iidSeleccionado = record.get( 'rec_iid' );
        // dedalo 06/09 guardo en el hidden del form para que se envie.
        view.down( '#ipc_ireceptor' ).setValue( view.rec_iidSeleccionado );
        this.setConnection( view, record );
    } //Daniel O. Medina, agrego este condicional porque el evento hace una segunda pasada y en record viene el string seleccionado
    // y provoca luego un error en setConnection porque no es un record
    // llamar al método onComboConexionChange si el campo de conexión está presente en la vista
    if( connectionMethod ) {
        this.onComboConexionChange( connectionMethod );
    }
},
onIprsc_ipcidkeyChange: function(field ) {
    var view = field.up( 't_iprsconeccionesformnuevaview' );
    // busco el combo de conexion y llamo al evento de cambio si es que esta hidden.
    var connectionMethod = view.down( '[name="connectionMethod"]' );
    if( connectionMethod ) {
        this.onComboConexionChange( connectionMethod );
    }
},   
        
onIprsc_ipcidkeySelect: function(combo, record, opts ) {
    var view = combo.up( 't_iprsconeccionesformnuevaview' );
    this.setConnection( view, record );
},
        
setConnection( view, record ){
    //agrego el form dinamico
    var items = [];
    var iprsc = view.record;
    // agrego los campos del receptor
    var rec_cConfig = record.get( 'rec_cConfig' );
    if( rec_cConfig && rec_cConfig != '' ) {
        // agrego los items del config
        var json = Ext.JSON.decode( rec_cConfig );
        items = json.items;
    }
    // agrego los campos del modelo
    var rpm_cConfig = record.get( 'rpm_cConfig' );
    if( rpm_cConfig && rpm_cConfig != '' ) {
        // agrego los items del config
        var json = Ext.JSON.decode( rpm_cConfig );
        Ext.Array.push( items, json.items );
    }
    var config = view.down( '#cconfig' );
    config.removeAll();
    config.add( items );
    var iprsc_config = iprsc.get( 'iprsc_config' );
    if( iprsc_config && iprsc_config != '' ) {
        var iprsc_configObj = Ext.JSON.decode( iprsc_config );
        var objValues = iprsc_configObj.formdata;
        for( var key in objValues ) {
            if( objValues.hasOwnProperty( key ) ) {
                console.log( key + " -> " + objValues[ key ] );
                var field = view.down( '[name="' + key + '"]' );
                if( field )
                    field.setValue( objValues[ key ] )
            }
        }
    }
    //iprsc.set('iprsc_config',Ext.JSON.encode(iprsc_config));
},
onSaveClick: function(button, event, options ) {
    var controller = this;
    var serialvalid = true;
    myform = button.up( 'form' ).getForm();
    view = button.up( 't_iprsconeccionesformnuevaview' );
    mymodel = myform.getRecord();
    // controlo configuracion puerto serial.
    // busco el tipo de conexionvar 
    var connectionMethod = view.down( '[name="connectionMethod"]' );
    if( connectionMethod && connectionMethod.getValue() == 'SERIAL' ) {
        // es serial me fijo que los datos no esten vacios
        var pue_nbaudrate = view.down( '#pue_nbaudrate' ).getValue();
        var pue_nparity = view.down( '#pue_nparity' ).getValue();
        var pue_ndatabits = view.down( '#pue_ndatabits' ).getValue();
        var pue_nstopbits = view.down( '#pue_nstopbits' ).getValue();
        var pue_nflowctrl = view.down( '#pue_nflowctrl' ).getValue();
        var pue_nbufferin = view.down( '#pue_nbufferin' ).getValue();
        var pue_nbufferout = view.down( '#pue_nbufferout' ).getValue();
        var pue_nrts = view.down( '#pue_nrts' ).getValue();
        var pue_ndtr = view.down( '#pue_ndtr' ).getValue();
        if( pue_nbaudrate == null || pue_nparity == null || pue_ndatabits == null || pue_nstopbits == null
            || pue_nflowctrl == null || pue_nbufferin == null || pue_nbufferout == null || pue_nrts == null || pue_ndtr == null ) {
            serialvalid = false;
            notifyError( 'El puerto serial debe estar configurado.' );
        }
    }
    if( myform.isValid() && serialvalid ) {
        if( mymodel.get( 'iprsc_ipcidkey' ) == 0 ) {
            view.conectionRecord = controller.getTablasIpConModelModel().create()
        }
        controller.forceSave( mymodel, myform );
    } else {
        notify( 'No se pudo guardar, verifique los datos.' )
    }
},
forceSave: function (mymodel, myform ) {
    var controller = this;
    myform.updateRecord( mymodel );
    var JsonForm = {};
    // tomo los valores del form y los cargo en formdata del linkdss
    var config = mymodel.get( 'iprsc_config' );
    if( config && config != "" ) {
        JsonForm = Ext.JSON.decode( config );
    }
    var data = myform.getValues();
    delete data.iprsc_config;
    delete data.iprsc_ipcidkey;
    delete data.iprsc_status;
    JsonForm.formdata = data;
    JsonForm.receptorSelected = view.receptorSelected.getData();
    JsonForm.marcaSelected = view.down( '#marcas' ).getValue();
    mymodel.set( 'iprsc_config', Ext.JSON.encode( JsonForm ) );
    mymodel.set( 'iprsc_lastserviceupdate', new Date() );
    Ext.Ajax.request( {
        url: '/handler/SearchPost?search=IPRSConeccionesUpdOrIns',
        method: 'POST',
        params: {
            Id: view.conectionRecord.get( 'Id' ),
            ipc_cdescripcion: view.down( '#ipc_cdescripcion' ).getValue(),
            ipc_cremotehostip: view.conectionRecord.get( 'ipc_cremotehostip' ),//revisar por que no se seta por UI
            ipc_cresetxhb: view.down( '#ipc_cresetxhb' ).getValue(),
            ipc_crespondeack: view.conectionRecord.get( 'ipc_crespondeack' ),//revisar por que no se seta por UI
            ipc_imodemsms: view.down( '#modemsms' ).getValue(),//revisar por que no se seta por UI
            ipc_ireceptor: view.down( '#ipc_ireceptor' ).getValue(),
            ipc_itiempoinactividad: view.down( '#ipc_itiempoinactividad' ).getValue(),
            ipc_nestado: view.conectionRecord.get( 'ipc_nestado' ), //revisar por que no se seta por UI
            ipc_nport: view.down( '#ipc_nport' ).getValue(),
            ipc_nprotocolo: view.conectionRecord.get( 'ipc_nprotocolo' ),//revisar por que no se seta por UI
            iprsc_ipcidkey: mymodel.get( 'iprsc_ipcidkey' ),
            iprsc_config: mymodel.get( 'iprsc_config' ),
            iprsc_iprsiid: mymodel.get( 'iprsc_iprsiid' ),
            iprsc_lastserviceupdate: mymodel.get( 'iprsc_lastserviceupdate' ),
            iprsc_status: mymodel.get( 'iprsc_status' ),
            iprsc_iDuplicado: mymodel.get( 'iprsc_iDuplicado' )
        },
        success: function( response ) {
            notify( 'Los datos se guardaron correctamente, es necesario reiniciar el servicio para que surjan efecto los cambios' );
            var response = Ext.JSON.decode( response.responseText )
            var ipc_icodigo = response.rows[ 0 ].ipc_icodigo
            //guardo asignaciones
            //if( view.down( '#dealer' ).getValue() != '' ) {
            var arrDealers = view.down( '#dealer' ).getValue().split( ',' )
            view.store = Ext.create( 'Ext.data.Store', {
                model: controller.getTablasPortAliasSearchModelModel(),
                pageSize: 500,
                remoteSort: true,
                remoteFilter: true,
                filters: [ {
                    property: 'tpa_iportip',
                    value: ipc_icodigo
                }]
            }).load( {
                callback: function( records ) {
                    var arrDealers = Ext.Array.pluck( Ext.Array.pluck( records, 'data' ), 'tpa_cdealer' )
                    var diffObj = diferenceArray( arrDealers, view.down( '#dealer' ).getValue().split( ',' ) )
                    console.log( diffObj )
                    //creo lo agregado
                    if( diffObj.added.length > 0 ) {
                        var recordstosave = [];
                        Ext.each( diffObj.added, function( dealer ) {
                            var _r = controller.getTablasPortAliasModelModel().create( {
                                tpa_iportip: ipc_icodigo,
                                tpa_cdealer: dealer
                            });
                            recordstosave.push( _r );
                        })
                        saveSync( recordstosave, function() { console.log( arguments ) }, 0 );
                    }
                    //elimino lo descartado
                    if( diffObj.deleted.length > 0 ) {
                        Ext.each( diffObj.deleted, function( dealer ) {
                            //traigo el objeto
                            var store = Ext.create( 'Ext.data.Store', {
                                model: controller.getTablasPortAliasSearchModelModel(),
                                pageSize: 500,
                                remoteSort: true,
                                remoteFilter: true,
                                filters: [
                                    {
                                        property: 'tpa_iportip',
                                        value: ipc_icodigo
                                    }, {
                                        property: 'tpa_cdealer',
                                        value: dealer
                                    }
                                ]
                            }).load( {
                                callback: function( records ) {
                                    var record = records[ 0 ]
                                    //elimino

                                    record.setConfig({
                                        proxy: controller.getTablasPortAliasModelModel().getProxy()
                                    });

                                    record.destroy()
                                }
                            })
                        })
                    }
                    if( view.caller ) {
                        view.caller.fireEvent( 'refresh', view.caller )
                    }
                    view.up( 'window' ).hide()
                }
            })
            //} 
        }
    });
},
/**
 * BC 353975531 : El elemento combo viene de la metadata guardada en T_ReceptorProtocolModel
 * Al seleccionarse y elegir Serial, debe mostrar el boton de configurar Puerto y abrir una Window
 * Esta window corresponde a la view 
 */
onComboConexionChange: function (button, e, eOpts ) {
    var controller = this;
    var view = button.up( 't_iprsconeccionesformnuevaview' );
    if( !view ) {
        console.log( 'error al encontrar la view' );
        console.log( button );
        return;
    }
    var configPuerto = view.down( '#configPuerto' );
    if( button.getValue() == 'SERIAL' ) {
        if( !configPuerto ) {
            var config = view.down( '#cconfig' );
            config.add( {
                xtype: 'button',
                text: 'Configurar puerto',
                iconCls: 'icon-cog',
                action: 'configPuerto',
                itemId: 'configPuerto'
            },
                // campos hidden con la configuracion de puerto, la window guarda los datos aca.
                {
                    xtype: 'combo',
                    fieldLabel: 'Baudios',
                    name: 'pue_nbaudrate',
                    itemId: 'pue_nbaudrate',
                    hidden: true,
                    store: [
                        [ 1, '300' ],
                        [ 2, '600' ],
                        [ 3, '1200' ],
                        [ 4, '2400' ],
                        [ 5, '4800' ],
                        [ 6, '9600' ],
                        [ 7, '19200' ],
                        [ 8, '38400' ],
                        [ 9, '115200' ],
                    ],
                    labelWidth: 100
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Paridad',
                    name: 'pue_nparity',
                    itemId: 'pue_nparity',
                    hidden: true,
                    store: [
                        [ 1, getLocale( 'Ninguna' ) ],
                        [ 2, getLocale( 'Par' ) ],
                        [ 3, getLocale( 'Impar' ) ]
                    ],
                    labelWidth: 100,
                    margin: '0 0 5 30'
                }, {
                    xtype: 'numberfield',
                    name: 'pue_ndatabits',
                    itemId: 'pue_ndatabits',
                    fieldLabel: 'Bit de datos',
                    minValue: 0,
                    maxValue: 9,
                    labelWidth: 100,
                    hidden: true,
                }, {
                    xtype: 'numberfield',
                    name: 'pue_nstopbits',
                    itemId: 'pue_nstopbits',
                    fieldLabel: 'Bit de parada',
                    minValue: 1,
                    maxValue: 8,
                    labelWidth: 100,
                    margin: '0 0 5 30',
                    hidden: true,
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Control de flujo',
                    name: 'pue_nflowctrl',
                    itemId: 'pue_nflowctrl',
                    store: [
                        [ 0, getLocale( 'Ninguna' ) ],
                        [ 1, getLocale( 'Xor/Xoff' ) ],
                        [ 2, getLocale( 'Hardware' ) ]
                    ],
                    labelWidth: 100,
                    hidden: true,
                }, {
                    xtype: 'numberfield',
                    name: 'pue_nbufferin',
                    itemId: 'pue_nbufferin',
                    fieldLabel: 'Buffer entrada',
                    minValue: 1,
                    maxValue: 9999,
                    labelWidth: 100,
                    hidden: true,
                }, {
                    xtype: 'numberfield',
                    name: 'pue_nbufferout',
                    itemId: 'pue_nbufferout',
                    fieldLabel: 'Buffer de salida',
                    minValue: 1,
                    maxValue: 9999,
                    labelWidth: 100,
                    margin: '0 0 5 30',
                    hidden: true,
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Habilitar rts',
                    name: 'pue_nrts',
                    itemId: 'pue_nrts',
                    store: [
                        [ 1, getLocale( 'Si' ) ],
                        [ 2, getLocale( 'No' ) ],
                    ],
                    labelWidth: 100,
                    hidden: true,
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Habilitar dtr',
                    name: 'pue_ndtr',
                    itemId: 'pue_ndtr',
                    store: [
                        [ 1, getLocale( 'Si' ) ],
                        [ 2, getLocale( 'No' ) ],
                    ],
                    labelWidth: 100,
                    margin: '0 0 5 30',
                    hidden: true,
                }
            );
            var record = view.record;
            var iprsc_config = record.get( 'iprsc_config' );
            var formdata = Ext.JSON.decode( iprsc_config );
            view.down( '#pue_nbaudrate' ).setValue( formdata.formdata.pue_nbaudrate );
            view.down( '#pue_nparity' ).setValue( formdata.formdata.pue_nparity );
            view.down( '#pue_ndatabits' ).setValue( formdata.formdata.pue_ndatabits );
            view.down( '#pue_nstopbits' ).setValue( formdata.formdata.pue_nstopbits );
            view.down( '#pue_nflowctrl' ).setValue( formdata.formdata.pue_nflowctrl );
            view.down( '#pue_nbufferin' ).setValue( formdata.formdata.pue_nbufferin );
            view.down( '#pue_nbufferout' ).setValue( formdata.formdata.pue_nbufferout );
            view.down( '#pue_nrts' ).setValue( formdata.formdata.pue_nrts );
            view.down( '#pue_ndtr' ).setValue( formdata.formdata.pue_ndtr );
        } else {
            configPuerto.show();
        }
    } else if( configPuerto ) {
        // Cuando es TCP, oculto el boton de Configurar Puerto y pongo en blanco los valores del form de SERIAL (Ocultos)
        configPuerto.hide();
        view.down( '#pue_nbaudrate' ).setValue( '' );
        view.down( '#pue_nparity' ).setValue( '' );
        view.down( '#pue_ndatabits' ).setValue( '' );
        view.down( '#pue_nstopbits' ).setValue( '' );
        view.down( '#pue_nflowctrl' ).setValue( '' );
        view.down( '#pue_nbufferin' ).setValue( '' );
        view.down( '#pue_nbufferout' ).setValue( '' );
        view.down( '#pue_nrts' ).setValue( '' );
        view.down( '#pue_ndtr' ).setValue( '' );
    }
},
onConfigPuertoClick: function(button, e, eOpts ) {
    var controller = this;
    var view = button.up( 't_iprsconeccionesformnuevaview' );
    var record = view.record;
    var title = getLocale( 'Configuracion de puerto' )
    var configPuertoView = Ext.widget( 't_serialconfiguracionpuertoview', {
        caller: view,
        record: record
    });
    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: title,
        width: 650,
        height: 450,
        border: false,
        scroll: 'Auto',
        items: configPuertoView,
        caller: view
    });
    win.show();
}
});