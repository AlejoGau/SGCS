Ext.define('AccessControl.view.AC_m_AccesosProveedoresVehiculosView', {
    extend: 'Ext.grid.GridPanel',
    alias: ['widget.ac_m_accesosproveedoresvehiculosview'],
    title: '',
    
    //autoHeight: true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
        
        
    },

    height:300,
    scrollable:true,
    activeHelp: true,
    columns: [
         
		{
			xtype:'actioncolumn', 
			header: 'Foto',
			width:50,
			renderer: function(value, metadata,record){
				if ( record.get('apr_cPathPicture'))
					return '<img src="/gallery/' + record.get('apr_cPathPicture') + '" width="16" heigth="16" class="img-thumbnail" style="float:right" >';
			},
			
			iconCls: 'icon-photo',  // Use a URL in the icon config
			tooltip: 'Ver imagen',
			handler: function(grid, rowIndex, colIndex) {
				var view = this.up('ac_m_accesosproveedoresvehiculosview');
				var record = grid.getStore().getAt(rowIndex),
					photo = record.get('avp_cPathPicture'),
					name = record.get('avp_cPathPicture');
				
				
				var tbar = [];
			
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
            xtype: 'gridcolumn',
            header: 'Marca',
            dataIndex: 'BrandName',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Modelo',
            dataIndex: 'ModelName',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Matrícula',
            dataIndex: 'avp_cMatricula',
            flex: 1

        }, {
            xtype: 'gridcolumn',
            header: 'Año',
            dataIndex: 'avp_iYear',
            flex: 1
        }    

    ],

    initComponent: function () {
        var comboSearch = [
            ['fir_ccuenta', getLocale('Cuenta')],
            ['fir_cnombre', getLocale('Nombre')]
        ];



        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                iconCls: 'icon-add',
                text: 'Agregar',
                action: 'add'
            }, {
                iconCls: 'icon-delete',
                text: 'Eliminar',
                disabled: true,
                action: 'delete',
                itemId: 'delete'
            }            
            ] // cierro items
        });
        this.onSelectChange = function (selModel, selections) {
            this.down('button[action=delete]').setDisabled(selections.length === 0);
        };

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        this.addDocked(toolbar);
        if(this.hideAddEdit){
            toolbar.hide();

        }
    }
});