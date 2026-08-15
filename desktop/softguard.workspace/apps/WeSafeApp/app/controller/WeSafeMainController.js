Ext.define('WeSafe.controller.WeSafeMainController', {
    extend : 'Ext.app.Controller',
    stores : [ 'WeSafeEventosInformadosStore' ],
    models : [ 'WeSafeEventosInformadosModel' ],
    views : [ 'WeSafeMainView' ],
    init: function() {
        // Configuro los eventos
        this.control({
            'wesafemainview': {  // Usar el alias correcto de la vista
                afterrender: this.initView
            }
        });
    }, // Cierro init

    initView: function(view) {
    }
});