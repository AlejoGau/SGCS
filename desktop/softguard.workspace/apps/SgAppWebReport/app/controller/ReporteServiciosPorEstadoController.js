Ext.define("SgAppWebReport.controller.ReporteServiciosPorEstadoController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["InstaladoresByTokenSearchModel"],
  views: ["ReporteServiciosPorEstadoView"],

  init: function (config) {
    // genero los eventos
    this.control({
      reporteservicioporestadoview: {
        afterrender: this.initView,
        cuentachanged: this.onCuentaChanged,
        cuentaselected: this.onCuentaChanged,
      },
      "reporteservicioporestadoview button[action=search]": {
        click: this.onSearchClick,
      },
      "reporteservicioporestadoview button[action=removeFilter]": {
        click: this.onTodosClick,
      },
      "reporteservicioporestadoview button[action=buscarporcuenta]": {
        click: this.onBuscarPorCuentaClick,
      },
      "reporteservicioporestadoview button[action=cancelado]": {
        click: this.onCanceladoClick,
      },
      "reporteservicioporestadoview button[action=pendiente]": {
        click: this.onPendienteClick,
      },
      "reporteservicioporestadoview button[action=finalizado]": {
        click: this.onFinalizadoClick,
      },
      "reporteservicioporestadoview button[action=asignado]": {
        click: this.onAsignadoClick,
      },
      "reporteservicioporestadoview button[action=enejecucion]": {
        click: this.onEnEjecucionClick,
      },
      "reporteservicioporestadoview button[action=export]": {
        click: this.onExportClick,
      },
      "reporteservicioporestadoview button[action=btnprint]": {
        click: this.onBtnprintClick,
      },
    });
  }, // cierro init

  onBtnprintClick: function (button) {
    var view = button.up("reporteservicioporestadoview");
    var target = view.down("#Iframe");
    var url = target.src;
    var contenido;
    fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (body) {
        printHTMLContent(body);
        /*
                var win = Ext.create('Ext.window.Window', {
                        title: 'Mi ventana',
                        html: "",
                        modal: true,
            });
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
                //win.printMe();
                */
      });
  },

  onSearchClick: function (button, event, options) {
    var controller = this;

    var view = button.up("reporteservicioporestadoview")
      ? button.up("reporteservicioporestadoview")
      : button;
    var url = Ext.String.urlAppend(view.baseurl, "_dc=" + new Date().getTime());

    // DSS-1447: Ordenar por fecha de alta descendente
    var sort = [{ property: "stc_dfecha_creacion", direction: "DESC" }];
    url = Ext.String.urlAppend(url, "sortorder=" + Ext.encode(sort));

    var fechadesde = view.down("#fechadesde").getValue();
    var fechahasta = view.down("#fechahasta").getValue();
    var fechadesdegeneracio = view.down("#fechadesdegeneracion").getValue();
    var fechahastageneracio = view.down("#fechahastageneracion").getValue();
    var tecnico = view.down("#tecnicos").getValue();
    var cuentaId = view.down("#idcuenta").getValue();

    // BC 372165794 : Agregado de CheckBox para Observaciones
    var observacionescheck = view.down("#observacionescheck").getValue();
    if (observacionescheck) {
      url = Ext.String.urlAppend(
        url,
        "observacionescheck=" + observacionescheck,
      );
    }

    // Comparo las fechas de los combo, el SP no interpreta el >= <= del mismo día como 00:00 y 23:59
    // Por lo tanto, procedo a que si son iguales, le sumo 1 al FechaHasta o FechaHastaGeneracio
    // https://basecamp.com/2249105/projects/14758734/todos/356859073
    if (fechadesdegeneracio != null && fechahastageneracio != null) {
      if (fechadesdegeneracio.getTime() === fechahastageneracio.getTime()) {
        fechahastageneracio = Ext.Date.add(
          new Date(fechadesdegeneracio),
          Ext.Date.DAY,
          1,
        );
      }
    }
    if (fechadesde != null && fechahasta != null) {
      if (fechadesde.getTime() === fechahasta.getTime()) {
        fechahasta = Ext.Date.add(new Date(fechahasta), Ext.Date.DAY, 1);
      }
    }

    view.filters = [];

    /* view.filters.push({
             property:'ins_cnombre:ISNOTNULLOREMPTYTRIM',
             vale:''
         })*/

    if (fechadesde) {
      url = Ext.String.urlAppend(
        url,
        "stc_dfecha_modificacionDesde=" +
          Ext.Date.format(new Date(fechadesde), "d/m/Y"),
      );
      view.filters.push({
        property: "stc_dfecha_modificacion:GTEDATESTRING",
        value: Ext.Date.format(new Date(fechadesde), "Y-m-d"),
      });
    }

    if (fechahasta) {
      url = Ext.String.urlAppend(
        url,
        "stc_dfecha_modificacionHasta=" +
          Ext.Date.format(new Date(fechahasta), "d/m/Y"),
      );
      view.filters.push({
        property: "stc_dfecha_modificacion:LTEDATESTRING",
        value: Ext.Date.format(new Date(fechahasta), "Y-m-d"),
      });
    }

    if (fechadesdegeneracio) {
      url = Ext.String.urlAppend(
        url,
        "stc_dfecha_creacionDesde=" +
          Ext.Date.format(new Date(fechadesdegeneracio), "d/m/Y"),
      );
      view.filters.push({
        property: "stc_dfecha_creacion:GTEDATESTRING",
        value: Ext.Date.format(new Date(fechadesdegeneracio), "Y-m-d"),
      });
    }

    if (fechahastageneracio) {
      var hasta = new Date(fechahastageneracio);
      hasta.setHours(23, 59, 59, 999); // <= EXTREMADAMENTE IMPORTANTE

      url = Ext.String.urlAppend(
        url,
        "stc_dfecha_creacionHasta=" + Ext.Date.format(hasta, "d/m/Y"),
      );

      view.filters.push({
        property: "stc_dfecha_creacion:LTEDATESTRING",
        value: Ext.Date.format(hasta, "Y-m-d H:i:s"),
      });
    }

    if (tecnico) {
      url = Ext.String.urlAppend(
        url,
        "ins_cnombre=" + view.down("#tecnicos").getRawValue(),
      );
      view.filters.push({
        property: "t1.ins_idKey",
        value: tecnico,
      });
    }

    if (cuentaId) {
      url = Ext.String.urlAppend(
        url,
        "nombrecuenta=" + view.down("#nombrecuenta").getValue(),
      );
      view.filters.push({
        property: "stc_iid_cuenta",
        value: cuentaId,
        id: "cuenta",
      });
    }

    view.filters.push({
      property: "stc_nestado:inint",
      value: controller.activarFiltroEstados(view),
    });

    var target = view.down("#Iframe");

    //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

    if (view.filters.length > 0) {
      url = Ext.String.urlAppend(url, "filter=" + Ext.encode(view.filters));
    }
    target.load({
      src: url,
    });
    console.log("VIEW FILTER SEARCH - - - ", view.filters);
    console.log("URL SEARCH - - - - -", url);
  },

  initView: function (view) {
    view.store = Ext.create("Ext.data.Store", {
      model: this.getInstaladoresByTokenSearchModelModel(),
      pageSize: 1000,
      remoteSort: true,
      remoteFilter: true,
    });
    view.down("#tecnicos").bindStore(view.store);

    view.store.load();

    view.baseurl = "/handler/ReporteServiciosPorEstadoHTML";
    var target = view.down("#Iframe");
    //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

    if (view.filters) {
      var filters = view.filters;
    } else {
      var filters = [
        {
          property: "stc_nestado",
          value: 1,
        },
      ];

      view.down("#pendiente").toggle(true);
    }

    var url = Ext.String.urlAppend(view.baseurl, "_dc=" + new Date().getTime());
    url = Ext.String.urlAppend(url, "Filter=" + Ext.encode(filters));

    // DSS-1447: Ordenar por fecha de alta descendente
    var sort = [{ property: "stc_dfecha_creacion", direction: "DESC" }];
    url = Ext.String.urlAppend(url, "sortorder=" + Ext.encode(sort));

    // BC 372165794 : Agregado de CheckBox para Observaciones
    // DSS-1451: Fix - se enviaba el componente en lugar del valor booleano
    view.down("#observacionescheck").setValue(true);
    var observacionescheck = view.down("#observacionescheck").getValue();
    if (observacionescheck) {
      url = Ext.String.urlAppend(
        url,
        "observacionescheck=" + observacionescheck,
      );
    }

    target.load({
      src: url,
    });
    console.log("URL view report por estado - - --  ", url);
    console.log(view.filters);

    if (view.filters) {
      if (view.filters[0].property == "stc_nestado:inint") {
        view.filtrosActivos = [];
        Ext.Array.each(view.filters[0].value.split(","), function (idestado) {
          view.filtrosActivos[idestado] = true;
        });
      } else {
        view.filtrosActivos = [];
        view.filtrosActivos[1] = false;
        view.filtrosActivos[2] = false;
        view.filtrosActivos[3] = false;
        view.filtrosActivos[4] = false;
        view.filtrosActivos[5] = false;
      }
    } else {
      view.filtrosActivos = [];
      view.filtrosActivos[1] = true;
      view.filtrosActivos[2] = false;
      view.filtrosActivos[3] = false;
      view.filtrosActivos[4] = false;
      view.filtrosActivos[5] = false;
    }

    this.activarFiltroEstados(view);
  },

  onTodosClick: function (button) {
    var controller = this;
    var view = button.up("reporteservicioporestadoview");

    view.down("#pendiente").toggle(false);
    view.down("#finalizado").toggle(false);
    view.down("#cancelado").toggle(false);
    view.down("#asignado").toggle(false);
    view.down("#enejecucion").toggle(false);

    view.down("#idcuenta").setValue("");
    view.down("#nombrecuenta").setValue("");

    view.down("#fechadesdegeneracion").setValue("");
    view.down("#fechahastageneracion").setValue("");
    view.down("#fechadesde").setValue("");
    view.down("#fechahasta").setValue("");
    view.down("#tecnicos").setValue("");

    // BC 372165794 : Agregado de CheckBox para Observaciones
    // El check de Observaciones debe conservar su estado al filtrar "Todos"
    // (igual que los Estados): si está tildado, sigue mostrando observaciones;
    // si está destildado, no las muestra. Por eso NO se fuerza su valor aca.

    controller.onSearchClick(view);
  },

  onBuscarPorCuentaClick: function (button, event, options) {
    var view = button.up("reporteservicioporestadoview");

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Seleccione una Cuenta",
      closeAction: "destroy",
      itemId: "cuentaWin",
      width: 750,
      height: 550,
      border: true,
      modal: true,
      view: view,
      items: [
        {
          xtype: "cuentahelperview",
          tip_ncondicion: "0",
          caller: view,
        },
      ],
    });
    win.show();
  },

  onCuentaChanged: function (cuenta, view) {
    console.log("up windows", view.up("window"));
    console.log("up viewport", view.up("viewport"));
    console.log("up solo", view.up());
    var gridview = view.up().down("reporteservicioporestadoview");

    gridview.down("#idcuenta").setValue(cuenta.get("Id"));
    gridview
      .down("#nombrecuenta")
      .setValue(
        cuenta.get("cue_clinea") +
          "-" +
          cuenta.get("cue_ncuenta") +
          " " +
          cuenta.get("Name"),
      );
    gridview.down("#sacarcuenta").show();
  },

  onCanceladoClick: function (button, event, options) {
    var view = button.up("reporteservicioporestadoview");
    var controller = this;

    if (!view.filtrosActivos[3]) {
      view.filtrosActivos[3] = true;
    } else {
      view.filtrosActivos[3] = false;
    }
  },

  onPendienteClick: function (button, event, options) {
    var view = button.up("reporteservicioporestadoview");
    var controller = this;

    if (!view.filtrosActivos[1]) {
      view.filtrosActivos[1] = true;
    } else {
      view.filtrosActivos[1] = false;
    }
  },

  onFinalizadoClick: function (button, event, options) {
    var view = button.up("reporteservicioporestadoview");
    var controller = this;

    if (!view.filtrosActivos[4]) {
      view.filtrosActivos[4] = true;
    } else {
      view.filtrosActivos[4] = false;
    }
  },

  onEnEjecucionClick: function (button, event, options) {
    var view = button.up("reporteservicioporestadoview");
    var controller = this;

    if (!view.filtrosActivos[5]) {
      view.filtrosActivos[5] = true;
    } else {
      view.filtrosActivos[5] = false;
    }
  },

  onAsignadoClick: function (button, event, options) {
    var view = button.up("reporteservicioporestadoview");
    var controller = this;

    if (!view.filtrosActivos[2]) {
      view.filtrosActivos[2] = true;
    } else {
      view.filtrosActivos[2] = false;
    }
  },

  activarFiltroEstados: function (view) {
    view.down("#pendiente").toggle(false);
    view.down("#asignado").toggle(false);
    view.down("#enejecucion").toggle(false);
    view.down("#finalizado").toggle(false);
    view.down("#cancelado").toggle(false);

    var idsFiltros = [];

    if (view.filtrosActivos[1]) {
      idsFiltros.push(1);
      view.down("#pendiente").toggle(true);
    }

    if (view.filtrosActivos[2]) {
      idsFiltros.push(2);
      view.down("#asignado").toggle(true);
    }

    if (view.filtrosActivos[3]) {
      idsFiltros.push(3);
      view.down("#cancelado").toggle(true);
    }

    if (view.filtrosActivos[4]) {
      idsFiltros.push(4);
      view.down("#finalizado").toggle(true);
    }

    if (view.filtrosActivos[5]) {
      idsFiltros.push(5);
      view.down("#enejecucion").toggle(true);
    }

    return idsFiltros.join(",");
  },

  /* Evento para la exportación */
  onExportClick: function (button, e, eOpts) {
    var controller = this;
    var view = button.up("reporteservicioporestadoview");

    var url = Ext.String.urlAppend(view.baseurl, "_dc=" + new Date().getTime());

    // DSS-1447: Ordenar por fecha de alta descendente
    var sort = [{ property: "stc_dfecha_creacion", direction: "DESC" }];
    url = Ext.String.urlAppend(url, "sortorder=" + Ext.encode(sort));

    var fechadesde = view.down("#fechadesde").getValue();
    var fechahasta = view.down("#fechahasta").getValue();
    var fechadesdegeneracio = view.down("#fechadesdegeneracion").getValue();
    var fechahastageneracio = view.down("#fechahastageneracion").getValue();
    var tecnico = view.down("#tecnicos").getValue();
    var cuentaId = view.down("#idcuenta").getValue();

    // BC 372165794 : Agregado de CheckBox para Observaciones
    var observacionescheck = view.down("#observacionescheck").getValue();
    if (observacionescheck) {
      url = Ext.String.urlAppend(
        url,
        "observacionescheck=" + observacionescheck,
      );
    }

    // Comparo las fechas de los combo, el SP no interpreta el >= <= del mismo día como 00:00 y 23:59
    // Por lo tanto, procedo a que si son iguales, le sumo 1 al FechaHasta o FechaHastaGeneracio
    // https://basecamp.com/2249105/projects/14758734/todos/356859073
    if (fechadesdegeneracio != null && fechahastageneracio != null) {
      if (fechadesdegeneracio.getTime() === fechahastageneracio.getTime()) {
        fechahastageneracio = Ext.Date.add(
          new Date(fechadesdegeneracio),
          Ext.Date.DAY,
          1,
        );
      }
    }
    if (fechadesde != null && fechahasta != null) {
      if (fechadesde.getTime() === fechahasta.getTime()) {
        fechahasta = Ext.Date.add(new Date(fechahasta), Ext.Date.DAY, 1);
      }
    }

    view.filters = [];

    if (fechadesde) {
      url = Ext.String.urlAppend(
        url,
        "stc_dfecha_modificacionDesde=" +
          Ext.Date.format(new Date(fechadesde), "d/m/Y"),
      );
      view.filters.push({
        property: "stc_dfecha_modificacion:GTEDATESTRING",
        value: Ext.Date.format(new Date(fechadesde), "Y-m-d"),
      });
    }

    if (fechahasta) {
      url = Ext.String.urlAppend(
        url,
        "stc_dfecha_modificacionHasta=" +
          Ext.Date.format(new Date(fechahasta), "d/m/Y"),
      );
      view.filters.push({
        property: "stc_dfecha_modificacion:LTEDATESTRING",
        value: Ext.Date.format(new Date(fechahasta), "Y-m-d"),
      });
    }

    if (fechadesdegeneracio) {
      url = Ext.String.urlAppend(
        url,
        "stc_dfecha_creacionDesde=" +
          Ext.Date.format(new Date(fechadesdegeneracio), "d/m/Y"),
      );
      view.filters.push({
        property: "stc_dfecha_creacion:GTEDATESTRING",
        value: Ext.Date.format(new Date(fechadesdegeneracio), "Y-m-d"),
      });
    }
    if (fechahastageneracio) {
      var hasta = new Date(fechahastageneracio);
      hasta.setHours(23, 59, 59, 999);

      url = Ext.String.urlAppend(
        url,
        "stc_dfecha_creacionHasta=" + Ext.Date.format(hasta, "d/m/Y"),
      );
      view.filters.push({
        property: "stc_dfecha_creacion:LTEDATESTRING",
        value: Ext.Date.format(hasta, "Y-m-d H:i:s"),
      });
    }

    if (tecnico) {
      url = Ext.String.urlAppend(
        url,
        "ins_cnombre=" + view.down("#tecnicos").getRawValue(),
      );
      view.filters.push({
        property: "t1.ins_idKey",
        value: tecnico,
      });
    }

    if (cuentaId) {
      url = Ext.String.urlAppend(
        url,
        "nombrecuenta=" + view.down("#nombrecuenta").getValue(),
      );
      view.filters.push({
        property: "stc_iid_cuenta",
        value: cuentaId,
        id: "cuenta",
      });
    }

    view.filters.push({
      property: "stc_nestado:inint",
      value: controller.activarFiltroEstados(view),
    });

    if (view.filters.length > 0) {
      url = Ext.String.urlAppend(url, "filter=" + Ext.encode(view.filters));
    }

    /* Agrego flag de Export */
    var exportToExcel = "yes";
    if (exportToExcel) {
      url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
    }

    location.href = url;
  },
});
