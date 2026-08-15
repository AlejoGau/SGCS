var _uiApplicationName = "Audit";
Ext.application({
    extend: "Common.Application",
    name: "Audit",
    controllers: [
        "AuditItemController",
        "AuditGridController",
        "AuditController"
    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "Audit.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "Audit.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});