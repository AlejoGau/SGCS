
var _uiApplicationName = "SgAppMapGuardWeb";
Ext.application({
    extend: "Common.Application",
    name: "SgAppMapGuardWeb",
    controllers: [
"HeatMapController",
"MapguardInfoMovileController",
"MapGuardWebController",
"ServTecGpsFullController",
"ServTecWidgetController",
"SgAppMapGuardWebController",
"VigiControllGpsFullController",
"VideoPreviewController",
"VehicleSlaveGpsController",
"VehicleHistoricoMapController",
"VehicleHistoricoController",
"TripViewerController",
"TripMapController",
"TripGridController",
"TripFormController",
"TGResumenPanelController",
"SPDispSeguimientoMapController",
"SoftguardUsuarioGridController",
"SoftguardSmsController",
"SmsRecibidosGridController",
"SmsGridController",
"SmsEnvioFormController",
"SmartTrackGridController",
"SmartPanicGridController",
"SmartMailProgramGridController",
"RoutesGridController",
"PPushQueueSPController",
"PoiGridController",
"MovilesGridController",
"MapguardNewMovilController",
"MapguardMovilController",
"MapGuardGridController",
"MapGuardGpsController",
"MapGuardEventosController",
"MapguardCuentaController",
"MailFormController",
"GeocercaGridController",
"GeocercaFormController",
"FlotaGridController",
"EventSelecterHelperController",
"DispositivoMovilWidgetController",
"CuentaRecepcionController",
"CuentaGridController",
"CuentaEventosPendientesController",
"ComandosGpsConfigController",
"ComandosEnviadosGridController",
"ComandoGpsSendController",
"CheckPointsGridController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "SgAppMapGuardWeb.*",
        "Ext.Responsive",
        "Common.*"
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "SgAppMapGuardWeb.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});