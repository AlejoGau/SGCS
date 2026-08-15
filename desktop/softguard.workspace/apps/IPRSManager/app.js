
var _uiApplicationName = "IPRSManager";
Ext.application({
    extend: "Common.Application",
    name: "IPRSManager",
    controllers: [
"IprsCommGridController",
"IPRSEventGridController",
"IPRSManagerController",
"IprsMonitorController",
"WebSocketTestController",
"t_iprsConeccionesFormNuevoController",
"t_iprsconeccionesFormController",
"IprServiciosGridController",
"IprServicioFormController",
"IprsConneccionGridController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "IPRSManager.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "IPRSManager.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});