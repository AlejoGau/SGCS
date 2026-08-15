Ext.define('Common.controller.ServTecReclamoController', {
    extend: 'Ext.app.Controller',
    models : [ 'ServTecHistoricoModel' ],
    views : [ 'ServTecReclamoView' ],
    init : function(config) {
        this.control({
            'sertecreclamoview':{
                afterrender: this.initview
            },
            'sertecreclamoview button[action=save]':{
                'click': this.onSave
            }
                
        });
    },
    initview: function(view){
        view.loadRecord(view.record);
    },
    onSave: function(button){
        var view = button.up('sertecreclamoview');
        var form = view.getForm();
        var record = form.getRecord();
        if (form.isValid()){
            form.updateRecord(record);
            record.save();
        }
    }
});