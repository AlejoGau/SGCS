Ext.define('AccessControl.view.AC_accessControlProveedorFormView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.ac_accesscontrolproveedorformview'],
	preventHeader: true,
	width: 600,
	height: 500,
	//frame: true,
	autoScroll : true,
	fieldDefaults: {
		labelAlign: 'left',
		labelWidth: 120,
		anchor: '100%'

	},
	items: [
		{
			xtype: 'tabpanel',
			flex: 1,
			height: '100%',
			itemId: 'tabpanelProveedor',
			items: [
				{
					xtype:'panel',
					title: 'Proveedor',
					items:[

						{
							xtype: 'displayfield',
							fieldLabel: 'Fecha Alta',
							name: 'apr_tFechaAlta',
							width: '50%',
							itemId: 'apr_tFechaAlta',
							renderer: function (value, obj, record) {
								return value ? Ext.Date.format(new Date(value), 'd/m/Y') : ''
							}
						},{
							xtype: 'textfield',
							fieldLabel: 'Nombre',
							name: 'apr_cNombre',
							itemId: 'apr_cNombre',
							width: '50%',
							allowBlank: false,
							
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Identificación',
							name: 'apr_cIdentificacion',
							width: '50%',
							validFlag: true,
							itemId: 'apr_cIdentificacion',
							allowBlank: false,
							validator: function(value){
				
								return this.validFlag;
							}
				

						},

						{
							xtype: 'textfield',
							fieldLabel: 'Dirección',
							width: '50%',
							name: 'apr_cDireccion',
							itemId: 'apr_cDireccion',
							//allowBlank: false
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Código Postal',
							name: 'apr_cCodigoPostal',
							itemId: 'apr_cCodigoPostal',
							width: '50%',
							//allowBlank: false,
							//maxLength: 10,
							//minLength: 10,
							//maskRe: /[0-9]/,
							//regex: /[0-9]/,
							//regexText: getLocale('Debe ingresar máximo 10 caracteres'),
							
						}, 
						{
							xtype:'combobox',
							fieldLabel: 'Provincia',
							name: 'apr_iProvincia',
							displayField : 'pro_cdescripcion',
							queryMode: 'local',
							valueField : 'pro_idKey',
							width: '50%',
							itemId: 'apr_iProvincia',
							//plugins: ['clearbutton']
							

						},

				//-----------------		
						{
							xtype: 'textfield',
							fieldLabel: 'Localidad',
							name: 'apr_cLocalidad',
							itemId: 'apr_cLocalidad',
							width: '50%',
							allowBlank: false
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Teléfono',
							name: 'apr_cTelefono',
							itemId: 'apr_cTelefono',
							width: '50%',
							allowBlank: false
						},

						{
							xtype: 'combo',
							fieldLabel: 'Categoría',
							name : 'apr_iCategoria',
							itemId: 'apr_iCategoria',
							width: '50%',
							displayField: 'acp_cDescripcion',
							valueField: 'Id',
							queryMode: 'local',
						},
						{
							xtype: 'combobox',
							fieldLabel: 'Activo',
							name : 'apr_iStatus',
							itemId: 'apr_iStatus',
							displayField: 'text',
							valueField: 'value',
							queryMode: 'local',
							anchor: '50%'

						},
						{
							
							
									xtype: 'image',
									//src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuNSA3Yy4yNzYgMCAuNS4yMjQuNS41di41MTFjMCAuNzkzLS45MjYuOTg5LTEuNjE2Ljk4OWwtMS4wODYtMmgyLjIwMnptLTEuNDQxIDMuNTA2Yy42MzkgMS4xODYuOTQ2IDIuMjUyLjk0NiAzLjY2NiAwIDEuMzctLjM5NyAyLjUzMy0xLjAwNSAzLjk4MXYxLjg0N2MwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMWgtMTN2MWMwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMS44NDdjLS42MDgtMS40NDgtMS4wMDUtMi42MTEtMS4wMDUtMy45ODEgMC0xLjQxNC4zMDctMi40OC45NDYtMy42NjYuODI5LTEuNTM3IDEuODUxLTMuNDUzIDIuOTMtNS4yNTIuODI4LTEuMzgyIDEuMjYyLTEuNzA3IDIuMjc4LTEuODg5IDEuNTMyLS4yNzUgMi45MTgtLjM2NSA0Ljg1MS0uMzY1czMuMzE5LjA5IDQuODUxLjM2NWMxLjAxNi4xODIgMS40NS41MDcgMi4yNzggMS44ODkgMS4wNzkgMS43OTkgMi4xMDEgMy43MTUgMi45MyA1LjI1MnptLTE2LjA1OSAyLjk5NGMwLS44MjgtLjY3Mi0xLjUtMS41LTEuNXMtMS41LjY3Mi0xLjUgMS41LjY3MiAxLjUgMS41IDEuNSAxLjUtLjY3MiAxLjUtMS41em0xMCAxYzAtLjI3Ni0uMjI0LS41LS41LS41aC03Yy0uMjc2IDAtLjUuMjI0LS41LjVzLjIyNC41LjUuNWg3Yy4yNzYgMCAuNS0uMjI0LjUtLjV6bTIuOTQxLTUuNTI3cy0uNzQtMS44MjYtMS42MzEtMy4xNDJjLS4yMDItLjI5OC0uNTE1LS41MDItLjg2OS0uNTY2LTEuNTExLS4yNzItMi44MzUtLjM1OS00LjQ0MS0uMzU5cy0yLjkzLjA4Ny00LjQ0MS4zNTljLS4zNTQuMDYzLS42NjcuMjY3LS44NjkuNTY2LS44OTEgMS4zMTUtMS42MzEgMy4xNDItMS42MzEgMy4xNDIgMS42NC4zMTMgNC4zMDkuNDk3IDYuOTQxLjQ5N3M1LjMwMS0uMTg0IDYuOTQxLS40OTd6bTIuMDU5IDQuNTI3YzAtLjgyOC0uNjcyLTEuNS0xLjUtMS41cy0xLjUuNjcyLTEuNSAxLjUuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjV6bS0xOC4yOTgtNi41aC0yLjIwMmMtLjI3NiAwLS41LjIyNC0uNS41di41MTFjMCAuNzkzLjkyNi45ODkgMS42MTYuOTg5bDEuMDg2LTJ6Ii8+PC9zdmc+',
									src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNy4wMDFjMCAzLjg2NS0zLjEzNCA3LTcgN3MtNy0zLjEzNS03LTdjMC0zLjg2NyAzLjEzNC03LjAwMSA3LTcuMDAxczcgMy4xMzQgNyA3LjAwMXptLTEuNTk4IDcuMThjLTEuNTA2IDEuMTM3LTMuMzc0IDEuODItNS40MDIgMS44Mi0yLjAzIDAtMy44OTktLjY4NS01LjQwNy0xLjgyMi00LjA3MiAxLjc5My02LjU5MyA3LjM3Ni02LjU5MyA5LjgyMWgyNGMwLTIuNDIzLTIuNi04LjAwNi02LjU5OC05LjgxOXoiLz48L3N2Zz4=',
									minHeight: 100,
									maxHeight:200,
									minWidth:100,
									maxWidth:200,
									name: 'Photo',
									itemId: 'Photo'
						},
						,{
							xtype: 'displayfield',
							name: 'apr_cPathPicture',
							itemId: 'apr_cPathPicture',
							hidden: true
						},
						{
							xtype: 'button',
							text: 'Tomar una imagen',	
							action: 'uploadimg',
							style: {
								marginTop: '10px',
								marginBottom: '10px',
								width: '100%'
							},				
						}, {
							xtype: 'textareafield',
							fieldLabel: 'Observacion',
							width: '50%',
							name: 'apr_cObservaciones'
						},
					],// items tab panel datos proveedor
					buttons: 
						[
							{
								text: 'Guardar',
								action: 'save',
								itemId: 'save'
							}
						]

				},{
					xtype: 'ac_m_accesosproveedoresvehiculosview',
					title: 'Vehículos'
				},{
					xtype: 'ac_m_accesosproveedoresdocumentosview',
					title: 'Documentos'
				},{
					xtype: 'ac_m_accesosproveedoresautorizacionesgridview',
					title: 'Autorizaciones'
				}
					
			]//items tabpanel
		
		}
	],
	

	initComponent: function () {

		this.callParent(arguments);
		var proveedoresVehiculos = this.down('ac_m_accesosproveedoresvehiculosview');
		proveedoresVehiculos.record = this.record;	
		var	 proveedoresDoc = this.down('ac_m_accesosproveedoresdocumentosview');
		proveedoresDoc.record = this.record;
		var proveedoresAut = this.down('ac_m_accesosproveedoresautorizacionesgridview');
		proveedoresAut.record = this.record;

	} // cierro init

});