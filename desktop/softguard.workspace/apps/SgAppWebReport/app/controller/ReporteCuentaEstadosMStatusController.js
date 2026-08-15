Ext.define('SgAppWebReport.controller.ReporteCuentaEstadosMStatusController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['TablaHistoricoSearchModel'],
    views: ['ReporteCuentaEstadosMStatusView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reporteestadocuentamstatusview': {
                afterrender: this.initView
            },
            'reporteestadocuentamstatusview button[action=search]': {
                click: this.onSearchClick
            },
            'reporteestadocuentamstatusview button[action=btnprint]': {
                click: this.onBtnprintClick
            }, 
            'reporteestadocuentamstatusview button[action=todos]': {
                click: this.onTodosClick
            },
            'reporteestadocuentamstatusview #combohistorico': {
                select: this.onComboHistoricoSelect,
                change: this.onCleanDates
            }
        });

    }, // cierro init

    initView: function (view) {

        view.baseurl = '/handler/ReporteCuentaEstadosMStatusHTML';
        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        var filters = [];

        var dateNow = new Date()
        var now = Ext.Date.format(dateNow, 'Y/m/d H:i:s');
        var mesAnterior = Ext.Date.format(Ext.Date.add(dateNow, Ext.Date.MONTH, -1), 'Y/m/d H:i:s');
        var hora = Ext.Date.format(dateNow, 'H:i');

        view.down('#fechadesde').setValue(Ext.Date.add(dateNow, Ext.Date.MONTH, -1))
        view.down('#fechahasta').setValue(dateNow)
        view.down('#horadesde').setValue(hora)
        view.down('#horahasta').setValue(hora)

        /* var filterCambioEstado = [];
         var filterEliminadas = [];
         var filterAlta = [];
         
         filterCambioEstado.push({
             property:'rec_tfechahora:GTEDATESTRING',
             value:mesAnterior
         })
         filterEliminadas.push({
             property:'aud_tFechaHora:GTEDATESTRING',
             value:mesAnterior
         })    
         
        
         filterCambioEstado.push({
             property:'rec_tfechahora:LTEDATESTRING',
             value:now
         })
         filterEliminadas.push({
             property:'aud_tFechaHora:LTEDATESTRING',
             value:now
         })
         
         
         filterAlta.push({
             property:'cue_dfechaalta:GT',
             value:mesAnterior
         })
         filterAlta.push({
             property:'cue_dfechaalta:GL',
             value:now
         })
         
         
         
        
         view.baseurl = Ext.String.urlAppend(view.baseurl, 'sorters='+Ext.encode([
             {
                 property:'rec_iidcuenta',
                 direction:'DESC'
             }
         ]));
         
         
         
         view.baseurl = Ext.String.urlAppend(view.baseurl, 'icon=cancel.png');
         view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
 
         view.baseurl = Ext.String.urlAppend(view.baseurl, 'title='+Ext.encode('Estado de las cuentas MStatus'));
         
        
         var url = Ext.String.urlAppend(view.baseurl, "filterCambioEstado="+Ext.encode(filterCambioEstado));
         url = Ext.String.urlAppend(url, "filterEliminadas="+Ext.encode(filterEliminadas));
         url = Ext.String.urlAppend(url, "fechaDesde="+mesAnterior);
         url = Ext.String.urlAppend(url, "fechaHasta="+now);
         url = Ext.String.urlAppend(url, "filterAlta="+Ext.encode(filterAlta));
         
         
         url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
         
         target.load({
             src: url
         }); */

        /* Carga el combo de historico */
        var historicoStore = Ext.create('Ext.data.Store', {
            model: this.getTablaHistoricoSearchModelModel(),
            autoload: false,
            sorters: [{
                property: 'c_periodo',
                direction: 'DESC'
            }],
            pageSize: 10000
        });
        var comboHistorico = view.down('#combohistorico');
        comboHistorico.bindStore(historicoStore);
        historicoStore.load();

        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());

        target.load({
            src: url
        });
    },

    onSearchClick: function (button, event, options) {
        var view = button.up('reporteestadocuentamstatusview');

        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();

        var HoraDesde = view.down('#horadesde').getValue();
        var HoraHasta = view.down('#horahasta').getValue();
        var checks = view.down('#estados').getValue();
        var dealer = view.down('#dealer').getValue();
        var tablahist = view.down('#combohistorico').getValue();

        var filters = [];

        /*if(fechadesde) {
            filters.push({
             property:'rec_tfechahora:GTE',
             value:Ext.Date.format(new Date(fechadesde),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraDesde),'H:i:s')
            })
             //url = Ext.String.urlAppend(url,"rec_tfechahoraDesde="+Ext.Date.format(new Date(fechadesde),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraDesde),'H:i:s'));
         }
         
         if(fechahasta) {
             filters.push({
             property:'rec_tfechahora:LTE',
             value:Ext.Date.format(new Date(fechahasta),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraHasta),'H:i:s')
            })
            // url = Ext.String.urlAppend(url,"rec_tfechahoraHasta="+Ext.Date.format(new Date(fechahasta),'Y-m-d')+" "+ Ext.Date.format(new Date(HoraHasta),'H:i:s'));
         }*/


        var filterCambioEstado = [];
        var filterEliminadas = [];
        var filterAlta = [];
        var filterResumen = [];
        var fechaDesde = '';
        var fechaHasta = '';

        if (fechadesde) {

            filterCambioEstado.push({
                property: 'rec_tfechahora:GTEDATESTRING',
                value: Ext.Date.format(fechadesde, 'Y/m/d') + " " + Ext.Date.format(HoraDesde, 'H:i:s')
            });



            fechaDesde = Ext.Date.format(fechadesde, 'Y/m/d') + " " + Ext.Date.format(HoraDesde, 'H:i:s');

        }

        if (fechahasta) {

            filterCambioEstado.push({
                property: 'rec_tfechahora:LTEDATESTRING',
                value: Ext.Date.format(fechahasta, 'Y/m/d') + " " + Ext.Date.format(HoraHasta, 'H:i:s')
            });

            fechaHasta = Ext.Date.format(fechahasta, 'Y/m/d') + " " + Ext.Date.format(HoraHasta, 'H:i:s');
        }

        if (dealer) {
            // url = Ext.String.urlAppend(url,"dealer="+dealer);
            filterCambioEstado.push({
                property: 'cue_clinea:IN',
                value: dealer
            })

            // 29/05 - Agrwgado dado que no filtraba el DEALER puesto en los filtros.
            filterAlta.push({
                property: 'c.cue_clinea',
                value: dealer
            })
            filterEliminadas.push({
                property: 'c.cue_clinea',
                value: dealer
            })
            filterResumen.push({
                property: 'c.cue_clinea',
                value: dealer
            })

        }

        if (checks.estados) {
            if (fechadesde == "") {
                notify("Debe seleccionar una fecha para poder filtrar.")
                return false;
            }

            if (Ext.isArray(checks.estados)) {

                var estadosLimpio = []
                Ext.Array.each(checks.estados, function (v, k) {
                    if (v == 'ALTA') {

                        filterAlta.push({
                            property: 'cue_dfechaalta:GT',
                            value: Ext.Date.format(new Date(fechadesde), 'Y/m/d') + " " + Ext.Date.format(new Date(HoraDesde), 'H:i:s')
                        })
                        filterAlta.push({
                            property: 'cue_dfechaalta:GL',
                            value: Ext.Date.format(new Date(fechahasta), 'Y/m/d') + " " + Ext.Date.format(new Date(HoraHasta), 'H:i:s')
                        })
                    } else if (v == 'ELIMINADA') {


                        filterEliminadas.push({
                            property: 'aud_tFechaHora:LTEDATESTRING',
                            value: Ext.Date.format(fechahasta, 'Y/m/d') + " " + Ext.Date.format(HoraHasta, 'H:i:s')
                        })

                        filterEliminadas.push({
                            property: 'aud_tFechaHora:GTEDATESTRING',
                            value: Ext.Date.format(fechadesde, 'Y/m/d') + " " + Ext.Date.format(HoraDesde, 'H:i:s')
                        })


                    } else {
                        estadosLimpio.push(v)
                    }
                })

                if (estadosLimpio.length > 0) {
                    filterCambioEstado.push({
                        property: 'rec_calarma:IN',
                        value: estadosLimpio.join(',')
                    })
                } else {
                    filterCambioEstado = [];
                }
            } else {

                if (checks.estados == 'ALTA') {
                    filterAlta.push({
                        property: 'cue_dfechaalta:GT',
                        value: Ext.Date.format(new Date(fechadesde), 'Y/m/d') + " " + Ext.Date.format(new Date(HoraDesde), 'H:i:s')
                    })
                    filterAlta.push({
                        property: 'cue_dfechaalta:GL',
                        value: Ext.Date.format(new Date(fechahasta), 'Y/m/d') + " " + Ext.Date.format(new Date(HoraHasta), 'H:i:s')
                    })
                    filterCambioEstado = []
                } else if (checks.estados == 'ELIMINADA') {

                    filterEliminadas.push({
                        property: 'aud_tFechaHora:LTEDATESTRING',
                        value: Ext.Date.format(fechahasta, 'Y/m/d') + " " + Ext.Date.format(HoraHasta, 'H:i:s')
                    })

                    filterEliminadas.push({
                        property: 'aud_tFechaHora:GTEDATESTRING',
                        value: Ext.Date.format(fechadesde, 'Y/m/d') + " " + Ext.Date.format(HoraDesde, 'H:i:s')
                    })

                    filterCambioEstado = []
                    filterAlta = []
                } else if (checks.estados != 'ELIMINADA' && checks.estados != 'ALTA') {
                    filterCambioEstado.push({
                        property: 'rec_calarma:IN',
                        value: checks.estados
                    })
                } else {
                    filterCambioEstado = [];
                    filterAlta = [];
                }

            }
            // url = Ext.String.urlAppend(url,"estados="+checks.estados.join(',')

        }



        var target = view.down('#Iframe');
        var url = view.baseurl;
        if (filterCambioEstado.length > 0) {
            url = Ext.String.urlAppend(view.baseurl, 'filterCambioEstado=' + Ext.encode(filterCambioEstado));
        }
        if (tablahist) {
            url = Ext.String.urlAppend(url, 'table=' + tablahist);
        }
        if (filterEliminadas.length > 0) {
            url = Ext.String.urlAppend(url, 'filterEliminadas=' + Ext.encode(filterEliminadas));
        }
        url = Ext.String.urlAppend(url, "fechaDesde=" + fechaDesde);
        url = Ext.String.urlAppend(url, "fechaHasta=" + fechaHasta);
        if (filterAlta.length > 0) {
            url = Ext.String.urlAppend(url, "filterAlta=" + Ext.encode(filterAlta));
        }
        if (filterResumen.length > 0) {
            url = Ext.String.urlAppend(url, "filterResumen=" + Ext.encode(filterResumen));
        }

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        target.load({
            src: url
        });



    },
    onTodosClick: function (button) {
        var view = button.up('reporteestadocuentamstatusview');

        var tst1 = view.down('#tst1').setValue(true);
        var tst2 = view.down('#tst2').setValue(true);

        var filters = [];
        filters.push({
            property: 'sta_ncuentaenfallodetst',
            value: 1
        });
        filters.push({
            property: 'sta_ncuentaenfallo2dotst',
            value: 1
        });

        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        target.load({
            src: url + '?Filter=' + Ext.encode(view.filters)
        });

    },
    onBtnprintClick: function (button) {
        var view = button.up('reporteestadocuentamstatusview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            printHTMLContent(body);
            /*
            contenido = body.replace('body', 'body onload="window.print(); window.onafterprint = function() { window.close(); }"')
                let myWindow = window.open('', '', 'width=600,height=400');
                if (myWindow) {
                    let doc = myWindow.document;
                    doc.open();
                    doc.write(contenido);
                    doc.close();
                } else {
                    console.error('No se pudo abrir la ventana.');
                }
                */
        });
    },
    onComboHistoricoSelect: function (combo, records, options) {
        var view = combo.up('reporteestadocuentamstatusview');

        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');

        if (value != view.dateSelected) {
            fechadesde.setValue('');
            fechahasta.setValue('');

            // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
            view.down('#fechadesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            view.down('#fechahasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
        }

        if (value) {
            var fechahistorico = value.match(/\d{4}/g) + "-" + value.match(/\d{2}$/g);
            var month = value.match(/\d{2}$/g) - 1;


            var fechahistoricodesde = Ext.Date.getFirstDateOfMonth(new Date(value.match(/\d{4}/g), month));
            var fechahistoricohasta = Ext.Date.getLastDateOfMonth(new Date(value.match(/\d{4}/g), month));

            /*
            fechadesde.setValue(fechahistoricodesde);
            fechahasta.setValue(fechahistoricohasta);
            */

            fechadesde.setMinValue(fechahistoricodesde);
            fechadesde.setMaxValue(fechahistoricohasta);
            fechahasta.setMinValue(fechahistoricodesde);
            fechahasta.setMaxValue(fechahistoricohasta);


            if (fechadesde.getValue() || fechahasta.getValue()) {

                if (fechadesde.getValue() && new Date(fechadesde.getValue()).getTime() < fechahistoricodesde) {
                    fechadesde.markInvalid("Se encuentra fuera de rango");
                }

                if (fechahasta.getValue() && new Date(fechahasta.getValue()).getTime() > fechahistoricohasta) {
                    fechahasta.markInvalid("Se encuentra fuera de rango");
                }

            } else {
                fechadesde.setValue(fechahistoricodesde);
                fechahasta.setValue(fechahistoricohasta);
            }
        }
        view.dateSelected = value;
    },
    onCleanDates: function (combo, records, options) {
        var controller = this;
        var view = combo.up('reporteestadocuentamstatusview');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');

        if (!value) {
            fechadesde.setValue('');
            fechahasta.setValue('');

            // Seteo el Min y Max a ambos combo.
            fechadesde.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechadesde.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            fechahasta.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));

            // Seteo la fecha en los combo del primer dia del mes y el de hoy
            fechadesde.setValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setValue(new Date());

        }

    },




});