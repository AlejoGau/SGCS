Ext.define('AdministratorSearch.view.t_accesosVehiculoProveedorFormView', {
    extend : 'Ext.form.Panel',
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
			//plugins: ['clearbutton'],
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
			//plugins: ['clearbutton'],
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
		
		
        this.callParent();
	} // cierro init

});