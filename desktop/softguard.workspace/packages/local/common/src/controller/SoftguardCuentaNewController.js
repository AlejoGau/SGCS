Ext.define("Common.controller.SoftguardCuentaNewController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.TablaLineasStore"],
  models: [
    "SoftguardCuentaModel",
    "TablasTiposSearchModel",
    "CuentaSearchModel",
  ],
  views: ["SoftguardCuentaNewView"],

  // Constantes
  CUENTA_PADDING: 4,
  DEFAULT_TIPO_CUENTA: "0,8,12,13",
  DEALER_VIGICONTROL: "_MP",
  TIPO_CUENTA_VIGICONTROL: 5,
  DEFAULT_MOSTRAR: 2,
  DEFAULT_SONIDO: 2,
  DEFAULT_LLAVE: 1,
  DEFAULT_SITUACION_HABILITADA: "habilitada",
  PAGE_SIZE: 1000,
  
  CUENTAS_FENCE: [
    { name: "_SG-CON1", dealer: "_SG", cuenta: "CON1" },
    { name: "_SG-CON2", dealer: "_SG", cuenta: "CON2" },
    { name: "_SG-CON3", dealer: "_SG", cuenta: "CON3" }
  ],

  init: function (config) {
    // genero los eventos
    this.control({
      'cuentanewview button[action="create"]': {
        click: this.saveObject,
      },
      'cuentanewview button[action="cancel"]': {
        click: this.onCancelClick,
      },
      cuentanewview: {
        beforerender: this.initview,
        selectedDealer: this.onSelectedDealer,
      },
      "cuentanewview #dealer": {
        select: this.onDealerSelect,
      },
      "cuentanewview #selectDealer": {
        click: this.onSelectDealer,
      },
    });
  }, // cierro init
  onSelectedDealer: function (value, view) {
    view.down("#dealer").setValue(value.get("lin_ccodigo"));
    Ext.Ajax.request({
      url:
        "/Rest/search/CuentaProximoNumero?cue_clinea=" +
        value.get("lin_ccodigo"),
      method: "GET",
      scope: this,
      success: function (response) {
        var respuesta = Ext.JSON.decode(response.responseText);
        view.down("#cuenta").setValue(respuesta.rows[0].cue_ncuenta);
      },
    });
  },

  onSelectDealer: function (btn) {
    var view = btn.up("cuentanewview");
    var viewHelper = Ext.widget("dealerhelpersimpleview", {
      caller: view,
      simpleSelect: true,
    });
    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Seleccione un dealer",
      width: 450,
      height: 220,
      border: false,
      items: viewHelper,
    });
    win.show();
  },
  initview: function (view) {
    var controller = this;
    var form = view.getForm();
    var fecha = new Date();
    // cambio a hora local
    //fecha.setHours(fecha.getHours()-(fecha.getTimezoneOffset()/60)); // no funcionaba bien.
    var situacion = "";
    if (view.isAdmin || view.isAccount) situacion = controller.DEFAULT_SITUACION_HABILITADA;
    var tipoCuenta = controller.DEFAULT_TIPO_CUENTA;
    var filters = [];
    if (view.createTipo) {
      tipoCuenta = view.createTipo.toString().replace("[", "").replace("]", "");
      filters = [
        {
          property: "tip_nTipo:ININT",
          value: tipoCuenta,
        },
      ];
    }
    //traer store para combo de tipos
    var storeComboTipos = Ext.create("Ext.data.Store", {
      model: this.getTablasTiposSearchModelModel(),
      pageSize: controller.PAGE_SIZE,
      remoteSort: true,
      remoteFilter: true,
      filters: filters,
    });
    view.down("#comboTipos").bindStore(storeComboTipos);
    storeComboTipos.load();
    var record = this.getSoftguardCuentaModelModel().create({
      cue_nmostrar: controller.DEFAULT_MOSTRAR,
      cue_nsonidoul: controller.DEFAULT_SONIDO,
      cue_nllaveul: controller.DEFAULT_LLAVE,
      Situacion: view.situacion ? view.situacion : situacion,
      cue_dfechaalta: fecha,
      cue_dservicio: fecha,
      cue_cnombre: "",
    });
    if (view.organizacionRecord) {
      record.set("cue_cnombre", view.organizacionRecord.get("Name"));
      record.set("cue_ctelefono", view.organizacionRecord.get("Phone"));
      record.set("cue_ccalle", view.organizacionRecord.get("Address"));
      record.set("cue_cemail", view.organizacionRecord.get("Email"));
    }
    view.record = record;
    form.loadRecord(record);
    if (view.fenceOptions) {
      var storeCuentasFence = Ext.create("Ext.data.Store", {});
      storeCuentasFence.add(controller.CUENTAS_FENCE);
      view.down("#cuentasFence").bindStore(storeCuentasFence);
      view.down("#cuentasFence").show();
    }
  },
  onCuentaCreated: function (view) {
    var record = view.record;
    var grid = view.caller ? view.caller : view;
    var paging = grid.down('pagingtoolbar');
    this.onItemClick(grid.getView(), record);
    // paging.moveFirst();
    // paging.doRefresh();
    var store = grid.getStore();
    var filters = [];
    filters.push(grid.filterTipoObj);
    store.filter(filters);
  },
  onItemClick: function (view, record) {
    var id = record.get('Id');
    var cuentagridview = view.up('cuentagridview')
    if (cuentagridview) {
      var panel = cuentagridview.idTargetPanel ? view.up('#' + cuentagridview.idTargetPanel) : view.up('#center');
    } else {
      var panel = view.up('#center');
      cuentagridview = view;
    }
    var title = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');
    title = title
      .replace(/,/g, '')
      .replace(/\[/g, '')
      .replace(/\]/g, '')
      .replace(/#/g, '')
      .replace(/\./g, '')
      .replace(/>/g, '');
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');

    var readonly = false;

    /** se saco por que simpre habilitaba situacion cuando tenia no habilitado
     * if (record.get('Situacion')=="No Habilitado"){
         readonly=true;
     }*/

    if (cuentagridview && cuentagridview.readonly) {
      readonly = true;
    }

    var openView = 'cuentaview';
    if (view.itemDbClickView) {
      openView = view.itemDbClickView;
    } else {
      if (cuentagridview) {
        if (cuentagridview.itemDbClickView != undefined) {
          openView = cuentagridview.itemDbClickView
        }
      }
    }

    if (cuentagridview && cuentagridview.itemDbClickViewType == 'win') {
      var forceIdModule = null;
      if (cuentagridview) {
        forceIdModule = cuentagridview.forceIdModule ? cuentagridview.forceIdModule : null
      }

      var win = Ext.create('Ext.Window', {
        layout: 'fit',
        title: title,
        width: 450,
        height: 300,
        border: false,
        translate: false,
        items: [
          {
            xtype: openView,
            recordCuenta: record,
            caller: view,
            securityId: cuentagridview.securityId,
            nameModule: panel.nameModule,
            forceIdModule: forceIdModule
          }
        ]
      });
      win.show();
    } else {
      if (cuentagridview) {
        forceIdModule = cuentagridview.forceIdModule ? cuentagridview.forceIdModule : null
      }
      if (!mytab) {
        var newTab = Ext.widget(openView, {
          tabConfig: { translate: false },
          title: title,
          objectId: id,
          translate: false,
          closable: true,
          readonly: readonly,
          closeAction: 'destroy',
          recordCuenta: record,
          securityId: cuentagridview ? cuentagridview.securityId : '',
          nameModule: cuentagridview.nameModule,
          forceIdModule: forceIdModule,
          filterTipo: cuentagridview.filterTipo
        });
        panel.add(newTab);
        notify('Los datos se guardaron con éxito');
        panel.setActiveTab(newTab);
      }
      // el existe, lo activo
      else {
        //volver atrás mytab.show();
      }
    }
  },
  saveObject: function (button, event, options) {
    var view = button.up("cuentanewview");
    var myform = view.getForm();
    var record = view.record;
    var win = button.up("window");
    var controller = this;
    if (myform.isValid()) {
      button.disable();
      var campoLinea = myform.findField("cue_clinea");
      var linea = campoLinea.getValue();
      if (linea == "") {
        notify("Es necesario seleccionar un dealer.");
        button.enable();
        return false;
      }
      var campoCuenta = myform.findField("cue_ncuenta");
      value = Ext.String.leftPad(campoCuenta.getValue(), controller.CUENTA_PADDING, "0");
      Ext.Ajax.request({
        url: "/Rest/Search/CuentaByDealerValidate",
        params: { linea: linea, cuenta: value },
        method: "GET",
        scope: this,
        success: function (response) {
          var errors = Ext.JSON.decode(response.responseText);
          if (errors.total) {
            var error = errors.rows[0];
            campoCuenta.markInvalid(error.Descripcion + " cuenta: " + value);
            campoCuenta.textValid = false;
            button.enable();
          } else {
            campoCuenta.clearInvalid();
            campoCuenta.textValid = true;
            if (view.fenceOptions == true && record.get("Id")) {
              var valueCombo = view.down("#cuentasFence").selection;
              var storeCuenta = Ext.create("Ext.data.Store", {
                model: this.getCuentaSearchModelModel(),
                pageSize: 1,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                  {
                    property: "cue_clinea",
                    value: valueCombo.get("dealer"),
                  },
                  {
                    property: "cue_ncuenta",
                    value: valueCombo.get("cuenta"),
                  },
                ],
              });
              storeCuenta.load({
                callback: function (records) {
                  if (records.length > 0) {
                    var record = records[0];
                    Ext.Ajax.request({
                      url: "/Rest/Search/CuentaCopy",
                      params: {
                        setParticionInfo: 0,
                        cue_clinea: campoLinea.getValue(),
                        cue_ncuenta: Ext.String.leftPad(
                          campoCuenta.getValue(),
                          controller.CUENTA_PADDING,
                          "0"
                        ).toUpperCase(),
                        cue_cnombre: myform.findField("cue_cnombre").getValue(),
                        cue_iid: record.get("Id"),
                        skipTabPrincipal: 1,
                        skipTabUsuarios: 1,
                        skipTabContactos: 1,
                        skipTabZonas: 1,
                        skipTabNotas: 1,
                        skipTabHorarios: 1,
                        skipTabInformacionMedica: 1,
                        skipTabNotificaciones: 1,
                        skipTabFalsa: 1,
                        skipTabTest: 1,
                        skipTabPaneles: 1,
                        skipSchedule: 1,
                        skipVideoLink: 1,
                        skipEstadosDinamicos: 1,
                      },
                      method: "GET",
                      scope: this,
                      success: function (response) {
                        notify("Los datos se guardaron con éxito");
                        var json = Ext.JSON.decode(response.responseText);
                        var cuenta = json.rows[0];
                        if (json.total > 0) {
                          view.record = controller
                            .getSoftguardCuentaModelModel()
                            .create(cuenta);
                          controller.onCuentaCreated(view);
                          win.close();
                        }
                      },
                    });
                  } else {
                    notify("No se encontro la cuenta origen.");
                  }
                },
              });
            } else {
              if (myform.isValid()) {
                myform.updateRecord(record);
                if (isNaN(record.get("Id") || record.get("Id") == null)) {
                  record.set("Id", 0);
                }
                record.set(
                  "cue_ncuenta",
                  Ext.String.leftPad(
                    record.get("cue_ncuenta"),
                    controller.CUENTA_PADDING,
                    "0"
                  ).toUpperCase()
                );
                record.set(
                  "cue_cnombre",
                  record.get("cue_cnombre").toUpperCase()
                );
                if (campoLinea.getValue() == controller.DEALER_VIGICONTROL) {
                  record.set("cue_ctipo", controller.TIPO_CUENTA_VIGICONTROL);
                }
                //esto se armo para cuando se crea desde Organizaciones CRM
                if (view.marca) {
                  record.set(
                    "cue_cnombre",
                    view.marca + " " + record.get("cue_cnombre")
                  );
                }
                record.save({
                  win: win,
                  view: view,
                  callback: function (record, operation) {
                    if (operation.success) {
                      var view = operation.view;
                      view.recordCuenta = record;
                      view.record = record;

                      // Dispara evento para que OrganizationCuentaGridController vincule la cuenta a la organización
                      view.fireEvent('objectcreated', view);

                      // Solo llamar a onCuentaCreated si NO estamos creando desde una organización
                      // ya que OrganizationCuentaGridController maneja ese caso a través del evento objectcreated
                      if (!view.organizacionRecord) {
                        controller.onCuentaCreated(view);
                      }
                      win.close();
                    }
                  },
                });
              }
            }
          }
        },
      });
    } else {
      notify("Verifique los datos del formulario");
    }
  },
  onCancelClick: function (button, event, options) {
    myWin = button.up("window");
    myWin.close();
  },

  onDealerSelect: function (combo, records, options) {
    var view = combo.up("cuentanewview");
    var form = view.getForm();
    var cuenta = form.findField("cue_ncuenta");
    var dealer = form.findField("cue_clinea");
    var controller = this;
    var storeCuenta = Ext.create("Ext.data.Store", {
      model: this.getCuentaSearchModelModel(),
      pageSize: 1,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "cue_clinea",
          value: dealer.getValue(),
        },
      ],
      sorters: [
        {
          property: "cue_ncuenta",
          direction: "DESC",
        },
      ],
    });
    storeCuenta.load({
      callback: function (records) {
        var siguiente = controller
          .succ(records[0].get("cue_ncuenta"))
          .toUpperCase();
        if (siguiente != "AAAAA") {
          cuenta.setValue(siguiente);
        } else {
          cuenta.setValue(records[0].get("cue_ncuenta"));
        }
        Ext.Ajax.request({
          url: "/Rest/Search/CuentaByDealerValidate",
          params: { linea: dealer.getValue(), cuenta: cuenta.getValue() },
          method: "GET",
          scope: this,
          success: function (response) {
            var errors = Ext.JSON.decode(response.responseText);
            if (errors.total) {
              var error = errors.rows[0];
              cuenta.markInvalid(
                error.Descripcion + " cuenta: " + cuenta.getValue()
              );
              cuenta.textValid = false;
            }
            cuenta.validate();
          },
        });
      },
    });
    if (dealer.getValue() == controller.DEALER_VIGICONTROL) {
      view.down("#vigicontrol").show();
      view.down("#comboTipos").hide();
      view.down("#comboTipos").setValue(" ");
      view.down("#comboTipos").clearInvalid();
      view.down("#comboTipos").textValid = true;
    } else {
      view.down("#vigicontrol").hide();
      view.down("#comboTipos").show();
      view.down("#comboTipos").setValue(" ");
      //  this.markInvalid("Debe seleccionar un tipo");
      //   this.textValid = false;
    }
  },

  succ: function (input) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz",
      length = alphabet.length,
      result = input,
      i = input.length;
    while (i >= 0) {
      var last = input.charAt(--i),
        next = "",
        carry = false;
      if (isNaN(last)) {
        index = alphabet.indexOf(last.toLowerCase());
        if (index === -1) {
          next = last;
          carry = true;
        } else {
          var isUpperCase = last === last.toUpperCase();
          next = alphabet.charAt((index + 1) % length);
          if (isUpperCase) {
            next = next.toUpperCase();
          }
          carry = index + 1 >= length;
          if (carry && i === 0) {
            var added = isUpperCase ? "A" : "a";
            result = added + next + result.slice(1);
            break;
          }
        }
      } else if (input == 9999) {
        result = "A000";
        break;
      } else {
        next = +last + 1;
        if (next > 9) {
          next = 0;
          carry = true;
        }
        if (carry && i === 0) {
          result = "1" + next + result.slice(1);
          break;
        }
      }
      result = result.slice(0, i) + next + result.slice(i + 1);
      if (!carry) {
        break;
      }
    }
    return result;
  },
});
