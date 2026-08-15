//MIGRADO2024
Ext.define('Common.controller.CuentaSofIAController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ ],
    views  : [ 'CuentaSofIAView', 'SofiaRoutesTabView', 'SofiaCalendarTabView' ],

    init : function() {
        this.control({
            'cuentasofiaview': {
                beforerender: this.onInitView
            }
        });
    },

    onInitView: function(view){
        // Placeholder para lógica de inicialización del contenedor SofIA
    }
});

