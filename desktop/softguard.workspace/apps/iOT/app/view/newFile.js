Ext.define('iOT.view.iOTEnergyMonitorCuentaAsignadaGridView', {
	extend: 'Ext.grid.GridPanel',
	alias: 'widget.iotenergymonitorcuentaasignadagridview',
	title: 'Medidores sin asignar',
	autoHeight: true,
	selModel: Ext.create('Ext.selection.CheckboxModel'),
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
			xtype: 'gridcolumn',
			header: 'Cuenta',
			sortable: true,
			width: 250,
			flex: 1,
			minWidth: 100,
			dataIndex: 'cue_clinea',
			renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
				console.log(record);
				record.get('cue_clinea') + ' - ' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');
				return value;
			}
		}, {
			xtype: 'gridcolumn',
			header: 'Nombre',
			flex: 1, minWidth: 100,
			dataIndex: ''
		}, {
			xtype: 'gridcolumn',
			header: 'Dispositivo',
			flex: 1, minWidth: 100,
			dataIndex: ''
		}, {
			xtype: 'gridcolumn',
			header: 'Identificador',
			flex: 1, minWidth: 100,
			dataIndex: ''
		}, {
			xtype: 'gridcolumn',
			header: 'Tablero',
			flex: 1, minWidth: 100,
			dataIndex: ''
		},
		/*{
			xtype: 'datecolumn',
			text: 'FechaXXXX',
		    
			format:'d/m/Y',
			autoSizeColumn: true,
			dataIndex: "sgn_datecreated",
			renderer: function(value,metadata,record){
				var str = Ext.util.Format;
				return record.get('sgn_datecreated')+' SSS';
			}
		},{

			text: 'UsuarioXXXXXXX',
			autoSizeColumn: true,
			dataIndex: 'udw_usuario'
		}, {

			text: 'NotasXXXXXXX',
			dataIndex: 'sgn_body',
			autoSizeColumn: true,
			renderer: function (value, metadata, record) {
				var str = Ext.util.Format;
				return str.stripTags(record.get('sgn_body'));

			},

		},*/
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
					xtype: 'datefield',
					value: new Date(),
					itemId: 'datedesde',
					fieldLabel: 'Desde',
					format: 'd/m/Y',
					labelWidth: 35
				}, {
					xtype: 'datefield',
					value: new Date(),
					itemId: 'datehasta',
					format: 'd/m/Y',
					fieldLabel: 'Hasta',
					labelWidth: 35
				}, {
					iconCls: 'icon-find',
					text: 'Buscar',
					scope: this,
					action: 'search',
					itemId: 'search'
				}, {
					iconCls: 'icon-find',
					text: 'Todos',
					scope: this,
					action: 'todos',
					itemId: 'todos'
				}
			]
		});

		this.addDocked(toolbar);
	}
});
