//MIGRADO2024
Ext.define('Common.view.LlamadasReaFullGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.llamadarealizadasfullgridview',
    title : 'Llamadas realizadas',
    ignoreDirty: true,
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [
        {
            xtype : 'gridcolumn',
    		header : 'Fecha',
			sortable : false,
			dataIndex : '_rec_tfechahora',
            width:150,
            renderer: function(value,metadata,record){
                return Ext.Date.format(new Date(value), 'd/m/Y H:i:s');
            }
		}, {
        	xtype : 'gridcolumn',
			header : 'Evento',
			dataIndex : 'eve_rec_calarma',
			sortable : true,
    		groupable : true,
			renderer : function(value, metadata, record, colIndex,store, view) {
                var texto =getLocale('Grabación de llamada entrante');
                var panel = this;
                if (record.get('eve_rec_calarma')){
                    texto = record.get('eve_rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                    var txtColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolorletra'));
                    var backColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                    metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                }
                return texto
            },
			flex:1
		},{
    		xtype : 'gridcolumn',
			header : 'Telefono',
			sortable : false,
			dataIndex : 'rec_cContenido',
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
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    action: 'abrir',
                    itemId: 'abrir',
                    text: 'Abrir',
                    hidden: true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
       
         
    } // cierro init
});