Ext.define('GestorSim.controller.GestorSimController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['GestorSimView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'gestorsim': {
                afterrender: this.initview
            }

        });
    }, // cierro init  

    initview: function (view) {
        
        this.application._nameModule = 'GestionTarjetaSim';
        this.application._idModule = this.application.getModuleIdByName(this.application._nameModule);
        var idModule = this.application._idModule;
        var tienePermiso = SecurityModulesStore;//.isModuleAvailable(this.application._nameModule);

        var tabpanel = view.down('tabpanel');


        if (tienePermiso) {

            var tabActivas = Ext.widget('simgridview', {
                closable: false,
                title: getLocale("Administrador de SIM's"),
                iconCls: 'icon-user-green',
                securityId: idModule,
            });
            tabpanel.add(tabActivas);


        } else
            Ext.Msg.alert(getLocale('Error de Usuario'), getLocale('El usuario no tiene acceso a este modulo.'));


    },
    tieneModuloAsignado: function () { /** fucntion Agregada por Daniel Orlando Medina******* */
        var controller = this;

        var GestorSim = SecurityModulesStore.findRecord('KeyReference', 'GestorSim');
        if (GestorSim.get('Available')) {
            console.log("Tiene módulo GestorSim");
            return true;
        } else
            return false;
    }    /************************** */
});