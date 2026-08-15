
var _uiApplicationName = "TrackguardMonitoreo";
Ext.application({
    extend: "Common.Application",
    name: "TrackguardMonitoreo",
    controllers: [
"TrackguardMonitoreoController",
"TrackguardMonitoreoPortletController",
"VistaHelperController",
"VideoPreviewController",
"VehicleSlaveGpsController",
"VehicleQuadController",
"VehicleHistoricoMapController",
"VehicleHistoricoController",
"VehicleGridController",
"VehicleGpsController",
"VehicleConductorListController",
"TripMapController",
"TripGridController",
"TripFormController",
"SoftguardUsuarioGridController",
"SoftguardUsuarioFormController",
"SoftguardSmsController",
"SmsRecibidosGridController",
"SmsGridController",
"RutaGridController",
"RutaFormController",
"PoiGridController",
"PanelConfigController",
"MulticuentaTimelineController",
"ModuleController",
"LlamadasSmartpanicsGridController",
"LlamadasReaFullGridController",
"LlamadaRealizadasGridController",
"LlamadaHelperController",
"ImagenesController",
"GeocercaGridController",
"GeocercaFormController",
"FlotaGridController",
"FlotaGpsController",
"EventSmsController",
"EventSelecterHelperController",
"EventRepAutController",
"EventProcesamientoController",
"EventPhoneController",
"EventoTimeLineFullController",
"EventoTimeLineController",
"EventoReCategorizacionFormController",
"EventoMapController",
"EventoFormController",
"EventoController",
"EventObservacionesFormController",
"EventObservacionesController",
"EventImagesController",
"DistanciaMapHelperController",
"DispositivoMovilWidgetController",
"CuentaReporteController",
"CuentaRecepcionController",
"ComandosGpsConfigController",
"ComandosEnviadosGridController",
"ComandoGpsSendController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "TrackguardMonitoreo.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "TrackguardMonitoreo.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});