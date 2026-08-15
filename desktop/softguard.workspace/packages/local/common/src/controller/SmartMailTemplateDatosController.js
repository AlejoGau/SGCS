//MIGRADO2024
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Ext.define("Common.controller.SmartMailTemplateDatosController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["SmartMailTemplateModel"],
  views: ["SmarMailTemplateDatosView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smartmailtemplatedatosview: {
        afterrender: this.initview,
      },
      'smartmailtemplatedatosview button[action="save"]': {
        click: this.onSaveClick,
      },
      'smartmailtemplatedatosview button[action="delete"]': {
        click: this.onDeleteClick,
      },
    });
  }, // cierro init
  initview: function (view) {
    if (view.record.get("Id") == 0) {
      view.down("#adjuntos").setDisabled(true);
    } else {
      view.down("#adjuntos").setDisabled(false);
    }

    view.loadRecord(view.record);
  },
  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up("form").getForm();
    var view = button.up("smartmailtemplatedatosview");
    var templateview = view.up("smartmailtemplateview");
    var templategridview = view.up("tabpanel").down("smarttemplategridview");
    var win = button.up("window");
    var record = myform.getRecord();
    if (!myform.isValid()) {
      notifyError("Debe corregir los valores");
      return false;
    }

    myform.updateRecord(record);

    if (record.get("DateCreated") == null) {
      record.set("DateCreated", new Date(-62135586000000));
    }

    const currentId = record.get("Id");
    if (
      currentId &&
      typeof currentId !== "number" &&
      currentId.includes("SmartMailTemplateModel")
    ) {
      record.set("Id", getRandomInt(1, 900000));
    }

    record.save({
      scope: this,
      win: win,
      callback: function (record, operation) {
        if (operation.success) {
          notify("Los datos se guardaron correctamente");
          view.down("#adjuntos").setDisabled(false);

          if (templateview) {
            /* `templateview` is a variable that is used to reference the parent view of the
            `smartmailtemplatedatosview`. It is used to close the `templateview` if it exists after
            certain actions are performed in the `onSaveClick` and `onDeleteClick` functions. */
            templateview.close();
          } else {
            if (view) {
              view.onRefresh(view.parentView);
              view.close();
            }
          }
        } else {
          notifyError("Hubo un error al guardar los datos");
        }
      },
      button: button,
    });
  },
  onDeleteClick: function (button, event, options) {
    var view = button.up("smartmailtemplatedatosview");
    var win = button.up("window");
    var record = view.record;
    var templateview = view.up("smartmailtemplateview");
    var templategridview = view.up("tabpanel").down("smarttemplategridview");

    Ext.MessageBox.confirm(
      getLocale("Eliminar"),
      getLocale("Está seguro que desea eliminar este template?"),
      function (btn) {
        if (btn === "yes") {
          var date = new Date();
          Ext.Ajax.request({
            url: `/Rest/SmartMailTemplate/${record.get(
              "Id"
            )}?dc=${date.getTime()}`,
            method: "DELETE",
            success: function (resp, operation) {
              if (operation.success) {
                notify("Se eliminó con éxito");
                if (templateview) {
                  templateview.close();
                } else {
                  view.close();
                }

                if (templategridview) {
                  var paging = templategridview.down("pagingtoolbar");
                  //paging.moveFirst();
                  paging.doRefresh();
                }
              }
            },
          });
        }
      }
    );
  },
});
