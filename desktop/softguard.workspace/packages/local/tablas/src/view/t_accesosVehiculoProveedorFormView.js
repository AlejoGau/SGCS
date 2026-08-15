Ext.define('Tablas.view.t_accesosVehiculoProveedorFormView', {
	extend: 'Ext.form.Panel',
	alias: 'widget.t_accesosvehiculoproveedorformview',
	preventHeader: true,
	width: 600,
	height: 600,
	//frame: true,
	autoScroll : true,
	fieldDefaults: {
        labelWidth: 120,
		labelAlign: 'left',
		anchor: '100%'
	},
	items: [
		
		{
			xtype: 'combobox',
			fieldLabel: 'Marca',
			displayField: 'Name',
			emptyText: getLocale('Seleccione'),
			valueField: 'Id',
			name: 'avp_iVehicleBrand',
			queryMode: 'local',
			itemId: 'avp_iVehicleBrand',
            allowBlank: false
		},
		{
			xtype: 'combobox',
			fieldLabel: 'Modelo',
			displayField: 'Name',
			emptyText: getLocale('Seleccione'),
			valueField: 'Id',
			name: 'avp_iVehicleModel',
			queryMode: 'local',
			itemId: 'avp_iVehicleModel',
            allowBlank: false
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Matrícula',
			name: 'avp_cMatricula',
			itemId: 'avp_cMatricula',
			//allowBlank: false
		},  
		{
			xtype: 'textfield',
			fieldLabel: 'Color',
			name: 'avp_cColor',
			itemId: 'avp_cColor',
			//allowBlank: false,
		}, 
		{
			xtype:'numberfield',
			fieldLabel: 'Año',
			name: 'avp_iYear',
			itemId: 'avp_iYear',
			//plugins: ['clearbutton']
            
		},
//-----------------		
		{
			xtype: 'textfield',
			fieldLabel: 'Tipo',
			name: 'avp_cTipo',
			itemId: 'avp_cTipo',
			allowBlank: false
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Nombre Cía. de seguro',
			name: 'avp_cCiaSeguro',
			itemId: 'avp_cCiaSeguro',
			allowBlank: false
		},
        {
            xtype: 'datefield',
            fieldLabel: 'Seguro Vto.',
            name: 'avp_tVtoSeguro',
            format: 'd/m/Y',
            itemId: 'avp_tVtoSeguro',
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Vencimiento VTV',
            name: 'avp_tVtoVTV',
            format: 'd/m/Y',
            itemId: 'avp_tVtoVTV',
        },
		{
			xtype: 'textfield',
			fieldLabel: 'Nro. Ident. vehicular',
			name: 'avp_cIdentificacion',
			itemId: 'avp_cIdentificacion',
			allowBlank: false
		},
        {
            xtype: 'datefield',
            fieldLabel: 'Venc. Ident. vehicular',
            name: 'avp_tVtoIdentificacion',
            format: 'd/m/Y',
            itemId: 'avp_tVtoIdentificacion',
        },

//----        
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
			name: 'avp_cPathPicture',
			itemId: 'avp_cPathPicture',
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
			name: 'avp_cObservaciones'
		},
	
	],
	buttons: 
		[
			{
				text: 'Guardar',
				action: 'save',
				itemId: 'save'
			}
		],

	initComponent: function () {
		
		this.callParent(arguments);
	} // cierro init
});