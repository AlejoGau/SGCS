
var _uiApplicationName = "WebManager";
Ext.application({
    extend: "Common.Application",
    name: "WebManager",
    controllers: [
"WebManagerController",
"WebManagerEstadoDeMiCentralController",
"WebManagerEvolucionDeMiCentralController",
"WebManagerInformacionDeCuentasController",
"WebManagerRecepcionDeEventosController",
"WebManagerRefreshPanelController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "WebManager.*",
        "Ext.Responsive",
        "Common.*"
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "WebManager.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});