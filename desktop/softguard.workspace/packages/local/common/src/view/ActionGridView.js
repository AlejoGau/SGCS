Ext.define("Common.view.ActionGridView", {
  extend: "Ext.grid.GridPanel",
  alias: "widget.actiongridview",
  title: "Historial",
  autoHeight: true,
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 25,
      items: [
        {
          getClass: function (
            field,
            metadata,
            record,
            rowindex,
            colindex,
            store
          ) {
            return "icon-Action-" + record.get("ActionType");
          },
        },
      ],
      //onItemClick: function (view, record, item, index, e, options)
      handler: function (grid, rowIndex, colIndex, item, event) {
        var view = grid.up("actiongridview");
        var rec = grid.getStore().getAt(rowIndex);
        view.fireEvent("itemdblclick", grid, rec);
      },
    },
    {
      /*	xtype : 'gridcolumn',
			header : 'Id',
			dataIndex : 'Id',
			sortable : true,
            hidden: true
		},{*/
      xtype: "gridcolumn",
      header: "Tipo",
      dataIndex: "ActionType",
      sortable: true,
      groupable: true,
      renderer: function (value, metadata, record) {
        var store = Ext.StoreManager.lookup("ActionTypeStore");
        var record = store.findRecord("Value", value);

        if (record) {
          return record.get("Name");
        } else {
          return value;
        }
      },
      width: 120,
    },
    {
      xtype: "datecolumn",
      header: "Fecha",
      format: "d/m/Y",
      sortable: true,
      dataIndex: "Date",
      width: 80,
    },
    {
      xtype: "gridcolumn",
      header: "Descripción",
      dataIndex: "Name",
      sortable: true,
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Obsevación",
      dataIndex: "Description",
      renderer: function (value, metadata, record) {
        var str = Ext.util.Format;
        return str.stripTags(record.get("Description"));
      },
      flex: 1,
    },
  ],

  initComponent: function () {
    this.callParent(arguments);
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-Action",
          text: "Nueva acción",
          action: "newAction",
        },
        {
          iconCls: "icon-email",
          text: "Nuevo Mail",
          action: "newMail",
        },
        "-",
        {
          xtype: "datefield",
          value: new Date(),
          itemId: "date",
          fieldLabel: "Desde",
          labelWidth: 35,
        },
        {
          xtype: "combo",
          store: "ActionTypeStore",
          queryMode: "local",
          valueField: "Value",
          displayField: "Name",
          itemId: "tipo",
          fieldLabel: "Tipo",
          labelWidth: 30,
        },
        {
          iconCls: "",
          text: "Buscar",
          action: "search",
        },
      ], // cierro items
    });

    this.addDocked(toolbar);
  },
});
