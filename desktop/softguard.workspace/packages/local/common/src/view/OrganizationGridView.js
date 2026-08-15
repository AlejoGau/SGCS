Ext.define("Common.view.OrganizationGridView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.organizationgridview", "widget.organizationsearchview"],
  title: "Clientes",
  autoHeight: true,
  selType: "checkboxmodel",
  hideCuentaCorriente: false,
  hideWallpaper: true,
  width: 1100,
  //layout: 'fit',
  selModel: {
    checkOnly: true,
    mode: "MULTI",
  },
  //plugins: [{ptype : 'pagingselectpersist'}],

  activeHelp: true, //trae el help
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 70,
      items: [
        {
          iconCls: "icon-building",
          tooltip: "Modificar Organización",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("organizationgridview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("objectedit", rec, view);
          },
        },
        {
          iconCls: "icon-money-dollar",
          tooltip: "Cuenta corriente",
          itemId: "CuentaCorriente",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("organizationgridview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("showCuentaCorriente", rec, view);
          },
        },
        {
          iconCls: "icon-photos",
          tooltip: "Wallpapers",
          itemId: "wallpaper",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("organizationgridview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("showWallpaper", rec, view);
          },
        },
      ],
    },
    {
      header: "&nbsp;",
      dataIndex: "cnc_type",
      width: 26,
      sortable: false,
      hidden: true,
      renderer: function (value, metaData, record) {
        metaData.style += "padding:0px;";
        var msg = record.get("cnc_name");
        var iconos = "";
        if (value == 1) {
          iconos +=
            '<img src="/resources/global/images/icons/page_link.png" data-qtip="' +
            msg +
            '" />';
        }
        return iconos;
      },
    },
    {
      /*	xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'Id',					
			hidden: true			
		},{*/
      xtype: "datecolumn",
      header: "Fecha de Creación",
      dataIndex: "o.DateCreated",
      renderer: function (value, metadata, record, colIndex, store, view) {
        return Ext.Date.format(record.get("DateCreated"), "d/m/Y");
      },
      //format:'d/m/Y'
    },
    {
      xtype: "gridcolumn",
      header: "Estado",
      itemId: "Status",
      dataIndex: "Status",
      width: 180,
      renderer: function (value, metadata, record, colIndex, store, view) {
        if (value >= 0) {
          var store = Ext.StoreManager.lookup("OrganizationStatusStore");
          var status = store.findRecord("Value", value);
          var rclass = "";

          switch (value) {
            case 1:
              rclass = "nohabilitado";
              break;
            case 2:
              rclass = "nohabilitado";
              break;
            case 3:
              rclass = "nohabilitado";
              break;
            case 4:
              rclass = "prueba";
              break;
            case 5:
              rclass = "prueba";
              break;
            case 6:
              rclass = "prueba";
              break;
            case 7:
              rclass = "habilitado";
              break;
            case 8:
              rclass = "habilitado";
              break;
            case 9:
              rclass = "habilitado";
              break;
          }

          if (rclass != "") metadata.tdCls = rclass;

          if (status) return status.get("Name");
          else return value;
        }
      },
      hidden: false,
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "o.Name",
      minWidth: 200,
      flex: 1,
      sortable: true,
      renderer: function (value, metadata, record, colIndex, store, view) {
        return record.get("Name");
      },
    },
    {
      xtype: "gridcolumn",
      header: "Nombre Legal",
      dataIndex: "o.LegalName",
      hidden: true,
      minWidth: 200,
      flex: 1,
      sortable: true,
      renderer: function (value, metadata, record, colIndex, store, view) {
        return record.get("LegalName");
      },
    },
    {
      xtype: "gridcolumn",
      header: "Teléfono",
      dataIndex: "Phone",
      hidden: false,
    },
    {
      xtype: "gridcolumn",
      header: "País",
      dataIndex: "pcountry.pro_cdescripcion",
      sortable: true,
      renderer: function (value, metadata, record, colIndex, store, view) {
        return record.get("CountryName");
      },
    },
    {
      xtype: "gridcolumn",
      header: "Provincia",
      dataIndex: "pstate.pro_cdescripcion",
      sortable: true,
      renderer: function (value, metadata, record, colIndex, store, view) {
        return record.get("StateName");
      },
    },
    {
      xtype: "gridcolumn",
      header: "Localidad",
      dataIndex: "pstate.pro_cdescripcion",
      sortable: true,
      renderer: function (value, metadata, record, colIndex, store, view) {
        return record.get("City");
      },
    },
    {
      xtype: "gridcolumn",
      header: "Dirección",
      dataIndex: "Address",
      sortable: true,
      width: 200,
    },
    {
      xtype: "gridcolumn",
      header: "Código Postal",
      dataIndex: "Zip",
      hidden: true,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Phone",
      dataIndex: "Mobile",
      sortable: true,
      hidden: true,
      width: 100,
    },
    {
      xtype: "gridcolumn",
      header: "Email",
      dataIndex: "Email",
      width: 200,
    },
    {
      xtype: "gridcolumn",
      header: "Web",
      dataIndex: "Web",
      hidden: true,
    },
  ],

  initComponent: function () {
    this.callParent(arguments);
    var view = this;

    var computeIsAdmin = function () {
      var storeSecurity =
        window.SecurityModulesStore ||
        Ext.data.StoreManager.lookup("SecurityModulesStore");
      if (!storeSecurity) return false;
      var recAdmin = storeSecurity.findRecord(
        "KeyReference",
        "Administrator",
        0,
        false,
        false,
        true
      );
      return !!(recAdmin && recAdmin.get("Available") === true);
    };

    var isAdmin = computeIsAdmin();

    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      /*layout: {
                overflowHandler: 'Menu'
            },*/
      enableOverflow: true,
      items: [
        {
          text: "Nueva Organización",
          tooltip: "Nueva Organización",
          itemId: "createorganization",
          iconCls: "icon-add",
          action: "createorganization",
        },
        {
          iconCls: "icon-email-add",
          text: "Envío masivo",
          action: "smartmail",
          itemId: "smartmail",
        },
        "-",
        {
          text: "Filtros",
          menu: {
            xtype: "menu",
            width: 400,
            hideOnClick: false,
            ignoreParentClicks: true,
            closeAction: "method-hide",
            items: [
              {
                xtype: "form",
                bodyPadding: 5,
                defaultButton: "organizationgridview #search",
                items: [
                  {
                    xtype: "textfield",
                    itemId: "Name",
                    emptyText: getLocale("Nombre"),
                  },
                  {
                    xtype: "textfield",
                    itemId: "LegalName",
                    emptyText: getLocale("Nombre Legal"),
                  },
                  {
                    /** 12/11/2020 Daniel O. Medina */
                    /** https://basecamp.com/2249105/projects/14758734/todos/428889380
                     *  agrego filtro desde/hasta en fecha de creación
                     */
                    xtype: "datefield",
                    itemId: "dateCreatedDesde", //itemId: 'dateCreated',
                    emptyText: getLocale("Fecha de Creacion Desde"),
                  },
                  {
                    /** 12/11/2020 Daniel O. Medina */
                    /** https://basecamp.com/2249105/projects/14758734/todos/428889380
                     *  agrego filtro desde/hasta en fecha de creación
                     */
                    xtype: "datefield",
                    itemId: "dateCreatedHasta", //itemId: 'dateCreated',
                    emptyText: getLocale("Fecha de Creacion Hasta"),
                  },
                  {
                    xtype: "combo",
                    name: "Country",
                    itemId: "comboPaisOrgGrid",
                    menuContainer: true,
                    plugins: ["clearbutton"],
                    queryMode: "local",
                    valueField: "Id",
                    displayField: "Name",
                    allowBlank: true,
                    foceSelection: true,
                    editable: false,
                    lastQuery: "",
                    emptyText: getLocale("País"),
                    listeners: {
                      change: function (combo, newvalue, oldvalue) {
                        var view = combo.up("form");
                        var stateCombo = view.down("#comboProvinciaOrgGrid");
                        var stateStore = stateCombo.getStore();

                        stateStore.filter({
                          property: "Parent",
                          id: "Parent",
                          value: newvalue ? newvalue : "",
                        });
                        stateCombo.setValue("");
                      },
                    },
                  },
                  {
                    xtype: "combo",
                    name: "State",
                    itemId: "comboProvinciaOrgGrid",
                    menuContainer: true,
                    queryMode: "local",
                    plugins: ["clearbutton"],
                    foceSelection: true,
                    editable: true,
                    editable: false,
                    valueField: "Id",
                    displayField: "Name",
                    emptyText: getLocale("Provincia"),
                    lastQuery: "",
                  },
                  {
                    xtype: "textfield",
                    itemId: "localidad",
                    emptyText: getLocale("Localidad"),
                  },
                  {
                    xtype: "textfield",
                    itemId: "direccion",
                    emptyText: getLocale("Dirección"),
                  },
                  {
                    xtype: "textfield",
                    itemId: "telefonos",
                    emptyText: getLocale("telefonos"),
                  },
                  {
                    xtype: "textfield",
                    itemId: "codigoPostal",
                    emptyText: getLocale("Código Postal"),
                  },
                  {
                    xtype: "textfield",
                    itemId: "email",
                    emptyText: getLocale("Email"),
                  },
                  {
                    /**********************************************************/
                    xtype: "fieldset",
                    title: "Tipo/Estado",
                    items: [
                      {
                        /** 12/11/2020 Daniel O. Medina */
                        /** https://basecamp.com/2249105/projects/14758734/todos/428889380
                         *  agrego filtro desde/hasta en fecha de creación
                         */
                        xtype: "combo",
                        name: "Status",
                        fieldLabel: getLocale("Tipo"),
                        labelAlign: "right",
                        labelWidth: 50,
                        queryMode: "local",
                        valueField: "Value",
                        displayField: "Name",
                        menuContainer: true,
                        plugins: ["clearbutton"],
                        editable: false,
                        //emptyText: getLocale('Estado'),
                        itemId: "status",
                      },
                      {
                        xtype: "fieldset",
                        itemId: "fieldsetChk",
                        layout: {
                          type: "table",
                          columns: 2,
                        },

                        columns: 2,
                        border: 0,
                        title: getLocale("Estado:"),
                        items: [
                          {
                            width: 150,
                            border: 0,
                            items: [
                              {
                                xtype: "checkbox",
                                itemId: "organizacionesChk",
                                labelWidth: 100,
                                fieldLabel: getLocale("Organizaciones"),
                                boxLabel:
                                  '<img src="/resources/softguard/images/icons/icn_dealer_cuentas_habilitadas.png" style="width:16px;height:16px;vertical-align:middle;margin-right:5px;">',
                                labelAlign: "right",
                              },
                            ],
                          },
                          {
                            width: 150,
                            border: 0,
                            items: [
                              {
                                xtype: "checkbox",
                                itemId: "enprocesoChk",
                                labelWidth: 100,
                                labelAlign: "right",
                                name: "Landing",
                                fieldLabel: getLocale("En proceso"),
                                boxLabel:
                                  '<img src="/resources/softguard/images/icons/icn_dealer_cuentas_amarillo.png" style="width:16px;height:16px;vertical-align:middle;margin-right:5px;">',
                              },
                            ],
                          },
                          {
                            width: 150,
                            border: 0,
                            items: [
                              {
                                xtype: "checkbox",
                                itemId: "prospectoChk",
                                labelWidth: 100,
                                labelAlign: "right",
                                fieldLabel: getLocale("Prospecto"),
                                boxLabel:
                                  '<img src="/resources/softguard/images/icons/icn_dealer_cuentas_no_habilitadas.png" style="width:16px;height:16px;vertical-align:middle;margin-right:5px;">',
                              },
                            ],
                          },
                          {
                            width: 150,
                            border: 0,
                            items: [
                              {
                                xtype: "checkbox",
                                itemId: "inactivoChk",
                                labelWidth: 100,
                                labelAlign: "right",
                                fieldLabel: getLocale("Inactivo"),
                                boxLabel:
                                  '<img src="/resources/global/images/icons/delete.png" style="width:16px;height:16px;vertical-align:middle;margin-right:5px;">',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        xtype: "fieldset",
                        itemId: "fieldset",
                        border: 0,
                        title: getLocale("Vínculo"),
                        items: [
                          {
                            width: 150,
                            border: 0,
                            items: [
                              {
                                xtype: "checkbox",
                                itemId: "landingChk",
                                labelWidth: 100,
                                labelAlign: "right",
                                fieldLabel: getLocale("Landing"),
                                boxLabel:
                                  '<img src="/resources/global/images/icons/page_link.png" style="width:16px;height:16px;vertical-align:middle;margin-right:5px;">',
                              },
                            ],
                          },
                        ],
                      },
                      //----------------------------------
                    ],
                  },
                  {
                    xtype: "fieldset",
                    //padding:'0 0 0 0',
                    title: "Cuenta asociada",
                    //border:0,
                    itemId: "dealer-cuenta",
                    layout: "hbox",
                    height: 50,
                    //width:270,
                    //margin:'0 0 5 0',
                    items: [
                      {
                        xtype: "textfield",
                        itemId: "dealer",
                        enforceMaxLength: true,
                        maxLength: 3,
                        emptyText: getLocale("Dealer"),
                        width: 80,
                      },
                      {
                        xtype: "textfield",
                        itemId: "cuenta",
                        enforceMaxLength: true,
                        maxLength: 4,
                        emptyText: getLocale("Cuenta"),
                        width: 140,
                        margin: "0 0 0 5",
                      },
                    ],
                  },
                ],
                buttons: [
                  {
                    iconCls: "icon-find",
                    width: 50,
                    text: "Buscar",
                    scope: this,
                    itemId: "search",
                    action: "search",
                  },
                  {
                    iconCls: "icon-find",
                    width: 50,
                    text: "Todos",
                    scope: this,
                    action: "getall",
                  },
                ],
              },
            ],
          },
        },
        // {
        //   text: "Grupos",
        //   itemId: "profile",
        //   hideOnClick: false,
        //   labelWidth: 120,
        //   margin: "5px 0 0 0",
        //   menu: {
        //     xtype: "menu",
        //     layout: "fit",
        //     enableKeyNav: false,
        //     ignoreParentClicks: true,
        //     width: 200,
        //     closeAction: "method-hide",
        //     items: {
        //       xtype: "taxonomiesmastertree",
        //       preventHeader: true,
        //       rootId: 0,
        //       height: 200,
        //       width: 414,
        //       translate: false,
        //       hideOnClick: false,
        //     },
        //   },
        // },
        "-",
        {
          iconCls: "icon-cuenta_filter_nohabilitadas",
          text: "Prospecto",
          itemId: "filterProspectos",
          hidden: true, //botón oculto por pedido de tarea https://softguard.atlassian.net/browse/DK-275
          action: "filterProspectos",
          toggleGroup: "filter",
          enableToggle: true,
        },
        {
          iconCls: "icon-cuenta_filter_enprueba",
          text: "En venta",
          itemId: "filterOportunidades",
          hidden: true, //botón oculto por pedido de tarea https://softguard.atlassian.net/browse/DK-275
          action: "filterOportunidades",
          toggleGroup: "filter",
          enableToggle: true,
        },
        {
          iconCls: "icon-cuenta_filter_habilitadas",
          text: "Clientes",
          itemId: "filterClientes",
          hidden: true, //botón oculto por pedido de tarea https://softguard.atlassian.net/browse/DK-275
          action: "filterClientes",
          toggleGroup: "filter",
          enableToggle: true,
        },
        {
          iconCls: "icon-delete",
          text: "Inactivo",
          itemId: "filterEliminadas",
          hidden: true, //botón oculto por pedido de tarea https://softguard.atlassian.net/browse/DK-275
          action: "filterEliminadas",
          toggleGroup: "filter",
          enableToggle: true,
        },
        {
          iconCls: "icon-page-link",
          text: "Landing",
          itemId: "filterLanding",

          action: "filterLanding",
          toggleGroup: "filter",
          enableToggle: true,
          hidden: true, //botón oculto por pedido de tarea https://softguard.atlassian.net/browse/DK-275
        } /*,{
                    xtype: 'combobox',
                    itemId: 'pagesize',
                    fieldLabel: 'Tamaño de página',
                    labelAlign: 'right',
                    store: [25, 50, 100, 10000],
                    width: 160,
                    listeners:{
                        scope: this,
                         'change': function(combo, value){
                             var store = this.getStore();
                             store.pageSize = value;
                             store.load();
                         }
                    }
                }*/ /*,'-',{
                    iconCls: 'icon-delete',
                    text: 'Mis organizaciones',
                    itemId: 'misorganizaciones',
                    action: 'misorganizaciones',
                    toggleGroup: 'misorganiazaciones',
                    enableToggle: true
                }*/,
        "->",
        ,
        {
          iconCls: "icon-database-lightning",
          text: "Generar Entidades",
          itemId: "crearFromCuenta",
          scope: this,
          hidden: !isAdmin,
          action: "crearFromCuenta",
        },
        // Hidden for now
        // {
        //   iconCls: "icon-moneyguard-16",
        //   text: "Importar Organizaciones MG",
        //   itemId: "importMG",
        //   scope: !isAdmin,
        //   action: "importMG",
        // },
      ], // cierro items
    });

    this.addDocked(toolbar);

    var storeSecurity =
      window.SecurityModulesStore ||
      Ext.data.StoreManager.lookup("SecurityModulesStore");
    var crearBtn = toolbar.down("#crearFromCuenta");

    var applyVisibility = function () {
      var adminNow = computeIsAdmin();
      if (crearBtn) crearBtn.setHidden(!adminNow);
    };

    if (storeSecurity) {
      if (storeSecurity.isLoaded && storeSecurity.isLoaded()) {
        applyVisibility();
      } else {
        storeSecurity.on("load", applyVisibility, this, { single: true });
      }
    } else {
      if (crearBtn) crearBtn.setHidden(true);
    }
  },
});

Ext.define("Common.view.OrganizationClientGridView", {
  extend: "Common.view.OrganizationGridView",
  alias: ["widget.organizationclientgridview"],

  initComponent: function () {
    this.callParent(arguments);

    this.down("#profile").hide();
    this.down("#crearFromCuenta").hide();
    this.down("#importMG").hide();
  },
});
