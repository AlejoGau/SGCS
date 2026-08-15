//MIGRADO2024
Ext.define("Common.model.m_comprobantes_cab_fcSearchModel", {
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
    { name: "cbc_dfecha", type: "date" },
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
      name: "_ncomprobante",
      type: "string",
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

    {
      name: "_cbc_inumerocbte",
      type: "string",
      convert: function (v, record) {
        return Ext.String.leftPad(record.get("cbc_inumerocbte"), 10, "0");
      },
    },
    { name: "nombreOrganizacion", type: "string" },

    { name: "cta_yTotal", type: "float" },
    { name: "cta_ySaldo", type: "float" },
    { name: "cta_nCuota", type: "int" },
    { name: "cta_dVencimiento", type: "date" },
    { name: "cbt_ntipo", type: "int" },
    { name: "cbt_cdescripcion", type: "string" },
    { name: "mon_csymbol", type: "string" },
    { name: "cli_iorganizacion", type: "int" },
    {
      name: "cli_iOrganizacion",
      type: "int",
      convert: function (value, record) {
        return record.get("cli_iorganizacion");
      },
    },
    { name: "orgfac_org_cnombre", type: "string" },

    { name: "cbc_iversion", type: "int" },
  ],
  proxy: {
    type: "rest",
    reader: {
      type: "json",
      rootProperty: "rows",
      totalProperty: "total",
      transform: function (data) {
        if (data && data.rows && data.rows.length > 0) {
          var seen = {};
          var unique = [];
          for (var i = 0; i < data.rows.length; i++) {
            var id = data.rows[i].Id;
            if (!seen[id]) {
              seen[id] = true;
              unique.push(data.rows[i]);
            }
          }
          // preserve server total (COUNT DISTINCT); only deduplicate the rows
          data.rows = unique;
        }
        return data;
      },
    },
    url: "/Rest/search/m_comprobantes_cab_fc",
    appendId: false,
  },
});
