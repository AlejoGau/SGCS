//MIGRADO2024
Ext.define("Common.controller.OrganizationHelperController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["OrganizationSearchModel", "OrganizationHelperSearchModel"],
  views: ["OrganizationHelperView"],
  init: function (config) {
    // genero los eventos
    this.control({
      organizationhelperview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
      },
      "organizationhelperview button[action=search]": {
        click: this.onSearchClick,
      },
      "organizationhelperview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "organizationhelperview button[action=removerorganizacion]": {
        click: this.onRemoverOrganizacionClick,
      },
      "organizationhelperview #miorganizacion": {
        click: this.onMiOrganizacionClick,
      },
    });
  },

  onMiOrganizacionClick: function (btn) {
    var controller = this;

    var record = this.getOrganizationSearchModelModel().create({
      Id: _UserData.Company,
      Name: _UserData.OrganizationName,
    });

    this.onItemClick(btn, record);
  },
  initView: function (view) {
    var status = view.forceStatus;
    var filters = view.filter || [];
    var disableFilterOrgType = view.disableFilterOrgType;
    var forceType = view.forceType;
    var controller = this;

    view.filter = filters;

    if (_UserData.Company) {
      view.down("#miorganizacion").show();
    }

    if (status) {
      // filters.push({
      //   property: "Status:ININT",
      //   value: status,
      // });

      if (view.hideTaxo) {
        view.down("#taxonomySearch").hide();
        BeforeUnloadEvent;
      }
    }
    if (forceType) {
      filters.push({
        property: "OrganizationType",
        value: forceType,
        id: "OrganizationType",
      });
    } else if (!disableFilterOrgType)
      filters.push({
        property: "OrganizationType",
        value: "CLI",
        id: "OrganizationType",
      });

    /*
        var modules = this.getSecurityModulesStoreStore();
        var administratorModule = modules.findRecord('KeyReference','Administrator');
        
        if (administratorModule.get('Available')){            
             view.down('#removerorganizacion').show();            
        }
        */
    var store = Ext.create("Ext.data.Store", {
      model: this.getOrganizationHelperSearchModelModel(),
      sorters: [
        {
          property: "o.Name",
          direction: "ASC",
        },
      ],
      pageSize: 50,
      filters: filters,
      remoteSort: true,
      remoteFilter: true,
      remoteGroup: false,
    });

    view.bindStore(store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);

    store.load();

    //PARCHE: no encontre por que al abrir este helper se vacía la lista de modulos asi que si estamos en el administrador la vuelvo a llenar :/
    var administratorview = view.caller.up("administratorview");
    /*if (administratorview){
            var modulesview = administratorview.down('administratormodulesview')
            modulesview.fireEvent('objectchanged',{view: modulesview});
        }*/
  },

  onItemClick: function (grid, record, item, index, e, options) {
    var helper = grid.up("organizationhelperview");
    var caller = helper.caller;
    if (helper.stringFireEvent) {
      caller.fireEvent(helper.stringFireEvent, record, caller);
    } else {
      caller.fireEvent("organizationchanged", record, caller);
    }

    var win = helper.up("window");
    if (win) win.close();
  },

  onRemoverOrganizacionClick: function (button, event, options) {
    var helper = button.up("organizationhelperview");
    var caller = helper.caller;
    caller.fireEvent("organizationchanged", "", caller);

    var win = helper.up("window");
    if (win) win.close();
  },

  onGetAllClick: function (button, event, options) {
    var view = button.up("organizationhelperview");
    var store = view.getStore();
    store.clearFilter(true);
    store.filter(view.filter);

    view.down("#Name").setValue("");

    if (view.down("#LastName")) view.down("#LastName").setValue("");

    if (view.down("#Email")) view.down("#Email").setValue("");
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("organizationhelperview");

    var store = view.getStore();
    var query = view.down("#query");
    //var field = view.down('#fieldName');

    var taxonomytree = view.query("taxonomiesmastertree")[0];

    var taxonomiesSelected;

    if (taxonomytree)
      taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();

    var taxonomiesArray = [];
    var filters = [];

    var name = view.down("#Name") ? view.down("#Name").getValue() : null;
    var lastname = view.down("#LastName")
      ? view.down("#LastName").getValue()
      : null;
    var email = view.down("#Email") ? view.down("#Email").getValue() : null;

    if (name)
      filters.push({
        property: "o.[Name]:LIKE",
        value: name,
        id: "Name",
      });

    if (lastname)
      filters.push({
        property: "LastName:LIKE",
        value: lastname,
        id: "LastName",
      });

    if (email)
      filters.push({
        property: "Email:LIKE",
        value: email,
        id: "Email",
      });

    var orChk = view.down("#or");
    var or;
    if (orChk) or = orChk.checked ? ":OR" : "";

    if (taxonomytree)
      Ext.Array.each(
        taxonomiesSelected,
        function (rec) {
          if (rec.get("checked")) taxonomiesArray.push(rec.get("Id"));
        },
        this
      );

    var taxonomies = taxonomiesArray.join();

    /*
        if (field.getValue() && query.getValue()){
            filters.push({ 
                property: field.getValue()+':Like',
                value: query.getValue(),
                id: 'query'
            });
        }
        */
    if (taxonomiesArray.length > 0) {
      filters.push({
        property: "Taxonomy" + or,
        value: taxonomies,
        id: "taxonomy",
      });
    }

    if (filters) store.filter(filters);
    else store.clearFilter();
  },
});
