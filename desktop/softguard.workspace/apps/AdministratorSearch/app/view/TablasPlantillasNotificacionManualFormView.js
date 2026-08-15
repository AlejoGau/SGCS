Ext.define( 'AdministratorSearch.view.TablasPlantillasNotificacionManualFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.tablasplantillasnotificacionmanualformview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true
    },
    items: [
        {
            xtype: 'textfield',
            name: 'pls_ccodigo',
            fieldLabel: 'Codigo',
            allowBlank: false,
            maxLength: 3,
            inputWidth: 40,
            itemId: 'codigo',
            validator: function( value ) {
                
                var t = this;
                if( value != this.originalValue && this.originalValue != undefined ) {
                    var form = t.up( 'form' ).getForm();
                    var codigo = form.findField( 'pls_ccodigo' ).getValue();
                    var filters = [ {
                        property: 'pls_ccodigo',
                        value: codigo
                    }];

                    var model = 'AdministratorSearch.model.TablasPlantillasSmsSearchValidacionModel';

                    var store = Ext.create( 'Ext.data.Store', {
                        model: model,
                        pageSize: 50,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: filters,
                        autoload: false
                    })

                    store.load( {
                        callback: function( records, operation, success ) {
                            if( records.length > 0 ) {
                                t.markInvalid( 'El codigo ya existe' );
                                t.textValid = false;
                                t.up( 'tablasplantillasnotificacionmanualformview' ).down( '#save' ).setDisabled( true );
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                                t.up( 'tablasplantillasnotificacionmanualformview' ).down( '#save' ).setDisabled( false );
                            }
                        }
                    })
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
                return t.textValid;
                
            }
        }
        , {
            xtype: 'textfield',
            name: 'pls_cdescripcion',
            fieldLabel: 'Descripcion',
            allowBlank: false,
            maxLength: 40,
            anchor: '100%'
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'textareafield',
                    name: 'pls_mplantilla',
                    fieldLabel: 'Plantilla',
                    //anchor: '100%',
                    //id:'plantilla',
                    itemId: 'plantilla',
                    allowBlank: false,
                    required:true,
                    flex: 1,
                    validator: function() {
                        return this.up( 'tablasplantillasnotificacionmanualformview' ).validarCampos( this, '#plantilla' );
                    }
                },
                {
                    xtype: 'button',
                    text: 'Agregar',
                    menu: {
                        xtype: 'menu',
                        width: 500,
                        itemId: 'etiquetas',
                        layout: {
                            type: 'table',
                            columns: 2
                        },
                        items: [
                        ]
                    }
                }
            ]
        }/*, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'textareafield',
                    name: 'pls_mplantillaOpnClo',
                    fieldLabel: 'Plantilla Opn/Clo',
                    itemId: 'plantilla2',
                    flex: 1,
                    validator: function() {
                        return this.up( 'tablasplantillasnotificacionmanualformview' ).validarCampos( this, '#plantilla2' );
                    }
                }, {
                    xtype: 'button',
                    text: 'Agregar',
                    menu: {
                        xtype: 'menu',
                        width: 500,
                        itemId: 'etiquetasplantilla2',
                        layout: {
                            type: 'table',
                            columns: 2
                        },
                        items: [
                        ]
                    }
                }
            ]
        }*/
    ],

    validarCampos: function( controller, field ) {
        var view = controller.up( 'tablasplantillasnotificacionmanualformview' );
        var save = view.down( '#save' );
        var plantilla = view.down( field );
        var plantillaValor = plantilla.getValue();
        var regex = /<<(.*?)>>/ig;
        var regex2 = /\[\[(.*?)\]\]/ig;

        if( plantillaValor != '' ) {
            var encuentra = false;
            var noencuentra = false;
            var encuentra2 = false;
            var noencuentra2 = false;
            var etiquetaError = '';
            var error = '';
            var re = plantillaValor.match( regex );
            var re2 = plantillaValor.match( regex2 );

            if( re || re2 ) {
                while( match = regex.exec( plantillaValor ) ) {
                    Ext.Array.each( view.listaEtiquetas, function( rec, i ) {
                        if( rec.etiqueta == '<<' + match[ 1 ] + '>>' ) {
                            encuentra = true;
                            return false;
                        } else {
                            encuentra = false;
                            etiquetaError = match[ 1 ].etiqueta;
                        }
                    });
                    if( encuentra == false ) {
                        noencuentra = true;
                    }
                }

                while( match = regex2.exec( plantillaValor ) ) {
                    Ext.Array.each( view.listaEtiquetas, function( rec, i ) {
                        if( rec.etiqueta == '[[' + match[ 1 ] + ']]' ) {
                            encuentra2 = true;
                            return false;
                        } else {
                            encuentra2 = false;
                            etiquetaError = match[ 1 ].etiqueta;
                        }
                    }
                    );
                    if( encuentra2 == false ) {
            			noencuentra2 = true;
                    }
                }

                if( noencuentra == true || noencuentra2 == true ) {
                    error = getLocale( 'Se encontraron etiquetas mal formuladas o no disponibles.' );
                    plantilla.markInvalid( error );
                    plantilla.textValid = false;
                    //   save.setDisabled(true);
                } else {
                    plantilla.clearInvalid();
                    plantilla.textValid = true;
                    //  notifyError('La plantilla se encuenta bien formulada.');
                    // save.setDisabled(false);
                    return true;
                }
            } else {
                error = getLocale( 'Al menos debe tener una etiqueta.' );
                plantilla.markInvalid( error );
                plantilla.textValid = false;
                //   save.setDisabled(true);
            }
        } else {
            //  save.setDisabled(false);
            return true;
        }

        if( plantilla.textValid == true && view.down( '#codigo' ).textValid == true ) {
            // save.setDisabled(false);
            return true;
        } else {
            //  save.setDisabled(true);
            return error;
        }
    },

    initComponent: function() {
        
        this.callParent();

        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    itemId: 'save'
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    } // cierro init
});