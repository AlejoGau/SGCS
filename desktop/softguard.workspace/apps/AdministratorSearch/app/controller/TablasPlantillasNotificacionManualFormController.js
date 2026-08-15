Ext.define( 'AdministratorSearch.controller.TablasPlantillasNotificacionManualFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'TablasPlantillasNotificacionManualFormModel' ],
    views: [ 'TablasPlantillasNotificacionManualFormView' ],
    plantillaSeleccionada: '',
        init : function(config ) {
            // genero los eventos
            var t = this;
            this.control( {
                'tablasplantillasnotificacionmanualformview': {
                    beforerender: this.initview
                },
                'tablasplantillasnotificacionmanualformview button[action="save"]': {
                    click: this.onSaveClick
                }
            });
        }, // cierro init

    initview: function(view ) {
        view.loadRecord( view.record );
        this.plantillaSeleccionada = 'plantilla';
        var controller = this;
        view.listaEtiquetas = [

            { etiqueta: '<<CTADEALER>>' },
            { etiqueta: '<<CTACODIGO>>' },
            { etiqueta: '<<CTANOMBRE>>' },
            { etiqueta: '<<CTADIR>>' },
            { etiqueta: '<<EVENTODESC>>' },
            { etiqueta: '<<EVENTOFECHA>>' },
            { etiqueta: '<<EVENTOHORA>>' },
            { etiqueta: '<<EVENTOCODZONA>>' },
            { etiqueta: '<<EVENTODESZONA>>' },
            { etiqueta: '<<EVENTOCODUSUARIO>>' },
            { etiqueta: '<<EVENTONOMUSUARIO>>' },
            { etiqueta: '<<DEALERNOMBRE>>' },
            { etiqueta: '[[LF]]' }

        ];

        var t = this;

        Ext.Array.each( view.listaEtiquetas, function( rec, i ) {
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

            /*view.down( '#etiquetasplantilla2' ).add( {
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
            });*/
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
        var view = button.up( 'tablasplantillasnotificacionmanualformview' );
        var win = button.up( 'window' );
        var record = myform.getRecord();

        myform.updateRecord( record );

        if( myform.isValid() ) {
            record.set('pls_iTipo',1);
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