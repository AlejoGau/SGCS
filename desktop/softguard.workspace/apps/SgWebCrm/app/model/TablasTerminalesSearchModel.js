Ext.define("SGWebCrm.model.TablasTerminalesSearchModel", {
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
      defaultValue: 3095,
    },
    {
      name: "ObjectTypeName",
      type: "string",
      defaultValue: "s_terminales",
    },
    { name: "ter_ccodigo", type: "string" },
    { name: "ter_cdescripcion", type: "string" },
    {
      name: "_ter_cdescripcion",
      type: "string",
      convert: function (v, r) {
        return r.get("ter_cdescripcion") + " (" + r.get("ter_ccodigo") + ")";
      },
    },
    { name: "ter_nmonitoreo", type: "int", defaultValue: 0 },
    { name: "ter_caceptasenialapertura", type: "int", defaultValue: 0 },
    { name: "ter_caceptasenialcierre", type: "int", defaultValue: 0 },
    { name: "ter_caceptasenialestado", type: "int", defaultValue: 0 },
    { name: "ter_caceptasenialrestauracion", type: "int", defaultValue: 0 },
  ],

  proxy: {
    type: "rest",
    reader: {
      type: "json",
      rootProperty: "rows",
      totalProperty: "total",
    },
    url: "/Rest/search/s_terminales",
    appendId: true,
  },
});
