Ext.define("Common.controller.OrderGridController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.OrderItemStatusStore"],
  models: [
    "m_comprobantes_cab_fcModel",
    "t_comprobantes_fcSearchModel",
    "OrderModel",
    "OrderSearchModel",
  ],
  views: ["OrderGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      ordersearchview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        transformarordercomprobante: this.onTransformarordercomprobante,
        refresh: this.refresh,
        beforedestroy: this.beforedestroy,
      },
      "ordersearchview button[action=search]": {
        click: this.onSearchClick,
      },
      "ordersearchview #getall": {
        click: this.onGetAllClick,
      },
      'ordersearchview button[action="newOrder"]': {
        click: this.onNewOrderClick,
      },
      "ordersearchview button[action=groupStatus]": {
        click: this.onGroupStatusClick,
      },
    });
  },

  refresh: function (view) {
    view.getStore().load();
  },

  beforedestroy: function (view) {
    //debugger;
    console.log("beforedestroy");
  },

  onTransformarordercomprobante: function (rec, view) {
    var controller = this;

    if (rec.get("Status") == 9) {
      Ext.MessageBox.confirm(
        "Atencion",
        "Esta cotizacion ya fue transformada a comprobante, quiere generar un nuevo comprobante ?",
        function (btn) {
          if (btn === "yes") {
            controller.abrirTransformador(rec, view);
          } else {
            //some code
          }
        }
      );
    } else {
      controller.abrirTransformador(rec, view);
    }
  },

  abrirTransformador: function (rec, view) {
    var controller = this;
    var myWindow = Ext.widget("window", {
      title: getLocale("Seleccione"),
      height: 100,
      width: 300,
      modal: true,
      items: [
        {
          xtype: "combo",
          editable: false,
          queryMode: "local",
          fieldLabel: "Tipo comprobante",
          lastQuery: "",
          name: "cbc_ctipocbte",
          itemId: "cbc_ctipocbte",
          displayField: "cbt_cdescripcion",
          valueField: "cbt_ccodigo",
          allowBlank: false,
          fieldWidth: 150,
        },
      ],
      bbar: [
        {
          xtype: "button",
          text: "Aceptar",
          iconCls: "icon-accept",
          handler: function (btn) {
            var win = btn.up("window");

            Ext.Ajax.request({
              url: "/rest/search/MG_TransformarCotizacionEnComprobante",
              method: "GET",
              params: {
                idCotizacion: rec.get("Id"),
                tipoComprobante: win.down("#cbc_ctipocbte").getValue(),
              },
              success: function (resp, operation) {
                if (resp.responseText) {
                  var record = Ext.JSON.decode(resp.responseText);
                  if (record) {
                    //cargo comprobante creado
                    controller
                      .getM_comprobantes_cab_fcModelModel()
                      .load(record.rows[0].cbc_iCodigo_ID, {
                        callback: function (recordComprobante) {
                          var panel = view.up("tabpanel");
                          var title =
                            getLocale("Comprobante") +
                            ": " +
                            recordComprobante.get("_ncomprobante");
                          var mytab = panel.down('[title="' + title + '"]');

                          if (!mytab) {
                            var viewOpen = "comprobanteformview";
                            var filters = [];

                            var newTab = Ext.widget(viewOpen, {
                              record: recordComprobante,
                              recordOrganizacion: view.record,
                              translate: false,
                              targetTab: newTab,
                              title: title,
                              closable: true,
                              //caller: viewgrid,
                              organizacionId: view.record.get("Id"),
                              filters: filters,
                            });

                            panel.add(newTab);
                            panel.setActiveTab(newTab);

                            win.close();
                          }
                        },
                      });
                  }
                }
              },
            });
          },
        },
      ],
      caller: view,
    }).show();

    var TipoComprobanteStore = Ext.create("Ext.data.Store", {
      model: this.getT_comprobantes_fcSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "cbt_ntipo:NOT",
          value: 7,
        },
        {
          property: "org_icodigo_ID",
          value: view.record.get("cli_iOrganizacion"),
        },
      ],
    });

    myWindow.down("#cbc_ctipocbte").bindStore(TipoComprobanteStore);
    TipoComprobanteStore.load({
      callback: function () {
        //selecciono el rpimer item
        myWindow
          .down("#cbc_ctipocbte")
          .select(TipoComprobanteStore.getAt(0), true);
      },
    });
  },

  initView: function (view) {
    var record = view.record;
    view.filters = [];
    view.setDisabled(false);
    var objectTypeId = 0;
    if (record) {
      var objectTypeId = record.get("ObjectTypeId");
      var objectTypeName = record.get("ObjectTypeName");
      view.filters = [
        {
          //property: 'objectTypeName + ':RelationParent'',
          property: "ClientId",
          value: record.get("Id"),
        },
      ];
    } else {
      view.down("#newOrder").hide();
    }

    var store = Ext.create("Ext.data.Store", {
      model: this.getOrderSearchModelModel(),
      remoteFilter: true,
      filters: view.filters,
      autoload: false,
    });

    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);
    view.bindStore(store);
    store.load();

    var storeEstados = Ext.data.StoreManager.lookup(
      "Common.store.OrderItemStatusStore"
    );
    view.down("#estados").bindStore(storeEstados);
  },

  onGetAllClick: function (button, event, options) {
    var view = button.up("ordersearchview");
    var store = view.getStore();

    view.down("#date").setValue("");
    view.down("#datecreate").setValue("");
    view.down("#estados").setValue("");
    view.down("#organizacion").setValue("");

    store.clearFilter(true);
    store.filter(view.filters);
    //store.load()
  },

  onNewOrderClick: function (button, event, options) {
    var panel = button.up("tabpanel");
    var view = button.up("ordersearchview");
    var record = view.record;
    var parentId = record.get("Id");
    var model = this.getOrderModelModel();
    var proxy = model.getProxy();
    var oldUrl = proxy.url;
    var url = "/rest/organization/" + parentId + "/order";
    var me = this;

    // proxy.url = url;
    var object = model.create({
      //Ext.create( model, {
      Id: 0,
      Name: record.get("Name"),
      Email: record.get("Email"),
      Address: record.get("Address"),
      City: record.get("City"),
      Status: "1",
      State: record.get("State"),
      Country: record.get("Country"),
      HomePhone: record.get("Phone"),
      MobilePhone: record.get("Mobile"),
      ZipCode: record.get("Zip"),
      Cuit: record.get("NationalTax"),
      ClientId: record.get("Id"),
      ForecastDate: Ext.Date.add(new Date(), Ext.Date.MONTH, 1),
      DateCreated: new Date(),
      ClientTypeId: record.get("ObjectTypeId"),
    });

    // object.save( {
    //     callback: function( record, operation ) {
    //         proxy.url = oldUrl;
    //         me.openObjectTab( panel, record, view );
    //     }
    // });

    me.openObjectTab(panel, object, view);
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("ordersearchview");
    var store = view.getStore();
    var query = view.down("#query");
    var field = view.down("#fieldName");
    var filters = Ext.Array.clone(view.filters);
    var fechaProbable = view.down("#date").getValue();
    var datecreate = view.down("#datecreate").getValue();
    var estados = view.down("#estados").getValue();
    var organizacion = view.down("#organizacion").getValue();

    if (organizacion)
      filters.push({
        property: "org.[Name]:LIKE",
        value: organizacion,
        id: "org.[Name]:LIKE",
      });

    if (estados)
      filters.push({
        property: "o.Status",
        value: estados,
        id: "o.Status",
      });

    if (datecreate)
      filters.push({
        property: "o.DateCreated:GTE",
        value: datecreate,
        id: "DateCreated",
      });
    /*       
            
                    
                if (fechaHasta)
                    filters.push({ 
                        property: 'FechaPrimeraIntervencion:LT',
                        value: fechaHasta,
                        id: 'fechaHasta'
                    });
                
            */

    if (fechaProbable) {
      filters.push({
        property: "ForecastDate:GTEDATESTRING",
        value: Ext.Date.format(fechaProbable, "Y/m/d"),
        id: "fechaprobable",
      });
    }

    store.clearFilter(true);
    if (filters) store.filter(filters);
  },

  onGroupStatusClick: function (button, event, options) {
    var view = button.up("ordersearchview");
    var grid = view.view;
    store = view.getStore();

    if (button.pressed) {
      grid.getFeature("groupingsummary").enable();
      store.group("Status", "ASC");
    } else {
      store.clearGrouping();
      grid.getFeature("groupingsummary").disable();
    }
  },

  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");
    var model = this.getOrderModelModel();
    var proxy = model.getProxy();

    var view = grid.up("ordersearchview") ? grid.up("ordersearchview") : grid;
    panel = view.up("tabpanel");
    var title = getLocale("Cotización") + ": " + record.get("Name");
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');

    model.load(id, {
      callback: function (_record) {
        if (!mytab) {
          var newTab = Ext.widget("orderformview", {
            record: _record,
            recordSearch: record,
            targetTab: newTab,
            title: title,
            translate: false,
            objectId: id,
            closeAction: "destroy",
            closable: true,
            caller: view,
            recordOrganizacion: view.record
              ? view.record.recordOrganizacion
              : null,
          });

          panel.add(newTab);
          panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
          mytab.show();
        }
      },
    });
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  /*openObjectTab: function(tabpanel, objectId, objectTypeName, title, view ) {
        var title = object.get( 'Name' );
        var newTab = tabpanel.down( '[title="' + title + '"]' );
        if( !newTab ) {
            var newTab = Ext.widget( 'orderformview', {
                title: title,
                border: false,
                closable: true,
                objectId: objectId,
                targetTab: tabpanel,
                autoDestroy: true,
                caller: view,
                recordOrganizacion: view.record
            });

            tabpanel.add( newTab );
        }

        tabpanel.setActiveTab( newTab );
    },*/

  onContentCreated: function (view) {
    var record = view.record;
    var grid = view.caller;
    var paging = view.down("pagingtoolbar");

    paging.moveFirst();
    paging.doRefresh();
    this.onItemClick(grid, record);
  },

  openObjectTab: function (targetTab, object, view) {
    var objectId = object.get("Id");
    var title = object.get("Name");

    var newTab = Ext.widget("orderformview", {
      Id: 0,
      title: title,
      border: false,
      closable: true,
      record: object,
      objectId: objectId,
      targetTab: targetTab,
      autoDestroy: true,
      caller: view,
      recordOrganizacion: view.record,
    });

    targetTab.add(newTab);
    targetTab.setActiveTab(newTab);
  },
});
