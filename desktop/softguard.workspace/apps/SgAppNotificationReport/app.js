
var _uiApplicationName = "SgAppNotificationReport";
Ext.application({
    extend: "Common.Application",
    name: "SgAppNotificationReport",
    controllers: [
"NotificationReportController",
"PPushQueueCRMController",
"SmsRecibidosGridController",
"SmsGridController",
"SMPAttachGridController",
"SmartMailTrackingGridController",
"SmartMailProgramGridController",
"SmartMailFormController",
"SmartMailController",
"PPushQueueGridController",
"ModuleController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "SgAppNotificationReport.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "SgAppNotificationReport.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});