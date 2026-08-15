//MIGRADO2024
Ext.define('Common.view.OrganizationCuentaGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.organizationcuentagridview',
    title : 'Cuentas',
	autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
	columns : [{
            xtype:'actioncolumn',
            header : 'Acciones',
            items: [{
                iconCls: 'icon-servtec-16',
                tooltip: 'Datos ServTec',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('organizationcuentagridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('showservtec',rec,view);
                }
            }
            ]
        },{
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
		},// cue_clinea                
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
            hidden: true,
			header : 'Provincia/Estado',
			dataIndex : 'cue_provincia',
			sortable : true,
			width : 120
		}, {
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
            hidden: false,
			header : 'Estado',
			dataIndex : 'sta_nestado',
            renderer: function(value, metadata, record, colIndex,store, view) {
                var texto = '';
                var color = '';
                
                if (record.get("act_nestado")==1){
            		texto = "Desactivado / Abierto";
        			color = "#00FF00";
                }
        		else {
        			if (record.get("act_nestado")==2){
        				texto = "Activado / Cerrado";
        				color = "#FF0000";
        			}
        		}
                //metadata.style = 'color: ' + color;
                return texto;
            },
			sortable : true,
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
			sortable : true,
			width : 100
		}, 
        {
    		xtype : 'datecolumn',
            hidden: false,
			header : 'Fecha ult. evento',
			dataIndex : 'sta_dfechautimaalarma',
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
			sortable : true,
			width : 120
		},
    	{
			xtype : 'gridcolumn',
            hidden: false,
			header : 'Calle',
			dataIndex : 'cue_ccalle',
			sortable : true,
			width : 250
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                /*
                {
                    iconCls: 'icon-cuenta_filter_nohabilitadas ',
                    text: 'No Habilitadas',
                    action: 'filterNoHabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                }, 
                {
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
                },*/
                
                {
                    iconCls: 'icon-cuentaAdd',
                    text: 'Nueva Cuenta',
                    itemId: 'cuentaCreate',
                    action: 'crearCuenta'
                },{
                    xtype: 'combo',
                    store: [
                        ['Dealer-Cuenta',getLocale('Dealer-Cuenta')],
                        ['cue_ncuenta',getLocale('Cuenta')],
                        ['cue_clinea',getLocale('Dealer')],
                        ['cue_cnombre:LIKE',getLocale('Nombre')],
                        ['cue_ccalle:LIKE',getLocale('Calle')],
                        ['cue_cemail:LIKE',getLocale('Email')],
                        ['cue_ctelefono',getLocale('Teléfono')]
                    ],
                    queryMode: 'local',
                    value: 'Dealer-Cuenta',
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
                    iconCls: '',
                    text: 'Buscar',
                    action: 'filterText'
                },{
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todas',
                    action: 'removefilter',
                    pressed: false,
                    toggleGroup: 'filter',
                    enableToggle: false
                },'-',
                {
                    iconCls: 'icon-add',
                    text: 'Asignar Cuentas',
                    action: 'addCuenta'
                },
                {
                    iconCls: 'icon-delete',
                    text: 'Desasignar Cuentas',
                    action: 'delCuenta'
                }
                
                
                
            ]// cierro items
         }); 
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(toolbar);
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