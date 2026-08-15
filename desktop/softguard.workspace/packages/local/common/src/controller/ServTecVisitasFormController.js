//MIGRADO2024
Ext.define( 'Common.controller.ServTecVisitasFormController', {
    extend: 'Ext.app.Controller',
    requires: [
        'Common.model.SerTecVisitasConflictoSearchModel',
        'Common.model.TipoServicioSearchModel'
    ],
    stores: [  ],
models: [ 'ServTecModel', 'ServTecSearchModel', 'ServTecVisitaModel', 'ServTecVisitaSearchModel', 'm_st_cabeceraModel' ],
views: [ 'ServTecVisitaFormView' ],
init: function(config ) {
    
    
    this.control( {
        'sertecvisitasformview': {
            afterrender: this.initview,
            moviladded: this.onSubItemAdded,
            tecnicoadded: this.onSubItemAdded
        },
        'sertecvisitasformview button[action=save]': {
            click: this.onSaveClick
        },
        'sertecvisitasformview #svi_tSalidaHaciaCliente': {
            change: this.onChangesvi_tSalidaHaciaCliente
        },
        'sertecvisitasformview #svi_tArriboAlCliente': {
            change: this.onChangesvi_tArriboAlCliente
        },
        'sertecvisitasformview #svi_tSalidaHaciaClienteHora': {
            change: this.onChangesvi_tSalidaHaciaCliente
        },
        'sertecvisitasformview #svi_tArriboAlClienteHora': {
            change: this.onChangesvi_tArriboAlCliente
        },
        'sertecvisitasformview #svi_nDuracionEstimada': {
            change: this.onChangeDuracion
        },
        'sertecvisitasformview servtectecnicovisitasgridview #comboTecnicos': {
            expand: this.onExpandComboTecnicos
        }
    });
}, // cierro init
initview: function(view ) {
    var record = view.record;
    var controller = this;

    console.log("record.get( 'Id' )", record.get( 'Id' ));
    console.log('Estado de Servicio->', record.get('svi_iEstado'))
    /*if (record.get( 'Id' ) == 0) {
        // Si no está cargado, llama a init después de un retardo de 1000 ms
        Ext.defer(this.initview, 1000, this, arguments);
        return;
    }*/
  if (record.get('svi_iEstado') === 4) {
    const campos = [
        '#fechayhora',
        '#svi_tSalidaHaciaCliente',
        '#svi_tSalidaHaciaClienteHora',
        '#estado',
        '#actualizarcabecera',
        '#tecnicos',
        '#moviles',
        '#svi_tArriboAlCliente',
        '#svi_tArriboAlClienteHora',
        '#svi_tSalidaDelCliente',
        '#svi_tSalidaDelClienteHora',
        '#save',
        '#Observacion'
    ];

    Ext.Array.each(campos, function (selector) {
        const cmp = view.down(selector);
        if (cmp) {
            cmp.setDisabled(true);
            cmp.el.setStyle({
                opacity: 0.6,
                pointerEvents: 'none'
            });
        }
    });
}
    // DK-1437: marcar si es visita nueva para decidir si cerrar el tab al guardar
    view.isNew = ( record.get( 'Id' ) == 0 );
    if( record.get( 'Id' ) == 0 ) {
        view.down( '#tecnicos' ).setDisabled( true );
        view.down( '#moviles' ).setDisabled( true );
        view.down( '#estado' ).setDisabled( true );
        this.setRecord( view, this );
    } else {
        view.down( '#svi_tSalidaHaciaCliente' ).setValue( new Date() )
        var modelvisita = controller.getServTecVisitaModelModel();
        modelvisita.load( record.get( 'Id' ), {
            callback: function( visita ) {
                view.record = visita;
                controller.setRecord( view, controller );
            }
        })
    }

    // DK-1437: registrar listener manual sobre el combo de tecnicos para refrescar el flag _conflicto al expandir
    Ext.defer( function() {
        var combo = view.down( 'servtectecnicovisitasgridview #comboTecnicos' );
        if( combo && !combo._dk1437ConflictoBound ) {
            combo._dk1437ConflictoBound = true;
            combo.on( 'expand', function() {
                controller.updateTecnicosConflicto( view );
            } );
            // Tambien al cambiar la query (escribir para typeAhead)
            combo.on( 'beforequery', function() {
                controller.updateTecnicosConflicto( view );
            } );
        }
    }, 500 );

    controller.getServTecModelModel().load( view.cabecera.get( 'Id' ), {
        callback: function( record ) {
            view.cabeceraRecord = record
            // DK-1437: si es visita nueva, precargar la duracion estimada segun el tipo de servicio de la orden
            // m_st_cabecera.stc_ctipo_servicio (char 3) -> _Tablas..t_tiposervicio.tip_ccodigo
            if( view.record.get( 'Id' ) == 0 ) {
                var tipoCodigo = record.get( 'stc_ctipo_servicio' );
                if( tipoCodigo ) {
                    var tipoStore = Ext.create( 'Ext.data.Store', {
                        model: 'Common.model.TipoServicioSearchModel',
                        remoteFilter: true,
                        filters: [ { property: 'tip_ccodigo', value: tipoCodigo } ]
                    } );
                    tipoStore.load( {
                        callback: function( records ) {
                            if( records && records.length > 0 ) {
                                var dur = records[ 0 ].get( 'tip_nDuracionEstimada' );
                                if( dur && dur > 0 ) {
                                    var durField = view.down( '#svi_nDuracionEstimada' );
                                    if( durField ) {
                                        durField.setValue( dur );
                                    }
                                    view.record.set( 'svi_cHorasPlanificadas', String( dur ) );
                                }
                            }
                        }
                    } );
                }
            }
        }
    })
},

    
onChangesvi_tSalidaHaciaCliente: function (combo ) {
    var view = combo.up( 'sertecvisitasformview' )
    var fecha = view.down( '#svi_tSalidaHaciaCliente' ).getValue()
    var hora = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue()
    var fechaHora = new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( hora ), 'H:i:s' ) )
    view.down( '#svi_tArriboAlCliente' ).setMinValue( fechaHora )
    //si no tiene una fecha definida le defino un defualt al horario
    if( !view.down( '#svi_tSalidaHaciaClienteHora' ).getValue() ) {
        view.down( '#svi_tSalidaHaciaClienteHora' ).setValue( new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' 00:00:00' ) )
    }
    // DK-1437: recalcular flag de conflicto en combo de tecnicos
    this.updateTecnicosConflicto( view );
},

onChangeDuracion: function( field ) {
    var view = field.up( 'sertecvisitasformview' );
    this.updateTecnicosConflicto( view );
},

onExpandComboTecnicos: function( combo ) {
    var view = combo.up( 'sertecvisitasformview' );
    if( view ) this.updateTecnicosConflicto( view );
},

updateTecnicosConflicto: function( view ) {
    console.log( '[DK-1437] updateTecnicosConflicto - inicio' );
    var combo = view.down( 'servtectecnicovisitasgridview #comboTecnicos' );
    if( !combo ) { console.log( '[DK-1437] No se encontro #comboTecnicos' ); return; }
    var tecnicoStore = combo.getStore();
    if( !tecnicoStore ) { console.log( '[DK-1437] El combo no tiene store' ); return; }

    var fecha = view.down( '#svi_tSalidaHaciaCliente' ).getValue();
    var hora = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue();
    var duracion = view.down( '#svi_nDuracionEstimada' ).getValue() || 1;
    if( !fecha || !hora ) { console.log( '[DK-1437] Falta fecha u hora, abortando', { fecha: fecha, hora: hora } ); return; }

    var desde = new Date(
        Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' +
        Ext.Date.format( new Date( hora ), 'H:i:s' )
    );
    var hasta = new Date( desde.getTime() + duracion * 60 * 60 * 1000 );
    var excluirId = view.record.get( 'Id' ) || 0;
    console.log( '[DK-1437] Consultando conflictos:', { desde: desde, hasta: hasta, excluirId: excluirId } );

    var conflictStore = Ext.create( 'Ext.data.Store', {
        model: 'Common.model.SerTecVisitasConflictoSearchModel',
        remoteFilter: false
    } );
    conflictStore.getProxy().setExtraParams( {
        stv_iTecnico: 0,
        desde: Ext.Date.format( desde, 'Y-m-d H:i:s' ),
        hasta: Ext.Date.format( hasta, 'Y-m-d H:i:s' ),
        svi_idKeyExcluir: excluirId
    } );
    conflictStore.load( {
        callback: function( records, op, success ) {
            console.log( '[DK-1437] SerTecVisitasConflicto respuesta:', { success: success, count: (records || []).length, records: records } );
            if( !success ) {
                console.warn( '[DK-1437] Fallo la consulta al SP de conflictos:', op );
                return;
            }
            var ocupados = {};
            Ext.Array.each( records || [], function( r ) {
                var id = r.get( 'stv_iTecnico' ) || r.get( 'ins_idKey' );
                if( id ) ocupados[ id ] = true;
            } );
            console.log( '[DK-1437] Tecnicos ocupados (ids):', Object.keys( ocupados ) );
            var marcados = 0;
            tecnicoStore.each( function( rec ) {
                var enConflicto = !!ocupados[ rec.get( 'ins_idKey' ) ];
                rec.set( '_conflicto', enConflicto );
                rec.commit();
                if( enConflicto ) marcados++;
            } );
            console.log( '[DK-1437] Tecnicos marcados con conflicto:', marcados );
            // Refrescar el picker del combo para que el getInnerTpl re-evalue _conflicto.
            try {
                var picker = combo.getPicker ? combo.getPicker() : combo.picker;
                if( picker && picker.refresh ) {
                    picker.refresh();
                    console.log( '[DK-1437] Picker refrescado' );
                } else {
                    console.log( '[DK-1437] Picker aun no creado, se mostrara al expandir' );
                }
            } catch( e ) { console.warn( '[DK-1437] Error al refrescar picker:', e ); }
        }
    } );
},
    
onChangesvi_tArriboAlCliente: function (combo ) {
    var view = combo.up( 'sertecvisitasformview' )
    var fecha = view.down( '#svi_tArriboAlCliente' ).getValue()
    var hora = view.down( '#svi_tArriboAlClienteHora' ).getValue()
    var fechaHora = new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( hora ), 'H:i:s' ) )
    view.down( '#svi_tSalidaDelCliente' ).setMinValue( fechaHora )
    //si no tiene una fecha definida le defino un defualt al horario
    if( !view.down( '#svi_tArriboAlClienteHora' ).getValue() ) {
        view.down( '#svi_tArriboAlClienteHora' ).setValue( new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' 00:00:00' ) )
    }
},
setRecord: function(view, controller ) {
    var record = view.record;
    if( new Date( record.get( 'svi_tFechaHora' ) ).getFullYear() <= 1900 ) {
        record.set( 'svi_tFechaHora', null );
    }
    if( new Date( record.get( 'svi_tSalidaHaciaCliente' ) ).getFullYear() <= 1900 ) {
        record.set( 'svi_tSalidaHaciaCliente', null );
    }
    if( new Date( record.get( 'svi_tArriboAlCliente' ) ).getFullYear() <= 1900 ) {
        record.set( 'svi_tArriboAlCliente', null );
    }
    if( new Date( record.get( 'svi_tSalidaDelCliente' ) ).getFullYear() <= 1900 ) {
        record.set( 'svi_tSalidaDelCliente', null );
    }
    view.loadRecord( record );
    view.dateAlta = new Date( record.get( 'svi_tFechaHora' ) )
    view.down( '#svi_tSalidaHaciaCliente' ).setValue( record.get( 'svi_tSalidaHaciaCliente' ) )
    view.down( '#svi_tArriboAlCliente' ).setValue( record.get( 'svi_tArriboAlCliente' ) )
    view.down( '#svi_tSalidaDelCliente' ).setValue( record.get( 'svi_tSalidaDelCliente' ) )
    // DK-1552 P9: si no hay svi_tSalidaHaciaCliente, default 12:00 (en vez de 21:00 que sale de new Date(null) en UTC-3)
    var _sFecha = record.get( 'svi_tSalidaHaciaCliente' );
    if( _sFecha && new Date( _sFecha ).getFullYear() > 1900 ) {
        view.down( '#svi_tSalidaHaciaClienteHora' ).setValue( Ext.Date.format( new Date( _sFecha ), 'H:i' ) );
    } else {
        view.down( '#svi_tSalidaHaciaClienteHora' ).setValue( '12:00' );
    }
    var _aFecha = record.get( 'svi_tArriboAlCliente' );
    if( _aFecha && new Date( _aFecha ).getFullYear() > 1900 ) {
        view.down( '#svi_tArriboAlClienteHora' ).setValue( Ext.Date.format( new Date( _aFecha ), 'H:i' ) );
    } else {
        view.down( '#svi_tArriboAlClienteHora' ).setValue( '' );
    }
    var _dFecha = record.get( 'svi_tSalidaDelCliente' );
    if( _dFecha && new Date( _dFecha ).getFullYear() > 1900 ) {
        view.down( '#svi_tSalidaDelClienteHora' ).setValue( Ext.Date.format( new Date( _dFecha ), 'H:i' ) );
    } else {
        view.down( '#svi_tSalidaDelClienteHora' ).setValue( '' );
    }
    // DK-1437: cargar el valor de svi_cHorasPlanificadas (varchar) parseado a numero
    var durRaw = record.get( 'svi_cHorasPlanificadas' );
    var durNum = parseFloat( durRaw );
    if( !isNaN( durNum ) && durNum > 0 ) {
        view.down( '#svi_nDuracionEstimada' ).setValue( durNum );
    }
    view.down( '#svi_tSalidaHaciaCliente' ).setMinValue( record.get( 'svi_tFechaHora' ) )
    //view.down('#svi_tSalidaHaciaClienteHora').setMinValue(record.get('svi_tFechaHora'))
    view.down( '#svi_tArriboAlCliente' ).setMinValue( record.get( 'svi_tSalidaHaciaCliente' ) )
    // view.down('#svi_tArriboAlClienteHora').setMinValue(record.get('svi_tSalidaHaciaCliente'))
    view.down( '#svi_tSalidaDelCliente' ).setMinValue( record.get( 'svi_tArriboAlCliente' ) )
    // view.down('#svi_tSalidaDelClienteHora').setMinValue(record.get('svi_tArriboAlCliente'))
    if( view.readOnly ) {
        view.down( '#save' ).hide()
        view.down( 'servtectecnicovisitasgridview' ).down( 'toolbar' ).hide()
        view.down( 'servtecmovilvisitasgridview' ).down( 'toolbar' ).hide()
    }
},
    
onSubItemAdded: function (record, view ) {
    // DK-1552 P1: agregar tecnico/movil ya NO debe disparar el save+close del form de visita.
    // El subitem (tecnico o movil) ya fue persistido en su propio handler (onAdd). Aca solo:
    //  - marcamos la visita como ya-no-nueva (porque para que el grid de tecnicos este habilitado
    //    la visita ya fue guardada al menos una vez)
    //  - refrescamos el flag visual de conflictos en el combo de tecnicos
    if( view ) {
        try {
            view.isNew = false;
            if( this.updateTecnicosConflicto ) this.updateTecnicosConflicto( view );
        } catch( e ) { /* silent */ }
    }
},
    
onSaveClick: function(button, event, options ) {
    var view = button.up( 'sertecvisitasformview' ) ? button.up( 'sertecvisitasformview' ) : button;
    var controller = this;

    // DK-1437: antes de guardar, validar conflictos de agenda para los tecnicos asignados
    controller.checkConflicts( view, function( conflictos ) {
        if( conflictos && conflictos.length > 0 ) {
            controller.showConflictModal( view, conflictos, function( omitir ) {
                if( omitir ) {
                    controller._continueSave( button, event, options );
                }
                // si no es omitir, cancela el guardado
            } );
        } else {
            controller._continueSave( button, event, options );
        }
    } );
},

checkConflicts: function( view, callback ) {
    console.log( '[DK-1437] checkConflicts - inicio' );
    // Obtener tecnicos asignados del grid interno
    var gridTec = view.down( '#gridTecnicos' ) || view.down( 'servtectecnicovisitasgridview' );
    if( !gridTec || !gridTec.getStore ) {
        console.log( '[DK-1437] No se encontro grid de tecnicos asignados, sin conflictos' );
        return callback( [] );
    }

    var tecnicos = gridTec.getStore().getRange();
    console.log( '[DK-1437] Tecnicos asignados a la visita:', (tecnicos || []).length );
    if( !tecnicos || tecnicos.length === 0 ) return callback( [] );

    var fecha = view.down( '#svi_tSalidaHaciaCliente' ).getValue();
    var hora = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue();
    var duracion = view.down( '#svi_nDuracionEstimada' ).getValue() || 1;

    if( !fecha || !hora ) { console.log( '[DK-1437] Falta fecha u hora para validar conflictos' ); return callback( [] ); }

    var desde = new Date(
        Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' +
        Ext.Date.format( new Date( hora ), 'H:i:s' )
    );
    var hasta = new Date( desde.getTime() + duracion * 60 * 60 * 1000 );
    var excluirId = view.record.get( 'Id' ) || 0;

    var totalQueries = tecnicos.length;
    var conflictosTotales = [];
    var completadas = 0;

    Ext.Array.each( tecnicos, function( tecRec ) {
        var tecId = tecRec.get( 'ins_idKey' ) || tecRec.get( 'stv_iTecnico' ) || tecRec.get( 'Id' );
        if( !tecId ) {
            completadas++;
            if( completadas >= totalQueries ) callback( conflictosTotales );
            return;
        }

        var store = Ext.create( 'Ext.data.Store', {
            model: 'Common.model.SerTecVisitasConflictoSearchModel',
            remoteFilter: false
        } );
        store.getProxy().setExtraParams( {
            stv_iTecnico: tecId,
            desde: Ext.Date.format( desde, 'Y-m-d H:i:s' ),
            hasta: Ext.Date.format( hasta, 'Y-m-d H:i:s' ),
            svi_idKeyExcluir: excluirId
        } );
        store.load( {
            callback: function( records, op, success ) {
                console.log( '[DK-1437] Conflictos para tecnico ' + tecId + ':', { success: success, count: (records || []).length } );
                if( records && records.length > 0 ) {
                    Ext.Array.each( records, function( r ) {
                        r.set( '_tecnicoConflicto', tecRec.get( 'ins_cnombre' ) || '' );
                    } );
                    conflictosTotales = conflictosTotales.concat( records );
                }
                completadas++;
                if( completadas >= totalQueries ) {
                    console.log( '[DK-1437] Total conflictos detectados:', conflictosTotales.length );
                    callback( conflictosTotales );
                }
            }
        } );
    } );
},

showConflictModal: function( view, conflictos, callback ) {
    var controller = this;

    // Datos de la visita actual (la que se esta intentando guardar)
    var fecha = view.down( '#svi_tSalidaHaciaCliente' ).getValue();
    var hora = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue();
    var duracion = view.down( '#svi_nDuracionEstimada' ).getValue() || 1;
    var inicioActual = new Date(
        Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' +
        Ext.Date.format( new Date( hora ), 'H:i:s' )
    );
    var finActual = new Date( inicioActual.getTime() + duracion * 60 * 60 * 1000 );

    var html = controller.renderMiniAgendaConflicto( inicioActual, finActual, conflictos );

    var win = Ext.create( 'Ext.window.Window', {
        title: 'Atencion - Conflicto de agenda',
        width: 620,
        height: 560,
        modal: true,
        layout: 'fit',
        items: [ {
            xtype: 'panel',
            autoScroll: true,
            bodyPadding: 10,
            // DK-1552 P6/P7: el bloque ROJO es la VISITA ACTUAL (que se intenta guardar);
            // los bloques VERDES son las visitas ya programadas que estan en conflicto.
            // El operador debe clickear en rojo para reconfigurar la visita actual.
            html: '<div style="font-size:13px; color:#333; margin-bottom:10px;">' +
                  'La visita actual tiene un conflicto de horario con otra visita ya programada.<br>' +
                  '<b>Seleccione la visita marcada en rojo para reconfigurarla y resolver el conflicto.</b>' +
                  '</div>' + html,
            listeners: {
                afterrender: function( p ) {
                    p.body.on( 'click', function( event ) {
                        // DK-1552 P6: ahora el clickeable es la visita actual (bloque rojo .bloque-actual)
                        var bloqueActual = Ext.fly( event.getTarget( '.bloque-actual' ) );
                        if( bloqueActual ) {
                            controller.openEditVisitaActual( view, win, function() {
                                callback( false ); // ya se reconfiguro y revalido, no continuar el save original
                            } );
                            return;
                        }
                    } );
                }
            }
        } ],
        buttons: [
            {
                text: 'Omitir',
                iconCls: 'icon-disk',
                handler: function() {
                    win.close();
                    callback( true );
                }
            }, {
                text: 'Cancelar',
                handler: function() {
                    win.close();
                    callback( false );
                }
            }
        ]
    } );
    win.show();
},

renderMiniAgendaConflicto: function( inicioActual, finActual, conflictos ) {
    // Determinar rango horario que abarca la visita actual + conflictivas (con padding 1h arriba y abajo)
    var minHora = inicioActual.getHours() + inicioActual.getMinutes() / 60;
    var maxHora = finActual.getHours() + finActual.getMinutes() / 60;
    Ext.Array.each( conflictos, function( c ) {
        var ini = c.get( 'svi_tSalidaHaciaCliente' );
        var fin = c.get( 'svi_tFinEstimado' );
        if( ini ) {
            var h = ini.getHours() + ini.getMinutes() / 60;
            if( h < minHora ) minHora = h;
        }
        if( fin ) {
            var h2 = fin.getHours() + fin.getMinutes() / 60;
            if( h2 > maxHora ) maxHora = h2;
        }
    } );
    minHora = Math.max( 0, Math.floor( minHora ) - 1 );
    maxHora = Math.min( 24, Math.ceil( maxHora ) + 1 );

    var pixelsPorHora = 40;
    var totalHeight = ( maxHora - minHora ) * pixelsPorHora;

    var html = '<div style="position:relative; border:1px solid #ccc; background:#fafafa; height:' + ( totalHeight + 20 ) + 'px;">';
    html += '<div style="position:relative; margin-left:50px; height:' + totalHeight + 'px; border-left:1px solid #ddd;">';

    // Lineas y labels de hora
    for( var h = minHora; h <= maxHora; h++ ) {
        var top = ( h - minHora ) * pixelsPorHora;
        html += '<div style="position:absolute; top:' + top + 'px; left:-50px; width:45px; text-align:right; font-size:11px; color:#999;">';
        html += ( h < 10 ? '0' : '' ) + h + ':00';
        html += '</div>';
        html += '<div style="position:absolute; top:' + top + 'px; left:0; right:0; border-top:1px solid #eee; height:1px;"></div>';
    }

    // DK-1552 P6: la VISITA ACTUAL va en ROJO (es la que tiene el problema y debe corregirse).
    // Las visitas ya programadas que estan en conflicto van en VERDE.
    var totalCols = 1 + conflictos.length;
    var colWidthPct = 100 / totalCols;

    // Bloque ROJO clickeable: visita actual (columna 0)
    var iniA = inicioActual.getHours() + inicioActual.getMinutes() / 60;
    var finA = finActual.getHours() + finActual.getMinutes() / 60;
    var topA = ( iniA - minHora ) * pixelsPorHora;
    var heightA = ( finA - iniA ) * pixelsPorHora;
    html += '<div class="bloque-actual" style="position:absolute; top:' + topA + 'px; left:calc(0% + 2px); width:calc(' + colWidthPct + '% - 4px); height:' + ( heightA - 2 ) + 'px;';
    html += 'background:#e53935; color:#fff; border-radius:4px; padding:4px 8px; font-size:11px; box-sizing:border-box; opacity:0.9; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.2);">';
    html += '<b>' + Ext.Date.format( inicioActual, 'H:i' ) + ' - ' + Ext.Date.format( finActual, 'H:i' ) + '</b><br>';
    html += 'Visita actual';
    html += '</div>';

    // Bloques VERDES: visitas en conflicto (no clickeables, solo informativos) - columna 1 en adelante
    Ext.Array.each( conflictos, function( c, idx ) {
        var ini = c.get( 'svi_tSalidaHaciaCliente' );
        var fin = c.get( 'svi_tFinEstimado' );
        if( !ini || !fin ) return;
        var iniH = ini.getHours() + ini.getMinutes() / 60;
        var finH = fin.getHours() + fin.getMinutes() / 60;
        var topC = ( iniH - minHora ) * pixelsPorHora;
        var heightC = ( finH - iniH ) * pixelsPorHora;
        var tecnico = c.get( 'ins_cnombre' ) || c.get( '_tecnicoConflicto' ) || '';
        var orden = c.get( 'stc_inumero' ) || '';
        var leftPct = ( idx + 1 ) * colWidthPct;
        html += '<div style="position:absolute; top:' + topC + 'px; left:calc(' + leftPct + '% + 2px); width:calc(' + colWidthPct + '% - 4px); height:' + ( heightC - 2 ) + 'px;';
        html += 'background:#4CAF50; color:#fff; border-radius:4px; padding:4px 8px; font-size:11px; box-sizing:border-box; opacity:0.9; box-shadow:0 1px 3px rgba(0,0,0,0.2);">';
        html += '<b>' + Ext.Date.format( ini, 'H:i' ) + ' - ' + Ext.Date.format( fin, 'H:i' ) + '</b><br>';
        if( tecnico ) html += Ext.String.htmlEncode( tecnico ) + '<br>';
        html += 'Orden ' + orden;
        html += '</div>';
    } );

    html += '</div></div>';
    return html;
},

// DK-1552 P6/P7: editar la VISITA ACTUAL (la que se esta creando, sin guardar todavia)
// desde el modal de conflicto. Al confirmar:
//  1) escribe los nuevos valores (fecha/hora/duracion) en los campos del form principal
//  2) cierra el modal de conflicto
//  3) re-chequea conflictos contra los nuevos valores
//  4) si AUN hay conflicto -> muestra aviso (P7) y no continua el save
//  5) si no hay -> notifica y deja al operador presionar Guardar nuevamente
openEditVisitaActual: function( view, winConflicto, callback ) {
    var controller = this;
    var fechaActual = view.down( '#svi_tSalidaHaciaCliente' ).getValue();
    var horaActual = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue();
    var duracionActual = view.down( '#svi_nDuracionEstimada' ).getValue() || 1;

    var fechaIni = fechaActual ? new Date( fechaActual ) : new Date();
    var horaStr = horaActual ? Ext.Date.format( new Date( horaActual ), 'H:i' ) : '12:00';

    var win = Ext.create( 'Ext.window.Window', {
        title: 'Reconfigurar visita actual',
        width: 460,
        height: 250,
        modal: true,
        layout: 'fit',
        items: [ {
            xtype: 'form',
            bodyPadding: 15,
            fieldDefaults: { labelWidth: 140, anchor: '100%' },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5 0',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha de inicio',
                            itemId: 'reFecha',
                            value: fechaIni,
                            format: 'd/m/Y',
                            flex: 1
                        }, {
                            xtype: 'timefield',
                            itemId: 'reHora',
                            value: horaStr,
                            format: 'H:i',
                            increment: 15,
                            margin: '0 0 0 5',
                            width: 110
                        }
                    ]
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Tiempo estimado',
                    itemId: 'reDuracion',
                    value: duracionActual,
                    minValue: 1,
                    maxValue: 24,
                    step: 1,
                    allowDecimals: false,
                    width: 220,
                    emptyText: 'horas'
                }
            ]
        } ],
        buttons: [
            {
                text: 'Aplicar',
                iconCls: 'icon-disk',
                handler: function() {
                    var f = win.down( 'form' );
                    var nuevaFecha = f.down( '#reFecha' ).getValue();
                    var nuevaHora = f.down( '#reHora' ).getValue();
                    var nuevaDur = f.down( '#reDuracion' ).getValue() || 1;
                    if( !nuevaFecha || !nuevaHora ) {
                        notifyError( 'Complete fecha y hora.' );
                        return;
                    }
                    // Aplicar valores al form principal
                    view.down( '#svi_tSalidaHaciaCliente' ).setValue( nuevaFecha );
                    view.down( '#svi_tSalidaHaciaClienteHora' ).setValue( Ext.Date.format( new Date( nuevaHora ), 'H:i' ) );
                    view.down( '#svi_nDuracionEstimada' ).setValue( nuevaDur );

                    win.close();
                    if( winConflicto ) winConflicto.close();

                    // DK-1552 P7: re-chequear conflictos con los nuevos valores
                    controller.checkConflicts( view, function( nuevosConflictos ) {
                        if( nuevosConflictos && nuevosConflictos.length > 0 ) {
                            Ext.Msg.alert(
                                'Conflicto persistente',
                                'La visita actual tiene un conflicto de horario con otra visita ya programada.<br>' +
                                '<b>Seleccione la visita marcada en rojo para reconfigurarla y resolver el conflicto.</b>'
                            );
                            // Reabrir el modal de conflicto con los nuevos datos
                            controller.showConflictModal( view, nuevosConflictos, function( omitir ) {
                                if( omitir ) controller._continueSave( view );
                            } );
                        } else {
                            notify( 'Conflicto resuelto. Presione Guardar para confirmar.' );
                        }
                        if( callback ) callback();
                    } );
                }
            }, {
                text: 'Cancelar',
                handler: function() { win.close(); }
            }
        ]
    } );
    win.show();
},

// DK-1437: cerrar la pestaña del form de Nueva Visita y refrescar el listado de visitas de la orden.
// Se usa cuando el operador edita una visita conflictiva desde el modal de conflicto.
closeFormAndRefreshList: function( view ) {
    try {
        // Cerrar la pestaña del form
        var tabPanel = view.up( 'tabpanel' );
        if( tabPanel ) {
            var card = view;
            while( card && card.up( 'tabpanel' ) !== tabPanel ) {
                card = card.up( 'panel' );
            }
            if( !card || card === tabPanel ) {
                card = tabPanel.getActiveTab();
            }
            if( card && !card.isDestroyed ) {
                tabPanel.remove( card, true );
            }
        }
        // Refrescar el grid de visitas de la orden
        var grids = Ext.ComponentQuery.query( 'servtecvisitagridview' );
        if( grids && grids.length > 0 ) {
            var lastGrid = grids[ grids.length - 1 ];
            if( lastGrid && lastGrid.getStore ) {
                var st = lastGrid.getStore();
                if( st && st.reload ) st.reload();
            }
        }
        notify( 'Visita actualizada.' );
    } catch( e ) { /* silent */ }
},

openEditConflictoVisita: function( svi_idKey, stv_iTecnicoActual, callback ) {
    var controller = this;
    if( !svi_idKey ) return;

    Common.model.ServTecVisitaModel.load( svi_idKey, {
        callback: function( record ) {
            if( !record ) {
                Ext.Msg.alert( 'Error', 'No se pudo cargar la visita.' );
                return;
            }

            var fechaIni = record.get( 'svi_tSalidaHaciaCliente' );
            if( !fechaIni || new Date( fechaIni ).getFullYear() <= 1900 ) fechaIni = new Date();

            // Store de tecnicos para el combo
            var tecnicoStore = Ext.create( 'Ext.data.Store', {
                model: 'Common.model.InstaladoresByTokenSearchModel',
                pageSize: 200,
                remoteFilter: true
            } );

            var win = Ext.create( 'Ext.window.Window', {
                title: 'Visita',
                width: 500,
                height: 320,
                modal: true,
                layout: 'fit',
                items: [ {
                    xtype: 'form',
                    bodyPadding: 15,
                    fieldDefaults: { labelWidth: 140, anchor: '100%' },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Orden',
                            value: record.get( 'svi_iServicio' ) || ''
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Personal asignado',
                            itemId: 'editTecnico',
                            store: tecnicoStore,
                            displayField: 'ins_cnombre',
                            valueField: 'ins_idKey',
                            queryMode: 'local',
                            editable: false,
                            margin: '5 0'
                        }, {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Fecha de inicio',
                                    itemId: 'editFecha',
                                    value: fechaIni,
                                    format: 'd/m/Y',
                                    flex: 1
                                }, {
                                    xtype: 'timefield',
                                    itemId: 'editHora',
                                    value: Ext.Date.format( fechaIni, 'H:i' ),
                                    format: 'H:i',
                                    increment: 15,
                                    margin: '0 0 0 5',
                                    width: 110
                                }
                            ]
                        }, {
                            xtype: 'numberfield',
                            fieldLabel: 'Tiempo estimado',
                            itemId: 'editDuracion',
                            value: parseFloat( record.get( 'svi_cHorasPlanificadas' ) ) || 1,
                            // DK-1552 P8: incremento de a 1 hora
                            minValue: 1,
                            maxValue: 24,
                            step: 1,
                            allowDecimals: false,
                            width: 220,
                            emptyText: 'horas'
                        }
                    ]
                } ],
                listeners: {
                    afterrender: function() {
                        // Cargar tecnicos y preseleccionar el actual
                        tecnicoStore.load( {
                            callback: function() {
                                if( stv_iTecnicoActual ) {
                                    win.down( '#editTecnico' ).setValue( stv_iTecnicoActual );
                                }
                            }
                        } );
                    }
                },
                buttons: [
                    {
                        text: 'Guardar',
                        iconCls: 'icon-disk',
                        handler: function() {
                            var form = win.down( 'form' );
                            var fecha = form.down( '#editFecha' ).getValue();
                            var hora = form.down( '#editHora' ).getValue();
                            var duracion = form.down( '#editDuracion' ).getValue();
                            var tecnicoNuevo = form.down( '#editTecnico' ).getValue();

                            if( !fecha || !hora ) {
                                notifyError( 'Complete fecha y hora.' );
                                return;
                            }

                            var fechaHora = new Date(
                                Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' +
                                Ext.Date.format( new Date( hora ), 'H:i:s' )
                            );

                            record.set( 'svi_tSalidaHaciaCliente', fechaHora );
                            record.set( 'svi_cHorasPlanificadas', String( duracion ) );

                            // Normalizar fechas 1900
                            [ 'svi_tFechaHora', 'svi_tArriboAlCliente', 'svi_tSalidaDelCliente' ].forEach( function( f ) {
                                if( !record.get( f ) ) record.set( f, new Date( '1/1/1900' ) );
                            } );

                            win.setLoading( 'Guardando...' );
                            record.save( {
                                callback: function( rec, op, success ) {
                                    if( !success ) {
                                        win.setLoading( false );
                                        notifyError( 'No se pudo guardar la visita.' );
                                        return;
                                    }

                                    // Si el tecnico cambio, actualizar via SP SerTecTecnicoVisitaCambiar
                                    if( tecnicoNuevo && tecnicoNuevo !== stv_iTecnicoActual ) {
                                        Ext.Ajax.request( {
                                            url: '/Rest/search/SerTecTecnicoVisitaCambiar',
                                            method: 'GET',
                                            params: {
                                                svi_idKey: svi_idKey,
                                                stv_iTecnicoActual: stv_iTecnicoActual || 0,
                                                stv_iTecnicoNuevo: tecnicoNuevo
                                            },
                                            callback: function( opt, success2 ) {
                                                win.setLoading( false );
                                                if( success2 ) {
                                                    notify( 'Visita actualizada.' );
                                                } else {
                                                    notifyError( 'Visita guardada pero no se pudo cambiar el tecnico.' );
                                                }
                                                win.close();
                                                if( callback ) callback();
                                            }
                                        } );
                                    } else {
                                        win.setLoading( false );
                                        notify( 'Visita actualizada.' );
                                        win.close();
                                        if( callback ) callback();
                                    }
                                }
                            } );
                        }
                    }, {
                        text: 'Cancelar',
                        handler: function() { win.close(); }
                    }
                ]
            } );
            win.show();
        }
    } );
},

// Actualiza el tecnico asignado en SerTecTecnicoVisitas. TODO: si la visita tiene multiples tecnicos
// hay que decidir cual se reemplaza. Por ahora pisa el primero.
updateTecnicoVisita: function( svi_idKey, tecnicoId, callback ) {
    // Implementacion via REST PUT directo. Si el endpoint no existe, sumar SP de update.
    Ext.Ajax.request( {
        url: '/Rest/SerTecTecnicoVisitasUpdate?svi_idKey=' + svi_idKey + '&stv_iTecnico=' + tecnicoId,
        method: 'POST',
        callback: function() {
            if( callback ) callback();
        }
    } );
},

_continueSave: function(button, event, options ) {
    var view = button.up( 'sertecvisitasformview' ) ? button.up( 'sertecvisitasformview' ) : button;
    var record = view.record;
    var controller = this;

    var savefilters = [
        {
            property: 'svi_iServicio',
            value: view.record.get( 'svi_iServicio' )
        }, {
            property: 'svi_iEstado',
            value: 3
        }, {
            property: 'svi_idKey:NOT',
            value: view.record.get( 'Id' )
        }
    ]
    var savestore = Ext.create( 'Ext.data.Store', {
        model: this.getServTecVisitaSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: savefilters
    })
    savestore.load( {
        callback: function( records ) {
            if( records.length > 0 ) {
                //si el servtec tiene alguna visita "Enejecucion"
                if( view.down( '#estado' ).getValue() == 3 ) {
                    //si la visita que se esta guardnado tiene seleccionado "En ejecucion"
                    Ext.MessageBox.show( {
                        title: 'Estado de servicio tecnico',
                        msg: 'Ya se encuentra otro servicio tecnico en ejecucion<br> Quiere pasar a pendiente el anterior?',
                        buttons: Ext.MessageBox.YESNOCANCEL,
                        itemId: 'msg' + records[ 0 ].get( 'Id' ),
                        autoDestroy: true,
                        fn: function( btn, text ) {
                            //Ext.example.msg('Button Click', 'You clicked the {0} button and entered the text "{1}".', btn, text);
                            if( btn == 'yes' ) {
                                //cambio el otro registro a pendiente y dejo este como en ejecucion
                                var cantidad = records.length;
                                var modelvisita = controller.getServTecVisitaModelModel();
                                Ext.Array.each( records, function( val, key ) {
                                    // cargo la visita a modificar analizar pasar esto a trigger
                                    modelvisita.load( val.get( 'Id' ), {
                                        callback: function( visitaejecucion ) {
                                            visitaejecucion.set( 'svi_iEstado', 1 );
                                            if( !visitaejecucion.get( 'svi_tFechaHora' ) ) {
                                                visitaejecucion.set( 'svi_tFechaHora', new Date( '1/1/1900' ) );
                                            }
                                            if( !visitaejecucion.get( 'svi_tSalidaHaciaCliente' ) ) {
                                                visitaejecucion.set( 'svi_tSalidaHaciaCliente', new Date( '1/1/1900' ) );
                                            }
                                            if( !visitaejecucion.get( 'svi_tArriboAlCliente' ) ) {
                                                visitaejecucion.set( 'svi_tArriboAlCliente', new Date( '1/1/1900' ) );
                                            }
                                            if( !visitaejecucion.get( 'svi_tSalidaDelCliente' ) ) {
                                                visitaejecucion.set( 'svi_tSalidaDelCliente', new Date( '1/1/1900' ) );
                                            }
                                            visitaejecucion.save()
                                        }
                                    });
                                    if( cantidad <= key + 1 ) {
                                        controller.forceSave( record, view );
                                    }
                                });
                            } else if( btn == 'no' ) {
                                // cambio este registro a pendiente
                                view.down( '#estado' ).setValue( 1 )
                                //record.set('svi_iEstado',1);
                                controller.forceSave( record, view );
                            } else {
                                //no hago nada
                            }
                        },
                        icon: Ext.MessageBox.QUESTION
                    });
                } else {
                    //si la visita que se esta guardnado NO tiene seleccionado "En ejecucion" 
                    controller.forceSave( record, view );
                    controller.closeMyTab(view)
                }
            } else {
                controller.forceSave( record, view, true );
                controller.closeMyTab(view)

            }
        }
        
    });

},
closeMyTab: function (view, options) {
    options = options || {};
    var tabPanel = view.up('tabpanel');
    if (!tabPanel || view.isDestroyed) return;

    var maxWait   = Ext.Number.from(options.maxWait, 8000);   // ms totales de espera
    var interval  = Ext.Number.from(options.interval, 250);   // ms entre chequeos
    var force     = !!options.force;
    var startTime = Ext.now();
    var controller = this;

    // 🔹 Activo pantalla grisada con spinner
    view.setLoading({
        msg: 'Cargando...',
        useTargetEl: true
    });

    function isSaving() {
        var rec = view.record;
        var cab = view.cabeceraRecord;
        var recSaving = !!(rec && (rec.dirty || rec.phantom === true));
        var cabSaving = !!(cab && cab.dirty);
        return recSaving || cabSaving;
    }

    // DK-1437: refrescar el grid de visitas padre (Common.view.ServTecVisitaGridView, xtype=servtecvisitagridview)
    function refreshParentGrid() {
        try {
            var caller = view.caller;
            var parentGrid = null;
            // El caller puede ser el propio grid o un panel que lo contiene
            if( caller ) {
                if( caller.getXType && caller.getXType() === 'servtecvisitagridview' ) {
                    parentGrid = caller;
                } else if( caller.down ) {
                    parentGrid = caller.down( 'servtecvisitagridview' );
                }
                if( !parentGrid && caller.up ) {
                    var parent = caller.up( 'sertepanelview' ) || caller.up( 'panel' );
                    if( parent && parent.down ) parentGrid = parent.down( 'servtecvisitagridview' );
                }
            }
            // Fallback: buscar global por componentQuery (cualquier grid de visitas montado)
            if( !parentGrid ) {
                var all = Ext.ComponentQuery.query( 'servtecvisitagridview' );
                if( all && all.length > 0 ) parentGrid = all[ all.length - 1 ];
            }
            if( parentGrid && parentGrid.getStore ) {
                var st = parentGrid.getStore();
                if( st && st.reload ) st.reload();
            }
        } catch( e ) { /* silent */ }
    }

    function doClose() {
        if (view.isDestroyed) return;
        view.setLoading(false);

        // DK-1552 P1: el tab NUNCA se cierra solo. Tras guardar (sea nueva o edicion),
        // queda abierto para que el operador pueda agregar tecnicos/movilidad. El operador
        // cierra el tab manualmente con la X cuando termino de configurar la visita.
        // Marcamos isNew=false porque despues del primer save ya tiene Id.
        view.isNew = false;
        refreshParentGrid();
        // DK-1552: rehabilitar paneles de tecnicos/moviles/estado tras el primer guardado
        try {
            if( view.record && view.record.get( 'Id' ) ) {
                if( view.down( '#tecnicos' ) ) view.down( '#tecnicos' ).setDisabled( false );
                if( view.down( '#moviles' ) ) view.down( '#moviles' ).setDisabled( false );
                if( view.down( '#estado' ) ) view.down( '#estado' ).setDisabled( false );
                var subTec = view.down( 'servtectecnicovisitasgridview' );
                var subMov = view.down( 'servtecmovilvisitasgridview' );
                if( subTec ) subTec.record = view.record;
                if( subMov ) subMov.record = view.record;
            }
        } catch( e ) { /* silent */ }
        notify('Los datos se guardaron con éxito.');
    }

    if (force) {
        return doClose();
    }

    // 🔹 Espera activa hasta que termine el guardado
    (function waitAndClose() {
        var elapsed = Ext.now() - startTime;
        if (!isSaving() || elapsed >= maxWait) {
            doClose();
        } else {
            Ext.defer(waitAndClose, interval);
        }
    })();
},

forceSave: function (record, view, force ) {
    var cabecera = view.cabeceraRecord;
    var myform = view.getForm();
    var controller = this;
    if( myform.isValid() ) {
        myform.updateRecord( view.record );
        if( !record.get( 'svi_cObservacion' ) ) {
            notify( 'Debe ingresar una observacion.' );
            return false;
        }
        var svi_tSalidaHaciaCliente = view.down( '#svi_tSalidaHaciaCliente' ).getValue()
        var svi_tArriboAlCliente = view.down( '#svi_tArriboAlCliente' ).getValue()
        var svi_tSalidaDelCliente = view.down( '#svi_tSalidaDelCliente' ).getValue()
        var svi_tSalidaHaciaClienteHora = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue()
        var svi_tArriboAlClienteHora = view.down( '#svi_tArriboAlClienteHora' ).getValue()
        var svi_tSalidaDelClienteHora = view.down( '#svi_tSalidaDelClienteHora' ).getValue()
        // DK-1437: persistir la duracion en svi_cHorasPlanificadas (varchar) - workaround sin tocar DLL
        var dur = view.down( '#svi_nDuracionEstimada' ).getValue();
        if( dur != null && dur > 0 ) {
            record.set( 'svi_cHorasPlanificadas', String( dur ) );
        }
        if( svi_tSalidaHaciaCliente != null ) {
            record.set( 'svi_tSalidaHaciaCliente', new Date( Ext.Date.format( new Date( svi_tSalidaHaciaCliente ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( svi_tSalidaHaciaClienteHora ), 'H:i:s' ) ) );
        }
        if( svi_tArriboAlCliente != null ) {
            record.set( 'svi_tArriboAlCliente', new Date( Ext.Date.format( new Date( svi_tArriboAlCliente ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( svi_tArriboAlClienteHora ), 'H:i:s' ) ) );
        }
        if( svi_tSalidaDelCliente != null ) {
            record.set( 'svi_tSalidaDelCliente', new Date( Ext.Date.format( new Date( svi_tSalidaDelCliente ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( svi_tSalidaDelClienteHora ), 'H:i:s' ) ) );
        }
        if( !record.get( 'svi_tSalidaHaciaCliente' ) ) {
            record.set( 'svi_tSalidaHaciaCliente', new Date( '1/1/1900' ) );
        }
        if( !record.get( 'svi_tArriboAlCliente' ) ) {
            record.set( 'svi_tArriboAlCliente', new Date( '1/1/1900' ) );
        }
        if( !record.get( 'svi_tSalidaDelCliente' ) ) {
            record.set( 'svi_tSalidaDelCliente', new Date( '1/1/1900' ) );
        }
        if( view.down( '#fechayhora' ).getValue() ) {
            record.set( 'svi_tFechaHora', view.dateAlta );
        }
    
        record.save( {
            callback: function( recordsaved, operation ) {
                if( view.down( '#estado' ).getValue() == 3 || force == true ) {
                    //guardo en servicio tecnico esta visita como la activa
                    //controller.getM_st_cabeceraModelModel().load(view.record.get('svi_iServicio'), {callback:function (recVisita){
                    // DK-1437: el panel servtectecnicovisitasgridview ahora contiene un grid interno #gridTecnicos
                    var gridTec = view.down( 'servtectecnicovisitasgridview #gridTecnicos' ) || view.down( 'servtectecnicovisitasgridview' );
                    var gridMov = view.down( 'servtecmovilvisitasgridview #gridMoviles' ) || view.down( 'servtecmovilvisitasgridview' );
                    var tecnico, movil;
                    if( gridTec && gridTec.getStore && gridTec.getStore() && gridTec.getStore().data.items.length > 0 ) {
                        tecnico = gridTec.getStore().data.items[ 0 ].get( 'ins_ccodigo' );
                    }
                    if( gridMov && gridMov.getStore && gridMov.getStore() && gridMov.getStore().data.items.length > 0 ) {
                        movil = gridMov.getStore().data.items[ 0 ].get( 'tmp_iid' );
                    }
                    // si tiene fecha de salida al cliente grabo esa
                    if( record.get( 'svi_tSalidaHaciaCliente' ) != new Date( '1/1/1900' ) ) {
                        cabecera.set( 'stc_dfecha_desde_1', record.get( 'svi_tSalidaHaciaCliente' ) );
                    } else {
                        cabecera.set( 'stc_dfecha_desde_1', record.get( 'svi_tFechaHora' ) );
                    }
                    cabecera.set( 'stc_ctecnico_1', tecnico );
                    cabecera.set( 'stc_cmovil_1', movil );
                    //en el st_cabecera el esta "En ejecucion" es 5
                    var estado = view.down( '#estado' ).getValue();
                    if( estado == 3 ) {
                        cabecera.set( 'stc_nestado', 5 );
                    } else if( estado == 4 ) {
                        cabecera.set( 'stc_nestado', 4 );
                    } else if( estado == 5 ) {
                        cabecera.set( 'stc_nestado', 3 );
                    } /*else if(estado == 6) {
                                recVisita.set('stc_nestado',5); 
                           }*/ else if( estado == 2 ) {
                        cabecera.set( 'stc_nestado', 2 );
                    }
                    /*
                    ESTO EN LA GRILLA
                    {Name: getLocale('Pendiente'), Value: 1},
                     {Name: getLocale('Asignado'), Value: 2},
                     {Name: getLocale('Cancelado'), Value: 3},
                     {Name: getLocale('Finalizado'), Value: 4},
                     {Name: getLocale('En Ejecución'), Value: 5}*/
                    /*   
                    ESTO EN LA VISITA
                    [2,'Asignado'],
                    [3,'En Ejecucion'],
                    [4,'Finalizado'],
                    [5,'Cancelado'],
                    [6,'Programada'] ?? NOTENGO EN LA GRILLA
                    */
                    for( var f in cabecera.data ) {
                        var date = cabecera.get( f );
                        if( f.search( "dfecha|dsalida|darribo|dintecnico|doutecnico" ) > 0 && date == null ) {
                            cabecera.set( f, new Date( '1/1/1900' ) );
                        }
                    }
                    if( view.down( '#actualizarcabecera' ).getValue() ) {
                        cabecera.save( {
                            callback: function() {
                                notify( 'Los datos se guardaron con éxito.' )
                                //actualizo los datos del panel
                                var tabPanel = view.up('tabpanel');

                                if( view.up( 'window' ) ) {
                                    view.caller.fireEvent( 'objectchanged', record, view.caller );
                                    view.caller.up( 'sertepanelview' ).fireEvent( 'objectchanged', record, view.caller.up( 'sertepanelview' ) );
                                    view.up( 'window' ).close();
                                } else {
                                    view.caller.fireEvent( 'objectchanged', cabecera, view.caller, false );
                                    view.up( 'sertepanelview' ).fireEvent( 'objectchanged', cabecera, view.up( 'sertepanelview' ) );
                                }
                                // DK-1552 P1: NO cerrar el tab automaticamente al guardar con cabecera actualizada.
                                // El operador debe poder seguir trabajando en la visita (agregar tecnicos/moviles)
                                // y cierra el tab con la X cuando termina.
                            }
                        })
                    }
                } else {
                    notify( 'Los datos se guardaron con éxito.' );
                    if( view.up( 'window' ) ) {
                        view.caller.fireEvent( 'objectchanged', record, view.caller, true );
                        view.up( 'window' ).close();
                    } else {
                        view.caller.fireEvent( 'objectchanged', record, view.caller, false );
                    }
                }
                if( record.get( 'Id' ) != 0 ) {
                    if( new Date( record.get( 'svi_tFechaHora' ) ).getFullYear() <= 1900 ) {
                        record.set( 'svi_tFechaHora', null );
                    }
                    if( new Date( record.get( 'svi_tSalidaHaciaCliente' ) ).getFullYear() <= 1900 ) {
                        record.set( 'svi_tSalidaHaciaCliente', null );
                    }
                    if( new Date( record.get( 'svi_tArriboAlCliente' ) ).getFullYear() <= 1900 ) {
                        record.set( 'svi_tArriboAlCliente', null );
                    }
                    if( new Date( record.get( 'svi_tSalidaDelCliente' ) ).getFullYear() <= 1900 ) {
                        record.set( 'svi_tSalidaDelCliente', null );
                    }
                    view.loadRecord( record )
                    view.down( '#tecnicos' ).setDisabled( false );
                    view.down( '#moviles' ).setDisabled( false );
                    view.down( '#estado' ).setDisabled( false );
                    view.down( 'servtectecnicovisitasgridview' ).record = record;
                    view.down( 'servtecmovilvisitasgridview' ).record = record;
                }
            }
        }); //cierro recordsave
    } else {
        notifyError( 'Corrija los errores antes de guardar.' )
    }
}
});