Ext.define("Common.controller.PersonGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "PersonModel",
    "PersonSearchModel",
    "SmartMailProgramModel",
    "RelationModel",
    "OrganizationSearchModel",
  ],
  views: ["PersonGridView"],

  init: function (config) {
    // genero los eventos
    this.control({
      persongridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
        personselected: this.onPersonSelected,
      },
      "persongridview button[action=search]": {
        click: this.onSearchClick,
      },
      "persongridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "persongridview button[action=smartmail]": {
        click: this.onSmartMailClick,
      },
      "persongridview button[action=add]": {
        click: this.onAddClick,
      },
      "persongridview button[action=remove]": {
        click: this.onRemoveClick,
      },
      'persongridview button[action="newPerson"]': {
        click: this.onNewPersonClick,
      },
      "persongridview button[action=export]": {
        click: this.onExportarClick,
      },
    });
  },

  initView: function (view) {
    view.filters = [];
    var record = view.record;

    if (record && view.filterByParentTaxonomy == true) {
      var taxonomiesArray = [];
      if (taxonomiesArray.length > 0) {
        view.filters.push({
          property: "Taxonomy",
          value: taxonomies,
          id: "taxonomy",
        });
      }
    }

    if (record && !view.filterByParentTaxonomy) {
      view.filters = [
        {
          property: record.get("ObjectTypeName") + ":RelationParent",
          value: record.get("Id"),
        },
      ];

      //escondo columna de organizacion
      view.down("[dataIndex=Organizacion]").setVisible(false);
    }

    if (!record) {
      view.down("#newPerson").hide();
      view.down("#addPerson").hide();
      view.down("#removePerson").hide();
    } else {
      view.down("#pagesize").hide();

      //ocultar columna empresa.
      //view.down('#columnEntidad').hide();
    }

    if (view.hideControls) {
      Ext.Array.each(view.hideControls, function (v, k) {
        if (view.down(v)) {
          view.down(v).hide();
        }
      });
    }

    if (view.hideColumns) {
      Ext.Array.each(view.hideColumns, function (index) {
        var column = view.down("gridcolumn[dataIndex=" + index + "]");
        if (column) column.hide();
      });
    }

    var store = Ext.create("Ext.data.Store", {
      model: this.getPersonSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      sorters: [
        {
          property: "o.Id",
          direction: "ASC",
        },
      ],
      listeners: {
        beforeload: function (store, operation, options) {
          operation.store = store;
        },
      },
      remoteFilter: true,
      filters: view.filters,
    });
    view.bindStore(store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);

    store.load();
  },

  onNewPersonClick: function (button, event, options) {
    var view = button.up("persongridview");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var model = this.getPersonModelModel();
    var store = view.getStore();
    var empresa = "";

    var record = view.record;

    if (record) {
      empresa = record.get("Name");
      var parentId = record.get("Id");
      var proxy = model.getProxy();
      var oldUrl = proxy.url;
      var url = "/Rest/organization/" + parentId + "/person";
      proxy.url = url;
    }

    var me = this;

    var person = Ext.create(model, {
      //Id: 0,
      //        Company: empresa
    });

    person.proxy = proxy; //person.setProxy(proxy);
    /*person.save({callback: function(){
            proxy.url = oldUrl;
            store.add(person);
            me.onItemClick(view.getView(),person);
        }})*/

    var win = Ext.create("Ext.Window", {
      layout: "fit",
      title: "Nuevo contacto",
      closeAction: "hide",
      itemId: "personWin",
      width: 750,
      height: 550,
      border: true,
      modal: true,
      view: view,
      items: [
        {
          xtype: "personformview",
          record: person,
          mode: "helper",
          caller: view,
          listeners: {
            objectchange: function (record) {
              console.log(arguments);
              proxy.url = oldUrl;
              store.add(record);
              me.onItemClick(view.getView(), record);
              win.hide();
            },
          },
        },
      ],
    });
    win.show();
  },

  onSmartMailClick: function (btn) {
    var view = btn.up("personsearchview");
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
      Priority: 500,
      Name: "Nuevo envío",
      Query:
        "EXEC _desktop..personbyfilter @Filter='" +
        Ext.JSON.encode(filters) +
        "',@limit=999999,@select='Email'",
    });

    program.save({
      callback: function () {
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
          var newTab = Ext.widget("smartmailview", {
            iconCls: "icon-email-go",
            title: title,
            record: program,
            targetTab: panel,
            closable: true,
          });

          panel.add(newTab);
          panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
          mytab.show();
        }
      },
    });

    // me fijo si el tab existe, si es nuevo lo creo
  },

  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");
    var view = grid.up("personsearchview") ? grid.up("personsearchview") : grid;
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = record.get("Name") + " " + record.get("LastName");
    var model = this.getPersonModelModel();
    var store = view.getStore();

    var parentId = record.get("Id");
    var url = "/rest/organization/" + parentId + "/person";
    var oldUrl = record.proxy.url;
    record.proxy.url = url;

    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("personformview", {
        iconCls: "icon-Person",
        title: title,
        record: record,
        oldUrl: oldUrl,
        translate: false,
        targetTab: panel,
        objectId: id,
        closable: true,
        hideStatusGroup: view.hideStatusGroup,
        recordOrganizacion: view.record,
        removeObject: function(record) {
          store.remove(record);
        }
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      mytab.show();
    }
  },

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  onGetAllClick: function (button, event, options) {
    var view = button.up("persongridview");
    var store = view.getStore();
    store.clearFilter(true);
    store.filter(view.filters);
    view.down("#query").setValue("");
    view.down("#fieldName").setValue("");

    var taxonomytree = view.query("taxonomiesmastertree")[0];
    var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
    var taxonomiesArray = [];
    Ext.Array.each(
      taxonomiesSelected,
      function (rec) {
        if (rec.get("checked")) rec.set("checked", false);
      },
      this
    );
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("persongridview");

    var store = view.getStore();
    var query = view.down("#query").getValue();
    var field = view.down("#fieldName").getValue();

    var taxonomytree = view.query("taxonomiesmastertree")[0];
    var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
    //var taxonomiesSelected = taxonomytree.getSelectionModel().getSelection();

    var taxonomiesArray = [];
    Ext.Array.each(
      taxonomiesSelected,
      function (rec) {
        if (rec.get("checked")) taxonomiesArray.push(rec.get("Id"));
      },
      this
    );

    var taxonomies = taxonomiesArray.join();

    var filters = Ext.clone(view.filters);

    if (field)
      filters.push({
        property: field + ":LIKE",
        value: query,
        id: "Name",
      });

    var orChk = view.down("#or");
    var or = orChk.checked ? ":OR" : "";

    if (taxonomiesArray.length > 0) {
      filters.push({
        property: "Taxonomy" + or,
        value: taxonomies,
        id: "taxonomy",
      });
    }

    if (filters.length > 0) store.filter(filters);
    else store.clearFilter();
  },

  onRemoveClick: function (button, event, options) {
    var view = button.up("persongridview");
    var parent = view.record;

    var selected = view.getSelectionModel().getSelection();

    Ext.Array.each(selected, function (record) {
      // llamo a eliminar la relacion
      Ext.Ajax.request({
        url: "/Rest/Search/DelRelationByChildObject",
        method: "GET",
        scope: this,
        params: {
          RelationObjectTypeId: record.get("ObjectTypeId"),
          RelationObjectId: record.get("Id"),
          ParentObjectTypeId: parent.get("ObjectTypeId"),
          ParentObjectId: parent.get("Id"),
        },
        success: function (response) {
          notify("La persona se removió con éxito.");
          view.down("pagingtoolbar").doRefresh();
        },
      });
    });
  },

  onAddClick: function (button, event, options) {
    var view = button.up("persongridview");
    var record = view.record;
    console.log(record, view, this);

    var filters = [];
    filters.push({
      property: "o.Id",
      value: _UserData.Company, //this.application.UserData.Company
    });

    var store = Ext.create("Ext.data.Store", {
      model: this.getOrganizationSearchModelModel(),
      pageSize: 50,
      filters: filters,
      remoteSort: true,
      remoteFilter: true,
    });

    store.load({
      callback: function (records) {
        view.viewConfigPerson = {
          xtype: "contextpersonhelperview",
          //  mismaOrganizacion:{record:records[0], titleTab: records[0].get('LegalName'), multiSelect:true},
          //organizacionSecundaria: {record:record, titleTab: record.get('LegalName'), multiSelect:true},
          mostrarTodo: { mostrar: true, multiSelect: true },
          recordOrganizacion: view.record,
        };

        if (view.helperConfig) {
          view.viewConfigPerson = view.helperConfig;
        }

        var win = Ext.create("Ext.Window", {
          layout: "fit",
          title: "Seleccione los contactos",
          closeAction: "hide",
          itemId: "personWin",
          width: 750,
          height: 550,
          border: true,
          modal: true,
          view: view,
          items: [view.viewConfigPerson],
        });
        win.show();
      },
    });
  },

  onPersonSelected: function (selection, view) {
    var parent = view.record;
    var relationModel = this.getRelationModelModel();
    var store = view.getStore();

    Ext.Array.each(selection, function (record) {
      var relation = Ext.create(relationModel, {
        Id: 0,
        ObjectTypeId: parent.get("ObjectTypeId"),
        ObjectId: parent.get("Id"),
        RelationObjectTypeId: record.get("ObjectTypeId"),
        RelationObjectId: record.get("Id"),
      });

      relation.save();
      store.add(record);
    });
  },

  openObjectTab: function (targetTab, object) {
    var objectId = object.get("Id");
    var objectTypeName = object.get("ObjectTypeName");
    var title = object.get("Name")
      ? object.get("Name") + " " + object.get("LastName")
      : getLocale("Nuevo contacto");
    var container = objectTypeName.toLowerCase() + "view";
    var newTab = Ext.widget(container, {
      title: title,
      border: false,
      closable: true,
      //record: object,
      objectId: objectId,
      targetTab: targetTab,
      autoDestroy: true,
    });

    targetTab.add(newTab);
    targetTab.setActiveTab(newTab);
  },

  onExportarClick: function (button) {
    var view = button.up("persongridview");
    //   var grid = view.down('#gridcuenta');
    var store = view.getStore();
    var filter = [];
    //Ext.JSON.encode(store.filters.items);
    var sort = [];
    //Ext.JSON.encode(store.sorters.items);
    store.filters.items.forEach((item) => {
      const property = item.config.property === "Organization:RelationParent" ? "ObjectId" : item.config.property;
      filter.push({ property, value: item.config.value });
    });
    store.sorters.items.forEach((item) => {
      sort.push({
        direction: item.config.direction,
        property: item.config.property,
      });
    });
    var jsonfilter = Ext.JSON.encode(filter);
    var jsonsort = Ext.JSON.encode(sort);
    var url = store.proxy.url;
    /*var partes = url.split(/\?/);
        url = partes[0]+'.xls?'+partes[1]*/
    url = url + ".xls?sort=" + jsonsort + "&filter=" + jsonfilter;

    url = Ext.urlAppend(url, "limit=1000000");
    location.href = url;
  },
});
