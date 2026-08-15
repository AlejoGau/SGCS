Ext.define('AdministratorSearch.view.EliminarCuentaView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.eliminarcuentaview',
    title : 'Cuentas',
	autoHeight : true,
    closeAction: 'destroy',
    selModel: Ext.create('Ext.selection.CheckboxModel',{
        mode: 'SINGLE',
        showHeaderCheckbox: false
    }), 
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
		},// cue_clinea                
        {
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
                    case 'Eliminar' :
            			rclass = 'eliminar';
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
        			
        				texto = "Activado / Cerrado";
        				color = "#FF0000";
        			
        		}
                //metadata.style = 'color: ' + color;
                return getLocale(texto);
            },
			sortable : true,
			width : 140
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
			header : 'Último evento',
			dataIndex : 'sta_cultimaalarma',
            renderer : function(value, metadata, record, colIndex,store, view) {
                var texto ='';
                if (record.get("Situacion")!='No Habilitado' && record.get('sta_cultimaalarma') && record.get('sta_cultimaalarma') != '   '){
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
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
        this.onSelectChange = function (selModel, selections) {
            if (this.down('[action="cuentaHabilitar"]'))
            this.down('[action="cuentaHabilitar"]').setDisabled(selections.length == 0);
            if (this.down('[action="cuentaDelete"]'))
            this.down('[action="cuentaDelete"]').setDisabled(selections.length == 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-delete',
                    text: 'Borrar',
                    itemId: 'cuentaDelete',
                    action: 'cuentaDelete',
                    disabled: true
                },{
                    iconCls: 'icon-connect',
                    text: 'Habilitar',
                    itemId: 'cuentaHabilitar',
                    action: 'cuentaHabilitar',
                    disabled: true
                },'-',
                {
                    xtype: 'combo',
                    store: [
                        ['Dealer-Cuenta',getLocale('Dealer-Cuenta')],
                        ['cue_ncuenta',getLocale('Cuenta')],
                        ['cue_clinea',getLocale('Dealer')],
                        ['cue_cnombre',getLocale('Nombre')],
                        ['cue_ccalle',getLocale('Calle')],
                        ['cue_cemail',getLocale('Email')],
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
                    iconCls: '',
                    text: 'Todos',
                    action: 'getall'
                },'->',{
                    xtype: 'button',
                    text: 'Exportar',
                    itemId: 'btnExportar',
                    action: 'export',
                    iconCls: 'icon-page-excel'
                }
                
                
                
                ]// cierro items
         }); 
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);
        
        
        /*
        *
        *  PERSONALIZO la vista según metadata
        *
        */
        
        var view = this;
        
        if (UiApplicationMetadata.viewConfig){
            var viewConfig = Ext.JSON.decode(UiApplicationMetadata.viewConfig);
            Ext.Array.each(viewConfig, function(item){
                if (item.view == view.alias[0].split('.')[1]){
                    if (item.showColumns){
                        Ext.Array.each(item.showColumns, function(index){
                            var column =view.down("gridcolumn[dataIndex=" + index + "]");
                            if (column) column.show();
                        });
                    }
                }
            });
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