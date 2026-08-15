//MIGRADO2024
Ext.define("Common.controller.VideoGrillaController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: ["m_cuentas_videoByCuentaSearchModel"],
  views: ["VideoTabPanelView", "VideoGrillaFormView"],

  init: function(config) {
    // genero los eventos
    this.control({
      videotabpanelview: {
        afterrender: this.initview
      }
    });
  }, // cierro init

  //MARTIN
  initview: function(view) {
    // DK-1540: acceso externo por link con token (Dealer + cuenta en URL)
    if (typeof myQueryString !== 'undefined' && myQueryString.Dealer && myQueryString.cuenta) {
      view.down("tabpanel").add([
        {
          xtype: "videounificadogridview",
          title: "Video Links"
        }
      ]);
      return;
    }

    var _editable = false;
    // analizo permisos
    var isAdmin = isModuleAvailable("Administrator");
    var isCuentas = getRight("Administrator", "cuenta");
    var videoEdit = getRight("Video", "modificar");

    if (isAdmin && !isCuentas) {
      _editable = true;
    } else if (videoEdit) {
      _editable = true;
    }

    if (_editable) {
      view.down("tabpanel").add([
        {
          xtype: "videoxgridview",
          title: "Link general de la cuenta",
          hideControls: ["#addvideo", "#deletevideo"],
          module: {profile: 3},
          all: true
        },
        {
          xtype: "videolinksgridview",
          title: "Links de Zonas específicas",
          hideControls: ["#addvideo"],
          module: {profile: 3},
          all: true
        }
      ]);
    } else {
      view.down("tabpanel").add([
        {
          xtype: "videoxgridview",
          title: "Link general de la cuenta",
          hideControls: ["#addvideo", "#deletevideo"],
          module: {profile: 1},
          all: true
        },
        {
          xtype: "videolinksgridview",
          title: "Links de Zonas específicas",
          hideControls: ["#addvideo", "#deletevideolink"],
          selModel: null, // oculto checkbox
          module: {profile: 1},
          all: true
        }
      ]);
    }
  }

  /*initview: function(view){
        var _editable = false;
        // analizo permisos
        var modules = KeyModulesStore;
        var isAdmin = modules.isModuleAvailable('Administrator');
        var isCuentas = modules.isModuleAvailable('Administrator','cuenta');
        var videoEdit = modules.isModuleAvailable('Video','modificar');


        if (isAdmin && !isCuentas){
            _editable = true;
        } else if (videoEdit){
            _editable = true;
        }

        if (_editable){
            view.down('tabpanel').add([
                {
                    xtype:'videoxgridview',
                    title:'Video Cuentas',
                    hideControls:['#addvideo','#deletevideo'],
                    module:{profile:3},
                    all:true
                },{
                    xtype:'videolinksgridview',
                    title:'Video Zonas',
                    hideControls:['#addvideo'],
                    module:{profile:3},
                    all:true
                }
            ]);   
        }else{
            view.down('tabpanel').add([
                {
                    xtype:'videoxgridview',
                    title:'Video Cuentas',
                    hideControls:['#addvideo','#deletevideo'],
                    module:{profile:1},
                    all:true
                },{
                    xtype:'videolinksgridview',
                    title:'Video Zonas',
                    hideControls:['#addvideo','#deletevideolink'],
                    selModel: null, // oculto checkbox
                    module:{profile:1},
                    all:true
                }
            ]);   
        }
    }*/
});
