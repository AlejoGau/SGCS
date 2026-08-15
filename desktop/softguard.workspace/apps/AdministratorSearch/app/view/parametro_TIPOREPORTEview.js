Ext.define( 'AdministratorSearch.view.parametro_TIPOREPORTEview', {
    extend: 'Ext.form.Panel',
    alias: 'widget.parametro_TIPOREPORTEview',
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
            xtype: 'combobox',
            itemId: 'comboreport',
            name: 'par_ivalor',
            fieldLabel: 'Valor',
            store: [
                [ 0, getLocale( 'Básico' ) ],
                [ 1, getLocale( 'Completo' ) ],
                [ 2, getLocale( 'Custom' ) ]
            ], value: 0
        }, {
            xtype: 'fieldset',
            itemId: 'customreportchecks',
            title: 'Seleccione los datos que incluira el reporte',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            hidden: true,
            items: [ {
                xtype: 'checkboxgroup',
                itemId: 'incluirchecks',
                columns: 2,
                vertical: true,
                hideLabel: true,

                items: [ {
                    xtype: 'checkbox',
                    itemId: 'origencheck',
                    fieldLabel: 'Origen',
                    checked: false
                }, {
                        xtype: 'checkbox',
                        itemId: 'cuentamadrecheck',
                        fieldLabel: 'Cuenta panel',
                        checked: true

                    }, {
                        xtype: 'checkbox',
                        itemId: 'categorizacioncheck',
                        fieldLabel: 'Categorizacion',
                        checked: false

                    }, {
                        xtype: 'checkbox',
                        itemId: 'observacionescheck',
                        fieldLabel: 'Observaciones',
                        checked: true

                    }, {
                        xtype: 'checkbox',
                        itemId: 'operadorcheck',
                        fieldLabel: 'Operador',
                        checked: false

                    }, {
                        xtype: 'checkbox',
                        itemId: 'resolucioncheck',
                        fieldLabel: 'Resolucion',
                        checked: false
                    }, {
                        xtype: 'checkbox',
                        itemId: 'timelinecheck',
                        fieldLabel: 'Timeline',
                        checked: true
                    }, {
                        xtype: 'checkbox',
                        itemId: 'llamadascheck',
                        fieldLabel: 'Llamadas',
                        checked: true
                    }
                    // BC 379771841 : Agregado del check para Linea de Tarjeta
                    , {
                        xtype: 'checkbox',
                        itemId: 'lineatarjetacheck',
                        fieldLabel: 'Linea de tarjeta',
                        checked: false
                    }
                    // 04/03/2019 : Solicitado por Fernando Canonico, cliente Mexicano
                    , {
                        xtype: 'checkbox',
                        itemId: 'horacuentacheck',
                        fieldLabel: 'Horario Cuenta',
                        checked: false
                    }]
            }]
        }, {
            xtype: 'fieldset',
            itemId: 'customreport',
            title: 'Opciones avanzadas',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: [ {
                xtype: 'combobox',
                itemId: 'pdfAttach',
                name: 'pdfAttach',
                fieldLabel: 'Se debe adjuntar PDF',
                store: [
                    [ 0, getLocale( 'No' ) ]
                    , [ 1, getLocale( 'Sí' ) ]
                    //,[2,getLocale('Custom')]
                ],
                value: 0,
                validator: function(v){
                    // me fijo el valor y obligo a completar el texto
                    var view = this.up('parametro_TIPOREPORTEview');
                    var pdfBodyAttach = view.down('#pdfBodyAttach').getValue();
                    var result = true;
                    var value = this.getValue();
                    if (value == 1 && pdfBodyAttach == ''){
                        result = getLocale('Debe completar un cuerpo para el mensaje');
                    }
                    else{
                        this.clearInvalid();
                    }

                    return result;
                },
                listeners: {
                    change: function( combo, value ) {
                        var view = combo.up( 'parametro_TIPOREPORTEview' )

                        if( value == 1 ) {
                            view.down( '#pdfBodyAttach' ).show();
                            view.customReport();
                        } else {
                            view.down( '#pdfBodyAttach' ).setValue( '' );
                            view.down( '#pdfBodyAttach' ).hide();
                            view.customReport();
                        }
                    }
                }
            }, {
                    xtype: 'textarea',
                    name: 'pdfBodyAttach1',
                    itemId: 'pdfBodyAttach1',
                    alowBlank: false,
                    fieldLabel: 'Cuerpo del mensaje',
                    anchor: '100%',
                    hidden: true,
                    listeners: {
                        change: function( textareafield, value, e, eOpts ) {
                            var view = textareafield.up( 'parametro_TIPOREPORTEDEALERview' );
                            view.down('#pdfAttach').validate();
                            view.customReport();
                        }
                    },
                }, {
                    xtype: 'htmleditor',
                    name: 'pdfBodyAttach',
                    fieldLabel: '',
                    itemId: 'pdfBodyAttach',
                    flex: 1,
                    hidden: true,
                    getDocMarkup: function() {
                        var me = this,
                            h = me.iframeEl.getHeight() - me.iframePad * 2,
                            oldIE = ( Ext.isIE6 || Ext.isIE7 || Ext.isIE8 );

                        // - IE9+ require a strict doctype otherwise text outside visible area can't be selected.
                        // - Opera inserts <P> tags on Return key, so P margins must be removed to void double line-height.
                        // - On browsers other than IE, the font is not inherited by the IFRAME so it must be specified.
                        return Ext.String.format(
                            ( oldIE ? '' : '<!DOCTYPE html>' )
                            + '<html><head><style type="text/css">'
                            + 'table {' +
                            '  border:1px solid black;' +
                            '  border-collapse:collapse;' +
                            '  width:100%;' +
                            '  margin: 0 0 15px 0;' +
                            ' }' +

                            'td {' +
                            ' border:1px solid black;  ' +
                            '  min-height:30px;' +
                            ' padding:1px;' +
                            '  font-size:12px;' +
                            ' }' +
                            ' th {' +
                            '  background:#e7e7e7;' +
                            ' padding:2px;' +
                            ' border:0;' +
                            ' font-size:14px;' +

                            ' }' +
                            ' .firma {' +
                            '     height:40px;' +
                            '     vertical-align:top;' +
                            '  }'
                            + ( Ext.isOpera ? 'p{margin:0}' : '' )
                            + 'body{border:0;margin:0;padding:{0}px;'
                            + ( oldIE ? '' : 'min-' )
                            + 'height:{1}px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;cursor:text;background-color:white;'
                            + ( Ext.isIE ? '' : 'font-size:12px;font-family:{2}' )
                            + '}</style></head><body></body></html>'
                            , me.iframePad, h, me.defaultFont );
                    },
                    listeners: {
                        sync: function( editor, html ) {
                            var view = editor.up( 'parametro_TIPOREPORTEview' );
                        },
                        change: function( textareafield, value, e, eOpts ) {
                            var view = textareafield.up( 'parametro_TIPOREPORTEview' );
                            view.down('#pdfAttach').validate();
                            view.customReport();
                        }
                    },
                }]
        }, {
            xtype: 'textarea',
            name: 'par_cvalor',
            fieldLabel: 'Valor',
            anchor: '100%',
            itemId: 'jsonvalues',
            alowBlank: false,
            hidden: true
        }],

    loadRecord: function( record ) {
        this.callParent(arguments);
        var incluirchecks = this.down('#incluirchecks').getBoxes();
        var par_cvalor = record.get('par_cvalor');

        try {
            var obj = Ext.JSON.decode(par_cvalor) 
            console.log(obj);

            this.down('#pdfAttach').setValue(obj[0].value);
            this.down('#pdfBodyAttach').setValue(obj[1].value);

            // Limpio todos los checks default
            Ext.Array.each(incluirchecks, function (v,k) {
                v.setValue(false);
            })
            Ext.Array.each(obj, function (v,j) {
                var objIdName = obj[j].property;
                Ext.Array.each(incluirchecks, function (v,k) {
                    var checkboxItem = v;
                    var checkIdName = checkboxItem.itemId;
                    
                    if (objIdName == checkIdName) {
                        checkboxItem.setValue(obj[j].value);
                    }
                })
            })   

        } catch (e) {

        }
    },
    customReport : function() {
        var array = [];
        /* Obtengo el combo de los 3 tipos de reporte */
        var comboreport = this.down('#comboreport');
        /* Obtengo donde se guardan los checkbox */
        var jsonvalues = this.down('#jsonvalues');
        var incluirchecks = this.down('#incluirchecks').getChecked();
        var pdfAttach = this.down('#pdfAttach').getValue();
        var pdfBodyAttach = this.down('#pdfBodyAttach').getValue();
        
        
        /* Si es igual a Custom abro el checkboxgroup */ 
        if (comboreport.getValue() == 2) {
            this.down('#customreportchecks').show();
            array.push({property:'pdfAttach',value:pdfAttach});
            array.push({property:'pdfBodyAttach',value:pdfBodyAttach});
            if(incluirchecks) {
                /* Uso el item id de los checks como nombre de la variable a pasar y su valor */
                Ext.Array.each(incluirchecks, function (v,k) {
                    array.push({property:v.itemId,value:v.checked});
                });
                jsonvalues.setValue(Ext.JSON.encode(array));            
            }else{

            }
        } else {
            /* Si no es igual a Custom cierro el checkboxgroup y leo los valores de pdf*/
            this.down('#customreportchecks').hide();
           
            array.push({property:'pdfAttach',value:pdfAttach});
            array.push({property:'pdfBodyAttach',value:pdfBodyAttach});
            jsonvalues.setValue(Ext.JSON.encode(array));  
        }
    },

/*
    customReport: function() {
        var array = [];
        // Obtengo el combo de los 3 tipos de reporte 
        var comboreport = this.down( '#comboreport' );
        // Obtengo donde se guardan los checkbox 
        var jsonvalues = this.down( '#jsonvalues' );
        var incluirchecks = this.down( '#incluirchecks' ).getChecked();

        // Si es igual a Custom abro el checkboxgroup 
        if( comboreport.getValue() == 2 ) {
            this.down( '#customreport' ).show();
            if( incluirchecks ) {
                // Uso el item id de los checks como nombre de la variable a pasar y su valor 
                Ext.Array.each( incluirchecks, function( v, k ) {
                    array.push( { property: v.itemId, value: v.checked });
                });
                jsonvalues.setValue( Ext.JSON.encode( array ) );
            }
        } else {
            // Si no es igual a Custom cierro el checkboxgroup 
            this.down( '#customreport' ).hide();
            jsonvalues.setValue( '' );
        }
    },
*/
    initComponent: function() {
        this.callParent();
        this.down( '#comboreport' ).on( 'change', this.customReport, this );
        this.down( '#incluirchecks' ).on( 'change', this.customReport, this );
    }
});