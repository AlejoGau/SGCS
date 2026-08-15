//MIGRADO2024
Ext.define("Common.model.t_impuestos_fcModel", {
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
      defaultValue: "t_impuestos_fc",
    },
    { name: "imp_ccodigo", type: "string" },
    { name: "imp_cdescripcion", type: "string" },
    { name: "imp_nporcentaje", type: "float" },
    { name: "imp_idorganizacion", type: "int" },
    { name: "imp_mgmcidkey", type: "int" },
  ],

  proxy: {
    type: "rest",
    writer: { writeAllFields: true },
    url: "/Rest/t_impuestos_fc",
    appendId: true,
  },
});
