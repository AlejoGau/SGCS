Ext.define('SmartTrack.view.SmartTrackPushNotificationsGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.vcpushnotificacionesgridview'],
    title : 'SmartTrack',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [{
            xtype : 'gridcolumn',
        	header : 'Usuario',
            dataIndex : 'usu_cnombre',
            flex:1,
			sortable : true			
		},{
            xtype : 'gridcolumn',            
            header : 'Telefono',
    		dataIndex : 'telefono',			
			flex:1          
		},{
            xtype : 'gridcolumn',            
            header : 'Objetivo',
    		dataIndex : 'objetivo',			
			flex:1          
		},{
            xtype : 'datecolumn',            
            header : 'Ultimo reporte',
    		dataIndex : 'rec_tfechahora',			
			flex:1,
            renderer: function(value,metadata,record){
               return Ext.Date.format(record.get('rec_tfechahora'), 'D d-m-Y G:i:s');
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Ultimo evento',
    		dataIndex : 'cod_ccodigo',			
			flex:1,
            renderer : function(value, metadata, record, colIndex,store, view) {
                    var texto ='';
                    if (record.get('rec_calarma')){
                        texto = record.get('cod_ccodigo') + ' - ' + record.get('cod_cdescripcion');
                        var txtColor = this.decimalColorToHTMLcolor(record.get('cod_nColorLetra'));
                        var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                        metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                    }
                    return texto
                }         
		},{
            xtype : 'gridcolumn',            
            header : 'Inicio de sesión',
    		dataIndex : 'vucs_lastmodification',			
			flex:1,
            renderer: function(value,metadata,record){
               return Ext.Date.format(record.get('vucs_lastmodification'), 'D d-m-Y G:i:s');
            }          
		}

    ],
    
    initComponent: function () {
                
        this.callParent(arguments); 


        this.onSelectChange = function (selModel, selections) {
            this.down('[action="sendmail"]').setDisabled(selections.length == 0);
        };

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text : 'Enviar Mensaje',
                    iconCls: 'icon-email-go',
                    menu: {
                        xtype: 'menu',
                        width: 250,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [{
                                xtype : 'button',
                                iconCls: 'icon-email-go',
                                text: 'Enviar mensaje a seleccionados',
                                scope: this,
                                action: 'sendmail',
                                itemId:'sendmail',
                                width : 230,
                                margin : '0 0 10 0'
                            },{
                                xtype : 'button',
                                iconCls: 'icon-email-go',
                                text: 'Enviar mensaje a lista',
                                scope: this,
                                action: 'sendmailall',
                                itemId:'sendmailall',
                                width : 230,
                            }]
                        }]
                    }
                },'-',{
                    xtype: 'combo',
                    store: [
                        ['telefono',getLocale('Telefono')],
                        ['objetivo',getLocale('Objetivo')],
                        ['usuario',getLocale('Usuario')]
                    ],
                    queryMode: 'local',
                    value: 'telefono',
                    itemId: 'queryType',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'button',
                    text: 'Buscar',
                    itemId: 'btnBuscar'
                },
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }                                   
            ],
            
         }); 
        
        this.addDocked(toolbar);
        

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

    } 
});