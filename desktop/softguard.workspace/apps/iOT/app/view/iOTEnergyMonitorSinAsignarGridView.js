Ext.define('iOT.view.iOTEnergyMonitorSinAsignarGridView', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.iotenergymonitorsinasignargridview',
	title: 'Medidores sin asignar',
	autoHeight: true,
	//selModel: Ext.create('Ext.selection.CheckboxModel'),
	selModel: Ext.create('Ext.selection.CheckboxModel',{
        showHeaderCheckbox: false,
        mode: 'SINGLE'
    }),
	viewConfig: {
		trackOver: true,
		stripeRows: true,
		loadMask: false,
		listeners: {
			refresh: function (dataview) {
				Ext.each(dataview.panel.columns, function (column) {
					if (column.autoSizeColumn === true)
						column.setWidth(400);
				});
			}
		}
	},
	activeHelp: true,
	columns: [
		{
			xtype: 'actioncolumn',
			text: 'Asociar',
			iconCls: 'icon-add',
			action: 'asociar',
			itemId: 'asociar',
			tooltip: getLocale('Asociar medidor'),
		}, {
			xtype: 'gridcolumn',
			header: 'Dispositivo',
			flex: 1, minWidth: 100,
			dataIndex: 'ped_cName'
		}, {
			xtype: 'gridcolumn',
			header: 'Identificador',
			flex: 1, minWidth: 100,
			dataIndex: 'ped_cDeviceID'
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
			items: [
				{
					iconCls: 'icon-arrow-refresh',
					text: 'Sincronizar Medidores',
					scope: this,
					action: 'sincronizar',
					itemId: 'sincronizar'
				}
			]
		});

		this.addDocked(toolbar);
	}
});


