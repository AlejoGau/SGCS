Ext.define('AdministratorSearch.controller.VehicleBrandPanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'VehicleBrandPanelView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'vehiclebrandpanelview' : {
				afterrender : this.initView,           
               
			}
            
		});
	},

	initView : function(view) {
        
	}, 
});