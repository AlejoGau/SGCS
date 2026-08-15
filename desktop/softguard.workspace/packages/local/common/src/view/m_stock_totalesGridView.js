//MIGRADO2024
Ext.define('Common.view.m_stock_totalesGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.m_stock_totalesgridview'],
    title : '',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    //plugins: [{ptype : '//pagingselectpersist'}],   
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    
    columns : [
       {
            xtype : 'gridcolumn',            
            header : 'SKU',
            dataIndex : 'Code',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Producto',
            dataIndex : 'productoName',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Cantidad',
            dataIndex : 'stt_cant',
            flex: 1
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
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Producto',
                                            itemId:'producto'
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