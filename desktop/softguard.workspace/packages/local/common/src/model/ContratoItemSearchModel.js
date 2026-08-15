Ext.define("Common.model.ContratoItemSearchModel", {
  extend: "Ext.data.Model",
  idProperty: "Id",
  fields: [
    {
      name: "Id",
      type: "int",
    },
    {
      name: "Name",
      type: "string",
    },
    {
      name: "ObjectTypeId",
      type: "int",
      defaultValue: 625,
    },
    {
      name: "ObjectTypeName",
      type: "string",
      defaultValue: "OrderItem",
    },
    { name: "idcontrato", type: "int", defaultValue: 0 },
    { name: "Price", type: "float", defaultValue: 0 },
    {
      name: "_subtotal",
      type: "float",
      convert: function (v, record) {
        var price = record.get("Price");
        var cant = record.get("Quantity");
        var subtotal = price * cant;

        return subtotal;
      },
    },
    {
      name: "_VAT",
      type: "float",
      convert: function (v, record) {
        var price = record.get("Price");
        var cant = record.get("Quantity");
        var vat = record.get("VAT");
        var subtotal = price * cant;
        var _vat = subtotal * (vat / 100);

        return _vat;
      },
    },
    {
      name: "_total",
      type: "float",
      convert: function (v, record) {
        var price = record.get("Price");
        var cant = record.get("Quantity");
        var subtotal = price * cant;
        var tax = record.get("VAT") ? record.get("VAT") : 0;
        var total = subtotal * (1 + tax / 100);

        return total;
      },
    },

    { name: "Currency", type: "string" },
    { name: "Status", type: "string", defaultValue: "P" },
    { name: "Description", type: "string" },
    { name: "org_csymbol", type: "string" },
    { name: "Quantity", type: "int", defaultValue: 0 },
    { name: "Code", type: "string" },

    { name: "QuantityDelivered", type: "float", defaultValue: 0 },
    { name: "VAT", type: "float", defaultValue: 0 },
    { name: "ProductId", type: "int" },
    { name: "idlista", type: "int" },
  ],

  proxy: {
    type: "rest",
    reader: {
      type: "json",
      rootProperty: "rows",
      totalProperty: "total",
    },
    url: "/Rest/search/crm_contrato_item",
    appendId: true,
  },
});
