
var _uiApplicationName = "Administrator";
Ext.application({
    extend: "Common.Application",
    name: "Administrator",
    controllers: [
"AdministratorController",
"AdministratorFormController",
"AdministratorModuleFormController",
"AdministratorModulesController",
"AdministratorSecurityController",
"AWCCBPSecurityController",
"AwccSecurityController",
"AWDMobileSecurityController",
"CleanAppSecurityController",
"DesktopSecurityController",
"FenceManagerSecurityController",
"MapGuardWebSecurityController",
"MasterWebDealerController",
"ModuleDetailController",
"RangeDetailController",
"RangeFormController",
"ReporteAutoridadesSecurityController",
"SgAppAccessControlSecurityController",
"SgAppSerTecSecurityController",
"SgAppWebReportSecurityController",
"SgMultimonitorSecurityController",
"SmartPanicsPCSecurityController",
"SmartPanicsSecurityController",
"TrackguardMonitoreoSecurityController",
"TrackGuardSecurityController",
"VideoSecurityController",
"VigiControlSecurityController",
"WebCRMSecurityController",
"WebDealerSecurityController",
"WebRemotoMobileSecurityController",
"WebRemotoSecurityController",
"UsuariosSelecterHelperController",
"TaxonomyMasterTreeController",
"SelecterHelperController",
"PerfilesHelperController",
"PasswordFormController",
"OrganizationHelperController",
"OrganizationFormController",
"EventSelecterHelperController",
"CuentaGridController",

    ],
    quickTips: false,
    platformConfig:{
        desktop:{
            quickTips: true,
        },
    },

    requires: [
        "Administrator.*",
        "Ext.Responsive",
        "Common.*",
    ],

    launch: function() {
        console.log(arguments);
    },
    mainView: "Administrator.view.MetadataViewport",

    onAppUpdate: function() {
        Ext.Msg.confirm("Actualizacion detectada", "Reload?", function(choice) {
            if (choice === "yes")
            {
                window.location.reload();
            }
        });
    },
});