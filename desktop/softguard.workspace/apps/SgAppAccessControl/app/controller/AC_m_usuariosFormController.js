Ext.define("SgAppAccessControl.controller.AC_m_usuariosFormController", {
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
    // genero los eventos

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
    });
  }, // cierro init

  refreshLikeInit: function (view, rec) {
    this.initview(view);
  },

  refresh: function (view, rec) {
    view.loadRecord(rec);

    if (rec.get("usu_cimagen") != "") {
      view
        .down("#usu_cimagen")
        .setSrc(
          "/gallery/" +
          rec.get("usu_cimagen") +
          "?_dc=" +
          Math.floor(Math.random() * 1000 + 1)
        );
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

    // Obtengo el modelo, en base al schema de la App y sus compartidos.
    var usuarioModel = Ext.data.schema.Schema.instances.default.getEntity(
      "Common.model.m_usuariosModel"
    );
    usuarioModel.load(view.record.get("usu_idKey"), {
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
      cac_autorizatipo: 3, //autorizacion preexistente,
      cac_autorizaid: view.autorizacionRecord.get("Id"),
      cac_tipoacceso: view.record.get("cac_tipoacceso") == 1 ? 0 : 1,
    });
    myobject.setId(0);

    view.record.set("cac_tipoacceso", myobject.get("cac_tipoacceso")); //guardo el estado asi no actualizo todo

    var viewWidget = Ext.widget("p_controlacceso_ioformview", {
      caller: view.down("p_controlacceso_ioview"), //para qu refreque
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

  initview: function (view) {
    var viewGridIO = view.down("p_controlacceso_ioview");
    viewGridIO.recordPersona = view.record;

    view.loadRecord(view.record);

    if (view.record.get("usu_cimagen") != "") {
      view
        .down("#usu_cimagen")
        .setSrc("/gallery/" + view.record.get("usu_cimagen"));
    }
    if (view.record.get("usu_cmetadata") != "") {
      let domainLabel = view.down("#domainLabel");
      let usu_cmetadata = JSON.parse(view.record.get("usu_cmetadata"));

      if (usu_cmetadata.patente || usu_cmetadata.domain) {
        let domain = usu_cmetadata.patente
          ? usu_cmetadata.patente
          : usu_cmetadata.domain;
        domainLabel.setValue(domain);
      }

      if (usu_cmetadata.photo) {
        console.log("Tiene foto");
        view.down("#Photo").setSrc("/gallery/" + usu_cmetadata.photo);
      }
    }

    //busco autoriacion activa
    view.store = Ext.create("Ext.data.Store", {
      model: this.getP_controlAcceso_AutorizacionSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "[caa_horadesde]:LTESTRING",
          value: Ext.Date.format(new Date(), "H:i"),
        },
        {
          property: "[caa_horahasta]:GTESTRING",
          value: Ext.Date.format(new Date(), "H:i"),
        },
        {
          property: "[caa_fechadesde]:LTEDATESTRING",
          value: Ext.Date.format(new Date(), "Y-m-d"),
        },
        {
          property: "[caa_fechahasta]:GTEDATESTRING",
          value: Ext.Date.format(new Date(), "Y-m-d"),
        },
        {
          property: "caa_diasemana",
          value: Ext.Date.format(new Date(), "N"),
        },
        {
          property: "caa_idautorizado",
          value: view.record.get("usu_idKey"),
        },
      ],
    });

    view.store.load({
      callback: function (records) {
        if (records.length > 0) {
          console.log("Autorizacion preexistente: ", records);
          //view.down('#gerarautoriazacion').show()
          //view.up('window').addCls('green')
          view.autorizacionRecord = records[0];

          //view.down('#fechadesde').setValue(Ext.Date.format(new Date(view.autorizacionRecord.get('caa_fechadesde')), 'd-m-Y'))
          //view.down('#fechahasta').setValue(Ext.Date.format(new Date(view.autorizacionRecord.get('caa_fechahasta')), 'd-m-Y'))
          //view.down('#horadesde').setValue(view.autorizacionRecord.get('caa_horadesde'))
          //view.down('#horahasta').setValue(view.autorizacionRecord.get('caa_horahasta'))
        } else {
          //view.down('#notieneautorizacion').show();
        }
      },
    });

    // SetActiveTab 2 if load from Bienvenido tab
    if (view.filterFromSearchContainer) {
      let tabPanel = view.down("#tabpanelUserInvitationEditor");

      tabPanel.setActiveTab(0);
    }

    /********************************* */
    view.down("#autorizacionesTab").usu_idKey = view.record.get("usu_idKey");
    this.showInfoAutomovil(view);
  },

  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up("form").getForm();
    var view = button.up("ac_m_usuariosformview");
    var win = button.up("window");
    var record = myform.getRecord();
    myform.updateRecord(record);


    //record.set('tec_ningreso', view.down('#ingreso').getValue() ? 1 : 0);
    //record.set('tec_negreso', view.down('#egreso').getValue() ? 1 : 0);
    //record.set('tec_nestado', view.down('#disponible').getValue() ? 1 : 0);

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
  showInfoAutomovil: function (view) {
    //var view = btn.up('ac_m_usuariosformview');
    //var title = getLocale('Editar') + ': ' + view.record.get('usu_cnombre');
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

    // Obtengo el modelo, en base al schema de la App y sus compartidos.
    var usuarioModel = Ext.data.schema.Schema.instances.default.getEntity(
      "Common.model.m_usuariosModel"
    );
    usuarioModel.load(view.record.get("usu_idKey"), {
      callback: function (record) {
        var viewInfoPersonForm = Ext.widget("m_usuariosformview", {
          caller: view,
          record: record,
          hideTipoUsuario: true,
          openFromAC: true,
        });
        viewInfoPersonForm
          .down("#Domain")
          .setFieldLabel(getLocale("Matrícula"));

        //view.down('#m_usuariosformviewPanel').add(viewInfoPersonForm);

        /*viewWin.down('#Domain').setFieldLabel(getLocale('Matrícula'));
        var win = Ext.create('Ext.Window', {
          iconCls: 'icon-table-add',
          layout: 'fit',
          title: title,
          translate: false,
          width: 800,
          height: 600,
          border: false,
          modal: true,
          items: viewWin,
          closeAction:'destroy',
          listeners:{
            'destroy':function(){
              if (uriphoto){
                view.down('#Photo').setSrc(uriphoto);
              }
            }
          }
        });
        win.show();*/
      },
    });
  },
});
