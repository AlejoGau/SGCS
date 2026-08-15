//MIGRADO2024
Ext.define("Common.model.m_comprobantes_cab_fcModel", {
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
      defaultValue: 624,
    },
    {
      name: "ObjectTypeName",
      type: "string",
      defaultValue: "Order",
    },
    { name: "cbc_dfecha", type: "date", dateFormat: "MS" },
    { name: "cbc_icliente", type: "int" },
    { name: "cbc_ctipocbte", type: "string" },
    { name: "cbc_cprefijocbte", type: "string" },
    { name: "cbc_inumerocbte", type: "int" },
    { name: "cbc_ysubtotal", type: "float", default: 0 },
    { name: "cbc_yimpuesto1", type: "float" },
    { name: "cbc_yimpuesto2", type: "float" },
    { name: "cbc_yimpuesto3", type: "float" },
    { name: "cbc_ytotal", type: "float", default: 0 },
    { name: "cbc_cestado", type: "int" },
    { name: "cbc_ccae", type: "string" },
    { name: "cbc_cvtocae", type: "date" },
    {
      name: "_cbc_inumerocbte",
      type: "string",
      depends: ["cbc_inumerocbte"],
      convert: function (v, record) {
        return Ext.String.leftPad(record.get("cbc_inumerocbte"), 10, "0");
      },
    },
    {
      name: "_ncomprobante",
      type: "string",
      depends: ["cbc_cprefijocbte", "cbc_inumerocbte"],
      convert: function (v, record) {
        return (
          Ext.String.leftPad(
            Ext.util.Format.trim(record.get("cbc_cprefijocbte")),
            4,
            "0",
          ) +
          "-" +
          Ext.String.leftPad(record.get("cbc_inumerocbte"), 10, "0")
        );
      },
    },

    { name: "cbc_iversion", type: "int", default: 1 },
  ],
  proxy: {
    type: "rest",
    writer: { writeAllFields: true },
    url: "/Rest/m_comprobantes_cab_fc/",
    appendId: true,
  },
});
