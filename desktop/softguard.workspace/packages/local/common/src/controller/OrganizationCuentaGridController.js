Ext.define("Common.controller.OrganizationCuentaGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "MGClientSinEntidadModel",
    "OrganizationCuentaRangoListModel",
    "OrganizationCuentaRangoModel",
    "OrganizationCuentaRangoSearchModel",
  ],
  views: ["OrganizationCuentaGridView", "CuentaRangoFormView"],

  init: function (config) {
    // genero los eventos
    this.control({
      organizationcuentagridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        showservtec: this.onShowServTec,
        cuentaselected: this.onCuentaSelected,
      },
      "organizationcuentagridview button[action=addCuenta]": {
        click: this.onAddCuentaClick,
      },
      "organizationcuentagridview button[action=rango]": {
        click: this.onRangoClick,
      },
      "organizationcuentagridview button[action=delCuenta]": {
        click: this.onRangoDeleteClick,
      },
      "organizationcuentagridview button[action=filterNohabilitadas]": {
        click: this.onNohabilitadasClick,
      },
      "organizationcuentagridview button[action=filterHabilitadas]": {
        click: this.onHabilitadasClick,
      },
      "organizationcuentagridview button[action=filterEnprueba]": {
        click: this.onEnpruebaClick,
      },
      "organizationcuentagridview button[action=removefilter]": {
        click: this.onRemovefilterClick,
      },
      "organizationcuentagridview button[action=filterText]": {
        click: this.onFiltertextClick,
      },
      "organizationcuentagridview button[action=crearCuenta]": {
        click: this.onCrearcuentaClick,
      },
      cuentanewview: {
        objectcreated: this.onCuentaCreated,
      },
    });
  }, // cierro init

  onCuentaCreated: function (view) {
    var record = view.record;
    var grid = view.caller;

    grid.store.load();
    this.onCuentaSelected([record], grid);
  },

  onCrearcuentaClick: function (button, event, options) {
    var grid = button.up("grid");
    var view = button.up("organizationcuentagridview");

    var viewForm = Ext.widget("cuentanewview", {
      caller: view,
      // cue_cnombre: view.record.get('Name'),
      situacion: "Prueba",
      caller: view,
      marca: "(*)",
      organizacionRecord: view.record,
      onCuentaCreated: function () {
        grid.store.load();
      },
    });

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Nueva cuenta",
      width: 450,
      height: 200,
      border: false,
      items: viewForm,
    });
    win.show();
  },

  initView: function (view) {
    var record = view.record;
    view.filters = [
      {
        property: "GetSqlFilter_CuentasByOrganization:Function",
        value: record.get("Id"),
      },
    ];

    if (view.hidebuttons) {
      Ext.Array.each(view.hidebuttons, function (button) {
        view.down(button).hide();
      });
    }

    // Ocultar botón "Nueva Cuenta" - la creación de cuentas desde organización
    // se maneja correctamente con el botón "Crear cuenta" que vincula automáticamente
    var btnNuevaCuenta = view.down('#cuentaCreate');
    if (btnNuevaCuenta) {
      btnNuevaCuenta.hide();
    }

    view.store = Ext.create("Ext.data.Store", {
      model: this.getOrganizationCuentaRangoSearchModelModel(),
      remoteFilter: true,
      filters: view.filters,
      autoload: false,
    });

    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(view.store);
    view.bindStore(view.store);
    view.store.load();
  },

  onAddCuentaClick: function (button, event, options) {
    var view = button.up("organizationcuentagridview");
    var record = view.record;

    /* Debería ser un store con las cuentas libres pero no de MG sino de CS.
        var store = Ext.create('Ext.data.Store', {
            model : this.getMGClientSinEntidadModelModel(),
            remoteFilter: true,
            autoload: false
        });
        */

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Seleccione las cuentas",
      closeAction: "hide",
      itemId: "cuentaWin",
      width: 780,
      height: 550,
      border: true,
      modal: true,
      view: view,
      record,
      items: [
        {
          xtype: "cuentahelperview",
          //multiSelect: true,
          //helperStore: store,
          caller: view,
          selectionEvent: "cuentaselected",
        },
      ],
    });
    win.show();
  },

  onRangoClick: function (button, event, options) {
    var view = button.up("organizationcuentagridview");

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Administración de rangos",
      closeAction: "hide",
      itemId: "cuentaWin",
      width: 350,
      height: 500,
      border: true,
      modal: true,
      view: view,
      items: [
        {
          xtype: "organizationcuentarangoview",
          record: view.record,
        },
      ],
    });
    win.show();
  },

  onRangoDeleteClick: function (button, event, options) {
    var view = button.up("organizationcuentagridview");
    var entidad = view.record;
    var cuenta = view.getSelectionModel().getSelection()[0];
    var controller = this;

    var store = Ext.create("Ext.data.Store", {
      model: this.getOrganizationCuentaRangoListModelModel(),
      remoteFilter: true,
      filters: [
        {
          property: "IdEntidad",
          value: entidad.get("Id"),
        },
        {
          property: "Dealer",
          value: cuenta.get("cue_clinea"),
        },
        {
          property: "CuentaDesde",
          value: cuenta.get("cue_ncuenta"),
        },
        {
          property: "CuentaHasta",
          value: cuenta.get("cue_ncuenta"),
        },
      ],
    });

    store.load({
      callback: function (records, operation) {
        if (records.length > 0) {
          var rangoModel = controller.getOrganizationCuentaRangoModelModel();
          var record = records[0];
          rangoModel.load(record.get("Id"), {
            callback: function (rec, operation, success) {
              if (rec) {
                rec.erase({
                  callback: function (rec_del, operation, success) {
                    if (operation.success) {
                      notify("La cuenta se desasignó con éxito");
                      view.down("pagingtoolbar").doRefresh();
                    }
                  },
                });
              }
            },
          });
          /*record.setProxy(rangoModel.getProxy());
                record.destroy({callback: function(record, operation){
                    if (operation.success){
                        notify('La cuenta se desasignó con éxito');
                        view.down('pagingtoolbar').doRefresh();
                    }
                }});*/
        }
      },
    });
  },

  onItemClick: function (view, record, item, index, e, options) {
    var id = record.get("Id");
    var panel = view.up("#center");
    var title =
      record.get("cue_clinea") +
      "-" +
      record.get("cue_ncuenta") +
      " - " +
      record.get("cue_cnombre");

    title = title.replace(",", "");
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var myLocation =
        "/a/dealer" + "?objectId=" + id + "&autocreateviewport=true";

      var language = myQueryString.Language;

      if (language) {
        myLocation = Ext.String.urlAppend(myLocation, "Language=" + language);
      }

      /* var newTab = Ext.create('Slbf.ux.SimpleIFrame', {
    			title : title,
                translate:false,
                tabConfig: {translate: false},
    			id : id,
    			border : false,
    			src : myLocation,
                tabConfig: {
                    translate: false
                },
    			closable : true
    		});*/
      /* this.application._nameModule = 'Administrator';
            this.application._idModule = this.application.getModuleIdByName(this.application._nameModule);*/

      var storeSecurity = SecurityModulesStore; //Ext.data.StoreManager.lookup('SecurityModulesStore');
      var recordAdministrator = storeSecurity.findRecord(
        "KeyReference",
        "Administrator"
      );
      var recordDealerSearch = storeSecurity.findRecord(
        "KeyReference",
        "WebDealer"
      );

      // false by default
      var forceIdModule = 0;

      if (recordAdministrator && recordAdministrator.get("Available") == true) {
        forceIdModule = recordAdministrator.get("ModuleId"); //ecordAdminsitrator.get('Id')
      } else if (
        recordDealerSearch &&
        recordDealerSearch.get("Available") == true
      ) {
        forceIdModule = recordAdministrator.get("ModuleId"); ////recordDealerSearch.get('Id')
      }

      var newTab = Ext.widget("cuentaview", {
        tabConfig: { translate: false },
        translate: false,
        title: title,
        record: record,
        closable: true,
        objectId: record.get("cue_iid"),
        recordCuenta: record,
        closeAction: "destroy",
        forceIdModule: forceIdModule,
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },

  onCuentaSelected: function (cuentas, view) {
    var entidad = view.record;
    view.cuentasAsignando = cuentas.length ?? 1;

    Ext.Array.each(cuentas, function (cuenta, index) {
      var record = {
        Id: 0,
        Name: entidad.get("Name"),
        IdEntidad: entidad.get("Id"),
        Dealer: cuenta.get("cue_clinea"),
        CuentaDesde: cuenta.get("cue_ncuenta"),
        CuentaHasta: cuenta.get("cue_ncuenta"),
      };

      Ext.Ajax.request({
        url: `/Rest/DealerRango/0?_dc=${new Date().getTime()}`,
        method: "PUT",
        jsonData: record,
        success: function (resp, operation) {
          notify("La cuenta se asocio con éxito");
          view.down("pagingtoolbar").doRefresh();
        },
      });

      /*
            if (index == (cuentas.length-1)){
                record.save({callback:function(){
                    view.down('pagingtoolbar').doRefresh();
                }});
            }else{
                record.save();
            }*/
    });
  },

  onShowServTec: function (record, view) {
    var id = record.get("Id");
    var panel = view.up("#center");
    var title =
      record.get("cue_clinea") +
      "-" +
      record.get("cue_ncuenta") +
      " - " +
      record.get("cue_cnombre") +
      " (" +
      getLocale("Servicios") +
      ")";

    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("servtecgridview", {
        tabConfig: { translate: false },
        title: title,
        record: record,
        closable: true,
        closeAction: "destroy",
      });
      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },

  // BUSCADORES

  onNohabilitadasClick: function (button, event, options) {
    var view = button.up("organizationcuentagridview");
    var store = view.getStore();
    var filters = Ext.Array.clone(view.filters);
    filtes.add({ property: "tip_nCondicion", value: 1, id: "tip_nCondicion" });
    store.currentPage = 1;
    store.filter(filters);
    view.down("#query").setValue("");
  },

  onHabilitadasClick: function (button, event, options) {
    var view = button.up("organizationcuentagridview");
    var store = view.getStore();
    store.filters.clear(false);
    store.currentPage = 1;
    store.filter([
      { property: "Situacion", value: "Habilitada" },
      { property: "tip_nCondicion", value: 1, id: "tip_nCondicion" },
    ]);
    view.down("#query").setValue("");
  },

  onEnpruebaClick: function (button, event, options) {
    var view = button.up("organizationcuentagridview");
    var store = view.getStore();
    store.filters.clear();
    store.currentPage = 1;
    store.filter([
      { property: "Situacion", value: "En Prueba" },
      { property: "tip_nCondicion", value: 1, id: "tip_nCondicion" },
    ]);
    view.down("#query").setValue("");
  },

  onRemovefilterClick: function (button, event, options) {
    var view = button.up("organizationcuentagridview");
    var store = view.getStore();
    var filters = Ext.Array.clone(view.filters);
    store.filters.clear(false);
    store.currentPage = 1;
    store.filter(filters);
  },

  onFiltertextClick: function (button, event, options) {
    var view = button.up("organizationcuentagridview");
    var store = view.getStore();
    var query = view.down("#query");
    var queryType = view.down("#queryType");
    var filters = Ext.Array.clone(view.filters);
    store.filters.clear(false);
    store.currentPage = 1;

    if (queryType.getValue() == "Dealer-Cuenta" && query.getValue()) {
      var valores = query.getValue().split("-");
      filters.push({ property: "cue_ncuenta", value: valores[1] });
      filters.push({ property: "cue_clinea", value: valores[0] });
    } else {
      if (query.getValue())
        filters.push({
          property: queryType.getValue(),
          value: query.getValue(),
        });
    }
    store.filter(filters);
  },
});
