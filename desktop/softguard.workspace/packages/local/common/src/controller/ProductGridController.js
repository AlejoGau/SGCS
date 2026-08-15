//MIGRADO2024
Ext.define("Common.controller.ProductGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "mg_listas_preciosSearchModel",
    "ProductSearchModel",
    "ProductModel",
  ],
  views: ["ProductGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      productsearchview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
      },
      "productsearchview button[action=add]": {
        click: this.onAddClick,
      },
      "productsearchview #btnBuscar": {
        click: this.onSearchClick,
      },
      "productsearchview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "productsearchview #salir": {
        click: this.onSalirClick,
      },
      "productsearchview #listas": {
        change: this.onListasChange,
      },
    });
  },

  onListasChange: function (combo, value) {
    var view = combo.up("productsearchview");

    var filters = Ext.clone(view.filters);

    filters.push({
      property: "id_lista",
      value: value,
    });

    view.productosStore.clearFilter(true);
    view.productosStore.filter(filters);
  },
  initView: function (view) {
    var filters = [];
    var controller = this;

    if (view.hideAdd) {
      view.down("#add").hide();
    }

    if (view.record && view.record.get("ObjectTypeName") == "Section") {
      filters = [
        {
          property: "Section:RelationParent",
          value: view.record.get("Id"),
        },
      ];
    }

    if (view.tipo == "helper") {
      view.down("#salir").show();
      view.setTitle(
        getLocale("Productos (hacer doble click sobre el producto que se desea agregar)")
      );
      filters.push({
        property: "Status",
        value: "1",
      });
    }

    /* var store =Ext.create('Ext.data.Store',{
            model: this.getProductSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();*/

    if (view.recordOrganizacion && view.showAll != true) {
      view.listasStore = Ext.create("Ext.data.Store", {
        model: controller.getMg_listas_preciosSearchModelModel(),
        pageSize: 999,
        remoteSort: true,
        remoteFilter: true,
        filters: [
          {
            property: "mglp_idorganizacion",
            value: _UserData.Company,
          },
          {
            property: "mglp_currency",
            value: view.recordOrganizacion.get("mon_ccodigo"),
          },
        ],
      });
      view.down("#listas").bindStore(view.listasStore);
      view.listasStore.load({
        callback: function (records) {
          /*        
                filters.push({
                    property:'code_currency',
                    value: view.recordOrganizacion.get('org_csymbol')
                })  */

          if (records.length > 0) {
            view.down("#listas").select(records[0]);
          } else {
            view.down("#listas").setValue("Todos los items");
          }
        },
      });

      view.productosStore = Ext.create("Ext.data.Store", {
        model: controller.getProductSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters,
      });
      view.bindStore(view.productosStore);
      var toolbar = view.down("pagingtoolbar");
      toolbar.bindStore(view.productosStore);
    } else {
      view.productosStore = Ext.create("Ext.data.Store", {
        model: controller.getProductSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters,
      });
      view.productosStore.proxy.extraParams = {
        showAll: 1,
      };
      view.bindStore(view.productosStore);
      var toolbar = view.down("pagingtoolbar");
      toolbar.bindStore(view.productosStore);

      view.productosStore.load();
    }

    if (view.tipo == "helper") {
      view.down("#salir").show();
      view.setTitle(
        getLocale("Productos (hacer doble click sobre el producto que se desea agregar)")
      );
    }
  },

  onSalirClick: function (btn) {
    var view = btn.up("productsearchview");
    btn.up("window").hide();
  },

  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");
    var view = grid.up("productsearchview");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = "(" + id + ") " + record.get("Name");

    if (view.tipo == "helper") {
      view.caller.fireEvent("productSelected", record, view.caller);
      // view.up('window').hide();
    } else {
      // me fijo si el tab existe, si es nuevo lo creo
      var mytab = panel.down('[title="' + title + '"]');
      console.log(mytab);
      if (!mytab) {
        var newTab = Ext.widget("productformview", {
          iconCls: "icon-Product",
          title: title,
          translate: false,
          section: view.record,
          record: record,
          targetTab: panel,
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
    }
  },

  onSearchClick: function (button, event) {
    var view = button.up("productsearchview");
    var store = view.getStore();
    var query = view.down("#query");
    var code = view.down("#querycode");
    var filters = view.filters ? Ext.clone(view.filters) : [];

    var taxonomytree = view.query("taxonomiesmastertree")[0];
    var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
    //var taxonomiesSelected = taxonomytree.getSelectionModel().getSelection();

    var taxonomiesArray = [];
    Ext.Array.each(
      taxonomiesSelected,
      function (rec) {
        if (rec.get("checked")) taxonomiesArray.push(rec.get("Id"));
      },
      this
    );

    var taxonomies = taxonomiesArray.join();

    var orChk = view.down("#or");
    var or = orChk.checked ? ":OR" : "";

    if (taxonomiesArray.length > 0) {
      filters.push({
        property: "Taxonomy" + or,
        value: taxonomies,
        id: "taxonomy",
      });
    }
    if (query)
      filters.push({
        property: "Name:Like",
        value: query.getValue(),
        id: "Name",
      });

    if (code)
      filters.push({
        property: "code:Like",
        value: code.getValue(),
        id: "code",
      });
    if (filters.length > 0) store.filter(filters);
    else store.clearFilter();
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  onAddClick: function (button, event, options) {
    var panel = button.up("tabpanel");
    var view = button.up("productsearchview");
    var model = this.getProductModelModel();
    var proxy = model.getProxy();
    var store = view.getStore();

    var me = this;

    var record = Ext.create(model, {
      Name: getLocale("Nuevo Producto"),
    });

    var win;

    // no lo agrego para que no aparezca vacio si abandona
    //store.add(newrecord);

    var form = Ext.widget("productformview", {
      iconCls: "icon-Product",
      record: record,
      targetTab: panel,
      header: false,
      caller: view,
      closable: false,
      deleteHide: true,
      rubrosDisabled: true,
      listeners: {
        objectchanged: function () {
          view.down("pagingtoolbar").doRefresh();
          win.close();
        },
      },
    });

    win = Ext.widget("window", {
      width: 600,
      height: 500,
      layout: "fit",
      translate: false,
      title: record.get("Name"),
      closable: true,
      items: form,
    }).show();
  },
  onGetAllClick: function (button, event, options) {
    var view = button.up("productsearchview");
    var store = view.getStore();
    store.clearFilter(false);
    store.filter(view.filters);
    view.down("#query").setValue("");
    view.down("#queryid").setValue("");

    var taxonomytree = view.query("taxonomiesmastertree")[0];
    var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
    var taxonomiesArray = [];
    Ext.Array.each(
      taxonomiesSelected,
      function (rec) {
        if (rec.get("checked")) rec.set("checked", false);
      },
      this
    );
  },

  openObjectTab: function (tabpanel, objectId, objectTypeName, title) {
    var container = objectTypeName.toLowerCase() + "view";

    var newTab = tabpanel.down('[title="' + title + '"]');
    if (!newTab) {
      var newTab = Ext.widget(container, {
        title: title,
        border: false,
        closable: true,
        objectId: objectId,
        targetTab: tabpanel,
        autoDestroy: true,
      });

      tabpanel.add(newTab);
    }

    tabpanel.setActiveTab(newTab);
  },

  onContentCreated: function (view) {
    var record = view.record;
    var grid = view.caller;
    var paging = view.down("pagingtoolbar");

    paging.moveFirst();
    paging.doRefresh();
    this.onItemClick(grid, record);
  },
});
