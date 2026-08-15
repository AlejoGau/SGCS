Ext.define('AdministratorSearch.view.ComoNosConocioGridView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.comonosconociogridview'],
    title : 'Formatos',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        // agregar una columna para abrir la lista de receptores del formato.
        {
        	xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'Name',
            flex: 1
		}
        
    ],
    
    initComponent: function () {
        this.callParent(arguments);     
        var me = this;
        
        
       /* this.getSelectionModel().on(
            'selectionchange', 
            function(selModel, selections, options){
                me.down('[action="delete"]').setDisabled(selections.length == 0)
            }
        );
        */
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(pagingtoolbar);
        
       var comboSearch =  [
                             ['Name',getLocale('Nombre')]
                          
                           ];
       
       
        var items= [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },{
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    scope: this,
                    action: 'delete'
                }/*,"-",{
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
                }*/];    
            
             
         
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         });      
        
        this.addDocked(toolbar);
        
    } 
});