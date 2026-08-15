Ext.define('AdministratorSearch.view.t_PerfilVehicleGridView', {
	extend: 'Ext.grid.GridPanel',
	alias: ['widget.t_perfilvehiclegridview'],
	title: 'Perfil Acceso Vehicular',
	autoHeight: true,
	viewConfig: {
		trackOver: true,
		stripeRows: true,
		loadMask: false
	},

	columns: [
		{
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				iconCls: 'icon-table-edit',
				getTip: function () { return getLocale('Editar'); },
				handler: function (grid, rowIndex) {
					var view = grid.up('t_perfilvehiclegridview');
					var rec = grid.getStore().getAt(rowIndex);
					view.fireEvent('objectedit', rec, grid);
				}
			}]
		},
		{
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				iconCls: 'icon-delete',
				getTip: function () { return getLocale('Eliminar'); },
				handler: function (grid, rowIndex) {
					var view = grid.up('t_perfilvehiclegridview');
					var rec = grid.getStore().getAt(rowIndex);
					view.fireEvent('objectdelete', rec, grid);
				}
			}]
		},
		{
			xtype: 'gridcolumn',
			header: 'Nombre',
			dataIndex: 'pfv_cNombre',
			flex: 1
		},
		{
			xtype: 'gridcolumn',
			header: 'Descripción',
			dataIndex: 'pfv_cDescripcion',
			flex: 2
		},
		{
			xtype: 'gridcolumn',
			header: 'Aplica Feriado',
			dataIndex: 'pfv_iAplicaFeriado',
			width: 110,
			renderer: function (value) {
				return value ? getLocale('Sí') : 'No';
			}
		}
	],

	initComponent: function () {
		this.callParent(arguments);

		var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
			dock: 'bottom',
			displayInfo: true
		});
		this.addDocked(pagingtoolbar);

		var toolbar = Ext.create('Ext.toolbar.Toolbar', {
			items: [{
				iconCls: 'icon-table-add',
				text: 'Nuevo',
				scope: this,
				action: 'add',
				itemId: 'add'
			}, '-', {
				text: 'Filtros',
				itemId: 'filtrosPerfilButton',
				menu: {
					xtype: 'menu',
					width: 280,
					items: [{
						xtype: 'panel',
						bodyPadding: 5,
						items: [{
							xtype: 'textfield',
							itemId: 'nombre',
							fieldLabel: 'Nombre'
						}]
					}]
				}
			}, {
				iconCls: 'icon-find',
				text: 'Buscar',
				scope: this,
				action: 'search',
				itemId: 'searchPerfilButton'
			}, '-', {
				iconCls: 'icon-find',
				text: 'Todos',
				scope: this,
				action: 'getall',
				itemId: 'getallPerfilButton'
			}, '-', {
				iconCls: 'x-tbar-loading',
				text: 'Refrescar',
				scope: this,
				action: 'refresh'
			}]
		});
		this.addDocked(toolbar);
	}
});
