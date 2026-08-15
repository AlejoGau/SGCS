//MIGRADO2024
Ext.define('Common.view.ImagenesView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.imagenesview', 
    title: 'Zonas',
    //selModel: Ext.create'Ext.selection.CheckboxModel'),
    autoHeight: true,
    viewConfig: {
        preserveScrollOnRefresh: true
    },
    itemId:'gridview',
    columns: [
            {
            xtype:'actioncolumn',
            header : 'Imagen',
            width:60,
            items: [{
                    iconCls: 'icon-photo',
                    tooltip: getLocale('Ver imagen'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('imagenesview');
                        var record = grid.getStore().getAt(rowIndex);
                        view.fireEvent('previewImageClick',record,grid);
                    }
                }]
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'gri_dfechahora',
                header: 'Fecha y hora',
                sortable: true,
        	    width : 150
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'gri_carchivo',
                header: 'Archivo',
                sortable: true
            }, {
        			xtype : 'gridcolumn',
					header : 'Evento',
					dataIndex : 'rec_calarma',
					sortable : true,
            		groupable : true,
					renderer : function(value, metadata, record, colIndex,store, view) {
                        var texto ='';
                        var panel = this;
                        if (record.get('rec_calarma')){
                            texto = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                            
                            var txtColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolorletra'));
                            var backColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                            metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                            
                        }
                        return texto
                    },
					width : 210
				}
        ],
    initComponent: function () {
        this.callParent(arguments);
        this.onSelectChange = function (selModel, selections) {
            var button = this.down('button[action=delete]');
            if (button)
                button.setDisabled(selections.length === 0);
        };
        
        this.decimalColorToHTMLcolor = function(number) {
            var intnumber = number - 0;
            var red, green, blue;
    		var template = "#000000";
    	        red = (intnumber&0x0000ff) << 16;
    		green = intnumber&0x00ff00;
    		blue = (intnumber&0xff0000) >>> 16;
    	        intnumber = red|green|blue;
    	
    		var HTMLcolor = intnumber.toString(16);
    	
    	
    		HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;
    	
    		return HTMLcolor;
    	};
        
         
         /*var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);*/
        
    } // cierro init
});