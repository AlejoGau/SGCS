//MIGRADO2024
Ext.define("Common.model.ComandoGpsConfigModel", {
  extend: "Ext.data.Model",
  idProperty: "ticks",
  fields: [
    {
      name: "ticks",
      type: "auto",
      convert: function (v) {
        if (!v) {
          // Generar un ID único para cada registro nuevo
          return (
            new Date().getTime() + "-" + Math.random().toString(36).substr(2, 9)
          );
        }
        return v;
      },
    },
    {
      name: "Id",
      type: "int",
      convert: function (v) {
        if (v == 0) {
          var d = new Date();
          v = d.getTime();
        }
        return v;
      },
    },
    {
      name: "Tipo",
      type: "int",
    },
    {
      name: "Name",
      type: "string",
    },
    {
      name: "Config",
      type: "string",
    },
    {
      name: "cComando",
      type: "string",
    },
  ],
});
