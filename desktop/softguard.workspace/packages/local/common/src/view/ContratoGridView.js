Ext.define("Common.view.ContratoGridView", {
  extend: "Ext.grid.Panel",
  alias: ["widget.contratogridview"],
  requires: ["Ext.grid.feature.Grouping"],
  title: "Pedidos",
  autoHeight: true,
  //selModel: Ext.create('Ext.selection.CheckboxModel'),
  // Features se crean en initComponent para aislamiento por instancia
  viewConfig: {
    stripeRows: true,
    trackOver: true,
    loadMask: false,
    // Agrupado + bufferedRenderer pueden chocar en algunas versiones
    bufferedRenderer: false,
  },
  cls: 'contrato-grid',
  activeHelp: true, //trae el help
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 40,
      items: [
        {
          iconCls: "icon-page-white-text",
          tooltip: "Modificar",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("contratogridview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("objectedit", rec, view);
          },
        },
        {
          iconCls: "icon-page-white-edit",
          tooltip: "Generar novedad",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("contratogridview");
            var rec = grid.getStore().getAt(rowIndex);
            if (rec.get("cnt_estado") == 1) {
              view.fireEvent("generarnovedad", rec, view);
            } else {
              notify(
                "Tiene que estar activo el contrato para poder generar una novedad."
              );
            }
          },
          getClass: function (v, meta, rec) {
            if (rec.get("cnt_estado") == 1) {
              return "icon-page-white-edit";
            } else {
              return "icon-shape-square-error";
            }
          },
        },
      ],
    },
    {
      /*xtype : 'gridcolumn',
            header : 'Id',
            dataIndex : 'Id',     
            hidden: true,           	
            width:50,
            sortable : true
            
		},{*/
      xtype: "gridcolumn",
      header: "Cliente",
      dataIndex: "idOrganizacion",
      width: 200,
      sortable: true,
      renderer: function (v, metadata, r) {
        return r.get("nombreOrganizacion");
      },
    },
    {
      xtype: "datecolumn",
      header: "fecha",
      dataIndex: "cnt_fechaalta",
      width: 170,
      sortable: true,
      renderer: function (v, metadata, r) {
        return Ext.Date.format(new Date(r.get("cnt_fechaalta")), "d/m/Y");
      },
    },
    {
      xtype: "datecolumn",
      header: "Fecha vencimiento",
      dataIndex: "cnt_fechavto",
      hidden: false,
      width: 200,
      sortable: true,
      renderer: function (v, metadata, r) {
        return Ext.Date.format(new Date(r.get("cnt_fechavto")), "d/m/Y");
      },
    },
    {
      xtype: "gridcolumn",
      header: "Condicion de pago",
      width: 130,
      dataIndex: "con_cdescripcion",
    },
    {
      xtype: "gridcolumn",
      header: "Estado",
      dataIndex: "cnt_estado",
      renderer: function (v, metadata, r) {
        if (r.get("cnt_estado") == 0) {
          return getLocale("Pendiente");
        } else if (r.get("cnt_estado") == 1) {
          return getLocale("Activo");
        } else if (r.get("cnt_estado") == 2) {
          return getLocale("Cancelado");
        } else if (r.get("cnt_estado") == 3) {
          return getLocale("Vencido");
        }
      },
      width: 150,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Empresa",
      dataIndex: "org_cnombre",
      width: 400,
      sortable: true,
    },
  ],

  initComponent: function () {
    // deshabilito bufferedRenderer si el theme lo reactiva en runtime
    this.bufferedRenderer = false;

    // Crear feature de agrupación única por instancia (para aislar tabs)
    this.features = [Ext.create('Ext.grid.feature.Grouping', {
      ftype: "grouping",
      id: "grouping",
      enableGroupingMenu: true,
      hideGroupedHeader: true,
      startCollapsed: false,
      disabled: true, // Deshabilitado por default
      groupHeaderTpl: [
        '{name:this.formatName} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        {
          formatName: function (name) {
            if (name == 0) {
              return getLocale("Pendiente");
            } else if (name == 1) {
              return getLocale("Activo");
            } else if (name == 2) {
              return getLocale("Cancelado");
            } else if (name == 3) {
              return getLocale("Vencido");
            }
            return name;
          },
        },
      ],
    })];


    // Inyecta estilos mínimos de agrupado en runtime (por si el theme no los incluye)
    if (Ext.util && Ext.util.CSS && !Ext.util.CSS.getRule('.contrato-grid .x-grid-group-hd')) {
      Ext.util.CSS.createStyleSheet(
        '.contrato-grid .x-grid-group-hd{display:block;padding:6px 8px;background:#f5f5f5;border-top:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;font-weight:bold;}' +
        '.contrato-grid .x-grid-group-title{padding-left:18px;}' +
        '.contrato-grid .x-grid-group-body .x-grid-row{border-top:none;}',
        'contrato-grid-grouping-style'
      );
    }

    this.callParent(arguments);

    this.view.targetTab = this.targetTab;
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-page-white-text",
          text: "Nuevo contrato",
          itemId: "new",
          action: "new",
        },
        {
          xtype: "button",
          iconCls: "icon-application-view-list",
          text: "Agrupar por estado",
          itemId: "groupStatus",
          enableToggle: true,
          action: "groupStatus",
          pressed: false,
        },
        "-",
        {
          text: "Filtros",
          menu: {
            xtype: "menu",
            width: 310,
            items: [
              {
                xtype: "panel",
                bodyPadding: 5,
                items: [
                  {
                    xtype: "fieldset",
                    title: "Fecha",
                    layout: "vbox",
                    items: [
                      {
                        xtype: "datefield",
                        itemId: "datedesde",
                        fieldLabel: "Desde",
                      },
                      {
                        xtype: "datefield",
                        itemId: "datehasta",
                        fieldLabel: "Hasta",
                      },
                    ],
                  },
                  {
                    xtype: "fieldset",
                    title: "Fecha de vencimiento",
                    layout: "vbox",
                    items: [
                      {
                        xtype: "datefield",
                        itemId: "datevencimientodesde",
                        fieldLabel: "Desde",
                      },
                      {
                        xtype: "datefield",
                        itemId: "datevencimientohasta",
                        fieldLabel: "Hasta",
                      },
                    ],
                  },
                  {
                    xtype: "combo",
                    store: [
                      [0, getLocale("Pendiente")],
                      [1, getLocale("Activo")],
                      [2, getLocale("Cancelado")],
                    ],
                    editable: false,
                    queryMode: "local",
                    fieldLabel: "Estado",
                    lastQuery: "",
                    itemId: "estado",
                  },
                  {
                    xtype: "textfield",
                    fieldLabel: "Cliente",
                    itemId: "cliente",
                  },
                  {
                    xtype: "combo",
                    name: "cue_cprovincia",
                    displayField: "org_cnombre",
                    queryMode: "local",
                    itemId: "organizaciones",
                    valueField: "Id",
                    editable: false,
                    fieldLabel: "Empresa",
                  },
                  {
                    xtype: "combo",
                    editable: false,
                    queryMode: "local",
                    fieldLabel: "Forma de pago",
                    lastQuery: "",
                    name: "cnt_formapago",
                    itemId: "formadepago",
                    displayField: "fpg_cdescripcion",
                    valueField: "fpg_ccodigo",
                  },
                  {
                    xtype: "combo",
                    store: [
                      [30, getLocale("30 dias")],
                      [60, getLocale("60 dias")],
                      [120, getLocale("120 dias")],
                    ],
                    editable: false,
                    queryMode: "local",
                    fieldLabel: "Mostrar hasta",
                    lastQuery: "",
                    itemId: "proximovencimientosdias",
                    hidden: true,
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
          iconCls: "icon-page-white-error",
          text: "Contratos por vencer",
          itemId: "contratosVencer",
          action: "contratosVencer",
          toggleGroup: "filter-contratos",
          enableToggle: true,
        },
        {
          iconCls: "icon-page-white-error",
          text: "Contratos vencidos",
          itemId: "contratosVencidos",
          action: "contratosVencidos",
          toggleGroup: "filter-contratos",
          enableToggle: true,
        },
      ], // cierro items
    });

    this.addDocked(toolbar);

    this.addDocked(pagingtoolbar);
  },
});
