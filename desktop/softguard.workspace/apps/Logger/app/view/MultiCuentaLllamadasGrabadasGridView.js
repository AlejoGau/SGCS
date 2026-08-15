Ext.define('Logger.view.MultiCuentaLllamadasGrabadasGridView', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.multicuentallamadasgrabadasview',
    title : 'Llamadas',
    preventHeader: true,
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

            columns : [
                {
                    xtype:'actioncolumn',
                    header : '',
                    width:30,
                    items: [{
                        iconCls: 'icon-sound',
                        tooltip: getLocale('Escuchar grabación'),
                        handler: function(grid, rowIndex, colIndex,item, event) {
                            var view = grid.up('cuentagridview');
                            
                            if (!view){
                                view = this;
                            }
                            
                            var rec = grid.getStore().getAt(rowIndex);
                            // cargar archivo en el player
                            var url = '/rest/upload/get';
                            url = Ext.String.urlAppend(url,'search=SoftguardMiscFile&download=false&path=Logger&mimetype=audio/mp3');
                            url = Ext.String.urlAppend(url,'filename='+rec.get('gra_carchivo')+'.mp3');
                            
                            if (view.win){view.win.close();}
                            view.win = Ext.widget('window',{
                                title: rec.get('gra_dfechahora'),
                                height: 300,
                                translate:false,
                                width: 600,
                                layout: 'fit',
                                resizable: false,
                                items:Ext.create('Ext.ux.IFrame',{
                                    src: url
                                })
                            }).show();
                        }
                    }]
                },{
            		xtype : 'datecolumn',
        			header : 'Fecha',
        			sortable : false,
        			dataIndex : 'gra_dfechahora',
                	flex:1,
                    format:'d/m/Y H:i:s'
        		}, {
            		xtype : 'gridcolumn',
        			header : 'Cuenta',
        			dataIndex : 'cue_cnombre',
        			sortable : true,
            		groupable : true,
        			renderer : function(value, metadata, record, colIndex,store, view) {
                       return record.get('cue_cnombre')+ " " + record.get('cue_clinea')+"-"+record.get('cue_ncuenta')
                    },
                    flex:1
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
                    flex:1
        		}, 
                {
                	xtype : 'numbercolumn',
        			header : 'Duración',
                    format: '0',
                    align: 'right',
        			dataIndex : 'gra_nduracion',
        			sortable : true,
                    flex:1
        		}
                
                
            ],            
         
    
    initComponent: function () {
        this.callParent(arguments);
        
        
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
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        
        this.addDocked(pagingtoolbar);
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text : 'Filtros',
                    itemId: 'filtros',
                    menu: {
                        width: 470,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                itemId:'menupanel',
                                items: [
                                    
                                   {
                                       xtype:'container',
                                      layout:'hbox',
                                      width:450,
                                      margin:'0 0 5 0',
                                      items:[
                                               {
                                                    xtype : 'datefield',
                                					emptyText : 'Desde',
                                					name : "fdesde",
                                					bindToModel : false,
                                					itemId : 'fechadesde',
                                                    labelWidth: 100,
                                                    width:250
                                				},{
                                                    xtype : 'timefield',
                                                    emptyText: 'Hora desde',
                                                    minValue: '00:00',
                                                    maxValue: '23:59',
                                                    increment: 5,
                                                    labelWidth: 100,
                                                    format: 'H:i',
                                                    submitFormat : 'H:i',
                                                    itemId:'horadesde',
                                                    width:200
                                        		}
                                           ]
                                   },{
                                       xtype:'container',
                                      layout:'hbox',
                                      width:450,
                                      margin:'0 0 5 0',
                                      items:[
                                               {
                                    				xtype : 'datefield',
                                					emptyText : 'Hasta',
                                					itemId : 'fechahasta',
                                					bindToModel : false,
                                					name : "fhasta",
                                                    labelWidth: 100,
                                                    width:250
                                				},{
                                                    xtype : 'timefield',
                                                    emptyText: 'Hora hasta',
                                                    minValue: '00:00',
                                                    maxValue: '23:59',
                                                    increment: 5,
                                                    labelWidth: 100,
                                                    format: 'H:i',
                                                    submitFormat : 'H:i',
                                                    itemId:'horahasta',
                                                    width:200
                                            	}
                                           ]
                                   },{
                                      xtype:'container',
                                      layout:'hbox',
                                      width:450,
                                      margin:'0 0 5 0',
                                      items:[
                                            {
                                                emptyText: 'Dealer',
                                                xtype: 'textfield',
                                                itemId: 'dealer',                                        
                                                labelWidth: 100,
                                                width:200,
                                                margin:'0 5 0 0'
                                                
                                            },{
                                                emptyText: 'Cuenta',
                                                xtype: 'textfield',
                                                itemId: 'cuenta',                                        
                                                labelWidth: 100,
                                                width:250
                                                
                                            }
                                          ]
                            		},{
                                      xtype:'eventselecterfield',
                                      itemId:'eventos',
                                      filter:[],
                                      simpleSelect: true,
                                      title: getLocale('Alarmas'),
                                     // limitEventSelect: 30,
                                      margin:'0 0 10 0'
                                    }/*,{
                                        emptyText: 'Codigo de alarma',
                                        xtype: 'textfield',
                                        itemId: 'codigoalarma',                                        
                                        labelWidth: 100,
                                        width:450
                                        
                                    }*//*,{
                                        fieldLabel: 'Telefono',
                                        xtype: 'textfield',
                                        itemId: 'telefono',                                        
                                        labelWidth: 100
                                        
                                    }*/,{
                                        emptyText: 'Nombre',
                                        xtype: 'textfield',
                                        itemId: 'nombre',                                        
                                        labelWidth: 100,
                                        width:450
                                        
                                    }, {
                                		xtype : 'combo',
                            			emptyText : 'Operador',
                            			displayField : 'ope_cnombre',
                                        queryMode: 'local',
                                        //plugins: ['clearbutton'],
                            			valueField : 'ope_iid',
                                        itemId: 'comboOperadores',
                                        editable: false,
                                        width:450
                            		},{
                                       xtype:'container',
                                      layout:'hbox',
                                      width:450,
                                      margin:'5 0 0 0',
                                      items:[
                                               
                                               {
                                                    xtype: 'button',
                                                    text:'Buscar',
                                                    iconCls: 'icon-find',
                                                    itemId:'buscargrabadas',
                                                    magin:'5 0 0 0',
                                                    fieldAlign:'right'
                                                   // action: 'search'
                                                },{
                                                    xtype: 'button',
                                                    text:'Ver Todos',
                                                    iconCls: 'icon-find',
                                                //    action: 'todos',
                                                    itemId:'todosgrabadas'
                                                }
                                          ]
                            		}
                                    
                                    
                                    
                                ]
                            }
                
                        ]
                    }
                }
            ]// cierro items
         }); 

         this.addDocked(toolbar);
         
         
       
         
    } // cierro init
});