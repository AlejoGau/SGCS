Ext.define('AccessControl.controller.AC_accesoProveedorDetalleVehiculoController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: [],
	views: ['AC_accesoProveedorDetalleVehiculoView'],

	init: function (config) {
		// genero los eventos

		this.control({
			'ac_accesoproveedordetallevehiculoview': {
				afterrender: this.initview
			}
		});
	},

	// Initial function
	initview: function (view) {

        
	}




})