//MIGRADO2024
Ext.define("Common.controller.SmartMailController", {
  extend: "Ext.app.Controller",
  stores: ["Common.store.SmartMailModuleStore"],
  models: ["SmartMailProgramModel"],
  views: ["SmartMailView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smartmailview: {
        beforerender: this.initView,
      },
    });
  }, // cierro init

  initView: function (view) {
    var objectId = view.objectId;
    var record = view.record;
    var west = view.down("moduletreeview");
    /*var treeStoreAux = Ext.create( 'Ext.data.TreeStore', {
            root: {
                text: 'Datos',
                expanded: false,
                leaf: false
            }
        });
        Ext.array.each( this.getSmartMailModuleStore().getRootNode().childNodes, function( node ) {
            treeStoreAux.getRootNode().appendChild( node.copy() );
        } );

        west.setRootNode(  treeStoreAux.getRootNode()  );
        */
    var treeStoreAux = Ext.create("Ext.data.TreeStore", {
      root: {
        text: "Datos",
        expanded: true,
        leaf: false,
        children: [
          {
            text: "Enviados",
            iconCls: "icon-email-go",
            leaf: true,
            view: "smarttrackinggridview",
            closable: true,
            closeAction: "destroy",
          },
          {
            text: "Destinatarios",
            iconCls: "icon-group",
            leaf: true,
            view: "smartsearchgridview",
            closable: true,
            closeAction: "destroy",
          },
        ],
      },
    });
    west.setRootNode(treeStoreAux.getRootNode());
    if (record) {
      this.setRecord(record, view);
    } else {
      this.loadRecord(objectId, view);
    }
    west.expandAll();
  },
  loadRecord: function (objectId, view) {
    record = this.getSmartMailProgramModelModel();
    if (objectId == 0) {
      var now = new Date();
      var myobject = record.create({
        Name: "Nuevo programa",
      });
      myobject.save({
        scope: this,
        callback: function (record, operation) {
          this.setRecord(record, view);
        },
      });
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
    console.log(
      "[SmartMail] setRecord - record Id:",
      record.get("Id"),
      "Name:",
      record.get("Name"),
    );
    var myPanel = viewport.down("tabpanel");
    var targetTab = viewport.targetTab;
    var title = record.get("Name");

    myPanel.record = record;

    // si center es un tabpanel agrego el tab,
    // sino supongo que el form esta cargado y le agrego el record
    var mytab = myPanel.down("[title=" + title + "]");
    if (!mytab) {
      var newTab = Ext.widget("smartmailformview", {
        record: record,
        title: "Principal",
        readOnly: false,

        targetTab: myPanel,
        closable: false,
      });

      // agrego la paleta creada
      myPanel.add(newTab);
      myPanel.setActiveTab(newTab);
    }
    // el existe, lo activo
    else {
      myPanel.setActiveTab(mytab);
    }

    var _module = viewport.down("moduletreeview");
    if (_module) {
      _module.down("treeview").record = record;
      _module.record = record;
      _module.targetTab = myPanel;
      _module.down("treeview").targetTab = myPanel;
    }
  },
});
