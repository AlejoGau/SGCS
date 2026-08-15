Ext.define("AccessControl.controller.p_controlAcceso_IOFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "Common.model.PanelSearchModel",
    "p_controlAcceso_IOModel",
    "p_controlAcceso_IOSearchModel",
    "Common.model.ComandosGpsSearchModel",
    "Common.model.ComandosDispositivoModel",
    "Common.model.ComandoGpsConfigModel",
    "AccessControl.model.m_ProveedorSearchModel",
    "t_controlAcceso_puertaSearchModel"
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
    //--------------------------------
    view.comandosStore = Ext.create("Ext.data.Store", {
      model: "Common.model.ComandosGpsSearchModel",
    });
// --- Resolver proveedor y ajustar combo tipo de autorización ---
var comboTA = view.down('#combotipoautorizacion');
var idAutorizado = record.get('cac_idautorizado');

// Estado inicial: grisado mientras consultamos
if (comboTA) {
  comboTA.setDisabled(true);
  comboTA.setRawValue('Cargando...');
}

// Store de proveedores
var storeProveedor = Ext.create("Ext.data.Store", {
  model: "AccessControl.model.m_ProveedorSearchModel",
  remoteSort: true,
  remoteFilter: true
});

// Si no hay idAutorizado, no consultamos y lo dejamos editable con 0
if (!idAutorizado) {
  record.set('cac_autorizadotipoid', 0);
  if (comboTA) {
    comboTA.setValue(0);
    comboTA.setRawValue('');
    comboTA.setDisabled(false); // habilitado, no es proveedor
  }
} else {
  storeProveedor.setFilters([{ property: "apr_idKey", value: idAutorizado }]);
  storeProveedor.load({
    callback: function (recs, op, success) {
      if (!view || view.destroyed) return;

      var esProveedor = success && recs && recs.length > 0;
      record.set('cac_autorizadotipoid', esProveedor ? 3227 : 0);

      Ext.suspendLayouts();
      if (comboTA) {
        if (esProveedor) {
          // Es proveedor: mantener grisado y mostrar etiqueta
          comboTA.setValue(3227);           // valor interno
          comboTA.setRawValue('Proveedor'); // texto visible
          comboTA.setDisabled(true);
        } else {
          // No es proveedor: habilitar para que el usuario elija
          comboTA.setValue(0);
          comboTA.setRawValue('');
          comboTA.setDisabled(false);
        }
        comboTA.clearInvalid && comboTA.clearInvalid();
      }
      Ext.resumeLayouts(true);
    }
  });
}
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
        console.log('Records->>',records)
        const comando = records[0];
        const comandoIngreso = records[0].get("cap_iIngreso");
        const comandoEgreso = records[0].get("cap_iEgreso");
        const comandoIngreso2 = records[0].get("cap_iIngreso2")
        const comandoEgreso2 = records[0].get("cap_iEgreso2")
        const comandoIngreso3 = records[0].get("cap_iIngreso3")
        const comandoEgreso3 = records[0].get("cap_iEgreso3")
        const comandoIngreso4 = records[0].get("cap_iIngreso4")
        const comandoEgreso4 = records[0].get("cap_iEgreso4")

       

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
          console.log('comandoIngreso',comandoIngreso)
          console.log('comandoIngreso2',comandoIngreso2)
          console.log('comandoIngreso3',comandoIngreso3)
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
        if (comandoIngreso2 != 0) {
          console.log('comandoIngreso2',comandoIngreso2)
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
            console.log('RECORDS PANEL',records)
            const commands = records[0].get("pan_cconfig")
              ? JSON.parse(records[0].get("pan_cconfig")).commands
              : [];
            view.idEquipo = records[0].get("pan_ireceptor");
            view.idmodelo = records[0].get("pan_rpmidkey");
            view.idCuenta = idCuenta;
            view.panel = records[0];

            const ingreso2 = commands.find((command) => {
              console.log('command',command)
              return command.Id == comandoIngreso2;
            });

            let store = view.down("#comandos").getStore();
            if (ingreso2) {
              store.add({
                campo1: ingreso2.Name,
                campo2: ingreso2.Name,
                campo3: ingreso2,
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
        }if (comandoEgreso2 != 0) {
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

            const egreso2 = commands.find((command) => {
              return command.Id == comandoEgreso2;
            });

            let store = view.down("#comandos").getStore();
            if (egreso2) {
              store.add({
                campo1: egreso2.Name,
                campo2: egreso2.Name,
                campo3: egreso2,
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
        if (comandoIngreso3 != 0) {
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

            const ingreso3 = commands.find((command) => {
              return command.Id == comandoIngreso3;
            });

            let store = view.down("#comandos").getStore();
            if (ingreso3) {
              store.add({
                campo1: ingreso3.Name,
                campo2: ingreso3.Name,
                campo3: ingreso3,
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
        if (comandoEgreso3 != 0) {
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

            const egreso3 = commands.find((command) => {
              return command.Id == comandoEgreso3;
            });

            let store = view.down("#comandos").getStore();
            if (egreso3) {
              store.add({
                campo1: egreso3.Name,
                campo2: egreso3.Name,
                campo3: egreso3,
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
        }if (comandoIngreso4 != 0) {
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

            const ingreso4 = commands.find((command) => {
              return command.Id == comandoIngreso4;
            });

            let store = view.down("#comandos").getStore();
            if (ingreso4) {
              store.add({
                campo1: ingreso4.Name,
                campo2: ingreso4.Name,
                campo3: ingreso4,
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
        if (comandoEgreso4 != 0) {
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

            const egreso4 = commands.find((command) => {
              return command.Id == comandoEgreso4;
            });

            let store = view.down("#comandos").getStore();
            if (egreso4) {
              store.add({
                campo1: egreso4.Name,
                campo2: egreso4.Name,
                campo3: egreso4,
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
  onSaveClick: function (button) {
    var view   = button.up("p_controlacceso_ioformview");
    var win    = button.up("window");
    var form   = button.up("form").getForm();
    var record = view.record;

    form.updateRecord(record);

    var idAutorizado = record.get("cac_idautorizado");

    // 1) Store simple filtrando por el autorizado (PK de proveedor = apr_idKey)
    var storeProveedor = Ext.create("Ext.data.Store", {
        model: "AccessControl.model.m_ProveedorSearchModel",
        remoteSort: true,
        remoteFilter: true
    });

    storeProveedor.setFilters([{
        property: "apr_idKey",   // <- este es el campo correcto del modelo proveedor
        value: idAutorizado
    }]);

    // 2) Cargar y decidir 3227 / 0, luego guardar
    storeProveedor.load({
        callback: function (records, operation, success) {
            // si hubo error en la carga, tratamos como "no encontrado"
            var encontrado = success && records && records.length > 0;

            record.set("cac_autorizadotipoid", encontrado ? 3227 : 0);
            record.set("cac_fecha", new Date());

            if (!form.isValid()) {
                notifyError("Revisá los campos requeridos.");
                return;
            }

            record.save({
                scope: this,
                view: view,
                callback: function (rec) {
                    notify("Los datos se guardaron correctamente");
                    if (view.caller) {
                        view.caller.fireEvent("objectchanged", view.caller, rec);
                        if (view.caller.store) view.caller.store.load();
                    }
                    if (win) win.close();
                },
                failure: function () {
                    notifyError("Error al guardar los datos");
                }
            });
        }
    });
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
