
var _uiApplicationName = "SgAppWebReport";
Ext.application({
    extend: "Common.Application",
    name: "SgAppWebReport",
    controllers: [
"CantidadEventosPorDiaController",
"EstadisticaEventosController",
"ExportarReporteEventosController",
"InformeCuentaController",
"ReporteActividadSmartPanicsController",
"ReporteAuditoriaController",
"ReporteCobroController",
"ReporteComandosEnviadosController",
"ReporteContratosController",
"ReporteControlIOController",
"ReporteCotizacionesCrmController",
"ReporteCotizacionesTotalCrmController",
"ReporteCotizacionesVencidasCrmController",
"ReporteCronogramaTecnicoController",
"ReporteCuentaEstadosMStatusController",
"ReporteCuentasFalloTesteoACController",
"ReporteCuentasFalloTesteoController",
"ReporteCuentasFaltaActivacionController",
"ReporteCuentaSinControlTestConfiguradoController",
"ReporteEstadisticaPorCategorizacionController",
"ReporteEstadisticaPorServicioController",
"ReporteEstadoCuentaController",
"ReporteEventosAlDiaController",
"ReporteEventosByCuentaController",
"ReporteEventosByCuentaZonaController",
"ReporteEventosNHController",
"ReporteEventosPorOperadorController",
"ReporteFlujoSenalesController",
"ReporteFlujoSenalesPuertoController",
"ReporteHistorialAsignacionController",
"ReporteHistorialAsignacionesCleanAppController",
"ReporteHistoricoEventosCuentaNoHabController",
"ReporteHistoricoEventosRedireccionadosController",
"ReporteHorasContratadasPorObjetivoController",
"ReporteHorasPersonalLimpiezaCleanAppController",
"ReporteHorasPorObjetivoCleanAppController",
"ReporteHorasPorObjetivoController",
"ReporteHorasPorTecnicoController",
"ReporteHorasVigiladorController",
"ReporteHorasVigiladorMesController",
"ReporteInformeMovimientoStockController",
"ReporteInformeProductosInsumosController",
"ReporteInformeStockMinimoController",
"ReporteLlamadasEnEventosController",
"ReporteLoginLogoutController",
"ReporteMarcacionesCheckpointController",
"ReporteMarcacionesDiaController",
"ReporteMarcacionesPorDiaSemanaHoraController",
"ReporteOperadorTiempoRespuestaController",
"ReporteOperadorTiempoYPrioridadController",
"ReporteOPGSPController",
"ReporteOrganizacionController",
"ReportePanelAlarmaController",
"ReportePerformanceController",
"ReportePostasCleanAppController",
"ReportePromedioAtencionEventoByPrioridadController",
"ReporteRondasVigicontrolController",
"ReporteServiciosPorEstadoController",
"ReporteSmartPanicsDispositivosController",
"ReporteSmartPanicsDispositivosDetController",
"ReporteSmsController",
"ReporteSMSEnviadosController",
"ReporteSumarioDealersController",
"ReporteSumarioPorOrgController",
"ReporteSumarioTipoController",
"ReporteTgExcesoVelocidadController",
"ReporteTgPersonalController",
"ReporteTgVehicularController",
"ReporteTgResumenRecorridosController",
"ReporteTgTiempoDetenidoController",
"ReporteViajesTGController",
"ReporteTiemposEventosController",
"ReporteUltimoEventoCuentaController",
"ReporteUsuariosController",
"SgAppWebReportController",
"ReporteServTecController",
"ReporteEventosController",
"OrganizationHelperController",
"OrderPrintController",
"OrdenServTecController",
"ModuleController",
"MailFormController",
"EventSelecterHelperController",
"FilterEventSelecterHelperController",
"CuentasMovilesHelperController",
"CuentaHelperControllerBAK",
"HorasVigiladorPorNombreobjetivoController",
"ReporteHsVigiladorMensualTeoricasController",
"ReporteVigicontrolListadoResumenController"

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "SgAppWebReport.*",
        "Ext.Responsive",
        "Common.*"
    ],

    launch: function() {
        console.log(arguments);
        var app = this;
        notCreatedLangKeyStore.each(function(rec){
            console.log('Langkey record: '+rec.get('name'));
            setTimeout(()=>{
              app.saveLangKey(rec.get('name'));  
            });      
            
          });        
    },

    saveLangKey: function(name){
        var store = localizationStore;
        var newKey = Ext.create('Common.model.LocalizationModel', {
          Language: 'es-ar',
          UiApplication: _uiApplicationName,
          Name: name,
          Status: 'New',
          Translation: name
        });
  
        console.warn('[Nueva palabra]', name);
        newKey.setId(0);
  
        newKey.save();
        //store.add(newKey);     
    },    
    mainView: "SgAppWebReport.view.WPView",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});