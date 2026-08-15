//MIGRADO2024
Ext.define('Common.view.DealerHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.dealerhelperview'],
    title : '',
    autoHeight : true,
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype : 'gridcolumn',            
            header : 'Codigo',
        	dataIndex : 'lin_ccodigo',
            width:50
		},{
            xtype : 'gridcolumn',            
            header : 'Razon social',
			dataIndex : 'lin_crazonsocial',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Calle',
    		dataIndex : 'lin_ccalle',
            flex: 1
		}
    ],
    
    initComponent: function () {
        var comboSearch =  [
            ['lin_ccodigo',getLocale('Codigo')],
            ['lin_crazonsocial',getLocale('Razon social')]
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
                    text: 'Seleccionar',
                    scope: this,
                    action: 'select',
                    itemId: 'select'
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
                },"-",{
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add',
                    itemId:'add',
                    hidden:true
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
    } 
});
Ext.define('Common.view.DealerHelperSimpleView', {
    extend : 'Common.view.DealerHelperView',
    alias : ['widget.dealerhelpersimpleview'],
    title : '',
    autoHeight : true,
    selModel: null,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype : 'gridcolumn',            
            header : 'Codigo',
            dataIndex : 'lin_ccodigo',
            width:50
		},{
            xtype : 'gridcolumn',            
            header : 'Razon social',
			dataIndex : 'lin_crazonsocial',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Calle',
    		dataIndex : 'lin_ccalle',
            flex: 1
		}
    ]
});