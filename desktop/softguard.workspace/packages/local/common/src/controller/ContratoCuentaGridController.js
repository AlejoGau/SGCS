Ext.define("Common.controller.ContratoCuentaGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "CuentaSearchModel",
    "OrganizationCuentaRangoSearchModel",
    "RelationModel",
    "RelationSearchFilterModel",
  ],
  views: ["ContratoCuentaGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      contratocuentagridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        cuentaselected: this.onCuentaSelected,
      },
      "contratocuentagridview button[action=addCuenta]": {
        click: this.onAddCuentaClick,
      },
      "contratocuentagridview button[action=delCuenta]": {
        click: this.onDelCuentaClick,
      },
      "contratocuentagridview button[action=removefilter]": {
        click: this.onRemovefilterClick,
      },
      "contratocuentagridview button[action=filterText]": {
        click: this.onFiltertextClick,
      },
    });
  }, // cierro init

  initView: function (view) {
    var record = view.record;
    var parentId = 0;
    if (typeof record.get("Id") === "number" && isFinite(record.get("Id"))) {
      parentId = record.get("Id");
    }

    // Deshabilitar botones si el contrato no está guardado
    if (parentId == 0) {
      var btnAdd = view.down('button[action=addCuenta]');
      if (btnAdd) btnAdd.setDisabled(true);
      var btnDel = view.down('button[action=delCuenta]');
      if (btnDel) btnDel.setDisabled(true);
      return;
    }

    view.filters = [
      {
        property: "crm_contrato:RelationParent",
        value: parentId,
        id: "IdContrato",
      },
    ];

    if (view.hidebuttons) {
      Ext.Array.each(view.hidebuttons, function (button) {
        view.down(button).hide();
      });
    }

    view.store = Ext.create("Ext.data.Store", {
      model: this.getCuentaSearchModelModel(),
      remoteFilter: true,
      filters: view.filters,
      autoload: false,
    });

    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(view.store);
    view.bindStore(view.store);
    if (parentId != 0) {
      view.store.load();
    }
  },

  onDelCuentaClick: function (button) {
    var controller = this;
    var view = button.up("contratocuentagridview");
    var contrato = view.record;
    var selected = view.getSelectionModel().lastSelected;

    if (!selected) return;

    // Check if contract is saved
    if (contrato.phantom || !contrato.get("Id") || contrato.get("Id") == 0) {
      notify(
        "El contrato no está guardado, no hay cuentas asignadas para eliminar."
      );
      return;
    }

    // busco la relacion a eliminar
    var searchStore = Ext.create("Ext.data.Store", {
      model: controller.getRelationSearchFilterModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      autoDestroy: true,
      filters: [
        {
          property: "ObjectId",
          value: contrato.get("Id"),
          id: "ObjectId",
        },
        {
          property: "ObjectTypeId",
          value: contrato.get("ObjectTypeId"),
          id: "ObjectTypeId",
        },
        {
          property: "RelationObjectId",
          value: selected.get("cue_iid"),
          id: "ObjectTypeId",
        },
      ],
    });

    searchStore.load({
      callback: function (records) {
        if (records && records.length > 0) {
          controller.deleteRelation(records[0], view);
        }
      },
    });
  },

  deleteRelation: function (record, view) {
    var controller = this;
    var relationModel = controller.getRelationModelModel();

    relationModel.load(record.get("Id"), {
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
  },

  onAddCuentaClick: function (button, event, options) {
    var view = button.up("contratocuentagridview");
    var helperStore = this.createHelperStore(view);
    this.openAccountSelectionWindow(view, helperStore);
  },

  createHelperStore: function (view) {
    return view.helperStore
      ? view.helperStore
      : Ext.create("Ext.data.Store", {
          model: this.getOrganizationCuentaRangoSearchModelModel(),
          pageSize: 50,
          remoteSort: true,
          remoteFilter: true,
          autoDestroy: true,
          sorters: [
            {
              property: "cue_ncuenta",
              direction: "ASC",
            },
          ],
        });
  },

  openAccountSelectionWindow: function (view, helperStore) {
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
      items: [
        {
          xtype: "cuentahelperview",
          helperStore: helperStore,
          hidebuttons: [
            "#fallotst",
            "#filterNohabilitadas",
            "#filterHabilitadas",
            "#filterEnprueba",
            "#particiones",
          ],
          caller: view,
          selectionEvent: "cuentaselected",
        },
      ],
    });
    win.show();
  },

  onItemClick: function (view, record, item, index, e, options) {
    var panel = view.up("#center");
    this.openAccountTab(record, panel);
  },

  openAccountTab: function (record, panel) {
    var id = record.get("Id");
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
      var forceIdModule = null;
      var storeSecurity = SecurityModulesStore;
      var recordAdminsitrator = storeSecurity.findRecord(
        "KeyReference",
        "Administrator"
      );
      var recordDealerSearch = storeSecurity.findRecord(
        "KeyReference",
        "WebDealer"
      );

      if (recordAdminsitrator && recordAdminsitrator.get("Available") == true) {
        forceIdModule = recordAdminsitrator.get("Id");
      } else if (
        recordDealerSearch &&
        recordDealerSearch.get("Available") == true
      ) {
        forceIdModule = recordDealerSearch.get("Id");
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
    var contrato = view.record;
    var model = this.getRelationModelModel();

    // Fix: Ensure cuentas is an array (it might be a single record)
    if (!Ext.isArray(cuentas)) {
      cuentas = [cuentas];
    }

    // Check if contract is saved
    if (contrato.phantom || !contrato.get("Id") || contrato.get("Id") == 0) {
      notify("Debe guardar el contrato antes de asignar cuentas.");
      return;
    }

    view.cuentasAsignando = cuentas.length;

    Ext.Array.each(cuentas, function (cuenta, index) {
      var record = Ext.create(model, {
        Id: 0,
        ObjectTypeId: contrato.get("ObjectTypeId"),
        ObjectTypeName: contrato.get("ObjectTypeName"),
        RelationObjectTypeId: "3001", // cuenta
        ObjectId: contrato.get("Id"),
        RelationObjectId: cuenta.get("Id"),
      });

      record.save({
        callback: function (record, operation, success) {
          view.cuentasAsignando--;
          if (view.cuentasAsignando < 1) {
            if (operation.success) {
              notify("Las cuentas se asignaron con éxito");
              view.down("pagingtoolbar").doRefresh();
            }
          }
        },
      });
    });
  },

  onRemovefilterClick: function (button, event, options) {
    var view = button.up("contratocuentagridview");
    var store = view.getStore();
    var filters = Ext.Array.clone(view.filters);
    store.filters.clear(false);
    store.currentPage = 1;
    store.filter(filters);
  },

  onFiltertextClick: function (button, event, options) {
    var view = button.up("contratocuentagridview");
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
