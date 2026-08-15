//MIGRADO2024
Ext.define("Common.controller.mg_informacionPagoFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["MG_informacion_pagoSearchModel", "MG_informacion_pagoModel"],
  views: ["mg_informacionPagoFormView"],

  init: function (config) {
    this.control({
      mginformacionpagoformview: {
        afterrender: this.initview,
      },
      'mginformacionpagoformview button[action="saveformapago"]': {
        click: this.onSaveClick,
      },
      "mginformacionpagoformview #organizacionfacturadora": {
        change: this.onOrganizacionFacturadoraChange,
      },
    });
  },

  initview: function (view) {
    var controller = this;

    if (!view.record) {
      view.record = Ext.create(this.getMG_informacion_pagoModelModel(), {
        mip_idcliente: view.recordCliente.get("Id"),
        mip_fpgidkey: view.condicionpago.get("fpg_idKey"),
      });
    }

    view.loadRecord(view.record);
  },

  onOrganizacionFacturadoraChange: function (combo, newvalue, oldvalue) {
    var view = combo.up("clienteformview");
    var categoriasImpositivasStore = view
      .down("#categoriasimpositivas")
      .getStore();
    categoriasImpositivasStore.filter({
      property: "cat_orgicodigoid",
      value: newvalue,
      id: "cat_orgicodigoid",
    });
  },

  onSaveClick: function (button, event, options) {
    myform = button.up("form").getForm();
    var view = button.up("clienteformview");
    mymodel = myform.getRecord();
    var record = mymodel;

    if (myform.isValid()) {
      myform.updateRecord(mymodel);
      mymodel.save({
        scope: this,
        callback: function (record, operation) {
          notify("Los datos se guardaron correctamente");
        },
        button: button,
      });
    } else {
      notify("No se ha guardado. Hay datos inválidos.");
    }
  },
});
