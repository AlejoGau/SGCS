Ext.define("Common.controller.DocumentosFileGridController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["FileSearchModel", "DocumentosSearchModel"],
  views: ["UploadButton", "ExtUxNotification", "SoftguardDocumentosFileView"],
  init: function (config) {
    // genero los eventos
    this.control({
      documentosgridview: {
        afterrender: this.initView,
        select: this.onSelect,
      },
      "documentosgridview button[action=subirarchivo]": {
        click: this.onSubirArchivo,
      },
      "documentosgridview button[action=eliminararchivo]": {
        click: this.onEliminarArchivo,
      },
    });
  },
  initView: function (view) {
    var searchName = 'SoftguardMiscFile';
    var module = view.module;
    var profile = module && module.get( 'profile' ) ? module.get( 'profile' ) : 2;
    var record = view.record;
    console.log( view )
    console.log( record )
    if (!record) {
      console.log("No se encontro record. Salgo");
      return;
    }

    if (
      record.get("ObjectTypeName") == "Cuenta" ||
      record.get("ObjectTypeName") == "EventosPendientes"
    ) {
      var path =
        "Docs/" +
        record.get("cue_clinea") +
        "-" +
        record.get("cue_ncuenta") +
        "/";
    } else if (record.get("ObjectTypeName") == "Organization") {
      var path = "/" + record.get("Id") + "/";
      searchName = "Wallpapers";
    } else {
      var path =
        "Docs/" + record.get("ObjectTypeName") + "/" + record.get("Id") + "/";
    }

    view.path = path;
    view.searchName = searchName;

    view.profile = profile;

    if (profile < 2) {
      view.down("toolbar").hide();
    }
    var store = Ext.create("Ext.data.Store", {
      model: this.getDocumentosSearchModelModel(),
      searchName: searchName,
      path: path,
      type: "File",
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      listeners: {
        beforeload: function (store, operation) {
          operation.scope = store;
          view.down("#deleteArch").setDisabled(true);
        },
      },
    });

    url =
      "/rest/search/" +
      searchName +
      "?Type=File&Path=" +
      path +
      "&page=1&start=0&limit=50";

    store.getProxy().setUrl(url);
    view.bindStore(store);
    var toolbar = view.down("pagingtoolbar");
    toolbar.bindStore(store);
    store.load();
  },
  onEliminarArchivo: function (button) {
var view = button.up( 'documentosgridview' );
    var selection = view.getSelectionModel().getSelection();

    if( selection && selection.length > 0 ) {

        Ext.MessageBox.confirm(
            getLocale( 'Confirmación' ),
            getLocale( 'Está seguro?' ),
            function( btn ) {
                if( btn === 'yes' ) {
                    button.disable();

                    Ext.Ajax.request( {
                        url: '/rest/t_parametros/',
                        params: {
                            filter: '[{"property":"par_ccodigo", "value":"SEARCHWALLPAPERFILES"}]'
                        },
                        method: 'GET',
                        scope: this,
                        success: function( response ) {
                            var pathMiscFile = Ext.JSON.decode( response.responseText ).rows[ 0 ].par_cvalor;

                            // reemplazos de unidades de disco
                            pathMiscFile = pathMiscFile.replace( 'C:\\', '' );
                            pathMiscFile = pathMiscFile.replace( 'D:\\', '' );
                            pathMiscFile = pathMiscFile.replace( 'E:\\', '' );
                            pathMiscFile = pathMiscFile + '\\';

                            var selection = view.getSelectionModel().getSelection();
                            if( selection.length > 0 ) {
                                for( var i = 0;i < selection.length;i++ ) {
                                    Ext.Ajax.request( {
                                        url: '/Rest/FileSystem/DeleteFile',
                                        method: 'GET',
                                        params: {
                                            path: pathMiscFile + selection[ i ].get( 'Path' ),
                                            search: 'SoftguardMiscFile',
                                            name: selection[ i ].get( 'Name' )
                                        },
                                        success: function( resp, operation ) {
                                            view.getStore().load();
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        );
    }
  },
  onSelect: function (grid, record, index, eOpts) {
    var view = grid.view.up("documentosgridview");
    var btndelete = view.down("#deleteArch");
    if (record) {
      btndelete.setDisabled(false);
    }
  },
  onSubirArchivo: function (btn) {
    var view = btn.up("documentosgridview");

    var win = Ext.widget("window", {
      title: "Archivo",
      height: 252,
      width: 360,
      closeAction: "destroy",
      border: false,
      layout: "fit",
      items: [
        {
          xtype: "form",
          padding: "10 0 0",
          url: "/rest/upload/new?search=" + view.searchName,
          items: Ext.create("Common.view.UploadButton", {
            itemId: "dragupload",
            iconCls: "icon-book-add",
            text: "Subir Archivo",
            plugins: [
              {
                ptype: "uploadwindow",
                title: "Subir Archivo",
                //width: 350,
                //height: 150
              },
            ],
            uploader: {
              url: "/Rest/upload/new?search=" + view.searchName,
              uploadpath: "Docs",
              multi_selection: true,
              autoStart: true,
              maxFileSize: "50mb",
              dropElement: "filegridview",
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
                var url = "/Rest/upload/new?";
                url = Ext.String.urlAppend(url, "search=" + view.searchName);
                url = Ext.String.urlAppend(url, "createFolder=true");
                url = Ext.String.urlAppend(url, "Path=" + this.path);
                uploader.uploader.settings.url = url;
              },
              fileuploaded: function (uploader, file) {
                //console.log('fileuploaded');
              },
              uploadcomplete: function (uploader, success, failed) {
                var file = success.pop();
                this.refresh();
              },
              scope: this,
            },
          }),
        },
      ],
      autoShow: true,
      modal: true,
    });
  },
});
