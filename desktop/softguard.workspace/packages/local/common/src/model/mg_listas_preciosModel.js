//MIGRADO2024
Ext.define("Common.model.mg_listas_preciosModel", {
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
      defaultValue: 600,
    },
    {
      name: "ObjectTypeName",
      type: "string",
      defaultValue: "MG_listas_Precios",
    },
    { name: "mglp_nombre", type: "string" },
    { name: "mglp_tipo", type: "int" },
    { name: "mglp_multiplicador", type: "number" },
    { name: "mglp_idorganizacion", type: "int" },
    { name: "mglp_currency", type: "string" },
  ],

  proxy: {
    type: "rest",
    writer: { writeAllFields: true },
    url: "/Rest/MG_listas_precios",
    appendId: true,
  },
});
