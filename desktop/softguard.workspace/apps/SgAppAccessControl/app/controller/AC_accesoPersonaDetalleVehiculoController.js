Ext.define(
  "SgAppAccessControl.controller.AC_accesoPersonaDetalleVehiculoController",
  {
    extend: "Ext.app.Controller",
    stores: [],
    models: [],
    views: ["AC_accesoPersonaDetalleVehiculoView"],

    init: function (config) {
      // genero los eventos
      this.control({
        ac_accesopersonadetallevehiculoview: {
          afterrender: this.initview,
        },
      });
    },

    // Initial function
    initview: function (view) {
      var metadata = view.record.get("usu_cmetadata");
      if (metadata && metadata.length > 0) {
        var data = JSON.parse(metadata);
        
        var form = view.getForm();
        form.setValues(data);
        if (data.photo) {
          view
            .down("#photo")
            .setSrc(
              "/gallery/" +
                data.photo +
                "?_dc=" +
                Math.floor(Math.random() * 1000 + 1)
            );
        }
      }
    },
  }
);
