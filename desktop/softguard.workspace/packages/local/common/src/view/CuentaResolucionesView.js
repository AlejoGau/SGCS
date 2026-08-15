//MIGRADO2024
Ext.define("Common.view.CuentaResolucionesView", {
  extend: "Ext.panel.Panel",
  alias: "widget.cuentaresolucionesview",
  title: "Cuenta",
  forceClose: false,
  layout: "border",
  items: [
    {
      xtype: "tabpanel",
      region: "center",
      layout: "fit",
      margins: "5 0 0 0",
    },
  ],
  // cierro items
  initComponent: function () {
    this.callParent();
  },
});
