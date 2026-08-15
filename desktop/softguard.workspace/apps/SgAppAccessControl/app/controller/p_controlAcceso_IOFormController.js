Ext.define("SgAppAccessControl.controller.p_controlAcceso_IOFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "Common.model.PanelSearchModel",
    "p_controlAcceso_IOModel",
    "Common.model.ComandosGpsSearchModel",
    "Common.model.ComandosDispositivoModel",
    "Common.model.ComandoGpsConfigModel",
  ],
  views: ["p_controlAcceso_IOFormView", "Common.view.ComandoGpsSendView"],

  init: function (config) {
    // genero los eventoss
    this.control({
      p_controlacceso_ioformview: {
        afterrender: this.initview,
      },
      'p_controlacceso_ioformview button[action="save"]': {
        click: this.onSaveClick,
      },
      "p_controlacceso_ioformview #combopuerta": {
        change: "onComboPuertaChange",
      },
    });
  }, // cierro init

  initview: function (view) {
    const controller = this;
    let record = view.record;
    view.loadRecord(record);
    view.setWidth(500);
    view.setHeight(400);
    //-------en esta sección se agrega código para los casos de accesos de autorizaciones múltiples
    view.selectionJson = Ext.JSON.encode(view.selection);
    //--------------------------------
    view.comandosStore = Ext.create("Ext.data.Store", {
      model: "Common.model.ComandosGpsSearchModel",
    });

    /**
     * Daniel O. Medina
     * para desabilitar el combo de tipo de acceso
     * si se llama desde Invitaciones Vigentes
     * https://basecamp.com/2249105/projects/17543484/todos/421862631
     */
    if (view.disableComboIO == true) {
      view.down("#combotipoacceso").disable();
    }
    /********************************* */

    if (view.hideAutorizadoTipo == true) {
      view.down("#combotipoautorizacion").hide();
    }

    if (view.hideTipoAcceso == true) {
      view.down("#combotipoacceso").hide();
    }

    var storePuerta = Ext.create("Ext.data.Store", {
      model: Ext.create("Common.model.t_controlAcceso_puertaSearchModel"),
      pageSize: 999,
      remoteSort: true,
      remoteFilter: true,
      filters: view.filters,
      sorters: [
        {
          property: "cap_nombre",
          direction: "DESC",
        },
      ],
    });
    view.down("#combopuerta").bindStore(storePuerta);

    storePuerta.load();
  },

  onComboPuertaChange: function (combo, newValue, oldValue, eOpts) {
    const view = combo.up();
    let hayStore = view.down("#comandos");
    if (hayStore) {
      hayStore.destroy();
    }
    const controller = this;
    var storePuerta = Ext.create("Ext.data.Store", {
      model: Ext.create("Common.model.t_controlAcceso_puertaSearchModel"),
      pageSize: 999,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "cap_iid",
          value: newValue,
        },
      ],
      sorters: [
        {
          property: "cap_nombre",
          direction: "DESC",
        },
      ],
    });

    storePuerta.load(function (records) {
      if (records.length) {
        const comando = records[0];
        const comandoIngreso = records[0].get("cap_iIngreso");
        const comandoEgreso = records[0].get("cap_iEgreso");

        if (comandoIngreso || comandoEgreso) {
          const gridcomandos = Ext.create("Ext.grid.Panel", {
            itemId: "comandos",
            columns: [
              { text: "Nombre", dataIndex: "campo1" },
              {
                text: "Icono",
                dataIndex: "campo2",
                renderer: function (value, metadata, record) {
                  let result = "";
                  try {
                    const parametros = Ext.JSON.decode(
                      record.get("campo3").Config
                    );
                    if (parametros.icon) {
                      result =
                        '<img src="/Gallery/SmartPanics/Comandos/' +
                        parametros.icon +
                        '" width="16" heigth="16" style="background-color:GRAY" >';
                    }
                  } catch (e) {
                    console.log();
                  } finally {
                    return result;
                  }
                },
                flex: 1,
              },
              {
                xtype: "actioncolumn",
                header: "Acciones",
                itemId: "acciones",
                width: 80,
                items: [
                  {
                    iconCls: "icon-ipod-cast",
                    tooltip: "Enviar comando",
                    handler: function (grid, rowIndex, colIndex, item, event) {
                      var view = grid.up("p_controlacceso_ioformview");
                      var rec = grid.getStore().getAt(rowIndex);
                      controller.onEnviarComando(rec.get("campo3"), view);
                    },
                  },
                ],
              },
            ],
            store: {
              data: [],
            },
            height: 200,
            width: 480,
          });
          if (!view.down("#comandos")) {
            view.add(gridcomandos);
          }
        }
        const idCuenta = records[0].get("cap_idCta");

        if (comandoIngreso != 0) {
          var equipoStore = Ext.create("Ext.data.Store", {
            model: "Common.model.PanelSearchModel",
            remoteSort: true,
            remoteFilter: true,
            filters: [
              {
                property: "pan_iidcuenta",
                value: idCuenta,
              },
            ],
          });

          equipoStore.load(function (records) {
            const commands = records[0].get("pan_cconfig")
              ? JSON.parse(records[0].get("pan_cconfig")).commands
              : [];
            view.idEquipo = records[0].get("pan_ireceptor");
            view.idmodelo = records[0].get("pan_rpmidkey");
            view.idCuenta = idCuenta;
            view.panel = records[0];

            const ingreso = commands.find(
              (command) => command.Id == comandoIngreso
            );

            let store = view.down("#comandos").getStore();
            if (ingreso) {
              store.add({
                campo1: ingreso.Name,
                campo2: ingreso.Name,
                campo3: ingreso,
              });
            }

            if (records.length > 0) {
              var i = 0;
              while (
                records.length > i &&
                records[i].get("rec_cdescripcion") == ""
              ) {
                i++;
              }

              if (i > 0) {
                controller.setRecord(records[i - 1], view, controller);
              } else {
                controller.setRecord(records[i], view, controller);
              }
            } else {
              var model = "Common.model.ComandosDispositivoModel";
              var equipo = Ext.create(model, {
                idCuenta: view.idCuenta,
              });

              controller.setRecord(equipo, view, controller);
            }
          });
        }

        if (comandoEgreso != 0) {
          var equipoStore = Ext.create("Ext.data.Store", {
            model: "Common.model.PanelSearchModel",
            remoteSort: true,
            remoteFilter: true,
            filters: [
              {
                property: "pan_iidcuenta",
                value: idCuenta,
              },
            ],
          });

          equipoStore.load(function (records) {
            const commands = records[0].get("pan_cconfig")
              ? JSON.parse(records[0].get("pan_cconfig")).commands
              : [];
            view.idEquipo = records[0].get("pan_ireceptor");
            view.idmodelo = records[0].get("pan_rpmidkey");
            view.idCuenta = idCuenta;
            view.panel = records[0];

            const egreso = commands.find((command) => {
              return command.Id == comandoEgreso;
            });

            let store = view.down("#comandos").getStore();
            if (egreso) {
              store.add({
                campo1: egreso.Name,
                campo2: egreso.Name,
                campo3: egreso,
              });
            }

            if (records.length > 0) {
              var i = 0;
              while (
                records.length > i &&
                records[i].get("rec_cdescripcion") == ""
              ) {
                i++;
              }

              if (i > 0) {
                controller.setRecord(records[i - 1], view, controller);
              } else {
                controller.setRecord(records[i], view, controller);
              }
            } else {
              var model = "Common.model.ComandosDispositivoModel";
              var equipo = Ext.create(model, {
                idCuenta: view.idCuenta,
              });

              controller.setRecord(equipo, view, controller);
            }
          });
        }
      }
    });
  },
  setRecord: function (record, view, controller) {
    var idequipo = record.get("idEquipo");
    var idmodelo, idNvoModelo;
    view.panel = record;

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

    view.comandosStore = Ext.create("Ext.data.Store", {
      model: "Common.model.ComandosGpsSearchModel",
    });

    //view.down("#comboequipos").setValue(idequipo);

    if (view.idEquipo) {
      // cargo los comandos del equipo (maestro)
      view.comandosStore.load({
        params: {
          Id: view.idEquipo,
          idmodelo: view.idmodelo,
          idNvoModelo: idNvoModelo,
        },
        callback: function (records) {
          controller.loadVehicleCommands(record, view, controller);
          view.comandosStore.add({
            tcm_iid: null,
          });
          if (records.length <= 0) {
            // Leo me pido volver al notify
            notify("El equipos no tiene integrado el envío de comandos.");
            view.getEl().mask();
          }
        },
      });
    } else {
      controller.loadVehicleCommands(record, view, controller);
    }
  },
  onEnviarComando: function (record, view) {
    var comboEquipoText = "";
    var profile = "3";

    const win = Ext.create("Ext.window.Window", {
      title: getLocale("Enviar comando") + ": " + record.Name,
      height: 300,
      translate: false,
      closeAction: "destroy",
      width: 400,
      layout: "fit",
      items: {
        // Let's put an empty grid in just to illustrate fit layout
        xtype: "comandogpssendview",
        record: record,
        idCuenta: view.idCuenta,
        profile: profile,
        vehicle: view.record,
        equipo: view.equipo,
        panel: view.panel,
        comandosStore: view.comandosStore,
        equipoText: comboEquipoText,
      },
    });
    win.show();
  },
  onSaveClick: function (button, event, options) {
    var myform = button.up("form").getForm();
    var view = button.up("p_controlacceso_ioformview");
    var win = button.up("window");
    var record = view.record;

    myform.updateRecord(record);

    if (myform.isValid()) {
      if (view.selectionJson) {
        /**
     * 
     * alter Procedure [dbo].[p_controlAcceso_IOBulkIns]
@autorizaciones_json NVarchar (max) = '',
@cac_idpuerta int = 0,
@cac_autorizatipo int = 0,
@cac_cobservacion NVarchar (max) = '',
@cac_autorizaid int --- es el Id del usuario logueado
     */
        Ext.Ajax.request({
          url: "/Rest/search/p_controlAcceso_IOBulkIns",
          method: "GET",
          params: {
            autorizaciones_json: view.selectionJson,
            cac_idpuerta: view.down("#combopuerta").getValue(),
            cac_autorizatipo: 3,
            cac_cobservacion: view.down("#cac_cobservacion").getValue(),
            cac_autorizaid: _UserData.udw_idKey,
          },
          success: function (response) {
            var win = view.up("window");
            if (view.caller)
              view.caller.fireEvent("objectchanged", view.caller, record);

            notify("Los datos se guardaron correctamente");
            win.close();
          },
        });
      } else {
        record.set("cac_fecha", new Date());
        record.save({
          scope: this,
          view: view,
          callback: function (record, operation) {
            //if (operation.success) {
            //var win = view.up('window');
            notify("Los datos se guardaron correctamente");
            view.caller.fireEvent("objectchanged", view.caller, record);
            view.caller.store.load();
            win.close();
            //} else {
            //    notifyError('Hubo un error al guardar los datos');
            //}
          },
          button: button,
        });
      }
    }
  },
  loadVehicleCommands: function (record, view, controller) {
    //Cargo los comandos existentes (ya configurados)
    const store = Ext.create("Ext.data.Store", {
      model: "Common.model.ComandoGpsConfigModel",
    });

    if (record.get("Config")) {
      store.loadData(Ext.JSON.decode(record.get("Config")));
    } else if (record.get("pan_cconfig")) {
      view.pan_cconfig = Ext.JSON.decode(record.get("pan_cconfig"));
      if (view.pan_cconfig.commands) {
        store.loadData(view.pan_cconfig.commands);
      } else {
        store.loadData(view.pan_cconfig);
      }
    }

    view.equipo = record;
    view.loadRecord(record);

    if (record.get("idEquipo") == 0) {
      view.down("#comboequipos").setValue(null);
    }
  },
});
