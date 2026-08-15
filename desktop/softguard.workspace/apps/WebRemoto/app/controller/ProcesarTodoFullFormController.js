Ext.define('WebRemoto.controller.ProcesarTodoFullFormController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SoftguardCodigoAlarmaModel', 'EventosTiempoRealModel', 'TablasResolucionesSearchModel', 'TablasCategorizacionSearchModel', 'EventosPendientesSearchModel', 'AlarmasEnEventosPendientesSearchModel'],
    views: ['ProcesarTodoFullFormView'],

    init: function (config) {
        // this.initConfig(config);
        // genero los eventos

        this.control({
            'procesartodoformview': {
                afterrender: this.preInitview
            },
            'procesartodoformview button[action=save]': {
                click: this.onSaveClick
            },
            'procesartodoformview #espera': {
                click: this.onEsperaClick
            },
            'procesartodoformview button[action=cancel]': {
                click: this.onCancelClick
            },
            'procesartodoformview #search': {
                click: this.onSearchClick
            },
            'procesartodoformview #observaciones': {
                change: this.onChangeObservacionesClick
            },
            'procesartodoformview #observaciones2': {
                change: this.onChangeObservaciones2Click
            },
            'procesartodoformview #vertodos': {
                click: this.onVerTodosClick
            },
            'procesartodoformview #codigoalarma': {
                expand: this.onAlarmasExpand
            },
            'procesartodoformview #resolucion': {
                change: this.onResolucionChange
            },
            'procesartodoformview #categorizacion': {
                change: this.onCategorizacionChange
            },
            'procesartodoformview button[action=supervision]': {
                click: this.onSupervisionClick
            },
        });
    }, // cierro init


    onResolucionChange: function (combo, value) {
        var view = combo.up('procesartodoformview')
        if (view.resolucionRequerida == 2) {
            if (value != '') {
                //view.down('#save').setDisabled(false)
                //verifico si categoriazcion tambien requiere 
                if (view.categorizacionRequerida == 2) {

                    if (view.down('#categorizacion').getValue()) {
                        view.down('#save').setDisabled(false)
                    } else {
                        view.down('#save').setDisabled(true)
                    }

                } else {
                    view.down('#save').setDisabled(false)
                }
            } else {
                view.down('#save').setDisabled(true)
            }
        }
    },


    onCategorizacionChange: function (combo, value) {
        var view = combo.up('procesartodoformview')
        if (view.categorizacionRequerida == 2 || view.categorizacionRequerida == 1) {
            if (value != '') {
                //view.down('#save').setDisabled(false)
                //verifico si resolucion es requerida
                if (view.resolucionRequerida == 2) {
                    if (view.down('#resolucion').getValue()) {
                        view.down('#save').setDisabled(false)
                    } else {
                        view.down('#save').setDisabled(true)
                    }

                } else {
                    view.down('#save').setDisabled(false)
                }

            } else {
                view.down('#save').setDisabled(true)
            }

        }
    },


    onAlarmasExpand: function (combo) {
        combo.getStore().load()
    },

    onVerTodosClick: function (btn) {
        var view = btn.up('procesartodoformview')
        view.down('#dealer').setValue()
        view.down('#cuentadesde').setValue()
        view.down('#cuentahasta').setValue()
        view.down('#codigoalarma').setValue()

        this.onSearchClick(btn)

    },

    onChangeObservacionesClick: function (combo, newvalue, oldvalue) {

        var view = combo.up('procesartodoformview');
        var textarea = view.down('#obsfield');
        textarea.setValue(newvalue);

    },

    onChangeObservaciones2Click: function (combo, newvalue, oldvalue) {

        var view = combo.up('procesartodoformview');
        var textarea = view.down('#obsfield2');
        textarea.setValue(newvalue);

    },

    preInitview: function (view) {

        //cargo los combos de categorai y resolucion
        var controller = this;
        var resolucionesStore = Ext.create('Ext.data.Store', {
            model: controller.getTablasResolucionesSearchModelModel(),
            pageSize: 99999,
            remoteFilter: true,
            remoteSort: true,
            autoload: false,
            sorters: [{ "property": "res_cdescripcion", "direction": "ASC" }],
            filters: [
                {
                    property: 'res_nEstado',
                    value: 0
                }
            ]
        });
        view.down('#categorizacion').bindStore(resolucionesStore)
        resolucionesStore.load({
            callback: function () {


                var categorizacionStore = Ext.create('Ext.data.Store', {
                    model: controller.getTablasCategorizacionSearchModelModel(),
                    pageSize: 99999,
                    remoteFilter: true,
                    remoteSort: true,
                    autoload: false,
                    sorters: [{ "property": "cat_cDescripcion", "direction": "ASC" }],
                    /*filters: [
                        {
                            property: 'res_nEstado', 
                            value: 0
                        }
                    ]*/
                });
                view.down('#resolucion').bindStore(categorizacionStore)
                categorizacionStore.load({
                    callback: function () {


                        ///esto lo pongo por que me rompe el buscador en el combo
                        categorizacionStore.remoteFilter = false;
                        resolucionesStore.remoteFilter = false;

                        controller.initview(view)
                    }
                })

            }
        })

    },

    initview: function (view) {

        var me = this;

        view.maximoEventos = 50

        //if(view.noReservar) {
        view.insert(1, {
            xtype: 'container',
            itemId: 'msg',
            height: 30,
            html: '<img src="/resources/global/images/icons/error.png" /> <strong style="vertical-align: super;">' + getLocale('Se procesarán hasta') + ' ' + view.maximoEventos + ' ' + getLocale('eventos pendientes.') + '</strong>'
        });
        //}

        var sorters = [
            {
                property: 'cod_nprioridad',
                direction: 'ASC'
            },
            {
                property: 'rec_iid',
                direction: 'DESC'
            }
        ];


        view.me = this;

        if (!view.estados) view.estados = 0;

        var filters = [{
            property: "rec_nestado:ININT",
            value: view.estados,
            id: "rec_nestado"
        }, {
            property: "operadorAtendiendoCuentaNULL",
            value: 0,
            id: "operadorAtendiendoCuenta"
        }]

        if (view.filters) {
            filters = view.filters


            //si algunos de los filtros que se pasan no tienen la propieda base:true entidndo que tengo que esconder la toolbar
            Ext.Array.each(filters, function (rec) {
                if (rec.base != true) {
                    view.down('toolbar').hide()
                    return false;
                }
            })

        }

        var mystore = Ext.create('Ext.data.Store', {
            model: this.getEventosPendientesSearchModelModel(),
            remoteGroup: false,
            remoteSort: true,
            remoteFilter: true,
            pageSize: view.maximoEventos,
            filters: filters,
            autoload: false,
            sorters: sorters
        });


        // esto estaba todo comentado y no funcionaba... descomento dedalo 8/2/2018
        var mygrid = view.down('#eventosprocesartodo');

        if (view.excluirOrganizacionUsuarioActual) {
            mystore.proxy.extraParams.excluirOrganizacionUsuarioActual = view.excluirOrganizacionUsuarioActual
        }

        mygrid.estados = view.estados;

        mygrid.bindStore(mystore);
        mystore.grid = mygrid;
        mystore.view = view;

        this.reservo(mystore, view);
        // estaba comentado hasta aca


        if (view.showEstadosFilter) {
            var estadoStore = estados.getStore();

            estadoStore.filterBy(function (record) {
                return Ext.Array.contains(view.estados, record.get('Value'))
            })

            estados.show();
        }




        var codigoAlarmaStore = Ext.create('Ext.data.Store', {
            model: this.getAlarmasEnEventosPendientesSearchModelModel(),//this.getSoftguardCodigoAlarmaModelModel(),
            autoload: false,
            sorters: [{
                property: 'cod_cdescripcion',
                direction: 'ASC'
            }],
            pageSize: 10000
        });
        var comboCodigoalarma = view.down('#codigoalarma');
        comboCodigoalarma.bindStore(codigoAlarmaStore);
        codigoAlarmaStore.load();


        if (view.observacion) {
            view.down('#obsfield').setValue(view.observacion)
            view.down('#obsfield2').setValue(view.observacion)

        }

        var TIEMPOENESPERA = getParametro('TIEMPOENESPERA', true, true);
        var TIEMPOENESPERAObj = TIEMPOENESPERA.get('_par_cvalor');

        var maxespera = 100;
        if (TIEMPOENESPERAObj && TIEMPOENESPERAObj.max) {
            maxespera = TIEMPOENESPERAObj.max == 999 ? null : TIEMPOENESPERAObj.max;
        } else {
            maxespera = TIEMPOENESPERA.get('par_ivalor')
        }


        var minespera = 2;
        if (TIEMPOENESPERAObj && TIEMPOENESPERAObj.min) {
            minespera = TIEMPOENESPERAObj.min == 999 ? null : TIEMPOENESPERAObj.min;
        }

        var tiempoenespera = 50;
        if (TIEMPOENESPERAObj && TIEMPOENESPERAObj.default) {
            tiempoenespera = TIEMPOENESPERAObj.default == 999 ? null : TIEMPOENESPERAObj.default;
        } else {
            tiempoenespera = TIEMPOENESPERA.get('par_ivalor')
        }

        view.down('#minutosEspera').setMaxValue(maxespera)
        view.down('#minutosEspera').setValue(tiempoenespera)
        view.down('#minutosEspera').setMinValue(minespera)

        //defino tiempo en espera
        /*var tiempoenespera = getParametro('TIEMPOENESPERA')
        if(tiempoenespera) {
            view.down('#minutosEspera').setValue(tiempoenespera)
        }*/
    },

    reservo: function (mystore, view) {
        view.down('#save').setDisabled(true)
        view.down('#espera').setDisabled(true)
        view.loading = true;
        var controller = this;

        mystore.proxy.extraParams.completo = true;
        mystore.load({
            callback: function (records, proccess) {



                /*    
                     var resolucionesStore =Ext.create('Ext.data.Store',{
                         model: controller.getTablasResolucionesSearchModelModel(),
                         pageSize: 99999,
                         remoteFilter:true,
                         remoteSort: true,
                         sorters: [{"property":"res_cdescripcion","direction":"ASC"}],
                         filters: [
                             {
                                 property: 'res_nEstado', 
                                 value: 0
                             }
                         ]
                     });
                     view.down('#categorizacion').bindStore(resolucionesStore)
                     resolucionesStore.load({callback:function () {*/

                //combos
                var categorizacionCombo = view.down('#categorizacion')
                var resolucionCombo = view.down('#resolucion')


                //parametros
                view.categorizacionRequerida = getParametro('CATEGORIZACIONOBLIGATORIA')
                view.resolucionRequerida = getParametro('RESOLUCIONOBLIGATORIA')




                //evaluo el tipo de validacion a utilizar
                if (view.categorizacionRequerida == 1) {
                    categorizacionCombo.allowBlank = false;
                    categorizacionCombo.setValue(categorizacionCombo.getStore().first());
                    categorizacionCombo.validateValue(categorizacionCombo.getValue());
                } else if (view.categorizacionRequerida == 2) {
                    categorizacionCombo.allowBlank = false;
                    categorizacionCombo.setValue('');
                    categorizacionCombo.validateValue(categorizacionCombo.getValue());
                } else {
                    categorizacionCombo.allowBlank = true;
                    categorizacionCombo.setValue('');
                }


                if (view.resolucionRequerida == 1) {
                    resolucionCombo.allowBlank = false;
                    resolucionCombo.setValue(resolucionCombo.getStore().first());
                    resolucionCombo.validateValue(resolucionCombo.getValue());
                } else if (view.resolucionRequerida == 2) {

                    resolucionCombo.allowBlank = false;
                    resolucionCombo.validateValue(resolucionCombo.getValue());
                } else {
                    resolucionCombo.allowBlank = true;
                    resolucionCombo.validateValue()
                }



                //seteo valores
                if (view.resolucion) {
                    resolucionCombo.setValue(view.resolucion)
                }

                if (view.categorizacion) {
                    categorizacionCombo.setValue(view.categorizacion)
                }



                // valido si tengoqeu habilitar el boton porque se cargaron los defaults.
                var resolucion = resolucionCombo.getValue();
                var categorizacion = categorizacionCombo.getValue();

                view.down('#save').setDisabled(true)
                var muestroprocesar = true;
                if (view.resolucionRequerida == 2) {
                    if (resolucion == '' || resolucion == null) {
                        muestroprocesar = false;
                    }
                }
                if (view.categorizacionRequerida == 2) {
                    if (resolucion == '' || resolucion == null) {
                        muestroprocesar = false;
                    }
                }

                if (muestroprocesar) {
                    view.down('#save').setDisabled(false)
                }



                /*  }});*/

                if (records.length > 0) {


                    //si la cantidad de eventos exede a maximoEventos damos aviso al usuario
                    if (proccess._resultSet.total > view.maximoEventos && !view.noReservar) {

                        var reserva = view.maximoEventos
                        if (view.maximoEventos > records.length) {
                            reserva = records.length
                        }

                        /*
                        se saco a pedido de leo
                        https://basecamp.com/2249105/projects/14758734/todos/367754101#comment_657981377
                        
                        Ext.MessageBox.alert('Atencion', 'Se resevaron '+reserva+' eventos de '+records.length, function(){
                            //no hago nada
                         })
                         */
                    }

                    // reservo
                    var procesarArray = [];
                    var categorizacion = view.down('#categorizacion') ? view.down('#categorizacion').getValue() : null;
                    var observaciones = view.down('#obsfield') ? view.down('#obsfield').getValue() : null;
                    var resolucion = view.down('#resolucion') ? view.down('#resolucion').getValue() : null;
                    Ext.Array.each(records, function (record) {
                        procesarArray.push(record.get('rec_iid'));
                    })
                    procesar = procesarArray.join(",");

                    if (!view.noReservar) {
                        Ext.Ajax.request({
                            url: '/handler/ProcesarTodoFullInterface?_dc=' + new Date().getTime(),
                            params: {
                                rec_idResolucion: resolucion,
                                rec_cObservaciones: observaciones,
                                rec_cCategorizacion: categorizacion,
                                paso: 0,
                                rec_iidArray: procesar,
                                token: Ext.util.Cookies.get('OAuth_Token')

                            },
                            method: 'POST',
                            scope: this,
                            success: function (response) {
                                var parametros = Ext.JSON.decode(response.responseText);

                                //evaluo error retorno de ajax                        
                                controller.evaluarErrorResponse(parametros, view, controller)

                                var rec = parametros.rows[0];
                                var cerrar = false;

                                if (rec && rec.Error != 0) {

                                    notifyError(rec.Message);
                                } else {
                                    /*
                                    se saco a pedido de leo
                                    https://basecamp.com/2249105/projects/14758734/todos/367754101#comment_657981377
                       
                                    notify('Se reservaron todos los eventos que se muestran el la tabla');
                                    */

                                    if (view.resolucionRequerida != 2) {
                                        view.down('#save').setDisabled(false)
                                    }

                                    view.down('#espera').setDisabled(false)


                                }

                                view.loading = false;

                            }
                        });
                    } else {
                        //   notify('Ningun evento fue reservado')

                        if (view.resolucionRequerida != 2) {
                            view.down('#save').setDisabled(false)
                        }

                        view.down('#espera').setDisabled(false)
                        view.loading = false;
                    }
                }


            }
        })

    },

    loadData: function (view) {
        var controller = this;
        var myGrid = view.down('#eventosprocesartodo'),
            myStore = myGrid.store;



        view.down('#save').setDisabled(true)
        view.down('#espera').setDisabled(true)
        view.loading = true;


        var dealer = view.down('#dealer');
        var cuentaDesde = view.down('#cuentadesde');
        var cuentaHasta = view.down('#cuentahasta');
        var alarma = view.down('#codigoalarma');
        var filters = [];




        filters.push({
            property: 'rec_nestado',
            value: 9,
            id: 'rec_nestado'
        })


        if (dealer.getValue()) {
            filters.push({
                property: 'o.cue_clinea',
                value: dealer.getValue(),
                id: 'cue_clinea'
            })
        }

        if (alarma.getValue() && alarma.getValue() != '') {
            filters.push({
                property: 'rec_calarma:IN',
                value: alarma.getValue().join(),
                id: 'rec_calarma'
            })
        }


        if (cuentaDesde.getValue()) {
            var pad = "0000";
            var n = cuentaDesde.getValue();

            var result = (pad + n).slice(-pad.length);
            cuentaDesde.setValue(result)

            filters.push({
                property: 'o.[cue_ncuenta]:GTESTRING',
                value: Ext.util.Format.trim(cuentaDesde.getValue()),
                id: 'cuentaDesde'
            })
        }


        if (cuentaHasta.getValue()) {
            var pad = "0000";
            var n = cuentaHasta.getValue();

            var result = (pad + n).slice(-pad.length);
            cuentaHasta.setValue(result)

            filters.push({
                property: 'o.[cue_ncuenta]:LTESTRING',
                value: Ext.util.Format.trim(cuentaHasta.getValue()),
                id: 'cuentaHasta'
            })
        }


        myStore.clearFilter(true)
        myStore.proxy.extraParams = { completo: true };


        myStore.load({
            filters: filters, scope: view, callback: function (records) {
                //myGrid.getSelectionModel().selectAll();
                //myGrid.getView().focusRow(0);

                view.down('#save').setDisabled(false)
                view.down('#espera').setDisabled(false)
                view.loading = false;
            }
        });
    },

    /*  onBeforeload: function(store,operation,options){
        
              var view = store.view;
              
          var params = {};
          
          
          var condiciones = view.condiciones;        
          if (condiciones){
              params.CondicionCuenta = condiciones;
          }
     
          params.Estados = view.estados; 
          params.cue_clinea = view.cue_clinea;
          params.cue_ncuentaDesde = view.cue_ncuentaDesde;
          params.cue_ncuentaHasta = view.cue_ncuentaHasta;
          params.CodigosAlarma = view.CodigosAlarma;
          
          operation.params =params;
      },  */

    onSearchClick: function (button, event, options) {
        var view = button.up('procesartodoformview');

        view.estados = 9;
        view.cue_clinea = view.down('#dealer').getValue();
        view.cue_ncuentaDesde = view.down('#cuentadesde').getValue();
        view.cue_ncuentaHasta = view.down('#cuentahasta').getValue();
        view.CodigosAlarma = view.down('#codigoalarma').getValue();

        this.loadData(view);
    },

    evaluarErrorResponse: function (parametros, view, controller) {

        if (parametros.error == 1) {
            notify('Ocurrio un error al procesar todos')

            view.mask.hide();
            controller.devolverEventosAPendiente(view)

            logger.error(parametros, function () {
                console.log('Fue reportardo un error de ajax en LOG', parametros)
            })

            view.up('window').close();

            return false;
        }

    },

    onEsperaClick: function (button, event, options) {
        var view = button.up('procesartodoformview');

        var record = view.record;
        var observaciones = view.down('#obsfield2').getValue();
        var gridrecepcion = view.down('#eventosprocesartodo');
        var controller = this;
        var minutosEspera = view.down('#minutosEspera').getValue();


        var TIEMPOENESPERA = getParametro('TIEMPOENESPERA', true, true);
        var TIEMPOENESPERAObj = TIEMPOENESPERA.get('_par_cvalor');

        if (minutosEspera < TIEMPOENESPERAObj.min || minutosEspera > TIEMPOENESPERAObj.max) {
            notify('El valor de de minutos de espera supera los limites definidos en el parametro TIEMPOENESPERA')
            return false;
        }


        var selectionModel = gridrecepcion.getSelectionModel();
        var selectedRecords = selectionModel.getSelection();
        var procesar = '';
        var noProcesar = '';


        var procesarArray = [];
        var todosArray = [];
        var noProcesarArray = [];


        var mygrid = view.down('#eventosprocesartodo');


        Ext.Array.each(mygrid.getStore().data.items, function (record) {
            todosArray.push(record.get('rec_iid'));
        })




        if (selectedRecords.length > 0) {
            Ext.Array.each(selectedRecords, function (record) {
                procesarArray.push(record.get('rec_iid'));
            })
            procesar = procesarArray.join(",");
        } else {
            notify('Debe selecional almenos 1 evento.');
            return false;
        }


        Ext.Array.each(todosArray, function (value) {
            if (procesarArray.indexOf(value) == -1) {
                noProcesarArray.push(value);
            }
        })
        noProcesar = noProcesarArray.join(",");



        Ext.Ajax.request({
            url: '/handler/ProcesarTodoFullInterface?_dc=' + new Date().getTime(),
            params: {
                rec_iMinutosEspera: minutosEspera,
                rec_idResolucion: '',
                rec_cObservaciones: observaciones,
                rec_cCategorizacion: '',
                rec_iidArray: procesar,
                paso: 3,
                token: Ext.util.Cookies.get('OAuth_Token')

            },
            method: 'POST',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                //evaluo error retorno de ajax
                controller.evaluarErrorResponse(parametros, view, controller)
                var rec = parametros.rows[0];
                var cerrar = false;

                if (rec && rec.Error != 0) {
                    notifyError(rec.Message);
                } else {
                    notify('Se pusieron en espera los eventos seleccionados');

                    if (view.caller) {
                        view.caller.fireEvent('procesedFullEvents', view.caller)
                    }
                    view.up('window').close();
                }

                Ext.Ajax.request({
                    url: '/handler/ProcesarTodoFullInterface?_dc=' + new Date().getTime(),
                    params: {
                        rec_idResolucion: '',
                        rec_cObservaciones: '',
                        rec_cCategorizacion: '',
                        paso: 2,
                        rec_iidArray: noProcesar,
                        token: Ext.util.Cookies.get('OAuth_Token')

                    },
                    method: 'POST',
                    scope: this,
                    success: function (response) {
                        var parametros = Ext.JSON.decode(response.responseText);

                        //evaluo error retorno de ajax
                        controller.evaluarErrorResponse(parametros, view, controller)

                        var rec = parametros.rows[0];
                        var cerrar = false;

                        if ((rec && rec.Error == 0) || (parametros && parametros.success == true)) {
                            //actualizo las pantallas
                            // notify('Se pasaron a espera los eventos seleccionados');

                        } else {
                            notifyError(rec.Message);
                        }

                    }
                });
            }
        });
    },
    onSupervisionClick: function (button, object, options) {
        const view = button.up('procesartodoformview');
        const observaciones = view.down('#obsfield2').getValue();
        const gridrecepcion = view.down('#eventosprocesartodo')
        const controller = this;
        const selectionModel = gridrecepcion.getSelectionModel();
        const selectedRecords = selectionModel.getSelection();

        /* tengo que corregir para que desde el grid al hacer proceso multiple no se rompa al no tener el panel en el mismo lado, 
        tengo que buscar la forma de hacer algo como el if
        const tab = view.caller.caller.up().up();
        const panel = tab.up();
         */

        if (view.isLlamadaOpen) {
            notify('La ventana de llamados debe estar cerrada para poder procesar.');
            return false;
        }
        const promises = [];
        var todosArray = [];
        const grid = view.caller.caller.down('eventospendientestrgridview');

        view.maskLoading = Ext.create('Ext.LoadMask', view, {
            msg: getLocale("Preparando") + " " + selectedRecords.length + " " + getLocale("registros")
        }).show();
        console.log("eventos", selectedRecords)
        Ext.Array.each(selectedRecords, function (evento) {
            const promise = new Promise((resolve, reject) => {
                Ext.Ajax.request({
                    url: '/rest/search/AtencionEventoSupervisor',
                    params: {
                        rec_iid: evento.get('rec_iid'),
                        rec_cObservaciones: observaciones
                    },
                    method: 'GET',
                    success: function (response) {
                        const parametros = Ext.JSON.decode(response.responseText);
                        const rec = parametros.rows[0];
                        if (parametros.success) {
                            resolve();
                        } else {
                            if (rec)
                                notifyError(rec.Message);
                            reject();
                        }
                    },
                    failure: function (response) {
                        reject();
                    }
                });
            });
            promises.push(promise);
        });

        Promise.all(promises)
            .then((res) => {
                view.maskLoading.hide();
                view.up('window').close();
                if (view.caller) {
                    const tab = view.caller.caller.up().up();
                    const panel = tab.up();

                    if (panel) {
                        panel.remove(tab);
                        tab.destroy();
                    }
                }
                notify('Los eventos se pasaron a supervision.');
            })
            .catch((error) => {
                console.log("catch error - -", error)
                notify('Error al pasar a supervision');
                view.maskLoading.hide();
            });
    },
    onSaveClick: function (button, event, options) {
        var view = button.up('procesartodoformview');
        var record = view.record;
        var resolucion = view.down('#categorizacion').getValue();
        var observaciones = view.down('#obsfield').getValue();
        var categorizacion = view.down('#resolucion').getValue();
        //  var cue_iid = view.caller.record.get('cue_iid');
        var gridrecepcion = view.down('#eventosprocesartodo')
        var controller = this;

        var selectionModel = gridrecepcion.getSelectionModel();
        var selectedRecords = selectionModel.getSelection();
        var procesar = '';
        var noProcesar = '';


        var procesarArray = [];
        var todosArray = [];
        var noProcesarArray = [];


        var mygrid = view.down('#eventosprocesartodo');

        var form = view.down('#procesar');
        if (!form.isValid()) {
            notifyError('Por favor corrija los valores del formulario');
            return false;
        }

        // No recorrer 2 veces los array, se recorre 1 vez el array de todos
        // si esta en el seleccionado entonces va a procesar y sino va a 
        // devolver

        // cada 10 0 20 registros llamar al ajax y seguir con el array
        // ir actualizando una barra de estado con la cantidad procesada y la total

        Ext.Array.each(mygrid.getStore().data.items, function (record) {
            todosArray.push(record.get('rec_iid'));
        })

        if (selectedRecords.length > 0) {
            Ext.Array.each(selectedRecords, function (record) {
                procesarArray.push(record.get('rec_iid'));
            })
            // procesar =  procesarArray.join(","); 
        } else {
            notify('Debe seleccionar almenos 1 evento.');
            return false;
        }


        Ext.Array.each(todosArray, function (value) {
            if (procesarArray.indexOf(value) == -1) {
                noProcesarArray.push(value);
            }
        })

        view.mask = Ext.create('Ext.LoadMask', view, {
            msg: getLocale("Preparando") + " 0/" + procesarArray.length + " " + getLocale("registros")
        }).show();

        try {
            this.procesarPorLote(resolucion, observaciones, categorizacion, procesarArray, 50, 0, noProcesarArray, view);
        } catch (e) {

            notify('Ocurrio en procesar todos.')

            var code = {
                error: 'Error al inicio proceso de procesartodos',
                origin: 'ProcesarTodoFullFormController',
                response: response.responseText,
                info: {
                    categorizacion: categorizacion,
                    eventosAProcesar: procesarArray
                }
            }

            controller.devolverEventosAPendiente(view)
            view.mask.hide();

            logger.error(code, function () {
                console.log('Fue reportardo un error de ajax en LOG', code)
            })

            view.up('window').close();
        }

    },


    devolverEventosAPendiente: function (view) {

        var buscoEstado = 9;
        Ext.Ajax.request({
            url: '/rest/search/DevolverEventosAPendiente',
            params: {
                rec_nestado: buscoEstado, // pendinete - procesar todo
                rec_ioperador: view.caller.up('viewport').operadorId
            },
            method: 'GET',
            scope: this,
            success: function (response) {
                view.mask.hide();
                notify('Se devolvieron todos los eventos a pendiente.')
            },
            failure: function (resp, options) {
                console.log('Error devolucion eventos:', arguments)
                notify('Ocurrio un error en procesar todos.')
                var code = '(DEAP)[OP' + view.caller.up('viewport').operadorId + 'ES' + buscoEstado + ']';
                Ext.Ajax.errorGenerated = code
                view.mask.hide();
                view.up('window').close();
            }
        })
    },

    procesarPorLote: function (resolucion, observaciones, categorizacion, procesarArray, registrosAProcesar, pagina, noProcesarArray, view) {
        var controller = this;
        var procesar = [];
        var desdeRegistro = registrosAProcesar * pagina;

        for (i = desdeRegistro; i < (desdeRegistro + registrosAProcesar); i++) {
            if (procesarArray[i]) {
                procesar.push(procesarArray[i])
            }
        }

        //   console.log(procesar)
        if (procesar.length > 0) {


            view.mask.hide();
            view.mask.msg = '[B:' + pagina + ']' + getLocale("Procesando") + " " + procesar.length * pagina + "/" + procesarArray.length + " " + getLocale("registros");
            view.mask.show();

            //    console.log(pagina,procesarArray.length,procesar)

            Ext.Ajax.request({
                url: '/handler/ProcesarTodoFullInterface?_dc=' + new Date().getTime(),
                params: {
                    rec_iidPadre: view.record ? view.record.get('rec_iid') : 0,
                    rec_idResolucion: resolucion,
                    rec_cObservaciones: observaciones,
                    rec_cCategorizacion: categorizacion,
                    paso: 1,
                    rec_iidArray: procesar.join(','),
                    token: Ext.util.Cookies.get('OAuth_Token')
                },
                method: 'POST',
                scope: this,
                success: function (response) {

                    try {
                        var parametros = Ext.JSON.decode(response.responseText);
                        //evaluo error retorno de ajax
                        controller.evaluarErrorResponse(parametros, view, controller)

                    } catch (e) {
                        notify('Ocurrio un error de encodeo, se retornan todos los eventos a pendientes.')

                        var code = {
                            error: 'Error de encodeo',
                            origin: 'ProcesarTodoFullFormController',
                            response: response.responseText
                        }

                        controller.devolverEventosAPendiente(view)
                        view.mask.hide();

                        logger.error(code, function () {
                            console.log('Fue reportardo un error de ajax en LOG', code)
                        })

                        view.up('window').close();
                    }

                    try {
                        var rec = parametros.rows[0];
                        var cerrar = false;

                        if (rec && rec.Error != 0) {
                            notifyError(rec.Message);

                        } else {
                            //notify('Se procesaron los eventos seleccionados');
                            //envio por mail el vento en el caso que se procese
                            if (getParametro('NOTIFICAEVENTODEALER') != '' && view.record && view.record.get('rec_iid') != '' && view.record.get('rec_iid') != 0) {
                                if (Ext.Array.contains(procesar, view.record.get('rec_iid'))) {

                                    var NOTIFICAEVENTODEALER = getParametro('NOTIFICAEVENTODEALER', true, true).get('_par_cvalor')
                                    var subject = getLocale('Procesamiento de evento') + ' [' + view.record.get('rec_calarma') + ' ' + view.record.get('rec_tfechaproceso') + ']';

                                    var preSubject = '';
                                    if (NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.nombreCuenta && NOTIFICAEVENTODEALER.numeroCuenta) {
                                        preSubject = Ext.util.Format.trim(view.record.get('cue_ncuenta')) + '-' + Ext.util.Format.trim(view.record.get('cue_cnombre'))
                                    } else if (NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.numeroCuenta) {
                                        preSubject = Ext.util.Format.trim(view.record.get('cue_ncuenta'))
                                    } else if (NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.nombreCuenta) {
                                        preSubject = Ext.util.Format.trim(view.record.get('cue_cnombre'))
                                    }

                                    subject = preSubject + ' ' + subject


                                    Ext.Ajax.request({
                                        url: '/rest/search/EnviarEventoADealer',
                                        params: {
                                            rec_iid: view.record.get('rec_iid'),
                                            dealer: view.record.get('cue_clinea'),
                                            subject: subject,
                                            cuentaId: view.record.get('rec_iidcuenta')

                                        },
                                        method: 'GET',
                                        scope: this,
                                        success: function (response) {
                                        }
                                    })
                                }
                            }

                            view.mask.hide();
                            view.mask.msg = '[A:' + pagina + ']' + getLocale("Procesando") + " " + procesar.length * pagina + "/" + procesarArray.length + " " + getLocale("registros");
                            view.mask.show();
                            this.procesarPorLote(resolucion, observaciones, categorizacion, procesarArray, 50, ++pagina, noProcesarArray, view);
                        }
                    } catch (e) {
                        notify('Ocurrio aL procesar')

                        var code = {
                            error: 'Error de PROCESAR',
                            origin: 'ProcesarTodoFullFormController',
                            response: response.responseText
                        }

                        controller.devolverEventosAPendiente(view)
                        view.mask.hide();

                        logger.error(code, function () {
                            console.log('Fue reportardo un error de ajax en LOG', code)
                        })

                        view.up('window').close();
                    }
                },
                failure: function (resp, options) {
                    console.log('Error en proceso de eventos:', arguments)
                    notify('Ocurrio un error en procesar todos.')

                    //armo codigo
                    var code = '(PPL)[R' + resp.status + 'CA' + categorizacion + 'CR' + procesarArray.length + 'PA' + pagina + ']';
                    Ext.Ajax.errorGenerated = code

                    //mando todo lo que quedo en procesatodo pendiente nuevamente
                    //muestro cartel
                    view.mask.hide();
                    view.mask.msg = getLocale('Regresando todos los eventos reservados.');
                    view.mask.show();

                    controller.devolverEventosAPendiente(view)

                    view.up('window').close();
                }
            })



        } else {


            view.mask.hide();
            view.mask.msg = getLocale("Regresando") + " 0/" + noProcesarArray.length + " " + getLocale("sin procesar");
            view.mask.show();
            //envio los push
            Ext.Ajax.request({
                url: '/handler/sendPushFromQueue',
                method: 'GET'
            });
            controller.noProcesarPorLote(resolucion, observaciones, categorizacion, noProcesarArray, 50, 0, view);
            return true;
        }




    },


    noProcesarPorLote: function (resolucion, observaciones, categorizacion, noProcesarArray, registrosAProcesar, pagina, view) {
        var controller = this;
        var noProcesar = [];
        var desdeRegistro = registrosAProcesar * pagina;

        for (i = desdeRegistro; i < (desdeRegistro + registrosAProcesar); i++) {
            if (noProcesarArray[i]) {
                noProcesar.push(noProcesarArray[i])
            }
        }

        // console.log(noProcesar)
        if (noProcesar.length > 0) {
            //  console.log(pagina,noProcesarArray.length,noProcesar)
            Ext.Ajax.request({
                url: '/handler/ProcesarTodoFullInterface?_dc=' + new Date().getTime(),
                params: {
                    rec_idResolucion: resolucion,
                    rec_cObservaciones: observaciones,
                    rec_cCategorizacion: categorizacion,
                    paso: 2,
                    rec_iidArray: noProcesar.join(','),
                    token: Ext.util.Cookies.get('OAuth_Token')

                },
                method: 'POST',
                scope: this,
                success: function (response) {
                    var parametros = Ext.JSON.decode(response.responseText);

                    //evaluo error retorno de ajax
                    controller.evaluarErrorResponse(parametros, view, controller)

                    var rec = parametros.rows[0];
                    var cerrar = false;

                    if (rec && rec.Error != 0) {
                        notifyError(rec.Message);
                    } else {
                        //notify('Se procesaron los eventos seleccionados');

                        view.mask.hide();
                        if (noProcesarArray.length > 0) {
                            view.mask.msg = getLocale("Regresando") + " " + noProcesar.length * pagina + "/" + noProcesarArray.length + " " + getLocale("sin procesar");
                            view.mask.show();
                        }

                        controller.noProcesarPorLote(resolucion, observaciones, categorizacion, noProcesarArray, 50, ++pagina, view);

                    }
                }
            });

        } else {
            // limpio todos los que hayan quedado
            view.mask.hide();
            view.mask.msg = getLocale("Regresando eventos sin procesar");
            view.mask.show();

            Ext.Ajax.request({
                url: '/handler/ProcesarTodoFullInterface?_dc=' + new Date().getTime(),
                params: {
                    rec_idResolucion: resolucion,
                    rec_cObservaciones: observaciones,
                    rec_cCategorizacion: categorizacion,
                    paso: 2,
                    rec_iidArray: '',
                    token: Ext.util.Cookies.get('OAuth_Token')

                },
                method: 'POST',
                scope: this,
                success: function (response) {
                    var parametros = Ext.JSON.decode(response.responseText);

                    //evaluo error retorno de ajax
                    controller.evaluarErrorResponse(parametros, view, controller)

                    var rec = parametros.rows[0];
                    var cerrar = false;

                    if (rec && rec.Error != 0) {
                        notifyError(rec.Message);
                    } else {

                        view.mask.hide();

                        if (view.caller) {
                            view.caller.fireEvent('forceEvaluateEvent', view.caller)
                        }

                        view.up('window').close();
                        return true;
                    }

                }
            });

        }

    },

    onCancelClick: function (button, event, options) {
        var view = button.up('procesartodoformview');
        var mygrid = view.down('#eventosprocesartodo');
        var todosArray = [];
        var controller = this;

        Ext.Array.each(mygrid.getStore().data.items, function (record) {
            todosArray.push(record.get('rec_iid'));
        })

        var volver = todosArray.join(',');

        if (volver) {

            Ext.Ajax.request({
                url: '/handler/ProcesarTodoFullInterface?_dc=' + new Date().getTime(),
                params: {
                    rec_idResolucion: '',
                    rec_cObservaciones: '',
                    rec_cCategorizacion: '',
                    paso: 2,
                    rec_iidArray: '',//volver,
                    token: Ext.util.Cookies.get('OAuth_Token')

                },
                method: 'POST',
                scope: this,
                success: function (response) {
                    var parametros = Ext.JSON.decode(response.responseText);

                    //evaluo error retorno de ajax
                    controller.evaluarErrorResponse(parametros, view, controller)


                    var rec = parametros.rows[0];
                    var cerrar = false;

                    if ((parametros.success == true && !rec) || (rec && rec.Error == 0)) {
                        //actualizo las pantallas
                        if (!view.noReservar) {
                            notify('Se retornaron los eventos.');
                        }
                        if (view.up('window'))
                            view.up('window').close();

                    } else {
                        notifyError(rec.Message);
                    }

                }
            });
        }
        view.up('window').close();
    }
});