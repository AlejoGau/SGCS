Ext.define("Common.view.SoftguardCuentaCorrientePanelView", {
  extend: "Ext.panel.Panel",
  alias: "widget.cuentacorrientepanelview",
  preventHeader: true,
  frame: false,

  layout: {
    type: "vbox",
    align: "stretch",
  },
  activeHelp: true,
  items: [
    {
      xtype: "tabpanel",
      itemId: "awcctabpanel",
      layout: "fit",
      flex: 1,
      items: [],
    },
  ],

  initComponent: function () {
    this.callParent(arguments);

    /* this.down('mgcomprobantesgridview').record = this.record
        this.down('comprobantesdepagogridview').record = this.record*/

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          text: "Nuevo pago",
          itemId: "nuevopago",
        },
      ], // cierro items
    });

    this.addDocked(toolbar);
  }, // cierro init
});
