//MIGRADO2024
Ext.define('Common.controller.SofiaCalendarTabController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ ],
    views  : [ 'SofiaCalendarTabView' ],

    init : function() {
        this.control({
            'sofiacalendartabview': {
                beforerender: this.onInitView
            }
        });
    },

    onInitView: function(view){
        // Placeholder del tab Calendario
    }
});

