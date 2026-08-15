Ext.define('SgAppMultiMonitorWeb.view.EventosFallosTesteoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.eventosenfallotesteogridview'],
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
                iconCls: 'icon-delete',
                tooltip: getLocale('Restaurar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('eventosenfallotesteogridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectrdelete',rec,view);
                }
                
            }   
        ]},{
            xtype : 'gridcolumn',            
            header : 'Cuenta',
            dataIndex : 'eft_iidCuenta',
            flex: 1,
            renderer: function(value, metaData, record){
               return  record.get('eft_cLinea')+'-'+record.get('eft_cCuenta') + ' '+record.get('eft_cNombre')
            }
        },{
            xtype : 'gridcolumn',            
            header : 'Fecha de fallo',
    		dataIndex : 'eft_tEventoFechaHora',
            flex: 1,
            renderer: function(value, metaData, record){
               return  Ext.Date.format(value,'d/m/Y H:i:s');
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Alarma',
    		dataIndex : 'eft_cAlarma',
            flex: 1,
            renderer: function(value, metadata, record){

                var texto ='';
              
                var panel = this;
                
                texto = record.get('eft_cAlarma') + ' - ' + record.get('eft_cAlarmaDescripcion');
                record.txtColor = panel.decimalColorToHTMLcolor(record.get('eft_nAlarmaColorLetra'));
                record.backColor = panel.decimalColorToHTMLcolor(record.get('eft_nAlarmaColor'));
                metadata.style = 'color:' + record.txtColor + '; background-color:' + record.backColor;
                

                return  texto
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
                                        
                                           // store: 'EventoPrioridadesStore',
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