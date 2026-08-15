//MIGRADO2024
Ext.define( 'Common.controller.m_reportes_automaticos_dealerFormController',
    {
        extend: 'Ext.app.Controller',
        stores: [ 'Common.store.CuentaReporteFrecuenciaStore', 'Common.store.CuentaReporteTipoStore' ],
        models: [ 'm_reportes_automaticos_dealerModel', 'TablasGruposSearchModel', 'TablasCodigosAlarmaSearchModel' ],
        views: [ 'm_reportes_automaticos_dealerFormView' ],
        init: function (config ) {
            var me = this;
            // genero los eventos
            this.control( {
                'mreportesautomaticosdealerformview': {
                    afterrender: this.initview
                },
                'mreportesautomaticosdealerformview button[action=savereporte]': {
                    click: this.onSaveClick
                },
                'mreportesautomaticosdealerformview button[action=deletereporte]': {
                    click: this.onDeleteClick
                },
                'mreportesautomaticosdealerformview #rad_ntipo': {
                    change: this.onTipoSelected
                },
                'mreportesautomaticosdealerformview #grupos': {
                    change: this.onGrupoChange
                }
            });
        }, // cierro initget       ReporteModelModel
        onTipoSelected: function (combo, value ) {
            //console.log(arguments)
            var view = combo.up( 'mreportesautomaticosdealerformview' );
            if( value == 4 ) {
                view.down( '#grupos' ).show()
                view.down( '#grupos' ).setValue( '' )
                view.down( '#grupos' ).setRawValue( '' )
            } else {
                view.down( '#grupos' ).hide()
                view.down( '#alarmasgrupo' ).hide()
            }
        },
            
        onGrupoChange: function (combo, value ) {
            var view = combo.up( 'mreportesautomaticosdealerformview' )
            if( value != '' ) {
                console.log( arguments )
                var store = Ext.create( 'Ext.data.Store', {
                    model: this.getTablasCodigosAlarmaSearchModelModel(),
                    pageSize: 500,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [ {
                        property: 'cod_cGrupo',
                        value: combo.lastSelection[ 0 ].get( 'gru_ccodigo' )
                    }]
                })
                view.down( '#alarmasgrupo' ).show()
                store.load( {
                    callback: function( records ) {
                        var codigosAlarma = [];
                        store.each( function( record ) {
                            codigosAlarma.push( record.get( 'cod_ccodigo' ) )
                        })
                        if( codigosAlarma.length > 0 ) {
                            view.down( '#alarmasgrupo' ).setValue( codigosAlarma.join( ',' ) )
                        } else {
                            view.down( '#alarmasgrupo' ).setValue( getLocale( 'No se encuentran alarmas relacionadas al grupo' ) )
                        }
                    }
                })
            }
        },
        initview: function(view ) {
            var dealer = view.record;
            view.dealer = dealer;
            var module = view.module;
            var form = view.getForm();
            var controller = this;
            var storeEventos = this.getCuentaReporteFrecuenciaStoreStore();
            view.down( '#rad_nfrecuencia' ).bindStore( storeEventos );
            view.down( '#rad_nfrecuencia' ).setValue( 0 );
            /**
             * Daniel O. Medina
             * 25/11/2020
             * https://basecamp.com/2249105/projects/14758734/todos/422355404
             */         
            storeEventos.clearFilter(true);
                           
            storeEventos.filter(
                {filterFn: function(item) { 
                    return item.get("Value") <=3; 
                    }
                }
            );            
                            
            //view.down( '#rad_nfrecuencia' ).disable( true );
            /*********************************************************************/
            var storeTipo = this.getCuentaReporteTipoStoreStore()
            view.down( '#rad_ntipo' ).bindStore( storeTipo )
            var objectId = dealer.get( 'Id' );
            var store = Ext.create( 'Ext.data.Store', {
                model: this.getM_reportes_automaticos_dealerModelModel(),
                pageSize: 500,
                remoteSort: true,
                remoteFilter: true,
                filters: [ {
                    property: 'rad_idKey',
                    value: objectId
                }]
            })
            store.load( {
                callback: function( records ) {
                    var record = records[ 0 ]
                    if( !record ) {
            //            view.record = controller.createRecord( view );
            //            record = view.record;
                    } else {
                        view.record = record;
                    }
            //        view.record.set( 'eventos', view.record.get( 'rad_meventos' ).split( ',' ) );
                    view.loadRecord( view.record );
                }
            }); // cierro load
            var comboGrupos = view.down( '#grupos' );
            var combostore = Ext.create( 'Ext.data.Store', {
                model: this.getTablasGruposSearchModelModel(),
                pageSize: 200,
                remoteSort: true
            });
            comboGrupos.bindStore( combostore );
            combostore.load( {
                callback: function() {
                    if( comboGrupos.getValue() == 0 ) {
                        comboGrupos.setRawValue( '' )
                    }
                }
            });
            /**
             * Si este formulario se abrio desde AdminCuentas debo bloquear la toolbar
             * */
            var principalForm = view.up( 'tablaslineasformview' );
            if( principalForm && principalForm.readOnly ) {
                var docked = view.getDockedItems();
                Ext.each( docked, function( item ) {
                    if( item.xtype == "toolbar" ) {
                        item.hide();
                    }
                });
            }
            if (dealer.get('rad_ntipo')!=4){
                view.down('#alarmasgrupo').hide();
            }
        },
            
        createRecord: function(view ) {
            var model = this.getM_reportes_automaticos_dealerModelModel();
            var dealer = view.dealer;
            var record = model.create( {
                rad_linidkey: dealer.get( 'Id' ),
                rad_tproximoenvio: new Date()
            });
            return record
        },
        onDeleteClick: function(button, event, options ) {
            var view = button.up( 'form' );
            var myform = view.getForm();
            var record = view.record;
            view.down('#rad_nfrecuencia').setValue(3);
            view.down('#rad_tproximoenvio').setValue(Ext.Date.add( new Date(), Ext.Date.MONTH, 1 ));
            view.down('#rad_ntipo').setValue(3);
            view.down('#grupos').setValue('');
            view.down('#alarmasgrupo').setValue('');
            view.down('#rad_cmail').setValue('');
            view.down('#rad_nAlerta').setValue(0);
        },
        onSaveClick: function(button, event, options ) {
            var view = button.up( 'form' );
            var myform = view.getForm();
            var record = view.record;
            myform.updateRecord( record );
            /**
             * Obtencion del valor del checkbox para Cuentas con eventos que Generen Alarma
             */
            var nAlertaCheck = view.down( '#rad_nAlerta' ).getValue()
            if( nAlertaCheck ) {
                record.set( 'rad_nAlerta', 1 );
            } else {
                record.set( 'rad_nAlerta', 0 );
            }
            if( myform.isValid() ) {
                if(record.get('rad_ntipo')==4){
                    if(!record.get('rad_idGrupo')){
                        notifyError( 'Si seleccionó el tipo Grupos, la selección de uno de ellos es obligatoria.' );
                        return;
                    }
                }
                record.set( 'rad_cmail', record.get( 'rad_cmail' ).split( ',' ).join( ';' ) )
                record.save( {
                    controller: this,
                    failure: function( record, operation ) {
                        console.log( arguments )
                    },// cierro function
                    success: function( record, operation ) {
                        var controller = operation.controller;
                        view.up('window').close();
                        notify( 'Los cambios se guardaron con éxito' );
                    }// cierro function
                });// cierro save
            } else {
                notifyError( 'Por favor corrija los valores incorrectos.' );
            }
        },
            
        onEventSelect: function(combo, records, options ) {
            var form = combo.up( 'form' ).getForm();
            var field = form.findField( 'rad_meventos' );
            field.setValue( new String().concat( combo.getValue() ) );
        }
    }
);