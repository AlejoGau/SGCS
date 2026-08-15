Ext.define('SgAppSerTec.controller.ServTecAgendaController', {
    extend: 'Ext.app.Controller',
    requires: [
        'Common.model.ServTecVisitaModel'
    ],
    stores: [],
    models: ['ServTecAgendaSearchModel', 'InstaladoresByTokenSearchModel'],
    views: ['ServTecAgendaView'],

    // Paleta de colores para tecnicos
    tecnicoColors: [
        '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#009688',
        '#E91E63', '#3F51B5', '#FF5722', '#607D8B', '#795548'
    ],
    colorMap: {},
    colorIndex: 0,

    init: function(config) {
        this.control({
            'servtecagendaview': {
                afterrender: this.initView
            },
            'servtecagendaview button[action=aplicarFiltro]': {
                click: this.onAplicarFiltro
            },
            'servtecagendaview button[action=borrarFiltro]': {
                click: this.onBorrarFiltro
            },
            'servtecagendaview button[action=prevDate]': {
                click: this.onPrevDate
            },
            'servtecagendaview button[action=nextDate]': {
                click: this.onNextDate
            },
            'servtecagendaview button[action=refresh]': {
                click: this.onRefresh
            },
            'servtecagendaview button[action=viewDia]': {
                click: this.onViewDia
            },
            'servtecagendaview button[action=viewSemana]': {
                click: this.onViewSemana
            },
            'servtecagendaview button[action=viewMes]': {
                click: this.onViewMes
            },
            // DK-1552 P10: al cambiar la fecha en el datefield, actualizar la agenda automaticamente
            'servtecagendaview #fechaAgenda': {
                change: this.onFechaChange
            },
            // DK-1552 P2: checkbox para mostrar/ocultar visitas sin tecnico
            'servtecagendaview #chkSinTecnico': {
                change: this.onAplicarFiltro
            }
        });
    },

    onFechaChange: function(field, newVal, oldVal) {
        // DK-1552 P10: refrescar agenda automaticamente sin necesidad de apretar "Actualizar"
        if( !newVal ) return;
        if( oldVal && Ext.Date.format( newVal, 'Y-m-d' ) === Ext.Date.format( oldVal, 'Y-m-d' ) ) return;
        var view = field.up( 'servtecagendaview' );
        if( view ) this.loadAgenda( view );
    },

    renderLeyendaTecnicos: function(view, tecnicosStore) {
        var controller = this;
        var cont = view.down('#leyendaTecnicos');
        if (!cont) return;
        var html = '';
        tecnicosStore.each(function(rec) {
            var nombre = rec.get('ins_cnombre');
            if (!nombre) return;
            var color = controller.getColorForTecnico(nombre);
            html += '<div style="display:flex; align-items:center; margin:4px 0; font-size:12px;">';
            html += '<div style="width:20px; height:14px; background:' + color + '; border-radius:2px; margin-right:8px; flex-shrink:0;"></div>';
            html += '<span style="color:#333;">' + Ext.String.htmlEncode(nombre) + '</span>';
            html += '</div>';
        });
        if (!html) html = '<div style="color:#999; font-size:11px;">Sin tecnicos</div>';
        cont.update(html);
    },

    initView: function(view) {
        var controller = this;
        view.currentView = 'dia';

        // Cargar combo de tecnicos y leyenda
        var tecnicoStore = Ext.create('Ext.data.Store', {
            model: this.getInstaladoresByTokenSearchModelModel(),
            pageSize: 200,
            remoteSort: true,
            remoteFilter: true
        });
        view.down('#comboTecnico').bindStore(tecnicoStore);
        tecnicoStore.load({
            callback: function() {
                controller.renderLeyendaTecnicos(view, tecnicoStore);
            }
        });

        // Cargar agenda
        this.loadAgenda(view);

        // DK-1437: la agenda es solo lectura. Click en un bloque abre modal con info (sin editar).
        var centerPanel = view.down('#agendaCenter');
        if (centerPanel && centerPanel.body) {
            centerPanel.body.on('click', function(event) {
                var bloque = Ext.fly(event.getTarget('.agenda-bloque'));
                if (bloque) {
                    var id = bloque.getAttribute('data-id');
                    if (id) controller.showInfoVisitaModal(view, parseInt(id, 10));
                }
            });
        } else {
            view.on('afterrender', function() {
                var cp = view.down('#agendaCenter');
                if (cp && cp.body) {
                    cp.body.on('click', function(event) {
                        var bloque = Ext.fly(event.getTarget('.agenda-bloque'));
                        if (bloque) {
                            var id = bloque.getAttribute('data-id');
                            if (id) controller.showInfoVisitaModal(view, parseInt(id, 10));
                        }
                    });
                }
            }, this, { single: true });
        }
    },

    showInfoVisitaModal: function(view, svi_idKey) {
        var controller = this;
        if (!svi_idKey) return;
        Common.model.ServTecVisitaModel.load(svi_idKey, {
            callback: function(record) {
                if (!record) {
                    Ext.Msg.alert('Error', 'No se pudo cargar la visita.');
                    return;
                }
                controller.openInfoVisitaWindow(view, record);
            }
        });
    },

    openInfoVisitaWindow: function(view, record) {
        var fechaIni = record.get('svi_tSalidaHaciaCliente');
        if (!fechaIni || new Date(fechaIni).getFullYear() <= 1900) fechaIni = null;

        var win = Ext.create('Ext.window.Window', {
            title: 'Visita #' + record.get('Id'),
            width: 460,
            height: 340,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyPadding: 15,
                fieldDefaults: { labelWidth: 140, anchor: '100%', readOnly: true },
                items: [
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Orden',
                        value: record.get('svi_iServicio') || ''
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Fecha de inicio',
                        value: fechaIni ? Ext.Date.format(fechaIni, 'd/m/Y H:i') : '-'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Tiempo estimado',
                        value: (parseFloat(record.get('svi_cHorasPlanificadas')) || 1) + ' h'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Estado',
                        value: record.get('svi_iEstado') || ''
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Observación',
                        value: Ext.String.htmlEncode(record.get('svi_cObservacion') || '-')
                    }
                ]
            }],
            buttons: [
                { text: 'Cerrar', handler: function() { win.close(); } }
            ]
        });
        win.show();
    },

    showEditVisitaModal: function(view, svi_idKey) {
        var controller = this;
        if (!svi_idKey) return;

        Common.model.ServTecVisitaModel.load(svi_idKey, {
            callback: function(record) {
                if (!record) {
                    Ext.Msg.alert('Error', 'No se pudo cargar la visita.');
                    return;
                }
                controller.openEditVisitaWindow(view, record);
            }
        });
    },

    openEditVisitaWindow: function(view, record) {
        var controller = this;
        var fechaIni = record.get('svi_tSalidaHaciaCliente');
        if (!fechaIni || new Date(fechaIni).getFullYear() <= 1900) fechaIni = new Date();

        var win = Ext.create('Ext.window.Window', {
            title: 'Editar visita #' + record.get('Id'),
            width: 460,
            height: 320,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyPadding: 10,
                fieldDefaults: { labelWidth: 140, anchor: '100%' },
                items: [
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Orden',
                        value: record.get('svi_iServicio') || ''
                    }, {
                        xtype: 'datefield',
                        fieldLabel: 'Fecha de inicio',
                        itemId: 'editFecha',
                        value: fechaIni,
                        format: 'd/m/Y'
                    }, {
                        xtype: 'timefield',
                        fieldLabel: 'Hora',
                        itemId: 'editHora',
                        value: Ext.Date.format(fechaIni, 'H:i'),
                        format: 'H:i',
                        increment: 15
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Duracion (horas)',
                        itemId: 'editDuracion',
                        value: parseFloat(record.get('svi_cHorasPlanificadas')) || 1,
                        // DK-1552 P8: incremento de a 1 hora
                        minValue: 1,
                        maxValue: 24,
                        step: 1,
                        allowDecimals: false
                    }, {
                        xtype: 'textarea',
                        fieldLabel: 'Observacion',
                        itemId: 'editObservacion',
                        value: record.get('svi_cObservacion') || '',
                        height: 60
                    }
                ]
            }],
            buttons: [
                {
                    text: 'Guardar',
                    iconCls: 'icon-disk',
                    handler: function() {
                        var form = win.down('form');
                        var fecha = form.down('#editFecha').getValue();
                        var hora = form.down('#editHora').getValue();
                        var duracion = form.down('#editDuracion').getValue();
                        var obs = form.down('#editObservacion').getValue();

                        if (!fecha || !hora) {
                            notifyError('Complete fecha y hora.');
                            return;
                        }

                        var fechaHora = new Date(
                            Ext.Date.format(new Date(fecha), 'Y/m/d') + ' ' +
                            Ext.Date.format(new Date(hora), 'H:i:s')
                        );

                        record.set('svi_tSalidaHaciaCliente', fechaHora);
                        record.set('svi_cHorasPlanificadas', String(duracion));
                        if (obs) record.set('svi_cObservacion', obs);

                        // Normalizar fechas 1900 para evitar errores de serializacion
                        ['svi_tFechaHora', 'svi_tArriboAlCliente', 'svi_tSalidaDelCliente'].forEach(function(f) {
                            if (!record.get(f)) record.set(f, new Date('1/1/1900'));
                        });

                        win.setLoading('Guardando...');
                        record.save({
                            callback: function(rec, op, success) {
                                win.setLoading(false);
                                if (success) {
                                    notify('Visita actualizada.');
                                    win.close();
                                    controller.loadAgenda(view);
                                } else {
                                    notifyError('No se pudo guardar la visita.');
                                }
                            }
                        });
                    }
                }, {
                    text: 'Cancelar',
                    handler: function() { win.close(); }
                }
            ]
        });
        win.show();
    },

    getColorForTecnico: function(tecnico) {
        if (!this.colorMap[tecnico]) {
            this.colorMap[tecnico] = this.tecnicoColors[this.colorIndex % this.tecnicoColors.length];
            this.colorIndex++;
        }
        return this.colorMap[tecnico];
    },

    loadAgenda: function(view) {
        var controller = this;
        var fecha = view.down('#fechaAgenda').getValue();
        if (!fecha) fecha = new Date();

        var filters = [];
        var fechaDesde, fechaHasta;

        if (view.currentView === 'dia') {
            // DK-1552 P5: traer tambien el dia anterior para poder mostrar la cola de visitas
            // que arrancan tarde y cruzan medianoche
            var diaAnterior = Ext.Date.add(fecha, Ext.Date.DAY, -1);
            fechaDesde = Ext.Date.format(diaAnterior, 'Y-m-d') + ' 00:00:00';
            fechaHasta = Ext.Date.format(fecha, 'Y-m-d') + ' 23:59:59';
        } else if (view.currentView === 'semana') {
            var startOfWeek = Ext.Date.add(fecha, Ext.Date.DAY, -fecha.getDay() + 1);
            var endOfWeek = Ext.Date.add(startOfWeek, Ext.Date.DAY, 6);
            fechaDesde = Ext.Date.format(startOfWeek, 'Y-m-d') + ' 00:00:00';
            fechaHasta = Ext.Date.format(endOfWeek, 'Y-m-d') + ' 23:59:59';
        } else {
            var startOfMonth = Ext.Date.getFirstDateOfMonth(fecha);
            var endOfMonth = Ext.Date.getLastDateOfMonth(fecha);
            fechaDesde = Ext.Date.format(startOfMonth, 'Y-m-d') + ' 00:00:00';
            fechaHasta = Ext.Date.format(endOfMonth, 'Y-m-d') + ' 23:59:59';
        }

        // Filtros opcionales (sin operadores Slbf especiales: este Slbf no soporta ':GE'/':LE'/':LIKE')
        var tecnico = view.down('#comboTecnico').getValue();
        var cuenta = view.down('#filtroCuenta').getValue();
        var dealer = view.down('#filtroDealer').getValue();
        var orden = view.down('#filtroOrden').getValue();

        if (tecnico) filters.push({property: 'ins_ccodigo', value: tecnico});
        if (cuenta) filters.push({property: 'cue_cnombre', value: cuenta});
        if (dealer) filters.push({property: 'cue_clinea', value: dealer});
        if (orden) filters.push({property: 'stc_inumero', value: orden});

        var store = Ext.create('Ext.data.Store', {
            model: 'SgAppSerTec.model.ServTecAgendaSearchModel',
            remoteFilter: true,
            pageSize: 500,
            filters: filters
        });

        // Rango de fechas: parametros explicitos del SP (no via filter Slbf)
        store.getProxy().setExtraParams({
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta
        });

        store.load({
            callback: function(records) {
                // DK-1552 P2: filtrar visitas sin tecnico asignado segun el checkbox
                var chk = view.down('#chkSinTecnico');
                var mostrarSinTecnico = chk ? chk.getValue() : true;
                var filtrados = records;
                if( !mostrarSinTecnico ) {
                    filtrados = Ext.Array.filter( records || [], function(r) {
                        var tec = r.get('ins_ccodigo') || r.get('ins_cnombre');
                        return tec && Ext.String.trim( String(tec) ) !== '';
                    });
                }
                if (view.currentView === 'dia') {
                    controller.renderDayView(view, filtrados, fecha);
                } else if (view.currentView === 'semana') {
                    controller.renderWeekView(view, filtrados, fecha);
                } else {
                    controller.renderMonthView(view, filtrados, fecha);
                }
            }
        });
    },

    renderDayView: function(view, records, fecha) {
        var controller = this;
        var horaInicio = 0;
        var horaFin = 24;
        var pixelsPorHora = 60;

        var fechaStr = Ext.Date.format(fecha, 'D d/m/Y');
        var diaActual = Ext.Date.format(fecha, 'Y-m-d');
        var diaPrev = Ext.Date.format(Ext.Date.add(fecha, Ext.Date.DAY, -1), 'Y-m-d');

        // DK-1552 P5: pre-procesar para soportar visitas que cruzan medianoche.
        // - visita del dia actual con fin > 24 -> recortar a 24 y marcar "(continua)"
        // - visita del dia anterior con fin > 24 -> mostrar la cola desde 0:00 marcada "(viene de ayer)"
        var recordsAjustados = [];
        Ext.Array.each(records, function(r) {
            var fv = r.get('svi_tSalidaHaciaCliente');
            if (!fv) return;
            var diaVisita = Ext.Date.format(fv, 'Y-m-d');
            var horaIniV = fv.getHours() + fv.getMinutes() / 60;
            var dur = parseFloat(r.get('svi_cHorasPlanificadas'));
            if (!dur || isNaN(dur) || dur <= 0) dur = 1;
            var finV = horaIniV + dur;

            if (diaVisita === diaActual) {
                if (finV > 24) {
                    recordsAjustados.push({ record: r, _start: horaIniV, _end: 24, _cont: 'fin' });
                } else {
                    recordsAjustados.push({ record: r, _start: horaIniV, _end: finV, _cont: null });
                }
            } else if (diaVisita === diaPrev && finV > 24) {
                var colaDur = finV - 24;
                recordsAjustados.push({ record: r, _start: 0, _end: colaDur, _cont: 'inicio' });
            }
        });

        var html = '<div style="position:relative; padding: 0 10px;">';
        html += '<h2 style="text-align:center; margin:10px 0; font-size:16px; color:#333;">' + fechaStr + '</h2>';
        html += '<div style="position:relative; margin-left:60px; border-left:1px solid #ddd;">';

        // Lineas de hora
        for (var h = horaInicio; h <= horaFin; h++) {
            var top = (h - horaInicio) * pixelsPorHora;
            html += '<div style="position:absolute; top:' + top + 'px; left:-60px; width:55px; text-align:right; font-size:12px; color:#999;">';
            html += (h < 10 ? '0' : '') + h + ':00';
            html += '</div>';
            html += '<div style="position:absolute; top:' + top + 'px; left:0; right:0; border-top:1px solid #eee; height:1px;"></div>';
        }

        // Bloques de visitas
        var totalHeight = (horaFin - horaInicio) * pixelsPorHora;

        // DK-1552 P5: layout sobre la lista pre-procesada (con start/end ajustados al dia actual)
        var visitas = controller.layoutVisitasFromAdjusted(recordsAjustados);

        Ext.Array.each(visitas, function(v) {
            var record = v.record;
            var fechaVisita = record.get('svi_tSalidaHaciaCliente');
            var hora = v.start;
            var duracion = v.end - v.start;
            var tecnico = record.get('ins_cnombre') || 'Sin asignar';
            var orden = record.get('stc_inumero');
            var color = (v.conflicto && v.subCol > 0) ? '#c62828' : controller.getColorForTecnico(tecnico);

            var top = (hora - horaInicio) * pixelsPorHora;
            var height = duracion * pixelsPorHora;

            if (top < 0) top = 0;
            if (top + height > totalHeight) height = totalHeight - top;

            // DK-1552 P5: las horas de inicio/fin son la HORA REAL de la visita (no la ajustada al dia).
            // Para visitas que vienen del dia anterior (_cont = 'inicio'), el inicio real es el del record.
            var horaInicioReal = fechaVisita.getHours() + fechaVisita.getMinutes() / 60;
            var durTotal = parseFloat(record.get('svi_cHorasPlanificadas')) || 1;
            var horaFinReal = horaInicioReal + durTotal;
            var horaIniH = Math.floor(horaInicioReal);
            var minIni = Math.round((horaInicioReal - horaIniH) * 60);
            var horaIniStr = (horaIniH < 10 ? '0' : '') + (horaIniH % 24) + ':' + (minIni < 10 ? '0' : '') + minIni;
            var horaFinH = Math.floor(horaFinReal);
            var minFin = Math.round((horaFinReal - horaFinH) * 60);
            var horaFinStr = ((horaFinH % 24) < 10 ? '0' : '') + (horaFinH % 24) + ':' + (minFin < 10 ? '0' : '') + minFin;

            var widthPct = 100 / v.totalCols;
            var leftPct = v.col * widthPct;
            var subOffset = v.subCol * 12;

            html += '<div class="agenda-bloque" data-id="' + record.get('Id') + '" style="';
            html += 'position:absolute; top:' + top + 'px; left:calc(' + leftPct + '% + 2px + ' + subOffset + 'px); width:calc(' + widthPct + '% - 4px - ' + subOffset + 'px); height:' + (height - 2) + 'px;';
            html += 'background-color:' + color + '; color:#fff; border-radius:4px; padding:4px 8px;';
            html += 'font-size:12px; overflow:hidden; cursor:pointer; opacity:0.95;';
            html += 'box-shadow: 0 1px 3px rgba(0,0,0,0.3); box-sizing:border-box;';
            html += 'z-index:' + (10 + v.subCol) + ';';
            html += '">';
            // DK-1552 P5: marca de continuacion al dia siguiente / desde el dia anterior
            if (v.cont === 'inicio') {
                html += '<i style="font-size:10px; opacity:0.85;">(viene de ayer)</i><br>';
            }
            html += '<b>' + horaIniStr + ' - ' + horaFinStr + '</b> (' + durTotal + 'h)<br>';
            html += tecnico + '<br>';
            html += 'Orden ' + orden;
            if (v.cont === 'fin') {
                html += '<br><i style="font-size:10px; opacity:0.85;">(continua manana)</i>';
            }
            html += '</div>';
        });

        html += '<div style="height:' + totalHeight + 'px;"></div>';
        html += '</div></div>';

        var centerPanel = view.down('#agendaCenter');
        centerPanel.update(html);
    },

    // Asigna columnas a las visitas para renderizado. Reglas:
    //  - Cada tecnico tiene SU columna (asi visitas del mismo tecnico van apiladas en la misma columna).
    //  - Si dos tecnicos distintos tienen solape, van en columnas distintas (lado a lado).
    //  - Si dos visitas del MISMO tecnico se solapan -> mismo col + subCol con offset visual + flag _conflicto.
    // Devuelve [{record, start, end, col, totalCols, subCol, maxSubCol, conflicto}, ...] ordenado por start.
    layoutVisitas: function(records, diaKey) {
        var visitas = [];
        Ext.Array.each(records, function(record) {
            var fv = record.get('svi_tSalidaHaciaCliente');
            if (!fv) return;
            if (diaKey && Ext.Date.format(fv, 'Y-m-d') !== diaKey) return;
            var hora = fv.getHours() + fv.getMinutes() / 60;
            // DK-1437: la duracion se persiste en svi_cHorasPlanificadas (varchar) - parsear a float
            var duracion = parseFloat(record.get('svi_cHorasPlanificadas'));
            if (!duracion || isNaN(duracion) || duracion <= 0) duracion = 1;
            var tec = record.get('ins_ccodigo') || record.get('ins_cnombre') || '__sin_tecnico__';
            visitas.push({
                record: record, start: hora, end: hora + duracion,
                tecnico: tec,
                col: 0, totalCols: 1, subCol: 0, maxSubCol: 0, conflicto: false
            });
        });
        visitas.sort(function(a, b) { return a.start - b.start; });

        // Una columna por tecnico. Si la columna del tecnico ya esta ocupada en el rango, se reusa igual
        // (las visitas del mismo tecnico que se solapan quedan en la misma col -> conflicto visual).
        var cols = [];
        var colByTecnico = {};
        Ext.Array.each(visitas, function(v) {
            if (colByTecnico[v.tecnico] === undefined) {
                // Primer aparicion del tecnico -> buscar columna libre (que no se solape con visitas de OTROS tecnicos)
                var assigned = false;
                for (var i = 0; i < cols.length; i++) {
                    var libre = true;
                    Ext.Array.each(cols[i], function(u) {
                        if (u.start < v.end && u.end > v.start) libre = false;
                    });
                    if (libre) {
                        colByTecnico[v.tecnico] = i;
                        assigned = true;
                        break;
                    }
                }
                if (!assigned) {
                    cols.push([]);
                    colByTecnico[v.tecnico] = cols.length - 1;
                }
            }
            v.col = colByTecnico[v.tecnico];
            cols[v.col].push(v);
        });

        // SubCol y conflicto del mismo tecnico: para cada visita, contar cuantas previas del mismo tecnico se solapan
        Ext.Array.each(cols, function(colVisitas) {
            Ext.Array.each(colVisitas, function(v, idx) {
                var subCol = 0;
                for (var j = 0; j < idx; j++) {
                    var u = colVisitas[j];
                    if (u.tecnico === v.tecnico && u.start < v.end && u.end > v.start) subCol++;
                }
                v.subCol = subCol;
                if (subCol > 0) v.conflicto = true;
            });
            // Marcar conflicto tambien en las que tienen una posterior solapada
            Ext.Array.each(colVisitas, function(v) {
                Ext.Array.each(colVisitas, function(u) {
                    if (u !== v && u.tecnico === v.tecnico && u.start < v.end && u.end > v.start) {
                        v.conflicto = true;
                    }
                });
            });
            // maxSubCol del cluster (para calcular width)
            Ext.Array.each(colVisitas, function(v) {
                var maxSub = v.subCol;
                Ext.Array.each(colVisitas, function(u) {
                    if (u !== v && u.start < v.end && u.end > v.start) {
                        if (u.subCol > maxSub) maxSub = u.subCol;
                    }
                });
                v.maxSubCol = maxSub;
            });
        });

        // totalCols por cluster (max col de cualquier visita solapada)
        Ext.Array.each(visitas, function(v) {
            var maxCols = v.col + 1;
            Ext.Array.each(visitas, function(u) {
                if (u !== v && u.start < v.end && u.end > v.start) {
                    if (u.col + 1 > maxCols) maxCols = u.col + 1;
                }
            });
            v.totalCols = maxCols;
        });
        Ext.Array.each(visitas, function(v) {
            var maxCols = v.totalCols;
            Ext.Array.each(visitas, function(u) {
                if (u !== v && u.start < v.end && u.end > v.start) {
                    if (u.totalCols > maxCols) maxCols = u.totalCols;
                }
            });
            v.totalCols = maxCols;
        });

        return visitas;
    },

    // DK-1552 P5: variante de layoutVisitas que toma una lista pre-ajustada
    // (con _start, _end y _cont ya calculados, donde _cont indica si la visita viene
    // del dia anterior 'inicio' o continua al dia siguiente 'fin').
    layoutVisitasFromAdjusted: function(adjustedList) {
        var visitas = [];
        Ext.Array.each(adjustedList, function(item) {
            var record = item.record;
            var tec = record.get('ins_ccodigo') || record.get('ins_cnombre') || '__sin_tecnico__';
            visitas.push({
                record: record, start: item._start, end: item._end,
                tecnico: tec, cont: item._cont,
                col: 0, totalCols: 1, subCol: 0, maxSubCol: 0, conflicto: false
            });
        });
        visitas.sort(function(a, b) { return a.start - b.start; });

        var cols = [];
        var colByTecnico = {};
        Ext.Array.each(visitas, function(v) {
            if (colByTecnico[v.tecnico] === undefined) {
                var assigned = false;
                for (var i = 0; i < cols.length; i++) {
                    var libre = true;
                    Ext.Array.each(cols[i], function(u) {
                        if (u.start < v.end && u.end > v.start) libre = false;
                    });
                    if (libre) {
                        colByTecnico[v.tecnico] = i;
                        assigned = true;
                        break;
                    }
                }
                if (!assigned) {
                    cols.push([]);
                    colByTecnico[v.tecnico] = cols.length - 1;
                }
            }
            v.col = colByTecnico[v.tecnico];
            cols[v.col].push(v);
        });

        Ext.Array.each(cols, function(colVisitas) {
            Ext.Array.each(colVisitas, function(v, idx) {
                var subCol = 0;
                for (var j = 0; j < idx; j++) {
                    var u = colVisitas[j];
                    if (u.tecnico === v.tecnico && u.start < v.end && u.end > v.start) subCol++;
                }
                v.subCol = subCol;
                if (subCol > 0) v.conflicto = true;
            });
            Ext.Array.each(colVisitas, function(v) {
                Ext.Array.each(colVisitas, function(u) {
                    if (u !== v && u.tecnico === v.tecnico && u.start < v.end && u.end > v.start) {
                        v.conflicto = true;
                    }
                });
            });
        });

        Ext.Array.each(visitas, function(v) {
            var maxCols = v.col + 1;
            Ext.Array.each(visitas, function(u) {
                if (u !== v && u.start < v.end && u.end > v.start) {
                    if (u.col + 1 > maxCols) maxCols = u.col + 1;
                }
            });
            v.totalCols = maxCols;
        });
        Ext.Array.each(visitas, function(v) {
            var maxCols = v.totalCols;
            Ext.Array.each(visitas, function(u) {
                if (u !== v && u.start < v.end && u.end > v.start) {
                    if (u.totalCols > maxCols) maxCols = u.totalCols;
                }
            });
            v.totalCols = maxCols;
        });

        return visitas;
    },

    renderWeekView: function(view, records, fecha) {
        var controller = this;
        var startOfWeek = Ext.Date.add(fecha, Ext.Date.DAY, -fecha.getDay() + 1);
        var dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        var horaInicio = 6;
        var horaFin = 20;
        var pixelsPorHora = 40;
        var totalHeight = (horaFin - horaInicio) * pixelsPorHora;
        var colWidth = 'calc((100% - 60px) / 7)';

        var html = '<div style="position:relative; padding:0 10px;">';

        // Header dias
        html += '<div style="display:flex; margin-left:60px; border-bottom:2px solid #ddd; margin-bottom:5px;">';
        for (var d = 0; d < 7; d++) {
            var diaFecha = Ext.Date.add(startOfWeek, Ext.Date.DAY, d);
            var diaStr = dias[d] + ' ' + Ext.Date.format(diaFecha, 'd/m');
            html += '<div style="flex:1; text-align:center; font-weight:bold; font-size:12px; padding:5px 0;">' + diaStr + '</div>';
        }
        html += '</div>';

        // Grid horario
        html += '<div style="position:relative; margin-left:60px; display:flex;">';

        for (var d = 0; d < 7; d++) {
            var diaFecha = Ext.Date.add(startOfWeek, Ext.Date.DAY, d);
            var diaKey = Ext.Date.format(diaFecha, 'Y-m-d');

            html += '<div style="flex:1; position:relative; border-left:1px solid #eee; min-height:' + totalHeight + 'px;">';

            // Filtrar records de este dia y aplicar layout de columnas para los solapados
            var visitasDia = controller.layoutVisitas(records, diaKey);

            Ext.Array.each(visitasDia, function(v) {
                var record = v.record;
                var fechaVisita = record.get('svi_tSalidaHaciaCliente');
                var hora = v.start;
                var duracion = v.end - v.start;
                var tecnico = record.get('ins_cnombre') || 'Sin asignar';
                var orden = record.get('stc_inumero');
                var color = (v.conflicto && v.subCol > 0) ? '#c62828' : controller.getColorForTecnico(tecnico);

                var top = (hora - horaInicio) * pixelsPorHora;
                var height = duracion * pixelsPorHora;

                var widthPct = 100 / v.totalCols;
                var leftPct = v.col * widthPct;
                var subOffset = v.subCol * 8;

                html += '<div class="agenda-bloque" data-id="' + record.get('Id') + '" style="position:absolute; top:' + top + 'px; left:calc(' + leftPct + '% + 1px + ' + subOffset + 'px); width:calc(' + widthPct + '% - 2px - ' + subOffset + 'px); height:' + (height - 2) + 'px;';
                html += 'background:' + color + '; color:#fff; border-radius:3px; padding:2px 4px; font-size:10px; overflow:hidden; opacity:0.95; box-sizing:border-box; cursor:pointer;';
                html += 'z-index:' + (10 + v.subCol) + ';">';
                html += '<b>' + Ext.Date.format(fechaVisita, 'H:i') + '</b> ' + tecnico + '<br>Orden ' + orden;
                html += '</div>';
            });

            html += '</div>';
        }

        html += '</div>';

        // Horas en el lado izquierdo
        html += '<div style="position:absolute; top:30px; left:10px; width:50px;">';
        for (var h = horaInicio; h <= horaFin; h++) {
            var top = (h - horaInicio) * pixelsPorHora;
            html += '<div style="position:absolute; top:' + top + 'px; font-size:11px; color:#999; text-align:right; width:45px;">';
            html += (h < 10 ? '0' : '') + h + ':00</div>';
        }
        html += '</div>';

        html += '</div>';

        view.down('#agendaCenter').update(html);
    },

    renderMonthView: function(view, records, fecha) {
        var controller = this;
        var startOfMonth = Ext.Date.getFirstDateOfMonth(fecha);
        var endOfMonth = Ext.Date.getLastDateOfMonth(fecha);
        var startDay = startOfMonth.getDay() || 7; // Lunes = 1
        var totalDays = Ext.Date.getDaysInMonth(fecha);
        var dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

        var html = '<div style="padding:10px;">';
        html += '<h2 style="text-align:center; margin:5px 0 15px; font-size:16px;">' + Ext.Date.format(fecha, 'F Y') + '</h2>';

        // Header
        html += '<table style="width:100%; border-collapse:collapse;">';
        html += '<tr>';
        for (var d = 0; d < 7; d++) {
            html += '<th style="padding:8px; text-align:center; background:#f5f5f5; border:1px solid #ddd; font-size:12px;">' + dias[d] + '</th>';
        }
        html += '</tr>';

        // Dias
        var dia = 1;
        var startOffset = startDay - 1;
        for (var w = 0; w < 6; w++) {
            if (dia > totalDays) break;
            html += '<tr>';
            for (var d = 0; d < 7; d++) {
                var cellDay = w * 7 + d - startOffset + 1;
                if (cellDay < 1 || cellDay > totalDays) {
                    html += '<td style="border:1px solid #eee; height:80px; vertical-align:top; background:#fafafa;"></td>';
                } else {
                    var diaKey = Ext.Date.format(fecha, 'Y-m') + '-' + (cellDay < 10 ? '0' : '') + cellDay;
                    var visitasDelDia = 0;
                    Ext.Array.each(records, function(r) {
                        var fv = r.get('svi_tSalidaHaciaCliente');
                        if (fv && Ext.Date.format(fv, 'Y-m-d') === diaKey) visitasDelDia++;
                    });

                    html += '<td style="border:1px solid #ddd; height:80px; vertical-align:top; padding:4px;">';
                    html += '<div style="font-weight:bold; font-size:13px;">' + cellDay + '</div>';
                    if (visitasDelDia > 0) {
                        html += '<div style="background:#4CAF50; color:#fff; border-radius:3px; padding:2px 6px; font-size:11px; margin-top:4px; text-align:center;">';
                        html += visitasDelDia + ' visita' + (visitasDelDia > 1 ? 's' : '');
                        html += '</div>';
                    }
                    html += '</td>';
                }
            }
            html += '</tr>';
        }
        html += '</table></div>';

        view.down('#agendaCenter').update(html);
    },

    onAplicarFiltro: function(btn) {
        var view = btn.up('servtecagendaview');
        this.loadAgenda(view);
    },

    onBorrarFiltro: function(btn) {
        var view = btn.up('servtecagendaview');
        view.down('#comboTecnico').setValue('');
        view.down('#filtroCuenta').setValue('');
        view.down('#filtroDealer').setValue('');
        view.down('#filtroOrden').setValue('');
        this.loadAgenda(view);
    },

    onPrevDate: function(btn) {
        var view = btn.up('servtecagendaview');
        var fecha = view.down('#fechaAgenda').getValue();
        if (view.currentView === 'dia') {
            view.down('#fechaAgenda').setValue(Ext.Date.add(fecha, Ext.Date.DAY, -1));
        } else if (view.currentView === 'semana') {
            view.down('#fechaAgenda').setValue(Ext.Date.add(fecha, Ext.Date.DAY, -7));
        } else {
            view.down('#fechaAgenda').setValue(Ext.Date.add(fecha, Ext.Date.MONTH, -1));
        }
        this.loadAgenda(view);
    },

    onNextDate: function(btn) {
        var view = btn.up('servtecagendaview');
        var fecha = view.down('#fechaAgenda').getValue();
        if (view.currentView === 'dia') {
            view.down('#fechaAgenda').setValue(Ext.Date.add(fecha, Ext.Date.DAY, 1));
        } else if (view.currentView === 'semana') {
            view.down('#fechaAgenda').setValue(Ext.Date.add(fecha, Ext.Date.DAY, 7));
        } else {
            view.down('#fechaAgenda').setValue(Ext.Date.add(fecha, Ext.Date.MONTH, 1));
        }
        this.loadAgenda(view);
    },

    onRefresh: function(btn) {
        var view = btn.up('servtecagendaview');
        this.loadAgenda(view);
    },

    onViewDia: function(btn) {
        var view = btn.up('servtecagendaview');
        view.currentView = 'dia';
        this.loadAgenda(view);
    },

    onViewSemana: function(btn) {
        var view = btn.up('servtecagendaview');
        view.currentView = 'semana';
        this.loadAgenda(view);
    },

    onViewMes: function(btn) {
        var view = btn.up('servtecagendaview');
        view.currentView = 'mes';
        this.loadAgenda(view);
    }
});
