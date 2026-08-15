Ext.define('AdministratorSearch.view.TablasLineasXPuertoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablaslineasxpuertogridview','widget.tablaslineasxpuertosearchview'],
    title : 'Templates',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
       
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasxpuertogridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Alias',
    		dataIndex : 'lxp_iAlias',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Linea',
			dataIndex : 'lxp_nLinea',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Estado',
    		dataIndex : 'lxp_nEstado',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['pan_ccodigo',getLocale('Codigo')],
                             ['pan_cdescripcion',getLocale('Descripcion')]
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