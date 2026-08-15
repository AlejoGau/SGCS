//MIGRADO2024
Ext.define( 'Common.controller.IprServicioFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'IprServiciosModel' ],
views: [ 'IprServicioFormView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'iprservicioformview': {
            afterrender: this.initview
        },
        'iprservicioformview button[action="save"]': {
            click: this.onSaveClick
        },
        'iprservicioformview button[action="resetall"]': {
            click: this.onResetAllClick
        }
    });
}, 
    
  
initview: function(view ) {
    var controller = this;
    console.log( "iprservicioformview record - - -", view.record )
    // Asigno del record que abri, el stado vigente al combo de Estado
    var comboEstado = view.down( '#iprs_status' );
    comboEstado.setValue( view.record.get( 'iprs_status' ) );
    view.loadRecord( view.record );
},    
onResetAllClick: function(button, event, options ) {
    myform = button.up( 'form' ).getForm();
    view = button.up( 'iprservicioformview' );
    mymodel = myform.getRecord();
    var controller = this;
    Ext.Ajax.request( {
        url: '/handler/IRS_RESETALL_handler',
        params: {
            ip: mymodel.get( 'iprs_localip' ),
            port: mymodel.get( 'iprs_commandport' )
        },
        method: 'GET',
        scope: this,
        success: function( response ) {
        }
    })
    notify( 'El comando se envió con éxito' );
},
    
onSaveClick: function(button, event, options ) {
    myform = button.up( 'form' ).getForm();
    view = button.up( 'iprservicioformview' );
    mymodel = myform.getRecord();
    myform.updateRecord( mymodel );
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