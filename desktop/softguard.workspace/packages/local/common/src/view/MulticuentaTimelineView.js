//MIGRADO2024
Ext.define('Common.view.MulticuentaTimelineView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.milticuentatimelinegridview',
    title : 'Timeline',
    autoScroll: true,
    columns: [{
            xtype : 'gridcolumn',
            sortable : false,
			dataIndex : 'iconCls',
			width : 25,
            renderer: function(value, metadata,record){
                if (value)
                    return '<span style="position:absolute; width:16px;height:16px;" class="'+value+'" />';
            },
        },{
            text: 'order',
            width: 90,
            dataIndex: 'order',
            hidden: true
        },{
            xtype: 'datecolumn',
            text: 'Fecha',
            flex:1,
            sortable: false,
            //sortType : Ext.data.SortTypes.asDate,
            dataIndex: 'fecha',
            format: 'Y/m/d H:i:s'
        }
        ,{
            xtype: 'gridcolumn',
            header: 'Cuenta',
            dataIndex: 'cuenta',
            flex:1,
            minWidth: 300
        }, {
			xtype : 'gridcolumn',
			header : 'Evento',
            columnId: 'Evento',
			dataIndex : 'evento',
			sortable : false,
            flex:1,
			renderer : function(value, metadata, record, rowIndex, colIndex,store, view) {
                var texto ='';
         
          
          view = view.up('milticuentatimelinegridview')
                    texto = value;
                    var txtColor = view.decimalColorToHTMLcolor(record.get('eventoColorLetra'));
                    var backColor = view.decimalColorToHTMLcolor(record.get('eventoColor'));
                    metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                
                
                return texto;
            },
			width : 210
		},{
            text: 'Comentario',
            flex: 1,
            minWidth: 120,
            dataIndex: 'comentario',
            renderer: function (value, meta, record) {
                meta.tdStyle = 'data-qtip="' + value + '"';
                return value;
            }
        }/*,{
            text: 'Operador',
            width: 120,
            dataIndex: 'usuario'
        }*/],
        
    initComponent: function(){
        this.callParent();
       
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                 {
                    iconCls: 'icon-control-play',
                    action: 'play',
                    pressed: true,
                    toggleGroup: 'control',
                    tooltip: 'Play'
                },
                {
                    iconCls: 'icon-control-stop',
                    pressed: false,
                    toggleGroup: 'control',
                    action: 'stop',
                    tooltip: 'Stop'
                },
                {
                    iconCls: 'x-tbar-loading',
                    action: 'refresh',
                    tooltip: 'Actualizar'
                },"-",
                {
                    iconCls: 'icon-bin',
                    text: 'Limpiar',
                    action: 'clear'
                }
            ]
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
});  // cierro define