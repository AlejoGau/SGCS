Ext.define('SgAppAccessControl.controller.AC_accesoPersonaIdentificacionController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: [],
	views: ['AC_accesoPersonaIdentificacionView'],

	init: function (config) {
		// genero los eventos

		this.control({
			'ac_accesopersonaidentificacionview': {
				afterrender: this.initview
			}
		});
	},

	// Initial function
	initview: function (view) {
        var form=view.getForm();
        form.loadRecord(view.record);
        if (view.record.get('usu_cimagen') != null &&
            view.record.get('usu_cimagen') != ''){
            view.down('#Photo').setSrc('/gallery/' + view.record.get('usu_cimagen') + '?_dc=' + Math.floor((Math.random() * 1000) + 1))
        }        
	}


})