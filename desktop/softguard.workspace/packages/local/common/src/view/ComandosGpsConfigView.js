//MIGRADO2024
Ext.define("Common.view.ComandosGpsConfigView", {
  extend: "Ext.form.Panel",
  alias: "widget.comandosgpsconfigview",
  //title : 'Vehículo',
  layout: {
    type: "vbox",
    align: "stretch",
  },
  autoScroll: true,
  /*
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        margin: 5,
        anchor : '100%',
        width: '100%'
    },
    */
  items: [
    {
      xtype: "combo",
      fieldLabel: "Equipo",
      itemId: "comboequipos",
      //store: 'TgeEquiposStore',
      queryMode: 'local',
      displayField: "Equipo",
      editable: false,
      valueField: "Id",
      emptyText: getLocale("Seleccione el equipo"),
      allowBlank: false,
      forceSelection: true,
      disabled: false,
      name: "idEquipo",
      anchor: "100%",
    },
    {
      xtype: "tabpanel",
      flex: 1,
      items: [
        {
          xtype: "grid",
          itemId: "CmdGrid",
          title: "Comandos",
          dockedItems: [
            {
              xtype: "toolbar",
              dock: "top",
              items: [
                {
                  iconCls: "icon-add",
                  text: "Agregar",
                  scope: this,
                  action: "add",
                },
                {
                  iconCls: "icon-delete",
                  itemId: "comandodelete",
                  text: "Eliminar",
                  disabled: true,
                  action: "comandoDelete",
                  scope: this,
                },
              ],
            },
          ],
          columns: [
            {
              xtype: "actioncolumn",
              header: "Acciones",
              itemId: "acciones",
              width: 80,
              items: [
                {
                  iconCls: "icon-ipod-cast",
                  tooltip: "Enviar comando",
                  handler: function (grid, rowIndex, colIndex, item, event) {
                    var view = grid.up("comandosgpsconfigview");
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent("enviarcomando", rec, view);
                  },
                },
              ],
            },
            {
              text: "Icono",
              dataIndex: "Name",
              renderer: function (value, metadata, record) {
                var result = "";
                try {
                  var cfg = record.get("Config");
                  if (cfg != "") {
                    var parametros = Ext.JSON.decode(cfg);

                    if (parametros && parametros.icon) {
                      result =
                        '<img src="/Gallery/SmartPanics/Comandos/' +
                        parametros.icon +
                        '" width="16" heigth="16" style="background-color:GRAY" >';
                    }
                  }
                } catch (e) {
                  console.log();
                } finally {
                  return result;
                }
              },
              flex: 1,
            },
            {
              text: "Nombre",
              dataIndex: "Name",
              flex: 1,
            },
            {
              text: "tipo",
              dataIndex: "Tipo",
              width: 300,
              renderer: function (
                value,
                metadata,
                record,
                rowIndex,
                colIndex,
                store,
                gridView
              ) {
                var view = gridView.up("comandosgpsconfigview");
                var comandosStore = view.comandosStore;
                var comando = comandosStore.findRecord("tcm_iid", value);
                if (comando) return comando.get("tcm_cdescripcion");
              },
            },
          ],
        },
        {
          xtype: "comandosenviadosgridview",
          title: "Enviados",
        },
      ],
    },
  ],
  // cierro items
  initComponent: function () {
    this.callParent();
    //this.down('recepcionview').record=this.record;
    this.down("comandosenviadosgridview").record = this.record;
    var profile = this.module.profile
      ? this.module.profile
      : this.module.get("profile");
    if (!this.record) {
      this.record = Ext.getCmp("viewport").record;
    }
    if (profile >= 2) {
      // agrego la toolbar
      var toolbar = Ext.create("Ext.toolbar.Toolbar", {
        items: [
          {
            text: "Guardar",
            iconCls: "save",
            action: "save",
          },
        ],
      });
      this.addDocked(toolbar);
    } else {
      this.down("#comboequipos").hide();
      this.down("#CmdGrid").down("toolbar").hide();
      this.down("#CmdGrid").title = "";
      this.down("#acciones").hide();
    }
  },
});
