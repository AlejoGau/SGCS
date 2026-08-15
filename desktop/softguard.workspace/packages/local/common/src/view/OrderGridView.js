Ext.define("Common.view.OrderGridView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.ordersearchview", "widget.ordergridview"],
  title: "Pedidos",
  autoHeight: true,
  //selModel: Ext.create('Ext.selection.CheckboxModel'),
  features: [
    {
      ftype: "groupingsummary",
      id: "groupingsummary",
      groupHeaderTpl: [
        "{children:this.getHeader} ({rows.length})",
        {
          getHeader: function (records) {
            var s = Ext.data.StoreManager.lookup("OrderItemStatusStore");
            var r = s.findRecord("Value", records[0].get("Status"));
            if (r) {
              var n = r.get("Name");
              return n;
            } else {
              return records[0].get("Status");
            }
          },
        },
      ],
      groupByText: getLocale("Agrupar"),
      startCollapsed: false,
      enableGroupingMenu: true,
      showGroupsText: getLocale("Mostrar en grupos"),
    },
  ],
  activeHelp: true,
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 60,
      items: [
        {
          iconCls: "icon-pencil",
          tooltip: "Modificar",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("ordersearchview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("objectedit", rec, view);
          },
        },
        {
          iconCls: "icon-printer",
          tooltip: getLocale("Imprimir cotizacion"),
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("ordersearchview");
            var tabpanel = view.up("tabpanel");
            var rec = grid.getStore().getAt(rowIndex);
            var title =
              getLocale("Comprobante cotización") + " (" + rec.get("Id") + ")";
            var mytab = tabpanel.down('[title="' + title + '"]');
            var filters = [
              {
                property: "Id",
                value: rec.get("Id"),
              },
            ];
            if (!mytab) {
              var newTab = Ext.widget("orderprintview", {
                iconCls: "icon-printer",
                record: rec,
                recordSearch: rec,
                title: title,
                closable: true,
                objectId: rec.get("Id"),
                translate: false,
                closeAction: "destroy",
                recordOrganizacion: view.record,
              });

              // agrego la paleta creada
              tabpanel.add(newTab);
              tabpanel.setActiveTab(newTab);
            }
          },
        },
        {
          iconCls: "icon-money-add",
          tooltip: "Generar comprobante",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("ordersearchview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("transformarordercomprobante", rec, view);
          },
          getClass: function (v, meta, rec) {
            if (
              rec.data.Status == 1 ||
              rec.data.Status == 2 ||
              rec.data.Status == 9
            ) {
              return "icon-money-add";
            } else {
              return "x-hide-display";
            }
          },
        },
      ],
      /*},{
            xtype : 'gridcolumn',
            header : 'Id',
            dataIndex : 'Id',					
            width : 50,
            sortable : true*/
    },
    {
      xtype: "gridcolumn",
      header: "Name",
      dataIndex: "Name",
      width: 400,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Organizacion",
      dataIndex: "orgName",
      width: 400,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "CUIT",
      dataIndex: "Cuit",
      width: 150,
      sortable: true,
    },
    {
      xtype: "datecolumn",
      header: "Fecha alta",
      dataIndex: "DateCreated",
      format: "d/m/Y",
      hidden: false,
      width: 80,
      sortable: true,
    },
    {
      xtype: "datecolumn",
      header: "Fecha probable",
      dataIndex: "ForecastDate",
      format: "d/m/Y",
      hidden: false,
      width: 100,
      sortable: true,
    },
    {
      xtype: "numbercolumn",
      header: "Valor Neto",
      dataIndex: "_subtotal",
      renderer: function (value) {
        var currencyParam = getParametro("SYSTEMCURRENCY", false, true);
        var symbol = currencyParam && currencyParam.codigo ? currencyParam.codigo : null;
        if (symbol) {
          return Ext.util.Format.currency(value, symbol + " ");
        } else {
          return value;
        }
      },
      width: 100,
      sortable: true,
      summaryType: "sum",
      summaryRenderer: function (value) {
        var currencyParam = getParametro("SYSTEMCURRENCY", false, true);
        var symbol = currencyParam && currencyParam.codigo ? currencyParam.codigo : null;
        if (symbol) {
          return Ext.util.Format.currency(value, symbol + " ");
        } else {
          return value;
        }
      },
    },
    {
      xtype: "numbercolumn",
      header: "Impuestos",
      dataIndex: "VAT",
      renderer: function (value) {
        var currencyParam = getParametro("SYSTEMCURRENCY", false, true);
        var symbol = currencyParam && currencyParam.codigo ? currencyParam.codigo : null;
        if (symbol) {
          return Ext.util.Format.currency(value, symbol + " ");
        } else {
          return value;
        }
      },
      width: 100,
      sortable: true,
      summaryType: "sum",
      summaryRenderer: function (value) {
        var currencyParam = getParametro("SYSTEMCURRENCY", false, true);
        var symbol = currencyParam && currencyParam.codigo ? currencyParam.codigo : null;
        if (symbol) {
          return Ext.util.Format.currency(value, symbol + " ");
        } else {
          return value;
        }
      },
    },
    {
      xtype: "numbercolumn",
      header: "Total",
      dataIndex: "TotalPrice",
      renderer: function (value) {
        var currencyParam = getParametro("SYSTEMCURRENCY", false, true);
        var symbol = currencyParam && currencyParam.codigo ? currencyParam.codigo : null;
        if (symbol) {
          return Ext.util.Format.currency(value, symbol + " ");
        } else {
          return value;
        }
      },
      width: 100,
      sortable: true,
      summaryType: "sum",
      summaryRenderer: function (value) {
        var currencyParam = getParametro("SYSTEMCURRENCY", false, true);
        var symbol = currencyParam && currencyParam.codigo ? currencyParam.codigo : null;
        if (symbol) {
          return Ext.util.Format.currency(value, symbol + " ");
        } else {
          return value;
        }
      },
    },
    {
      xtype: "gridcolumn",
      header: "Estado",
      dataIndex: "Status",
      hidden: false,
      width: 100,
      renderer: function (value, metadata, record) {
        var s = Ext.data.StoreManager.lookup("OrderItemStatusStore");
        var r = s.findRecord("Value", value);
        if (r) {
          var n = r.get("Name");
          record.set("_StatusDesc", n);
          return n;
        } else {
          return value;
        }
      },
      sortable: true,
    },
  ],

  initComponent: function () {
    this.callParent(arguments);

    if (this.record && this.record.recordOrganizacion) {
      this.moneySymbol = this.record.recordOrganizacion.get("mon_csymbol");
    } else if (!this.moneySymbol) {
      // Fallback to system currency when no organization record is available
      var currencyParam = getParametro("SYSTEMCURRENCY", false, true);
      if (currencyParam && currencyParam.codigo) {
        this.moneySymbol = currencyParam.codigo;
      }
    }

    // Propagate moneySymbol to all columns so renderers can access it
    var moneySymbol = this.moneySymbol;
    if (moneySymbol) {
      var columns = this.getColumns ? this.getColumns() : this.columns;
      Ext.each(columns, function (column) {
        column.moneySymbol = moneySymbol;
      });
    }

    this.view.targetTab = this.targetTab;
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-money-dollar",
          text: "Nueva cotización",
          itemId: "newOrder",
          action: "newOrder",
        },
        {
          iconCls: "icon-application-view-list",
          text: "Agrupar por estado",
          enableToggle: true,
          toggleGroup: "group",
          action: "groupStatus",
        },
        "-",
        {
          text: "Filtros",
          menu: {
            xtype: "menu",
            width: 280,
            items: [
              {
                xtype: "panel",
                bodyPadding: 5,
                items: [
                  {
                    xtype: "textfield",
                    itemId: "organizacion",
                    fieldLabel: "Organizacion",
                  },
                  {
                    xtype: "datefield",
                    itemId: "date",
                    fieldLabel: "Fecha probable",
                  },
                  {
                    xtype: "datefield",
                    itemId: "datecreate",
                    fieldLabel: "Fecha creacion",
                  },
                  {
                    xtype: "combo",
                    displayField: "Name",
                    queryMode: "local",
                    itemId: "estados",
                    valueField: "Value",
                    editable: false,
                    fieldLabel: "Estado",
                  },
                ],
              },
            ],
          },
        },
        {
          iconCls: "icon-find",
          text: "Buscar",
          scope: this,
          action: "search",
        },
        "-",
        {
          iconCls: "icon-find",
          text: "Todos",
          action: "getall",
          itemId: "getall",
        },
      ], // cierro items
    });

    this.addDocked(toolbar);

    this.addDocked(pagingtoolbar);
  },
});
