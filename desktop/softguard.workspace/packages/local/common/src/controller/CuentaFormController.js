Ext.define("Common.controller.CuentaFormController", {
  extend: "Ext.app.Controller",
  mixins: ["Common.mixin.GeocodeHelper"],
  stores: [
    "Common.store.TablaTiposStore",
    "Common.store.SiNoStore",
    "Common.store.TablaLineasStore",
    "Common.store.ProvinciasStore",
    "Common.store.ZonasHorariasStore",
    "Common.store.WebDealerSecurityModulesStore",
    //"Common.store.SecurityModulesStore",
    "Common.store.TablaInstaladoresStore",
    "Common.store.TablaPlantillasSmsStore",
  ],
  models: [
    "t_instaladoresdealerSearchModel",
    "t_instaladoresSelectModel",
    "TablasInstaladoresModel",
    "t_tiposSearchModel",
    "TablasTiposModel",
    "TablaInstaladoresModel",
    "TablaTiposModel",
    "NameValueIntModel",
    "ProvinciasModel",
    "NotificacionesSearchModel",
    "NotificacionesModel",
    "m_llavesSearchModel",
    "TimeZoneModel",
    "SoftguardCuentaModel",
    "m_CuentasXtraInfoSearchModel",
    "TablaTipoServicioModel",
    "CuentaTipoSearchModel",
    "TablaPlantillasSmsModel",
    "TablasModemsSmsSearchModel",
    "p_objetos_modificacionesModel",
    "ZonaByCuentaSearchModel",
    "SoftguardSmsModel",
    "t_provinciasSearchModel",
    "TablasInstaladoresSearchModel",
    "InstaladoresByTokenSearchModel",
    "OPGSP_PartidosSearchModel",
    "OPGSP_LocalidadSearchModel",
    "Common.model.m_llavesModel",
  ],
  views: [
    "CuentaView",
    "DirEntregaFormView",
    "CuentaFormView",
    "CuentaNumeroFormView",
    "CuentaDatosFormView",
    "CuentaNotificacionesFromView",
  ],

  init: function (config) {
    this.control({
      /*'cuentaresolucionesview': {
              afterrender: this.initialize
          },*/
      cuentaformview: {
        afterrender: this.initview,
        refresh: this.initview,
        passwordchanged: this.onPasswordChanged,
      },
      cuentadatosformview: {
        passwordchanged: this.onPasswordChanged,
      },
      'cuentaformview button[action="save"]': {
        click: this.onSaveClick,
      },
      'cuentaformview button[action="delete"]': {
        click: this.onDeleteClick,
      },
      'cuentaformview button[action="photo"]': {
        click: this.onPhotoClick,
      },
      'cuentaformview button[action="map"]': {
        click: this.onMapClick,
      },
      'cuentaformview button[action="audit"]': {
        click: this.showAudit,
      },
      'cuentaformview button[action="passwordChange"]': {
        click: this.onPasschangeClick,
      },
      'cuentaformview button[action="direccionCopy"]': {
        click: this.onDireccioncopyClick,
      },
      '#mapWindow button[action="posicionar"]': {
        click: this.onPosicionarClick,
      },
      '#mapWindow button[action="save"]': {
        click: this.onMapSaveClick,
      },
      'cuentaformview button[action="verPlantillaSmsAsignar"]': {
        click: this.onVerPlantillaSmsAsignarClick,
      },
      'cuentaformview button[action="verPlantillaSmsDesasignar"]': {
        click: this.onVerPlantillaSmsDesasignarClick,
      },
      'cuentaformview button[action="verPlantillaEmailAsignar"]': {
        click: this.onVerPlantillaEmailAsignarClick,
      },
      'cuentaformview button[action="verPlantillaEmailDesasignar"]': {
        click: this.onVerPlantillaEmailDesasignarClick,
      },
      "cuentaformview #solitarcambio": {
        click: this.onSolicitarCambioClick,
      },
      "#exportWindow #particiones": {
        change: this.onAgregarParticionesChange,
      },
      'cuentaformview button[action="export"]': {
        click: this.onExportToExcel,
      },
      /**
       * BC 394088837 : Mas informacion para Ubicacion
       */
      'cuentaformview button[action="moreInfo"]': {
        click: this.onMoreInfoClick,
      },
      "#moreInfoWindow": {
        afterrender: this.loadExtraUbicationData,
      },
      '#moreInfoWindow button[action="save"]': {
        click: this.saveExtraUbicationData,
      },
      "cuentaformview #provincias": {
        itemSelected: this.onProvinciaSelected,
      },
      "cuentaformview #OPGSP_Partido": {
        change: this.onPartidoChange,
      },
      "cuentaformview #OPGSP_Localidad": {
        change: this.onLocalidadChange,
      },
      'cuentaformview button[action="keyMasInfo"]': {
        click: this.onkeyMasInfoClick,
      },
      "cuentaformview #llave": {
        change: this.onLlaveChange,
      },
      'smarttrackcuentadatosformview button[action="calcular"]': {
        click: this.onCalcularVigiladores,
      },
    });
  },

  /*initialize: function(view ) {
      console.log( 'view.......', view )
      var _config = {
          title: 'Resolución  extendida',
        
      };
      var myPanel = view.down( '#datostabid' );
      
      var mytab = myPanel.down( '[title=' + getLocale( 'Cuenta' ) + ']' );
      if( !mytab ) {
          var newTab = Ext.widget( 'cuentaresolucionesview', _config );
          // agrego la paleta creada
          myPanel.insert( 0, newTab );
          myPanel.setActiveTab( newTab );
      }
  
      view.down( '#datostabid' );
  
  },*/

  onLlaveChange: function (combo, newValue) {
    var controller = this;
    var view = combo.up("cuentaformview");
    var keyMasInfo = view.down("#keyMasInfo");

    if (newValue == 1) {
      keyMasInfo.enable();
    } else {
      keyMasInfo.disable();
    }
  },

  onkeyMasInfoClick: function (btn) {
    var controller = this;
    var view = btn.up("cuentaformview");
    var record = view.record;

    // busco si hay una llave para la cuenta
    var store = Ext.create("Ext.data.Store", {
      model: controller.getM_llavesSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: "lla_iidcuenta",
          value: record.get("cue_iid"),
        },
      ],
    }).load({
      callback: function (records) {
        var recordLlave;
        if (records.length > 0) {
          // existe, asigno el primero
          recordLlave = records[0];
        } else {
          // no existe creo un nuevo record con el id de la cuenta, asigno con model de search para mantener homogeneidad con resultado de busqueda
          recordLlave = Ext.create(controller.getM_llavesModelModel(), {
            lla_iidcuenta: record.get("cue_iid"),
          });
          recordLlave.set("Id", 0); // forzo el id en 0
        }

        var myWindow = Ext.widget("window", {
          title: "Información de la llave",
          height: 250,
          width: 400,
          layout: "fit",
          modal: true,
          items: [
            {
              xtype: "m_llavesformview",
              record: recordLlave,
            },
          ],
        }).show();
      },
    });
  },

  onPartidoChange: function (combo, newValue, oldValue) {
    var controller = this;
    var view = combo.up("cuentaformview");
    var json = controller.getMasInfoJson(view);

    var OPGSP_Localidad = view.down("#OPGSP_Localidad");
    if (oldValue) {
      OPGSP_Localidad.setValue(null);
      json.localidadId = null;
    }

    OPGSP_Localidad.getStore().load({ params: { OPGSP_idPartido: newValue } });

    json.partidoId = newValue;
    controller.setMasInfoJson(view, json);
  },

  onLocalidadChange: function (combo, newValue) {
    var controller = this;
    var view = combo.up("cuentaformview");
    var json = controller.getMasInfoJson(view);
    json.localidadId = newValue;
    controller.setMasInfoJson(view, json);
  },

  setOPGSPStores: function (view) {
    var controller = this;
    var OPGSP_Localidad = view.down("#OPGSP_Localidad");
    var OPGSP_Partido = view.down("#OPGSP_Partido");
    var OPGSP_PartidoStore = Ext.create("Ext.data.Store", {
      model: controller.getOPGSP_PartidosSearchModelModel(),
      remoteSort: true,
      remoteFilter: true,
    });

    if (OPGSP_Partido) {
      OPGSP_Partido.bindStore(OPGSP_PartidoStore);
      OPGSP_PartidoStore.load();

      var OPGSP_LocalidadStore = Ext.create("Ext.data.Store", {
        model: controller.getOPGSP_LocalidadSearchModelModel(),
        remoteSort: true,
        remoteFilter: true,
      });

      OPGSP_Localidad.bindStore(OPGSP_LocalidadStore);
    }
  },

  onProvinciaSelected: function (selecter, _provincia) {
    // me fijo el parametro de buenos aires
    var controller = this;
    var view = selecter.up("cuentaformview");
    var idBA = getParametro("OPGSP_BUENOSAIRES");
    var OPGSP = view.down("#OPGSP");
    var miPanel = Ext.ComponentQuery.query("panel[title=Dirección]")[0];

    //const localidad = miPanel.items.items[ 1 ]
    //const provincia = miPanel.items.items[ 2 ]

    if (idBA > 0 && _provincia && idBA == _provincia.get("Id")) {
      // preparo el store (verificar si no existe etc)
      var OPGSP_Localidad = view.down("#OPGSP_Localidad");

      var OPGSP_Partido = view.down("#OPGSP_Partido");
      var OPGSP_LocalidadStore = OPGSP_Localidad.getStore();

      var json = controller.getMasInfoJson(view);

      if (json.partidoId && OPGSP_Partido) {
        OPGSP_Partido.setValue(json.partidoId);
      }
      var _partido = OPGSP_Partido.getValue();
      var _params = null;
      if (_partido > 0) {
        _params = { params: { OPGSP_idPartido: _partido } };
      }

      OPGSP_LocalidadStore.load(_params);

      // seteo los valores si tengo

      if (json.localidadId && OPGSP_Localidad) {
        OPGSP_Localidad.setValue(json.localidadId);
      }

      if (OPGSP) {
        OPGSP.show();
      }
    } else if (OPGSP) {
      OPGSP.hide();
    }
  },

  // obtengo o genero el JSON de mas info
  getMasInfoJson: function (view) {
    var controller = this;
    var record = view.record;
    /**
     * Obtengo la ubicacion del record de la view de cuentaform
     */
    var ubicacionOriginal = record.get("cue_cubicacion");
    var json = "";

    // me fijo si existe el JSON ya guardado o si lo debo crear nuevamente
    if (
      view.down("#moreInfoText") &&
      view.down("#moreInfoText").getValue() != ""
    ) {
      // Fuerzo actualizacion del json propiedad ubicacion, por si solo se modifico este y no los datos extras
      json = JSON.parse(view.down("#moreInfoText").getValue());
    } else {
      try {
        json = JSON.parse(ubicacionOriginal);
      } catch (e) {
        json = {
          ubicacion: ubicacionOriginal,
          entreCalleA: "",
          entreCalleB: "",
          torre: "",
          piso: "",
          dpto: "",
          barrio: "",
          manzana: "",
          partidoId: "",
          localidadId: "",
        };
      }
    }

    return json;
  },

  setMasInfoJson: function (view, json) {
    var moreInfoText = view.down("#moreInfoText");
    moreInfoText.setValue(JSON.stringify(json));
  },

  onSolicitarCambioClick: function (button) {
    var view = button.up("cuentaformview");
    var controller = this;
    var latField = view.getForm().findField("_lat");
    var longField = view.getForm().findField("_long");
    var latlongField = view.getForm().findField("cue_cLatLng");

    if (latField.getValue() && longField.getValue()) {
      latlongField.setValue(latField.getValue() + "," + longField.getValue());
    } else {
      latlongField.setValue("");
    }

    var RecordModificado = view.getForm().getRecord().copy();
    view.getForm().updateRecord(RecordModificado);

    var RecordOriginal = view.getForm().getRecord();

    if (view.down("#provincias")) {
      RecordModificado.set(
        "cue_cprovincia",
        view.down("#provincias").getValue()
      );
    }

    Ext.Ajax.request({
      url: "/handler/SearchPost?search=SolicitudModificacionesUpdOIns",
      method: "POST",
      params: {
        pom_usuariopedido: controller.application.UserData.udw_idKey,
        pom_fechapedido: new Date(),
        pom_idtipoobjeto: view.getForm().getRecord().get("ObjectTypeId"),
        pom_idobjeto: view.getForm().getRecord().get("Id"),
        pom_sinmodificar: Ext.encode(RecordOriginal),
        pom_modificado: Ext.encode(RecordModificado),
        pom_estado: 0,
        pom_log: {},
        pom_usuarioultcambio: -1,
        pom_cueiid: view.record.get("cue_iid"),
        pom_metadata: Ext.encode({
          form: {
            alias: view.xtype,
            title: view.title,
          },
        }),
      },
      scope: this,
      success: function (response) {
        var errors = Ext.JSON.decode(response.responseText);
        notify("La solicitud fue realizada");
      },
    });

    view.up("window").close();
  },

  onVerPlantillaSmsAsignarClick: function (button, event, options) {
    var view = button.up("cuentanotifiacionesformview");
    var combo = view.down("#plantillasmsasignar");
    var record = combo.valueModels[0];
    this.openVer(record);
  },

  onVerPlantillaSmsDesasignarClick: function (button, event, options) {
    var view = button.up("cuentanotifiacionesformview");
    var combo = view.down("#plantillasmsdesasignar");
    var record = combo.valueModels[0];
    this.openVer(record);
  },

  onVerPlantillaEmailAsignarClick: function (button, event, options) {
    var view = button.up("cuentanotifiacionesformview");
    var combo = view.down("#plantillaemailasignar");
    var record = combo.valueModels[0];
    this.openVer(record);
  },

  onVerPlantillaEmailDesasignarClick: function (button, event, options) {
    var view = button.up("cuentanotifiacionesformview");
    var combo = view.down("#plantillaemaildesasignar");
    var record = combo.valueModels[0];
    this.openVer(record);
  },

  openVer: function (record) {
    if (!record) {
      notify("Seleccione una plantilla.");
      return false;
    }
    var myWindow = Ext.widget("window", {
      title: record.get("pls_cdescripcion"),
      height: 150,
      width: 600,
      //autoScroll: true,
      modal: true,
      items: [
        {
          xtype: "box",
          padding: 5,
          autoScroll: true,
          html: "<xmp>" + record.get("pls_mplantilla") + "</xmp>",
        },
      ],
      layout: "fit",
    }).show();
  },

  initview: function (view) {
    var controller = this;
    var viewport = view.up("cuentaview") ? view.up("cuentaview") : view;
    var record = view.record;
    var controller = this;
    var isFullAdmin = false;
    var _module = view.module;

    //--------------------
    var comboDealer = view
      .down("#dealer")
      .getStore()
      .load({
        callback: function (records) {
          console.log / ("Records: ", view.record);
          view.down("#dealer").setValue(view.record.get("cue_clinea"));
        },
      });

    //----------------------

    var westView = view.up().up().down();

    if (!record) {
      record = viewport.cuenta;
      view.record = record;
    }

    if (view.cuenta) {
      record = view.cuenta;
      view.record = record;
    }

    var cue_cprovincia = record.get("cue_cprovincia").trim();

    view.down("#fieldCustom").setFieldLabel(getParametro("LABELCAMPOCUSTOM"));

    //Combo para el combo de tipo de servicio
    var storeComboTiposServicio = Ext.create("Ext.data.Store", {
      model: controller.getTablaTipoServicioModelModel(),
      pageSize: 1000,
      remoteSort: true,
      remoteFilter: true,

      filters: [
        {
          property: "cts_iestado:ININT",
          value: 1,
        },
      ],
    });
    var comboTiposServicio = view.down("#comboTiposServicio");
    if (comboTiposServicio) {
      comboTiposServicio.bindStore(storeComboTiposServicio);
      storeComboTiposServicio.load({
        callback: function () {
          storeComboTiposServicio.insert(0, {
            Id: 0,
            cts_cnombre: getLocale("Seleccione"),
          });
        },
      });
    }

    var store = Ext.create("Ext.data.Store", {
      model: controller.getM_CuentasXtraInfoSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,

      filters: [
        {
          property: "cue_iidCuenta",
          value: record.get("cue_iid"),
        },
      ],
    }).load({
      callback: function (records) {
        console.log(records);
        if (records.length > 0) {
          view.down("#fieldCustom").setValue(records[0].get("cue_cCustom"));
          if (records[0].get("cue_iImportancia") == 0) {
            view.down("#cue_iImportancia").setValue(4);
          } else {
            view
              .down("#cue_iImportancia")
              .setValue(records[0].get("cue_iImportancia"));
          }

          view
            .down("#cue_ilicenciapar")
            .setValue(records[0].get("cue_ilicenciapar"));

          if (view.down("#cue_cHorasVC") && records[0].get("cue_cHorasVC")) {
            view.down("#cue_cHorasVC").setValue(records[0].get("cue_cHorasVC"));
          }

          if (comboTiposServicio && records[0].get("cue_iTipoServicio") != 0) {
            comboTiposServicio.setValue(records[0].get("cue_iTipoServicio"));
          } else if (comboTiposServicio) {
            comboTiposServicio.setValue(0);
          }
          const cantVigiladores = records[0].get("cue_iVigiladoresVC");
          if (cantVigiladores > 0) {
            view.down("#cue_iVigiladoresVC").setValue(cantVigiladores);

            var duracion = getParametro("DURACIONJORNADA");
            if (duracion) {
              var today = new Date();
              var lastDay = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                0
              );
              var daysInMonth = lastDay.getDate();

              const horas = duracion / 60;

              view
                .down("#calculoVigiladores")
                .setValue(cantVigiladores * horas * daysInMonth);
            }
          }
        } else {
          view.down("#cue_iImportancia").setValue(4);
        }
      },
    });

    if (
      record.get("cue_nparticion") != 0 &&
      (!view.hideComponents ||
        !Ext.Array.contains(view.hideComponents, "#cuentamadre"))
    ) {
      var recordCuenta = this.getSoftguardCuentaModelModel();
      var objectId = record.get("cue_nparticion");

      recordCuenta.load(objectId, {
        callback: function (record, operation) {
          if (operation.success) {
            view.down("#cuentamadre").show();
            view
              .down("#cuentam")
              .setValue(
                record.get("cue_clinea") +
                  "-" +
                  record.get("cue_ncuenta") +
                  " - " +
                  record.get("cue_cnombre")
              );
            view.resetOriginal();
          }
        },
      });

      //view.down('#particion').show();
    }

    view.loadRecord(record);

    // DSS-446 En caso de estar en el modulo WebRemoto cargo al view el modelo de cuenta
    if (controller.application._nameModule == "Webremoto") {
      var recordCuenta = this.getSoftguardCuentaModelModel();
      var objectId = record.get("cue_iid");

      recordCuenta.load(objectId, {
        callback: function (record, operation) {
          if (operation.success) {
            view.record = record;
          }
        },
      });
    }

    /**
     * BC 394088837 : Mas informacion para Ubicacion, ahora se guarda en formato JSON si es con dato extra
     */
    var ubicacionOriginal = record.get("cue_cubicacion");
    var json = "";
    try {
      json = JSON.parse(ubicacionOriginal);
    } catch (e) {
      json = ubicacionOriginal;
    }

    var _ubicacion = view.down("#ubicacion");
    _ubicacion.setValue(ubicacionOriginal);
    if ((json.ubicacion || json.ubicacion == "") && _ubicacion) {
      var moreInfoText = view.down("#moreInfoText");
      if (moreInfoText) {
        moreInfoText.setValue(ubicacionOriginal);
      }
      _ubicacion.setValue(json.ubicacion);
      //modifico descomentando y poniendo el _ubicacion en show pedido por fer
      //_ubicacion.show();
    }

    // requiere que este cargado moreInfoText
    // preparo los stores de los campos OPGSP
    controller.setOPGSPStores(view);

    if (view.down("#provincias") && cue_cprovincia) {
      view.down("#provincias").setValue(cue_cprovincia);

      // busco el record de la provincia
      var provinciasStore = Ext.data.StoreManager.lookup("ProvinciasStore");
      var _provincia = provinciasStore.findRecord(
        "pro_ccodigo",
        cue_cprovincia
      );
      if (_provincia) {
        controller.onProvinciaSelected(view.down("#provincias"), _provincia);
      }
    }

    //en smarttrack no esta este campo
    if (view.down("#instaladorCombo")) {
      view.down("#instaladorCombo").setValue(record.get("cue_cinstalador"));
    }

    var _tipo = view.down("#tipo");
    if (_tipo) {
      _tipo.setValue(record.get("cue_ctipo"));
      _tipo.filter = [{ property: "tip_ntipo:ININT", value: view.filterTipo }];
    }

    // seteo los valores de lat y lng
    var latField = view.getForm().findField("_lat");
    var longField = view.getForm().findField("_long");
    var lat = record.get("cue_cLatLng").split(",")[0];
    var long = record.get("cue_cLatLng").split(",")[1];
    var clave = view.down("#clave");
    var claveTxt = view.down("#claveTxt");
    var permiso = view.down("#permiso");
    var permisoTxt = view.down("#permisoTxt");
    var claveBtn = view.down("#claveBtn");
    var accesoweb = viewport.down("#accesoweb");
    var mostrarfoto = viewport.down("#mostrarfoto");
    var datosextra = viewport.down("#datosextra");

    latField.setValue(lat);
    longField.setValue(long);

    var clave = view.down("#clave");
    clave.setValue(record.get("cue_cclave"));

    var permiso = view.down("#permiso");
    permiso.setValue(record.get("cue_cpermiso"));

    if (record.get("Id") > 0) {
      view.down("#dealer").disable();

      view.down("#cuenta").disable();
      view.down("#fechaAlta").disable();
    }

    var storeSecurity = Ext.data.StoreManager.lookup("SecurityModulesStore");
    var recordAdminsitrator = storeSecurity.findRecord(
      "KeyReference",
      "Administrator"
    );
    if (recordAdminsitrator && recordAdminsitrator.get("Available") == true) {
      if (recordAdminsitrator.get("_Security")) {
        if (
          !recordAdminsitrator.get("_Security").rights.cuenta ||
          recordAdminsitrator.get("_Security").rights.cambionumerocuenta
        ) {
          view.down("#cuenta").setDisabled(false);
        }
        if (recordAdminsitrator.get("_Security").rights.cuenta) {
          if (
            recordAdminsitrator.get("_Security").rights.cambionumerocuenta ||
            parseInt(view.profile) > 2
          ) {
            view.down("#cuenta").setDisabled(false);
          }

          if (parseInt(view.profile) > 2) {
            if (view.down("#instaladorCombo")) {
              view.down("#instaladorCombo").setDisabledNew(true);
            }
          }

          if (_module.profile == 2) {
            datosextra.show();
            datosextra.setDisabled(false);
          }

          if (
            !recordAdminsitrator.get("_Security").rights.exportardatosdelacuenta
          ) {
            view.down("#btnExportar").hide();
          }
        } else {
          isFullAdmin = true;

          //si sos full admin dejo que pueda crear instalaodres y tecnicos
          if (view.down("#instaladorCombo")) {
            view.down("#instaladorCombo").setDisabledNew(true);
          }
          if (view.down("#tipo") && view.down("#tipo").xtype != "combo") {
            view.down("#tipo").setDisabledNew(true);
          }
        }
      } else {
        view.down("#cuenta").setDisabled(true);
        if (view.down("#instaladorCombo")) {
          view.down("#instaladorCombo").setDisabledNew(true);
        }
        isFullAdmin = true;
        view.cuentaformProfile = 3;
      }
    }

    var recordDealer = storeSecurity.findRecord("KeyReference", "WebDealer");
    if (recordDealer && recordDealer.get("Available") == true) {
      if (recordDealer.get("_Security")) {
        if (recordDealer.get("_Security").rights.cambionumerocuenta) {
          view.down("#cuenta").setDisabled(false);
        }
      }
    }

    view.pais = getParametro("NOMBREPAIS");

    // se muestra siempre el permiso a pedido de leo
    permiso.hide();
    permisoTxt.show();

    if (view.readOnly) {
      view.down("#save").hide();
      view.down("#passwordChange").hide();
      view.down("#claveBtn").hide();
      view.down("#btnExportar").hide();
      view.disableForm();
      view.down("[action=direccionCopy]").setDisabled(true);
      view.down("cuentanumeroformview").setDisabled(true);
    }

    if (view.security) {
      var rights = view.security.rights;
      var modules = SecurityModulesStore; //controller.getSecurityModulesStoreStore()
      var masterModule = modules.findRecord("KeyReference", "MasterWebDealer");
      var isMaster = masterModule ? masterModule.get("Available") : false;

      if (view.security.chkCambioNumero && view.down("#cuenta")) {
        view.down("#cuenta").setDisabled(true);
      }

      if (isMaster && masterModule.get("_Security") != false) {
        if (masterModule.get("_Security").rights.cambionumerocuenta) {
          view.down("#cuenta").enable();
        } else {
          view.down("#cuenta").disable();
        }
      }

      // me fijo el profile de cuenta y veo que hago con el boton de guarda
      if (view.security.modules)
        Ext.Array.each(view.security.modules, function (_module) {
          if (_module.view == "cuentaformview") {
            view.cuentaformProfile = _module.profile;
            if (_module.profile < 2) {
              datosextra.show();
              view.down("#save").hide();
              view.down("#passwordChange").hide();
              view.down("#claveBtn").hide();
              view.down("#btnExportar").hide();
              view.down("#provincias").setDisabled(true);
              view.disableForm();
            }
            if (_module.profile == 2) {
              datosextra.show();
              datosextra.setDisabled(true);
            }

            if (_module.profile == 3) {
              datosextra.show();
              //view.down('#save').show() 02/05/2025 Daniel O. Medina https://softguard.atlassian.net/browse/DK-817
              accesoweb.show();
              view.down("#llave").show();
              mostrarfoto.show();
              //clave.hide();
              //claveTxt.show();
              claveBtn.show();
              //claveTxt.setValue(record.get('cue_cclave'));
              view.down("#dealer").enable();
            }

            if (_module.profile == 4) {
              view.down("#save").hide();
              view.down("#solitarcambio").show();
            }
          }
        });
    } else {
      // no tiene datos de seguridad en webdealer, me fijo si es master o admin
      var modules = SecurityModulesStore;
      var masterModule = modules.findRecord("KeyReference", "MasterWebDealer");
      var administratorModule = modules.findRecord(
        "KeyReference",
        "Administrator"
      );
      var accountAdministrationModule = modules.findRecord(
        "KeyReference",
        "AccountAdministration"
      );
      var isMaster = masterModule ? masterModule.get("Available") : false;
      var isAdmin = administratorModule
        ? administratorModule.get("Available")
        : true;
      var isAccount = accountAdministrationModule
        ? accountAdministrationModule.get("Available")
        : false;

      if (isMaster || isAdmin || isAccount) {
        var masterDealerModules =
          controller.getWebDealerSecurityModulesStoreStore();
        var modulesArray = [];
        masterDealerModules.each(function (_module) {
          _module.set("profile", 3);
          modulesArray.push(_module.data);
        });

        view.security = { modules: modulesArray };
        if (isAdmin) {
          view.down("#dealer").disable();
          view.down("#llave").show();
        }
        if (isMaster && masterModule.get("_Security") != false) {
          if (!masterModule.get("_Security").rights.cambionumerocuenta) {
            view.down("#cuenta").setDisabled(false);
          } else {
            view.down("#cuenta").setDisabled(true);
          }
        }

        if (isAdmin || isAccount) {
          datosextra.show();
          accesoweb.show();
          mostrarfoto.show();
        }
      } else {
        // no tiene datos de seguridad y no es admin
        var masterDealerModules =
          controller.getWebDealerSecurityModulesStoreStore();
        var modulesArray = [];

        masterDealerModules.each(function (_module) {
          _module.set("profile", 1);
          modulesArray.push(_module.data);
        });

        view.security = { modules: modulesArray };
        view.down("#save").hide();

        var fields = view.query("field");

        Ext.Array.each(fields, function (field) {
          field.disable();
        });

        clave.hide();
        claveTxt.hide();
        claveBtn.hide();
        //claveTxt.setValue(record.get('cue_cclave'));
        view.subirFotoHide = true;
        datosextra.hide();
        accesoweb.hide();
        mostrarfoto.hide();
      }
    }

    if (isFullAdmin || (rights && rights.changedealer)) {
      var dealer = view.down("#dealer");
      if (dealer) {
        dealer.enable();
      }
      var cue_cnombre = view.down("#cue_cnombre");
      if (cue_cnombre) {
        cue_cnombre.enable();
      }

      //view.down('#save').show() 02/05/2025 Daniel O. Medina https://softguard.atlassian.net/browse/DK-817
    }

    if (isFullAdmin || (rights && rights.claves)) {
      clave.hide();
      claveTxt.show();
      //claveBtn.show();
      claveTxt.setValue(record.get("cue_cclave"));
    } else {
      claveTxt.hide();
      clave.show();
    }

    view.resetOriginal();

    var storePlantilla = Ext.create("Ext.data.Store", {
      model: controller.getTablaPlantillasSmsModelModel(),
      pageSize: 500,
      remoteSort: true,
      remoteFilter: true,
    });
    storePlantilla.load({
      callback: function () {
        view
          .down("#plantillasmsasignar")
          .bindStore(deepCloneStore(storePlantilla));
        view
          .down("#plantillasmsdesasignar")
          .bindStore(deepCloneStore(storePlantilla));
        view
          .down("#plantillaemailasignar")
          .bindStore(deepCloneStore(storePlantilla));
        view
          .down("#plantillaemaildesasignar")
          .bindStore(deepCloneStore(storePlantilla));

        var storeModem = Ext.create("Ext.data.Store", {
          model: controller.getTablasModemsSmsSearchModelModel(),
          pageSize: 500,
          remoteSort: true,
          remoteFilter: true,
          filters: [
            {
              property: "sms_nEstado",
              value: 2,
            },
          ],
        });

        storeModem.load({
          callback: function () {
            view.down("#modemasignar").bindStore(deepCloneStore(storeModem));
            view
              .down("#modemsmsdesasignar")
              .bindStore(deepCloneStore(storeModem));

            if (record.get("cue_clinea") == "_MP") {
              view.down("#direccionentrega").hide();
              view.down("#direccion").hide();
              view.down("#datosextra").hide();

              view.down("#clavebox").hide();
              view.down("#permiso").hide();
              view.down("#permisoTxt").hide();
              view.down("#particion").hide();
              // view.down('#imei').hide();
              view.down("#tipo").hide();
              view.down("#instaladorCombo").hide();
              view.down("#fechaAlta").hide();
              view.down("#servicio").hide();
              view.down("#efectiva").hide();
              view.down("#idext").hide();
              view.down("#ubicacion").hide();
              view.down("#_lat").hide();
              view.down("#_long").hide();
              view.down("#zonahoraria").hide();

              view.down("#notifiacionespanel").show();
              var _ObjectId = record.get("Id");
              var mystore = Ext.create("Ext.data.Store", {
                //model: 'awcc'+'.model.SoftguardSmsModel'
                model: "awcc.model.NotificacionesSearchModel",
                remoteSort: true,
                remoteFilter: true,
                filters: [
                  {
                    property: "sms_iidcuenta",
                    value: _ObjectId,
                  },
                ],
              });

              mystore.load({
                ObjectId: _ObjectId,
                view: view,
                store: mystore,
                callback: function (records) {
                  var viewnotificaiones = view.down(
                    "cuentanotifiacionesformview"
                  );
                  Ext.Array.each(records, function (record) {
                    var evento = record.get("sms_meventos");

                    if (evento == "_DM") {
                      if (
                        Ext.util.Format.trim(record.get("sms_cplantillasms"))
                      ) {
                        viewnotificaiones.down("#smsasignar").setValue(true);
                        viewnotificaiones
                          .down("#plantillasmsasignar")
                          .setValue(record.get("sms_cplantillasms"));
                        viewnotificaiones
                          .down("#modemasignar")
                          .setValue(record.get("sms_imodemsms"));

                        view.smsasignarRecord = record;
                      } else {
                        viewnotificaiones.down("#emailasignar").setValue(true);
                        viewnotificaiones
                          .down("#plantillaemailasignar")
                          .setValue(record.get("sms_cplantillamail"));

                        view.emailasignarRecord = record;
                      }
                    }

                    if (evento == "_LM") {
                      if (
                        Ext.util.Format.trim(record.get("sms_cplantillasms"))
                      ) {
                        viewnotificaiones.down("#smsdesasignar").setValue(true);
                        viewnotificaiones
                          .down("#plantillasmsdesasignar")
                          .setValue(record.get("sms_cplantillasms"));
                        viewnotificaiones
                          .down("#modemsmsdesasignar")
                          .setValue(record.get("sms_imodemsms"));

                        view.smsdesasignarRecord = record;
                      } else {
                        viewnotificaiones
                          .down("#emaildesasignar")
                          .setValue(true);
                        viewnotificaiones
                          .down("#plantillaemaildesasignar")
                          .setValue(record.get("sms_cplantillamail"));

                        view.emaildesasignarRecord = record;
                      }
                    }
                  });
                },
              });
            }
          },
        });
      },
    });

    if (
      this.application._nameModule == "VigiControl" ||
      this.application._nameModule == "CleanApp"
    ) {
      view.down("#tipo").hide();
    }

    if (view.hideComponents) {
      Ext.Array.each(view.hideComponents, function (comp) {
        var _comp = view.down(comp);
        if (_comp) {
          _comp.hide();
          _comp.disable();
        }
      });
    }
  },
  onCalcularVigiladores: function (button) {
    const view = button.up("cuentaformview");
    console.log("onCalcularVigiladores");
    view.fireEvent("refresh", view);
  },
  onDeleteClick: function (button, event, options) {
    var view = button.up("cuentaformview");
    var record = view.record;
  },

  onSaveClick: function (button, event, options) {
    var view = button.up("cuentaformview")
      ? button.up("cuentaformview")
      : button.caller;
    var viewport = view.up("cuentaview") ? view.up("cuentaview") : view;
    var mymodel = view.record;

    var westView = view.up().up().down();
    var controller = this;

    var model = this.getSoftguardCuentaModelModel();
    //mymodel.setProxy(model.getProxy());

    /*
      cambiar por pregunta de view.security se supone que sel boton no esta 
      so el usuario no tiene derechos
      
      
      var moduleStore = Ext.StoreManager.lookup('CuentaDealerModuleStore');
      var root = moduleStore.getRootNode();
      var module = root.findChild('view','cuentaformview',true );
      var profile = module.get('profile');
      
      if (profile < 2){
          notifyError('No posee derechos para la operación');
          return false;
      }
      */
    myform = view.getForm();

    if (!myform.isValid()) {
      notifyError("Datos inválidos");
      var invalidFields = [];
      myform.getFields().filterBy(function (field) {
        if (field.validate()) return;
        invalidFields.push(field);
      });
      console.log(invalidFields);
      return false;
    }

    //evaluo numero de cuenta

    var form = view.getForm();
    console.log("form---", form);
    var linea = form.findField("cue_clinea").getValue();
    var numeroCuentaField = view.down("#cuenta");
    // var dealerCuentaField = view.down("#dealer");
    var oldNumeroCuenta = view.record.get("cue_ncuenta");
    var newNumeroCuenta = Ext.String.leftPad(
      view.down("#cuenta").getValue().substring(0, 4),
      4,
      "0"
    );

    Ext.Ajax.request({
      url: "/Rest/Search/CuentaByDealerValidate",
      params: { linea: linea, cuenta: newNumeroCuenta },
      method: "GET",
      scope: this,
      success: function (response) {
        var errors = Ext.JSON.decode(response.responseText);
        if (
          oldNumeroCuenta !=
          newNumeroCuenta /*Dejo igual que admin cuentas || errors.total */
        ) {
          if (errors.total) {
            var error = errors.rows[0];
            numeroCuentaField.markInvalid(error.Descripcion);
            numeroCuentaField.textValid = false;
            // Dealer validation DISABLED
            // dealerCuentaField.markInvalid(
            //   "El dealer " + linea + " ya esta asociado a otra cuenta"
            // );
            // dealerCuentaField.textValid = false;
            return false;
          } else {
            numeroCuentaField.clearInvalid();
            numeroCuentaField.textValid = true;
          }
        }

        //actualizo el campo latlng
        var latField = view.getForm().findField("_lat");
        var longField = view.getForm().findField("_long");
        var latlongField = view.getForm().findField("cue_cLatLng");

        if (latField.getValue() && longField.getValue()) {
          latlongField.setValue(
            latField.getValue() + "," + longField.getValue()
          );
        } else {
          latlongField.setValue("");
        }

        try {
          myform.updateRecord(mymodel);
        } catch (e) {
          console.error("no se pudo hacer updateRecord");
        }

        if (view.down("#provincias"))
          mymodel.set("cue_cprovincia", view.down("#provincias").getValue());

        // no entiendo por que este campo lo graba mal el update, lo arreglo a mano x ahora.
        //mymodel.set('cue_nllaveul',myform.findField('cue_nllaveul').getValue());

        if (mymodel.get("cue_ccallecorreo") == "") {
          mymodel.set("cue_ccallecorreo", mymodel.get("cue_ccalle"));
          mymodel.set("cue_clocalidadcorreo", mymodel.get("cue_clocalidad"));
          mymodel.set("cue_cprovinciacorreo", mymodel.get("cue_cprovincia"));
          mymodel.set(
            "cue_ccodigopostalcorreo",
            mymodel.get("cue_ccodigopostal")
          );
          myform.loadRecord(mymodel);

          //para resolver el problema de forceselection cuando se intenta guardar un item qu eno existe
          view.down("#dealer").setValue(mymodel.get("cue_clinea"));
        }

        if (view.down("#instaladorCombo")) {
          mymodel.set(
            "cue_cinstalador",
            view.down("#instaladorCombo").getValue()
          );
        }

        if (view.down("#cue_iVigiladoresVC")) {
          console.log(
            "tiene cue_iVigiladoresVC, lo guardo",
            view.down("#cue_iVigiladoresVC").getValue()
          );
          mymodel.set(
            "cue_iVigiladoresVC",
            view.down("#cue_iVigiladoresVC").getValue()
          );
        }

        mymodel.set("cue_ctipo", view.down("#tipo").getValue());
        mymodel.set("cue_cclave", view.down("#clave").getValue());

        /**
         * BC 394088837 : Mas informacion para Ubicacion, ahora se guarda en formato JSON si es con dato extra
         */
        if (
          view.down("#moreInfoText") &&
          view.down("#moreInfoText").getValue() != ""
        ) {
          // Fuerzo actualizacion del json propiedad ubicacion, por si solo se modifico este y no los datos extras
          json = JSON.parse(view.down("#moreInfoText").getValue());
          json.ubicacion = view.down("#ubicacion").getValue();

          view.down("#moreInfoText").setValue(JSON.stringify(json));
          mymodel.set("cue_cubicacion", view.down("#moreInfoText").getValue());
        }
        //mymodel.proxy(model.getProxy())
        mymodel.setConfig({
          proxy: model.getProxy(),
        });
        mymodel.save({
          scope: this,
          callback: function (record, operation) {
            var sb = Ext.getCmp("statusbar");
            if (operation.success) {
              if (operation.action == "create") {
                var modules = Ext.widget("moduletreeview", {
                  store: "CuentaDealerModuleStore",
                });
                var west = Ext.getCmp("west");
                if (west.collapsed) {
                  west.toggleCollapse();
                }
                west.add(modules);
              }

              //guardo datos extras si no existe un registro para esta cuenta lo crea
              Ext.Ajax.request({
                url: "/Rest/Search/m_CuentasXtraInfoUpdateCreate",
                params: {
                  cue_cCustom: view.down("#fieldCustom").getValue(),
                  cue_iidCuenta: mymodel.get("cue_iid"),
                  cue_iImportancia: view.down("#cue_iImportancia").getValue()
                    ? view.down("#cue_iImportancia").getValue()
                    : 0,
                  cue_ilicenciapar: view.down("#cue_ilicenciapar").getValue()
                    ? view.down("#cue_ilicenciapar").getValue()
                    : 0,
                  cue_iTipoServicio: view.down("#comboTiposServicio")
                    ? view.down("#comboTiposServicio").getValue()
                    : 0,
                  cue_cHorasVC: view.down("#cue_cHorasVC")
                    ? view.down("#cue_cHorasVC").getValue()
                    : 0,
                  cue_iVigiladoresVC: view.down("#cue_iVigiladoresVC")
                    ? view.down("#cue_iVigiladoresVC").getValue()
                    : 0,
                },
                method: "GET",
                scope: this,
                success: function (response) {
                  var configs = Ext.JSON.decode(response.responseText);
                  if (configs) {
                    console.log(configs);
                  }
                },
              });
              view.fireEvent("refresh", view);
              notify("Los datos se guardaron con éxito");
              controller.saveNotifiaciones(view);
            } else {
            }
          },
          button: button,
          view: view,
        });
      },
    });
  },

  saveNotifiaciones: function (view) {
    var viewnotificaiones = view.down("cuentanotifiacionesformview");
    var smsasignarcheck = viewnotificaiones.down("#smsasignar").getValue();
    var smsdesasignarcheck = viewnotificaiones
      .down("#smsdesasignar")
      .getValue();
    var emailasignarcheck = viewnotificaiones.down("#emailasignar").getValue();
    var emaildesasignarcheck = viewnotificaiones
      .down("#emaildesasignar")
      .getValue();

    if (smsasignarcheck) {
      if (view.smsasignarRecord) {
        view.smsasignarRecord.setProxy(
          this.getNotificacionesModelModel().getProxy()
        );
        view.smsasignarRecord.set(
          "sms_csmsparaeventos",
          view.record.get("cue_ctelefono")
        );
        view.smsasignarRecord.set(
          "sms_cplantillasms",
          viewnotificaiones.down("#plantillasmsasignar").getValue()
        );
        view.smsasignarRecord.set(
          "sms_imodemsms",
          viewnotificaiones.down("#modemasignar").getValue()
        );

        view.smsasignarRecord.save();
      } else {
        this.getSoftguardSmsModelModel()
          .create({
            sms_csmsparaeventos: view.record.get("cue_ctelefono"), //viewnotificaiones.down('#destinosmsasignar').getValue(),
            sms_cplantillasms: viewnotificaiones
              .down("#plantillasmsasignar")
              .getValue(),
            sms_imodemsms: viewnotificaiones.down("#modemasignar").getValue(),
            sms_meventos: "_DM",
            sms_iidcuenta: view.record.get("cue_iid"),
          })
          .save();
      }
    } else {
      if (view.smsasignarRecord) {
        view.smsasignarRecord.setProxy(
          this.getNotificacionesModelModel().getProxy()
        );
        view.smsasignarRecord.destroy();
      }
    }

    if (smsdesasignarcheck) {
      if (view.smsdesasignarRecord) {
        view.smsdesasignarRecord.setProxy(
          this.getNotificacionesModelModel().getProxy()
        );
        view.smsdesasignarRecord.set(
          "sms_csmsparaeventos",
          view.record.get("cue_ctelefono")
        );
        view.smsdesasignarRecord.set(
          "sms_cplantillasms",
          viewnotificaiones.down("#plantillasmsdesasignar").getValue()
        );
        view.smsdesasignarRecord.set(
          "sms_imodemsms",
          viewnotificaiones.down("#modemsmsdesasignar").getValue()
        );
        view.smsdesasignarRecord.save();
      } else {
        this.getSoftguardSmsModelModel()
          .create({
            sms_csmsparaeventos: view.record.get("cue_ctelefono"), //viewnotificaiones.down('#destinosmsdesasignar').getValue(),
            sms_cplantillasms: viewnotificaiones
              .down("#plantillasmsdesasignar")
              .getValue(),
            sms_imodemsms: viewnotificaiones
              .down("#modemsmsdesasignar")
              .getValue(),
            sms_meventos: "_LM",
            sms_iidcuenta: view.record.get("cue_iid"),
          })
          .save();
      }
    } else {
      if (view.smsdesasignarRecord) {
        view.smsdesasignarRecord.setProxy(
          this.getNotificacionesModelModel().getProxy()
        );
        view.smsdesasignarRecord.destroy();
      }
    }
    //cue_cemail

    if (emailasignarcheck) {
      if (view.emailasignarRecord) {
        view.emailasignarRecord.setProxy(
          this.getNotificacionesModelModel().getProxy()
        );
        view.emailasignarRecord.set(
          "sms_cmailparaeventos",
          view.record.get("cue_cemail")
        );
        view.emailasignarRecord.set(
          "sms_cplantillamail",
          viewnotificaiones.down("#plantillaemailasignar").getValue()
        );
        view.emailasignarRecord.save();
      } else {
        this.getSoftguardSmsModelModel()
          .create({
            sms_cmailparaeventos: view.record.get("cue_cemail"),
            sms_cplantillamail: viewnotificaiones
              .down("#plantillaemailasignar")
              .getValue(),
            sms_meventos: "_DM",
            sms_iidcuenta: view.record.get("cue_iid"),
          })
          .save();
      }
    } else {
      if (view.emailasignarRecord) {
        view.emailasignarRecord.setProxy(
          this.getNotificacionesModelModel().getProxy()
        );
        view.emailasignarRecord.destroy();
      }
    }

    if (emaildesasignarcheck) {
      if (view.emaildesasignarRecord) {
        view.emaildesasignarRecord.setProxy(
          this.getNotificacionesModelModel().getProxy()
        );
        view.emaildesasignarRecord.set(
          "sms_cmailparaeventos",
          view.record.get("cue_cemail")
        );
        view.emaildesasignarRecord.set(
          "sms_cplantillamail",
          viewnotificaiones.down("#plantillaemaildesasignar").getValue()
        );
        view.emaildesasignarRecord.save();
      } else {
        this.getSoftguardSmsModelModel()
          .create({
            sms_cmailparaeventos: view.record.get("cue_cemail"),
            sms_cplantillamail: viewnotificaiones
              .down("#plantillaemaildesasignar")
              .getValue(),
            sms_meventos: "_LM",
            sms_iidcuenta: view.record.get("cue_iid"),
          })
          .save();
      }
    } else {
      if (view.emaildesasignarRecord) {
        view.emaildesasignarRecord.setProxy(
          this.getNotificacionesModelModel().getProxy()
        );
        view.emaildesasignarRecord.destroy();
      }
    }
  },

  onDireccioncopyClick: function (button, event, options) {
    var view = button.up("cuentaformview");
    var mymodel = view.record;
    myform = view.getForm();

    myform.updateRecord(mymodel);
    mymodel.set("cue_ccallecorreo", mymodel.get("cue_ccalle"));
    mymodel.set("cue_clocalidadcorreo", mymodel.get("cue_clocalidad"));
    mymodel.set("cue_cprovinciacorreo", mymodel.get("cue_cprovincia"));
    mymodel.set("cue_ccodigopostalcorreo", mymodel.get("cue_ccodigopostal"));
    myform.loadRecord(mymodel);
  },

  onMapClick: function (button, event, options) {
    var view = button.up("cuentaformview");
    var controller = this;
    var myForm = view.getForm();
    var myrecord = myForm.getRecord();
    var markerTitleDefault =
      (myrecord && myrecord.get("cue_cnombre")) || getLocale("Cuenta");
    var provincia;

    if (view.down("#provincias") && view.down("#provincias").getValue()) {
      provincia = view.down("#provincias").getValue().padEnd(3, " ");
    }

    var calle = myForm.findField("cue_ccalle").getValue();
    myForm.updateRecord(myrecord);
    var mylat = myrecord.get("cue_cLatLng").split(",")[0],
      myLong = myrecord.get("cue_cLatLng").split(",")[1],
      myAddr = calle + ", " + provincia + " ," + view.pais;

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
      geocodePosition: function (pos) {
        var geocoder = this.getGeocoder();
        if (!geocoder || typeof geocoder.geocode !== "function") {
          return;
        }

        geocoder.geocode(
          {
            location: pos,
          },
          function (responses, status) {
            if (
              (status === "OK" || status === undefined || status === true) &&
              responses &&
              responses.length > 0
            ) {
              win.responses = responses;
              win.lastGeocodeResult = responses[0];
              controller.updateGeocodeResultCombo(
                win,
                mappanel,
                responses,
                markerTitleDefault
              );
              controller.updateMapFormFromResult(win, responses[0]);
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
            title: myrecord.get("cue_cnombre"),
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
            },
          },
        },
      });
    } else {
      Ext.apply(mappanel, {
        zoomLevel: 14,
        setCenter: {
          geoCodeAddr: myAddr,
          marker: {
            title: myrecord.get("cue_cnombre"),
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
            },
          },
        },
      });
    }
    var geocodeResultStore = Ext.create("Ext.data.Store", {
      fields: ["id", "label", "lat", "lng", "raw"],
    });

    var win = Ext.create("Ext.Window", {
      layout: {
        type: "vbox",
        align: "stretch",
      },
      title: "Mapa",
      closeAction: "hide",
      itemId: "mapWindow",
      width: 550,
      height: 550,
      border: true,
      modal: true,
      view: view,
      tbar: [
        { text: "Posicionar", action: "posicionar", itemId: "posicionar" },
        { text: "Guardar", action: "save" },
      ],
      items: [
        {
          xtype: "form",
          itemId: "mapAddress",
          width: "100%",
          listeners: {
            afterrender: function () {
              this.down("#comboProvincia").setValue(provincia);
            },
          },
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Calle",
              value: myForm.findField("cue_ccalle").getValue(),
              name: "calle",
              itemId: "calle",
            },
            {
              xtype: "textfield",
              fieldLabel: "Ciudad",
              value: myForm.findField("cue_clocalidad").getValue(),
              name: "localidad",
            },
            {
              xtype: "combo",
              fieldLabel: "Provincia / Estado",
              store: "ProvinciasStore",
              name: "provincia",
              value: provincia,
              displayField: "pro_cdescripcion",
              plugins: ["clearbutton"],
              editable: true,
              autoSelect: false,
              forceSelection: false,
              itemId: "comboProvincia",
              valueField: "pro_ccodigo",
            },
            {
              xtype: "combo",
              fieldLabel: getLocale("Resultados"),
              itemId: "geocodeResults",
              hidden: true,
              queryMode: "local",
              displayField: "label",
              valueField: "id",
              forceSelection: false,
              editable: false,
              store: geocodeResultStore,
              emptyText: getLocale("Seleccione una coincidencia"),
              listeners: {
                select: function (combo, record) {
                  controller.onGeocodeResultSelect(
                    win,
                    mappanel,
                    record ? record.get("raw") : null,
                    markerTitleDefault
                  );
                },
              },
            },
          ],
        },
        mappanel,
      ],
    });
    win.mapPanel = mappanel;
    win.geocodeResultStore = geocodeResultStore;
    win.show();

    if (view.profile < 2) {
      win.down("toolbar").show();
      Ext.Array.each(
        win.down("form").getForm().getFields().items,
        function (field) {
          field.setDisabled(true);
        }
      );
    }
  },

  showAudit: function () {
    var myform = this.getFormAccount().getForm();
    var myvalues = myform.getValues();
    var myrecord = myform.getRecord();
    var objectType = 3001;
    var objectId = myrecord.data["Id"];

    var clinea = myrecord.data["cue_clinea"];
    var ncuenta = myrecord.data["cue_ncuenta"];
    var cnombre = myrecord.data["cue_cnombre"];

    var mytitle = clinea + "-" + ncuenta + " " + cnombre;

    var mylocation = "/a/audit/";
    var myaudit = Ext.create("Ext.ux.SimpleIFrame", {
      border: false,
      src: mylocation,
    });

    Ext.create("Ext.Window", {
      title: mytitle,
      height: 400,
      width: 430,
      closeAction: "hide",
      border: false,
      layout: "fit",
      items: myaudit,
    }).show();
  },

  onPhotoClick: function (button, event, options) {
    var view = button.up("cuentaformview");
    var form = view.getForm();
    var record = view.record;
    var photo = record.get("cue_cfoto");
    var name = record.get("cue_cnombre");
    var tbar = [];

    if (view.cuentaformProfile >= 2) {
      tbar = [
        Ext.create("widget.uploadbutton", {
          itemId: "dragupload",
          text: "Subir Foto",
          plugins: [
            {
              ptype: "uploadwindow",
              title: "Subir Foto",
              width: 350,
              height: 150,
            },
          ],
          uploader: {
            url: "/rest/upload/new?search=softguardMiscFile",
            uploadpath: "",
            multi_selection: false,
            autoStart: true,
            maxFileSize: "50mb",

            dropElement: "cuentaFotoImage",

            statusQueuedText: getLocale("Listo para subir"),
            statusUploadingText: getLocale("Subiendo") + " ({0}%)",
            statusFailedText: '<span style="color: red">Error</span>',
            statusDoneText: '<span style="color: green">Completo</span>',
            statusInvalidSizeText: "Archivo demasiado largo",
            statusInvalidExtensionText: "Formato inválido",
          },
          listeners: {
            filesadded: function (uploader, files) {
              return true;
            },

            beforeupload: function (uploader, file) {
              var url = "/rest/upload/new?search=softguardMiscFile";
              if (this.path) {
                url = url + "&Path=" + me.path;
              }

              uploader.uploader.settings.url = url;
            },

            fileuploaded: function (uploader, file) {
              //console.log('fileuploaded');
            },

            uploadcomplete: function (uploader, success, failed) {
              var file = success.pop();
              w.down("image").setSrc("/gallery/" + file.name);
              record.set("cue_cfoto", file.name);
              form.findField("cue_cfoto").setValue(file.name);

              record.save({
                callback: function (record, operation) {
                  if (operation.success) {
                    notify("Los cambios se han guardado con exito");
                  }
                },
              });
            },
            scope: this,
          },
        }),
        {
          text: "eliminar",
          iconCls: "icon-delete",
          itemId: "fotodelete",
          handler: function () {
            var win = this.up("window");
            var record = win.record;
            record.set("cue_cfoto", "");
            record.save();
            win.down("image").setSrc("/gallery/");
            //win.close();
          },
        },
      ];
    }

    var w = Ext.widget("window", {
      title: "Foto: ",
      height: 252,
      width: 360,
      closeAction: "destroy",
      border: false,
      layout: "fit",
      record: record,
      tbar: tbar,
      items: [
        {
          xtype: "image",
          src: "/gallery/" + photo,
          id: "cuentaFotoImage",
        },
      ],
      autoShow: true,
      modal: true,
    });
    if (view.subirFotoHide) {
      w.down("#dragupload").hide();
      w.down("#fotodelete").hide();
    }
    w.model = form.getRecord();
  },

  onPasschangeClick: function (button, event, options) {
    var view = button.up("cuentaformview");
    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Cambio de clave",
      closeAction: "hide",
      caller: view.down("cuentadatosformview"),
      fieldName: "cue_cclave",
      fieldId: "clave",
      modal: true,
      width: 300,
      height: 150,
      border: false,
      items: { xtype: "passwordformview" },
    });
    win.show();
  },

  onPasswordChanged: function (value, win) {
    var fieldname = win.fieldName;
    var fieldId = win.fieldId;

    var view = win.caller;
    view.record.set(fieldname, value);

    if (fieldId) view.down("#" + fieldId).setValue(value);
    if (view.down("#" + fieldId + "Txt")) {
      view.down("#" + fieldId + "Txt").setValue(value);
    } else view.getForm().findField(fieldname).setValue(value);
  },

  onPosicionarClick: function (button, event, options) {
    var win = button.up("#mapWindow");
    var view = win.view;
    var form = win.down("form").getForm();
    var map = win.down("gmappanel6");
    var provincia = form.findField("provincia").getRawValue();
    var calle = form.findField("calle").getValue();
    var localidad = form.findField("localidad").getValue();
    var myAddr = calle + " ," + localidad + " ," + provincia + " ," + view.pais;
    var controller = this;
    var markerTitle = markerTitleDefault;

    if (!map || !myAddr) {
      notifyError(getLocale("Debe ingresar una dirección para posicionar."));
      return;
    }

    button.setDisabled(true);
    controller.geocodeAddressForMap(
      map,
      myAddr,
      markerTitle,
      function (success, marker, geocodeResult, status, allResults) {
        button.setDisabled(false);

        if (!win || win.destroyed) {
          return;
        }

        if (success && marker) {
          win.mapMarker = marker;
          win.lastGeocodeResult = geocodeResult;
          controller.updateGeocodeResultCombo(
            win,
            map,
            allResults || (geocodeResult ? [geocodeResult] : []),
            markerTitle
          );
          controller.updateMapFormFromResult(win, geocodeResult);
        } else {
          controller.clearGeocodeResultCombo(win);
          var message =
            status === "ZERO_RESULTS"
              ? getLocale(
                  "No se encontraron coincidencias para la búsqueda ingresada."
                )
              : getLocale(
                  "No se pudo determinar una ubicación para la dirección indicada."
                );
          notifyError(message);
        }
      }
    );
  },

  onMapSaveClick: function (button, event, options) {
    var win = button.up("#mapWindow");
    var view = win.view;
    var form = win.down("form").getForm();
    var map = win.down("gmappanel6");

    // importante para guardar los datos de lat y lng en el form y luego posicionar la cuenta.
    var latlng = map.getCenterLatLng();
    var field = view.getForm().findField("cue_cLatLng"),
      lat = latlng.lat,
      long = latlng.lng;
    field.setValue(lat + "," + long);
    var latField = view.getForm().findField("_lat");
    var longField = view.getForm().findField("_long");

    latField.setValue(lat);
    longField.setValue(long);

    win.close();
    notify("Posición establecida. Debe guardar.");
  },

  /* Funcion creada para hacer el bind de las particiones, si se hace check en "incluir particiones" */
  onAgregarParticionesChange: function (field, newValue, oldValue, options) {
    var win = field.up("#exportWindow");
    var view = win.view;
    //console.log(view);

    var combo = win.down("#particionescombo");

    if (newValue) {
      combo.show();
    } else {
      combo.hide();
    }
  },

  /* Funcion de exportar a Excel los datos de la cuenta */
  onExportToExcel: function (button, event, options) {
    var controller = this;
    var view = button.up("cuentaformview");
    var url = "/handler/ExportDatosCuentaHTML";
    var win = Ext.create("Ext.Window", {
      layout: "vbox",
      title: "Exportar Reporte",
      alias: "widget.exportfilter",
      closeAction: "destroy",
      width: 450,
      height: 400,
      border: false,
      view: view,
      itemId: "exportWindow",
      items: [
        {
          xtype: "fieldset",
          title: getLocale("Seleccione los datos que incluir el reporte"),
          layout: "vbox",
          items: [
            {
              xtype: "checkboxgroup",
              itemId: "incluirchecks",
              columns: 2,
              vertical: true,
              hideLabel: true,
              width: 450,
              items: [
                {
                  boxLabel: getLocale("Usuarios"),
                  itemId: "chkusuarios",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Telefono"),
                  itemId: "chktelefono",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Zonas"),
                  itemId: "chkzonas",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Notas"),
                  itemId: "chknotas",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Horarios"),
                  itemId: "chkhorarios",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Situacion"),
                  itemId: "chksituacion",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Informacion medica"),
                  itemId: "chkinfomedica",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Falsa Alarma"),
                  itemId: "chkfalsaalarma",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Paneles"),
                  itemId: "chkpaneles",
                  checked: true,
                },
                {
                  boxLabel: getLocale(
                    "Respuesta Automatica / Mails por eventos"
                  ),
                  itemId: "chknotificaciones",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Clave"),
                  itemId: "chkclave",
                  checked: true,
                },
                {
                  boxLabel: getLocale("Conexion celular"),
                  itemId: "chkconexioncelular",
                  checked: true,
                },
              ],
            },
          ],
        },
        {
          xtype: "fieldset",
          title: getLocale("Indique si desea agregar particiones"),
          layout: "vbox",
          width: 400,
          items: [
            {
              xtype: "checkbox",
              itemId: "particiones",
              boxLabel: getLocale("Incluir particiones"),
              labelWidth: 100,
            },
            {
              xtype: "combo",
              itemId: "particionescombo",
              flex: 1,
              /* Indico que campo de la DB que hice Bind deseo mostrar
               * dentro del combo, en este caso fue de ZonaByCuentaSeachModel
               */
              displayField: "cue_cnombre",
              valueField: "cue_iid",
              name: "cue_iid",
              queryMode: "local",
              multiSelect: true,
              hidden: true,
              plugins: ["clearbutton"],
            },
          ],
        },
      ],
      buttons: [
        {
          text: "Exportar",
          handler: function (button) {
            /* Me encuentro dentro del Window creado, por lo que busco hacia abajo
             * el itemId correspondiente a los Checks seleccionados y tomo su valor
             */
            var incluirchecks = win.down("#incluirchecks").getChecked();
            if (incluirchecks) {
              /* Uso el item id como nombre de la variable a pasar y su valor */
              Ext.Array.each(incluirchecks, function (v, k) {
                url = Ext.String.urlAppend(url, v.itemId + "=" + v.checked);
              });
            }
            var particioneschecks = win.down("#particiones").getValue();
            var particionescombo = win.down("#particionescombo").getValue();
            if (particioneschecks) {
              var cue_iid = view.record.get("cue_iid");
              var arrParticiones = [cue_iid];

              if (particionescombo != "") {
                arrParticiones.push(particionescombo);
                var cuentas = arrParticiones.join(",");
              }

              url = Ext.String.urlAppend(
                url,
                "chkparticiones=" + particioneschecks
              );
              url = Ext.String.urlAppend(url, "cuentaId=" + cuentas);
            } else {
              url = Ext.String.urlAppend(
                url,
                "cuentaId=" + view.record.get("cue_iid")
              );
            }

            /* Pongo el flag de export en Yes y procede a exportar */
            var exportToExcel = "yes";
            if (exportToExcel) {
              url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
            }
            /* Agrego campo _DC */
            url = Ext.String.urlAppend(url, "_dc=" + new Date().getTime());
            /* Agrego token */
            url = Ext.String.urlAppend(
              url,
              "token=" + Ext.util.Cookies.get("OAuth_Token")
            );

            console.log(url);

            location.href = url;
            win.hide();
          },
        },
        {
          text: "Cancelar",
          handler: function () {
            win.hide();
          },
        },
      ],
      listeners: {
        afterrender: function (win) {
          var cue_iid = view.record.get("cue_iid");
          var arrParticiones = [cue_iid];
          var combo = win.down("#particionescombo");

          /* Cargo el combo correspondiente a Particiones */
          var particionesStore = Ext.create("Ext.data.Store", {
            model: controller.getZonaByCuentaSearchModelModel(),
            remoteFilter: true,
            listeners: {
              beforeload: function (store, operation) {
                operation.params = { cuentaId: view.record.get("cue_iid") };
              },
            },
            filters: [
              {
                property: "zon_ccodigo:like",
                value: "PAR",
              },
            ],
          });

          combo.bindStore(particionesStore);
          particionesStore.load();
        },
      },
    });
    win.show();
  },

  /** Funcion de mas informacion en Ubicacion. */
  onMoreInfoClick: function (button, e, eOpts) {
    var controller = this;
    var view = button.up("cuentaformview");
    var record = view.record;

    // Creo al vuelo window de datos extras
    var win = Ext.create("Ext.Window", {
      layout: {
        type: "vbox",
        align: "stretch",
      },
      title: "Más información",
      closeAction: "hide",
      itemId: "moreInfoWindow",
      width: 350,
      height: 300,
      border: true,
      modal: true,
      record: record,
      caller: view,
      tbar: [{ text: "Guardar", action: "save" }],
      items: [
        {
          xtype: "form",
          itemId: "extraInfoUbicacion",
          width: "100%",
          items: [
            {
              xtype: "textfield",
              itemId: "ubicacion",
              name: "ubicacion",
              hidden: true,
            },
            {
              xtype: "textfield",
              fieldLabel: "Entre calles",
              labelWidth: 120,
              value: "",
              name: "entreCalleA",
              itemId: "entreCalleA",
              margin: "10 0",
            },
            {
              xtype: "textfield",
              labelWidth: 120,
              value: "",
              name: "entreCalleB",
              itemId: "entreCalleB",
              margin: "10 0 10 125",
            },
            {
              xtype: "textfield",
              fieldLabel: "Torre",
              labelWidth: 120,
              value: "",
              name: "torre",
              itemId: "torre",
              margin: "10 0",
            },
            {
              xtype: "textfield",
              fieldLabel: "Piso",
              labelWidth: 120,
              value: "",
              name: "piso",
              itemId: "piso",
              margin: "10 0",
            },
            {
              xtype: "textfield",
              fieldLabel: "Dpto",
              labelWidth: 120,
              value: "",
              name: "dpto",
              itemId: "dpto",
              margin: "10 0",
            },
            {
              xtype: "textfield",
              fieldLabel: "Barrio",
              labelWidth: 120,
              value: "",
              name: "barrio",
              itemId: "barrio",
              margin: "10 0",
            },
            {
              xtype: "textfield",
              fieldLabel: "Manzana",
              labelWidth: 120,
              value: "",
              name: "manzana",
              itemId: "manzana",
              margin: "10 0",
            },
          ],
        },
      ],
    });
    win.show();
  },

  /** Funcion de carga cuando se abre la window de informacion extra de ubicacion */
  loadExtraUbicationData: function (win) {
    var controller = this;
    var record = win.record;
    /**
     * Obtengo la ubicacion del record de la view de cuentaform
     */
    var ubicacionOriginal = record.get("cue_cubicacion");
    var json = controller.getMasInfoJson(win.caller);

    // Busco los elemento del DOM de la window
    var ubicacion = win.down("#ubicacion");
    var entreCalleA = win.down("#entreCalleA");
    var entreCalleB = win.down("#entreCalleB");
    var torre = win.down("#torre");
    var piso = win.down("#piso");
    var dpto = win.down("#dpto");
    var barrio = win.down("#barrio");
    var manzana = win.down("#manzana");

    // Asigno los valores del json parseado
    ubicacion.setValue(json.ubicacion);
    entreCalleA.setValue(json.entreCalleA);
    entreCalleB.setValue(json.entreCalleB);
    torre.setValue(json.torre);
    piso.setValue(json.piso);
    dpto.setValue(json.dpto);
    barrio.setValue(json.barrio);
    manzana.setValue(json.manzana);
  },

  /** evento de boton al guardar datos extras de ubicacioon */
  saveExtraUbicationData: function (button, e, eOpts) {
    var controller = this;
    var win = button.up("window");
    var view = win.caller;

    // Busco los elemento del DOM de la window
    var ubicacion = win.down("#ubicacion").getValue();
    var entreCalleA = win.down("#entreCalleA").getValue();
    var entreCalleB = win.down("#entreCalleB").getValue();
    var torre = win.down("#torre").getValue();
    var piso = win.down("#piso").getValue();
    var dpto = win.down("#dpto").getValue();
    var barrio = win.down("#barrio").getValue();
    var manzana = win.down("#manzana").getValue();

    // creo el objeto
    var json = controller.getMasInfoJson(view);

    // Asigno los valores al objeto
    json.ubicacion = ubicacion;
    json.entreCalleA = entreCalleA;
    json.entreCalleB = entreCalleB;
    json.torre = torre;
    json.piso = piso;
    json.dpto = dpto;
    json.barrio = barrio;
    json.manzana = manzana;

    // guardo en el elemento oculto de la vista cuentadatosformview con Id moreInfoText
    controller.setMasInfoJson(view, json);

    win.close();
    controller.onSaveCimei(win);
  },
});
