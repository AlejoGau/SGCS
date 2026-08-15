//MIGRADO2024
Ext.define("Common.controller.SmartMailSearchGridControlller", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["SmartMailSearchSearchModel"],
  views: ["SmartMailSearchGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smartsearchgridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
      },
      "smartsearchgridview button[action=search]": {
        click: this.onSearchClick,
      },
      "smartsearchgridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "smartsearchgridview button[action=smartmail]": {
        click: this.onSmartMailClick,
      } /*,
            'smarttrackinggridview combo[itemId=fieldName]': {
                change: this.onComboChange
            }*/,
    });
  },
  initView: function (view) {
    var record = view.record;

    // Fallback: si el record no llegó por config, intentar obtenerlo del tabpanel padre
    if (!record) {
      var parentTab = view.up('tabpanel');
      if (parentTab) {
        record = parentTab.record;
      }
    }
    if (!record) {
      var parentTab2 = view.up('tabpanel');
      if (parentTab2 && parentTab2.getActiveTab()) {
        record = parentTab2.getActiveTab().record;
      }
    }

    view.filters = [];
    if (record && record.get && record.get("Id")) {
      view.filters = [
        {
          property: "Id",
          id: "Id",
          value: record.get("Id"),
        },
      ];
    } else {
      console.warn('[SmartMail Destinatarios] No se pudo obtener el record del programa. view.record:', view.record,
        'parentTab.record:', view.up('tabpanel') ? view.up('tabpanel').record : 'N/A');
    }

    var store = Ext.create("Ext.data.Store", {
      model: this.getSmartMailSearchSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: view.filters,
    });
    view.bindStore(store);
    var toolbar = view.down("pagingtoolbar");
    if (toolbar) {
      toolbar.bindStore(store);
    }

    store.load();
  },

  onComboChange: function (obj) {
    /*  var view = obj.up('smarttrackinggridview');
        var campoHasta = view.down('#queryTo');
        
        if(obj.getValue() == "SentDate") {
            campoHasta.show();
        } else {
            campoHasta.hide();
        }*/
  },

  onSmartMailClick: function (btn) {
    var view = btn.up("personsearchview");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = "Envío masivo";

    /*
        EXEC SearchObjectExecute @SearchName='NOMBRE DEL SEARCH', @Filter='FILTER DEL SEARCH' 
        */
    var filters = [];

    var selection = view.getSelectionModel().getSelection();

    if (selection.length > 0) {
      var idArray = [];
      var length = selection.length;
      var i = 0;
      for (; i < length; i++) {
        idArray[i] = selection[i].get("Id");
      }

      var idList = idArray.join(",");
      filters.push({
        property: "Id:IN",
        value: idList,
      });
    } else {
      view.getStore().filters.each(function (filter, index) {
        filters[index] = {
          property: filter.property,
          id: filter.property,
          value: filter.value,
        };
      });
    }

    var model = this.getSmartMailProgramModelModel();
    var program = Ext.create(model, {
      DateStart: new Date(),
      Name: getLocale("Nuevo envío"),
      Query:
        "EXEC PersonByFilter @Filter='" +
        Ext.JSON.encode(filters) +
        "',@limit=999999",
    });
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("smartmailformview", {
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

  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");
    var view = grid.up("smartsearchgridview");
    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = "(" + id + ") " + record.get("Name");
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("personview", {
        iconCls: "icon-Person",
        title: title,
        section: view.record,
        targetTab: panel,
        objectId: id,
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

  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },
  onGetAllClick: function (button, event, options) {
    var view = button.up("smartsearchgridview");
    var store = view.getStore();
    store.clearFilter();
    store.filter(view.filters);
    // view.down('#Name').setValue('');
    //   view.down('#LastName').setValue('');
    view.down("#query").setValue("");

    var taxonomytree = view.query("taxonomiesmastertree")[0];
    if (taxonomytree) {
      var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
      Ext.Array.each(
        taxonomiesSelected,
        function (rec) {
          if (rec.get("checked")) rec.set("checked", false);
        },
        this,
      );
    }
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("smartsearchgridview");
    var store = view.getStore();

    var valorSearch = view.down("#query").getValue();

    var filters = Ext.clone(view.filters);

    if (valorSearch)
      filters.push({
        property: "Email",
        value: valorSearch,
        id: "Email",
      });

    if (filters.length > 0) {
        store.filter(filters);
        store.load();
    }
    else store.clearFilter();
  },
});
