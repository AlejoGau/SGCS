//MIGRADO2024
Ext.define("Common.model.MG_product_impuestoModel", {
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
      defaultValue: "MG_product_impuesto",
    },
    { name: "mpi_idproduct", type: "int" },
    { name: "mpi_impidkey", type: "int" },
  ],

  proxy: {
    type: "rest",
    writer: { writeAllFields: true },
    url: "/Rest/MG_product_impuesto",
    appendId: true,
  },
});
