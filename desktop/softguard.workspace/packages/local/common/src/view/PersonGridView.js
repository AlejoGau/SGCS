Ext.define("Common.view.PersonGridView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.persongridview", "widget.personsearchview"],
  title: "Person",
  autoHeight: true,
  // selModel: Ext.create('Ext.selection.CheckboxModel'),
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
  activeHelp: true,
  showGroupsButton: true,
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 40,
      items: [
        {
          iconCls: "icon-userEdit",
          tooltip: "Modificar Person",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("persongridview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("objectedit", rec, view);
          },
        },
      ],
    },
    {
      /*	xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'Id',					
			hidden: true			
		},{*/
      xtype: "gridcolumn",
      header: "Organizacion",
      dataIndex: "Organizacion",
      getSortParam: function () {
        return "orga.Name";
      },
      width: 150,
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "Name",
      width: 150,
      getSortParam: function () {
        return "o." + this.dataIndex;
      },
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Apellido",
      dataIndex: "LastName",
      width: 150,
      getSortParam: function () {
        return "o." + this.dataIndex;
      },
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Empresa",
      dataIndex: "Company",
      itemId: "columnEntidad",
      getSortParam: function () {
        return "o." + this.dataIndex;
      },
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Email",
      dataIndex: "Email",
      getSortParam: function () {
        return "o." + this.dataIndex;
      },
      width: 150,
    },
    {
      xtype: "gridcolumn",
      header: "País",
      dataIndex: "Country",
      renderer: function (value, metadata, record) {
        var store = Ext.data.StoreManager.lookup("Common.store.GeographyStore");
        var place = store.findRecord("Id", value);
        if (place) return place.get("Name");
        else return value;
      },
      sortable: false,
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Provincia",
      renderer: function (value, metadata, record) {
        var store = Ext.data.StoreManager.lookup("Common.store.GeographyStore");
        var place = store.findRecord("Id", value);
        if (place) return place.get("Name");
        else return value;
      },
      dataIndex: "State",
      sortable: false,
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Dirección",
      dataIndex: "Address",
      sortable: true,
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Código Postal",
      dataIndex: "PostalCode",
      sortable: true,
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Celular",
      dataIndex: "MobilePhone",
      sortable: false,
      width: 200,
    },
    {
      xtype: "gridcolumn",
      header: "Teléfono Laboral",
      dataIndex: "BusinessPhone",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Web",
      dataIndex: "Web",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Fecha Cumpleaños",
      dataIndex: "Birthday",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Trabajo",
      dataIndex: "JobTitle",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Estado",
      dataIndex: "Status",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Email 2",
      dataIndex: "Email2",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Ocupación",
      dataIndex: "Occupation",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Ubicación",
      dataIndex: "Location",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Ultima Actualización",
      dataIndex: "LastUpdate",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "AccountId",
      dataIndex: "AccountId",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "ObjectTypeName",
      dataIndex: "ObjectTypeName",
      hidden: true,
    },
  ],

  initComponent: function () {
    this.callParent(arguments);

    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    var toolbarItems = [
        {
          xtype: "combobox",
          itemId: "pagesize",
          fieldLabel: "Tamaño de página",
          store: [25, 50, 100, 10000],
          width: 160,
          listeners: {
            scope: this,
            change: function (combo, value) {
              var store = this.getStore();
             store.pageSize = value;
              store.load();
            },
          },
        },
        {
          text: "Filtros",
          itemId: "filtros",
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
                    store: [
                      ["o.[Name]", getLocale("Nombre")],
                      ["o.[LastName]", getLocale("Apellido")],
                      ["o.[Email]", getLocale("Email")],
                    ],
                    fieldLabel: "Campo",
                    labelWidth: 80,
                  },
                  {
                    xtype: "textfield",
                    itemId: "query",
                    fieldLabel: "Valor",
                    labelWidth: 80,
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
          itemId: "search",
        },
        "-",
        {
          iconCls: "icon-find",
          text: "Todos",
          scope: this,
          action: "getall",
          itemId: "todos",
        },
        {
          iconCls: "icon-Person-add",
          text: "Nuevo Contacto",
          action: "newPerson",
          itemId: "newPerson",
        },
        "-",
        {
          iconCls: "icon-user-add",
          text: "Importar persona",
          scope: this,
          itemId: "addPerson",
          action: "add",
        },
        {
          iconCls: "icon-user-delete",
          text: "Remover persona",
          scope: this,
          itemId: "removePerson",
          action: "remove",
        },
        // {
        //   iconCls: "icon-email-add",
        //   text: "Nueva campaña",
        //   scope: this,
        //   action: "smartmail",
        //   itemId: "smartmail",
        // },
        "->",
      ];

    if (this.showGroupsButton !== false) {
      toolbarItems.push({
        text: "Grupos",
        itemId: "perfil",
        menu: {
          xtype: "menu",
          layout: "fit",
          width: 420,
          items: {
            xtype: "taxonomiesmastertree",
            preventHeader: true,
            rootId: 0,
            height: 400,
            width: 414,
          },
        },
      });
    }

    toolbarItems.push({
      xtype: "button",
      text: "Exportar",
      itemId: "btnExportar",
      action: "export",
      iconCls: "icon-page-excel",
    });

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: toolbarItems,
    });

    this.addDocked(toolbar);
  },
});
