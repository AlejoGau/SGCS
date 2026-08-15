//MIGRADO2024
Ext.define('Common.view.CuentaMovilesHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.cuentamovileshelperview',
    autoHeight : true,
	columns : [
        {
            xtype : 'gridcolumn',
    		header : '',
			dataIndex : 'tip_cdescripcion',
			sortable : true,
			groupable : true,
            menuDisabled: true,
			width : 26,
            renderer: function(value, metadata,record){
                return '<img data-qtip="'+value+'" src="/resources/softguard/images/trackguard-'+record.get('tip_nTipo')+'.png" width=16 height=16>';
            }
		},{
			xtype : 'gridcolumn',
			header : 'Matrícula',
			dataIndex : 'Domain',
            menuDisabled: true,
			sortable : true,
			groupable : false,
			width : 65
		},
        {
    		xtype : 'gridcolumn',
			header : 'Cuenta',
			sortable : true,
            menuDisabled: true,
			dataIndex : 'cue_clinea',
			renderer : function(value, object, record) {
				return record.get('cue_clinea') + '-' + record.get('cue_ncuenta');
			},
			width : 70
		},{
    		xtype : 'gridcolumn',
			header : 'Dealer',
			dataIndex : 'cue_clinea',
			sortable : true,
            menuDisabled: true,
			groupable : true,
            hidden: true,
			width : 50
		},{
        	xtype : 'gridcolumn',
			header : 'Nombre Cuenta',
			dataIndex : 'cue_cnombre',
			sortable : true,
            menuDisabled: true,
			groupable : false,
			flex: 1
		}, 
        {
            xtype : 'gridcolumn',
            hidden: false,
			header : 'Fecha ult. posición',
			dataIndex : 'gps_isofechahora',
            renderer: function(value, metadata, record, colIndex,store, view){
                if(value) {
                    return Ext.Date.format(new  Date(value), 'd/m/Y h:m:i')
                } else {
                    return '';
                }
            },
			sortable : true,
			width : 160
		},{
            xtype : 'gridcolumn',
			header : 'Vel.',
			dataIndex : 'gps_iVelocidad',
			sortable : true,
            menuDisabled: true,
			groupable : false,
            renderer : function(value, object, record) {
    			return value + ' km/h';
			},
			width : 55
		}
    ],
    
    initComponent: function () {
        var items= [
                    {
                        text : 'Filtros',
                        itemId: 'filtro',
                    	menu: {
                            xtype: 'menu',
                            width: 280,
                            items: [
                                {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                        {
                                            xtype: 'combo',
                                            store: [['cue_cnombre',getLocale('Nombre')],['cue_ncuenta',getLocale('Cuenta')],['cue_clinea',getLocale('Dealer')],['Dealer-Cuenta',getLocale('Dealer-Cuenta')]],
                                            queryMode: 'local',
                                            value: 'cue_cnombre',
                                            itemId: 'queryType',
                                            fieldLabel: '',
                                            width:260
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: '',
                                        }, 
                                         {
                                            xtype:'button',
                                            iconCls: '',
                                            text: 'Buscar',
                                            action: 'filterText'
                                        }
                                    ]
                                }
                                
                            ]
                	}
                }, {
                    iconCls: 'icon-text-columns ',
                    text: 'Filiación',
                    action: 'filiacion',
                    itemId: 'filiacion',
                    toggleGroup: 'info',
                    enableToggle: true,
                    pressed: true,
                },"-",{
                   
                    iconCls: 'icon-cuenta_filter_nohabilitadas',
                    text: 'No Habilitadas',
                    action: 'filterNohabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                   
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Habilitadas',
                    action: 'filterHabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                    
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Prueba',
                    action: 'filterEnprueba',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                  
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todas',
                    action: 'removefilter',
                    pressed: true,
                    toggleGroup: 'filter',
                    enableToggle: true
                }
                
        ];// cierro items
        
        
        // si la seleccion es multiple agrego los checkbox
        if (this.multiSelect){
            this.selModel = Ext.create('Ext.selection.CheckboxModel');
            items.unshift({
                    iconCls: '',
                    text: 'Enviar Selección',
                    action: 'selected'
            });
        }
        
        
        
        this.callParent(arguments);
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         }); 
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);
        
        if (this.hidebuttons){
            var view = this;
            Ext.Array.each(this.hidebuttons, function(button){
                view.down(button).hide();
            })
        }
        
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