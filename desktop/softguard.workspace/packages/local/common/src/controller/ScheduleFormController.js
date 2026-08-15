//MIGRADO2024
Ext.define( 'Common.controller.ScheduleFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'ScheduleModel', 'ScheduleSearchModel', 'SoftguardCodigoAlarmaModel', 'ZonaSearchModel', 'SoftguardUsuarioModel', 'ScheduleProgramModel' ],
    views: [ 'ScheduleFormView' ],
    init: function(config ) {
        // genero los eventos
        this.control( {
            'scheduleformview button[action="save"]': {
                click: this.saveObject
            },
            'scheduleformview button[action="cancel"]': {
                click: this.onCancelClick
            },
            'scheduleformview button[action="passwordChange"]': {
                click: this.onPasschangeClick
            },
            'scheduleformview': {
                beforerender: this.initview,
                fieldvaliditychange: this.onValidityChange,
                passwordchanged: this.onPasswordChanged,
                selectedEvents: this.eventsSelected,
                eventsSelected2: this.eventsSelected2,
                cuentachanged: this.onCuentaChanged
            },
            'scheduleformview #comboprogramtype': {
                change: this.onProgramTypeChange
            },
            'scheduleformview #evento': {
                click: this.onEventoClick
            },
            'scheduleformview #evento2': {
                click: this.onEvento2Click
            },
            'scheduleformview #limpiarevento': {
                click: this.onLimpiarEventoClick
            },
            'scheduleformview #limpiarevento2': {
                click: this.onLimpiarEvento2Click
            },
            'scheduleformview #limpiarcuenta': {
                click: this.onLimpiarCuentaClick
            },
            'scheduleformview #cuenta': {
                click: this.onCuentaClick
            },
            /* 'scheduleformview #runAlways': {
                change: this.onRunAlwaysChange
            },*/
            'scheduleformview #panel': {
                change: this.onPanelChange
            }
        });
    }, // cierro init
    onPanelChange: function (combo, value ) {
        var view = combo.up( 'scheduleformview' )
        view.down( '#comboprogramtype' ).setDisabled( false )
        view.down( '#selectAlarm' ).hide();
        view.down( '#otroshorarios' ).show();
        view.down( '#horario' ).show();
        view.down( '#horarioend' ).setTitle( getLocale( 'Horario finalizacion' ) )
        view.down( '#hours' ).allowBlank = true
        view.down( '#minutes' ).allowBlank = true
        var comboProgramType = view.down( '#comboprogramtype' )
        if( value == -1 ) {
        } else if( value == -2 ) {
            view.down( '#selectAlarm' ).show();
        } else if( value == 0 || value == 1 ) {
            comboProgramType.setValue( 1 )
        }
        comboProgramType.fireEvent( 'change', comboProgramType, comboProgramType.getValue() )
    },
    onCuentaChanged: function(cuenta, view ) {
        view.down( '#idcuenta' ).setValue( cuenta.get( 'Id' ) );
        view.down( '#nombrecuenta' ).setValue( cuenta.get( 'cue_cnombre' ) );
        
        // view.storeZona.filter( {
        //     property: 'zon_iidcuenta',
        //     value: cuenta.get( 'Id' )
        // }, {
        //         property: 'zon_ccodigo:LEN',
        //         value: '< 4'
        // });
        var filters = [];
        filters.push({ property: 'zon_iidcuenta', value: cuenta.get( 'Id' )});
        filters.push({ property: 'zon_ccodigo:LEN', value: '< 4'});
        view.storeZona.filter(filters);
        view.down( '#combozona' ).setDisabled( true )
        view.storeZona.load( {
            callback: function() {
                view.down( '#combozona' ).setDisabled( false )
            }
        });
        view.down( '#combousuario' ).setDisabled( true )
        view.storeUsuarios.load( {
            ObjectId: cuenta.get( 'Id' ), callback: function() {
                view.down( '#combousuario' ).setDisabled( false )
            }
        });
    },
        
    onLimpiarCuentaClick: function (btn ) {
        var view = btn.up( 'scheduleformview' );
        view.down( '#nombrecuenta' ).setValue( '' )
        view.down( '#idcuenta' ).setValue( '' )
        view.down( '#combozona' ).setDisabled( true )
        view.down( '#combousuario' ).setDisabled( true )
    },
        
    onCuentaClick: function(button, event, options ) {
        var view = button.up( 'scheduleformview' );
        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: 'Seleccione una Cuenta',
            closeAction: 'destroy',
            itemId: 'cuentaWin',
            width: 750,
            height: 550,
            border: true,
            modal: true,
            view: view,
            items: [
                {
                    xtype: 'cuentahelperview',
                    tip_ncondicion: "0",
                    caller: view
                }
            ]
        });
        win.show();
    },
    onLimpiarEventoClick: function (btn ) {
        var view = btn.up( 'scheduleformview' );
        view.down( '#nombreevento' ).setValue( '' )
        view.down( '#codevento' ).setValue( '' )
    },
        
    onLimpiarEvento2Click: function (btn ) {
        var view = btn.up( 'scheduleformview' );
        view.down( '#nombreevento2' ).setValue( '' )
        view.down( '#codevento2' ).setValue( '' )
    },
        
    eventsSelected: function(record, view ) {
        view.down( '#nombreevento' ).setValue( record.get( 'Descripcion' ) )
        view.down( '#codevento' ).setValue( record.get( 'cod_ccodigo' ) )
    }, 
        
    eventsSelected2: function(record, view ) {
        view.down( '#nombreevento2' ).setValue( record.get( 'Descripcion' ) )
        view.down( '#codevento2' ).setValue( record.get( 'cod_ccodigo' ) )
    }, 
        
    onEventoClick: function (btn ) {
        var view = btn.up( 'scheduleformview' );
        var myWindow = Ext.widget( 'window', {
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true,
            items: [ {
                xtype: 'eventselecterhelperview',
                caller: view,
                filter: [ { property: 'cod_nManual', value: 1 }],
                simpleSelect: true
            }],
            layout: 'fit'
        }).show();
    },
        
    onEvento2Click: function (btn ) {
        var view = btn.up( 'scheduleformview' );
        var myWindow = Ext.widget( 'window', {
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true,
            items: [ {
                xtype: 'eventselecterhelperview',
                caller: view,
                filter: [ { property: 'cod_nManual', value: 1 }],
                simpleSelect: true,
                toEvent: 'eventsSelected2'
            }],
            layout: 'fit'
        }).show();
    },
    onProgramTypeChange: function(combo, value, old ) {
        var view = combo.up( 'scheduleformview' );
        var combodayofweek = view.down( '#combodayofweek' );
        var combodayofmonth = view.down( '#combodayofmonth' );
        var horario = view.down( '#horario' );
        var horarioend = view.down( '#horarioend' );
        horarioend.setTitle( getLocale( 'Horario finalizacion' ) );
        horario.setTitle( getLocale( 'Horario inicio' ) );
        combodayofweek.hide();
        combodayofmonth.hide();
        view.down( '#otroshorarios' ).show()
        if( value == 1 ) {
        } else if( value == 2 ) {
        } else if( value == 3 ) {
            combodayofweek.show();
        } else if( value == 4 ) {
            combodayofmonth.show();
        } else if( value == 5 ) {
            horarioend.setTitle( getLocale( 'Repite cada' ) );
            view.down( '#otroshorarios' ).hide()
        }
        if( view.down( '#panel' ).getValue() >= 0 ) {
            view.down( '#horario' ).hide();
            view.down( '#horarioend' ).setTitle( getLocale( 'Horario de ejecucion' ) )
            view.down( '#horarioend' ).show();
            view.down( '#hours' ).allowBlank = true;
            view.down( '#hours' ).validate()
            view.down( '#minutes' ).allowBlank = true
            view.down( '#minutes' ).validate()
            view.down( '#hours' ).setValue( 0 )
            view.down( '#minutes' ).setValue( 0 )
            for( var i = 1;i <= view.cantidadHorariosExtra;i++ ) {
                view.down( '#horario-' + i ).hide()
                view.down( '#hours-' + i ).setValue( 0 )
                view.down( '#minutes-' + i ).setValue( 0 )
                view.down( '#horarioend-' + i ).setTitle( getLocale( 'Horario de ejecucion' ) )
            }
        } else {
            horario.show();
            horarioend.show();
            for( var i = 1;i <= view.cantidadHorariosExtra;i++ ) {
                view.down( '#horario-' + i ).show()
                view.down( '#hours-' + i ).setValue( '' )
                view.down( '#minutes-' + i ).setValue( '' )
                view.down( '#horarioend-' + i ).setTitle( getLocale( 'Horario finalizacion' ) )
            }
        }
    },
    initview: function(view ) {
        /*para jugar*********** */
        /*
        var filters = [];
        
            filters.push({
                property: 'c_zona:LIKE',
                value: '%ZON%'
                
            });
        */
        /************* */
        view.storeZona = Ext.create( 'Ext.data.Store', {
            model: this.getZonaSearchModelModel(),
            pageSize: 50,
            //filters: filters,//PARA FILTRAR
            remoteSort: true,
            remoteFilter: true
        })
        view.down( '#combozona' ).bindStore( view.storeZona );
        view.storeUsuarios = Ext.create( 'Ext.data.Store', {
            model: 'Common.model.SoftguardUsuarioModel'
        });
        view.down( '#combousuario' ).bindStore( view.storeUsuarios );
        if( view.record.get( 'cuentaId' ) ) {
            view.down( '#cuentablock' ).hide()
            view.down( '#idcuenta' ).setValue( view.record.get( 'cuentaId' ) )
            var filters = [];
            filters.push({ property: 'zon_iidcuenta', value: view.record.get( 'cuentaId' )});
            filters.push({ property: 'zon_ccodigo:LEN', value: '< 4'});
            view.storeZona.filter(filters);
            view.down( '#combozona' ).setDisabled( true )
            view.storeZona.load( {
                callback: function() {
                    view.down( '#combozona' ).setDisabled( false )
                    if( view.record.get( 'zonaiid' ) == '' || view.record.get( 'zonaiid' ) == 0 ) {
                        view.down( '#combozona' ).setRawValue( '' )
                    }
                }
            });
            view.down( '#combousuario' ).setDisabled( true )
            view.storeUsuarios.load( {
                ObjectId: view.record.get( 'cuentaId' ), callback: function() {
                    view.down( '#combousuario' ).setDisabled( false )
                    if( view.record.get( 'usuarioiid' ) == '' || view.record.get( 'usuarioiid' ) == 0 ) {
                        view.down( '#combousuario' ).setRawValue( '' )
                    }
                }
            });
            view.down( '#comboprogramtype' ).setValue( view.record.get( 'programtype' ) );
            view.down( '#name' ).setValue( view.record.get( 'Name' ) )
            view.down( '#idcuenta' ).setValue( view.record.get( 'cuentaId' ) )
            view.down( '#codevento' ).setValue( view.record.get( 'eventos' ) )
            view.down( '#codevento2' ).setValue( view.record.get( 'eventogenerar' ) )
            view.down( '#combozona' ).setValue( view.record.get( 'zonaiid' ) )
            view.down( '#combousuario' ).setValue( view.record.get( 'usuarioiid' ) )
            view.down( '#hours' ).setValue( view.record.get( 'starthour' ) )
            view.down( '#minutes' ).setValue( view.record.get( 'startminutes' ) )
            view.down( '#endhours' ).setValue( view.record.get( 'endhour' ) )
            view.down( '#endminutes' ).setValue( view.record.get( 'endminutes' ) )
            if( view.record.get( 'Id' ) != 0 ) {
                for( i = 0;i <= 6;i++ ) {
                    view.down( '#day-' + i ).hide()
                }
                view.down( '#day-' + view.record.get( 'dayofweek' ) ).show().setDisabled( true )
                view.down( '#day-' + view.record.get( 'dayofweek' ) ).setValue( true )
            }
            view.down( '#combodayofmonth' ).setValue( view.record.get( 'dayofmonth' ) )
            if( view.record.get( 'programtype' ) == 0 ) {
                view.down( '#comboprogramtype' ).setRawValue( '' );
            }
            if( view.record.get( 'dayofmonth' ) == 0 ) {
                view.down( '#combodayofmonth' ).setRawValue( '' );
            }
            if( view.record.get( 'eventos' ) ) {
                Ext.create( 'Ext.data.Store', {
                    model: this.getSoftguardCodigoAlarmaModelModel(),
                    pageSize: 1000,
                    remoteSort: false,
                    filters: [
                        {
                            property: 'cod_ccodigo',
                            value: view.record.get( 'eventos' )
                        }
                    ],
                    remoteFilter: true,
                }).load( {
                    callback: function( records ) {
                        view.down( '#nombreevento' ).setValue( records[ 0 ].get( 'cod_cdescripcion' ) )
                    }
                })
                view.down( '#panel' ).setValue( -2 );
            } else {
                view.down( '#panel' ).setValue( -1 );
            }
            if( view.record.get( 'eventogenerar' ) ) {
                Ext.create( 'Ext.data.Store', {
                    model: this.getSoftguardCodigoAlarmaModelModel(),
                    pageSize: 1000,
                    remoteSort: false,
                    filters: [
                        {
                            property: 'cod_ccodigo',
                            value: view.record.get( 'eventogenerar' )
                        }
                    ],
                    remoteFilter: true,
                }).load( {
                    callback: function( records ) {
                        view.down( '#nombreevento2' ).setValue( records[ 0 ].get( 'cod_cdescripcion' ) )
                    }
                })
            }
            if( view.record.get( 'programtype' ) ) {
                if( view.record.get( 'programtype' ) >= 10 ) {
                    view.down( '#panel' ).setValue( parseInt( view.record.get( 'programtype' ).toString().slice( 1 ) ) )
                }
                view.down( '#comboprogramtype' ).setValue( parseInt( view.record.get( 'programtype' ).toString().slice( 0, 1 ) ) )
            }
        }
        var comboProgramType = view.down( '#comboprogramtype' )
        comboProgramType.fireEvent( 'change', comboProgramType, comboProgramType.getValue() )
        if( view.record.get( 'Id' ) == 0 ) {
            view.cantidadHorariosExtra = 5
            for( var i = 1;i <= view.cantidadHorariosExtra;i++ ) {
                view.down( '#otroshorarios' ).add( {
                    xtype: 'fieldset',
                    layout: 'hbox',
                    title: 'Horario inicio',
                    itemId: 'horario-' + i,
                    width: '100%',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                            flex: 1,
                            itemId: 'hours-' + i,
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150,
                            allowBlank: true
                        }, {
                            xtype: 'numberfield',
                            fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                            flex: 1,
                            itemId: 'minutes-' + i,
                            labelWidth: 70,
                            width: 150,
                            allowBlank: true
                        }
                    ]
                }, {
                        xtype: 'fieldset',
                        layout: 'hbox',
                        title: 'Horario finalizacion',
                        itemId: 'horarioend-' + i,
                        width: '100%',
                        items: [ {
                            xtype: 'numberfield',
                            fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                            flex: 1,
                            itemId: 'endhours-' + i,
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150,
                            allowBlank: true
                        }, {
                                xtype: 'numberfield',
                                fieldLabel: 'Minutos',
                                minValue: 0,
                                maxValue: 59,
                                flex: 1,
                                itemId: 'endminutes-' + i,
                                labelWidth: 70,
                                width: 150,
                                allowBlank: true
                            }
                        ]
                    }
                )
            }
            view.down( '#panel' ).setValue( -1 )
        } else {
            view.down( '#otroshorarios' ).hide()
        }
    },
        
    codigoValidator: function(value ) {
        var view = this.up( 'usuarioformview' );
        var record = view.record;
        var store = record.store;
        //var form = view.getForm();
        //var field = form.findField('usu_icodigo');
        var repeated = store.findExact( 'usu_icodigo', +value );
        if( repeated != -1 && record != store.getAt( repeated ) ) {
            return 'El código de usuario ya existe';
        } else {
            return true;
        }
    },
        
    onValidityChange: function(ancestor, labelable, isvalid, options ) {
        var button = ancestor.down( 'button[action="save"]' );
        if( isvalid == "false" ) {
            button.disable();
        } else {
            button.enable();
        }
    },
    saveObject: function(button, event, options ) {
        var myform = button.up( 'form' ).getForm();
        var view = button.up( 'scheduleformview' );
        var record = view.record;
        var win = button.up( 'window' );
        var controller = this;
        if( !view.record ) {
            view.record = controller.getScheduleProgramModelModel().create( {})
        }


        record.setConfig({
            proxy: controller.getScheduleProgramModelModel().getProxy()
        });

        if( myform.isValid() ) {
            
            var sh = Ext.String.leftPad( view.down( '#hours' ).getValue(), 2, '0' );
            var sm = Ext.String.leftPad( view.down( '#minutes' ).getValue(), 2, '0' );
            var eh = Ext.String.leftPad( view.down( '#endhours' ).getValue(), 2, '0' );
            var em = Ext.String.leftPad( view.down( '#endminutes' ).getValue(), 2, '0' );
            var s = parseInt( "" + sh + sm );
            var e = parseInt( "" + eh + em );
            if( s > e && view.down( '#comboprogramtype' ).getValue() != 5 ) { // si es personalizado no comparo los horarios.
                notify( 'El horario de inicio debe ser menor al horario de finalizacion.' )
                view.down( '#hours' ).markInvalid( 'El horario de inicio debe ser menor al horario de finalizacion.' );
                view.down( '#minutes' ).markInvalid( 'El horario de inicio debe ser menor al horario de finalizacion.' );
                view.down( '#endhours' ).markInvalid( 'El horario de inicio debe ser menor al horario de finalizacion.' );
                view.down( '#endminutes' ).markInvalid( 'El horario de inicio debe ser menor al horario de finalizacion.' );
                return false;
            }
            if( !view.down( '#codevento' ).getValue() && view.down( '#panel' ).getValue() == -2 ) {
                notify( 'Debe seleccionar el evento que se espera .' )
                return false;
            }
            if( !view.down( '#codevento2' ).getValue() ) {
                notify( 'Debe seleccionar el evento que se emitira.' )
                return false;
            }
            var programtype = view.down( '#comboprogramtype' ).getValue()
            if( view.down( '#panel' ).getValue() == 0 || view.down( '#panel' ).getValue() == 1 ) {
                //programtype = view.down('#panel').getValue()
                /**
                * Se concatena el ID del tipo de programa y el Id del estado del panel. SOLO CUANDO ES ABIERTO O CERRADO
                * Ej.: 10 = todos los dias - panel cerrado,  11 = todos los dias - panel abierto,
                *      20 = lunes a viernes - panel cerrado, 21 = lunes a viernes - panel abierto, 
                * 
                *  [rodrigo] 19/10/2018 No se modifico el modelo de datos por la urgencia de la tarea, 
                *                       en proximas modificaciones agregar campos necesarios 
                */
                programtype = view.down( '#comboprogramtype' ).getValue() + '' + view.down( '#panel' ).getValue()
            }
            //button.disable();
            if( view.down( '#comboprogramtype' ).getValue() == 3 ) {
                var dias = view.down( '#combodayofweek' ).getValue()
                var k = 0;
                Ext.Array.each( dias.dayofweek, function( iddia, k ) {
                    k++
                    view.record.set( {
                        Name: view.down( '#name' ).getValue(),
                        cuentaId: view.down( '#idcuenta' ).getValue(),
                        eventos: view.down( '#codevento' ).getValue(),
                        eventogenerar: view.down( '#codevento2' ).getValue(),
                        zonaiid: view.down( '#combozona' ).getValue(),
                        usuarioiid: view.down( '#combousuario' ).getValue(),
                        programtype: programtype,
                        //     eventtype:view.down('#idcuenta').getValue(),
                        starthour: view.down( '#hours' ).getValue(),
                        startminutes: view.down( '#minutes' ).getValue(),
                        dayofweek: iddia,
                        dayofmonth: 0,
                        endhour: view.down( '#endhours' ).getValue(),
                        endminutes: view.down( '#endminutes' ).getValue(),
                    })
                    view.record.save( {
                        callback: function() {
                            k--;
                            var recordstosave = [];
                            for( var i = 1;i <= view.cantidadHorariosExtra;i++ ) {
                                //verifico que tenga algun valor el campo
                                if( view.down( '#endhours-' + i ) && view.down( '#endhours-' + i ).getValue() ) {
                                    k++;
                                    //armo record
                                    var horarioExtra = controller.getScheduleProgramModelModel().create( {
                                        Name: view.down( '#name' ).getValue(),
                                        cuentaId: view.down( '#idcuenta' ).getValue(),
                                        eventos: view.down( '#codevento' ).getValue(),
                                        eventogenerar: view.down( '#codevento2' ).getValue(),
                                        zonaiid: view.down( '#combozona' ).getValue(),
                                        usuarioiid: view.down( '#combousuario' ).getValue(),
                                        programtype: programtype,
                                        //     eventtype:view.down('#idcuenta').getValue(),
                                        starthour: view.down( '#hours-' + i ).getValue(),
                                        startminutes: view.down( '#minutes-' + i ).getValue(),
                                        dayofweek: iddia,
                                        dayofmonth: 0,
                                        endhour: view.down( '#endhours-' + i ).getValue(),
                                        endminutes: view.down( '#endminutes-' + i ).getValue(),
                                    });
                                    horarioExtra.set('Id',0);

                                    horarioExtra.setConfig({
                                        proxy: model.getProxy()
                                    });
                                    recordstosave.push(horarioExtra);
                                    
                                    horarioExtra.save( {
                                        callback: function() {
                                            k--;
                                            if( k == 0 ) {
                                                view.caller.fireEvent( 'objectchanged', view.caller, record );
                                                win.close();
                                                return false;
                                            }
                                        }
                                    });
                                    
                                }
                                if( k == 0 || !view.cantidadHorariosExtra ) {
                                    view.caller.fireEvent( 'objectchanged', view.caller, record );
                                    win.close();
                                    return false;
                                }
                            }
                            if (recordstosave.length>0){
                                //saveSync(recordstosave,function(){
                                    view.caller.fireEvent( 'objectchanged', view.caller, record );
                                    win.close();
                                //}, 0); 
                            } else {
                                view.caller.fireEvent( 'objectchanged', view.caller, record );
                                notify('Se guardó con éxito');
                                win.close();
                            }
                            
                        }
                    });
                })
            } else {
                view.record.set( {
                    Name: view.down( '#name' ).getValue(),
                    cuentaId: view.down( '#idcuenta' ).getValue(),
                    eventos: view.down( '#codevento' ).getValue(),
                    eventogenerar: view.down( '#codevento2' ).getValue(),
                    zonaiid: view.down( '#combozona' ).getValue(),
                    usuarioiid: view.down( '#combousuario' ).getValue(),
                    programtype: programtype,
                    //     eventtype:view.down('#idcuenta').getValue(),
                    starthour: view.down( '#hours' ).getValue(),
                    startminutes: view.down( '#minutes' ).getValue(),
                    dayofweek: 0,
                    dayofmonth: view.down( '#combodayofmonth' ).getValue(),
                    endhour: view.down( '#endhours' ).getValue(),
                    endminutes: view.down( '#endminutes' ).getValue(),
                })
                view.record.save( {
                    callback: function() {
                        var k = 0;
                        //recorro los campos
                        var recordstosave = [];
                        for( var i = 1;i <= view.cantidadHorariosExtra;i++ ) {
                            //verifico que tenga algun valor el campo
                            if( view.down( '#endhours-' + i ) && view.down( '#endhours-' + i ).getValue() ) {
                                k++;
                                //armo record
                                var horarioExtra = controller.getScheduleProgramModelModel().create( {
                                    Name: view.down( '#name' ).getValue(),
                                    cuentaId: view.down( '#idcuenta' ).getValue(),
                                    eventos: view.down( '#codevento' ).getValue(),
                                    eventogenerar: view.down( '#codevento2' ).getValue(),
                                    zonaiid: view.down( '#combozona' ).getValue(),
                                    usuarioiid: view.down( '#combousuario' ).getValue(),
                                    programtype: programtype,
                                    //     eventtype:view.down('#idcuenta').getValue(),
                                    starthour: view.down( '#hours-' + i ).getValue(),
                                    startminutes: view.down( '#minutes-' + i ).getValue(),
                                    dayofweek: 0,
                                    dayofmonth: view.down( '#combodayofmonth' ).getValue(),
                                    endhour: view.down( '#endhours-' + i ).getValue(),
                                    endminutes: view.down( '#endminutes-' + i ).getValue(),
                                });
                                horarioExtra.set('Id',0);
                                horarioExtra.setConfig({
                                    proxy: controller.getScheduleProgramModelModel().getProxy()
                                });

                                recordstosave.push(horarioExtra);
                                
                                horarioExtra.save( {
                                    callback: function() {
                                        k--;
                                        if( k == 0 ) {
                                            view.caller.fireEvent( 'objectchanged', view.caller, record );
                                            win.close();
                                        }
                                    }
                                });
                            }
                        }
                        if (recordstosave.length>0){
                            //saveSync(recordstosave,function(){
                                view.caller.fireEvent( 'objectchanged', view.caller, record );
                                win.close();
                            //}, 0);
                        } else {
                            view.caller.fireEvent( 'objectchanged', view.caller, record );
                            notify('Se guardó con éxito');
                            win.close();
                        }
                    }
                });
            }
        }
    },
    deleteObject: function(button, event, options ) {
        var myform = button.up( 'form' ).getForm();
        var mymodel = myform.getRecord();
        var view = button.up( 'scheduleformview' );
        mymodel.destroy( {
            scope: this.application
                    });
        view.fireEvent( 'objectchanged' ); // debiera ser en el callback del destroy
        win.close()
    },
        
    onCancelClick: function(button, event, options ) {
        myWin = button.up( 'window' );
        var view = button.up( 'scheduleformview' );
        myWin.close();
    },
        
    onPasschangeClick: function(button, event, options ) {
        var view = button.up( 'scheduleformview' );
        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: getLocale( 'Cambio de clave' ),
            closeAction: 'hide',
            caller: view,
            fieldName: 'usu_cclave',
            modal: true,
            width: 300,
            height: 150,
            border: false,
            items: { xtype: 'passwordformview' }
        });
        win.show();
    },
    onPasswordChanged: function(value, win ) {
        var fieldname = win.fieldName;
        var view = win.caller;
        view.record.set( fieldname, value );
        view.getForm().findField( fieldname ).setValue( value );
    }
});