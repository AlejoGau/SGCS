Ext.define('GestorSim.view.ComandosEnviadosGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.comandosenviadosgridview',
    //title : 'Dispositivos Móviles',
    autoHeight : true,
            
   
	columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 40,
            items: [
                {
                    iconCls: 'icon-arrow-left',
                    tooltip: 'Respuesta',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('comandosenviadosgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('itemdblclick',view,rec);
                    },
                    getClass: function(v, meta, record) {          
                          if(record.get('cmd_cRespuesta')=='') {                                                                      
                              return 'x-hide-display';
                          } else {
                              return 'icon-arrow-left';
                          }
                      }
                }
            ]
        },{
            xtype : 'datecolumn',
			header : 'Fecha',
			dataIndex : 'cmd_tfechahoraiso',
            format : 'D d-m-Y G:i:s',
			sortable : true,
			groupable : false,
			width: 150
		},{
    		xtype : 'gridcolumn',
			header : 'Nombre',
			dataIndex : 'cmd_cObservaciones',
			sortable : true,
			groupable : false,
			flex : 1
		},{
			xtype : 'gridcolumn',
			header : 'Comando',
			dataIndex : 'tcm_cdescripcion',
			sortable : true,
			groupable : false,
			flex : 1
		},{
    		xtype : 'gridcolumn',
			header : 'Estado',
			dataIndex : 'cmd_nEstado',
			sortable : true,
            renderer: function(value,metadata,record){
                
                /*
                --     1                   Pendiente
                --     2,9                   En proceso
                --     3                   Procesado
                --     4                   Cancelado
                --     5                   Procesado con Error
                --     6                   Vencido
*/
                
                var estado = '';
                if (value == 1){
                    estado = getLocale("Pendiente");
                }
                if (value == 2 || value == 9){
                    estado = getLocale("En proceso");
                }
                if (value == 3){
                    estado = getLocale("Procesado");
                }
                if (value == 4){
                    estado = getLocale("Cancelado");
                }
                if (value == 5){
                    estado = getLocale("Procesado con Error");
                }
                if (value == 6){
                    estado = getLocale("Vencido");
                }
                
                return estado;
            },
			groupable : false,
			flex : 1
		} ,{
			xtype : 'gridcolumn',
			header : 'Usuario',
			dataIndex : 'username',
			sortable : true,
			groupable : false,
			flex : 1
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


    } // cierro init
});