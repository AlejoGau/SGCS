Ext.define("Common.controller.OrganizationGridController", {
  extend: "Ext.app.Controller",
  stores: [
    "Common.store.OrganizationStatusStore",
    "Common.store.OrganizationStatusFilterStore",
  ],
  models: [
    "OrganizationRangoSearchModel",
    "OrganizationCuentaRangoSearchModel",
    "MGClientSinEntidadModel",
    "OrganizationModel",
    "SecurityModulesModel",
    "SmartMailProgramModel",
    "GeographyOrgGridModel",
    "OrganizationSearchModel",
  ],
  views: ["OrganizationGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      organizationgridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        showCuentaCorriente: this.onShowCuentaCorriente,
        showWallpaper: this.onShowWallpaper,
        refresh: this.onRefresh,
      },
      "organizationgridview button[action=search]": {
        click: this.onSearchClick,
      },
      "organizationgridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "organizationgridview #crearFromCuenta": {
        click: this.onCrearFromCuentaClick,
      },
      "organizationgridview button[action=createorganization]": {
        click: this.onCreateOrganizationClick,
      },
      "organizationgridview button[action=filterProspectos]": {
        click: this.onProspectosClick,
      },
      "organizationgridview button[action=filterOportunidades]": {
        click: this.onOportunidadesClick,
      },
      "organizationgridview button[action=filterClientes]": {
        click: this.onClientesClick,
      },
      "organizationgridview button[action=filterLanding]": {
        click: this.onLandingClick,
      },
      "organizationgridview #importMG": {
        click: this.onImportMGClick,
      },
      "organizationgridview #filterEliminadas": {
        click: this.onEliminadasClick,
      },
      "organizationgridview button[action=smartmail]": {
        click: this.onSmartMailClick,
      },
      "organizationgridview button[action=misorganizaciones]": {
        click: this.onMisOrganizacionesClick,
      },
      "organizationgridview menu checkbox": {
        //change: this.onFilterCheckBox
      },
    });
  },

  onRefresh: function (view) {
    view.getStore().load();
  },

  /**
   * Helper function para ocultar componentes de forma segura
   * Valida que el componente existe antes de ocultarlo
   */
  safeHideComponent: function (view, componentId) {
    if (!view || !componentId) return;
    var component = view.down(componentId);
    if (component) {
      component.hide();
    }
  },

  initView: function (view) {
    var status = view.forceStatus;
    var controller = this;
    var filters = [];
    if (status) {
      /*             filters.push({
                property: 'Status:ININT',
                value: status,
                id: 'status'
            }); */
    }

    if (view.forceType) {
      filters.push({
        property: "OrganizationType:IN",
        value: view.forceType,
        id: "OrganizationType",
      });

      if (view.forceType == "PROV") {
        controller.safeHideComponent(view, "#filterClientes");
        controller.safeHideComponent(view, "#filterOportunidades");
        controller.safeHideComponent(view, "#filterProspectos");

        var createOrg = view.down("#createorganization");
        if (createOrg) createOrg.setText(getLocale("Nuevo proveedor"));

        controller.safeHideComponent(view, "#Status");
      }

      if (view.forceType == "CLI") {
        var createOrgCli = view.down("#createorganization");
        if (createOrgCli) createOrgCli.setText(getLocale("Nuevo cliente"));
      }
    }

    if (view.hideDealerCuenta == true) {
      controller.safeHideComponent(view, "#dealer-cuenta");
    }

    if (view.hideLanding == true) {
      controller.safeHideComponent(view, "#filterLanding");
    }

    // DSS-1511: Para usuarios MasterWebDealer (Dealer), filtrar organizaciones
    // para que solo vean las que pertenecen a su empresa (RelationParent).
    controller.isMasterWebDealer(function (isMaster) {
      if (isMaster && _UserData && _UserData.Company) {
        filters.push({
          property: 'Organization:RelationParent',
          value: _UserData.Company,
          id: 'RelationParent'
        });
      }
    });

    view.filters = filters;
    var store = Ext.create("Ext.data.Store", {
      model: controller.getOrganizationSearchModelModel(),
      pageSize: 50,
      filters: filters,
      sorters: [{ property: "o.name", direction: "asc" }],
      remoteSort: true,
      remoteFilter: true,
    });
    view.bindStore(store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);

    store.load();

    // si fijo un estado saco los filtros rapidos
    if (status) {
      controller.safeHideComponent(view, "#filterEliminadas");
      controller.safeHideComponent(view, "#filterClientes");
      controller.safeHideComponent(view, "#filterOportunidades");
      controller.safeHideComponent(view, "#filterProspectos");
    }

    if (view.hideEmail) {
      controller.safeHideComponent(view, "#smartmail");
      if (
        view.headerCt &&
        view.headerCt.items &&
        view.headerCt.items.items &&
        view.headerCt.items.items[0]
      ) {
        view.headerCt.items.items[0].hidden = true;
      }
      //view.columns[0].hide(); // Oculto el checkbox
    }

    if (view.hideGroups) {
      controller.safeHideComponent(view, "#profile");
    }

    if (view.hideImportEntities) {
      controller.safeHideComponent(view, "#crearFromCuenta");
    }

    if (view.hideImportMg) {
      controller.safeHideComponent(view, "#importMG");
    }

    //if(view.showLanding) { se oculta por reorganización de filtros
    //    view.down('#filterLanding').show()
    //   view.down('gridcolumn[dataIndex=cnc_type]').show()
    //}
    /** 12/11/2020 Daniel O. Medina */
    /** https://basecamp.com/2249105/projects/14758734/todos/428889380
     *  agrego filtro desde/hasta en fecha de creación
     */

    view
      .down("#status")
      .bindStore(deepCloneStore(this.getOrganizationStatusStoreStore()));
    //view.down('#comboStateFiltro').bindStore(deepCloneStore(this.getOrganizationStatusFilterStoreStore()));

    var stateStore = Ext.create("Ext.data.Store", {
      model: this.getGeographyOrgGridModelModel(),
      autoLoad: false,
      pageSize: 10000,
      sorters: [
        {
          property: "Name",
          direction: "ASC",
        },
      ],
      remoteFilter: true,
    });
    view.down("#comboProvinciaOrgGrid").bindStore(stateStore);
    stateStore.load();
    var countryStore = Ext.create("Ext.data.Store", {
      model: this.getGeographyOrgGridModelModel(),
      storeId: "countryStore",
      remoteFilter: true,
      pageSize: 10000,
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
    view.down("#comboPaisOrgGrid").bindStore(countryStore);
    countryStore.load();

    /********************************************************************** */
  },

  /*    onFilterCheckBox: function( checkbox, newValue, oldValue, eOpts  ) {
        checkbox.up('fieldset').items.items.forEach(function(item){
            if(item.items.items[0].itemId != checkbox.itemId){
                if(newValue == true)
                    item.items.items[0].setValue(false);

            }else{
                console.log('Es el checkbox seleccionado');
            }
        });
        return newValue;

    }, */

  isMasterWebDealer: function (callback) {
    var storeSecurity = SecurityModulesStore; //Ext.data.StoreManager.lookup('SecurityModulesStore');
    var masterModule = storeSecurity.findRecord(
      "KeyReference",
      "MasterWebDealer",
    );
    var adminModule = storeSecurity.findRecord("KeyReference", "Administrator");

    if (
      masterModule && masterModule.get("Available") == true &&
      (!adminModule || !adminModule.get("Available"))
    ) {
      callback(true);
    } else {
      callback(false);
    }
  },

  onShowCuentaCorriente: function (record, view) {
    var id = record.get("Id");
    var panel = view.targetTab ? view.targetTab : view.up("tabpanel");
    var title = record.get("Name") + " " + getLocale("Cuenta Corriente");
    var widget = "cuentacorrientepanelview";

    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget(widget, {
        iconCls: "icon-money-dollar",
        title: title,
        translate: false,
        targetTab: panel,
        objectId: id,
        closable: true,
        caller: view,
        record: record,
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },

  onShowWallpaper: function (record, view) {
    var id = record.get("Id");
    var panel = view.targetTab ? view.targetTab : view.up("tabpanel");
    var title = record.get("Name") + " " + getLocale("Wallpapers");
    var widget = "documentosgridview";

    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget(widget, {
        iconCls: "icon-photos",
        title: title,
        translate: false,
        targetTab: panel,
        objectId: id,
        closable: true,
        caller: view,
        record: record,
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },

  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");
    var view = grid.up("gridpanel") ? grid.up("gridpanel") : grid;
    var controller = this;
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = record.get("Name");

    title = title
      .replace(/,/g, "")
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .replace(/#/g, "")
      .replace(/\./g, "")
      .replace(/>/g, "");

    if (title == "") {
      title = getLocale("Organización") + " " + id;
    }

    var widget = view.editorView ? view.editorView : "organizationview";

    record.recordOrganizacion = record;
    recordLanding = record.recordOrganizacion.get("cnc_name");

    // BC 371734102 : Modificado desde acá para agregar seguridad SOLO si el item es con CNC_NAME = "LANDING"
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');

    if (!mytab) {
      if (recordLanding != "") {
        // Si el recordLanding es LANDING aplico la seguridad del Módulo
        var newTab = Ext.widget(widget, {
          iconCls: "icon-Organization",
          title: title,
          section: view.record,
          translate: false,
          targetTab: panel,
          objectId: id,
          closable: true,
          caller: view,
          hideStatusGroup: view.hideStatusGroup,
          forceStatusCreation: view.forceStatusCreation,
          hideLeftNav: view.hideLeftNav,
          record: record,
          recordSearch: record,
          enableCliente: view.enableCliente,
          security: view.security,
        });
        panel.add(newTab);
        panel.setActiveTab(newTab);
      } else {
        //controller.getOrganizationModelModel().load(record.get('Id'),{callback:function (record) {
        var newTab = Ext.widget(widget, {
          iconCls: "icon-Organization",
          itemId: "organizationId-" + id,
          title: title,
          section: view.record,
          translate: false,
          targetTab: panel,
          objectId: id,
          closable: true,
          caller: view,
          hideStatusGroup: view.hideStatusGroup,
          forceStatusCreation: view.forceStatusCreation,
          hideLeftNav: view.hideLeftNav,
          record: record,
          recordSearch: record,
          enableCliente: view.enableCliente,
        });

        panel.add(newTab);
        panel.setActiveTab(newTab);
        //}})
      }
    }
    // el existe, lo activo
    else {
      panel.setActiveTab("organizationId-" + id);
    }
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  onGetAllClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = view.getStore();
    store.clearFilter(true); // tomar los filtros de base.
    store.filter(view.filters);

    view.down("#fieldsetChk").items.items.forEach(function (item) {
      item.items.items[0].setValue(false);
    });
    // borrar los campos de filtros
    view.down("#Name").setValue("");

    view.down("#dealer").setValue("");
    view.down("#cuenta").setValue("");
    view.down("#status").setValue("");
    view.down("#comboPaisOrgGrid").setValue("");
    view.down("#comboProvinciaOrgGrid").setValue("");
    view.down("#localidad").setValue("");
    view.down("#direccion").setValue("");
    view.down("#telefonos").setValue("");

    view.down("#codigoPostal").setValue("");
    view.down("#email").setValue("");

    var buttons = view.query('button[toggleGroup="filter"]');

    Ext.Array.each(buttons, function (btn) {
      btn.toggle(false, true);
    });
    store.load();
    var menu = view.down("menu");
    if (menu) {
      menu.hide();
    }
  },

  onMisOrganizacionesClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = view.getStore();
    var query = view.down("#query");
    //var field = view.down('#fieldName');

    var filters = [];
    if (button.pressed) {
      /* filters.push(view.misorganizaciones)*/
    }

    if (filters) store.filter(filters);
    else store.clearFilter();
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = view.getStore();
    //var field = view.down('#fieldName');

    var taxonomytree = view.query("taxonomiesmastertree");
    if (taxonomytree && taxonomytree.length) {
      taxonomytree = taxonomytree[0];
    }
    var taxonomiesSelected = [];

    if (taxonomytree && taxonomytree.getStore) {
      taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
    }

    var taxonomiesArray = [];
    var filters = [];
    var name = view.down("#Name").getValue();
    var legalname = view.down("#LegalName").getValue();

    /** 12/11/2020 Daniel O. Medina */
    /** https://basecamp.com/2249105/projects/14758734/todos/428889380
     *  agrego filtro desde/hasta en fecha de creación
     */
    var dateDesde = view.down("#dateCreatedDesde").getValue();
    var dateHasta = view.down("#dateCreatedHasta").getValue();
    /********************************************* */
    var organizacionesChk = view.down("#organizacionesChk").getValue();
    var prospectosChk = view.down("#prospectoChk").getValue();
    var enprocesoChk = view.down("#enprocesoChk").getValue();
    var inactivoChk = view.down("#inactivoChk").getValue();
    var landingChk = view.down("#landingChk").getValue();
    var dealer = view.down("#dealer").getValue();
    var cuenta = view.down("#cuenta").getValue();
    var estado = view.down("#status").getValue();
    var pais = view.down("#comboPaisOrgGrid").getValue();
    var provincia = view.down("#comboProvinciaOrgGrid").getValue();
    var localidad = view.down("#localidad").getValue();
    var direccion = view.down("#direccion").getValue();
    var telefonos = view.down("#telefonos").getValue();

    var codigoPostal = view.down("#codigoPostal").getValue();
    var email = view.down("#email").getValue();
    var filterValueCheck = "";
    console.log(
      "Provincia: " + provincia + " pais: " + pais + " localidad: " + localidad,
    );

    if (name) {
      filters.push({
        property: "o.[Name]:LIKE",
        value: name,
        id: "Name",
      });
    }
    if (legalname) {
      filters.push({
        property: "o.[LegalName]:LIKE",
        value: legalname,
        id: "legalname",
      });
    }
    if (dealer) {
      filters.push({
        property: "cue_clinea",
        value: dealer,
        id: "cue_clinea",
      });
    }
    if (cuenta) {
      filters.push({
        property: "cue_ncuenta",
        value: cuenta,
        id: "cue_ncuenta",
      });
    }
    if (dateDesde) {
      filters.push({
        property: "o.[DateCreated]:GTEDATESTRING",
        value: Ext.Date.format(dateDesde, "Y-m-d"),
        id: "dateGTE",
      });
    }
    if (dateHasta) {
      filters.push({
        property: "o.[DateCreated]:LTEDATESTRING",
        value: Ext.Date.format(
          Ext.Date.add(dateHasta, Ext.Date.DAY, 1),
          "Y-m-d",
        ),
        id: "dateLTE",
      });
    }

    if (estado) {
      filters.push({
        property: "status",
        value: estado,
        id: "status",
      });
    }

    if (pais) {
      filters.push({
        property: "Country",
        value: pais,
        id: "pais",
      });
    }
    if (provincia) {
      filters.push({
        property: "State",
        value: provincia,
        id: "provincia",
      });
    }
    if (localidad) {
      filters.push({
        property: "o.[City]:LIKE",
        value: localidad,
        id: "localidad",
      });
    }
    if (direccion) {
      filters.push({
        property: "o.[Address]:LIKE",
        value: direccion,
        id: "calle",
      });
    }
    if (telefonos) {
      filters.push({
        property: "o.[Phone]",
        value: telefonos,
        id: "telefonos",
      });
    }
    if (codigoPostal) {
      filters.push({
        property: "o.[Zip]",
        value: codigoPostal,
        id: "codigoPostal",
      });
    }
    if (email) {
      filters.push({
        property: "o.[Email]",
        value: email,
        id: "email",
      });
    }

    if (prospectosChk == true) {
      filterValueCheck = filterValueCheck + "1,2,3,";
      /*             filters.push({
                property:'Status:ININT',
                value:'1,2,3',
                //id: 'status'
            }); */
    }
    if (enprocesoChk == true) {
      filterValueCheck = filterValueCheck + "4,5,6,";
      /*filters.push({
                property:'Status:ININT',
                value:'4,5,6',
                //id: 'status'
            });*/
    }
    if (organizacionesChk == true) {
      filterValueCheck = filterValueCheck + "7,8,9,";
      /*filters.push({
                property:'Status:ININT',
                value:'7,8,9',
                //id: 'status'
            });*/
    }
    if (inactivoChk == true) {
      filterValueCheck = filterValueCheck + "0,";
      /*filters.push({
                property:'Status',
                value:'0',
                //id: 'status'
            });*/
    }
    if (landingChk == true) {
      //filterValueCheck=filterValueCheck+'1'
      filters.push({
        property: "tax.type",
        value: "1",
        id: "tax.type",
      });
    }
    if (filterValueCheck != "") {
      filterValueCheck = filterValueCheck.slice(
        0,
        filterValueCheck.lastIndexOf(","),
      );
      filters.push({
        property: "Status:ININT",
        value: filterValueCheck,
        //id: 'status'
      });
    }
    var orChk = view.down("#or");
    var or = orChk && orChk.checked ? ":OR" : "";

    Ext.Array.each(
      taxonomiesSelected,
      function (rec) {
        if (rec.get("checked")) {
          taxonomiesArray.push(rec.get("Id"));
        }
      },
      this,
    );

    var taxonomies = taxonomiesArray.join();

    if (taxonomiesArray.length > 0) {
      filters.push({
        property: "Taxonomy" + or,
        value: taxonomies,
        id: "taxonomy",
      });
    }

    if (
      view.down("#misorganizaciones") &&
      view.down("#misorganizaciones").pressed
    ) {
      /*filter.push(view.misorganizaciones)*/
    }

    if (filters.length > 0) {
      store.clearFilter(true);
      store.filter(filters);
      console.log("Filtros final: ", store.filters);
    } else {
      store.clearFilter();
    }
    var filterMenu = view.down("menu");
    if (filterMenu) {
      filterMenu.hide();
    }
  },

  onCreateOrganizationClick: function (button, event, options) {
    var id = 0;
    var view = button.up("organizationsearchview");

    if (view.forceStatusCreation) {
      var status = view.forceStatusCreation;
    } else {
      var status = view.forceStatus ? view.forceStatus : "7";
      if (status.split(",").length > 0) {
        status = status[0];
      }
    }

    var me = this;
    var _OrganizationType = view.forceType ? view.forceType : "";

    model = this.getOrganizationModelModel();

    var _name = getLocale("Nueva Organización");

    if (view.forceType == "CLI") {
      _name = getLocale("Nuevo cliente");
    } else if (view.forceType == "PROV") {
      _name = getLocale("Nuevo proveedor");
    }

    var record = model.create({
      Id: 0,
      Name: _name,
      Status: status,
      OrganizationType: _OrganizationType,
    });

    this.onItemClick(view, record);
  },

  onCrearFromCuentaClick: function (button, event, options) {
    var view = button.up("organizationgridview");

    Ext.widget("window", {
      title: "Importar desde cuentas",
      width: 800,
      height: 500,
      closable: true,
      layout: "fit",
      closeAction: "destroy",
      items: Ext.widget("organizationfromcuentagridview", {
        title: "",
        organizations: view.getStore()?.data?.items ?? [],
      }),
    }).show();
  },

  onImportMGClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = Ext.create("Ext.data.Store", {
      model: this.getMGClientSinEntidadModelModel(),
      remoteFilter: true,
      autoload: false,
    });

    store.load({
      callback: function (records, operation) {
        var totalRecords = operation.resultSet.totalRecords;
        if (totalRecords > 0) {
          var msgText = getLocale(
            "%Se van a crear% " +
              totalRecords +
              " %entidades. Utilizando datos de MoneyGuard.%",
          );
          //  msgText = msgText.replace(/\{registros\}/, totalRecords);

          Ext.MessageBox.show({
            title: "Crear Entidades",
            buttons: Ext.MessageBox.YESNO,
            msg: msgText,
            fn: function (btn) {
              if (btn == "yes") {
                Ext.Ajax.request({
                  url: "/Rest/Search/CreateOrganizationForOrphanMoneyguard",
                  success: function (response) {
                    // view.down('pagingtoolbar').doRefresh();
                    view.getStore().load();
                  },
                });
              }
            },
          });
        } else {
          notifyError("No hay clientes sin importar.");
        }
      },
    });
  },

  onProspectosClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = view.getStore();
    store.filters.clear(false);
    if (button.pressed) {
      store.currentPage = 1;
      store.filter([
        {
          property: "Status:ININT",
          value: "1,2,3",
          id: "status",
        },
      ]);
      view.down("#Name").setValue("");
    } else {
      store.load();
    }
  },

  onOportunidadesClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = view.getStore();
    store.filters.clear(false);
    if (button.pressed) {
      store.currentPage = 1;
      store.filter([
        {
          property: "Status:ININT",
          value: "4,5,6",
          id: "status",
        },
      ]);
      view.down("#Name").setValue("");
    } else {
      store.load();
    }
  },

  onLandingClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = view.getStore();
    store.filters.clear(false);

    if (button.pressed) {
      /*
            11/05/2023 Daniel O. Medina este cambio se debe a que ahora la grilla de 
            organization apunta a otro stored procedure: [SearchOrganizationOuterApplyTaxonomy]
            Donde se usa Outer Apply y para filtrar los campos taxonomies no se va a usar
            el parametro filter para incluir los filtros sino a través del store.proxy.extraParams         
            store.currentPage = 1;
            */
      store.filter([
        {
          property: "tax.type",
          value: "1",
          id: "tax.type",
        },
      ]);
      /*store.proxy.extraParams = {
                taxonomytype : '1'           
            };*/
      store.load();
      view.down("#Name").setValue("");
    } else {
      store.proxy.extraParams = {};
      store.load();
    }
  },

  onClientesClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = view.getStore();
    store.filters.clear(false);
    if (button.pressed) {
      store.currentPage = 1;
      store.filter([
        {
          property: "Status:ININT",
          value: "7,8,9",
          id: "status",
        },
      ]);
      view.down("#Name").setValue("");
    } else {
      store.load();
    }
  },

  onEliminadasClick: function (button, event, options) {
    var view = button.up("organizationgridview");
    var store = view.getStore();
    store.filters.clear(false);
    if (button.pressed) {
      store.currentPage = 1;
      store.filter([
        {
          property: "Status",
          value: "0",
          id: "status",
        },
      ]);
      view.down("#Name").setValue("");
    } else {
      store.load();
    }
  },

  onSmartMailClick: function (btn) {
    var view = btn.up("organizationgridview");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = "Envío masivo";

    var filters = [];

    var selection = view.getSelectionModel().getSelection();

    // busco si estan seleccionados todos.
    var headerCt = view.headerCt;
    var checkHd = headerCt.child("gridcolumn[isCheckerHd]");
    var all = checkHd.el.hasCls(Ext.baseCSSPrefix + "grid-hd-checker-on");

    var store = view.getStore();
    var selectedAllLoaded = all && store && selection.length === store.getCount();
    var selectedAllRemote = selectedAllLoaded && store.getTotalCount && store.getTotalCount() > store.getCount();

    if (selection.length > 0 && !selectedAllRemote) {
      var idArray = [];
      var length = selection.length;
      var i = 0;

      for (; i < length; i++) {
        idArray[i] = selection[i].get("Id");
      }

      var idList = idArray.join(",");
      filters.push({
        property: "Id:ININT",
        value: idList,
      });
    } else {
      store.filters.each(function (filter, index) {
        filters[index] = {
          property: filter.property,
          value: filter.value,
        };
      });
    }

    var model = this.getSmartMailProgramModelModel();
    var program = Ext.create(model, {
      Id: 0,
      DateStart: new Date(),
      Priority: 550,
      Name: "Nuevo envío",
      Status: "A",
      Query:
        "EXEC _desktop..organizationbyfilter @Filter='" +
        Ext.JSON.encode(filters) +
        "',@limit=999999,@select='Email'",
    });

    // En ExtJS 7.1 con Id=0 y phantom=false, save() hace PUT /Rest/SmartMailProgram/0
    // que es la URL que el servidor necesita para crear y procesar el programa.
    program.save({
      callback: function (record, operation, success) {
        if (!success) {
          console.error("[SmartMail] Error al crear SmartMailProgram:", operation.getError && operation.getError());
          return;
        }

        var mytab = panel.down('[title="' + title + '"]');
        if (mytab) {
          mytab.close();
        }
        var newTab = Ext.widget("smartmailview", {
          iconCls: "icon-email-go",
          title: title,
          record: record,
          targetTab: panel,
          closable: true,
          forceClose: false,
        });

        panel.add(newTab);
        panel.setActiveTab(newTab);
      },
    });
  },
});
