Ext.define('SmartPanics.view.SpinBoxGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.spinboxgridview'],
   // requires: ['MyDesktop.model.MessageSearchModel', 'MyDesktop.model.MessageModel'],
    title : '',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: false,
        getRowClass: function(record) { 
            return record.get('DateReadIso') ? '' : 'rowBold'; 
        },
        loadMask: false
    },
    
    columns : [{
                xtype : 'gridcolumn',            
                header : 'De',
                dataIndex : 'FromName',
                hidden: true,
                flex: 1
            },{
                xtype : 'gridcolumn',            
                header : 'Subject',
                dataIndex : 'Name',
                flex: 1
            },{
                xtype : 'gridcolumn',            
                header : 'Enviado',
                dataIndex : 'DateCreatedText',
                width: 150
            },{
                xtype : 'gridcolumn',            
                header : 'Leído',
                dataIndex : 'DateReadText',
                width: 150
            }
        ],
    
    initComponent: function () {
        
      
        
       this.callParent(arguments);  
       var me=this;

   /*     this.on({
            afterrender : this.initView,
            itemdblclick: this.onItemClick,
            objectedit: this.onObjectEdit
        });*/
        
        var comboSearch =  [
            ['FromName',getLocale('De')],
            ['Name',getLocale('Subject')],
            ['DateCreated',getLocale('Fecha de entrada')]
        ];
        
                
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
               {
                    iconCls: 'icon-find',
                    text: getLocale('Nuevo mensaje'),
                    scope: this,
                    action: 'nuevomensaje'
                    
                },'-',{
                    text : getLocale('Filtros'),
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
                                            fieldLabel: getLocale('Campo')
                                            
                                                            
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: getLocale('Valor')
                                          
                                        }
                                    ]
                                 }
                             ]
                        }
                    
        		},{
                    iconCls: 'icon-find',
                    text: getLocale('Buscar'),
                    scope: this,
                    action: 'search'
                   
                },'-',
                {
                    iconCls: 'icon-find',
                    text: getLocale('Todos'),
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    }
    
    
    
});