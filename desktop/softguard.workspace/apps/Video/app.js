var _uiApplicationName = "Video";
Ext.application({
    extend: "Common.Application",
    name: "Video",
    controllers: [
        "VideoPreviewController",
        "VideoGrillaController",
        "VideoController",
        "m_cuentas_videoGridController",
        "m_cuentas_videoFormController",
        "m_cuentas_video_linksGridController",
        "m_cuentas_video_linksFormController",
        "m_cuenta_videoPanelController",
        //"m_cuentas_video_unificadoGridController",
        "EventSelecterHelperController",
    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },
    requires: [
        "Video.*",
        "Ext.Responsive",
        "Common.*"
    ],
    launch: function() {
        console.log(arguments);
    },
    mainView: "Video.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});