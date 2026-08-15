//MIGRADO2024
Ext.define("Common.controller.ClienteFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "MG_informacion_pagoSearchModel",
    "MG_informacion_pagoModel",
    "m_clientes_fcModel",
    "m_clientes_fcSearchModel",
    "t_condiciones_pago_fcSearchModel",
    "t_formatos_impresion_fcSearchModel",
    "t_organizacion_fcSearchModel",
    "t_categorias_impositivas_fcSearchModel",
    "OrganizationModel",
  ],
  views: ["ClienteFormView"],
  init: function (config) {
    // genero los eventos
    this.control({
      clienteformview: {
        afterrender: this.initview,
      },
      'clienteformview button[action="save"]': {
        click: this.onSaveClick,
      },
      "clienteformview #organizacionfacturadora": {
        change: this.onOrganizacionFacturadoraChange,
      },
      "clienteformview #condicionpago": {
        select: this.onCondicionPagoSelect,
      },
    });
  },
  initview: function (view) {
    var controller = this;

    // Flag para evitar que onOrganizacionFacturadoraChange interfiera durante la carga
    view.initializing = true;

    view.loadRecord(view.recordCliente);

    if (view.recordCliente.get("cli_iorganizacion") == 0) {
      view.down("#organizacionfacturadora").setRawValue("");
      // Deshabilitar categoría impositiva hasta que se seleccione una org facturadora
      var catCombo = view.down("#categoriasimpositivas");
      catCombo.setDisabled(true);
      catCombo.setEmptyText("Seleccione primero una Empresa Facturadora");
      // Aplicar aspecto grisado directo al DOM una vez renderizado
      setTimeout(function() {
          var inputEl = document.getElementById(catCombo.id + '-inputEl');
          var triggerWrap = document.getElementById(catCombo.id + '-triggerWrap');
          if (inputEl) { inputEl.style.backgroundColor = '#e0e0e0'; inputEl.style.color = '#999'; }
          if (triggerWrap) { triggerWrap.style.opacity = '0.3'; }
      }, 200);
    }

    var CondicionPagoStore = Ext.create("Ext.data.Store", {
      model: this.getT_condiciones_pago_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "con_orgidcodigoid",
          value: view.recordCliente.get("cli_iorganizacion"),
          id: "con_orgidcodigoid",
        },
      ],
    });
    var condicionpago = view.down("#condicionpago");
    condicionpago.bindStore(CondicionPagoStore);
    CondicionPagoStore.load({
      callback: function () {
        var r = CondicionPagoStore.findRecord(
          "con_ccodigo",
          view.recordCliente.get("cli_ccondicionpago"),
        );
        if (r) {
          condicionpago.fireEvent("select", condicionpago, [r]);
        }
      },
    });

    var formatosImpresion = Ext.create("Ext.data.Store", {
      model: this.getT_formatos_impresion_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
    });
    view.down("#formatoimpresion").bindStore(formatosImpresion);
    formatosImpresion.load();

    var orgLoaded = false;
    var catLoaded = false;

    var applyComboValues = function () {
      if (!orgLoaded || !catLoaded) return;
      var orgCombo = view.down("#organizacionfacturadora");
      var catCombo = view.down("#categoriasimpositivas");
      var orgVal = view.recordCliente.get("cli_iorganizacion");
      var catVal = view.recordCliente.get("cli_ccategoriaimpositiva");
      if (orgVal && orgVal !== 0) {
        orgCombo.setValue(orgVal);
      }
      if (catVal) {
        catCombo.setValue(catVal);
      }
      view.initializing = false;
    };

    var organizacionFacturadoraStore = Ext.create("Ext.data.Store", {
      model: this.getT_organizacion_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
    });
    view
      .down("#organizacionfacturadora")
      .bindStore(organizacionFacturadoraStore);
    organizacionFacturadoraStore.load({
      callback: function (records) {
        if (records.length <= 0) {
          Ext.MessageBox.alert(
            "Falta configuracion",
            "Es necesario tener creadas las organizaciones facturadoras. Ingrese a AdministratorSearch para crearlas.",
            function () {},
          );
          return false;
        }
        orgLoaded = true;
        applyComboValues();
      },
    });

    var categoriasImpositivasStore = Ext.create("Ext.data.Store", {
      model: this.getT_categorias_impositivas_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "cat_orgicodigoid",
          value: view.recordCliente.get("cli_iorganizacion"),
          id: "cat_orgicodigoid",
        },
      ],
    });
    view.down("#categoriasimpositivas").bindStore(categoriasImpositivasStore);
    categoriasImpositivasStore.load({
      callback: function () {
        catLoaded = true;
        applyComboValues();
      },
    });
  },
  onOrganizacionFacturadoraChange: function (combo, newvalue, oldvalue) {
    var view = combo.up("clienteformview");
    if (view.initializing) return;
    var categoriasCombo = view.down("#categoriasimpositivas");

    // Habilitar/deshabilitar categoría impositiva según si hay org facturadora seleccionada
    if (newvalue && newvalue !== 0) {
      categoriasCombo.setDisabled(false);
      categoriasCombo.setEmptyText("");
      var inputEl = document.getElementById(categoriasCombo.id + '-inputEl');
      var triggerWrap = document.getElementById(categoriasCombo.id + '-triggerWrap');
      if (inputEl) { inputEl.style.backgroundColor = ''; inputEl.style.color = ''; }
      if (triggerWrap) { triggerWrap.style.opacity = ''; }
    } else {
      categoriasCombo.setDisabled(true);
      categoriasCombo.setEmptyText(
        "Seleccione primero una Empresa Facturadora",
      );
      var inputEl = document.getElementById(categoriasCombo.id + '-inputEl');
      var triggerWrap = document.getElementById(categoriasCombo.id + '-triggerWrap');
      if (inputEl) { inputEl.style.backgroundColor = '#e0e0e0'; inputEl.style.color = '#999'; }
      if (triggerWrap) { triggerWrap.style.opacity = '0.3'; }
      categoriasCombo.clearValue();
    }

    var categoriasImpositivasStore = categoriasCombo.getStore();
    if (!categoriasImpositivasStore) return;
    categoriasImpositivasStore.filter({
      property: "cat_orgicodigoid",
      value: newvalue,
      id: "cat_orgicodigoid",
    });
    categoriasImpositivasStore.on(
      "load",
      function () {
        var val = view.recordCliente.get("cli_ccategoriaimpositiva");
        if (val) {
          categoriasCombo.setValue(val);
        }
      },
      null,
      { single: true },
    );

    var condicionPagoCombo = view.down("#condicionpago");
    var condicionPagoStore = condicionPagoCombo.getStore();
    if (condicionPagoStore) {
      condicionPagoStore.filter({
        property: "con_orgidcodigoid",
        value: newvalue,
        id: "con_orgidcodigoid",
      });
    }
  },
  onCondicionPagoSelect: function (combo, records) {
    var view = combo.up("clienteformview");
    var record = records[0];
    var mginformacionpago = view.down("#mginformacionpago");
    var controller = this;
    // me fijo si pide datos
    if (record.get("con_nPideDatos") == 1) {
      //me fijo si hay datos para esta condicion de pago
      //si no existe el store lo creo
      if (!view.storeinfopago) {
        view.storeinfopago = Ext.create("Ext.data.Store", {
          model: this.getMG_informacion_pagoSearchModelModel(),
          pageSize: 1,
          remoteSort: true,
          remoteFilter: true,
          autoLoad: false,
          listeners: {
            load: function (store, records, successfull) {
              var infopago = null;
              // limpio el container por las dudas
              mginformacionpago.removeAll();
              // tengo que mostrar el form de datos
              mginformacionpago.show();
              // me fijo si hay record para cambiar el proxy
              if (records && records.length > 0) {
                infopago = records[0];
                infopago.setConfig({
                  proxy: controller
                    .getMG_informacion_pagoModelModel()
                    .getProxy(),
                });
                mginformacionpago.add(
                  Ext.widget("mginformacionpagoformview", {
                    record: infopago,
                    condicionpago: record,
                    recordCliente: view.recordCliente,
                  }),
                );
              }
            },
          },
        });
      }
      view.storeinfopago.filter([
        {
          property: "mip_idcliente",
          value: view.recordCliente.get("Id"),
          id: "mip_idcliente",
        },
        {
          property: "mip_fpgidkey",
          value: record.get("Id"),
          id: "mip_fpgidkey",
        },
      ]);
    }
  },

  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    myform = button.up("form").getForm();
    var view = button.up("clienteformview");
    mymodel = myform.getRecord();
    var record = mymodel;
    var controller = this;
    if (myform.isValid()) {
      myform.updateRecord(mymodel);

      // Si es un registro nuevo (Id=0), forzar phantom=true para que el proxy haga POST en vez de PUT
      if (!mymodel.get("Id") || mymodel.get("Id") === 0) {
        mymodel.phantom = true;
      }

      // Si no hay cambios y no es nuevo, no hacer llamado al servidor
      if (!mymodel.dirty && !mymodel.phantom) {
        if (view.up("window")) {
          view.up("window").destroy();
        }
        return;
      }

      // Forzar envio de todos los campos para que el servidor no resetee los que no se envian
      var proxy = mymodel.getProxy();
      var writer = proxy.getWriter();
      var originalWriteAll = writer.getWriteAllFields();
      writer.setWriteAllFields(true);

      mymodel.save({
        scope: this,
        callback: function (record, operation) {
          writer.setWriteAllFields(originalWriteAll);
          var savedId = record.get("Id");
          var billingOrganizationId =
            record.get("cli_iOrganizacion") || record.get("cli_iorganizacion") || "";

          if (!operation.wasSuccessful() || !savedId) {
            notifyError("Error al guardar los datos contables.");
            return;
          }

          // Vincular Account en el record de la organizacion (en memoria)
          // Se persistira cuando el usuario guarde la organizacion
          view.recordOrganizacion.set("Account", String(savedId));
          view.recordOrganizacion.set("cli_icodigo_ID", String(savedId));
          if (billingOrganizationId) {
            view.recordOrganizacion.set("cli_iOrganizacion", billingOrganizationId);
            view.recordOrganizacion.set("cli_iorganizacion", billingOrganizationId);
          }

          if (view.caller && view.caller.record) {
            view.caller.record.set("Account", String(savedId));
            view.caller.record.set("cli_icodigo_ID", String(savedId));
            if (billingOrganizationId) {
              view.caller.record.set("cli_iOrganizacion", billingOrganizationId);
              view.caller.record.set("cli_iorganizacion", billingOrganizationId);
            }
          }

          if (view.up("window")) {
            view.up("window").destroy();
          }

          Ext.MessageBox.alert(
            "Atencion",
            "Los datos contables se guardaron correctamente. Guarde la organizacion para completar la vinculacion.",
            function () {},
          );
        },
        button: button,
      });
    } else {
      // Validación específica para categoría impositiva
      var categoriasCombo = view.down("#categoriasimpositivas");
      if (!categoriasCombo.getValue() || categoriasCombo.getValue() === "") {
        Ext.MessageBox.alert(
          "Campo obligatorio",
          "Debe completar el campo de Categoría Impositiva antes de guardar.",
          function () {},
        );
      } else {
        notify("No se ha guardado. Hay datos inválidos.");
      }
    }
  },
});
