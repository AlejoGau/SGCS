
var _uiApplicationName = "FileManager";
Ext.application({
    extend: "Common.Application",
    name: "FileManager",
    controllers: [
"FileGridController",
"FileManagerController",
"FileTreeController",
"ModuleController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "FileManager.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "FileManager.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});