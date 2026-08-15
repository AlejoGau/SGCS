Ext.define("Common.controller.OrganizationController", {
  extend: "Ext.app.Controller",
  stores: [
    "Common.store.OrganizationModuleStore",
    "Common.store.GeographyStore",
  ],
  models: ["OrganizationModel"],
  views: [
    "ExtUxNotification",
    "OrganizationView",
    "OrganizationNorthView",
    "OrganizationGridView",
  ],

  init: function (config) {
    // genero los eventos
    this.control({
      organizationview: {
        beforerender: this.initview,
      },
    });

    var store = this.getGeographyStoreStore();
    store.load();
  }, // cierro init

  initview: function (view) {
    var objectId = view.objectId;

    if (view.hideLeftNav) {
      view.down("#leftnav").hide();
    }

    record = this.loadRecord(objectId, view);

    var storeSecurity = SecurityModulesStore; //Ext.data.StoreManager.lookup('SecurityModulesStore');
    storeSecurity.each(function (v, k) {
      if (
        v.get("KeyReference") == "Administrator" &&
        v.get("Available") == true
      ) {
        var cuentaOff = true;
        if (
          v &&
          v.get("_Security") &&
          v.get("_Security").rights &&
          v.get("_Security").rights.cuenta == true
        ) {
          Ext.Array.each(v.get("_Security").modules, function (r) {
            if (r.view == "cuentaformview" && r.profile >= 2) {
              cuentaOff = false;
            }
          });
        } else {
          //si es admin full
          cuentaOff = false;
        }

        if (cuentaOff == true) {
          var cuentaview = view
            .down("treeview")
            .getStore()
            .findRecord("view", "organizationcuentagridview");

          if (cuentaview) {
            cuentaview.parentNode.removeChild(cuentaview);
          }
        }
      }
    });

    // Ocultar nodo 'Cuentas' si no tiene permiso de Dealer
    if (!SecurityModulesStore.isModuleAvailable('WebDealer')) {
      var cuentaview = view
        .down("treeview")
        .getStore()
        .findRecord("view", "organizationcuentagridview");
      if (cuentaview) {
        cuentaview.parentNode.removeChild(cuentaview);
      }
    }
  },

  loadRecord: function (objectId, view) {
    record = this.getOrganizationModelModel();
    if (objectId == 0) {
      var now = new Date();
      var myobject;
      if (!view.record) {
        myobject = record.create({
          Name:
            "Nueva Organización (" +
            Math.floor(Math.random() * 100000 + 1) +
            ")",
          Status: view.forceStatusCreation ? view.forceStatusCreation : 0,
        });
      } else {
        myobject = view.record;
      }

      /*	myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    				this.setRecord(record,view);
    			}
			});*/

      this.setRecord(myobject, view);
      view.down("moduletreeview").setDisabled(true);
    } else {
      record.load(objectId, {
        callback: function (record, operation) {
          if (operation.success) {
            this.setRecord(record, view);
          }
        },
        scope: this,
      });
    }
  },

  setRecord: function (record, viewport) {
    var myPanel = viewport.down("tabpanel");
    var center = viewport.down("#center");
    var targetTab = viewport.targetTab;
    center.record = record;
    var title = "Datos principales";
    var view = myPanel.down("#organizationview");
    // si center es un tabpanel agrego el tab,
    // sino supongo que el form esta cargado y le agrego el record
    if (myPanel) {
      var mytab = myPanel.down("[title=" + title + "]");
      if (!mytab) {
        var newTab = Ext.widget("organizationformview", {
          record: record,
          title: title,
          targetTab: myPanel,
          closable: false,
          caller: viewport.caller,
          hideStatusGroup: viewport.hideStatusGroup,
          recordSearch: viewport.record,
          enableCliente: viewport.enableCliente,
          security: viewport.security,
        });

        // agrego la paleta creada
        myPanel.add(newTab);
        myPanel.setActiveTab(newTab);
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

    var _module = viewport.down("moduletreeview");
    if (_module) {
      _module.down("treeview").record = viewport.record;
      _module.record = viewport.record;
      _module.targetTab = center;
      _module.down("treeview").targetTab = center;
    }
  },
});
