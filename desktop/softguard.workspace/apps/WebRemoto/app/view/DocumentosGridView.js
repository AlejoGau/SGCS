Ext.define("WebRemoto.view.DocumentosGridView", {
  extend: "Ext.grid.GridPanel",
  alias: "widget.documentosnewgridview",
  title: "Archivos",
  itemId: "filegridview",
  autoHeight: true,
  //selModel: Ext.create('Ext.selection.CheckboxModel'),

  config: {
    searchName: "",
  },

  columns: [
    {
      xtype: "actioncolumn",
      width: 30,
      items: [
        {
          iconCls: "icon-book-link",
          tooltip: getLocale("Descargar"),
          handler: function (grid, rowIndex, colIndex) {
            var rec = grid.getStore().getAt(rowIndex);
            var url = "/rest/upload/get";
            url = Ext.String.urlAppend(url, "search=SoftguardMiscFile");
            url = Ext.String.urlAppend(url, "createFolder=true");
            url = Ext.String.urlAppend(url, "download=true");
            url = Ext.String.urlAppend(url, "Path=" + rec.get("Path"));
            url = Ext.String.urlAppend(url, "filename=" + rec.get("Name"));
            window.open(url);
          },
        },
        {
          iconCls: "icon-book-go",
          tooltip: getLocale("Abrir"),
          handler: function (grid, rowIndex, colIndex) {
            var rec = grid.getStore().getAt(rowIndex);
            var url = "/rest/upload/get";
            url = Ext.String.urlAppend(url, "search=SoftguardMiscFile");
            url = Ext.String.urlAppend(url, "createFolder=true");
            url = Ext.String.urlAppend(url, "download=false");
            url = Ext.String.urlAppend(url, "Path=" + rec.get("Path"));
            url = Ext.String.urlAppend(url, "filename=" + rec.get("Name"));
            window.open(url);
          },
        },
      ],
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "Name",
      flex: 1,
      sortable: true,
      width: 450,
    },
    {
      xtype: "gridcolumn",
      header: "Creación",
      dataIndex: "CreationTime",
      flex: 1,
      sortable: true,
      width: 120,
    },
    {
      xtype: "gridcolumn",
      header: "Tamaño",
      dataIndex: "Weight",
      flex: 1,
      renderer: Ext.util.Format.fileSize,
      sortable: true,
      width: 80,
    },
  ],

  initComponent: function () {
    this.callParent(arguments);
    var me = this;
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);
  },
});
