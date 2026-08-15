Ext.define('WeSafe.controller.SmartPanicsNorthController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'SmartPanicsNorthView' ],

    init : function(config) {
        // genero los eventos
    	this.control(
            {
			'smartpanicnorthview' : {
				beforerender : this.initView,
                changeCount : this.onChangeCount
			}
		});
	},

    onChangeCount: function (view, msg) {
        view.down('#toolbardisplayfield').setValue(msg);
        //view.doLayout();
    },

	initView : function(view) {
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();

        // modificar y usar el metodo interno del store
        var administratorModule = modules.findRecord('KeyReference','Administrator');
        var isAdmin = administratorModule?administratorModule.get('Available'):false;
        if(isAdmin) {
            view.down('#btnconfig').show()
        }
    }
});