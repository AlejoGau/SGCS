Ext.define("Common.controller.SmartMailSenderGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["SmartMailSenderModel"],
  views: ["SmartMailSenderGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smartmailsendergridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        objectchanged: this.objectChanged,
      },
      "smartmailsendergridview button[action=search]": {
        click: this.onSearchClick,
      },
      "smartmailsendergridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "smartmailsendergridview button[action=add]": {
        click: this.onAdd,
      },
      'smartmailsendergridview button[action="delete"]': {
        click: this.onDeleteClick,
      },
    });
  },
  initView: function (view) {
    view.filters = [];
    console.log("Ingresando a SmartMailSenderGridController");
    view.store = Ext.create("Ext.data.Store", {
      model: this.getSmartMailSenderModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: view.filters,
    });
    view.bindStore(view.store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(view.store);

    view.store.load();
  },

  objectChanged: function (view) {
    view.down("pagingtoolbar").doRefresh();
  },

  onAdd: function (grid, record, item, index, e, options) {
    var id = 0;
    var view = grid.up("smartmailsendergridview");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = "Nuevo SmartMailSender";

    record = this.getSmartMailSenderModelModel();

    var myobject = record.create({
      Id: 0,
    });
    /*	myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    		
                    */

    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("smartmailsenderformview", {
        iconCls: "icon-table-add",
        title: title,
        parent: view.record,
        record: myobject,
        targetTab: panel,
        objectId: id,
        closable: true,
        caller: view,
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }

    /*	}
			});
*/
  },

  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");
    var view = grid.up("smartmailsendergridview");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = "(" + record.get("Id") + ") " + getLocale("SmartMailSender");
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("smartmailsenderformview", {
        iconCls: "icon-table-edit",
        title: title,
        translate: false,
        parent: view.record,
        record: record,
        targetTab: panel,
        objectId: id,
        closable: true,
        caller: view,
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
  onGetAllClick: function (button, event, options) {
    var view = button.up("smartmailsendergridview");
    var store = view.getStore();
    store.clearFilter();
    store.filter(view.filters);
    view.down("#query").setValue("");
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("smartmailsendergridview");

    var store = view.getStore();
    var fieldName = view.down("#fieldName").getValue();
    var query = view.down("#query").getValue();

    var filters = Ext.clone(view.filters);

    if (fieldName && query) {
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
    var view = button.up("smartmailsendergridview");
    var selection = view.getSelectionModel().getSelection();
    if (selection) {
      view.store.remove(selection);
      var delRec = view.store.getRemovedRecords();
      Ext.Array.each(
        delRec,
        function (rec) {
          rec.erase({
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
