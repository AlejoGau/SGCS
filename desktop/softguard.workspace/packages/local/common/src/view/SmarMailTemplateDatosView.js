//MIGRADO2024
Ext.define("Common.view.SmarMailTemplateDatosView", {
  extend: "Ext.form.Panel",
  alias: ["widget.smartmailtemplatedatosview"],
  preventHeader: true,
  frame: true,
  border: 0,
  layout: {
    type: "vbox",
    align: "stretch",
  },
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 80,
    anchor: "100%",
  },
  items: [
    {
      xtype: "textfield",
      name: "Name",
      fieldLabel: "Nombre",
      allowBlank: false,
    },
    {
      xtype: "textfield",
      name: "Description",
      fieldLabel: "Descripcion",
      allowBlank: true,
    },
    {
      xtype: "textfield",
      name: "Subject",
      fieldLabel: "Asunto",
      allowBlank: true,
    },
    {
      xtype: "textfield",
      name: "Status",
      fieldLabel: "Estado",
      allowBlank: true,
      hidden: true,
    },
    {
      xtype: "fieldset",
      collapsed: true,
      collapsible: true,
      title: getLocale("Archivos adjuntos"),
      layout: "fit",
      items: [
        {
          xtype: "smpattachgridview",
          itemId: "adjuntos",
        },
      ],
    },
    {
      xtype: "smartmailtemplateeditorview",
      hideToolbar: true,
      frame: false,
      flex: 1,
    },
  ],
  initComponent: function () {
    this.callParent();

    this.down("smpattachgridview").record = this.record;
    this.down("smartmailtemplateeditorview").record = this.record;

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "save",
          text: "Guardar",
          scope: this,
          action: "save",
        },
        {
          iconCls: "delete",
          text: "Eliminar",
          itemId: "delete",
          action: "borrar",
          handler: function (btn) {
            const formView = btn.up("smartmailtemplatedatosview");
            const view = formView ? formView : undefined;
            if (!view) {
              return;
            }

            Ext.MessageBox.buttonText = {
              yes: "Aceptar",
              no: "Cancelar",
            };

            const record = view.record;

            Ext.MessageBox.confirm(
              getLocale("Eliminar"),
              getLocale(
                "¿Esta seguro que desea eliminar el template seleccionado?"
              ),
              function (btn) {
                if (btn === "yes") {
                  record.erase({
                    params: { force: true },
                    success: function () {
                      notify(
                        `Template eliminado correctamente`
                      );
                      view.close();
                    },
                    failure: function () {
                      notify(
                        `Template no pudo ser eliminado`
                      );
                    },
                  });
                }
              }
            );
          },
        },
      ], // cierro items
    });
    this.addDocked(toolbar);
  }, // cierro init
});
