Ext.define("Common.controller.ContratoGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "crm_contratoSearchModel",
    "crm_contratoModel",
    "TablasFormaDePagoSearchModel",
    "t_organizacion_fcSearchModel",
    "m_clientes_fcModel",
    "m_clientes_fcSearchModel",
    "t_condiciones_pago_fcSearchModel",
    "OrganizationModel",
  ],
  views: ["ContratoGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      contratogridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        objectchange: this.onObjectChange,
        generarnovedad: this.onGenerarNovedad,
      },
      "contratogridview button[action=search]": {
        click: this.onSearchClick,
      },
      "contratogridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      'contratogridview button[action="new"]': {
        click: this.onNewOrderClick,
      },
      "contratogridview button[action=groupStatus]": {
        click: this.onGroupStatusClick,
      },
      'contratogridview button[action="template"]': {
        click: this.onTemplateClick,
      },
      'contratogridview button[action="contratosVencer"]': {
        click: this.onContratosVencer,
      },
      'contratogridview button[action="contratosVencidos"]': {
        click: this.oncontratosVencidos,
      },
    });
  },
  oncontratosVencidos: function (button, event, options) {
    var view = button.up("contratogridview");
    var store = view.getStore();
    var filters = Ext.Array.clone(view.filters);

    filters.push({
      property: "cnt_fechavto:LT",
      value: new Date(),
      id: "fechavencimientohasta",
    });

    store.clearFilter(true);
    store.filter(filters);
  },
  onContratosVencer: function (button, event, options) {
    var view = button.up("contratogridview");
    var store = view.getStore();
    var filters = Ext.Array.clone(view.filters);

    filters.push({
      property: "cnt_fechavto:GT",
      value: new Date(),
      id: "fechavencimientodesde",
    });
    filters.push({
      property: "cnt_fechavto:LT",
      value: Ext.Date.add(new Date(), Ext.Date.DAY, 30),
      id: "fechavencimientohasta",
    });

    store.clearFilter(true);
    store.filter(filters);
  },
  onGenerarNovedad: function (record, view) {
    Ext.Ajax.request({
      url: "/Rest/search/MG_ContratoANovedad",
      method: "GET",
      params: {
        IdContrato: record.get("Id"),
      },
      success: function (resp, operation) {
        if (resp.responseText) {
          var metadata = Ext.decode(resp.responseText);
          notify("Se genero la novedad del contrato");
        }
      },
    });
  },

  onObjectChange: function (view) {
    view.getStore().load();
  },

  normalizeContextValue: function (value) {
    if (value === undefined || value === null) {
      return "";
    }

    var normalized = String(value).replace(/^[\s\u00a0]+|[\s\u00a0]+$/g, "");
    if (normalized === "" || normalized === "0") {
      return "";
    }

    return normalized;
  },

  resolveClienteIdFromRecord: function (record) {
    if (!record || !record.get) {
      return "";
    }

    return (
      this.normalizeContextValue(record.get("Account")) ||
      this.normalizeContextValue(record.get("cli_icodigo_ID")) ||
      this.normalizeContextValue(record.get("cnt_idcliente"))
    );
  },

  resolveBillingOrganizationIdFromRecord: function (record) {
    if (!record || !record.get) {
      return "";
    }

    return (
      this.normalizeContextValue(record.get("cli_iOrganizacion")) ||
      this.normalizeContextValue(record.get("cli_iorganizacion")) ||
      this.normalizeContextValue(record.get("cnt_org_fc"))
    );
  },

  initView: function (view) {
    this.setupViewButtons(view);

    view.groupingFeature = view.getView().getFeature("grouping");

    if (!this.validateAndSetupRecord(view)) {
      return false;
    }

    this.createMainStore(view);
    this.createFormaPagoStore(view);
    this.createOrganizacionesStore(view);
  },

  setupViewButtons: function (view) {
    if (view.hidebuttons) {
      Ext.Array.each(view.hidebuttons, function (button) {
        view.down(button).hide();
      });
    }

    // Ocultar botón "Nuevo contrato" solo en la lista general (sin record de organización)
    // Mantenerlo visible cuando estamos dentro de la información de un cliente
    if (!view.record) {
      var newButton = view.down("#new");
      if (newButton) {
        newButton.hide();
      }
    }

    if (view.showProximosVencimientoDias) {
      view.down("#proximovencimientosdias").show();
      view.down("#proximovencimientosdias").setValue(30);
    }
  },

  validateAndSetupRecord: function (view) {
    var record = view.record;
    var controller = this;
    var clienteId = this.resolveClienteIdFromRecord(record);
    console.log("validateAndSetupRecord - record:", record);
    console.log("validateAndSetupRecord - Account:", record ? record.get("Account") : "no record");
    if (record) {
      if (!clienteId) {
        console.log("validateAndSetupRecord - Mostrando confirm de configuración");
        Ext.MessageBox.confirm(
          "Falta configurar",
          "Necesita configurar la información de facturación.\n\n¿Desea configurarla ahora?",
          function (btn) {
            if (btn === "yes") {
              controller.openInformacionContableWindow(view, record);
            } else {
              view.up("tabpanel").remove(view);
            }
          }
        );
        return false;
      }

      view.filters = [
        {
          property: "cnt_idcliente",
          value: clienteId,
        },
      ];

      var col = view.down("[dataIndex=idOrganizacion]");
      if (col) {
        col.setVisible(false);
      }
    }

    if (!view.filters) view.filters = [];
    if (!view.sorters) view.sorters = [];

    return true;
  },

  /**
   * Abre la ventana de información contable para configurar los datos de facturación
   * @param {Ext.Component} view - La vista que llamó a esta función
   * @param {Ext.data.Model} record - El registro de la organización (de búsqueda)
   */
  openInformacionContableWindow: function (view, record) {
    var controller = this;

    // Primero cargar el modelo completo de organización para poder guardarlo después
    var orgModel = controller.getOrganizationModelModel();
    orgModel.load(record.get("Id"), {
      callback: function (organizationRecord, operation, success) {
        if (!success) {
          Ext.MessageBox.alert(
            "Error",
            "No se pudo cargar la información de la organización.",
            function () {
              view.up("tabpanel").remove(view);
            }
          );
          return;
        }

        // Cargar condiciones de pago
        var CondicionPagoStore = Ext.create("Ext.data.Store", {
          model: controller.getT_condiciones_pago_fcSearchModelModel(),
          pageSize: 50,
          remoteSort: true,
          remoteFilter: true,
        });

        CondicionPagoStore.load({
          callback: function (recordsCondicionPago) {
            if (recordsCondicionPago.length <= 0) {
              Ext.MessageBox.alert(
                "Falta configuración",
                "Es necesario tener creadas las condiciones de pago. Ingrese a AdministratorSearch para crearlas.",
                function () {
                  view.up("tabpanel").remove(view);
                }
              );
              return false;
            }

            // Buscar si ya existe un cliente asociado a esta organización
            var storeCliente = Ext.create("Ext.data.Store", {
              model: controller.getM_clientes_fcSearchModelModel(),
              remoteFilter: true,
              filters: [
                {
                  property: "cli_icodigo_ID",
                  value: organizationRecord.get("Account") || 0,
                },
              ],
            });

            storeCliente.load({
              callback: function (records) {
                if (records.length <= 0 || !organizationRecord.get("Account")) {
                  // No existe cliente, crear uno nuevo
                  var recordCliente = controller
                    .getM_clientes_fcModelModel()
                    .create({
                      Id: 0,
                      cli_cnombre: organizationRecord.get("Name"),
                      cli_cidentificacion: null,
                      cli_ccategoriaimpositiva: null,
                      cli_ivendedor: null,
                      cli_icobrador: null,
                      cli_czona: null,
                      cli_ccallefiscal: organizationRecord.get("Address"),
                      cli_clocalidadfiscal: organizationRecord.get("City"),
                      cli_cprovinciafiscal: organizationRecord.get("State"),
                      cli_ccodigopostalfiscal: organizationRecord.get("Zip"),
                      cli_ccallecobranza: "",
                      cli_clocalidadcobranza: organizationRecord.get("City"),
                      cli_cprovinciacobranza: organizationRecord.get("State"),
                      cli_ccodigopostalcobranza: organizationRecord.get("Zip"),
                      cli_nlunes: 0,
                      cli_nmartes: 0,
                      cli_nmiercoles: 0,
                      cli_njueves: 0,
                      cli_nviernes: 0,
                      cli_nsabado: 0,
                      cli_ndomingo: 0,
                      cli_chora: "",
                      cli_cservicio: null,
                      cli_cformatoimpresion: null,
                      cli_ccondicionpago:
                        recordsCondicionPago[0].get("con_ccodigo"),
                      cli_ctelefono: organizationRecord.get("Phone"),
                      cli_ccontacto: "",
                      cli_cobservacion: null,
                      cli_nsituacion: 1,
                      cli_inumero: 0,
                      cli_nDocCAE: 0,
                      cli_cdatosextra: null,
                      cli_dproximafactura: new Date(),
                    });

                  controller.showClienteFormWindow(
                    view,
                    organizationRecord,
                    recordCliente,
                    getLocale("Información contable")
                  );
                } else {
                  // Ya existe cliente, cargar sus datos
                  var clienteModel = controller.getM_clientes_fcModelModel();
                  clienteModel.load(records[0].get("Id"), {
                    callback: function (loadedRecord) {
                      controller.showClienteFormWindow(
                        view,
                        organizationRecord,
                        loadedRecord,
                        getLocale("Cliente")
                      );
                    },
                  });
                }
              },
            });
          },
        });
      },
    });
  },

  /**
   * Muestra la ventana del formulario de cliente/información contable
   * @param {Ext.Component} view - La vista que llamó a esta función
   * @param {Ext.data.Model} recordOrganizacion - El registro de la organización
   * @param {Ext.data.Model} recordCliente - El registro del cliente
   * @param {String} title - Título de la ventana
   */
  showClienteFormWindow: function (
    view,
    recordOrganizacion,
    recordCliente,
    title
  ) {
    var controller = this;
    var win = Ext.create("Ext.Window", {
      title: title,
      closeAction: "hide",
      width: 800,
      height: 500,
      layout: "fit",
      border: true,
      modal: true,
      items: [
        {
          xtype: "clienteformview",
          recordCliente: recordCliente,
          recordOrganizacion: recordOrganizacion,
          caller: view,
        },
      ],
      listeners: {
        hide: function () {
          // Al cerrar/ocultar la ventana, verificar si se guardó la configuración
          if (recordOrganizacion.get("Account")) {
            var clienteId =
              controller.resolveClienteIdFromRecord(recordOrganizacion) ||
              controller.normalizeContextValue(recordCliente.get("Id"));
            var billingOrganizationId =
              controller.resolveBillingOrganizationIdFromRecord(recordCliente) ||
              controller.resolveBillingOrganizationIdFromRecord(view.record) ||
              controller.resolveBillingOrganizationIdFromRecord(recordOrganizacion);

            if (clienteId) {
              recordOrganizacion.set("cli_icodigo_ID", clienteId);
            }

            if (billingOrganizationId) {
              recordOrganizacion.set("cli_iOrganizacion", billingOrganizationId);
              recordOrganizacion.set("cli_iorganizacion", billingOrganizationId);
            }

            // Actualizar también el record de búsqueda original para que se reflejen los cambios
            if (view.record) {
              view.record.set("Account", recordOrganizacion.get("Account"));
              view.record.set("Status", recordOrganizacion.get("Status"));
              view.record.set("StatusName", recordOrganizacion.get("StatusName"));

              if (clienteId) {
                view.record.set("cli_icodigo_ID", clienteId);
              }

              if (billingOrganizationId) {
                view.record.set("cli_iOrganizacion", billingOrganizationId);
                view.record.set("cli_iorganizacion", billingOrganizationId);
              }
            }
            // Si se configuró, recargar la vista con todos los stores
            view.filters = [
              {
                property: "cnt_idcliente",
                value: clienteId || recordOrganizacion.get("Account"),
              },
            ];
            controller.createMainStore(view);
            controller.createFormaPagoStore(view);
            controller.createOrganizacionesStore(view);
          } else {
            // Si no se configuró, cerrar la pestaña
            view.up("tabpanel").remove(view);
          }
          // Destruir la ventana
          win.destroy();
        },
      },
    }).show();
  },

  createMainStore: function (view) {
    var store = Ext.create("Ext.data.Store", {
      model: this.getCrm_contratoSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
      remoteGroup: true, // Habilitar group remoto para enviar parámetro al servidor
      // Sin groupField por defecto - inicia sin agrupar
      sorters: [{ property: "cnt_fechaalta", direction: "DESC" }],
      pageSize: 50,
      filters: view.filters,
      autoload: false,
    });

    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);
    // Reconfigure garantiza que la feature de grouping se ate al nuevo store
    view.reconfigure(store);

    store.sorters.clear();
    store.sort([{ property: "cnt_fechaalta", direction: "DESC" }]);

    // Si hay agrupado activo, refrescar la vista al cargar datos para pintar encabezados
    store.on("load", function () {
      if (store.isGrouped && store.isGrouped()) {
        view.getView().refresh();
      }
    });

    store.on("groupchange", function () {
      view.getView().refresh();
    });

    // No agrupamos por defecto - groupingFeature ya inicia deshabilitado
    store.load();
  },

  createFormaPagoStore: function (view) {
    var store = Ext.create("Ext.data.Store", {
      model: this.getTablasFormaDePagoSearchModelModel(),
      remoteFilter: true,
      autoload: false,
    });

    var formadepago = view.down("#formadepago");
    formadepago.bindStore(store);
    store.load();
  },

  createOrganizacionesStore: function (view) {
    var store = Ext.create("Ext.data.Store", {
      model: this.getT_organizacion_fcSearchModelModel(),
      remoteFilter: true,
      autoload: false,
    });

    var organizaciones = view.down("#organizaciones");
    organizaciones.bindStore(store);
  },

  onGetAllClick: function (button, event, options) {
    var view = button.up("contratogridview");
    var store = view.getStore();
    store.clearFilter(true);

    view.down("#datedesde").setValue("");
    view.down("#datehasta").setValue("");
    view.down("#datevencimientodesde").setValue("");
    view.down("#datevencimientohasta").setValue("");
    view.down("#estado").setValue("");
    view.down("#cliente").setValue("");
    view.down("#organizaciones").setValue("");
    view.down("#formadepago").setValue("");
    var buttons = view.query('button[toggleGroup="filter-contratos"]');

    Ext.Array.each(buttons, function (btn) {
      btn.toggle(false, true);
    });
    store.filter(view.filters);
    store.load();
  },

  onTemplateClick: function (button, event, options) {
    var panel = button.up("tabpanel");
    var view = button.up("contratogridview");
    var title = getLocale("Templates contrato");
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');

    if (!mytab) {
      var newTab = Ext.widget("contratotemplategridview", {
        translate: false,
        targetTab: newTab,
        title: title,
        closable: true,
        layout: "fit",
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },

  onRefresh: function (view) {
    store = view.getStore();
    store.load();
  },

  onNewOrderClick: function (button, event, options) {
    var panel = button.up("tabpanel");
    var view = button.up("contratogridview");

    var model = this.getCrm_contratoModelModel();

    var record = Ext.create(model, {
      cnt_fechaalta: new Date(),
    });
    // ExtJS treats Id:0 as a valid ID, so force phantom for correct POST behavior
    record.phantom = true;
    record.crudState = 'C';

    var title = getLocale("Nuevo Contrato");
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    var clienteId = "";
    var facturadoraId = "";

    if (view.record) {
      clienteId = this.resolveClienteIdFromRecord(view.record);
      facturadoraId = this.resolveBillingOrganizationIdFromRecord(view.record);

      if (clienteId) {
        record.set("cnt_idcliente", clienteId);
      }

      if (facturadoraId) {
        record.set("cnt_org_fc", facturadoraId);
      }
    }

    if (!mytab) {
      var newTab = Ext.widget("contratoformview", {
        record: record,
        translate: false,
        targetTab: newTab,
        title: title,
        record: record,
        closable: true,
        clienteId: clienteId,
        facturadoraId: facturadoraId,
        caller: view,
        organizacionId: view.record ? view.record.get("Id") : false,
        recordOrganizacion: view.record,
        onRefresh: this.onRefresh,
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("contratogridview");
    var store = view.getStore();
    var filters = this.buildSearchFilters(view);

    store.clearFilter(true);
    if (filters) store.filter(filters);
    store.load();
  },

  buildSearchFilters: function (view) {
    var filters = Ext.Array.clone(view.filters);
    var fechadesde = view.down("#datedesde").getValue();
    var fechahasta = view.down("#datehasta").getValue();
    var fechavencimientodesde = view.down("#datevencimientodesde").getValue();
    var fechavencimientohasta = view.down("#datevencimientohasta").getValue();
    var proximovencimientosdias = view
      .down("#proximovencimientosdias")
      .getValue();

    var dateFilters = [
      {
        value: fechadesde,
        property: "cnt_fechaalta:GTEDATESTRING",
        id: "fechadesde",
      },
      {
        value: fechahasta,
        property: "cnt_fechaalta:LTEDATESTRING",
        id: "fechahasta",
      },
      {
        value: fechavencimientodesde,
        property: "cnt_fechavto:GTEDATESTRING",
        id: "fechavencimientodesde",
      },
      {
        value: fechavencimientohasta,
        property: "cnt_fechavto:LTEDATESTRING",
        id: "fechavencimientohasta",
      },
    ];

    Ext.Array.each(dateFilters, function (filter) {
      if (filter.value) {
        filters.push({
          property: filter.property,
          value: Ext.Date.format(filter.value, "Y-m-d"),
          id: filter.id,
        });
      }
    });

    if (proximovencimientosdias && view.showProximosVencimientoDias) {
      filters.push({
        property: "cnt_fechavto:LT",
        value: Ext.Date.add(new Date(), Ext.Date.DAY, proximovencimientosdias),
        id: "fechavencimientohasta",
      });
    }

    var simpleFilters = [
      { itemId: "#estado", property: "cnt_estado", id: "estado" },
      { itemId: "#cliente", property: "orgs.[Name]:LIKE", id: "cliente" },
      {
        itemId: "#organizaciones",
        property: "cnt_org_fc",
        id: "organizaciones",
      },
      { itemId: "#formadepago", property: "cnt_formapago", id: "formadepago" },
    ];

    Ext.Array.each(simpleFilters, function (filterConfig) {
      var value = view.down(filterConfig.itemId).getValue();
      if (value != null && value !== "") {
        filters.push({
          property: filterConfig.property,
          value: value,
          id: filterConfig.id,
        });
      }
    });

    return filters;
  },

  onGroupStatusClick: function (button, event, options) {
    var view = button.up("contratogridview");
    var store = view.getStore();

    // Limpiar sorters y groupers previos
    store.sorters.clear();
    if (store.groupers) {
      store.groupers.clear();
    }

    if (button.pressed) {
      // Ordenar primero por el campo de agrupación
      store.sort([{ property: "cnt_estado", direction: "ASC" }]);

      // Habilitar feature y configurar agrupación
      if (view.groupingFeature) {
        view.groupingFeature.lastGroupers = null;
        view.groupingFeature.block();
        view.groupingFeature.enable();
      }

      // Aumentar pageSize para mostrar todos los grupos en una página
      store.pageSize = 999;
      store.group({ property: "cnt_estado", direction: "ASC" });

      if (view.groupingFeature) {
        view.groupingFeature.pruneGroupedHeader();
        view.groupingFeature.unblock();
      }

      // Recargar desde la página 1 para enviar GROUP al servidor
      store.loadPage(1, {
        callback: function () {
          // Forzar refresh de la vista para pintar los headers de grupo
          view.getView().refresh();
        },
      });
    } else {
      // Deshabilitar agrupación
      if (view.groupingFeature) {
        view.groupingFeature.disable();
      }
      store.clearGrouping();

      // Restaurar pageSize normal
      store.pageSize = 50;
      store.loadPage(1, {
        callback: function () {
          view.getView().refresh();
        },
      });
    }
  },

  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");
    var model = this.getCrm_contratoModelModel();
    var proxy = model.getProxy();
    var controller = this;
    model.load(id, {
      callback: function (rec, operation) {
        panel = grid.up("tabpanel");
        var title = getLocale("Contrato") + ": " + record.get("Id");
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        var view = grid; //.up( 'contratogridview' )

        if (!mytab) {
          var newTab = Ext.widget("contratoformview", {
            record: rec,
            translate: false,
            targetTab: newTab,
            title: title,
            closable: true,
            cnt_dinamico: record.get("cnt_dinamico"),
            //organizacionId: grid.record ? grid.record.get( 'Id' ) : false,
            organizacionId: record.get("idOrganizacion")
              ? record.get("idOrganizacion")
              : false,
            caller: view,
            recordOrganizacion: record,
            onRefresh: this.onRefresh,
          });

          panel.add(newTab);
          panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
          mytab.show();
        }
      },
    });
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  onContentCreated: function (view) {
    var record = view.record;
    var grid = view.caller;
    var paging = view.down("pagingtoolbar");

    paging.moveFirst();
    paging.doRefresh();
    this.onItemClick(grid, record);
  },

  openObjectTab: function (targetTab, object) {
    var objectId = object.get("Id");
    var title = object.get("Name");

    var newTab = Ext.widget("contratoformview", {
      title: title,
      border: false,
      closable: true,
      record: object,
      objectId: objectId,
      targetTab: targetTab,
      autoDestroy: true,
    });

    targetTab.add(newTab);
    targetTab.setActiveTab(newTab);
  },
});
