//MIGRADO2024
Ext.define("Common.view.ProductHelperView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.producthelperview"],
  title: "Productos y Servicios",
  autoHeight: true,
  closeAction: "destroy",
  //selModel: Ext.create('Ext.selection.CheckboxModel'),
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 40,
      items: [
        {
          iconCls: "icon-basket-edit",
          tooltip: getLocale("Modificar Producto"),
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("producthelperview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("productselected", rec, view);
          },
        },
      ],
    },
    {
      xtype: "gridcolumn",
      header: "Código",
      dataIndex: "Code",
      sortable: true,
      hidden: false,
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "Name",
      flex: 1,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Precio",
      dataIndex: "Price",
      itemId: "Price",
      renderer: function (value, obj, record) {
        const finalPrice = record.get("final_price");
        return Ext.util.Format.currency(finalPrice, record.get("mon_csymbol") + " ");
      },
      width: 100,
    },
    {
      xtype: "gridcolumn",
      header: "Referencia",
      dataIndex: "SmallComment",
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Tipo",
      dataIndex: "pro_itipo",
      sortable: true,
      renderer: function (value) {
        if (value == 0) {
          return getLocale("Otros");
        } else if (value == 1) {
          return getLocale("Producto");
        } else if (value == 2) {
          return getLocale("Servicio");
        }
      },
    },
  ],

  initComponent: function () {
    this.callParent(arguments);
    this.view.targetTab = this.targetTab;
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    var items = [
      {
        xtype: "textfield",
        itemId: "query",
        fieldLabel: "Nombre",
        labelWidth: 50,
      },
      {
        xtype: "textfield",
        itemId: "queryid",
        fieldLabel: "Código",
        labelWidth: 40,
      },
      {
        xtype: "button",
        text: "Buscar",
        itemId: "btnBuscar",
      },
      "->",
      {
        xtype: "combo",
        itemId: "listas",
        displayField: "mglp_nombre",
        valueField: "Id",
        fieldLabel: "Listas",
        queryMode: "local",
        width: 250,
        hidden: true,
        labelWidth: 50,
      } /*,
            {
                xtype: 'button',
                text: 'Cambiar lista',
                itemId: 'btnLista'
        }*/,
    ];
    if (this.multiSelect) {
      this.selModel = Ext.create("Ext.selection.CheckboxModel");
      items.unshift({
        iconCls: "",
        text: "Enviar Selección",
        action: "selected",
      });
    }

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: items,
    });
    this.addDocked(toolbar);
  },
});
