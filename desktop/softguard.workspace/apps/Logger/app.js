var _uiApplicationName = "Logger";
Ext.application({
    extend: "Common.Application",
    name: "Logger",
    controllers: [
        'EventSelecterHelperController',
        'LoggerController',
        'MultiCuentaLllamadasGrabadasGridController'
    ],
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true,
        },
    },

    requires: [
        "Logger.*",
        "Ext.Responsive",
        "Common.*"
    ],

    launch: function () {
        console.log(arguments);
    },
    mainView: "Logger.view.MetadataViewport",

    onAppUpdate: function () {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function (choice) {
            if (choice === "yes") {
                window.location.reload();
            }
        });
    },
});


