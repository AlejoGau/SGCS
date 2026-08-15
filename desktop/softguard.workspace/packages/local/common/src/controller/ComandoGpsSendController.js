//MIGRADO2024
Ext.define("Common.controller.ComandoGpsSendController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["ComandosIpModel", "ReceptoresSearchModel", "ComandosGpsSearchModel"],
  views: ["ComandoGpsSendView"],
  init: function (config) {
    this.control({
      comandogpssendview: {
        afterrender: this.initview,
      },
      'comandogpssendview button[action="send"]': {
        click: this.onSendClick,
      },
      'comandogpssendview #comboEquipoSend': {
        select: this.onEquipoSelect,
      },
    });
  }, // cierro init

  onEquipoSelect: function(combo, record) {
    var view = combo.up('comandogpssendview');
    var controller = this;
    var sendButton = view.down('button[action="send"]');
    var comando = view.record;
    
    // Cargar comandos del equipo seleccionado
    var comandosStore = Ext.create("Ext.data.Store", {
      model: controller.getComandosGpsSearchModelModel(),
    });
    
    comandosStore.load({
      params: { Id: record.get("Id") },
      callback: function(records) {
        if (records.length === 0) {
          notifyError("El equipo seleccionado no tiene comandos disponibles.");
          if (sendButton) sendButton.disable();
          return;
        }
        
        view.comandosStore = comandosStore;
        view.equipoText = record.get("Equipo");
        view.down("#equipo").setValue(record.get("Equipo"));
        
        // Verificar si el comando tiene configuración válida
        var cfg = comando.get("Config");
        var tipoComando = comando.get("Tipo");
        
        if (!cfg || cfg === "" || !tipoComando) {
          notify("Comando sin configurar. Cierre esta ventana y haga doble clic en el comando para configurarlo primero.");
          if (sendButton) sendButton.disable();
          return;
        }
        
        // Intentar configurar el comando ahora
        controller.setupComando(view, sendButton);
      }
    });
  },

  setupComando: function(view, sendButton) {
    var vehicle = view.vehicle;
    var comando = view.record;
    var comandosStore = view.comandosStore;
    var comandoIpModel = this.getComandosIpModelModel();

    var cfg = comando.get("Config");
    if (!cfg || cfg === "") {
      notifyError("El comando no tiene configuración válida. Debe configurar el comando primero (doble clic en el comando).");
      if (sendButton) sendButton.disable();
      return;
    }

    var comandoConfig = Ext.JSON.decode(cfg);

    var comandoTipo = comandosStore.findRecord("tcm_iid", comando.get("Tipo"));
    if (!comandoTipo) {
      notifyError("El tipo de comando no se encontró en el equipo seleccionado. Verifique que el equipo sea correcto o reconfigure el comando.");
      if (sendButton) sendButton.disable();
      return;
    }
    
    var comandoText = comandoTipo.get("tcm_cComando");
    Ext.Object.each(comandoConfig, function (key, value, myself) {
      comandoText = comandoText.replace(new RegExp("{" + key + "}"), value);
    });
    view.comandoIp = Ext.create(comandoIpModel, {
      cmd_tfechahora: new Date(),
      cmd_idCuenta: vehicle.get("cue_iid"),
      cmd_idReceptor: comandoTipo.get("tcm_iReceptor"),
      cmd_iComando: comando.get("Tipo"),
      cmd_nEstado: 1,
      cmd_cValores: comandoText,
      cmd_cObservaciones: comando.get("Name"),
      cmd_iEsCustom: comandoTipo.get("tcm_iEsCustom"),
    });
    view.comandoIp.set("Id", 0);
    view.loadRecord(view.comandoIp);
    
    // Habilitar el botón de enviar
    if (sendButton) sendButton.enable();
    
    // muestro la config dinamica
    var fieldset = view.down("#parametros");
    var tcm_cValores = comandoTipo.get("tcm_cValores");
    if (tcm_cValores != "") {
      try {
        tcm_cValores = Ext.JSON.decode(tcm_cValores);
        var fields = 0;
        Ext.Array.each(tcm_cValores, function (field) {
          if (field._AtSend) {
            fieldset.add(field);
            fields++;
          }
        });
        if (fields > 0) {
          fieldset.show();
        }
      } catch (exception) {
        console.log(
          "hubo un error al configurar las variables dinamicas " + exception,
        );
      }
    }
  },

  initview: function (view) {
    var vehicle = view.vehicle;
    var comando = view.record;
    var equipo = view.equipo;
    var comandosStore = view.comandosStore;
    var sendButton = view.down('button[action="send"]');
    var controller = this;
    var comandoIpModel = this.getComandosIpModelModel();

    try {
      // Siempre mostrar la información básica primero
      var cuentaNombre = "";
      var equipoText = view.equipoText || "";
      var comandoNombre = "";

      if (vehicle) {
        // Intentar obtener el nombre de la cuenta de varios campos posibles
        cuentaNombre = vehicle.get("cue_cnombre") 
          || vehicle.get("pan_ccuenta") 
          || vehicle.get("pan_cdescripcion")
          || vehicle.get("Name")
          || vehicle.get("cue_ncuenta")
          || "";
      }
      if (comando) {
        comandoNombre = comando.get("Name") || "";
      }

      view.down("#cuentanombre").setValue(cuentaNombre);
      view.down("#equipo").setValue(equipoText);
      view.down("#comando").setValue(comandoNombre);

      // Validaciones de datos requeridos
      if (!vehicle) {
        notifyError("No se pudo obtener la información de la cuenta.");
        if (sendButton) sendButton.disable();
        return;
      }
      if (!comando) {
        notifyError("No se pudo obtener la información del comando.");
        if (sendButton) sendButton.disable();
        return;
      }
      
      // Si no hay comandosStore o está vacío, mostrar combo para seleccionar equipo
      if (!comandosStore || comandosStore.getCount() === 0) {
        // Mostrar combo de equipos
        var comboEquipo = view.down("#comboEquipoSend");
        var displayEquipo = view.down("#equipo");
        
        if (comboEquipo) {
          comboEquipo.show();
          displayEquipo.hide();
          
          // Cargar store de receptores
          var receptoresStore = Ext.create("Ext.data.Store", {
            model: controller.getReceptoresSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
              property: "_tienecomandos",
              value: 1,
            }],
            sorters: [{
              property: "rec_cdescripcion",
              direction: "ASC",
            }],
          });
          
          comboEquipo.bindStore(receptoresStore);
          receptoresStore.load();
        }
        
        if (sendButton) sendButton.disable();
        return;
      }

      var cfg = comando.get("Config");
      if (!cfg || cfg === "") {
        notifyError("El comando no tiene configuración válida. Debe configurar el comando primero.");
        if (sendButton) sendButton.disable();
        return;
      }

      var comandoConfig = Ext.JSON.decode(cfg);

      var comandoTipo = comandosStore.findRecord("tcm_iid", comando.get("Tipo"));
      if (!comandoTipo) {
        notifyError("El tipo de comando no se encontró en el equipo seleccionado. Verifique que el equipo sea correcto o reconfigure el comando.");
        if (sendButton) sendButton.disable();
        return;
      }
    
      var comandoText = comandoTipo.get("tcm_cComando");
      Ext.Object.each(comandoConfig, function (key, value, myself) {
        comandoText = comandoText.replace(new RegExp("{" + key + "}"), value);
      });
      view.comandoIp = Ext.create(comandoIpModel, {
        cmd_tfechahora: new Date(),
        cmd_idCuenta: vehicle.get("cue_iid"),
        cmd_idReceptor: comandoTipo.get("tcm_iReceptor"),
        cmd_iComando: comando.get("Tipo"),
        cmd_nEstado: 1,
        cmd_cValores: comandoText,
        cmd_cObservaciones: comando.get("Name"),
        cmd_iEsCustom: comandoTipo.get("tcm_iEsCustom"),
      });
      view.comandoIp.set("Id", 0);
      view.loadRecord(view.comandoIp);
      // Habilitar el botón de enviar
      if (sendButton) sendButton.enable();
      // muestro la config dinamica
      var fieldset = view.down("#parametros");
      var tcm_cValores = comandoTipo.get("tcm_cValores");
      if (tcm_cValores != "") {
        try {
          tcm_cValores = Ext.JSON.decode(tcm_cValores);
          var fields = 0;
          Ext.Array.each(tcm_cValores, function (field) {
            if (field._AtSend) {
              fieldset.add(field);
              fields++;
            }
          });
          if (fields > 0) {
            fieldset.show();
          }
        } catch (exception) {
          console.log(
            "hubo un error al configurar las variables dinamicas " + exception,
          );
        }
      }
    } catch (e) {
      console.log("Error en initview de ComandoGpsSendController:", e);
      if (sendButton) sendButton.disable();
    }
  },
  onSendClick: function (button, event, options) {
    var view = button.up("comandogpssendview");
    var vehicle = view.vehicle;
    var comando = view.comandoIp;
    var panel = view.panel;
    var record = view.record;
    var win = view.up("window");

    // Validar que comandoIp esté definido
    if (!comando) {
      notifyError(
        "No se puede enviar el comando. Faltan datos de configuración.",
      );
      return;
    }

    var recordConfig = Ext.JSON.decode(record.get("Config"));
    if (recordConfig._modem) {
      // se manda por sms lo pongo como completo
      comando.cmd_nEstado = 3;
    }
    if (JSON.parse(record.data.Config).alarma) {
      var cmd_cAlarmaGenerar = JSON.parse(record.data.Config).alarma;
      comando.set("cmd_cAlarmaGenerar", cmd_cAlarmaGenerar);
    }
    // busco los campos dinamicos al enviar
    var fieldset = view.down("#parametros");
    var values = fieldset.getValues();
    var comandoText = comando.get("cmd_cValores");
    Ext.Object.each(values, function (key, value, myself) {
      comandoText = comandoText.replace(new RegExp("{" + key + "}"), value);
    });
    comando.set("cmd_cValores", comandoText);
    comando.save({
      callback: function (records, operation) {
        if (operation.success) {
          // me fijo si el comando es sms
          if (recordConfig._modem) {
            // guardo el sms en la base
            Ext.Ajax.request({
              params: {
                iCuenta: view.vehicle.get("cue_iid"),
                iModemSMS: recordConfig._modem,
                cMessageMerge: recordConfig.Generico,
                cDestinoSMS: panel.get("pan_csender"),
                idCmd: comando.get("Id"),
              },
              url: "/rest/search/SaveSms",
              method: "GET",
              scope: this,
              success: function (response) {
                notify("El sms se encoló con éxito");
              },
            });
          } else {
            // aviso a IPRS que debe enviar el comando.
            Ext.Ajax.request({
              url: "/handler/IRS_SENDCOMMAND_handler",
              params: {
                id: vehicle.get("cue_iid"),
              },
              method: "GET",
              scope: this,
              success: function (response) {},
            });
          }
          notify("El comando se envió con éxito");
          if (win) {
            win.close();
          }
        }
      },
    });
  },
});
