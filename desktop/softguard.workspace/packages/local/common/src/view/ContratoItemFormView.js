function fmtMoney(view, value) {
  var sym =
    (view.recordOrganizacion && view.recordOrganizacion.get("org_csymbol")) ||
    "ARS";
  return Ext.util.Format.currency(value, sym + " ", 2, false, "", ",");
}

Ext.define("Common.view.ContratoItemFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.contratoitemformview"],
  preventHeader: true,
  frame: true,
  border: 0,
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 80,
    anchor: "100%",
  },
  items: [
    {
      xtype: "fieldset",
      title: "Servicio",
      layout: "anchor",
      frame: true,
      items: [
        {
          xtype: "displayfield",
          name: "ProductId",
          fieldLabel: "id producto",
          hidden: true,
        },
        {
          xtype: "displayfield",
          name: "mglp_idkey",
          fieldLabel: "mglp_idkey",
          hidden: true,
        },
        {
          xtype: "displayfield",
          name: "Code",
          fieldLabel: "Código",
          allowBlank: false,
        },
        {
          xtype: "displayfield",
          name: "Description",
          fieldLabel: "Servicio",
          allowBlank: false,
        },
        {
          xtype: "displayfield",
          name: "VAT",
          fieldLabel: "Impuesto",
          allowBlank: false,
        },
        {
          xtype: "displayfield",
          name: "Price",
          fieldLabel: "Valor",
          renderer: function (value) {
            if (this.up("contratoitemformview").recordOrganizacion) {
              return fmtMoney(this.up("contratoitemformview"), value);
            } else {
              return "";
            }
          },
          allowBlank: false,
        },
        {
          xtype: "button",
          action: "changeProduct",
          text: "Seleccione",
          margin: "0 0 5 0",
        },
      ],
    },
    {
      xtype: "numberfield",
      name: "Quantity",
      fieldLabel: "Cantidad",
      itemId: "quantityCombo",
      allowBlank: false,
    },
    {
      xtype: "displayfield",
      hideLabel: true,
      labelSeparator: "",
      itemId: "cantidadAutoLabel",
      hidden: true,
      value: '<span style="color:#1565C0;font-size:11px;">&#128274; Cantidad calculada automáticamente por cuentas activas</span>',
      renderer: function(v) { return v; }
    },
    {
      xtype: "displayfield",
      name: "_subTotal",
      fieldLabel: "SubTotal",
      renderer: function (value) {
        if (this.up("contratoitemformview").recordOrganizacion) {
          return fmtMoney(this.up("contratoitemformview"), value);
        } else {
          return "";
        }
      },
      allowBlank: false,
    },
    {
      xtype: "displayfield",
      name: "_VAT",
      fieldLabel: "Impuesto",
      renderer: function (value) {
        if (this.up("contratoitemformview").recordOrganizacion) {
          return fmtMoney(this.up("contratoitemformview"), value);
        } else {
          return "";
        }
      },
      allowBlank: false,
    },
    {
      xtype: "displayfield",
      name: "Total",
      fieldLabel: "Total",
      renderer: function (value) {
        if (this.up("contratoitemformview").recordOrganizacion) {
          return fmtMoney(this.up("contratoitemformview"), value);
        } else {
          return "";
        }
      },
      allowBlank: false,
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
