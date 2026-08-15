Ext.define("Common.controller.ContratosFacturaController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "t_organizacion_fcSearchModel",
    "SmartMailTemplateSearchModel",
    "MGCuentaCorrienteSearchModel",
    "OrganizationSearchModel",
    "m_clientes_fcSearchModel",
  ],
  views: ["ContratosFacturaWizardView"],

  init: function (config) {
    // genero los eventos

    this.control({
      contratosfacturawizardview: {
        afterrender: this.initview,
      },
      "contratosfacturawizardview #facturar": {
        click: this.onFacturarClick,
      },
      "contratosfacturawizardview #organizacionfacturadora": {
        change: this.onOrganicionFacturadoraClick,
      },
      "contratosfacturawizardview #enviarpormail": {
        change: this.onEnviarPorMailChange,
      },
    });
  },

  getUserOrganizationId: function () {
    var orgId = 0;

    if (typeof _UserData !== "undefined" && _UserData && _UserData.Company) {
      orgId = parseInt(_UserData.Company, 10);
    }

    if (
      (!orgId || isNaN(orgId)) &&
      typeof desktopData !== "undefined" &&
      desktopData &&
      desktopData.infoUser &&
      desktopData.infoUser.OrganizationId
    ) {
      orgId = parseInt(desktopData.infoUser.OrganizationId, 10);
    }

    if (isNaN(orgId) || orgId <= 0) {
      return 0;
    }

    return orgId;
  },

  isOrganizationAllowed: function (view, orgId, silent) {
    var combo = view.down("#organizacionfacturadora");
    var store = combo ? combo.getStore() : null;
    var parsedOrgId = parseInt(orgId, 10);
    var record = null;

    if (!store || !parsedOrgId || isNaN(parsedOrgId)) {
      if (!silent) {
        Ext.MessageBox.alert(
          "Permisos",
          "La organización facturadora seleccionada no corresponde al usuario logueado.",
        );
      }
      return false;
    }

    record = store.findRecord(
      combo.valueField || "Id",
      parsedOrgId,
      0,
      false,
      true,
      true,
    );

    if (!record) {
      record = store.findRecord(
        combo.valueField || "Id",
        String(parsedOrgId),
        0,
        false,
        true,
        true,
      );
    }

    if (!record && !silent) {
      Ext.MessageBox.alert(
        "Permisos",
        "La organización facturadora seleccionada no corresponde al usuario logueado.",
      );
    }

    return !!record;
  },

  getSelectedBillingOrganizationRecord: function (view) {
    var combo = view.down("#organizacionfacturadora");
    var store = combo ? combo.getStore() : null;
    var value = combo ? combo.getValue() : null;
    var parsedId = parseInt(value, 10);
    var record = null;

    if (!store || !parsedId || isNaN(parsedId)) {
      return null;
    }

    record = store.findRecord(
      combo.valueField || "Id",
      parsedId,
      0,
      false,
      true,
      true,
    );

    if (!record) {
      record = store.findRecord(
        combo.valueField || "Id",
        String(parsedId),
        0,
        false,
        true,
        true,
      );
    }

    return record || null;
  },

  buildFacturacionValidationError: function (clienteRecord) {
    var categoriaImpositiva = clienteRecord
      ? clienteRecord.get("cli_ccategoriaimpositiva")
      : "";
    var condicionPago = clienteRecord
      ? clienteRecord.get("cli_ccondicionpago")
      : "";
    var errorMsg = "";

    if (!categoriaImpositiva || Ext.String.trim(categoriaImpositiva) === "") {
      errorMsg += "- Categoría Impositiva no configurada\n";
    }

    if (!condicionPago || Ext.String.trim(condicionPago) === "") {
      errorMsg += "- Condición de Pago no configurada\n";
    }

    return errorMsg;
  },

  loadBillingAccountRecord: function (view, callback) {
    var controller = this;
    var billingOrganizationRecord = this.getSelectedBillingOrganizationRecord(view);
    var ownerOrganizationId = billingOrganizationRecord
      ? parseInt(billingOrganizationRecord.get("org_organizacionId"), 10)
      : 0;

    if (!billingOrganizationRecord || !ownerOrganizationId || isNaN(ownerOrganizationId)) {
      callback(null);
      return;
    }

    var organizationStore = Ext.create("Ext.data.Store", {
      model: controller.getOrganizationSearchModelModel(),
      pageSize: 1,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "o.Id",
          value: ownerOrganizationId,
          id: "o.Id",
        },
      ],
    });

    organizationStore.load({
      callback: function (organizationRecords, operation, success) {
        var organizationRecord = success && organizationRecords && organizationRecords.length > 0
          ? organizationRecords[0]
          : null;
        var accountId = organizationRecord
          ? parseInt(organizationRecord.get("Account"), 10)
          : 0;

        if (!accountId || isNaN(accountId)) {
          callback(null);
          return;
        }

        var clienteStore = Ext.create("Ext.data.Store", {
          model: controller.getM_clientes_fcSearchModelModel(),
          pageSize: 1,
          remoteSort: true,
          remoteFilter: true,
          filters: [
            {
              property: "cli_icodigo_ID",
              value: accountId,
              id: "cli_icodigo_ID",
            },
          ],
        });

        clienteStore.load({
          callback: function (clienteRecords, clienteOperation, clienteSuccess) {
            if (clienteSuccess && clienteRecords && clienteRecords.length > 0) {
              callback(clienteRecords[0]);
              return;
            }

            callback(null);
          },
          failure: function () {
            callback(null);
          },
        });
      },
      failure: function () {
        callback(null);
      },
    });
  },

  validateBillingConfiguration: function (view, callback) {
    var controller = this;

    controller.loadBillingAccountRecord(view, function (clienteRecord) {
      if (!clienteRecord) {
        callback({ status: "unknown" });
        return;
      }

      var errorMsg = controller.buildFacturacionValidationError(clienteRecord);

      if (errorMsg !== "") {
        callback({
          status: "invalid",
          errorMsg: errorMsg,
        });
        return;
      }

      callback({ status: "valid" });
    });
  },

  onEnviarPorMailChange: function (check, value) {
    var view = check.up("contratosfacturawizardview");

    if (value) {
      view.down("#comboTemplate").show();
    } else {
      view.down("#comboTemplate").hide();
    }
  },

  onOrganicionFacturadoraClick: function (combo, value) {
    var view = combo.up("contratosfacturawizardview");
  },

  onFacturarClick: function (btn) {
    var view = btn.up("contratosfacturawizardview");
    var controller = this;
    btn.setDisabled(true);

    //  0 = no, 1 = si
    var envioPorMail = 0;
    if (view.down("#enviarpormail").getValue()) {
      envioPorMail = 1;
    }

    var idorganizacion = view.down("#organizacionfacturadora").getValue();

    if (!controller.isOrganizationAllowed(view, idorganizacion, false)) {
      btn.setDisabled(false);
      return;
    }

    // Validación preventiva: verificar que la organización usa su registro contable vinculado
    if (idorganizacion && idorganizacion != 0) {
      controller.validateBillingConfiguration(view, function (result) {
        if (result && result.status === "invalid") {
          btn.setDisabled(false);
          Ext.MessageBox.alert(
            "Datos de Facturación Incompletos",
            "No se puede facturar. Faltan configurar los siguientes datos en la organización:\n\n" +
              result.errorMsg +
              "\nPor favor, complete estos datos antes de continuar.",
            function () {
              // No hacer nada, solo cerrar el mensaje
            },
          );
          return false;
        }

        // Si no se pudo resolver la relación contable exacta, no bloquear: deja validar al servidor.
        controller.proceedWithFacturacion(btn, view, idorganizacion);
      });
    } else {
      // Si no hay organización válida, proceder directamente
      controller.proceedWithFacturacion(btn, view, idorganizacion);
    }
  },

  /**
   * Método que ejecuta la facturación después de validaciones preventivas
   */
  proceedWithFacturacion: function (btn, view, idorganizacion) {
    Ext.Ajax.request({
      url: "/rest/search/MG_ContratosGenerarFacturas",
      params: {
        idorganizacion: idorganizacion,
        template: view.down("#comboTemplate").getValue(),
      },
      method: "GET",
      success: function (resp, operation) {
        if (resp.responseText) {
          // Ext.Msg.alert('Status', 'Se facturo');
          // notify('Se facturo')
          var metadata = Ext.JSON.decode(resp.responseText);
          var totalContratos = 0;
          var totalFacturas = 0;

          if (metadata.rows.length > 0) {
            totalContratos = metadata.rows[0].totalContratos;
            totalFacturas = metadata.rows[0].totalFacturas;
          }

          view.down("#fsResultados").show();
          view.down("#totalContratos").setValue(totalContratos);
          view.down("#totalFacturas").setValue(totalFacturas);

          notify(
            getLocale("Operación completada. Revisar resumen de resultado"),
          );
          btn.setDisabled(false);
        }
      },
      failure: function (resp, operation) {
        btn.setDisabled(false);
        var errorMsg = "Error al facturar. ";
        try {
          var errorData = Ext.JSON.decode(resp.responseText);
          if (errorData.message) {
            errorMsg += errorData.message;
          }
        } catch (e) {
          errorMsg += "Estado: " + resp.status;
        }
        Ext.MessageBox.alert("Error en Facturación", errorMsg, function () {});
      },
    });
  },

  initview: function (view) {
    var controller = this;
    var userOrgId = this.getUserOrganizationId();

    var organizacionFacturadoraStore = Ext.create("Ext.data.Store", {
      model: this.getT_organizacion_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: userOrgId ? [
        {
          property: "org_organizacionId",
          value: userOrgId,
          id: "org_organizacionId",
        },
      ] : [],
    });
    view
      .down("#organizacionfacturadora")
      .bindStore(organizacionFacturadoraStore);

    if (!userOrgId) {
      view.down("#organizacionfacturadora").setDisabled(true);
      view.down("#facturar").setDisabled(true);
      Ext.MessageBox.alert(
        "Permisos",
        "No se pudo determinar la organización del usuario logueado para facturación.",
      );
      return;
    }

    organizacionFacturadoraStore.load({
      callback: function (records) {
        if (records && records.length > 0) {
          view.down("#organizacionfacturadora").setValue(records[0]);
        } else {
          view.down("#facturar").setDisabled(true);
          Ext.MessageBox.alert(
            "Permisos",
            "No tiene organizaciones facturadoras habilitadas para facturar.",
          );
        }
      },
    });

    var templateStore = Ext.create("Ext.data.Store", {
      model: this.getSmartMailTemplateSearchModelModel(),
    });
    var combo = view.down("#comboTemplate");
    combo.bindStore(templateStore);
    templateStore.load();
  },
});
