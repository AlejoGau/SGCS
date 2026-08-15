Ext.define("Common.controller.ActionFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["Common.model.ActionSearchModel", "Common.model.ActionModel"],
  views: ["Common.view.ActionFormView"],

  init: function (config) {
    // genero los eventos
    this.control({
      actionformview: {
        beforerender: this.initview,
      },

      'actionformview button[action="Guardar"]': {
        click: this.onSaveClick,
      },

      'actionformview button[action="Cancelar"]': {
        click: this.onCancelClick,
      },

      'actionformview button[action="Eliminar"]': {
        click: this.onDeleteClick,
      },
    });
  }, // cierro init

  initview: function (view) {
    var typestore = deepCloneStore(Ext.StoreManager.lookup("ActionTypeStore"));
    typestore.removeAt(5);
    typestore.removeAt(4);
    view.down("#ActionType").bindStore(typestore);

    view.loadRecord(view.record);

    if (view.hideEliminar) {
      view.down("#eliminar").hide();
    }
  },

  openWindow: function (record) {
    var title = record.get("Name"); //reemplazar por config
    var view = Ext.widget("actionformview", {
      record: record,
      //callback: this.onEdit,
      scope: this,
    });

    var myWindow = Ext.widget("window", {
      title: title,
      height: 400,
      width: 400,
      modal: true,
      items: view,
      layout: "fit",
    }).show();
  },

  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up("form").getForm();
    if (!myform.isValid()) {
      notify("Complete los campos requeridos");
      return;
    }

    var view = button.up("actionformview");
    var win = button.up("window");
    var mymodel = myform.getRecord();
    var oldname = mymodel.get("Name");
    myform.updateRecord(mymodel);
    var newname = mymodel.get("Name");
    //mymodel.store.setProxy(this.getActionModelModel().getProxy());
    if (isNaN(mymodel.id) || mymodel.id == null) {
      mymodel.id = 0;
      mymodel.data.Id = 0;
      mymodel.set("Id", 0);
    }
    mymodel.save({
      scope: this,
      win: win,
      view: view,
      callback: function (record, operation) {
        notify("Los datos se guardaron correctamente");
        var mywin = operation.win;
        var view = operation.view;
        if (view) {
          view.fireEvent("objectchanged", operation);
          if (mywin) mywin.close();
        } else {
          console.log(view);
        }
      },
      button: button,
    });
  },

  onDeleteClick: function (button, event, options) {
    var myform = button.up("form").getForm();
    var record = myform.getRecord();
    const that = this;

    Ext.Msg.show({
      title: "Confirmacion",
      msg: "Desea eliminar el la accion?",
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function (btn) {
        if (btn === "yes") {
          Ext.Ajax.request({
            url: `/rest/action/${record.get("Id")}?_dc=${new Date().getTime()}`,
            method: "DELETE",
            scope: that,
            success: function (operation) {
              if (operation.status === 200) {
                notify("Se elimino el contacto con exito");

                var view = button.up("actionformview");
                var win = button.up("window");
                // view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
                view.caller.fireEvent("refresh", view.caller);
                win.close();
              } else {
                notify(
                  "Error al eliminar el contacto, por favor intente nuevamente.",
                );
              }
            },
          });
        }
      },
    });
  },

  onCancelClick: function (button, event, options) {
    myWin = button.up("window");
    myWin.close();
  },
});