Ext.define("Common.controller.OrderItemGridController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.OrderItemStatusStore"],
  models: [
    "Common.model.OrderItemModel",
    "Common.model.NameValueModel",
    "Common.model.OrderItemSearchModel",
  ],
  views: ["OrderItemGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      orderitemsearchview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        objectchanged: this.onObjectChanged,
        deleteitem: this.onDeleteItem,
        beforedestroy: this.onDestroy,
      },
      "orderitemsearchview button[action=add]": {
        click: this.onAddClick,
      },
      "orderitemsearchview button[action=search]": {
        click: this.onSearchClick,
      },
      "orderitemsearchview button[action=getall]": {
        click: this.onGetAllClick,
      },
    });
  },

  initView: function (view) {
    var record = view.record;
    var parentorderid = record.get("Id");
    var store = Ext.create("Ext.data.Store", {
      model: this.getOrderItemSearchModelModel(),
      pageSize: 500,
      filters: [
        {
          property: "orderId",
          value: parentorderid,
        },
      ],
      remoteSort: true,
      remoteFilter: true,
    });

    view.store = store;
    view.bindStore(store);

    store.load();

    if (view.recordOrganizacion) {
      view.moneySymbol = view.recordOrganizacion.get("mon_csymbol");
    }

    if (!view.moneySymbol) {
      // BC 380460088 : JUAN, obtengo del parametro si no viene por VIEW el currency
      view.moneySymbol =
        getParametro("SYSTEMCURRENCY", false, true).codigo + " ";
    }
  },

  onDestroy: function (view) {
    view.store = null;
  },

  onAddClick: function (button, event, options) {
    var panel = button.up("tabpanel");
    var view = button.up("orderitemsearchview");
    var record = view.record;
    var parentId = record.get("Id");
    var model = this.getOrderItemModelModel();

    var newrecord = Ext.create(model, {
      Id: 0,
      Name: getLocale("Seleccione un producto..."),
      Status: "1",
      Quantity: 1,
      OrderId: parentId,
    });

    //var store = view.getStore();
    //store.add(newrecord);

    this.openObject(newrecord, view, panel);
  },

  onItemClick: function (view, record, item, index, e, options) {
    this.openObject(record, view);
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  openObject: function (record, view, panel) {
    //this.openWindow(record,view);
    var model = this.getOrderItemModelModel();
    var grid = view.up("orderitemsearchview");
    if (!grid) {
      grid = view;
    }
    var title = record.get("Name"); //reemplazar por config
    if (record.get("Id") > 0) {
      model.load(record.get("Id"), {
        callback: function (_record) {
          var viewWin = Ext.widget("orderitemformview", {
            record: _record,
            //callback: this.onEdit,
            scope: this,
            recordOrganizacion: view.recordOrganizacion,
            panel,
            caller: grid,
          });
          var myWindow = Ext.widget("window", {
            title: title,
            height: 400,
            width: 400,
            modal: true,
            items: viewWin,
            layout: "fit",
            caller: grid,
          }).show();
        },
      });
    } else {
      var viewWin = Ext.widget("orderitemformview", {
        record: record,
        //callback: this.onEdit,
        scope: this,
        recordOrganizacion: view.recordOrganizacion,
        caller: grid,
      });
      var myWindow = Ext.widget("window", {
        title: title,
        height: 400,
        width: 400,
        modal: true,
        items: viewWin,
        layout: "fit",
        caller: grid,
      }).show();
    }
  },

  onObjectChanged: function (view) {
    var store = view.getStore();

    var filters = [
      {
        property: "orderId",
        value: view.record.get("Id"),
      },
    ];
    store.clearFilter(true);
    store.filter(filters);
    store.load();
  },

  onDeleteItem: function (record, view) {
    var model = this.getOrderItemModelModel();

    var del = model.load(record.get("Id"), {
      callback: function (rec) {
        rec.erase({
          callback: function () {
            //view.view.refresh();
            view.store.remove(record);
            //view.store.load();
          },
        });
      },
    });
  },

  onGetAllClick: function (button, event, options) {
    var view = button.up("orderitemsearchview");
    var store = view.getStore();
    store.clearFilter();
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("orderitemsearchview");
    var store = view.getStore();
    var query = view.down("#query");
    var field = view.down("#fieldName");
    var taxonomytree = view.query("taxonomiesmastertree")[0];
    var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
    var taxonomiesArray = [];
    var filters = [];
    var fechaDesde = view.down("#fechaDesde").getValue();
    var fechaHasta = view.down("#fechaHasta").getValue();

    if (fechaDesde)
      filters.push({
        property: "FechaPrimeraIntervencion:GT",
        value: fechaDesde,
        id: "fechaDesde",
      });

    if (fechaHasta)
      filters.push({
        property: "FechaPrimeraIntervencion:LT",
        value: fechaHasta,
        id: "fechaHasta",
      });

    var orChk = view.down("#or");
    var or = orChk.checked ? ":OR" : "";

    Ext.Array.each(
      taxonomiesSelected,
      function (rec) {
        if (rec.get("checked")) taxonomiesArray.push(rec.get("Id"));
      },
      this
    );

    var taxonomies = taxonomiesArray.join();

    if (field.getValue() && query.getValue()) {
      filters.push({
        property: field.getValue() + ":Like",
        value: query.getValue(),
        id: "query",
      });
    }

    if (taxonomiesArray.length > 0) {
      filters.push({
        property: "Taxonomy" + or,
        value: taxonomies,
        id: "taxonomy",
      });
    }

    if (filters) store.filter(filters);
    else store.clearFilter();
  },
});
