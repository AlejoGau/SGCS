/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Common.Application',
    name: 'GestorSim',
    controllers: ['GestorSimController', 'SimGridController', 'SimController', 'SimNewController', 'Common.controller.CuentaHelperController', 'ModuleController', 'Sims_CuentaController','ComandosGpsConfigController', 'ComandosEnviadosGridController', 'ComandoGpsConfigController', 'ComandoGpsSendController', 'SmsGridController'],
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
            
        }
    },

    requires: [
        // This will automatically load all classes in the GestorSim namespace
        // so that application classes do not need to require each other.*-*
        'GestorSim.*',
        'Common.*'
    ],

    // The name of the initial view to create.
    mainView: 'GestorSim.view.MetadataViewport',
    onAppUpdate: function () {
        Ext.Msg.confirm('Actualizacion detectada', 'Reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
