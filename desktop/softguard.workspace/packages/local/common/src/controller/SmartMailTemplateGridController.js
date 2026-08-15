//MIGRADO2024
Ext.define("Common.controller.SmartMailTemplateGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["Common.model.SmartMailTemplateModel", "SmartMailTemplateSearchModel"],
  views: ["SmartMailTemplateGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smarttemplategridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        smartmailtemplatechange: this.smartMailTemplateChange,
      },
      "smarttemplategridview button[action=search]": {
        click: this.onSearchClick,
      },
      "smarttemplategridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "smarttemplategridview button[action=add]": {
        click: this.onAdd,
      },
    });
  },
  initView: function (view) {
    view.filters = [];
    var store = Ext.create("Ext.data.Store", {
      model: this.getSmartMailTemplateSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: view.filters,
    });
    view.bindStore(store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);

    store.load();
  },

  smartMailTemplateChange: function () {
    console.log("refresco");
    /*   var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var mytab = panel.down('[title="Templates"]');
        mytab.down('pagingtoolbar').doRefresh();*/
  },
  onAdd: function (grid, record, item, index, e, options) {
    var id = 0;
    var view = grid.up("smarttemplategridview");
    var panel = view.targetTab ? view.targetTab : view.up('tabpanel');
    var title = "Nuevo Template";
    model = this.getSmartMailTemplateModelModel();

    var now = new Date();
    var record = model.create({
      DateCreated: new Date(),
      Name: getLocale("Nuevo template"),
    });
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("smartmailtemplatedatosview", {
        iconCls: "icon-Person",
        title: title,
        parent: view.record,
        record: record,
        targetTab: panel,
        closable: true,
        objectId: id,
        itemId: "template",
        onRefresh: this.onGetAllClick,
        parentView: view,
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },
  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");
    var view = grid.up("smarttemplategridview");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = "(" + id + ") " + record.get("Name");
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("smartmailtemplatedatosview", {
        iconCls: "icon-Person",
        title: title,
        parent: view.record,
        record: record,
        targetTab: panel,
        objectId: id,
        closable: true,
        translate: false,
        onRefresh: this.onGetAllClick,
        parentView: view,
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
    var view = button.up("smarttemplategridview") ?? button;
    var store = view.getStore();
    store.clearFilter();
    store.filter(view.filters);
    view.down("#query").setValue("");
    store.load();
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("smarttemplategridview");
    var store = view.getStore();
    var fieldName = view.down("#fieldName").getValue();
    var query = view.down("#query").getValue();
    var filters = Ext.clone(view.filters);
    if (fieldName) {
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
});
