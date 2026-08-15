//MIGRADO2024
Ext.define("Common.view.ComandoGpsConfigView", {
  extend: "Ext.form.Panel",
  alias: "widget.comandogpsconfigview",
  layout: "anchor",
  autoScroll: true,
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 100,
    margin: 5,
    anchor: "100%",
    width: "100%",
  },
  items: [
    {
      xtype: "combo",
      fieldLabel: "Equipo",
      itemId: "comboEquipoConfig",
      queryMode: "local",
      displayField: "rec_cdescripcion",
      valueField: "rec_iid",
      emptyText: getLocale("Seleccione un equipo"),
      allowBlank: true,
      anchor: "100%",
      hidden: true, // Se muestra solo si no hay equipo preseleccionado
    },
    {
      xtype: "combo",
      fieldLabel: "Comando",
      itemId: "combocomandos",
      queryMode: "local",
      displayField: "tcm_cdescripcion",
      valueField: "tcm_iid",
      emptyText: getLocale("Seleccione un comando"),
      allowBlank: false,
      name: "Tipo",
      anchor: "100%",
    },
    {
      xtype: "textfield",
      name: "Name",
      fieldLabel: "Nombre",
      allowBlank: false,
      validator: function (value) {
        var view = this.up("comandogpsconfigview");
        var record = view.getRecord();
        var store = view.store;
        var found = store.findRecord("Name", value, 0, false, false, true);

        if (found && found != record) {
          return "EL nombre debe ser único";
        } else return true;
      },
    },
    {
      xtype: "container",
      layout: {
        type: "hbox",
        align: "stretch",
      },
      items: [
        {
          xtype: "combo",
          itemId: "comboIcon",
          fieldLabel: "Icono",
          name: "Icon",
          displayField: "text",
          valueField: "Name",
          listConfig: {
            getInnerTpl: function (displayField) {
              return (
                '<img src="/Gallery/SmartPanics/Comandos/{Name}" class="icon" style="background-color:GRAY; width:16px; height:16px"/> {' +
                displayField +
                "}"
              );
            },
          },
          listeners: {
            select: function (combo, records) {
              var name = records.get("Name");
              var iconUrl = "/Gallery/SmartPanics/Comandos/" + name;
              combo
                .up("comandogpsconfigview")
                .down("#iconImage")
                .setSrc(iconUrl);
            },
          },
          allowBlank: false,
          flex: 1,
          queryMode: "local",
        },
        {
          xtype: "image",
          itemId: "iconImage",
          cls: "icon",
          style: "background-color:GRAY; width:16; height:16",
          width: 32,
        },
      ],
    },
    {
      xtype: "combo",
      //store: 'TablaCodigosAlarmasStore',
      itemId: "codigoAlarma",
      fieldLabel: "Código alarma",
      displayField: "Descripcion",
      valueField: "cod_ccodigo",
      name: "alarma",
      anchor: "100%",
      queryMode: "local",
      hidden: true,
    },
    {
      xtype: "form",
      title: "Parámetros",
      hidden: true,
      itemId: "parametros",
      items: [],
    },
  ],
  // cierro items

  cargarComandosParaEquipo: function (equipoRecord) {
    var me = this;
    // Soportar tanto registros de receptor (rec_iid) como de panel (pan_ireceptor)
    var idequipo =
      equipoRecord.get("rec_iid") || equipoRecord.get("pan_ireceptor");
    var idmodelo =
      equipoRecord.get("rec_iidmodelo") || equipoRecord.get("pan_rpmidkey");
    var idNvoModelo =
      equipoRecord.get("rec_iidModeloConfig") ||
      equipoRecord.get("pan_iModelo");

    if (!idequipo) return;

    // Crear comandosStore si no existe
    if (!me.comandosStore) {
      me.comandosStore = Ext.create("Ext.data.Store", {
        model: "Common.model.ComandosGpsSearchModel",
      });
    }

    // Cargar comandos del equipo seleccionado
    me.comandosStore.load({
      params: { Id: idequipo, idmodelo: idmodelo, idNvoModelo: idNvoModelo },
      callback: function (records) {
        var comboComandos = me.down("#combocomandos");
        comboComandos.bindStore(me.comandosStore);

        if (records.length <= 0) {
          notify("El equipo no tiene integrado el envío de comandos.");
        }

        // Re-setear el valor del comando después de cargar el store (modo edición)
        var tipoValue = me.record ? me.record.get("Tipo") : null;
        if (tipoValue) {
          comboComandos.setValue(tipoValue);
        }
      },
    });

    // Guardar referencia al equipo
    me.equipo = equipoRecord;
  },

  initComponent: function () {
    this.callParent();
    this.loadRecord(this.record);
    if (this.record.get("Tipo") == 0) {
      this.down("#combocomandos").setValue(null);
    }
    // agrego la toolbar
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          text: "Aceptar",
          iconCls: "save",
          action: "save",
          handler: function (button) {
            var view = button.up("comandogpsconfigview");
            var win = view.up("window");
            var parametrosForm = view.down("#parametros");
            // me fijo si el form es valido
            if (
              !parametrosForm.getForm().isValid() ||
              !view.getForm().isValid()
            ) {
              notifyError("Por favor corrija y/o complete los valores");
              return false;
            }
            view.getForm().updateRecord(view.record);
            var values = parametrosForm.getValues();
            // guardo el icono como un parametro mas de la metadata.
            values.icon = view.down("#comboIcon").getValue();
            if (view.down("#codigoAlarma").getValue()) {
              values.alarma = view.down("#codigoAlarma").getValue();
            }
            view.record.set("Config", Ext.JSON.encode(values));
            view.onUpdateRecord(view.record, view);
            win.close();
          },
        },
      ],
    });
    this.addDocked(toolbar);

    // Verificar si hay comandos disponibles
    var me = this;
    var comboEquipo = this.down("#comboEquipoConfig");
    var comandosStoreVacio =
      !this.comandosStore || this.comandosStore.count() === 0;

    // Si no hay comandos en el store, mostrar combo de equipo para selección
    if (comandosStoreVacio) {
      comboEquipo.show();

      // Usar store de equipos/receptores pasado o crear uno nuevo
      var receptoresStore = this.receptoresStore;
      if (!receptoresStore) {
        receptoresStore = Ext.create("Ext.data.Store", {
          model: "Common.model.ReceptoresSearchModel",
          pageSize: 1000,
          remoteSort: true,
          remoteFilter: true,
          filters: [
            {
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
        receptoresStore.load();
      }
      comboEquipo.bindStore(receptoresStore);

      // Si hay equipo preseleccionado, intentar seleccionarlo y cargar comandos
      if (this.equipo) {
        var idequipo = this.equipo.get
          ? this.equipo.get("rec_iid") || this.equipo.get("pan_ireceptor")
          : this.equipo.rec_iid || this.equipo.pan_ireceptor;
        if (idequipo) {
          comboEquipo.setValue(idequipo);
          me.cargarComandosParaEquipo(this.equipo);
        }
      }

      // Manejar selección de equipo
      comboEquipo.on("select", function (combo, record) {
        me.cargarComandosParaEquipo(record);
      });
    }

    // cargo el store de los comandos y reseteo el combo
    var combo = this.down("#combocomandos");
    if (this.comandosStore) {
      combo.bindStore(this.comandosStore);
      if (combo.getValue()) combo.setValue(combo.getValue());
    }
    // Inserto los campos
    var comando = this.comandosStore
      ? this.comandosStore.findRecord("tcm_iid", combo.getValue())
      : null;
    var fieldset = this.down("#parametros");

    try {
      var configValue = this.record.get("Config");
      var parametros = configValue ? Ext.JSON.decode(configValue) : {};

      // Seteo el icono que me vino en la metadata (o null)
      if (parametros.icon) {
        this.down("#comboIcon").setValue(parametros.icon);
        this.down("#iconImage").setSrc(
          "/Gallery/SmartPanics/Comandos/" + parametros.icon,
        );
      }

      if (parametros.alarma) {
        this.down("#codigoAlarma").setValue(parametros.alarma);
      }

      if (comando && comando.get("tcm_cValores")) {
        fieldset.removeAll();

        var rawJson = comando.get("tcm_cValores");

        try {
          // Primero, evaluar el string como objeto JavaScript
          var jsObject = eval("(" + rawJson + ")"); // ⚠️ Solo usar `eval` si confías en la fuente del JSON

          // Convertir maskRe a una expresión regular válida
          Ext.Array.each(jsObject, function (field) {
            if (field.maskRe && typeof field.maskRe === "string") {
              field.maskRe = new RegExp(field.maskRe.slice(1, -1));
            }
          });

          // Convertir el objeto a JSON válido antes de decodificarlo
          var fixedJson = Ext.encode(jsObject);

          // Decodificar el JSON limpio
          var tcm_cValores = Ext.JSON.decode(fixedJson);

          var fields = 0;
          Ext.Array.each(tcm_cValores, function (field) {
            if (!field._AtSend) {
              fieldset.add(field);
              fields++;
            }
          });

          if (fields > 0) {
            fieldset.show();
          }

          Ext.Object.each(parametros, function (key, value) {
            var field = fieldset.getForm().findField(key);
            if (field) {
              field.setValue(value);
            }
          });
        } catch (jsonError) {
          console.error("Error al parsear JSON corregido:", jsonError);
          console.log("JSON recibido:", rawJson);
        }
      } else {
        fieldset.removeAll();
      }
    } catch (e) {
      console.log("Error en el bloque principal:", e);
    }
  },
});
