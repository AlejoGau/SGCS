Ext.define('AccessControl.view.m_accessControlProveedoresFormView', {
	extend: 'Ext.form.Panel',
	alias: 'widget.m_accesscontrolproveedoresformview',
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
			xtype: 'textfield',
			fieldLabel: 'Nombre',
			name: 'apr_cNombre',
			itemId: 'apr_cNombre',
			allowBlank: false,
			
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Identificación',
			name: 'apr_cIdentificacion',
			itemId: 'apr_cIdentificacion',
			allowBlank: false,
			validFlag: true,
			validator: function(value){
				
				return this.validFlag;
			}

			
		},

		{
			xtype: 'textfield',
			fieldLabel: 'Dirección',
			name: 'apr_cDireccion',
			itemId: 'apr_cDireccion',
			//allowBlank: false
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Código Postal',
			name: 'apr_cCodigoPostal',
			itemId: 'apr_cCodigoPostal',
			//allowBlank: false,
			//maxLength: 10,
			//minLength: 10,
			//maskRe: /[0-9]/,
			//regex: /[0-9]/,
			//regexText: getLocale('Debe ingresar máximo 10 caracteres'),
			//hidden: true
		}, 
		{
			xtype:'combobox',
			fieldLabel: 'Provincia',
			name: 'apr_iProvincia',
			displayField : 'pro_cdescripcion',
			queryMode: 'local',
			valueField : 'pro_idKey',
			itemId: 'apr_iProvincia',
			//plugins: ['clearbutton']
			

		},
		/*{
			xtype:'fieldset',
			title: 'Buenos Aires, Partido y localidad',
			itemId: 'OPGSP',
			padding: '5 5 5 5',
			hidden: true,
			layout: {
			   type: 'hbox',
			   align: 'stretch'
		   },
		   items: [
				{
				   xtype : 'combo',
				   fieldLabel : 'Partido',
				   displayField : 'OPGSP_cPartido',
				   queryMode: 'local',
				   valueField : 'OPGSP_idPartido',
				   itemId: 'OPGSP_Partido',
				   name:'OPGSP_Partido',
				   plugins: ['clearbutton'],
				   flex: 1
			   },{
				   xtype : 'combo',
				   fieldLabel : 'Localidad',
				   displayField : 'OPGSP_cLocalidad',
				   queryMode: 'local',
				   valueField : 'OPGSP_idLocalidad',
				   itemId: 'OPGSP_Localidad',
				   name:'OPGSP_Localidad',
				   plugins: ['clearbutton'],
				   labelAlign: 'right',
				   flex: 1
			   }
		   ]
	   },*/

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
			allowBlank: false
		},

		{
			xtype: 'combo',
			fieldLabel: 'Categoría',
			name : 'apr_iCategoria',
			itemId: 'apr_iCategoria',
			width: 100,
			displayField: 'acp_cDescripcion',
			valueField: 'Id',
			queryMode: 'local',
		},
		{
			xtype: 'combobox',
			fieldLabel: 'Operativo',
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
			name: 'apr_cObservaciones'
		},
	
	],
	buttons: 
		[
			{
				text: 'Guardar',
				action: 'save',
				itemId: 'save'
			}, {
				text: 'Solicitar cambio',
				iconCls: 'save',
				itemId: 'solitarcambio',
				action: 'solitarcambio',
				hidden: true
			}
		],


	initComponent: function () {

		
		this.callParent(arguments);
	} // cierro init

});