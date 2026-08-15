Ext.define("AccessControl.controller.AC_m_usuariosFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "p_controlAcceso_AutorizacionSearchModel",
    "p_controlAcceso_IOModel",
    "p_controlAcceso_AutorizacionModel",
    "AC_TecnicosModel",
  ],
  views: ["AC_m_usuariosFormView"],

  init: function (config) {
    this.control({
      ac_m_usuariosformview: {
        afterrender: this.initview,
        refresh: this.refresh,
        refreshlikeinit: this.refreshLikeInit,
      },
      'ac_m_usuariosformview button[action="save"]': {
        click: this.onSaveClick,
      },
      "ac_m_usuariosformview #generarIO": {
        click: this.onGenerarAutorizacionIOClick,
      },
      "ac_m_usuariosformview #nuevaautorizacion": {
        click: this.onNuevaAutorizacionClick,
      },
      "ac_m_usuariosformview #cambiodatosusuario": {
        click: this.onCambioDatosUsuarioClick,
      },
      "ac_m_usuariosformview #cambiodatosusuarioinfoinvitado": {
        click: this.onCambioDatosUsuarioClick,
      },
      'ac_m_usuariosformview button[action=btnprint]': {
        click: this.onBtnprintClick
      },
      "ac_m_usuariosformview #btnChangePhoto": {
        click: this.onChangePhotoClick
      }
    });
  },

  refreshLikeInit: function (view, rec) {
    this.initview(view);
  },

  refresh: function (view, rec) {
    view.loadRecord(rec);

    // 📸 Foto del invitado (persona) — solo actualiza #usu_cimagen
    if (rec.get("usu_cimagen")) {
      view.down("#usu_cimagen").setSrc(
        "/gallery/" + rec.get("usu_cimagen") + "?_dc=" + Math.floor(Math.random() * 1000 + 1)
      );
    }

    // 🚗 Foto del vehículo — solo actualiza #Photo desde meta.photo, sin fallback cruzado
    var metaStr  = rec.get("usu_cmetadata");
    var photoCmp = view.down("#Photo");
    var domainLbl = view.down("#domainLabel");

    if (metaStr) {
      try {
        var meta = Ext.decode(metaStr);

        if (meta.patente || meta.domain) {
          var domain = meta.patente ? meta.patente : meta.domain;
          if (domainLbl) {
            domainLbl.setValue(domain);
          }
        }

        // ✅ Solo usa meta.photo para el vehículo — NO hace fallback con usu_cimagen
        if (meta.photo) {
          photoCmp.setSrc(
            "/gallery/" + meta.photo + "?_dc=" + Math.floor(Math.random() * 1000 + 1)
          );
        }

      } catch (e) {
        console.log("Error al parsear usu_cmetadata en refresh", e);
      }
    }

    if (view.caller) {
      view.caller.fireEvent("refresh", view.caller, rec);
    }
  },

  onCambioDatosUsuarioClick: function (btn) {
    var view = btn.up("ac_m_usuariosformview");
    var title = getLocale("Editar") + ": " + view.record.get("usu_cnombre");
    var metadata;
    var uriphoto;

    if (view.record.get("usu_cmetadata")) {
      try {
        metadata = Ext.decode(view.record.get("usu_cmetadata"));
        uriphoto = "/gallery/" + metadata.photo + "?dc=" + new Date().getTime();
      } catch (e) {
        console.log("Error al parsear la metadata " + e);
        console.log(metadata);
      }
    }

    var usuarioModel = Ext.data.schema.Schema.instances.default.getEntity(
      "Cuenta.model.m_usuariosModel"
    );

    usuarioModel.load(view.record.get("Id"), {
      callback: function (record) {
        var viewWin = Ext.widget("m_usuariosformview", {
          caller: view,
          record: record,
          hideTipoUsuario: true,
          openFromAC: true,
        });
        viewWin.down("#Domain").setFieldLabel(getLocale("Matrícula"));

        var win = Ext.create("Ext.Window", {
          iconCls: "icon-table-add",
          layout: "fit",
          title: title,
          translate: false,
          width: 800,
          height: 600,
          border: false,
          modal: true,
          items: viewWin,
          closeAction: "destroy",
          listeners: {
            destroy: function () {
              if (uriphoto && uriphoto.indexOf("undefined") < 0) {
                view.down("#Photo").setSrc(uriphoto);
              }
            },
          },
        });
        win.show();
      },
    });
  },

  onNuevaAutorizacionClick: function (btn) {
    var view = btn.up("ac_m_usuariosformview");

    var myobject = this.getP_controlAcceso_AutorizacionModelModel().create({
      caa_idautorizado: view.record.get("usu_idKey"),
      caa_estado: 1,
    });
    myobject.setId(0);

    var viewWidget = Ext.widget("p_controlacceso_autorizacionformview", {
      caller: view,
      record: myobject,
    });

    var win = Ext.create("Ext.Window", {
      iconCls: "icon-table-add",
      layout: "fit",
      title: "Nueva autorizacion",
      width: 450,
      height: 450,
      border: false,
      items: viewWidget,
    });
    win.show();
  },

  onGenerarAutorizacionIOClick: function (btn) {
    var view = btn.up("ac_m_usuariosformview");

    var myobject = this.getP_controlAcceso_IOModelModel().create({
      cac_fecha: new Date(),
      cac_idautorizado: view.record.get("usu_idKey"),
      cac_autorizatipo: 3,
      cac_autorizaid: view.autorizacionRecord.get("Id"),
      cac_tipoacceso: view.record.get("cac_tipoacceso") == 1 ? 0 : 1,
    });
    myobject.setId(0);

    view.record.set("cac_tipoacceso", myobject.get("cac_tipoacceso"));

    var viewWidget = Ext.widget("p_controlacceso_ioformview", {
      caller: view.down("p_controlacceso_ioview"),
      record: myobject,
      hideAutorizadoTipo: true,
    });

    var win = Ext.create("Ext.Window", {
      iconCls: "icon-table-add",
      layout: "fit",
      title: "Generar autorizacion",
      width: 450,
      height: 450,
      border: false,
      items: viewWidget,
    });
    win.show();
  },

  onBtnprintClick: function (button) {
    var view = button.up('ac_m_usuariosformview');
    var panelDom = view.getEl().dom;

    var iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    var doc = iframe.contentWindow.document;

    doc.open();
    doc.write(`
        <html>
        <head>
            <title>Imprimir ficha</title>
            <style>
                body { margin: 0; font-family: Arial, sans-serif; }
                button, .x-btn, .x-toolbar, .x-tab-bar { display: none !important; }
                fieldset, .x-panel, .x-container {
                    border: none !important;
                    box-shadow: none !important;
                    background: transparent !important;
                }
                img {
                    display: block;
                    margin: 0 auto 10px auto;
                    max-width: 250px;
                    height: auto;
                    border-radius: 6px;
                }
            </style>
        </head>
        <body>${panelDom.outerHTML}</body>
        </html>
    `);
    doc.close();

    iframe.onload = function () {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(function () {
        document.body.removeChild(iframe);
      }, 800);
    };
  },

  initview: function (view) {
    view.loadRecord(view.record);
    var viewGridIO = view.down("p_controlacceso_ioview");
    viewGridIO.recordPersona = view.record;

    // 📸 Foto del invitado (persona) — solo #usu_cimagen
    if (view.record.get("usu_cimagen")) {
      view.down("#usu_cimagen").setSrc("/gallery/" + view.record.get("usu_cimagen"));
    }

    // 🚗 Foto del vehículo — solo desde meta.photo, sin fallback cruzado con usu_cimagen
    var metaStr = view.record.get("usu_cmetadata");
    if (metaStr) {
      try {
        var usu_cmetadata = JSON.parse(metaStr);
        var domainLabel = view.down("#domainLabel");

        if (usu_cmetadata.patente || usu_cmetadata.domain) {
          var domain = usu_cmetadata.patente ? usu_cmetadata.patente : usu_cmetadata.domain;
          domainLabel.setValue(domain);
        }

        // ✅ Solo usa meta.photo para el vehículo — NO hace fallback con usu_cimagen
        if (usu_cmetadata.photo) {
          view.down("#Photo").setSrc("/gallery/" + usu_cmetadata.photo);
        }

      } catch (e) {
        console.log("Error al parsear usu_cmetadata", e);
      }
    }
    // ✅ El else externo ya NO toca #Photo — queda el SVG placeholder del auto

    // Busco autorización activa
    view.store = Ext.create("Ext.data.Store", {
      model: this.getP_controlAcceso_AutorizacionSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        { property: "[caa_horadesde]:LTESTRING",   value: Ext.Date.format(new Date(), "H:i") },
        { property: "[caa_horahasta]:GTESTRING",   value: Ext.Date.format(new Date(), "H:i") },
        { property: "[caa_fechadesde]:LTEDATESTRING", value: Ext.Date.format(new Date(), "Y-m-d") },
        { property: "[caa_fechahasta]:GTEDATESTRING", value: Ext.Date.format(new Date(), "Y-m-d") },
        { property: "caa_diasemana",               value: Ext.Date.format(new Date(), "N") },
        { property: "caa_idautorizado",            value: view.record.get("usu_idKey") },
      ],
    });

    view.store.load({
      callback: function (records) {
        if (records.length > 0) {
          view.autorizacionRecord = records[0];
        }
      },
    });

    if (view.filterFromSearchContainer) {
      var tabPanel = view.down("#tabpanelUserInvitationEditor");
      tabPanel.setActiveTab(0);
    }

    view.down("#autorizacionesTab").usu_idKey = view.record.get("usu_idKey");
    this.showInfoAutomovil(view);
  },

  onSaveClick: function (button, event, options) {
    var myform = button.up("form").getForm();
    var view   = button.up("ac_m_usuariosformview");
    var record = myform.getRecord();

    myform.updateRecord(record);

    if (myform.isValid()) {
      record.save({
        scope: this,
        view: view,
        callback: function (record, operation) {
          if (operation.success) {
            var win = view.up("window");
            notify("Los datos se guardaron correctamente");
            view.caller.fireEvent("objectchanged", view.caller, record);
            win.close();
          } else {
            notifyError("Hubo un error al guardar los datos");
          }
        },
        button: button,
      });
    }
  },

  // ─────────────────────────────────────────────────────────────────
  // Botón "Cambiar foto" → foto de la PERSONA (pestaña invitado)
  // Llama a reloadUserRecordAndRefresh con photoType = 'person'
  // ─────────────────────────────────────────────────────────────────
  onChangePhotoClick: function (btn) {
    var me   = this;
    var view = btn.up("ac_m_usuariosformview");

    var win = Ext.widget("window", {
      title: "Foto",
      height: 260,
      width: 380,
      closeAction: "destroy",
      border: false,
      layout: "fit",
      modal: true,
      items: [
        {
          xtype: "form",
          padding: "10 10 10",
          bodyPadding: 10,
          url: "/rest/upload/new?search=softguardMiscFile",
          items: [
            {
              xtype: "filefield",
              name: "file",
              buttonOnly: true,
              width: "100%",
              buttonConfig: {
                text: "Subir imagen",
                width: "100%",
              },
              listeners: {
                change: function (filefield) {
                  var form = filefield.up("form").getForm();
                  if (!form.isValid()) { return; }

                  form.submit({
                    waitMsg: "Subiendo imagen...",
                    success: function (form, action) {
                      console.log("Upload success action:", action);
                      var raw  = action.response && action.response.responseText;
                      var data = raw ? Ext.decode(raw) : action.result;
                      var fileName = null;

                      if (Ext.isArray(data) && data.length > 0) {
                        fileName = data[0].text || data[0].name || null;
                      } else if (data && Ext.isArray(data.files) && data.files.length > 0) {
                        fileName = data.files[0].text || data.files[0].name || null;
                      }

                      if (!fileName) {
                        notifyError("No se pudo obtener el nombre del archivo subido.");
                        return;
                      }

                      var uploadPath = me.UPLOAD_PATH || "";
                      var fullName   = uploadPath ? (uploadPath + "/" + fileName) : fileName;

                      // ✅ photoType = 'person' → solo actualiza usu_cimagen
                      me.reloadUserRecordAndRefresh(view, fullName, 'person');
                      notify("La imagen se subió correctamente.");
                      win.close();
                    },
                    failure: function (form, action) {
                      console.log("Error en upload:", action);

                      if (action.response && action.response.status === 200) {
                        try {
                          var raw  = action.response.responseText;
                          var data = Ext.decode(raw);
                          var fileName = null;

                          if (Ext.isArray(data) && data.length > 0) {
                            fileName = data[0].text || data[0].name || null;
                          } else if (data && Ext.isArray(data.files) && data.files.length > 0) {
                            fileName = data.files[0].text || data.files[0].name || null;
                          }

                          if (!fileName) {
                            notifyError("No se pudo obtener el nombre del archivo subido.");
                            return;
                          }

                          var uploadPath = me.UPLOAD_PATH || "";
                          var fullName   = uploadPath ? (uploadPath + "/" + fileName) : fileName;

                          // ✅ photoType = 'person' → solo actualiza usu_cimagen
                          me.reloadUserRecordAndRefresh(view, fullName, 'person');
                          notify("La imagen se subió correctamente.");
                          win.close();
                        } catch (e) {
                          console.error("Error parseando respuesta de upload:", e);
                          notifyError("Error al procesar la respuesta del servidor.");
                        }
                        return;
                      }

                      notifyError("Error al subir la imagen.");
                    }
                  });
                }
              }
            },
            {
              xtype: "button",
              text: "Tomar una imagen desde la cámara",
              width: "100%",
              margin: "15 0 0 0",
              handler: function () {
                win.close();
                // La cámara desde este botón también es para la persona
                me.openCameraWindow(view, 'person');
              }
            }
          ]
        }
      ]
    });

    win.show();
  },

  // ─────────────────────────────────────────────────────────────────
  // Cámara del VEHÍCULO (pestaña vehículo)
  // Llama a reloadUserRecordAndRefresh con photoType = 'vehicle'
  // ─────────────────────────────────────────────────────────────────
  openCameraWindow: function (view, photoType) {
    var me = this;

    // photoType por defecto es 'vehicle' para mantener compatibilidad
    // con el botón de la pestaña vehículo del m_usuariosFormView
    photoType = photoType || 'vehicle';

    // Obtener la matrícula / dominio
    var domain = '';
    var domainField = view.down('#Domain');

    if (domainField) {
      domain = domainField.getValue();
    } else {
      var metaStr = view.record && view.record.get('usu_cmetadata');
      if (metaStr) {
        try {
          var meta = Ext.decode(metaStr);
          domain = meta.patente || meta.domain || '';
        } catch (e) {
          domain = '';
        }
      }
    }

    if (!domain && photoType === 'vehicle') {
      notify("El campo Matrícula / Patente no debe estar en blanco.");
      return;
    }

    var localMediaStream = null;

    var cameraWin = Ext.widget('window', {
      title: 'Foto: ' + (domain || 'Invitado'),
      height: 400,
      width: 800,
      closeAction: 'destroy',
      border: false,
      layout: 'hbox',
      modal: true,
      listeners: {
        afterrender: function () {
          navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

          var video   = document.getElementById('acVideo');
          var canvas  = document.getElementById('acCanvas');

          if (!navigator.getUserMedia) {
            notifyError("La cámara no es soportada por este navegador.");
            return;
          }

          navigator.getUserMedia(
            { video: true },
            function (stream) {
              localMediaStream = stream;
              if (video.mozSrcObject !== undefined) {
                video.mozSrcObject = stream;
              } else {
                video.srcObject = stream;
              }
            },
            function (err) {
              console.log("The following error occured: " + err);
              notifyError("No se pudo acceder a la cámara.");
            }
          );
        },
        close: function () {
          if (localMediaStream && localMediaStream.getTracks) {
            Ext.Array.forEach(localMediaStream.getTracks(), function (t) { t.stop(); });
          }
          localMediaStream = null;
        }
      },
      items: [
        {
          width: 400,
          title: "Preview",
          height: 400,
          html: '<video id="acVideo" width="400" height="320" autoplay ' +
                'style="background-color:#000; ' +
                '-webkit-mask-image: radial-gradient(circle at 50% 60%, black 50%, rgba(0,0,0,0.6) 50%); ' +
                'mask-image: radial-gradient(circle at 50% 60%, black 50%, rgba(0,0,0,0.6) 50%);"></video>',
          tbar: [{
            text: "Snapshot",
            handler: function () {
              var video   = document.getElementById('acVideo');
              var canvas  = document.getElementById('acCanvas');
              var context = canvas.getContext('2d');

              context.drawImage(video, 0, 0, 400, 320);

              // Nombre del archivo según tipo
              var filename = (photoType === 'vehicle')
                ? (domain + '.png')
                : ('person-' + view.record.get('Id') + '.png');

              var base64 = canvas.toDataURL().replace('data:image/png;base64,', '');

              Ext.Ajax.request({
                url   : '/handler/uploadFile',
                method: 'POST',
                params: { fileName: filename, fileBase64: base64 },
                success: function () {
                  notify('La foto se subió correctamente.');

                  // ✅ Pasa el photoType correcto
                  me.reloadUserRecordAndRefresh(view, filename, photoType);

                  // Preview inmediato según tipo
                  if (photoType === 'vehicle') {
                    var photoCmp = view.down('#Photo');
                    if (photoCmp) {
                      photoCmp.setSrc('/gallery/' + filename + '?' + new Date().getTime());
                    }
                  } else {
                    var personImg = view.down('#usu_cimagen');
                    if (personImg) {
                      personImg.setSrc('/gallery/' + filename + '?' + new Date().getTime());
                    }
                  }

                  if (localMediaStream && localMediaStream.getTracks) {
                    Ext.Array.forEach(localMediaStream.getTracks(), function (t) { t.stop(); });
                  }
                  localMediaStream = null;
                  cameraWin.close();
                },
                failure: function (resp) {
                  console.log('Error al subir snapshot:', resp);
                  notifyError('No se pudo subir la foto tomada.');
                }
              });
            }
          }]
        },
        {
          width: 400,
          title: "Snapshot",
          height: 400,
          html: '<canvas id="acCanvas" width="400" height="320"></canvas>'
        }
      ]
    });

    cameraWin.show();
  },

  startCamera: function (cameraWin) {
    var video = document.getElementById("acUserVideo");
    if (!video || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      notifyError("La cámara no es soportada por este navegador.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        cameraWin.mediaStream = stream;
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.error("Error al acceder a la cámara:", err);
        notifyError("No se pudo acceder a la cámara.");
      });
  },

  stopCamera: function (cameraWin) {
    var stream = cameraWin.mediaStream;
    if (stream && stream.getTracks) {
      Ext.Array.forEach(stream.getTracks(), function (t) { t.stop(); });
    }
    cameraWin.mediaStream = null;
  },

  takeSnapshotAndUpload: function (view, cameraWin, photoType) {
    var me     = this;
    var video  = document.getElementById("acUserVideo");
    var canvas = document.getElementById("acUserCanvas");

    if (!video || !canvas) {
      notifyError("No se pudo capturar la imagen.");
      return;
    }

    // photoType por defecto 'vehicle'
    photoType = photoType || 'vehicle';

    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var dataUrl  = canvas.toDataURL("image/png");
    var base64   = dataUrl.replace(/^data:image\/png;base64,/, "");
    var filename = (photoType === 'vehicle')
      ? ("vehicle-" + view.record.get("Id") + ".png")
      : ("person-"  + view.record.get("Id") + ".png");

    Ext.Ajax.request({
      url   : "/handler/uploadFile",
      method: "POST",
      params: { fileName: filename, fileBase64: base64 },
      success: function () {
        notify("La foto se subió correctamente.");
        // ✅ Pasa el photoType correcto
        me.reloadUserRecordAndRefresh(view, filename, photoType);
        me.stopCamera(cameraWin);
        cameraWin.close();
      },
      failure: function (response) {
        console.error("Error al subir snapshot:", response);
        notifyError("No se pudo subir la foto tomada.");
      }
    });
  },

  // ─────────────────────────────────────────────────────────────────
  // MÉTODO CENTRAL — diferencia foto persona vs foto vehículo
  //
  // photoType:
  //   'person'  → actualiza solo usu_cimagen (foto del invitado)
  //   'vehicle' → actualiza solo meta.photo  (foto del auto)
  //   undefined → actualiza ambos (compatibilidad)
  // ─────────────────────────────────────────────────────────────────
  reloadUserRecordAndRefresh: function (view, newFileName, photoType) {
    var me = this;
    var userModel = Ext.data.schema.Schema.instances.default.getEntity(
      "Cuenta.model.m_usuariosModel"
    );

    userModel.load(view.record.get("Id"), {
      callback: function (record) {
        if (!record) {
          notifyError("No se pudo recargar la información del usuario.");
          return;
        }

        var filename = newFileName || record.get("usu_cimagen");

        if (filename) {
          var metaStr = record.get("usu_cmetadata");
          var meta;
          try {
            meta = metaStr ? Ext.decode(metaStr) : {};
          } catch (e) {
            meta = {};
          }

          if (photoType === 'person') {
            // ✅ Solo actualiza la foto de la persona — NO toca meta.photo
            record.set("usu_cimagen", filename);
            console.log("Actualizando foto PERSONA:", filename);

          } else if (photoType === 'vehicle') {
            // ✅ Solo actualiza la foto del vehículo en metadata — NO toca usu_cimagen
            meta.photo = filename;
            record.set("usu_cmetadata", Ext.encode(meta));
            console.log("Actualizando foto VEHICULO:", filename);

          } else {
            // Fallback: actualiza ambos (comportamiento anterior)
            record.set("usu_cimagen", filename);
            meta.photo = filename;
            record.set("usu_cmetadata", Ext.encode(meta));
            console.log("Actualizando foto AMBOS (fallback):", filename);
          }
        }

        record.save({
          callback: function (rec, operation) {
            if (operation.success) {
              notify("Los datos se guardaron con éxito.");
              view.fireEvent("refresh", view, rec);
            } else {
              console.error("Error al guardar. Operation:", operation);
              notifyError("Error al guardar los datos del usuario.");
            }
          },
          scope: me
        });
      },
      scope: me
    });
  },

  showInfoAutomovil: function (view) {
    var metadata;
    var uriphoto;

    if (view.record.get("usu_cmetadata")) {
      try {
        metadata = Ext.decode(view.record.get("usu_cmetadata"));
        uriphoto = "/gallery/" + metadata.photo + "?dc=" + new Date().getTime();
      } catch (e) {
        console.log("Error al parsear la metadata " + e);
      }
    }

    var usuarioModel = Ext.data.schema.Schema.instances.default.getEntity(
      "Cuenta.model.m_usuariosModel"
    );

    usuarioModel.load(view.record.get("Id"), {
      callback: function (record) {
        var viewInfoPersonForm = Ext.widget("m_usuariosformview", {
          caller: view,
          record: record,
          hideTipoUsuario: true,
          openFromAC: true,
        });
        viewInfoPersonForm.down("#Domain").setFieldLabel(getLocale("Matrícula"));
      },
    });
  },

});