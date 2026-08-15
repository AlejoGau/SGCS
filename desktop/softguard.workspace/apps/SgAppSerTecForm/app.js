
var _uiApplicationName = "SgAppSerTecForm";
Ext.application({
    extend: "Common.Application",
    name: "SgAppSerTecForm",
    controllers: [
        "SerTecController",
        "ServTecPanelController"

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "SgAppSerTecForm.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "SgAppSerTecForm.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});