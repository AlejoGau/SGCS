Ext.define( 'SGWebCrm.controller.EncuestaEnvioFormController',
    {
        extend: 'Ext.app.Controller',
        stores: [  ],
        models: [ 'SmartPanicSearchModel', 'p_encuestasSearchModel', 'p_encuesta_preguntaSearchModel' ],
        views: [ 'EncuestaEnvioFormView' ],

        init: function(config ) {
            // genero los eventos
            this.control( {
                'encuestasenvioformview': {
                    beforerender: this.initview
                },
                'encuestasenvioformview #enviar': {
                    click: this.onEnviarClick
                },
            });
        }, // cierro init

        initview: function(view ) {
        },
            
        onEnviarClick: function(button, event, options ) {
            var controller = this
            var view = button.up( 'encuestasenvioformview' );

            if( view.down( '#encuesta' ).getValue() != '' && view.down( '#dealer' ).getValue() != '' ) {
                Ext.MessageBox.confirm( 'Envio de encuesta', 'Esta a punto de hacer un envio, esta seguro?', function( btn ) {
                    if( btn === 'yes' ) {
                        //console.log( view.down( '#dealer' ).getValue(), view.down( '#encuesta' ).getValue() )
                        Ext.Ajax.request( {
                            url: '/Rest/Search/EncuestaEnvioPush',
                            method: 'GET',
                            scope: this,
                            params: {
                                idsSmartpanics: view.down( '#dealer' ).getValue(),
                                idEncuesta: view.down( '#encuesta' ).getValue()
                            },
                            success: function( response ) {
                                console.log( response );
                                notify( 'la encuesta fue enviada.' )
                                view.up( 'window' ).close()
                            }
                        })
                    } else {
                        //some code
                    }
                });
            } else {
                notify( 'Verifique que tenga seleccionado dealer y encuesta' )
            }
        }
    }
);