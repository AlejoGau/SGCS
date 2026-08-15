/**
 * Los comporbantes ahora tiene un nuevo campo que se llama cbc_iVersion
 * Este campo ayuda a seperar distintos comportamientos de los comprobantes segun sus nuevas funcioanlidades.
 * - Version 0:
 * El comprobante almacenaba el porcentaje de los impuetos en la cabecera, luego se calculaban
 * - Version 1:
 * El comprobante calcula los impuestos al activarse (SP-> MG_cacularImpuestosProductosByComprobante) y
 * se persiste en _Datos..MG_comprobante_impuesto. Al generar la novedad debe hacer el calculo sobre esta tabla.
 */
Ext.define("Common.controller.ComprobanteFormController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.TipoComprobanteStore"],
  models: [
    "SmartMailTemplateSearchModel",
    "m_comprobantes_cab_fcModel",
    "OrganizationSearchModel",
    "Common.model.IdNameModel",
    "m_comprobantes_cab_fcSearchModel",
    "m_cuenta_corriente_fcModel",
    "m_cuenta_corriente_fcSearchModel",
    "t_tipos_formapago_fcSearchModel",
    "t_comprobantes_fcSearchModel",
    "Common.model.t_condiciones_pago_fcSearchModel",
  ],
  views: ["ComprobanteFormView"],

  init: function (config) {
    // genero los eventos
    this.control({
      comprobanteformview: {
        afterrender: this.initview,
        organizationchanged: this.onOrganizationChanged,
        itemsSaved: this.onItemSaved,
      },
      'comprobanteformview button[action="save"]': {
        click: this.onSaveClick,
      },
      "comprobanteformview #comboPais": {
        change: this.onCountryChange,
      },
      'comprobanteformview button[action="delete"]': {
        click: this.onDeleteClick,
      },
      'comprobanteformview button[action="organizationChange"]': {
        click: this.onOrganizationChangeClick,
      },
      "comprobanteformview #enviarpormail": {
        change: this.onEnviarPorMailChange,
      },
      "comprobanteformview #cbc_cestado": {
        change: this.onEstadoChangeChange,
      },
      "comprobanteformview #cbc_ctipocbte": {
        select: this.onSelection,
      },
    });
  },

  onEstadoChangeChange: function (combo, value) {
    var view = combo.up("comprobanteformview");

    if (value == 1) {
      view.down("#enviarpormail").show();
    } else {
      view.down("#enviarpormail").hide();
    }
  },

  onEnviarPorMailChange: function (check, value) {
    var view = check.up("comprobanteformview");

    if (value) {
      view.down("#comboTemplate").show();
    } else {
      view.down("#comboTemplate").hide();
    }
  },

  onOrganizationChanged: function (record, view) {
    if (record) {
      view.record.set("cbc_icliente", record.get("cli_icodigo_ID"));
      view.getForm().findField("_organization").setValue(record.get("Name"));
    } else {
      view.record.set("cbc_icliente", "");
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
    var view = button.up("comprobanteformview");
    var controller = this;
    var filter = [];
    this.isMasterWebDealer(function (isMaster) {
      if (isMaster) {
        var modules = SecurityModulesStore; //controller.getSecurityModulesStoreStore();
        var administratorModule = modules.findRecord(
          "KeyReference",
          "Administrator",
        );
        if (!administratorModule.get("Available")) {
          filter.push({
            property: "Organization:RelationParent",
            value: _UserData.Company,
          });
        }

        filter.push({
          property: "Account:ISNOTNULLOREMPTYTRIM",
          value: "",
        });

        var win = Ext.create("Ext.Window", {
          layout: "fit",
          title: "Seleccione una organizacion",
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
      } else {
        var win = Ext.create("Ext.Window", {
          layout: "fit",
          title: "Seleccione una organizacion",
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
    var record = view.record;
    var cli_iOrganizacion;

    if (view.hideNew) {
      view.down("#new").hide();
    }

    //requerido
    if (
      view.recordOrganizacion &&
      view.recordOrganizacion.get("cli_iOrganizacion") == 0
    ) {
      //notify('Es necesario configurar la organizacion facturadora.')
      Ext.MessageBox.alert(
        "Falta organizacion facturadora",
        "Es necesario configurar la organizacion facturadora.",
        function () {},
      );
      view.down("toolbar").setDisabled(true);
      setTimeout(function () {
        view.close();
      }, 100);
      return false;
    }
    cli_iOrganizacion = view.recordOrganizacion.get("cli_iOrganizacion");

    if (record.get("cbc_icliente") != 0) {
      view.cbc_icliente = record.get("cbc_icliente");
      var store = Ext.create("Ext.data.Store", {
        model: this.getOrganizationSearchModelModel(),
        pageSize: 50,
        filters: [
          {
            property: "cli_icodigo_ID",
            value: record.get("cbc_icliente"),
          },
        ],
        remoteSort: true,
        remoteFilter: true,
      }).load({
        callback: function (records) {
          view
            .getForm()
            .findField("_organization")
            .setValue(records[0].get("Name"));
        },
      });
    }

    var tipoFilter = [];

    if (cli_iOrganizacion) {
      tipoFilter.push({
        property: "cbt_idOrganizacionFacturadora",
        value: cli_iOrganizacion,
      });
    }

    if (view.cbt_ntipo) {
      tipoFilter.push({
        property: "cbt_ntipo",
        value: view.cbt_ntipo,
      });

      // si es factura de compra libero el form
      view.down("#cbc_cprefijocbte").enable();
      view.down("#cbc_inumerocbte").enable();
      view.down("#cbc_ccae").enable();
    } else {
      tipoFilter.push({
        property: "cbt_ntipo:NOT",
        value: 7,
      });
    }

    var TipoComprobanteStore = Ext.create("Ext.data.Store", {
      model: this.getT_comprobantes_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: tipoFilter,
    });

    view.comprobantesStore = Ext.create("Ext.data.Store", {
      model: this.getM_comprobantes_cab_fcSearchModelModel(),
      pageSize: 1,
      remoteSort: true,
      remoteFilter: true,
      sorters: [
        {
          property: "cbc_dfecha",
          direction: "DESC",
        },
      ],
    });

    view.down("#cbc_ctipocbte").bindStore(TipoComprobanteStore);
    TipoComprobanteStore.load({
      callback: function (records) {
        if (records.length <= 0) {
          Ext.MessageBox.alert(
            "Falta configuracion",
            "Es necesario tener creados tipos de comprobantes. Ingrese al Administrdor/Configuración para crearlas.",
            function () {},
          );
          return false;
        }
      },
    });

    view
      .down("#condicionpago")
      .setValue(view.recordOrganizacion.get("con_idKey"));

    var CondicionPagoStore = Ext.create("Ext.data.Store", {
      model: this.getT_condiciones_pago_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "con_orgidcodigoid",
          value: cli_iOrganizacion,
          id: "con_orgidcodigoid",
        },
      ],
    });

    view.down("#condicionpago").bindStore(CondicionPagoStore);
    CondicionPagoStore.load({
      callback: function (records) {
        if (records.length <= 0) {
          Ext.MessageBox.alert(
            "Falta configuracion",
            "Es necesario tener creados condiciones de pago. Ingrese a AdministratorSearch para crearlas.",
            function () {},
          );
          return false;
        }
      },
    });

    // mmm ojo aca, tenemos que usar el account no el organizationId
    if (!view.organizacionId) {
      //view.down('#organizaciones').setValue(record.get('cbc_iCliente'))
    } else {
      // record.set('cbc_icliente',view.organizacionId)
      view.down("#organizacion").hide();
    }

    if (!record.phantom && record.get("Id") != 0) {
      this.getM_comprobantes_cab_fcModelModel().load(record.get("Id"), {
        view: view,
        scope: this,
        success: function (record, operation) {
          view.record = record;
          view.loadRecord(record);
          // Forzar el valor del numero de comprobante por si el convert no resolvio correctamente
          var ncomprobante =
            Ext.String.leftPad(
              Ext.util.Format.trim(record.get("cbc_cprefijocbte")),
              4,
              "0",
            ) +
            "-" +
            Ext.String.leftPad(record.get("cbc_inumerocbte"), 10, "0");
          view.down("#_ncomprobante").setValue(ncomprobante);
        },
      });
    }

    if (record.phantom || record.get("Id") == 0) {
      view.down("#comprobanteitemsearchview").setDisabled(true);
    }

    //si esta activo no dejo pasar a pendiente y pongo lo items en readonly
    // y activo la impresion
    if (record.get("cbc_cestado") == 1) {
      var storeComboEstados = view.down("#cbc_cestado").getStore();
      storeComboEstados.remove(storeComboEstados.findRecord("field1", 0));

      view.down("#comprobanteitemsearchview").setDisabled(true);
      view.down("toolbar").hide();
      view.down("#print").setDisabled(false);
    }

    //una vez definido no se puede volver a cambiar
    if (record.get("cbc_ctipocbte") != "") {
      view.down("#cbc_ctipocbte").setDisabled(true);
    }

    //facturas de compra dejo editar el n de comprobante
    if (view.cbt_ntipo == 5) {
      view.down("#numerocomprobantecontainer").show();
      view.down("#_ncomprobante").hide();
    }

    if (view.hideToolbar) {
      view.down("toolbar").hide();
    }

    var templateStore = Ext.create("Ext.data.Store", {
      model: this.getSmartMailTemplateSearchModelModel(),
    });
    var combo = view.down("#comboTemplate");
    combo.bindStore(templateStore);
    templateStore.load();

    //modifico interface segun version
    if (view.record.get("cbc_iversion") == 1) {
      view.down("#cbc_yimpuesto1").hide();
      view.down("#cbc_yimpuesto2").hide();
      view.down("#cbc_yimpuesto3").hide();
    } else if (view.record.get("cbc_iversion") == 0) {
      view.down("#cbc_yimpuesto1").setDisabled(true);
      view.down("#cbc_yimpuesto2").setDisabled(true);
      view.down("#cbc_yimpuesto3").setDisabled(true);
    } else {
      notify("La version de comprobante no existe.");
      var paramentro =
        "Se intenta utilizar una version de comprobante que no existe: " +
        mymodel.get("cbc_iversion") +
        " en el comprobante: " +
        mymodel.get("Id");
      logger.error(paramentro, function () {
        console.log(
          "Fue reportardo un error de version de factura",
          paramentro,
        );
      });
      return false;
    }
  },

  onItemSaved: function (items, view, noSave) {
    var mymodel = view.record;
    var subtotal = 0;
    var total = 0;
    if (mymodel.get("cbc_iversion") == 0) {
      Ext.Array.each(items, function (v, k) {
        subtotal += v.get("_total");
      });

      mymodel.set("cbc_ysubtotal", subtotal);

      total = subtotal;
      if (mymodel.get("cbc_yimpuesto1")) {
        total += subtotal * (mymodel.get("cbc_yimpuesto1") / 100);
      }
      if (mymodel.get("cbc_yimpuesto2")) {
        total += subtotal * (mymodel.get("cbc_yimpuesto2") / 100);
      }
      if (mymodel.get("cbc_yimpuesto3")) {
        total += subtotal * (mymodel.get("cbc_yimpuesto3") / 100);
      }
    } else if (mymodel.get("cbc_iversion") == 1) {
      //version 1
      Ext.Array.each(items, function (v, k) {
        subtotal += v.get("cbi_yimporte") * v.get("cbi_icantidad");
        total +=
          (v.get("imp_nporcentaje") / 100 + 1) *
          (v.get("cbi_yimporte") * v.get("cbi_icantidad"));
      });
    } else {
      notify("La version de comprobante no existe.");

      var paramentro =
        "Se intenta utilizar una version de comprobante que no existe: " +
        mymodel.get("cbc_iversion") +
        " en el comprobante: " +
        mymodel.get("Id");
      logger.error(paramentro, function () {
        console.log(
          "Fue reportardo un error de version de factura",
          paramentro,
        );
      });

      return false;
    }

    mymodel.set("cbc_ytotal", total);
    mymodel.set("cbc_ysubtotal", subtotal);

    if (!noSave) {
      this.onSaveClick(view);
    }
  },

  onSaveClick: function (button, event, options) {
    var view = button.up("comprobanteformview")
      ? button.up("comprobanteformview")
      : button;
    myform = view.getForm();
    mymodel = view.record;
    var record = mymodel;
    var controller = this;

    if (myform.isValid()) {
      // Validación preventiva: verificar que el cliente tiene datos de facturación configurados
      if (mymodel.get("cbc_icliente") && mymodel.get("cbc_icliente") != 0) {
        // Usar el modelo existente con proxy y reader correctamente configurados
        var validationStore = Ext.create("Ext.data.Store", {
          model: "Common.model.m_clientes_fcSearchModel",
          remoteFilter: true,
          autoLoad: false,
          pageSize: 1,
        });

        // Filtrar por el ID del cliente (PK del registro m_clientes_fc)
        validationStore.filter([
          {
            property: "cli_icodigo_ID",
            value: mymodel.get("cbc_icliente"),
          },
        ]);

        validationStore.load({
          callback: function (records) {
            if (records && records.length > 0) {
              var clienteRecord = records[0];
              var categoriaImpositiva = clienteRecord.get(
                "cli_ccategoriaimpositiva",
              );
              var condicionPago = clienteRecord.get("cli_ccondicionpago");
              var organizacionFacturadora =
                clienteRecord.get("cli_iorganizacion");

              // Validar que todos los datos de facturación estén configurados
              var errorMsg = "";

              // La validación de org se remueve: si el store retornó registros,
              // la organización está configurada (mismo criterio que ContratosFacturaController)

              if (
                !categoriaImpositiva ||
                Ext.String.trim(categoriaImpositiva) === ""
              ) {
                errorMsg += "- Categoría Impositiva no configurada\n";
              }

              if (!condicionPago || Ext.String.trim(condicionPago) === "") {
                errorMsg += "- Condición de Pago no configurada\n";
              }

              // Si hay errores, mostrar alerta y detener el proceso
              if (errorMsg !== "") {
                Ext.MessageBox.alert(
                  "Datos de Facturación Incompletos",
                  "No se puede facturar. Faltan configurar los siguientes datos en la organización:\n\n" +
                    errorMsg +
                    "\nPor favor, complete estos datos antes de continuar.",
                  function () {
                    // No hacer nada, solo cerrar el mensaje
                  },
                );
                return false;
              }

              // Si todo está bien, proceder a guardar
              controller.proceedWithSave(mymodel, view, myform, record);
            } else {
              Ext.MessageBox.alert(
                "Error",
                "No se encontró la información del cliente. Intente nuevamente.",
                function () {},
              );
            }
          },
          failure: function () {
            // Si hay error en la búsqueda, proceder de todas formas (el servidor puede validar también)
            controller.proceedWithSave(mymodel, view, myform, record);
          },
        });
      } else {
        // Si no hay cliente, proceder directamente
        controller.proceedWithSave(mymodel, view, myform, record);
      }
    } else {
      notify("No se ha guardado. Hay datos inválidos.");
    }
  },

  /**
   * Método que ejecuta el guardado después de validaciones preventivas
   */
  proceedWithSave: function (mymodel, view, myform, record) {
    var controller = this;
    var objectId = view.record.get("Id");

    console.log("[ComprobanteForm] BEFORE updateRecord:", {
      cbc_inumerocbte: mymodel.get("cbc_inumerocbte"),
      cbc_cprefijocbte: mymodel.get("cbc_cprefijocbte"),
      phantom: mymodel.phantom,
      Id: mymodel.get("Id"),
      hiddenFieldValue: view.down("#cbc_inumerocbte")
        ? view.down("#cbc_inumerocbte").getValue()
        : "FIELD NOT FOUND",
    });

    oldname = mymodel.get("Id");
    myform.updateRecord(mymodel);
    newname = mymodel.get("Id");

    console.log("[ComprobanteForm] AFTER updateRecord:", {
      cbc_inumerocbte: mymodel.get("cbc_inumerocbte"),
      cbc_cprefijocbte: mymodel.get("cbc_cprefijocbte"),
      dirty: mymodel.dirty,
      modified: mymodel.modified ? JSON.stringify(mymodel.modified) : "none",
    });

    Ext.Array.each(this.comboList, function (o) {
      if (o.getStore())
        Ext.Array.each(o.getStore().getUpdatedRecords(), function (o) {
          o.save({ scope: { ObjectId: objectId, ObjectTypeName: "Order" } });
        });
    });

    var v = view.down("comprobanteitemsearchview");
    // Items are saved individually through their own forms (product/manual).
    // Do NOT sync the items search store here — it uses a read-only SearchModel proxy
    // and sync() can cause destructive side effects on the backend.
    record.set("cbc_cvtocae", "0");

    //zerofill
    record.set(
      "cbc_cprefijocbte",
      Ext.String.leftPad(
        Ext.util.Format.trim(record.get("cbc_cprefijocbte")),
        4,
        "0",
      ),
    );
    controller.save(mymodel, view, myform);
  },

  enviarPorMail: function (view, record) {
    if (view.down("#enviarpormail").getValue()) {
      if (view.down("#comboTemplate").getValue()) {
        console.log("Enviando factura");
        Ext.Ajax.request({
          url: "/rest/search/Mg_EnviarComprobantePorMail",
          method: "GET",
          params: {
            idComprobante: record.get("Id"),
            idTemplate: view.down("#comboTemplate").getValue(),
          },
          success: function (resp, operation) {
            notify("El envio fue programado.");
          },
        });
      } else {
        notify("Seleccione un template.");
        return false;
      }
    }
  },

  save: function (mymodel, view, myform) {
    var controller = this;
    //tomo el record de items para que se calcule el total
    if (view.down("#comprobanteitemsearchview").getStore()) {
      controller.onItemSaved(
        view.down("#comprobanteitemsearchview").getStore().data.items,
        view,
        true,
      );
    }

    if (mymodel.phantom || mymodel.get("Id") == 0) {
      Ext.Ajax.request({
        url: "/rest/search/MG_CrearComprobante",
        method: "GET",
        params: {
          Name: mymodel.get("Name"),
          cbc_icliente: mymodel.get("cbc_icliente"),
          cbc_dfecha: mymodel.get("cbc_dfecha"),
          cbc_ctipocbte: mymodel.get("cbc_ctipocbte"),
          cbc_cprefijocbte: mymodel.get("cbc_cprefijocbte"),
          cbc_inumerocbte: mymodel.get("cbc_inumerocbte"),
          cbc_ysubtotal: mymodel.get("cbc_ysubtotal"),
          cbc_yimpuesto1: mymodel.get("cbc_yimpuesto1"),
          cbc_yimpuesto2: mymodel.get("cbc_yimpuesto2"),
          cbc_yimpuesto3: mymodel.get("cbc_yimpuesto3"),
          cbc_ytotal: mymodel.get("cbc_ytotal"),
          cbc_cestado: mymodel.get("cbc_cestado"),
          cbc_ccae: mymodel.get("cbc_ccae"),
          cbc_cvtocae: mymodel.get("cbc_cvtocae"),
          organizacionFacturadoraId:
            view.recordOrganizacion.get("cli_iOrganizacion"),
          //ID INT = 0 OUTPUT
        },
        success: function (resp, operation) {
          if (resp.responseText) {
            var retRecord = Ext.JSON.decode(resp.responseText);
            console.log("[ComprobanteForm] SP MG_CrearComprobante response:", {
              cbc_iCodigo_ID: retRecord.rows[0].cbc_iCodigo_ID,
              cbc_iNumeroCbte: retRecord.rows[0].cbc_iNumeroCbte,
              cbc_cPrefijoCbte: retRecord.rows[0].cbc_cPrefijoCbte,
              fullRow: retRecord.rows[0],
            });
            mymodel.set("Id", retRecord.rows[0].cbc_iCodigo_ID);
            mymodel.set("cbc_cprefijocbte", retRecord.rows[0].cbc_cPrefijoCbte);
            mymodel.set("cbc_inumerocbte", retRecord.rows[0].cbc_iNumeroCbte);
            mymodel.set(
              "_cbc_inumerocbte",
              Ext.String.leftPad(retRecord.rows[0].cbc_iNumeroCbte, 10, "0"),
            );
            mymodel.set(
              "_ncomprobante",
              Ext.String.leftPad(
                Ext.util.Format.trim(retRecord.rows[0].cbc_cPrefijoCbte),
                4,
                "0",
              ) +
                "-" +
                Ext.String.leftPad(retRecord.rows[0].cbc_iNumeroCbte, 10, "0"),
            );
            // Marcar como no-phantom para que futuros saves usen update en vez de create
            mymodel.phantom = false;
            mymodel.commit();
            notify("Los datos se guardaron correctamente");

            view.loadRecord(mymodel);

            //una vez definido no se puede volver a cambiar
            if (mymodel.get("cbc_ctipocbte") != "") {
              view.down("#cbc_ctipocbte").setDisabled(true);
            }

            view.down("#comprobanteitemsearchview").setDisabled(false);
            view.down("#comprobanteitemsearchview").record = mymodel;

            // Actualizar el filtro del store de items con el ID real
            var itemsView = view.down("#comprobanteitemsearchview");
            var itemsStore = itemsView.getStore();
            if (itemsStore) {
              itemsStore.clearFilter(true);
              itemsStore.filter([
                {
                  property: "cbi_icodigocab",
                  value: mymodel.get("Id"),
                  id: "cbi_iCodigoCab",
                },
              ]);
            }

            //solo cuando se pasa a activo genero cuenta correinte
            if (mymodel.get("cbc_cestado") == 1) {
              if (
                view.down("#enviarpormail").getValue() &&
                !view.down("#comboTemplate").getValue()
              ) {
                notify("Debe seleccionar un template");
                return false;
              }

              var store = Ext.create("Ext.data.Store", {
                model: controller.getM_cuenta_corriente_fcSearchModelModel(),
                remoteFilter: true,
                limit: 1,
                filters: [
                  {
                    property: "cta_iCodigoCbte",
                    value: mymodel.get("Id"),
                  },
                ],
              });

              store.load({
                callback: function (records) {
                  if (records.length <= 0) {
                    // esto se puede pasar al store contabilizacomprobante
                    Ext.Ajax.request({
                      url: "/rest/search/MG_m_cuenta_corriente_fcIns",
                      method: "GET",
                      params: {
                        cta_iCodigoCbte: mymodel.get("Id"),
                        cta_nCuota: 1, //ver esto
                        cta_yTotal: mymodel.get("cbc_ytotal"),
                        cta_ySaldo: mymodel.get("cbc_ytotal"),
                        cta_dVencimiento: mymodel.get("cbc_dfecha"),
                        cta_dCobro: new Date(),
                        idCondicionPago: view.down("#condicionpago").getValue(),
                      },
                      success: function (resp, operation) {},
                    });
                  }
                },
              });

              //calculo impuestos de los items
              Ext.Ajax.request({
                url: "/rest/search/MG_cacularImpuestosProductosByComprobante",
                method: "GET",
                params: { idComprobante: mymodel.get("Id") },
                success: function (resp, operation) {},
              });

              controller.enviarPorMail(view, mymodel);
              view.close();
            }

            if (view.caller) {
              view.caller.fireEvent("objectchange", view.caller);
            }
          }
        },
      });
    } else {
      console.log("[ComprobanteForm] REST PUT save - model data:", {
        Id: mymodel.get("Id"),
        cbc_inumerocbte: mymodel.get("cbc_inumerocbte"),
        cbc_cprefijocbte: mymodel.get("cbc_cprefijocbte"),
        phantom: mymodel.phantom,
        dirty: mymodel.dirty,
        changes: mymodel.getChanges
          ? JSON.stringify(mymodel.getChanges())
          : "N/A",
      });
      mymodel.save({
        scope: this,
        callback: function (record, operation) {
          notify("Los datos se guardaron correctamente");
          view.loadRecord(mymodel);

          //una vez definido no se puede volver a cambiar
          if (mymodel.get("cbc_ctipocbte") != "") {
            view.down("#cbc_ctipocbte").setDisabled(true);
          }

          view.down("#comprobanteitemsearchview").setDisabled(false);
          view.down("#comprobanteitemsearchview").record = mymodel;

          //solo cuando se pasa a activo genero cuenta correinte
          if (record.get("cbc_cestado") == 1) {
            if (
              view.down("#enviarpormail").getValue() &&
              !view.down("#comboTemplate").getValue()
            ) {
              notify("Debe seleccionar un template");
              return false;
            }

            var store = Ext.create("Ext.data.Store", {
              model: this.getM_cuenta_corriente_fcSearchModelModel(),
              remoteFilter: true,
              limit: 1,
              filters: [
                {
                  property: "cta_iCodigoCbte",
                  value: record.get("Id"),
                },
              ],
            });

            store.load({
              callback: function (records) {
                if (records.length <= 0) {
                  Ext.Ajax.request({
                    url: "/rest/search/MG_m_cuenta_corriente_fcIns",
                    method: "GET",
                    params: {
                      cta_iCodigoCbte: record.get("Id"),
                      cta_nCuota: 1, //ver esto
                      cta_yTotal: record.get("cbc_ytotal"),
                      cta_ySaldo: record.get("cbc_ytotal"),
                      cta_dVencimiento: record.get("cbc_dfecha"),
                      cta_dCobro: new Date(),
                      idCondicionPago: view.down("#condicionpago").getValue(),
                    },
                    success: function (resp, operation) {
                      view.close();
                    },
                  });
                }
              },
            });

            //calculo impuestos de los items
            Ext.Ajax.request({
              url: "/rest/search/MG_cacularImpuestosProductosByComprobante",
              method: "GET",
              params: { idComprobante: record.get("Id") },
              success: function (resp, operation) {},
            });

            //programo envio de mail
            controller.enviarPorMail(view, record);
          }

          if (view.caller) {
            view.caller.fireEvent("objectchange", view.caller);
          }
        },
      });
    }
  },

  onDeleteClick: function (button, event, options) {
    var view = button.up("comprobanteformview");
    var record = view.record;

    record.destroy({
      callback: function () {
        var center = view.up("center");
        view.close();
        if (center) {
          if (view.caller) {
            view.caller.fireEvent("objectchange", view.caller);
          }
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
    var view = combo.up("comprobanteformview");
    var stateCombo = view.down("#comboProvincia");
    var stateStore = stateCombo.getStore();

    stateStore.filter({
      property: "Parent",
      id: "Parent",
      value: newvalue,
    });
  },

  onDeleteClick: function (button, event, options) {
    var view = button.up("comprobanteformview");
    var record = view.record;
    var model = this.getM_comprobantes_cab_fcModelModel();
    model.load(record.get("Id"), {
      callback: function (rec, operation, success) {
        rec.erase({
          callback: function (recdel, operation) {
            var ordergridview = view.up("tabpanel").down("comprobantegridview");
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
  },

  onSelection: function (combo, newvalue, oldvalue) {
    var filters = [];
    var view = combo.up("comprobanteformview");
    var store = view.comprobantesStore;
    var cbc_dfecha = view.down("#cbc_dfecha");

    filters.push({
      property: "cbc_ctipocbte",
      value: combo.getValue(),
      id: "cbc_ctipocbte",
    });
    filters.push({
      property: "cbc_icliente",
      value: view.cbc_icliente,
    });

    cbc_dfecha.setValue("");
    cbc_dfecha.setMinValue("");
    cbc_dfecha.setDisabled(false);

    store.clearFilter(true);
    store.filter(filters);
    store.load({
      callback: function (record) {
        if (record.length > 0) {
          cbc_dfecha.setMinValue(record[0].get("cbc_dfecha"));
        }
      },
    });
  },
});
