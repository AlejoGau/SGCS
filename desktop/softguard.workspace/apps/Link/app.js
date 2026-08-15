//MIGRADO2024
var _uiApplicationName = "Link";
Ext.application({
    extend: "Common.Application",
    name: "Link",
    controllers: [
"LinkUrlController",
"LinkUrlHtmlController",
"LinkUrlGridController",
"LinkUrlFormController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    launch: function() {
        console.log(arguments);
    },
    mainView: "Link.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});
