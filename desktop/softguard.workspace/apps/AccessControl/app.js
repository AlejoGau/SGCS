var _uiApplicationName = "SgAppAccessControl";
/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
  extend: "Common.Application",
  name: "AccessControl",
  models: ['Common.model.LocalizationModel'],
  controllers: [
    'Common.controller.EventSelecterHelperController',
    'Common.controller.CuentaRecepcionController',
    'SoftguardUsuarioGrid2Controller',
    "AC_accesoPersonaController",
    "AC_accesoPersonaDetalleVehiculoController",
    "AC_accesoPersonaIdentificacionController",
    "AC_accesoPersonaVehiculosController",
    "AC_accesoProveedorAutGridController",
    "AC_accesoProveedorController",
    "AC_accesoProveedorDetalleVehiculoController",
    "AC_accesoProveedorIdentificacionController",
    "AC_accesoProveedorObsDocVehicController",
    "AC_accesoProveedorObsDocVehicObservController",
    "AC_accessControlProveedorFormController",
    "AC_controlIOFormController",
    "AC_controlIOFormResponsiveController",
    "AC_m_AccesosProveedoresAutorizacionesGridController",
    "AC_m_AccesosProveedoresDocumentosController",
    "AC_m_AccesosProveedoresVehiculosController",
    "AC_m_usuariosFormController",
    "AC_m_usuariosGridController",
    "AC_p_controlAcceso_ProveedoresAutorizacionFormController",
    "AccessControlController",
    "AccessControlCuentaController",
    "ComandoGpsSendController",
    "CuentaSelectorHelperController",
    "SoftguardPanelController",
    "SoftguardPanelGridController",
    "EventoController",
    "CuentaFormController",
    "CuentaGridController",
    "DealerHelperController",
    "m_accessControlProveedoresFormController",
    "m_accessControlProveedoresGridController",
    "m_usuariosFormController",
    "MedicoGridController",
    "ModuleController",
    "p_controlAcceso_AutorizacionDeliveryGridController",
    "p_controlAcceso_AutorizacionFormController",
    "p_controlAcceso_AutorizacionGridController",
    "p_controlAcceso_IOFormController",
    "p_controlAcceso_IOGridController",
    "p_controlAccesoGridController",
    "PasswordFormController",
    "SelecterHelperController",
    "SoftguardContactoFormController",
    "SoftguardContactoGridController",
    "SoftguardCuentaNewController",
    "SoftguardMedicoFormController",
    "SoftguardNotaController",
    "SoftguardUsuarioFormController",
    "Tablas.controller.t_accesosVehiculoProveedorFormController",
    "Tablas.controller.t_accesosVehiculoProveedorGridController",
    "Tablas.controller.VehicleSelectorHelperController",
    "SoftguardUsuarioGridController",
    "t_instaladoresdealerGridController",
    "TablasInstaladoresFormController",
    "m_llavesFormController",
    "CuentaHelperController",
    
  ],
  quickTips: false,
  platformConfig: {
    desktop: {
      quickTips: true,
    },
  },

  requires: [
    // This will automatically load all classes in the AccessControl namespace
    // so that application classes do not need to require each other.
    "AccessControl.*",
    "Ext.Responsive",
    "Common.*",
    "Cuenta.*",
    "Tablas.*",
  ],

  launch: function () {
    console.log(arguments);
    var app = this;
    notCreatedLangKeyStore.each(function(rec){
      console.log('Langkey record: '+rec.get('name'));
      setTimeout(()=>{
        app.saveLangKey(rec.get('name'));  
      },200);      
      
    });

  },

  saveLangKey: function(name){
      var store = localizationStore;
      var newKey = this.getLocalizationModelModel();
      console.warn('Nueva palabra. '+name );
      var record = newKey.create(
       {
        Language: userLanguageStore.data.items[0].get('language'),
        UiApplication: _uiApplicationName,
        Name: name,
        Status: 'New',
        Translation: name
      });


      record.setId(0);

      record.save();
      store.add(record);     
  },

  // The name of the initial view to create.
  mainView: "AccessControl.view.MetadataViewport",

  onAppUpdate: function () {
    Ext.Msg.confirm("Actualizacion detectada", "Reload?", function (choice) {
      if (choice === "yes") {
        window.location.reload();
      }
    });
  },
});
