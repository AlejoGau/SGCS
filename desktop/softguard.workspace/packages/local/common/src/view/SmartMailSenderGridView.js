Ext.define("Common.view.SmartMailSenderGridView", {
  extend: "Ext.grid.Panel",
  alias: ["widget.smartmailsendergridview"],
  title: "Direcciones de envío",
  autoHeight: true,
  selType: "checkboxmodel",
  selModel: {
    checkOnly: true,
    mode: "MULTI",
  },
  //plugins: [{ptype : 'pagingselectpersist'}],
  viewConfig: {
    trackOver: true,
    stripeRows: true,
    loadMask: false,
  },
  columns: [
    {
      xtype: "actioncolumn",
      width: 30,
      items: [
        {
          iconCls: "icon-table-edit",
          tooltip: "Editar",
          handler: function (grid, rowIndex, colIndex, item, event) {
            // var view = grid.up("tablasmodemssmsgridview");
            var record = grid.getStore().getAt(rowIndex);
            // view.fireEvent("objectedit", rec, grid);

            var id = record.get("Id");

            var panel = Ext.getCmp("center");
            var title = sanitizarTitulo(record.get("sms_cdescripcion") ?? record.get("Name") ?? "");

            // me fijo si el tab existe, si es nuevo lo creo
            var mytab = panel.down('[title="' + title + '"]');
            if (!mytab) {
              var newTab = Ext.widget("smartmailsenderformview", {
                iconCls: "icon-table-edit",
                title: title,
                parent: grid,
                translate: false,
                record: record,
                targetTab: panel,
                objectId: id,
                closable: true,
                caller: grid,
              });

              panel.add(newTab);
              panel.setActiveTab(newTab);
            }
            // el existe, lo activo
            else {
              mytab.show();
            }
          },
        },
      ],
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "Name",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Email",
      dataIndex: "AccountName",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Firma",
      dataIndex: "Signature",
      flex: 1,
    },
  ],

  initComponent: function () {
    this.callParent(arguments);

    var comboSearch = [
      ["AccountName", getLocale("Email")],
      ["Name", getLocale("Nombre")],
    ];

    this.onSelectChange = function (selModel, selections) {
      this.down('[action="delete"]').setDisabled(selections.length == 0);
    };
    this.getSelectionModel().on("selectionchange", this.onSelectChange, this);

    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-table-add",
          text: "Nuevo",
          scope: this,
          action: "add",
        },
        "-",
        {
          iconCls: "icon-delete",
          text: "Eliminar",
          action: "delete",
          disabled: true,
          scope: this,
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
