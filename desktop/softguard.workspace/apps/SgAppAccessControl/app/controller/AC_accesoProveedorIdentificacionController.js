Ext.define('SgAppAccessControl.controller.AC_accesoProveedorIdentificacionController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: [],
	views: ['AC_accesoProveedorIdentificacionView'],

	init: function (config) {
		// genero los eventos

		this.control({
			'ac_accesoproveedoridentificacionview': {
				afterrender: this.initview
			}
		});
	},

	// Initial function
	initview: function (view) {
		var controller = this;
        console.log('Console record recuperado: '+view.record);
        var form=view.getForm();
        form.loadRecord(view.record);
        if (view.record.get('apr_cPathPicture') != null &&
            view.record.get('apr_cPathPicture') != ''){
            view.down('#Photo').setSrc('/gallery/' + view.record.get('apr_cPathPicture'));
            
            //view.down('#Photo').setWidth('32');
            //view.down('#Photo').setHeight('32');            
        }        

	}


})