//MIGRADO2024
Ext.define("Common.view.ListasPreciosFromView", {
  extend: "Ext.form.Panel",
  alias: ["widget.listaspreciosformview"],
  preventHeader: true,
  frame: true,
  border: 0,

  items: [
    {
      xtype: "textfield",
      name: "mglp_nombre",
      fieldLabel: "Nombre",
      allowBlank: false,
    },
    {
      xtype: "combo",
      name: "mglp_tipo",
      itemId: "mglp_tipo",
      queryMode: "local",
      lastQuery: "",
      fieldLabel: "Tipo",
      store: [
        [1, getLocale("Fijo")],
        [0, getLocale("Dinamico")],
      ],
    },
    {
      xtype: "textfield",
      name: "mglp_multiplicador",
      itemId: "mglp_multiplicador",
      fieldLabel: "Multiplicador",
      allowBlank: false,
    },
    {
      xtype: "selecterfield",
      itemId: "moneda",
      simpleSelect: true,
      config: {
        disponible: {
          title: "Moneda",
          field: "_nombre",
          searchField: "mon_cnombre",
        },
        selecionado: {
          title: "Moneda",
          field: "_nombre",
        },
        valueField: "mon_ccodigo",
        modelItems: "Common.model.t_monedasSearchModel",
      },
      title: "Moneda",
    },
    {
      xtype: "numberfield",
      //name : '',
      itemId: "valor",
      fieldLabel: "Precio",
      allowDecimals: true,
      alwaysDisplayDecimals: true,
      hideTrigger: true,
    },
  ],

  initComponent: function () {
    this.callParent();
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "save",
          text: "Guardar",
          action: "save",
          itemId: "save",
        },
      ], // cierro items
    });
    this.addDocked(toolbar);
  }, // cierro init
});
