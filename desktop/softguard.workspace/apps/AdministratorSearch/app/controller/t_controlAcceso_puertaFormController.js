Ext.define( 'AdministratorSearch.controller.t_controlAcceso_puertaFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 't_controlAcceso_puertaModel', 't_controlAcceso_puertaSearchModel', 'PanelSearchModel' ],
views: [ 't_controlAcceso_puertaFormView' ],

init: function(config ) {
    // genero los eventos

    this.control( {
        't_controlaccesopuertaformview': {
            afterrender: this.initview,
            cuentachanged: this.onCuentaSelected,
            cuentaselected: this.onCuentaSelected
        },
        't_controlaccesopuertaformview button[action="save"]': {
            click: this.onSaveClick
        },
        't_controlaccesopuertaformview button[action=seleccionarCuenta]': {
            click: this.onSeleccionarCuenta
        }
    });
}, // cierro init

initview: function(view ) {
    const record = view.record;
    const controller = this;
    const container = view.down( '#container' );
    const idCuenta = record.raw.cue_iid;
    view.loadRecord( view.record );

    const myStore = Ext.create( 'Ext.data.Store', {
        model: controller.getPanelSearchModelModel(),
        pageSize: 50,
        remoteFilter: true,
        remoteSort: true,
        filters: [ {
            property: 'pan_iidcuenta',
            value: idCuenta
        }]
    });

    myStore.load( {
        callback: function( records, operation, success ) {
            if( success ) {
                //si tiene comandos agrego el combo
                if( records.length > 0 ) {
                    if( records[ 0 ].get( 'pan_cconfig' ) ) {
                        const comandos = JSON.parse( records[ 0 ].get( 'pan_cconfig' ) );

                        const comandoIngreso = comandos.commands.find( element => element.Id == record.get( "cap_iIngreso" ) );
                        const valueIngreso = comandoIngreso ? comandoIngreso.Name : "Abrir barrera";
                        //cargo los comandos de la cuenta para el combo y lo agrego a la view
                        var states = Ext.create( 'Ext.data.Store', {
                            fields: [ 'Name', 'Id' ],
                            data: comandos.commands
                        });

                        //el icono se llama icon-door-in
                        const comboIngreso = Ext.create( 'Ext.form.ComboBox', {
                            fieldLabel: getLocale( 'Comando Ingreso' ),
                            itemId: 'comboIngreso',
                            value: valueIngreso,
                            editable: true,
                            flex: 1,
                            store: states,
                            queryMode: 'local',
                            displayField: 'Name',
                            valueField: 'Id',
                            listeners: {
                                scope: this,
                                'select': function( select ) { }
                            }
                        });

                        const comandoEgreso = comandos.commands.find( element => element.Id == record.get( "cap_iEgreso" ) );
                        const valueEgreso = comandoEgreso ? comandoEgreso.Name : "Abrir barrera 2";

                        const comboEngreso = Ext.create( 'Ext.form.ComboBox', {
                            fieldLabel: getLocale( 'Comando Egreso' ),
                            itemId: 'comboEgreso',
                            value: valueEgreso,
                            editable: true,
                            flex: 1,
                            store: states,
                            queryMode: 'local',
                            displayField: 'Name',
                            valueField: 'Id',
                            listeners: {
                                scope: this,
                                'select': function( select ) { }
                            }
                        });

                        container.add( comboIngreso );
                        container.add( comboEngreso );
                    }
                }
            }
        }
    });
},

onCuentaSelected: function (selection, view, recordPreSelected ) {
    var controller = this;
    Ext.Array.each( selection, function( record ) {
        var cueiid = record.get( 'cue_iid' );
        var nombre = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
        view.down( '#idcuenta' ).setValue( cueiid );
        view.down( '#nombrecuenta' ).setValue( nombre );
        view.down( '#sacarcuenta' ).show();
    });
},    

onSeleccionarCuenta: function (button, events, eOps ) {
    var view = button.up( 't_controlaccesopuertaformview' );
    //view.win = win;
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione Cuentas',
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
                caller: view,
                filterTipo: 8
            }
        ]
    });
    win.show();
},    

saveRecord: function( record, model, view, button ) {
    record.set( "cap_idCta", view.down( '#idcuenta' ).value )
    record.set( "cap_nombre", view.down( '#nombre' ).value )
    record.setConfig({
        proxy: model.getProxy()
    });
    record.save( {
        scope: this,
        view: view,
        callback: function( record, operation ) {
            if( operation.success ) {
                var win = view.up( 'window' );
                notify( 'Los datos se guardaron correctamente' );
                view.caller.fireEvent( 'refresh', view.caller, record );
                win.close();
            } else {
                notifyError( 'Hubo un error al guardar los datos' );
            }
        },
        button: button
    });
},
onSaveClick: function(button, event, options ) {
    var controller = this;
    var myform = button.up( 'form' ).getForm();
    var view = button.up( 't_controlaccesopuertaformview' );
    var win = button.up( 'window' );
    var record = view.record;
    const model = controller.getT_controlAcceso_puertaModelModel();
    var container = button.up( 'form' ).down( 'container' );
    const comboIngreso = button.up( 'form' ).down( '#comboIngreso' );
    const comandoIngreso = comboIngreso ? comboIngreso.getValue() : '';
    const comboEgreso = button.up( 'form' ).down( '#comboEgreso' )
    const comandoEgreso = comboEgreso ? comboEgreso.getValue() : '';

    var acPuertasStore = Ext.create( 'Ext.data.Store', {
        model: controller.getT_controlAcceso_puertaSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: 'cap_idCta',
            value: view.down( '#idcuenta' ).value
        }]
    })

    if( myform.isValid() ) {
        acPuertasStore.load( {
            callback: function( records, operation, success ) {
                if( records && records.length == 0 ) {
                    controller.saveRecord( record, model, view, button )
                } else {
                    if( record.get( "cap_idCta" ) != records[ 0 ].get( "cap_idCta" ) ) {
                        notifyError( 'La cuenta ya tiene una puerta asignada' );
                    } else {
                        controller.saveRecord( record, model, view, button )
                    }
                }
            }
        });

        if( comandoIngreso && typeof comandoIngreso == "number" ) {
            const oldproxy = record.getProxy();
            const registro = myform.getRecord();

            //acá tengo que setear [cmd_iid] en el registro

            registro.set( 'cap_iIngreso', comandoIngreso );
			registro.setConfig({
				proxy: model.getProxy()
			});
            registro.save( {
                scope: this,
                win: win,
                view: view,
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Los datos de Ingreso se guardaron correctamente' );
                    } else {
                        notifyError( 'Hubo un error al guardar los datos de Ingreso' );
                    }
                },
                button: button
            });
        }

        if( comandoEgreso && typeof comandoEgreso == "number" ) {
            const oldproxy = record.getProxy();
            const registro = myform.getRecord();

            registro.set( 'cap_iEgreso', comandoEgreso );
			registro.setConfig({
				proxy: model.getProxy()
			});
            registro.save( {
                scope: this,
                win: win,
                view: view,
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Los datos de Egreso se guardaron correctamente' );
                    } else {
                        notifyError( 'Hubo un error al guardar los datos de Egreso' );
                    }
                },
                button: button
            });
        }

    }
}
});