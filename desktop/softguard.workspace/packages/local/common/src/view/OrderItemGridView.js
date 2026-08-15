Ext.define("Common.view.OrderItemGridView", {
  extend: "Ext.grid.GridPanel",
  alias: "widget.orderitemsearchview",
  title: "Items",
  autoHeight: true,
  features: [
    {
      ftype: "summary",
      dock: "bottom",
    },
  ],

  //selModel: Ext.create('Ext.selection.CheckboxModel'),
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 40,
      items: [
        {
          iconCls: "icon-delete",
          tooltip: getLocale("Eliminar"),
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("orderitemsearchview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("deleteitem", rec, view);
          },
        },
      ],
    },
    {
      xtype: "gridcolumn",
      header: "Artículo",
      dataIndex: "Code",
      width: 60,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "Name",
      width: 200,
      sortable: true /*,
            // se mapeo el campo name a nombreproducto desde el model dedalo 5/2/2018
            renderer: function (value,col, record) {
                  if(value != '') {
                    return value;
                  } else {
                    return record.get('nombreProducto')
                  }   
            } */,
    },
    {
      xtype: "numbercolumn",
      header: "Cantidad",
      dataIndex: "Quantity",
      width: 100,
      sortable: true,
      summaryType: "count",
      summaryRenderer: function (value, summaryData, dataIndex) {
        var text = value !== 1 ? getLocale("Items") : getLocale("Item");
        return value + " " + text;
      },
    },
    {
      xtype: "numbercolumn",
      header: "Valor",
      dataIndex: "Price",
      renderer: function (value) {
        if (this.moneySymbol) {
          return Ext.util.Format.currency(value, this.moneySymbol);
        } else {
          return value;
        }
      },
      width: 100,
      sortable: true,
    },
    {
      xtype: "numbercolumn",
      header: "Impuesto (%)",
      dataIndex: "VAT",
      width: 100,
      sortable: true,
    },
    {
      xtype: "numbercolumn",
      header: "Neto",
      dataIndex: "_subtotal",
      renderer: function (value) {
        if (this.moneySymbol) {
          return Ext.util.Format.currency(value, this.moneySymbol);
        } else {
          return value;
        }
      },
      width: 100,
      sortable: false,
      summaryType: "sum",
      summaryRenderer: function (value) {
        var view = this.up("orderitemsearchview");
        var record = view.record;
        var total =
          view.view.summaryFeature.summaryData[
            view.down("[dataIndex = _subtotal]").id
          ];

        if (this.moneySymbol) {
          return Ext.util.Format.currency(total, this.moneySymbol);
        } else {
          return value;
        }
      },
    },
    {
      xtype: "numbercolumn",
      header: "Impuesto",
      dataIndex: "_VAT",
      summaryType: "sum",
      summaryRenderer: function (value) {
        var view = this.up("orderitemsearchview");
        var record = view.record;
        var total =
          view.view.summaryFeature.summaryData[
            view.down("[dataIndex = _VAT]").id
          ];

        if (this.moneySymbol) {
          return Ext.util.Format.currency(total, this.moneySymbol);
        } else {
          return value;
        }
      },
      renderer: function (value) {
        if (this.moneySymbol) {
          return Ext.util.Format.currency(value, this.moneySymbol);
        } else {
          return value;
        }
      },
      width: 100,
      sortable: true,
    },
    {
      xtype: "numbercolumn",
      header: "Total",
      dataIndex: "_total",
      renderer: function (value) {
        if (this.moneySymbol) {
          return Ext.util.Format.currency(value, this.moneySymbol);
        } else {
          return value;
        }
      },
      width: 100,
      sortable: false,
      summaryType: "sum",
      summaryRenderer: function (value) {
        var view = this.up("orderitemsearchview");
        var viewOrder = view.up("orderformview");
        var record = view.record;
        var current = record.get("TotalPrice");
        var vat =
          view.view.summaryFeature.summaryData[
            view.down("[dataIndex = _VAT]").id
          ];
        var total =
          view.view.summaryFeature.summaryData[
            view.down("[dataIndex = _total]").id
          ];
        if (
          Ext.util.Format.number(total, "0.00") !=
            Ext.util.Format.number(current, "0.00") &&
          value != 0
        ) {
          record.set("TotalPrice", total);
          record.set("VAT", vat);
          if (record.get("ForecastDate") == null) {
            record.set("ForecastDate", new Date(-62135586000000));
          }
          record.save({
            callback: function (record, operation) {
              // Order totals saved successfully
            },
          });
        }

        if (this.moneySymbol) {
          return Ext.util.Format.currency(total, this.moneySymbol);
        } else {
          return value;
        }
      },
    },
    {
      xtype: "gridcolumn",
      header: "Estado",
      dataIndex: "Status",
      width: 200,
      hidden: true,
      sortable: true,
      /*editor: {
                xtype: 'combo',
                allowBlank: false,
                store: 'OrderItemStatusStore',
                queryMode: 'local',
                displayField: 'Name',
                valueField: 'Value'
            },*/
      renderer: function (value) {
        var s = Ext.data.StoreManager.lookup(
          "Common.store.OrderItemStatusStore",
        );
        var r = s.findRecord("Value", value);
        if (r) {
          var n = r.get("Name");
          return n;
        } else {
          return value;
        }
      },
    },
  ],

  initComponent: function () {
    this.callParent(arguments);

    if (!this.moneySymbol) {
      this.moneySymbol =
        getParametro("SYSTEMCURRENCY", false, true).codigo + " ";
    }

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-add",
          text: "Nuevo item",
          scope: this,
          action: "add",
        },
      ], // cierro items
    });

    this.addDocked(toolbar);
  },
});
