
var _uiApplicationName = "SmartPanics";
Ext.application({
    extend: "Common.Application",
    name: "SmartPanics",
    controllers: [
"ConfiguraLandingController",
"ConfiguraLandingFormController",
"LandingNewController",
"SmartPanicsController",
"SmartPanicsGeocercasFormController",
"SmartPanicsNorthController",
"SmartPanicsPendingGridController",
"SPAllSeguimientoMapController",
"SpinBoxFormController",
"SpinBoxGridController",
"SpinBoxROController",
"VigiControlMonitoreoController",
"UsuariosSelecterHelperController",
"SPSeguientoGridController",
"SPReadOnlyController",
"SPEventoVideoController",
"SPDispSeguimientoMapController",
"SoftguardCuentaNewController",
"SoftguardCuentaCopyController",
"SmartTrackGridController",
"SmartPanicsMonitoreoController",
"SmartPanicsGeocercasGridController",
"SmartpanicsCrmGridController",
"SmartPanicGridController",
"SmartPanicFormHelperController",
"SmartPanicConfigController",
"SelecterHelperController",
"ModuleController",
"MailFormController",
"LlamadasSmartpanicsGridController",
"LlamadasReaFullGridController",
"LlamadasJuridiccionalesGridController",
"LlamadaRealizadasGridController",
"LlamadaHelperController",
"LlamadaGridController",
"LlamadaContactarGridController",
"ImagePanelController",
"EventSmsController",
"EventSmartpanicsLogController",
"EventSelecterHelperController",
"EventRepAutController",
"EventProcesamientoController",
"EventPhoneController",
"EventoTimeLineFullController",
"EventoTimeLineController",
"EventosTrGridController",
"EventoSonidoController",
"EventosMapController",
"EventosImagesController",
"EventoReCategorizacionFormController",
"EventoMapController",
"EventoFormController",
"EventoController",
"EventObservacionesFormController",
"EventObservacionesController",
"EventImagesController",
"EncuestasGridController",
"EncuestasFormController",
"EncuestaReporteNoCompletasController",
"EncuestaReporteListadoTextosController",
"EncuestaReporteEstadisticaOpcionController",
"EncuestaPreguntasFormController",
"EncuestaPreguntaOpcionesFormController",
"EncuestaEstadisticaEstadoGridController",
"EncuestaController",
"DealerHelperController",
"CuentaRecepcionController",
"CuentaHelperControllerBAK",
"CuentaGridController",
"CuentaFormController",
"CuentaController",
"AreaControlController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "SmartPanics.*",
        "Ext.Responsive",
        "Common.*",
        "Ext.chart.*"
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "SmartPanics.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});