Ext.define("Common.controller.PersonFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "Common.model.MailActionModel",
    "Common.model.PersonModel",
    "Common.model.ActionModel",
    "Common.model.GeographyModel",
  ],
  views: ["PersonFormView"],

  init: function (config) {
    // genero los eventos

    this.control({
      personformview: {
        afterrender: this.initview,
      },
      'personformview button[action="save"]': {
        click: this.onSaveClick,
      },
      'personformview button[action="delete"]': {
        click: this.onDeleteClick,
      },
      'personformview button[action="newAction"]': {
        click: this.onNewActionClick,
      },
      'personformview button[action="mailsend"]': {
        click: this.onMailSendClick,
      },
      'personformview button[action="map"]': {
        click: this.onMapClick,
      },
      '#personMapWindow button[action="posicionar"]': {
        click: this.onPosicionarClick,
      },
      '#personMapWindow button[action="save"]': {
        click: this.onMapSaveClick,
      },
      "personformview #comboPais": {
        change: this.onCountryChange,
      },
    });
  },

  initview: function (view) {
    view.countryStore = Ext.create("Ext.data.Store", {
      model: this.getGeographyModelModel(),
      storeId: "countryStore",
      remoteFilter: true,
      sorters: [
        {
          property: "Name",
          direction: "ASC",
        },
      ],
      filters: [
        {
          property: "Parent",
          value: 0,
        },
      ],
    });

    var countryStore = view.countryStore;
    var countryCombo = view.down("#comboPais");
    view.stateStore = Ext.create("Ext.data.Store", {
      model: this.getGeographyModelModel(),
      remoteFilter: true,
    });
    var stateCombo = view.down("#comboProvincia");

    stateCombo.bindStore(view.stateStore);
    countryCombo.bindStore(countryStore);
    countryStore.load();

    if (view.record) {
      view.loadRecord(view.record);
    } else {
      //console.log('no hay record');
    }
  },

  onCountryChange: function (combo, newvalue, oldvalue) {
    var view = combo.up("personformview");
    var stateCombo = view.down("#comboProvincia");
    var stateStore = stateCombo.getStore();
    if (newvalue != null) {
      stateStore.filter({
        property: "Parent",
        id: "Parent",
        value: newvalue,
      });
    }
  },

  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var view = button.up("form");
    var myform = view.getForm();
    var mymodel = myform.getRecord();

    if (myform.isValid()) {
      oldname = mymodel.get("Name");
      myform.updateRecord(mymodel);
      newname = mymodel.get("Name");

      mymodel.set("Birthday", view.down("#Birthday").getRawValue());
      if (typeof mymodel.get("Id") === "number") {
      } else {
        mymodel.set("Id", 0);
      }
      mymodel.save({
        scope: this,
        callback: function (record, operation) {
          notify("Los datos se guardaron correctamente");
          if (view.oldUrl) mymodel.proxy.url = view.oldUrl;
          if (view.mode == "helper") {
            persongridview = view.caller;

            view.fireEvent("objectchange", record);
          } else {
            var personview = view;

            var persongridview = personview
              .up("tabpanel")
              .down("persongridview");

            if (personview.tab)
              personview.tab.setText(
                mymodel.get("Name") + " " + mymodel.get("LastName")
              );
          }

          if (persongridview) {
            var paging = persongridview.down("pagingtoolbar");
            paging.doRefresh();
          }
        },
        button: button,
      });
    } else {
      notifyError("Los valores no son válidos");
    }
  },

  onDeleteClick: function (button, event, options) {
    var view = button.up("personformview");
    var form = button.up("form");
    const removeObjectFunc = view.removeObject;

    var record = view.record;
    const that = this;
    Ext.Msg.show({
      title: "Confirmacion",
      msg: "Desea eliminar el contacto?",
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function (btn) {
        if (btn === "yes") {
            const pagingToolbar = view.up() && view.up().up() && view.up().up().caller ? view.up().up().caller.down("pagingtoolbar") : undefined;

            Ext.Ajax.request({
              url: `/rest/person/${record.get("Id")}?_dc=${new Date().getTime()}`,
              method: "DELETE",
              scope: that,
              success: function (operation) {
                if (operation.status === 200) {
                  notify("Se elimino el contacto con exito");
                  view.forceClose = true;
                  var personview = view.up("personview");
                  var tab = personview ? personview : view;

                  removeObjectFunc(record);

                  if (pagingToolbar) {
                    pagingToolbar.doRefresh();
                  }

                  if(tab) {
                    tab.close();
                  }
                } else {
                  notify("Error al eliminar el contacto, por favor intente nuevamente.");
                }
              },
            });
        }
      },
    });
  },

  onNewActionClick: function (button, event, options) {
    var panel = button.up("tabpanel");
    var view = button.up("personformview");
    var record = view.record;
    var parentId = record.get("Id");
    var model = this.getActionModelModel();
    var proxy = model.getProxy();
    var oldUrl = proxy.url;
    var url =
      "/Rest/" + record.get("ObjectTypeName") + "/" + parentId + "/action";
    proxy.url = url;
    var me = this;

    var action = Ext.create(model, {
      Name: "Nueva Acción",
      CreatorObjectId: parentId,
      CreatorObjectTypeId: record.get("ObjectTypeId"),
    });

    //me.openObjectTab(view.targetTab,action, true);
    action.save({
      callback: function (r, operation) {
        r.getProxy().url = oldUrl;
        me.openObjectTab(view.targetTab, r, true);
      },
    });
  },

  onMailSendClick: function (button, event, options) {
    var panel = button.up("tabpanel");
    var view = button.up("personformview");
    var record = view.record;
    var parentId = record.get("Id");
    var mailactionmodel = this.getMailActionModelModel();
    var mailaction = Ext.create(mailactionmodel, {
      to: record.get("Email"),
    });

    var metadata = mailaction.getData();
    var model = this.getActionModelModel();
    var proxy = model.getProxy();
    var oldUrl = proxy.url;
    var url =
      "/Rest/" + record.get("ObjectTypeName") + "/" + parentId + "/action";
    proxy.url = url;
    var me = this;

    var action = Ext.create(model, {
      ActionType: "5",
      Name: "Nueva Acción",
      Description: Ext.JSON.encode(metadata),
      CreatorObjectId: record.get("Id"),
      CreatorObjectTypeId: record.get("ObjectTypeId"),
    });

    action.save({
      callback: function (r, operation) {
        r.getProxy().url = oldUrl;
        /*var newTab = Ext.widget('mailactionformview', {
                title : 'Nuevo correo',
                border : false,
                record: action,
        		closable : true,
                parentId: parentId,
                targetTab: panel,
                autoDestroy: true,
                helperConfig: view.helperConfig
    		});
            
            panel.add(newTab);
    		panel.setActiveTab(newTab);*/

        var win = Ext.create("Ext.Window", {
          layout: "fit",
          title: "Nuevo correo",
          closeAction: "hide",
          width: 750,
          height: 550,
          border: true,
          modal: true,
          view: view,
          items: [
            {
              xtype: "mailactionformview",
              parentId: parentId,
              targetTab: panel,
              helperConfig: view.helperConfig,
            },
          ],
        });
        win.show();
      },
    });
  },

  openObjectIframe: function (objectId, objectTypeName, title) {
    var center = window.parent.Ext.getCmp("center");
    if (center) {
      var url = "/a/" + objectTypeName + "?objectId=" + objectId;
      var newTab = Ext.create("Ext.ux.IFrame", {
        title: title,
        border: false,
        src: url,
        closable: true,
        autoDestroy: true,
      });

      center.add(newTab);
      center.setActiveTab(newTab);
    }
  },

  onMapClick: function (button, event, options) {
    var view = button.up("personformview");
    // Limitar a una sola instancia de ventana de mapa
    var existingWin = Ext.ComponentQuery.query('#personMapWindow')[0];
    if (existingWin && existingWin.isVisible()) {
      existingWin.toFront();
      return;
    }

    var myForm = view.getForm();
    var myrecord = myForm.getRecord();
    var provincia = view.down("#comboProvincia").getRawValue();
    var pais = view.down("#comboPais").getRawValue();
    myForm.updateRecord(myrecord);
    var mylat = myrecord.get("AddressLat"),
      myLong = myrecord.get("AddressLong"),
      myAddr = "",
      center = null;

    if (provincia || pais) myAddr = provincia + " ," + pais;

    var mappanel = Ext.widget("gmappanel6", {
      zoomLevel: 5,
      width: "100%",
      flex: 1,
      gmapType: "map",
      mapConfOpts: [
        "enableScrollWheelZoom",
        "enableDoubleClickZoom",
        "enableDragging",
      ],
      mapControls: [
        "GSmallMapControl",
        "GMapTypeControl",
        "NonExistantControl",
      ],
      geocodePosition: function (pos, infowindow) {
        var geocoder = this.getGeocoder();
        geocoder.geocode(
          {
            latLng: pos,
          },
          function (responses) {
            if (responses && responses.length > 0) {
              var address = responses[0].address_components;
              win.responses = responses;
              return responses;
            } else {
              var msg = "No se encontró una dirección válida.";
            }
          }
        );
      },
    });
    if (
      mylat &&
      myLong &&
      (mylat != 0 || mylat != "") &&
      (myLong != 0 || myLong != "")
    ) {
      Ext.apply(mappanel, {
        zoomLevel: 14,
        setCenter: {
          lat: mylat,
          lng: myLong,
          marker: {
            title: myrecord.get("Name"),
            draggable: true,
          },
          listeners: {
            dragend: function (e) {
              var latlng = e.latLng;
              var lat = latlng.lat();
              var long = latlng.lng();
              mappanel.getMap().setCenter(latlng, mappanel.zoomLevel);
              mappanel.geocodePosition(latlng);
            },
          },
        },
      });
    } else if (myAddr) {
      Ext.apply(mappanel, {
        zoomLevel: 14,
        setCenter: {
          geoCodeAddr: myAddr,
          marker: {
            title: myrecord.get("Name"),
            draggable: true,
          },
          listeners: {
            dragend: function (e) {
              var latlng = e.latLng;
              var lat = latlng.lat();
              var long = latlng.lng();
              mappanel.getMap().setCenter(latlng, mappanel.zoomLevel);
            },
          },
        },
      });
    } else {
      Ext.apply(mappanel, {
        zoomLevel: 14,
        setCenter: {
          lat: 0,
          lng: 0,
          marker: {
            title: myrecord.get("Name"),
            draggable: true,
          },
          listeners: {
            dragend: function (e) {
              var latlng = e.latLng;
              var lat = latlng.lat();
              var long = latlng.lng();
              mappanel.getMap().setCenter(latlng, mappanel.zoomLevel);
            },
          },
        },
      });
    }
    var win = Ext.create("Ext.Window", {
      layout: {
        type: "vbox",
        align: "stretch",
      },
      title: getLocale("Mapa"),
      closeAction: "hide",
      itemId: "personMapWindow",
      width: 550,
      height: 550,
      border: true,
      modal: true,
      view: view,
      tbar: [
        { text: "Posicionar", action: "posicionar" },
        { text: "Guardar", action: "save" },
      ],
      items: [
        {
          xtype: "form",
          itemId: "mapAddress",
          width: "100%",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Calle",
              value: myForm.findField("Address").getValue(),
              name: "calle",
            },
            {
              xtype: "combo",
              name: "Country",
              itemId: "comboPais",
              store: view.countryStore,
              value: myForm.findField("Country").getValue(),
              queryMode: "local",
              valueField: "Id",
              forceSelection: true,
              editable: false,
              displayField: "Name",
              lastQuery: "",
              fieldLabel: "País",
              listeners: {
                change: function (combo, newvalue, oldvalue) {
                  var view = combo.up("form");
                  var stateCombo = view.down("#comboProvincia");
                  var stateStore = stateCombo.getStore();
                  stateStore.filter({
                    property: "Parent",
                    id: "Parent",
                    value: newvalue,
                  });
                },
              },
            },
            {
              xtype: "combo",
              fieldLabel: "Provincia / Estado",
              store: view.stateStore,
              name: "provincia",
              value: myForm.findField("State").getValue(),
              plugins: ["clearbutton"],
              editable: false,
              forceSelection: true,
              itemId: "comboProvincia",
              valueField: "Id",
              displayField: "Name",
            },
            {
              xtype: "textfield",
              fieldLabel: "Ciudad",
              value: myForm.findField("City").getValue(),
              name: "localidad",
            },
          ],
        },
        mappanel,
      ],
    });
    win.show();
  },

  onPosicionarClick: function (button, event, options) {
    var win = button.up("#personMapWindow");
    var view = win.view;
    var form = win.down("form").getForm();
    var map = win.down("gmappanel6");
    var myAddr = form.findField("direccion").getValue();

    map.geoCodeLookup(
      myAddr,
      map.setCenter.marker,
      true,
      true,
      map.setCenter.listeners
    );
    map.geocodePosition(map.getCenter());
  },

  onMapSaveClick: function (button, event, options) {
    var win = button.up("#personMapWindow");
    var view = win.view;
    var form = win.down("form").getForm();
    var map = win.down("gmappanel6");
    var personForm = view.getForm();

    var latlng = map.getCenterLatLng();
    var latfield = personForm.findField("AddressLat");
    var longfield = personForm.findField("AddressLong");
    latfield.setValue(latlng.lat);
    longfield.setValue(latlng.lng);

    if (win.responses) {
      var addr = win.responses[0].address_components;
      //personForm.findField('Country').setValue(addr[5].long_name);
      //personForm.findField('State').setValue(addr[3].long_name);
      personForm.findField("City").setValue(addr[4].long_name);
      personForm
        .findField("Address")
        .setValue(addr[1].long_name + " " + addr[0].long_name);
      win.close();
    }
  },

  openObjectTab: function (targetTab, object, sendrecord) {
    var objectId = object.get("Id");
    var objectTypeName = object.get("ObjectTypeName");
    var title = object.get("Name");
    var container = objectTypeName.toLowerCase() + "view";
    var record = sendrecord ? object : null;
    var newTab = Ext.widget(container, {
      title: title,
      border: false,
      closable: true,
      objectId: objectId,
      record: record,
      targetTab: targetTab,
      autoDestroy: true,
    });

    targetTab.add(newTab);
    targetTab.setActiveTab(newTab);
  },
});
