//MIGRADO2024
Ext.define("Common.controller.SmartpanicsCrmGridController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.SmartpanicsCrmSoundsStore"],
  models: [
    "p_encuestasSearchModel",
    "VehicleSearchModel",
    "SmartPanicSearchModel",
    "MailTablasPlantillasSearchModel",
  ],
  views: ["SmartpanicsCrmGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smartpaniccrmgridview: {
        afterrender: this.initView,
      },
      "smartpaniccrmgridview button[action=add]": {
        click: this.onAddClick,
      },
      "smartpaniccrmgridview #btnBuscar": {
        click: this.onSearchClick,
      },
      "smartpaniccrmgridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "smartpaniccrmgridview button[action=sendmail]": {
        click: this.onSendEmailClick,
      },
      "smartpaniccrmgridview button[action=sendmailall]": {
        click: this.onSendEmailClick,
      },
      "smartpaniccrmgridview button[action=sendsurvey]": {
        click: this.onSendEmailClick,
      },
      "smartpaniccrmgridview button[action=sendsurveyall]": {
        click: this.onSendEmailClick,
      },
    });
  },
  setPushSendLoading: function (win, button, loading) {
    if (!win || win.destroyed || !button || button.destroyed) {
      return;
    }

    if (loading) {
      if (!button.originalText) {
        button.originalText = button.getText();
      }
      win.sendingPushMessages = true;
      button.setDisabled(true);
      button.setText("Enviando mensajes...");
      win.setLoading("Enviando mensajes...");
    } else {
      win.sendingPushMessages = false;
      button.setDisabled(false);
      button.setText(button.originalText || "Enviar");
      win.setLoading(false);
    }
  },
  onSendEmailAllClick: function (btn) {
    var view = btn.up("smartpaniccrmgridview");
    var controller = this;

    /**
     * Reutilización de función para envio de encuesta / mensaje
     * Las diferencias son los items en la View y la URL del Request
     */

    if (btn.itemId == "sendsurveyall") {
      console.log("Enviar encuesta");
      var title = "Enviar encuesta a todos";
      var url = "/rest/search/EncuestaEnvioPush";

      /**
       * Cargo el combo con el Store de encuestas disponibles.
       */
      var storeSurvey = Ext.create("Ext.data.Store", {
        model: this.getP_encuestasSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
      }).load();

      var items = [
        {
          xtype: "panel",
          bodyPadding: 10,
          bodyStyle: "background:#e0e0e0",
          border: false,
          items: [
            {
              xtype: "combo",
              queryMode: "local",
              store: storeSurvey,
              fieldLabel: "Asunto",
              itemId: "asunto",
              anchor: "100%",
              labelWidth: 100,
              width: 360,
              displayField: "enc_name",
              valueField: "enc_idkey",
              plugins: ["clearbutton"],
            },
          ],
        },
        {
          xtype: "displayfield",
          fieldLabel: "Mensaje",
          padding: "10 0 0 10",
        },
        {
          xtype: "htmleditor",
          fieldLabel: "",
          itemId: "mensaje",
          width: "100%",
          height: 250,
        },
      ];
    } else {
      console.log("Enviar mail");
      var title = "Enviar mensaje a todos";
      var url = "/rest/search/SmartpanicSendMessage";
      var items = [
        {
          xtype: "panel",
          bodyPadding: 10,
          bodyStyle: "background:#e0e0e0",
          border: false,
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Asunto",
              itemId: "asunto",
              width: "100%",
              labelWidth: 50,
            },
          ],
        },
        {
          xtype: "displayfield",
          fieldLabel: "Mensaje",
          padding: "10 0 0 10",
        },
        {
          xtype: "htmleditor",
          fieldLabel: "",
          itemId: "mensaje",
          width: "100%",
          height: 250,
        },
      ];
    }
    var myWindow = Ext.widget("window", {
      title: title,
      height: 400,
      width: 400,
      modal: true,
      items: items,
      tbar: [
        {
          text: "Enviar",
          iconCls: "icon-email-go",
          itemId: "sendPush",
          listeners: {
            click: function (button) {
              if (myWindow.sendingPushMessages) {
                return;
              }

              controller.setPushSendLoading(myWindow, button, true);

              try {
                Ext.Ajax.request({
                  url: url,
                  method: "GET",
                  params: {
                    filter: Ext.encode(view.store.filters.items),
                    subject: myWindow.down("#asunto").getValue(),
                    body: myWindow.down("#mensaje").getValue(),
                    fromId: _UserData.udw_idKey,
                  },
                  success: function (resp, operation) {
                    notify("El mensaje fue enviado");
                    myWindow.close();
                  },
                  failure: function () {
                    notify("No se pudo enviar el mensaje");
                    controller.setPushSendLoading(myWindow, button, false);
                  },
                });
              } catch (e) {
                controller.setPushSendLoading(myWindow, button, false);
                throw e;
              }
            },
          },
        },
      ],
    }).show();
  },
  onSendEmailClick: function (btn) {
    console.log("ENTRO");
    var view = btn.up("smartpaniccrmgridview");
    var controller = this;
    var method = "GET";
    var headers = { "Content-Type": "application/json" };

    /**
     * Reutilización de función para envio de encuesta / mensaje
     * Las diferencias son los items en la View y la URL del Request
     */

    if (btn.itemId == "sendsurvey" || btn.itemId == "sendsurveyall") {
      //console.log('Enviar encuesta');
      var title = "Enviar encuesta";
      var url = "/rest/search/EncuestaEnvioPush";

      /**
       * Cargo el combo con el Store de encuestas disponibles.
       */
      var storeSurvey = Ext.create("Ext.data.Store", {
        model: this.getP_encuestasSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
      }).load();

      var items = [
        {
          xtype: "panel",
          bodyPadding: 10,
          bodyStyle: "background:#e0e0e0",
          border: false,
          items: [
            {
              xtype: "combo",
              queryMode: "local",
              store: storeSurvey,
              fieldLabel: "Asunto",
              itemId: "asunto",
              anchor: "100%",
              labelWidth: 100,
              width: 360,
              displayField: "enc_name",
              valueField: "enc_idkey",
              plugins: ["clearbutton"],
            },
          ],
        },
        {
          xtype: "displayfield",
          fieldLabel: "Mensaje",
          padding: "10 0 0 10",
        },
        {
          xtype: "htmleditor",
          fieldLabel: "",
          itemId: "mensaje",
          width: "100%",
          height: 250,
          onFocus: Ext.form.Field.prototype.onFocus,
          listeners: {
            afterrender: function (ed) {
              //attach focus/blur events on the IFRAME
              Ext.EventManager.on(ed.getWin(), "focus", ed.onFocus, ed);
              Ext.EventManager.on(ed.getWin(), "blur", ed.onBlur, ed);
              ed.onFirstFocus();
            },
          },
        },
      ];
    } else if (btn.itemId == "sendmail" || btn.itemId == "sendmailall") {
      console.log("Selecciona Enviar mail");
      var storeSonido = this.getSmartpanicsCrmSoundsStoreStore();
      var title = "Enviar mensaje";
      var url = "/handler/SearchPost?search=SmartpanicSendMessage";
      var comboBoxSonido = Ext.create("Ext.form.ComboBox", {
        fieldLabel: "Sonido",
        itemId: "comboSonido",

        valueField: "codigo",
        displayField: "nombre",
        padding: "10 10 0 10",
        store: storeSonido,
      });
      comboBoxSonido.select(comboBoxSonido.getStore().getAt(0));
      method = "POST";
      headers = null;
      var storePlantillas = Ext.create("Ext.data.Store", {
        model: "Common.model.MailTablasPlantillasSearchModel",
        remoteFilter: true,
        autoload: false,
        remoteSort: true,
        sorters: [
          {
            property: "pls_cdescripcion",
            direction: "ASC",
          },
        ],
        filters: [
          {
            property: "pls_iTipo:ININT",
            value: "1",
          },
        ],
      });
      var items = [
        {
          xtype: "textfield",
          fieldLabel: "Asunto",
          itemId: "asunto",
          padding: "10 10 0 10",
        },
        {
          xtype: "container",
          layout: {
            type: "column",
            align: "center", // or 'right'
            pack: "center", // controls vertical align
            defaultMargins: 5,
          },
          items: [
            comboBoxSonido,
            {
              xtype: "container",
              padding: "10 10 0 10",
              items: [
                {
                  xtype: "button",
                  iconCls: "icon-control-play",
                  maxHeight: 20,
                  maxWidth: 20,
                  listeners: {
                    click: function (button, event, options) {
                      if (comboBoxSonido.getValue() > 0) {
                        var store = comboBoxSonido.getStore();
                        var index = store.find(
                          "codigo",
                          comboBoxSonido.getValue()
                        );
                        var record = store.getAt(index);
                        var audio = new Audio(record.data.soundpath);
                        audio.play();
                      }
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          xtype: "combo",
          fieldLabel: "Aplicar plantilla",
          itemId: "plantillaNotificaciones",
          emptyText: getLocale("Seleccione"),
          labelWidth: 100,
          displayField: "pls_cdescripcion",
          valueField: "Id",
          anchor: "100%",
          queryMode: "local",
          store: storePlantillas,
          padding: "10 10 10 10",
          listeners: {
            select: function (combo, record) {
              try {
                var editor = myWindow.down("#mensaje");
                var selectedRecord = Ext.isArray(record) ? record[0] : record;
                var gridRecord = view.getSelectionModel().getSelection()[0];

                if (
                  !editor ||
                  !selectedRecord ||
                  !selectedRecord.data ||
                  !selectedRecord.data.pls_mplantilla
                ) {
                  console.error("Faltan componentes necesarios");
                  return;
                }

                var contenido = selectedRecord.data.pls_mplantilla;

                // Función auxiliar para reemplazar de forma segura
                var replaceIfExists = function (template, key, value) {
                  return template.replace(
                    key,
                    value !== undefined && value !== null ? value : ""
                  );
                };

                // Reemplazamos las variables solo si tenemos el registro de la grid
                if (gridRecord && gridRecord.data) {
                  var data = gridRecord.data;

                  try {
                    // Reemplazos básicos
                    contenido = replaceIfExists(
                      contenido,
                      "<<CTADEALER>>",
                      data.cue_clinea
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<CTACODIGO>>",
                      data.cue_ncuenta
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<CTANOMBRE>>",
                      data.cue_cnombre
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<CTADIR>>",
                      data.cue_ccalle
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<EVENTODESC>>",
                      data._eventDescripcion
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<EVENTOCODZONA>>",
                      data.zon_ccodigo
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<EVENTODESZONA>>",
                      data._zon_cdescripcion
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<EVENTOCODUSUARIO>>",
                      data.rec_iusuario
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<EVENTONOMUSUARIO>>",
                      data._usu_cnombre
                    );
                    contenido = replaceIfExists(
                      contenido,
                      "<<DEALERNOMBRE>>",
                      data.lin_crazonsocial
                    );

                    // Manejo especial para fecha y hora
                    if (data.rec_tfechahora) {
                      try {
                        var date = new Date(Date.parse(data.rec_tfechahora));
                        var dateStr = Ext.Date.format(date, "d/m/Y");
                        var horaStr = Ext.Date.format(date, "H:i:s");

                        contenido = replaceIfExists(
                          contenido,
                          "<<EVENTOFECHA>>",
                          dateStr
                        );
                        contenido = replaceIfExists(
                          contenido,
                          "<<EVENTOHORA>>",
                          horaStr
                        );
                      } catch (dateError) {
                        console.error("Error al procesar la fecha:", dateError);
                      }
                    }
                  } catch (replaceError) {
                    console.error(
                      "Error al reemplazar variables:",
                      replaceError
                    );
                  }
                }

                // Intentamos establecer el contenido en el editor
                try {
                  if (editor.initialized && editor.getDoc()) {
                    editor.getDoc().body.innerHTML = contenido;
                  } else {
                    editor.on(
                      "initialize",
                      function () {
                        if (editor.getDoc()) {
                          editor.getDoc().body.innerHTML = contenido;
                        }
                      },
                      this,
                      { single: true }
                    );
                  }
                } catch (editorError) {
                  console.error(
                    "Error al establecer contenido en el editor:",
                    editorError
                  );
                }
              } catch (e) {
                console.error("Error general al cargar la plantilla:", e);
                console.log("Editor:", editor);
                console.log("Record:", selectedRecord);
                console.log("GridRecord:", gridRecord);
              }
            },
          },
        },
        {
          xtype: "displayfield",
          fieldLabel: "Mensaje",
          padding: "0 0 0 10",
        },
        {
          xtype: "htmleditor",
          fieldLabel: "",
          itemId: "mensaje",
          flex: 1,
          onFocus: Ext.form.Field.prototype.onFocus,
          listeners: {
            afterrender: function (ed) {
              //attach focus/blur events on the IFRAME
              Ext.EventManager.on(ed.getWin(), "focus", ed.onFocus, ed);
              Ext.EventManager.on(ed.getWin(), "blur", ed.onBlur, ed);
              ed.onFirstFocus();
            },
          },
        },
      ];
      storePlantillas.load();
    }
    var myWindow = Ext.widget("window", {
      title: title,
      height: 400,
      width: 400,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      modal: true,
      items: items,
      tbar: [
        {
          text: "Enviar",
          iconCls: "icon-email-go",
          itemId: "sendPush",
          listeners: {
            click: function (button) {
              if (myWindow.sendingPushMessages) {
                return;
              }

              var Ids = [];
              var selection = view.getSelectionModel().getSelection();
              //--------------------------------------------------------
              if (comboBoxSonido) {
                var store = comboBoxSonido.getStore();
                var index = store.find("codigo", comboBoxSonido.getValue());
                var record = store.getAt(index);
                var soundpath = record.data.soundpath;
              } else {
                var soundpath = "";
              }

              //---------------------------------------------------------
              var params = {
                subject: myWindow.down("#asunto").getValue(),
                body: myWindow.down("#mensaje").getValue(),
                fromId: _UserData.udw_idKey,
              };
              if (soundpath && soundpath != "") {
                params.soundpath = soundpath.replace("/sounds/", "");
              }
              if (btn.itemId.includes("all")) {
                params.filter = Ext.encode(view.store.filters.items);
              } else if (selection) {
                Ext.Array.each(selection, function (rec) {
                  Ids.push(rec.get("Id"));
                });
                params.ids = Ids.join(",");
              }
              controller.setPushSendLoading(myWindow, button, true);

              try {
                Ext.Ajax.request({
                  url: url,
                  method: method,
                  headers: headers,
                  params: params,
                  success: function (resp, operation) {
                    notify("El mensaje fue enviado");
                    myWindow.close();
                  },
                  failure: function () {
                    notify("No se pudo enviar el mensaje");
                    controller.setPushSendLoading(myWindow, button, false);
                  },
                });
              } catch (e) {
                controller.setPushSendLoading(myWindow, button, false);
                throw e;
              }
            },
          },
        },
        // {
        //   xtype: "filefield",
        //   buttonOnly: true,
        //   buttonConfig: {
        //     text: "Agregar imagen",
        //     textAlign: "left",
        //     baseCls: "x-btn",
        //     iconCls: "icon-photo-add",
        //     ui: "default-toolbar",
        //   },
        //   listeners: {
        //     change: function (field, filename) {
        //       var selectedfile = event.target.files;
        //       if (selectedfile.length > 0) {
        //         var imageFile = selectedfile[0];
        //         var fileReader = new FileReader();
        //         fileReader.onload = function (fileLoadedEvent) {
        //           var img = new Image();
        //           img.onload = function () {
        //             var canvas = document.createElement("canvas");
        //             var ctx = canvas.getContext("2d");
        //             canvas.width = 310;
        //             canvas.height = canvas.width * (img.height / img.width);
        //             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        //             // SEND THIS DATA TO WHEREVER YOU NEED IT
        //             var data = canvas.toDataURL("image/png");
        //             // inserto la imagen en el editor
        //             var editor = myWindow.down("#mensaje");
        //             editor.insertAtCursor('<img src="' + data + '">');
        //           };
        //           var srcData = fileLoadedEvent.target.result;
        //           img.src = srcData;
        //         };
        //         fileReader.readAsDataURL(imageFile);
        //       }
        //     },
        //   },
        // },
      ],
    }).show();
  },
  initView: function (view) {
    view.filters = [{ property: "cue_ncuenta:NOT", value: "" }];
    view.store = Ext.create("Ext.data.Store", {
      model: this.getSmartPanicSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: view.filters,
    });
    view.bindStore(view.store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(view.store);

    view.store.load();

    /**
     * BC 385211321 : Se bloquea o visualiza el boton de enviar encuesta en base al permiso de la configuracion Global de SmartPanics
     */
    var _ObjectId = 30;
    var _ObjectTypeName = "UiApplication";
    var _restPath =
      myQueryString.restPath != undefined ? myQueryString.restPath : "Rest";
    var url =
      "/" + _restPath + "/" + _ObjectTypeName + "/" + _ObjectId + "/Metadata";
    var btnEncuesta = view.down("#enviarencuesta");

    Ext.Ajax.request({
      url: url,
      scope: this,
      success: function (resp, operation) {
        view.metadataGlobal = Ext.decode(resp.responseText);
        view.metadataGlobal.Config = Ext.decode(view.metadataGlobal.Config);
        if (view.metadataGlobal.Config.btnEncuesta > 0) {
          btnEncuesta.enable();
        } else {
          btnEncuesta.disable(true);
        }
      },
    });
  },
  onSearchClick: function (button, event) {
    var view = button.up("smartpaniccrmgridview");
    var store = view.getStore();
    var queryType = view.down("#queryType").getValue();
    var query = view.down("#query").getValue();
    var filters = Ext.clone(view.filters);
    if (queryType == "imei")
      filters.push({
        property: "Imei:LIKE",
        value: query,
        id: "search",
      });

    if (queryType == "telefono")
      filters.push({
        property: "Telefono:LIKE",
        value: query,
        id: "search",
      });

    if (queryType == "nombre")
      filters.push({
        property: "cue_cnombre:LIKE",
        value: query,
        id: "search",
      });

    if (queryType == "usuario")
      filters.push({
        property: "Nombre:LIKE",
        value: query,
        id: "search",
      });

    if (queryType == "cuenta")
      filters = [
        {
          property: "cue_ncuenta:LIKE",
          value: query,
          id: "search",
        },
      ];

    if (queryType == "dealer")
      filters = [
        {
          property: "cue_clinea:LIKE",
          value: query,
          id: "search",
        },
      ];

    store.clearFilter(true);
    if (filters.length > 0) {
      store.filter(filters);
    }
  },

  onAddClick: function (button, event, options) {
    var panel = button.up("tabpanel");
    var view = button.up("smartpaniccrmgridview");
    var model = this.getProductModelModel();
    var proxy = model.getProxy();
    var store = view.getStore();

    var me = this;

    var record = Ext.create(model, {
      Id: 0,
      Name: getLocale("Nuevo Producto"),
    });

    var win;

    // no lo agrego para que no aparezca vacio si abandona
    //store.add(newrecord);

    var form = Ext.widget("productformview", {
      iconCls: "icon-Product",
      record: record,
      targetTab: panel,
      header: false,
      caller: view,
      closable: false,
      listeners: {
        objectchanged: function () {
          view.down("pagingtoolbar").doRefresh();
          win.close();
        },
      },
    });

    win = Ext.widget("window", {
      width: 600,
      height: 500,
      layout: "fit",
      title: record.get("Name"),
      closable: true,
      items: form,
    }).show();
  },
  onGetAllClick: function (button, event, options) {
    var view = button.up("smartpaniccrmgridview");
    var store = view.getStore();
    store.clearFilter(true);
    store.filter(view.filters);
    view.down("#queryType").setValue("");
    view.down("#query").setValue("");
  },
});
