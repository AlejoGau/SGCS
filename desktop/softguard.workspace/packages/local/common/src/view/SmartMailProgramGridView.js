Ext.define("Common.view.SmartMailProgramGridView", {
  extend: "Ext.grid.Panel",
  alias: [
    "widget.smartmailprogramgridview",
    "widget.smartmailprogramsearchview",
  ],
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
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 50,
      items: [
        {
          iconCls: "icon-email-edit",
          tooltip: getLocale("Visualizar programa"),
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("smartmailprogramgridview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("objectedit", rec, view);
          },
        },
      ],
    },
    {
      xtype: "gridcolumn",
      header: "Fecha envío",
      dataIndex: "DateStart",
      sortable: true,
      width: 150,
      renderer: function (value, obj, record) {
        return Ext.Date.format(record.get("IsoDateStart"), "d-m-Y H:i:s");
      },
    },
    {
      xtype: "gridcolumn",
      header: "Para",
      dataIndex: "Query",
      width: 200,
      sortable: true,
      renderer: function (value, column, record) {
        // Corrected email regex (single '@'). Supports simple emails and {a,b,c}@domain patterns.
        var allemails = /[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}|\{(?:\w+, *)+\w+\}@[\w.-]+/g;
        var queryStr = record.get("Query") || "";
        var arrEmails = queryStr.match(allemails);

        if (arrEmails && arrEmails.length > 1) {
          return "(" + arrEmails.length + ") " + arrEmails.join(",");
        } else if (arrEmails == null) {
          return record.get("To") ?? record.get("Destino");
        } else {
          return arrEmails.join(",");
        }
      },
    },
    {
      xtype: "gridcolumn",
      header: "De",
      dataIndex: "From",
      width: 250,
      sortable: true,
    } /*,{
            xtype : 'gridcolumn',
			header : 'Para',
            dataIndex : 'To',
            width : 150,
			sortable : true			
		}*/,
    {
      xtype: "gridcolumn",
      header: "Asunto",
      dataIndex: "Name",
      width: 250,
      //flex: 1
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Cuenta",
      dataIndex: "",
      width: 300,
      sortable: true,
      renderer: function (value, a, model) {
        if (model.get("cue_clinea") != "") {
          return (
            model.get("cue_clinea") +
            "-" +
            model.get("cue_ncuenta") +
            "-" +
            model.get("cue_cnombre")
          );
        } else {
          return getLocale("Sin relacion");
        }
      },
    },
    {
      xtype: "datecolumn",
      header: "Fecha inicio",
      dataIndex: "IsoDateStart",
      hidden: true,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Estado",
      dataIndex: "Status",
      sortable: true,
      width: 100,
      renderer: function (value) {
        //C : completo, A: activo, P: en proceso
        switch (value) {
          case "C":
            value = getLocale("Completo");
            break;
          case "A":
            value = getLocale("Activo");
            break;
          case "P":
            value = getLocale("En proceso");
            break;
          default:
            value = getLocale("No definido");
        }

        return value;
      },
    },
    {
      width: 100,
      hidden: true,
      xtype: "gridcolumn",
      header: "Prioridad",
      dataIndex: "Priority",
    },
  ],

  initComponent: function () {
    this.callParent(arguments);
    var me = this;

    let emailSelections = [];
    this.onSelectChange = function (selModel, selections) {
      me.down('[action="borrar"]').setDisabled(selections.length === 0);
      emailSelections = selections;
    };

    this.getSelectionModel().on("selectionchange", this.onSelectChange, this);

    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    var comboSearch = [
      ["Name", getLocale("Nombre")],
      ["cue_clinea", getLocale("Dealer")],
      ["cue_clinea-cue_ncuenta", getLocale("Dealer-Cuenta")],
      ["cue_ncuenta", getLocale("Cuenta")],
      ["cue_cnombre", getLocale("Nombre cuenta")],
    ];

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
                  {
                    xtype: "combo",
                    fieldLabel: "Estado",
                    queryMode: "local",
                    itemId: "filterStatus",
                    store: [
                      ["C", getLocale("Completo")],
                      ["A", getLocale("Activo")],
                      ["P", getLocale("En proceso")],
                      ["C", getLocale("Completo")],
                      ["I", getLocale("No definido")],
                    ],
                  },
                  {
                    xtype: "combo",
                    fieldLabel: "Prioridades",
                    queryMode: "local",
                    itemId: "filterPriority",

                    valueField: "value",

                    displayField: "text",
                    triggerAction: "all",
                    store: new Ext.data.SimpleStore({
                      data: [
                        ["900", getLocale("Todo mail x evento")],
                        ["800", getLocale("Mail x controles del sistema")],
                        ["700", getLocale("Envio de reportes por mail")],
                        ["600", getLocale("CRM")],
                        /********* *
                         * Daniel O. Medina https://basecamp.com/2249105/projects/14758734/todos/428894954
                         */

                        /************** */
                      ],
                      fields: ["value", "text"],
                    }),
                  },
                  {
                    xtype: "datefield",
                    fieldLabel: "Fecha desde",
                    name: "fechadesde",
                    itemId: "fechadesde",
                  },
                  {
                    xtype: "datefield",
                    fieldLabel: "Fecha hasta",
                    itemId: "fechahasta",
                    name: "fechahasta",
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
          itemId: "todos",
        },
        "-",
        {
          iconCls: "icon-email-add",
          text: "Nueva campaña",
          action: "smartmail",
          itemId: "smartmail",
        },
        "-",
        {
          iconCls: "icon-delete",
          text: "Eliminar",
          disabled: true,
          itemId: "delete",
          action: "borrar",
          handler: function (btn) {
            const formView = btn.up("smartmailprogramgridview");
            const view = formView ? formView : undefined;
            if (!view) {
              return;
            }

            const store = formView.getStore();
            Ext.MessageBox.buttonText = {
              yes: "Aceptar",
              no: "Cancelar",
            };

            Ext.MessageBox.confirm(
              getLocale("Eliminar"),
              getLocale(
                "¿Esta seguro que desea eliminar los emails seleccionados?"
              ),
              function (btn) {
                if (btn === "yes") {
                  for (let record of emailSelections) {
                    record.store.model.getProxy().initialConfig.url =
                      "/Rest/SmartMailProgram/";
                    record.store.model.getProxy().url =
                      "/Rest/SmartMailProgram/";

                    record.erase({
                      params: { force: true },
                      success: function () {
                        notify(`Email eliminado correctamente`);
                        store.remove(record);
                      },
                      failure: function () {
                        notify(`Email no pudo ser eliminado`);
                      },
                    });
                  }
                }
              }
            );
          },
        },
        "->",
        {
          iconCls: "icon-vcard",
          text: "SmartMailSender",
          scope: this,
          action: "sender",
          itemId: "sender",
        },
        "-",
        {
          text: "Templates smartmail",
          iconCls: "icon-application-view-tile",
          leaf: true,
          scope: this,
          view: "smarttemplategridview",
          closable: true,
          itemId: "smartmailTemplate",
          action: "smartmailTemplate",
          closeAction: "destroy",
        },
        {
          xtype: "button",
          itemId: "btnExport",
          text: "Exportar",
          iconCls: "icon-page-excel",
          action: "export",
        },
      ], // cierro items
    });

    this.addDocked(toolbar);
  },
});
