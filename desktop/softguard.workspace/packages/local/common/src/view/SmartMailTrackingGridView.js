//MIGRADO2024
Ext.define("Common.view.SmartMailTrackingGridView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.smarttrackinggridview", "widget.smarttrackingsearchview"],
  title: "Person",
  autoHeight: true,
  selModel: Ext.create("Ext.selection.CheckboxModel"),
  // plugins: [{ptype : '//pagingselectpersist'}],
  viewConfig: {
    trackOver: true,
    stripeRows: true,
    loadMask: false,
  },
  columns: [
    {
      xtype: "gridcolumn",
      header: "RowNumber",
      dataIndex: "RowNumber",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Fecha de envio",
      dataIndex: "SentDate",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Email",
      dataIndex: "Email",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Lectura",
      dataIndex: "Read",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Fecha de lectura",
      dataIndex: "ReadDate",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Ultima lectura",
      dataIndex: "LastReadDate",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Cantidad de lecturas",
      dataIndex: "QtyReadings",
      flex: 1,
    },
  ],

  initComponent: function () {
    var comboSearch = [["Email", getLocale("Email")]];

    if (!this.record) {
      comboSearch.push(["Subject", getLocale("Subject")]);
    }

    this.callParent(arguments);
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
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
                    xtype: "combo",
                    queryMode: "local",
                    itemId: "fieldName",
                    store: comboSearch,
                    fieldLabel: "Campo",
                  },
                  {
                    xtype: "textfield",
                    itemId: "query",
                    fieldLabel: "Valor",
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
          scope: this,
          action: "getall",
        },
      ], // cierro items
    });

    this.addDocked(toolbar);
  },
});
