Ext.define("Common.controller.OrganizationFormController", {
  extend: "Ext.app.Controller",
  mixins: ["Common.mixin.GeocodeHelper"],
  stores: [
    "Common.store.OrganizationTypeStore",
    "Common.store.OrganizationStatusStore",
    "Common.store.ProvinciasStore",
    "Common.store.GrupoEstadosStore",
  ],
  models: [
    "AdministratorFormModel",
    "DeleteLandingUserModel",
    "RelationModel",
    "OrganizationSearchModel",
    "ProvinciasModel",
    "NameValueIconModel",
    "m_clientes_fcSearchModel",
    "m_clientes_fcModel",
    "t_organizacion_fcSearchModel",
    "Common.model.t_condiciones_pago_fcSearchModel",
    "t_categorias_impositivas_fcSearchModel",
    "Taxo_ComoNosConocioSearchModel",
    "GeographyModel",
    "OrganizationModel",
    "PersonModel",
    "EventModel" /*, 'OrderModel'*/,
  ],
  views: ["Common.view.ClearButton", "Common.view.OrganizationFormView"],

  init: function (config) {
    // genero los eventos

    this.control({
      organizationformview: {
        afterrender: this.initview,
        objectchange: this.onObjectChange,
        destroy: function (view) {
          // Cerrar todas las ventanas hijas abiertas por este formulario
          var wins = Ext.ComponentQuery.query("window");
          wins.forEach(function (win) {
            if (win.view === view && win.isVisible()) {
              win.destroy();
            }
          });
        },
      },
      'organizationformview button[action="save"]': {
        click: this.onSaveClick,
      },
      "organizationformview #deleteDecision": {
        click: this.onDeleteDecisionClick,
      },
      '#decisionWindow button[action="delete"]': {
        click: this.onDeleteClick,
      },
      '#decisionWindow button[action="deleteAll"]': {
        click: this.onDeleteAllClick,
      },
      'organizationformview button[action="map"]': {
        click: this.onMapClick,
      },
      '#mapWindowOrg button[action="posicionar"]': {
        click: this.onPosicionarClick,
      },
      '#mapWindowOrg button[action="save"]': {
        click: this.onMapSaveClick,
      },
      "organizationformview #comboPais": {
        change: this.onCountryChange,
      },
      "organizationformview #cliente": {
        click: this.onClienteClick,
      },
      "organizationformview #organizationtype": {
        select: this.onSelectOrganizationType,
      },
    });
  },

  onSelectOrganizationType: function (combo, record, eOpts) {
    console.log("Record seleccionado: ", record);
    var view = combo.up("organizationformview");

    if (record.get("Value") == "PROV") {
      view.down("#grupoEstado").hide();
      view.down("#status").hide();
      view.down("#comonosconociocombo").hide();
    } else {
      // se activa por pedido en https://softguard.atlassian.net/browse/DK-257
      view.down("#grupoEstado").show();
      view.down("#status").show();
      view.down("#comonosconociocombo").show();
    }
  },

  onObjectChange: function (view, record) {
    var controller = this;
    if (view.up("organizationmgview")) {
      var store = Ext.create("Ext.data.Store", {
        model: controller.getOrganizationSearchModelModel(),
        pageSize: 50,
        filters: [
          {
            property: "Account",
            value: record.get("Id"),
          },
        ],
        remoteSort: true,
        remoteFilter: true,
      }).load({
        callback: function (records) {
          view
            .up("organizationmgview")
            .down("moduletreeview")
            .down("treeview").record = records[0];
        },
      });
    }
  },

  onClienteClick: function (btn) {
    var view = btn.up("organizationformview");
    var controller = this;
    var storeCliente = Ext.create("Ext.data.Store", {
      model: controller.getM_clientes_fcSearchModelModel(),
      remoteFilter: true,
      filters: [
        {
          property: "cli_icodigo_ID",
          value: view.record.get("Account"),
        },
      ],
    }).load({
      callback: function (records) {
        if (records.length <= 0 || view.record.get("Account") == "") {
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
                  "Falta configuracion",
                  "Es necesario tener creadas las las condiciones de pago. Ingrese a AdministratorSearch para crearlas.",
                  function () {}
                );
                return false;
              }
              var recordCliente = controller
                .getM_clientes_fcModelModel()
                .create({
                  Id: 0,
                  cli_cnombre: view.record.get("Name"),
                  cli_cidentificacion: null,
                  cli_ccategoriaimpositiva: null,
                  cli_ivendedor: null,
                  cli_icobrador: null,
                  cli_czona: null,
                  cli_ccallefiscal: view.record.get("Address"),
                  cli_clocalidadfiscal: view.record.get("City"),
                  cli_cprovinciafiscal: view.record.get("State"),
                  cli_ccodigopostalfiscal: view.record.get("Zip"),
                  cli_ccallecobranza: "", //view.record.get('Name'),
                  cli_clocalidadcobranza: view.record.get("City"),
                  cli_cprovinciacobranza: view.record.get("State"),
                  cli_ccodigopostalcobranza: view.record.get("Zip"),
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
                  cli_ctelefono: view.record.get("Phone"),
                  cli_ccontacto: "",
                  cli_cobservacion: null,
                  cli_nsituacion: 1,
                  cli_inumero: 0,
                  cli_nDocCAE: 0,
                  cli_cdatosextra: null,
                });

              var win = Ext.create("Ext.Window", {
                title: getLocale("Información contable"),
                closeAction: "destroy",
                width: 800,
                height: 500,
                layout: "fit",
                border: true,
                modal: true,
                items: [
                  {
                    xtype: "clienteformview",
                    recordCliente: recordCliente,
                    recordOrganizacion: view.record,
                    caller: view,
                  },
                ],
              }).show();
            },
          });
        } else {
          var recordCliente = controller
            .getM_clientes_fcModelModel()
            .load(records[0].get("Id"), {
              callback: function (record) {
                var win = Ext.create("Ext.Window", {
                  title: getLocale("Cliente"),
                  closeAction: "destroy",
                  width: 550,
                  height: 500,
                  border: true,
                  layout: "fit",
                  modal: true,
                  items: [
                    {
                      xtype: "clienteformview",
                      recordCliente: record,
                      recordOrganizacion: view.record,
                      caller: view,
                    },
                  ],
                }).show();
              },
            });
        }
      },
    });
  },

  initview: function (view) {
    var controller = this;

    if (view.hideStatusGroup) {
      view.down("#prestatus").setDisabled(true);
    }

    if (view.enableCliente) {
      view.down("#cliente").show();
    }

    if (view.record.get("Id") == 0) {
      view.down("#cliente").setDisabled(true);
    }

    var comonosconociostore = Ext.create("Ext.data.Store", {
      model: this.getTaxo_ComoNosConocioSearchModelModel(),
      remoteFilter: true,
    });
    view.down("#comonosconociocombo").bindStore(comonosconociostore);
    comonosconociostore.load({
      callback: function () {
        if (view.recordSearch.get("cnc_id") != 0) {
          view
            .down("#comonosconociocombo")
            .setValue(view.recordSearch.get("cnc_id"));
        }
      },
    });

    view.countryStore = Ext.create("Ext.data.Store", {
      model: this.getGeographyModelModel(),
      storeId: "countryStore",
      remoteFilter: true,
      pageSize: 10000,
      sorters: [
        {
          property: "Name",
          direction: "ASC",
        },
      ],
      filters: [
        {
          property: "Parent",
          value: 0,
        },
      ],
    });

    var countryStore = view.countryStore;
    var countryCombo = view.down("#comboPais");
    var stateStore = Ext.create("Ext.data.Store", {
      model: this.getGeographyModelModel(),
      autoLoad: false,
      pageSize: 10000,
      sorters: [
        {
          property: "Name",
          direction: "ASC",
        },
      ],
      remoteFilter: true,
    });

    view.stateStore = stateStore;
    var stateCombo = view.down("#comboProvincia");

    stateCombo.bindStore(stateStore);
    countryCombo.bindStore(view.countryStore);
    countryStore.load({
      callback: function () {
        if (view.record) {
          view.loadRecord(view.record);
          view.down("#nombre").validate();
          if (view.record.get("Country") == "") {
            countryCombo.setValue(countryStore.getAt(0).get("Id"));
          }
          if (view.record.get("Status") == 0) {
            view.down("#prestatus").setValue("inactivo");
          } else if ("1,2,3".indexOf(view.record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("prospecto");
          } else if ("4,5,6".indexOf(view.record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("enventa");
          } else if ("7,8,9".indexOf(view.record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("cliente");
          }

          view.down("#status").setValue(view.record.get("Status"));
        } else {
          controller.loadRecord(view.objectId, view);
        }
      },
    });
    view.storeStatus = deepCloneStore(this.getOrganizationStatusStoreStore());
    view
      .down("#status")
      .bindStore(deepCloneStore(this.getOrganizationStatusStoreStore()));

    if (view.record) {
      if (view.record.get("OrganizationType") == "PROV") {
        view.down("#grupoEstado").hide();
        view.down("#status").hide();
        view.down("#comonosconociocombo").hide();
      }
    }
  },

  loadRecord: function (objectId, view) {
    var countryCombo = view.down("#comboPais");
    var countryStore = view.countryStore;
    record = this.getOrganizationModelModel();
    if (objectId == 0) {
      var now = new Date();
      var myobject = record.create({
        Name: "Nueva Organización",
      });
      myobject.save({
        scope: this,
        callback: function (record, operation) {
          view.record = record;
          view.loadRecord(record);
          view.down("#nombre").validate();

          if (view.record.get("Status") == 0) {
            view.down("#prestatus").setValue("inactivo");
          } else if ("1,2,3".indexOf(view.record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("prospecto");
          } else if ("4,5,6".indexOf(view.record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("enventa");
          } else if ("7,8,9".indexOf(view.record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("cliente");
          }
        },
      });
      countryCombo.setValue(countryStore.getAt(0).get("Id"));
    } else {
      record.load(objectId, {
        callback: function (record, operation) {
          if (operation.success) {
            view.record = record;
            view.loadRecord(record);

            view.down("#nombre").validate();
            if (view.record.get("Status") == 0) {
              view.down("#prestatus").setValue("inactivo");
            } else if ("1,2,3".indexOf(view.record.get("Status")) >= 0) {
              view.down("#prestatus").setValue("prospecto");
            } else if ("4,5,6".indexOf(view.record.get("Status")) >= 0) {
              view.down("#prestatus").setValue("enventa");
            } else if ("7,8,9".indexOf(view.record.get("Status")) >= 0) {
              view.down("#prestatus").setValue("cliente");
            }

            if (view.record.get("Country") == "") {
              countryCombo.setValue(countryStore.getAt(0).get("Id"));
            }
          }
        },
        scope: this,
      });
    }
  },

  onCountryChange: function (combo, newvalue, oldvalue) {
    var view = combo.up("organizationformview");
    var stateCombo = view.down("#comboProvincia");
    var stateStore = stateCombo.getStore();

    stateStore.removeAll();
    if (newvalue)
      stateStore.filter({
        property: "Parent",
        id: "Parent",
        value: newvalue,
      });
  },

  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo

    myform = button.up("form").getForm();
    if (myform.isValid() == false) {
      notifyError("Debe completar los campos obligatorios");
      myform.markInvalid();
      return false;
    }

    view = button.up("organizationformview");
    mymodel = myform.getRecord();

    oldname = mymodel.get("Name");
    myform.updateRecord(mymodel);
    newname = mymodel.get("Name");

    var controller = this;

    delete mymodel.data.cli_icodigo_ID;
    delete mymodel.data.cnc_id;

    // Forzar envio de todos los campos para que el servidor no resetee campos no enviados (ej. Status, Account)
    var proxy = mymodel.getProxy();
    var writer = proxy.getWriter();
    var originalWriteAll = writer.getWriteAllFields();
    writer.setWriteAllFields(true);

    mymodel.save({
      scope: this,
      callback: function (record, operation) {
        writer.setWriteAllFields(originalWriteAll);

        if (operation.wasSuccessful()) {
          view.loadRecord(record);
          view.record = record;

          // Re-establecer Grupo Estado y Estado despues del loadRecord
          if (record.get("Status") == 0) {
            view.down("#prestatus").setValue("inactivo");
          } else if ("1,2,3".indexOf(record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("prospecto");
          } else if ("4,5,6".indexOf(record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("enventa");
          } else if ("7,8,9".indexOf(record.get("Status")) >= 0) {
            view.down("#prestatus").setValue("cliente");
          }
          view.down("#status").setValue(record.get("Status"));

          view.fireEvent("objectchanged", record);
          notify("Los datos se guardaron correctamente");

          if (view.up("organizationview")) {
            view
              .up("organizationview")
              .down("moduletreeview")
              .setDisabled(false);
          } else {
            view
              .up("organizationmgview")
              .down("moduletreeview")
              .setDisabled(false);
            view.down("#cliente").setDisabled(false);
          }

          var organizationview = view.up("organizationview")
            ? view.up("organizationview")
            : view;
          var organizationgridview = view.caller
            .up("tabpanel")
            .down("organizationgridview");

          if (organizationgridview) {
            var paging = organizationgridview.down("pagingtoolbar");
            //paging.moveFirst();
            paging.doRefresh();
          }

          /*if (view.tab){
                        view.tab.setText(mymodel.get('Name'));
                    }*/

          if (organizationview && organizationview.tab) {
            organizationview.tab.setText(mymodel.get("Name"));
          }

          if (view.down("#comonosconociocombo").getValue()) {
            Ext.Ajax.request({
              url: "/Rest/search/Taxo_ObjectTaxonomyInsORUpd",
              params: {
                ObjectType: "Organization",
                ObjectId: record.get("Id"),
                Id: view.down("#comonosconociocombo").getValue(),
              },
              method: "GET",
              success: function (resp, operation) {
                if (resp.responseText) {
                  view.caller.fireEvent(
                    "organizationsave",
                    view.caller,
                    record
                  );
                }
              },
            });
          }

          //si la organizacion no tiene un account aun se la creo
          if (view.record.get("Account") == "" && view.enableCliente == true) {
            var categoriasImpositivasStore = Ext.create("Ext.data.Store", {
              model: this.getT_categorias_impositivas_fcSearchModelModel(),
              pageSize: 50,
              remoteSort: true,
              remoteFilter: true,
            });

            categoriasImpositivasStore.load({
              callback: function (recordCategoriasImpositivas) {
                if (recordCategoriasImpositivas.length <= 0) {
                  Ext.MessageBox.alert(
                    "Falta configuracion",
                    "Es necesario tener creadas las categorias impositivas. Ingrese a AdministratorSearch para crearlas.",
                    function () {}
                  );
                  return false;
                }

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
                        "Falta configuracion",
                        "Es necesario tener creadas las las condiciones de pago. Ingrese a AdministratorSearch para crearlas.",
                        function () {}
                      );
                      return false;
                    }

                    var organizacionFacturadoraStore = Ext.create(
                      "Ext.data.Store",
                      {
                        model:
                          controller.getT_organizacion_fcSearchModelModel(),
                        pageSize: 50,
                        remoteSort: true,
                        remoteFilter: true,
                      }
                    );

                    organizacionFacturadoraStore.load({
                      callback: function (records) {
                        var recordCliente = controller
                          .getM_clientes_fcModelModel()
                          .create({
                            Id: 0,
                            cli_cnombre: view.record.get("Name"),
                            cli_cidentificacion: null,
                            cli_ccategoriaimpositiva:
                              recordCategoriasImpositivas[0].get("cat_ccodigo"),
                            cli_ivendedor: null,
                            cli_icobrador: null,
                            cli_czona: null,
                            cli_ccallefiscal: view.record.get("Address"),
                            cli_clocalidadfiscal: view.record.get("City"),
                            cli_cprovinciafiscal: view.record.get("State"),
                            cli_ccodigopostalfiscal: view.record.get("Zip"),
                            cli_ccallecobranza: view.record.get("Name"),
                            cli_clocalidadcobranza: view.record.get("City"),
                            cli_cprovinciacobranza: view.record.get("State"),
                            cli_ccodigopostalcobranza: view.record.get("Zip"),
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
                            cli_ctelefono: view.record.get("Phone"),
                            cli_ccontacto: "",
                            cli_cobservacion: null,
                            cli_nsituacion: 1,
                            cli_inumero: 0,
                            cli_nDocCAE: 0,
                            cli_cdatosextra: null,
                            cli_iorganizacion: records[0].get("org_icodigo_ID"),
                          })
                          .save({
                            callback: function (recordCliente) {
                              //le asigno el Id  del cliente a la organizacion y queda vinculado
                              view.record.set(
                                "Account",
                                recordCliente.get("Id")
                              );
                              view.record.save({
                                callback: function (record) {
                                  if (view.caller) {
                                    view.caller.fireEvent(
                                      "organizationsave",
                                      view.caller,
                                      record
                                    );
                                    notify(
                                      "Debe definir la empresa facturadora, condicion de pago y categoria impositiva."
                                    );
                                    controller.onClienteClick(button);
                                  }
                                },
                              });
                            },
                          });
                      },
                    });
                  },
                });
              },
            });
          }

          if (view.caller) {
            view.caller.fireEvent("organizationsave", view.caller, record);
          }

          controller.isMasterWebDealer(function (isMaster) {
            if (isMaster && !record.hasrelation) {
              var model = controller.getRelationModelModel();
              var relacion = Ext.create(model, {
                Id: 0,
                ObjectTypeId: "600",
                ObjectTypeName: "",
                RelationObjectTypeId: "600",
                ObjectId: _UserData.Company, //controller.application.UserData.Company,
                RelationObjectId: record.get("Id"),
              });
              relacion.save({
                callback: function (record, operation, success) {
                  if (success) {
                    record.hasrelation = true;
                  }
                },
              });
            }
          });
        } else {
          notifyError("No se permiten nombres de organizacines duplicados");
        }
      },
      button: button,
    });
  },

  isMasterWebDealer: function (callback) {
    var modules = SecurityModulesStore; //var modules = this.getSecurityModulesStoreStore();

    modules.load({
      callback: function () {
        var masterModule = modules.findRecord(
          "KeyReference",
          "MasterWebDealer"
        );

        if (masterModule.get("KeyReference") == "MasterWebDealer") {
          callback(true);
        } else {
          callback(false);
        }
      },
    });
  },

  onDeleteDecisionClick: function (button, event, options) {
    var controller = this;
    var view = button.up("organizationformview");
    var security = view.security;
    var landingName = "";
    var landingCombo = view.down("#comonosconociocombo");
    var hasDeleteAllRight = !!(
      security &&
      security.rights &&
      security.rights.eliminarTodo === true
    );

    if (view.recordSearch && view.recordSearch.get) {
      landingName = view.recordSearch.get("cnc_name") || "";
    } else if (view.record && view.record.get) {
      landingName = view.record.get("cnc_name") || "";
    }

    if (!landingName && landingCombo) {
      landingName = landingCombo.getRawValue() || "";
    }

    var canDeleteAll =
      hasDeleteAllRight &&
      Ext.String.trim(landingName).toLowerCase() === "landing";

    // Limitar a una sola instancia de ventana de decisión
    var existingWin = Ext.ComponentQuery.query("#decisionWindow")[0];
    if (existingWin && existingWin.isVisible()) {
      existingWin.toFront();
      return;
    }
    // Limitar a una sola instancia de ventana de mapa
    var existingWin = Ext.ComponentQuery.query("#mapWindowOrg")[0];
    if (existingWin && existingWin.isVisible()) {
      existingWin.toFront();
      return;
    }
    var geocodeResultStore = Ext.create("Ext.data.Store", {
      fields: ["id", "label", "lat", "lng", "raw"],
    });

    var win = Ext.create("Ext.Window", {
      layout: {
        type: "vbox",
        align: "stretch",
      },
      closeAction: "close", // a proposito por pedido que mantenga las fechas de la ultima busqueda.
      title: "Delete",
      width: 300,
      //height : 100,
      border: false,
      itemId: "decisionWindow",
      caller: view,
      tbar: [
        {
          iconCls: "cancel",
          text: "Cancelar",
          scope: this,
        },
      ],
      items: [
        {
          xtype: "panel",
          fit: 1,
          layout: {
            type: "vbox",
            align: "stretch",
          },
          bodyStyle: "background:#fff; padding:10px;",
          items: [
            {
              xtype: "button",
              iconCls: "icon-delete",
              text: "Eliminar Organización",
              action: "delete",
              scope: this,
              itemId: "delete",
              margin: "0 0 15px 0",
            },
            {
              xtype: "button",
              iconCls: "icon-delete",
              text: "Eliminar Todo",
              action: "deleteAll",
              scope: this,
              itemId: "deleteAll",
              hidden: !canDeleteAll,
            },
          ],
        },
      ],
    });
    // // BC 371734102 : Modificado desde acá para agregar seguridad del Modulo
    // if (security && security != "") {
    //   var rights = security.rights;
    //   var modules = security.modules;
    //   var event = security.modules;

    //   if (rights.eliminarTodo) {
    //     win.down("#deleteAll").show();
    //   }
    // }

    const parentView = view.up() && view.up().up() ? view.up().up() : view;
    parentView.on("close", function () {
      if (win && !win.destroyed) {
        win.close();
      }
    });

    parentView.on(
      "close",
      function () {
        if (win && !win.destroyed) {
          win.close();
        }
      },
      this,
      { single: true }
    );

    var parentTabPanel = parentView.up("tabpanel");

    // Si el view se oculta (p.ej. cambio de card/tab), cerrar la hija
    parentView.on(
      "hide",
      function () {
        if (win && win.isVisible() && !win.destroyed) {
          win.close();
        }
      },
      this
    );

    // Si cambian de tab y el activo NO contiene a `view`, cerrar la hija
    if (parentTabPanel) {
      var onTabChange = function (tp, newCard) {
        // `contains` evita falsos positivos si la misma instancia existe en otro tab (raro, pero seguro)
        if (!newCard || !newCard.contains(view)) {
          if (win && !win.destroyed) win.close();
        }
      };
      parentTabPanel.on("tabchange", onTabChange);
      // Limpieza del listener cuando la ventana hija muere
      win.on("destroy", function () {
        parentTabPanel.un("tabchange", onTabChange);
      });
    }

    win.show();
  },

  onDeleteAllClick: function (button, event, options) {
    var controller = this;
    var wind = button.up("#decisionWindow");
    var view = wind.caller;
    var record = view.record;
    var organizationview = view.up("organizationview");
    var organizationgridview;

    var organizationId = record.get("Id");

    if (organizationview) {
      organizationgridview = organizationview
        .up("tabpanel")
        .down("organizationgridview");
    } else {
      organizationgridview = view.up("tabpanel").down("organizationgridview");
    }

    var deleteLandingUserStore = Ext.create("Ext.data.Store", {
      model: this.getDeleteLandingUserModelModel(),
      autoload: false,
    });

    var filters = [
      {
        property: "udw_empresa",
        value: organizationId,
      },
    ];
    var desktopUserStore = Ext.create("Ext.data.Store", {
      model: this.getAdministratorFormModelModel(),
      remoteFilter: true,
      filters: filters,
      autoload: false,
    });

    Ext.Msg.show({
      title: getLocale("Confirmación"),
      msg: getLocale(
        "Se eliminará la organición correspondiente y todo registro asociado a la misma (cuenta de monitoreo, dispositivos de SmartPanics, usuarios finales). Está seguro que desea avanzar con esta acción?"
      ),
      buttons: Ext.Msg.YESNOCANCEL,
      icon: Ext.Msg.QUESTION,
      fn: function (btn) {
        if (btn === "yes") {
          desktopUserStore.load({
            callback: function (records, operation, success) {
              if (operation.success) {
                if (records.length <= 1) {
                  console.log(records.length);
                  deleteLandingUserStore.load({
                    params: {
                      Id: organizationId,
                    },
                    callback: function (records, operation, success) {
                      if (operation.success) {
                        if (organizationview) {
                          organizationview.close();
                        } else {
                          view.close();
                        }
                        if (organizationgridview) {
                          var paging =
                            organizationgridview.down("pagingtoolbar");
                          paging.doRefresh();
                        }
                        if (view.caller) {
                          view.caller.fireEvent(
                            "organizationdeleted",
                            view.caller
                          );
                        }
                        notify(
                          getLocale(
                            "Se ha eliminado la Organizacion correctamente"
                          )
                        );
                        wind.close();
                      } else {
                        notify(
                          getLocale(
                            "Ha habido un error en eliminar la Organizacion."
                          )
                        );
                      }
                    },
                  });
                } else {
                  Ext.Msg.alert(
                    getLocale("Precausión"),
                    getLocale(
                      "No se puede eliminar la organización correspondiente porque tienen mas de una cuenta de monitoreo asociada."
                    )
                  );
                }
              } else {
                notify(
                  getLocale(
                    "Ha habido un error en validar la Organizacion a ser eliminada."
                  )
                );
              }
            },
          });
        } else if (btn === "no") {
          notify(
            getLocale(
              "Ha cancelado la eliminacion de la organizacion y dependencias."
            )
          );
        } else {
        }
      },
    });
  },

  onDeleteClick: function (button, event, options) {
    var wind = button.up("#decisionWindow");
    var view = wind.caller;
    var record = view.record;
    var organizationview = view.up("organizationview");
    var organizationgridview;
    var controller = this;

    if (organizationview) {
      organizationgridview = organizationview
        .up("tabpanel")
        .down("organizationgridview");
    } else {
      organizationgridview = view.up("tabpanel").down("organizationgridview");
    }

    record.erase({
      failure: function (record, operation) {
        console.log("Delete failed", operation.getError());
        operation.exception = false;
      },
      callback: function (rec, operation, success) {
        if (operation.success) {
          notify("Se eliminó con éxito");
          wind.close();
        } else {
          const updrecord = controller.getOrganizationModelModel();
          updrecord.load(view.record.get("Id"), {
            callback: function (record, operation, success) {
              record.set("Status", 0);
              record.save({
                failure: function (record, operation) {
                  operation.exception = false;
                },
                callback: function (record, operation, success) {
                  if (operation.success) {
                    if (view.caller) {
                      view.caller.fireEvent("refresh", view.caller);
                    }
                    notify(
                      getLocale("La organización se marcó como inactiva.")
                    );
                    wind.close();
                  }
                },
              });
            },
          });
        }

        if (organizationview) {
          organizationview.close();
        } else {
          view.close();
        }

        if (organizationgridview) {
          var paging = organizationgridview.down("pagingtoolbar");
          //paging.moveFirst();
          paging.doRefresh();
        }

        if (view.caller) {
          view.caller.fireEvent("organizationdeleted", view.caller);
        }
      },
    });
  },

  onMapClick: function (button, event, options) {
    // Limitar a una sola instancia de ventana de mapa
    var existingWin = Ext.ComponentQuery.query("#mapWindowOrg")[0];
    if (existingWin && existingWin.isVisible()) {
      existingWin.toFront();
      return;
    }
    var view = button.up("organizationformview");
    var controller = this;
    var myForm = view.getForm();
    var myrecord = myForm.getRecord();
    var provincia = view.down("#comboProvincia").getRawValue();
    var pais = view.down("#comboPais").getRawValue();
    myForm.updateRecord(myrecord);
    var streetField = myForm.findField("Address");
    var cityField = myForm.findField("City");
    var mylat = myrecord.get("AddressLat");
    var myLong = myrecord.get("AddressLong");
    var myAddr = this.buildAddressString(
      streetField ? streetField.getValue() : null,
      cityField ? cityField.getValue() : null,
      provincia,
      pais
    );

    var markerTitle =
      (myrecord && myrecord.get("Name")) || getLocale("Organización");

    // Create the geocode result store
    var geocodeResultStore = Ext.create("Ext.data.Store", {
      fields: ["id", "label", "lat", "lng", "raw"],
    });

    var mappanel = Ext.widget("gmappanel6", {
      zoomLevel: 5,
      width: "100%",
      flex: 1,
      gmapType: "map",
      mapConfOpts: [
        "enableScrollWheelZoom",
        "enableDoubleClickZoom",
        "enableDragging",
      ],
      mapControls: [
        "GSmallMapControl",
        "GMapTypeControl",
        "NonExistantControl",
      ],
      geocodePosition: function (pos) {
        var geocoder = this.getGeocoder();
        if (!geocoder || typeof geocoder.geocode !== "function") {
          return;
        }

        try {
          geocoder.geocode(
            {
              location: pos,
            },
            function (responses, status) {
              if (
                (status === "OK" || status === undefined || status === true) &&
                responses &&
                responses.length > 0
              ) {
                win.responses = responses;
                win.lastGeocodeResult = responses[0];
                controller.updateGeocodeResultCombo(
                  win,
                  mappanel,
                  responses,
                  markerTitle
                );
                controller.updateMapFormFromResult(win, responses[0]);
                return responses;
              }
            }
          );
        } catch (error) {
          console.log("Error al geocodificar la posición", error);
        }
      },
    });
    var win = Ext.create("Ext.Window", {
      layout: {
        type: "vbox",
        align: "stretch",
      },
      title: getLocale("Mapa"),
      closeAction: "hide",
      itemId: "mapWindowOrg",
      width: 550,
      height: 550,
      border: true,
      modal: true,
      view: view,
      tbar: [
        { text: "Posicionar", action: "posicionar" },
        { text: "Guardar", action: "save" },
      ],
      items: [
        {
          xtype: "form",
          itemId: "mapAddress",
          width: "100%",

          items: [
            {
              xtype: "textfield",
              fieldLabel: "Calle",
              value: myForm.findField("Address").getValue(),
              name: "calle",
            },
            {
              xtype: "combo",
              name: "Country",
              itemId: "comboPais",
              store: view.countryStore,
              value: myForm.findField("Country").getValue(),
              queryMode: "local",
              valueField: "Id",
              displayField: "Name",
              lastQuery: "",
              fieldLabel: "País",
              listeners: {
                change: function (combo, newvalue, oldvalue) {
                  var view = combo.up("form");
                  var stateCombo = view.down("#comboProvincia");
                  var stateStore = stateCombo.getStore();

                  stateStore.filter({
                    property: "Parent",
                    id: "Parent",
                    value: newvalue,
                  });
                },
              },
            },
            {
              xtype: "combo",
              fieldLabel: "Provincia / Estado",
              store: view.stateStore,
              name: "provincia",
              value: myForm.findField("State").getValue(),
              //plugins: ['clearbutton'],
              editable: true,
              autoSelect: false,
              forceSelection: false,
              itemId: "comboProvincia",
              valueField: "Id",
              lastQuery: "",
              displayField: "Name",
            },
            {
              xtype: "textfield",
              fieldLabel: "Ciudad",
              value: myForm.findField("City").getValue(),
              name: "localidad",
            },
            {
              xtype: "combo",
              fieldLabel: getLocale("Resultados"),
              itemId: "geocodeResults",
              hidden: true,
              queryMode: "local",
              displayField: "label",
              valueField: "id",
              forceSelection: false,
              store: geocodeResultStore,
              editable: false,
              emptyText: getLocale("Seleccione una coincidencia"),
              listeners: {
                select: function (combo, record) {
                  controller.onGeocodeResultSelect(
                    win,
                    mappanel,
                    record ? record.get("raw") : null,
                    markerTitle
                  );
                },
              },
            },
          ],
        },
        mappanel,
      ],
    });

    win.mapPanel = mappanel;
    win.geocodeResultStore = geocodeResultStore;
    win.initialAddress = myAddr;
    var markerTitle =
      (myrecord && myrecord.get("Name")) || getLocale("Organización");

    var initializeMarker = Ext.bind(function () {
      if (!win || win.destroyed) {
        return;
      }

      var controller = this;
      var activeRecord = (win.view && win.view.record) || myrecord;
      var lat = activeRecord ? activeRecord.get("AddressLat") : null;
      var lng = activeRecord ? activeRecord.get("AddressLong") : null;

      if (this.hasValidCoordinates(lat, lng)) {
        var marker = this.placeMarkerOnMap(
          mappanel,
          parseFloat(lat),
          parseFloat(lng),
          markerTitle
        );
        if (marker) {
          win.mapMarker = marker;
        }
      } else if (myAddr) {
        controller.geocodeAddressForMap(
          mappanel,
          myAddr,
          markerTitle,
          function (success, marker, geocodeResult, status, allResults) {
            if (!win || win.destroyed) {
              return;
            }

            if (success && marker) {
              win.mapMarker = marker;
              win.lastGeocodeResult = geocodeResult;
              controller.updateGeocodeResultCombo(
                win,
                mappanel,
                allResults || (geocodeResult ? [geocodeResult] : []),
                markerTitle
              );
              controller.updateMapFormFromResult(win, geocodeResult);
            } else {
              controller.clearGeocodeResultCombo(win);
            }
          }
        );
      }
    }, this);

    if (mappanel.mapReady) {
      initializeMarker();
    } else {
      mappanel.on("mapready", initializeMarker, this, { single: true });
    }

    win.show();
  },

  onPosicionarClick: function (button, event, options) {
    var win = button.up("#mapWindowOrg");
    var view = win.view;
    var form = win.down("form").getForm();
    var map = win.down("gmappanel6");
    var provinciaField = form.findField("provincia");
    var countryField = form.findField("Country");
    var provincia = provinciaField ? provinciaField.getRawValue() : "";
    var pais = countryField ? countryField.getRawValue() : "";
    var calle = form.findField("calle")
      ? form.findField("calle").getValue()
      : "";
    var localidad = form.findField("localidad")
      ? form.findField("localidad").getValue()
      : "";
    var myAddr = this.buildAddressString(calle, localidad, provincia, pais);
    var markerTitle =
      (view && view.record && view.record.get("Name")) ||
      getLocale("Organización");

    if (!map || !myAddr) {
      notifyError(getLocale("Debe ingresar una dirección para posicionar."));
      return;
    }

    var controller = this;
    button.setDisabled(true);
    controller.geocodeAddressForMap(
      map,
      myAddr,
      markerTitle,
      function (success, marker, geocodeResult, status, allResults) {
        button.setDisabled(false);

        if (!win || win.destroyed) {
          return;
        }

        try {
          if (success && marker) {
            win.mapMarker = marker;
            win.lastGeocodeResult = geocodeResult;
            win.initialAddress = myAddr;
            controller.updateGeocodeResultCombo(
              win,
              map,
              allResults || (geocodeResult ? [geocodeResult] : []),
              markerTitle
            );
            controller.updateMapFormFromResult(win, geocodeResult);
          } else {
            controller.clearGeocodeResultCombo(win);
            var msg =
              status === "ZERO_RESULTS"
                ? getLocale(
                    "No se encontraron coincidencias para la búsqueda ingresada."
                  )
                : getLocale(
                    "No se pudo determinar una ubicación para la dirección indicada."
                  );
            notifyError(msg);
          }
        } catch (error) {
          console.error("Error applying geocode selection", error);
          controller.clearGeocodeResultCombo(win);
          notifyError(
            getLocale("Ocurrió un error al procesar la dirección seleccionada.")
          );
        }
      }
    );
  },

  onMapSaveClick: function (button, event, options) {
    var win = button.up("#mapWindowOrg");
    var view = win.view;
    var form = win.down("form").getForm();
    var map = win.down("gmappanel6");
    var organizationForm = view.getForm();
    var controller = this;

    var latlng = map.getCenterLatLng();
    var latfield = organizationForm.findField("AddressLat");
    var longfield = organizationForm.findField("AddressLong");
    latfield.setValue(latlng.lat);
    longfield.setValue(latlng.lng);

    // If we have a geocode result from "Posicionar", use it directly
    if (win.lastGeocodeResult) {
      var selectedResult = win.lastGeocodeResult;
      var parsed = controller.parseGeocodeResult(selectedResult);
      var calleField = form.findField("calle");
      var ciudadField = form.findField("localidad");
      var fallbackStreet = calleField ? calleField.getValue() : "";
      var fallbackCity = ciudadField ? ciudadField.getValue() : "";

      organizationForm
        .findField("Country")
        .setValue(form.findField("Country").getValue());
      organizationForm
        .findField("State")
        .setValue(form.findField("provincia").getValue());
      var cityField = organizationForm.findField("City");
      if (cityField) {
        cityField.setValue(parsed.city || fallbackCity || cityField.getValue());
      }

      var addressField = organizationForm.findField("Address");
      if (addressField) {
        addressField.setValue(
          parsed.streetLine && parsed.streetLine.trim()
            ? parsed.streetLine
            : fallbackStreet
        );
      }

      var zipField = organizationForm.findField("Zip");
      if (zipField && parsed.postalCode) {
        zipField.setValue(parsed.postalCode);
      }

      notify("Posición establecida. Debe guardar.");
      win.close();
      return;
    }

    // Fallback: do reverse geocoding if no result is available
    var geocoder = map.getGeocoder();
    var center = null;
    if (window.google && google.maps) {
      center = new google.maps.LatLng(latlng.lat, latlng.lng);
    }

    if (!geocoder || typeof geocoder.geocode !== "function" || !center) {
      notifyError(getLocale("No se pudo confirmar la dirección seleccionada."));
      return;
    }

    geocoder.geocode(
      {
        location: center,
      },
      function (responses, status) {
        if (
          (status === "OK" || status === undefined || status === true) &&
          responses &&
          responses.length > 0
        ) {
          var selectedResult = responses[0];
          var parsed = controller.parseGeocodeResult(selectedResult);
          var calleField = form.findField("calle");
          var ciudadField = form.findField("localidad");
          var fallbackStreet = calleField ? calleField.getValue() : "";
          var fallbackCity = ciudadField ? ciudadField.getValue() : "";

          organizationForm
            .findField("Country")
            .setValue(form.findField("Country").getValue());
          organizationForm
            .findField("State")
            .setValue(form.findField("provincia").getValue());
          var cityField = organizationForm.findField("City");
          if (cityField) {
            cityField.setValue(
              parsed.city || fallbackCity || cityField.getValue()
            );
          }

          var addressField = organizationForm.findField("Address");
          if (addressField) {
            addressField.setValue(
              parsed.streetLine && parsed.streetLine.trim()
                ? parsed.streetLine
                : fallbackStreet
            );
          }

          var zipField = organizationForm.findField("Zip");
          if (zipField && parsed.postalCode) {
            zipField.setValue(parsed.postalCode);
          }

          notify("Posición establecida. Debe guardar.");
          win.close();
        } else {
          notifyError(
            getLocale(
              "No se pudo obtener la información geográfica de la posición actual."
            )
          );
        }
      }
    );
  },

  // --- Map helpers -------------------------------------------------------

  buildAddressString: function () {
    var parts = Array.prototype.slice.call(arguments);

    if (parts.length === 1 && Ext.isArray(parts[0])) {
      parts = parts[0];
    }

    return parts
      .map(function (value) {
        return value != null ? String(value).trim() : "";
      })
      .filter(function (value) {
        return value.length > 0;
      })
      .join(", ");
  },

  hasValidCoordinates: function (lat, lng) {
    var latNum = parseFloat(lat);
    var lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      return false;
    }

    return latNum !== 0 || lngNum !== 0;
  },

  normalizeGeocodeLocation: function (location) {
    if (!location) {
      return null;
    }

    var latValue = null;
    var lngValue = null;

    if (typeof location.lat === "function") {
      latValue = location.lat();
    } else if (typeof location.latitude === "function") {
      latValue = location.latitude();
    } else if (typeof location.lat !== "undefined") {
      latValue = location.lat;
    } else if (typeof location.latitude !== "undefined") {
      latValue = location.latitude;
    }

    if (typeof location.lng === "function") {
      lngValue = location.lng();
    } else if (typeof location.lon === "function") {
      lngValue = location.lon();
    } else if (typeof location.lng !== "undefined") {
      lngValue = location.lng;
    } else if (typeof location.lon !== "undefined") {
      lngValue = location.lon;
    } else if (typeof location.longitude !== "undefined") {
      lngValue = location.longitude;
    }

    var latNum = parseFloat(latValue);
    var lngNum = parseFloat(lngValue);

    if (isNaN(latNum) || isNaN(lngNum)) {
      return null;
    }

    return {
      lat: latNum,
      lng: lngNum,
    };
  },

  placeMarkerOnMap: function (mapPanel, lat, lng, title) {
    if (!mapPanel || !window.google || !google.maps) {
      return null;
    }

    var map = mapPanel.getMap ? mapPanel.getMap() : null;
    if (!map) {
      return null;
    }

    var position = new google.maps.LatLng(lat, lng);

    if (mapPanel.__organizationMarker) {
      google.maps.event.clearInstanceListeners(mapPanel.__organizationMarker);
      mapPanel.__organizationMarker.setMap(null);
    }

    if (mapPanel.cache && Ext.isArray(mapPanel.cache.marker)) {
      Ext.Array.each(mapPanel.cache.marker, function (marker) {
        marker.setMap(null);
      });
      mapPanel.cache.marker = [];
    }

    var marker = new google.maps.Marker({
      position: position,
      draggable: true,
      title: title || "",
      optimized: false,
    });

    marker.setMap(map);

    google.maps.event.addListener(marker, "dragend", function (evt) {
      map.setCenter(evt.latLng);
    });

    mapPanel.__organizationMarker = marker;
    if (mapPanel.cache) {
      mapPanel.cache.marker = [marker];
    }

    map.setCenter(position);
    if (map.getZoom() < 14) {
      map.setZoom(14);
    }

    return marker;
  },

  geocodeAddressForMap: function (mapPanel, address, title, callback) {
    if (!mapPanel || !address) {
      Ext.callback(callback, this, [false, null, null, "NO_ADDRESS"]);
      return;
    }

    var geocoder = mapPanel.getGeocoder ? mapPanel.getGeocoder() : null;
    if (!geocoder || typeof geocoder.geocode !== "function") {
      Ext.callback(callback, this, [false, null, null, "NO_GEOCODER"]);
      return;
    }

    try {
      geocoder.geocode(
        {
          address: address,
        },
        Ext.bind(function (results, status) {
          var success =
            (status === "OK" || status === undefined || status === true) &&
            results &&
            results.length > 0;

          if (success) {
            var coords = this.normalizeGeocodeLocation(
              results[0].geometry ? results[0].geometry.location : null
            );

            if (coords) {
              var marker = this.placeMarkerOnMap(
                mapPanel,
                coords.lat,
                coords.lng,
                title
              );

              mapPanel.__lastGeocodeResult = results[0];
              Ext.callback(callback, this, [
                true,
                marker,
                results[0],
                status,
                results,
              ]);
              return;
            }
          }

          Ext.callback(callback, this, [
            false,
            null,
            results ? results[0] : null,
            status,
            results,
          ]);
        }, this)
      );
    } catch (error) {
      console.log("Error al solicitar la geocodificación", error);
      Ext.callback(callback, this, [false, null, null, "EXCEPTION"]);
    }
  },

  openObjectTab: function (targetTab, object) {
    var objectId = object.get("Id");
    var objectTypeName = object.get("ObjectTypeName");
    var title = object.get("Name");
    var container = objectTypeName.toLowerCase() + "view";
    var newTab = Ext.widget(container, {
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
