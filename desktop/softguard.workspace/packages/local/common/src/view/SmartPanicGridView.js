//MIGRADO2024
Ext.define("Common.view.SmartPanicGridView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.smartpanicgridview"],
  title: "SmartPanic",
  autoHeight: true,
  selType: "checkboxmodel",
  selModel: {
    checkOnly: true,
    mode: "MULTI",
  },
  viewConfig: {
    stripeRows: false,
    getRowClass: function (record) {
      var imei = record.get("Imei");
      return !imei || imei === "" || imei === "0" || imei === 0
        ? "nohabilitado"
        : "";
    },
  },

  /*   features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false,
        remoteRoot: 'summaryData'
    }],
*/
  features: [
    {
      ftype: "groupingsummary",
      groupHeaderTpl:
        '<input class="grpCheckbox" type="checkbox"> {name} ({rows.length})</input>',
      groupByText: getLocale("Agrupar"),
      id: "grouping",
      //showGroupsText : getLocale('Mostrar en grupos')
    },
  ],
  columns: [
    {
      xtype: "actioncolumn",
      //header : 'Acciones',
      width: 104,
      items: [
        {
          iconCls: "icon-smartpanic",
          tooltip: getLocale("Editar"),
          getClass: function (value, metadata, record, a, b, c, view) {
            var json;
            var view = this.up("smartpanicgridview");

            if (record.get("Config") != "") {
              json = Ext.JSON.decode(record.get("Config"));
            }

            if (view.noEditDblClick) {
              //saca texto a tooltip
              this.items[1].tooltip = "";
              //esconde el icono
              return "icon--hidden";
            }

            if (
              json &&
              json.hasOwnProperty("userEnabled") &&
              json.userEnabled == 0
            ) {
              return "icon-smartpanic-disabled";
            } else if (json && json.groupEnabled && json.groupEnabled == 1) {
              return "icon-smartpanic-master";
            } else {
              return "icon-smartpanic";
            }
          },
          handler: function (grid, rowIndex, colIndex, item, event) {
            var rec = grid.getStore().getAt(rowIndex);
            var view = grid.up("smartpanicgridview");
            //view.onItemClick(view,rec);
            if (view.noEditDblClick) {
              return false;
            }
            view.fireEvent("itemdblclick", view, rec);
          },
        },
        {
          iconCls: "icon-reportes",
          tooltip: getLocale("Eventos"),
          itemId: "icoeventos",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var rec = grid.getStore().getAt(rowIndex);
            if (rec.get("CuentaId") != "") {
              var view = grid.up("smartpanicgridview");

              view.fireEvent("mostrarEventos", rec, view);
              if (view.up("window")) {
                view.up("window").hide();
              }
            } else {
              notify("El dispositivo no tiene cuenta asociada");
            }
          },
        } /*,{
                    iconCls: 'icon-email',
                    tooltip: getLocale('Enviar mensaje'),
                    itemId: 'icomensaje', 
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var rec = grid.getStore().getAt(rowIndex);
                        if(rec.get('CuentaId') != '') {
                            var view = grid.up('smartpanicgridview');
                            
                            view.fireEvent('enviaMensaje',rec,view);
                        } else {
                            notify('El dispositivo no tiene cuenta asociada');
                        }
                    
                    }
                }*/,
        {
          iconCls: "icon-email-add",
          tooltip: getLocale("Mostrar Mensajes"),
          itemId: "icoeventos",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var rec = grid.getStore().getAt(rowIndex);
            if (rec.get("CuentaId") != "") {
              var view = grid.up("smartpanicgridview");
              view.fireEvent("mostrarMensajesSP", rec, view);

              if (view.up("window")) {
                view.up("window").hide();
              }
            } else {
              notify("El dispositivo no tiene mensajes");
            }
          },
        },
        {
          iconCls: "icon-page-white-edit",
          tooltip: getLocale("Enviar log"),
          itemId: "icoeventos",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var rec = grid.getStore().getAt(rowIndex);
            if (rec.get("CuentaId") != "") {
              var view = grid.up("smartpanicgridview");
              view.fireEvent("enviarLog", rec, view);

              if (view.up("window")) {
                view.up("window").hide();
              }
            }
          },
        },
        {
          iconCls: "icon--hidden",
          tooltip: getLocale("Posee botón Bluetooth"),
          getClass: function (value, metadata, record, a, b, c, view) {
            var json;
            var view = this.up("smartpanicgridview");
            if (record.get("srb_idkey") > 0) {
              return "icon-bluetooth";
            } else {
              return "icon--hidden";
            }
          },
        },
      ],
    },
    {
      xtype: "gridcolumn",
      header: "Dealer",
      dataIndex: "cue_clinea",
      //hidden: true
    },
    {
      xtype: "gridcolumn",
      header: "Cuenta",
      dataIndex: "cue_ncuenta",
      /*renderer: function (value, p, r) {
        var linea = r.data["cue_clinea"];
        var ncuenta = r.data["cue_ncuenta"];
        if (linea != "" && ncuenta != "") {
          return (
            r.data["cue_clinea"] +
            "-" +
            Ext.String.leftPad(r.data["cue_ncuenta"], 4, "0")
          );
        } else {
          return "";
        }
      },¨*/
      width: 80,
    },
    {
      xtype: "gridcolumn",
      header: "Nombre de cuenta",
      dataIndex: "cue_cnombre",
      width: 200,
    },
    {
      xtype: "gridcolumn",
      header: "Usuario",
      dataIndex: "Nombre",
      width: 150,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Telefono",
      dataIndex: "Telefono",
      width: 80,
    },
    {
      xtype: "gridcolumn",
      header: "Id",
      dataIndex: "Id",
      hidden: true,
    },
    {
      xtype: "gridcolumn",
      header: "Modelo",
      dataIndex: "Modelo",
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Marca",
      dataIndex: "Marca",
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Version",
      dataIndex: "Version",
      sortable: true,
      width: 100,
    },
    {
      xtype: "gridcolumn",
      header: "Tipo",
      dataIndex: "Tipo",
    },
    {
      xtype: "gridcolumn",
      header: "Imei",
      dataIndex: "Imei",
      flex: 1,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Fecha de alta",
      dataIndex: "fechaAlta",
      renderer: function (value) {
        return Ext.util.Format.date(value, "d/m/Y H:i:s");
      },
    },
    {
      xtype: "gridcolumn",
      header: "Fallo de testeo",
      dataIndex: "EnFalloDeTesteoDesde",
      hidden: true,
      flex: 1,
      sortable: true,
      renderer: function (value, metadata, record) {
        if (value) {
          return Ext.Date.format(new Date(value), "d/m/Y G:i:s");
        }
      },
    },
    {
      xtype: "gridcolumn",
      header: "Nro Documento",
      dataIndex: "usu_cidentificacion",
      hidden: true,
      flex: 1,
      sortable: true,
    },
  ],

  initComponent: function () {
    this.callParent(arguments);
    //this.addEvents('cuentachanged');
    //this.addEvents('onchange');
    //this.addEvents('smartpanicchange');
    //this.addEvents('licenseviolation');
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);
    var toolbarSmartpanic = Ext.create("Ext.toolbar.Toolbar", {
      hidden: true,
      items: [
        {
          text: "Actualizado",
          itemId: "actualesSmartPanic",
          pressed: true,
          iconCls: "icon-sp-actualizado",
          enableToggle: true,
        },
        {
          text: "Dispersion",
          itemId: "dispersoSmartPanic",
          iconCls: "icon-sp-dispersion",
          pressed: true,
          enableToggle: true,
        },
        {
          text: "No actuales",
          itemId: "viejasSmartPanic",
          pressed: true, // dedalo 28/11/2018 lo habilito para que se vean todos los dispositivos en la grilla default del modulo
          iconCls: "icon-sp-old",
          enableToggle: true,
        },
      ],
    });

    this.addDocked(toolbarSmartpanic);
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      itemId: "toolbarfiltro",
      items: [
        /*{
                    xtype: 'combo',
                    store: [
                        ['telefono',getLocale('Telefono')],
                        ['nombre',getLocale('Nombre de cuenta')],
                        ['usuario',getLocale('Usuario')],
                        ['cuenta',getLocale('Cuenta')],
                        ['imei',getLocale('Imei')],
                        ['dealer',getLocale('Dealer')]
                    ],
                    queryMode: 'local',
                    value: 'telefono',
                    itemId: 'queryType',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',*/
        {
          text: "Filtros",
          itemId: "filtrostr",
          menu: {
            xtype: "menu",
            width: 380,
            items: [
              {
                xtype: "panel",
                bodyPadding: 5,
                layout: {
                  type: "vbox",
                  align: "stretch",
                },
                items: [
                  {
                    xtype: "textfield",
                    fieldLabel: "Telefono",
                    padding: "2 0",
                    anchor: "100%",
                    itemId: "telefonoId",
                  },
                  {
                    xtype: "textfield",
                    fieldLabel: "Nombre de cuenta",
                    padding: "2 0",
                    itemId: "nombreCuenta",
                  },
                  {
                    xtype: "textfield",
                    fieldLabel: "Usuario",
                    padding: "2 0",
                    anchor: "100%",
                    itemId: "usuarioId",
                  },
                  {
                    xtype: "textfield",
                    fieldLabel: "Cuenta",
                    anchor: "100%",
                    padding: "2 0",
                    itemId: "cuentaId",
                  },
                  {
                    xtype: "textfield",
                    fieldLabel: "Imei",
                    padding: "2 0",
                    anchor: "100%",
                    itemId: "imeiId",
                  },
                  {
                    xtype: "textfield",
                    fieldLabel: "Dealer",
                    anchor: "100%",
                    padding: "2 0",
                    itemId: "dealerId",
                  },
                  {
                    xtype: "panel",
                    border: false,
                    bodyPadding: 5,
                    layout: {
                      type: "vbox",
                      align: "stretch",
                    },
                    items: [
                      {
                        xtype: "fieldcontainer",
                        fieldLabel: "Fecha de alta",
                        labelAlign: 'left', // O 'left'
                        layout: "hbox",
                        width: 150,
                        items: [
                          {
                            xtype: "datefield",
                            itemId: "fechadesde",
                            flex: 1
                          },
                          {
                            xtype: "datefield",
                            itemId: "fechahasta",
                            flex: 1,
                            margin: "0 0 0 5"
                          }
                        ]
                      }
                    ],
                  },
                  {
                    xtype: "container",
                    layout: "hbox",
                    width: 270,
                    margin: "0 0 5 30",
                    items: [
                      {
                        xtype: "button",
                        text: "Buscar",
                        action: "search",
                        itemId: "search",
                        iconCls: "icon-find",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },

        {
          iconCls: "icon-find",
          queryMode: "local",
          text: "Todos",
          scope: this,
          action: "getall",
        },
        "-",
        {
          iconCls: "icon-error",
          text: "Fallo de testeo",
          action: "fallodetesteo",
          itemId: "fallodetesteo",
          enableToggle: true,
        },
        {
          iconCls: "icon-bluetooth",
          text: "Botón asignado",
          scope: this,
          itemId: "bluetooth",
          action: "bluetooth",
          enableToggle: true,
        },
        "-",
        {
          iconCls: "icon-application-view-list",
          text: "Agrupar Cuentas",
          enableToggle: true,
          toggleGroup: "group",
          action: "groupCuenta",
        },
        {
          iconCls: "icon-application-view-list",
          text: "Agrupar Dealer",
          enableToggle: true,
          toggleGroup: "group",
          action: "groupDealer",
        },
        "-",
        {
          iconCls: "icon-cuentaDelete",
          text: "Desasignar Cuenta",
          scope: this,
          action: "sacarcuenta",
          itemId: "sacarcuenta",
          hidden: true,
        },
        {
          iconCls: "icon-add",
          text: "Nuevo dispositivo",
          action: "nuevo",
          itemId: "nuevo",
          hidden: true,
        } /*,'->',
                ,'-',*/,
        /* {
                    xtype: 'displayfield',
                    value: '',
                    scope: this,
                    itemId: 'toolbardisplayfield',
                    margin: '-10 10 0 10'
                }
                */
      ], // cierro items
    });

    this.addDocked(toolbar);

    // agrego la toolbar
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      itemId: "tipofiltro",
      dock: "bottom",
      items: [
        {
          text: "Todos los dispositivos",
          itemId: "dispositivos-todos",
          iconCls: "icon-map-magnify",
          pressed: false,
          enableToggle: true,
          toggleGroup: "tipofiltro",
        },
        {
          text: "Dispositivos seleccionados",
          itemId: "dispositivos-seleccionados",
          pressed: true,
          iconCls: "icon-map-magnify",
          enableToggle: true,
          toggleGroup: "tipofiltro",
        },
        {
          text: "Todos los dispositvos del filtro aplicado",
          itemId: "dispositivos-filtro",
          pressed: false,
          iconCls: "icon-map-magnify",
          enableToggle: true,
          toggleGroup: "tipofiltro",
        },
      ],
    });
    if (this.showTipoFiltro) {
      this.addDocked(toolbar);
    }
  },
});
