Ext.define("AccessControl.view.p_controlAcceso_IOFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.p_controlacceso_ioformview"],
  border: 0,
  bodyPadding: 5,
  items: [
    {
      xtype: "combo",
      fieldLabel: "Puerta",
      queryMode: "local",
      itemId: "combopuerta",
      name: "cac_idpuerta",
      displayField: "cap_nombre",
      valueField: "Id",
      /* store:[
             [1, 'puerta 1'],
             [2, 'puerta 2'],
             [3, 'puerta 3'],
             [4, 'puerta 4']
             ]*/
    },
    {
      xtype: "combo",
      fieldLabel: "Tipo acceso",
      queryMode: "local",
      itemId: "combotipoacceso",
      name: "cac_tipoacceso",
      store: [
        [1, getLocale("Ingreso")],
        [0, getLocale("Egreso")],
      ],
    },
    {
      xtype: "combo",
      fieldLabel: "Tipo autorizacion",
      queryMode: "local",
      itemId: "combotipoautorizacion",
      name: "cac_autorizatipo",
      store: [
        /*[0, getLocale('Sin definir')],*/
        [1, getLocale("Contacto propietario")],
        [2, getLocale("Autorizacion supervisor")],
        [3, getLocale("Autorizacion preexistente")],
      ],
    },
    {
      xtype: "textarea",
      fieldLabel: "Observaciones",
      itemId: "cac_cobservacion",
      name: "cac_cobservacion",
    },
  ],

  initComponent: function () {

    this.callParent();

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-table-save",
          text: "Guardar",
          scope: this,
          action: "save",
          formBind: true,
        },
      ], // cierro items
    });
    this.addDocked(toolbar);
  }, // cierro init
});
