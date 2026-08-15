Ext.define('SgAppAccessControl.view.p_controlAccesoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.p_controlaccesoview'],
    title : 'Templates',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp:true,
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('p_controlaccesoview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Tipo acceso',
            dataIndex : 'cac_tipoacceso',           
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Puerta',
    		dataIndex : 'cac_idpuerta',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Fecha',
        	dataIndex : 'cac_fecha',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Autorizado',
        	dataIndex : 'cac_idautorizado',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Autorizado tipo',
        	dataIndex : 'cac_autorizatipo',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Autoriza',
        	dataIndex : 'cac_autorizaid',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Autoriza condigo',
        	dataIndex : 'cac_autorizacodigo',
            flex: 1
		}
        
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['fir_ccuenta',getLocale('Cuenta')],
                             ['fir_cnombre',getLocale('Nombre')]
                           ];
        
       
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },"-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',                    
                    disabled: true,
                    scope: this
                },"-",{
                    text : 'Filtros',
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
                                            queryMode: 'local',
                                            itemId: 'fieldName',
                                            store: comboSearch,
                                            fieldLabel: 'Campo'
                                            
                                                            
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Valor'
                                          
                                        }
                                    ]
                                 }
                             ]
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
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});