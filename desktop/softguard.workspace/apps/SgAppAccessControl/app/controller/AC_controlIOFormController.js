Ext.define('SgAppAccessControl.controller.AC_controlIOFormController', {
	extend: 'Ext.app.Controller',
	stores: [],
	models: [],
	views: ['AC_controlIOFormView'],

	init: function (config) {
		// genero los eventos

		this.control({
			'ac_controlioformview': {
				afterrender: this.initview
			},
			'ac_controlioformview button[action=searchPrincipalTab]': {
				click: this.onSearchInvitationClick
			},
			'ac_controlioformview button[action=readQr]': {
				click: this.onReadQrClick
			},
			'ac_controlioformview #identification': {
				blur: this.onIdentificacionBlur
			},
			'ac_controlioformview textfield': {
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
		controller.hideResultContainer(view);
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
		let view = btn.up('ac_controlioformview');
		let searchResultContainer = view.down('#searchResultContainer');
		let searchResultGridLeft = view.down('#searchResultGridLeft');
		let searchResultGridRight = view.down('#searchResultGridRight');
		let searchResultGridDelivery = view.down('#searchResultGridRightDelivery');

		controller.cleanUI(view);

		// Read form data
		let nameField = view.down('#name');
		let identificationField = view.down('#identification');
		let domainField = view.down('#domain');
		let accountField = view.down('#account');

		// Manipulate filter to grids
		let filterLeft = controller.createFilter(nameField, identificationField, domainField, accountField);
		let filterLeftProv = controller.createFilterProv(nameField, identificationField, domainField, accountField);
		let filterRight = controller.createFilter(nameField, identificationField, domainField, accountField);
		let filterDelivery = controller.createFilterDelivery(nameField);

		if (filterLeftProv) {
			// Init Loader
			view.mask = Ext.create('Ext.LoadMask', view, {
				msg: getLocale("Cargando informacion necesaria.")
			}).show();

			// Add elements to resultContainer
			// Left grid
			//------------------------			
			var filterextra='';
			/*if (accountField.getValue()) {
				filterextra=" (c.cue_cnombre LIKE '%"
					+accountField.getValue()+"%' OR c2.cue_cnombre LIKE '%"
					+accountField.getValue()+"%')";
			}	*/			

			var panelLeftAutPersonas = Ext.widget('p_controlacceso_autorizacionview', {
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
			var panelLeft = Ext.widget('m_accesscontrolproveedoresgridview', {
				closable: false,
				height: 230,
				securityId: this.application._idModule,
				itemId: 'm_accesscontrolproveedoresgridview',
				filterFromSearchContainer: filterLeftProv,
				listeners:{
					showHideLeftPanel: function(namePanel){
						if(namePanel=='PROVEEDOR'){
							searchResultGridLeft.remove(panelLeftAutPersonas);
							searchResultGridLeft.add(panelLeft);
							searchResultGridLeft.up('container').down('label').setHtml('<h1>'+getLocale('Proveedores')+'</h1>');
							//panelLeftAutPersonas.hide();
							//panelLeft.show();
						}
						if(namePanel=='PERSONA'){
							searchResultGridLeft.remove(panelLeft);
							searchResultGridLeft.add(panelLeftAutPersonas);
							searchResultGridLeft.up('container').down('label').setHtml('<h1>'+getLocale('Reporte Autorizaciones')+'</h1>');
							//panelLeft.hide();
							//panelLeftAutPersonas.show();
						}

					}
				}
				//filterextra : filterextra
			});			

			
			searchResultGridLeft.add(panelLeft);
			searchResultGridLeft.add(panelLeftAutPersonas);
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
				height: 230,
				securityId: this.application._idModule,
				filterFromSearchContainer: filterRight,
				hideFilterToolbar: true, // Value to hide filter, search and all buttons.
				newButtonLabel: getLocale('Nueva persona'), // To change new button label.
				esInicio: true,
			});
			searchResultGridRight.add(panelRight);

			// Load window with invitations 
			searchResultContainer.show();

			// Hide Loader
		}
		if(filterDelivery){

			var panelDelivery =Ext.widget('p_controlacceso_autorizaciondeliverygridview',{
				closable: false,
				iconCls: 'icon-email-edit',
				title: 'Delivery',
				filterFromSearchContainer: filterDelivery
			});
			searchResultGridDelivery.add(panelDelivery);

		}
		setTimeout(function () {
			view.mask.hide();
		}, 1000)

		//--------------------------
		//controller.onProveedorSearch(btn, event, eOpts);
	},

	// button readQR click
	onReadQrClick: function (btn, event, eOpts) {
		var controller = this;
		var view = btn.up('ac_controlioformview');

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
		let searchResultGridDelivery = view.down("#searchResultGridRightDelivery");

		// Clean QR reading flag
		view.isQRReading = false;

		// Clean UI
		controller.hideResultContainer(view);

		if (searchResultGridLeft.items.length > 0)
			searchResultGridLeft.remove(searchResultGridLeft.items.items[0]);
		if (searchResultGridRight.items.length > 0)
			searchResultGridRight.remove(searchResultGridRight.items.items[0]);
		if (searchResultGridDelivery.items.length > 0)
			searchResultGridDelivery.remove(searchResultGridDelivery.items.items[0]);


	},

	// Hide resultCointainer
	hideResultContainer: function (view) {
		let searchResultContainer = view.down('#searchResultContainer');
		searchResultContainer.hide();
	},
	createFilterDelivery: function(nameField){
		let filter = [];
		if(nameField.getValue()){
			filter.push({
				property: 'caa_comentarios:LIKE',
				value: nameField.getValue()
			});
		}
		return filter;
	},
	// filter for proveedores encontrados grid.
	createFilterProv: function (nameField, identificationField, domainField, accountField) {
		let filter = [];
		var error = 0;

        //{name:'apr_cIdentificacion',type:'string'},  
		
		//check nameFIeld
		if(nameField.getValue()){
			filter.push({
				property: 'apr_cNombre:LIKE',
				value: nameField.getValue()
			});
		} else {
			error++;
		}

		//check identificationField
		if(identificationField.getValue()){
			filter.push({
				property: 'apr_cIdentificacion:LIKE',
				value: identificationField.getValue()
			});
		} else {
			error ++;
		}

		if (error == 2) {
			Ext.Msg.alert(getLocale('Alerta'), getLocale('Revise los valores del formulario'));
			return false;
		} else {
			return filter;
		}		
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
			/*filter.push({
				property: 'c.cue_cnombre:LIKE :OR c2.cue_cnombre:LIKE',
				value: accountField.getValue()
			})*/
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
			var searchBtn = field.up('ac_controlioformview').down('button#search');
			searchBtn.focus()
			searchBtn.fireEvent('click', searchBtn, event, options);
			}
	}

})
