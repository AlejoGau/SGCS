Ext.define('SgAppSerTec.view.AsignarMovilView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.asignarmovilgridview','widget.asignarmovilsearchview'],
    title : '',
    autoHeight : true,
       
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype : 'gridcolumn',            
            header : 'Nombre',
        	dataIndex : 'tmp_cnombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Numero',
            dataIndex : 'tmp_cnumero',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['tmp_cnombre',getLocale('Nombre')]
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