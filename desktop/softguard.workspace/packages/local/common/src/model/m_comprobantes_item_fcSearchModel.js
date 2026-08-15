Ext.define("Common.model.m_comprobantes_item_fcSearchModel", {
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
        var price = record.get("cbi_yimporte");
        var cant = record.get("cbi_icantidad");
        var subtotal = price * cant;

        return subtotal;
      },
    },
    {
      name: "_cbi_nDescuento",
      type: "float",
      convert: function (v, record) {
        var price = record.get("cbi_yimporte");
        var cant = record.get("cbi_icantidad");
        var vat = record.get("cbi_ndescuento");
        var subtotal = price * cant;
        var _nDescuento = subtotal * (vat / 100);

        return _nDescuento;
      },
    },
    {
      name: "_total",
      type: "float",
      convert: function (v, record) {
        var price = record.get("cbi_yimporte");
        var cant = record.get("cbi_icantidad");
        var subtotal = price * cant;
        var tax = record.get("imp_nporcentaje")
          ? parseFloat(record.get("imp_nporcentaje"))
          : 0;
        var total = subtotal * (1 + tax / 100);

        return total;
      },
    },

    { name: "cbi_icodigocab", type: "int", defaultValue: 0 },
    { name: "cbi_yimporte", type: "float", defaultValue: 0 },
    { name: "cbi_icantidad", type: "int" },
    { name: "cbi_iproducto", type: "int" },
    { name: "cbi_ndescuento", type: "float", defaultValue: 0 },
    { name: "cbi_inovedad", type: "int" },
    { name: "cbi_inovedadtabla", type: "int" },
    { name: "cbi_irenglon", type: "int" },
    { name: "cbi_cdescripcion", type: "string" },
    { name: "cbi_ccodigo", type: "string" },
    { name: "cbi_cimpuestos", type: "string" },

    { name: "imp_nporcentaje", type: "string" },
    { name: "imp_cdescripcion", type: "string" },
    { name: "imp_idorganizacion", type: "int" },
  ],

  proxy: {
    type: "rest",
    reader: {
      type: "json",
      rootProperty: "rows",
      totalProperty: "total",
    },
    url: "/Rest/search/m_comprobantes_item_fc",
    appendId: true,
  },
});
