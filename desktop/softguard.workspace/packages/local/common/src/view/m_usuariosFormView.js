//MIGRADO2024
Ext.define( 'Common.view.m_usuariosFormView', {
	extend: 'Ext.form.Panel',
	alias: 'widget.m_usuariosformview',
	preventHeader: true,
	frame: true,
	autoScroll: true,
	fieldDefaults: {
		labelAlign: 'left',
		labelWidth: 120,
		anchor: '100%'
	},
	items: [ {
		xtype: 'displayfield',
		itemId: 'cuentareadonly',
		fieldLabel: 'Unidad funcional',
		hidden: true,
	},
		{
			xtype: 'selecterfield',
			itemId: 'cuenta',
			simpleSelect: true,
			hidden: true,
			config: {
				disponible: {
					title: 'Cuenta',
					field: '_fullname',
					searchField: 'cue_cnombre',   /*{ Daniel O. Medina
								25/01/2021
						https://basecamp.com/2249105/projects/17543484/todos/421862631
						*/
					deleteLike: true /** Daniel O. Medina
								25/01/2021
						https://basecamp.com/2249105/projects/17543484/todos/421862631
						esta propiedad sirva para que en SelecterHelper 
						se quite del filtro la convención :LIKE		
					 */
				},
				selecionado: {
					title: 'Cuenta',
					field: '_fullname'
				},
				valueField: 'cue_iid',
				modelItems: 'Common.model.CuentaSearchModel'
			},
			filter: [ {
				property: 'tip_ntipo:ININT',
				value: '7,8'
			}],
			title: 'Unidad funcional'
		},
		{
			xtype: 'numberfield',
			fieldLabel: 'Código',
			name: 'usu_icodigo',
			itemId: 'usu_icodigo',
			allowBlank: false,
			hidden: true
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Nombre',
			name: 'usu_cnombre',
			itemId: 'usu_cnombre',
			allowBlank: false
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Identificación',
			name: 'usu_cidentificacion',
			itemId: 'usu_cidentificacion',
			allowBlank: false,
			maxLength: 20,
			maskRe: /[0-9]/,
			regex: /[0-9]/,
			regexText: getLocale( 'Debe ingresar máximo 20 caracteres' ),
			hidden: true
		},
		{
			xtype: 'fieldset',
			title: 'Datos del vehiculo',
			itemId: 'vehicleData',
			hidden: true,
			collapsible: false,
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Marca',
					name: 'Brand',
					itemId: 'Brand',
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Modelo',
					name: 'Model',
					itemId: 'Model',
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Patente',
					name: 'Domain',
					itemId: 'Domain',
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Color',
					name: 'Colour',
					itemId: 'Colour',
				},
				{
					/*xtype: 'datefield',
					fieldLabel: 'Año',
					format: 'Y',
					name: 'Year',
					itemId: 'Year',*/
					fieldLabel: 'Año',
					name: 'Year',
					itemId: 'Year',
					xtype: 'combo',
					store: new Ext.data.SimpleStore( {
						data: [
							[ 1995, '1995' ], [ 1996, '1996' ], [ 1997, '1997' ]
							, [ 1998, '1998' ], [ 1999, '1999' ]
							, [ 2000, '2000' ], [ 2001, '2001' ], [ 2002, '2002' ]
							, [ 2003, '2003' ], [ 2004, '2004' ]
							, [ 2005, '2005' ], [ 2006, '2006' ], [ 2007, '2007' ]
							, [ 2008, '2008' ], [ 2009, '2009' ]
							, [ 2010, '2010' ], [ 2011, '2011' ], [ 2012, '2012' ]
							, [ 2013, '2013' ], [ 2014, '2014' ]
							, [ 2015, '2015' ], [ 2016, '2016' ], [ 2017, '2017' ]
							, [ 2018, '2018' ], [ 2019, '2019' ]
							, [ 2020, '2020' ], [ 2021, '2021' ], [ 2022, '2022' ]
							, [ 2023, '2023' ], [ 2024, '2024' ]
							, [ 2025, '2025' ], [ 2026, '2026' ], [ 2027, '2027' ]
							, [ 2028, '2028' ], [ 2029, '2029' ]
						],
						id: 0,
						fields: [ 'value', 'text' ]
					}),
					valueField: 'value',
					displayField: 'text',
					triggerAction: 'all',
					editable: false,
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Tipo',
					name: 'VehicleType',
					itemId: 'VehicleType',
				},
				{
					xtype: 'datefield',
					fieldLabel: 'Seguro Vto',
					name: 'seguroVto',
					format: 'd/m/Y',
					itemId: 'seguroVto',
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Seguro Cia.',
					name: 'seguroCia',
					itemId: 'seguroCia',
				},
				{
					xtype: 'datefield',
					fieldLabel: 'VTV',
					format: 'd/m/Y',
					name: 'vtv',
					itemId: 'vtv',
				},
				{
					xtype: 'checkbox',
					fieldLabel: 'Blacklist',
					name: 'blacklist',
					itemId: 'blacklist',
				},
				{
					xtype: 'combo',
					fieldLabel: 'Perfil de acceso',
					name: 'profileVehicleId',
					itemId: 'profileVehicleId',
					// El store lo bindea m_usuariosFormController.initview: crearlo aca corre
					// al parsear el archivo, cuando el modelo de otro package todavia puede no
					// estar cargado.
					displayField: 'pfv_cNombre',
					valueField: 'Id',
					editable: false,
					queryMode: 'local'
				},
				{
					xtype: 'image',
					src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuNSA3Yy4yNzYgMCAuNS4yMjQuNS41di41MTFjMCAuNzkzLS45MjYuOTg5LTEuNjE2Ljk4OWwtMS4wODYtMmgyLjIwMnptLTEuNDQxIDMuNTA2Yy42MzkgMS4xODYuOTQ2IDIuMjUyLjk0NiAzLjY2NiAwIDEuMzctLjM5NyAyLjUzMy0xLjAwNSAzLjk4MXYxLjg0N2MwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMWgtMTN2MWMwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMS44NDdjLS42MDgtMS40NDgtMS4wMDUtMi42MTEtMS4wMDUtMy45ODEgMC0xLjQxNC4zMDctMi40OC45NDYtMy42NjYuODI5LTEuNTM3IDEuODUxLTMuNDUzIDIuOTMtNS4yNTIuODI4LTEuMzgyIDEuMjYyLTEuNzA3IDIuMjc4LTEuODg5IDEuNTMyLS4yNzUgMi45MTgtLjM2NSA0Ljg1MS0uMzY1czMuMzE5LjA5IDQuODUxLjM2NWMxLjAxNi4xODIgMS40NS41MDcgMi4yNzggMS44ODkgMS4wNzkgMS43OTkgMi4xMDEgMy43MTUgMi45MyA1LjI1MnptLTE2LjA1OSAyLjk5NGMwLS44MjgtLjY3Mi0xLjUtMS41LTEuNXMtMS41LjY3Mi0xLjUgMS41LjY3MiAxLjUgMS41IDEuNSAxLjUtLjY3MiAxLjUtMS41em0xMCAxYzAtLjI3Ni0uMjI0LS41LS41LS41aC03Yy0uMjc2IDAtLjUuMjI0LS41LjVzLjIyNC41LjUuNWg3Yy4yNzYgMCAuNS0uMjI0LjUtLjV6bTIuOTQxLTUuNTI3cy0uNzQtMS44MjYtMS42MzEtMy4xNDJjLS4yMDItLjI5OC0uNTE1LS41MDItLjg2OS0uNTY2LTEuNTExLS4yNzItMi44MzUtLjM1OS00LjQ0MS0uMzU5cy0yLjkzLjA4Ny00LjQ0MS4zNTljLS4zNTQuMDYzLS42NjcuMjY3LS44NjkuNTY2LS44OTEgMS4zMTUtMS42MzEgMy4xNDItMS42MzEgMy4xNDIgMS42NC4zMTMgNC4zMDkuNDk3IDYuOTQxLjQ5N3M1LjMwMS0uMTg0IDYuOTQxLS40OTd6bTIuMDU5IDQuNTI3YzAtLjgyOC0uNjcyLTEuNS0xLjUtMS41cy0xLjUuNjcyLTEuNSAxLjUuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjV6bS0xOC4yOTgtNi41aC0yLjIwMmMtLjI3NiAwLS41LjIyNC0uNS41di41MTFjMCAuNzkzLjkyNi45ODkgMS42MTYuOTg5bDEuMDg2LTJ6Ii8+PC9zdmc+',
					minHeight: 100,
					maxHeight: 200,
					minWidth: 100,
					maxWidth: 200,
					name: 'Photo',
					itemId: 'Photo'
				},
				/*{
								xtype: 'image',
								src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuNSA3Yy4yNzYgMCAuNS4yMjQuNS41di41MTFjMCAuNzkzLS45MjYuOTg5LTEuNjE2Ljk4OWwtMS4wODYtMmgyLjIwMnptLTEuNDQxIDMuNTA2Yy42MzkgMS4xODYuOTQ2IDIuMjUyLjk0NiAzLjY2NiAwIDEuMzctLjM5NyAyLjUzMy0xLjAwNSAzLjk4MXYxLjg0N2MwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMWgtMTN2MWMwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMS44NDdjLS42MDgtMS40NDgtMS4wMDUtMi42MTEtMS4wMDUtMy45ODEgMC0xLjQxNC4zMDctMi40OC45NDYtMy42NjYuODI5LTEuNTM3IDEuODUxLTMuNDUzIDIuOTMtNS4yNTIuODI4LTEuMzgyIDEuMjYyLTEuNzA3IDIuMjc4LTEuODg5IDEuNTMyLS4yNzUgMi45MTgtLjM2NSA0Ljg1MS0uMzY1czMuMzE5LjA5IDQuODUxLjM2NWMxLjAxNi4xODIgMS40NS41MDcgMi4yNzggMS44ODkgMS4wNzkgMS43OTkgMi4xMDEgMy43MTUgMi45MyA1LjI1MnptLTE2LjA1OSAyLjk5NGMwLS44MjgtLjY3Mi0xLjUtMS41LTEuNXMtMS41LjY3Mi0xLjUgMS41LjY3MiAxLjUgMS41IDEuNSAxLjUtLjY3MiAxLjUtMS41em0xMCAxYzAtLjI3Ni0uMjI0LS41LS41LS41aC03Yy0uMjc2IDAtLjUuMjI0LS41LjVzLjIyNC41LjUuNWg3Yy4yNzYgMCAuNS0uMjI0LjUtLjV6bTIuOTQxLTUuNTI3cy0uNzQtMS44MjYtMS42MzEtMy4xNDJjLS4yMDItLjI5OC0uNTE1LS41MDItLjg2OS0uNTY2LTEuNTExLS4yNzItMi44MzUtLjM1OS00LjQ0MS0uMzU5cy0yLjkzLjA4Ny00LjQ0MS4zNTljLS4zNTQuMDYzLS42NjcuMjY3LS44NjkuNTY2LS44OTEgMS4zMTUtMS42MzEgMy4xNDItMS42MzEgMy4xNDIgMS42NC4zMTMgNC4zMDkuNDk3IDYuOTQxLjQ5N3M1LjMwMS0uMTg0IDYuOTQxLS40OTd6bTIuMDU5IDQuNTI3YzAtLjgyOC0uNjcyLTEuNS0xLjUtMS41cy0xLjUuNjcyLTEuNSAxLjUuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjV6bS0xOC4yOTgtNi41aC0yLjIwMmMtLjI3NiAwLS41LjIyNC0uNS41di41MTFjMCAuNzkzLjkyNi45ODkgMS42MTYuOTg5bDEuMDg2LTJ6Ii8+PC9zdmc+',
								//minHeight: 150,
								width: '100%',
								height: '100%',
								name: 'usu_cimagen',
								itemId: 'usu_cimagen',
				},*/
				{
					xtype: 'button',
					text: 'Tomar una imagen del vehiculo',
					style: {
						marginTop: '10px',
						marginBottom: '10px',
						width: '100%'
					},
					handler: function() {
						var view = this.up( 'm_usuariosformview' )
						var domainInputValue = view.down( '#Domain' ).getValue();
						if( domainInputValue != "" ) {
							var localMediaStream;
							var w = Ext.widget( 'window', {
								title: 'Foto: ',
								height: 400,
								width: 800,
								closeAction: 'destroy',
								border: false,
								layout: 'hbox',
								listeners: {
									afterrender: function() {
										navigator.getUserMedia = navigator.getUserMedia ||
											navigator.webkitGetUserMedia ||
											navigator.mozGetUserMedia ||
											navigator.msGetUserMedia;
										var video = document.getElementById( "video" );
										var canvas = document.getElementById( "canvas" );
										var context = canvas.getContext( "2d" );
										navigator.getUserMedia( {
											video: true
										}, function( stream ) {
											if( video.mozSrcObject !== undefined ) {
												localMediaStream = stream;
												video.mozSrcObject = stream;
											} else {
												video.srcObject = stream;
											}
											var pngUrl = canvas.toDataURL()
										}, function( err ) {
											console.log( "The following error occured: " + err );
										});
									}
								},
								items: [ {
									width: 400,
									title: "Preview",
									height: 400,
									id: 'preview',
									html: '<video  id="video" width="400" height="320" autoplay style="backgound-color:#000; -webkit-mask-image: radial-gradient(circle at 50% 60%, black 50%, rgba(0, 0, 0, 0.6) 50%); mask-image: radial-gradient(circle at 50% 60%, black 50%, rgba(0, 0, 0, 0.6) 50%);"></video>',
									tbar: [ {
										text: "Snapshot",
										handler: function() {
											var video = document.getElementById( "video" );
											var canvas = document.getElementById( "canvas" );
											context = canvas.getContext( "2d" );
											context.drawImage( video, 0, 0, 400, 320 );
											//falta qeu suba la iamgen y apage la camara
											var filename = view.down( '#Domain' ).getValue() + '.png';
											Ext.Ajax.request( {
												url: '/handler/uploadFile?',
												method: 'POST',
												params: {
													fileName: filename,
													fileBase64: canvas.toDataURL().replace( 'data:image/png;base64,', '' )
												},
												scope: this,
												success: function( response ) {
													notify( 'subio' )
													view.down( '#photoName' ).setValue( filename );
													view.down( '#Photo' ).setSrc( '/gallery/' + filename + '?' + new Date().getTime() );
												}
											})
										}
									}]
								},
									{
										width: 400,
										title: "Snapshot",
										height: 400,
										html: '<canvas id="canvas" width="400" height="320"></canvas>'
									}
								],
								autoShow: true,
								modal: true
							});
							w.show()
						} else {
							notify( "El campo Patente no debe estar en blanco." );
						}
					}
				}, {
					xtype: 'displayfield',
					itemId: 'photoName',
					hidden: true
				}
			],
		}
		// Textfield orig 
		// {
		// 	xtype: 'textfield',
		// 	fieldLabel: 'Datos del vehículo',
		// 	name: 'usu_vehiculo',
		// 	itemId: 'usu_vehiculo',
		// 	allowBlank: false,
		// 	hidden: true
		// }
		/*,{
		    xtype: 'container',
		    layout: 'hbox',
		    items: [
		      {
		        xtype : 'textfield',
		        fieldLabel : 'Clave',
		        name : 'usu_cclave',
		        itemId: 'clave',
		        // disabled: true,
		        readOnly:true,
		        flex: 1,
		        inputType : 'password'
		      },{
		        xtype : 'textfield',
		        fieldLabel : 'Clave',
		        itemId: 'claveTxt',
		        //disabled: true,
		        readOnly:true,
		        hidden: true,
		        flex: 1
		        },
		        {
		          xtype: 'button',
		          text: 'Cambiar',
		          action: 'passwordChange'
		          }
		        ]
		  }*/
		, {
			xtype: 'textareafield',
			fieldLabel: 'Observacion',
			name: 'usu_mobservacion'
		},
		{
			xtype: 'combobox',
			fieldLabel: 'Tipo',
			store: 'SoftguardUsuarioTipoStore',
			displayField: 'Name',
			emptyText: getLocale( 'Seleccione' ),
			valueField: 'Value',
			name: 'usu_ntipo',
			queryMode: 'local',
			itemId: 'tipousuario',
		},
	],
	buttons: [ {
		text: 'Guardar',
		action: 'save',
		itemId: 'save'
	}, {
			text: 'Solicitar cambio',
			iconCls: 'save',
			itemId: 'solitarcambio',
			action: 'solitarcambio',
			hidden: true
		}],
	initComponent: function() {

		this.callParent( arguments );
	} // cierro init
});