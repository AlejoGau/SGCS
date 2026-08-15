//MIGRADO2024
Ext.define('Common.view.CuentaLocalizationGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.cuentalocalizationgridview',
    title : 'Cuentas localizacion',
	autoHeight : true,
    itemId: 'cuentalocalizationgridview',
    //selModel: Ext.create('Ext.selection.CheckboxModel'), 
	columns : [
        
        {
            xtype : 'gridcolumn',
    		header : '',
    		dataIndex : 'cue_ccalle',
    		width : 26,
            renderer: function(value, metadata,record){
                if(value == '') {
                    return '<img data-qtip="'+getLocale('Falta direccion')+'" src="/resources/global/images/icons/exclamation.png" width=16 height=16>';
                }
                return '';
            }
        },
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
		},            
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
			dataIndex : 'act_nestado',
            renderer: function(value, metadata, record, colIndex,store, view) {
                var texto = '';
                var color = '';
                
                if (record.get("act_nestado")==1){
            		texto = "Desactivado / Abierto";
        			color = "#00FF00";
                }
        		else if (record.get("act_nestado")==0){
        				texto ="Activado / Cerrado";
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
		}, 
        {
    		xtype : 'datecolumn',
            hidden: false,
			header : 'Fecha ult. evento',
			dataIndex : 'sta_dfechautimaalarma',
            format: 'd/m/Y H:i:s',
			sortable : true,
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
        this.callParent(arguments);
    
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-cuentaAdd',
                    text: 'Auto Localizar',
                    itemId: 'autoLocalizar',
                    action: 'autoLocalizar'
                }
            ]// cierro items
         }); 
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);
        
        
    } // cierro init
});