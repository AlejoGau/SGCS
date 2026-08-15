Ext.define("Common.controller.SMPAttachGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["SmartMailProgramAttachModel", "SMPAttachSearchModel"],
  views: ["SMPAttachGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smpattachgridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        deleteattach: this.onDeleteAttach,
        deleteall: this.onDeleteAll,
        filtrar: this.onFiltrar,
      },
    });
  },
  initView: function (view) {
    var record = view.record;
    var store = Ext.create("Ext.data.Store", {
      model: this.getSMPAttachSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      //filters: filters
    });
    view.bindStore(store);
    // DSS-1498: guard against undefined record (e.g. collapsed fieldset renders before record is set)
    if (record) {
      this.onFiltrar(record, view);
      if (record.get("Id") != 0) {
        view.getStore().load();
      }
    }
  },
  onFiltrar: function (record, view) {
    // DSS-1498: persist record so SMPAttachGridView.beforeupload handler can read it
    view.record = record;
    var objectTypeName = record.get("ObjectTypeName");
    var parentId = record.get("Id");
    if (isNaN(parentId) || parentId == null) {
      parentId = 0;
    }

    if (objectTypeName == "SmartMailProgram") {
      var filters = [
        {
          property: "ProgramId",
          value: parentId,
        },
      ];
    } else {
      var filters = [
        {
          property: objectTypeName + ":RelationParent",
          value: parentId,
        },
      ];
    }
    view.getStore().filter(filters);
  },
  onItemClick: function (view, record, item, index, e, options) {
    var id = record.get("Id");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title =
      "(" + getLocale("Archivo") + ": " + id + ") " + record.get("Name");
    title = title.replace(",", "");
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("attachview", {
        title: title,
        translate: false,
        objectId: id,
        closable: true,
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  onDeleteAttach: function (record, view) {
    var model = this.getSmartMailProgramAttachModelModel();
    //record.setProxy(model.getProxy());
    /*record.setConfig({
          proxy: model.getProxy()
      });
      record.destroy({callback:function(){
          view.getStore().load();
      }});*/
    model.load(record.get("Id"), {
      callback: function (rec, success) {
        rec.erase({
          failure: function (record, operation) {
            notify("Error al borrar");
            view.getStore().load();
          },
          success: function (record, operation) {
            view.getStore().load();
          },
        });
      },
    });
  },

  onDeleteAll: function (view) {
    var store = view.getStore();
    var model = this.getSmartMailProgramAttachModelModel();

    store.each(function (record) {
      //record.setProxy(proxy);
      record.setConfig({
        proxy: model.getProxy(),
      });
      record.destroy();
    });
    store.load();
  },

  onObjectCreated: function (view) {
    var record = view.record;
    var grid = view.caller;
    var paging = view.down("pagingtoolbar");

    paging.moveFirst();
    paging.doRefresh();
    this.onItemClick(grid, record);
  },
});
