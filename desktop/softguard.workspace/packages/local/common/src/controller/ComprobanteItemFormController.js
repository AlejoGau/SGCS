Ext.define("Common.controller.ComprobanteItemFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["m_comprobantes_item_fcModel", "ProductSearchModel"],
  views: ["ComprobanteItemFormView"],

  init: function (config) {
    this.control({
      "comprobanteitemformview ^ window": {
        // el evento activate solo esta en la window
        activate: this.onActivate,
      },
      comprobanteitemformview: {
        afterrender: this.initview,
        productselected: this.onProductChanged,
      },
      "comprobanteitemformview #save": {
        click: this.onSaveClick,
      },
      "comprobanteitemformview #changeProduct": {
        click: this.onChangeProductClick,
      },
      "comprobanteitemformview #quantityCombo": {
        change: this.onQuantityComboChange,
      },
    });
  }, // cierro init

  onActivate: function (win) {
    var view = win.down("comprobanteitemformview");
    if (view.record.get("cbi_iproducto") == 0 && !view._activated) {
      view.down("#Id").setValue(0);
      view.down("#Name").setValue(getLocale("Selecione un producto"));
      view.down("#Price").setValue(0);
      view.down("#_VAT").setValue(0);

      view._activated = true;
      //this.onChangeProductClick(view.down('#changeProduct'));
    }
  },

  initview: function (view) {
    if (!view.record) {
      //creo un registro nuevo
      console.log("sin registro");
    }

    // si tiene producto lo cargo
    if (view.record.get("cbi_iproducto") > 0) {
      var record = view.record;
      view.recordSelected = record;
      view.recordSelected.set(
        "mon_csymbol",
        view.recordOrganizacion.get("mon_csymbol"),
      );

      view.down("#Id").setValue(record.get("Id"));
      view.down("#Name").setValue(record.get("Name"));
      view.down("#Price").setValue(record.get("cbi_yimporte"));

      // Mostrar porcentaje de impuesto del item
      var impPorcentaje = record.get("imp_nporcentaje");
      if (impPorcentaje && impPorcentaje !== '') {
        view.down("#VAT").setValue("%" + impPorcentaje);
      }

      view.down("#quantityCombo").setValue(view.record.get("cbi_icantidad"));

      this.calculateTotal(view);

      /*
            var storePrduct = Ext.create('Ext.data.Store',{
                model: this.getProductSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters:[{
                    property:'Id',
                    value:view.record.get('cbi_iproducto')
                }]
            }).load({callback:function (records) {
                if(records.length>0) {
                    view.recordSelected = records[0]
                    view.recordSelected.set('mon_csymbol',view.recordOrganizacion.get('mon_csymbol'))

                    var vat = records[0].get('VAT')/100;
                    
                    view.down('#Id').setValue(records[0].get('Id'));
                    view.down('#Name').setValue(records[0].get('Name'));
                    view.down('#Price').setValue(view.record.get('cbi_yimporte'));
                    view.down('#_VAT').setValue(vat);
                } else {
                    view.down('#Id').setValue(0);
                    view.down('#Name').setValue(getLocale('Selecione un producto'));
                    view.down('#Price').setValue(0);
                    view.down('#_VAT').setValue(0);
                }
                
                view.down('#quantityCombo').setValue(view.record.get('cbi_icantidad'))
            }})
            */
    }
  },

  openWindow: function (record, caller, recordOrganizacion) {
    var title = record.get("Name"); //reemplazar por config
    var view = Ext.widget("comprobanteitemformview", {
      record: record,
      recordOrganizacion: recordOrganizacion,
      recordComprobante: caller.record,
      scope: this,
      caller: caller,
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
    // accedo al registro y lo salvo
    var myform = button.up("form").getForm();
    var view = button.up("comprobanteitemformview");
    var win = button.up("window");

    caller = view.caller;

    var model = this.getM_comprobantes_item_fcModelModel().create({
      Id: 0, // view.record.get('Id'),
      cbi_icodigocab: view.record.get("cbi_icodigocab"),
      cbi_iproducto: myform.findField("Id").getValue(),
      cbi_yimporte: myform.findField("Price").getValue(),
      cbi_icantidad: myform.findField("Quantity").getValue(),
      cbi_cimpuestos: view.recordSelected ? view.recordSelected.get("cbi_cimpuestos") || view.recordSelected.get("imp_ccodigo") || '' : '',
    });

    if (
      typeof view.record.get("Id") === "number" &&
      view.record.get("Id") != 0
    ) {
      model.setId(view.record.get("Id"));
    }

    model.save({
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
    return false;
  },

  onDeleteClick: function (button, event, options) {
    var myform = button.up("form").getForm();
    this.deleteObject(myform.getRecord());
    var view = button.up("comprobanteitemformview");
    var win = button.up("window");
    view.fireEvent("objectchanged"); // debiera ser en el callback del destroy
    win.close();
  },

  onCancelClick: function (button, event, options) {
    myWin = button.up("window");
    myWin.close();
  },

  deleteObject: function (record) {
    record.destroy();
    //location.href = location.pathname;
  },

  onChangeProductClick: function (button, event, options) {
    var view = button.up("comprobanteitemformview");
    var caller = view.caller;

    var comprobanteRecord = caller.record;

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
          header: false,
          //filters:[{property:'imp_idorganizacion',value:comprobanteRecord.get('cli_iOrganizacion')}]
        },
      ],
    });
    win.show();

    //lo pongo por que se dispara 2 veces
    return false;
  },

  onProductChanged: function (record, view) {
    view.recordSelected = record;
    // Use the organization's currency, not the product's native currency
    view.recordSelected.set(
      "mon_csymbol",
      view.recordOrganizacion.get("mon_csymbol"),
    );
    var form = view.getForm();

    console.log("[ComprobanteProduct] onProductChanged:", {
      productId: record.get("Id"),
      name: record.get("Name"),
      imp_nporcentaje: record.get("imp_nporcentaje"),
      VAT: record.get("VAT"),
      final_price: record.get("final_price"),
      cbc_iversion: view.recordComprobante.get("cbc_iversion"),
    });

    /*si la organizacion facturadora tiene factura electronica
        y el producto no tiene un impuesto asignado no dejo continuar*/
    if (
      view.recordOrganizacion.get("org_factelect") == "AfipCae" &&
      record.get("imp_nporcentaje") == ""
    ) {
      notify(
        "Es requerido para facturacion electronica, que el producto tenga un impuesto asignado.",
      );
      return false;
    }

    view.down("#Id").setValue(record.get("Id"));
    view.down("#Name").setValue(record.get("Name"));
    view.down("#Price").setValue(record.get("final_price"));

    if (view.recordComprobante.get("cbc_iversion") == 0) {
      view.down("#_VAT").setValue(record.get("VAT"));
    } else {
      view.down("#VAT").setValue("%" + record.get("imp_nporcentaje"));
    }

    this.calculateTotal(view);
  },

  onQuantityComboChange: function (combo, newValue) {
    var view = combo.up("comprobanteitemformview");
    this.calculateTotal(view);
  },

  calculateTotal: function (view) {
    var form = view.getForm();
    var price = form.findField("Price").getValue();
    var cant = form.findField("Quantity").getValue();
    var subTotal = price * cant;

    if (
      view.recordSelected &&
      view.recordSelected.get("imp_nporcentaje") != ""
    ) {
      var vat = view.recordSelected.get("imp_nporcentaje") / 100;
    } else {
      var vat = view.recordSelected ? view.recordSelected.get("VAT") / 100 : 0;
    }
    var itemVAT = subTotal * vat;
    var total = subTotal + itemVAT;

    console.log("[ComprobanteProduct] calculateTotal:", {
      price: price,
      cant: cant,
      subTotal: subTotal,
      imp_nporcentaje: view.recordSelected
        ? view.recordSelected.get("imp_nporcentaje")
        : "N/A",
      VAT: view.recordSelected ? view.recordSelected.get("VAT") : "N/A",
      vat: vat,
      itemVAT: itemVAT,
      total: total,
    });

    view.down("#_subTotal").setValue(subTotal);
    view.down("#_VAT").setValue(itemVAT);
    view.down("#Total").setValue(total);
  },
});
