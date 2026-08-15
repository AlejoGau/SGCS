Ext.define('AdministratorSearch.view.t_AccessVehiculoProveedorGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.t_accessvehiculoproveedorgridview'],
	title: 'Templates',
	autoHeight: true,
	viewConfig: {
		trackOver: true,
		stripeRows: true,
		loadMask: false
	},
	activeHelp: true,
	columns: [
//----------------------------------
		{
			xtype:'actioncolumn', 
			header: 'Foto',
			width:50,
			renderer: function(value, metadata,record){
				if ( record.get('avp_cPathPicture'))
					return '<img src="/gallery/' + record.get('avp_cPathPicture') + '" width="16" heigth="16" class="img-thumbnail" style="float:right" >';
				
			},
			
			iconCls: 'icon-photo',  // Use a URL in the icon config
			tooltip: 'Ver imagen',
			handler: function(grid, rowIndex, colIndex) {
				var view = this.up('t_accessvehiculoproveedorgridview');
				var record = grid.getStore().getAt(rowIndex),
					photo = record.get('avp_cPathPicture'),
					name = record.get('avp_cPathPicture');
				
				
				var tbar = [];
				if (view.profile >= 2){
					tbar = [Ext.create('common.view.UploadButton', {
							id: 'dragupload',
							text: 'Subir Foto',
							plugins: [{
										ptype: 'uploadwindow',
										title: 'Subir Foto',
										width: 350,
										height: 150
									}
							],
							uploader: 
							{
								url: '/rest/upload/new?search=softguardMiscFile',
								uploadpath: '',
								multi_selection: false,
								autoStart: true,
								maxFileSize: '50mb',
								
								dropElement: 'fotoImage',
								
								statusQueuedText: getLocale('Listo para subir'),
								statusUploadingText: getLocale('Subiendo')+' ({0}%)',
								statusFailedText: '<span style="color: red">Error</span>',
								statusDoneText: '<span style="color: green">Completo</span>',
					
								statusInvalidSizeText: 'Archivo demasiado largo',
								statusInvalidExtensionText: 'Formato inválido'
							},
							listeners: 
							{
								filesadded: function(uploader, files)								
								{
									return true;
								},
								
								beforeupload: function(uploader, file)								
								{
									var url = '/rest/upload/new?search=softguardMiscFile';
									if (this.path){
										url = url +'&Path='+me.path
									}
									
									uploader.uploader.settings.url = url
								},
					
								fileuploaded: function(uploader, file)								
								{
									//console.log('fileuploaded');
								},
								
								uploadcomplete: function(uploader, success, failed)								
								{
									var file = success.pop();
									w.down('image').setSrc('/gallery/'+file.name);
									record.set('apr_cPathPicture', file.name);
									
									record.save({
									callback : function(record, operation) {
										if (operation.success){
											notify('Los datos se guardaron con éxito');
										}
									}
								});
								},
								scope: this
							}
						}),
						{
							text: 'eliminar',
							iconCls: 'icon-delete',
							handler: function(){
								var win = this.up('window');
								var record = win.record;
								record.set('apr_cPathPicture', '');
								record.save();
								win.down('image').setSrc('/gallery/');
								//win.close();
							}
						}
					]
				}
			
				var w = Ext.widget('window', {
					title : 'Foto: ',
					height : 252,
					width : 360,
					closeAction : 'destroy',
					border : false,
					layout : 'fit',
					record: record,
					tbar:tbar,
					items : [
						{
							xtype:'image',
							src : '/gallery/' + photo,
							id: 'fotoImage'
						}
					],
					autoShow: true,
					modal:true
				});
			}
		},



//-------------------------------		
		{
		     xtype:'actioncolumn',
		     width:30,
		     items: [{
		         iconCls: 'icon-table-edit',
		         tooltip: getLocale('Editar'),
		         handler: function(grid, rowIndex, colIndex,item, event) {
		             var view = grid.up('t_accessvehiculoproveedorgridview');
		             var rec = grid.getStore().getAt(rowIndex);
		             view.fireEvent('objectedit',rec,grid);
		         }
		     }]
		},
		{
			xtype: 'gridcolumn',
			header: 'Marca',
			sortable: true,
			dataIndex: "Brand",
			/*renderer: function (value) {
				var store = Ext.data.StoreManager.get('SoftguardUsuarioTipoStore');
				var record = store.findRecord('Value', value);
				if (record == undefined)
					return '';
				else
					return record.get('Name');
			},*/
			flex: 1
		}, {
			xtype: 'gridcolumn',
			header: 'Modelo',
			dataIndex: 'Model',
			flex: 1
		}
		,{
			xtype : 'gridcolumn',            
			header : 'Identificación',
			dataIndex : 'avp_cIdentificacion',
			flex: 1
		},
		{
			xtype: 'gridcolumn',
			header: 'Matrícula',
			dataIndex: 'avp_cMatricula',
			flex: 1
		}, {
			//xtype: 'datecolumn',
			header: 'Seguro',
			dataIndex: 'avp_tVtoSeguro',
			
			renderer: Ext.util.Format.dateRenderer('d/m/Y'),
			flex: 1
		}, {
			//xtype: 'datecolumn',
			header: 'VTV',
			renderer: Ext.util.Format.dateRenderer('d/m/Y'),
			dataIndex: 'avp_tVtoVTV',
			flex: 1


		}

	],

	initComponent: function () {
		var comboSearch = [
			['usu_cnombre', getLocale('Nombre')]
		];

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
				}, "-", {
					text: 'Filtros',
					itemId: 'filtersProveedoresButton',
					menu: {
						xtype: 'menu',
						width: 280,
						items: [{
							xtype: 'panel',
							bodyPadding: 5,
							items: [{
								xtype: 'textfield',
								itemId: 'brand',
								fieldLabel: 'Marca'
							}, {
								xtype: 'textfield',
								itemId: 'model',
								fieldLabel: 'Modelo'
							}]
						}]
					}

				}, {
					iconCls: 'icon-find',
					text: 'Buscar',
					scope: this,
					action: 'search',
					itemId: 'searchProveedorsButton'
				}, '-',
				{
					iconCls: 'icon-find',
					text: 'Todos',
					scope: this,
					action: 'getall',
					itemId: 'getallProveedoresButton'
				}
			] // cierro items
		});

		this.addDocked(toolbar);

	}
});