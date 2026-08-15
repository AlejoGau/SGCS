Ext.define("Common.controller.ActionGridController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.ActionTypeStore"],
  models: ["Common.model.ActionModel", "Common.model.ActionSearchModel"],
  views: ["ActionGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      actiongridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        refresh: this.onRefresh,
      },
      actionformview: {
        objectchanged: this.onActionChanged,
      },
      mailactionformview: {
        objectchanged: this.onActionChanged,
      },
      'actiongridview button[action="newAction"]': {
        click: this.onNewActionClick,
      },
      'actiongridview button[action="newMail"]': {
        click: this.onNewMailClick,
      },
      'actiongridview button[action="search"]': {
        click: this.onSearchClick,
      },
    });
  }, // cierro init

  onRefresh: function (view) {
    view.getStore().load();
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("actiongridview");
    var store = view.getStore();
    var query = view.down("#query");
    var field = view.down("#fieldName");
    var filters = Ext.Array.clone(view.filters);
    var date = view.down("#date").getValue();
    var tipo = view.down("#tipo").getValue();

    if (date) {
      filters.push({
        property: "Date:GTEDATESTRING",
        value: Ext.Date.format(date, "Y/m/d"),
        id: "date",
      });
    }

    if (tipo) {
      filters.push({
        property: "ActionType",
        value: tipo,
        id: "tipo",
      });
    }

    store.clearFilter(true);
    if (filters) store.filter(filters);
  },

  initView: function (view) {
    var record = view.record;
    view.filters = [];

    if (record) {
      var objectTypeId = record.get("ObjectTypeId");
      var objectTypeName = record.get("ObjectTypeName");

      view.filters = [
        {
          property: objectTypeName + ":RelationParent",
          value: record.get("Id"),
        },
      ];
    }

    var store = Ext.create("Ext.data.Store", {
      model: this.getActionSearchModelModel(),
      pageSize: 50,
      remoteFilter: true,
      filters: view.filters,
      autoload: false,
    });

    /*
        NO entiendo por que se borraria el filtro...
        if(objectTypeId && objectTypeId != 601){
            store.clearFilter(true);
        }
        */

    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);
    view.bindStore(store);
    store.load();
  },

  onActionChanged: function (operation, record) {
    var view = Ext.ComponentQuery.query("actiongridview")[0];
    var controller = this;
    if (record && record.get("ActionType") == 6) {
      /* record.set('ActionType', 5)
            //record.setProxy(this.getActionModelModel().getProxy())
            record.phantom = true;
            record.proxy.url = controller.getActionModelModel().proxy.url;//this.getActionModelModel().getProxy().proxyConfig.url
            record.save({
                callback: function () {
                    if (view) {
                        var store = view.getStore(); 
                        store.getProxy().url=controller.getActionSearchModelModel().getProxy().url;
                        store.load();
                    }
                }
            })*/
    } else {
      if (view) {
        var store = view.getStore();
        store.getProxy().url = controller
          .getActionSearchModelModel()
          .getProxy().url;
        store.load();
      }
    }
  },

  onItemClick: function (view, record, item, index, e, options) {
    console.log("Record value: " + record);
    var model = this.getActionModelModel();
    record.store.setProxy(model.getProxy());
    if (record) {
      this.openWindow(record, view.up("actiongridview"));
    }
  },

  openWindow: function (record, caller, hideEliminar, objectId) {
    var title = record.get("Name"); //reemplazar por config
    var controller = this;
    if (record.get("ActionType") == 5 || record.get("ActionType") == 6) {
      var viewWin = Ext.widget("mailactionformview", {
        record: record,
        objectId: objectId,
        caller: caller,
        scope: this,
        hideEliminar: hideEliminar,
        recordOrganizacion: caller.record.recordOrganizacion,
      });
      var height = 600;
      var width = 800;
    } else {
      var viewWin = Ext.widget("actionformview", {
        record: record,
        objectId: objectId,
        caller: caller,
        scope: this,
        hideEliminar: hideEliminar,
        recordOrganizacion: caller.record.recordOrganizacion,
      });
      var height = 400;
      var width = 400;
    }

    var myWindow = Ext.widget("window", {
      title: title,
      height: height,
      translate: false,
      width: width,
      modal: true,
      caller: caller,
      items: viewWin,
      layout: "fit",
      listeners: {
        close: function (panel, eOpts) {
          var store = Ext.create("Ext.data.Store", {
            model: controller.getActionSearchModelModel(),
            pageSize: 50,
            remoteFilter: true,
            filters: caller.filters,
            autoload: false,
          });
          caller.bindStore(store);
          store.load();
        },
      },
    }).show();
  },

  onNewActionClick: function (button, event, options) {
    var panel = button.up("tabpanel");

    var view = button.up("actiongridview");
    var record = view.record;
    var parentId = record.get("Id");

    var model = this.getActionModelModel();
    var proxy = model.getProxy();
    var oldUrl = proxy.url;
    var url =
      "/Rest/" + record.get("ObjectTypeName") + "/" + parentId + "/action";
    var me = this;

    proxy.url = url;
    var object = Ext.create(model, {
      Name: getLocale("Accion"),
    });

    // me.openObjectTab(panel,object);
    this.openWindow(object, view, true, parentId);
  },

  onNewMailClick: function (button, event, options) {
    var panel = button.up("tabpanel");

    var view = button.up("actiongridview");
    var record = view.record;
    var parentId = record.get("Id");
    var relationParentId = record.get("Id");

    var model = this.getActionModelModel();
    var proxy = model.getProxy();
    var oldUrl = proxy.url;
    var url =
      "/rest/" + record.get("ObjectTypeName") + "/" + parentId + "/action";
    proxy.url = url;
    var me = this;
    var object = Ext.create(model, {
      ActionType: 6,
      Name: getLocale("Mail"),
    });
    me.openWindow(object, view, true, parentId);
    /*
        proxy.url = url;
        var object = Ext.create(model, {
            ActionType: 6,
            Name: getLocale('Mail')
        });
        object.save({
            callback: function (record) {
                me.openWindow(record, view, true, parentId);
            }
        })*/
  },

  openObjectTab: function (targetTab, object) {
    var objectId = object.get("Id");
    var objectTypeName = object.get("ObjectTypeName");
    var title = object.get("Name");
    var container = objectTypeName.toLowerCase() + "view";
    var newTab = Ext.widget(container, {
      title: title,
      translate: false,
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
