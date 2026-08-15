//MIGRADO2024
Ext.define("Common.controller.STProductosFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "TablasProductosSearchModel",
    "t_impuestos_fcSearchModel",
    "MG_product_impuestoSearchModel",
    "MG_product_impuestoModel",
    "t_organizacion_fcSearchModel",
    "TablasProductosModel",
  ],
  views: ["STProductosFormView", "ImpuestoItemGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      stproductosformview: {
        beforerender: this.initview,
      },
      'stproductosformview button[action="save"]': {
        click: this.onSaveClick,
      },
      // 'stproductosformview #impuesto': {
      //     select: this.onImpuestoSelect
      // }
    });
  }, // cierro init
  initview: function (view) {
    var controller = this;
    if (!view.idOganizacionUsuario) {
      view.idOganizacionUsuario = _UserData.Company;
    }
    //si aun no tiene moneda ya se la defino
    if (view.record.get("pro_currency") == "") {
      var SYSTEMCURRENCY = getParametro("SYSTEMCURRENCY", false, true);
      if (SYSTEMCURRENCY && SYSTEMCURRENCY.codigo) {
        view.record.set("pro_currency", SYSTEMCURRENCY.codigo);
      } else {
        notify("Debe definir el prarametro SYSTEMCURRENCY");
        view.tab.close();
      }
    }
    var organizationStore = Ext.create("Ext.data.Store", {
      model: controller.getT_organizacion_fcSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
      sorters: [
        {
          property: "org_cnombre",
          direction: "ASC",
        },
      ],
      filters: [
        {
          property: "org_organizacionId",
          value: _UserData.Company,
        },
      ],
      autoload: false,
    });
    var organizationCombo = view.down("#org_organizacionId");
    organizationCombo.bindStore(organizationStore);
    organizationStore.load({
      callback: function (records) {
        var store = Ext.create("Ext.data.Store", {
          model: controller.getT_organizacion_fcSearchModelModel(),
          remoteFilter: true,
          remoteSort: true,
          pageSize: 10000,
          /*sorters: [{
                    property: 'mgmc_ccodigo',
                    direction: 'ASC'
                }],*/
          autoload: false,
        });
        //var toolbar = view.down('pagingtoolbar');
        //toolbar.bindStore(store);
        //view.bindStore(store);
        //organizationCombo.select(records[0]);
      },
    });
    view.loadRecord(view.record);
    var impuestoitemgridview_v = view.down("impuestoitemgridview");
    impuestoitemgridview_v.record = view.record;
    if (view.record.get("Id") != 0) {
      view.down("productolistaprecioview").setDisabled(false);
      impuestoitemgridview_v.setDisabled(false);
    } else {
      view.down("productolistaprecioview").setDisabled(true);
      impuestoitemgridview_v.setDisabled(true);
    }
    if (
      view.record.get("pro_iidorganizacion") == 0 ||
      view.record.get("pro_iidorganizacion") == ""
    ) {
      view.down("#todaslasorganizaciones").setValue(true);
    }
    var storeKey = SecurityModulesStore; //Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    if (storeKey.isModuleAvailable("Administrator")) {
      view.down("#todaslasorganizaciones").show();
    }
    var storeImpuestos = Ext.create("Ext.data.Store", {
      model: this.getT_impuestos_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "org_organizacionId", // uso la organizacion del usuario para filtrar las org facturadoras disponibles.
          value: _UserData.Company,
        },
      ],
    });
    // var _impuesto = view.down( '#impuesto' );
    // _impuesto.bindStore( storeImpuestos );
    // storeImpuestos.load()
    //cargo el impuesto
  },

  onImpuestoSelect: function (combo, records) {
    var record = records[0];
    var view = combo.up("stproductosformview");
    view.down("#vat").setValue(record.get("imp_nporcentaje"));
  },
  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up("form").getForm();
    var view = button.up("stproductosformview");
    var win = button.up("window");
    var record = myform.getRecord();
    var controller = this;
    var model = this.getTablasProductosModelModel();
    view.store = Ext.create("Ext.data.Store", {
      model: controller.getTablasProductosSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "Code",
          value: view.down("#Code").getValue(),
        },
      ],
    }).load({
      callback: function (records) {
        // Validar SKU duplicado solo si hay resultados y es un producto diferente
        // Usamos view.objectId porque view.record.get('Id') puede ser 0 al editar
        var currentId = parseInt(view.objectId, 10) || 0;
        var foundId =
          records.length > 0 ? parseInt(records[0].get("Id"), 10) : 0;

        console.log("SKU Validation - currentId:", currentId, "foundId:", foundId, "records.length:", records.length);

        // Solo mostrar error si es un SKU duplicado de OTRO producto
        if (records.length > 0 && currentId !== foundId) {
          notify("El SKU ya se encuentra en uso por otro producto.");
          return false;
        }
        // me fijo si tiene moneyguard en la llave para hacer impuestos obligatorios o no
        var storeKeyModule = KeyModulesStore; //controller.getKeyModulesStoreStore();
        var isAvailable = storeKeyModule.isModuleAvailable("WebMG");
        var impuestoitemgridview_v = view.down("impuestoitemgridview");
        // if( isAvailable ) { //_impuesto.allowBlank = false;
        //     var parentorderid = record.get( 'Id' );
        //     var store = Ext.create( 'Ext.data.Store', {
        //         model: controller.getMG_product_impuestoSearchModelModel(),
        //         pageSize: 500,
        //         filters: [ {
        //             property: 'mpi_idproduct',
        //             value: parentorderid
        //         }],
        //         remoteSort: false,
        //         remoteFilter: true
        //     });
        //     store.load( {
        //         callback: function( records, operation ) {
        //             if( operation.success && records.length == 0 )
        //             {
        //                 notifyError( 'Debe cargar un impuesto' );
        //                 return;
        //             }
        //             myform.updateRecord( record );
        //             if( myform.isValid() ) {
        //                 if( view.down( '#todaslasorganizaciones' ).getValue() == true ) {
        //                     record.set( 'pro_iidorganizacion', 0 )
        //                 } else {
        //                     record.set( 'pro_iidorganizacion', view.idOganizacionUsuario )
        //                 }
        //                 record.save( {
        //                     scope: this,
        //                     view: view,
        //                     callback: function( record, operation ) {
        //                         if( operation.success ) {
        //                             var win = view.up( 'window' );
        //                             notify( 'Los datos se guardaron correctamente' );
        //                             view.caller.fireEvent( 'objectchanged', view.caller, record );
        //                             view.down( 'productolistaprecioview' ).setDisabled( false )
        //                             view.down( 'impuestoitemgridview' ).setDisabled( false )
        //                             if( view.down( 'productolistaprecioview' ) ) {
        //                                 view.down( 'productolistaprecioview' ).record = record;
        //                                 view.down( 'productolistaprecioview' ).fireEvent( 'loadAll', view.down( 'productolistaprecioview' ), record )
        //                             }
        //                             if( view.down( 'impuestoitemgridview' ) ) {
        //                                 view.down( 'impuestoitemgridview' ).record = record;
        //                                 view.down( 'impuestoitemgridview' ).fireEvent( 'loadAll', view.down( 'impuestoitemgridview' ), record )
        //                             }
        //                             //win.close();
        //                         } else {
        //                             notifyError( 'Hubo un error al guardar los datos' );
        //                         }
        //                     },
        //                     button: button
        //                 });
        //             }
        //         }
        //     });
        // }
        // else {
        //record.proxy.url = model.getProxy().url;//record.setProxy( model.getProxy() );
        myform.updateRecord(record);

        if (myform.isValid()) {
          if (view.down("#todaslasorganizaciones").getValue() == true) {
            record.set("pro_iidorganizacion", 0);
          } else {
            record.set("pro_iidorganizacion", view.idOganizacionUsuario);
          }
          // Asegurar que el record usa el proxy correcto del modelo
          record.getProxy().setUrl(model.getProxy().getUrl());
          
          // Para registros nuevos (phantom), establecer Id a 0 para evitar enviar el nombre del modelo
          if (record.phantom) {
            record.set('Id', 0);
          }
          
          record.save({
            scope: this,
            view: view,
            callback: function (record, operation) {
              if (operation.success) {
                var win = view.up("window");
                notify("Los datos se guardaron correctamente");
                view.caller.fireEvent("objectchanged", view.caller, record);
                view.down("productolistaprecioview").setDisabled(false);
                view.down("impuestoitemgridview").setDisabled(false);
                if (view.down("productolistaprecioview")) {
                  view.down("productolistaprecioview").record = record;
                  view
                    .down("productolistaprecioview")
                    .fireEvent(
                      "loadAll",
                      view.down("productolistaprecioview"),
                      record
                    );
                }
                if (view.down("impuestoitemgridview")) {
                  view.down("impuestoitemgridview").record = record;
                  view
                    .down("impuestoitemgridview")
                    .fireEvent(
                      "loadAll",
                      view.down("impuestoitemgridview"),
                      record
                    );
                }
                //win.close();
              } else {
                notifyError("Hubo un error al guardar los datos");
              }
            },
            button: button,
          });
        }
        // }
      },
    });
  },
});
