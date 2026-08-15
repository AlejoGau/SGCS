Ext.define('Cuenta.view.CuentaHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.cuentahelperview',
	autoHeight : true,
	columns : [
        {
			xtype : 'gridcolumn',
			header : 'Cuenta',
			sortable : true,
			dataIndex : 'cue_ncuenta',
			renderer : function(value, object, record) {
				return record.get('cue_clinea') + '-' + value;
			},
			width : 100
		}, {
			xtype : 'gridcolumn',
			header : 'Nombre',
			dataIndex : 'cue_cnombre',
			sortable : true,
			width : 250
		},{
			xtype : 'gridcolumn',
			header : 'Situacion',
			dataIndex : 'Situacion',
            renderer : function(value, metadata, record, colIndex,store, view) {
                var s = record.get("Situacion");
                var rclass = 'habilitado';
    			switch (Ext.String.trim(s)) {
    				case 'No Habilitado' :
    					rclass = 'nohabilitado';
                        break;
    				case 'Prueba' :
    					rclass = 'prueba';
                        break;
    				case 'Prueba x Zonas' :
    					rclass = 'pruebazonas';
                        break;
    			}
				metadata.tdCls = rclass;												
				return getLocale(value); 
			},
			sortable : true,
			width : 100
		}, 
        {
            xtype : 'gridcolumn',
            hidden: true,
			header : 'Imei',
			dataIndex : 'cue_cIMEI',
			sortable : true,
			width : 140
		},{
    		xtype : 'gridcolumn',
            hidden: false,
			header : 'Estado',
			dataIndex : 'act_nestado',
            renderer: function(value, metadata, record, colIndex,store, view) {
                var texto = '';
                var color = '';
                
                if (record.get("act_nestado")==1){
            		texto = getLocale("Desactivado / Abierto");
        			color = "#00FF00";
                }
        		else {
        			if (record.get("act_nestado")==2){
        				texto = getLocale("Activado / Cerrado");
        				color = "#FF0000";
        			}
        		}
                //metadata.style = 'color: ' + color;
                return texto;
            },
			sortable : false,
			width : 140
		},{
        	xtype : 'gridcolumn',
            hidden: false,
			header : 'Último evento',
			dataIndex : 'sta_cultimaalarma',
            renderer : function(value, metadata, record, colIndex,store, view) {
                var texto ='';
                if (record.get('sta_cultimaalarma') && record.get('sta_cultimaalarma') != '   '){
                    texto = record.get('sta_cultimaalarma') + ' - ' + record.get('cod_cdescripcion');
                    var txtColor = this.decimalColorToHTMLcolor(record.get('cod_nColorLetra'));
                    var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                    metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                }
                return texto
            },
			sortable : false,
			width : 100
		}, 
        {
    		xtype : 'datecolumn',
            hidden: false,
			header : 'Fecha ult. evento',
			dataIndex : 'sta_dfechautimaalarma',
            format: 'd/m/Y H:i:s',
			sortable : false,
			width : 120
		}, {
            xtype : 'datecolumn',
            hidden: false,
        	header : 'Última posición',
			dataIndex : 'gps_tfechahora',
            format: 'd/m/Y H:i:s',
			sortable : true,
			width : 120
		}, 
        {
    		xtype : 'datecolumn',
            hidden: false,
			header : 'Último Test',
            format: 'd/m/Y H:i:s',
			dataIndex : 'sta_dfechaultimotst',
			sortable : false,
			width : 120
		},
        {
        	xtype : 'gridcolumn',
            hidden: true,
			header : 'Provincia/Estado',
			dataIndex : 'cue_provincia',
			sortable : true,
			width : 120
		},
        {
    		xtype : 'gridcolumn',
            hidden: false,
			header : 'Localidad',
			dataIndex : 'cue_clocalidad',
			sortable : true,
			width : 150
		}, 
    	{
			xtype : 'gridcolumn',
            hidden: false,
			header : 'Calle',
			dataIndex : 'cue_ccalle',
			sortable : true,
			width : 250
		},{
        	xtype : 'gridcolumn',
			header : 'Telefono',
			dataIndex : 'cue_ctelefono',
			sortable : true,
            hidden:true,
			width : 100
		}
    ],
    
    initComponent: function () {
        var items= [
                   /* {
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
                                            store: [
                                                ['cue_cnombre',getLocale('Nombre')]
                                                ,['cue_ncuenta',getLocale('Cuenta')]
                                                ,['cue_clinea',getLocale('Dealer')]
                                                ,['Dealer-Cuenta',getLocale('Dealer-Cuenta')]
                                                ,['cue_clocalidad',getLocale('Localidad')]
                                                ,['pro_cdescripcion:LIKE',getLocale('Provincia')]
                                            ],
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
                },*/{
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
                                            xtype:'container',
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'dealer',
                                                    emptyText: getLocale('Dealer'),
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
                                            xtype: 'textfield',
                                            itemId: 'nombre',
                                            emptyText: getLocale('Nombre'),                                            
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'calle',
                                            emptyText: getLocale('Calle'),                                          
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'email',
                                            emptyText: getLocale('Email'),                                           
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'telefono',
                                            emptyText: getLocale('Teléfono'),                                           
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'clave',
                                            emptyText: getLocale('Clave'),                                            
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'equipogprs',
                                            emptyText: getLocale('Equipo GPRS'),                                           
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'campocustom',
                                            emptyText: getLocale('Campo custom'),                                           
                                            width:260
                                        }
                                        /* 15/01/2019 - JUAN : Agregue la relacion a CuentaHelperControlleBAK con el ProvinciasStore y ProvinciasModel para que no de error el Combo. 
                                         *  REVISAR con ADRIAN / RODRIGO
                                         */
                                        ,{
                            				xtype : 'combo',
                    						//fieldLabel : 'Provincia / Estado',
                    						store : 'ProvinciasStore',
                    						name : "cue_cprovincia",
                    						displayField : 'pro_cdescripcion',
                                            itemId: 'comboProvincia',
                    						valueField : 'pro_ccodigo',
                                            editable: false,
                                            emptyText: getLocale('Provincia'),                                           
                                            width:260         
                    					} 
                                        ,{
                                            xtype: 'textfield',
                                            itemId: 'localidad',
                                            emptyText: getLocale('Ciudad'),                                           
                                            width:260
                                        },{
                                            xtype: 'button',
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
                    iconCls: 'icon-cuenta_filter_fallotest ',
                    text: 'Fallo TST',
                    action: 'filterFalloTest',
                   // itemId: 'filterFalloTest',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId:'fallotst'
                },{
                   
                    iconCls: 'icon-cuenta_filter_nohabilitadas',
                    text: 'No Habilitadas',
                    action: 'filterNohabilitadas',
                    itemId:  'filterNohabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                   
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Habilitadas',
                    action: 'filterHabilitadas',
                    itemId: 'filterHabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                    
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Prueba',
                    action: 'filterEnprueba',
                    itemId: 'filterEnprueba',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                    iconCls:'icon-application-cascade',
                    text: 'particiones',
                    action: 'particiones',
                    itemId: 'particiones',
                    pressed: false,
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
        
        if(this.selectAllRead || this.showSelectAllBtn) {
            items.unshift({
                    iconCls: '',
                    text: getLocale('Enviar todas las cuentas'),
                    action: 'selectedall'
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