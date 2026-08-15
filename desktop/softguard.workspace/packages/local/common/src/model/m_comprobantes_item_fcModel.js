Ext.define("Common.model.m_comprobantes_item_fcModel", {
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
    { name: "cbi_icodigocab", type: "int", defaultValue: 0 },
    { name: "cbi_yimporte", type: "float", defaultValue: 0 },
    { name: "cbi_icantidad", type: "float", defaultValue: 0 },
    { name: "cbi_iproducto", type: "int" },
    { name: "cbi_ndescuento", type: "float", defaultValue: 0 },
    { name: "cbi_inovedad", type: "int" },
    { name: "cbi_inovedadTabla", type: "int" },
    { name: "cbi_irenglon", type: "int" },
    { name: "cbi_ccodigo", type: "string" },
    { name: "cbi_cimpuestos", type: "string" },
    { name: "cbi_cdescripcion", type: "string" },
  ],

  proxy: {
    type: "rest",
    url: "/Rest/m_comprobantes_item_fc/",
    writer: { writeAllFields: true },
    appendId: true,
  },
});
