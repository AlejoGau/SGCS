
var _uiApplicationName = "SgAppMultiMonitorWeb";
Ext.application({
    extend: "Common.Application",
    name: "SgAppMultiMonitorWeb",
    controllers: [
"EventosEnFalloRestauracionGridController",
"EventosFallosTesteoGridController",
"MultiMonitorWebController",
"ProcesamientoTRGridController",
"ZonaImagenByEventoController",
"VigiControlMonitoreoController",
"VehicleSlaveGpsController",
"TablasTelefonosJurisdiccionalesAccGridController",
"SPReadOnlyController",
"SPEventoVideoController",
"SoftguardZonaController",
"SoftguardUsuarioGridController",
"SoftguardTestController",
"SoftguardSmsController",
"SoftguardPanelController",
"SoftguardNotaController",
"SoftguardFalsaController",
"SoftguardEstadoController",
"SoftguardContactoGridController",
"SmartTrackGridController",
"SmartPanicsMonitoreoController",
"ReporteGraficoController",
"OrganizationCuentaGridController",
"MulticuentaTimelineController",
"ModuleController",
"MedicoGridController",
"MapGuardGridController",
"MapGuardGpsController",
"LlamadaTelefonosDealerGridController",
"LlamadasSmartpanicsGridController",
"LlamadasReaFullGridController",
"LlamadasJuridiccionalesGridController",
"LlamadaRealizadasGridController",
"LlamadaHelperController",
"LlamadaGridController",
"LlamadaContactarGridController",
"ImagePanelController",
"HorarioController",
"EventSmsController",
"EventRepAutController",
"EventProcesamientoController",
"EventPhoneController",
"EventoTimeLineFullController",
"EventoTimeLineController",
"EventosTrGridController",
"EventosPendientesTrGridController",
"EventoSonidoController",
"EventosMonitorController",
"EventosAutoRefreshController",
"EventoReCategorizacionFormController",
"EventoMonitoreoController",
"EventoFormController",
"EventoController",
"EventObservacionesController",
"EventImagesController",
"DispositivoMovilWidgetController",
"CuentaRecepcionController",
"CuentaImagenController",
"CuentaFormController",
"AwccUsuariosByCuentaGridController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "SgAppMultiMonitorWeb.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "SgAppMultiMonitorWeb.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});