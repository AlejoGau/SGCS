Ext.define("Common.controller.EventFormController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.EventTypeStore"],
  models: ["EventModel", "GeographyModel", "EventTypeModel"],
  views: ["EventFormView", "EventDescriptionFormView"],

  init: function (config) {
    // genero los eventos

    this.control({
      eventformview: {
        afterrender: this.initview,
      },
      'eventformview button[action="delete"]': {
        click: this.onDeleteClick,
      },
      'eventformview button[action="map"]': {
        click: this.onMapClick,
      },
      'eventdescriptionformview button[action="save"]': {
        click: this.onSaveClick,
      },
      '#eventMapWindow button[action="posicionar"]': {
        click: this.onPosicionarClick,
      },
      '#eventMapWindow button[action="save"]': {
        click: this.onMapSaveClick,
      },
    });
  },

  initview: function (view) {
    if (view.record) {
      view.loadRecord(view.record);

      view.down("#starttime").setValue(view.record.get("StartDate"));
      view.down("#endtime").setValue(view.record.get("EndDate"));
    } else {
      //console.log('no hay record');
    }
  },

  onSaveClick: function (button, event, options) {
    var form = button.up("form").getForm();
    var record = form.getRecord();
    var view = button.up("eventformview");
    // me asguro qeu se revise la fecha
    var desde = form.findField("StartDate");

    var eventview = button.up("eventview");
    var parentScheduleView = eventview ? eventview : button.up("eventformview");

    //  desde.fireEvent('blur',desde);

    var startDateValue = view.down("#startdate").getValue();
    var startTimeValue = view.down("#starttime").getValue();
    var endDateValue = view.down("#enddate").getValue();
    var endTimeValue = view.down("#endtime").getValue();

    var startDateObj = Ext.isDate(startDateValue) ? startDateValue : Ext.Date.parse(startDateValue, 'd/m/Y');
    var startTimeObj = Ext.isDate(startTimeValue) ? startTimeValue : new Date(startTimeValue);
    var fechahoradesde = new Date(
      startDateObj.getFullYear(),
      startDateObj.getMonth(),
      startDateObj.getDate(),
      startTimeObj.getHours(),
      startTimeObj.getMinutes(),
      startTimeObj.getSeconds()
    );

    var endDateObj = Ext.isDate(endDateValue) ? endDateValue : Ext.Date.parse(endDateValue, 'd/m/Y');
    var endTimeObj = Ext.isDate(endTimeValue) ? endTimeValue : new Date(endTimeValue);
    var fechahorahasta = new Date(
      endDateObj.getFullYear(),
      endDateObj.getMonth(),
      endDateObj.getDate(),
      endTimeObj.getHours(),
      endTimeObj.getMinutes(),
      endTimeObj.getSeconds()
    );

    if (form.isValid()) {
      form.updateRecord(record);

      if (fechahoradesde < fechahorahasta) {
        record.set("StartDate", fechahoradesde);
        record.set("EndDate", fechahorahasta);
      } else {
        notify("El fin desde ser posterior a la comienzo.");
        return false;
      }

      record.save({
        callback: function (savedRecord, operation) {
          notify("Los datos se guardaron correctamente");
          if (view.parentGrid) {
            view.parentGrid.getStore().load();
          }

          if (eventview && eventview.eventCalendar) {
            try {
              var btnTodos = Array.prototype.slice.call(document.querySelectorAll('.x-btn-inner')).find(function (el) {
                return el && el.textContent && el.textContent.trim() === 'Todos';
              });
              if (btnTodos) {
                var btnEl = btnTodos.closest('[id$="-btnEl"]');
                if (btnEl) {
                  setTimeout(function() { btnEl.click(); }, 100);
                }
              }
            } catch (e) {
              console.warn("Error al refrescar calendario:", e);
            }
          }

          // Simplified window closing - fix for DK-1240 blank window bug
          var winToClose = eventview ? eventview.up('window') : parentScheduleView.up('window');
          if (winToClose && winToClose.close) {
            winToClose.close();
          } else if (parentScheduleView && parentScheduleView.close) {
            parentScheduleView.close();
          }
        },
      });
    } else {
      notifyError("Por favor corrija los datos antes de guardar.");
    }
  },

  onDeleteClick: function (button, event, options) {
    var eventview = button.up("eventview");
    var view = eventview ? eventview : button.up("eventformview");
    var record = view.record;
    var eventCalendar = view.eventCalendar || (eventview && eventview.eventCalendar);
    var parentGrid = view.parentGrid;


    Ext.MessageBox.confirm(
      getLocale("Eliminar"),
      getLocale("Está seguro que desea eliminar la cita?"),
      function (btn) {
        if (btn === "yes") {
          record.erase({
            params: { force: true },
            callback: function () {
              notify("La cita se elimino correctamente");

              // Refrescar el calendario si está disponible
              if (eventCalendar) {
                try {
                  // Remover el evento del calendario
                  eventCalendar.removeEventById(record.get('Id'));

                  // Forzar recarga de eventos clickeando en "Todos"
                  var btnTodos = Array.prototype.slice.call(document.querySelectorAll('.x-btn-inner')).find(function (el) {
                    return el && el.textContent && el.textContent.trim() === 'Todos';
                  });
                  if (btnTodos) {
                    var btnEl = btnTodos.closest('[id$="-btnEl"]');
                    if (btnEl) { btnEl.click(); }
                  }
                } catch (e) {
                  console.warn("Error al actualizar calendario:", e);
                }
              }

              // Refrescar el grid padre si existe
              if (parentGrid) {
                try {
                  parentGrid.getStore().load();
                } catch (e) { }
              }

              // Cerrar la ventana del evento
              try {
                var win = eventview || view.up('window');
                if (win && win.close) {
                  win.close();
                }
              } catch (e) {
                console.warn("Error al cerrar ventana:", e);
              }
            }
          });
        }
      }
    );
  },

  onMapClick: function (button, event, options) {
    var view = button.up("eventformview");
    var myForm = view.getForm();
    var myrecord = myForm.getRecord();
    myForm.updateRecord(myrecord);
    var mylat = myrecord.get("PlaceLat"),
      myLong = myrecord.get("PlaceLong"),
      myAddr = myrecord.get("PlaceAddress");

    if (!mylat && !myLong && !myAddr) {
      notifyError(
        "Debe completar una dirección, o los valores Latitud y Longitud"
      );
      return false;
    }

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
              //win.down('form').getForm().findField('direccion').setValue(address[1].long_name+' '+address[0].long_name+', '+address[3].long_name+', '+address[5].long_name);
              win.responses = responses;
              win.down("#save").setDisabled(false);
              return responses;
            } else {
              var msg = "No se encontró una dirección válida.";
            }
          }
        );
      },
    });
    if (mylat && myLong) {
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
              //var field = myForm.findField('cue_cLatLng'),
              var lat = latlng.lat();
              var long = latlng.lng();
              //field.setValue(lat + ',' + long);
              mappanel.getMap().setCenter(latlng, mappanel.zoomLevel);
              mappanel.geocodePosition(latlng);
            },
          },
        },
      });
    } else {
      Ext.apply(mappanel, {
        zoomLevel: 14,
        fullAdress: myAddr,
        setCenter: {
          geoCodeAddr: myAddr,
          marker: {
            title: myrecord.get("Name"),
            draggable: true,
          },
          listeners: {
            dragend: function (e) {
              var latlng = e.latLng;
              //var field = myForm.findField('cue_cLatLng'),
              var lat = latlng.lat();
              var long = latlng.lng();
              //field.setValue(lat + ',' + long);
              mappanel.getMap().setCenter(latlng, mappanel.zoomLevel);
              mappanel.geocodePosition(latlng);
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
      title: "Mapa",
      closeAction: "hide",
      itemId: "eventMapWindow",
      width: 550,
      height: 550,
      border: true,
      modal: true,
      view: view,
      tbar: [
        { text: "Posicionar", action: "posicionar" },
        { text: "Guardar", action: "save", disabled: true, itemId: "save" },
      ],
      items: [
        {
          xtype: "form",
          itemId: "mapAddress",
          width: "100%",

          items: [
            {
              xtype: "textareafield",
              fieldLabel: "Dirección",
              labelWidth: 60,
              name: "direccion",
              value: myAddr,
            },
          ],
        },
        mappanel,
      ],
    });
    win.show();
  },

  onPosicionarClick: function (button, event, options) {
    var win = button.up("#eventMapWindow");
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
    var win = button.up("#eventMapWindow");
    var view = win.view;
    var form = win.down("form").getForm();
    var map = win.down("gmappanel6");
    var parentForm = view.getForm();

    var latlng = map.getCenterLatLng();
    var latfield = parentForm.findField("PlaceLat");
    var longfield = parentForm.findField("PlaceLong");

    if (win.responses) {
      latfield.setValue(latlng.lat);
      longfield.setValue(latlng.lng);
      var addr = win.responses[0].address_components;
      parentForm.findField("Country").setValue(addr[5].long_name);
      parentForm.findField("State").setValue(addr[3].long_name);
      parentForm.findField("City").setValue(addr[4].long_name);
      parentForm
        .findField("PlaceAddress")
        .setValue(
          addr[1].long_name +
          " " +
          addr[0].long_name +
          ", " +
          addr[3].long_name +
          ", " +
          addr[5].long_name
        );
      /* view.record.set('Country',addr[5].long_name)
            view.record.set('State',addr[3].long_name)
            view.record.set('City',addr[4].long_name)
            view.record.set('PlaceAddress',addr[1].long_name+' '+addr[0].long_name+', '+addr[3].long_name+', '+addr[5].long_name)
     */
      win.close();
    } else {
      notifyError("No se pudo geocodificar la dirección");
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
