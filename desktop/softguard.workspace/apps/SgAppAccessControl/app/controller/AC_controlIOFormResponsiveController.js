Ext.define('SgAppAccessControl.controller.AC_controlIOFormResponsiveController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: [],
	views: ['AC_controlIOFormResponsiveView'],

	init: function (config) {
		// genero los eventos

		this.control({
			'ac_controlioformresponsiveview': {
				afterrender: this.initview
			},
			'ac_controlioformresponsiveview button[action=searchPrincipalTab]': {
				click: this.onSearchInvitationClick
			},
			'ac_controlioformresponsiveview button[action=readQr]': {
				click: this.onReadQrClick
			},
			'ac_controlioformresponsiveview #identification': {
				blur: this.onIdentificacionBlur
			},
			'ac_controlioformresponsiveview textfield': {
				specialkey: this.onTextfieldSpecialKey
			},			
		});
	},

	// Initial function
	initview: function (view) {
		var controller = this;
		// Set false readQr
		view.isQRReading = false;
		// Setup UI.
		//controller.hideResultContainer(view);
	},

	onIdentificacionBlur: function(field){
		var _text = field.getValue();
		let data = _text.split('"');
		//console.log(data);
		if( data.length == 8 ||  data.length == 9 ) {
			// Formato nuevo
			apellido = data[1].trim()
			nombre   = data[2].trim()
			sexo     = data[3].trim()
			dni      = data[4].trim()
			fechaNac = data[6].trim()

			field.setValue(dni);
		} else if (data.length == 15 ||  data.length == 17) {
			// Formato anterior
			apellido = data[4].trim()
			nombre   = data[5].trim()
			sexo     = data[8].trim()
			dni      = data[1].trim()
			fechaNac = data[7].trim()
			field.setValue(dni);
		}
	},

	// button search click
	onSearchInvitationClick: function (btn, event, eOpts) {
		var controller = this;
		let view = btn.up('ac_controlioformresponsiveview');
		/*let searchResultContainer = view.down('#searchResultContainer');
		let searchResultGridLeft = view.down('#searchResultGridLeft');
		let searchResultGridRight = view.down('#searchResultGridRight');

		controller.cleanUI(view);
		*/
		// Read form data
		let nameField = view.down('#name');
		let identificationField = view.down('#identification');
		let domainField = view.down('#domain');
		let accountField = view.down('#account');

		// Manipulate filter to grids
		let filter = controller.createFilter(nameField, identificationField, domainField, accountField)

		if (filter) {
			// Init Loader
			view.mask = Ext.create('Ext.LoadMask', view, {
				msg: getLocale("Cargando informacion necesaria.")
			}).show();
			var tabPanel = view.up('tabpanel');
			var authview = tabPanel.down('p_controlacceso_autorizacionview');
			var authStore = authview.getStore();
			var filterAuth = Ext.Array.clone(filter);
			filterAuth.push({
					property: 'caa_fechahasta:GTEDATESTRING',
					value: Ext.Date.format(new Date(), 'Y-m-d ')+'00:00:00' //Ext.Date.format(new Date(), 'Y-m-d') + "T" + Ext.Date.format(new Date(), 'H:i:s')
			});
			authStore.clearFilter(true);
			authStore.filter(filterAuth);
			//authview.filters=filter;
			authStore.load();
			tabPanel.setActiveTab(1);

			var usuariosGridView = tabPanel.down('ac_m_usuariosgridview');
			var usuariosStore = usuariosGridView.getStore();
			
			filter.push({
				property: 'usu_ntipo:ININT',
				value: '5,6,7,8'
			});
			usuariosStore.clearFilter(true);
			usuariosStore.filter(filter);
			usuariosStore.load();

			// Add elements to resultContainer
			// Left grid
			/*var panelLeft = Ext.widget('p_controlacceso_autorizacionview', {
				closable: false,
				preventHeader: true,
				header: false,
				height: 400,
				securityId: this.application._idModule,
				filterFromSearchContainer: filter,
				createIO: false,
				onlyEnabledInvitations: true // value for show only valid invitations ( date > getDate() )
			});
			searchResultGridLeft.add(panelLeft);

			// Right grid
			var panelRight = Ext.widget('ac_m_usuariosgridview', {
				closable: false,
				preventHeader: true,
				header: false,
				height: 400,
				securityId: this.application._idModule,
				filterFromSearchContainer: filter,
				hideFilterToolbar: true, // Value to hide filter, search and all buttons.
				newButtonLabel: getLocale('Nueva persona') // To change new button label.
			});
			searchResultGridRight.add(panelRight);

			// Load window with invitations 
			searchResultContainer.show();
			*/
			// Hide Loader
			setTimeout(function () {
				view.mask.hide();
			}, 1000)
		}
	},

	// button readQR click
	onReadQrClick: function (btn, event, eOpts) {
		var controller = this;
		var view = btn.up('ac_controlioformresponsiveview');

		// Waiting for change on Identificacion input from QR readed
		view.isQRReading = true;

		let identificationField = view.down('#identification');
		identificationField.setValue('');
		identificationField.focus();
	},

	// Clean grids
	cleanUI: function (view) {
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

	// Hide resultCointainer
	hideResultContainer: function (view) {
		let searchResultContainer = view.down('#searchResultContainer');
		searchResultContainer.hide();
	},

	// filter for usuarios encontrados grid.
	createFilter: function (nameField, identificationField, domainField, accountField) {
		let filter = [];
		let error = 0

		// check nameField
		if (nameField.getValue()) {
			filter.push({
				property: 'usu_cnombre:LIKE',
				value: nameField.getValue()
			})
		} else {
			error++;
		}

		// check identificationField
		if (identificationField.getValue()) {
			filter.push({
				property: 'usu_cidentificacion:LIKE',
				value: identificationField.getValue()
			})
		} else {
			error++;
		}

		// check domainField
		if (domainField.getValue()) {
			filter.push({
				property: 'usu_cmetadata:LIKE',
				value: domainField.getValue()
			})
		} else {
			error++;
		}

		// check accountField
		if (accountField.getValue()) {
			filter.push({
				property: 'cue_cnombre:LIKE',
				value: accountField.getValue()
			})
		} else {
			error++;
		}

		if (error == 4) {
			Ext.Msg.alert(getLocale('Alerta'), getLocale('Revise los valores del formulario'));
			return false;
		} else {
			return filter;
		}
	},
	onTextfieldSpecialKey: function(field, event, options) {
		if (event.getKey() == event.ENTER) {
			var searchBtn = field.up('ac_controlioformresponsiveview').down('button#search');
			searchBtn.fireEvent('click', searchBtn, event, options);
		}
	  }

})