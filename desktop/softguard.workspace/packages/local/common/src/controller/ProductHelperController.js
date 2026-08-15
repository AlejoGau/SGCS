//MIGRADO2024
Ext.define("Common.controller.ProductHelperController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["mg_listas_preciosSearchModel", "ProductSearchModel"],
  views: ["ProductHelperView"],
  init: function (config) {
    // genero los eventos
    this.control({
      producthelperview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        productselected: this.onObjectEdit,
      },
      "producthelperview #btnBuscar": {
        click: this.onSearchClick,
      },
      "producthelperview #listas": {
        change: this.onListasChange,
      },
      /*,
            'producthelperview #btnLista' : {
                click: this.onCambioListaClick
            }*/
    });
  },

  /*  onCambioListaClick: function(button, event){
        var view = button.up('producthelperview');
        
        var idLista = view.down('#listas').getValue()
        
        view.productosStore.clearFilter(true)        
        view.productosStore.filter({
                        property:'id_lista',
                        value: idLista
                    })
        
    },*/
  onListasChange: function (combo, value) {
    var view = combo.up("producthelperview");

    var filters = Ext.clone(view.filters);

    filters.push({
      property: "id_lista",
      value: value,
    });

    view.productosStore.clearFilter(true);
    view.productosStore.filter(filters);
  },
  initView: function (view) {
    if (!view.filters) {
      view.filters = [];
    }

    var controller = this;

    if (view.soloServicios) {
      view.setTitle(getLocale("Servicios"));
      view.filters.push({
        property: "pro_itipo",
        value: 0,
      });
    }

    if (view.soloServiciosYOtros) {
      view.setTitle(getLocale("Servicios y otros"));
      view.filters.push({
        property: "pro_itipo:ININT",
        value: "0,2",
      });
    }

    var storeKeyModules = KeyModulesStore; //Ext.data.StoreManager.lookup('KeyModulesStore');
    if (storeKeyModules.isModuleAvailable("WebMG")) {
      if (_UserData.Company) {
        view.down("#listas").show();
      }
    }

    if (view.recordOrganizacion) {
      view.listasStore = Ext.create("Ext.data.Store", {
        model: controller.getMg_listas_preciosSearchModelModel(),
        pageSize: 999,
        remoteSort: true,
        remoteFilter: true,
        filters: [
          {
            property: "mglp_idorganizacion",
            value: _UserData.Company,
          } /*,{
                    property:'mglp_currency',
                    value:view.recordOrganizacion.get('mon_ccodigo')
                }*/,
        ],
      });
      view.down("#listas").bindStore(view.listasStore);
      view.listasStore.load({
        callback: function (records) {
          if (records.length <= 0) {
            Ext.MessageBox.alert(
              "Falta configuracion",
              "Es necesario tener creadas listas de precios. Ingrese a AdministratorSearch para crearlas.",
              function () {}
            );
            return false;
          }

          console.log(records[0]);
          view.down("#listas").select(records[0]);
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
      view.bindStore(view.productosStore);
      var toolbar = view.down("pagingtoolbar");
      toolbar.bindStore(view.productosStore);

      view.down("#listas").inputEl.dom.value = "Todos los items";
      view.down("#listas").disable();
      view.productosStore.load();
    }
  },
  onSelectedClick: function (button, event, options) {
    var view = button.up("producthelperview");
    var selected = view.getSelectionModel().getSelection();
    var win = view.up("window");
    var caller = win.view;
    caller.fireEvent("productselected", selected, caller);
    win.close();
  },

  onItemClick: function (view, record, item, index, e, options) {
    if (!view.up("panel").multiSelect) {
      var win = view.up("window");
      var caller = win.view;
      caller.fireEvent("productselected", record, caller);
      win.close();
    }
  },

  onSearchClick: function (button, event) {
    const view = button.up("producthelperview");
    const store = view.getStore();
    const query = view.down("#query");
    const code = view.down("#queryid");
    var filters = [];

    if (query) {
      filters.push({
        property: "Name:Like",
        value: query.getValue(),
        id: "Name",
      });
    }

    // This will filter by id
    if (code) {
      filters.push({
        property: "code",
        value: code.getValue(),
        id: "code",
      });
    }

    store.filter(filters);
  },
  onObjectEdit: function (record, view) {
    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Editar Producto",
      closeAction: "destroy",
      itemId: "productWin",
      width: 750,
      height: 550,
      border: true,
      modal: true,
      view,
      items: [
        {
          xtype: "stproductosformview",
          record,
        },
      ],
    });
    win.show();
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
});
