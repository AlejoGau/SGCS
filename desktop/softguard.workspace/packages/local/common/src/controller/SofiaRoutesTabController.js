//MIGRADO2024
Ext.define('Common.controller.SofiaRoutesTabController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ ],
    views  : [ 'SofiaRoutesTabView' ],

    init : function() {
        this.control({
            'sofiaroutestabview': {
                beforerender: this.onInitView
            }
        });
    },

    onInitView: function(view){
        // Placeholder de inicialización del tab Rutas SofIA
    }
});

