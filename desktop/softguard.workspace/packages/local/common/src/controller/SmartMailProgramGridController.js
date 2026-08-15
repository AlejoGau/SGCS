Ext.define("Common.controller.SmartMailProgramGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["SmartMailProgramModel", "SmartMailProgramSearchModel"],
  views: ["SmartMailProgramGridView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smartmailprogramgridview: {
        afterrender: this.initView,
        itemdblclick: this.onItemClick,
        objectedit: this.onObjectEdit,
      },
      "smartmailprogramgridview button[action=search]": {
        click: this.onSearchClick,
      },
      "smartmailprogramgridview button[action=getall]": {
        click: this.onGetAllClick,
      },
      "smartmailprogramgridview button[action=sender]": {
        click: this.onSenderClick,
      },
      "smartmailprogramgridview button[action=delete]": {
        click: this.onDeleteClick,
      },
      "smartmailprogramgridview button[action=smartmailTemplate]": {
        click: this.onSmartmailTemplateClick,
      },
      "smartmailprogramgridview button[action=smartmail]": {
        click: this.onSmartMailClick,
      },
      "smartmailprogramgridview button[action=export]": {
        click: this.onExportClick,
      },
    });
  },
  initView: function (view) {
    view.filters = view.filters ? view.filters : [];
    // var record = view.record;

    // if (record && record.get("cue_iid") !== undefined) {
    //   view.filters.push({
    //     property: "cue_iid",
    //     value: record.get("cue_iid"),
    //   });
    // }

    /**************** */
    //Daniel O. Medina
    //  11/11/2020
    //  https://basecamp.com/2249105/projects/14758734/todos/428894954
    /*VOLVER ATRÁS if(this.application._nameModule == 'WebCRM') {   
            var filters = Ext.clone(view.filters);
            filters.push({
                property:'Priority:ltint',
                value:550
            });
            view.down('#filterPriority').setValue('600');
         }*/

    // view.down('#filterPriority').hiddenField.value=550;
    /******************** */
    var store = Ext.create("Ext.data.Store", {
      model: this.getSmartMailProgramSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: view.filters,
    });
    view.bindStore(store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);
    store.proxy.extraParams = { notBody: true };
    store.load();

    if (view.showMaximizer != false) {
      view.addTool({
        type: "maximize",
        itemId: "maximizer",
        handler: function (event, img, view, tool) {
          var view = tool.up("smartmailprogramgridview");
          var tabpanel = tool.up("tabpanel");
          var record = view.record;

          var win = Ext.create("Ext.Window", {
            layout: "fit",
            title: "Email",
            closeAction: "hide",
            width: 750,
            height: 550,
            border: true,
            modal: false,
            view: view,
            items: [
              {
                xtype: "smartmailprogramgridview",
                caller: view,
                showMaximizer: false,
                record: record,
              },
            ],
          });

          win.show();
        },
      });
    }

    if (this.application._nameModule == "SgAppNotificationReport") {
      view._nameModule = this.application._nameModule;
      view.down("#smartmailTemplate").hide();
      view.down("#sender").hide();
      view.down("#delete").hide();
      view.down("[xtype=actioncolumn]").setVisible(false);
      //escondo selmodel
      view.headerCt.child("gridcolumn[isCheckerHd]").hide();
    }
    // BC 404430734 - Cargo la seguridad del modulo en base CuentaView (Si se abre notificaciones desde AdminCuentas / )
    var existCuentaView = view.up("cuentaview");
    if (existCuentaView) var _security = view.up("cuentaview").security;

    if (_security) {
      var btnExport = view.down("#btnExport");

      if (_security.rights && !_security.rights.exportar && btnExport) {
        btnExport.hide();
      }
    }
  },
  onSmartMailClick: function (btn) {
    var view = btn.up("smartmailprogramgridview");
    var panel = view.targetTab ? view.targetTab : view.up("tabpanel");
    var title = "Envío de mail";

    var filters = [];

    var model = this.getSmartMailProgramModelModel();
    var program = Ext.create(model, {
      Id: 0,
      DateStart: new Date(),
      Priority: 550, //Priority: 500,
      Name: "Nuevo envío",
      Status: "A",
      Query:
        "EXEC _desktop..organizationbyfilter @Filter='" +
        Ext.JSON.encode(filters) +
        "',@limit=999999,@select='Email'",
    });

    // NO setear phantom = true (ver comentario en OrganizationGridController)
    // save() hará PUT /Rest/SmartMailProgram/0 que es la URL que el servidor necesita

    program.save({
      callback: function (record, operation, success) {
        if (!success) {
          console.error("[SmartMail] Error al crear SmartMailProgram");
          return;
        }
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
          var newTab = Ext.widget("smartmailview", {
            iconCls: "icon-email-go",
            title: title,
            record: record,
            targetTab: panel,
            readOnly: false,
            closable: false,
            forceClose: false,
          });

          panel.add(newTab);
          panel.setActiveTab(newTab);
        } else {
          mytab.show();
        }
      },
    });

    // me fijo si el tab existe, si es nuevo lo creo
  },
  onItemClick: function (grid, record, item, index, e, options) {
    var id = record.get("Id");

    /* Modificado 25/06/2018 por error al dar clic en "visualizar programa"
         * Daba error de no reconocer targetTab y es debido a que la grid, ya es la view actualmente
         * cuando se le da clic al boton de visualizar, si se le da clic al renglón debe mantener el grid.up
         * por eso, el index es undefined cuando se trata de dar clic en el botón, y en base a esa condición
         * guardo diferente la View
            var view = grid.up('smartmailprogramgridview');
        */

    if (index != undefined) {
      var view = grid.up("smartmailprogramgridview");
    } else {
      var view = grid;
    }

    var panel = view.targetTab ? view.targetTab : Ext.getCmp("center");
    var title = "(" + id + ") " + record.get("Name");

    var model = this.getSmartMailProgramModelModel();

    //record.setProxy(model.getProxy());
    record.setConfig({
      proxy: model.getProxy(),
    });
    // if (view.readonly) {
    // var win = Ext.create("Ext.Window", {
    //   layout: "fit",
    //   title: title,
    //   width: 750,
    //   translate: false,
    //   height: 550,
    //   border: true,
    //   modal: false,
    //   view: view,
    //   items: [
    //     {
    //       xtype: "smartmailformview",
    //       caller: view,
    //       record: record,
    //       readonly: true,
    //     },
    //   ],
    // });

    // win.show();
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("smartmailformview", {
        iconCls: "icon-email",
        title: title,
        parent: undefined,
        targetTab: panel,
        record: record,
        objectId: id,
        closable: true,
      });

      panel.add(newTab);
      panel.setActiveTab(newTab);
    }
    /*} else {
      // me fijo si el tab existe, si es nuevo lo creo
      var mytab = panel.down('[title="' + title + '"]');
      if (!mytab) {
        var newTab = Ext.widget("smartmailview", {
          iconCls: "icon-email",
          title: title,
          parent: undefined,
          targetTab: panel,
          record: record,
          objectId: id,
          closable: true,
        });

      // el existe, lo activo
      else {
        mytab.show();
    },*/
  },
  onObjectEdit: function (record, view) {
    this.onItemClick(view, record);
  },

  onSenderClick: function (button, event, options) {
    var view = button.up("smartmailprogramgridview");
    var panel = view.up("tabpanel");

    var title = "Direcciones de envío";
    var mytab = panel.down('[title="' + title + '"]');
    if (!mytab) {
      var newTab = Ext.widget("smartmailsendergridview", {
        iconCls: "icon-email",
        title: title,
        //parent: view,
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
  onGetAllClick: function (button, event, options) {
    var view = button.up("smartmailprogramgridview");
    var store = view.getStore();
    view.filters = [];
    store.clearFilter(true);
    store.filter(view.filters, true);
    view.down("#query").setValue("");
    view.down("#filterStatus").setValue("");

    // Loading
    store.load();
  },

  onSearchClick: function (button, event, options) {
    var view = button.up("smartmailprogramgridview");

    var store = view.getStore();
    var fieldName = view.down("#fieldName").getValue();
    var query = view.down("#query").getValue();

    var filters = Ext.clone(view.filters);

    if (fieldName == "cue_clinea-cue_ncuenta") {
      var querySplit = query.split("-");
      filters.push({
        property: "cue_clinea",
        value: querySplit[0],
      });
      filters.push({
        property: "cue_ncuenta",
        value: querySplit[1],
      });
    } else {
      if (fieldName) {
        filters.push({
          property: fieldName + ":LIKE",
          value: query,
        });
      }
      if (view.down("#filterStatus").getValue()) {
        filters.push({
          property: "Status",
          value: view.down("#filterStatus").getValue(),
        });
      }
    }

    var fechadesde = view.down("#fechadesde").getValue();
    var fechahasta = view.down("#fechahasta").getValue();

    if (fechadesde) {
      filters.push({
        property: "DateEndGTE",
        value: Ext.Date.format(fechadesde, "Y-m-d H:i:s"),
      });
    }

    if (fechahasta) {
      fechahasta = Ext.Date.add(fechahasta, Ext.Date.HOUR, 23);
      fechahasta = Ext.Date.add(fechahasta, Ext.Date.MINUTE, 59);
      fechahasta = Ext.Date.add(fechahasta, Ext.Date.SECOND, 59);

      filters.push({
        property: "DateEndLTE",
        value: Ext.Date.format(fechahasta, "Y-m-d H:i:s"),
      });
    }

    var filterPriorityvalue = view.down("#filterPriority").getValue();
    if (filterPriorityvalue) {
      if (filterPriorityvalue == 900) {
        filters.push({
          property: "Priority:GTEINT",
          value: 900,
        });
        filters.push({
          property: "Priority:LTEINT",
          value: 910,
        });
      } else if (filterPriorityvalue == 800) {
        filters.push({
          property: "Priority:GTEINT",
          value: 800,
        });
        filters.push({
          property: "Priority:LTEINT",
          value: 810,
        });
      } else if (filterPriorityvalue == 700) {
        filters.push({
          property: "Priority",
          value: 700,
        });
      } else if (filterPriorityvalue == 600) {
        filters.push({
          property: "Priority:LTEINT",
          value: 550, //Daniel O. Medina https://basecamp.com/2249105/projects/14758734/todos/428894954
        });
      }
    }

    store.clearFilter(true);
    if (filters.length > 0) {
      store.filter(filters);
    } else {
      store.clearFilter();
    }
  },

  onDeleteClick: function (button, object, options) {
    var view = button.up("smartmailprogramgridview");
    var selected = view.selModel.getSelection();
    var model = this.getSmartMailProgramModelModel();
    Ext.Array.each(selected, function (record) {
      //record.setProxy(model.getProxy());
      record.setConfig({
        proxy: model.getProxy(),
      });
      record.destroy({
        callback: function (records, operation) {
          if (operation.success) {
            notify("El programa se eliminó con éxito");
            view.down("pagingtoolbar").doRefresh();
          } else {
            notifyError("Hubo un problema en el servidor");
          }
        },
      });
    });
  },

  onSmartmailTemplateClick: function (button, object, options) {
    var view = button.up("smartmailprogramgridview");
    var tabpanel = view.up("tabpanel");

    var widget = Ext.widget(button.view, {
      closable: true,
      title: "Templates",
    });

    tabpanel.add(widget);

    tabpanel.setActiveTab(widget);
  },

  /* Funcion de exportacion */
  onExportClick: function (button, e, eOpts) {
    var view = button.up("smartmailprogramgridview");
    var store = view.getStore();
    var filters = store.filters;
    var url = "/handler/ReporteSmartMailProgramGridHTML";

    /* Agrego los filtros aplicados al Store en la URL */
    var min = [],
      length = filters.getCount(),
      i = 0;
    for (; i < length; i++) {
      min[i] = {
        property: filters.items[i]._property,
        value: filters.items[i]._value,
      };
    }
    url = Ext.urlAppend(url, "filter=" + Ext.encode(min));

    /* Obtengo por separado FechaDesde y FechaHasta para el encabezado */
    var fechadesde = view.down("#fechadesde").getValue();
    var fechahasta = view.down("#fechahasta").getValue();
    if (fechadesde) {
      url = Ext.String.urlAppend(
        url,
        "fechadesde=" + Ext.Date.format(new Date(fechadesde), "d/m/Y")
      );
    }
    if (fechahasta) {
      url = Ext.String.urlAppend(
        url,
        "fechahasta=" + Ext.Date.format(new Date(fechahasta), "d/m/Y")
      );
    }

    /* Agrego _DC */
    url = Ext.String.urlAppend(url, "_dc=" + new Date().getTime());

    /* Pongo el flag de export en Yes y procede a exportar */
    var exportToExcel = "yes";
    if (exportToExcel) {
      url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
    }

    /* Redirijo a la URL armada */
    location.href = url;
  },
});
