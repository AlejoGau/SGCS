//MIGRADO2024
Ext.define("Common.model.crm_contratoModel", {
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
      defaultValue: 3148,
    },
    {
      name: "ObjectTypeName",
      type: "string",
      defaultValue: "Order",
    },
    { name: "cnt_estado", type: "int" },
    { name: "cnt_fechaalta", type: "date", dateFormat: "MS" },
    { name: "cnt_fechavto", type: "date", dateFormat: "MS" },
    { name: "cnt_formapago", type: "int" },
    { name: "cnt_idcliente", type: "int" },
    { name: "cnt_metadata", type: "string" },
    { name: "cnt_org_fc", type: "int" },
    { name: "cnt_tmp_id", type: "int" },
    { name: "cnt_dinamico", type: "int", defaultValue: 0 },
    { name: "cnt_cantidad_auto", type: "int", defaultValue: 0 },
  ],
  proxy: {
    type: "rest",
    actionMethods: {
      create: "POST", //When you want to save/create new record
      read: "GET", //When you want to get data from server side
      update: "PUT", //When you want to update the record
      destroy: "DELETE", //When you want to delete the record
    },
    url: "/Rest/crm_contrato/",
    appendId: true,
    writer: {
      type: "json",
      writeAllFields: true,
    },
  },
});
