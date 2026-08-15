//MIGRADO2024
Ext.define("Common.controller.ProductoListaPreciosController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "mg_listas_preciosSearchModel",
    "mg_listas_preciosModel",
    "mg_listas_precios_detalleSearchModel",
    "mg_listas_precios_detalleModel",
  ],
  views: ["ProductoListaPreciosView"],
  init: function (config) {
    // genero los eventos
    this.control({
      productolistaprecioview: {
        afterrender: this.initView,
        loaddetalle: this.onLoadDetalle,
        refresh: this.onRefresh,
        delete: this.onDelete,
        loadAll: this.onLoadAll,
        addProduct: this.onItemClick,
      },
      "productolistaprecioview #listasprecios": {
        itemdblclick: this.onItemClick,
      },
      "productolistaprecioview #listasconproducto": {
        click: this.onListaConProductoClick,
      },
      "productolistaprecioview #todaslistas": {
        click: this.onTodasListaClick,
      },
      'productolistaprecioview button[action="new"]': {
        click: this.onNewListaPrecioClick,
      },
    });
  },

  onDelete: function (record, view) {
    var store = record.store;
    this.getMg_listas_precios_detalleModelModel().load(
      record.get("mglpd_idkey"),
      {
        callback: function (recordDetalle) {
          recordDetalle.destroy({
            callback: function () {
              notify("El producto fue eliminado de la lista.");
              store.load();
            },
          });
        },
      }
    );

    //
    //este remove es por un bug que tiene sencha al moento de guardar por el strip
    //https://www.sencha.com/forum/showthread.php?268135-Grid-error-on-delete-selected-row/page2
    //store.remove(record, true);
  },

  onRefresh: function (view) {
    /*var filters = Ext.clone(view.filters);        
        view.down('#listasprecios').getStore().clearFilter(true)
        view.listaPreciosStore.filter(filters)*/

    view.listaPreciosStore.load();
  },

  onListaConProductoClick: function (btn) {
    var view = btn.up("productolistaprecioview");

    var filters = Ext.clone(view.filters);

    filters.push({
      property: "mglpd_idproducto",
      value: view.record.get("Id"),
    });
    view.listaPreciosStore.clearFilter(true);
    view.listaPreciosStore.filter(filters);
  },

  onLoadAll: function (view, record) {
    var filters = Ext.clone(view.filters);
    //Se quito ALL al final de mglpd_idproducto
    filters.push({
      property: "mglpd_idproducto",
      value: record.get("Id"),
    });

    view.down("#todaslistas").toggle(true);

    view.listaPreciosStore.clearFilter(true);
    view.listaPreciosStore.filter(filters);
  },

  onTodasListaClick: function (btn) {
    var view = btn.up("productolistaprecioview");
    var filters = Ext.clone(view.filters);
    //Se quito ALL al final de mglpd_idproducto
    filters.push({
      property: "mglpd_idproductoALL",
      value: view.record.get("Id"),
    });

    view.listaPreciosStore.clearFilter(true);
    view.listaPreciosStore.filter(filters);
  },

  onLoadDetalle: function (rec, view) {
    var store = Ext.create("Ext.data.Store", {
      model: this.getMg_listas_precios_detalleSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
      filters: [
        {
          property: "mglpd_idlista",
          value: rec.get("Id"),
        },
      ],
      /* sorters: [{
                property:'mglp_nombre',
                direction:'ASC'
            }],*/
      autoload: false,
    });

    store.load({
      callback: function (records) {
        var win = Ext.create("Ext.Window", {
          iconCls: "icon-table-add",
          layout: "fit",
          title: "Detalles",
          width: 500,
          height: 300,
          border: false,
          items: [
            {
              xtype: "grid",
              itemId: "detalles",
              store: store,
              columns: [
                {
                  xtype: "gridcolumn",
                  header: "Producto",
                  dataIndex: "Name",
                  flex: 1,
                },
                {
                  xtype: "gridcolumn",
                  header: "Valor",
                  dataIndex: "mglpd_valor",
                  flex: 1,
                  renderer: function (value, obj, record) {
                    return Ext.util.Format.currency(value);
                  },
                },
              ],
            },
          ],
        });
        win.show();
      },
    });
  },
  initView: function (view) {
    view.filters = [];

    // Si el producto aun no fue salvado, su Id es phantom (string tipo 'WebMG.model.TablasProductosModel-1').
    // Creamos el store igual (asi onLoadAll post-save no crashea con clearFilter undefined),
    // pero NO disparamos load() al backend con un filter que rompe la query.
    var prodId = view.record && view.record.get("Id");
    var isPhantomParent = !prodId || isNaN(parseInt(prodId, 10));

    if (
      !isPhantomParent &&
      _UserData.Company &&
      (view.record.get("pro_iidorganizacion") != 0 ||
        view.record.get("pro_iidorganizacion") != "")
    ) {
      view.filters.push({
        property: "mglpd_idproducto",
        value: _UserData.Company, //this.application.UserData.Company
      });
    }

    var filters = Ext.clone(view.filters);
    if (!isPhantomParent) {
      filters.push({
        property: "mglpd_idproducto",
        value: prodId,
      });
    }

    view.listaPreciosStore = Ext.create("Ext.data.Store", {
      model: this.getMg_listas_preciosSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
      filters: filters,
      sorters: [
        {
          property: "mglp_tipo",
          direction: "ASC",
        },
        {
          property: "mglp_nombre",
          direction: "ASC",
        },
      ],
      autoload: false,
    });

    view.down("#listasprecios").bindStore(view.listaPreciosStore);

    if (!isPhantomParent && view.record.get("Id") != 0) {
      view.listaPreciosStore.load();
      view.down("#listasconproducto").toggle(true);
    } else {
      view.setDisabled(true);
    }
  },

  onNewListaPrecioClick: function (button, event, options) {
    var view = button.up("productolistaprecioview");
    var model = this.getMg_listas_preciosModelModel();

    var record = model.create({
      mglp_nombre: "",
      mglp_tipo: 1,
      mglp_multiplicador: 0,
      mglp_idorganizacion: _UserData.Company,
      mglp_currency: "",
    });

    var win = Ext.create("Ext.Window", {
      iconCls: "icon-table-add",
      layout: "fit",
      title: "Nueva lista",
      width: 500,
      height: 300,
      border: false,
      items: [
        {
          xtype: "listaspreciosformview",
          record: record,
          caller: view,
          recordProducto: view.record,
        },
      ],
    });
    win.show();
  },

  onItemClick: function (grid, recordGrid, item, index, e, options) {
    var view = grid.up("productolistaprecioview")
      ? grid.up("productolistaprecioview")
      : grid;
    var model = this.getMg_listas_preciosModelModel();
    var r = model.load(recordGrid.get("Id"), {
      callback: function (record, operation) {
        var title = "Lista " + record.get("mglp_nombre");

        var win = Ext.create("Ext.Window", {
          iconCls: "icon-table-add",
          layout: "fit",
          title: title,
          width: 500,
          height: 300,
          border: false,
          items: [
            {
              xtype: "listaspreciosformview",
              record: record,
              caller: view,
              recordProducto: view.record,
            },
          ],
        });
        win.show();
      },
    });
  },
});
