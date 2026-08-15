//MIGRADO2024
Ext.define("Common.controller.STProductosGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["TablasProductosSearchModel", "TablasProductosModel"],
  views: ["STProductosGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      stproductosview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        objectchanged: this.onObjectChanged,
      },
      "stproductosview button[action=search]": {
        click: this.onSearchClick,
      },
      "stproductosview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "stproductosview button[action=add]": {
        click: this.onAdd,
      },
      'stproductosview button[action="delete"]': {
        click: this.onDeleteClick,
      },
      "stproductosview #gridcolumnObservacion": {
        headerclick: this.onObservacionColumnClick,
      },
    });
  },
  initView: function (view) {
    view.filters = [];
    var storeKeyModules = KeyModulesStore; //Ext.data.StoreManager.lookup( 'KeyModulesStore' );
    if (storeKeyModules.isModuleAvailable("WebMG")) {
      if (view.idOganizacionUsuario) {
      } else {
        view.idOganizacionUsuario = _UserData.Company;
      }
      view.filters.push({
        property: "pro_iidorganizacion",
        value: view.idOganizacionUsuario,
      });
    }
    view.store = Ext.create("Ext.data.Store", {
      model: this.getTablasProductosSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: view.filters,
    });
    if (view.showAll) {
      view.store.proxy.extraParams = {
        showAll: 1,
      };
    }
    view.bindStore(view.store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(view.store);
    view.store.load();
  },

  onObservacionColumnClick: function () {
    notify("La columna no soporta ordenamiento");
  },
  onAdd: function (grid, record, item, index, e, options) {
    var id = 0;
    var view = grid.up("stproductosview");
    // var panel = view.targetTab ? view.targetTab : view.up('#prodcutospanelview');
    var panel = view.targetTab ? view.targetTab : view.up("tabpanel");
    var title = "Nuevo producto";
    record = this.getTablasProductosModelModel();
    var myobject = record.create({
      Status: 1,
      pro_iidorganizacion: view.idOganizacionUsuario,
      pro_itipo: 1,
      pro_currency: getParametro("SYSTEMCURRENCY", false, true).codigo,
    });
    var newtab = Ext.widget("stproductosformview", {
      caller: view,
      record: myobject,
      title: "Nuevo",
      closable: true,
      objectId: id,
    });
    panel.add(newtab);
    panel.setActiveTab(newtab);
    /*
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 500,
            height: 700,
            border: false,
            items: view
        });
        win.show();*/
  },

  onItemClick: function (grid, recordGrid, item, index, e, options) {
    //recupero el record con otro model que sea el de la grila. El de la grilla es un search y no un rest directo
    var model = this.getTablasProductosModelModel();
    var r = model.load(recordGrid.get("Id"), {
      callback: function (record, operation) {
        var id = record.get("Id");
        var view = grid;
        var panel = view.targetTab ? view.targetTab : view.up("tabpanel");
        var title = record.get("Name");
        var storeKeyModules = KeyModulesStore; //Ext.data.StoreManager.lookup( 'KeyModulesStore' );

        if (storeKeyModules.isModuleAvailable("WebMG")) {
          /* if(record.get('pro_itipo') == 0) {
                        record.set('pro_itipo',1)
                    }*/
          /*if(record.get('pro_iidorganizacion') == 0) {
                        record.set('pro_iidorganizacion',view.idOganizacionUsuario)
                    }*/
        } else {
          //si no tiene en la llave MG le defino organizacion 0
          record.set("pro_itipo", 1);
          record.set("pro_iidorganizacion", 0);
        }

        record.set(
          "pro_currency",
          getParametro("SYSTEMCURRENCY", false, true).codigo
        );

        var newtab = Ext.widget("stproductosformview", {
          caller: view.up("stproductosview"),
          record: record,
          objectId: id,
          title: title,
          translate: false,
          tabConfig: { translate: false },
          closable: true,
        });

        panel.add(newtab);
        panel.setActiveTab(newtab);

        /*
                var win = Ext.create( 'Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout: 'fit',
                    title: title,
                    width: 500,
                    height: 550,
                    border: false,
                    items: view
                });
                win.show();
                */
      },
    });
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  onObjectChanged: function (view) {
    view.down("pagingtoolbar").doRefresh();
  },
  onGetAllClick: function (button, event, options) {
    var view = button.up("stproductosview");
    var store = view.getStore();
    store.clearFilter(true);
    store.filter(view.filters);
    view.down("#query").setValue("");
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("stproductosview");
    var store = view.getStore();
    var fieldName = view.down("#fieldName").getValue();
    var query = view.down("#query").getValue();
    var filters = Ext.clone(view.filters);
    if (fieldName != "") {
      filters.push({
        property: fieldName + ":LIKE",
        value: query,
      });
    }
    if (filters.length > 0) {
      store.filter(filters);
    } else {
      store.clearFilter();
    }
  },

  onDeleteClick: function (button, event, options) {
    var view = button.up("stproductosview");
    var selection = view.getSelectionModel().getSelection()[0];
    var model = this.getTablasProductosModelModel();
    if (selection) {
      view.store.remove(selection);
      var delRec = view.store.getRemovedRecords();
      Ext.Array.each(
        delRec,
        function (rec) {
          rec.setConfig({
            proxy: model.getProxy(),
          });
          rec.destroy({
            callback: function (record, operation) {
              if (operation.success) {
                notify("Se eliminio exitosamente");
              } else {
                notify(
                  "No se puede eliminar el registro, esta siendo utilizado en el sistema."
                );
              }
              view.store.load();
            },
          });
        },
        this
      );
    }
  },
});
