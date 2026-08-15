//MIGRADO2024
Ext.define('Common.view.AsignarTecnicoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.asignartecnicogridview','widget.asignartecnicosearchview'],
    title : '',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype : 'gridcolumn',            
            header : 'Nombre',
    		dataIndex : 'tec_cnombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Email',
            dataIndex : 'tec_cmail',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Telefono',
            dataIndex : 'tec_ctelefono',
            flex: 1
    	}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['tec_cnombre',getLocale('Nombre')]
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