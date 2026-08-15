//MIGRADO2024
Ext.define("Common.view.SmartMailTemplateGridView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.smarttemplategridview", "widget.smarttemplategridsearchview"],
  title: "Templates",
  autoHeight: true,
  selType: "checkboxmodel",
  selModel: {
    checkOnly: true,
    mode: "MULTI",
  },
  viewConfig: {
    trackOver: true,
    stripeRows: true,
    loadMask: false,
  },
  statics: {
    isCreated: false,
  },
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 50,
      items: [
        {
          iconCls: "",
          tooltip: getLocale("Seleccione para eliminar"),
          handler: function (grid, rowIndex, colIndex, item, event) {},
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
      header: "Descripcion",
      dataIndex: "Description",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Asunto",
      dataIndex: "Subject",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Estado",
      dataIndex: "Status",
      hidden: true,
      flex: 1,
    },
    {
      xtype: "datecolumn",
      header: "Fecha de creacion",
      dataIndex: "DateCreated",
      format: "d-m-Y",
      hidden: true,
      flex: 1,
    },
  ],

  initComponent: function () {
    if (
      Common.view.SmartMailTemplateGridView &&
      Common.view.SmartMailTemplateGridView.isCreated
    ) {
      throw new Error("An instance of SmartTemplateGridView already exists!");
    }

    Common.view.SmartMailTemplateGridView.isCreated = true;

    var comboSearch = [
      ["Name", getLocale("Nombre")],
      ["Subject", getLocale("Asunto")],
      ["Description", getLocale("Descripcion")],
    ];

    this.on("destroy", function () {
      Common.view.SmartMailTemplateGridView.isCreated = false;
    });

    this.callParent(arguments);
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    let templatesSelection = [];
    this.onSelectChange = function (selModel, selections) {
      this.down('[action="borrar"]').setDisabled(selections.length === 0);
      templatesSelection = selections;
    };

    this.getSelectionModel().on("selectionchange", this.onSelectChange, this);

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-add",
          text: "Nuevo",
          scope: this,
          action: "add",
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
        {
          iconCls: "icon-delete",
          text: "Eliminar",
          disabled: true,
          itemId: "delete",
          action: "borrar",
          handler: function (btn) {
            const formView = btn.up("smarttemplategridview");
            const view = formView ? formView : undefined;
            if (!view) {
              return;
            }

            const store = formView.getStore();
            Ext.MessageBox.buttonText = {
              yes: "Aceptar",
              no: "Cancelar",
            };

            const date = new Date();
            Ext.MessageBox.confirm(
              getLocale("Eliminar"),
              getLocale(
                "¿Esta seguro que desea eliminar los templates seleccionados?"
              ),
              function (btn) {
                if (btn === "yes") {
                  for (let record of templatesSelection) {
                    Ext.Ajax.request({
                      url: `/Rest/SmartMailTemplate/${record.get(
                        "Id"
                      )}?dc=${date.getTime()}`,
                      method: "DELETE",
                      success: function (resp, operation) {
                        if (operation.success) {
                          setTimeout(() => {
                            notify("Se eliminó con éxito");
                            store.load();
                          }, 2000);
                        }
                      },
                    });
                  }
                }
              }
            );
          },
        },
      ], // cierro items
    });

    this.addDocked(toolbar);
  },
});
