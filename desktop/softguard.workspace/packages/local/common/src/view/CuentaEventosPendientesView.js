//MIGRADO2024
Ext.define('Common.view.CuentaEventosPendientesView', {
    extend : 'Ext.grid.GridPanel',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    alias : 'widget.cuentaeventospendientesgridview',
    title : 'Eventos Pendientes',
  /*  viewConfig: {
        loadMask: false
    },*/
  /*  features : [
        {
        	ftype : 'grouping',
            groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> {name} ({rows.length})</input>',
            groupByText : getLocale('Agrupar'),
            showGroupsText : getLocale('Mostrar en grupos')
		}
    ],*/
	columns : [        
        {
			xtype : 'gridcolumn',
			header : 'Icono',
			width: 50,
			sortable : false,
			renderer: function(value, metadata,record){
                var t = this;
                var path = '/handler/getImage?u=/images/codala/'+record.get('rec_calarma')+'.png';
                value = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                return '<img data-qtip="'+value+'" src="'+path+'"   width=16 height=16 onerror=\'this.style.display = "none"\'>';
            
            }
        },{
            xtype : 'datecolumn',
			header : 'Fecha',
			sortable : true,
			dataIndex : 'rec_tfechahora',
            format: 'd/m/Y H:i:s',
			flex:1
		},{
            xtype : 'gridcolumn',
			header : 'Alarma',
			sortable : true,
			dataIndex : '',
			flex:1,
             renderer : function(value, metadata, record, colIndex,store, view) {
                return record.get("cue_clinea")+"-"+record.get('cue_ncuenta')+" "+record.get('cue_cnombre');
             }
		}/*,
        {
        	xtype : 'gridcolumn',
			header : 'Alarma',
			sortable : true,
			dataIndex : 'rec_calarma',
			flex:1
		}*/
        , {
    				xtype : 'gridcolumn',
					header : 'Evento',
                    columnId: 'Evento',
					dataIndex : 'rec_calarma',
					sortable : false,
					renderer : function(value, metadata, record, colIndex,store, view) {
                        var texto ='';
                        var panel = this;
                         if (Ext.util.Format.trim(record.get('rec_calarma')) != ''){
                            texto = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                            record.txtColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolorletra'));
                            record.backColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                            metadata.style = 'color:' + record.txtColor + '; background-color:' + record.backColor;
                        } else {
                            texto = record.get('rec_cContenido');
                            metadata.style = 'color:#333; background-color:transparent;';   
                        }
                        
                        return texto;
                    },
					width:210
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
                    iconCls: '',
                    text: 'Seleccionar todos',
                    action: 'selccionartodos',
                    itemId:'seleccionatodo',                    
                    enableToggle: true
                }]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
        
    } // cierro init
});