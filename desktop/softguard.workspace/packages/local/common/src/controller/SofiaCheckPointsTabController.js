
Ext.define('Common.controller.SofiaCheckPointsTabController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ ],
    views  : [ 'SofiaCheckPointsTabView' ],

    init : function() {
        this.control({
            'sofiacheckpointstabview': {
                beforerender: this.onInitView,
                recordchange: this.onRecordChange
            }
        });
    },

    onInitView: function(view){
        if (view.record) {
            view.setRecord(view.record);
        }
    },

    onRecordChange: function(view, record) {
        view.setRecord(record);
    }
});
