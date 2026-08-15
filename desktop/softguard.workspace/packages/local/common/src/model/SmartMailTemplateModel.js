//MIGRADO2024
Ext.define("Common.model.SmartMailTemplateModel", {
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
      defaultValue: 501,
    },
    {
      name: "ObjectTypeName",
      type: "string",
      defaultValue: "SmartMailTemplate",
    },
    { name: "Description", type: "string" },
    { name: "Subject", type: "string" },
    { name: "HtmlBody", type: "string" },
    { name: "TextBody", type: "string" },
    { name: "Status", type: "string" },
    {
      name: "DateCreated",
      type: "date",
      dateFormat: "MS",
      defaultValue: new Date(-62135586000000),
    },
    { name: "OwnerTypeId", type: "int", defaultValue: 0 },
    { name: "OwnerId", type: "int", defaultValue: 0 },
  ],

  proxy: {
    type: "rest",
    url: "/Rest/SmartMailTemplate/",
    appendId: true,
  },
});
