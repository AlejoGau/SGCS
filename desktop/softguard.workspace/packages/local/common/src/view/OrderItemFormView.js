Ext.define("Common.view.OrderItemFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.orderitemformview", "widget.orderitemview"],
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
      title: "Producto",
      layout: "anchor",
      frame: true,
      items: [
        {
          xtype: "displayfield",
          name: "Code",
          fieldLabel: "Código",
          allowBlank: false,
        },
        {
          xtype: "displayfield",
          name: "Name",
          fieldLabel: "Producto",
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
            if (this.up("orderitemformview").moneySymbol) {
              return Ext.util.Format.currency(
                value,
                this.up("orderitemformview").moneySymbol
              );
            } else {
              return value;
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
      name: "_subTotal",
      fieldLabel: "SubTotal",
      renderer: function (value) {
        if (this.up("orderitemformview").moneySymbol) {
          return Ext.util.Format.currency(
            value,
            this.up("orderitemformview").moneySymbol
          );
        } else {
          return value;
        }
      },
      allowBlank: false,
    },
    {
      xtype: "displayfield",
      name: "_VAT",
      fieldLabel: "Impuesto",
      renderer: function (value) {
        if (this.up("orderitemformview").moneySymbol) {
          return Ext.util.Format.currency(
            value,
            this.up("orderitemformview").moneySymbol
          );
        } else {
          return value;
        }
      },
      allowBlank: false,
    },
    {
      xtype: "displayfield",
      name: "Total",
      fieldLabel: "Total",
      renderer: function (value) {
        if (this.up("orderitemformview").moneySymbol) {
          return Ext.util.Format.currency(
            value,
            this.up("orderitemformview").moneySymbol
          );
        } else {
          return value;
        }
      },
      allowBlank: false,
    },
    {
      xtype: "displayfield",
      name: "ProductId",
      hidden: true,
    },
  ],
  buttons: [
    {
      text: "Guardar",
      itemId: "btnGuardar",
    },
  ],

  initComponent: function () {
    this.callParent();

    if (this.recordOrganizacion) {
      this.moneySymbol = this.recordOrganizacion.get("mon_csymbol") + " ";
    }

    if (!this.moneySymbol) {
      // BC 380460088 : JUAN, obtengo del parametro si no viene por VIEW el currency
      this.moneySymbol =
        getParametro("SYSTEMCURRENCY", false, true).codigo + " ";
    }
  }, // cierro init
});
