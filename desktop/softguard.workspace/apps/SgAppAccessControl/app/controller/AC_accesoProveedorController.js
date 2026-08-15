Ext.define('SgAppAccessControl.controller.AC_accesoProveedorController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: [],
	views: ['AC_accesoProveedorView'],
	
	init: function (config) {
		// genero los eventos

		this.control({
			'ac_accesoproveedorview': {
				afterrender: this.initview,
				showVehicleDetail: this.onShowVehicleDetail
			}
		});
	},

	// Initial function
	initview: function (view) {
		this.view = view;
		
		var viewIdentificacion = Ext.widget('ac_accesoproveedoridentificacionview',{
				record: view.record,
				caller: view
			}
		);
		view.down('#cuadro1').add(viewIdentificacion);

		var viewAutGrid = Ext.widget('ac_accesoproveedorautgridview',{
			record: view.record,
			caller: view
		});
		view.down('#cuadro2').add(viewAutGrid);

		var viewDetVehic = Ext.widget('ac_accesoproveedordetallevehiculoview',{
			record: view.record,
			caller: view
		});
		view.down('#cuadro3').add(viewDetVehic);

		var viewObsDocVehic = Ext.widget('ac_accesoproveedorobsdocvehicView',{
				record: view.record,
				caller: view
		});

		var tab1 = Ext.widget('ac_m_accesosproveedoresvehiculosview', {
			title : 'Vehículos',
			iconCls:'icon-email-edit',
			height: 275,
			
			hideAddEdit: true,
			record: view.record,
			caller: view
		});

		var tab2 = Ext.widget('ac_m_accesosproveedoresdocumentosview',{
			title: 'Documentos',
			iconCls:'icon-email-edit',
			layout:'fit',
			height: 275,
			hideAddEdit: true,
			record: view.record,
			caller: view
		});

		var tab3 = Ext.widget('ac_accesoproveedorobsdocvehicobservview',{
			title: 'Comentarios',
			iconCls:'icon-email-edit',
			height: 275,
			
			record: view.record,
			caller: view
		});		

		//tab3.setHeight(100);


		viewObsDocVehic.down('tabpanel').add(tab1);
		viewObsDocVehic.down('tabpanel').add(tab2);
		viewObsDocVehic.down('tabpanel').add(tab3);		
		view.down('#cuadro4').add(viewObsDocVehic);
	},

	onShowVehicleDetail: function(record){
		var form = this.view.down('ac_accesoproveedordetallevehiculoview').getForm();
		var view = this.view.down('ac_accesoproveedordetallevehiculoview');
		form.loadRecord(record);
		if (record.get('avp_cPathPicture') != null &&
				record.get('avp_cPathPicture') != ''){
				view.down('#Photo').setSrc('/gallery/' + record.get('avp_cPathPicture'));
				
		}
	 
	}



})