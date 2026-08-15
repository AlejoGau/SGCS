Ext.define('SgAppMultiMonitorWeb.view.EventosEnFalloRestauracionGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.eventosenfallorestauraciongridview'],
    title : 'Templates',
    autoHeight : true, 
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype:'actioncolumn',
            header : '',
            width:30,
            items: [{
                iconCls: 'icon-arrow-undo',
                tooltip: getLocale('Restaurar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('eventosenfallorestauraciongridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectrestaurar',rec,view);
                }
                
            }   
        ]},{
            xtype : 'gridcolumn',            
            header : 'Cuenta',
            dataIndex : 'efr_iidCuenta',
            flex: 1,
            renderer: function(value, metaData, record){
               return  record.get('efr_cLinea')+'-'+record.get('efr_cCuenta') + ' '+record.get('efr_cNombre')
            }
        },{
            xtype : 'gridcolumn',            
            header : 'Fecha de fallo',
			dataIndex : 'efr_tFallaFechaHora',
            flex: 1,
            renderer: function(value, metaData, record){
               return  Ext.Date.format(value,'d/m/Y H:i:s');
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Alarma',
    		dataIndex : 'efr_cAlarma',
            flex: 1,
            renderer: function(value, metadata, record){

                var texto ='';
              
                var panel = this;
                
                texto = record.get('efr_cAlarma') + ' - ' + record.get('efr_cAlarmaDescripcion');
                record.txtColor = panel.decimalColorToHTMLcolor(record.get('efr_nAlarmaColorLetra'));
                record.backColor = panel.decimalColorToHTMLcolor(record.get('efr_nAlarmaColor'));
                metadata.style = 'color:' + record.txtColor + '; background-color:' + record.backColor;
                

                return  texto
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Zona',
    		dataIndex : 'efr_cZona',
            flex: 1,
            renderer: function(value, metaData, record){
               return  record.get('efr_cZona')+'-'+record.get('efr_cZonaDescripcion')
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
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-control-play',
                    action: 'play',
                    itemId:'play',
                    pressed: true,
                    toggleGroup: 'control'
                },
                {
                    iconCls: 'icon-control-stop',
                    pressed: false,
                    toggleGroup: 'control',
                    action: 'stop',
                    itemId:'stop'
                },'-',
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype:'container',
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'dealer',
                                                    emptyText: getLocale('Dealer'),
                                                    itemId: 'dealer',
                                                    width:110
                                                    
                                                },{
                                                    xtype: 'textfield',
                                                    itemId: 'cuenta',
                                                    emptyText: getLocale('Cuenta'),
                                                    width:147,
                                                    margin:'0 0 0 5'
                                                }
                                            ]
                                        },{
                                            xtype: 'combo',
                                            itemId: 'comboalarmas',
                                            emptyText: getLocale('Codigo alarma'),
                                        
                                            store: 'EventoPrioridadesStore',
                                            //multiSelect: true,
                                            displayField: 'Descripcion',
                                            valueField: 'Codigo',
                                            queryMode: 'local',
                                            typeAhead: true,
                                        },{
                                            xtype:'container',
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            items:[
                                                    {
                                                        xtype: 'datefield',
                                                        itemId: 'fechadesde',
                                                        emptyText: getLocale('Fecha Desde'),
                                                        width:129
                                                        
                                                    },{
                                                        xtype: 'datefield',
                                                        itemId: 'fechahasta',
                                                        emptyText: getLocale('Fecha Hasta'),
                                                        width:128,
                                                        margin:'0 0 0 5'
                                                    }
                                                ]
                                        }
                                    ]
                                 }
                             ]
            		    }
                    
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});