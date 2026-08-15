Ext.define( 'AdministratorSearch.controller.TablasPlantillasSmsFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'TablasPlantillasSmsModel', 'TablasPlantillasSmsSearchValidacionModel' ],
    views: [ 'TablasPlantillasSmsFormView' ],
    plantillaSeleccionada: '',
        init : function(config ) {
            // genero los eventos
            var t = this;
            this.control( {
                'tablasplantillassmsformview': {
                    beforerender: this.initview
                },
                'tablasplantillassmsformview button[action="save"]': {
                    click: this.onSaveClick
                }
            });
        }, // cierro init

    initview: function(view ) {
        view.loadRecord( view.record );
        //-------------------------
        //var record = view.record;
        //var form = view.getForm();

        //view.loadRecord(record); 
        //---------------------------------------

        this.plantillaSeleccionada = 'plantilla';
        var controller = this;
        view.listaEtiquetas = [

            { etiqueta: '<<CTACODIGO>>' },
            { etiqueta: '<<CTANOMBRE>>' },
            { etiqueta: '<<CTADIR>>' },
            { etiqueta: '<<CTALOC>>' },
            { etiqueta: '<<CTAPROVEST>>' },
            { etiqueta: '<<CTACPOSTAL>>' },
            { etiqueta: '<<DEALERNOMBRE>>' },
            { etiqueta: '<<DEALERTELEFONO>>' },
            { etiqueta: '<<EMPRESA>>' },
            { etiqueta: '<<EMPRESATELEFONO>>' },
            { etiqueta: '<<EVENTODESC>>' },
            { etiqueta: '<<EVENTOHORA>>' },
            { etiqueta: '<<EVENTOFECHA>>' },
            { etiqueta: '<<EVENTOCODZONA>>' },
            { etiqueta: '<<EVENTODESZONA>>' },
            { etiqueta: '<<EVENTOCODUSUARIO>>' },
            { etiqueta: '<<EVENTONOMUSUARIO>>' },
            { etiqueta: '[[EVENTONOVEDAD]]' },
            { etiqueta: '<<EVENTOPOSICION>>' },
            { etiqueta: '[[EVENTOIMAGEN]]' },
            { etiqueta: '<<GEOCERCANOMBRE>>' },
            { etiqueta: '<<GPSVELOCIDAD>>' },
            { etiqueta: '<<GPSBAT>>' },

            { etiqueta: '[[LF]]' },

            { etiqueta: '<<QRLINK>>' },
            { etiqueta: '<<QRCODE>>' },
            { etiqueta: '<<MEITRACKBATEXT>>' },
            { etiqueta: '<<MEITRACKBATAMP>>' },
            { etiqueta: '<<MOVMARCA>>' },
            { etiqueta: '<<MOVMODELO>>' },
            { etiqueta: '<<MOVNROCHASIS>>' },
            { etiqueta: '<<MOVCOLOR>>' },
            { etiqueta: '<<MOVNROMOTOR>>' },
            { etiqueta: '<<MOVYEAR>>' },
            { etiqueta: '<<MOVDOMINIO>>' },
            { etiqueta: '<<MOVVELMAX>>' },
            { etiqueta: '<<MOVIDCOND>>' },
            { etiqueta: '<<MOVILRUTA>>' },
            { etiqueta: '<<TAREAPROGRAMADA>>' },
            { etiqueta: '<<TAGVIAJES>>' },
            { etiqueta: '<<TELEFONOAPP>>' },

            { etiqueta: '<<STORDEN>>' },
            { etiqueta: '<<CTADEALER>>' },            
            { etiqueta: '<<STINICIOVISITA>>' },            

            { etiqueta: '<<STFINVISITA>>' },    
            { etiqueta: '<<STTECNICO>>' },    
            { etiqueta: '<<STTIPOSERVICIO>>' },      
            { etiqueta: '<<STSERVICIO>>' }, 
            { etiqueta: '[[EVENTOOBSERVACION]]' },                                               

        ];

        var t = this;

        Ext.Array.each( view.listaEtiquetas, function( rec, i ) {
            console.log('Tooltip: '+rec.etiqueta.replace( /[<>\[\]]/g, '' ));
            view.down( '#etiquetas' ).add( {
                xtype: 'button',
                text: t.htmlentities( rec.etiqueta ),
                translate: false,
                tooltip: rec.etiqueta.replace( /[<>\[\]]/g, '' ),
                translatetooltip: true,
                itemId: 'etiqueta' + i,
                width: 200,
                listeners: {
                    click: function() {
                        //var myTextArea = view.down('#plantilla').getEl(); //document.getElementById('plantilla-inputEl');
                        var myTextArea = document.getElementById( view.down( '#plantilla' ).getEl().id + '-inputEl' );
                        var textInArea = myTextArea.value;
                        var textToInsert = rec.etiqueta;
                        var caretPosition = myTextArea.selectionStart;

                        myTextArea.value = textInArea.substring( 0, caretPosition ) + textToInsert + textInArea.substring( caretPosition );
                    }
                }
            });

            view.down( '#etiquetasplantilla2' ).add( {
                xtype: 'button',
                text: t.htmlentities( rec.etiqueta ),
                itemId: 'etiqueta2' + i,
                translate: false,
                translatetooltip: true,
                tooltip: rec.etiqueta.replace( /[<>\[\]]/g, '' ),
                width: 200,
                listeners: {
                    click: function() {
                        //var myTextArea = view.down('#plantilla2').getEl() // textareafield-1330-inputEl
                        var myTextArea = document.getElementById( view.down( '#plantilla2' ).getEl().id + '-inputEl' );
                        var textInArea = myTextArea.value;
                        var textToInsert = rec.etiqueta;
                        var caretPosition = myTextArea.selectionStart;

                        myTextArea.value = textInArea.substring( 0, caretPosition ) + textToInsert + textInArea.substring( caretPosition );
                    }
                }
            });
        });
    },
        
        
    htmlentities: function (cadena ) {
        cadena = cadena.replace( new RegExp( "<", 'g' ), "&lt;" );
        cadena = cadena.replace( new RegExp( ">", 'g' ), "&gt;" );
        return cadena;
    },
        
    onSaveClick: function(button, event, options ) {
        // cambio la cantidad de columnas al panel
        // accedo al registro y lo salvo
        var myform = button.up( 'form' ).getForm();
        var view = button.up( 'tablasplantillassmsformview' );
        var win = button.up( 'window' );
        var record = myform.getRecord();

        myform.updateRecord( record );

        if( myform.isValid() ) {
            record.save( {
                scope: this,
                view: view,
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Los datos se guardaron correctamente' );
                        view.caller.fireEvent( 'objectchanged', view.caller, record );
                        view.close();

                    } else {
                        notifyError( 'Hubo un error al guardar los datos' );
                    }
                },
                button: button
            });
        } else {
            notify( 'Se encontraron errores.' );
        }
    }
});