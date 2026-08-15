//MIGRADO2024
Ext.define("Common.view.ProductGridView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.productsearchview", "widget.productgridview"],
  title: "Productos",
  autoHeight: true,
  //selModel: Ext.create('Ext.selection.CheckboxModel'),
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 40,
      items: [
        {
          iconCls: "icon-Product",
          tooltip: getLocale("Modificar"),
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("productgridview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("objectedit", rec, grid);
          },
        },
      ],
    },
    /*{
      xtype: "gridcolumn",
      header: "Id",
      dataIndex: "Id",
      hidden: true,
    },*/
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
      width: 200,
      //flex: 1
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Precio",
      dataIndex: "Price",
      align: "right",
      renderer: function (value, obj, record) {
        return Ext.util.Format.currency(
          value,
          record.get("mon_csymbol")
            ? record.get("mon_csymbol")
            : getParametro("SYSTEMCURRENCY", false, true).codigo
        );
      },
      width: 100,
    } /*
    {
      xtype: "gridcolumn",
      header: "Costo",
      align: "right",
      dataIndex: "Cost",
      renderer: function (value, obj, record) {
        return Ext.util.Format.currency(
          value,
          record.get("mon_csymbol")
            ? record.get("mon_csymbol")
            : getParametro("SYSTEMCURRENCY", false, true).codigo
        );
      },
      width: 100,
      hidden: true,
    },*/,
    {
      xtype: "gridcolumn",
      header: "Impuesto",
      dataIndex: "VAT",
      align: "right",
      width: 100,
    } /*
    {
      xtype: "gridcolumn",
      header: "ObjectTypeId",
      dataIndex: "ObjectTypeId",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "ObjectTypeName",
      dataIndex: "ObjectTypeName",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Referencia",
      dataIndex: "SmallComment",
      hidden: true,
      sortable: false,
    },*/,
  ],

  initComponent: function () {
    this.callParent(arguments);
    this.view.targetTab = this.targetTab;
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-add",
          text: "Nuevo",
          scope: this,
          action: "add",
          itemId: "add",
        },
        "-",
        {
          xtype: "textfield",
          itemId: "query",
          fieldLabel: "Nombre",
          labelWidth: 50,
        },
        {
          xtype: "textfield",
          itemId: "querycode",
          fieldLabel: "Código",
          labelWidth: 50,
        },
        {
          text: "Rubro",
          menu: {
            xtype: "menu",
            layout: "fit",
            width: 420,
            items: {
              xtype: "taxonomiesmastertree",
              preventHeader: true,
              rootId: 34,
              height: 400,
              width: 414,
            },
          },
        },
        {
          xtype: "button",
          text: "Buscar",
          itemId: "btnBuscar",
        },
        {
          iconCls: "icon-find",
          text: "Todos",
          scope: this,
          action: "getall",
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
          placeholder: "Todos los items",
        },
        {
          xtype: "button",
          text: "Salir",
          itemId: "salir",
          hidden: true,
        },
      ], // cierro items
    });
    this.addDocked(toolbar);

    this.addDocked(pagingtoolbar);
  },
});
