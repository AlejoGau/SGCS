//MIGRADO2024
Ext.define("Common.model.m_novedades_facturacion_fcModel", {
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
      defaultValue: 3107,
    },
    {
      name: "ObjectTypeName",
      type: "string",
      defaultValue: "m_novedades_facturacion_fc",
    },

    { name: "nfc_icondigo_ID", type: "int" },
    { name: "nfc_icliente", type: "int" },
    { name: "nfc_inovedad", type: "int" },
    { name: "nfc_nrecurrente", type: "int" },
    { name: "nfc_nestado", type: "int" },
  ],
  proxy: {
    type: "rest",
    writer: { writeAllFields: true },
    url: "/Rest/m_novedades_facturacion_fc/",
    appendId: true,
  },
});
