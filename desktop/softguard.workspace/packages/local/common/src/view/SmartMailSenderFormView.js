//MIGRADO2024
Ext.define("Common.view.SmartMailSenderFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.smartmailsenderformview"],
  preventHeader: true,
  frame: true,
  border: 0,
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 100,
    enforceMaxLength: true,
  },
  items: [
    {
      xtype: "textfield",
      name: "Name",
      fieldLabel: "Nombre",
      allowBlank: false,
      anchor: "100%",
    },
    {
      xtype: "textfield",
      name: "AccountName",
      fieldLabel: "Email",
      allowBlank: false,
      anchor: "100%",
      vtype: "email",
      vtypeText: getLocale("Debe ingresar un email válido"),
    },
    {
      xtype: "htmleditor",
      name: "Signature",
      fieldLabel: "Firma",
      allowBlank: false,
      anchor: "100%",
    },
  ],
  initComponent: function () {
    //this.addEvents('objectchanged');
    this.callParent();

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-table-save",
          text: "Guardar",
          scope: this,
          action: "save",
        },
      ], // cierro items
    });
    this.addDocked(toolbar);
  }, // cierro init
});
