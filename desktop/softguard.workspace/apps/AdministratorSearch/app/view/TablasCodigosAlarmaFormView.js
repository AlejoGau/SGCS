Ext.define( 'AdministratorSearch.view.TablasCodigosAlarmaFormView',
    {
        extend: 'Ext.form.Panel',
        alias: [ 'widget.tablascodigosalarmasformview' ],
        preventHeader: true,
        frame: true,
        border: 0,
        trackResetOnLoad: true,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 100,
            enforceMaxLength: true
        },
        autoScroll: true,
        items: [
            {
                xtype: 'displayfield',
                itemId: 'nombre',
                fieldCls: 'nombre',
                name: 'nombre'
            }, {
                xtype: 'textfield',
                name: 'cod_ccodigo',
                itemId: 'codigo',
                fieldLabel: 'Codigo',
                allowBlank: false,
                maxLength: 3,
                inputWidth: 40,
                validator: function( value ) {
                    var t = this;
                    if( value != this.originalValue && this.originalValue != undefined ) {
                        var form = t.up( 'form' ).getForm();
                        var codigo = form.findField( 'cod_ccodigo' ).getValue();
                        var filters = [ {
                            property: 'cod_ccodigo',
                            value: codigo
                        }];

                        var model = 'AdministratorSearch.model.TablasCodigosAlarmaSearchModel';
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
                                } else {
                                    t.clearInvalid();
                                    t.textValid = true;
                                }
                            }
                        })
                    } else {
                        t.clearInvalid();
                        t.textValid = true;
                    }
                    return t.textValid;
                }
            }, {
                xtype: 'textfield',
                name: 'cod_cdescripcion',
                fieldLabel: 'Descripcion',
                allowBlank: false,
                maxLength: 100,
                anchor: '100%',
                listeners: {
                    blur: function( d ) {
                        var newVal = d.getValue();
                        this.up( 'form' ).down( '#nombre' ).setValue( newVal );
                    }
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Alerta',
                name: 'cod_nalerta',
                store: [
                    [ 1, getLocale( 'Genera alerta' ) ],
                    [ 0, getLocale( 'No genera alerta' ) ],
                    [ 2, getLocale( 'No genera evento' ) ]
                ],
                allowBlank: false,
                inputWidth: 200
            }, {
                xtype: 'numberfield',
                name: 'cod_nprioridad',
                fieldLabel: 'Prioridad',
                allowBlank: false,
                minValue: 0,
                maxValue: 9,
                inputWidth: 40
            }, {
                xtype: 'combo',
                fieldLabel: 'Tipo',
                name: 'cod_ntipo',
                store: [
                    [ 0, getLocale( 'General' ) ],
                    [ 1, getLocale( 'Desactivacion' ) ],
                    [ 2, getLocale( 'Activacion' ) ],
                    [ 3, getLocale( 'Estado' ) ],
                    [ 4, getLocale( 'Restauracion' ) ],
                    [ 5, getLocale( 'Motor Encendido' ) ],
                    [ 6, getLocale( 'Motor Apagado' ) ],
                    [ 7, getLocale( 'Asignación Tarea' ) ],
                    [ 8, getLocale( 'Ingreso' ) ],
                    [ 9, getLocale( 'Egreso' ) ],
                    [ 10, getLocale( 'Asistencia' ) ],
                    [ 11, getLocale( 'Control Acceso Valido' ) ],
                    [ 12, getLocale( 'Control Acceso Invalido' ) ]
                ],
                allowBlank: false,
                inputWidth: 200
            }, {
                xtype: 'combo',
                fieldLabel: 'Sistema',
                name: 'cod_nsistema',
                store: [
                    [ 1, getLocale( 'Si' ) ],
                    [ 0, getLocale( 'No' ) ],
                ],
                allowBlank: false,
                inputWidth: 40,
                disabled: true
            }
            , {
                xtype: 'combo',
                fieldLabel: 'Visualiza',
                name: 'cod_nResuelve',
                store: [
                    [ 0, getLocale( 'Zona' ) ],
                    [ 1, getLocale( 'Usuario' ) ],
                    [ 2, getLocale( 'Nada' ) ],
                    [ 3, getLocale( 'Ambos' ) ]
                ],
                allowBlank: false,
                inputWidth: 200
            }, {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                anchor: '100%',
                margin: '0 0 5 0',
                items: [
                    {
                        xtype: 'displayfield',
                        value: getLocale( 'Sonido' ) + ':'
                    }, {
                        xtype: 'button',
                        text: '',
                        iconCls: 'icon-sound',
                        action: 'playsound',
                        itemId: 'play',
                        tooltip: getLocale( 'Reproducir' ),
                        margin: '0 5 0 5'
                    }, {
                        xtype: 'button',
                        text: '',
                        iconCls: 'icon-sound-mute',
                        action: 'stopsound',
                        tooltip: getLocale( 'Stop' ),
                        margin: '0 5 0 5',
                        hidden: true,
                        itemId: 'stop'
                    }, {
                        xtype: 'textfield',
                        name: 'cod_cSonido',
                        fieldLabel: '',
                        itemId: 'urlsonido',
                        width: 300
                    }, {
                        xtype: 'button',
                        text: 'Elegir sonido',
                        itemId: 'elegirsonido'
                    }, {
                        xtype: 'checkboxfield',
                        name: '_nLeeSonido',
                        itemId: '_nLeeSonido',
                        fieldLabel: 'Lee sonido',
                        labelAlign: 'right',
                        margin: '0 0 5 0'
                    }
                ]
            }, {
                xtype: 'fieldset',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '3 0 0 0',
                        defaults: { labelWidth: 80 },
                        border: false,
                        collapsible: false,
                        title: 'Color letra',
                        items: [
                            {
                                xtype: 'colorpicker',
                                name: 'cod_nColorLetra',
                                itemId: 'colorletra',
                                fieldLabel: 'Color letra',
                                allowBlank: false,
                                listeners: {

                                    select: function( picker, selColor ) {
                                        var view = this.up( 'tablascodigosalarmasformview' );
                                        this.up( 'form' ).down( '#nombre' ).setFieldStyle( 'color : #' + selColor );
                                        view.record.set( 'cod_nColorLetra', view.hexToRgb( selColor ) );
                                    }
                                }
                            }
                        ]
                    }, {
                        xtype: 'fieldset',
                        margin: '3 0 0 0',
                        defaults: { labelWidth: 80 },
                        border: false,
                        collapsible: false,
                        title: 'Color fondo',
                        items: [
                            {
                                xtype: 'colorpicker',
                                name: 'cod_ncolor',
                                fieldLabel: 'Color',
                                itemId: 'colorfondo',
                                allowBlank: false,
                                listeners: {

                                    select: function( picker, selColor ) {
                                        var view = this.up( 'tablascodigosalarmasformview' );
                                        this.up( 'form' ).down( '#nombre' ).setFieldStyle( 'background-color : #' + selColor );
                                        view.record.set( 'cod_ncolor', view.hexToRgb( selColor ) );
                                    }
                                }
                            }
                        ]
                    }
                ]
            }, 
            /*{
          xtype: 'selecterfield',
            itemId: 'cod_cGrupo',
            simpleSelect: false,
            config: {
                disponible: {
                    title: 'Grupo',
                    field: 'gru_cdescripcion',
                    searchField: 'o.[gru_cdescripcion]'
                },
                selecionado: {
                    title: 'Grupo',
                    field: 'gru_cdescripcion'
                },
                valueField: 'gru_cdescripcion',
                valueFieldFilter: ':IN',
                modelItems: 'AdministratorSearch.model.TablasGruposSearchModel'
            },
         title: 'Grupo'
        
        },*/

        //Federico V. reemplace el selecter anterior por un fieldset para que varios grupos puedan asociarse a una alarma
        {
          xtype: 'fieldset',
          margin: '10 0 0 0',
          title: 'Grupo',
          itemId: 'gruposfieldset',
          items:[
              {
                  xtype: 'textarea',
                  fieldLabel: 'Seleccionados',
                  height:120,
                  name: '_grupos',
                  readOnly: true,
                  itemId: 'grupos'
              },
               {
                        xtype : 'textarea',
                        fieldLabel : 'Seleccionados',
                        name: 'gru_cdescripcion',
                        itemId:'gruposhide',
                        hidden: true
                },
              {
                  xtype: 'button',
                  text: 'Seleccionar',
                  itemId: 'agregargrupo',
                  margin: '5 0 5 0',
              }
          ] 
        
        },

            {
                xtype: 'fieldset',
                margin: '10 0 10 0',
                title: 'Auto-Proceso',
                itemId:'autoproceso',
                items:[
                    
                    {
                        xtype : 'textarea',
                        fieldLabel : 'Seleccionados',
                        height:120,
                        name: '_eventos',
                        labelWidth: 120,
                        anchor: '100%',
                        readOnly: true,
                        itemId:'eventos'
                    },
                    {
                        xtype : 'textarea',
                        fieldLabel : 'Seleccionados',
                        name: 'gru_cdescripcion',
                        itemId:'eventoshide',
                        hidden: true
                    },
                    {
                        xtype:'button',
                        text:'Modificar',
                        margin: '5 0 5 0',
                        itemId:'agregarevento'
                    }
                ]
            }
            , {
                xtype: 'combo',
                fieldLabel: 'Multimonitor',
                name: 'cod_nMultiMonitor',
                store: [
                    [ 1, getLocale( 'Si' ) ],
                    [ 0, getLocale( 'No' ) ],
                ],
                allowBlank: false,
                inputWidth: 40
            }, {
                xtype: 'htmleditor',
                anchor: '100%',
                fieldLabel: getLocale( 'Instrucciones' ),
                name: 'cod_cinstrucciones_DSS',
                createLink: function() {
                    var url = prompt( this.createLinkText, this.defaultLinkValue );
                    if( url && url != 'http:/' + '/' ) {
                        this.relayCmd( 'insertHTML', "<a href='" + url + "' target='_blank'>" + this.getDoc().getSelection() + "</a>" );
                    }
                }
            }, {
                xtype: 'fieldset',
                title: '',
                collapsible: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        margin: '0 0 5 0',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Sms',
                                name: 'cod_nSms',
                                store: [
                                    [ 1, getLocale( 'Si' ) ],
                                    [ 0, getLocale( 'No' ) ],
                                ],
                                allowBlank: false
                            }, {
                                xtype: 'combo',
                                fieldLabel: 'Mail',
                                name: 'cod_nMail',
                                store: [
                                    [ 1, getLocale( 'Si' ) ],
                                    [ 0, getLocale( 'No' ) ],
                                ],
                                allowBlank: false,
                                margin: '0 0 5 30'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        margin: '0 0 5 0',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Manual',
                                name: 'cod_nManual',
                                store: [
                                    [ 1, getLocale( 'Si' ) ],
                                    [ 0, getLocale( 'No' ) ],
                                ],
                                allowBlank: false
                            }, {
                                xtype: 'combo',
                                fieldLabel: 'Movil',
                                name: 'cod_nMovil',
                                store: [
                                    [ 1, getLocale( 'Si' ) ],
                                    [ 0, getLocale( 'No' ) ],
                                ],
                                allowBlank: false,
                                margin: '0 0 5 30'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        margin: '0 0 5 0',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Video',
                                name: 'cod_nVideo',
                                store: [
                                    [ 1, getLocale( 'Si' ) ],
                                    [ 0, getLocale( 'No' ) ],
                                ],
                                allowBlank: false,
                                margin: '0 0 5 0'
                            }, {
                                xtype: 'combo',
                                fieldLabel: 'Autoridad',
                                name: 'cod_nAutoridad',
                                store: [
                                    [ 1, getLocale( 'Si' ) ],
                                    [ 0, getLocale( 'No' ) ],
                                ],
                                allowBlank: false,
                                margin: '0 0 5 30'
                            }
                        ]
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        margin: '0 0 5 0',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Web Cliente',
                                name: 'cod_nWebCliente',
                                store: 'SiNoStore',
                                displayField: 'Name',
                                queryMode: 'local',
                                forceSelection: true,
                                editable: false,
                                valueField: 'Value'
                            }
                        ]
                    }
                ]
            }
            , {
                xtype: 'gridpanel',
                flex: 1,
                autoScroll: true,
                scroll: true,
                title: 'Formatos y Receptores relacionados',
                itemId: 'relacionados',
                columns: [
                    {
                        xtype: 'gridcolumn',
                        header: 'Codigo Formatos',
                        dataIndex: 'for_cformato',
                        flex: 1
                    },
                    {
                        xtype: 'gridcolumn',
                        header: 'Formatos',
                        dataIndex: 'for_cdescripcion',
                        flex: 1
                    }, {
                        xtype: 'gridcolumn',
                        header: 'Receptores',
                        dataIndex: 'rec_cdescripcion',
                        flex: 1
                    }
                ]
            }
        ],

        hexToRgb: function( hex ) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace( shorthandRegex, function( m, r, g, b ) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
            /*
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
            */
            return parseInt( result[ 3 ], 16 ) * 65536 + parseInt( result[ 2 ], 16 ) * 256 + parseInt( result[ 1 ], 16 )
        },

        initComponent: function() {
            this.callParent();

            var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
                items: [
                    {
                        iconCls: 'icon-table-save',
                        text: 'Guardar',
                        scope: this,
                        action: 'save'
                    }
                ]// cierro items
            });
            this.addDocked( toolbar );
        } // cierro init
    }
);