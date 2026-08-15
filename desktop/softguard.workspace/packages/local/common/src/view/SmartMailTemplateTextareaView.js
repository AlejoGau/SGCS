//MIGRADO2024
Ext.define("Common.view.SmartMailTemplateTextareaView", {
  extend: "Ext.form.Panel",
  alias: ["widget.smartmailtemplatetextareaview"],
  preventHeader: true,
  frame: true,
  border: 0,
  autoScroll: true,
  layout: {
    type: "vbox",
    align: "stretch",
  },
  items: [
    {
      xtype: "textareafield",
      fieldLabel: "",
      name: "TextBody",
      flex: 1,
    },
  ],
  initComponent: function () {
    this.callParent();

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "save",
          text: "Guardar",
          scope: this,
          action: "bundlesave",
        },
      ], // cierro items
    });
    this.addDocked(toolbar);
  }, // cierro init
});
