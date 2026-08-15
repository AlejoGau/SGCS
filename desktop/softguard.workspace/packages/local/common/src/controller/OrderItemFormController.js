Ext.define("Common.controller.OrderItemFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["OrderItemModel"],
  views: ["OrderItemFormView"],

  init: function (config) {
    // genero los eventos

    this.control({
      orderitemformview: {
        beforerender: this.initview,
        productselected: this.onProductChanged,
      },

      "orderitemformview #btnGuardar": {
        click: this.onSaveClick,
      },

      'orderitemformview button[action="changeProduct"]': {
        click: this.onChangeProductClick,
      },
      "orderitemformview #quantityCombo": {
        change: this.onQuantityComboChange,
      },
    });
  }, // cierro init

  initview: function (view) {
    if (!view.record) {
      //creo un registro nuevo
      console.log("sin registro");
    }
    view.loadRecord(view.record);
    this.calculateTotal(view);
  },

  openWindow: function (record, caller) {
    var title = record.get("Name"); //reemplazar por config
    var view = Ext.widget("orderitemformview", {
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
      caller: caller,
    }).show();
  },

  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up("form").getForm();
    var view = button.up("orderitemformview");
    var win = button.up("window");

    var caller = win.caller;
    var mymodel = myform.getRecord();
    var oldname = mymodel.get("Name");
    myform.updateRecord(mymodel);
    var newname = mymodel.get("Name");

    mymodel.save({
      scope: this,
      win: win,
      view: view,
      callback: function (record, operation, success) {
        if (operation.success) {
          notify("Los datos se cuardaron correctamente");
          var mywin = operation.win;
          var view = operation.view;
          if (caller) {
            caller.fireEvent("objectchanged", caller);
            mywin.close();
          }
        } else {
          notifyError("Hubo un error al guardar");
        }
      },
      button: button,
    });
  },

  deleteObject: function (record) {
    record.destroy();
    //location.href = location.pathname;
  },

  onChangeProductClick: function (button, event, options) {
    var view = button.up("orderitemformview");

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Seleccione un producto",
      closeAction: "destroy",
      itemId: "productWin",
      width: 750,
      height: 550,
      border: true,
      modal: true,
      view: view,
      items: [
        {
          xtype: "producthelperview",
          recordOrganizacion: view.recordOrganizacion,
        },
      ],
    });
    win.show();
  },

  onProductChanged: function (record, view) {
    var form = view.getForm();
    form.findField("Code").setValue(record.get("Code"));
    form.findField("Name").setValue(record.get("Name"));
    form.findField("Price").setValue(record.get("Price"));
    // Use imp_nporcentaje (from product's configured tax) with fallback to VAT
    var taxPercentage = record.get("imp_nporcentaje");
    if (taxPercentage === '' || taxPercentage === null || taxPercentage === undefined) {
      taxPercentage = record.get("VAT") || 0;
    }
    form.findField("VAT").setValue(taxPercentage);
    form.findField("ProductId").setValue(record.get("Id"));

    this.calculateTotal(view);
  },

  onQuantityComboChange: function (combo, newValue) {
    var view = combo.up("orderitemformview");
    this.calculateTotal(view);
  },

  calculateTotal: function (view) {
    var form = view.getForm();
    var price = form.findField("Price").getValue();
    var cant = form.findField("Quantity").getValue();
    var subTotal = price * cant;
    var vat = form.findField("VAT").getValue() / 100;
    var itemVAT = subTotal * vat;
    var total = subTotal + itemVAT;

    form.findField("_subTotal").setValue(subTotal);
    form.findField("_VAT").setValue(itemVAT);
    form.findField("Total").setValue(total);
  },
});
