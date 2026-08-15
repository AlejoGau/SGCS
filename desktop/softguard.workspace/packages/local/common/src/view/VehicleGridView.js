//MIGRADO2024
Ext.define('Common.view.VehicleGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.vehiclegridview',
    title : 'Dispositivos Móviles',
    autoHeight : true,
    noRefresh: true,
    features : [
        {
			ftype : 'grouping',
            groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> {name} ({rows.length})</input>',
            groupByText : getLocale('Agrupar'),
            showGroupsText : getLocale('Mostrar en grupos')
		}
    ],
	columns : [
        {
            xtype: 'actioncolumn',
            header: '',
            width: 26,
            items: [ 
                {
                    iconCls: 'icon-car',
                    tooltip: getLocale( 'Modificar' ),
                    handler: function( grid, rowIndex, colIndex, item, event ) {
                      /*  var view = grid.up( 'vehiclegridview' );
                        var rec = grid.getStore().getAt( rowIndex );
                        view.fireEvent( 'objectedit', rec, view );*/
                    }
                }
            ],
            hideable: false
        },/* {
            xtype : 'gridcolumn',
    		header : '',
			dataIndex : 'tip_cdescripcion',
			sortable : true,
			groupable : true,
			width : 26,
            renderer: function(value, metadata,record){
                return '<img data-qtip="'+value+'" src="/resources/softguard/images/trackguard-'+record.get('tip_nTipo')+'.png" width=16 height=16>';
            } */
		{
            xtype : 'gridcolumn',
			header : 'Nombre',
			dataIndex : 'cue_cnombre',
			sortable : true,
			groupable : false,
			width : 150
		},{
			xtype : 'gridcolumn',
			header : 'Matrícula',
			dataIndex : 'Domain',
			sortable : true,
			groupable : false,
			width : 55
		},
        {
    		xtype : 'gridcolumn',
			header : 'Cuenta',
			sortable : true,
			dataIndex : 'cue_clinea',
			renderer : function(value, object, record) {
				return record.get('cue_clinea') + '-' + record.get('cue_ncuenta');
			},
			width : 80
		},{
    		xtype : 'gridcolumn',
			header : 'Dealer',
			dataIndex : 'cue_clinea',
			sortable : true,
			groupable : true,
            hidden: true,
			width : 50
		},{
            xtype : 'gridcolumn',
			header : 'Situación',
			dataIndex : 'Situacion',
			sortable : true,
			groupable : true,
			width : 80,
            renderer : function(value, metadata, record, colIndex,store, view) {
                var s = value;
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
    		}
		}, 
        {
        	xtype : 'gridcolumn',
    		header : 'Velocidad',
			dataIndex : 'gps_iVelocidad',
			sortable : true,
			groupable : false,
            align: 'right',
            renderer : function(value, metadata, record, colIndex,store, view) {
                return value + ' km/h'
            },
			width : 80
		},{
        	xtype : 'gridcolumn',
            hidden: false,
			header : 'Última alerta',
			dataIndex : 'sta_cultimaalerta',
            renderer : function(value, metadata, record, colIndex,store, view) {
                var texto ='';
              /*  if (record.get('sta_cultimaalarma') && record.get('sta_cultimaalarma') != '   '){
                    texto = record.get('sta_cultimaalarma') + ' - ' + record.get('cod_cdescripcion');
                    var txtColor = this.decimalColorToHTMLcolor(record.get('cod_nColorLetra'));
                    var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                    metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                }*/
                
                
                var texto ='';
                var panel = this.up('vehiclegridview')?this.up('vehiclegridview'):this;
                 if (Ext.util.Format.trim(record.get('sta_cultimaalerta')) != ''){
                    texto = record.get('sta_cultimaalerta') + ' - ' + record.get('cod_cdescripcion');
                    var txtColor = panel.decimalColorToHTMLcolor(record.get('cod_nColorLetra'));
                    var backColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                    metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                } else {
                    texto = record.get('rec_cContenido');
                    metadata.style = 'color:#333; background-color:transparent;';
                    
                }
                
                
                return texto
            },
			sortable : true,
			width : 100
		}, 
        {
    		xtype : 'gridcolumn',
            hidden: false,
			header : 'Fecha ult. alerta',
			dataIndex : 'sta_dfechaultimaalerta',
            renderer: function(value, metadata, record, colIndex,store, view){
                var fecha = new Date(value);
                if(value && fecha.getFullYear()>1900) {
                    return Ext.Date.format(fecha, 'd/m/Y H:i:s');
                } else {
                    return '';
                }
            },
			sortable : true,
			width : 160
		}, 
        {
        	xtype : 'gridcolumn',
            hidden: false,
			header : 'Fecha ult. posición',
			dataIndex : 'gps_trawfechahora',
            renderer: function(value, metadata, record, colIndex,store, view){
                if(value) {
                    return Ext.Date.format(new  Date(value), 'd/m/Y H:i:s')
                } else {
                    return '';
                }
            },
			sortable : true,
			width : 160
		}, 
        {
    		xtype : 'gridcolumn',
            hidden: false,
			header : 'Último Test',
            renderer: function(value, metadata, record, colIndex,store, view){
                 if(value) {
                    return Ext.Date.format(new  Date(value), 'd/m/Y H:i:s')
                } else {
                    return '';
                }
            },
			dataIndex : 'sta_dfechaultimo2dotst',
			sortable : true,
			width : 160
		}, 
        {
        	xtype : 'gridcolumn',
            hidden: false,
			header : 'Sim',
			dataIndex : 'SIM1',
			sortable : true,
			width : 180,
            renderer: function(value, metadata, record, colIndex,store, view){
                var separado = " / ";
                if(record.get('SIM1') == '' || record.get('SIM2') == '') {
                    separado = "";
                }
                return record.get('SIM1')+separado+record.get('SIM2');
            },
		},{
            xtype : 'gridcolumn',
            hidden: false,
			header : 'Imei',
			dataIndex : 'cue_cimei',
			sortable : true,
            flex:1
		},{
            xtype : 'gridcolumn',
    		header : 'Señal',
			dataIndex : 'gps_iNivelSenial',
			sortable : true,
            width:50,
            renderer: function(value, metadata, record, colIndex,store, view){
                
                /*
                Informacion pasada por Fernando 18/9/2018
                Entre -103 y -98 dBm: baja cobertura
                Entre -97 y -90 dBm: cobertura media
                Entre -89 y -77 dBm: muy buena
                Entre -76 y -60 dBm: excelente
                */
                
                metadata.tdAttr = 'data-qtip="' + Ext.String.htmlEncode('<i>'+getLocale('Señal')+': '+value+'</i>') + '"';
                
                
                if(value <= -98) {
                    return '<img src="/resources/softguard/images/signal/1.png" />'
                } else if (value >= -97 && value <= -90) {
                    return '<img src="/resources/softguard/images/signal/2.png" />'
                } else if (value >= -89 && value <= -77) {
                    return '<img src="/resources/softguard/images/signal/3.png" />'
                } else if (value >= -76 ) {
                    return '<img src="/resources/softguard/images/signal/4.png" />'
                } else {
                    return ''
                }
            },
		},{
            xtype : 'gridcolumn',
        	header : 'Satelites',
			dataIndex : 'gps_iSatelites',
			sortable : true,
            width:50,
            renderer: function(value, metadata, record, colIndex,store, view){
                
                /*Valor entre 1,8           [X]
                Valor entre 9,16         [X][X]
                Valor entre 17,24       [X][X][X]
                Valor entre 25,32       [X][X][X][X]*/
                metadata.tdAttr = 'data-qtip="' + Ext.String.htmlEncode('<i>'+getLocale('Satelites')+': '+value+'</i>') + '"';
                if(value <= 8) {
                    return '<div class="circulo" style="background:#f44250" title="'+value+'"></div>'
                } else if (value >= 9 && value <= 16) {
                    return '<div class="circulo" style="background:#f4a341" title="'+value+'"></div>'
                } else if (value >= 17 && value <= 24) {
                    return '<div class="circulo" style="background:#e5f441" title="'+value+'"></div>'
                } else if (value >= 25 && value <= 32) {
                    return '<div class="circulo" style="background:#41f455" title="'+value+'"></div>'
                } else {
                    return ''
                }
            },
		},{
            xtype : 'gridcolumn',
    		header : 'Bateria',
			dataIndex : 'gps_iBattery',
			sortable : true,
            width:50,
            renderer: function(value, metadata, record, colIndex,store, view){                
                                        
                /*if(record.get('rec_cdll') == "MeitrackPacketParser") {
                    return (record.get('gps_iBattery')/100);
                } else {
                    return record.get('gps_iBattery')
                }*/
                
                return record.get('gps_iBattery')
                
            }
		},{
            xtype: 'gridcolumn',
            header : 'Combustible',
            dataIndex : 'gps_iFuel',
            sortable : true,
            width : 100
        },{
            xtype: 'gridcolumn',
            header : 'Motor',
            dataIndex : 'gps_iEngineStatus',
            renderer: function(value, metadata, record, colIndex, store, view){
                if (value == 1)
                    return getLocale('Encendido');
                if (value == 0)
                    return getLocale('Apagado')
            },
            sortable : true,
            width : 100
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
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-control-play',
                    action: 'play',
                    itemId:'play',
                    pressed: false,
                    toggleGroup: 'control'
                },
                {
                    iconCls: 'icon-control-stop',
                    pressed: true,
                    toggleGroup: 'control',
                    action: 'stop',
                    itemId:'stop'
                },
                '-',
                {
                    text : 'Crear Dispositivo',
            		iconCls : 'icon-carAdd',
                    action: 'crear',
                    itemId: 'crear'
        		}, { xtype: 'tbseparator' },
                {
                    iconCls: 'icon-cuenta_filter_nohabilitadas',
                    text: 'No Habilitadas',
                    action: 'filterNohabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                }, {
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Habilitadas',
                    action: 'filterHabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                }, 
                 {
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Prueba',
                    action: 'filterEnprueba',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{ xtype: 'tbseparator' },
                {
                    text: 'En ',
                    itemId: 'enmovimiento',
                    iconCls:'con-tg-upright',
                    pressed: true,
                    enableToggle: true
                },
                {
                    text: 'Detenidos',
                    itemId: 'frenado',
                    iconCls:'icon-tg-stop',
                    pressed: true,
                    enableToggle: true
                },
                {
                    text: 'No actuales',
                    itemId: 'viejas',
                    pressed: true,
                    iconCls:'icon-tg-exclamation',
                    enableToggle: true
                },
                {
                    text: 'Con alarma',
                    itemId: 'conalarma',
                    pressed: true,
                    iconCls:'icon-tg-upright-alert',
                    enableToggle: true
                },
                {
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todas',
                    action: 'removefilter',
                    pressed: true,
                    toggleGroup: 'filter',
                    enableToggle: true
                },{ xtype: 'tbseparator' },
               /* {
                    xtype: 'combo',
                    store: [
                        ['Domain',getLocale('Matricula')],
                        ['cue_cimei',getLocale('Imei')],
                        ['cue_cnombre',getLocale('Nombre')],
                        ['cue_ncuenta',getLocale('Cuenta')],
                        ['cue_clinea',getLocale('Dealer')],
                        ['Dealer-Cuenta',getLocale('Dealer-Cuenta')]
                    ],
                    queryMode: 'local',
                    value: 'Domain',
                    itemId: 'queryType',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: '',
                    labelWidth: 50
                },*/{
                    text : 'Filtros',
                    itemId: 'filtro',
                	menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                defaultButton: 'vehiclegridview #search',
                                items: [
                                      {
                                            xtype:'fieldset',
                                            padding:'0 0 0 0',
                                            border:0,
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'dealer',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    emptyText: getLocale('Dealer'),
                                                    width:110
                                                    
                                                },{
                                                    xtype: 'textfield',
                                                    itemId: 'cuenta',
                                                    enforceMaxLength: true,
                                                    maxLength: 4,
                                                    emptyText: getLocale('Cuenta'),
                                                    width:119,
                                                    margin:'0 0 0 5'
                                                }
                                            ]
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'Domain',
                                            emptyText: getLocale('Matricula'),                                            
                                            width:260
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
                                        }/*,{
                                            xtype: 'textfield',
                                            itemId: 'email',
                                            emptyText: getLocale('Email'),                                           
                                            width:260
                                        }*/,{
                                            xtype: 'textfield',
                                            itemId: 'telefono',
                                            emptyText: getLocale('Teléfono'),                                           
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'sim1',
                                            emptyText: getLocale('SIM1'),                                           
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'sim2',
                                            emptyText: getLocale('SIM2'),                                           
                                            width:260
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'clave',
                                            emptyText: getLocale('Clave'),                                            
                                            width:260
                                        },/*{
                                            xtype: 'textfield',
                                            itemId: 'equipogprs',
                                            emptyText: getLocale('Equipo GPRS'),                                           
                                            width:260
                                        },*/{
                                            xtype: 'textfield',
                                            itemId: 'imei',
                                            emptyText: getLocale('IMEI'),                                           
                                            width:260
                                        }/*,{
                                            xtype: 'textfield',
                                            itemId: 'campocustom',
                                            emptyText: getLocale('Campo custom'),                                           
                                            width:260
                                        }*/, {
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
                    					},{
                                            xtype: 'textfield',
                                            itemId: 'localidad',
                                            emptyText: getLocale('Ciudad'),                                           
                                            width:260
                                        },{
                                    		xtype : 'combo',
                                			 emptyText: getLocale('Tipo'),
                                			displayField : 'tip_cdescripcion',
                                            queryMode: 'local',
                                			valueField : 'tip_idKey',
                                			name : "cue_ctipo",
                                            itemId: 'tipo',
                                            editable: false,                                           
                                            width:260
                                		},{
                                            xtype: 'button',
                                            iconCls: '',
                                            text: 'Buscar',
                                            action: 'filterText',
                                            itemId:'search'
                                        }
                                    ]
                            }
                        ]
        			}
                }, 
                '->',{
                    xtype: 'button',
                    text: 'Exportar',
                    itemId: 'btnExportar',
                    action: 'export',
                    iconCls: 'icon-page-excel'
                }]// cierro items
         }); 
        
        this.addDocked(toolbar);
    } // cierro init
});