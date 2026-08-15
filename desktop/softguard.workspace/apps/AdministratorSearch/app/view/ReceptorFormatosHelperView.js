Ext.define('AdministratorSearch.view.ReceptorFormatosHelperView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.receptorformatoshelperview'],
    autoHeight : true,
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false,    
        preserveScrollOnRefresh: true
    
    },
    columns : [
        {
            xtype : 'gridcolumn',
        	header : 'Codigo',
            dataIndex : 'for_ccodigo',
            width:100
		},{
    		xtype : 'gridcolumn',            
			header : 'Descripcion',
			dataIndex : 'for_cdescripcion',
            flex: 1
		},{
			xtype : 'gridcolumn',
			header : 'Formato',
            dataIndex : 'for_cformato',
            flex: 1
		},{
    		xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'for_cnombre',
            flex: 1
		},{
        	xtype : 'gridcolumn',
			header : 'Alarma',
            dataIndex : 'for_calarma',
            flex: 1
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
            ['for_cdescripcion',getLocale('Descripcion')],
            ['for_cformato',getLocale('Formato')],
            ['for_cnombre',getLocale('Nombre')],
            ['for_calarma',getLocale('Alarma')]
        
        ];

        var items= [{
                iconCls: '',
                text: 'Enviar Selección',
                action: 'selected'
            },'-',
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
            
        ];    

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         });      
        
        this.addDocked(toolbar);
    }
});