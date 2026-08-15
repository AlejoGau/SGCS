//MIGRADO2024
Ext.define('Common.view.EncuestaEstadisticaEstadoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.encuestasestadisticaestadogridview',
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
			flex : 1
		},{
			xtype : 'gridcolumn',
			header : 'Nombre',
			dataIndex : 'cue_cnombre',
			sortable : true,
			flex : 1
		},{
    		xtype : 'gridcolumn',
			header : 'Usuario',
			dataIndex : 'Nombre',
			sortable : true,
			flex : 1
		},{
            xtype : 'gridcolumn',            
            header : 'Telefono',
        	dataIndex : 'Telefono',			
			flex : 1,
            hidden : true
		},{
    		xtype : 'gridcolumn',
			header : 'Modelo',
			dataIndex : 'Modelo',
			sortable : true,
            flex : 1,
            hidden : true 
		},{
			xtype : 'gridcolumn',            
			header : 'Marca',
			dataIndex : 'Marca',
			sortable : true,
            flex : 1,
            hidden : true 
		},{
			xtype : 'gridcolumn',            
			header : 'Version',
			dataIndex : 'Version',
			sortable : true,
            flex : 1,
            hidden : true 
		},{
            xtype : 'gridcolumn',            
    		header : 'Tipo',
			dataIndex : 'Tipo',
            flex : 1 
		},{
    		xtype : 'gridcolumn',
			header : 'Imei',
			dataIndex : 'Imei',
			sortable : true,
			flex : 1
		},{
            xtype : 'gridcolumn',
            header : 'Estado',
            dataIndex : 'enr_estado',            		
            flex:1,
            renderer :  function(value, metadata, record) {
                if (value == 1) {
                    metadata.style = 'color: #FFFFFF; background-color: #FF0000';
                    return record.get("estado");
                } else if (value == 2) {
                    metadata.style = 'color: #FFFFFF; background-color: #008000';
                    return record.get("estado");
                } else {
                    return record.get("estado");
                }
            }
		}
    
    ],
        
        
    initComponent: function () {
        this.callParent(arguments);  
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [
                                {
                                    xtype: 'combo',
                                    queryMode: 'local',
                                    itemId: 'comboEstado',
                                    store: [
                                        [0, getLocale('Pendiente de respuesta')],
                                        [1, getLocale('Iniciada no finalizada')],
                                        [2, getLocale('Finalizada')]
                                    ],
                                    fieldLabel: 'Estado'
                                }
                            ]
                        }]
            	    }
                    
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                },'->',{
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }
            ]
         }); 
        
        this.addDocked(toolbar);
        
    } 
});