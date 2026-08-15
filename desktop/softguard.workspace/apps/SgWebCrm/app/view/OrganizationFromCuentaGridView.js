Ext.define('SGWebCrm.view.OrganizationFromCuentaGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.organizationfromcuentagridview',
    title : 'Cuentas',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
	columns : [{
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
            hidden: true,
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
			header : 'Calle',
			dataIndex : 'cue_ccalle',
			sortable : true,
			width : 250
		}
    ],
    
    initComponent: function () {
        
        this.selModel = Ext.create('Ext.selection.CheckboxModel')
        this.callParent(arguments);
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [        
                {
                    xtype: 'combo',
                    store: [
                        ['cue_clinea','Dealer'],
                        ['Dealer-Cuenta','Dealer-Cuenta'],
                        ['cue_ncuenta','Cuenta'],
                        ['cue_cnombre:LIKE','Nombre'],
                        ['cue_ccalle:LIKE','Calle'],
                        ['cue_cemail:LIKE','Email'],
                        ['cue_ctelefono','Teléfono']
                    ],
                    queryMode: 'local',
                    value: 'cue_clinea',
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
                    action: 'search'
                },{
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todas',
                    action: 'getall'
                },'-',
                {
                    iconCls: 'icon-add',
                    text: 'Importar cuentas',
                    action: 'crearFromCuenta'
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