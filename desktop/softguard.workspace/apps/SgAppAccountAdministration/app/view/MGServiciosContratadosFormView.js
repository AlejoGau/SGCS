function fmtMoney(view, value) {
  var sym =
    (view.recordOrganizacion && view.recordOrganizacion.get("org_csymbol")) ||
    "ARS";
  return Ext.util.Format.currency(value, sym + " ", 2, false, "", ",");
}

Ext.define("SgAppAccountAdministration.view.MGServiciosContratadosFormView", {
  extend: "Ext.form.FormPanel",
  alias: ["widget.mgservicioscontratadosformview"],
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
      title: "Datos de Contrato",
      layout: "anchor",
      frame: true,
      items: [
        {
          xtype: "datefield",
          fieldLabel: "Fecha de Inicio",
          name: "cnt_fechaalta",
          itemId: "cnt_fechaalta",
          allowBlank: false,
        },
        {
          xtype: "datefield",
          fieldLabel: "Vencimiento",
          name: "cnt_fechavto",
          itemId: "cnt_fechavto",
          allowBlank: false,
        },
        {
          xtype: "combo",
          store: [
            [0, getLocale("Pendiente")],
            [1, getLocale("Activo")],
            [2, getLocale("Cancelado")],
            [3, getLocale("Vencido")],
          ],
          editable: false,
          queryMode: "local",
          fieldLabel: "Estado",
          lastQuery: "",
          name: "cnt_estado",
          itemId: "cnt_estado",
        },
      ],
    },

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
          name: "Name",
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
          itemId: "price",
          fieldLabel: "Valor",
          renderer: function (value) {
            if (this.up("mgservicioscontratadosformview").recordOrganizacion) {
              return fmtMoney(this.up("mgservicioscontratadosformview"), value);
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
      name: "_subTotal",
      fieldLabel: "SubTotal",
      renderer: function (value) {
        if (this.up("mgservicioscontratadosformview").recordOrganizacion) {
          return fmtMoney(this.up("mgservicioscontratadosformview"), value);
        } else {
          return "";
        }
      },
      allowBlank: false,
    },
    {
      xtype: "displayfield",
      name: "_VAT",
      itemId: "_VAT",
      fieldLabel: "Impuesto",
      renderer: function (value) {
        if (this.up("mgservicioscontratadosformview").recordOrganizacion) {
          return fmtMoney(this.up("mgservicioscontratadosformview"), value);
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
        if (this.up("mgservicioscontratadosformview").recordOrganizacion) {
          return fmtMoney(this.up("mgservicioscontratadosformview"), value);
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
