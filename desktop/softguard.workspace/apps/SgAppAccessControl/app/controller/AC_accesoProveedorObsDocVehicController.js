Ext.define('SgAppAccessControl.controller.AC_accesoProveedorObsDocVehicController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: [],
	views: ['AC_accesoProveedorObsDocVehicView'],

	init: function (config) {
		// genero los eventos

		this.control({
			'ac_accesoproveedorobsdocvehicView': {
				afterrender: this.initview
			}
		});
	},

	// Initial function
	initview: function (view) {
		var controller = this;
		// Set false readQr
		
		// Setup UI.
		//controller.hideResultContainer(view);
		/*var viewAutGrid = Ext.widget('ac_accesoproveedorautgridview',{
			record: view.record,
			caller: view
		

		});
		var viewIdentificacion = Ext.widget('ac_accesoproveedoridentificacionview',{
				record: view.record,
				caller: view
			}
		);
		view.down('#cuadro1').add(viewIdentificacion);
		view.down('#cuadro2').add(viewAutGrid);
        */

	},

/*
	// button search click
	onSearchInvitationClick: function (btn, event, eOpts) {
		var controller = this;
		let view = btn.up('ac_controlioformview');
		let searchResultContainer = view.down('#searchResultContainer');
		let searchResultGridLeft = view.down('#searchResultGridLeft');
		let searchResultGridRight = view.down('#searchResultGridRight');

		controller.cleanUI(view);

		// Read form data
		let nameField = view.down('#name');
		let identificationField = view.down('#identification');
		let domainField = view.down('#domain');
		let accountField = view.down('#account');

		// Manipulate filter to grids
		let filterLeft = controller.createFilter(nameField, identificationField, domainField, accountField);
		let filterRight = controller.createFilter(nameField, identificationField, domainField, accountField);

		if (filterLeft) {
			// Init Loader
			view.mask = Ext.create('Ext.LoadMask', view, {
				msg: getLocale("Cargando informacion necesaria.")
			}).show();

			// Add elements to resultContainer
			// Left grid
			//------------------------			
			var filterextra='';
			if (accountField.getValue()) {
				filterextra=" (c.cue_cnombre LIKE '%"
					+accountField.getValue()+"%' OR c2.cue_cnombre LIKE '%"
					+accountField.getValue()+"%')";
			}				

			var panelLeft = Ext.widget('p_controlacceso_autorizacionview', {
				closable: false,
				preventHeader: true,
				header: false,
				height: 400,
				securityId: this.application._idModule,
				filterFromSearchContainer: filterLeft,
				filterextra : filterextra,
				createIO: false,
				onlyEnabledInvitations: true // value for show only valid invitations ( date > getDate() )
			});
			searchResultGridLeft.add(panelLeft);
		}
		if (filterRight){
			// Right grid
			//---------------------------
			if (accountField.getValue()) {
				filterRight.push({
					property: 'cue_cnombre:LIKE',
					value: accountField.getValue()
				});
			}		

			var panelRight = Ext.widget('ac_m_usuariosgridview', {
				closable: false,
				preventHeader: true,
				header: false,
				height: 400,
				securityId: this.application._idModule,
				filterFromSearchContainer: filterRight,
				hideFilterToolbar: true, // Value to hide filter, search and all buttons.
				newButtonLabel: getLocale('Nueva persona') // To change new button label.
			});
			searchResultGridRight.add(panelRight);

			// Load window with invitations 
			searchResultContainer.show();

			// Hide Loader
			setTimeout(function () {
				view.mask.hide();
			}, 1000)
		}
	},
*/

	// Clean grids
	/*cleanUI: function (view) {
		var controller = this;
		let searchResultGridLeft = view.down('#searchResultGridLeft');
		let searchResultGridRight = view.down('#searchResultGridRight');

		// Clean QR reading flag
		view.isQRReading = false;

		// Clean UI
		controller.hideResultContainer(view);

		if (searchResultGridLeft.items.length > 0)
			searchResultGridLeft.remove(searchResultGridLeft.items.items[0]);
		if (searchResultGridRight.items.length > 0)
			searchResultGridRight.remove(searchResultGridRight.items.items[0]);

	},

	// HideresultCointainer
	hideResultContainer: function (view) {
		let searchResultContainer = view.down('#searchResultContainer');
		searchResultContainer.hide();
	},*/


})