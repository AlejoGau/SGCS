Ext.define("Common.controller.ContratoFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "m_template_contratoModel",
    "crm_contratoModel",
    "GeographyModel",
    "TablasFormaDePagoSearchModel",
    "SecurityModulesModel",
    "t_organizacion_fcSearchModel",
    "m_template_contratoSearchModel",
    "Common.model.t_condiciones_pago_fcSearchModel",
    "m_aviso_programadoModel",
    "m_cuenta_corriente_fcSearchModel",
  ],
  requires: ["Ext.ux.IFrame"],
  views: ["ContratoFormView"],

  init: function (config) {
    // genero los eventos

    this.control({
      contratoformview: {
        afterrender: this.initview,
        organizationchanged: this.onOrganizationChanged,
        changedform: this.onChangedform,
      },
      'contratoformview button[action="save"]': {
        click: this.onSaveClick,
      },
      "contratoformview #comboPais": {
        change: this.onCountryChange,
      },
      'contratoformview button[action="delete"]': {
        click: this.onDeleteClick,
      },
      'contratoformview button[action="organizationChange"]': {
        click: this.onOrganizationChangeClick,
      },
      "contratoformview #editarcampos": {
        click: this.onEditarCamposClick,
      },
      "contratoformview #avisoprogramado": {
        click: this.onAvisoProgramadoClick,
      },
      "contratoformview #contratotemplate": {
        change: this.onContratoChange,
      },
      "contratoformview #tipoperiodo": {
        change: this.onTipoPeriodoChange,
      },
      "contratoformview #formadepago": {
        change: this.onFormaPagoChange,
      },
      "contratoformview #bonificacion_habilitada": {
        change: this.onBonificacionConfigChange,
      },
      "contratoformview #bonificacion_tipo": {
        change: this.onBonificacionConfigChange,
      },
      "contratoformview #bonificacion_permanente": {
        change: this.onBonificacionConfigChange,
      },
      "contratoformview #bonificacion_desde": {
        change: this.onBonificacionConfigChange,
      },
      "contratoformview #bonificacion_hasta": {
        change: this.onBonificacionConfigChange,
      },
      "contratoformview #bonificacion_valor": {
        change: this.onBonificacionConfigChange,
      },
      "contratoformview #avisovecimiento": {
        click: this.onAvisoVencimientoClick,
      },
      "contratoformview #enviocontrato": {
        click: this.onEnvioContratoClick,
      },
      'contratoformview button[action="descargar"]': {
        click: this.onDescargarClick,
      },
      'contratoformview button[action="verContrato"]': {
        click: this.onVerContratoClick,
      },
    });
  },

  onDescargarClick: function (btn) {
    var view = btn.up("contratoformview");
    var record = view.record;

    var URLDESKTOP = getParametro("URLDESKTOP");

    var filters = [{ property: "cnt_iid", value: record.get("Id") }];
    var url =
      URLDESKTOP +
      "/handler/ContratoHTML" +
      "?OAuth_token=" +
      getToken2() +
      "&filter=" +
      Ext.encode(filters);

    var src = "/handler/Html2PdfNreco";
    src = Ext.String.urlAppend(src, "url=" + escape(url));
    src = Ext.String.urlAppend(
      src,
      "filname=contrato_" + record.get("Id") + ".pdf",
    );

    window.open(src);
  },

  onVerContratoClick: function (btn) {
    var view = btn.up("contratoformview");
    var record = view.record;
    var title = getLocale("Contrato") + " (" + record.get("Id") + ")";

    var filters = [{ property: "cnt_iid", value: record.get("Id") }];
    var url = "/handler/ContratoHTML";
    url = Ext.String.urlAppend(url, "filter=" + Ext.encode(filters));

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: title,
      closeAction: "destroy",
      caller: view,
      modal: true,
      width: 600,
      height: 400,
      border: false,
      items: [
        {
          xtype: "uxiframe",
          itemId: "Iframe",
          border: false,
          width: "100%",
        },
      ],
      tbar: [
        {
          iconCls: "icon-printer",
          text: "Imprimir",
          tooltip: getLocale("Imprimir"),
          handler: function (btn) {
            var iframe = btn.up("window").down("#Iframe");
            var iframeWin = iframe.getWin();
            if (iframeWin && iframeWin.document && iframeWin.document.body) {
              iframeWin.focus();
              iframeWin.print();
            } else {
              notify(
                "El contenido del contrato aún no está disponible para imprimir.",
              );
            }
          },
        },
      ],
    });
    win.show();
    win.setLoading(true);
    Ext.Ajax.request({
      url: url,
      success: function (response) {
        win.setLoading(false);
        var iframe = win.down("#Iframe");
        var doc = iframe.getDoc();
        doc.open();
        doc.write(response.responseText);
        doc.close();
      },
      failure: function () {
        win.setLoading(false);
        notify("Error al cargar el contrato.");
      },
    });
  },

  onEnvioContratoClick: function (btn) {
    var view = btn.up("contratoformview");

    var record = this.getM_aviso_programadoModelModel().create({
      //    prg_estado: 1,
      prg_from: "",
      prg_gateway: "MAIL",
      prg_objectid: view.record.get("Id"),
      prg_objecttypeid: 3148,
      prg_prgdatetime: new Date(),
    });

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Envio contrato",
      closeAction: "destroy",
      caller: view,
      modal: true,
      width: 700,
      height: 400,
      border: false,
      items: Ext.widget("avisoprogramadohelperview", {
        record: record,
        caller: view,
        metadata: view.record.get("tmp_metadata"),
        idOrganizacion: view.recordOrganizacion.get("Id"),
        adjuntarContrato: true,
      }),
    });
    win.show();
  },

  onAvisoVencimientoClick: function (btn) {
    var view = btn.up("contratoformview");

    var record = this.getM_aviso_programadoModelModel().create({
      //    prg_estado: 1,
      prg_from: "",
      prg_gateway: "MAIL",
      prg_objectid: view.record.get("Id"),
      prg_objecttypeid: 3148,
      prg_prgdatetime: view.down("#cnt_fechavto").getValue(),
    });

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Aviso programado",
      closeAction: "destroy",
      caller: view,
      modal: true,
      width: 600,
      height: 400,
      border: false,
      items: Ext.widget("avisoprogramadohelperview", {
        record: record,
        caller: view,
        // metadata: view.record.get('tmp_metadata'),
        idOrganizacion: view.recordOrganizacion.get("Id"),
      }),
    });
    win.show();
  },
  onFormaPagoChange: function (combo, value) {
    var view = combo.up("contratoformview");

    if (combo.valueModels.length > 0) {
      view
        .down("#infoformadepago")
        .setValue(combo.valueModels[0].get("_info_formadepago"));
    }
  },
  onAvisoProgramadoClick: function (btn) {
    var view = btn.up("contratoformview");
    if (view.record.get("cnt_idcliente") != "") {
      var win = Ext.create("Ext.Window", {
        layout: "fit",
        title: "Aviso programado",
        closeAction: "destroy",
        caller: view,
        modal: true,
        width: 600,
        height: 400,
        border: false,
        items: {
          xtype: "avisoprogramadohelperview",
          idParent: 3148,
          idRecord: view.record.get("Id"),
          idOrganizacion: view.record.get("cnt_idcliente"),
          metadata: view.record.get("tmp_metadata"),
        },
      });
      win.show();
    } else {
      notify("Para armar un aviso se rquiere tener una organizacion.");
    }
  },

  onTipoPeriodoChange: function (combo, value) {
    var view = combo.up("contratoformview");

    if (value == "sinrenovacion") {
      view.down("#cantidadrenovacion").hide();
      view.down("#cantidadrenovacion").setValue(0);
    } else {
      view.down("#cantidadrenovacion").show();
    }
  },

  onContratoChange: function (combo, value) {
    var view = combo.up("contratoformview");
    var contratoTemplateRecord = view.contratotemplate.findRecord(
      "Id",
      view.down("#contratotemplate").getValue(),
    );

    if (contratoTemplateRecord) {
      var metaTemplate = [];
      if (
        contratoTemplateRecord.get("tmp_metadata") &&
        contratoTemplateRecord.get("tmp_metadata") != ""
      ) {
        metaTemplate = Ext.decode(contratoTemplateRecord.get("tmp_metadata"));
        if (metaTemplate && metaTemplate.form) {
          metaTemplate = metaTemplate.form;
        }
      }

      var meta = [];
      if (
        view.record.get("cnt_metadata") &&
        view.record.get("cnt_metadata") != ""
      ) {
        meta = Ext.decode(view.record.get("cnt_metadata"));
        if (meta && meta.formValues) {
          meta = meta.formValues;
        }
      }

      view
        .down("formbuilderedithelperview")
        .fireEvent(
          "changebaseform",
          view.down("formbuilderedithelperview"),
          metaTemplate,
          meta,
        );
    } else {
      view
        .down("formbuilderedithelperview")
        .fireEvent(
          "changebaseform",
          view.down("formbuilderedithelperview"),
          "",
          "",
        );
    }
  },

  onEditarCamposClick: function (btn) {
    var view = btn.up("contratoformview");
    var contratoTemplateRecord = view.contratotemplate.findRecord(
      "Id",
      view.down("#contratotemplate").getValue(),
    );
    var metaTemplate = [];

    if (
      contratoTemplateRecord.get("tmp_metadata") &&
      contratoTemplateRecord.get("tmp_metadata") != ""
    ) {
      metaTemplate = Ext.decode(contratoTemplateRecord.get("tmp_metadata"));
      if (metaTemplate && metaTemplate.form) {
        metaTemplate = metaTemplate.form;
      }
    }

    var meta = [];
    if (
      view.record.get("cnt_metadata") &&
      view.record.get("cnt_metadata") != ""
    ) {
      meta = Ext.decode(view.record.get("cnt_metadata"));
      if (meta && meta.formValues) {
        meta = meta.formValues;
      }
    }

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Seleccione una entidad",
      closeAction: "destroy",
      caller: view,
      modal: true,
      width: 600,
      height: 400,
      border: false,
      items: [
        {
          xtype: "formbuilderedithelperview",
          fields: metaTemplate,
          formValues: meta,
          caller: view,
        },
      ],
    });
    win.show();
  },

  onChangedform: function (items, view) {
    var metadata = this.decodeContratoMetadata(view.record.get("cnt_metadata"));
    metadata.formValues = items;
    view.record.set("cnt_metadata", Ext.encode(metadata));
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

  getFirstContextValue: function (values) {
    var controller = this;
    var result = "";

    Ext.Array.each(values || [], function (value) {
      if (result) {
        return false;
      }

      var normalized = controller.normalizeContextValue(value);
      if (normalized) {
        result = normalized;
        return false;
      }
    });

    return result;
  },

  resolveClienteIdFromRecord: function (record) {
    if (!record || !record.get) {
      return "";
    }

    return this.getFirstContextValue([
      record.get("cnt_idcliente"),
      record.get("Account"),
      record.get("cli_icodigo_ID"),
    ]);
  },

  resolveBillingOrganizationIdFromRecord: function (record) {
    if (!record || !record.get) {
      return "";
    }

    return this.getFirstContextValue([
      record.get("cnt_org_fc"),
      record.get("cli_iOrganizacion"),
      record.get("cli_iorganizacion"),
    ]);
  },

  resolveClienteIdFromView: function (view) {
    return this.getFirstContextValue([
      view ? view.clienteId : "",
      view && view.record ? this.resolveClienteIdFromRecord(view.record) : "",
      view && view.recordOrganizacion
        ? this.resolveClienteIdFromRecord(view.recordOrganizacion)
        : "",
    ]);
  },

  resolveBillingOrganizationIdFromView: function (view) {
    return this.getFirstContextValue([
      view ? view.facturadoraId : "",
      view && view.record ? this.resolveBillingOrganizationIdFromRecord(view.record) : "",
      view && view.recordOrganizacion
        ? this.resolveBillingOrganizationIdFromRecord(view.recordOrganizacion)
        : "",
    ]);
  },

  applyContextDefaults: function (view) {
    if (!view || !view.record) {
      return;
    }

    var clienteId = this.resolveClienteIdFromView(view);
    var billingOrganizationId = this.resolveBillingOrganizationIdFromView(view);
    var clienteField = view.down("#cnt_idcliente");
    var organizacionesCombo = view.down("#organizaciones");
    var clientButton = view.down("#clientButton");

    if (clienteId) {
      view.record.set("cnt_idcliente", clienteId);
      if (clienteField) {
        clienteField.setValue(clienteId);
      }
    }

    if (billingOrganizationId) {
      view.record.set("cnt_org_fc", billingOrganizationId);
      if (organizacionesCombo) {
        organizacionesCombo.setValue(billingOrganizationId);
      }
    }

    if (clientButton && (clienteId || view.organizacionId)) {
      clientButton.hide();
    }
  },

  decodeContratoMetadata: function (raw) {
    if (!raw) {
      return {};
    }

    try {
      var data = Ext.decode(raw);
      return Ext.isObject(data) ? data : {};
    } catch (e) {
      return {};
    }
  },

  serializeDateOnly: function (value) {
    if (!value) {
      return "";
    }

    var dt = Ext.isDate(value) ? value : new Date(value);
    if (!(dt instanceof Date) || isNaN(dt.getTime())) {
      return "";
    }

    return Ext.Date.format(dt, "Y-m-d");
  },

  parseDateOnly: function (value) {
    if (!value) {
      return null;
    }

    if (Ext.isDate(value)) {
      return value;
    }

    var parsed = Ext.Date.parse(value, "Y-m-d");
    if (parsed) {
      return parsed;
    }

    parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  },

  getBonificacionMetadataFromView: function (view) {
    var habilitada = !!view.down("#bonificacion_habilitada").getValue();
    if (!habilitada) {
      return null;
    }

    return {
      activa: true,
      tipo: view.down("#bonificacion_tipo").getValue() || "",
      valor: parseFloat(view.down("#bonificacion_valor").getValue() || 0),
      permanente: !!view.down("#bonificacion_permanente").getValue(),
      vigencia_desde: this.serializeDateOnly(
        view.down("#bonificacion_desde").getValue(),
      ),
      vigencia_hasta: this.serializeDateOnly(
        view.down("#bonificacion_hasta").getValue(),
      ),
    };
  },

  getBonificacionEstado: function (bonificacion) {
    if (!bonificacion || !bonificacion.activa) {
      return "Sin bonificacion";
    }

    if (bonificacion.permanente) {
      return "Vigente - permanente";
    }

    var today = Ext.Date.clearTime(new Date(), true);
    var desde = this.parseDateOnly(bonificacion.vigencia_desde);
    var hasta = this.parseDateOnly(bonificacion.vigencia_hasta);

    if (desde && Ext.Date.clearTime(desde, true) > today) {
      return "Programada";
    }

    if (hasta && Ext.Date.clearTime(hasta, true) < today) {
      return "Vencida";
    }

    return "Vigente";
  },

  updateBonificacionState: function (view) {
    var habilitada = !!view.down("#bonificacion_habilitada").getValue();
    var permanente = !!view.down("#bonificacion_permanente").getValue();
    var tipo = view.down("#bonificacion_tipo").getValue();
    var valorField = view.down("#bonificacion_valor");
    var fields = [
      "#bonificacion_tipo",
      "#bonificacion_valor",
      "#bonificacion_permanente",
      "#bonificacion_desde",
      "#bonificacion_hasta",
    ];

    Ext.Array.each(fields, function (selector) {
      var cmp = view.down(selector);
      if (cmp) {
        cmp.setDisabled(!habilitada);
      }
    });

    if (!habilitada) {
      view.down("#bonificacion_estado").setValue("Sin bonificacion");
      return;
    }

    if (tipo == "porcentaje") {
      valorField.setFieldLabel("Porcentaje");
      valorField.setMaxValue(90);
      valorField.setMinValue(0.01);
    } else {
      valorField.setFieldLabel("Monto fijo");
      valorField.setMaxValue(null);
      valorField.setMinValue(0.01);
    }

    if (permanente) {
      view.down("#bonificacion_desde").setDisabled(true);
      view.down("#bonificacion_hasta").setDisabled(true);
      view.down("#bonificacion_desde").setValue(null);
      view.down("#bonificacion_hasta").setValue(null);
    } else {
      view.down("#bonificacion_desde").setDisabled(!habilitada);
      view.down("#bonificacion_hasta").setDisabled(!habilitada);
    }

    view
      .down("#bonificacion_estado")
      .setValue(
        this.getBonificacionEstado(this.getBonificacionMetadataFromView(view)),
      );
  },

  applyBonificacionMetadataToView: function (view, bonificacion) {
    var habilitada = !!(bonificacion && bonificacion.activa);
    view.down("#bonificacion_habilitada").setValue(habilitada);
    view
      .down("#bonificacion_tipo")
      .setValue((bonificacion && bonificacion.tipo) || "porcentaje");
    view
      .down("#bonificacion_valor")
      .setValue((bonificacion && bonificacion.valor) || "");
    view
      .down("#bonificacion_permanente")
      .setValue(!!(bonificacion && bonificacion.permanente));
    view
      .down("#bonificacion_desde")
      .setValue(
        bonificacion ? this.parseDateOnly(bonificacion.vigencia_desde) : null,
      );
    view
      .down("#bonificacion_hasta")
      .setValue(
        bonificacion ? this.parseDateOnly(bonificacion.vigencia_hasta) : null,
      );
    this.updateBonificacionState(view);
  },

  validateBonificacionConfig: function (view) {
    var bonificacion = this.getBonificacionMetadataFromView(view);
    if (!bonificacion) {
      return true;
    }

    if (!bonificacion.tipo) {
      notify("Debe seleccionar el tipo de bonificacion.");
      return false;
    }

    if (!(bonificacion.valor > 0)) {
      notify("El valor de la bonificacion debe ser mayor a 0.");
      return false;
    }

    if (bonificacion.tipo == "porcentaje" && bonificacion.valor > 90) {
      notify("La bonificacion porcentual no puede superar el 90%.");
      return false;
    }

    if (!bonificacion.permanente && !bonificacion.vigencia_desde) {
      notify("Debe indicar la fecha desde de la bonificacion.");
      return false;
    }

    if (
      !bonificacion.permanente &&
      bonificacion.vigencia_desde &&
      bonificacion.vigencia_hasta
    ) {
      var desde = this.parseDateOnly(bonificacion.vigencia_desde);
      var hasta = this.parseDateOnly(bonificacion.vigencia_hasta);
      if (desde && hasta && Ext.Date.clearTime(desde, true) > Ext.Date.clearTime(hasta, true)) {
        notify("La fecha hasta no puede ser menor a la fecha desde.");
        return false;
      }
    }

    return true;
  },

  onBonificacionConfigChange: function (field, value) {
    var view = field.up("contratoformview");
    this.updateBonificacionState(view);
  },

  onOrganizationChanged: function (record, view) {
    if (record) {
      var clienteId = this.resolveClienteIdFromRecord(record);
      var billingOrganizationId = this.resolveBillingOrganizationIdFromRecord(record);

      if (clienteId != "") {
        view.record.set("cnt_idcliente", clienteId);
        view.getForm().findField("_organization").setValue(record.get("Name"));
        view.down("#cnt_idcliente").setValue(clienteId);

        if (billingOrganizationId) {
          view.record.set("cnt_org_fc", billingOrganizationId);
          view.down("#organizaciones").setValue(billingOrganizationId);
        }

        view.down("avisoprogramadogridview").idOrganizacion = record.get("Id");
      } else {
        notify(
          "Para utilizar esta organizacion debe entrar en la ficha y definir los datos de facturacion.",
        );
      }
    } else {
      view.record.set("cnt_idcliente", "");
      view.getForm().findField("_organization").setValue("");
    }
  },

  isMasterWebDealer: function (callback) {
    var modules = SecurityModulesStore; //this.getSecurityModulesStoreStore();

    var masterModule = modules.findRecord("KeyReference", "MasterWebDealer");
    if (
      masterModule.get("KeyReference") == "MasterWebDealer" &&
      masterModule.get("Available")
    ) {
      callback(true);
    } else {
      callback(false);
    }
  },

  onOrganizationChangeClick: function (button, event, options) {
    var view = button.up("contratoformview");
    var controller = this;
    var filter = [];
    this.isMasterWebDealer(function (isMaster) {
      if (isMaster) {
        Ext.Ajax.request({
          url: "/Rest/security/UserData",
          success: function (resp, operation) {
            if (resp.responseText) {
              var metadata = Ext.decode(resp.responseText);
              if (metadata) {
                var modules = SecurityModulesStore; //controller.getSecurityModulesStoreStore();
                var administratorModule = modules.findRecord(
                  "KeyReference",
                  "Administrator",
                );
                if (!administratorModule.get("Available")) {
                  filter.push({
                    property: "Organization:RelationParent",
                    value: metadata.Company,
                  });
                }

                filter.push({
                  property: "Account:ISNOTNULLOREMPTYTRIM",
                  value: "",
                });

                var win = Ext.create("Ext.Window", {
                  layout: "fit",
                  title: "Seleccione una entidad",
                  closeAction: "destroy",
                  caller: view,
                  modal: true,
                  width: 600,
                  height: 400,
                  border: false,
                  items: {
                    xtype: "organizationhelperview",
                    title: "",
                    forceStatus: "7,8,9",
                    hideTaxo: true,
                    caller: view,
                    filter: filter,
                  },
                });
                win.show();
              }
            }
          },
        });
      } else {
        var win = Ext.create("Ext.Window", {
          layout: "fit",
          title: "Seleccione una entidad",
          closeAction: "destroy",
          caller: view,
          modal: true,
          width: 600,
          height: 400,
          border: false,
          items: {
            xtype: "organizationhelperview",
            title: "",
            forceStatus: "7,8,9",
            hideTaxo: true,
            caller: view,
            filter: filter,
          },
        });
        win.show();
      }
    });
  },

  initview: function (view) {
    var controller = this;
    view.down("contratoitemsearchview").cnt_dinamico = view.cnt_dinamico;
    var Id = view.record.get("Id");
    if (!(typeof Id === "number" && isFinite(Id))) {
      Id = 0;
    }

    if (Id != 0) {
      view.down("#idcontrato").setValue(Id);
      //view.down( '#idcontrato' ).show() anulado según tarea https://softguard.atlassian.net/browse/DK-263

      this.getCrm_contratoModelModel().load(Id, {
        success: function (_record) {
          view.record = _record;
          view
            .getForm()
            .findField("_organization")
            .setValue(view.recordOrganizacion.get("nombreOrganizacion"));
          view.down("#organizaciones").setValue(_record.get("cnt_org_fc"));

          view.down("#avisosprogramados").setDisabled(false);
          controller.populateCombos(_record, view);
        },
      });
    } else {
      controller.applyContextDefaults(view);
      controller.populateCombos(view.record, view);
    }
  },

  populateCombos: function (record, view) {
    var controller = this;

    var condicionPagoFilters = [];
    if (record && record.get("cnt_org_fc") && record.get("cnt_org_fc") != 0) {
      condicionPagoFilters.push({
        property: "con_orgidcodigoid",
        value: record.get("cnt_org_fc"),
        id: "con_orgidcodigoid",
      });
    }

    var store = Ext.create("Ext.data.Store", {
      model: controller.getT_condiciones_pago_fcSearchModelModel(),
      remoteFilter: true,
      autoload: false,
      filters: condicionPagoFilters,
    });

    var formadepago = view.down("#formadepago");
    formadepago.bindStore(store);
    store.load({ callback: function () {} });

    var store = Ext.create("Ext.data.Store", {
      model: controller.getT_organizacion_fcSearchModelModel(),
      remoteFilter: true,
      autoload: false,
    });

    var organizaciones = view.down("#organizaciones");
    organizaciones.bindStore(store);
    store.load({ callback: function () {} });

    view.contratotemplate = Ext.create("Ext.data.Store", {
      model: controller.getM_template_contratoSearchModelModel(),
      remoteFilter: true,
      autoload: false,
      filters: [
        {
          property: "tmp_itipo",
          value: 1,
        },
      ],
    });

    // view.down('#contratotemplate').bindStore(view.contratotemplate);
    view.contratotemplate.load({
      callback: function () {
        if (record) {
          if (Ext.isEmpty(record.get("cnt_cantidad_auto"))) {
            record.set("cnt_cantidad_auto", 0);
          }

          // record.setProxy(model.getProxy());
          view.loadRecord(record);
          controller.applyContextDefaults(view);

          if (record.get("cnt_tmp_id") != 0) {
            view.down("#contratotemplate").setValue(record.get("cnt_tmp_id"));
          } else {
            view.down("#contratotemplate").setValue("0");
          }

          if (
            record.get("cnt_fechavto") != null &&
            record.get("cnt_fechavto") < new Date()
          ) {
            view.down("#contratovencido").show();
          }

          if (record.get("cnt_formapago") == 0) {
            view.down("#formadepago").setValue("");
            view.down("#formadepago").setRawValue("");
          }
          if (record.get("cnt_org_fc") == 0) {
            view.down("#organizaciones").setValue("");
            view.down("#organizaciones").setRawValue("");
          }
        }
      },
    });

    var json = record.get("cnt_metadata");

    if (json) {
      var objMetaData = this.decodeContratoMetadata(json);
      if (objMetaData && objMetaData.renovacion) {
        view
          .down("#cantidadrenovacion")
          .setValue(objMetaData.renovacion.cantidad);
        view.down("#tipoperiodo").setValue(objMetaData.renovacion.tipoperiodo);
      }

      this.applyBonificacionMetadataToView(view, objMetaData.bonificacion);
    } else {
      this.applyBonificacionMetadataToView(view, null);
    }
  },

  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    myform = button.up("form");
    var view = button.up("contratoformview");
    mymodel = view.record; //myform.getRecord();
    var record = mymodel;

    if (view.down("#contratotemplate").getValue() == "") {
      notify("Es necesario seleccionar un template de contrato.");
      return false;
    }

    if (!this.validateBonificacionConfig(view)) {
      return false;
    }

    if (myform.isValid()) {
      oldname = mymodel.get("Id");
      myform.updateRecord(mymodel);
      newname = mymodel.get("Id");
      var objectId = view.record.get("Id");

      Ext.Array.each(this.comboList, function (o) {
        if (o.getStore())
          Ext.Array.each(o.getStore().getUpdatedRecords(), function (o) {
            o.save({ scope: { ObjectId: objectId, ObjectTypeName: "Order" } });
          });
      });

      var v = view.down("contratoitemsearchview");
      v.store.sync();

      if (record.get("cnt_fechaalta") == null) {
        record.set("cnt_fechaalta", new Date());
      } else {
        record.set("cnt_fechaalta", record.get("cnt_fechaalta"));
      }

      mymodel.set("cnt_org_fc", view.down("#organizaciones").getValue());
      mymodel.set("cnt_tmp_id", view.down("#contratotemplate").getValue());
      mymodel.set("cnt_dinamico", +view.down("#cnt_dinamico").getValue());
      mymodel.set(
        "cnt_cantidad_auto",
        +(view.down("#cnt_cantidad_auto").getValue() || 0),
      );
      mymodel.set("cnt_idcliente", view.down("#cnt_idcliente").getValue());

      var metadata = this.decodeContratoMetadata(mymodel.get("cnt_metadata"));
      metadata.formValues = view.down("formbuilderedithelperview").getValue();
      metadata.renovacion = {
        cantidad: view.down("#cantidadrenovacion").getValue(),
        tipoperiodo: view.down("#tipoperiodo").getValue(),
      };

      var bonificacion = this.getBonificacionMetadataFromView(view);
      if (bonificacion) {
        metadata.bonificacion = bonificacion;
      } else {
        delete metadata.bonificacion;
      }

      mymodel.set("cnt_metadata", Ext.encode(metadata));
      if (
        !(typeof mymodel.get("Id") === "number" && isFinite(mymodel.get("Id")))
      ) {
        mymodel.set("Id", 0);
      }

      if (record.get("Id") == 0) {
        /*var jsonParams = Ext.JSON.encode(mymodel.data);
            jsonParams = jsonParams.replace('cnt_fechaalta":"','cnt_fechaalta":"\/Date(');
            jsonParams = jsonParams.replace('cnt_fechavto":"','cnt_fechavto":"\/Date(');
            jsonParams = jsonParams.replaceAll('Z"','Z)\/"');*/
        mymodel.save({
          callback: function (record, operation) {
            notify("Los datos se guardaron correctamente");

            var itemsView = view.down("#contratoitemsearchview");
            itemsView.record = mymodel;

            // Habilitar botones ahora que el contrato fue guardado
            var btnAdd = itemsView.down('button[action=add]');
            if (btnAdd) btnAdd.setDisabled(false);

            view.down("#avisosprogramados").setDisabled(false);

            var cuentasView = view.down("#contratocuentagridview");
            cuentasView.record = mymodel;

            var btnAddCuenta = cuentasView.down('button[action=addCuenta]');
            if (btnAddCuenta) btnAddCuenta.setDisabled(false);
            var btnDelCuenta = cuentasView.down('button[action=delCuenta]');
            if (btnDelCuenta) btnDelCuenta.setDisabled(false);

            // Initialize the cuentas store now that the contract is saved
            if (!cuentasView.getStore() || !cuentasView.getStore().model) {
              var cuentaStore = Ext.create("Ext.data.Store", {
                model: "Common.model.CuentaSearchModel",
                remoteFilter: true,
                filters: [{
                  property: "crm_contrato:RelationParent",
                  value: mymodel.get("Id"),
                  id: "IdContrato",
                }],
                autoload: false,
              });
              var pagingToolbar = cuentasView.down("pagingtoolbar");
              if (pagingToolbar) pagingToolbar.bindStore(cuentaStore);
              cuentasView.bindStore(cuentaStore);
              cuentaStore.load();
            } else {
              cuentasView.getStore().filter({
                property: "crm_contrato:RelationParent",
                value: mymodel.get("Id"),
                id: "IdContrato",
              });
            }

            // Initialize the items store now that the contract is saved
            if (!itemsView.getStore() || !itemsView.getStore().model) {
              var itemStore = Ext.create("Ext.data.Store", {
                model: "Common.model.ContratoItemSearchModel",
                pageSize: 500,
                remoteSort: true,
                remoteFilter: true,
                autoload: false,
                filters: [{
                  property: "idcontrato",
                  value: mymodel.get("Id"),
                  id: "idcontrato",
                }],
              });
              itemsView.bindStore(itemStore);
              itemStore.load();
            }

            view.down("avisoprogramadogridview").idRecord = record.get("Id");
            view.down("avisoprogramadogridview").idParent = 3148;

            //myform.getFields().each( function( o ) {
            //    o.originalValue = o.getValue();
            //})

            if (view.caller) {
              view.caller.fireEvent("objectchange", view.caller, record);
            }

            view.onRefresh(view.caller);
            view.close();
          },
        });
        /*Ext.Ajax.request({
                headers: { 'Content-Type': 'application/json' },
                url:'/Rest/crm_contrato?_cd='+(new Date()).getTime(),
                jsonData: jsonParams,
                method:'POST',
                success: function(response){
                    var jsonResp = Ext.JSON.decode(response.responseText);

                    notify( 'Los datos se guardaron correctamente' );

                    view.down( '#contratoitemsearchview' ).setDisabled( false )
                    view.down( '#avisosprogramados' ).setDisabled( false )
                    view.down( '#contratoitemsearchview' ).record = mymodel;

                    view.down( '#contratocuentagridview' ).setDisabled( false )
                    view.down( '#contratocuentagridview' ).record = mymodel;

                    view.down( '#contratocuentagridview' ).getStore().filter(
                        {
                            property: 'crm_contrato:RelationParent',
                            value: mymodel.get( 'Id' ),
                            id: 'IdContrato'
                        }
                    );


                    view.down( 'avisoprogramadogridview' ).idRecord = record.get( 'Id' )
                    view.down( 'avisoprogramadogridview' ).idParent = 3148

                    //myform.getFields().each( function( o ) {
                    //    o.originalValue = o.getValue();
                    //})

                    if( view.caller ) {
                        view.caller.fireEvent( 'objectchange', view.caller, record )
                    }


                }
            });*/
      } else {
        mymodel.save({
          scope: this,
          callback: function (record, operation) {
            notify("Los datos se guardaron correctamente");

            //var order = mymodel.get('id');
            //mymodel.set('Name', order);
            //view.setTitle(order);
            //view.up('orderview').setTitle(order);
            //view.down('[name=id]').setValue(order);

            view.down("#contratoitemsearchview").show();
            view.down("#avisosprogramados").setDisabled(false);
            view.down("#contratoitemsearchview").record = mymodel;

            view.down("#contratocuentagridview").show();
            view.down("#contratocuentagridview").record = mymodel;

            view
              .down("#contratocuentagridview")
              .getStore()
              .filter({
                property: "crm_contrato:RelationParent",
                value: mymodel.get("Id"),
                id: "IdContrato",
              });

            view.down("avisoprogramadogridview").idRecord = record.get("Id");
            view.down("avisoprogramadogridview").idParent = 3148;

            /*myform.getFields().each( function( o ) {
                        o.originalValue = o.getValue();
                    })*/

            if (view.caller) {
              view.caller.fireEvent("objectchange", view.caller, record);
            }

            view.onRefresh(view.caller);
            view.close();
          },
          button: button,
        });
      }
    } else {
      notify("No se ha guardado. Hay datos inválidos.");
    }
  },

  onDeleteClick: function (button, event, options) {
    var view = button.up("contratoformview");
    var record = view.record;

    record.destroy({
      callback: function () {
        var center = view.up("center");
        view.close();
        if (center) {
          var paging = center.down("ordergridview").down("pagingtoolbar");
          paging.moveFirst();
          paging.doRefresh();
        }
      },
    });
  },

  openObjectTab: function (tabpanel, objectId, objectTypeName, title) {
    var container = objectTypeName.toLowerCase() + "view";

    var newTab = tabpanel.down('[title="' + title + '"]');
    if (!newTab) {
      var newTab = Ext.widget(container, {
        title: title,
        border: false,
        closable: true,
        objectId: objectId,
        targetTab: tabpanel,
        autoDestroy: true,
      });

      tabpanel.add(newTab);
    }

    tabpanel.setActiveTab(newTab);
  },

  onCountryChange: function (combo, newvalue, oldvalue) {
    var view = combo.up("contratoformview");
    var stateCombo = view.down("#comboProvincia");
    var stateStore = stateCombo.getStore();

    stateStore.filter({
      property: "Parent",
      id: "Parent",
      value: newvalue,
    });
  },

  onDeleteClick: function (button, event, options) {
    var view = button.up("contratoformview");
    var record = view.record;
    var model = this.getOrderModelModel();
    //record.setProxy( model.getProxy() );
    record.setConfig({
      proxy: model.getProxy(),
    });
    record.destroy({
      callback: function () {
        var ordergridview = view.up("tabpanel").down("ordergridview");
        notify("Los datos se eliminaron con éxito.");
        view.close();

        if (ordergridview) {
          var paging = ordergridview.down("pagingtoolbar");
          paging.moveFirst();
          paging.doRefresh();
        }
      },
    });
  },
});
