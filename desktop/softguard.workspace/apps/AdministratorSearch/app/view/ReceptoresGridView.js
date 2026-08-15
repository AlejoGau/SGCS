Ext.define('AdministratorSearch.view.ReceptoresGridView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.receptoresgridview','widget.receptoressearchview'],
    title : 'Receptores',
    autoHeight : true,

    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [{
            xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'rec_iid',					
			hidden: true			
		},{
    		xtype : 'gridcolumn',            
			header : 'Descripcion',
			dataIndex : 'rec_cdescripcion',
			sortable : true,
            flex:1
		},{
    		xtype : 'gridcolumn',
			header : 'TCP IP',
            dataIndex : 'rec_ntcpip',
            width : 100,
			sortable : true			
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);     
        var me = this;
        
     
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        
        var comboSearch =  [
                             ['rec_cdescripcion',getLocale('Descripcion')]
                          
                           ];
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                
                {
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