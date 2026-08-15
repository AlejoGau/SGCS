Ext.define("WebMG.controller.OrganizationMGController", {
  extend: "Ext.app.Controller",
  stores: [
    "OrganizationMGPROVModuleStore",
    "OrganizationMGModuleStore",
    "GeographyStore",
  ],
  models: ["OrganizationModel"],
  views: ["OrganizationMGView"],

  init: function (config) {
    // genero los eventos
    this.control({
      organizationmgview: {
        afterrender: this.initview,
        organizationsave: this.onOrganizationSave,
        organizationdeleted: this.onOrganizationDelete,
      },
    });

    var store = this.getGeographyStoreStore();
    store.load();
  }, // cierro init

  onOrganizationDelete: function (view) {
    if (view.caller) {
      view.caller.fireEvent("refresh", view.caller);
    }
    view.close();
  },

  onOrganizationSave: function (view, record) {
    if (record.get("Id") != 0) {
      view.down("moduletreeview").setDisabled(false);

      var moduleobject = view.down("moduletreeview");
      if (moduleobject) {
        moduleobject.down("treeview").record = record;
        moduleobject.record = record;
        moduleobject.targetTab = view.down("#center");
        moduleobject.down("treeview").targetTab = view.down("#center");
      }
    }
  },

  initview: function (view) {
    var objectId = view.objectId;

    view.mask = Ext.create("Ext.LoadMask", view, {
      msg: getLocale("Cargando"),
    }).show();

    record = this.loadRecord(objectId, view);
  },

  loadRecord: function (objectId, view) {
    record = this.getOrganizationModelModel();
    if (objectId == 0) {
      var now = new Date();
      var myobject;
      if (!view.record) {
        myobject = record.create({
          Name: "Nueva Organización",
        });
      } else {
        myobject = view.record;
      }

      /*myobject.save({
        		scope : this,
    			callback : function(record, operation) {
    				this.setRecord(record,view);
    			}
			});*/
      this.setRecord(myobject, view, myobject);
    } else {
      record.load(objectId, {
        callback: function (record, operation) {
          if (operation.success) {
            this.setRecord(record, view, view.record);
          }
        },
        scope: this,
      });
    }
  },

  setRecord: function (record, viewport, recordTree) {
    var myPanel = viewport.down("tabpanel");
    var center = viewport.down("#center");
    var targetTab = viewport.targetTab;
    center.record = record;
    var title = "Datos principales";

    viewport.mask.hide();

    // si center es un tabpanel agrego el tab,
    // sino supongo que el form esta cargado y le agrego el record
    if (myPanel) {
      var mytab = myPanel.down("[title=" + title + "]");
      if (!mytab) {
        var newTab = Ext.widget("organizationformview", {
          record: record,
          recordSearch: recordTree,
          title: title,
          targetTab: myPanel,
          closable: false,
          caller: viewport,
          enableCliente: viewport.enableCliente,
        });

        // agrego la paleta creada
        myPanel.add(newTab);
        myPanel.setActiveTab(newTab);

        if (record.get("Id") == 0) {
          viewport.down("moduletreeview").setDisabled(true);
        }
      }
      // el existe, lo activo
      else {
        myPanel.setActiveTab(mytab);
      }
    } else {
      var form = viewport.down("organizationformview");
      form.record = record;
      form.loadRecord(record);

      // cambio el titulo del padre
      var center = window.parent.Ext.getCmp("center");
      if (center) {
        center.getActiveTab().setTitle(record.get("Name"));
      }
    }

    var moduleobject = viewport.down("moduletreeview");
    if (moduleobject) {
      moduleobject.down("treeview").record = recordTree;
      moduleobject.record = recordTree;
      moduleobject.recordSearch = recordTree;
      moduleobject.targetTab = center;
      moduleobject.down("treeview").targetTab = center;

      // Ocultar nodo 'Cuentas' si no tiene permiso de Dealer
      if (!SecurityModulesStore.isModuleAvailable('WebDealer')) {
        var treeStore = moduleobject.getStore();
        var root = treeStore.getRootNode();
        if (root) {
          var cuentasNode = root.findChild(
            "view",
            "organizationcuentagridview",
          );
          if (cuentasNode) {
            cuentasNode.remove();
          }
        }
      }
    }
  },
});
