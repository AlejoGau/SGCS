//MIGRADO2024
Ext.define('Common.view.ParticionesGridView', {
    extend:'Ext.grid.Panel',
    alias : 'widget.particionesgridview', 
    selType: 'checkboxmodel',
    itemId: 'gridparticion',
    newText: 'Nueva partición',
    ignoreState: true,
    columns: [           
            {
                xtype:'actioncolumn', 
                width:60,
                header: 'Acciones',
                itemId: 'editparticion',
                items: [{
                    iconCls: 'icon-zonasEdit',
                    tooltip: getLocale('Modificar particion'),
                    itemId:'btnModificarParticion',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('particionesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                },{
                    iconCls: 'icon-cuentaEdit',
                    tooltip: getLocale('Modificar cuenta'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('particionesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('opencuenta',grid,rec);
                    }
                },{
                    iconCls: 'icon-add',
                    tooltip: getLocale('Agregar nueva zona'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('particionesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('addzona',view, rec);
                    }
                }]
            },{
                xtype: 'gridcolumn',
                dataIndex: 'zon_ccodigo',
                header: 'Número',
                renderer: function(value){
                    return value.substr(3,2);
                },
                sortable: true,
                width: 80
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'zon_cdescripcion',
                header: 'Descripción',
                sortable: true,
                flex:1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'cue_cnombre',
                header: 'Cuenta',
                itemId: 'columnCuenta',
                flex: 1,
                sortable: true,
                renderer: function(value, metadata,record){
                    return record.get('zon_cdealer')+"-"+record.get('zon_ccuenta')+' '+record.get('cue_cnombre');
                }
            },{
                xtype : 'gridcolumn',
                hidden: false,
    			header : 'Último evento',
    			dataIndex : 'sta_cultimaalarma',
                renderer : function(value, metadata, record, colIndex,store, view) {
                    var texto ='';
                    if ( record.get('sta_cultimaalarma') && record.get('sta_cultimaalarma') != '   '){
                        texto = record.get('sta_cultimaalarma') + ' - ' + record.get('cod_cdescripcion');
                        var txtColor = this.decimalColorToHTMLcolor(record.get('cod_nColorLetra'));
                        var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                        metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                    }
                    return texto
                },
    			sortable : true,
    			flex: 1,
                hidden: true
    		}
        ],
    initComponent: function () {
        this.callParent(arguments);


        /*this.onSelectChange = function (selModel, selections) {
            var button = this.down('button[action=delete]');
            if (button)
                button.setDisabled(selections.length === 0);
                
            var button = this.down('button[action=copy]');
            if (button)
                button.setDisabled(selections.length === 0);
        };*/
        
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            dock: 'top',
            autoShow: true,
           items: [
            
            {
                iconCls: 'icon-add',
                text: 'Agregar',
                action: 'add'
            },{
                iconCls: 'icon-page-copy',
                text: 'Actualizar datos',
                action: 'copy',
                disabled: true
            },{
                iconCls: 'icon-delete',
                text: 'Borrar',
                action: 'delete',
                itemId: 'delete',
                disabled: true
            }]
         }); 
         this.addDocked(toolbar);
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'pagingParticionesGrid',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
         
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
    } // cierro init
});