 
Ext.define( 'Common.controller.MulticuentaServicioTecnicoGridController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.ServTecEstadoStore', 'Common.store.CuentaStore', 'Common.store.tip_ntipoStore' ],
models: [ 'ServTecSearchModel', 'CuentaSearchModel', 'ServTecModel', 'TecnicosModel', 'TecnicosSearchModel', 'm_st_cabeceraModel', 'ServTecHistoricoModel', 't_provinciasSearchModel', 'InstaladoresByTokenSearchModel', 'ServTecVisitaModel', 'SoftguardCuentaModel' ],
views: [ 'MulticuentaServicioTecnicoGridView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'multicuentaserviciotecnicogridview': {
            afterrender: this.initView,
            cuentachanged: this.onCuentaChanged,
            cuentaselected: this.onCuentaChanged,
            itemdblclick: this.onItemDblClick,
            objectchanged: this.onObjectChanged,
            objectchange: this.onObjectChanged,
            objectnew: this.onObjectNew,
            refresh: this.initView
        },
        'multicuentaserviciotecnicogridview button[action=search]': {
            click: this.onSearchClick
        },
        'multicuentaserviciotecnicogridview button[action=todos]': {
            click: this.onTodosClick
        },
        'multicuentaserviciotecnicogridview button[action=buscarporcuenta]': {
            click: this.onBuscarPorCuentaClick
        },
        'multicuentaserviciotecnicogridview button[action=cancelado]': {
            click: this.onCanceladoClick
        },
        'multicuentaserviciotecnicogridview button[action=pendiente]': {
            click: this.onPendienteClick
        },
        'multicuentaserviciotecnicogridview button[action=finalizado]': {
            click: this.onFinalizadoClick
        },
        'multicuentaserviciotecnicogridview button[action=asignado]': {
            click: this.onAsignadoClick
        },
        'multicuentaserviciotecnicogridview button[action=encamino]': {
            click: this.onEnCaminoClick
        },
        'multicuentaserviciotecnicogridview button[action=enejecucion]': {
            click: this.onEnEjecucionClick
        },
        'multicuentaserviciotecnicogridview button[action=reporte]': {
            click: this.onReporteClick
        },
        'multicuentaserviciotecnicogridview button[action=groupDealerCuenta]': {
            click: this.onGroupDealerCuentaClick
        },
        'multicuentaserviciotecnicogridview button[action=groupCuenta]': {
            click: this.onGroupCuentaClick
        },
        'multicuentaserviciotecnicogridview button[action=groupTecnico]': {
            click: this.onGroupTecnicoClick
        },
        'multicuentaserviciotecnicogridview button[action=asignar]': {
            click: this.onAsignarClick
        },
        'multicuentaserviciotecnicogridview button[action=asignarmovil]': {
            click: this.onAsignarMovilClick
        },
        'multicuentaserviciotecnicogridview button[action=ordenes]': {
            click: this.onOrdenesClick
        },
        'multicuentaserviciotecnicogridview button[action=agenda]': {
            click: this.onAgendaClick
        },
        'multicuentaserviciotecnicogridview button[action=new]': {
            click: this.onNuevoClick
        },
        'multicuentaserviciotecnicogridview button[action=newWithCuenta]': {
            click: this.onNuevoWithCuentaClick
        },
        'multicuentaserviciotecnicogridview button[action=crearVisitas]': {
            click: this.onCrearVisitas
        },
        'multicuentaserviciotecnicogridview button[action=asignarPrioridad]': {
            click: this.onAsignarPrioridad
        },
        'multicuentaserviciotecnicogridview button[action=finalizar]': {
            click: this.onFinalizarMultiple
        },
        'multicuentaserviciotecnicogridview button[action=print]': {
            click: this.onPrintClick
        },
    });
}, // cierro init
/**
 * BC 373580364 : Se fixea el agrupamiento en base al tamaño de pagina (Limit) a consultar.
 * Cuando se presionan los botones de agripamiento el Limit se iguala a 999, tratando de contener todos los registros posibles en 1 sola hoja.
 * 
 * Viendo ejemplo de lo que tenemos hecho : http://jsfiddle.net/TE4ah/880/ el comportamiento es encabezado por hoja y no en uno general.
 * 
 */
onCrearVisitas: function(button, event, options ) {
    const view = button.up( 'multicuentaserviciotecnicogridview' );
    const selectedRecords = view.getSelectionModel().getSelection();
    const controller = this;
    if( selectedRecords.length <= 0 ) {
        notifyError( 'Antes debe seleccionar al menos un registro' );
        return;
    }
    const filters = selectedRecords.map(( rec ) => {
        return {
            property: 'stc_iid',
            value: rec.get( 'stc_iid' )
        };
    });
    const newRecords = selectedRecords.map( selected => {
        let newRecord = controller.getServTecVisitaModelModel().create( {
            svi_iEstado: "1",
            svi_iServicio: selected.get( 'stc_iid' ),
            svi_tFechaHora: new Date()
        });
        newRecord.set( 'Id', 0 );
        return newRecord;   
         
    });
    
    const win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Crear Visita',
        translate: false,
        closeAction: 'hide',
        border: true,
        modal: false,
        width: 750,
        height: 500,
        filters: filters,
        items: [ {
            xtype: 'panel',
            items: [
                {
                    xtype: 'sertecmultivisitasformview',
                    itemId: 'crearVisitasMultiple',
                    record: newRecords,
                    cabecera: selectedRecords,
                }
            ]
        }],
    });
    win.show();
},
onPrintClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var selectedRecords = view.getSelectionModel().getSelection();
    console.log( "selectedRecords", selectedRecords );
    console.log("Cantidad de registros seleccionados: ", selectedRecords.length);
    if(selectedRecords.length <= 0 ) {
        return notifyError( 'Antes debe seleccionar al menos un registro' );
    }
    var title = 'Imprimir ' + selectedRecords.length + ' ordenes';
    var filters = selectedRecords.map( function( rec ) {
        return {
            property: 'stc_iid',
            value: rec.get( 'stc_iid' )
        };
    });
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione tipo de Impresión',
        translate: false,
        closeAction: 'hide',
        rec: selectedRecords[ 0 ],
        border: true,
        modal: false,
        width: 200,
        height: 200,
        printTitle: title,
        filters: filters,
        items: [ {
            xtype: 'panel',
            dockedItems: [ {
                xtype: 'toolbar',
                dock: 'top',
                items: [ {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    handler: function( button ) {
                        var popup = button.up( 'window' );
                        var accionPrint = popup.down( '#accionPrint' ).getValue();
                        var newTab = Ext.widget( 'ordenservtecview', {
                            title: '',
                            translate: false,
                            record: popup.rec,
                            filters: filters,
                            closeAction: 'destroy',
                            hidePrint: view.hidePrint,
                            accionPrint: accionPrint
                        });
                        var printWin = Ext.create( 'Ext.Window', {
                            layout: 'fit',
                            title: title,
                            translate: false,
                            closeAction: 'hide',
                            border: true,
                            modal: false,
                            view: view,
                            items: newTab,
                            maximized: true
                        });
                        printWin.show();
                        win.hide();
                    }
                }]
            }],
            items: [
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Ver acciones',
                    itemId: 'accionPrint',
                    checked: true
                }
            ]
        }],
    });
    win.show();


},
onFinalizarMultiple: function(button, event, options) {
    const view = button.up('multicuentaserviciotecnicogridview');
    const selectedRecords = view.getSelectionModel().getSelection();
    const controller = this;

    if (selectedRecords.length === 0) {
        notifyError('Antes debe seleccionar al menos un registro');
        return;
    }

    const win = Ext.create('Ext.Window', {
        layout: 'vbox',
        title: 'Finalización',
        closeAction: 'destroy',
        width: 615,
        height: 190,
        border: true,
        modal: true,
        view: view,
        items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'datetimefield',
                itemId: 'fechafinalizacion',
                fieldLabel: 'Fecha de finalización',
                value: new Date(),
                labelWidth: 150,
                width: 500
            }]
        },{
            xtype: 'displayfield',
            value: getLocale('Observación')
        },{
            xtype: 'textarea',
            itemId: 'msg',
            width: '100%'
        }],
        fbar: [{
            xtype: 'button',
            text: 'Finalizar',
            handler: function(btn) {
                const win = btn.up('window');
                if (!win || win.destroyed) return;

                const fechaFinalizacion = win.down('#fechafinalizacion').getValue() || new Date();
                const msg = win.down('#msg').getValue() || getLocale('Finalizo el servicio tecnico');

                const total = selectedRecords.length;
                let idx = 0;
                let allOk = true;

                // Delay opcional entre records. 0 = cadena estricta (cada record
                // arranca apenas el anterior termino TODAS sus llamadas, incluso
                // las auxiliares, sin pausa extra). Subi a 200-500 ms si el
                // server sigue mostrando saturacion.
                const DELAY_MS = 1200;

                // Deshabilito el boton para evitar dobles clicks
                btn.setDisabled(true);

                // Indicador visual de progreso en el titulo del modal
                const updateProgress = function() {
                    if (win && !win.destroyed && win.setTitle) {
                        win.setTitle(getLocale('Finalización') + ' (' + Math.min(idx, total) + '/' + total + ')');
                    }
                };

                // Cierra ventana + notify + refresh. Se ejecuta UNA UNICA vez al terminar todo.
                const finish = function() {
                    // 1) Cerrar primero, antes de cualquier cosa que pueda lanzar excepcion.
                    if (win && !win.destroyed) {
                        win.close();
                    }
                    // 2) Notify al usuario.
                    if (allOk) {
                        notify(getLocale('Se ha finalizado con éxito'));
                    } else {
                        notifyError(getLocale('Algunos servicios no se pudieron finalizar. Revise la consola.'));
                    }
                    // 3) Refresh y eventos envueltos en try/catch para no romper el flujo.
                    try {
                        const paging = view.down('pagingtoolbar');
                        if (paging) {
                            paging.doRefresh();
                        } else if (view.getStore) {
                            view.getStore().load();
                        }
                    } catch (e) {
                        console.warn('No se pudo refrescar la grilla:', e);
                    }
                    try {
                        view.fireEvent('objectrefresh', view);
                    } catch (e) {
                        console.warn('Error en objectrefresh:', e);
                    }
                };

                // Encadena el siguiente record con un delay configurable.
                const scheduleNext = function() {
                    if (idx >= total) {
                        finish();
                        return;
                    }
                    Ext.defer(processNext, DELAY_MS);
                };

                // Procesa el siguiente record de la cola.
                const processNext = function() {
                    if (idx >= total) {
                        finish();
                        return;
                    }
                    const record = selectedRecords[idx++];
                    updateProgress();

                    if (!record || record.destroyed) {
                        scheduleNext();
                        return;
                    }

                    const stcId = record.get('stc_iid');
                    const model = controller.getM_st_cabeceraModelModel();

                    model.load(stcId, {
                        callback: function(cabecera, op, success) {
                            if (!success || !cabecera) {
                                allOk = false;
                                console.warn('No se pudo cargar la cabecera de stc_iid=' + stcId);
                                scheduleNext();
                                return;
                            }

                            try {
                                // Forzar UPDATE (evita INSERT/PK violation)
                                var realId = cabecera.get('Id') || cabecera.get('stc_iid') || stcId;
                                cabecera.set('Id', realId);
                                if (cabecera.phantom) { cabecera.phantom = false; }

                                // Optimista en la grilla
                                record.set('stc_dfecha_cierre', fechaFinalizacion);
                                record.set('stc_nestado', 4);

                                // Cabecera real
                                cabecera.set('stc_dfecha_cierre', fechaFinalizacion);
                                cabecera.set('stc_nestado', 4);
                            } catch (e) {
                                allOk = false;
                                console.warn('Error preparando cabecera ' + stcId + ':', e);
                                scheduleNext();
                                return;
                            }

                            cabecera.save({
                                callback: function(cab, opSave) {
                                    if (!opSave || !opSave.success) {
                                        allOk = false;
                                        console.warn('Falla al guardar cabecera ' + stcId);
                                    }

                                    // Historico (no bloquea scheduleNext si falla)
                                    let histRec;
                                    try {
                                        histRec = controller.getServTecHistoricoModelModel().create({
                                            stl_iServicio: record.get('stc_iid'),
                                            stl_tFechaHora: new Date(),
                                            stl_cAccion: getLocale('FINALIZADO').replace('|', ''),
                                            stl_cObservacion: '[' + _UserData.UserId + '] ' + msg,
                                            stl_iUsuarioDSS: _UserData.udw_idKey
                                        });
                                        histRec.set('Id', 0);
                                    } catch (e) {
                                        console.warn('No se pudo crear histórico:', e);
                                        scheduleNext();
                                        return;
                                    }

                                    histRec.save({
                                        callback: function(h, opHist) {
                                            if (opHist && !opHist.success) {
                                                console.warn('Falla al guardar historico de stc_iid=' + stcId);
                                            }

                                            // Notificaciones auxiliares en cadena. NO alteran allOk
                                            // (son side-effects), pero esperamos a que ambas terminen
                                            // antes de pasar al siguiente record, para no superponer
                                            // requests contra el mismo backend.
                                            let auxDone = 0;
                                            const auxFinish = function() {
                                                auxDone++;
                                                if (auxDone >= 2) {
                                                    scheduleNext();
                                                }
                                            };

                                            // AlarmaGenerar
                                            try {
                                                Ext.Ajax.request({
                                                    url: '/Rest/search/AlarmaGenerar',
                                                    method: 'GET',
                                                    params: {
                                                        idCta: record.get('cue_iid'),
                                                        cAlarma: '_ST',
                                                        cObservaciones: '[' + _UserData.UserId + '] [' + getLocale('FINALIZADO') + ':' + record.get('Id') + '] ' + msg
                                                    },
                                                    callback: function(opts, ok) {
                                                        if (!ok) console.warn('Falla AlarmaGenerar para stc_iid=' + stcId);
                                                        auxFinish();
                                                    }
                                                });
                                            } catch (e) {
                                                console.warn('Error disparando AlarmaGenerar:', e);
                                                auxFinish();
                                            }

                                            // novedadFacturacionSerTec
                                            try {
                                                Ext.Ajax.request({
                                                    url: '/Rest/search/novedadFacturacionSerTec',
                                                    method: 'GET',
                                                    params: { idServicio: record.get('Id') },
                                                    callback: function(opts, ok) {
                                                        if (!ok) console.warn('Falla novedadFacturacionSerTec para stc_iid=' + stcId);
                                                        auxFinish();
                                                    }
                                                });
                                            } catch (e) {
                                                console.warn('Error disparando novedadFacturacionSerTec:', e);
                                                auxFinish();
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                };

                // Arranco la cola secuencial.
                updateProgress();
                processNext();
            }
        },{
            xtype: 'button',
            text: 'Cancelar',
            handler: function(btn) {
                const win = btn.up('window');
                if (win && !win.destroyed) win.close();
            }
        }]
    });

    win.show();
},



saveRecord: function( cabecera ) {
    cabecera.save( {
        scope: this,
        failure: function( record, operation ) {
            // do something if the save failed
            console.log( 'Falla al salvar el formulario' );
        },
        callback: function( recordx, operation ) {
        }
    });
},
onAsignarPrioridad: function(button, event, options ) {
    const view = button.up( 'multicuentaserviciotecnicogridview' );
    const selectedRecords = view.getSelectionModel().getSelection();
    const controller = this;
    if( selectedRecords.length <= 0 ) {
        notifyError( 'Antes debe seleccionar al menos un registro' );
        return;
    }
    const filters = selectedRecords.map(( rec ) => {
        return {
            property: 'stc_iid',
            value: rec.get( 'stc_iid' )
        };
    });
    const win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Asignar Prioridad',
        translate: false,
        closeAction: 'hide',
        border: true,
        modal: false,
        width: 400,
        height: 350,
        filters: filters,
        items: [ {
            xtype: 'panel',
            dockedItems: [ {
                xtype: 'toolbar',
                dock: 'top',
                items: [ {
                    text: 'Guardar',
                    iconCls: 'icon-disk',
                    handler: function( button ) {
                        const combo = button.up( 'window' ).down( '#prioridadMultiple' );
                        const model = controller.getServTecModelModel();
                        const valorSeleccionado = combo.getValue();
                        filters.map(( filter ) => {
                            model.load( filter.value, {
                                callback: function( cabecera ) {
                                    cabecera.set( "stc_iPrioridad", valorSeleccionado );
                                    cabecera.save( {
                                        scope: this,
                                        win: win,
                                        view: view,
                                        callback: function( record, operation ) { },
                                        button: button
                                    });
                                }
                            })
                        });
                        notify( 'Los datos de Prioridad se guardaron correctamente.' );
                        var storeSearch = Ext.create( 'Ext.data.Store', {
                            model: controller.getServTecSearchModelModel(),
                            remoteFilter: true,
                            remoteSort: true,
                            autoload: true,
                            pageSize: 50,
                            groupField: 'cue_clinea',
                            filters: view.filters,
                            sorters: [ {
                                property: 'stc_dfecha_modificacion',
                                direction: 'ASC',
                                id: 'stc_dfecha_modificacion'
                            }],
                            proxy: {
                                type: 'rest',
                                extraParams: {
                                    timelineincluded: 0 //nuevo parametro agregado
                                },
                                url: '/Rest/search/ServTec',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'rows'
                                }
                            }
                        });
                        storeSearch.load( records => {
                            view.fireEvent( 'refresh', view )
                        });
                        win.hide();
                    }
                }]
            }],
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Seleccione el nivel de prioridad que desea asignar a los servicios técnicos seleccionados',
                    labelAlign: 'top'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Prioridad',
                    itemId: 'prioridadMultiple',
                    store: [
                        [ 0, getLocale( 'Alta' ) ],
                        [ 1, getLocale( 'Media' ) ],
                        [ 2, getLocale( 'BajaP' ) ]
                    ]
                }
            ]
        }],
    });
    win.show();
},
onGroupDealerCuentaClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.store;
    store.sorters.clear();
    if( store.groupers )
        store.groupers.clear();
    if( button.pressed ) {
        store.sorters.clear();
        store.sort ([{property: '_nombreCuenta', direction: 'ASC'}]);
        //store.clearGrouping();
        view.groupingFeature.lastGroupers = null;
        view.getStore().pageSize = 999;
        view.groupingFeature.block();
        view.groupingFeature.enable();
        store.group( {property: '_nombreCuenta', direction: 'ASC' });
        view.groupingFeature.pruneGroupedHeader();
        view.groupingFeature.unblock();
        //view.getView().refresh();
        view.getStore().loadPage(1);
        //view.groupingFeature.refreshIf();
    } else {
        view.groupingFeature.disable();
        store.clearGrouping();
        view.getStore().pageSize = 50;
        store.loadPage(1);
        //view.getView().refresh();
    }
},
onGroupCuentaClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.store;
    store.sorters.clear();
    if( store.groupers )
        store.groupers.clear();
    if( button.pressed ) {
        store.sorters.clear();
        store.sort ([{property: 'cue_clinea', direction: 'ASC'}]);
        //store.clearGrouping();
        view.groupingFeature.lastGroupers = null;
        view.getStore().pageSize = 999;
        view.groupingFeature.block();
        view.groupingFeature.enable();
        store.group( {property: 'cue_clinea', direction: 'ASC' });
        view.groupingFeature.pruneGroupedHeader();
        view.groupingFeature.unblock();
        //view.getView().refresh();
        view.getStore().loadPage(1);
        //view.groupingFeature.refreshIf();
    } else {
        view.groupingFeature.disable();
        store.clearGrouping();
        view.getStore().pageSize = 50;
        store.loadPage(1);
        //view.getView().refresh();
    }
},
onSelectChange: function( selModel, selections, view ) {
    var view = selModel.view.panel;
    var onCheck = true;
    for( var key in selections ) {
        var valorEstado = selections[ key ].get( '_stc_estadodescripcion' );
        if( valorEstado == 'Cancelado' || valorEstado == 'Finalizado' ) {
            onCheck = true;
        }
    }
    var reporte = view.down( 'button[action=reporte]' );
    var ordenes = view.down( 'button[action=ordenes]' );
    if( ordenes ) {
        ordenes.setDisabled( selections.length === 0 );
    }
}, 
onGroupTecnicoClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.store;
    store.sorters.clear();
    if( store.groupers )
        store.groupers.clear();
    if( button.pressed ) {
        store.sorters.clear();
        store.sort ([{property: 'ins_cnombre', direction: 'ASC'}]);
        //store.clearGrouping();
        view.groupingFeature.lastGroupers = null;
        view.getStore().pageSize = 999;
        view.groupingFeature.block();
        view.groupingFeature.enable();
        store.group( {property: 'ins_cnombre', direction: 'ASC' });
        view.groupingFeature.pruneGroupedHeader();
        view.groupingFeature.unblock();
        //view.getView().refresh();
        view.getStore().loadPage(1);
        //view.groupingFeature.refreshIf();
    } else {
        view.groupingFeature.disable();
        store.clearGrouping();
        view.getStore().pageSize = 50;
        store.loadPage(1);
        //view.getView().refresh();
    }
},
initView: function(view ) {
    var controller = this;
    view.features = undefined;
    var profile = view.module.profile ? view.module.profile : view.module.get( 'profile' );
    view.groupingFeature = view.getView().getFeature( 'groupingMST' );
    var store = KeyModulesStore;//this.getKeyModulesStoreStore();
    if( !store.isModuleAvailable( 'SgAppSerTec' ) ) {
        notify( 'No es posible acceder a la funcionalidad completa de esta solapa. Consulte con el proveedor del servicio.' )
        view.down( 'gridview' ).setDisabled( true );
        view.down( 'toolbar' ).hide();
    }
    var modules = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordServTec = modules.getModuleAvailable( 'SerTec' )
    view.getSelectionModel().on( 'selectionchange', controller.onSelectChange );
    /**
     * NUEVA DEFINICION DE PERMISOS:
     * Caundo es un modulo compartido, se evalua si tiene el modulo "origen"
     * en caso de no tenerlo se utiliza los permisos del modulo que llama al "origen"
     */
    var readOnlyDef = false;
    //si no tiene el modulo servtec y administrator
    if( !modules.isModuleAvailable( 'SerTec' ) && !modules.isModuleAvailable( 'Administrator' ) ) {
        readOnlyDef = true
    }
    //si estoy en administrator leo el perfil 
    view.hidePrint = false;
    if( modules.isModuleAvailable( 'SerTec' ) ) {
        if( recordServTec.get( '_Security' ) ) {
            if( !recordServTec.get( '_Security' ).nuevoserviciotecnico && this.application._nameModule == 'SerTec' ) {
                view.down( 'toolbar' ).down( '[action=new]' ).show();
            }
        }
    }
    if( this.application._nameModule == 'Administrator' ) {
        if( modules.isModuleAvailable( 'SerTec' ) ) {
            //si esta habilitado servtec uso sus permisos
            if( recordServTec.get( '_Security' ) && recordServTec.get( '_Security' ).profile !==""  && recordServTec.get( '_Security' ).profile < 2 ) {
                readOnlyDef = true;
                view.hidePrint = true;
            } else {
                profile = recordServTec.get( '_Security' ).profile;
            }
        } else if( modules.isModuleAvailable( 'Administrator' ) ) {
            //si esta habilitado administrator uso sus permisos
            if( modules.getModuleAvailable( 'Administrator' ).data._Security &&
                modules.getModuleAvailable( 'Administrator' ).data._Security.rights &&
                modules.getModuleAvailable( 'Administrator' ).data._Security.rights.cuenta == true ) {
                console.log( modules.getModuleAvailable( 'Administrator' ), modules.getModuleAvailable( 'Administrator' ).get( '_Security' ), modules.getModuleAvailable( 'Administrator' ).get( '_Security' ).module )
                Ext.Array.each( modules.getModuleAvailable( 'Administrator' ).get( '_Security' ).modules, function( v ) {
                    if( v.text == 'Servicio Tecnico' ) {
                        if( v.profile < 2 ) {
                            readOnlyDef = true
                            view.hidePrint = true;
                        }
                    }
                })
            }
        }
    } else if( this.application._nameModule == 'Webremoto' ) {
        /**
        * 6/4/2018 hablado con rodrigo
        * En este caso si no tiene servtec voy a buscar admin cuenta o dealer
        */
        if( modules.isModuleAvailable( 'SerTec' ) ) {
            //si esta habilitado servtec uso sus permisos
            if( recordServTec.get( '_Security' ) && recordServTec.get( '_Security' ).profile!=="" && recordServTec.get( '_Security' ).profile < 2 ) {
                readOnlyDef = true
                view.hidePrint = true;
            }
        } else if( modules.isModuleAvailable( 'Administrator' ) ) {
            //si esta habilitado administrator uso sus permisos
            if( modules.getModuleAvailable( 'Administrator' ).data._Security &&
                modules.getModuleAvailable( 'Administrator' ).data._Security.rights &&
                modules.getModuleAvailable( 'Administrator' ).data._Security.rights.cuenta == true ) {
                Ext.Array.each( modules.getModuleAvailable( 'Administrator' ).get( '_Security' ).module, function( v ) {
                    if( v.get( 'text' ) == 'Servicio Tecnico' ) {
                        if( v.get( 'profile' ) < 2 ) {
                            readOnlyDef = true
                            view.hidePrint = true;
                        }
                    }
                })
            } else {
                profile = 3
            }
        } else if( modules.isModuleAvailable( 'WebDealer' ) ) {
            //si esta habilitado administrator uso sus permisos
            if( modules.getModuleAvailable( 'WebDealer' ).data._Security ) {
                Ext.Array.each( modules.getModuleAvailable( 'WebDealer' ).get( '_Security' ).modules, function( v ) {
                    if( v.text == 'Servicio Tecnico' ) {
                        if( v.profile < 2 ) {
                            readOnlyDef = true
                            view.hidePrint = true;
                        }
                    }
                })
            }
        }
    } else if( this.application._nameModule == 'WebDealer' ) {
        if( modules.isModuleAvailable( 'SerTec' ) ) {
            //si esta habilitado servtec uso sus permisos
            if( recordServTec.get( '_Security' ) && recordServTec.get( '_Security' ).profile < 2 ) {
                readOnlyDef = true
                view.hidePrint = true;
            }
        } else if( modules.isModuleAvailable( 'WebDealer' ) ) {
            //si esta habilitado administrator uso sus permisos
            if( modules.getModuleAvailable( 'WebDealer' ).data._Security ) {
                Ext.Array.each( modules.getModuleAvailable( 'WebDealer' ).get( '_Security' ).modules, function( v ) {
                    if( v.text == 'Servicio Tecnico' ) {
                        if( v.profile < 2 ) {
                            readOnlyDef = true
                            view.hidePrint = true;
                        }
                    }
                })
            }
        }
    }
    if( view.record && view.record.get( 'Situacion' ) == 'No Habilitado' ) {
        readOnlyDef = true
    }
    if( readOnlyDef == true || profile == 1 ) {
        view.down('#multiple').hide()
        notify( 'Solo lectura.' )
        view.down( '#new' ).hide();
        profile = 1;
        //view.disabledEdit = true;
        view.readOnly = true
    }
    var record = view.record;
    view.filters = [];
    view.filtrosActivos = [];
    if( view.metodo != 'readonly' ) {
        view.filtrosActivos[ 1 ] = true; // pendiente
        view.filtrosActivos[ 2 ] = true; // asignado
        view.filtrosActivos[ 3 ] = false; // cancelado
        view.filtrosActivos[ 4 ] = false; // finalizado
        view.filtrosActivos[ 5 ] = true; // en ejecucion
        view.filtrosActivos[ 6 ] = true; // en camino
    } else {
        view.filtrosActivos[ 1 ] = true;
        view.filtrosActivos[ 2 ] = false;
        view.filtrosActivos[ 3 ] = false;
        view.filtrosActivos[ 4 ] = false;
        view.filtrosActivos[ 5 ] = false;
        view.filtrosActivos[ 6 ] = false; // en camino
    }
    this.activarFiltroEstados( view );
    if( record ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: record.get( 'cue_iid' )
        });
        view.down( '#selcuenta' ).hide();
        view.down( '#idcuenta' ).setValue( record.get( 'cue_iid' ) );
        if( view.newServtecShowWithCuenta && profile > 1 ) {
            view.down( 'toolbar' ).down( '[action=newWithCuenta]' ).show();
        }
        if( profile > 1 && ( controller.application._nameModule == 'Administrator' ||
            controller.application._nameModule == 'WebDealer' ||
            controller.application._nameModule == 'MasterWebDealer' ||
            controller.application._nameModule == 'Webremoto' ||
            controller.application._nameModule == 'FenceManager' ) ) {
            view.down( 'toolbar' ).down( '[action=newWithCuenta]' ).show();
        }
    } else {
        //view.down('#addSertec').hide();
        if( profile > 1 ) {
            //view.down('toolbar').down('[action=new]').show(); ahora existe un checkbox para 
            // permitir ver el botón de nuevo servicio técnico
        }
    }
    var storeSearch = Ext.create( 'Ext.data.Store', {
        model: this.getServTecSearchModelModel(),
        remoteFilter: true,
        remoteSort: true,
        autoload: true,
        pageSize: 50,
        //groupField: 'cue_clinea',
        filters: view.filters,
        sorters: [ {
            property: 'stc_dfecha_modificacion',
            direction: 'ASC',
            id: 'stc_dfecha_modificacion'
        }],
        proxy: {
            type: 'rest',
            extraParams: {
                timelineincluded: 0 //nuevo parametro agregado
            },
            url: '/Rest/search/ServTec',
            reader: {
                type: 'json',
                rootProperty: 'rows'
            }
        }
    });
    storeSearch.load();
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( storeSearch );
    view.reconfigure(storeSearch);//view.bindStore( storeSearch );
    if( storeSearch.groupers )
        storeSearch.groupers.clear();
    // dedalo 28/12/2020 cleargrouping ya hace una carga, no necesito hacer otra.
    //view.getStore().load()
    if( view.down( '#tecnicoscombo' ) ) {
        var tecnicoStore = Ext.create( 'Ext.data.Store', {
            model: this.getInstaladoresByTokenSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
        })
        view.down( '#tecnicoscombo' ).bindStore( tecnicoStore );
        tecnicoStore.load();
    }
    var provinciaStore = Ext.create( 'Ext.data.Store', {
        model: this.getT_provinciasSearchModelModel(),
        pageSize: 500,
        remoteSort: true,
        remoteFilter: true,
        sorters: [
            {
                property: 'pro_cdescripcion',
                direction: 'ASC'
            }
        ]
    })
    view.down( '#provinciacombo' ).bindStore( provinciaStore );
    provinciaStore.load();
    /* var cuentaStore =Ext.create('Ext.data.Store',{
             model: this.getCuentaSearchModelModel(),
             pageSize: 50,
             remoteSort: true,
             remoteFilter: true,
             
         })
        
    view.down('#cuenta').bindStore(cuentaStore);     
    cuentaStore.load();*/
},//cierra initView
activarFiltroTipo: function(view ) {
    if( view.tipo ) {
        if( view.tipo == 'preventivo' ) {
            view.filters.push( {
                property: 'tip_ntipo',
                value: 0
            });
        } else if( view.tipo == 'correctivo' ) {
            view.filters.push( {
                property: 'tip_ntipo',
                value: 1
            });
        } else if( view.tipo == 'instalaciones' ) {
            view.filters.push( {
                property: 'tip_ntipo',
                value: 2
            });
        }
    }
},
    
activarFiltroEstados: function (view ) {
    view.down( '#pendiente-btn' ).toggle( false );
    view.down( '#asignado-btn' ).toggle( false );
    view.down( '#enejecucion-btn' ).toggle( false );
    view.down( '#encamino-btn' ).toggle( false );
    view.down( '#finalizado-btn' ).toggle( false );
    view.down( '#cancelado-btn' ).toggle( false );
    var store = view.getStore();
    store.clearFilter( true );
    view.filters = [];
    var idsFiltros = [];
    if( view.filtrosActivos[ 1 ] ) {
        idsFiltros.push( 1 );
        view.down( '#pendiente-btn' ).toggle( true );
    }
    if( view.filtrosActivos[ 2 ] ) {
        idsFiltros.push( 2 );
        view.down( '#asignado-btn' ).toggle( true );
    }
    if( view.filtrosActivos[ 3 ] ) {
        idsFiltros.push( 3 );
        view.down( '#cancelado-btn' ).toggle( true );
    }
    if( view.filtrosActivos[ 4 ] ) {
        idsFiltros.push( 4 );
        view.down( '#finalizado-btn' ).toggle( true );
    }
    if( view.filtrosActivos[ 5 ] ) {
        idsFiltros.push( 5 );
        view.down( '#enejecucion-btn' ).toggle( true );
    }
    if( view.filtrosActivos[ 6 ] ) {
        idsFiltros.push( 6 );
        view.down( '#encamino-btn' ).toggle( true );
    }
    if( idsFiltros.length > 0 ) {
        view.filters.push( {
            property: 'stc_nestado:inint',
            value: idsFiltros.join( "," )
        });
    } else {
        view.filters.push( {
            property: 'stc_nestado',
            value: 9 // que no se vea ninguno pedido por dany 01/06/2016
        });
    }
    var fechadesde = view.down( '#fechadesde' ).getValue();
    var fechahasta = view.down( '#fechahasta' ).getValue();
    var fin_desde = view.down( '#fin_desde' ).getValue();
    var fin_hasta = view.down( '#fin_hasta' ).getValue();
    //   var instaldores = view.down('#tecnicos').getValue();
    var numero = view.down( '#numero' ).getValue();
    // BC 406452332 : Antes buscaba por fecha de modificacion, ahora por fecha de creacion
    if( fechadesde ) {
        view.filters.push( {
            property: 'stc_dfecha_creacion:GTE',
            value: fechadesde,
            id: 'fechadesde'
        });
    }
    if( fechahasta ) {
        view.filters.push( {
            property: 'stc_dfecha_creacion:LTE',
            value: Ext.Date.add( fechahasta, Ext.Date.DAY, 1 ),
            id: 'fechahasta'
        });
    }
    if( fin_desde ) {
        view.filters.push( {
            property: 'stc_dfecha_cierre:GTE',
            value: fin_desde,
            id: 'fin_desde'
        });
    }
    if( fin_hasta ) {
        view.filters.push( {
            property: 'stc_dfecha_cierre:LTE',
            value: Ext.Date.add( fin_hasta, Ext.Date.DAY, 1 ),
            id: 'fin_hasta'
        });
    }
    if( numero )
        view.filters.push( {
            property: 'stc_inumero',
            value: numero,
            id: 'tecnicos'
        });
    var cuenta = view.down( '#idcuenta' );
    if( cuenta.getValue() ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: cuenta.getValue(),
            id: 'cuenta'
        });
    }
    this.activarFiltroTipo( view );
},
    
onSearchClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    view.getSelectionModel().deselectAll( true );
    var store = view.getStore();
    this.activarFiltroEstados( view );
    this.habilitarOrdenesYReporte( view.filters, view );
    var filters = view.filters;
    if( view.down( '#tecnicofiltro' ).getValue() ) {
        filters.push( {
            property: 'stc_ctecnico_1',
            id: 'stc_ctecnico_1',
            value: view.down( '#tecnicofiltro' ).getValue()
        })
    }
    if( view.down( '#tiposervicio' ).getValue() != null ) {
        filters.push( {
            property: 'tip_ntipo',
            id: 'tip_ntipo',
            value: view.down( '#tiposervicio' ).getValue()
        })
    }
    if( view.down( '#prioridad' ).getValue() != null ) {
        filters.push( {
            property: 'stc_iPrioridad',
            id: 'stc_iPrioridad',
            value: view.down( '#prioridad' ).getValue()
        })
    }
    if( view.down( '#provinciacombo' ).getValue() ) {
        filters.push( {
            property: 'cue_cprovincia',
            id: 'cue_cprovincia',
            value: view.down( '#provinciacombo' ).getValue()
        })
    }
    if( view.down( '#localidad' ).getValue() ) {
        filters.push( {
            property: 'cue_clocalidad:LIKE',
            id: 'cue_clocalidad',
            value: view.down( '#localidad' ).getValue()
        })
    }
    if( view.down( '#observaciones' ).getValue() ) {
        /*  filters.push( {
              property: 'stl_cAccion:LIKE',
              id: 'stl_cAccion',
              value: 'Observacion'
          }) */
        filters.push( {
            property: 'stc_mobservaciones:LIKE',
            id: 'stc_mobservaciones',
            value: view.down( '#observaciones' ).getValue()
        })
    }
    /* if( view.down( '#observacion' ).getValue() ) {
        filters.push( {
            property: 'stc_mobservaciones:LIKE',
            id: 'stc_mobservaciones',
            value: view.down( '#observacion' ).getValue()
        })
    } */
    if( view.down( '#nombre' ).getValue() ) {
        filters.push( {
            property: 'cue_cnombre:LIKE',
            id: 'cue_cnombre',
            value: view.down( '#nombre' ).getValue()
        })
    }
    if( view.down( '#cuenta' ).getValue() ) {
        filters.push( {
            property: 'cue_ncuenta',
            id: 'cue_ncuenta',
            value: view.down( '#cuenta' ).getValue()
        })
    }
    if( view.down( '#dealer' ).getValue() ) {
        filters.push( {
            property: 'lin_ccodigo',
            id: 'lin_ccodigo',
            value: view.down( '#dealer' ).getValue()
        })
    }
    if( view.down( '#empresa' ).getValue() ) {
        filters.push( {
            property: 'ins_cempresa:LIKE',
            id: 'ins_cempresa',
            value: view.down( '#empresa' ).getValue()
        })
    }
    if( view.down( '#dealercuenta' ).getValue() ) {
        var datos = view.down( '#dealercuenta' ).getValue().split( '-' );
        if( datos.length > 0 ) {
            filters.push( {
                property: 'lin_ccodigo',
                id: 'lin_ccodigo',
                value: datos[ 0 ]
            })
            filters.push( {
                property: 'cue_ncuenta',
                id: 'cue_ncuenta',
                value: datos[ 1 ]
            })
        } else {
            notify( 'El formato para la busqeuda no es valido' )
        }
    }
    var cantRegistros = view.down( '#cantRegistros' ).getValue();
    if( cantRegistros > 0 ) {
        view.getStore().pageSize = cantRegistros;
    }
    store.filter( filters );
    //store.load();
},
    
onItemDblClick: function(view, record, item, index, e, options ) {
    var view = view.up( 'multicuentaserviciotecnicogridview' ) ? view.up( 'multicuentaserviciotecnicogridview' ) : view;
    // 24/07 : https://basecamp.com/2249105/projects/12939010/todos/418498384
    // Se lleva a la vista de impresion, cuando se abre desde MWR el servicio tecnico del evento y darle doble click al mismo.
    // Originalmente retornaba false ( comentado )
    if( view.noOpenServtecEditForm ) {
        //no dejo abrir el formulario
        // return false;
        view.readOnly = true
    }
    if( view.disabledEdit ) {
        return false;
    }
    var recordx = record;
    //pedido por rodrigo 30/11/2017 que en readonly abra el reporte
    if( view.readOnly == true ) {
        var title = getLocale( 'Orden' ) + ' (' + record.get( 'stc_inumero' ) + ')';
        var filters = [ {
            property: 'stc_iid',
            value: record.get( 'stc_iid' )
        }];
        /*var newTab = Ext.widget('ordenservtecview',{
            //record: record,
            title: '',
            filters: filters,
            translate: false,
            record: record,
            closeAction: 'destroy'
        });*/
        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: title,
            translate: false,
            closeAction: 'hide',
            border: true,
            modal: false,
            view: view,
            width: 800,
            height: 600,
            items: [ {
                xtype: 'uxiframe',
                itemId: 'Iframe',
                height: 0,
                border: false,
                //  src: Ext.String.urlAppend('/handler/ReporteFullServtecHTML', 'Filter='+Ext.encode(filters)),
                width: '100%'
            }],
            maximized: view._OpenMaximize
        }).show();
        //win.down( '#Iframe' ).setSrc( Ext.String.urlAppend( '/handler/ReporteFullServtecHTML', 'Filter=' + Ext.encode( filters ) ) );
        var target = win.down('#Iframe');
        target.load({
            src: Ext.String.urlAppend( '/handler/ReporteFullServtecHTML', 'Filter=' + Ext.encode( filters ) )
        });
        return false;
    }
    var readOnly = false;
    if( recordx ) {
        if( recordx.get( 'stc_nestado' ) != 3 && recordx.get( 'stc_nestado' ) != 4 ) {
        } else {
            readOnly = true;
            notifyError( 'Solo lectura.' );
        }
    }
    var tabpanel = view.up( 'tabpanel' );
    var title = getLocale( 'Servicio técnico' ) + " (" + recordx.get( "stc_inumero" ) + ")";
    var mytab = tabpanel.down( '[title="' + title + '"]' );
    if( !mytab ) {
        var newTab = Ext.widget( 'sertepanelview', {
            iconCls: view.iconShow,
            title: title,
            targetTab: view,
            closable: true,
            tipo: 'preventivo',
            translate: false,
            operador: view.operador,
            record: recordx,
            recordFull: record,
            caller: view,
            readOnly: readOnly,
            itemId: 'tabservtec' + recordx.get( "stc_inumero" )
        });
        tabpanel.add( newTab );
        tabpanel.setActiveTab( newTab );
    }
    tabpanel.setActiveTab( mytab );
},
    
onAgendaClick: function(button ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var tabpanel = button.up( 'tabpanel' );
    var title = 'Agenda';
    var mytab = tabpanel.down( '[title="' + title + '"]' );
    if( !mytab ) {
        var newTab = Ext.widget( 'serteccalendarview', {
            //record: record,
            title: title,
            closable: true,
            filters: view.filters,
            closeAction: 'destroy'
        });
        // agrego la paleta creada
        tabpanel.add( newTab );
        tabpanel.setActiveTab( newTab );
    }
},
    
onReporteClick: function(button ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var tabpanel = button.up( 'tabpanel' );
    var title = 'Reporte';
    var mytab = tabpanel.down( '[title="' + title + '"]' );
    var selection = view.getSelectionModel().getSelection();
    var filters;
    if( selection.length === 0 ) {
        filters = view.filters;
    } else {
        var idsSeleccionados = '';
        for( var key in selection ) {
            idsSeleccionados += selection[ key ].get( 'stc_iid' );
            if( key < ( selection.length - 1 ) ) {
                idsSeleccionados += ',';
            }
        }
        filters = [
            {
                property: 'stc_iid:inint',
                value: idsSeleccionados
            }
        ];
    }
    /**
     * BC 389496473 : Se agrega la posibilidad de filtrar las columnas del reporte
     */
    var win = Ext.create( 'Ext.Window', {
        layout: 'vbox',
        title: 'Reporte',
        alias: 'widget.exportfilter',
        closeAction: 'destroy',
        width: 450,
        height: 300,
        border: false,
        view: view,
        items: [ {
            xtype: 'fieldset',
            title: 'Seleccione los datos que incluira el reporte',
            layout: 'vbox',
            items: [ {
                xtype: 'checkboxgroup',
                itemId: 'incluirchecks',
                columns: 2,
                vertical: true,
                hideLabel: true,
                //fieldLabel:'Seleccione los datos que incluira el reporte',
                width: 400,
                items: [
                    {
                        boxLabel: 'Número',
                        itemId: 'chknumero',
                        checked: true
                    }, {
                        boxLabel: 'Fecha de Creacion',
                        itemId: 'chkfechacreacion',
                        checked: true
                    }, {
                        boxLabel: 'Fecha de Modificacion',
                        itemId: 'chkfechaalta',
                        checked: true
                    }, {
                        boxLabel: 'Tipo Servicio',
                        itemId: 'chktiposervicio',
                        checked: true
                    }, {
                        boxLabel: 'Fecha de visita',
                        itemId: 'chkfechavisita',
                        checked: true
                    }, {
                        boxLabel: 'Fecha de finalización',
                        itemId: 'chkfechafinalizacion',
                        checked: true
                    }, {
                        boxLabel: 'Cuenta',
                        itemId: 'chkcuenta',
                        checked: true
                    }, {
                        boxLabel: 'Telefono',
                        itemId: 'chktelefono',
                        checked: true
                    }, {
                        boxLabel: 'Tecnico',
                        itemId: 'chktecnico',
                        checked: true
                    }, {
                        boxLabel: 'Dirección',
                        itemId: 'chkdireccion',
                        checked: true
                    }, {
                        boxLabel: 'Localidad',
                        itemId: 'chklocalidad',
                        checked: true
                    }, {
                        boxLabel: 'Provincia/Estado',
                        itemId: 'chkprovincia',
                        checked: true
                    }, {
                        boxLabel: 'Servicio',
                        itemId: 'chkservicio',
                        checked: true
                    }, {
                        boxLabel: 'Observaciones',
                        itemId: 'chkobservaciones',
                        checked: true
                    }, {
                        boxLabel: 'Estado',
                        itemId: 'chkestado',
                        checked: true
                    }, {
                        boxLabel: 'Usuario',
                        itemId: 'chkusuario',
                        checked: true
                    }, {
                        boxLabel: 'Valor',
                        itemId: 'chkvalor',
                        checked: true
                    }, {
                        boxLabel: 'Costo mano de obra',
                        itemId: 'chkmanodeobra',
                        checked: true
                    }, {
                        boxLabel: 'Fecha de pago',
                        itemId: 'chkfechapago',
                        checked: true
                    }, {
                        boxLabel: 'Valor pago técnico',
                        itemId: 'chkvalortecnico',
                        checked: true
                    }, {
                        boxLabel: 'Tiempo de Trabajo Total',
                        itemId: 'chktrabajototal',
                        checked: true
                    }
                ]
            }]
        }],
        buttons: [
            {
                text: 'Generar reporte',
                handler: function( button ) {
                    /* Me encuentro dentro del Window creado, por lo que busco hacia abajo
                    * el itemId correspondiente a los Checks seleccionados y tomo su valor
                    */
                    var incluirchecks = win.down( '#incluirchecks' ).getChecked();
                    /**
                     * Fuerzo URL del reporte de SerTec, le hago append de los checks, la envío como propiedad URL a la vista
                     * Se manipula desde el Controller ReporteServTecController
                     */
                    url = '/handler/SerTecReportHTML';
                    if( incluirchecks ) {
                        /* Uso el item id como nombre de la variable a pasar y su valor */
                        Ext.Array.each( incluirchecks, function( v, k ) {
                            url = Ext.String.urlAppend( url, v.itemId + "=" + v.checked );
                        })
                    };
                    url = Ext.String.urlAppend( url, '_dc=' + new Date().getTime() );
                    if( !mytab ) {
                        var newTab = Ext.widget( 'reporteservtecview', {
                            //record: record,
                            title: title,
                            closable: true,
                            filters: filters,
                            closeAction: 'destroy',
                            hiddenfilters: true,
                            page: view.store.lastOptions.page,
                            limit: view.store.lastOptions.limit,
                            sort: view.store.lastOptions.sorters,
                            url: url
                        });
                        // agrego la paleta creada
                        tabpanel.add( newTab );
                        tabpanel.setActiveTab( newTab );
                    }
                    win.hide();
                }
            },
            {
                text: 'Cancelar',
                handler: function() {
                    win.hide();
                }
            }
        ]
    });
    win.show();
},
    
onOrdenesClick: function(button ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var tabpanel = view.up( 'tabpanel' );
    var rec = view.record;
    var title = 'Orden';
    var mytab = tabpanel.down( '[title="' + title + '"]' );
    var selection = view.getSelectionModel().getSelection();
    var filters;
    if( selection.length === 0 ) {
        filters = view.filters;
    } else {
        var idsSeleccionados = '';
        for( var key in selection ) {
            idsSeleccionados += selection[ key ].get( 'stc_iid' );
            if( key < ( selection.length - 1 ) ) {
                idsSeleccionados += ',';
            }
        }
        filters = [
            {
                property: 'svi_iServicio',
                value: idsSeleccionados
            }
        ];
    }
    if( !mytab ) {
        var newTab = Ext.widget( 'ordenservtecview', {
            record: rec,
            title: title,
            closable: true,
            filters: filters,
            closeAction: 'destroy'
        });
        // agrego la paleta creada
        tabpanel.add( newTab );
        tabpanel.setActiveTab( newTab );
    }
},
    
onTodosClick: function(button ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.getStore();
    console.log( "onTodosClick0 - - - - ", view )
    view.filters = [];
    if( view.record ) {
        if( view.record.get( 'cue_iid' ) ) {
            store.filters.clear();
            view.filters.push( {
                property: 'stc_iid_cuenta',
                value: view.record.get( 'cue_iid' ),
                id: 'cuenta'
            });
            store.filter( view.filters );
            view.down( '#idcuenta' ).setValue( view.record.get( 'cue_iid' ) );
        }
    } else {
        store.clearFilter( true );
        store.load();
        view.down( '#nombrecuenta' ).setValue( '' );
        view.down( '#idcuenta' ).setValue( '' );
    }
    view.down( '#fechadesde' ).setValue( '' );
    view.down( '#fechahasta' ).setValue( '' );
    view.down( '#tecnicofiltro' ).setValue( '' );
    view.down( '#empresa' ).setValue( '' );
    view.down( '#numero' ).setValue( '' );
    view.down( '#nombre' ).setValue( '' );
    view.down( '#cuenta' ).setValue( '' );
    view.down( '#dealercuenta' ).setValue( '' );
    view.down( '#dealer' ).setValue( '' );
    view.down( '#observacion' ).setValue( '' );
    view.down( '#provinciacombo' ).setValue( '' );
    view.down( '#finalizado-btn' ).toggle( true );
    view.down( '#pendiente-btn' ).toggle( true );
    view.down( '#cancelado-btn' ).toggle( true );
    view.down( '#asignado-btn' ).toggle( true );
    view.down( '#enejecucion-btn' ).toggle( true );
    view.down( '#encamino-btn' ).toggle( true );
    view.filtrosActivos[ 1 ] = true; // pendiente
    view.filtrosActivos[ 2 ] = true; // asignado
    view.filtrosActivos[ 3 ] = true; // cancelado
    view.filtrosActivos[ 4 ] = true; // finalizado
    view.filtrosActivos[ 5 ] = true; // en ejecucion
    view.filtrosActivos[ 6 ] = true; // en camino
    this.habilitarOrdenesYReporte( view.filters, view );
    //this.activarFiltroEstados(view);
},
    
onBuscarPorCuentaClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var item = {};
    if( view.tip_nTipo ) {
        item = {
            xtype: 'cuentahelperview',
            //tip_ncondicion: "0",
            tip_nTipo: view.tip_nTipo,
            caller: view
        }
    } else {
        item = {
            xtype: 'cuentahelperview',
            tip_ncondicion: "0",
            caller: view
        }
    }
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione una Cuenta',
        closeAction: 'destroy',
        itemId: 'cuentaWin',
        width: 750,
        height: 550,
        border: true,
        modal: true,
        view: view,
        items: [
            item
        ]
    });
    win.show();
},
onObjectNew: function(record, view ) {
    var controller = this;
    var store = Ext.create( 'Ext.data.Store', {
        model: controller.getServTecSearchModelModel(),
        remoteFilter: true,
        remoteSort: true,
        autoload: false,
        autoDestroy: true,
        pageSize: 100,
        filters: [ {
            property: 'stc_iid',
            value: record.Id
        }]
    });
    store.load( {
        callback: function( records ) {
            if( !view.noOpenServtecEditForm ) {
                controller.onItemDblClick( view, records[ 0 ] );
            } else {
                view.getStore().load()
            }
        }
    });
},
    
onObjectChanged: function(cuenta, view ) {
    var gridview = view.up( 'viewport' ).down( 'multicuentaserviciotecnicogridview' );
    //var toolbar = view.down('pagingtoolbar');
    //toolbar.doRefresh();
    this.activarFiltroEstados( view );
    var record = gridview.record;
    if( record ) {
        view.filters.push( {
            property: 'stc_iid_cuenta',
            value: record.get( 'cue_iid' )
        });
        view.down( '#selcuenta' ).hide();
        view.down( '#idcuenta' ).setValue( record.get( 'cue_iid' ) );
    } else {
        //view.down('#addSertec').hide();
        view.down( 'toolbar' ).down( '[action=new]' ).show();
    }
    if( view.tipo ) {
        if( view.tipo == 'preventivo' ) {
            view.filters.push( {
                property: 'tip_ntipo',
                value: 0
            });
        } else if( view.tipo == 'correctivo' ) {
            view.filters.push( {
                property: 'tip_ntipo',
                value: 1
            });
        } else if( view.tipo == 'instalaciones' ) {
            view.filters.push( {
                property: 'tip_ntipo',
                value: 2
            });
        }
    }
    var store = view.store;
    store.clearFilter( true );
    store.filter( view.filters );
},
    
/*
// se pisa con el evento que crea la cuenta
onCuentaChanged: function(cuenta, view){
    var gridview = view.up('viewport').down('multicuentaserviciotecnicogridview');
    
    var selection = view.getSelectionModel().getSelection();
    
    gridview.down('#nombrecuenta').setValue(cuenta.get('Name'));
    gridview.down('#idcuenta').setValue(cuenta.get('Id'));
    
     view.filters = [];
     if (cuenta.get('Id')){
        view.filters.push({ 
            property: 'stc_iid_cuenta',
            value: cuenta.get('Id'),
            id: 'cuenta'
        });
    }
    
    
    var fechadesde = view.down('#fechadesde').getValue();
    var fechahasta = view.down('#fechahasta').getValue();
    
    var instaldores = view.down('#tecnicos').getValue();
    var numero = view.down('#numero').getValue();
    
    
    var filters = Ext.clone(view.filters);
    
    
    if (fechadesde)
        view.filters.push({ 
            property: 'cue_dfechaalta:GT',
            value: fechadesde,
            id: 'fechadesde'
        });
        
    if (fechahasta)
        view.filters.push({ 
            property: 'cue_dfechaalta:LT',
            value: fechahasta,
            id: 'fechahasta'
        });
        
    if (instaldores)
        view.filters.push({ 
            property: 'stc_ctecnico_1',
            value: instaldores,
            id: 'tecnicos'
        });
    
    if (numero)
        view.filters.push({ 
            property: 'stc_inumero',
            value: numero,
            id: 'tecnicos'
        });
        
    
    this.habilitarOrdenesYReporte(view.filters, view);
    
    view.store.filter(view.filters);
    
  
},
*/
/**
 * BC 394298024 : Al tildar por estado de ST pierdo los filtros aplicados en el menu Filtrar.
 * Se crea esta funcion para en cada evento de click, consultar lo cargado en ese menu.
 */
checkFilterMenu: function(filter, view ) {
    var filters = filter ? filter : [];
    if( view.down( '#tecnicofiltro' ).getValue() ) {
        filters.push( {
            property: 'stc_ctecnico_1',
            value: view.down( '#tecnicofiltro' ).getValue()
        })
    }
    if( view.down( '#tiposervicio' ).getValue() != null ) {
        filters.push( {
            property: 'tip_ntipo',
            value: view.down( '#tiposervicio' ).getValue()
        })
    }
    if( view.down( '#provinciacombo' ).getValue() ) {
        filters.push( {
            property: 'cue_cprovincia',
            value: view.down( '#provinciacombo' ).getValue()
        })
    }
    if( view.down( '#localidad' ).getValue() ) {
        filters.push( {
            property: 'cue_clocalidad:LIKE',
            value: view.down( '#localidad' ).getValue()
        })
    }
    if( view.down( '#nombre' ).getValue() ) {
        filters.push( {
            property: 'cue_cnombre:LIKE',
            value: view.down( '#nombre' ).getValue()
        })
    }
    if( view.down( '#cuenta' ).getValue() ) {
        filters.push( {
            property: 'cue_ncuenta',
            value: view.down( '#cuenta' ).getValue()
        })
    }
    if( view.down( '#dealer' ).getValue() ) {
        filters.push( {
            property: 'lin_ccodigo',
            value: view.down( '#dealer' ).getValue()
        })
    }
    if( view.down( '#observacion' ).getValue() ) {
        filters.push( {
            property: 'stc_mobservaciones:LIKE',
            value: view.down( '#observacion' ).getValue()
        })
    }
    if( view.down( '#dealercuenta' ).getValue() ) {
        var datos = view.down( '#dealercuenta' ).getValue().split( '-' );
        if( datos.length > 0 ) {
            filters.push( {
                property: 'lin_ccodigo',
                value: datos[ 0 ]
            })
            filters.push( {
                property: 'cue_ncuenta',
                value: datos[ 1 ]
            })
        } else {
            notify( 'El formato para la busqeuda no es valido' )
        }
    }
    view.filters = filters
},
onCanceladoClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.getStore();
    if( !view.filtrosActivos[ 3 ] ) {
        view.filtrosActivos[ 3 ] = true;
    } else {
        view.filtrosActivos[ 3 ] = false;
    }
    this.activarFiltroEstados( view );
    this.habilitarOrdenesYReporte( view.filters, view );
    /**
     * BC 394298024 : Al tildar por estado de ST pierdo los filtros aplicados en el menu Filtrar.
     */
    this.checkFilterMenu( view.filters, view );
    store.filter( view.filters );
},
    
onPendienteClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.getStore();
    if( !view.filtrosActivos[ 1 ] ) {
        view.filtrosActivos[ 1 ] = true;
    } else {
        view.filtrosActivos[ 1 ] = false;
    }
    this.activarFiltroEstados( view );
    this.habilitarOrdenesYReporte( view.filters, view );
    /**
     * BC 394298024 : Al tildar por estado de ST pierdo los filtros aplicados en el menu Filtrar.
     */
    this.checkFilterMenu( view.filters, view );
    store.filter( view.filters );
},
    
onFinalizadoClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.getStore();
    if( !view.filtrosActivos[ 4 ] ) {
        view.filtrosActivos[ 4 ] = true;
    } else {
        view.filtrosActivos[ 4 ] = false;
    }
    this.activarFiltroEstados( view );
    this.habilitarOrdenesYReporte( view.filters, view );
    /**
     * BC 394298024 : Al tildar por estado de ST pierdo los filtros aplicados en el menu Filtrar.
     */
    this.checkFilterMenu( view.filters, view );
    store.filter( view.filters );
},
    
onEnEjecucionClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.getStore();
    if( !view.filtrosActivos[ 5 ] ) {
        view.filtrosActivos[ 5 ] = true;
    } else {
        view.filtrosActivos[ 5 ] = false;
    }
    this.activarFiltroEstados( view );
    this.habilitarOrdenesYReporte( view.filters, view );
    /**
     * BC 394298024 : Al tildar por estado de ST pierdo los filtros aplicados en el menu Filtrar.
     */
    this.checkFilterMenu( view.filters, view );
    store.filter( view.filters );
},
    
onEnCaminoClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.getStore();
    if( !view.filtrosActivos[ 6 ] ) {
        view.filtrosActivos[ 6 ] = true;
    } else {
        view.filtrosActivos[ 6 ] = false;
    }
    this.activarFiltroEstados( view );
    this.habilitarOrdenesYReporte( view.filters, view );
    /**
     * BC 394298024 : Al tildar por estado de ST pierdo los filtros aplicados en el menu Filtrar.
     */
    this.checkFilterMenu( view.filters, view );
    store.filter( view.filters );
},
    
onAsignadoClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var store = view.getStore();
    if( !view.filtrosActivos[ 2 ] ) {
        view.filtrosActivos[ 2 ] = true;
    } else {
        view.filtrosActivos[ 2 ] = false;
    }
    this.activarFiltroEstados( view );
    this.habilitarOrdenesYReporte( view.filters, view );
    /**
     * BC 394298024 : Al tildar por estado de ST pierdo los filtros aplicados en el menu Filtrar.
     */
    this.checkFilterMenu( view.filters, view );
    store.filter( view.filters );
},
    
onAsignarClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var selection = view.getSelectionModel().getSelection();
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione un Tecnico',
        closeAction: 'destroy',
        itemId: 'cuentaWin',
        width: 750,
        height: 475,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'asignartecnicogridview',
                caller: view,
                selection: selection
            }
        ]
    });
    win.show();
},
    
onAsignarMovilClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var selection = view.getSelectionModel().getSelection();
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione un movil',
        closeAction: 'destroy',
        width: 750,
        height: 550,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'asignarmovilgridview',
                caller: view,
                selection: selection
            }
        ]
    });
    win.show();
},
onNuevoClick: function(button, event, options ) {
    var view = button.up( 'multicuentaserviciotecnicogridview' );
    var item = {};
    if( view.tip_nCondicion ) {
        item = {
            xtype: 'cuentahelperview',
            tip_nCondicion: view.tip_nCondicion,
            est_nestadoin: '0,1,3,5',
            hidebuttons: [ '#particiones', '#filterNohabilitadas' ],
            caller: view
        }
    } else {
        item = {
            xtype: 'cuentahelperview',
            tip_ncondicion: "0",
            hidebuttons: [ '#particiones' ],
            caller: view
        }
    }
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione una Cuenta',
        closeAction: 'destroy',
        itemId: 'cuentaWin',
        width: 750,
        height: 550,
        border: true,
        modal: true,
        view: view,
        items: [
            item
        ]
    });
    win.show();
},
    
onNuevoWithCuentaClick: function (btn ) {
    var view = btn.up( 'multicuentaserviciotecnicogridview' )
    var cuenta = this.getCuentaSearchModelModel().create( {
        cue_iid: view.record.get( 'cue_iid' ),
        Name: view.record.get( 'cue_cnombre' ),
        cue_ncuenta: view.record.get( 'cue_ncuenta' ),
        cue_clinea: view.record.get( 'cue_clinea' )
    })
    this.onCuentaChanged( cuenta, view )
},
onCuentaChanged: function(cuenta, view ) {
    var model = this.getM_st_cabeceraModelModel();
    var now = new Date();
    var myobject = model.create( {
        
        stc_iid_cuenta: cuenta.get( 'cue_iid' ),
        //stc_dfecha_cierre: new Date('1/1/1900'),
        //stc_dfecha_desde_1: new Date('1/1/1900'),
        //stc_dfecha_hasta_1: new Date('1/1/1900'),          
        stc_cmovil_1: '',
        stc_cmovil_2: '',
        stc_dfecha_modificacion: new Date(),
        stf_dfecha_vto_orden: ''
    });
    myobject.set('Id',0);
    var xtype = 'sertecfullformview';
    var height = 475;
    if( view.simpleForm ) {
        xtype = 'sertecformview';
        height = 200;
    }
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: getLocale( 'Nuevo servicio técnico para ' ) + cuenta.get( 'Name' ),
        closeAction: 'destroy',
        width: 750,
        height: height,
        border: true,
        translate: false,
        modal: true,
        view: view,
        items: [
            {
                xtype: xtype,
                caller: view,
                callerView: view, //usa las 2 por que cada xtype tiene su forma
                operador: view.operador,
                record: myobject,
                recordFull: cuenta,
                newrecord: true
            }
        ]
    });
    win.show();
},
    
habilitarOrdenesYReporte: function (filters, view ) {
    if( filters.lenght <= 0 ) {
        if( view.down( '#ordenes' ) )
            view.down( '#ordenes' ).setDisabled( true );
        view.down( '#reportes' ).setDisabled( true );
    } else {
        if( view.down( '#ordenes' ) )
            view.down( '#ordenes' ).setDisabled( false );
        view.down( '#reportes' ).setDisabled( false );
    }
}
});
