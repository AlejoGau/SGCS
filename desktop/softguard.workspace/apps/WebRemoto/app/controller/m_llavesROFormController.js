Ext.define('WebRemoto.controller.m_llavesROFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_llavesModel' ],
    views : [ 'm_llavesROFormView' ],

    init : function(config) {
		// genero los eventos
		this.control({
            'm_llavesroformview' : {
                afterrender : this.initview
            }
        });
	}, // cierro init
    
    initview : function(view) {
        var cuenta = view.recordCuenta;
        var module = view.module;
        var record = view.record;
        view.cuenta = cuenta;
        //var modules = this.getSecurityModulesStoreStore();
        var controller = this;
        
        view.loadRecord(record);
	}
});
