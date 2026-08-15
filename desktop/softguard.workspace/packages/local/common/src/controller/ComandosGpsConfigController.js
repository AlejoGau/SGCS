Ext.define("Common.controller.ComandosGpsConfigController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.TablasModemsSmsStore", "Common.store.TgeEquiposStore"],
  models: [
    "PanelModel",
    "ReceptoresSearchModel",
    "PoiFileSearchModel",
    "PanelSearchModel",
    "ComandosDispositivoModel",
    "ComandosDispositivoSearchModel",
    "ComandoGpsConfigModel",
    "TgeEquipoSearchModel",
    "ComandosGpsSearchModel",
  ],
  views: ["SmsModemCombo", "ComandosGpsConfigView", "ComandoGpsConfigView"],
  init: function (config) {
    this.control({
      comandosgpsconfigview: {
        afterrender: this.initview,
        enviarcomando: this.onEnviarComando,
      },
      'comandosgpsconfigview button[action="save"]': {
        click: this.onSaveClick,
      },
      'comandosgpsconfigview button[action="comandoDelete"]': {
        click: this.onComandoDeleteClick,
      },
      'comandosgpsconfigview button[action="add"]': {
        click: this.onComandoAddClick,
      },
      "comandosgpsconfigview #CmdGrid": {
        select: this.onComandoSelect,
        itemdblclick: this.onItemDblClick,
      },
      "comandosgpsconfigview #comboequipos": {
        change: this.onEquipoChange,
      },
      flotagpsview: {
        vehicleSelected: this.onVehicleSelected,
      },
    });
  }, // cierro init
  initview: function (view) {
    // cargo el record en los formularios
    var me = this;
    var nameModule = me.application._nameModule;
    if (!view.record) {
      datapanel = view.up("#datapanel");
      if (datapanel) view.record = datapanel.record;
    }
    var vehicle = view.record;
    var idcuenta = vehicle.get("cue_iid");
    var controller = this;
    view.comandosStore = Ext.create("Ext.data.Store", {
      model: controller.getComandosGpsSearchModelModel(),
    });

    const cmdGrid = view.down("#CmdGrid");
    var cmdStore = Ext.create("Ext.data.Store", {
      model: controller.getComandoGpsConfigModelModel(),
    });
    cmdGrid.bindStore(cmdStore);
    view.cmdGrid = cmdGrid;
    view.cmdStore = cmdStore;

    var receptores = Ext.create("Ext.data.Store", {
      model: this.getReceptoresSearchModelModel(),
      pageSize: 1000,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        /*{
                property : "rec_iesirs",
                value : 1
            },*/ {
          property: "_tienecomandos",
          value: 1,
        },
      ],
      sorters: [
        {
          property: "rec_cdescripcion",
          direction: "ASC",
        },
      ],
    });
    view.receptoresStore = receptores;
    view.down("#comboequipos").bindStore(receptores);
    receptores.load();
    // me fijo si es una cuenta fija
    //if (vehicle.get('ObjectTypeId') && vehicle.get('ObjectTypeId') == 3001){
    const iconcombo = view.down("#comboIcon");
    var equipoStore = Ext.create("Ext.data.Store", {
      model: this.getPanelSearchModelModel(),
      //pageSize: !,
      //limit: 1,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "pan_iidcuenta",
          value: idcuenta,
        },
      ],
    });
    equipoStore.load({
      callback: function (records, operation, success) {
        if (success && records.length > 0) {
          records.forEach((record) => {
            controller.setRecord(record, view, controller);
          });
        } else {
          var model = controller.getComandosDispositivoModelModel();
          var equipo = Ext.create(model, {
            idCuenta: idcuenta,
          });
          controller.setRecord(equipo, view, controller);
        }
      },
    });
    if (nameModule == "Webremoto") {
      view.down("#acciones").show();
    }
  },

  onVehicleSelected: function (record, flotagpsview) {
    var dataPanel = flotagpsview.down("#datapanel");
    if (dataPanel) var view = dataPanel.down("comandosgpsconfigview");
    if (view) this.setRecord(record, view, this);
  },

  setRecord: function (record, view, controller) {
    var idequipo = record.get("idEquipo");
    var idmodelo, idNvoModelo;
    view.panel = record;
    idequipo = record.get("pan_ireceptor");
    idmodelo = record.get("pan_rpmidkey");
    /**
     * BC 384713978 : Agrego un nuevo parametro al SP que filtra en base al modelo del Panel de la Cuenta, aquellos comandos con el
     * mismo marca / modelo, no se muestran aquellos que no cumplan esta condición.
     *
     */
    idNvoModelo = record.get("pan_iModelo");
    if (idequipo == 0) {
      idequipo = null;
      idmodelo = null;
      idNvoModelo = null;
    }

    view.idequipo = idequipo;
    view.down("#comboequipos").setValue(idequipo);

    // Habilitar el combo si no hay equipo asignado
    if (!idequipo) {
      view.down("#comboequipos").enable();
    }

    if (idequipo) {
      // cargo los comandos del equipo (maestro)
      view.comandosStore.load({
        params: { Id: idequipo, idmodelo: idmodelo, idNvoModelo: idNvoModelo },
        callback: function (records) {
          if (records.length <= 0) {
            // Leo me pido volver al notify
            notify("El equipos no tiene integrado el envío de comandos.");
            view.getEl().mask();
          }

          controller.loadVehicleCommands(record, view, controller);
        },
      });
    } else {
      controller.loadVehicleCommands(record, view, controller);
    }
  },

  // Genera un ID único para usar como ticks
  generateTicks: function () {
    return new Date().getTime() + "-" + Math.random().toString(36).substr(2, 9);
  },

  // Asegura que cada item de un array de comandos tenga un ticks único
  ensureTicks: function (commands) {
    var me = this;
    if (!Ext.isArray(commands)) return commands;
    Ext.Array.each(commands, function (cmd) {
      if (!cmd.ticks) {
        cmd.ticks = me.generateTicks();
      }
    });
    return commands;
  },

  loadVehicleCommands: function (record, view, controller) {
    //Cargo los comandos existentes (ya configurados)
    if (record.get("Config")) {
      var configData = Ext.JSON.decode(record.get("Config"));
      view.cmdStore.loadData(controller.ensureTicks(configData));
    } else if (record.get("pan_cconfig")) {
      view.pan_cconfig = Ext.JSON.decode(record.get("pan_cconfig"));
      if (view.pan_cconfig.commands) {
        view.cmdStore.loadData(
          controller.ensureTicks(view.pan_cconfig.commands),
        );
      } else {
        var data = Ext.isArray(view.pan_cconfig) ? view.pan_cconfig : [];
        view.cmdStore.loadData(controller.ensureTicks(data));
      }
    }
    view.equipo = record;
    view.loadRecord(record);
    if (record.get("idEquipo") == 0) {
      view.down("#comboequipos").setValue(null);
    }
  },

  setEquipo: function (view, idequipo, controller) {
    //Si el equipo no esta seleccionado en el combo, lo selecciono
    //Si el equipo es diferente en el record lo seteo
    //borro los comandos?
    // cargo los comandos del equipo (maestro)
    if (view.idequipo != idequipo) {
      view.idequipo = idequipo;

      // Actualizar pan_ireceptor en el record panel para que persista al guardar
      if (view.equipo && view.equipo.set) {
        view.equipo.set("pan_ireceptor", idequipo || 0);
      }

      if (idequipo) {
        view.comandosStore.load({
          params: { Id: idequipo },
          callback: function (records) {
            if (records.length <= 0) {
              notify("El equipo no tiene comandos disponibles.");
            }
          },
        });
      } else {
        view.comandosStore.removeAll();
      }
    }
  },

  onItemDblClick: function (grid, record, item, index, e, eOpts) {
    var view = grid.up("comandosgpsconfigview");
    var controller = this;
    const gridBtn = grid.up("grid");
    const store = gridBtn.getStore();

    if (controller.application._nameModule == "Webremoto") {
      return false;
    }

    Ext.create("Ext.window.Window", {
      title: record.get("Name"),
      height: 350,
      width: 400,
      translate: false,
      closeAction: "destroy",
      layout: "fit",
      items: {
        xtype: "comandogpsconfigview",
        record,
        equipo: view.equipo,
        store,
        comandosStore: view.comandosStore,
        receptoresStore: view.receptoresStore,
        onUpdateRecord: function (record, popupView) {
          // Propagar equipo seleccionado en el popup al combo principal
          if (popupView && popupView.equipo) {
            var equipoId = popupView.equipo.get
              ? popupView.equipo.get("rec_iid") ||
                popupView.equipo.get("pan_ireceptor")
              : null;
            if (equipoId) {
              // Actualizar pan_ireceptor en el record panel existente, NO reemplazar view.equipo
              if (view.equipo && view.equipo.set) {
                view.equipo.set("pan_ireceptor", equipoId);
              }
              view.idequipo = equipoId;
              view.down("#comboequipos").setValue(equipoId);
            }
          }
        },
      },
    }).show();
  },

  onComandoAddClick: function (button, event, options) {
    const view = button.up("comandosgpsconfigview");
    const grid = button.up("grid");
    const store = grid.getStore();
    const comandoModel = "Common.model.ComandoGpsConfigModel";
    const commandRecord = Ext.create(comandoModel, {
      ticks: this.generateTicks(),
      Name: getLocale("Nuevo Comando") + " (" + store.count() + ")",
      Tipo: null,
    });

    // Permitir abrir ventana aunque no haya equipo - el usuario lo selecciona en la ventana
    Ext.create("Ext.window.Window", {
      title: "Nuevo Comando",
      height: 350,
      width: 400,
      translate: false,
      closeAction: "destroy",
      layout: "fit",
      items: {
        // Let's put an empty grid in just to illustrate fit layout
        xtype: "comandogpsconfigview",
        equipo: view.equipo,
        count: store.count(),
        comandosStore: view.comandosStore,
        receptoresStore: view.receptoresStore,
        record: commandRecord,
        store,
        onUpdateRecord: function (record, popupView) {
          store.add(commandRecord);
          // Propagar el equipo seleccionado en el popup al combo principal
          if (popupView && popupView.equipo) {
            var equipoId = popupView.equipo.get
              ? popupView.equipo.get("rec_iid") ||
                popupView.equipo.get("pan_ireceptor")
              : null;
            if (equipoId) {
              // Actualizar pan_ireceptor en el record panel existente, NO reemplazar view.equipo
              if (view.equipo && view.equipo.set) {
                view.equipo.set("pan_ireceptor", equipoId);
              }
              view.idequipo = equipoId;
              view.down("#comboequipos").setValue(equipoId);
            }
          }
        },
      },
    }).show();
  },

  onComandoDeleteClick: function (button, event, options) {
    var grid = button.up("grid");
    var view = button.up("comandosgpsconfigview");
    var record = grid.getSelectionModel().getSelection()[0];
    var controller = this;

    if (!record) {
      notifyError("No hay un comando seleccionado para eliminar.");
      return;
    }

    var commandName = record.get("Name") || "el comando";

    Ext.Msg.confirm(
      "Confirmación",
      "¿Está seguro que desea eliminar " + commandName + "?",
      function (btn) {
        if (btn === "yes") {
          // Mostrar mensaje de espera
          Ext.Msg.wait("Eliminando comando...", "Por favor espere");

          // Eliminar del store local
          grid.getStore().remove(record);

          // Preparar datos para guardar
          var panelRecord = view.equipo;
          var store = grid.getStore();
          var config = Ext.Array.pluck(store.data.items, "data");

          // Actualizar la configuración
          var panConfig = panelRecord.get("pan_cConfig");
          if (panConfig && panConfig.charAt(0) == "[") {
            view.pan_cconfig = { commands: config };
          } else if (
            view.pan_cconfig &&
            (view.pan_cconfig.commands || view.pan_cconfig.receptor)
          ) {
            view.pan_cconfig.commands = config;
          } else {
            view.pan_cconfig = { commands: config };
          }

          var json = Ext.JSON.encode(view.pan_cconfig);
          panelRecord.set("pan_cconfig", json);
          panelRecord.set("pan_cConfig", json);

          if (typeof panelRecord.get("pan_iidcuenta") === "string") {
            panelRecord.set(
              "pan_iidcuenta",
              parseInt(panelRecord.get("pan_iidcuenta"), 10),
            );
          }

          // Guardar en el servidor
          Ext.Ajax.request({
            url: "/Rest/panel/?_dc=" + new Date().getTime(),
            jsonData: {
              ...panelRecord.data,
            },
            method: "POST",
            success: function (response) {
              Ext.Msg.hide();
              notify("Comando eliminado correctamente.");
              // Deshabilitar el botón eliminar después de borrar
              var deleteBtn = grid.down("#comandodelete");
              if (deleteBtn) {
                deleteBtn.disable();
              }
            },
            failure: function (response) {
              Ext.Msg.hide();
              // Si falla, volver a agregar el registro al store
              grid.getStore().add(record);
              notifyError(
                "Error al eliminar el comando. Por favor intente nuevamente.",
              );
              console.error("Error al eliminar comando:", response);
            },
          });
        }
      },
    );
  },

  onComandoSelect: function (selModel, record, index) {
    var gridView = selModel.view;
    var grid = gridView.up("grid");
    var button = grid.down("#comandodelete");
    button.enable();
  },

  onEquipoChange: function (combo, newvalue, oldvalue) {
    var view = combo.up("comandosgpsconfigview");
    this.setEquipo(view, newvalue, this);
  },

  onEnviarComando: function (record, view) {
    // Validar solo los datos mínimos requeridos
    if (!view.record) {
      notifyError("No se pudo obtener la información de la cuenta.");
      return;
    }

    var comboEquipo = view.down("#comboequipos");
    var comboEquipoText = comboEquipo.getRawValue() || "";
    var profile = view.module.profile
      ? view.module.profile
      : view.module.get("profile");
    Ext.create("Ext.window.Window", {
      title: getLocale("Enviar comando") + ": " + record.get("Name"),
      height: 300,
      translate: false,
      closeAction: "destroy",
      width: 400,
      layout: "fit",
      items: {
        // Let's put an empty grid in just to illustrate fit layout
        xtype: "comandogpssendview",
        record: record,
        profile: profile,
        vehicle: view.record,
        equipo: view.equipo,
        panel: view.panel,
        comandosStore: view.comandosStore,
        equipoText: comboEquipoText,
      },
    }).show();
  },
  onSaveClick: function (button, event, options) {
    function getRandomFloat(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    var view = button.up("comandosgpsconfigview");
    var record = view.equipo;
    var cuenta = view.record;
    var grid = view.down("#CmdGrid");
    var store = grid.getStore();
    var controller = this;
    //actualizo el registro con el form
    view.getForm().updateRecord(record);
    // Asegurar que pan_ireceptor se persista con el equipo seleccionado
    if (view.idequipo) {
      record.set("pan_ireceptor", view.idequipo);
    }
    // actualizo el JSON de los comandos
    var config = Ext.Array.pluck(store.data.items, "data");
    const panConfig = record.get("pan_cConfig");
    // me fijo si tiene modelo viejo de comandos
    if (panConfig && panConfig.charAt(0) == "[") {
      // es viejo lo reemplazo
      view.pan_cconfig = { commands: config };
    } else if (
      view.pan_cconfig &&
      (view.pan_cconfig.commands || view.pan_cconfig.receptor)
    ) {
      view.pan_cconfig.commands = config;
    } else {
      view.pan_cconfig = { commands: config };
    }

    //Elimino las alarmas de la metadata en caso de no estar configurada
    if (getParametro("GENEROEVTCMD") == 0) {
      for (i = 0; i < view.pan_cconfig.commands.length; i++) {
        var trans = JSON.parse(view.pan_cconfig.commands[i].Config);
        if (trans.alarma) {
          delete trans["alarma"];
          view.pan_cconfig.commands[i].Config = JSON.stringify(trans);
        }
      }
    }

    const json = Ext.JSON.encode(view.pan_cconfig);
    record.set("pan_cconfig", json);
    record.set("pan_cConfig", json);
    if (typeof record.get("pan_iidcuenta") === "string") {
      record.set("pan_iidcuenta", parseInt(record.get("pan_iidcuenta"), 10));
    }

    const pmodel = controller.getPanelModelModel();
    //record.setProxy( pmodel.getProxy() );
    record.setConfig({
      proxy: pmodel.getProxy(),
    });

    record.set("Id", getRandomFloat(1, 1000));
    if (!record.get("idEquipo")) {
      record.set("idEquipo", getRandomFloat(1, 1000));
    }

    if (view.getForm().isValid()) {
      Ext.Ajax.request({
        url: "/Rest/panel/?_dc=" + new Date().getTime(),
        jsonData: {
          ...record.data,
        },
        method: "POST",
        scope: this,
        success: function (response) {
          notify("Los datos se guardaron con éxito");
        },
      });
    } else {
      notifyError("Valores inválidos.");
    }
  },
});
