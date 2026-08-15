//MIGRADO2024
Ext.define('Common.view.LlamadaGridView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.llamadagridview',
    title : 'Llamadas',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items : [
        {
           xtype: 'llamadarealizadasgridview',
           flex:1
        },
        {
        	xtype : 'gridpanel',
    		itemId : 'gridllamada',
            flex: 1,
            autoScroll : true,
            scroll: true,
            title: 'Llamadas grabadas',
            columns : [
                {
                    xtype:'actioncolumn',
                    header : 'Archivos',
                    width:60,
                    items: [{
                        iconCls: 'icon-sound',
                        tooltip: getLocale('Escuchar grabación'),
                        handler: function(grid, rowIndex, colIndex,item, event) {
                            var view = grid.up('cuentagridview');
                            var rec = grid.getStore().getAt(rowIndex);
                            // cargar archivo en el player
                            var url = '/rest/upload/get';
                            url = Ext.String.urlAppend(url,'search=SoftguardMiscFile&download=false&path=Logger&mimetype=audio/mp3');
                            var gra_carchivo = rec.get('gra_carchivo').trim();
                            if (gra_carchivo.substr(gra_carchivo.length - 3).toLowerCase() == 'wav'){
                                url = Ext.String.urlAppend(url,'filename='+gra_carchivo);
                            }
                            else {
                                url = Ext.String.urlAppend(url,'filename='+gra_carchivo+'.mp3');
                            }
                            
                            
                            if (grid.win){grid.win.close();}
                            grid.win = Ext.widget('window',{
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
            		xtype : 'gridcolumn',
        			header : 'Fecha',
        			sortable : false,
        			dataIndex : 'gra_dfechahora',
                	flex:1,
                    renderer: function( value, object, record ) {
                        const match = /\/Date\((\d+)([-+]\d{4})?\)\//.exec(value);
                        if (match) {
                            const timestamp = parseInt(match[1], 10);
                            return Ext.Date.format( new Date(timestamp ), 'd/m/Y G:i:s' );
                        }else{
                            return '';
                        }
                    }
        		}, {
        			xtype : 'gridcolumn',
        			header : 'Evento',
        			dataIndex : 'rec_calarma',
        			sortable : true,
            		groupable : true,
        			renderer : function(value, metadata, record, colIndex,store, view) {
                        var texto =getLocale('Grabación de llamada entrante');
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
        		}/*,{
                	xtype : 'gridcolumn',
        			header : 'Contacto',
        			dataIndex : 'rec_cContenido',
            		flex:1
        		}*/
                
                
            ],            
           flex:1
       }
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
        this.down('llamadarealizadasgridview').record = this.record;
        this.down('#gridllamada').decimalColorToHTMLcolor = function(number) {
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
                    text : 'Filtros',
                    itemId: 'filtros',
                    menu: {
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    
                                  
                                    
                                    {
                                    	xtype : 'datefield',
                    					fieldLabel : 'Desde',
                    					name : "fdesde",
                    					bindToModel : false,
                    					itemId : 'fechadesde',
                                        labelWidth: 100
                    				},{
                                        xtype : 'timefield',
                                        fieldLabel: 'Hora desde',
                                        minValue: '00:00',
                                        maxValue: '23:59',
                                        increment: 5,
                                        labelWidth: 100,
                                        format: 'H:i',
                                        submitFormat : 'H:i',
                                        itemId:'horadesde'
                            		}, {
                    					xtype : 'datefield',
                    					fieldLabel : 'Hasta',
                    					itemId : 'fechahasta',
                    					bindToModel : false,
                    					name : "fhasta",
                                        labelWidth: 100
                    				},{
                                        xtype : 'timefield',
                                        fieldLabel: 'Hora hasta',
                                        minValue: '00:00',
                                        maxValue: '23:59',
                                        increment: 5,
                                        labelWidth: 100,
                                        format: 'H:i',
                                        submitFormat : 'H:i',
                                        itemId:'horahasta'
                                	},{
                                        fieldLabel: 'Codigo de alarma',
                                        xtype: 'textfield',
                                        itemId: 'codigoalarma',                                        
                                        labelWidth: 100
                                        
                                    }/*,{
                                        fieldLabel: 'Telefono',
                                        xtype: 'textfield',
                                        itemId: 'telefono',                                        
                                        labelWidth: 100
                                        
                                    },{
                                        fieldLabel: 'Nombre',
                                        xtype: 'textfield',
                                        itemId: 'nombre',                                        
                                        labelWidth: 100
                                        
                                    },*/,{
                                        xtype: 'button',
                                        text:'Buscar',
                                        iconCls: 'icon-find',
                                        itemId:'buscargrabadas'
                                       // action: 'search'
                                    }
                                ]
                            }
                
                        ]
                    }
                },{
                    xtype: 'button',
                    text:'Ver Todos',
                    iconCls: 'icon-find',
                //    action: 'todos',
                    itemId:'todosgrabadas'
                }
            ]// cierro items
         }); 
         this.down('#gridllamada').addDocked(toolbar);
       
         
    } // cierro init
});