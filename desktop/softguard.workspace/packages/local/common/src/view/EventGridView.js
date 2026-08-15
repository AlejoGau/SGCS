Ext.define("Common.view.EventGridView", {
  extend: "Ext.grid.GridPanel",
  alias: "widget.eventgridview",
  title: "Historial",
  autoHeight: true,

  // Si usás un store específico para el grid, podés declararlo aquí:
  // store: "EventGridStore",

  columns: [
    {
      xtype: "datecolumn",
      header: "Fecha",
      format: "d/m/Y H:i",
      sortable: true,
      dataIndex: "StartDate",
      width: 120,
      // Renderer defensivo: asegura Date real
      renderer: function (v) {
        if (!v) return "";
        // Si ya es Date, dejarlo
        if (Ext.isDate(v)) return Ext.Date.format(v, "d/m/Y H:i");
        // Si viene como string ISO o epoch
        var d = v;
        if (Ext.isString(v)) {
          // intentar parseo ISO primero
          var parsed = new Date(v);
          if (!isNaN(parsed.getTime())) d = parsed;
        } else if (Ext.isNumber(v)) {
          d = new Date(v);
        }
        if (Ext.isDate(d)) {
          return Ext.Date.format(d, "d/m/Y H:i");
        }
        // Valor desconocido
        return "";
      }
    },
    {
      xtype: "gridcolumn",
      header: "Tipo",
      dataIndex: "EventType",
      renderer: function (value, metadata, record, rowindex, colindex, store, view) {
        var grid = view && view.up ? view.up("eventgridview") : null;
        if (!grid) return value || "";
        // Si el store de tipos todavía no está disponible, mostrar el valor crudo
        try {
          return grid.getTypeName(record.get("EventType"));
        } catch (e) {
          return value || "";
        }
      },
      sortable: true,
      groupable: true,
      width: 80
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "Name",
      sortable: true,
      flex: 1
    },
    {
      xtype: "gridcolumn",
      header: "Lugar",
      dataIndex: "PlaceAddress",
      sortable: true,
      flex: 1
    }
  ],

  initComponent: function () {
    this.callParent(arguments);

    // Paging bottom
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true
    });

    // Si el grid ya tiene store, lo conectamos
    var gridStore = this.getStore && this.getStore();
    if (gridStore) {
      pagingtoolbar.bindStore(gridStore);
    }

    this.addDocked(pagingtoolbar);

    // Top toolbar
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-date-add",
          text: "Nueva cita",
          action: "newEvent"
        },
        "-",
        {
          xtype: "datefield",
          value: new Date(),
          itemId: "date",
          fieldLabel: "Desde",
          labelWidth: 35
        },
        {
          xtype: "combo",
          store: "EventTypeStore",
          queryMode: "local",
          valueField: "Id",
          displayField: "Name",
          itemId: "tipo",
          fieldLabel: "Tipo",
          labelWidth: 30
        },
        {
          iconCls: "",
          text: "Buscar",
          action: "search"
        },
        {
          iconCls: "",
          text: "Todos",
          action: "getall",
          itemId: "todosBtn" // <- para seleccionarlo sin depender del texto
        }
      ]
    });

    this.addDocked(toolbar);

    // Si el store se asigna dinámicamente después, re-vincular el paging
    this.on("afterrender", function () {
      var st = this.getStore && this.getStore();
      if (st && pagingtoolbar) {
        pagingtoolbar.bindStore(st);
      }
    }, this, { single: true });
  },

  getTypeName: function (value) {
    // Lookup defensivo del store de tipos
    if (!this.EventTypeStore) {
      this.EventTypeStore = Ext.StoreManager.lookup("EventTypeStore");
    }
    var store = this.EventTypeStore;
    if (!store) return value; // si aún no existe, devolvemos el valor crudo

    // Si el store no cargó todavía, devolvemos value
    if (store.isLoading && store.isLoading()) return value;

    var type = store.findRecord && store.findRecord("Id", value, 0, false, true, true);
    var typeName = type ? type.get("Name") : value;
    return typeName;
  }
});
