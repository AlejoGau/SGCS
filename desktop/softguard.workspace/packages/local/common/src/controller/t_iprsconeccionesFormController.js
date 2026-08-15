//MIGRADO2024
Ext.define( 'Common.controller.t_iprsconeccionesFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 't_iprsconeccionesModel', 'TablasIpConSearchModel' ],
    views: [ 't_iprsconeccionesFormView' ],
    init: function(config ) {
        // genero los eventos
        this.control( {
            't_iprsconeccionesformview': {
                afterrender: this.initview
            },
            't_iprsconeccionesformview button[action="save"]': {
                click: this.onSaveClick
            }/*,
                't_iprsconeccionesformview #iprsc_ipcidkey' : {
                    select : this.onIprsc_ipcidkeySelect
                }*/,
            't_iprsconeccionesformview #iprsc_ipcidkey': {
                change: this.onIprsc_ipcidkeyChange
            }
        });
    }, 
    initview: function(view ) {
        var controller = this;
        var record = view.record;
        var items = [];
        //cargo el store de conexiones
        connStore = Ext.create( 'Ext.data.Store', {
            model: this.getTablasIpConSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: [ {
                property: 'rec_iEsIRS',
                value: 1
            }]
        });
        var iprsc_ipcidkey = view.down( '#iprsc_ipcidkey' );
        iprsc_ipcidkey.bindStore( connStore );
        connStore.load( {
            callback: function() {
                view.loadRecord( view.record );
            }
        });
    },   
        
    onIprsc_ipcidkeyChange: function(combo, newValue, old, opts ) {
        var view = combo.up( 't_iprsconeccionesformview' );
        if( newValue != 0 ) {
            var record = combo.getStore().findRecord( 'Id', newValue );
            this.setConnection( view, record );
        }
    },   
        
    onIprsc_ipcidkeySelect: function(combo, record, opts ) {
        var view = combo.up( 't_iprsconeccionesformview' );
        this.setConnection( view, record );
    },
        
    setConnection( view, record ){
        //agrego el form dinamico
        var items = [];
        var config = record.get( 'rec_cConfig' );
        var iprsc = view.record;
        if( config && config != '' ) {
            // agrego los items del config
            var json = Ext.JSON.decode( config );
            items = json.items;
            var config = view.down( '#cconfig' );
            config.removeAll();
            config.add( items );
            var iprsc_config = iprsc.get( 'iprsc_config' );
            if( iprsc.get( 'iprsc_config' ) && iprsc.get( 'iprsc_config' ) != '' ) {
                var objValues = Ext.JSON.decode( iprsc_config ).formdata;
                for( var key in objValues ) {
                    if( objValues.hasOwnProperty( key ) ) {
                        console.log( key + " -> " + objValues[ key ] );
                        var field = view.down( '[name="' + key + '"]' );
                        if( field )
                            field.setValue( objValues[ key ] )
                    }
                }
            }
        }
    },
    onSaveClick: function(button, event, options ) {
        myform = button.up( 'form' ).getForm();
        view = button.up( 't_iprsconeccionesformview' );
        mymodel = myform.getRecord();
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
        mymodel.set( 'iprsc_config', Ext.JSON.encode( JsonForm ) );
        var controller = this;
        mymodel.save( {
            scope: this,
            callback: function( record, operation ) {
                if( record ) {
                    notify( 'Los datos se guardaron correctamente' );
                    if( view.caller ) {
                        view.caller.fireEvent( 'refresh', view.caller, record )
                    }
                }
            },
            button: button
        });
    }
});