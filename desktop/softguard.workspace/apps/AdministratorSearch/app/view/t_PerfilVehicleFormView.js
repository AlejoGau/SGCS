Ext.define('AdministratorSearch.view.t_PerfilVehicleFormView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.t_perfilvehicleformview'],
	itemId: 't_perfilvehicleformview',

	layout: 'anchor',
	bodyPadding: 10,
	autoScroll: true,
	defaults: { anchor: '100%' },

	items: [
		{
			xtype: 'fieldset',
			title: 'Datos Generales',
			itemId: 'datosGenerales',
			collapsible: false,
			defaults: { anchor: '100%', labelWidth: 120 },
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Nombre del Perfil',
					name: 'pfv_cNombre',
					itemId: 'pfv_cNombre',
					allowBlank: false,
					maxLength: 100,
					enforceMaxLength: true,
					emptyText: 'Ej: Horario Colegio'
				},
				{
					xtype: 'textarea',
					fieldLabel: 'Descripción',
					name: 'pfv_cDescripcion',
					itemId: 'pfv_cDescripcion',
					allowBlank: false,
					maxLength: 300,
					enforceMaxLength: true,
					height: 60,
					emptyText: 'Ej: Horarios autorizados para el predio escolar'
				},
				{
					xtype: 'checkbox',
					fieldLabel: 'Aplica Feriado',
					name: 'pfv_iAplicaFeriado',
					itemId: 'pfv_iAplicaFeriado',
					inputValue: 1,
					uncheckedValue: 0
				}
			]
		},
		{
			xtype: 'grid',
			itemId: 'reglasGrid',
			title: 'Reglas Horarias',
			height: 260,
			margin: '10 0 0 0',

			plugins: [{
				ptype: 'cellediting',
				pluginId: 'reglasCellEditing',
				clicksToEdit: 1
			}],

			columns: [
				{ xtype: 'checkcolumn', header: 'L',  dataIndex: 'pvr_iLunes',     width: 45 },
				{ xtype: 'checkcolumn', header: 'M',  dataIndex: 'pvr_iMartes',    width: 45 },
				{ xtype: 'checkcolumn', header: 'Mi', dataIndex: 'pvr_iMiercoles', width: 45 },
				{ xtype: 'checkcolumn', header: 'J',  dataIndex: 'pvr_iJueves',    width: 45 },
				{ xtype: 'checkcolumn', header: 'V',  dataIndex: 'pvr_iViernes',   width: 45 },
				{ xtype: 'checkcolumn', header: 'S',  dataIndex: 'pvr_iSabado',    width: 45 },
				{ xtype: 'checkcolumn', header: 'D',  dataIndex: 'pvr_iDomingo',   width: 45 },
				{
					xtype: 'gridcolumn',
					header: 'Hora Inicio',
					dataIndex: 'pvr_tHoraInicio',
					flex: 1,
					renderer: function (value) {
						return value ? Ext.Date.format(value, 'H:i') : '';
					},
					editor: {
						xtype: 'timefield',
						format: 'H:i',
						increment: 15,
						allowBlank: false
					}
				},
				{
					xtype: 'gridcolumn',
					header: 'Hora Fin',
					dataIndex: 'pvr_tHoraFin',
					flex: 1,
					renderer: function (value) {
						return value ? Ext.Date.format(value, 'H:i') : '';
					},
					editor: {
						xtype: 'timefield',
						format: 'H:i',
						increment: 15,
						allowBlank: false
					}
				},
				{
					xtype: 'actioncolumn',
					header: 'Acciones',
					width: 70,
					align: 'center',
					items: [{
						iconCls: 'icon-delete',
						getTip: function () { return getLocale('Eliminar'); },
						handler: function (grid, rowIndex) {
							grid.getStore().removeAt(rowIndex);
						}
					}]
				}
			],

			tbar: [{
				iconCls: 'icon-table-add',
				text: 'Agregar regla',
				action: 'addrule',
				itemId: 'addrule'
			}]
		}
	],

	buttons: [
		{
			text: 'Guardar',
			iconCls: 'save',
			action: 'save',
			itemId: 'save'
		},
		{
			text: 'Cancelar',
			action: 'cancel',
			itemId: 'cancel'
		}
	]
});
