Ext.define('SgAppNotes.view.NotasArchivadasGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.notasarchivadasgridview', 
    title: 'Notas Archivadas',
	autoHeight: true,
	viewConfig: {
		trackOver: true,
		stripeRows: true,
		loadMask: false,
		listeners : {
			refresh : function (dataview) {
				
				Ext.each(dataview.panel.columns, function (column) {
					if (column.autoSizeColumn === true)
						column.setWidth(400);
				});
			}
		}		
	},
	activeHelp: true,
    columns:[
		{
			xtype: 'datecolumn',
			text: 'Fecha',
			autoSizeColumn: true,
			format:'d/m/Y',
			dataIndex: "sgn_datecreated",
        },{
			text: 'Usuario',
			autoSizeColumn: true,
			dataIndex:'udw_usuario'
        },{
            
			text: 'Notas',
			dataIndex: 'sgn_body',
			autoSizeColumn: true,
			renderer: function(value,metadata,record){
                var str = Ext.util.Format;
	            return str.stripTags(record.get('sgn_body') );
                
            },
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
            items:[
                {
					

                    xtype: 'datefield',
                    value: new Date(),
                    itemId: 'datedesde',
					fieldLabel: 'Desde',
					format:'d/m/Y',
                    labelWidth: 35						
				},{
                    xtype: 'datefield',
                    value: new Date(),
					itemId: 'datehasta',
					format:'d/m/Y',
                    fieldLabel: 'Hasta',
                    labelWidth: 35		
                }, {
					iconCls: 'icon-find',
					text: 'Buscar',
					scope: this,
					action: 'search',
					itemId: 'search'
				},{
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