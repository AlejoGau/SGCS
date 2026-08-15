Ext.define('AccessControl.controller.AC_accesoPersonaController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: [],
	views: ['AC_accesoPersonaView'],
	
	init: function (config) {
		// genero los eventos
		this.control({
			'ac_accesopersonaview': {
				afterrender: this.initview,
			}
		});
	},

	// Initial function
	initview: function (view) {
		this.view = view;
		var viewIdentificacion = Ext.widget('ac_accesopersonaidentificacionview',{
				record: view.record,
				caller: view,
			}
		);
		view.down('#cuadro1').add(viewIdentificacion);

		var viewAutGrid = Ext.widget('p_controlacceso_autorizacionview',{
			record: view.record,
			caller: view,
			title: 'Autorizaciones',
		});
		view.down('#cuadro2').add(viewAutGrid);

		var viewDetVehic = Ext.widget('ac_accesopersonadetallevehiculoview',{
			record: view.record,
			caller: view
		});
		view.down('#cuadro3').add(viewDetVehic);
		
		var viewObsDocVehic = Ext.widget('ac_accesoproveedorobsdocvehicView',{
				record: view.record,
				caller: view,
		});

		var tab1 = Ext.widget('ac_accesopersonavehiculosview', {
			title : 'Vehículos',
			iconCls:'icon-email-edit',
			height: 275,
			hideAddEdit: true,
			record: view.record,
			caller: view
		});

		var tab2 = Ext.widget('p_controlacceso_ioview',{
			title: 'Accesos',
			iconCls:'icon-email-edit',
			height: 275,
			hideAddEdit: true,
			record: view.record,
			caller: view,
			viewConfig:{
				infoABierta:true
			},
		});

		viewObsDocVehic.down('tabpanel').add(tab1);
		viewObsDocVehic.down('tabpanel').add(tab2);
		view.down('#cuadro4').add(viewObsDocVehic);
	},

})