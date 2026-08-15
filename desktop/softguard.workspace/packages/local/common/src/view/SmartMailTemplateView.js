//MIGRADO2024
Ext.define("Common.view.SmartMailTemplateView", {
  extend: "Ext.panel.Panel",
  alias: "widget.smartmailtemplateview",
  layout: "border",
  items: [
    {
      xtype: "moduletreeview", //implied by default
      title: getLocale("Opciones de Templates"),
      store: "SmartMailTemplateModuleStore",
      region: "west",
      margins: "5 0 0 5",
      width: 200,
      collapsible: true,
      layout: "fit",
      split: true,
    },
    {
      //title: 'Center Region',
      xtype: "tabpanel",
      region: "center",
      itemId: "center",
      layout: "fit",
      margins: "5 0 0 0",
    },
  ],
  initComponent: function () {
    //this.addEvents('smartmailtemplatechange');
    this.callParent(arguments);

    this.down("smpattachgridview").record = this.record;
  }, // cierro init
});
