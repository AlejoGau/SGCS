
var _uiApplicationName = "SgAppAccessControl";
Ext.application({
    extend: "Common.Application",
    name: "SgAppAccessControl",
    controllers: [
"AC_m_usuariosFormController",
"AC_m_usuariosGridController",
"AccessControlCuentaController",
"p_controlAcceso_IOFormController",
"p_controlAcceso_IOGridController",
"p_controlAccesoGridController",
"SgAppAccessControlController",
"SoftguardUsuarioGridController",
"SoftguardUsuarioFormController",
"SoftguardNotaController",
"SoftguardMedicoFormController",
"SoftguardCuentaNewController",
"SoftguardContactoGridController",
"SoftguardContactoFormController",
"SelecterHelperController",
"p_controlAcceso_AutorizacionGridController",
"p_controlAcceso_AutorizacionFormController",
"ModuleController",
"MedicoGridController",
"m_usuariosFormController",
"DealerHelperController",
"CuentaGridController",
"CuentaFormController",
"CuentaController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "SgAppAccessControl.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "SgAppAccessControl.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});