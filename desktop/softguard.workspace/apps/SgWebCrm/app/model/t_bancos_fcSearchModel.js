Ext.define("SGWebCrm.model.t_bancos_fcSearchModel", {
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
      defaultValue: 3071,
    },
    {
      name: "ObjectTypeName",
      type: "string",
      defaultValue: "t_formas_pago_fc",
    },
    { name: "bco_ccodigo", type: "string" },
    { name: "bco_cnombre", type: "string" },
  ],

  proxy: {
    type: "rest",
    reader: {
      type: "json",
      rootProperty: "rows",
      totalProperty: "total",
    },
    url: "/Rest/search/t_bancos_fc",
    appendId: true,
  },
});
