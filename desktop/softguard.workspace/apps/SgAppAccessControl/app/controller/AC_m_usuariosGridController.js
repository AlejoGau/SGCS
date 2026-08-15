Ext.define("SgAppAccessControl.controller.AC_m_usuariosGridController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.SoftguardUsuarioTipoStore"],
  models: ["AC_UsuarioSearchModel", "UsuarioModel"],
  views: ["AC_m_usuariosGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      ac_m_usuariosgridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        refresh: this.refresh,
      },
      "ac_m_usuariosgridview button[action=search]": {
        click: this.onSearchClick,
      },
      "ac_m_usuariosgridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "ac_m_usuariosgridview button[action=add]": {
        click: this.onAdd,
      },
      'ac_m_usuariosgridview button[action="delete"]': {
        click: this.onDeleteClick,
      },
    });
  },

  initView: function (view) {
    view.filters = [
      {
        property: "usu_ntipo:ININT",
        value: "5,6,7,8",
      },
    ];

    controller = this;

    // Filers from first tab on App ( Bienvenido )
    if (view.filterFromSearchContainer) {
      Ext.each(view.filterFromSearchContainer, function (filter) {
        view.filters.push(filter);
      });

      // Change UI from (Bienvenido)
      view.down("#add").setText(view.newButtonLabel);
      view.down("#filtersInvitedUsersButton").hide();
      view.down("#searchInvitedUsersButton").hide();
      view.down("#getallInvitedUsersButton").hide();
    }

    var _store = Ext.create("Ext.data.Store", {
      model: this.getAC_UsuarioSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: view.filters,
    });
    view.bindStore(_store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(_store);

    _store.load({
      callback: function (records) {
        if (view.esInicio === true && records.length == 1) {
          controller.onItemClick(view, records[0]);
        }
      },
    });

    var storeSecurity = SecurityModulesStore;
    var recordAccessControl = storeSecurity.findRecord(
      "KeyReference",
      "SgAppAccessControl"
    );
    console.log("storeSecurity: " + storeSecurity);
    if (recordAccessControl && recordAccessControl.get("Available") == true) {
      var _security = recordAccessControl.get("_Security");
      if (
        _security &&
        _security.hasOwnProperty("rights") &&
        _security.rights.nuevoUsuario != true
      ) {
        view.down("#add").hide();
      }
    }
  },

  refresh: function (view) {
    view.getStore().load();
  },

  onAdd: function (grid, record, item, index, e, options) {
    var view = grid.up("ac_m_usuariosgridview"); // Add conditional when call from m_usuariosFormController on saveEvent.
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = getLocale("Persona"); //view.filterFromSearchContainer ? view.newButtonLabel : 'Nuevo usuario';

    var myobject = Ext.create("Common.model.m_usuariosModel", {
      usu_ntipo: 7,
    });
    myobject.setId(0);

    var viewWidget = Ext.widget("m_usuariosformview", {
      caller: view,
      record: myobject,
      hideTipoUsuario: true,
      openFromAC: true,
      openAutomaticallyCreatedUser: view.filterFromSearchContainer
        ? true
        : false,
    });

    var win = Ext.create("Ext.Window", {
      iconCls: "icon-table-add",
      layout: "fit",
      title: title,
      width: 800,
      height: 600,
      border: false,
      items: viewWidget,
    });
    win.show();
  },

  // Double click event, to show user information.
  onItemClick: function (grid, record, item, index, e, options) {
    var view = grid.up("ac_m_usuariosgridview")
      ? grid.up("ac_m_usuariosgridview")
      : grid;
    if (view.esInicio === true) {
      this.onItemClick_persona(grid, record, item, index, e, options);
    } else {
      this.onItemClick_base(grid, record, item, index, e, options);
    }
  },

  // Double click event, to show user information.
  onItemClick_base: function (grid, record, item, index, e, options) {
    var view = grid.up("ac_m_usuariosgridview")
      ? grid.up("ac_m_usuariosgridview")
      : grid;
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = getLocale("Ficha") + ": " + record.get("usu_cnombre");

    //-----------recuperación de profile y rights para la interfaz de usuario-----
    var url =
      "/Rest/Security/Modules/" + this.application._idModule + "/Security";
    var security;
    var module;
    var controller = this;
    Ext.Ajax.request({
      url: url,
      method: "GET",
      success: function (resp, operation) {
        if (resp.responseText && resp.responseText != "")
          json = JSON.parse(resp.responseText);
        if (json && json.modules && json.modules.length > 0) {
          var modules = json.modules;

          security = json;

          Ext.Array.each(modules, function (_module) {
            /*var model = controller.getModuleModelModel();
                        var node = Ext.create(model, _module);
                        datos.record = record;
                        if (_module.profile!='0')
                        root.appendChild(node)
                        if (_module.text == 'Cuenta'){
                            cuentaModule = _module;
                            me.openTab(record, view, cuentaModule);
                        }*/
            if (_module.text == "Usuarios") {
              console.log("Modulo de usuarios encontrado");
              module = _module;
            }
          });

          // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
          var mystore = Ext.create("Ext.data.Store", {
            model: "Common.model.SoftguardUsuarioModel",
            remoteFilter: true,
            filters: [
              {
                property: "usu_iidcuenta",
                value: record.get("cue_iid"),
              },
            ],
          });

          controller.getUsuarioModelModel().load(record.get("Id"), {
            callback: function (recordx) {
              /*var newView = Ext.widget('usuarioformview',{
                            profile: module.profile,
                            rights: security.rights,
                            record: recordx,
                            hideTipo: view.hideTipo,
                            storeSearch:mystore,
                            caller:view
                            }
                        );*/

              var newView = Ext.widget("ac_m_usuariosformview", {
                caller: view,
                record: record,
                openFromAC: true,
                filterFromSearchContainer: view.filterFromSearchContainer
                  ? view.filterFromSearchContainer
                  : false,
              });

              // Lo agregamos al panel
              var myWindow = Ext.widget("window", {
                title: title,
                closable: true,
                height: 600,
                translate: false,
                width: 800,
                modal: true,
                items: newView,
                layout: "fit",
              }).show();

              /*var newView = Ext.widget('m_usuariosformview', {
                            caller: view,
                            record: recordx,
                            hideTipoUsuario: true,
                            openFromAC: true
                        });                      

                        // Lo agregamos al panel
                        var myWindow = Ext.widget('window',{
                            title: title,
                            //closable: false,
                            height: 600,
                            translate: false,
                            width: 800,
                            modal: true, 
                            items: newView,
                            layout: 'fit'
                        }).show();*/
            },
          });
        }
      },
    });
    //--------------------------------------

    /*var tabUser = Ext.widget('ac_m_usuariosformview', {
            caller: view,
            //closable: true,
            //title:title,
            //iconCls:'icon-email-edit',
            record: record,
            openFromAC: true,
            filterFromSearchContainer: view.filterFromSearchContainer ? view.filterFromSearchContainer : false
        });

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            translate: false,
            width: 800,
            height: 650,
            border: false,
            modal: true,
            items: tabUser            
        });
        win.show();*/

    /* esto es para abrir en otra pestaña
       var tabPanel = view.up('tabpanel');
       console.log('Tabpanel: '+tabPanel);
       tabPanel.add(tabUser);
       */
  },

  // Double click event, to show user information.
  onItemClick_persona: function (grid, record, item, index, e, options) {
    var view = grid.up("ac_m_usuariosgridview")
      ? grid.up("ac_m_usuariosgridview")
      : grid;
    var title = getLocale("Ficha") + ": " + record.get("usu_cnombre");
    var tabAccProvNew = Ext.widget("ac_accesopersonaview", {
      caller: view,
      closable: false,
      closeAction: "destroy",
      record: record,
      //title: title,
      //iconCls:'icon-email-edit'
    });
    var win = Ext.create("Ext.Window", {
      iconCls: "icon-table-add",
      layout: "fit",
      title: title,
      translate: false,
      width: 1280,
      height: 650,
      border: false,
      modal: true,
      items: tabAccProvNew,
    });
    win.show();
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  onGetAllClick: function (button, event, options) {
    var view = button.up("ac_m_usuariosgridview");
    var store = view.getStore();
    store.clearFilter(true);
    store.filter(view.filters);
    view.down("#cuenta").setValue("");
    view.down("#identificacion").setValue("");
    view.down("#nombre").setValue("");
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("ac_m_usuariosgridview");
    var store = view.getStore();
    var filters = Ext.clone(view.filters);
    store.clearFilter(true);

    if (view.down("#cuenta").getValue()) {
      filters.push({
        property: "cue_cnombre:LIKE",
        value: view.down("#cuenta").getValue(),
      });
    }
    if (view.down("#identificacion").getValue()) {
      filters.push({
        property: "usu_cidentificacion:LIKE",
        value: view.down("#identificacion").getValue(),
      });
    }
    if (view.down("#nombre").getValue()) {
      filters.push({
        property: "usu_cnombre:LIKE",
        value: view.down("#nombre").getValue(),
      });
    }

    if (view.down("#matricula").getValue() != "") {
      filters.push({
        property: "usu_cmetadata:LIKE",
        value: view.down("#matricula").getValue(),
      });
    }

    view.down("#nombre").setValue("");
    view.down("#identificacion").setValue("");
    view.down("#cuenta").setValue("");
    store.filter(filters);
  },

  onDeleteClick: function (button, event, options) {
    var view = button.up("ac_m_usuariosgridview");
    var selection = view.getSelectionModel().getSelection();
    if (selection) {
      view.store.remove(selection);
      var delRec = view.store.getRemovedRecords();
      Ext.Array.each(
        delRec,
        function (rec) {
          var model = this.getM_usuariosSearchModelModel();
          record.setConfig({proxy: model.getProxy()});
          rec.destroy({
            callback: function (record, operation) {
              if (operation.success) {
                notify("Se eliminio exitosamente");
              } else {
                notify(
                  "No se puede eliminar el registro, esta siendo utilizado en el sistema."
                );
              }
              view.store.load();
            },
          });
        },
        this
      );
    }
  },
});
